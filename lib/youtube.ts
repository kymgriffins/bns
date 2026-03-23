/**
 * YouTube Service
 * Handles fetching videos, transcripts, and generating lessons from YouTube channel
 */

import { createClient } from '@supabase/supabase-js';

// Types
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  channelId: string;
  channelTitle: string;
  tags?: string[];
}

export interface VideoTranscript {
  videoId: string;
  transcript: TranscriptSegment[];
  generatedAt: string;
}

export interface TranscriptSegment {
  start: number;
  duration: number;
  text: string;
}

export interface KeyTakeaway {
  id: string;
  videoId: string;
  title: string;
  points: string[];
  summary: string;
  generatedAt: string;
}

export interface Lesson {
  id: string;
  video: YouTubeVideo;
  transcript?: VideoTranscript;
  takeaways?: KeyTakeaway[];
  createdAt: string;
  updatedAt: string;
}

// YouTube Data API v3 base URL
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

/**
 * Get YouTube API configuration
 */
function getYouTubeConfig() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID || process.env.YOUTUBE_CHANNEL_HANDLE;
  const maxVideos = parseInt(process.env.YOUTUBE_MAX_VIDEOS || '20');
  const autoTranscript = process.env.YOUTUBE_AUTO_TRANSCRIPT === 'true';

  if (!channelId) {
    throw new Error('YouTube Channel ID is not configured');
  }

  return { apiKey, channelId, maxVideos, autoTranscript };
}

/**
 * Check if YouTube API is configured
 */
function hasYouTubeApiKey(): boolean {
  return !!process.env.YOUTUBE_API_KEY;
}

/**
 * Fetch videos using YouTube RSS feed (no API key required)
 * RSS feed URL: https://www.youtube.com/feeds/videos.xml?channel_id=UCxxxx
 */
async function fetchVideosViaRSS(channelId: string, maxResults: number): Promise<YouTubeVideo[]> {
  // Try multiple RSS feed URLs (YouTube sometimes changes formats)
  const rssUrls = [
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId.replace('UC', 'UC')}`,
  ];
  
  let lastError: Error | null = null;
  
  for (const rssUrl of rssUrls) {
    try {
      const response = await fetch(rssUrl, {
        headers: {
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        // Add cache-busting
        next: { revalidate: 300 }, // 5 minutes
      });
      
      if (!response.ok) {
        // Try next URL
        continue;
      }
      
      const xmlText = await response.text();
      
      // Check if we got valid XML (not an error page)
      if (!xmlText.includes('<entry>')) {
        continue;
      }
      
      // Parse XML to extract video entries
      const videoEntries = xmlText.match(/<entry>[\s\S]*?<\/entry>/g) || [];
      
      if (videoEntries.length === 0) {
        continue;
      }
      
      const videos: YouTubeVideo[] = videoEntries.slice(0, maxResults).map((entry: string) => {
        const getTagContent = (tag: string): string => {
          const match = entry.match(new RegExp(`<${tag}[^>]*>([^<]+)</${tag}>`));
          return match ? match[1] : '';
        };
        
        // Extract video ID from yt:videoId or videoId attribute
        const videoIdMatch = entry.match(/<(?:yt:)?videoId[^>]*>([^<]+)<\/(?:yt:)?videoId>|<videoId=["']([^"']+)["']/);
        const videoId = videoIdMatch ? (videoIdMatch[1] || videoIdMatch[2]) : '';
        
        const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
        const publishedAt = publishedMatch ? publishedMatch[1] : new Date().toISOString();
        
        // Get thumbnail from media:thumbnail
        const thumbnailMatch = entry.match(/url="([^"]+)"/);
        const thumbnail = thumbnailMatch ? thumbnailMatch[1] : '';
        
        return {
          id: videoId,
          title: getTagContent('title'),
          description: getTagContent('summary') || getTagContent('content'),
          thumbnail: thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''),
          publishedAt,
          duration: 'PT0M0S', // RSS doesn't provide duration
          viewCount: 0,       // RSS doesn't provide view count
          likeCount: 0,       // RSS doesn't provide like count
          channelId,
          channelTitle: getTagContent('name') || getTagContent('author'),
          tags: [],
        };
      });
      
      // If we got valid videos, return them
      if (videos.length > 0 && videos[0].id) {
        return videos;
      }
    } catch (error) {
      lastError = error as Error;
      console.log(`RSS attempt failed, trying next URL...`);
    }
  }
  
  // If all RSS attempts fail, throw error to trigger fallback
  console.error('All RSS fetch attempts failed:', lastError);
  throw lastError || new Error('Failed to fetch from all RSS sources');
}

/**
 * Extract channel ID from various formats (handle, username, or URL)
 */
export async function resolveChannelId(channelIdentifier: string): Promise<string> {
  const { apiKey } = getYouTubeConfig();
  
  // If it's already a UC... channel ID, return as-is
  if (channelIdentifier.startsWith('UC')) {
    return channelIdentifier;
  }

  // Remove @ if present
  const handle = channelIdentifier.replace('@', '');
  
  // Try to fetch by handle
  const url = `${YOUTUBE_API_BASE}/channels?part=snippet&forHandle=${handle}&key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return data.items[0].id;
    }
  } catch (error) {
    console.error('Error resolving channel handle:', error);
  }

  // Fallback: try by username (less common)
  const usernameUrl = `${YOUTUBE_API_BASE}/channels?part=snippet&forUsername=${handle}&key=${apiKey}`;
  
  try {
    const response = await fetch(usernameUrl);
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return data.items[0].id;
    }
  } catch (error) {
    console.error('Error resolving channel username:', error);
  }

  throw new Error(`Could not resolve channel ID for: ${channelIdentifier}`);
}

