"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroStagger, useHigReducedMotion, higTransition } from "@/components/animations/hig-motion";

/** Donate hero: impact/gratitude feel. Optional stat or short impact line. */
export function DonateHero() {
  const reduced = useHigReducedMotion();
  const item = reduced ? heroStagger.itemReduced : heroStagger.item;

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-[var(--hero-bg)]" aria-hidden />
      <div className="pointer-events-none absolute left-1/4 bottom-1/4 h-56 w-56 rounded-full bg-primary/20 blur-3xl" aria-hidden />

      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-center lg:gap-12">
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
              Support us
            </motion.p>
            <motion.h1
              variants={item}
              transition={higTransition}
              className="text-hero-2026 font-semibold leading-tight text-white"
            >
              Your support turns budget numbers into real accountability.
            </motion.h1>
            <motion.p
              variants={item}
              transition={higTransition}
              className="max-w-xl text-base text-white/85 sm:text-lg"
            >
              We&apos;re youth‑led and donor‑supported. Every contribution helps us create more
              briefs, run more workshops, and put budget literacy in more hands.
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
                <Link href="#donate-form" className="inline-flex items-center gap-2">
                  Give now
                  <Heart className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: impact stat card */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.45 }}
          >
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">6+</p>
                  <p className="text-sm text-white/80">Briefs & reports</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/75">
                Plus workshops, events, and youth civic hubs — all free to use.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                <Users className="h-3.5 w-3.5" />
                <span>Built with and for Kenyan youth</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
