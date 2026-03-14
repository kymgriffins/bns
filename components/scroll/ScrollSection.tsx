'use client';

import React, { useRef } from 'react';
import { useScrollScene } from './useScrollScene';

export interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  start?: string | number;
  end?: string | number;
  scrub?: boolean | number;
  /** Fade/slide animation. Default: fade up on enter */
  animation?: { from?: { opacity?: number; y?: number }; to?: { opacity?: number; y?: number } };
  as?: 'section' | 'div';
}

/**
 * Wraps content in a section that fades/slides in on scroll via GSAP.
 */
export function ScrollSection({
  children,
  className,
  start = 'top 88%',
  end = 'bottom 12%',
  scrub = true,
  animation = { from: { opacity: 0, y: 28 }, to: { opacity: 1, y: 0 } },
  as: Component = 'section',
}: ScrollSectionProps): React.ReactElement {
  const ref = useRef<HTMLElement>(null);

  useScrollScene({
    triggerRef: ref,
    start,
    end,
    scrub,
    animation,
    enabled: true,
  });

  return (
    <Component ref={ref as React.RefObject<HTMLDivElement>} className={className} data-scroll-section>
      {children}
    </Component>
  );
}