/**
 * Fetch latest videos from a YouTube channel
 */
export async function fetchChannelVideos(maxResults?: number): Promise<YouTubeVideo[]> {
  const { apiKey, channelId, maxVideos } = getYouTubeConfig();
  const limit = maxResults || maxVideos;

  // Resolve channel ID if it's a handle
  let resolvedChannelId = channelId;
  if (channelId.startsWith('@')) {
    resolvedChannelId = await resolveChannelId(channelId);
  }

  // Use RSS feed if no API key is available
  if (!apiKey) {
    console.log('No YouTube API key found, using RSS feed fallback');
    return fetchVideosViaRSS(resolvedChannelId, limit);
  }

  const url = `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${resolvedChannelId}&order=date&type=video&maxResults=${limit}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`YouTube API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return [];
    }

    // Get video IDs for duration and statistics
    const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
    const detailsUrl = `${YOUTUBE_API_BASE}/videos?part=contentDetails,statistics,snippet&id=${videoIds}&key=${apiKey}`;
    
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    // Map video details
    const videoDetailsMap = new Map();
    if (detailsData.items) {
      detailsData.items.forEach((item: any) => {
        videoDetailsMap.set(item.id, {
          duration: item.contentDetails?.duration,
          viewCount: parseInt(item.statistics?.viewCount || '0'),
          likeCount: parseInt(item.statistics?.likeCount || '0'),
          tags: item.snippet?.tags || [],
        });
      });
    }

    // Combine data
    const videos: YouTubeVideo[] = data.items.map((item: any) => {
      const details = videoDetailsMap.get(item.id.videoId) || {};
      
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
        publishedAt: item.snippet.publishedAt,
        duration: details.duration || 'PT0M0S',
        viewCount: details.viewCount || 0,
        likeCount: details.likeCount || 0,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        tags: details.tags,
      };
    });

    return videos;
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    throw error;
  }
}

/**
 * Fetch video info using oEmbed (no API key required)
 */
async function fetchVideoViaOEmbed(videoId: string): Promise<YouTubeVideo | null> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(oembedUrl);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    return {
      id: videoId,
      title: data.title || 'Untitled Video',
      description: '',
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      publishedAt: new Date().toISOString(),
      duration: 'PT0M0S',
      viewCount: 0,
      likeCount: 0,
      channelId: '',
      channelTitle: data.author_name || 'Unknown Channel',
      tags: [],
    };
  } catch (error) {
    console.error('Error fetching video via oEmbed:', error);
    return null;
  }
}

/**
 * Fetch a single video by ID
 */
