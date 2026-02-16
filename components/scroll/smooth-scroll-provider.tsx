'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import Lenis from 'lenis';
import { SmoothScroll as SmoothScrollComponent } from './smooth-scroll';

export { SmoothScrollComponent as SmoothScroll };

/**
 * SmoothScrollProvider
 * 
 * A provider component that wraps the application with smooth scrolling.
 * This is the recommended way to add smooth scrolling to your Next.js app.
 */
interface SmoothScrollProviderProps {
  children: ReactNode;
  options?: {
    /** Enable smooth scrolling */
    enabled?: boolean;
    /** Animation duration */
    duration?: number;
    /** Smoothness factor */
    smoothness?: number;
    /** Mouse wheel sensitivity */
    mouseWheelMultiplier?: number;
    /** Touch sensitivity */
    touchMultiplier?: number;
  };
}

export function SmoothScrollProvider({
  children,
  options = {},
}: SmoothScrollProviderProps): React.ReactElement {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: options.duration || 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: options.mouseWheelMultiplier || 1,
      touchMultiplier: options.touchMultiplier || 2,
    });

    // Add lenis to window for global access
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    let rafId: number;
    const animate = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    setIsReady(true);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [options.duration, options.mouseWheelMultiplier, options.touchMultiplier]);

  // Don't render anything until we're in the browser
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  return <>{children}</>;
}

/**
 * Hook to access the Lenis instance
 */
export function useSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;
  return (window as unknown as { lenis?: Lenis }).lenis || null;
}

/**
 * Scroll to position helper
 */
export function scrollTo(position: number, options?: {
  duration?: number;
  immediate?: boolean;
}): void {
  if (typeof window === 'undefined') return;
  
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  if (lenis) {
    lenis.scrollTo(position, {
      duration: options?.duration || 1.2,
      immediate: options?.immediate || false,
    });
  }
}

/**
 * Scroll to element helper
 */
export function scrollToElement(
  selector: string | HTMLElement,
  options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
  }
): void {
  if (typeof window === 'undefined') return;
  
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  if (lenis) {
    lenis.scrollTo(selector, {
      offset: options?.offset || 0,
      duration: options?.duration || 1.2,
      immediate: options?.immediate || false,
    });
  }
}

export default SmoothScrollProvider;
