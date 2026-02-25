import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NewsArticleView } from "@/components/news-article-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Server-side data fetching - hits our proxy which handles news and blogs fallback
async function getNewsArticle(id: string) {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    // First try to fetch as news article
    let res = await fetch(`${API_BASE}/api/v1/content/news/${id}`);
    if (res.ok) {
      const payload = await res.json();
      // Transform news article to match NewsArticleView expectations
      const article = {
        id: payload.id,
        title: payload.title,
        slug: payload.slug || payload.id,
        excerpt: payload.excerpt || payload.summary || "",
        content_parsed: {
          html: payload.content || payload.body || "",
          plain: payload.content || payload.body || ""
        },
        cover_image: payload.featured_image || payload.image_url,
        category: payload.categories?.[0] ? {
          id: payload.categories[0].id,
          name: payload.categories[0].name,
          slug: payload.categories[0].slug,
          color: payload.categories[0].color || "#3b82f6"
        } : undefined,
        author_name: payload.author?.username || payload.author_name || "GR8 Team",
        author_avatar: payload.author?.avatar || undefined,
        published_date: payload.published_at || payload.created_at,
        reading_time_minutes: payload.reading_time || undefined,
        source: payload.source || undefined,
        source_url: payload.source_url || undefined,
        views_count: payload.views_count || undefined,
        type: 'news' as const
      };
      return { article };
    }
    
    // If news fetch failed, try as blog post
    res = await fetch(`${API_BASE}/api/v1/content/posts/${id}`);
    if (res.ok) {
      const payload = await res.json();
      // Transform blog post to match NewsArticleView expectations
      const article = {
        id: payload.id,
        title: payload.title,
        slug: payload.slug || payload.id,
        excerpt: payload.excerpt || payload.summary || "",
        content_parsed: {
          html: payload.content || payload.body || "",
          plain: payload.content || payload.body || ""
        },
        cover_image: payload.featured_image || payload.image_url,
        category: payload.categories?.[0] ? {
          id: payload.categories[0].id,
          name: payload.categories[0].name,
          slug: payload.categories[0].slug,
          color: payload.categories[0].color || "#3b82f6"
        } : undefined,
        author_name: payload.author?.username || payload.author_name || "GR8 Team",
        author_avatar: payload.author?.avatar || undefined,
        published_date: payload.published_at || payload.created_at,
        reading_time_minutes: payload.reading_time || undefined,
        source: payload.source || undefined,
        source_url: payload.source_url || undefined,
        views_count: payload.views_count || undefined,
        type: 'blog' as const
      };
      return { article };
    }
    
    return { article: null };
  } catch (err) {
    console.error("failed to fetch article", err);
    return { article: null };
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { article } = await getNewsArticle(id);

  if (!article) {
    return {
      title: "Article Not Found - Budget Ndio Story",
    };
  }

    return {
      title: `${article.title} - Budget Ndio Story`,
      description: article.excerpt || "",
    openGraph: {
      title: article.title,
      description: article.excerpt || "",
      images: article.cover_image ? [article.cover_image] : [],
      type: "article",
      publishedTime: article.published_date,
      authors: [article.author_name],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || "",
      images: article.cover_image ? [article.cover_image] : [],
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { id } = await params;
  const { article } = await getNewsArticle(id);

  if (!article) {
    notFound();
  }

  return <NewsArticleView article={article} />;
}
