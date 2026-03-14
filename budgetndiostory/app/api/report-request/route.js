// app/api/report-request/route.js
// POST /api/report-request
// Body: { requester_email, requester_name?, county?, sector?, doc_type?, description? }
// Saves request and sends confirmation to requester + internal admin notification.
//
// When admin marks a request as 'published', call PATCH /api/report-request/[id]/notify
// to fire the "your report is ready" email. That route is in app/api/report-request/[id]/notify/route.js

import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendEmail } from '@/lib/mailer';
import { emailLayout } from '@/lib/emailLayout';

export async function POST(req) {
  try {
    const {
      requester_email,
      requester_name,
      county,
      sector,
      doc_type,
      description,
    } = await req.json();

    // ── Validate ───────────────────────────────────────────────────────
    if (!requester_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requester_email)) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
    }

    // ── Save request ───────────────────────────────────────────────────
    const [result] = await db.query(
      `INSERT INTO report_requests
         (requester_email, requester_name, county, sector, doc_type, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        requester_email,
        requester_name || null,
        county || null,
        sector || null,
        doc_type || null,
        description || null,
      ]
    );
    const requestId = result.insertId;

    // Add to unified contacts
    await db.query(
      `INSERT INTO contacts (email, name, source)
       VALUES (?, ?, 'report_request')
       ON DUPLICATE KEY UPDATE name = COALESCE(VALUES(name), name)`,
      [requester_email, requester_name || null]
    );

    // ── Confirmation email to requester ────────────────────────────────
    await sendEmail({
      to:      requester_email,
      subject: 'Report request received — Budget Ndio Story',
      html:    emailLayout({
        previewText: 'We\'ve received your report request and will notify you when it\'s ready.',
        body: `
          <span class="badge">Report Request</span>
          <h2>Request received${requester_name ? `, ${requester_name}` : ''}!</h2>
          <p>
            Thank you for your request. Our editorial team will review it and produce
            a simplified budget brief as soon as possible. We will email you as soon as
            your report is published.
          </p>
          <hr class="divider"/>
          ${county    ? `<div class="info-row"><span>County</span><span>${county}</span></div>` : ''}
          ${sector    ? `<div class="info-row"><span>Sector</span><span>${sector}</span></div>` : ''}
          ${doc_type  ? `<div class="info-row"><span>Document type</span><span>${doc_type}</span></div>` : ''}
          <div class="info-row"><span>Reference</span><span>REQ-${requestId}</span></div>
          <hr class="divider"/>
          <p>
            While you wait, browse existing budget reports that may already cover
            what you need.
          </p>
          <p style="text-align:center;">
            <a class="btn" href="${process.env.NEXT_PUBLIC_APP_URL}/reports">Browse budget reports</a>
          </p>
          <p style="font-size:13px;color:#888;">
            Questions? Reply to this email or contact
            <a href="mailto:info@budgetndiostory.org" style="color:#1A5276;">info@budgetndiostory.org</a>.
          </p>
        `,
      }),
    });

    // ── Internal notification ──────────────────────────────────────────
    await sendEmail({
      to:      process.env.ADMIN_EMAIL || 'info@budgetndiostory.org',
      subject: `[New Request] REQ-${requestId}: ${county || ''} ${sector || ''} ${doc_type || ''}`.trim(),
      html:    emailLayout({
        previewText: `New report request from ${requester_email}`,
        body: `
          <span class="badge">Admin · New Report Request</span>
          <h2>New report request</h2>
          <div class="info-row"><span>From</span><span>${requester_name || 'Anonymous'} &lt;${requester_email}&gt;</span></div>
          ${county   ? `<div class="info-row"><span>County</span><span>${county}</span></div>` : ''}
          ${sector   ? `<div class="info-row"><span>Sector</span><span>${sector}</span></div>` : ''}
          ${doc_type ? `<div class="info-row"><span>Document type</span><span>${doc_type}</span></div>` : ''}
          <div class="info-row"><span>Reference</span><span>REQ-${requestId}</span></div>
          ${description
            ? `<hr class="divider"/>
               <p><strong>Additional details:</strong></p>
               <p style="background:#f8fafc;padding:16px;border-left:3px solid #1A5276;border-radius:4px;">
                 ${description.replace(/\n/g, '<br/>')}
               </p>`
            : ''}
          <p style="text-align:center;margin-top:20px;">
            <a class="btn" href="${process.env.NEXT_PUBLIC_APP_URL}/admin">Manage in admin panel</a>
          </p>
        `,
      }),
    });

    return NextResponse.json({ message: 'request_received', id: requestId }, { status: 201 });

  } catch (err) {
    console.error('[report-request]', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
