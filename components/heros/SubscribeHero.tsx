"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Bell, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroStagger, useHigReducedMotion, higTransition } from "@/components/animations/hig-motion";

/** Subscribe hero: dark, distinct element (benefit pills or email teaser). */
export function SubscribeHero() {
  const reduced = useHigReducedMotion();
  const item = reduced ? heroStagger.itemReduced : heroStagger.item;

  const benefits = [
    { icon: FileCheck, text: "New briefs & reports" },
    { icon: Bell, text: "Events & deadlines" },
    { icon: Mail, text: "One email, no spam" },
  ];

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-[var(--hero-bg)]" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-1/3 h-48 w-48 rounded-full bg-primary/25 blur-3xl" aria-hidden />

      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center lg:gap-12">
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
              Stay in the loop
            </motion.p>
            <motion.h1
              variants={item}
              transition={higTransition}
              className="text-hero-2026 font-semibold leading-tight text-white"
            >
              Get briefs, events, and budget updates — once a month.
            </motion.h1>
            <motion.p
              variants={item}
              transition={higTransition}
              className="max-w-xl text-base text-white/85 sm:text-lg"
            >
              No spam, no jargon. Just the stuff that helps you stay informed and show up when it
              counts.
            </motion.p>
            <motion.div
              variants={item}
              transition={higTransition}
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white font-semibold text-[var(--hero-bg)] hover:bg-white/95 focus-visible:ring-2 focus-visible:ring-white/50 transition-transform active:scale-[0.98]"
              >
                <Link href="#subscribe-form" className="inline-flex items-center gap-2">
                  Subscribe below
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: benefit pills / email teaser */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
          >
            {benefits.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-4 rounded-xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4 text-white/90" />
                </div>
                <span className="text-sm font-medium text-white/95">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
