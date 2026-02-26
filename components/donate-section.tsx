"use client";

import { useState } from "react";
import { Heart, Globe, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DonateForm } from "./donate-form";
import { BentoSection } from "@/components/ui/bento-frame";
import { BentoScrollAnimation } from "@/components/ui/bento-animations";

export function DonateSection() {
  const [showDonateForm, setShowDonateForm] = useState(false);

  const handleDonateClick = () => {
    setShowDonateForm(true);
  };

  const handleCancel = () => {
    setShowDonateForm(false);
  };

  return (
    <BentoSection className="bg-gradient-to-br from-brand-50 via-white to-gray-50 dark:from-brand-900/30 dark:via-background dark:to-gray-900/30">
      <BentoScrollAnimation animation="fadeInUp">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-300 text-sm font-medium mb-6">
            <Heart className="h-4 w-4" />
            Support Our Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Help Us Keep Kenya's Budget Transparent</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Budget Ndio Story is a youth-led initiative making budget information accessible to all Kenyans. 
            Your support helps us continue this work—producing reports, training champions, and keeping government accountable.
          </p>
          
          {!showDonateForm ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="rounded-full px-8 bg-brand-500 hover:bg-brand-600"
                onClick={handleDonateClick}
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
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
              <span>Contact us for partnership: info@budgetndiostory.org</span>
            </div>
          </div>
        </div>
      </BentoScrollAnimation>
    </BentoSection>
  );
}
