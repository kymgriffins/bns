import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

// Only initialize Resend if API key is available
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
  // If Resend is not configured, return a mock success response
  if (!resend) {
    console.warn("Resend API key not configured. Email not sent.");
    return { success: true, data: { id: "mock-email-id" } };
  }

  try {
    const data = await resend.emails.send({
      from: from || process.env.DEFAULT_EMAIL_FROM || "Budget Ndio Story <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Budget Ndio Story! 🎉</h1>
          </div>
          <div class="content">
            <p>Thank you for signing up for Budget Ndio Story.</p>
            <p>We're excited to have you join our community of engaged citizens who want to understand and participate in Kenya's budget process.</p>
            <p>Here's what you can expect:</p>
            <ul>
              <li>📊 <strong>Budget Reports</strong> - Simplified breakdowns of national and county budgets</li>
              <li>🔔 <strong>Participation Alerts</strong> - Notices about public participation opportunities</li>
              <li>📚 <strong>Training Updates</strong> - Announcements about workshops and capacity building</li>
            </ul>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}" class="button">Explore Budgets</a>
          </div>
          <div class="footer">
            <p>Budget Ndio Story - Making Kenya's budget accessible to everyone</p>
            <p>If you have any questions, reply to this email or visit our website.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to Budget Ndio Story! 🎉",
    html,
  });
}

export async function sendNewsletterConfirmation(email: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>You're Subscribed! ✅</h1>
          </div>
          <div class="content">
            <p>Thank you for subscribing to the Budget Ndio Story newsletter!</p>
            <p>You'll now receive:</p>
            <ul>
              <li>📊 Budget Reports - Simplified breakdowns of national and county budgets</li>
              <li>🔔 Participation Alerts - Notices about public participation opportunities</li>
              <li>📚 Training Updates - Announcements about workshops and capacity building</li>
            </ul>
            <p>If you didn't sign up for this newsletter, you can safely ignore this email or unsubscribe using the link at the bottom of any newsletter.</p>
          </div>
          <div class="footer">
            <p>Budget Ndio Story - Making Kenya's budget accessible to everyone</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "You're subscribed to Budget Ndio Story! ✅",
    html,
  });
}
