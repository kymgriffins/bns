import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEARN_CHAPTERS } from "@/lib/learn-content";

const ITEMS = [
  "Decode the Budget's Secret: purpose and timeline of the BPS",
  "Master the 5 Key Pillars: BETA agenda",
  "Track the Trillion-Shilling Debt: big numbers and interest",
  "Battle the Climate Risk: fiscal dangers",
  "Quiz: Budget detective challenges",
  "Share Your Policy Opinion: reflect and propose solutions",
];

export const metadata: Metadata = {
  title: "Course overview",
  description: "What you'll learn in the BPS 2026 civic hub: pillars, numbers, quiz and reflections.",
};

export default function OverviewPage() {
  const next = LEARN_CHAPTERS.find((c) => c.slug === "bps-basics");
  return (
    <article className="space-y-10">
      <header>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Chapter 1
        </span>
        <h1 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
          Course overview
        </h1>
        <p className="mt-3 text-muted-foreground">
          A quick map of what this civic hub covers.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {ITEMS.map((text) => (
          <li
            key={text}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span className="text-sm text-foreground">{text}</span>
          </li>
        ))}
      </ul>

      <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/learn">← Hub</Link>
        </Button>
        {next && (
          <Button asChild size="sm">
            <Link href={`/learn/${next.slug}`}>Next: {next.short} →</Link>
          </Button>
        )}
      </nav>
    </article>
  );
}
