/**
 * Organization Profile Type Definitions
 * These types define the structure of the organization profile data
 */

export interface OrganizationProfile {
  id: string;
  organization_name: string;
  logo_url: string | null;
  description: string | null;
  tagline: string | null;
  mission: string | null;
  vision: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website_url: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
  founded_year: number | null;
  registration_number: string | null;
  tax_id: string | null;
  industry: string | null;
  organization_type: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrganizationProfileUpdate {
  organization_name?: string;
  logo_url?: string | null;
  description?: string | null;
  tagline?: string | null;
  mission?: string | null;
  vision?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  website_url?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  facebook_url?: string | null;
  twitter_url?: string | null;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  youtube_url?: string | null;
  founded_year?: number | null;
  registration_number?: string | null;
  tax_id?: string | null;
  industry?: string | null;
  organization_type?: string | null;
}

export interface OrganizationApiResponse {
  data?: OrganizationProfile;
  error?: string;
  message?: string;
}

export interface OrganizationUpdateResponse {
  data?: OrganizationProfile;
  error?: string;
  message?: string;
  success?: boolean;
}

/**
 * Validation rules for organization profile fields
 */
export const ORGANIZATION_VALIDATION = {
  organization_name: {
    required: true,
    minLength: 2,
    maxLength: 200,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  website: {
    pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
  },
  phone: {
    pattern: /^\+?[\d\s-()]+$/,
    minLength: 10,
    maxLength: 20,
  },
  social_media: {
    pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
  },
  year: {
    min: 1900,
    max: new Date().getFullYear() + 1,
  },
} as const;

/**
 * Social media platform types
 */
export type SocialMediaPlatform = 
  | 'facebook' 
  | 'twitter' 
  | 'instagram' 
  | 'linkedin' 
  | 'youtube';

export interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}
