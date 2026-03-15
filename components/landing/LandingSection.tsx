'use client';

import React from 'react';
import { Container2026 } from '@/components/layout';

export interface LandingSectionProps {
  children: React.ReactNode;
  /** Section id for anchor / analytics */
  id?: string;
  /** Extra class on the section (e.g. bg-primary, border-b) */
  className?: string;
  /** Inner content alignment: default (top), center, bottom */
  align?: 'default' | 'center' | 'bottom';
  /** Background: default, muted, primary, dark */
  variant?: 'default' | 'muted' | 'primary' | 'dark';
  /** Full viewport (100dvh), hero (min 100dvh for first section), or bar (compact fixed height) */
  size?: 'full' | 'hero' | 'bar';
  /** Use container-2026 for inner content (default true) */
  contained?: boolean;
  /** Semantic element */
  as?: 'section' | 'div';
}

const variantClasses: Record<NonNullable<LandingSectionProps['variant']>, string> = {
  default: 'bg-background',
  muted: 'bg-secondary/30',
  primary: 'bg-primary text-primary-foreground',
  dark: 'bg-[var(--hero-bg)] text-white',
};

/**
 * Fixed-height landing section (100dvh). Use for scroll-upgraded landing:
 * each section fills the viewport, content is responsive and can overflow-y auto if needed.
 */
export function LandingSection({
  children,
  id,
  className = '',
  align = 'default',
  variant = 'default',
  size = 'full',
  contained = true,
  as: Component = 'section',
}: LandingSectionProps): React.ReactElement {
  const alignClass =
    align === 'center'
      ? 'items-center justify-center'
      : align === 'bottom'
        ? 'justify-end'
        : '';

  const heightClass =
    size === 'bar'
      ? 'h-14 min-h-14 shrink-0 snap-start md:h-16 md:min-h-16'
      : size === 'hero'
        ? 'landing-section landing-hero flex-shrink-0'
        : 'landing-section min-h-0 flex-1';

  const innerClass =
    size === 'bar'
      ? 'flex w-full flex-1 items-center justify-center overflow-hidden'
      : `flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden ${alignClass}`;

  const containerClass =
    size === 'bar'
      ? 'w-full py-0'
      : 'flex h-full min-h-0 flex-1 flex-col py-6 md:py-8 lg:py-10';

  return (
    <Component
      id={id}
      className={`flex flex-col overflow-hidden border-b border-border ${heightClass} ${variantClasses[variant]} ${className}`.trim()}
      data-landing-section
    >
      <div className={innerClass}>
        {contained ? (
          <Container2026 className={containerClass}>{children}</Container2026>
        ) : (
          children
        )}
      </div>
    </Component>
  );
}
