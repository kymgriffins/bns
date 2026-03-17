import { Metadata } from "next";
import { Suspense } from "react";
import { NewsHub } from "@/components/news-hub";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Updates - Budget Ndio Story",
  description: "Stories, videos, and updates from Budget Ndio Story. Built for clarity and action. Stay informed about Kenya's budget process and civic engagement opportunities.",
  keywords: ["budget news", "Kenya budget updates", "civic engagement news", "budget transparency", "finance bill", "public participation"],
  openGraph: {
    title: "News & Updates - Budget Ndio Story",
    description: "Stories, videos, and updates. Built for clarity and action.",
    type: "website",
  },
};

// Server-side data fetching via our own proxy endpoint
async function getNewsData() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  
  // Fetch all pages to get all news items
  let allStories: any[] = [];
  let page = 1;
  const pageSize = 100; // Fetch 100 items per page to reduce API calls
  
  try {
    while (true) {
      const res = await fetch(`${API_BASE}/api/v1/content/news/?page=${page}&page_size=${pageSize}`, { cache: 'no-store' });
      if (!res.ok) {
        console.error('Failed to fetch news data');
        break;
      }
      
      const data = await res.json();
      const results = data.results || [];
      
      if (results.length === 0) {
        break; // No more results
      }
      
      allStories = allStories.concat(results);
      
      // If we got fewer results than requested, we've reached the end
      if (results.length < pageSize) {
        break;
      }
      
      page++;
      
      // Safety limit to prevent infinite loops
      if (page > 10) {
        console.warn('Reached page limit, stopping fetch');
        break;
      }
    }
  } catch (error) {
    console.error('Error fetching news data:', error);
  }
  
  // Transform the API response to match NewsHub expectations
  const stories = allStories.map((item: any) => ({
    id: item.id,
    title: item.title,
    category: item.categories?.[0]?.name || 'News',
    date: item.published_at || item.created_at,
    excerpt: item.excerpt || '',
    author: item.author?.username || 'GR8 Team',
    image_url: item.featured_image,
    is_featured: item.is_featured || false,
    source_type: 'news',
  }));

  return {
    stories,
    videos: [], // No videos from this endpoint
    updates: [] // No updates from this endpoint
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
