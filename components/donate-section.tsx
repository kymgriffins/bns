"use client";

import { useState, useEffect } from "react";
import { Heart, Globe, Mail } from "lucide-react";
import { trackBnsDonationStep } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { DonateForm } from "./donate-form";
import { BentoSection } from "@/components/ui/bento-frame";
import { BentoScrollAnimation } from "@/components/ui/bento-animations";

export function DonateSection() {
  const [showDonateForm, setShowDonateForm] = useState(false);

  useEffect(() => {
    trackBnsDonationStep('view');
  }, []);

  const handleDonateClick = () => {
    trackBnsDonationStep('start');
    setShowDonateForm(true);
  };

  const handleCancel = () => {
    setShowDonateForm(false);
  };

  return (
    <section className="section-2026 bg-primary/5 border-t border-border" aria-label="Support our work">
      <div className="container-2026 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Heart className="h-4 w-4" />
          Support Our Work
        </div>
        <h2 className="text-hero-2026 font-semibold mb-4">Help Us Keep Kenya&apos;s Budget Transparent</h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Budget Ndio Story is a youth-led initiative making budget information accessible to all Kenyans.
          Your support helps us produce reports, train champions, and keep government accountable.
        </p>
        <p className="text-sm text-muted-foreground mb-8 max-w-xl mx-auto">
          Donations go to the consortium behind Budget Ndio Story. We are transparent about how we use funds.
        </p>

        {!showDonateForm ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8"
              onClick={handleDonateClick}
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <a href="mailto:info@budgetndiostory.org">Contact for partnership</a>
            </Button>
          </div>
        ) : (
          <DonateForm onCancel={handleCancel} />
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>We accept international donations</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>info@budgetndiostory.org</span>
          </div>
        </div>
      </div>
    </section>
  );
}
