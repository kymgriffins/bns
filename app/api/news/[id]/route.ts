import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * GET /api/news/[id]
 * Fetch single news article by ID (public)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerClient();

    // Fetch the news article
    const { data: news, error } = await supabase
      .from("news")
      .select(`
        *,
        category:categories(id, name, slug, color),
        author:profiles!news_author_id_fkey(id, first_name, last_name, avatar_url)
      `)
      .eq("id", id)
      .eq("status", "published")
      .single();

    if (error || !news) {
      // Try fetching from blogs table if not in news
      const { data: blog, blogError } = await supabase
        .from("blogs")
        .select(`
          *,
          category:categories(id, name, slug, color),
          author:profiles!blogs_author_id_fkey(id, first_name, last_name, avatar_url)
        `)
        .eq("id", id)
        .eq("status", "published")
        .single();

      if (blogError || !blog) {
        return NextResponse.json(
          { error: "News article not found" },
          { status: 404 }
        );
      }

      // Transform blog to news format
      const transformedBlog = {
        ...blog,
        source: "Blog",
        author_name: blog.author 
          ? `${blog.author.first_name || ''} ${blog.author.last_name || ''}`.trim() || 'GR8 Team'
          : 'GR8 Team',
        author_avatar: blog.author?.avatar_url,
        published_date: blog.published_at || blog.created_at,
        content_parsed: typeof blog.content === 'string' 
          ? JSON.parse(blog.content) 
          : blog.content,
      };

      return NextResponse.json({ data: transformedBlog, success: true });
    }

    // Transform news data
    const transformedNews = {
      ...news,
      author_name: news.author 
        ? `${news.author.first_name || ''} ${news.author.last_name || ''}`.trim() || 'GR8 Team'
        : 'GR8 Team',
      author_avatar: news.author?.avatar_url,
      published_date: news.published_at || news.created_at,
      content_parsed: typeof news.content === 'string' 
        ? JSON.parse(news.content) 
        : news.content,
    };

    return NextResponse.json({ data: transformedNews, success: true });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news article" },
      { status: 500 }
    );
  }
}
