"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowLeft } from "lucide-react";
import { DonateHero } from "@/components/heros/DonateHero";
import { ScrollReveal } from "@/components/animations/hig-motion";
import { DonatePageForm } from "@/components/donate/DonatePageForm";
import { DonateSuccessView } from "@/components/donate/DonateSuccessView";


type PaymentMethod = "mpesa" | "stripe";

export default function DonatePage() {
  const [success, setSuccess] = useState<{ amount: number; paymentMethod: PaymentMethod } | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <DonateHero />

      <div className="flex flex-col lg:flex-row min-h-0 lg:min-h-screen">
        {/* Left: mission + video + contact — donation-focused */}
        <ScrollReveal className="lg:w-[55%] p-8 lg:p-12 xl:p-16 flex flex-col justify-center bg-muted/30">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Support budget transparency in Kenya
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-lg">
            We make national and county budgets accessible to every citizen. Your donation funds reports, trainings, and youth-led stories.
          </p>
          <p className="text-base text-foreground/90 mb-8 max-w-lg">
            Your gift helps empower the next generation of changemakers. Give once or monthly—every shilling counts.
          </p>

          <div className="rounded-2xl overflow-hidden border border-border bg-muted/50 mb-8 max-w-lg">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-video object-cover"
            >
              <source src="/bnsoo1.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a href="mailto:info@budgetndiostory.org" className="flex items-center gap-2 hover:text-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              info@budgetndiostory.org
            </a>
            <a href="tel:+254711106814" className="flex items-center gap-2 hover:text-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              +254 711 106 814
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              Nairobi, Kenya
            </span>
          </div>
        </ScrollReveal>

        {/* Right: form or success */}
        <div id="donate-form" className="lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border bg-background">
          <ScrollReveal delay={0.12} className="h-full flex flex-col justify-center">
          {success ? (
            <DonateSuccessView
              amount={success.amount}
              paymentMethod={success.paymentMethod}
              onMakeAnother={() => setSuccess(null)}
            />
          ) : (
            <DonatePageForm
              onSuccess={(amount, paymentMethod) =>
                setSuccess({ amount, paymentMethod })
              }
            />
          )}
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
