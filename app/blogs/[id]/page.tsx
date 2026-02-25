import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogPostView } from "@/components/blog-post-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Server-side data fetching - hits our proxy which handles blog posts
async function getBlogPost(id: string) {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    // Fetch blog post
    const res = await fetch(`${API_BASE}/api/v1/content/posts/${id}`);
    if (!res.ok) return { post: null };
    
    const payload = await res.json();
    
    // Transform blog post to match BlogPostView expectations
    const post = {
      id: payload.id,
      title: payload.title,
      slug: payload.slug || payload.id,
      excerpt: payload.excerpt || payload.summary || "",
      content_parsed: {
        html: payload.content || payload.body || "",
        plain: payload.content || payload.body || ""
      },
      featured_image: payload.featured_image || payload.image_url,
      category: payload.categories?.[0] ? {
        id: payload.categories[0].id,
        name: payload.categories[0].name,
        slug: payload.categories[0].slug,
        color: payload.categories[0].color || "#3b82f6"
      } : undefined,
      author: payload.author ? {
        id: payload.author.id,
        username: payload.author.username || payload.author_name || "GR8 Team",
        avatar: payload.author.avatar || undefined,
        bio: payload.author.bio || undefined
      } : {
        id: "1",
        username: "GR8 Team",
        avatar: undefined,
        bio: "Budget Ndio Story Team"
      },
      published_at: payload.published_at || payload.created_at,
      reading_time_minutes: payload.reading_time || undefined,
      tags: payload.tags || [],
      views_count: payload.views_count || undefined,
      likes_count: payload.likes_count || undefined,
      comments_count: payload.comments_count || undefined,
      is_featured: payload.is_featured || false,
      is_premium: payload.is_premium || false,
      source: payload.source || undefined,
      source_url: payload.source_url || undefined
    };
    
    return { post };
  } catch (err) {
    console.error("failed to fetch blog post", err);
    return { post: null };
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { post } = await getBlogPost(id);

  if (!post) {
    return {
      title: "Blog Post Not Found - Budget Ndio Story",
    };
  }

  return {
    title: `${post.title} - Budget Ndio Story`,
    description: post.excerpt || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: post.featured_image ? [post.featured_image] : [],
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author?.username || "Budget Ndio Story"],
      tags: post.tags?.map(tag => tag.name) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      images: post.featured_image ? [post.featured_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const { post } = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  return <BlogPostView post={post} />;
}