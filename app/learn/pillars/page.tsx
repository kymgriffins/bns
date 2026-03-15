import type { Metadata } from "next";
import Link from "next/link";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEARN_CHAPTERS, PILLARS } from "@/lib/learn-content";

export const metadata: Metadata = {
  title: "BETA pillars",
  description: "Bottom-Up Economic Transformation Agenda pillars: agriculture, MSMEs, healthcare, housing, digital, enablers, infrastructure.",
};

export default function PillarsPage() {
  const prev = LEARN_CHAPTERS.find((c) => c.slug === "bps-basics");
  const next = LEARN_CHAPTERS.find((c) => c.slug === "numbers");

  return (
    <article className="space-y-10">
      <header>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Chapter 3
        </span>
        <h1 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
          BETA pillars & 2026 theme
        </h1>
        <p className="mt-3 text-muted-foreground">
          &quot;Consolidating Gains Under the Bottom-Up Economic Transformation Agenda for Inclusive and Sustainable Growth.&quot;
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <div
            key={p.name}
            className="rounded-xl border border-border bg-card p-4 transition hover:border-primary/30"
          >
            <Target className="mb-2 h-4 w-4 text-primary" />
            <p className="font-medium text-foreground">{p.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{p.tag}</p>
          </div>
        ))}
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        {prev ? (
          <Button asChild variant="outline" size="sm">
            <Link href={`/learn/${prev.slug}`}>← {prev.short}</Link>
          </Button>
        ) : (
          <span />
        )}
        <Button asChild variant="outline" size="sm">
          <Link href="/learn">Hub</Link>
        </Button>
        {next ? (
          <Button asChild size="sm">
            <Link href={`/learn/${next.slug}`}>Next: {next.short} →</Link>
          </Button>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
