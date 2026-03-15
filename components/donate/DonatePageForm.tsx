"use client";

import { useState } from "react";
import {
  Heart,
  Shield,
  ArrowRight,
  CreditCard,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AMOUNT_OPTIONS = [
  { amount: 10000, label: "KSh 10,000" },
  { amount: 25000, label: "KSh 25,000" },
  { amount: 50000, label: "KSh 50,000" },
  { amount: 100000, label: "KSh 100,000" },
];

type PaymentMethod = "mpesa" | "stripe";

export function DonatePageForm({
  onSuccess,
}: {
  onSuccess: (amount: number, paymentMethod: PaymentMethod) => void;
}) {
  const [donationType, setDonationType] = useState<"one-time" | "recurring">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; amount?: string }>({});

  const getFinalAmount = (): number => {
    if (customAmount) return parseFloat(customAmount) || 0;
    return selectedAmount;
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; amount?: string } = {};
    if (!donorEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
      newErrors.email = "Please enter a valid email";
    }
    const amount = getFinalAmount();
    if (amount <= 0) {
      newErrors.amount = "Please select or enter an amount";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donor_name: donorName,
          donor_email: donorEmail,
          amount: getFinalAmount(),
          payment_method: paymentMethod,
          is_recurring: donationType === "recurring",
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to process donation");
      onSuccess(getFinalAmount(), paymentMethod);
    } catch (err) {
      console.error(err);
      setErrors({ amount: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary mb-4">
          <Heart className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Make a donation</h2>
        <p className="text-sm text-muted-foreground mt-1">One-time or monthly — you choose.</p>
      </div>

      <div className="flex rounded-xl bg-muted/80 p-1 mb-6">
        <button
          type="button"
          onClick={() => setDonationType("one-time")}
          className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all ${
            donationType === "one-time"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          One-time
        </button>
        <button
          type="button"
          onClick={() => setDonationType("recurring")}
          className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all ${
            donationType === "recurring"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Monthly
        </button>
      </div>

      <div className="mb-4">
        <Label className="text-sm font-medium mb-2 block">Payment method</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod("mpesa")}
            className={`py-3 px-3 text-sm font-medium rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
              paymentMethod === "mpesa"
                ? "border-emerald-600 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            <Phone className="h-4 w-4" />
            M-Pesa
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("stripe")}
            className={`py-3 px-3 text-sm font-medium rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
              paymentMethod === "stripe"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            <CreditCard className="h-4 w-4" />
            Card
          </button>
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-sm font-medium mb-2 block">Amount</Label>
        <div className="grid grid-cols-2 gap-2">
          {AMOUNT_OPTIONS.map((opt) => (
            <button
              key={opt.amount}
              type="button"
              onClick={() => {
                setSelectedAmount(opt.amount);
                setCustomAmount("");
              }}
              className={`py-2.5 px-3 text-sm font-medium rounded-xl border-2 transition-all ${
                selectedAmount === opt.amount && !customAmount
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="custom-amount" className="text-sm font-medium mb-2 block">
          Or custom amount (KSh)
        </Label>
        <Input
          id="custom-amount"
          type="number"
          placeholder="Enter amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            if (e.target.value) setSelectedAmount(0);
          }}
          className="h-11 rounded-xl"
        />
        {errors.amount && (
          <p className="text-xs text-destructive mt-1">{errors.amount}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="donate-name" className="text-sm font-medium mb-1 block">
            Name (optional)
          </Label>
          <Input
            id="donate-name"
            type="text"
            placeholder="Your name"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>
        <div>
          <Label htmlFor="donate-email" className="text-sm font-medium mb-1 block">
            Email
          </Label>
          <Input
            id="donate-email"
            type="email"
            placeholder="you@example.com"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            className={`h-11 rounded-xl ${errors.email ? "border-destructive" : ""}`}
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl font-semibold transition-transform duration-200 active:scale-[0.98]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Donate KSh {getFinalAmount().toLocaleString()}
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground">
        <Shield className="h-3.5 w-3.5" />
        <span>Secure payment via {paymentMethod === "mpesa" ? "M-Pesa" : "Stripe"}</span>
      </div>
    </div>
  );
}
