"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, BarChart2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroStagger, useHigReducedMotion, higTransition } from "@/components/animations/hig-motion";
import { cn } from "@/lib/utils";

/** Reports hero: dark, document/briefs feel. Left: copy + CTAs. Right: stacked “report cards” visual. */
export function ReportsHero() {
  const reduced = useHigReducedMotion();
  const item = reduced ? heroStagger.itemReduced : heroStagger.item;

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-36 lg:pb-24">
      {/* Background: dark with warm accent orbs (different from home) */}
      <div className="absolute inset-0 -z-10 bg-[var(--hero-bg)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-12">
          <motion.div
            className="space-y-5"
            variants={heroStagger.container}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.1, staggerChildren: 0.08 }}
          >
            <motion.p
              variants={item}
              transition={higTransition}
              className="text-xs font-medium uppercase tracking-[0.2em] text-white/70"
            >
              Budget briefs · Reports
            </motion.p>
            <motion.h1
              variants={item}
              transition={higTransition}
              className="text-hero-2026 font-semibold leading-tight text-white"
            >
              Short, sharp reports you can actually use.
            </motion.h1>
            <motion.p
              variants={item}
              transition={higTransition}
              className="max-w-xl text-base text-white/85 sm:text-lg"
            >
              Skip the 200‑page PDFs. Read clear, youth‑friendly briefs that tell you what changed,
              why it matters, and what to ask next.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={item}
              transition={higTransition}
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white font-semibold text-[var(--hero-bg)] hover:bg-white/95 focus-visible:ring-2 focus-visible:ring-white/50 transition-transform active:scale-[0.98]"
              >
                <Link href="#reports" className="inline-flex items-center gap-2">
                  Browse latest briefs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/50 bg-transparent text-white hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/40 transition-transform active:scale-[0.98]"
              >
                <Link href="/insights">Budget insights</Link>
              </Button>
            </motion.div>
            <motion.div
              variants={item}
              transition={higTransition}
              className="flex flex-wrap items-center gap-3 text-xs text-white/70"
            >
              <span className="inline-flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                National & county
              </span>
              <span className="hidden h-4 w-px bg-white/40 md:inline-block" aria-hidden />
              <span className="inline-flex items-center gap-1.5">
                <BarChart2 className="h-3.5 w-3.5" />
                Sector briefs
              </span>
            </motion.div>
          </motion.div>

          {/* Right: stacked report cards visual */}
          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="relative flex flex-col gap-3">
              {[
                { label: "BPS 2026", sub: "Budget Policy Statement", icon: FileText },
                { label: "County briefs", sub: "47 counties", icon: Building2 },
                { label: "Sector analysis", sub: "Health · Education · More", icon: BarChart2 },
              ].map((card, i) => (
                <div
                  key={card.label}
                  className={cn(
                    "flex items-center gap-4 rounded-xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm",
                    i === 0 && "ml-0",
                    i === 1 && "ml-6",
                    i === 2 && "ml-12"
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <card.icon className="h-5 w-5 text-white/90" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{card.label}</p>
                    <p className="text-xs text-white/60">{card.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
