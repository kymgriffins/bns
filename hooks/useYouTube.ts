'use client';

import { useState, useEffect, useCallback } from 'react';

interface YouTubeVideo {
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
  formattedDuration?: string;
  formattedViewCount?: string;
}

interface KeyTakeaway {
  id: string;
  videoId: string;
  title: string;
  points: string[];
  summary: string;
}

interface Lesson {
  id: string;
  video: YouTubeVideo;
  takeaways?: KeyTakeaway[];
  createdAt: string;
  updatedAt: string;
}

interface UseYouTubeVideosResult {
  videos: YouTubeVideo[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseLessonsResult {
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch latest videos from YouTube channel
 */
export function useYouTubeVideos(limit = 10): UseYouTubeVideosResult {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/youtube/videos?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data = await response.json();
      setVideos(data.videos || []);
    } catch (err: any) {
      console.error('Error fetching YouTube videos:', err);
      setError(err.message || 'Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return {
    videos,
    loading,
    error,
    refetch: fetchVideos,
  };
}

/**
 * Hook to fetch lessons from database
 */
export function useLessons(limit = 20): UseLessonsResult {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLessons = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/youtube/lessons?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch lessons');
      }

      const data = await response.json();
      setLessons(data.lessons || []);
    } catch (err: any) {
      console.error('Error fetching lessons:', err);
      setError(err.message || 'Failed to fetch lessons');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return {
    lessons,
    loading,
    error,
    refetch: fetchLessons,
  };
}

/**
 * Hook to get the featured/latest video for landing page
 */
export function useFeaturedVideo(): {
  video: YouTubeVideo | null;
  loading: boolean;
  error: string | null;
} {
  const { videos, loading, error } = useYouTubeVideos(1);
  
  return {
    video: videos.length > 0 ? videos[0] : null,
    loading,
    error,
  };
}

/**
 * Sync videos from YouTube to database (admin function)
 */
export async function syncYouTubeVideos(limit = 10, generateTakeaways = true): Promise<{
  success: boolean;
  synced: number;
  error?: string;
}> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const params = new URLSearchParams({
      limit: limit.toString(),
      takeaways: generateTakeaways.toString(),
    });
    
    const response = await fetch(`${apiUrl}/api/youtube/sync?${params}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to sync videos');
    }

    const data = await response.json();
    return {
      success: true,
      synced: data.synced,
    };
  } catch (err: any) {
    console.error('Error syncing videos:', err);
    return {
      success: false,
      synced: 0,
      error: err.message,
    };
  }
}
