"use client";

import { useState } from "react";
import { Heart, CreditCard, Smartphone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DonateFormProps {
  onCancel?: () => void;
}

export function DonateForm({ onCancel }: DonateFormProps) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donationAmount, setDonationAmount] = useState("");

  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
    // Here you would integrate with Stripe or M-Pesa API
    console.log(`Selected payment method: ${method}`);
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-2 border-brand-100 dark:border-brand-800">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Name Input */}
            <div className="text-left">
              <Label htmlFor="donorName" className="text-sm font-medium">
                Your Name
              </Label>
              <Input
                id="donorName"
                type="text"
                placeholder="Enter your name"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="mt-1 rounded-lg"
              />
            </div>
            
            {/* Email Input */}
            <div className="text-left">
              <Label htmlFor="donorEmail" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="donorEmail"
                type="email"
                placeholder="your@email.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="mt-1 rounded-lg"
              />
            </div>
            
            {/* Amount Input */}
            <div className="text-left">
              <Label htmlFor="donationAmount" className="text-sm font-medium">
                Donation Amount (KES)
              </Label>
              <Input
                id="donationAmount"
                type="number"
                placeholder="Enter amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="mt-1 rounded-lg"
              />
            </div>
            
            {/* Quick Amount Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[500, 1000, 2500, 5000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDonationAmount(amount.toString())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    donationAmount === amount.toString()
                      ? "bg-brand-500 text-white"
                      : "bg-secondary text-muted-foreground hover:bg-brand-100 dark:hover:bg-brand-900/30"
                  }`}
                >
                  KES {amount}
                </button>
              ))}
            </div>
            
            {/* Payment Options - Shown after user enters details */}
            {donationAmount && donorEmail && (
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm font-medium mb-3">Select Payment Method:</p>
                <div className="grid grid-cols-2 gap-3">
                  {/* Stripe Option */}
                  <button
                    onClick={() => handlePaymentSelect('stripe')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                      selectedPayment === 'stripe'
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                        : "border-border hover:border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/10"
                    }`}
                  >
                    <CreditCard className="h-8 w-8 mb-2 text-brand-500" />
                    <span className="text-sm font-medium">Pay with Card</span>
                    <span className="text-xs text-muted-foreground">Stripe</span>
                  </button>
                  
                  {/* M-Pesa Option */}
                  <button
                    onClick={() => handlePaymentSelect('mpesa')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                      selectedPayment === 'mpesa'
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-border hover:border-green-300 hover:bg-green-50 dark:hover:bg-green-900/10"
                    }`}
                  >
                    <Smartphone className="h-8 w-8 mb-2 text-green-600" />
                    <span className="text-sm font-medium">M-Pesa</span>
                    <span className="text-xs text-muted-foreground">Instant Pay</span>
                  </button>
                </div>
                
                {/* Payment Processing Message */}
                {selectedPayment && (
                  <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-center">
                    <Check className="h-5 w-5 mx-auto mb-2 text-green-600" />
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">
                      {selectedPayment === 'stripe' 
                        ? "Redirecting to Stripe..." 
                        : "STK Push sent to your phone!"}
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Cancel Button */}
            {onCancel && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onCancel}
                className="w-full mt-2"
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
