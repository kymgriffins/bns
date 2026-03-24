"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroStagger, useHigReducedMotion, higTransition } from "@/components/animations/hig-motion";

/** About hero: people/consortium feel. Optional value pills or partner vibe. */
export function AboutHero() {
  const reduced = useHigReducedMotion();
  const item = reduced ? heroStagger.itemReduced : heroStagger.item;

  const pills = [
    { icon: Target, label: "Clarity" },
    { icon: Heart, label: "Inclusion" },
    { icon: Zap, label: "Action" },
  ];

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-muted/40 px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-muted/40" aria-hidden />
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          className="mx-auto max-w-3xl space-y-6 text-center"
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
            Who we are · Consortium
          </motion.p>
          <motion.h1
            variants={item}
            transition={higTransition}
            className="text-hero-2026 font-semibold leading-tight text-foreground"
          >
            We turn budget jargon into questions that matter.
          </motion.h1>
          <motion.p
            variants={item}
            transition={higTransition}
            className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            Budget Ndio Story is a youth‑led consortium of creators, researchers, and advocates
            making Kenya&apos;s budget understandable and actionable — so more people can show up
            and speak up.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={item}
            transition={higTransition}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full font-semibold transition-transform active:scale-[0.98]"
            >
              <Link href="#mission" className="inline-flex items-center gap-2">
                Our mission
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full transition-transform active:scale-[0.98]"
            >
              <Link href="#contact">Get in touch</Link>
            </Button>
          </motion.div>
          {/* Value pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 pt-4"
            variants={item}
            transition={higTransition}
          >
            {pills.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
