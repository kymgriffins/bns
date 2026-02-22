'use client';

import React, { ReactNode, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// =============================================================================
// Bento-Style Animation Variants
// =============================================================================

/**
 * Staggered entrance animations for bento grid items
 */
export const bentoAnimations = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  } as Variants,

  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  } as Variants,

  slideInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  } as Variants,

  slideInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  } as Variants,

  staggerFadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  } as Variants,
};

// =============================================================================
// Bento Scroll Animation
// =============================================================================

export interface BentoScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: keyof typeof bentoAnimations;
  delay?: number;
  duration?: number;
}

export function BentoScrollAnimation({
  children,
  className,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.5,
}: BentoScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={bentoAnimations[animation]}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Bento Stagger Grid
// =============================================================================

export interface BentoStaggerGridProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function BentoStaggerGrid({
  children,
  className,
  delay = 0,
  stagger = 0.1,
}: BentoStaggerGridProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Bento Grid Item
// =============================================================================

export interface BentoGridItemProps {
  children: ReactNode;
  className?: string;
  animation?: keyof typeof bentoAnimations;
  delay?: number;
}

export function BentoGridItem({
  children,
  className,
  animation = 'fadeInUp',
  delay = 0,
}: BentoGridItemProps) {
  return (
    <motion.div
      className={className}
      variants={bentoAnimations[animation]}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Bento Hover Card
// =============================================================================

export interface BentoHoverCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function BentoHoverCard({
  children,
  className,
  scale = 1.02,
}: BentoHoverCardProps) {
  return (
    <motion.div
      className={cn('cursor-pointer', className)}
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Bento Icon Box
// =============================================================================

export interface BentoIconBoxProps {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  accentColor?: 'green' | 'red' | 'blue' | 'orange' | 'teal' | 'purple' | 'brand';
}

const iconAccentColors = {
  green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  blue: 'bg-brand-100 dark:bg-brand-900/30 text-brand-500 dark:text-brand-300',
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  teal: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  brand: 'bg-brand-100 dark:bg-brand-900/30 text-brand-500 dark:text-brand-300',
};

export function BentoIconBox({
  icon,
  children,
  className,
  accentColor = 'green',
}: BentoIconBoxProps) {
  const colorClass = iconAccentColors[accentColor];

  return (
    <div className={cn('flex items-start gap-4', className)}>
      <div className={cn('p-3 rounded-2xl flex-shrink-0', colorClass)}>
        {icon}
      </div>
      <div>{children}</div>
    </div>
  );
}

// =============================================================================
// Bento Feature Card
// =============================================================================

export interface BentoFeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
  accentColor?: 'green' | 'red' | 'blue' | 'orange' | 'teal' | 'purple' | 'brand';
}

export function BentoFeatureCard({
  title,
  description,
  icon,
  className,
  accentColor = 'green',
}: BentoFeatureCardProps) {
  return (
    <motion.div
      className={cn(
        'p-6 rounded-3xl border-2 border-border bg-background transition-all duration-300',
        'hover:border-primary/30 hover:shadow-lg hover:-translate-y-1',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {icon && (
        <div className="mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
}

// =============================================================================
// Bento Numbered List
// =============================================================================

export interface BentoNumberedItemProps {
  number: number;
  title: string;
  description: string;
  className?: string;
}

export function BentoNumberedItem({
  number,
  title,
  description,
  className,
}: BentoNumberedItemProps) {
  return (
    <motion.div
      className={cn('flex gap-4', className)}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
        <span className="text-primary font-bold">{number}</span>
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

// =============================================================================
// Bento CTA Section
// =============================================================================

export interface BentoCTASectionProps {
  children: ReactNode;
  className?: string;
}

export function BentoCTASection({ children, className }: BentoCTASectionProps) {
  return (
    <motion.div
      className={cn(
        'p-8 rounded-3xl bg-primary/5 dark:bg-primary/10 border-2 border-primary/20',
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Bento Section Header
// =============================================================================

export interface BentoSectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function BentoSectionHeader({
  title,
  subtitle,
  className,
}: BentoSectionHeaderProps) {
  return (
    <div className={cn('text-center mb-12', className)}>
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export default {
  BentoScrollAnimation,
  BentoStaggerGrid,
  BentoGridItem,
  BentoHoverCard,
  BentoIconBox,
  BentoFeatureCard,
  BentoNumberedItem,
  BentoCTASection,
  BentoSectionHeader,
  bentoAnimations,
};
