import { redirect } from "next/navigation";
import { Suspense } from "react";

import AppSidebar from "@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar";
import CategoryManagementClient from "./category-management-client";
import { Loader2 } from "lucide-react";
import { getCurrentUser } from "@/lib/serverAuth";

// Force dynamic rendering to avoid prerender issues with auth
export const dynamic = 'force-dynamic';

// Wrapper that handles auth and Suspense
async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user || user.error) {
    redirect(`/auth/login?next=/admin`);
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

export default function AdminCategoriesPage() {
  return (
    <AdminLayout>
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage blog categories</p>
        </div>
        <CategoryManagementClient />
      </div>
    </AdminLayout>
  );
}
