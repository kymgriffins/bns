import { NextResponse } from 'next/server';
import { 
  fetchChannelVideos, 
  saveLesson, 
  Lesson, 
  generateKeyTakeaways,
  parseDuration,
  formatViewCount
} from '@/lib/youtube';

// POST /api/youtube/sync - Sync videos from YouTube and create lessons
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const generateTakeaways = searchParams.get('takeaways') !== 'false';

    // Fetch videos from YouTube
    const videos = await fetchChannelVideos(limit);

    if (videos.length === 0) {
      return NextResponse.json({
        message: 'No videos found',
        synced: 0,
      });
    }

    // Create lessons from videos
    const lessons: Lesson[] = [];
    
    for (const video of videos) {
      // Generate key takeaways if enabled
      let takeaways = undefined;
      if (generateTakeaways) {
        const takeaway = await generateKeyTakeaways(video);
        if (takeaway) {
          takeaways = [takeaway];
        }
      }

      const lesson: Lesson = {
        id: `lesson-${video.id}`,
        video,
        takeaways,
        transcript: undefined, // Would require third-party service
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to database
      const saved = await saveLesson(lesson);
      
      if (saved) {
        lessons.push(lesson);
      }
    }

    return NextResponse.json({
      message: `Successfully synced ${lessons.length} videos`,
      synced: lessons.length,
      lessons: lessons.map(l => ({
        id: l.id,
        videoId: l.video.id,
        title: l.video.title,
        thumbnail: l.video.thumbnail,
        formattedDuration: parseDuration(l.video.duration),
        hasTakeaways: !!l.takeaways && l.takeaways.length > 0,
      })),
    });
  } catch (error: any) {
    console.error('Error syncing YouTube videos:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to sync videos' },
      { status: 500 }
    );
  }
}

// GET /api/youtube/sync - Check sync status
export async function GET() {
  return NextResponse.json({
    message: 'Use POST to sync videos from YouTube',
    example: '/api/youtube/sync?limit=10&takeaways=true',
  });
}
