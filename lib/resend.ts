// Re-export email functions from the new email module
// This maintains backward compatibility with existing code that imports from lib/resend.ts

export { sendEmail, sendWelcomeEmail, sendNewsletterConfirmation, testSmtpConnection } from './email';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}
