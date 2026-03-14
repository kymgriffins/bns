// Re-export all email functions from the email module
// This maintains backward compatibility with existing code that imports from lib/resend.ts

export {
  sendEmail,
  sendWelcomeEmail,
  sendNewsletterConfirmation,
  sendPasswordResetEmail,
  sendDonationConfirmation,
  sendContactConfirmation,
  sendContactNotificationToAdmin,
  sendEmailVerification,
  sendSubscriptionNotification,
  testSmtpConnection,
  isValidEmail,
  sendBulkEmails,
  emailLayout,
} from './email';

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