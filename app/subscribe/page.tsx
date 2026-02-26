"use client";

import { useState } from "react";
import { Heart, Shield, CheckCircle, Mail, Phone, MapPin, Globe, ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Amount options for donation (minimum 10,000, max 100,000)
const AMOUNT_OPTIONS = [
  { amount: 10000, label: "KSh 10,000" },
  { amount: 25000, label: "KSh 25,000" },
  { amount: 50000, label: "KSh 50,000" },
  { amount: 100000, label: "KSh 100,000" },
];

type PaymentMethod = "mpesa" | "stripe";

export default function SubscribePage() {
  const [donationType, setDonationType] = useState<"one-time" | "recurring">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; amount?: string }>({});

  // Get the final amount
  const getFinalAmount = (): number => {
    if (customAmount) return parseFloat(customAmount) || 0;
    return selectedAmount;
  };

  // Validate amount (minimum 10,000 for preset selection)
  const validateAmount = (amount: number): boolean => {
    return amount > 0;
  };

  // Validate form
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

  // Handle donation submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Donation submitted:", {
      type: donationType,
      amount: getFinalAmount(),
      paymentMethod,
      name: donorName,
      email: donorEmail,
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // Success state
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Side - Company Details (60%) */}
          <div className="lg:w-[60%] p-8 lg:p-16 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
            <div className="max-w-lg text-center lg:text-left">
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Thank You!</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                Your donation of <span className="font-semibold text-blue-600">KSh {getFinalAmount().toLocaleString()}</span> helps us continue our mission of making Kenya's budget transparent and accessible to all citizens.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-neutral-500">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Payment via {paymentMethod === "mpesa" ? "M-Pesa" : "Card"} initiated</span>
              </div>
            </div>
          </div>

          {/* Right Side - Donation Form (40%) */}
          <div className="lg:w-[40%] p-8 flex items-center justify-center bg-white dark:bg-black border-l border-neutral-200 dark:border-neutral-800">
            <div className="text-center">
              <Button
                onClick={() => {
                  setIsSuccess(false);
                  setDonorName("");
                  setDonorEmail("");
                  setCustomAmount("");
                }}
                variant="outline"
                className="mb-4"
              >
                Make Another Donation
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Company Details (60%) */}
        <div className="lg:w-[60%] p-8 lg:p-16 flex items-center justify-center bg-white dark:bg-black">
          <div className="max-w-xl">
            {/* Logo & Title */}
            <div className="text-center lg:text-left mb-8">
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Support Budget Transparency in Kenya
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                We're making Kenya's national and county budgets accessible to every citizen. 
                Your support helps us continue this vital work.
              </p>
              <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-6">
                Our gift today will empower, inspire, and connect the next generation of changemakers. 
                Let's never stop moving toward the world we want. Make your gift today!
              </p>
            </div>

            {/* Video Section */}
            <div className="mb-8 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-64 object-cover"
              >
                <source src="/bnsoo1.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Contact & Legal */}
            <div className="text-sm text-neutral-500">
              <p className="mb-2">Questions? <a href="mailto:info@budgetndiostory.ke" className="underline hover:text-blue-600">Contact us by email</a></p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="hover:text-blue-600">Solicitation Disclosures</a>
                <a href="#" className="hover:text-blue-600">Privacy Statement</a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@budgetndiostory.ke</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+254 711 106 814</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Donation Form (40%) */}
        <div className="lg:w-[40%] p-6 lg:p-8 flex items-center justify-center bg-white dark:bg-black border-l border-neutral-200 dark:border-neutral-800">
          <div className="w-full max-w-xs">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold">Make a Donation</h2>
              <p className="text-sm text-neutral-500">Support our mission</p>
            </div>

            {/* Donation Type Toggle */}
            <div className="flex rounded-lg bg-neutral-100 dark:bg-neutral-900 p-1 mb-6">
              <button
                type="button"
                onClick={() => setDonationType("one-time")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                  donationType === "one-time"
                    ? "bg-white dark:bg-black shadow-sm text-black dark:text-white"
                    : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
              >
                One-Time
              </button>
              <button
                type="button"
                onClick={() => setDonationType("recurring")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                  donationType === "recurring"
                    ? "bg-white dark:bg-black shadow-sm text-black dark:text-white"
                    : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-4">
              <Label className="text-sm font-medium mb-2 block">Payment Method</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("mpesa")}
                  className={`py-3 px-3 text-sm font-medium rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === "mpesa"
                      ? "border-green-600 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300"
                      : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  M-Pesa
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("stripe")}
                  className={`py-3 px-3 text-sm font-medium rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === "stripe"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300"
                      : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Card
                </button>
              </div>
            </div>

            {/* Amount Selector */}
            <div className="mb-4">
              <Label className="text-sm font-medium mb-2 block">Select Amount</Label>
              <div className="grid grid-cols-2 gap-2">
                {AMOUNT_OPTIONS.map((option) => (
                  <button
                    key={option.amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(option.amount);
                      setCustomAmount("");
                    }}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border-2 transition-all ${
                      selectedAmount === option.amount && !customAmount
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300"
                        : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-4">
              <Label htmlFor="custom-amount" className="text-sm font-medium mb-2 block">
                Or enter custom amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">
                  KSh
                </span>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    if (e.target.value) setSelectedAmount(0);
                  }}
                  className="pl-12 h-10 text-sm rounded-lg"
                />
              </div>
              {errors.amount && (
                <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Donor Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-sm font-medium mb-1 block">
                  Your Name (optional)
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="h-10 text-sm rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium mb-1 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className={`h-10 text-sm rounded-lg ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Submit Button - Black Background */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 mt-4 text-sm font-medium rounded-lg bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Donate KSh {getFinalAmount().toLocaleString()}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-1 mt-4 text-xs text-neutral-500">
              <Shield className="w-3 h-3" />
              <span>Secure payment via {paymentMethod === "mpesa" ? "M-Pesa" : "Stripe"}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
