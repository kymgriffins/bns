"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroStagger, useHigReducedMotion, higTransition } from "@/components/animations/hig-motion";

/** Learn hero: primary (blue) band, path/classroom feel. Left: copy. Right: single module teaser card. */
export function LearnHero() {
  const reduced = useHigReducedMotion();
  const item = reduced ? heroStagger.itemReduced : heroStagger.item;

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-primary px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-primary" aria-hidden />
      {/* Subtle depth: lighter blob */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl" aria-hidden />

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1fr_340px] md:items-center lg:gap-16">
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
              className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/80"
            >
              Budget 101 · Learn
            </motion.p>
            <motion.h1
              variants={item}
              transition={higTransition}
              className="text-hero-2026 font-semibold leading-tight text-primary-foreground"
            >
              Budget school: your one-stop hub for money mechanics.
            </motion.h1>
            <motion.p
              variants={item}
              transition={higTransition}
              className="max-w-xl text-base text-primary-foreground/90 sm:text-lg"
            >
              Short, interactive lessons and quizzes that help you actually use Kenya&apos;s budget —
              not just read about it. Start with Budget 101, then go deeper with BPS 2026.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={item}
              transition={higTransition}
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary-foreground font-semibold text-primary hover:bg-primary-foreground/95 focus-visible:ring-2 focus-visible:ring-primary-foreground/50 transition-transform active:scale-[0.98]"
              >
                <Link href="/learn/budget-101" className="inline-flex items-center gap-2">
                  Start Budget 101
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              variants={item}
              transition={higTransition}
              className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/85"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5" />
                Built for Kenyan youth & creators
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1">
                <Clock className="h-3.5 w-3.5" />
                10–15 min per module
              </span>
            </motion.div>
          </motion.div>

          {/* Right: module teaser card */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.45 }}
          >
            <Link
              href="/learn/budget-101"
              className="group block rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-primary-foreground/30 hover:bg-primary-foreground/15"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
                Start here
              </p>
              <h3 className="mt-1 text-xl font-semibold text-primary-foreground">
                Budget 101 (Interactive)
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/85">
                Money in & out, national vs county, the budget cycle, and where you show up.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-foreground">
                Start module
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
