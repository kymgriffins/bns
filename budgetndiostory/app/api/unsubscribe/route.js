// app/api/unsubscribe/route.js
// GET /api/unsubscribe?email=xxx
// One-click unsubscribe — no login required

import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email  = searchParams.get('email');
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!email) {
    return NextResponse.redirect(`${appUrl}/?unsub=invalid`);
  }

  try {
    await db.query(
      'UPDATE subscribers SET unsubscribed = 1 WHERE email = ?',
      [email]
    );
    await db.query(
      'UPDATE contacts SET subscribed = 0 WHERE email = ?',
      [email]
    );
    return NextResponse.redirect(`${appUrl}/?unsub=success`);
  } catch (err) {
    console.error('[unsubscribe]', err);
    return NextResponse.redirect(`${appUrl}/?unsub=error`);
  }
}
