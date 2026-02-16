"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight, Check } from "lucide-react";

interface NewsletterProps {
  variant?: "default" | "dark";
  placeholder?: string;
  buttonText?: string;
}

export default function Newsletter({
  variant = "default",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail("");
  };

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      {isSubscribed ? (
        <div
          role="status"
          aria-live="polite"
          className={`flex items-center gap-2 text-sm ${
            isDark ? "text-green-400" : "text-green-600"
          }`}
        >
          <Check size={18} />
          <span className="font-medium">Thanks for subscribing!</span>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
            className={isDark ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40" : ""}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className={isDark ? "bg-white text-black hover:bg-white/90" : ""}
          >
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : (
              <>
                {buttonText}
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </div>
      )}
    </form>
  );
}
