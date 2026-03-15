"use client";

import { Heart, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DonateSuccessView({
  amount,
  paymentMethod,
  onMakeAnother,
}: {
  amount: number;
  paymentMethod: string;
  onMakeAnother: () => void;
}) {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary mb-6">
        <Heart className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">Thank you</h2>
      <p className="text-muted-foreground mb-4">
        Your donation of{" "}
        <span className="font-semibold text-foreground">
          KSh {amount.toLocaleString()}
        </span>{" "}
        helps us keep Kenya’s budget transparent and accessible to everyone.
      </p>
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
        <CheckCircle className="h-4 w-4 text-primary" />
        <span>Payment via {paymentMethod === "mpesa" ? "M-Pesa" : "Card"} initiated</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" onClick={onMakeAnother} className="rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Make another donation
        </Button>
        <Button asChild className="rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
