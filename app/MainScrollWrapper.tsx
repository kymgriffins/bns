'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * Wraps layout main so it acts as the scroll container (flex-1 min-h-0 overflow-y-auto).
 * On home/landing, adds landing-root for scroll-snap so navbar stays visible and landing sections snap.
 */
export function MainScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLanding = pathname === '/' || pathname === '/home';

  return (
    <main
      className={cn(
        'flex-1 min-h-0 overflow-y-auto overflow-x-hidden',
        isLanding && 'landing-root bg-background'
      )}
      role="main"
    >
      {children}
    </main>
  );
}
