"use client";

import { useEffect, useState } from "react";
import { X, Sparkles, Mail, ArrowRight, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";

type GlobalEmailPopupProps = {
  storageKey?: string;
  delayMs?: number;
};

export function GlobalEmailPopup({
  storageKey = "bns_global_email_popup_v1",
  delayMs = 8000,
}: GlobalEmailPopupProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setSubmitted(true);
      window.setTimeout(() => {
        close();
      }, 1800);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative z-50 w-full max-w-lg overflow-hidden rounded-[2rem] border border-border/70 bg-background/95 shadow-[0_18px_70px_rgba(0,0,0,0.55)]">
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted/70 text-muted-foreground hover:bg-muted"
          aria-label="Close subscription popup"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-0 md:grid-cols-[1.1fr_minmax(0,0.9fr)]">
          {/* Left: copy */}
          <div className="space-y-4 px-6 pb-6 pt-6 md:px-7 md:pb-7 md:pt-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-3 w-3" />
              </span>
              <span>Budget drip · inbox only</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold leading-snug">
                Get the story behind the shillings.
              </h2>
              <p className="text-sm text-muted-foreground">
                One or two sharp emails a month: youth‑first explainers, creator briefs,
                and the budget windows where ads, content and pressure actually land.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>No spam. Just Kenya budget drops, creator calls and smart adverts.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Perfect if you&apos;re a student, creator, organizer, or brand.</span>
              </li>
            </ul>

            <form onSubmit={onSubmit} className="space-y-3 pt-1">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your best email for budget stories…"
                  className="h-11 w-full rounded-full border border-border bg-background/80 px-10 pr-4 text-sm outline-none ring-0 transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  size="sm"
                  className="inline-flex w-full items-center justify-center rounded-full sm:w-auto"
                  disabled={submitting || submitted}
                >
                  {submitted ? (
                    "You’re in ✶"
                  ) : (
                    <>
                      Tap in to the budget drip
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
                <button
                  type="button"
                  onClick={close}
                  className="text-[11px] text-muted-foreground underline-offset-2 hover:underline"
                >
                  Maybe later
                </button>
              </div>
            </form>
          </div>

          {/* Right: vertical poster / advert vibe */}
          <div className="relative hidden md:block bg-[radial-gradient(circle_at_0_0,rgba(45,212,191,0.25),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.28),transparent_55%)]">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.18] mix-blend-soft-light" />

            <div className="relative h-full px-5 py-6 flex flex-col justify-between text-xs text-muted-foreground">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/75 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                  <Megaphone className="h-3 w-3" />
                  <span>Signals · Not spam</span>
                </div>
                <p className="text-[11px] text-white/80">
                  We pair serious budget analysis with creator‑grade visuals and campaigns.
                  Get first dibs on collaborations and campaign briefs.
                </p>
              </div>

              <div className="space-y-2 text-[10px] text-white/70">
                <p className="uppercase tracking-[0.18em] text-[9px] text-white/60">
                  Featuring
                </p>
                <p>Budget explainers · Creator calls · Youth budget labs · Smart advert slots.</p>
                <p className="text-white/50">
                  By joining, you agree to get occasional updates about Budget Ndio Story and
                  partner campaigns. You can unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

