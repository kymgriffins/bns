'use client';

import React, { ReactNode } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// =============================================================================
// Bento-Style Card Components - Curved, Clean, Modern Design
// Using White, Blue, Neutral Gray, Black Only
// =============================================================================

export interface BentoCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  accentColor?: 'blue' | 'neutral' | 'default';
  size?: 'default' | 'small' | 'large' | 'wide' | 'tall';
}

// Color mapping - White, Blue, Neutral Gray, Black only
const accentColorMap = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-neutral-200 dark:border-neutral-800',
    hover: 'hover:border-blue-300 dark:hover:border-blue-700',
    glow: 'hover:shadow-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
  },
  neutral: {
    bg: 'bg-neutral-50 dark:bg-neutral-900/30',
    border: 'border-neutral-200 dark:border-neutral-800',
    hover: 'hover:border-neutral-300 dark:hover:border-neutral-700',
    glow: 'hover:shadow-neutral-500/10',
    text: 'text-neutral-600 dark:text-neutral-400',
  },
  default: {
    bg: 'bg-background',
    border: 'border-border',
    hover: 'hover:border-primary/30',
    glow: 'hover:shadow-primary/10',
    text: 'text-foreground',
  },
};

// Safe color accessor - handles old/unknown colors
const getAccentColor = (color: string) => {
  if (color === 'blue' || color === 'neutral' || color === 'default') {
    return accentColorMap[color];
  }
  return accentColorMap.default;
};

// Padding mapping
const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

// Size mapping for bento grid
const sizeMap = {
  default: '',
  small: 'col-span-1',
  large: 'col-span-2',
  wide: 'col-span-1 md:col-span-2',
  tall: 'row-span-2',
};

// =============================================================================
// Main Bento Card Component
// =============================================================================

export function BentoCard({
  children,
  className,
  padding = 'md',
  hover = true,
  accentColor = 'default',
  size = 'default',
}: BentoCardProps) {
  const colors = getAccentColor(accentColor);
  const pad = paddingMap[padding];
  const sizeClass = sizeMap[size];

  return (
    <motion.div
      className={cn(
        'relative rounded-3xl border transition-all duration-300 overflow-hidden',
        colors.bg,
        colors.border,
        hover && colors.hover,
        hover && `shadow-sm hover:shadow-lg ${colors.glow}`,
        pad,
        sizeClass,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// =============================================================================
// Bento Grid Container
// =============================================================================

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

const gapMap = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

export function BentoGrid({
  children,
  className,
  cols = 3,
  gap = 'md',
}: BentoGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid', gridCols[cols], gapMap[gap], className)}>
      {children}
    </div>
  );
}

// =============================================================================
// Bento Section with Title
// =============================================================================

export interface BentoSectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function BentoSection({
  children,
  className,
  title,
  subtitle,
}: BentoSectionProps) {
  return (
    <section className={cn('py-12 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-10 text-center">
            {title && (
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {title}
              </motion.h2>
            )}
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
        )}
        {children}
      </div>
    </section>
  );
}

// =============================================================================
// Bento Box - Small Feature Box
// =============================================================================

export interface BentoBoxProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  accentColor?: 'blue' | 'neutral' | 'default';
}

export function BentoBox({
  children,
  className,
  icon,
  title,
  description,
  accentColor = 'blue',
}: BentoBoxProps) {
  const colors = getAccentColor(accentColor);

  return (
    <BentoCard padding="lg" accentColor={accentColor}>
      <div className="flex flex-col h-full">
        {icon && (
          <div className={cn('mb-4 p-3 rounded-2xl w-fit', colors.bg)}>
            <div className={cn(colors.text)}>
              {icon}
            </div>
          </div>
        )}
        {title && (
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
        )}
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
        <div className="mt-4 flex-1">
          {children}
        </div>
      </div>
    </BentoCard>
  );
}

// =============================================================================
// Bento Hero - Large Feature Card
// =============================================================================

export interface BentoHeroProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  accentColor?: 'blue' | 'neutral';
}

export function BentoHero({
  children,
  className,
  title,
  description,
  accentColor = 'blue',
}: BentoHeroProps) {
  return (
    <BentoCard padding="xl" accentColor={accentColor === 'blue' || accentColor === 'neutral' ? accentColor : 'default'} size="wide" className={className}>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1">
          {title && (
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>
          )}
          {description && (
            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {description}
            </motion.p>
          )}
          <div className="mt-6">
            {children}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

// =============================================================================
// Bento Feature List Item
// =============================================================================

export interface BentoFeatureProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function BentoFeature({ children, className, index = 0 }: BentoFeatureProps) {
  return (
    <motion.div
      className={cn('flex items-start gap-3', className)}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.4,
        ease: 'easeOut' 
      }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Bento Stat Card
// =============================================================================

export interface BentoStatProps {
  value: string | number;
  label: string;
  className?: string;
  accentColor?: 'blue' | 'neutral';
}

export function BentoStat({
  value,
  label,
  className,
  accentColor = 'blue',
}: BentoStatProps) {
  const colors = getAccentColor(accentColor);

  return (
    <BentoCard padding="lg" accentColor={accentColor} className={className}>
      <motion.div
        className="text-4xl md:text-5xl font-bold mb-2"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.div>
      <p className="text-muted-foreground">{label}</p>
    </BentoCard>
  );
}

// =============================================================================
// Bento Image Card
// =============================================================================

export interface BentoImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'wide';
}

const aspectRatioMap = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[2/1]',
};

export function BentoImage({
  src,
  alt,
  className,
  aspectRatio = 'square',
}: BentoImageProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl', aspectRatioMap[aspectRatio], className)}>
      <img
        src={src}
        alt={alt}
        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}

// =============================================================================
// Bento Badge
// =============================================================================

export interface BentoBadgeProps {
  children: ReactNode;
  className?: string;
  accentColor?: 'blue' | 'neutral';
}

export function BentoBadge({
  children,
  className,
  accentColor = 'blue',
}: BentoBadgeProps) {
  const colors = getAccentColor(accentColor);

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        colors.bg,
        colors.text,
        className
      )}
    >
      {children}
    </span>
  );
}

// =============================================================================
// Bento Divider
// =============================================================================

export function BentoDivider({ className }: { className?: string }) {
  return (
    <div className={cn('h-px bg-border/50 my-4', className)} />
  );
}

// =============================================================================
// Bento CTA Button Wrapper
// =============================================================================

export interface BentoCTAProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function BentoCTA({
  children,
  className,
  variant = 'primary',
}: BentoCTAProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border hover:border-primary/50 bg-background',
  };

  return (
    <div className={cn(
      'inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all duration-200',
      variants[variant],
      className
    )}>
      {children}
    </div>
  );
}

// =============================================================================
// Bento CTA Section
// =============================================================================

export interface BentoCTASectionProps {
  children: ReactNode;
  className?: string;
  accentColor?: 'blue' | 'neutral' | 'default';
}

export function BentoCTASection({
  children,
  className,
  accentColor = 'blue',
}: BentoCTASectionProps) {
  const colors = getAccentColor(accentColor);

  return (
    <BentoCard padding="lg" accentColor={accentColor} className={className}>
      <div className="flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </BentoCard>
  );
}
