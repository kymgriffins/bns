import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BlogHub } from "@/components/blog-hub";

export const metadata: Metadata = {
  title: "Blogs - Budget Ndio Story",
  description: "Explore our blog posts covering budget insights, analysis, and stories from the community.",
};

export default async function BlogsPage() {
  return <BlogHub />;
}