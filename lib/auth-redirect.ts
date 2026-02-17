/**
 * URL validation utility to prevent open redirect vulnerabilities.
 * Ensures redirect URLs are safe by validating they point to the same origin
 * and don't contain malicious patterns.
 */

/**
 * List of allowed paths that can be used as redirect destinations.
 * These are internal application paths that are safe to redirect to.
 */
const ALLOWED_PATHS = [
  '/',
  '/home',
  '/admin',
  '/protected',
  '/dashboard-shell-01',
  '/insights',
  '/reports',
  '/tracker',
  '/learn',
  '/news',
  '/take-action',
  '/subscribe',
];

/**
 * Regular expression patterns that indicate potentially dangerous URLs
 */
const DANGEROUS_PATTERNS = [
  /^javascript:/i,
  /^data:/i,
  /^vbscript:/i,
  /^mailto:/i,
  /^tel:/i,
  /\/\//, // Absolute URLs to different origins
  /^.\//, // Relative paths starting with ./
  /^\.\./, // Paths trying to go up directory
];

/**
 * Default fallback URL when no valid redirect URL is provided
 */
export const DEFAULT_REDIRECT_URL = '/';

/**
 * Validates if a URL is safe to redirect to.
 * 
 * @param url - The URL to validate
 * @param baseUrl - The base URL of the application (default: '/')
 * @returns The validated safe URL or null if invalid
 */
export function validateRedirectUrl(url: string | null | undefined, baseUrl: string = '/'): string | null {
  // If no URL provided, return null (will use default)
  if (!url) {
    return null;
  }

  // Check for dangerous patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(url)) {
      console.warn(`Blocked potentially dangerous redirect URL: ${url}`);
      return null;
    }
  }

  // If it's an absolute URL, check if it's on the same origin
  try {
    const urlObj = new URL(url, 'http://localhost');
    // If the URL has a different origin, it's potentially dangerous
    if (urlObj.origin !== 'http://localhost' && urlObj.origin !== 'http://localhost:3000') {
      // For production, we need to check against the actual origin
      // This is a simplified check - in production, you'd want to compare against NEXT_PUBLIC_SITE_URL
      const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
      if (siteUrl && urlObj.origin !== siteUrl) {
        console.warn(`Blocked redirect to different origin: ${url}`);
        return null;
      }
    }
  } catch {
    // If URL parsing fails, it's likely invalid
    return null;
  }

  // Normalize the URL (remove query params and hash that could bypass validation)
  const normalizedUrl = url.split('?')[0].split('#')[0];

  // Check if it's an allowed path
  if (ALLOWED_PATHS.some(path => normalizedUrl === path || normalizedUrl.startsWith(path + '/'))) {
    return normalizedUrl;
  }

  // Check if it starts with a safe internal path (slash but not going up)
  if (url.startsWith('/') && !url.startsWith('/..') && !url.includes('/..')) {
    // Additional check: make sure it doesn't try to escape the app root
    const segments = url.split('/').filter(Boolean);
    if (!segments.includes('..') && !segments[0]?.startsWith('.')) {
      return normalizedUrl;
    }
  }

  // If none of the above, block the redirect
  console.warn(`Blocked redirect to untrusted path: ${url}`);
  return null;
}

/**
 * Gets the intended redirect URL from the current location or a fallback.
 * 
 * @param searchParams - Optional search params to extract redirect URL from
 * @param fallbackUrl - The fallback URL if no valid redirect is found
 * @returns The safe redirect URL
 */
export function getRedirectUrl(
  searchParams: URLSearchParams | null, 
  fallbackUrl: string = DEFAULT_REDIRECT_URL
): string {
  // Try to get from search params first
  const redirectParam = searchParams?.get('redirect');
  
  if (redirectParam) {
    const validated = validateRedirectUrl(redirectParam);
    if (validated) {
      return validated;
    }
  }

  // Fall back to default
  return fallbackUrl;
}

/**
 * Creates a login URL with the current path as the redirect destination.
 * 
 * @param currentPath - The current path the user was trying to access
 * @param loginPath - The path to the login page (default: '/auth/login')
 * @returns The login URL with redirect parameter
 */
export function createLoginRedirectUrl(
  currentPath: string, 
  loginPath: string = '/auth/login'
): string {
  // Encode the current path as the redirect parameter
  const encodedRedirect = encodeURIComponent(currentPath);
  return `${loginPath}?redirect=${encodedRedirect}`;
}
