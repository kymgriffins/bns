'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  once?: boolean;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale-up' | 'stagger';
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  threshold = 0.1,
  once = true,
  animation = 'fade-up',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  const animations = {
    'fade-up': {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-left': {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    'fade-right': {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    'scale-up': {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    'stagger': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  const selectedAnimation = animations[animation];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        ...selectedAnimation,
        visible: {
          ...selectedAnimation.visible,
          transition: {
            delay,
            duration: 0.5,
            ease: 'easeOut',
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Scroll-Triggered Counter
// =============================================================================

interface ScrollCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function ScrollCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}: ScrollCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(startValue + (end - startValue) * eased);
        setCount(current);
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// =============================================================================
// Scroll Progress Indicator
// =============================================================================

interface ScrollProgressProps {
  targetRef: React.RefObject<HTMLElement>;
  className?: string;
}

export function ScrollProgress({ targetRef, className = '' }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const handleScroll = () => {
      const rect = target.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      const scrollable = elementHeight - windowHeight;
      
      if (scrollable <= 0) {
        setProgress(100);
        return;
      }

      const scrolled = -rect.top;
      const percentage = Math.min(Math.max((scrolled / scrollable) * 100, 0), 100);
      setProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);

  return (
    <div className={`h-1 bg-secondary rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-primary"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

// =============================================================================
// Animated List (Staggered children)
// =============================================================================

interface AnimatedListProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
}

export function AnimatedList({ 
  children, 
  className = '', 
  itemClassName = '' 
}: AnimatedListProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={itemClassName}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

// =============================================================================
// Parallax Container
// =============================================================================

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({ 
  children, 
  speed = 0.5, 
  className = '' 
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
