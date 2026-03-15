"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CircleDollarSign, Newspaper, Globe, Mail, ArrowRight, HelpCircle } from "lucide-react";
import { trackBnsDonationStep } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { DonateForm } from "./donate-form";

type DonateSectionProps = {
  /** Use "dark" when section is inside the landing's full-bleed black area */
  variant?: "default" | "dark";
};

/** Dark support section: black & white only, reshuffled responsive icons, premium feel */
function SupportSectionDark() {
  useEffect(() => {
    trackBnsDonationStep("view");
  }, []);

  return (
    <div className="container-2026 mx-auto max-w-4xl px-4 py-12 sm:py-16 md:py-20">
      <p className="mb-10 text-center text-base text-white/90 sm:text-lg md:text-xl">
        Choose how you&apos;d like to stay connected: give financially or get updates in your inbox.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Donate – centered icon on top, stacked editorial layout */}
        <div className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center transition-colors hover:border-white/15 hover:bg-white/[0.08] sm:p-8">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 sm:mb-6 sm:h-20 sm:w-20">
            <CircleDollarSign className="h-8 w-8 text-white/90 sm:h-10 sm:w-10" strokeWidth={1.25} />
          </div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Financial support
          </p>
          <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">Donate</h3>
          <p className="mb-6 flex-1 text-sm leading-relaxed text-white/75 sm:text-base">
            Support budget transparency and youth-led civic storytelling. Give once or monthly—every shilling counts.
          </p>
          <Button
            asChild
            size="lg"
            className="w-full rounded-full bg-white text-black hover:bg-white/95 sm:w-auto"
          >
            <Link href="/donate" className="inline-flex items-center justify-center gap-2">
              Give now
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </Button>
        </div>

        {/* Subscribe – icon and title row, Free badge; body and CTA */}
        <div className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition-colors hover:border-white/15 hover:bg-white/[0.08] sm:p-8">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/5 sm:h-16 sm:w-16">
              <Newspaper className="h-7 w-7 text-white/90 sm:h-8 sm:w-8" strokeWidth={1.25} />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">
                Free updates
              </p>
              <h3 className="text-xl font-bold text-white sm:text-2xl">Subscribe</h3>
              <span className="mt-2 inline-flex rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:text-xs">
                No payment
              </span>
            </div>
          </div>
          <p className="mb-6 flex-1 text-left text-sm leading-relaxed text-white/75 sm:text-base">
            Budget briefs, civic hub updates, and participation reminders. Just your email.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
          >
            <Link href="/subscribe" className="inline-flex items-center justify-center gap-2">
              Get updates
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer: black & white only */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-sm text-white/70 sm:gap-3 sm:text-base">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-bold text-white sm:h-10 sm:w-10"
          aria-hidden
        >
          N
        </span>
        <span>Questions?</span>
        <a
          href="mailto:info@budgetndiostory.org"
          className="underline decoration-white/40 underline-offset-2 hover:text-white hover:decoration-white/60"
        >
          info@budgetndiostory.org
        </a>
        <HelpCircle className="h-4 w-4 shrink-0 text-white/50 sm:h-5 sm:w-5" aria-hidden />
      </div>
    </div>
  );
}

export function DonateSection({ variant = "default" }: DonateSectionProps) {
  const [showDonateForm, setShowDonateForm] = useState(false);

  useEffect(() => {
    if (variant !== "dark") trackBnsDonationStep("view");
  }, [variant]);

  const handleDonateClick = () => {
    trackBnsDonationStep("start");
    setShowDonateForm(true);
  };

  const handleCancel = () => {
    setShowDonateForm(false);
  };

  const isDark = variant === "dark";

  if (isDark) {
    return (
      <section aria-label="Support our work">
        <SupportSectionDark />
      </section>
    );
  }

  return (
    <section
      className="section-2026 bg-primary/5 border-t border-border"
      aria-label="Support our work"
    >
      <div className="container-2026 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Heart className="h-4 w-4" />
          Support Our Work
        </div>
        <h2 className="text-hero-2026 font-semibold mb-4">
          Help Us Keep Kenya&apos;s Budget Transparent
        </h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Budget Ndio Story is a youth-led initiative making budget information
          accessible to all Kenyans. Your support helps us produce reports,
          train champions, and keep government accountable.
        </p>
        <p className="text-sm text-muted-foreground mb-8 max-w-xl mx-auto">
          Donations go to the consortium behind Budget Ndio Story. We are
          transparent about how we use funds.
        </p>

        {!showDonateForm ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8" onClick={handleDonateClick}>
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/donate">
                Go to donate page
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <DonateForm onCancel={handleCancel} />
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 shrink-0" />
            <span>We accept international donations</span>
          </div>
          <a href="mailto:info@budgetndiostory.org" className="flex items-center gap-2 transition-colors hover:text-foreground">
            <Mail className="h-4 w-4 shrink-0" />
            info@budgetndiostory.org
          </a>
        </div>
      </div>
    </section>
  );
}
