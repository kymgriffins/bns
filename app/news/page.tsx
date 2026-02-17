import { Metadata } from "next";
import { Suspense } from "react";
import { NewsHub } from "@/components/news-hub";
import { createClient } from "@/lib/supabase/server";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Updates - Budget Ndio Story",
  description: "Stories, videos, and updates. Built for clarity and action.",
};

// Server-side data fetching
async function getNewsData() {
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
    return { stories: [], videos: [], updates: [] };
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

  return {
    stories,
    videos: [],
    updates: []
  };
}

function NewsLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Loading news...</p>
      </div>
    </div>
  );
}

export default async function NewsPage() {
  // Fetch data server-side
  const initialData = await getNewsData();
  
  return (
    <Suspense fallback={<NewsLoading />}>
      <NewsHub initialData={initialData} />
    </Suspense>
  );
}
