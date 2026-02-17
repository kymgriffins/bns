import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/news
 * Fetch all news data (stories, videos, updates) from Supabase
 * Public endpoint - no authentication required
 */
export async function GET(request: NextRequest) {
  try {
    // Use server client for server-side operations
    const supabase = await createClient();

    // Fetch published blogs as stories
    const { data: blogs, error: blogsError } = await supabase
      .from('blogs')
      .select(`
        *,
        categories!inner(name)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(50);

    if (blogsError) {
      console.error('Error fetching blogs:', blogsError);
      return NextResponse.json(
        { error: 'Failed to fetch stories', details: blogsError.message },
        { status: 500 }
      );
    }

    // Map blogs to stories format
    const stories = (blogs || []).map((blog: any) => ({
      id: blog.id,
      title: blog.title,
      category: blog.categories?.name || 'News',
      date: blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) : new Date(blog.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      excerpt: blog.excerpt || '',
      author: 'GR8 Team',
      image_url: blog.cover_image,
      is_featured: blog.is_featured || false,
    }));

    // For now, return empty arrays for videos and updates
    // These would need separate tables or can be added later
    const videos: any[] = [];
    const updates: any[] = [];

    return NextResponse.json(
      {
        stories,
        videos,
        updates
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
