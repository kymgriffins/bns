'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';
import {
  motion,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
  type MotionValue,
  type Variants,
  type Transition,
} from 'framer-motion';

// =============================================================================
// Animation Presets
// =============================================================================

/**
 * Standard animation presets
 */
export const animations = {
  /** Fade in from bottom */
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  } as Variants,

  /** Fade in from left */
  fadeInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  } as Variants,

  /** Fade in from right */
  fadeInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  } as Variants,

  /** Scale up */
  scaleUp: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  } as Variants,

  /** Fade in */
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } as Variants,

  /** Stagger children */
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as Variants,

  /** Slide up */
  slideUp: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
  } as Variants,
};

/**
 * Transition presets
 */
export const transitions = {
  /** Default spring */
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } as Transition,

  /** Gentle spring */
  gentle: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  } as Transition,

  /** Smooth ease */
  smooth: {
    duration: 0.4,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,

  /** Slow smooth */
  slow: {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,

  /** Quick */
  quick: {
    duration: 0.2,
    ease: 'easeOut',
  } as Transition,
};

// =============================================================================
// Animation Components
// =============================================================================

/**
 * Fade In Up Component
 * Animates from opacity 0 and y offset to visible state
 */
interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  viewport?: { once?: boolean; margin?: string; amount?: number | 'some' | 'all' };
}

export function FadeInUp({
  children,
  delay = 0,
  duration = 0.5,
  className,
  viewport = { once: true, margin: '0px' },
}: FadeInUpProps): React.ReactElement {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fade In Component
 * Simple fade animation
 */
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  viewport?: { once?: boolean; margin?: string; amount?: number | 'some' | 'all' };
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.4,
  className,
  viewport = { once: true, margin: '0px' },
}: FadeInProps): React.ReactElement {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewport}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale In Component
 * Scale animation from 0.9 to 1
 */
interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  viewport?: { once?: boolean; margin?: string; amount?: number | 'some' | 'all' };
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.4,
  className,
  viewport = { once: true, margin: '0px' },
}: ScaleInProps): React.ReactElement {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewport}
      transition={{ duration, delay, type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide In From Left
 */
interface SlideInLeftProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  viewport?: { once?: boolean; margin?: string; amount?: number | 'some' | 'all' };
}

export function SlideInLeft({
  children,
  delay = 0,
  duration = 0.5,
  className,
  viewport = { once: true, margin: '0px' },
}: SlideInLeftProps): React.ReactElement {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide In From Right
 */
interface SlideInRightProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  viewport?: { once?: boolean; margin?: string; amount?: number | 'some' | 'all' };
}

export function SlideInRight({
  children,
  delay = 0,
  duration = 0.5,
  className,
  viewport = { once: true, margin: '0px' },
}: SlideInRightProps): React.ReactElement {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Scroll-Linked Animations
// =============================================================================

/**
 * Scroll Progress Bar
 * Animated progress bar based on scroll position
 */
interface ScrollProgressBarProps {
  className?: string;
  color?: string;
  height?: number;
  targetRef?: React.RefObject<HTMLElement>;
}

export function ScrollProgressBar({
  className = '',
  color = '#ef4444',
  height = 3,
  targetRef,
}: ScrollProgressBarProps): React.ReactElement {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      style={{
        height,
        backgroundColor: color,
        scaleX,
        transformOrigin: '0%',
      }}
    />
  );
}

/**
 * Parallax Container
 * Creates a parallax effect on child elements
 */
interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({
  children,
  speed = 0.5,
  className,
}: ParallaxProps): React.ReactElement {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Rotate on Scroll
 * Rotates element based on scroll progress
 */
interface RotateOnScrollProps {
  children: ReactNode;
  startRotation?: number;
  endRotation?: number;
  className?: string;
}

export function RotateOnScroll({
  children,
  startRotation = 0,
  endRotation = 360,
  className,
}: RotateOnScrollProps): React.ReactElement {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [startRotation, endRotation]);

  return (
    <motion.div ref={ref} className={className} style={{ rotate }}>
      {children}
    </motion.div>
  );
}

// =============================================================================
// Interactive Animations
// =============================================================================

/**
 * Hover Scale
 * Scale up on hover
 */
interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({
  children,
  scale = 1.05,
  className,
}: HoverScaleProps): React.ReactElement {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: scale * 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Magnetic Button
 * Subtle magnetic effect on hover
 */
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

export function MagneticButton({
  children,
  className,
}: MagneticButtonProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || {
      height: 0,
      width: 0,
      left: 0,
      top: 0,
    };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Reveal Animations
// =============================================================================

/**
 * Reveal on Scroll
 * Reveals content when it enters viewport
 */
interface RevealOnScrollProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  className?: string;
}

export function RevealOnScroll({
  children,
  width = 'fit-content',
  className,
}: RevealOnScrollProps): React.ReactElement {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={className} style={{ width, overflow: 'hidden' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Text Reveal
 * Character-by-character text animation
 */
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({
  text,
  className,
  delay = 0,
}: TextRevealProps): React.ReactElement {
  const letters = Array.from(text);

  return (
    <motion.div className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: delay + index * 0.03,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

// =============================================================================
// Staggered List
// =============================================================================

/**
 * Staggered Fade In
 * Staggered animation for lists
 */
interface StaggeredFadeInProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export function StaggeredFadeIn({
  children,
  className,
  staggerDelay = 0.1,
}: StaggeredFadeInProps): React.ReactElement {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px' }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// =============================================================================
// Motion Div
// =============================================================================

/**
 * Motion Div - Generic animated container
 * Accepts standard motion props
 */
interface MotionDivProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

export function MotionDiv({
  children,
  className,
  ...props
}: MotionDivProps): React.ReactElement {
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}

// =============================================================================
// Animation Config Provider
// =============================================================================

/**
 * Check if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Conditional animation based on reduced motion preference
 */
export function useConditionalAnimation(shouldAnimate: boolean): Variants {
  const reducedMotion = useReducedMotion();
  
  if (reducedMotion || !shouldAnimate) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }

  return animations.fadeInUp;
}

export default {
  FadeInUp,
  FadeIn,
  ScaleIn,
  SlideInLeft,
  SlideInRight,
  ScrollProgressBar,
  Parallax,
  HoverScale,
  MagneticButton,
  RevealOnScroll,
  TextReveal,
  StaggeredFadeIn,
  MotionDiv,
  animations,
  transitions,
};
