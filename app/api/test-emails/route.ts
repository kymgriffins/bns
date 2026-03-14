import { NextRequest, NextResponse } from "next/server";
import { 
  sendWelcomeEmail, 
  sendNewsletterConfirmation, 
  sendPasswordResetEmail, 
  sendDonationConfirmation,
  sendContactConfirmation,
  sendEmailVerification,
  sendSubscriptionNotification
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const results: { type: string; success: boolean; error?: string }[] = [];

    // Test 1: Welcome Email
    try {
      const result = await sendWelcomeEmail(email, "Test User");
      results.push({ type: "welcome", success: result.success, error: result.error as string });
    } catch (e) {
      results.push({ type: "welcome", success: false, error: String(e) });
    }

    // Wait a bit between emails to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));

    // Test 2: Newsletter Confirmation
    try {
      const result = await sendNewsletterConfirmation(email);
      results.push({ type: "newsletter", success: result.success, error: result.error as string });
    } catch (e) {
      results.push({ type: "newsletter", success: false, error: String(e) });
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Test 3: Password Reset
    try {
      const result = await sendPasswordResetEmail(email, "test-reset-token-123");
      results.push({ type: "password_reset", success: result.success, error: result.error as string });
    } catch (e) {
      results.push({ type: "password_reset", success: false, error: String(e) });
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Test 4: Donation Confirmation
    try {
      const result = await sendDonationConfirmation(email, "Test Donor", 25000, "M-Pesa");
      results.push({ type: "donation", success: result.success, error: result.error as string });
    } catch (e) {
      results.push({ type: "donation", success: false, error: String(e) });
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Test 5: Contact Confirmation
    try {
      const result = await sendContactConfirmation(email, "Test User", "Test Subject");
      results.push({ type: "contact", success: result.success, error: result.error as string });
    } catch (e) {
      results.push({ type: "contact", success: false, error: String(e) });
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Test 6: Email Verification
    try {
      const result = await sendEmailVerification(email, "test-verification-token-456");
      results.push({ type: "email_verification", success: result.success, error: result.error as string });
    } catch (e) {
      results.push({ type: "email_verification", success: false, error: String(e) });
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Test 7: Subscription Notification
    try {
      const result = await sendSubscriptionNotification(email, "all");
      results.push({ type: "subscription", success: result.success, error: result.error as string });
    } catch (e) {
      results.push({ type: "subscription", success: false, error: String(e) });
    }

    const allSuccessful = results.every(r => r.success);

    return NextResponse.json(
      { 
        success: allSuccessful,
        message: allSuccessful 
          ? `All 7 test emails sent to ${email}` 
          : `Some emails failed. Check results for details.`,
        results,
        email
      },
      { status: allSuccessful ? 200 : 500 }
    );
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json(
      { error: "Failed to send test emails" },
      { status: 500 }
    );
  }
}

// Handle GET requests - return info about the endpoint
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      message: "Budget Ndio Story Email Test API",
      usage: "POST with { email: 'your@email.com' } to send all test emails",
      email_types: [
        "welcome",
        "newsletter", 
        "password_reset",
        "donation",
        "contact",
        "email_verification",
        "subscription"
      ]
    },
    { status: 200 }
  );
}