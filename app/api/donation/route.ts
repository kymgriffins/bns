import { NextRequest, NextResponse } from "next/server";
import { sendDonationConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donor_name, donor_email, amount, payment_method, is_recurring } = body;

    // Validate required fields
    if (!donor_email || !donor_email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valid donation amount is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donor_email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Process donation (in production, integrate with Stripe/M-Pesa here)
    const donationId = `DON-${Date.now()}`;
    
    // Determine payment method label
    const paymentMethodLabel = payment_method === 'mpesa' 
      ? 'M-Pesa' 
      : payment_method === 'stripe' 
        ? 'Credit/Debit Card' 
        : payment_method || 'Unknown';

    // Send confirmation email to donor
    const name = donor_name || 'Supporter';
    const emailResult = await sendDonationConfirmation(
      donor_email,
      name,
      amount,
      is_recurring ? `Monthly ${paymentMethodLabel}` : `One-time ${paymentMethodLabel}`
    );

    if (!emailResult.success) {
      console.error("Failed to send donation confirmation email:", emailResult.error);
      // Don't fail the donation - just log the error
    }

    // Log the donation for analytics
    console.log(`New donation received: ${donationId}, Amount: KES ${amount}, Email: ${donor_email}`);

    return NextResponse.json(
      { 
        success: true, 
        message: "Donation processed successfully",
        donation_id: donationId,
        email_sent: emailResult.success
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Donation processing error:", error);
    return NextResponse.json(
      { error: "Failed to process donation" },
      { status: 500 }
    );
  }
}

// Handle GET requests for testing or donation status check
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      message: "Budget Ndio Story Donation API",
      supported_methods: ["mpesa", "stripe"],
      currency: "KES",
      status: "active"
    },
    { status: 200 }
  );
}