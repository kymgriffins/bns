"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REFLECTION_PROMPTS } from "@/lib/learn-content";
import { cn } from "@/lib/utils";

export function ReflectionsSection() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-foreground">
        <BookOpen className="h-5 w-5 text-primary" />
        Reflection lab
      </h2>

      <div className="space-y-6">
        {REFLECTION_PROMPTS.map(({ id, title, prompt }) => (
          <div key={id}>
            <p className="font-medium text-foreground">{title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{prompt}</p>
            <textarea
              className="mt-3 min-h-[88px] w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
              placeholder="Type your thoughts…"
              value={answers[id] ?? ""}
              onChange={(e) => setAnswers((p) => ({ ...p, [id]: e.target.value }))}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-6">
        <Button asChild>
          <Link href="/media-hub">
            Turn into content →
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/tracker">Check tracker</Link>
        </Button>
      </div>
    </div>
  );
}
