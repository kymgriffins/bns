// Marketing Analytics Utility
// This module provides functions to track marketing events across the app

import { trackEvent } from '@/hooks/useConsent';

// Marketing Event Types
export type MarketingEvent = 
  | 'page_view'
  | 'sign_up'
  | 'login'
  | 'newsletter_subscribe'
  | 'donation_start'
  | 'donation_complete'
  | 'blog_read'
  | 'news_read'
  | 'video_watch'
  | 'download'
  | 'share'
  | 'search'
  | 'contact_form_submit'
  | 'social_follow'
  | 'ad_click';

// Page View Tracking
export function trackPageView(pagePath: string, pageTitle: string) {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}

// User Events
export function trackSignUp(method: string) {
  trackEvent('sign_up', {
    method,
  });
}

export function trackLogin(method: string) {
  trackEvent('login', {
    method,
  });
}

// Newsletter Events
export function trackNewsletterSubscribe(source: string) {
  trackEvent('newsletter_subscribe', {
    source,
  });
}

// Donation Events
export function trackDonationStart(amount: number, currency: string = 'KES') {
  trackEvent('begin_checkout', {
    value: amount,
    currency,
    items: [{ item_name: 'donation' }],
  });
}

export function trackDonationComplete(amount: number, currency: string = 'KES') {
  trackEvent('purchase', {
    value: amount,
    currency,
    transaction_id: `donation_${Date.now()}`,
    items: [{ item_name: 'donation' }],
  });
}

// Content Engagement
export function trackBlogRead(blogId: string, category: string) {
  trackEvent('blog_read', {
    blog_id: blogId,
    category,
  });
}

export function trackNewsRead(newsId: string, category: string) {
  trackEvent('news_read', {
    news_id: newsId,
    category,
  });
}

export function trackVideoWatch(videoId: string, duration: number) {
  trackEvent('video_watch', {
    video_id: videoId,
    duration,
  });
}

export function trackDownload(fileType: string, fileName: string) {
  trackEvent('file_download', {
    file_type: fileType,
    file_name: fileName,
  });
}

export function trackShare(contentType: string, contentId: string, platform: string) {
  trackEvent('share', {
    content_type: contentType,
    content_id: contentId,
    platform,
  });
}

// Search Events
export function trackSearch(searchTerm: string, resultsCount: number) {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

// Form Events
export function trackContactFormSubmit(formType: string) {
  trackEvent('contact_form_submit', {
    form_type: formType,
  });
}

// Social Events
export function trackSocialFollow(platform: string) {
  trackEvent('social_follow', {
    platform,
  });
}

// Ad Events
export function trackAdClick(adId: string, adType: string) {
  trackEvent('ad_click', {
    ad_id: adId,
    ad_type: adType,
  });
}

// Custom User Properties
export function setUserProperties(properties: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
}

// E-commerce Enhanced Events (for future use)
export function trackViewItem(itemId: string, itemName: string, category: string, price: number) {
  trackEvent('view_item', {
    items: [{
      item_id: itemId,
      item_name: itemName,
      item_category: category,
      price,
    }],
  });
}

export function trackAddToCart(itemId: string, itemName: string, price: number, quantity: number = 1) {
  trackEvent('add_to_cart', {
    items: [{
      item_id: itemId,
      item_name: itemName,
      price,
      quantity,
    }],
  });
}

export function trackRemoveFromCart(itemId: string, itemName: string, price: number) {
  trackEvent('remove_from_cart', {
    items: [{
      item_id: itemId,
      item_name: itemName,
      price,
    }],
  });
}

// Lead Generation
export function trackGenerateLead(source: string, value?: number) {
  trackEvent('generate_lead', {
    source,
    value,
  });
}

// Signup Conversion Value
export function trackSignUpConversion(value: number = 1) {
  trackEvent('sign_up_conversion', {
    value,
  });
}

// =============================================================================
// BNS unified event schema (2026) – CTAs, learning, donations
// =============================================================================

export type BnsCtaLocation =
  | 'hero_primary'
  | 'hero_secondary'
  | 'section_reports'
  | 'section_learn'
  | 'section_take_action'
  | 'section_donate'
  | 'learn_hub'
  | 'budget_101'
  | 'media_hub'
  | 'footer';

/** Track CTA clicks for funnel analysis */
export function trackBnsCtaClick(location: BnsCtaLocation, label: string, href?: string) {
  trackEvent('bns_cta_click', {
    location,
    label,
    href: href ?? undefined,
  });
}

/** Track learning module progress (Budget 101, etc.) */
export function trackBnsModuleProgress(
  moduleId: string,
  step: string,
  progressPercent: number,
  completed?: boolean
) {
  trackEvent('bns_module_progress', {
    module_id: moduleId,
    step,
    progress_percent: progressPercent,
    completed: completed ?? false,
  });
}

/** Track donation funnel steps */
export function trackBnsDonationStep(step: 'view' | 'start' | 'complete' | 'abandon', amount?: number) {
  trackEvent('bns_donation_step', {
    step,
    amount: amount ?? undefined,
  });
}
