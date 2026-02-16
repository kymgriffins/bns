import { Suspense } from 'react';
import { AuthButton } from './auth-button';

/**
 * NavAuth is a Server Component that wraps AuthButton with Suspense.
 * This allows the server-side authentication check to work properly
 * even when used within Client Components.
 */
export async function NavAuth() {
  return (
    <Suspense fallback={<AuthButtonFallback />}>
      <AuthButton />
    </Suspense>
  );
}

function AuthButtonFallback() {
  return (
    <div className="flex gap-2">
      <div className="h-8 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
      <div className="h-8 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
    </div>
  );
}
