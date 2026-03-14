// app/api/report-request/[id]/notify/route.js
// POST /api/report-request/[id]/notify
// Body: { report_url, report_title }
// Called by admin when a requested report is published.
// Sends "your report is ready" email to the original requester.

import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendEmail } from '@/lib/mailer';
import { emailLayout } from '@/lib/emailLayout';

export async function POST(req, { params }) {
  try {
    const id = parseInt(params.id);
    const { report_url, report_title } = await req.json();

    if (!report_url || !report_title) {
      return NextResponse.json(
        { error: 'report_url and report_title are required.' },
        { status: 400 }
      );
    }

    // ── Fetch request ──────────────────────────────────────────────────
    const [rows] = await db.query(
      'SELECT * FROM report_requests WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Request not found.' }, { status: 404 });
    }

    const request = rows[0];

    // ── Send "report ready" email ──────────────────────────────────────
    await sendEmail({
      to:      request.requester_email,
      subject: `Your requested report is ready — ${report_title}`,
      html:    emailLayout({
        previewText: `The budget report you requested has been published.`,
        body: `
          <span class="badge">Report Ready</span>
          <h2>Your report is published${request.requester_name ? `, ${request.requester_name}` : ''}!</h2>
          <p>
            Good news — the budget report you requested has been researched, simplified,
            and is now live on Budget Ndio Story.
          </p>
          <hr class="divider"/>
          <p style="font-size:18px;font-weight:700;color:#1A5276;">${report_title}</p>
          ${request.county   ? `<div class="info-row"><span>County</span><span>${request.county}</span></div>` : ''}
          ${request.sector   ? `<div class="info-row"><span>Sector</span><span>${request.sector}</span></div>` : ''}
          ${request.doc_type ? `<div class="info-row"><span>Document type</span><span>${request.doc_type}</span></div>` : ''}
          <div class="info-row"><span>Your request</span><span>REQ-${request.id}</span></div>
          <hr class="divider"/>
          <p style="text-align:center;">
            <a class="btn" href="${report_url}">Read the report</a>
          </p>
          <p style="font-size:13px;color:#888;">
            Thank you for helping us prioritise the content that matters to Kenyans.
            If you have more requests, visit
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/reports" style="color:#1A5276;">budgetndiostory.org/reports</a>.
          </p>
        `,
      }),
    });

    // ── Update status ──────────────────────────────────────────────────
    await db.query(
      'UPDATE report_requests SET status = \'published\', notify_sent = 1 WHERE id = ?',
      [id]
    );

    return NextResponse.json({ message: 'notification_sent' }, { status: 200 });

  } catch (err) {
    console.error('[report-request/notify]', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
