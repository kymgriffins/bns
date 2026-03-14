'use client';

import React from 'react';

export interface Container2026Props {
  children: React.ReactNode;
  className?: string;
  /** Narrow reading width (e.g. for long copy) */
  narrow?: boolean;
}

export function Container2026({
  children,
  className = '',
  narrow = false,
}: Container2026Props): React.ReactElement {
  return (
    <div
      className={`container-2026 ${narrow ? 'max-w-narrow' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
