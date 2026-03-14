'use client';

import React from 'react';

export interface SectionHeaderProps {
  /** Small label above title (e.g. "Impact in numbers") */
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Right-side slot (e.g. CTA button) */
  action?: React.ReactNode;
  className?: string;
  /** Align: left, center */
  align?: 'left' | 'center';
}

export function SectionHeader({
  label,
  title,
  description,
  action,
  className = '',
  align = 'left',
}: SectionHeaderProps): React.ReactElement {
  const alignClass = align === 'center' ? 'text-center md:mx-auto' : '';
  const descMaxClass = align === 'center' ? 'md:max-w-2xl md:mx-auto' : 'max-w-xl';

  return (
    <header className={`space-y-3 ${alignClass} ${className}`.trim()}>
      {label && (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
      )}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-h2-2026 font-semibold leading-tight text-foreground">{title}</h2>
          {description && (
            <p className={`text-sm md:text-base text-muted-foreground ${descMaxClass}`.trim()}>
              {description}
            </p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </header>
  );
}
