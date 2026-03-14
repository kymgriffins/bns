// app/api/subscribe/route.js
// POST /api/subscribe
// Body: { email, name? }
// Saves subscriber, sends confirmation email with token link

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import db from '@/lib/db';
import { sendEmail } from '@/lib/mailer';
import { emailLayout } from '@/lib/emailLayout';

export async function POST(req) {
  try {
    const { email, name } = await req.json();

    // ── Validate ────────────────────────────────────────────────────────
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
    }

    // ── Check existing ──────────────────────────────────────────────────
    const [existing] = await db.query(
      'SELECT id, confirmed, unsubscribed FROM subscribers WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      const sub = existing[0];
      if (sub.confirmed && !sub.unsubscribed) {
        return NextResponse.json({ message: 'already_subscribed' }, { status: 200 });
      }
      // If unsubscribed or not confirmed — re-issue token and resend
    }

    // ── Generate token ──────────────────────────────────────────────────
    const token   = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    if (existing.length > 0) {
      await db.query(
        `UPDATE subscribers
           SET confirm_token = ?, token_expires = ?, unsubscribed = 0, confirmed = 0
         WHERE email = ?`,
        [token, expires, email]
      );
    } else {
      await db.query(
        `INSERT INTO subscribers (email, name, confirm_token, token_expires)
         VALUES (?, ?, ?, ?)`,
        [email, name || null, token, expires]
      );
      // Also upsert into unified contacts table
      await db.query(
        `INSERT INTO contacts (email, name, source)
         VALUES (?, ?, 'newsletter')
         ON DUPLICATE KEY UPDATE source = source`,
        [email, name || null]
      );
    }

    // ── Send confirmation email ─────────────────────────────────────────
    const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/subscribe/confirm?token=${token}`;

    await sendEmail({
      to:      email,
      subject: 'Confirm your subscription — Budget Ndio Story',
      html:    emailLayout({
        previewText: 'One click to confirm your subscription to Kenya\'s civic budget updates.',
        body: `
          <span class="badge">Newsletter</span>
          <h2>Confirm your subscription</h2>
          <p>Hi${name ? ` ${name}` : ''},</p>
          <p>
            Thank you for signing up to receive budget updates from Budget Ndio Story.
            Click the button below to confirm your email address and activate your subscription.
          </p>
          <p style="text-align:center;">
            <a class="btn" href="${confirmUrl}">Confirm my subscription</a>
          </p>
          <hr class="divider"/>
          <p style="font-size:13px;color:#888;">
            This link expires in 24 hours. If you did not sign up, you can safely ignore this email.
          </p>
        `,
      }),
    });

    return NextResponse.json({ message: 'confirmation_sent' }, { status: 200 });

  } catch (err) {
    console.error('[subscribe]', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
