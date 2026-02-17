import { redirect } from "next/navigation";
import { Suspense } from "react";

import { createClient } from "@/lib/supabase/server";
import { createLoginRedirectUrl } from "@/lib/auth-redirect";
import AppSidebar from "@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar";
import BlogManagementClient from "./blog-management-client";
import { Loader2 } from "lucide-react";

// Force dynamic rendering to avoid prerender issues with auth
export const dynamic = 'force-dynamic';

// Wrapper that handles auth and Suspense
async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    const loginUrl = createLoginRedirectUrl("/admin");
    redirect(loginUrl);
  }

  return (
    <AppSidebar>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }>
        {children}
      </Suspense>
    </AppSidebar>
  );
}

export default function AdminBlogPage() {
  return (
    <AdminLayout>
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage your blog posts</p>
        </div>
        <BlogManagementClient />
      </div>
    </AdminLayout>
  );
}
