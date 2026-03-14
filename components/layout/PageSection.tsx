'use client';

import React from 'react';

export interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Size: default, md, lg */
  size?: 'default' | 'md' | 'lg';
  /** Optional id for anchor */
  id?: string;
  /** Background: default, muted, glass */
  variant?: 'default' | 'muted' | 'glass';
  as?: 'section' | 'div';
}

export function PageSection({
  children,
  className = '',
  size = 'default',
  id,
  variant = 'default',
  as: Component = 'section',
}: PageSectionProps): React.ReactElement {
  const sizeClass =
    size === 'lg' ? 'section-2026-lg' : size === 'md' ? 'section-2026-md' : 'section-2026';
  const variantClass =
    variant === 'muted'
      ? 'bg-secondary/30'
      : variant === 'glass'
        ? 'bg-background/80 dark:bg-background/80 backdrop-blur-sm'
        : '';

  return (
    <Component
      id={id}
      className={`${sizeClass} ${variantClass} border-t border-border/50 ${className}`.trim()}
      data-section
    >
      {children}
    </Component>
  );
}
