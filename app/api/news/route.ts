import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

/**
 * GET /api/news
 * Fetch all news data (public - no authentication required)
 * Returns only published news AND blogs
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Fetch published news
    let newsQuery = supabase
      .from("news")
      .select(`
        *,
        category:categories(id, name, slug, color)
      `)
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      newsQuery = newsQuery.eq("status", status);
    } else {
      newsQuery = newsQuery.eq("status", "published");
    }

    if (category) {
      newsQuery = newsQuery.eq("category_id", category);
    }

    const { data: newsData, error: newsError } = await newsQuery;

    if (newsError) throw newsError;

    // Fetch published blogs
    let blogsQuery = supabase
      .from("blogs")
      .select(`
        *,
        category:categories(id, name, slug, color)
      `)
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      blogsQuery = blogsQuery.eq("status", status);
    } else {
      blogsQuery = blogsQuery.eq("status", "published");
    }

    if (category) {
      blogsQuery = blogsQuery.eq("category_id", category);
    }

    const { data: blogsData, error: blogsError } = await blogsQuery;

    if (blogsError) throw blogsError;

    // Transform news to stories format
    const newsStories = (newsData || []).map((news: any) => ({
      id: news.id,
      title: news.title,
      category: news.category?.name || 'News',
      date: news.published_at ? new Date(news.published_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) : new Date(news.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      excerpt: news.excerpt || '',
      author: 'GR8 Team',
      image_url: news.cover_image,
      is_featured: news.is_featured || false,
      source: news.source,
      source_url: news.source_url,
      source_type: 'news',
    }));

    // Transform blogs to stories format
    const blogStories = (blogsData || []).map((blog: any) => ({
      id: blog.id,
      title: blog.title,
      category: blog.category?.name || 'Blog',
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
      source: blog.source,
      source_url: blog.source_url,
      source_type: 'blog',
    }));

    // Combine and sort by date (most recent first)
    const allStories = [...newsStories, ...blogStories].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return NextResponse.json({ 
      data: allStories,
      stories: allStories,
      videos: [],
      updates: [],
      success: true 
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/news
 * Create new news article (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      cover_image,
      category_id,
      status = "draft",
      is_featured = false,
      reading_time_minutes,
      source,
      source_url,
      seo_title,
      seo_description,
    } = body;

    // Validate required fields
    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const { data: existing } = await supabase
      .from("news")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "A news article with this slug already exists" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("news")
      .insert({
        title,
        slug,
        excerpt,
        content: JSON.stringify({ html: content, plain: content?.replace(/<[^>]*>/g, "") || "" }),
        cover_image,
        category_id,
        author_id: user.id,
        status,
        is_featured,
        reading_time_minutes,
        published_at: status === "published" ? new Date().toISOString() : null,
        source,
        source_url,
        seo_title,
        seo_description,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/news
 * Update existing news article (requires authentication)
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      id,
      title,
      slug,
      excerpt,
      content,
      cover_image,
      category_id,
      status,
      is_featured,
      reading_time_minutes,
      source,
      source_url,
      seo_title,
      seo_description,
    } = body;

    // Validate required fields
    if (!id || !title || !slug) {
      return NextResponse.json(
        { error: "ID, title, and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists for another news article
    const { data: existing } = await supabase
      .from("news")
      .select("id")
      .eq("slug", slug)
      .neq("id", id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "A news article with this slug already exists" },
        { status: 400 }
      );
    }

    const updateData: any = {
      title,
      slug,
      excerpt,
      content: JSON.stringify({ html: content, plain: content?.replace(/<[^>]*>/g, "") || "" }),
      cover_image,
      category_id,
      is_featured,
      reading_time_minutes,
      source,
      source_url,
      seo_title,
      seo_description,
    };

    if (status) {
      updateData.status = status;
      if (status === "published") {
        updateData.published_at = new Date().toISOString();
      }
    }

    const { data, error } = await supabase
      .from("news")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/news
 * Delete news article (requires authentication)
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "News ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
