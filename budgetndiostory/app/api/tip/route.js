// app/api/tip/route.js
// POST /api/tip
// Body: { submitter_email, submitter_name?, title, category?, county?, description, evidence_url? }
// Saves tip and sends acknowledgement email to submitter.
// Sends internal notification email to the admin team.

import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendEmail } from '@/lib/mailer';
import { emailLayout } from '@/lib/emailLayout';

export async function POST(req) {
  try {
    const {
      submitter_email,
      submitter_name,
      title,
      category,
      county,
      description,
      evidence_url,
    } = await req.json();

    // ── Validate ───────────────────────────────────────────────────────
    if (!submitter_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitter_email)) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
    }
    if (!title?.trim()) {
      return NextResponse.json({ error: 'Tip title is required.' }, { status: 400 });
    }
    if (!description?.trim()) {
      return NextResponse.json({ error: 'Description is required.' }, { status: 400 });
    }

    // ── Save tip ───────────────────────────────────────────────────────
    const [result] = await db.query(
      `INSERT INTO tips
         (submitter_email, submitter_name, title, category, county, description, evidence_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        submitter_email,
        submitter_name || null,
        title.trim(),
        category || null,
        county || null,
        description.trim(),
        evidence_url || null,
      ]
    );
    const tipId = result.insertId;

    // Add to unified contacts
    await db.query(
      `INSERT INTO contacts (email, name, source)
       VALUES (?, ?, 'tip')
       ON DUPLICATE KEY UPDATE name = COALESCE(VALUES(name), name)`,
      [submitter_email, submitter_name || null]
    );

    // ── Acknowledgement email to submitter ─────────────────────────────
    await sendEmail({
      to:      submitter_email,
      subject: 'We received your tip — Budget Ndio Story',
      html:    emailLayout({
        previewText: 'Thank you for your community tip. Our team will review it shortly.',
        body: `
          <span class="badge">Tip Received</span>
          <h2>Thank you${submitter_name ? `, ${submitter_name}` : ''}!</h2>
          <p>
            We have received your community tip and our team will review it. Tips like yours
            help us hold budget delivery to account and ensure money reaches communities.
          </p>
          <hr class="divider"/>
          <div class="info-row"><span>Tip title</span><span>${title.trim()}</span></div>
          ${category ? `<div class="info-row"><span>Category</span><span>${category}</span></div>` : ''}
          ${county ? `<div class="info-row"><span>County</span><span>${county}</span></div>` : ''}
          <div class="info-row"><span>Reference</span><span>TIP-${tipId}</span></div>
          <hr class="divider"/>
          <p>
            If we need more information from you, we will reply to this email address.
            You can also track budget delivery on our tracker page.
          </p>
          <p style="text-align:center;">
            <a class="btn" href="${process.env.NEXT_PUBLIC_APP_URL}/tracker">View the budget tracker</a>
          </p>
          <p style="font-size:13px;color:#888;">
            Questions? Contact us at
            <a href="mailto:info@budgetndiostory.org" style="color:#1A5276;">info@budgetndiostory.org</a>.
          </p>
        `,
      }),
    });

    // ── Internal notification to admin team ────────────────────────────
    await sendEmail({
      to:      process.env.ADMIN_EMAIL || 'info@budgetndiostory.org',
      subject: `[New Tip] TIP-${tipId}: ${title.trim()}`,
      html:    emailLayout({
        previewText: `New community tip submitted by ${submitter_email}`,
        body: `
          <span class="badge">Admin · New Tip</span>
          <h2>New community tip submitted</h2>
          <div class="info-row"><span>From</span><span>${submitter_name || 'Anonymous'} &lt;${submitter_email}&gt;</span></div>
          <div class="info-row"><span>Title</span><span>${title.trim()}</span></div>
          ${category ? `<div class="info-row"><span>Category</span><span>${category}</span></div>` : ''}
          ${county ? `<div class="info-row"><span>County</span><span>${county}</span></div>` : ''}
          <div class="info-row"><span>Reference</span><span>TIP-${tipId}</span></div>
          <hr class="divider"/>
          <p><strong>Description:</strong></p>
          <p style="background:#f8fafc;padding:16px;border-left:3px solid #1A5276;border-radius:4px;">
            ${description.trim().replace(/\n/g, '<br/>')}
          </p>
          ${evidence_url
            ? `<p><strong>Evidence:</strong> <a href="${evidence_url}" style="color:#1A5276;">${evidence_url}</a></p>`
            : ''}
          <p style="text-align:center;margin-top:20px;">
            <a class="btn" href="${process.env.NEXT_PUBLIC_APP_URL}/admin">Review in admin panel</a>
          </p>
        `,
      }),
    });

    await db.query('UPDATE tips SET ack_sent = 1 WHERE id = ?', [tipId]);

    return NextResponse.json({ message: 'tip_received', id: tipId }, { status: 201 });

  } catch (err) {
    console.error('[tip]', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
