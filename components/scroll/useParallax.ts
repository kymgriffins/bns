'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export interface UseParallaxOptions {
  ref: RefObject<HTMLElement | null>;
  fromY?: number;
  toY?: number;
  fromOpacity?: number;
  toOpacity?: number;
  /** ScrollTrigger start, e.g. "top bottom" */
  start?: string;
  end?: string;
  enabled?: boolean;
}

/**
 * Simple parallax: moves/opacity based on scroll. Uses GSAP ScrollTrigger.
 * Respects prefers-reduced-motion.
 */
export function useParallax(options: UseParallaxOptions): void {
  const {
    ref,
    fromY = 0,
    toY = 0,
    fromOpacity = 1,
    toOpacity = 1,
    start = 'top bottom',
    end = 'bottom top',
    enabled = true,
  } = options;

  const refStable = useRef(ref.current);
  refStable.current = ref.current;

  useEffect(() => {
    if (typeof window === 'undefined' || !enabled || !ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      const el = refStable.current;
      if (!el) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { y: fromY, opacity: fromOpacity },
          {
            y: toY,
            opacity: toOpacity,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub: true,
            },
          }
        );
      });
    };

    void init();

    return () => {
      ctx?.revert();
    };
  }, [ref, fromY, toY, fromOpacity, toOpacity, start, end, enabled]);
}
