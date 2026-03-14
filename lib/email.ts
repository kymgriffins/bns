import nodemailer from 'nodemailer';
import { Resend } from 'resend';

// =============================================
// Email Layout - Branded wrapper for all emails
// =============================================

/**
 * Generates the branded HTML wrapper for all emails
 * Uses the same styling as budgetndiostory/lib/emailLayout.js
 */
export function emailLayout({ previewText = '', body }: { previewText?: string; body: string }): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>Budget Ndio Story</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style>
    body, html { margin: 0; padding: 0; background: #f4f6f9; font-family: Arial, Helvetica, sans-serif; }
    .wrapper   { width: 100%; background: #f4f6f9; padding: 32px 0; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff;
                 border-radius: 8px; overflow: hidden;
                 border: 1px solid #e0e4ea; }
    .header    { background: #1A5276; padding: 28px 32px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    .header p  { color: #a8c5e0; margin: 4px 0 0; font-size: 13px; }
    .body      { padding: 32px; color: #333333; font-size: 15px; line-height: 1.7; }
    .body h2   { color: #1A5276; font-size: 18px; margin: 0 0 12px; }
    .body p    { margin: 0 0 16px; }
    .btn       { display: inline-block; padding: 13px 28px; background: #1E8449;
                 color: #ffffff !important; text-decoration: none; border-radius: 6px;
                 font-weight: 700; font-size: 15px; margin: 8px 0 20px; }
    .divider   { border: none; border-top: 1px solid #e8ecf0; margin: 24px 0; }
    .meta      { background: #f8fafc; padding: 16px 32px; border-top: 1px solid #e0e4ea; }
    .meta p    { margin: 0; font-size: 12px; color: #888; line-height: 1.6; }
    .meta a    { color: #1A5276; text-decoration: none; }
    .badge     { display: inline-block; background: #eaf4ff; color: #1A5276;
                 border-radius: 4px; padding: 2px 10px; font-size: 12px;
                 font-weight: 700; margin-bottom: 16px; }
    .amount    { font-size: 28px; font-weight: 700; color: #1E8449; }
    .info-row  { display: flex; justify-content: space-between; padding: 8px 0;
                 border-bottom: 1px solid #f0f0f0; font-size: 14px; }
    .info-row span:first-child { color: #888; }
    .info-row span:last-child  { font-weight: 600; color: #333; }
    .cta-box   { background: #f0f7ff; border-left: 4px solid #1A5276; padding: 20px; margin: 20px 0; }
    .features  { margin: 20px 0; }
    .features li { margin: 8px 0; color: #555; }
    .features strong { color: #1A5276; }
  </style>
</head>
<body>
  ${previewText ? `<div style="display:none;max-height:0;overflow:hidden;color:#f4f6f9;">${previewText}</div>` : ''}
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>Budget Ndio Story</h1>
        <p>Kenya's civic budget platform</p>
      </div>
      <div class="body">
        ${body}
      </div>
      <div class="meta">
        <p>
          Budget Ndio Story &nbsp;·&nbsp; Nairobi, Kenya<br/>
          <a href="https://budgetndiostory.org">budgetndiostory.org</a>
          &nbsp;·&nbsp;
          <a href="mailto:info@budgetndiostory.org">info@budgetndiostory.org</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`.trim();
}

// =============================================
// SMTP Configuration (from emailconfig.md)
// =============================================

const smtpConfig = {
  host: process.env.SMTP_HOST || process.env.EMAIL_HOST || 'mail.budgetndiostory.org',
  port: parseInt(process.env.SMTP_PORT || process.env.EMAIL_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER || 'info@budgetndiostory.org',
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS || '',
  },
};

// Resend Configuration (fallback)
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Create SMTP transporter if SMTP is configured
const createSmtpTransporter = () => {
  if (!smtpConfig.host || !smtpConfig.auth.user) {
    console.log('SMTP not configured - no host or user');
    return null;
  }
  
  return nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: {
      user: smtpConfig.auth.user,
      pass: smtpConfig.auth.pass,
    },
  });
};

const smtpTransporter = createSmtpTransporter();

// =============================================
// Email Options Interface
// =============================================

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  data?: { id: string };
  error?: unknown;
}

// =============================================
// Core Send Email Function
// =============================================

export async function sendEmail({ to, subject, html, from, replyTo }: SendEmailOptions): Promise<EmailResult> {
  const defaultFrom = process.env.SMTP_FROM || process.env.DEFAULT_EMAIL_FROM || 'Budget Ndio Story <info@budgetndiostory.org>';
  const fromName = process.env.SMTP_FROM_NAME || 'Budget Ndio Story';
  const sender = from || defaultFrom;
  const replyToAddress = replyTo || 'info@budgetndiostory.org';

  // Try SMTP first if configured
  if (smtpTransporter && smtpConfig.auth.pass) {
    console.log(`[EMAIL] Attempting to send via SMTP to ${to}, host: ${smtpConfig.host}`);
    try {
      const info = await smtpTransporter.sendMail({
        from: `"${fromName}" <${smtpConfig.auth.user}>`,
        to,
        subject,
        html,
        replyTo: replyToAddress,
      });
      console.log('[EMAIL] SMTP send successful:', info.messageId);
      return { success: true, data: { id: info.messageId } };
    } catch (error) {
      console.error('[EMAIL] SMTP send error:', error);
      // Fall through to try Resend
    }
  } else {
    console.log(`[EMAIL] SMTP not available. Host: ${smtpConfig.host}, User: ${smtpConfig.auth.user}, Pass configured: ${!!smtpConfig.auth.pass}`);
  }

  // Fallback to Resend if available
  if (resend) {
    try {
      const data = await resend.emails.send({
        from: sender,
        to,
        subject,
        html,
        reply_to: replyToAddress,
      });
      console.log('Email sent via Resend:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Resend send error:', error);
      return { success: false, error };
    }
  }

  // Mock success for development if no email service is configured
  console.warn('No email service configured. Email not sent.');
  console.log(`Would have sent to: ${to}, subject: ${subject}`);
  return { success: true, data: { id: 'mock-email-id' } };
}

// =============================================
// Email Templates
// =============================================

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(email: string, name?: string): Promise<EmailResult> {
  const displayName = name || 'Friend';
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://budgetndiostory.org';
  
  const body = `
    <span class="badge">Welcome!</span>
    <h2>Welcome to Budget Ndio Story, ${displayName}! 🎉</h2>
    <p>Thank you for joining Budget Ndio Story - Kenya's civic budget transparency platform. We're excited to have you as part of our community!</p>
    <p>With Budget Ndio Story, you can:</p>
    <ul class="features">
      <li><strong>📊 Explore Budgets</strong> - View simplified national and county budgets</li>
      <li><strong>🔔 Stay Informed</strong> - Get alerts on budget developments and public participation opportunities</li>
      <li><strong>📚 Learn</strong> - Access free educational modules on budget literacy</li>
      <li><strong>📈 Track Spending</strong> - Monitor how public funds are being spent</li>
    </ul>
    <a href="${siteUrl}/learn" class="btn">Start Learning</a>
    <div class="cta-box">
      <p><strong>Want to get more involved?</strong><br/>Join our community of engaged citizens who are making a difference in Kenya's budget process.</p>
    </div>
    <p>If you have any questions, feel free to reply to this email or visit our <a href="${siteUrl}">website</a>.</p>
    <hr class="divider"/>
    <p>Best regards,<br/>The Budget Ndio Story Team</p>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to Budget Ndio Story! 🎉",
    html: emailLayout({ previewText: 'Welcome to Budget Ndio Story!', body }),
  });
}

/**
 * Send newsletter subscription confirmation
 */
export async function sendNewsletterConfirmation(email: string): Promise<EmailResult> {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://budgetndiostory.org';
  
  const body = `
    <span class="badge">Subscription Confirmed</span>
    <h2>You're Subscribed! ✅</h2>
    <p>Thank you for subscribing to the Budget Ndio Story newsletter!</p>
    <p>You'll now receive:</p>
    <ul class="features">
      <li><strong>📊 Budget Updates</strong> - Monthly summaries of national and county budgets</li>
      <li><strong>🔔 Participation Alerts</strong> - Notices about public participation opportunities</li>
      <li><strong>📚 Learning Resources</strong> - Announcements about new modules and resources</li>
      <li><strong>📰 Latest News</strong> - Stories about budget transparency in Kenya</li>
    </ul>
    <a href="${siteUrl}/news" class="btn">Browse Latest News</a>
    <p>If you didn't sign up for this newsletter, you can safely ignore this email. To unsubscribe, use the link at the bottom of any newsletter you receive.</p>
    <hr class="divider"/>
    <p>Stay engaged with Kenya's budget process!<br/>The Budget Ndio Story Team</p>
  `;

  return sendEmail({
    to: email,
    subject: "You're subscribed to Budget Ndio Story! ✅",
    html: emailLayout({ previewText: 'You are now subscribed to Budget Ndio Story', body }),
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string, resetToken: string): Promise<EmailResult> {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://budgetndiostory.org';
  const resetUrl = `${siteUrl}/auth/update-password?token=${resetToken}`;
  
  const body = `
    <span class="badge">Password Reset</span>
    <h2>Reset Your Password</h2>
    <p>We received a request to reset your Budget Ndio Story account password.</p>
    <p>Click the button below to create a new password:</p>
    <a href="${resetUrl}" class="btn">Reset Password</a>
    <p>This link will expire in 1 hour for security purposes.</p>
    <div class="cta-box">
      <p><strong>Didn't request this?</strong><br/>If you didn't request a password reset, please ignore this email or contact us immediately if you're concerned.</p>
    </div>
    <hr class="divider"/>
    <p>If the button above doesn't work, copy and paste this link into your browser:<br/>${resetUrl}</p>
    <p>The Budget Ndio Story Team</p>
  `;

  return sendEmail({
    to: email,
    subject: "Reset your Budget Ndio Story password",
    html: emailLayout({ previewText: 'Reset your password for Budget Ndio Story', body }),
  });
}

/**
 * Send donation/subscription confirmation email
 */
export async function sendDonationConfirmation(
  email: string, 
  name: string, 
  amount: number, 
  paymentMethod: string
): Promise<EmailResult> {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://budgetndiostory.org';
  const date = new Date().toLocaleDateString('en-KE', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const body = `
    <span class="badge">Donation Received</span>
    <h2>Thank You for Your Support, ${name}! 🙏</h2>
    <p>Your generous donation has been received. Every contribution helps us continue our work making Kenya's budget accessible to everyone.</p>
    
    <div style="text-align: center; margin: 24px 0;">
      <div class="amount">KES ${amount.toLocaleString()}</div>
      <p style="color: #888; font-size: 13px;">${paymentMethod}</p>
    </div>
    
    <div class="info-row">
      <span>Date</span>
      <span>${date}</span>
    </div>
    <div class="info-row">
      <span>Transaction ID</span>
      <span>DON-${Date.now()}</span>
    </div>
    <div class="info-row">
      <span>Status</span>
      <span style="color: #1E8449;">Completed</span>
    </div>
    
    <div class="cta-box">
      <p><strong>What your donation supports:</strong></p>
      <ul class="features">
        <li>Free budget literacy training for citizens</li>
        <li>Public participation in budget processes</li>
        <li>Independent budget analysis and reporting</li>
        <li>Civic technology development</li>
      </ul>
    </div>
    
    <a href="${siteUrl}/profile" class="btn">View Your Profile</a>
    <hr class="divider"/>
    <p>For any questions about your donation, please contact us at <a href="mailto:donations@budgetndiostory.org">donations@budgetndiostory.org</a></p>
    <p>With gratitude,<br/>The Budget Ndio Story Team</p>
  `;

  return sendEmail({
    to: email,
    subject: `Thank you for your donation of KES ${amount.toLocaleString()}! 🙏`,
    html: emailLayout({ previewText: `Thank you for your donation of KES ${amount.toLocaleString()}`, body }),
  });
}

/**
 * Send contact form submission confirmation to user
 */
export async function sendContactConfirmation(
  email: string, 
  name: string, 
  subject: string
): Promise<EmailResult> {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://budgetndiostory.org';
  
  const body = `
    <span class="badge">Message Received</span>
    <h2>Thank You for Reaching Out, ${name}!</h2>
    <p>We've received your message and will get back to you as soon as possible.</p>
    
    <div class="info-row">
      <span>Subject</span>
      <span>${subject}</span>
    </div>
    <div class="info-row">
      <span>Reference</span>
      <span>MSG-${Date.now().toString().slice(-8)}</span>
    </div>
    
    <div class="cta-box">
      <p><strong>What happens next?</strong></p>
      <ul class="features">
        <li>Our team will review your message within 24-48 hours</li>
        <li>You'll receive a response to your email address</li>
        <li>For urgent matters, you can also reach us at +254 700 000 000</li>
      </ul>
    </div>
    
    <p>In the meantime, explore our <a href="${siteUrl}/learn">learning resources</a> or <a href="${siteUrl}/news">latest news</a>.</p>
    <hr class="divider"/>
    <p>Best regards,<br/>The Budget Ndio Story Team</p>
  `;

  return sendEmail({
    to: email,
    subject: "We received your message - Budget Ndio Story",
    html: emailLayout({ previewText: 'We received your message', body }),
  });
}

/**
 * Send notification to admin when contact form is submitted
 */
export async function sendContactNotificationToAdmin(
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string;
  }
): Promise<EmailResult> {
  const body = `
    <span class="badge" style="background: #fee2e2; color: #dc2626;">New Contact Form Submission</span>
    <h2>New Contact Form Submission</h2>
    
    <div class="info-row">
      <span>Name</span>
      <span>${formData.name}</span>
    </div>
    <div class="info-row">
      <span>Email</span>
      <span>${formData.email}</span>
    </div>
    <div class="info-row">
      <span>Phone</span>
      <span>${formData.phone || 'Not provided'}</span>
    </div>
    <div class="info-row">
      <span>Subject</span>
      <span>${formData.subject}</span>
    </div>
    
    <h3 style="margin-top: 20px; color: #1A5276;">Message:</h3>
    <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border: 1px solid #e0e4ea;">
      ${formData.message.replace(/\n/g, '<br/>')}
    </div>
    
    <div class="cta-box" style="margin-top: 20px;">
      <a href="https://budgetndiostory.org/admin" style="color: #1A5276; font-weight: 600;">View in Admin Dashboard</a>
    </div>
  `;

  // Send to admin email configured in environment
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@budgetndiostory.org';
  
  return sendEmail({
    to: adminEmail,
    subject: `New Contact: ${formData.subject} from ${formData.name}`,
    html: emailLayout({ previewText: `New contact form submission from ${formData.name}`, body }),
  });
}

/**
 * Send email verification for new users
 */
export async function sendEmailVerification(email: string, verificationToken: string): Promise<EmailResult> {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://budgetndiostory.org';
  const verifyUrl = `${siteUrl}/auth/confirm?token=${verificationToken}`;
  
  const body = `
    <span class="badge">Verify Your Email</span>
    <h2>Verify Your Email Address</h2>
    <p>Thank you for signing up for Budget Ndio Story!</p>
    <p>Please verify your email address to activate your account:</p>
    <a href="${verifyUrl}" class="btn">Verify Email</a>
    <p>This verification link will expire in 24 hours.</p>
    <div class="cta-box">
      <p><strong>Why verify?</strong></p>
      <ul class="features">
        <li>Receive budget alerts and notifications</li>
        <li>Access personalized learning progress</li>
        <li>Comment on articles and blog posts</li>
        <li>Subscribe to newsletters</li>
      </ul>
    </div>
    <hr class="divider"/>
    <p>If the button doesn't work, copy and paste this link:<br/>${verifyUrl}</p>
    <p>The Budget Ndio Story Team</p>
  `;

  return sendEmail({
    to: email,
    subject: "Verify your email for Budget Ndio Story",
    html: emailLayout({ previewText: 'Verify your email address', body }),
  });
}

/**
 * Send notification when user subscribes to a blog/newsletter
 */
export async function sendSubscriptionNotification(email: string, subscriptionType: string): Promise<EmailResult> {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://budgetndiostory.org';
  
  let typeLabel = '';
  let features = '';
  
  switch (subscriptionType) {
    case 'news':
      typeLabel = 'News Updates';
      features = `
        <li>📰 Breaking news on budget developments</li>
        <li>🔍 Investigative journalism pieces</li>
        <li>📊 Data-driven analysis</li>
      `;
      break;
    case 'blogs':
      typeLabel = 'Blog Posts';
      features = `
        <li>✍️ Opinion pieces from experts</li>
        <li>📚 Educational content</li>
        <li>💡 Innovation in civic tech</li>
      `;
      break;
    case 'reports':
      typeLabel = 'Budget Reports';
      features = `
        <li>📊 Monthly budget summaries</li>
        <li>🔍 Spending analysis</li>
        <li>📈 Trend reports</li>
      `;
      break;
    case 'all':
    default:
      typeLabel = 'All Updates';
      features = `
        <li>📰 News and investigations</li>
        <li>📊 Budget reports</li>
        <li>📚 Learning resources</li>
        <li>🔔 Participation alerts</li>
      `;
  }
  
  const body = `
    <span class="badge">Subscription Confirmed</span>
    <h2>You're Subscribed to ${typeLabel}! 📬</h2>
    <p>You've successfully subscribed to receive ${typeLabel.toLowerCase()} from Budget Ndio Story.</p>
    <p>Expect to receive:</p>
    <ul class="features">
      ${features}
    </ul>
    <a href="${siteUrl}/profile" class="btn">Manage Subscriptions</a>
    <p>You can update your preferences or unsubscribe at any time from your profile settings.</p>
    <hr class="divider"/>
    <p>Stay informed about Kenya's budget process!<br/>The Budget Ndio Story Team</p>
  `;

  return sendEmail({
    to: email,
    subject: `You're subscribed to ${typeLabel} - Budget Ndio Story`,
    html: emailLayout({ previewText: `Subscription confirmed for ${typeLabel}`, body }),
  });
}

// =============================================
// Utility Functions
// =============================================

/**
 * Test SMTP connection
 */
export async function testSmtpConnection(): Promise<boolean> {
  if (!smtpTransporter || !smtpConfig.auth.pass) {
    console.log('SMTP not configured - cannot test connection');
    return false;
  }

  try {
    await smtpTransporter.verify();
    console.log('SMTP connection successful');
    return true;
  } catch (error) {
    console.error('SMTP connection failed:', error);
    return false;
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Send bulk emails (for newsletters, etc.)
 */
export async function sendBulkEmails(
  recipients: string[], 
  subject: string, 
  bodyContent: string
): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;
  
  for (const email of recipients) {
    if (!isValidEmail(email)) {
      console.log(`Invalid email: ${email}`);
      failed++;
      continue;
    }
    
    const result = await sendEmail({
      to: email,
      subject,
      html: emailLayout({ body: bodyContent }),
    });
    
    if (result.success) {
      sent++;
    } else {
      failed++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return { sent, failed };
}