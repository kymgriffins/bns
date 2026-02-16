'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import Lenis from 'lenis';

/**
 * Scroll Options for smooth scrolling
 */
export interface ScrollOptions {
  /** Animation duration in ms */
  duration?: number;
  /** Easing function */
  easing?: (t: number) => number;
  /** Offset from target */
  offset?: number;
  /** Callback on scroll complete */
  onComplete?: () => void;
}

/**
 * Scroll Context for scroll position tracking
 */
export interface ScrollContext {
  /** Current scroll position */
  position: number;
  /** Scroll velocity */
  velocity: number;
  /** Direction: -1 (up), 0, 1 (down) */
  direction: -1 | 0 | 1;
  /** Progress (0-1) for current viewport */
  progress: number;
  /** Visible content height */
  limit: number;
  /** Whether scroll is at top */
  isTop: boolean;
  /** Whether scroll is at bottom */
  isBottom: boolean;
  /** Smooth scroll to position */
  scrollTo: (position: number, options?: ScrollOptions) => void;
}

/**
 * Smooth Scroll Configuration
 */
export interface SmoothScrollConfig {
  /** Enable smooth scrolling */
  enabled?: boolean;
  /** Animation duration in ms */
  duration?: number;
  /** Smoothness factor (0-1) */
  smoothness?: number;
  /** Enable infinite scroll */
  infinite?: boolean;
  /** Gesture direction (vertical/horizontal) */
  gestureDirection?: 'vertical' | 'horizontal';
  /** Mouse wheel sensitivity */
  mouseWheelMultiplier?: number;
  /** Touch scroll sensitivity */
  touchMultiplier?: number;
  /** Easing function */
  easing?: (t: number) => number;
  /** Lerp factor */
  lerp?: number;
  /** Smooth wrapper selector */
  wrapper?: HTMLElement | string | null;
  /** Content selector */
  content?: HTMLElement | string | null;
  /** Callbacks */
  onWillScroll?: ( args: { velocity: number; direction: number }) => void;
  onScroll?: (args: {
    scroll: number;
    limit: number;
    velocity: number;
    direction: -1 | 0 | 1;
    progress: number;
  }) => void;
}

/**
 * Default smooth scroll configuration
 */
const defaultConfig: Required<SmoothScrollConfig> = {
  enabled: true,
  duration: 1.2,
  smoothness: 1,
  infinite: false,
  gestureDirection: 'vertical',
  mouseWheelMultiplier: 1,
  touchMultiplier: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  lerp: 0.1,
  wrapper: null,
  content: null,
  onWillScroll: () => {},
  onScroll: () => {},
};

/**
 * SmoothScroll Component
 * 
 * A React wrapper around Lenis for smooth scrolling experiences.
 * Provides scroll context and callbacks for plugins.
 */
interface SmoothScrollProps {
  children: ReactNode;
  config?: SmoothScrollConfig;
  className?: string;
}

