/**
 * Budget Ndio Story - API Client
 * 
 * IMPORTANT: This backend uses Django REST Framework Session Authentication (NOT JWT)
 * 
 * Key differences from JWT:
 * - Uses cookies for authentication (not Bearer tokens)
 * - Requires credentials: 'include' on all fetch requests
 * - Requires CSRF token for POST/PUT/DELETE requests
 * 
 * Backend Endpoints Added:
 * - GET /api/csrf/ - Get CSRF token
 * - POST /api/auth/login/ - Login (JSON API)
 * - POST /api/auth/logout/ - Logout (JSON API)
 * - GET /api/auth/user/ - Get current user
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

// In-memory CSRF token cache
let csrfToken: string | null = null;

/**
 * Fetch CSRF token from the backend
 * Must be called before any mutating operations
 */
export async function fetchCsrfToken(): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/api/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    csrfToken = data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    throw error;
  }
}

/**
 * Get the current CSRF token, fetching if needed
 */
export function getCsrfToken(): string | null {
  return csrfToken;
}

/**
 * Core fetch wrapper with session authentication
 * 
 * CRITICAL: Always use credentials: 'include' for session auth
 */
export async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;
  let url = `${API_BASE}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...fetchOptions.headers,
  };

  // For mutating methods, ensure we have a CSRF token
  const method = (fetchOptions.method || 'GET').toUpperCase();
  const needsCsrf = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
  
  if (needsCsrf) {
    if (!csrfToken) {
      await fetchCsrfToken();
    }
    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    }
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
    credentials: 'include', // CRITICAL: Required for session auth
  });

  // Handle 401 - Not authenticated
  if (response.status === 401) {
    // Clear auth state and redirect to login
    setAuthState(null);
    throw new Error('Authentication required');
  }

  // Handle 403 - Forbidden
  if (response.status === 403) {
    throw new Error('Permission denied');
  }

  if (!response.ok) {
    let errorBody: any;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = await response.text();
    }
    const message =
      (errorBody && (errorBody.detail || errorBody.error || JSON.stringify(errorBody))) ||
      response.statusText ||
      'API request failed';
    throw new Error(message);
  }

  // Handle empty responses
  const text = await response.text();
  if (!text) {
    return {} as T;
  }
  
  try {
    return JSON.parse(text);
  } catch {
    return text as unknown as T;
  }
}

// ---- Auth State Management -------------------------------------------------

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

let authState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export function setAuthState(state: AuthState | null) {
  if (state === null) {
    authState = { user: null, isAuthenticated: false };
  } else {
    authState = state;
  }
}

export function getAuthState(): AuthState {
  return authState;
}

export function isAuthenticated(): boolean {
  return authState.isAuthenticated;
}

// ---- Authentication ---------------------------------------------------------

interface LoginResponse {
  success: boolean;
  user?: {
    id: number;
    username: string;
    email: string;
  };
  error?: string;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await fetchAPI<LoginResponse>('/api/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  
  if (response.success && response.user) {
    setAuthState({
      user: response.user as User,
      isAuthenticated: true,
    });
  }
  
  return response;
}

export async function logout(): Promise<void> {
  try {
    await fetchAPI('/api/auth/logout/', { method: 'POST' });
  } catch {
    // Ignore errors
  } finally {
    setAuthState(null);
  }
}

export async function refreshToken(): Promise<void> {
  try {
    await fetchAPI('/api/auth/refresh/', { method: 'POST' });
  } catch {
    setAuthState(null);
  }
}

export async function forgotPassword(email: string): Promise<void> {
  await fetchAPI('/api/auth/forgot-password/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function updatePassword(oldPassword: string, newPassword: string): Promise<void> {
  await fetchAPI('/api/auth/password/change/', {
    method: 'POST',
    body: JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
    }),
  });
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const user = await fetchAPI<User>('/api/auth/user/');
    setAuthState({ user, isAuthenticated: true });
    return user;
  } catch {
    setAuthState(null);
    return null;
  }
}

// ---- User Accounts ---------------------------------------------------------

import type {
  User,
  Category,
  BlogPost,
  VideoContent,
  PaginatedResponse,
  Subscriber,
  
} from "@/types/api";

export async function listUsers() {
  return fetchAPI<User[]>('/api/v1/accounts/users/');
}

export async function getUser(id: number) {
  return fetchAPI<User>(`/api/v1/accounts/users/${id}/`);
}

/**
 * Get currently authenticated user
 * Uses the /me endpoint which returns the logged-in user
 */
export async function getMe() {
  return fetchAPI<User>('/api/v1/accounts/users/me/');
}

/**
 * Create a new user (registration)
 */
export async function createUser(data: Partial<User> & { password: string }) {
  return fetchAPI<any>('/api/v1/accounts/users/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ---- Content --------------------------------------------------------------

/**
 * Get paginated blog posts
 * Endpoint: /api/v1/content/posts/
 */
export async function getBlogPosts(page = 1, pageSize = 20) {
  return fetchAPI<PaginatedResponse<BlogPost>>('/api/v1/content/posts/', {
    params: { page: String(page), page_size: String(pageSize) },
  });
}

/**
 * Get single blog post by slug
 * Endpoint: /api/v1/content/posts/{slug}/
 */
export async function getBlogPost(slug: string) {
  return fetchAPI<BlogPost>(`/api/v1/content/posts/${slug}/`);
}

/**
 * Get all categories
 * Endpoint: /api/v1/content/categories/
 */
export async function getCategories() {
  return fetchAPI<Category[]>('/api/v1/content/categories/');
}

/**
 * Get videos with optional filtering
 * Endpoint: /api/v1/content/videos/
 */
export async function getVideos(params?: {
  page?: number;
  page_size?: number;
  platform?: string;
  content_type?: string;
  search?: string;
}) {
  const searchParams: Record<string, string> = {};
  if (params?.page) searchParams.page = String(params.page);
  if (params?.page_size) searchParams.page_size = String(params.page_size);
  if (params?.platform) searchParams.platform = params.platform;
  if (params?.content_type) searchParams.content_type = params.content_type;
  if (params?.search) searchParams.search = params.search;
  
  return fetchAPI<PaginatedResponse<VideoContent>>('/api/v1/content/videos/', {
    params: Object.keys(searchParams).length > 0 ? searchParams : undefined,
  });
}

/**
 * Get featured videos
 * Endpoint: /api/v1/content/videos/featured/
 */
export async function getFeaturedVideos() {
  return fetchAPI<VideoContent[]>('/api/v1/content/videos/featured/');
}

/**
 * Get news items
 * Endpoint: /api/v1/content/news/
 */
export async function getNews(page = 1, pageSize = 20) {
  return fetchAPI<PaginatedResponse<BlogPost>>('/api/v1/content/news/', {
    params: { page: String(page), page_size: String(pageSize) },
  });
}

/**
 * Get breaking news
 * Endpoint: /api/v1/content/news/breaking/
 */
export async function getBreakingNews() {
  return fetchAPI<BlogPost[]>('/api/v1/content/news/breaking/');
}

// ---- Profile (Legacy - uses users/me) -------------------------------------

/**
 * Get current user's profile
 * Note: Uses /api/v1/accounts/users/me/ endpoint
 */
export async function getProfile() {
  return getMe();
}

/**
 * Update current user's profile
 * Note: Uses /api/v1/accounts/users/me/ endpoint with PATCH
 */
export async function updateProfile(data: Partial<User>) {
  return fetchAPI<User>('/api/v1/accounts/users/me/', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// ---- Newsletter -----------------------------------------------------------

/**
 * Subscribe to newsletter
 * Endpoint: /api/v1/newsletter/subscribers/
 */
export async function subscribeToNewsletter(email: string) {
  return fetchAPI<Subscriber>('/api/v1/newsletter/subscribers/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// ---- Sponsors & Donations -------------------------------------------------

/**
 * Get donations list
 * Endpoint: /api/v1/sponsors/donations/
 */
export async function getDonations(params?: { page?: number }) {
  const searchParams: Record<string, string> = {};
  if (params?.page) searchParams.page = String(params.page);
  
  return fetchAPI<PaginatedResponse<any>>('/api/v1/sponsors/donations/', {
    params: Object.keys(searchParams).length > 0 ? searchParams : undefined,
  });
}

/**
 * Create a donation
 * Endpoint: /api/v1/sponsors/donations/
 */
export async function createDonation(data: {
  amount: number;
  donor_name: string;
  donor_email: string;
  message?: string;
}) {
  return fetchAPI<any>('/api/v1/sponsors/donations/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ---- Analytics ------------------------------------------------------------

/**
 * Record a page view
 * Endpoint: /api/v1/analytics/pageviews/
 */
export async function recordPageView(data: {
  path: string;
  title?: string;
  referrer?: string;
}) {
  return fetchAPI<any>('/api/v1/analytics/pageviews/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Record video engagement
 * Endpoint: /api/v1/analytics/engagement/
 */
export async function recordVideoEngagement(data: {
  video_id: number;
  event_type: 'play' | 'pause' | 'complete' | 'seek';
  position: number;
}) {
  return fetchAPI<any>('/api/v1/analytics/engagement/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ---- Helpers --------------------------------------------------------------

/**
 * Build query string from object
 */
export function buildQuery(params: Record<string, any>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      search.append(k, String(v));
    }
  });
  const result = search.toString();
  return result ? `?${result}` : '';
}

// Default export with all functions
export default {
  // Auth
  login,
  logout,
  getCurrentUser,
  getMe,
  fetchCsrfToken,
  getCsrfToken,
  isAuthenticated,
  getAuthState,
  
  // Users
  listUsers,
  getUser,
  createUser,
  
  // Content
  getBlogPosts,
  getBlogPost,
  getCategories,
  getVideos,
  getFeaturedVideos,
  getNews,
  getBreakingNews,
  
  // Profile
  getProfile,
  updateProfile,
  
  // Newsletter
  subscribeToNewsletter,
  
  // Sponsors
  getDonations,
  createDonation,
  
  // Analytics
  recordPageView,
  recordVideoEngagement,
  
  // Helpers
  buildQuery,
  fetchAPI,
};
