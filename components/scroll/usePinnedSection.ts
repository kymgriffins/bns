'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export interface UsePinnedSectionOptions {
  ref: RefObject<HTMLElement | null>;
  /** Pin duration in scroll distance (e.g. "100%" = 1 viewport height of pin) */
  duration?: string | number;
  /** Start when top of trigger hits... e.g. "top top" */
  start?: string;
  enabled?: boolean;
}

/**
 * Pins a section for a scroll distance. Uses GSAP ScrollTrigger.
 * Respects prefers-reduced-motion (no pin when reduced).
 */
export function usePinnedSection(options: UsePinnedSectionOptions): void {
  const { ref, duration = '100%', start = 'top top', enabled = true } = options;
  const refStable = useRef(ref.current);
  refStable.current = ref.current;

  useEffect(() => {
    if (typeof window === 'undefined' || !enabled || !ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let st: { kill: () => void } | null = null;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      const el = refStable.current;
      if (!el) return;

      st = ScrollTrigger.create({
        trigger: el,
        start,
        end: `+=${typeof duration === 'number' ? duration : duration}`,
        pin: true,
        pinSpacing: true,
      }) as unknown as { kill: () => void };
    };

    void init();

    return () => {
      if (st?.kill) st.kill();
    };
  }, [ref, duration, start, enabled]);
}
