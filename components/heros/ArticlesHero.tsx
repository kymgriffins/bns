"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroStagger, useHigReducedMotion, higTransition } from "@/components/animations/hig-motion";

/** Articles hero: light, editorial feel. Dot grid bg, typographic focus. Optional right: featured quote strip. */
export function ArticlesHero() {
  const reduced = useHigReducedMotion();
  const item = reduced ? heroStagger.itemReduced : heroStagger.item;

  return (
    <section className="relative min-h-[65vh] flex flex-col justify-center overflow-hidden bg-background px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-36 lg:pb-24">
      {/* Dot grid background (light editorial) */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.4] dark:opacity-[0.25]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.15) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-background" aria-hidden />

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center lg:gap-16">
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
              className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              Stories · Articles
            </motion.p>
            <motion.h1
              variants={item}
              transition={higTransition}
              className="text-hero-2026 font-semibold leading-tight text-foreground"
            >
              Real stories. Real budgets. Real impact.
            </motion.h1>
            <motion.p
              variants={item}
              transition={higTransition}
              className="max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              Deep dives, explainers, and youth voices on how Kenya&apos;s money flows — and how to
              hold leaders accountable.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={item}
              transition={higTransition}
            >
              <Button
                asChild
                size="lg"
                className="rounded-full font-semibold transition-transform active:scale-[0.98]"
              >
                <Link href="#posts" className="inline-flex items-center gap-2">
                  Read articles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full transition-transform active:scale-[0.98]"
              >
                <Link href="/learn">Learn first</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: editorial quote / typographic strip */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Quote className="mb-3 h-8 w-8 text-primary/60" />
              <p className="text-lg font-medium italic leading-snug text-foreground">
                &ldquo;Budget Ndio Story helped us turn numbers into questions our MCAs couldn&apos;t
                ignore.&rdquo;
              </p>
              <p className="mt-3 text-sm text-muted-foreground">— Youth advocate, Kisumu</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>More voices in Articles</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
