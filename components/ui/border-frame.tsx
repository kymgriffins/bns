'use client';

import React, { ReactNode } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// =============================================================================
// Border Frame Component - Creative borders without gradients
// =============================================================================

export interface BorderFrameProps {
  children: ReactNode;
  className?: string;
  variant?: 'classic' | 'accent' | 'minimal' | 'bracket' | 'dot' | 'line' | 'corner' | 'dashed';
  accentColor?: 'blue' | 'neutral' | 'default';
  animated?: boolean;
  hoverEffect?: boolean;
}

// Color mapping - White, Blue, Neutral Gray, Black only
const accentColorMap = {
  blue: {
    light: 'border-blue-600',
    dark: 'dark:border-blue-400',
    glow: 'shadow-[0_0_20px_rgba(0,122,255,0.15)]',
  },
  neutral: {
    light: 'border-neutral-600',
    dark: 'dark:border-neutral-400',
    glow: 'shadow-[0_0_20px_rgba(115,115,115,0.15)]',
  },
  default: {
    light: 'border-border',
    dark: 'dark:border-border',
    glow: '',
  },
};

// =============================================================================
// Classic Border Frame
// =============================================================================

const ClassicBorder = ({ 
  children, 
  className, 
  accentColor = 'default',
  animated = false,
  hoverEffect = false 
}: BorderFrameProps) => {
  const colors = accentColorMap[accentColor];
  
  return (
    <motion.div
      className={cn(
        'relative bg-card rounded-lg border-2 p-6',
        colors.light,
        colors.dark,
        animated && 'overflow-hidden',
        hoverEffect && 'transition-all duration-300 hover:scale-[1.01]',
        className
      )}
      initial={animated ? { opacity: 0, y: 20 } : undefined}
      animate={animated ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Animated border glow effect */}
      {animated && (
        <div className={cn(
          'absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none',
          colors.glow
        )} />
      )}
      {children}
    </motion.div>
  );
};

// =============================================================================
// Accent Border Frame (Left accent line)
// =============================================================================

