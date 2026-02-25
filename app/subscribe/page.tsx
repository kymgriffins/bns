import { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BorderFrame, SectionFrame, AnimatedCard } from "@/components/ui/border-frame";
import { ScrollAnimation, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/ui/enhanced-animations";
import { CheckCircle, Heart, Star, Crown, Sparkles, CreditCard, Phone, ArrowRight, Shield, Zap, Gift, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donate - Support Budget Ndio Story",
  description: "Support our mission to make budget information accessible to all Kenyans. Your donation helps us continue our work.",
};

const DONATION_AMOUNTS = [
  { amount: 500, label: "KSh 500", popular: false },
  { amount: 1000, label: "KSh 1,000", popular: true },
  { amount: 2500, label: "KSh 2,500", popular: false },
  { amount: 5000, label: "KSh 5,000", popular: false },
  { amount: 10000, label: "KSh 10,000", popular: false },
];

const RECURRING_AMOUNTS = [
  { amount: 300, label: "KSh 300/mo", popular: false },
  { amount: 500, label: "KSh 500/mo", popular: true },
  { amount: 1000, label: "KSh 1,000/mo", popular: false },
  { amount: 2500, label: "KSh 2,500/mo", popular: false },
];

const PREMIUM_PERKS = [
  {
    icon: Crown,
    title: "VIP Recognition",
    description: "Get featured as a Premium Supporter on our Wall of Heroes"
  },
  {
    icon: Zap,
    title: "Early Access",
    description: "Be the first to access new reports and analysis before public release"
  },
  {
    icon: Gift,
    title: "Exclusive Content",
    description: "Receive detailed breakdowns and insights not available to the public"
  },
  {
    icon: Users,
    title: "Direct Access",
    description: "Priority access to our team for questions and clarifications"
  }
];

export default function DonationPage() {
  return (
    <main className="min-h-screen">
      {/* <PageHero
        title="Support Our Mission"
        description="Your generous donation helps us continue making budget information accessible to every Kenyan citizen."
        eyebrow="Make a Difference"
      /> */}

      {/* Premium Banner */}
      <section className="py-2 px-4 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/30 dark:via-yellow-950/30 dark:to-orange-950/30 border-b border-amber-200/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 ">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="font-medium">Become a Premium Supporter & enjoy exclusive benefits!</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 lg:py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="one-time" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-md grid-cols-2 h-14 p-1 bg-muted/50">
                <TabsTrigger value="one-time" className="text-base h-12 data-[state=active]:bg-background data-[state=active]:shadow-lg">
                  <Heart className="w-4 h-4 mr-2" />
                  One-Time Donation
                </TabsTrigger>
                <TabsTrigger value="recurring" className="text-base h-12 data-[state=active]:bg-background data-[state=active]:shadow-lg">
                  <Crown className="w-4 h-4 mr-2" />
                  Monthly Supporter
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="one-time" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Amount Selection */}
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-xl font-semibold mb-2">Choose Your Donation Amount</h3>
                    <p className="text-muted-foreground text-sm">Every contribution makes a difference</p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {DONATION_AMOUNTS.map((item) => (
                      <button
                        key={item.amount}
                        className={`relative p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                          item.popular 
                            ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-lg shadow-amber-500/20" 
                            : "border-border hover:border-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/20"
                        }`}
                      >
                        {item.popular && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                            POPULAR
                          </span>
                        )}
                        <span className={`font-bold text-lg ${item.popular ? "text-amber-700" : ""}`}>
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="custom-amount" className="text-base">Or enter custom amount</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">KSh</span>
                      <Input 
                        id="custom-amount" 
                        type="number" 
                        placeholder="Enter amount" 
                        className="pl-14 h-12 text-lg rounded-xl border-2 focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-xl font-semibold mb-2">Select Payment Method</h3>
                    <p className="text-muted-foreground text-sm">Secure and convenient options</p>
                  </div>

                  <div className="space-y-4">
                    {/* M-Pesa */}
                    <div className="p-5 rounded-2xl border-2 border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800 hover:border-green-400 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-700 dark:text-green-400">M-Pesa</h4>
                          <p className="text-sm text-green-600 dark:text-green-500">Pay via STK Push</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800 space-y-3">
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Phone Number" 
                            className="bg-background border-green-200 dark:border-green-700"
                          />
                          <Button className="bg-green-600 hover:bg-green-700">
                            Send STK
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Stripe */}
                    <div className="p-5 rounded-2xl border-2 border-purple-200 bg-purple-50/50 dark:bg-purple-950/20 dark:border-purple-800 hover:border-purple-400 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-purple-700 dark:text-purple-400">Card Payment</h4>
                          <p className="text-sm text-purple-600 dark:text-purple-500">Visa, Mastercard, AMEX</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800 space-y-3">
                        <Input 
                          placeholder="Card Number" 
                          className="bg-background border-purple-200 dark:border-purple-700"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <Input 
                            placeholder="MM/YY" 
                            className="bg-background border-purple-200 dark:border-purple-700"
                          />
                          <Input 
                            placeholder="CVC" 
                            className="bg-background border-purple-200 dark:border-purple-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donor Info */}
              <div className="mt-8 p-6 rounded-2xl bg-muted/30 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Your Information (Optional)</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <input type="checkbox" id="anonymous" className="rounded border-border" />
                  <Label htmlFor="anonymous" className="text-sm text-muted-foreground">Make my donation anonymous</Label>
                </div>
              </div>

              <Button size="lg" className="w-full h-14 text-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950 font-bold rounded-xl shadow-lg shadow-amber-500/25">
                <Heart className="w-5 h-5 mr-2" />
                Complete Donation
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Secure payment powered by Stripe & M-Pesa</span>
              </div>
            </TabsContent>

            <TabsContent value="recurring" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Monthly Amount Selection */}
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-xl font-semibold mb-2">Choose Monthly Support</h3>
                    <p className="text-muted-foreground text-sm">Become a monthly champion</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {RECURRING_AMOUNTS.map((item) => (
                      <button
                        key={item.amount}
                        className={`relative p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                          item.popular 
                            ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-lg shadow-amber-500/20" 
                            : "border-border hover:border-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/20"
                        }`}
                      >
                        {item.popular && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                            BEST VALUE
                          </span>
                        )}
                        <span className={`font-bold text-lg ${item.popular ? "text-amber-700" : ""}`}>
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200">
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-300">Why become a monthly supporter?</p>
                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                          Monthly supporters help us plan long-term and maximize our impact. You'll also enjoy exclusive perks!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Perks */}
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-xl font-semibold mb-2">Premium Supporter Benefits</h3>
                    <p className="text-muted-foreground text-sm">Join our community of champions</p>
                  </div>

                  <div className="space-y-4">
                    {PREMIUM_PERKS.map((perk, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover:border-amber-300 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                          <perk.icon className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{perk.title}</h4>
                          <p className="text-sm text-muted-foreground">{perk.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Method for Recurring */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {/* M-Pesa Recurring */}
                  <div className="p-5 rounded-2xl border-2 border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800 hover:border-green-400 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-400">M-Pesa Auto-Pay</h4>
                        <p className="text-sm text-green-600 dark:text-green-500">Monthly deduction</p>
                      </div>
                    </div>
                  </div>

                  {/* Stripe Recurring */}
                  <div className="p-5 rounded-2xl border-2 border-purple-200 bg-purple-50/50 dark:bg-purple-950/20 dark:border-purple-800 hover:border-purple-400 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-700 dark:text-purple-400">Card Auto-Pay</h4>
                        <p className="text-sm text-purple-600 dark:text-purple-500">Monthly deduction</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donor Info for Recurring */}
              <div className="mt-8 p-6 rounded-2xl bg-muted/30 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Your Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recurring-name">Full Name</Label>
                    <Input id="recurring-name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recurring-email">Email Address</Label>
                    <Input id="recurring-email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recurring-phone">Phone Number</Label>
                    <Input id="recurring-phone" placeholder="2547XXXXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card">Card Details</Label>
                    <Input id="card" placeholder="Card Number" />
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full h-14 text-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950 font-bold rounded-xl shadow-lg shadow-amber-500/25">
                <Crown className="w-5 h-5 mr-2" />
                Become a Monthly Supporter
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Cancel anytime. No hidden fees.</span>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="w-12 h-12 mx-auto text-amber-500 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Thank You for Your Support!</h2>
          <p className="text-muted-foreground mb-8">
            Your generosity helps us continue our mission of making budget information accessible to all Kenyans. 
            Together, we can build a more transparent and accountable Kenya.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" size="lg" className="rounded-xl">
                Return Home
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

     
    </main>
  );
}
