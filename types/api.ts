// types/api.ts

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  content_html: string;
  post_type:
    | 'investigation'
    | 'explainer'
    | 'update'
    | 'field_report'
    | 'opinion'
    | 'sponsored';
  categories: Category[];
  tags: string[];
  featured_image: string;
  author: User;
  status: 'draft' | 'review' | 'published' | 'archived';
  published_at: string;
  view_count: number;
  read_time_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface VideoContent {
  id: string;
  title: string;
  slug: string;
  description: string;
  platform: 'tiktok' | 'youtube' | 'x' | 'facebook' | 'instagram';
  external_id: string;
  external_url: string;
  embed_url: string;
  thumbnail_url: string;
  content_type: string;
  duration_seconds: number;
  view_count: number;
  like_count: number;
  share_count: number;
  is_featured: boolean;
  is_published: boolean;
  published_at: string;
  categories: Category[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export interface Donation {
  id: number;
  amount: number;
  currency: string;
  donor_name: string;
  donor_email: string;
  status: 'pending' | 'completed' | 'failed';
  completed_at: string;
}
