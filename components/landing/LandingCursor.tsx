'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';

type CursorKind = 'default' | 'grab' | 'pointer' | 'hidden';

const CURSOR_SELECTOR = '[data-cursor]';

export function LandingCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursor, setCursor] = useState<CursorKind>('default');
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const intersectingRef = useRef<Set<Element>>(new Set());

  const onMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    if (!visible) setVisible(true);
  }, [visible]);

  useEffect(() => {
    setIsTouch(typeof window !== 'undefined' && 'ontouchstart' in window);
    if (typeof window === 'undefined') return;
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [onMove]);

  useEffect(() => {
    if (typeof document === 'undefined' || isTouch) return;
    document.body.classList.add('landing-cursor-active');
    return () => document.body.classList.remove('landing-cursor-active');
  }, [isTouch]);

  useEffect(() => {
    if (typeof window === 'undefined' || isTouch) return;
    const sections = document.querySelectorAll<HTMLElement>(CURSOR_SELECTOR);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingRef.current.add(entry.target);
          } else {
            intersectingRef.current.delete(entry.target);
          }
        });
        const withCursor = [...intersectingRef.current].find((el) =>
          (el as HTMLElement).hasAttribute('data-cursor')
        ) as HTMLElement | undefined;
        setCursor(withCursor ? ((withCursor.getAttribute('data-cursor') as CursorKind) || 'default') : 'default');
      },
      { threshold: [0.1, 0.5], rootMargin: '-15% 0px -15% 0px' }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isTouch]);

  if (isTouch || typeof window === 'undefined') return null;

  return (
    <div
      className="landing-cursor pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      aria-hidden
    >
      <div
        className={`landing-cursor-dot absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-transparent transition-transform duration-150 ${!visible ? 'opacity-0' : 'opacity-100'} landing-cursor--${cursor}`}
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className={`landing-cursor-ring absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 transition-all duration-200 ${!visible ? 'opacity-0 scale-0' : 'opacity-100 scale-100'} landing-cursor--${cursor}`}
        style={{ left: pos.x, top: pos.y }}
      />
    </div>
  );
}