export async function fetchVideoById(videoId: string): Promise<YouTubeVideo | null> {
  const { apiKey } = getYouTubeConfig();

  // Use oEmbed if no API key is available
  if (!apiKey) {
    console.log('No YouTube API key found, using oEmbed fallback');
    return fetchVideoViaOEmbed(videoId);
  }

  const url = `${YOUTUBE_API_BASE}/videos?part=contentDetails,statistics,snippet&id=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const item = data.items[0];
    
    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
      publishedAt: item.snippet.publishedAt,
      duration: item.contentDetails?.duration,
      viewCount: parseInt(item.statistics?.viewCount || '0'),
      likeCount: parseInt(item.statistics?.likeCount || '0'),
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      tags: item.snippet?.tags || [],
    };
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
}

/**
 * Parse ISO 8601 duration to human readable format
 */
export function parseDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
  if (!match) return '0:00';
  
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Fetch video captions (transcript)
 * Note: YouTube Data API doesn't provide captions directly, this uses a workaround
 * For production, consider using a third-party service like Rev.com or AssemblyAI
 */
export async function fetchVideoTranscript(videoId: string): Promise<VideoTranscript | null> {
  // This is a placeholder - YouTube doesn't provide captions via API directly
  // In production, you would use a service like:
  // - AssemblyAI (https://www.assemblyai.com)
  // - Rev.com API
  // - or scrape from YouTube's caption files
  
  // For now, we'll return null and let the UI handle it gracefully
  console.log(`Transcript fetch requested for video: ${videoId} (requires third-party service)`);
  
  return null;
}

/**
 * Generate key takeaways from transcript using OpenAI
 */
export async function generateKeyTakeaways(
  video: YouTubeVideo, 
  transcript?: string
): Promise<KeyTakeaway | null> {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  
  if (!openaiApiKey) {
    console.log('OpenAI API key not configured, skipping key takeaways generation');
    return null;
  }

  // If no transcript, try to get it or use description
  const contentToAnalyze = transcript || video.description;
  
  if (!contentToAnalyze || contentToAnalyze.length < 50) {
    console.log('Not enough content to generate key takeaways');
    return null;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an educational content analyzer. Create concise key takeaways from YouTube video content.
            
Format your response as JSON with this exact structure:
{
  "title": "A compelling title for the lesson (max 80 chars)",
  "summary": "A brief 2-3 sentence summary of the video content",
  "points": ["3-5 key learning points, each as a concise sentence"]
}

Focus on actionable insights and educational value.`
          },
          {
            role: 'user',
            content: `Video Title: ${video.title}\n\nVideo Description: ${video.description}\n\nTranscript (if available): ${transcript?.substring(0, 4000) || 'Not available'}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return null;
    }

    // Parse JSON response
    const parsed = JSON.parse(content);

    return {
      id: `takeaway-${video.id}`,
      videoId: video.id,
      title: parsed.title,
      summary: parsed.summary,
      points: parsed.points,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error generating key takeaways:', error);
    return null;
  }
}

/**
 * Format view count for display
 */
export function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Get Supabase client for storing lessons
 */
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

/**
 * Save lesson to database
 */
export async function saveLesson(lesson: Lesson): Promise<boolean> {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    console.log('Supabase not configured, skipping lesson save');
    return false;
  }

  try {
    const { error } = await supabase
      .from('lessons')
      .upsert({
        id: lesson.id,
        video_id: lesson.video.id,
        video_title: lesson.video.title,
        video_description: lesson.video.description,
        video_thumbnail: lesson.video.thumbnail,
        video_published_at: lesson.video.publishedAt,
        video_duration: lesson.video.duration,
        video_view_count: lesson.video.viewCount,
        video_channel_id: lesson.video.channelId,
        video_channel_title: lesson.video.channelTitle,
        video_tags: lesson.video.tags,
        transcript_json: lesson.transcript ? JSON.stringify(lesson.transcript) : null,
        takeaways_json: lesson.takeaways ? JSON.stringify(lesson.takeaways) : null,
        created_at: lesson.createdAt,
        updated_at: lesson.updatedAt,
      }, {
        onConflict: 'video_id',
      });

    if (error) {
      console.error('Error saving lesson:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving lesson:', error);
    return false;
  }
}

/**
 * Fetch lessons from database
 */
export async function fetchLessonsFromDB(limit = 20): Promise<Lesson[]> {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('video_published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching lessons:', error);
      return [];
    }

    return data?.map((row: any) => ({
      id: row.id,
      video: {
        id: row.video_id,
        title: row.video_title,
        description: row.video_description,
        thumbnail: row.video_thumbnail,
        publishedAt: row.video_published_at,
        duration: row.video_duration,
        viewCount: row.video_view_count,
        likeCount: row.video_like_count || 0,
        channelId: row.video_channel_id,
        channelTitle: row.video_channel_title,
        tags: row.video_tags,
      },
      transcript: row.transcript_json ? JSON.parse(row.transcript_json) : undefined,
      takeaways: row.takeaways_json ? JSON.parse(row.takeaways_json) : undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })) || [];
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
}
