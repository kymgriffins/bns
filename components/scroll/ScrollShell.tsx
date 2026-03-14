'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';

export interface ScrollShellContextValue {
  /** Current scroll position (px) */
  scroll: number;
  /** Max scroll (content height - viewport) */
  limit: number;
  /** Scroll velocity */
  velocity: number;
  /** Direction: -1 up, 0, 1 down */
  direction: -1 | 0 | 1;
  /** Progress 0–1 */
  progress: number;
  /** At top */
  isTop: boolean;
  /** At bottom */
  isBottom: boolean;
  /** Lenis instance (null until mounted) */
  lenis: Lenis | null;
  /** Scroll to position or selector */
  scrollTo: (target: number | string | HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean }) => void;
  /** Whether scroll engine is ready */
  isReady: boolean;
  /** Prefers reduced motion */
  reducedMotion: boolean;
}

const ScrollShellContext = createContext<ScrollShellContextValue | null>(null);

export function useScrollShell(): ScrollShellContextValue | null {
  return useContext(ScrollShellContext);
}

export interface ScrollShellProps {
  children: ReactNode;
  options?: {
    enabled?: boolean;
    duration?: number;
    mouseWheelMultiplier?: number;
    touchMultiplier?: number;
  };
}

export function ScrollShell({ children, options = {} }: ScrollShellProps): React.ReactElement {
  const {
    enabled = true,
    duration = 1.2,
    mouseWheelMultiplier = 1,
    touchMultiplier = 2,
  } = options;

  const lenisRef = useRef<Lenis | null>(null);
  const [state, setState] = useState<Omit<ScrollShellContextValue, 'lenis' | 'scrollTo'>>({
    scroll: 0,
    limit: 0,
    velocity: 0,
    direction: 0,
    progress: 0,
    isTop: true,
    isBottom: false,
    isReady: false,
    reducedMotion: false,
  });
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reducedMotionRef = useRef(false);

  const scrollTo = useCallback(
    (target: number | string | HTMLElement, opts?: { offset?: number; duration?: number; immediate?: boolean }) => {
      const instance = lenisRef.current;
      if (!instance) return;
      instance.scrollTo(target as Parameters<Lenis['scrollTo']>[0], {
        offset: opts?.offset ?? 0,
        duration: opts?.duration ?? duration,
        immediate: opts?.immediate ?? false,
      });
    },
    [duration]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !enabled) {
      setState((s) => ({ ...s, isReady: true }));
      return;
    }

    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setState((s) => ({ ...s, reducedMotion: reducedMotionRef.current }));

    const lenisInstance = new Lenis({
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: mouseWheelMultiplier,
      touchMultiplier,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    (window as unknown as { lenis: Lenis }).lenis = lenisInstance;

    let rafId: number;
    const animate = (time: number) => {
      lenisInstance.raf(time);
      const scroll = lenisInstance.scroll;
      const limit = lenisInstance.limit;
      const velocity = lenisInstance.velocity;
      const direction = velocity > 0.1 ? 1 : velocity < -0.1 ? -1 : 0;
      const progress = limit > 0 ? Math.min(scroll / limit, 1) : 0;
      setState({
        scroll,
        limit,
        velocity,
        direction,
        progress,
        isTop: scroll < 10,
        isBottom: scroll >= limit - 10,
        isReady: true,
        reducedMotion: reducedMotionRef.current,
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // GSAP ScrollTrigger integration
    const initGSAP = async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (typeof value === 'number') {
            lenisInstance.scrollTo(value, { immediate: true });
          }
          return lenisInstance.scroll;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight } as DOMRect;
        },
      });

      lenisInstance.on('scroll', ScrollTrigger.update);

      (window as unknown as { __ScrollTrigger?: typeof ScrollTrigger }).__ScrollTrigger = ScrollTrigger;
    };
    void initGSAP();

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      lenisRef.current = null;
      setLenis(null);
      void import('gsap/ScrollTrigger').then((m) => {
        const st = (window as unknown as { __ScrollTrigger?: { kill: () => void } }).__ScrollTrigger;
        if (st?.kill) st.kill();
      });
    };
  }, [enabled, duration, mouseWheelMultiplier, touchMultiplier]);

  const value: ScrollShellContextValue = {
    ...state,
    lenis,
    scrollTo,
  };

  return (
    <ScrollShellContext.Provider value={value}>
      {children}
    </ScrollShellContext.Provider>
  );
}
