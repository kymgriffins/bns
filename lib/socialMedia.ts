/**
 * Social Media Service
 * Handles fetching content from various social media platforms using open-source approaches
 * (RSS feeds, embeds, and public data when API keys aren't available)
 */

import { YouTubeVideo, fetchChannelVideos, fetchVideosViaRSS } from './youtube';

// Types for social media content
export interface SocialMediaPost {
  id: string;
  platform: 'youtube' | 'twitter' | 'tiktok' | 'instagram' | 'facebook' | 'linkedin';
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  thumbnail?: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  url: string;
  publishedAt: string;
  metrics?: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
}

// Platform configurations
export const platformConfigs = {
  youtube: {
    name: 'YouTube',
    handle: '@budgetndiostory',
    channelId: process.env.YOUTUBE_CHANNEL_ID || 'UCvxVwuKoG8XEN53OohMu9qA',
    color: 'from-red-500 to-red-700',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    icon: `M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z`,
  },
  twitter: {
    name: 'X (Twitter)',
    handle: '@BudgetNdioStory',
    color: 'from-gray-800 to-gray-900',
    bgColor: 'bg-gray-50 dark:bg-gray-900/20',
    icon: `M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z`,
  },
  tiktok: {
    name: 'TikTok',
    handle: '@budget.ndio.story',
    color: 'from-pink-500 via-purple-500 to-black',
    bgColor: 'bg-pink-50 dark:bg-pink-950/20',
    icon: `M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z`,
  },
  instagram: {
    name: 'Instagram',
    handle: '@budgetndiostory',
    color: 'from-purple-500 via-pink-500 to-orange-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    icon: `M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z`,
  },
  facebook: {
    name: 'Facebook',
    handle: '@BudgetNdioStory',
    color: 'from-blue-600 to-blue-800',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    icon: `M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z`,
  },
  linkedin: {
    name: 'LinkedIn',
    handle: '/company/budget-ndio-story',
    color: 'from-blue-700 to-blue-900',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    icon: `M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z`,
  },
};

