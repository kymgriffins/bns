import { NextResponse } from 'next/server';
import { fetchChannelVideos, fetchVideoById, parseDuration, formatViewCount } from '@/lib/youtube';

// GET /api/youtube/videos - Fetch latest videos from the configured YouTube channel
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const videoId = searchParams.get('videoId');

    // If a specific video ID is requested, fetch that video
    if (videoId) {
      const video = await fetchVideoById(videoId);
      
      if (!video) {
        return NextResponse.json(
          { error: 'Video not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        video: {
          ...video,
          formattedDuration: parseDuration(video.duration),
          formattedViewCount: formatViewCount(video.viewCount),
        },
      });
    }

    // Otherwise, fetch latest videos from channel
    const videos = await fetchChannelVideos(limit);

    // Format the response
    const formattedVideos = videos.map(video => ({
      ...video,
      formattedDuration: parseDuration(video.duration),
      formattedViewCount: formatViewCount(video.viewCount),
    }));

    return NextResponse.json({
      videos: formattedVideos,
      channelId: process.env.YOUTUBE_CHANNEL_ID || process.env.YOUTUBE_CHANNEL_HANDLE,
      total: formattedVideos.length,
    });
  } catch (error: any) {
    console.error('Error fetching YouTube videos:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
