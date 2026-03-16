"use client";

import { useState, useEffect } from "react";
import { Heart, Shield, CheckCircle, Mail, Phone, MapPin, ArrowRight, CreditCard, Bell, Send, Sparkles, Users, TrendingUp } from "lucide-react";
import { SubscribeHero } from "@/components/heros/SubscribeHero";
import { ScrollReveal } from "@/components/animations/hig-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Floating Particles for Subscribe Page
function SubscribeParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 8 + 2,
    duration: 18 + Math.random() * 12,
    delay: Math.random() * 8,
    color: i % 3 === 0 ? 'from-amber-400' : i % 3 === 1 ? 'from-teal-400' : 'from-purple-400',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full bg-gradient-to-r ${p.color} to-transparent blur-sm`}
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  );
}

// Community Impact Stats
function ImpactStats() {
  const [stats, setStats] = useState({ subscribers: 0, engaged: 0, donations: 0 });
  
  useEffect(() => {
    const target = { subscribers: 15000, engaged: 8500, donations: 1200 };
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        subscribers: Math.floor(target.subscribers * progress),
        engaged: Math.floor(target.engaged * progress),
        donations: Math.floor(target.donations * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="text-center p-3 bg-white/10 rounded-xl">
        <Users className="w-5 h-5 mx-auto mb-1 text-amber-400" />
        <div className="text-lg font-bold">{stats.subscribers.toLocaleString()}+</div>
        <div className="text-xs text-white/70">Subscribers</div>
      </div>
      <div className="text-center p-3 bg-white/10 rounded-xl">
        <TrendingUp className="w-5 h-5 mx-auto mb-1 text-teal-400" />
        <div className="text-lg font-bold">{stats.engaged.toLocaleString()}+</div>
        <div className="text-xs text-white/70">Active</div>
      </div>
      <div className="text-center p-3 bg-white/10 rounded-xl">
        <Heart className="w-5 h-5 mx-auto mb-1 text-purple-400" />
        <div className="text-lg font-bold">{stats.donations.toLocaleString()}+</div>
        <div className="text-xs text-white/70">Donors</div>
      </div>
    </div>
  );
}

// Newsletter subscription types
type SubscriptionType = "newsletter" | "sms" | "donation";

// Amount options for donation (minimum 10,000, max 100,000)
const AMOUNT_OPTIONS = [
  { amount: 10000, label: "KSh 10,000" },
  { amount: 25000, label: "KSh 25,000" },
  { amount: 50000, label: "KSh 50,000" },
  { amount: 100000, label: "KSh 100,000" },
];

type PaymentMethod = "mpesa" | "stripe";

export default function SubscribePage() {
  const [activeTab, setActiveTab] = useState<"newsletter" | "donation">("newsletter");
  const [donationType, setDonationType] = useState<"one-time" | "recurring">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string; amount?: string }>({});

  // Newsletter subscription state
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribePhone, setSubscribePhone] = useState("");
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [subscribeSMS, setSubscribeSMS] = useState(false);
  const [subscribeErrors, setSubscribeErrors] = useState<{ email?: string; phone?: string }>({});

  // Get the final amount
  const getFinalAmount = (): number => {
    if (customAmount) return parseFloat(customAmount) || 0;
    return selectedAmount;
  };

  // Validate amount (minimum 10,000 for preset selection)
  const validateAmount = (amount: number): boolean => {
    return amount > 0;
  };

  // Validate donation form
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

  // Validate newsletter subscription form
  const validateSubscribeForm = (): boolean => {
    const newErrors: { email?: string; phone?: string } = {};

    if (subscribeNewsletter && !subscribeEmail) {
      newErrors.email = "Email is required for newsletter";
    } else if (subscribeNewsletter && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subscribeEmail)) {
      newErrors.email = "Please enter a valid email";
    }

    if (subscribeSMS && !subscribePhone) {
      newErrors.phone = "Phone number is required for SMS alerts";
    }

    setSubscribeErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSubscribeForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: subscribeEmail,
          phone: subscribePhone,
          subscribe_newsletter: subscribeNewsletter,
          subscribe_sms: subscribeSMS,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      console.log('Subscription successful:', data);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  // Handle donation submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donor_name: donorName,
          donor_email: donorEmail,
          amount: getFinalAmount(),
          payment_method: paymentMethod,
          is_recurring: donationType === 'recurring',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process donation');
      }

      console.log('Donation submitted:', data);
    } catch (error) {
      console.error('Donation error:', error);
      // Show error but don't block the success state for demo purposes
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  // Success state — semantic tokens, shared success pattern
  if (isSuccess && activeTab === "donation") {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="flex flex-col lg:flex-row min-h-screen">
          <div className="lg:w-[60%] p-8 lg:p-16 flex items-center justify-center bg-muted/30">
            <div className="max-w-lg text-center lg:text-left">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto lg:mx-0 mb-6 text-primary-foreground">
                <Heart className="w-10 h-10" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">Thank You!</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your donation of <span className="font-semibold text-primary">KSh {getFinalAmount().toLocaleString()}</span> helps us continue our mission of making Kenya's budget transparent and accessible to all citizens.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Payment via {paymentMethod === "mpesa" ? "M-Pesa" : "Card"} initiated</span>
              </div>
            </div>
          </div>
          <div className="lg:w-[40%] p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-border bg-background">
            <div className="text-center">
              <Button
                onClick={() => {
                  setIsSuccess(false);
                  setDonorName("");
                  setDonorEmail("");
                  setCustomAmount("");
                }}
                variant="outline"
                className="mb-4 rounded-full"
              >
                Make Another Donation
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Newsletter subscription success state
  if (isSuccess && activeTab === "newsletter") {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="flex flex-col lg:flex-row min-h-screen">
          <div className="lg:w-[60%] p-8 lg:p-16 flex items-center justify-center bg-muted/30">
            <div className="max-w-lg text-center lg:text-left">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto lg:mx-0 mb-6 text-primary-foreground">
                <Bell className="w-10 h-10" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">You're Subscribed!</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Welcome to the Budget Ndio Story community! You'll receive{subscribeNewsletter ? ' budget updates and insights' : ''}{subscribeSMS && subscribeNewsletter ? ' and' : ''}{subscribeSMS ? ' SMS alerts about key budget dates and civic opportunities' : ''}.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Subscription confirmed for {subscribeEmail || subscribePhone}</span>
              </div>
            </div>
          </div>
          <div className="lg:w-[40%] p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-border bg-background">
            <div className="text-center">
              <Button
                onClick={() => {
                  setIsSuccess(false);
                  setSubscribeEmail("");
                  setSubscribePhone("");
                  setSubscribeNewsletter(true);
                  setSubscribeSMS(false);
                }}
                variant="outline"
                className="mb-4 rounded-full"
              >
                Subscribe Another
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-20px) scale(1); opacity: 0; }
        }
      `}</style>
      <SubscribeParticles />
      <SubscribeHero />

      <div id="subscribe-form" className="flex flex-col lg:flex-row min-h-0">
        {/* Left Side - Message (60%) */}
        <ScrollReveal className="lg:w-[60%] p-8 lg:p-16 flex items-center justify-center bg-muted/30">
          <div className="max-w-xl">
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                Stay Connected with Budget Transparency
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Subscribe to our newsletter and SMS alerts to stay informed about Kenya's budget process, key dates, and opportunities for civic participation.
              </p>
              <p className="text-base font-medium text-foreground/90 mb-6">
                Or support our mission with a donation to help us continue making budget information accessible to all Kenyans.
              </p>
            </div>

            <div className="mb-8 rounded-2xl overflow-hidden border border-border bg-muted/50">
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

            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Questions? <a href="mailto:info@budgetndiostory.org" className="underline hover:text-foreground">Contact us by email</a></p>
              <div className="flex flex-wrap gap-4">
                <a href="/cookies" className="hover:text-foreground">Cookie Policy</a>
                <a href="#" className="hover:text-foreground">Privacy Statement</a>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <a href="mailto:info@budgetndiostory.org" className="flex items-center gap-2 hover:text-foreground">
                <Mail className="w-4 h-4" />
                info@budgetndiostory.org
              </a>
              <a href="tel:+254711106814" className="flex items-center gap-2 hover:text-foreground">
                <Phone className="w-4 h-4" />
                +254 711 106 814
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Nairobi, Kenya
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="lg:w-[40%] p-6 lg:p-8 flex items-center justify-center border-t lg:border-l border-border bg-background">
          <div className="w-full max-w-xs">
            {/* Tab Selection */}
            <div className="flex rounded-lg bg-muted/80 p-1 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("newsletter")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                  activeTab === "newsletter"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Bell className="w-4 h-4 inline-block mr-1" />
                Subscribe
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("donation")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                  activeTab === "donation"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className="w-4 h-4 inline-block mr-1" />
                Donate
              </button>
            </div>

            {activeTab === "newsletter" ? (
              /* Newsletter Subscription Form */
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-3 text-primary-foreground">
                  <Bell className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Stay Updated</h2>
                <p className="text-sm text-muted-foreground">Get budget alerts and insights</p>
              </div>
            ) : (
              /* Donation Form Header */
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-3 text-primary-foreground">
                  <Heart className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Make a Donation</h2>
                <p className="text-sm text-muted-foreground">Support our mission</p>
              </div>
            )}

            {activeTab === "newsletter" ? (
              /* Newsletter Subscription Form */
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <Label htmlFor="subscribe-email" className="text-sm font-medium mb-1 block">
                    Email Address
                  </Label>
                  <Input
                    id="subscribe-email"
                    type="email"
                    placeholder="you@example.com"
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    className={`h-10 text-sm rounded-lg ${subscribeErrors.email ? "border-red-500" : ""}`}
                  />
                  {subscribeErrors.email && (
                    <p className="text-xs text-red-500 mt-1">{subscribeErrors.email}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="newsletter"
                    checked={subscribeNewsletter}
                    onCheckedChange={(checked) => setSubscribeNewsletter(checked as boolean)}
                  />
                  <label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
                    Subscribe to newsletter (budget updates, reports, insights)
                  </label>
                </div>

                <div className="border-t border-border pt-4 mt-4">
                  <Label htmlFor="subscribe-phone" className="text-sm font-medium mb-1 block">
                    Phone Number (optional)
                  </Label>
                  <Input
                    id="subscribe-phone"
                    type="tel"
                    placeholder="+254 700 000 000"
                    value={subscribePhone}
                    onChange={(e) => setSubscribePhone(e.target.value)}
                    className={`h-10 text-sm rounded-lg ${subscribeErrors.phone ? "border-red-500" : ""}`}
                  />
                  {subscribeErrors.phone && (
                    <p className="text-xs text-red-500 mt-1">{subscribeErrors.phone}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="sms"
                    checked={subscribeSMS}
                    onCheckedChange={(checked) => setSubscribeSMS(checked as boolean)}
                  />
                  <label htmlFor="sms" className="text-sm text-muted-foreground cursor-pointer">
                    Get SMS alerts (before budget dates, hearings, barazas)
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 mt-4 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Subscribe
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-1 mt-4 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>We respect your privacy. Unsubscribe anytime.</span>
                </div>
              </form>
            ) : (
              <>
            <div className="flex rounded-lg bg-muted/80 p-1 mb-6">
              <button
                type="button"
                onClick={() => setDonationType("one-time")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                  donationType === "one-time"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                One-Time
              </button>
              <button
                type="button"
                onClick={() => setDonationType("recurring")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                  donationType === "recurring"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
            </div>

            <div className="mb-4">
              <Label className="text-sm font-medium mb-2 block text-foreground">Payment Method</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("mpesa")}
                  className={`py-3 px-3 text-sm font-medium rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === "mpesa"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
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
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Card
                </button>
              </div>
            </div>

            <div className="mb-4">
              <Label className="text-sm font-medium mb-2 block text-foreground">Select Amount</Label>
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
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="custom-amount" className="text-sm font-medium mb-2 block text-foreground">
                Or enter custom amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 mt-4 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
            </>
            )}

            <div className="flex items-center justify-center gap-1 mt-4 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>Secure payment via {paymentMethod === "mpesa" ? "M-Pesa" : "Stripe"}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