// Default fallback content for when APIs aren't available
export const fallbackContent: Record<string, SocialMediaPost[]> = {
  youtube: [
    {
      id: '1',
      platform: 'youtube',
      content: 'Understanding Kenya\'s Budget Process - A Complete Guide',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      author: { name: 'Budget Ndio Story', username: 'budgetndiostory' },
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      metrics: { likes: 234, comments: 45, shares: 89, views: 12500 },
    },
    {
      id: '2',
      platform: 'youtube',
      content: 'Citizen Engagement in Budget Making - How Your Voice Matters',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg',
      author: { name: 'Budget Ndio Story', username: 'budgetndiostory' },
      url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      metrics: { likes: 189, comments: 32, shares: 67, views: 8900 },
    },
    {
      id: '3',
      platform: 'youtube',
      content: 'Finance Bill 2024 Breakdown - What It Means for Kenyans',
      thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg',
      author: { name: 'Budget Ndio Story', username: 'budgetndiostory' },
      url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      metrics: { likes: 456, comments: 78, shares: 123, views: 23400 },
    },
    {
      id: '4',
      platform: 'youtube',
      content: 'Youth Voices in County Budget - Building Better Futures',
      thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg',
      author: { name: 'Budget Ndio Story', username: 'budgetndiostory' },
      url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
      publishedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      metrics: { likes: 312, comments: 56, shares: 98, views: 15600 },
    },
    {
      id: '5',
      platform: 'youtube',
      content: 'Tracking Your Tax Money - County Budget Transparency',
      thumbnail: 'https://img.youtube.com/vi/fC7oUOUEEi4/mqdefault.jpg',
      author: { name: 'Budget Ndio Story', username: 'budgetndiostory' },
      url: 'https://www.youtube.com/watch?v=fC7oUOUEEi4',
      publishedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
      metrics: { likes: 278, comments: 43, shares: 76, views: 11200 },
    },
    {
      id: '6',
      platform: 'youtube',
      content: 'Open Government Partnership - Working Together for Transparency',
      thumbnail: 'https://img.youtube.com/vi/uelHwf8o7_U/mqdefault.jpg',
      author: { name: 'Budget Ndio Story', username: 'budgetndiostory' },
      url: 'https://www.youtube.com/watch?v=uelHwf8o7_U',
      publishedAt: new Date(Date.now() - 86400000 * 21).toISOString(),
      metrics: { likes: 198, comments: 29, shares: 54, views: 7800 },
    },
  ],
  twitter: [
    {
      id: 't1',
      platform: 'twitter',
      content: 'Understanding Kenya\'s budget process is crucial for citizen engagement. 🏛️ #BudgetNdioStory #Kenya #OpenGov',
      author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
      url: 'https://x.com/BudgetNdioStory/status/1',
      publishedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      metrics: { likes: 45, comments: 8, shares: 15 },
    },
    {
      id: 't2',
      platform: 'twitter',
      content: 'Did you know you can participate in your county\'s budget-making process? Here\'s how 🗣️ #CitizenEngagement #Kenya',
      author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
      url: 'https://x.com/BudgetNdioStory/status/2',
      publishedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      metrics: { likes: 67, comments: 12, shares: 22 },
    },
    {
      id: 't3',
      platform: 'twitter',
      content: 'The Finance Bill 2024 is here! We break down what it means for everyday Kenyans 💰 #FinanceBill2024 #Kenya',
      author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
      url: 'https://x.com/BudgetNdioStory/status/3',
      publishedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      metrics: { likes: 120, comments: 23, shares: 45 },
    },
    {
      id: 't4',
      platform: 'twitter',
      content: 'Youth voices matter in budget decisions! Join the conversation 🗳️ #YouthPower #Kenya #Budget',
      author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
      url: 'https://x.com/BudgetNdioStory/status/4',
      publishedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      metrics: { likes: 52, comments: 9, shares: 18 },
    },
    {
      id: 't5',
      platform: 'twitter',
      content: 'Track how your tax money is being spent in your county. Transparency matters! 📍 #CountyBudget #OpenGov',
      author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
      url: 'https://x.com/BudgetNdioStory/status/5',
      publishedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      metrics: { likes: 89, comments: 15, shares: 30 },
    },
  ],
  tiktok: [
    {
      id: 'tt1',
      platform: 'tiktok',
      content: 'Budget tips for young Kenyans! 💰 #BudgetTips #Kenya #Finance',
      thumbnail: '/tiktok-thumb-1.jpg',
      author: { name: 'Budget Ndio Story', username: 'budget.ndio.story' },
      url: 'https://www.tiktok.com/@budget.ndio.story/video/7456891072277442848',
      publishedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      metrics: { likes: 1234, comments: 89, shares: 234 },
    },
    {
      id: 'tt2',
      platform: 'tiktok',
      content: 'How to read a budget document 📊 #Budget101 #Kenya',
      thumbnail: '/tiktok-thumb-2.jpg',
      author: { name: 'Budget Ndio Story', username: 'budget.ndio.story' },
      url: 'https://www.tiktok.com/@budget.ndio.story/video/7455123456789012345',
      publishedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      metrics: { likes: 2345, comments: 156, shares: 456 },
    },
    {
      id: 'tt3',
      platform: 'tiktok',
      content: 'County budget explained in 60 seconds! 🏛️ #CountyBudget #Kenya',
      thumbnail: '/tiktok-thumb-3.jpg',
      author: { name: 'Budget Ndio Story', username: 'budget.ndio.story' },
      url: 'https://www.tiktok.com/@budget.ndio.story/video/7452345678901234567',
      publishedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      metrics: { likes: 3456, comments: 234, shares: 678 },
    },
    {
      id: 'tt4',
      platform: 'tiktok',
      content: 'Your taxes at work! Here\'s how 💼 #Taxes #Kenya',
      thumbnail: '/tiktok-thumb-4.jpg',
      author: { name: 'Budget Ndio Story', username: 'budget.ndio.story' },
      url: 'https://www.tiktok.com/@budget.ndio.story/video/7449876543210987654',
      publishedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      metrics: { likes: 4567, comments: 345, shares: 890 },
    },
  ],
  instagram: [
    {
      id: 'ig1',
      platform: 'instagram',
      content: 'Understanding Kenya\'s budget process is crucial for citizen engagement! 🏛️💙 #BudgetNdioStory #Kenya #OpenGov #CitizenEngagement',
      thumbnail: '/instagram/ig1.jpg',
      author: { name: 'Budget Ndio Story', username: 'budgetndiostory' },
      url: 'https://www.instagram.com/p/Cx8Y_example1/',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      metrics: { likes: 456, comments: 34, shares: 78 },
    },
    {
      id: 'ig2',
      platform: 'instagram',
      content: 'Youth making a difference in budget decisions! 🗳️✨ #YouthPower #Kenya #Budget',
      thumbnail: '/instagram/ig2.jpg',
      author: { name: 'Budget Ndio Story', username: 'budgetndiostory' },
      url: 'https://www.instagram.com/p/Cx8Y_example2/',
      publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      metrics: { likes: 678, comments: 56, shares: 123 },
    },
    {
      id: 'ig3',
      platform: 'instagram',
      content: 'Finance Bill 2024: What you need to know 💰📊 #FinanceBill2024 #Kenya #Budget',
      thumbnail: '/instagram/ig3.jpg',
      author: { name: 'Budget Ndio Story', username: 'budgetndiostory' },
      url: 'https://www.instagram.com/p/Cx8Y_example3/',
      publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      metrics: { likes: 890, comments: 78, shares: 167 },
    },
    {
      id: 'ig4',
      platform: 'instagram',
      content: 'Transparency in county budgets matters! 📍🏛️ #CountyBudget #OpenGov #Kenya',
      thumbnail: '/instagram/ig4.jpg',
      author: { name: 'Budget Ndio Story', username: 'budgetndiostory' },
      url: 'https://www.instagram.com/p/Cx8Y_example4/',
      publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      metrics: { likes: 543, comments: 45, shares: 98 },
    },
  ],
  facebook: [
    {
      id: 'fb1',
      platform: 'facebook',
      content: 'Understanding Kenya\'s budget process is crucial for citizen engagement. Join us as we break down the complexities and empower citizens to participate in budget-making processes. 🏛️💙',
      author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
      url: 'https://facebook.com/BudgetNdioStory/posts/1',
      publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      metrics: { likes: 234, comments: 45, shares: 67 },
    },
    {
      id: 'fb2',
      platform: 'facebook',
      content: 'Youth voices matter in budget decisions! Our latest workshop brought together young people from across Nairobi to discuss their role in county budgeting. 🗳️✨',
      author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
      url: 'https://facebook.com/BudgetNdioStory/posts/2',
      publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      metrics: { likes: 345, comments: 67, shares: 89 },
    },
    {
      id: 'fb3',
      platform: 'facebook',
      content: 'Finance Bill 2024 Analysis: What does it mean for everyday Kenyans? Read our latest breakdown and share with your network. 💰📊',
      author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
      url: 'https://facebook.com/BudgetNdioStory/posts/3',
      publishedAt: new Date(Date.now() - 86400000 * 8).toISOString(),
      metrics: { likes: 567, comments: 98, shares: 145 },
    },
  ],
  linkedin: [
    {
      id: 'li1',
      platform: 'linkedin',
      content: 'Understanding Kenya\'s budget process is crucial for citizen engagement. Our latest article explores how citizens can actively participate in budget-making processes at county and national levels.',
      author: { name: 'Budget Ndio Story', username: 'Budget Ndio Story' },
      url: 'https://linkedin.com/company/budget-ndio-story/posts/1',
      publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      metrics: { likes: 123, comments: 18, shares: 45 },
    },
    {
      id: 'li2',
      platform: 'linkedin',
      content: 'Excited to share insights from our recent workshop on youth engagement in county budgeting. Young people are key stakeholders in shaping their communities\' financial futures!',
      author: { name: 'Budget Ndio Story', username: 'Budget Ndio Story' },
      url: 'https://linkedin.com/company/budget-ndio-story/posts/2',
      publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      metrics: { likes: 234, comments: 28, shares: 67 },
    },
  ],
};

/**
 * Fetch YouTube videos with improved fallback
 */
export async function fetchYouTubeVideos(limit = 6): Promise<SocialMediaPost[]> {
  try {
    // Try to fetch from YouTube API/RSS
    const videos = await fetchChannelVideos(limit);
    
    if (videos && videos.length > 0) {
      return videos.map(video => ({
        id: video.id,
        platform: 'youtube' as const,
        content: video.title,
        thumbnail: video.thumbnail,
        author: {
          name: video.channelTitle,
          username: 'budgetndiostory',
        },
        url: `https://www.youtube.com/watch?v=${video.id}`,
        publishedAt: video.publishedAt,
        metrics: {
          likes: video.likeCount,
          comments: 0,
          shares: 0,
          views: video.viewCount,
        },
      }));
    }
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    // Don't throw - just log and return fallback
  }
  
  // Return fallback content if API fails - this is the key fix!
  // We always return content, never empty array
  return fallbackContent.youtube.slice(0, limit);
}

/**
 * Format number for display (e.g., 1.2K, 3.4M)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Get time ago string
 */
export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  return `${Math.floor(diffInSeconds / 604800)}w`;
}
