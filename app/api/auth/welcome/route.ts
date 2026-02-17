import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/resend";

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

    // Send welcome email via Resend
    const result = await sendWelcomeEmail(email);

    if (!result.success) {
      console.error("Failed to send welcome email:", result.error);
      return NextResponse.json(
        { error: "Failed to send welcome email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Welcome email sent successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Welcome email error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
