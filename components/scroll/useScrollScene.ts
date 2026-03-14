'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export interface ScrollSceneAnimation {
  from?: { opacity?: number; y?: number; x?: number };
  to?: { opacity?: number; y?: number; x?: number };
}

export interface UseScrollSceneOptions {
  triggerRef: RefObject<HTMLElement | null>;
  /** Start position: "top center" or number (0-1) or "center center" etc */
  start?: string | number;
  /** End position */
  end?: string | number;
  scrub?: boolean | number;
  /** If set, animate trigger element over scroll range */
  animation?: ScrollSceneAnimation;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  enabled?: boolean;
}

/**
 * Wraps ScrollTrigger for section-level scenes. Uses dynamic GSAP import.
 * Respects prefers-reduced-motion by not creating the trigger when reduced.
 */
export function useScrollScene(options: UseScrollSceneOptions): void {
  const {
    triggerRef,
    start = 'top 85%',
    end = 'bottom 15%',
    scrub = false,
    animation,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    enabled = true,
  } = options;

  const triggerRefStable = useRef(triggerRef.current);
  triggerRefStable.current = triggerRef.current;

  useEffect(() => {
    if (typeof window === 'undefined' || !enabled || !triggerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: { revert?: () => void } | null = null;
    let st: { kill: () => void } | null = null;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      const el = triggerRefStable.current;
      if (!el) return;

      const startStr = typeof start === 'number' ? `top ${start * 100}%` : start;
      const endStr = typeof end === 'number' ? `bottom ${end * 100}%` : end;

      if (animation?.from ?? animation?.to) {
        ctx = gsap.context(() => {
          gsap.fromTo(
            el,
            { opacity: animation.from?.opacity ?? 1, y: animation.from?.y ?? 0, x: animation.from?.x ?? 0 },
            {
              opacity: animation.to?.opacity ?? 1,
              y: animation.to?.y ?? 0,
              x: animation.to?.x ?? 0,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: startStr,
                end: endStr,
                scrub: scrub === true ? 1 : scrub,
                onEnter: onEnter ?? undefined,
                onLeave: onLeave ?? undefined,
                onEnterBack: onEnterBack ?? undefined,
                onLeaveBack: onLeaveBack ?? undefined,
              },
            }
          );
        });
      } else {
        st = ScrollTrigger.create({
          trigger: el,
          start: startStr,
          end: endStr,
          scrub: scrub === true ? 1 : scrub,
          onEnter: onEnter ?? undefined,
          onLeave: onLeave ?? undefined,
          onEnterBack: onEnterBack ?? undefined,
          onLeaveBack: onLeaveBack ?? undefined,
        }) as unknown as { kill: () => void };
      }
    };

    void init();

    return () => {
      ctx?.revert?.();
      if (st?.kill) st.kill();
    };
  }, [start, end, scrub, enabled, animation?.from?.opacity, animation?.from?.y, animation?.to?.opacity, animation?.to?.y, onEnter, onLeave, onEnterBack, onLeaveBack]);
}
