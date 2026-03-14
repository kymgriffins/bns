'use client';

import React, { useRef } from 'react';
import { usePinnedSection } from './usePinnedSection';

export interface PinnedChapterProps {
  children: React.ReactNode;
  className?: string;
  /** Pin duration: "100%" = 1 viewport of scroll */
  duration?: string | number;
  start?: string;
}

/**
 * Pins content for a scroll distance (storytelling section).
 */
export function PinnedChapter({
  children,
  className,
  duration = '100%',
  start = 'top top',
}: PinnedChapterProps): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  usePinnedSection({ ref, duration, start, enabled: true });

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className={className} data-scroll-section data-pinned-chapter>
      {children}
    </section>
  );
}
