'use client';

import React from 'react';

export interface SectionHeaderProps {
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
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
    // space-y-3 → space-y-5 — label + title + description need room to read separately
    <header className={`space-y-5 ${alignClass} ${className}`.trim()}>
      {label && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </p>
      )}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div className="space-y-3">
          <h2 className="text-h2-2026 font-semibold leading-tight text-foreground">{title}</h2>
          {description && (
            // description text capped tighter — forces concise copy
            <p className={`text-sm md:text-base text-muted-foreground leading-relaxed ${descMaxClass}`.trim()}>
              {description}
            </p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </header>
  );
}