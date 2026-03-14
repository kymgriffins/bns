// app/api/subscribe/confirm/route.js
// GET /api/subscribe/confirm?token=xxx
// Validates token, marks confirmed, sends welcome email, redirects to homepage

import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendEmail } from '@/lib/mailer';
import { emailLayout } from '@/lib/emailLayout';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!token) {
    return NextResponse.redirect(`${appUrl}/?sub=invalid`);
  }

  try {
    // ── Find token ────────────────────────────────────────────────────
    const [rows] = await db.query(
      `SELECT id, email, name, confirmed, token_expires
       FROM subscribers
       WHERE confirm_token = ?`,
      [token]
    );

    if (rows.length === 0) {
      return NextResponse.redirect(`${appUrl}/?sub=invalid`);
    }

    const sub = rows[0];

    if (sub.confirmed) {
      return NextResponse.redirect(`${appUrl}/?sub=already_confirmed`);
    }

    if (new Date(sub.token_expires) < new Date()) {
      return NextResponse.redirect(`${appUrl}/?sub=expired`);
    }

    // ── Confirm ───────────────────────────────────────────────────────
    await db.query(
      `UPDATE subscribers
         SET confirmed = 1, confirmed_at = NOW(), confirm_token = '', token_expires = NOW()
       WHERE id = ?`,
      [sub.id]
    );

    // ── Welcome email ─────────────────────────────────────────────────
    await sendEmail({
      to:      sub.email,
      subject: 'Welcome to Budget Ndio Story 🇰🇪',
      html:    emailLayout({
        previewText: 'You\'re subscribed — here\'s what to expect from us.',
        body: `
          <span class="badge">You\'re in!</span>
          <h2>Welcome${sub.name ? `, ${sub.name}` : ''}!</h2>
          <p>
            You\'re now subscribed to Budget Ndio Story — Kenya\'s civic budget platform.
            Here\'s what you\'ll get from us:
          </p>
          <ul style="padding-left:20px;color:#444;line-height:2;">
            <li>Simplified budget reports — plain language, real numbers</li>
            <li>Budget tracker updates — allocated, released, delivered</li>
            <li>Civic window alerts — participation deadlines near you</li>
            <li>New learning modules — Budget 101 and beyond</li>
          </ul>
          <p style="text-align:center;margin-top:24px;">
            <a class="btn" href="${appUrl}/reports">Browse budget reports</a>
          </p>
          <hr class="divider"/>
          <p style="font-size:13px;color:#888;">
            To unsubscribe at any time, <a href="${appUrl}/api/unsubscribe?email=${encodeURIComponent(sub.email)}" style="color:#1A5276;">click here</a>.
          </p>
        `,
      }),
    });

    return NextResponse.redirect(`${appUrl}/?sub=confirmed`);

  } catch (err) {
    console.error('[subscribe/confirm]', err);
    return NextResponse.redirect(`${appUrl}/?sub=error`);
  }
}
