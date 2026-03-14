'use client';

import React, { useRef, useEffect, useState, type ReactNode } from 'react';

export interface HorizontalRevealProps {
  children: ReactNode;
  /** Scroll distance as multiple of viewport (e.g. 2 = 200vh) */
  scrollHeight?: number;
  className?: string;
  innerClassName?: string;
}

/**
 * Pins the section and reveals content horizontally as the user scrolls.
 * Uses GSAP ScrollTrigger + Lenis. Respects prefers-reduced-motion.
 */
export function HorizontalReveal({
  children,
  scrollHeight = 2,
  className = '',
  innerClassName = '',
}: HorizontalRevealProps): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !mounted ||
      !sectionRef.current ||
      !trackRef.current
    ) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: { revert?: () => void } | null = null;
    let stPin: { kill: () => void } | null = null;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getWidth = () => track.scrollWidth - window.innerWidth;
      const vh = scrollHeight * 100;
      section.style.height = `${vh}vh`;

      stPin = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${vh}vh`,
        pin: true,
        pinSpacing: true,
      }) as unknown as { kill: () => void };

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -Math.max(0, getWidth()),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${vh}vh`,
            scrub: 1,
          },
        });
      }, section);

      return () => {
        ctx?.revert?.();
        stPin?.kill?.();
      };
    };

    void init();
    return () => {
      ctx?.revert?.();
      stPin?.kill?.();
    };
  }, [mounted, scrollHeight]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden ${className}`.trim()}
      style={mounted ? undefined : { minHeight: `${scrollHeight * 100}vh` }}
      data-cursor="grab"
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <div
          ref={trackRef}
          className={`flex w-max flex-none items-stretch gap-6 pl-[max(1rem,5vw)] pr-[max(1rem,5vw)] md:gap-8 ${innerClassName}`.trim()}
          style={{ willChange: 'transform' }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
