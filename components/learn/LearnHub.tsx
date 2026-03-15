"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEARN_CHAPTERS } from "@/lib/learn-content";

const OVERVIEW_ITEMS = [
  "Decode the Budget's Secret: purpose and timeline of the BPS",
  "Master the 5 Key Pillars: BETA agenda",
  "Track the Trillion-Shilling Debt: big numbers and interest",
  "Battle the Climate Risk: fiscal dangers",
  "Quiz: Budget detective challenges",
  "Share Your Policy Opinion: reflect and propose solutions",
];

export function LearnHub() {
  return (
    <div className="space-y-12 pb-12">
      <section className="space-y-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Civic hub · BPS 2026
        </p>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Decode the budget.
          <br />
          <span className="text-muted-foreground">Master the pillars. Own the story.</span>
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          One track from two works: Module One + Millicent Makini. Learn what the BPS is, walk the BETA pillars, track the numbers—then quiz and reflect.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Credits: Millicent Makini · Module One
          </span>
          <span>{LEARN_CHAPTERS.length} sections</span>
          <span>~20 min</span>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          What you&apos;ll cover
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {OVERVIEW_ITEMS.map((text) => (
            <li
              key={text}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm text-foreground">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-6 text-lg font-semibold text-foreground">Start with a section</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEARN_CHAPTERS.map((ch) => (
            <Link
              key={ch.slug}
              href={`/learn/${ch.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {ch.order}
              </span>
              <h3 className="font-semibold text-foreground group-hover:text-primary">
                {ch.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {ch.slug === "overview" && "Course roadmap"}
                {ch.slug === "bps-basics" && "Purpose, timeline, PFM Act"}
                {ch.slug === "pillars" && "BETA agenda in practice"}
                {ch.slug === "numbers" && "Revenue, debt, counties"}
                {ch.slug === "quiz" && "Test yourself & reflect"}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Start
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-muted/30 p-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">Ready for more?</p>
        <p className="mt-1 text-foreground">Track delivery, share stories, get briefs.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Button asChild variant="default">
            <Link href="/tracker">Tracker</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/take-action">Take action</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
