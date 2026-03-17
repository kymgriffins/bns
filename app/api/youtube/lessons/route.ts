import { NextResponse } from 'next/server';
import { fetchLessonsFromDB, Lesson } from '@/lib/youtube';

// GET /api/youtube/lessons - Fetch lessons from database
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    const lessons = await fetchLessonsFromDB(limit);

    return NextResponse.json({
      lessons,
      total: lessons.length,
    });
  } catch (error: any) {
    console.error('Error fetching lessons:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch lessons' },
      { status: 500 }
    );
  }
}
