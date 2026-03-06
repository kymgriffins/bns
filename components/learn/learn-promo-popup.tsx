"use client";

import { useEffect, useState } from "react";
import { X, Sparkles, TicketPercent, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LearnPromoPopupProps {
  /**
   * LocalStorage key so we do not spam users.
   */
  storageKey?: string;
  /**
   * Delay before popup appears (ms).
   */
  delayMs?: number;
}

export function LearnPromoPopup({
  storageKey = "bns_learn_promo_seen_v1",
  delayMs = 6000,
}: LearnPromoPopupProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = window.localStorage.getItem(storageKey);
    if (seen) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [storageKey, delayMs]);

  const close = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, "1");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={close} />

      <div className="relative z-50 w-full max-w-md rounded-3xl border border-border bg-background shadow-2xl">
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted/60 text-muted-foreground hover:bg-muted"
          aria-label="Close offer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex gap-4 border-b border-border/60 px-5 pb-4 pt-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Limited drop
            </p>
            <h2 className="text-lg font-semibold leading-tight">
              Gen Z Budget Lab: Early‑bird access
            </h2>
          </div>
        </div>

        <div className="space-y-3 px-5 pb-5 pt-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Lock in your spot for our next live micro‑course on Kenya&apos;s budget, built for
            young creators, organizers, and founders.
          </p>

          <div className="flex items-center gap-3 rounded-2xl bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <p className="font-medium text-foreground">Next cohort</p>
              <p>Applications close soon. Seats are capped for each run.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl bg-primary/5 px-3 py-3 text-xs">
            <div className="flex items-center gap-2 text-primary">
              <TicketPercent className="h-4 w-4" />
              <span className="font-semibold tracking-wide">Launch offer</span>
            </div>
            <p className="text-muted-foreground">
              Use the Learn hub today and you will automatically be shortlisted for early
              invites when the course opens.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <Button
              asChild
              size="sm"
              className="inline-flex w-full items-center justify-center rounded-full sm:w-auto"
              onClick={close}
            >
              <a href="#modules">
                Explore Learn hub
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </Button>
            <button
              type="button"
              onClick={close}
              className="text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

