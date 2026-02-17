import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { createLoginRedirectUrl } from "@/lib/auth-redirect";
import AppSidebar from "@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar";
import StatisticsBlock from "@/components/shadcn-space/blocks/dashboard-shell-01/statistics";
import TopProductTable from "@/components/shadcn-space/blocks/dashboard-shell-01/top-product-table";
import SalesByCountryWidget from "@/components/shadcn-space/blocks/dashboard-shell-01/salesbycountrywidget";
import { Suspense } from "react";

async function AuthCheck({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    // Capture the current path for redirect after login
    const loginUrl = createLoginRedirectUrl("/admin");
    redirect(loginUrl);
  }

  return <>{children}</>;
}

export default async function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthCheck>
                <AppSidebar>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
                        <div className="col-span-1 md:col-span-12">
                            <StatisticsBlock />
                        </div>
                        <div className="col-span-1 md:col-span-12">
                            <TopProductTable />
                        </div>
                        <div className="col-span-1 md:col-span-12">
                            <SalesByCountryWidget />
                        </div>
                    </div>
                </AppSidebar>
            </AuthCheck>
        </Suspense>
    )
}
