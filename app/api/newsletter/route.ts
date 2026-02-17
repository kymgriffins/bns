import { NextRequest, NextResponse } from "next/server";
import { sendNewsletterConfirmation } from "@/lib/resend";

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

    // Send confirmation email via Resend
    const result = await sendNewsletterConfirmation(email);

    if (!result.success) {
      console.error("Failed to send newsletter confirmation:", result.error);
      return NextResponse.json(
        { error: "Failed to send confirmation email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
