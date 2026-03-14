'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { trackBnsCtaClick, type BnsCtaLocation } from '@/lib/analytics';

type TrackedLinkProps = ComponentProps<typeof Link> & {
  ctaLocation: BnsCtaLocation;
  ctaLabel: string;
};

export function TrackedLink({ ctaLocation, ctaLabel, href, children, ...props }: TrackedLinkProps) {
  const url = typeof href === 'string' ? href : href?.pathname ?? '';
  return (
    <Link
      href={href}
      {...props}
      onClick={() => trackBnsCtaClick(ctaLocation, ctaLabel, url)}
    >
      {children}
    </Link>
  );
}
