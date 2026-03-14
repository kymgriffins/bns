// app/api/donate/route.js
// POST /api/donate
// Body: { donor_name?, donor_email, amount_kes, payment_method, payment_type, reference }
// Saves donation record and sends receipt email.
//
// Call this route AFTER payment confirmation:
//   - M-Pesa: call from your Daraja STK Push callback once status = Success
//   - Card:   call from your Stripe webhook once checkout.session.completed fires
//
// If you have no payment gateway yet, you can call it immediately with
// status = 'confirmed' as a placeholder for manual payment tracking.

import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendEmail } from '@/lib/mailer';
import { emailLayout } from '@/lib/emailLayout';

export async function POST(req) {
  try {
    const {
      donor_name,
      donor_email,
      amount_kes,
      payment_method,
      payment_type = 'one_time',
      reference,
      status = 'confirmed',
    } = await req.json();

    // ── Validate ───────────────────────────────────────────────────────
    if (!donor_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donor_email)) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
    }
    if (!amount_kes || amount_kes <= 0) {
      return NextResponse.json({ error: 'Valid amount required.' }, { status: 400 });
    }
    if (!['mpesa', 'card'].includes(payment_method)) {
      return NextResponse.json({ error: 'payment_method must be mpesa or card.' }, { status: 400 });
    }

    // ── Save donation ──────────────────────────────────────────────────
    const [result] = await db.query(
      `INSERT INTO donations
         (donor_name, donor_email, amount_kes, payment_method, payment_type, reference, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [donor_name || null, donor_email, amount_kes, payment_method, payment_type, reference || null, status]
    );
    const donationId = result.insertId;

    // Also add to unified contacts
    await db.query(
      `INSERT INTO contacts (email, name, source)
       VALUES (?, ?, 'donor')
       ON DUPLICATE KEY UPDATE name = COALESCE(VALUES(name), name)`,
      [donor_email, donor_name || null]
    );

    // ── Send receipt email (only if confirmed) ─────────────────────────
    if (status === 'confirmed') {
      const formatted = new Intl.NumberFormat('en-KE').format(amount_kes);
      const methodLabel = payment_method === 'mpesa' ? 'M-Pesa' : 'Card';
      const typeLabel   = payment_type === 'recurring' ? 'Monthly recurring' : 'One-time';
      const dateStr     = new Date().toLocaleDateString('en-KE', {
        day: 'numeric', month: 'long', year: 'numeric'
      });

      await sendEmail({
        to:      donor_email,
        subject: `Donation received — KES ${formatted} · Budget Ndio Story`,
        html:    emailLayout({
          previewText: `Thank you! Your KES ${formatted} donation has been received.`,
          body: `
            <span class="badge">Donation Receipt</span>
            <h2>Thank you${donor_name ? `, ${donor_name}` : ''}!</h2>
            <p>
              Your donation has been received and will directly support budget transparency
              work across Kenya. We are grateful for your contribution.
            </p>
            <hr class="divider"/>
            <p class="amount">KES ${formatted}</p>
            <div class="info-row"><span>Date</span><span>${dateStr}</span></div>
            <div class="info-row"><span>Payment method</span><span>${methodLabel}</span></div>
            <div class="info-row"><span>Donation type</span><span>${typeLabel}</span></div>
            ${reference
              ? `<div class="info-row"><span>Reference</span><span>${reference}</span></div>`
              : ''}
            <div class="info-row"><span>Donation ID</span><span>#${donationId}</span></div>
            <hr class="divider"/>
            <p>
              Your support helps us produce simplified budget reports, run the tracker,
              and deliver budget literacy modules for Kenyan youth.
            </p>
            <p style="text-align:center;">
              <a class="btn" href="${process.env.NEXT_PUBLIC_APP_URL}/tracker">See what your donation supports</a>
            </p>
            <p style="font-size:13px;color:#888;">
              Please keep this email as your receipt. For any queries contact
              <a href="mailto:info@budgetndiostory.org" style="color:#1A5276;">info@budgetndiostory.org</a>.
            </p>
          `,
        }),
      });

      // Mark receipt sent
      await db.query(
        'UPDATE donations SET receipt_sent = 1 WHERE id = ?',
        [donationId]
      );
    }

    return NextResponse.json({ message: 'donation_saved', id: donationId }, { status: 201 });

  } catch (err) {
    console.error('[donate]', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
