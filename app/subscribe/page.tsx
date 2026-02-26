"use client";

import { useState } from "react";
import {
  Heart,
  Crown,
  Sparkles,
  Phone,
  CreditCard,
  Shield,
  Star,
  Zap,
  Gift,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

// Types
type PaymentMethod = "mpesa" | "stripe" | null;

// Constants
const ONE_TIME_AMOUNTS = [
{ amount: 1000, label: "KSh 1000/mo", popular: false },
  { amount: 2500, label: "KSh 2,500/mo", popular: true },
  { amount: 5000, label: "KSh 5,000/mo", popular: false },
  { amount: 10000, label: "KSh 10,000/mo", popular: false },
];

const RECURRING_AMOUNTS = [
  { amount: 1000, label: "KSh 1000/mo", popular: false },
  { amount: 2500, label: "KSh 2,500/mo", popular: false },
  { amount: 5000, label: "KSh 5,000/mo", popular: false },
  { amount: 10000, label: "KSh 10,000/mo", popular: true },
];

const PREMIUM_PERKS = [
  {
    icon: Crown,
    title: "VIP Recognition",
    description: "Get featured as a Premium Supporter on our Wall of Heroes",
  },
  {
    icon: Zap,
    title: "Early Access",
    description: "Be the first to access new reports and analysis before public release",
  },
  {
    icon: Gift,
    title: "Exclusive Content",
    description: "Receive detailed breakdowns and insights not available to the public",
  },
  {
    icon: Users,
    title: "Direct Access",
    description: "Priority access to our team for questions and clarifications",
  },
];

export default function DonationPage() {
  // State for donation form
  const [donationType, setDonationType] = useState<"one-time" | "recurring">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  // M-Pesa specific fields
  const [mpesaPhone, setMpesaPhone] = useState("");

  // Stripe specific fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  // Helper to get final amount
  const getFinalAmount = (): number => {
    if (customAmount) return parseFloat(customAmount) || 0;
    if (selectedAmount) return selectedAmount;
    return 0;
  };

  // Open modal for a specific payment method
  const openPaymentModal = (method: PaymentMethod) => {
    if (getFinalAmount() === 0) {
      alert("Please select or enter a donation amount.");
      return;
    }
    setPaymentMethod(method);
    setIsModalOpen(true);
  };

  // Handle donation submission (mock)
  const handleDonate = () => {
    // Here you would integrate with actual payment APIs
    console.log("Donation submitted", {
      type: donationType,
      amount: getFinalAmount(),
      method: paymentMethod,
      donor: anonymous ? null : { name: donorName, email: donorEmail, phone: donorPhone },
      paymentDetails:
        paymentMethod === "mpesa"
          ? { phone: mpesaPhone }
          : { cardNumber, cardExpiry, cardCvc, cardName },
    });
    setIsModalOpen(false);
    // Reset form or show success message
    alert(`Thank you for your donation of KSh ${getFinalAmount()}!`);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Premium Banner */}
      <section className="py-2 px-4 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Become a Premium Supporter & enjoy exclusive benefits!</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Main Donation Section */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Tabs
            defaultValue="one-time"
            onValueChange={(value) => setDonationType(value as "one-time" | "recurring")}
            className="w-full"
          >
            <div className="flex justify-center mb-10">
              <TabsList className="grid w-full max-w-md grid-cols-2 h-14 p-1 bg-neutral-100 dark:bg-neutral-900">
                <TabsTrigger
                  value="one-time"
                  className="text-base h-12 data-[state=active]:bg-white dark:data-[state=active]:bg-black data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  One-Time Donation
                </TabsTrigger>
                <TabsTrigger
                  value="recurring"
                  className="text-base h-12 data-[state=active]:bg-white dark:data-[state=active]:bg-black data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Monthly Supporter
                </TabsTrigger>
              </TabsList>
            </div>

            {/* One-Time Tab */}
            <TabsContent value="one-time" className="space-y-10">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Left Column: Amount Selection */}
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-xl font-semibold mb-2">Choose your amount</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Every contribution makes a difference
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {ONE_TIME_AMOUNTS.map((item) => (
                      <button
                        key={item.amount}
                        onClick={() => {
                          setSelectedAmount(item.amount);
                          setCustomAmount("");
                        }}
                        className={`relative p-4 rounded-2xl border-2 transition-all duration-200 ${
                          selectedAmount === item.amount
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                            : "border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-700"
                        } ${item.popular ? "ring-2 ring-blue-600/20" : ""}`}
                      >
                        {item.popular && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                            POPULAR
                          </span>
                        )}
                        <span
                          className={`font-bold text-lg ${
                            selectedAmount === item.amount ? "text-blue-700 dark:text-blue-300" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="custom-amount" className="text-base">
                      Or enter custom amount
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">
                        KSh
                      </span>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                        className="pl-14 h-12 text-lg rounded-xl border-2 focus:border-blue-600 bg-white dark:bg-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Payment Methods */}
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-xl font-semibold mb-2">Select payment method</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Secure and convenient
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* M-Pesa Card */}
                    <div
                      onClick={() => openPaymentModal("mpesa")}
                      className="p-5 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-blue-600 dark:hover:border-blue-600 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400">M-Pesa</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Pay via STK Push
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stripe Card */}
                    <div
                      onClick={() => openPaymentModal("stripe")}
                      className="p-5 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-blue-600 dark:hover:border-blue-600 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400">Card Payment</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Visa, Mastercard, AMEX
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donor Information (common) */}
              <div className="mt-8 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-lg font-semibold mb-4">Your information (optional)</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="bg-white dark:bg-black border-neutral-300 dark:border-neutral-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="bg-white dark:bg-black border-neutral-300 dark:border-neutral-700"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="rounded border-neutral-300 dark:border-neutral-700 text-blue-600 focus:ring-blue-600"
                  />
                  <Label htmlFor="anonymous" className="text-sm text-neutral-600 dark:text-neutral-400">
                    Make my donation anonymous
                  </Label>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                <Shield className="w-4 h-4" />
                <span>Secure payment powered by Stripe & M-Pesa</span>
              </div>
            </TabsContent>

            {/* Recurring Tab */}
            <TabsContent value="recurring" className="space-y-10">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Left Column: Monthly Amount */}
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-xl font-semibold mb-2">Choose monthly support</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Become a monthly champion
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {RECURRING_AMOUNTS.map((item) => (
                      <button
                        key={item.amount}
                        onClick={() => {
                          setSelectedAmount(item.amount);
                          setCustomAmount("");
                        }}
                        className={`relative p-4 rounded-2xl border-2 transition-all duration-200 ${
                          selectedAmount === item.amount
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                            : "border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-700"
                        } ${item.popular ? "ring-2 ring-blue-600/20" : ""}`}
                      >
                        {item.popular && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                            BEST VALUE
                          </span>
                        )}
                        <span
                          className={`font-bold text-lg ${
                            selectedAmount === item.amount ? "text-blue-700 dark:text-blue-300" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800 dark:text-blue-300">
                          Why become a monthly supporter?
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                          Monthly supporters help us plan long-term and maximize our impact. You'll also
                          enjoy exclusive perks!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Premium Perks */}
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-xl font-semibold mb-2">Premium supporter benefits</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Join our community of champions
                    </p>
                  </div>

                  <div className="space-y-4">
                    {PREMIUM_PERKS.map((perk, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                          <perk.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{perk.title}</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">{perk.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Methods for Recurring */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Select payment method</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {/* M-Pesa Auto-Pay */}
                  <div
                    onClick={() => openPaymentModal("mpesa")}
                    className="p-5 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-blue-600 dark:hover:border-blue-600 transition-all cursor-pointer text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-3">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">M-Pesa Auto-Pay</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Monthly deduction</p>
                  </div>

                  {/* Stripe Auto-Pay */}
                  <div
                    onClick={() => openPaymentModal("stripe")}
                    className="p-5 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-blue-600 dark:hover:border-blue-600 transition-all cursor-pointer text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">Card Auto-Pay</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Monthly deduction</p>
                  </div>
                </div>
              </div>

              {/* Donor Information for Recurring */}
              <div className="mt-8 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-lg font-semibold mb-4">Your information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recurring-name">Full name</Label>
                    <Input
                      id="recurring-name"
                      placeholder="John Doe"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="bg-white dark:bg-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recurring-email">Email address</Label>
                    <Input
                      id="recurring-email"
                      type="email"
                      placeholder="john@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="bg-white dark:bg-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recurring-phone">Phone number</Label>
                    <Input
                      id="recurring-phone"
                      placeholder="2547XXXXXXXX"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="bg-white dark:bg-black"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                <Shield className="w-4 h-4" />
                <span>Cancel anytime. No hidden fees.</span>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Payment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {paymentMethod === "mpesa" ? "Pay with M-Pesa" : "Pay with Card"}
            </DialogTitle>
            <DialogDescription className="text-neutral-600 dark:text-neutral-400">
              {donationType === "one-time"
                ? `One-time donation of KSh ${getFinalAmount()}`
                : `Monthly donation of KSh ${getFinalAmount()}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {paymentMethod === "mpesa" ? (
              // M-Pesa Form
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mpesa-phone">M-Pesa phone number</Label>
                  <Input
                    id="mpesa-phone"
                    placeholder="2547XXXXXXXX"
                    value={mpesaPhone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                    className="bg-white dark:bg-black border-neutral-300 dark:border-neutral-700"
                  />
                  <p className="text-xs text-neutral-500">
                    You will receive an STK push on this number to complete payment.
                  </p>
                </div>
              </div>
            ) : (
              // Stripe Form
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="bg-white dark:bg-black border-neutral-300 dark:border-neutral-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="card-expiry">Expiry (MM/YY)</Label>
                    <Input
                      id="card-expiry"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="bg-white dark:bg-black border-neutral-300 dark:border-neutral-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-cvc">CVC</Label>
                    <Input
                      id="card-cvc"
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="bg-white dark:bg-black border-neutral-300 dark:border-neutral-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-name">Name on card</Label>
                  <Input
                    id="card-name"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="bg-white dark:bg-black border-neutral-300 dark:border-neutral-700"
                  />
                </div>
              </div>
            )}

            {/* Donor summary (if not anonymous) */}
            {!anonymous && (donorName || donorEmail) && (
              <div className="mt-4 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg text-sm">
                <p className="font-medium mb-1">Donor information</p>
                {donorName && <p>Name: {donorName}</p>}
                {donorEmail && <p>Email: {donorEmail}</p>}
                {donorPhone && <p>Phone: {donorPhone}</p>}
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDonate} className="bg-blue-600 hover:bg-blue-700 text-white">
              Donate KSh {getFinalAmount()}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Thank You Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="w-12 h-12 mx-auto text-blue-600 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Thank you for your support!</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Your generosity helps us continue our mission of making budget information accessible to all
            Kenyans. Together, we can build a more transparent and accountable Kenya.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" size="lg" className="rounded-xl">
                Return Home
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}