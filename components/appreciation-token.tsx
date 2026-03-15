"use client";

import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

export interface AppreciationTokenProps {
  /** Short message, e.g. "Thank you" or "With gratitude" */
  message?: string;
  /** Optional subtext */
  subtext?: string;
  className?: string;
}

/**
 * Animated token of appreciation (obama.org-style). Placeholder for post-donate or supporter recognition.
 * Lightweight CSS animation: gentle pulse and subtle shine.
 */
export function AppreciationToken({
  message = "With gratitude",
  subtext = "Your support powers budget transparency.",
  className,
}: AppreciationTokenProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-gradient-to-b from-background to-muted/30 px-5 py-4 overflow-hidden",
        "min-h-[80px] sm:min-h-[88px]",
        className
      )}
      aria-hidden
    >
      {/* Subtle moving shine */}
      <span
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, transparent 40%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.8) 55%, transparent 60%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "appreciation-shine 4s ease-in-out infinite",
        }}
      />
      <div className="relative flex flex-col items-center gap-1.5">
        <span className="flex items-center justify-center gap-2 text-foreground">
          <Heart
            className="h-5 w-5 text-primary animate-appreciation-heart"
            aria-hidden
            strokeWidth={1.8}
          />
          <span className="text-sm font-semibold tracking-wide">{message}</span>
          <Heart
            className="h-5 w-5 text-primary animate-appreciation-heart [animation-delay:0.35s]"
            aria-hidden
            strokeWidth={1.8}
          />
        </span>
        {subtext && (
          <p className="text-xs text-muted-foreground text-center max-w-[220px] leading-snug">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
