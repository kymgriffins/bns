// lib/serverAuth.ts

/**
 * Fetch current user information from the proxy endpoint.  Should be called
 * from server components or route handlers.  Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<any | null> {
  try {
    const res = await fetch(`/api/auth/me`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}