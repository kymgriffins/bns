"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizSection } from "@/components/learn/QuizSection";
import { ReflectionsSection } from "@/components/learn/ReflectionsSection";
import { LEARN_CHAPTERS } from "@/lib/learn-content";
import { cn } from "@/lib/utils";

type Tab = "quiz" | "reflect";

export default function QuizPage() {
  const [tab, setTab] = useState<Tab>("quiz");
  const prev = LEARN_CHAPTERS.find((c) => c.slug === "numbers");

  return (
    <article className="space-y-10">
      <header>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Chapter 5
        </span>
        <h1 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
          Quiz & reflection lab
        </h1>
        <p className="mt-3 text-muted-foreground">
          Test what you&apos;ve learned, then reflect in your own words.
        </p>
      </header>

      <div className="flex gap-2 border-b border-border">
        <button
          type="button"
          onClick={() => setTab("quiz")}
          className={cn(
            "rounded-t-lg border-b-2 px-4 py-2 text-sm font-medium transition",
            tab === "quiz"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Quiz
        </button>
        <button
          type="button"
          onClick={() => setTab("reflect")}
          className={cn(
            "rounded-t-lg border-b-2 px-4 py-2 text-sm font-medium transition",
            tab === "reflect"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Reflections
        </button>
      </div>

      {tab === "quiz" ? <QuizSection /> : <ReflectionsSection />}

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
        <span />
      </nav>
    </article>
  );
}