const AccentBorder = ({ 
  children, 
  className, 
  accentColor = 'default',
  animated = false,
  hoverEffect = false 
}: BorderFrameProps) => {
  const colors = accentColorMap[accentColor];
  
  return (
    <motion.div
      className={cn(
        'relative bg-card rounded-lg border border-border p-6 pl-8',
        'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-l-lg',
        `before:bg-[${accentColor === 'default' ? 'hsl(var(--primary))' : accentColor === 'green' ? '#00aa55' : accentColor === 'red' ? '#ff2f55' : accentColor === 'blue' ? '#2563eb' : accentColor === 'orange' ? '#ea580c' : '#145B52'}]`,
        colors.dark,
        animated && 'overflow-hidden',
        hoverEffect && 'transition-all duration-300 hover:translate-x-1',
        className
      )}
      style={{
        borderLeftColor: accentColor === 'default' ? 'hsl(var(--primary))' : accentColor === 'green' ? '#00aa55' : accentColor === 'red' ? '#ff2f55' : accentColor === 'blue' ? '#2563eb' : accentColor === 'orange' ? '#ea580c' : '#145B52',
      }}
      initial={animated ? { opacity: 0, x: -20 } : undefined}
      animate={animated ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// =============================================================================
// Minimal Border Frame
// =============================================================================

const MinimalBorder = ({ 
  children, 
  className, 
  animated = false,
  hoverEffect = false 
}: BorderFrameProps) => {
  return (
    <motion.div
      className={cn(
        'relative bg-card rounded-lg border border-border/50 p-6',
        'after:absolute after:inset-0 after:rounded-lg after:border after:border-transparent after:transition-all',
        'hover:after:border-primary/20',
        hoverEffect && 'transition-all duration-300',
        className
      )}
      initial={animated ? { opacity: 0, scale: 0.98 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// =============================================================================
// Bracket Border Frame (Corner brackets)
// =============================================================================

const BracketBorder = ({ 
  children, 
  className, 
  accentColor = 'default',
  animated = false,
  hoverEffect = false 
}: BorderFrameProps) => {
  const colors = accentColorMap[accentColor];
  
  return (
    <motion.div
      className={cn(
        'relative bg-card rounded-lg p-6',
        hoverEffect && 'transition-all duration-300',
        className
      )}
      initial={animated ? { opacity: 0, rotateX: 10 } : undefined}
      animate={animated ? { opacity: 1, rotateX: 0 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Top-left bracket */}
      <div className={cn(
        'absolute -top-px -left-px w-6 h-6 border-l-2 border-t-2 rounded-tl-lg',
        colors.light,
        colors.dark
      )} />
      
      {/* Top-right bracket */}
      <div className={cn(
        'absolute -top-px -right-px w-6 h-6 border-r-2 border-t-2 rounded-tr-lg',
        colors.light,
        colors.dark
      )} />
      
      {/* Bottom-left bracket */}
      <div className={cn(
        'absolute -bottom-px -left-px w-6 h-6 border-l-2 border-b-2 rounded-bl-lg',
        colors.light,
        colors.dark
      )} />
      
      {/* Bottom-right bracket */}
      <div className={cn(
        'absolute -bottom-px -right-px w-6 h-6 border-r-2 border-b-2 rounded-br-lg',
        colors.light,
        colors.dark
      )} />
      
      <div className={hoverEffect ? 'transition-transform duration-300 hover:scale-[1.01]' : ''}>
        {children}
      </div>
    </motion.div>
  );
};

// =============================================================================
// Dot Border Frame (Dotted border pattern)
// =============================================================================

const DotBorder = ({ 
  children, 
  className, 
  accentColor = 'default',
  animated = false,
  hoverEffect = false 
}: BorderFrameProps) => {
  const colors = accentColorMap[accentColor];
  
  return (
    <motion.div
      className={cn(
        'relative bg-card rounded-lg border-2 border-dotted p-6',
        colors.light,
        colors.dark,
        hoverEffect && 'transition-all duration-300 hover:border-solid',
        className
      )}
      initial={animated ? { opacity: 0 } : undefined}
      animate={animated ? { opacity: 1 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// =============================================================================
// Line Border Frame (Double line)
// =============================================================================

const LineBorder = ({ 
  children, 
  className, 
  accentColor = 'default',
  animated = false,
  hoverEffect = false 
}: BorderFrameProps) => {
  const colors = accentColorMap[accentColor];
  
  return (
    <motion.div
      className={cn(
        'relative bg-card rounded-lg p-6',
        'before:absolute before:inset-2 before:rounded-md before:border before:border-border/30',
        'after:absolute after:inset-0 after:rounded-lg after:border-2',
        colors.light,
        colors.dark,
        hoverEffect && 'transition-all duration-300',
        className
      )}
      initial={animated ? { opacity: 0, y: 30 } : undefined}
      animate={animated ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// =============================================================================
// Corner Border Frame (Decorative corners)
// =============================================================================

const CornerBorder = ({ 
  children, 
  className, 
  accentColor = 'default',
  animated = false,
  hoverEffect = false 
}: BorderFrameProps) => {
  const colors = accentColorMap[accentColor];
  
  return (
    <motion.div
      className={cn(
        'relative bg-card rounded-lg p-6 overflow-hidden',
        hoverEffect && 'transition-all duration-300',
        className
      )}
      initial={animated ? { opacity: 0, scale: 0.95 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Top-left corner */}
      <div className={cn(
        'absolute top-0 left-0 w-12 h-12',
        'border-l-2 border-t-2 rounded-tl-lg',
        colors.light,
        colors.dark
      )} />
      
      {/* Top-right corner */}
      <div className={cn(
        'absolute top-0 right-0 w-12 h-12',
        'border-r-2 border-t-2 rounded-tr-lg',
        colors.light,
        colors.dark
      )} />
      
      {/* Bottom-left corner */}
      <div className={cn(
        'absolute bottom-0 left-0 w-12 h-12',
        'border-l-2 border-b-2 rounded-bl-lg',
        colors.light,
        colors.dark
      )} />
      
      {/* Bottom-right corner */}
      <div className={cn(
        'absolute bottom-0 right-0 w-12 h-12',
        'border-r-2 border-b-2 rounded-br-lg',
        colors.light,
        colors.dark
      )} />
      
      <div className={hoverEffect ? 'transition-transform duration-300 hover:scale-[1.01]' : ''}>
        {children}
      </div>
    </motion.div>
  );
};

// =============================================================================
// Dashed Border Frame
// =============================================================================

const DashedBorder = ({ 
  children, 
  className, 
  animated = false,
  hoverEffect = false 
}: BorderFrameProps) => {
  return (
    <motion.div
      className={cn(
        'relative bg-card rounded-lg border-2 border-dashed border-border p-6',
        hoverEffect && 'transition-all duration-300 hover:border-primary/50',
        className
      )}
      initial={animated ? { opacity: 0, x: -20 } : undefined}
      animate={animated ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// =============================================================================
// Main BorderFrame Component
// =============================================================================

export function BorderFrame({
  children,
  className,
  variant = 'classic',
  accentColor = 'default',
  animated = false,
  hoverEffect = false,
}: BorderFrameProps) {
  const components = {
    classic: ClassicBorder,
    accent: AccentBorder,
    minimal: MinimalBorder,
    bracket: BracketBorder,
    dot: DotBorder,
    line: LineBorder,
    corner: CornerBorder,
    dashed: DashedBorder,
  };

  const Component = components[variant];

  return (
    <Component
      className={className}
      accentColor={accentColor}
      animated={animated}
      hoverEffect={hoverEffect}
    >
      {children}
    </Component>
  );
}

// =============================================================================
// Section Container with Animated Borders
// =============================================================================

export interface SectionFrameProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  accentColor?: 'green' | 'red' | 'blue' | 'orange' | 'teal' | 'default';
  showCorners?: boolean;
  animated?: boolean;
}

export function SectionFrame({
  children,
  className,
  title,
  subtitle,
  accentColor = 'default',
  showCorners = false,
  animated = true,
}: SectionFrameProps) {
  const colors = accentColorMap[accentColor];

  return (
    <motion.section
      className={cn('relative py-16', className)}
      initial={animated ? { opacity: 0 } : undefined}
      whileInView={animated ? { opacity: 1 } : undefined}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Header */}
      {(title || subtitle) && (
        <motion.div
          className="mb-12 text-center"
          initial={animated ? { opacity: 0, y: 20 } : undefined}
          whileInView={animated ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* Content with decorative corners */}
      <div className={cn('relative', showCorners && 'p-8')}>
        {showCorners && (
          <>
            {/* Corner decorations */}
            <div className={cn(
              'absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg',
              colors.light,
              colors.dark
            )} />
            <div className={cn(
              'absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 rounded-tr-lg',
              colors.light,
              colors.dark
            )} />
            <div className={cn(
              'absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 rounded-bl-lg',
              colors.light,
              colors.dark
            )} />
            <div className={cn(
              'absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 rounded-br-lg',
              colors.light,
              colors.dark
            )} />
          </>
        )}
        {children}
      </div>
    </motion.section>
  );
}

// =============================================================================
// Card with Animated Border
// =============================================================================

export interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: 'green' | 'red' | 'blue' | 'orange' | 'teal' | 'default';
  hoverLift?: boolean;
}

export function AnimatedCard({
  children,
  className,
  accentColor = 'default',
  hoverLift = true,
}: AnimatedCardProps) {
  const colors = accentColorMap[accentColor];

  return (
    <motion.div
      className={cn(
        'relative bg-card rounded-lg border-2 p-6',
        colors.light,
        colors.dark,
        hoverLift && 'transition-transform duration-300 hover:-translate-y-1',
        className
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Hero Section Frame
// =============================================================================

export interface HeroFrameProps {
  children: ReactNode;
  className?: string;
  accentColor?: 'green' | 'red' | 'blue' | 'orange' | 'teal' | 'default';
}

export function HeroFrame({
  children,
  className,
  accentColor = 'green',
}: HeroFrameProps) {
  const colors = accentColorMap[accentColor];

  return (
    <div className={cn('relative py-20 md:py-32', className)}>
      {/* Animated corner borders */}
      <motion.div
        className={cn(
          'absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 rounded-tl-2xl',
          colors.light,
          colors.dark
        )}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.div
        className={cn(
          'absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 rounded-tr-2xl',
          colors.light,
          colors.dark
        )}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.div
        className={cn(
          'absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 rounded-bl-2xl',
          colors.light,
          colors.dark
        )}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.div
        className={cn(
          'absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 rounded-br-2xl',
          colors.light,
          colors.dark
        )}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default BorderFrame;