export function SmoothScroll({
  children,
  config = {},
  className,
}: SmoothScrollProps): React.ReactElement | null {
  const lenisRef = useRef<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [scrollContext, setScrollContext] = useState<ScrollContext | null>(null);

  // Merge config with defaults
  const mergedConfig = { ...defaultConfig, ...config };

  // Initialize Lenis
  useEffect(() => {
    if (!mergedConfig.enabled) {
      setIsReady(true);
      return;
    }

    const lenis = new Lenis({
      duration: mergedConfig.duration,
      easing: mergedConfig.easing,
      lerp: mergedConfig.lerp,
      smoothWheel: true,
      wheelMultiplier: mergedConfig.mouseWheelMultiplier,
      touchMultiplier: mergedConfig.touchMultiplier,
      infinite: mergedConfig.infinite,
      gestureOrientation: mergedConfig.gestureDirection,
      ...(mergedConfig.wrapper instanceof HTMLElement && { wrapper: mergedConfig.wrapper }),
      ...(mergedConfig.content instanceof HTMLElement && { content: mergedConfig.content }),
    });

    lenisRef.current = lenis;

    // Animation frame for scroll loop
    let rafId: number;
    let lastScroll = 0;
    let lastDirection: -1 | 0 | 1 = 0;

    const animate = (time: number) => {
      lenis.raf(time);
      
      const currentScroll = lenis.scroll;
      const limit = lenis.limit;
      const velocity = lenis.velocity;
      const direction = velocity > 0.1 ? 1 : velocity < -0.1 ? -1 : 0;
      
      // Calculate progress (0-1)
      const progress = limit > 0 ? Math.min(currentScroll / limit, 1) : 0;

      // Call onWillScroll callback
      if (mergedConfig.onWillScroll && (direction !== lastDirection || Math.abs(velocity) > 0.1)) {
        mergedConfig.onWillScroll({ velocity, direction });
      }

      // Call onScroll callback
      if (mergedConfig.onScroll) {
        mergedConfig.onScroll({
          scroll: currentScroll,
          limit,
          velocity,
          direction,
          progress,
        });
      }

      // Update scroll context
      setScrollContext({
        position: currentScroll,
        velocity,
        direction,
        progress,
        limit,
        isTop: currentScroll < 10,
        isBottom: currentScroll >= limit - 10,
        scrollTo: (position: number, options?: ScrollOptions) => {
          lenis.scrollTo(position, {
            duration: options?.duration || mergedConfig.duration * 1000,
            easing: options?.easing || mergedConfig.easing,
          });
        },
      });

      lastScroll = currentScroll;
      lastDirection = direction;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    setIsReady(true);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [mergedConfig]);

  // Provide scroll context
  useEffect(() => {
    if (scrollContext && isReady) {
      // Could emit to plugin registry here
    }
  }, [scrollContext, isReady]);

  if (!mergedConfig.enabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      data-smooth-scroll
      data-scroll-container
    >
      {children}
    </div>
  );
}

/**
 * Hook to access Lenis instance directly
 */
export function useLenis(): Lenis | null {
  return useRef<Lenis | null>(null).current;
}

/**
 * Hook to get scroll position
 */
export function useScrollPosition(): {
  scroll: number;
  limit: number;
  velocity: number;
  direction: -1 | 0 | 1;
  progress: number;
  isTop: boolean;
  isBottom: boolean;
} {
  const [position, setPosition] = useState({
    scroll: 0,
    limit: 0,
    velocity: 0,
    direction: 0 as -1 | 0 | 1,
    progress: 0,
    isTop: true,
    isBottom: false,
  });

  useEffect(() => {
    const lenis = new Lenis();
    
    const onScroll = (args: {
      scroll: number;
      limit: number;
      velocity: number;
      direction: -1 | 0 | 1;
      progress: number;
    }) => {
      setPosition({
        scroll: args.scroll,
        limit: args.limit,
        velocity: args.velocity,
        direction: args.direction,
        progress: args.progress,
        isTop: args.scroll < 10,
        isBottom: args.scroll >= args.limit - 10,
      });
    };

    lenis.on('scroll', onScroll);

    return () => {
      lenis.off('scroll', onScroll);
      lenis.destroy();
    };
  }, []);

  return position;
}

/**
 * Smooth scroll to element
 */
export function scrollToElement(
  element: HTMLElement | string,
  options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
  }
): void {
  const lenis = new Lenis();
  
  if (typeof element === 'string') {
    const target = document.querySelector(element) as HTMLElement | null;
    if (target) {
      lenis.scrollTo(target, {
        offset: options?.offset || 0,
        duration: options?.duration || 1.2,
        immediate: options?.immediate || false,
      });
    }
  } else {
    lenis.scrollTo(element, {
      offset: options?.offset || 0,
      duration: options?.duration || 1.2,
      immediate: options?.immediate || false,
    });
  }
  
  lenis.destroy();
}

/**
 * Smooth scroll to position
 */
export function scrollToPosition(
  position: number,
  options?: {
    duration?: number;
    immediate?: boolean;
  }
): void {
  const lenis = new Lenis();
  lenis.scrollTo(position, {
    duration: options?.duration || 1.2,
    immediate: options?.immediate || false,
  });
  lenis.destroy();
}

// =============================================================================
// Scroll Progress Indicator
// =============================================================================

/**
 * Scroll Progress Component
 * Shows a progress bar based on scroll position
 */
interface ScrollProgressProps {
  className?: string;
  color?: string;
  backgroundColor?: string;
  height?: number;
  position?: 'top' | 'bottom';
  zIndex?: number;
}

export function ScrollProgress({
  className = '',
  color = '#ef4444', // Primary red
  backgroundColor = 'rgba(0, 0, 0, 0.1)',
  height = 3,
  position = 'top',
  zIndex = 50,
}: ScrollProgressProps): React.ReactElement {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis();

    const onScroll = (args: { progress: number }) => {
      setProgress(args.progress);
    };

    lenis.on('scroll', onScroll);

    return () => {
      lenis.off('scroll', onScroll);
      lenis.destroy();
    };
  }, []);

  const style: React.CSSProperties = {
    position: 'fixed',
    [position]: 0,
    left: 0,
    width: `${progress * 100}%`,
    height: `${height}px`,
    backgroundColor: color,
    zIndex,
    transition: 'width 0.1s ease-out',
  };

  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        [position]: 0,
        left: 0,
        width: '100%',
        height: `${height}px`,
        backgroundColor,
        zIndex,
      }}
    >
      <div style={style} />
    </div>
  );
}

export default SmoothScroll;
