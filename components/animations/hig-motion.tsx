"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useInView, type Variants, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// Apple HIG–aligned motion: Clarity, Deference, Depth
// Easing: smooth, purposeful; respects prefers-reduced-motion
// =============================================================================

export const higTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.9,
};

export const higTransitionSlow: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 24,
  mass: 1,
};

export const higTransitionFast: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

/** Stagger delay between children (seconds) */
export const higStagger = 0.06;

export const higVariants = {
  /** Page/section entrance: subtle Y + opacity */
  fadeInUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  } as Variants,

  /** Scale in for modals / emphasis blocks */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  } as Variants,

  /** Slide from left (for side content) */
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  } as Variants,

  /** Hero text: slightly larger motion */
  heroBlock: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  } as Variants,

  /** Card hover: lift + shadow (use with whileHover on wrapper) */
  cardRest: { y: 0, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.05)" },
  cardHover: {
    y: -4,
    boxShadow: "0 12px 24px -8px rgb(0 0 0 / 0.12), 0 4px 8px -4px rgb(0 0 0 / 0.06)",
    transition: higTransitionFast,
  },

  /** Button tap */
  tap: { scale: 0.98 },
} as const;

/** Reduced motion: no transform, opacity only */
export const reducedVariants = {
  fadeInUp: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } as Variants,
  scaleIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } as Variants,
  slideInLeft: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } as Variants,
  heroBlock: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } as Variants,
};

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// =============================================================================
// ScrollReveal – animate when in view (once), respects reduced motion
// =============================================================================

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof higVariants;
  delay?: number;
  duration?: number;
  viewportMargin?: string;
}

export function ScrollReveal({
  children,
  className,
  variant = "fadeInUp",
  delay = 0,
  duration = 0.5,
  viewportMargin = "-40px",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: viewportMargin });
  const reduced = useReducedMotion();
  const variants = reduced ? reducedVariants[variant] : higVariants[variant];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        ...higTransition,
        delay,
        duration: reduced ? 0.2 : duration,
      }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// StaggerChildren – parent drives stagger for children
// =============================================================================

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: higStagger,
      delayChildren: 0.1,
    },
  },
};

export interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  viewportMargin?: string;
}

export function StaggerChildren({
  children,
  className,
  stagger = higStagger,
  delayChildren = 0.1,
  viewportMargin = "-60px",
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: viewportMargin });
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delayChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// StaggerItem – single item used inside StaggerChildren
// =============================================================================

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof higVariants;
}

export function StaggerItem({
  children,
  className,
  variant = "fadeInUp",
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? reducedVariants[variant] : higVariants[variant];

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

// =============================================================================
// CardHover – lift + shadow on hover (Depth), tap scale
// =============================================================================

export interface CardHoverProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  lift?: number;
}

export function CardHover({
  children,
  className,
  as: _as = "div",
  lift = -4,
}: CardHoverProps) {
  const reduced = useReducedMotion();

  const motionProps = reduced
    ? {}
    : {
        whileHover: { y: lift, transition: higTransitionFast },
        whileTap: { scale: 0.99 },
        transition: higTransition,
      };

  return (
    <motion.div
      className={cn("shadow-sm transition-shadow duration-300 hover:shadow-lg", className)}
      initial={false}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// HeroStagger – for PageHero: eyebrow → title → description → CTAs
// =============================================================================

export const heroStagger = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.12,
      },
    },
  } as Variants,
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  } as Variants,
  itemReduced: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } as Variants,
};

export function useHigReducedMotion() {
  return useReducedMotion();
}

export type MotionTier = "mobile" | "desktop";

export function useMotionTier(breakpointPx = 768): MotionTier {
  const [tier, setTier] = useState<MotionTier>("desktop");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const update = () => setTier(mq.matches ? "mobile" : "desktop");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpointPx]);

  return tier;
}
