// lib/mailer.js
// Nodemailer transporter — uses your cPanel SMTP directly
// Add these to Vercel environment variables:
//   SMTP_HOST     = mail.budgetndiostory.org
//   SMTP_PORT     = 465
//   SMTP_USER     = info@budgetndiostory.org
//   SMTP_PASSWORD = @budgetndiostory.org
//   SMTP_FROM     = Budget Ndio Story <info@budgetndiostory.org>
//   NEXT_PUBLIC_APP_URL = https://budgetndiostory.org

import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   parseInt(process.env.SMTP_PORT || '465'),
  secure: true,               // true for port 465 (SSL)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true, // enforce valid SSL cert
  },
});

/**
 * Send an email.
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 */
export async function sendEmail({ to, subject, html }) {
  const info = await transporter.sendMail({
    from:    process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
  return info;
}
