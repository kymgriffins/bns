"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { heroStagger, useHigReducedMotion, higTransition } from "@/components/animations/hig-motion";

export interface PageHeroCta {
  text: string;
  href: string;
  variant?: "default" | "outline";
}

interface PageHeroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  /** Primary CTA (rounded-full, prominent) */
  primaryCta?: PageHeroCta;
  /** Legacy: same as primaryCta */
  cta?: PageHeroCta;
  secondaryCta?: {
    text: string;
    href: string;
  };
  variant?: "default" | "dark";
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  title,
  description,
  eyebrow,
  primaryCta,
  cta,
  secondaryCta,
  variant = "default",
  children,
  className = "",
}: PageHeroProps) {
  const mainCta = primaryCta ?? cta;
  const isDark = variant === "dark";
  const reduced = useHigReducedMotion();
  const itemVariants = reduced ? heroStagger.itemReduced : heroStagger.item;

  return (
    <section
      className={cn(
        "relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden",
        className
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {isDark ? (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "var(--hero-bg)" }}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-background" />
            <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </>
        )}
      </div>

      <motion.div
        className="max-w-4xl mx-auto"
        variants={heroStagger.container}
        initial="hidden"
        animate="visible"
        transition={{ delayChildren: 0.1, staggerChildren: 0.08 }}
      >
        {eyebrow && (
          <motion.p
            variants={itemVariants}
            transition={higTransition}
            className={cn(
              "text-sm font-medium mb-4 tracking-wide uppercase",
              isDark ? "text-white/80" : "text-primary/80"
            )}
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          variants={itemVariants}
          transition={higTransition}
          className={cn(
            "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6",
            isDark ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            variants={itemVariants}
            transition={higTransition}
            className={cn(
              "text-lg sm:text-xl max-w-2xl mb-8",
              isDark ? "text-white/80" : "text-muted-foreground"
            )}
          >
            {description}
          </motion.p>
        )}

        {children ? (
          <motion.div variants={itemVariants} transition={higTransition}>
            {children}
          </motion.div>
        ) : null}

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={itemVariants}
          transition={higTransition}
        >
          {mainCta && (
            <Button
              asChild
              size="lg"
              variant={mainCta.variant ?? "default"}
              className={cn(
                "rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 transition-transform active:scale-[0.98]",
                isDark && mainCta.variant !== "outline"
                  ? "bg-white text-[var(--hero-bg)] hover:bg-white/90 focus-visible:ring-white/50"
                  : isDark && mainCta.variant === "outline"
                    ? "border-2 border-white text-white bg-transparent hover:bg-white/15 focus-visible:ring-white/40"
                    : ""
              )}
            >
              <Link href={mainCta.href} className="group inline-flex items-center">
                {mainCta.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
          {secondaryCta && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn(
                "rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 transition-transform active:scale-[0.98]",
                isDark
                  ? "border-2 border-white/60 text-white bg-transparent hover:bg-white/15 focus-visible:ring-white/40"
                  : ""
              )}
            >
              <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
            </Button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
