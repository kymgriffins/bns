import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Flame, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEARN_CHAPTERS } from "@/lib/learn-content";

const STATS = [
  { label: "Revenue", value: "Ksh. 3,588B", icon: BarChart3 },
  { label: "Expenditure", value: "Ksh. 4,737B", icon: BarChart3 },
  { label: "Interest (debt)", value: "Ksh. 1,203B", icon: Shield },
  { label: "To counties", value: "Ksh. 420B", icon: Target },
];

export const metadata: Metadata = {
  title: "Numbers & risks",
  description: "Budget 2026/27: revenue, expenditure, debt interest, county allocation and fiscal risks.",
};

export default function NumbersPage() {
  const prev = LEARN_CHAPTERS.find((c) => c.slug === "pillars");
  const next = LEARN_CHAPTERS.find((c) => c.slug === "quiz");

  return (
    <article className="space-y-10">
      <header>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Chapter 4
        </span>
        <h1 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
          Budget 2026/27 · Counties · Risks
        </h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card p-5 text-center"
          >
            <s.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 dark:border-amber-400/20 dark:bg-amber-400/5">
        <p className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-300">
          <Flame className="h-4 w-4" />
          Fiscal risks
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Public debt · Contingent liabilities · Macro risks · Climate change · Devolution (pending bills, county pressures).
        </p>
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
