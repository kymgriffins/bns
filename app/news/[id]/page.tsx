import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NewsArticleView } from "@/components/news-article-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Server-side data fetching - checks news table first, then blogs as fallback
async function getNewsArticle(id: string) {
  const supabase = await createClient();
  
  // First try: Fetch from news table
  const { data: news, error: newsError } = await supabase
    .from("news")
    .select(`
      *,
      category:categories(id, name, slug, color)
    `)
    .eq("id", id)
    .single();

  if (!newsError && news && news.status === 'published') {
    return {
      article: {
        ...news,
        type: 'news',
        author_name: 'GR8 Team',
        published_date: news.published_at || news.created_at,
        content_parsed: typeof news.content === 'string' 
          ? JSON.parse(news.content) 
          : news.content,
      }
    };
  }

  // Fallback: Try blogs table
  const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .select(`
      *,
      category:categories(id, name, slug, color)
    `)
    .eq("id", id)
    .single();

  if (!blogError && blog && blog.status === 'published') {
    return {
      article: {
        ...blog,
        type: 'blog',
        author_name: 'GR8 Team',
        source: 'Blog',
        published_date: blog.published_at || blog.created_at,
        content_parsed: typeof blog.content === 'string' 
          ? JSON.parse(blog.content) 
          : blog.content,
      }
    };
  }

  return { article: null };
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
    description: article.excerpt || article.seo_description || "",
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
