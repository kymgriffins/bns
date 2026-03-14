'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views on route changes
    const pageTitle = document.title || 'Budget Ndio Story';
    trackPageView(pathname, pageTitle);
  }, [pathname]);

  return <>{children}</>;
}
