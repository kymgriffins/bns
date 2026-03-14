import { NextRequest, NextResponse } from "next/server";
import { sendContactConfirmation, sendContactNotificationToAdmin } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, phone } = body;

    // Validate required fields
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!subject || subject.trim().length === 0) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Send confirmation email to user
    const userConfirmationResult = await sendContactConfirmation(email, name, subject);

    if (!userConfirmationResult.success) {
      console.error("Failed to send user confirmation email:", userConfirmationResult.error);
      // Don't fail the submission - just log the error
    }

    // Send notification to admin
    const adminNotificationResult = await sendContactNotificationToAdmin({
      name,
      email,
      subject,
      message,
      phone: phone || undefined
    });

    if (!adminNotificationResult.success) {
      console.error("Failed to send admin notification:", adminNotificationResult.error);
    }

    // Log the contact form submission
    console.log(`New contact form submission: ${name} (${email}), Subject: ${subject}`);

    return NextResponse.json(
      { 
        success: true, 
        message: "Your message has been received. We'll get back to you soon!",
        email_sent: userConfirmationResult.success
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process your message" },
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      message: "Budget Ndio Story Contact API",
      status: "active"
    },
    { status: 200 }
  );
}