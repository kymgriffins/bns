"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronRight } from "lucide-react";
import { LEARN_CHAPTERS } from "@/lib/learn-content";
import { cn } from "@/lib/utils";

export function LearnChapterNav() {
  const pathname = usePathname();

  return (
    <aside className="shrink-0">
      <div className="sticky top-24 space-y-1 rounded-2xl border border-border bg-card p-3 shadow-sm">
        <p className="mb-3 flex items-center gap-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5" />
          Sections
        </p>
        <nav className="space-y-0.5">
          <Link
            href="/learn"
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === "/learn"
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            )}
          >
            Hub
            {pathname === "/learn" && <ChevronRight className="h-4 w-4" />}
          </Link>
          {LEARN_CHAPTERS.map((ch) => {
            const href = `/learn/${ch.slug}`;
            const isActive = pathname === href;
            return (
              <Link
                key={ch.slug}
                href={href}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
                    {ch.order}
                  </span>
                  {ch.short}
                </span>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
