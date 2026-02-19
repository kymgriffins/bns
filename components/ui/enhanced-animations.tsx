'use client';

import React, { ReactNode, useRef } from 'react';
import { motion, useInView, useAnimation, Variants, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// =============================================================================
// Enhanced Animation Variants
// =============================================================================

/**
 * Scroll-triggered animation variants
 */
export const scrollAnimations = {
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  } as Variants,

  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  } as Variants,

  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  } as Variants,

  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  } as Variants,

  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  } as Variants,

  scaleInUp: {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  } as Variants,

  slideInUp: {
    hidden: { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: 0 },
  } as Variants,

  staggerFadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  } as Variants,
};

/**
 * Interactive hover animations
 */
export const hoverAnimations = {
  lift: {
    rest: { y: 0 },
    hover: { y: -8, transition: { duration: 0.2 } },
  } as Variants,

  scale: {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  } as Variants,

  glow: {
    rest: { boxShadow: '0 0 0 0 rgba(0,0,0,0)' },
    hover: { boxShadow: '0 0 20px 0 rgba(0,170,85,0.3)' },
  } as Variants,

  borderGlow: {
    rest: { borderColor: 'rgba(0,0,0,0.1)' },
    hover: { borderColor: 'rgba(0,170,85,0.5)' },
  } as Variants,
};

/**
 * Continuous animations
 */
export const continuousAnimations = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  } as Variants,

  float: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  } as Variants,

  shimmer: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: { duration: 2, repeat: Infinity, ease: 'linear' },
  } as Variants,
};

// =============================================================================
// Animation Presets
// =============================================================================

export interface AnimationPreset {
  name: string;
  variants: Variants;
  transition?: number;
}

export const animationPresets: Record<string, AnimationPreset> = {
  quick: {
    name: 'Quick',
    variants: scrollAnimations.fadeInUp,
    transition: 0.3,
  },
  standard: {
    name: 'Standard',
    variants: scrollAnimations.fadeInUp,
    transition: 0.5,
  },
  slow: {
    name: 'Slow',
    variants: scrollAnimations.fadeInUp,
    transition: 0.8,
  },
  stagger: {
    name: 'Stagger',
    variants: scrollAnimations.staggerFadeIn,
    transition: 0.5,
  },
};

// =============================================================================
// Scroll Animation Component
// =============================================================================

export interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: keyof typeof scrollAnimations;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  offset?: { top?: number; right?: number; bottom?: number; left?: number };
}

export function ScrollAnimation({
  children,
  className,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.5,
  once = true,
  margin = '-100px',
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={scrollAnimations[animation]}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Stagger Container Component
// =============================================================================

export interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  animation?: keyof typeof scrollAnimations;
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  animation = 'fadeInUp',
}: StaggerContainerProps) {
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
      className={className}
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
// Stagger Item Component
// =============================================================================

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  animation?: keyof typeof scrollAnimations;
}

export function StaggerItem({
  children,
  className,
  animation = 'fadeInUp',
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={scrollAnimations[animation]}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Hover Animation Component
// =============================================================================

export interface HoverAnimationProps {
  children: ReactNode;
  className?: string;
  effect?: 'lift' | 'scale' | 'glow' | 'border';
  scale?: number;
  yOffset?: number;
}

export function HoverAnimation({
  children,
  className,
  effect = 'lift',
  scale = 1.02,
  yOffset = -8,
}: HoverAnimationProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const variants: Variants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: '0 0 0 0 rgba(0,0,0,0)',
      borderColor: 'rgba(0,0,0,0.1)',
    },
    hover: {
      scale: effect === 'scale' ? scale : 1,
      y: effect === 'lift' ? yOffset : 0,
      boxShadow: effect === 'glow' ? '0 10px 40px -10px rgba(0,170,85,0.3)' : '0 0 0 0 rgba(0,0,0,0)',
      borderColor: effect === 'border' ? 'rgba(0,170,85,0.5)' : 'rgba(0,0,0,0.1)',
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className={cn('cursor-pointer', className)}
      initial="rest"
      animate={isHovered ? 'hover' : 'rest'}
      variants={variants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Interactive Card Component
// =============================================================================

export interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: 'green' | 'red' | 'blue' | 'orange' | 'teal' | 'default';
  onClick?: () => void;
}

const accentColors = {
  green: '#00aa55',
  red: '#ff2f55',
  blue: '#2563eb',
  orange: '#ea580c',
  teal: '#145B52',
  default: 'hsl(var(--primary))',
};

export function InteractiveCard({
  children,
  className,
  accentColor = 'green',
  onClick,
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const borderColor = accentColors[accentColor];

  return (
    <motion.div
      className={cn(
        'relative bg-card rounded-lg border-2 p-6 cursor-pointer',
        className
      )}
      style={{ borderColor: 'rgba(0,0,0,0.1)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      animate={{
        borderColor: isHovered ? borderColor : 'rgba(0,0,0,0.1)',
        y: isHovered ? -4 : 0,
        boxShadow: isHovered 
          ? `0 20px 40px -15px ${borderColor}40` 
          : '0 0 0 0 rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Animated List Item
// =============================================================================

export interface AnimatedListItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function AnimatedListItem({
  children,
  className,
  index = 0,
}: AnimatedListItemProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.3,
        ease: 'easeOut' 
      }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Page Transition Component
// =============================================================================

export interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Reveal on Scroll Component
// =============================================================================

export interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
}

export function RevealOnScroll({
  children,
  className,
  threshold = 0.1,
  delay = 0,
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-100px',
    amount: threshold 
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      animate={isInView ? { 
        opacity: 1, 
        clipPath: 'inset(0 0 0% 0)' 
      } : { 
        opacity: 0, 
        clipPath: 'inset(0 0 100% 0)' 
      }}
      transition={{ 
        delay, 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] // cubic-bezier
      }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Animated Counter Component
// =============================================================================

export interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  className,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

// =============================================================================
// Magnetic Button Effect
// =============================================================================

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={cn('cursor-pointer', className)}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.button>
  );
}

// =============================================================================
// Smooth Fade In Component
// =============================================================================

export interface SmoothFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SmoothFade({ 
  children, 
  className,
  delay = 0,
}: SmoothFadeProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
  HoverAnimation,
  InteractiveCard,
  AnimatedListItem,
  PageTransition,
  RevealOnScroll,
  AnimatedCounter,
  MagneticButton,
  SmoothFade,
  scrollAnimations,
  hoverAnimations,
  continuousAnimations,
};
