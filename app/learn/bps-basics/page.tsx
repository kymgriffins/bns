import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LEARN_CHAPTERS } from "@/lib/learn-content";

export const metadata: Metadata = {
  title: "What is the BPS?",
  description: "Budget Policy Statement: purpose, timeline (15 Feb), PFM Act, and how it guides national and county budgets.",
};

export default function BpsBasicsPage() {
  const prev = LEARN_CHAPTERS.find((c) => c.slug === "overview");
  const next = LEARN_CHAPTERS.find((c) => c.slug === "pillars");

  return (
    <article className="space-y-10">
      <header>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Chapter 2
        </span>
        <h1 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
          What is a Budget Policy Statement?
        </h1>
      </header>

      <div className="space-y-6">
        <p className="text-foreground/90 leading-relaxed">
          The BPS sets out the broad strategic priorities and policy goals that guide national and county governments in preparing their budgets for the next financial year and the medium term.
        </p>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <p className="text-sm text-foreground">
            Submitted to Parliament by the <strong className="text-primary">15th of February</strong> every year (section 25, PFM Act). Contains: economy assessment, revenue/expenditure outlook, expenditure ceilings, fiscal principles, and specific fiscal risks.
          </p>
        </div>
        <p className="text-foreground/90">
          The BPS guides the <strong className="text-foreground">County Fiscal Strategy Paper (CFSP)</strong>. Once approved by Parliament, it forms the basis for the national budget presented by 30 April.
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
        <Button asChild variant="outline" size="sm" asChild>
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
