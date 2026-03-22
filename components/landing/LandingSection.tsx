'use client';

import React from 'react';
import { Container2026 } from '@/components/layout';

export interface LandingSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  align?: 'default' | 'center' | 'bottom';
  variant?: 'default' | 'muted' | 'primary' | 'dark';
  size?: 'full' | 'hero' | 'bar';
  contained?: boolean;
  as?: 'section' | 'div';
}

const variantClasses: Record<NonNullable<LandingSectionProps['variant']>, string> = {
  default: 'bg-background',
  muted: 'bg-secondary/30',
  primary: 'bg-primary text-primary-foreground',
  dark: 'bg-[var(--hero-bg)] text-white',
};

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

  // ↑ Padding increased from py-6/8/10 → py-12/18/24 for genuine breathing room
  const containerClass =
    size === 'bar'
      ? 'w-full py-0'
      : 'flex h-full min-h-0 flex-1 flex-col py-12 md:py-18 lg:py-24';

  return (
    <Component
      id={id}
      // border softened from border-border → border-border/30 — stops sections feeling gridded
      className={`flex flex-col overflow-hidden border-b border-border/30 ${heightClass} ${variantClasses[variant]} ${className}`.trim()}
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