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
  
  // Fetch published news articles
  const { data: news, error: newsError } = await supabase
    .from('news')
    .select(`
      *,
      categories!inner(name)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(50);

  if (newsError) {
    console.error('Error fetching news:', newsError);
    return { stories: [], videos: [], updates: [] };
  }

  // Map news to stories format
  const stories = (news || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    category: item.categories?.name || 'News',
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
    source: item.source,
    source_url: item.source_url,
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
