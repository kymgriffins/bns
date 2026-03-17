import { Metadata } from "next";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { BlogHub } from "@/components/blog-hub";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Blogs - Budget Ndio Story",
  description: "Explore our blog posts covering budget insights, analysis, and stories from the community. Learn about Kenya's budget process and civic engagement.",
  keywords: ["budget blog", "Kenya budget analysis", "civic engagement", "budget transparency", "youth participation", "budget education"],
  openGraph: {
    title: "Blogs - Budget Ndio Story",
    description: "Explore our blog posts covering budget insights, analysis, and stories from the community.",
    type: "website",
  },
};

// Server-side data fetching for SEO and initial load
async function getBlogsData() {
  const supabase = createClient();
  
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching blogs:', error);
      return { blogs: [], categories: [] };
    }

    // Get unique categories
    const categories = [...new Set(blogs?.map(blog => blog.category).filter(Boolean))];

    return { blogs: blogs || [], categories };
  } catch (error) {
    console.error('Error fetching blogs data:', error);
    return { blogs: [], categories: [] };
  }
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
  // Fetch data server-side for SEO
  const initialData = await getBlogsData();
  
  return (
    <Suspense fallback={<BlogsLoading />}>
      <BlogHub initialData={initialData} />
    </Suspense>
  );
}