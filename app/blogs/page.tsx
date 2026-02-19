import { Metadata } from "next";
import { Suspense } from "react";
import { NewsHub } from "@/components/news-hub";
import { createClient } from "@/lib/supabase/server";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Blogs - Budget Ndio Story",
  description: "Latest blogs and stories from Budget Ndio Story.",
};

// Server-side data fetching - same as /news
async function getBlogsData() {
  const supabase = await createClient();
  
  // Fetch published blogs
  const { data: blogs, error: blogsError } = await supabase
    .from('blogs')
    .select(`
      *,
      category:categories(name)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(50);

  if (blogsError) {
    console.error('Error fetching blogs:', blogsError);
    return { stories: [], videos: [], updates: [] };
  }

  // Map blogs to stories format
  const stories = (blogs || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    category: item.category?.name || 'Blog',
    date: item.published_at ? new Date(item.published_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) : new Date(item.created_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    excerpt: item.excerpt || '',
    author: 'GR8 Team',
    image_url: item.cover_image,
    is_featured: item.is_featured || false,
  }));

  return {
    stories,
    videos: [],
    updates: []
  };
}

function BlogsLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Loading blogs...</p>
      </div>
    </div>
  );
}

export default async function BlogsPage() {
  // Fetch data server-side
  const initialData = await getBlogsData();
  
  // If no blogs found, redirect to /news (which shows the same data)
  if (initialData.stories.length === 0) {
    redirect('/news');
  }
  
  return (
    <Suspense fallback={<BlogsLoading />}>
      <NewsHub initialData={initialData} />
    </Suspense>
  );
}
