"use client";

import React, { useEffect, useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo/logo";
import { NavMain } from "@/components/shadcn-space/blocks/dashboard-shell-01/nav-main";
import { AlignStartVertical, BarChart3, CircleUserRound, ClipboardList, Languages, LucideIcon, Notebook, NotepadText, Table, Ticket, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/shadcn-space/blocks/dashboard-shell-01/site-header";
import { type User } from "@/components/shadcn-space/blocks/dashboard-shell-01/user-dropdown";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export type NavItem = {
    label?: string;
    isSection?: boolean;
    title?: string;
    icon?: LucideIcon;
    href?: string;
    children?: NavItem[];
};

export const navData: NavItem[] = [
    // Dashboard Section
    { label: "Dashboard", isSection: true },
    { title: "Overview", icon: BarChart3, href: "/admin" },

    // Budget Management Section
    { label: "Budget Management", isSection: true },
    { title: "Budget Tracker", icon: ClipboardList, href: "/tracker" },
    { title: "Budget Reports", icon: NotepadText, href: "/reports" },
    { title: "Budget Insights", icon: AlignStartVertical, href: "/insights" },

    // Content Section
    { label: "Content", isSection: true },
    { title: "News", icon: Table, href: "/news" },
    { title: "Learn", icon: Notebook, href: "/learn" },
    { title: "Take Action", icon: Ticket, href: "/take-action" },
    { title: "About", icon: CircleUserRound, href: "/about" },

    // Subscribe Section
    { label: "Subscribers", isSection: true },
    { title: "Newsletter", icon: Languages, href: "/subscribe" },
];

// Internal component to access sidebar context
function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { state, isMobile, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  // Get user data
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchUser = async () => {
          const supabase = createClient();
          const { data: { user: supabaseUser } } = await supabase.auth.getUser();
          
          if (supabaseUser) {
              setUser({
                  id: supabaseUser.id,
                  email: supabaseUser.email || "",
                  user_metadata: supabaseUser.user_metadata as User["user_metadata"],
              });
          } else {
              setUser(null);
          }
          setLoading(false);
      };

      fetchUser();

      // Listen for auth changes
      const supabase = createClient();
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
              setUser({
                  id: session.user.id,
                  email: session.user.email || "",
                  user_metadata: session.user.user_metadata as User["user_metadata"],
              });
          } else {
              setUser(null);
          }
      });

      return () => {
          subscription.unsubscribe();
      };
  }, []);

  if (isMobile) {
    // On mobile, show sidebar as drawer with SiteHeader
    return (
      <>
        <Sidebar collapsible="offcanvas" className="border-r">
          <div className="flex flex-col h-full bg-background p-4">
            <SidebarHeader className="py-0 px-0 mb-4">
              <a href="#" className="flex items-center justify-center w-full h-12">
                <Logo />
              </a>
            </SidebarHeader>
            <SidebarContent className="flex-1 overflow-hidden">
              <NavMain items={navData} isCollapsed={false} />
            </SidebarContent>
          </div>
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 flex items-center border-b px-6 py-3 bg-background">
              <SiteHeader user={loading ? null : user} />
            </header>
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </SidebarInset>
      </>
    );
  }

  return (
    <>
      <Sidebar 
        className={cn("py-4 px-0 bg-background border-r transition-all duration-300", isCollapsed && "w-16")}
        collapsible="icon"
      >
        <div className="flex flex-col h-full bg-background">
          {/* ---------------- Header ---------------- */}
          <SidebarHeader className="py-0 px-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <a href="#" className={cn("flex items-center justify-center w-full h-12", isCollapsed && "justify-center")}>
                  <Logo />
                </a>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          {/* ---------------- Content ---------------- */}
          <SidebarContent className={cn("flex-1 overflow-hidden gap-0 px-0", isCollapsed && "overflow-y-auto")}>
            {/* Navigation */}
            <div className={cn("px-2", isCollapsed && "px-1")}>
              <NavMain items={navData} isCollapsed={isCollapsed} />
            </div>
            
            {/* card - hidden when collapsed */}
            {!isCollapsed && (
              <div className="pt-4 px-4 mt-auto">
                <Card className="shadow-none ring-0 bg-blue-500/10 px-4 py-6">
                  <CardContent className="p-0 flex flex-col gap-3 items-center">
                    <img
                      src="https://images.shadcnspace.com/assets/backgrounds/download-img.png"
                      alt="sidebar-img"
                      width={74}
                      height={74}
                      className="h-20 w-20"
                    />
                    <div className="flex flex-col gap-4 items-center">
                      <div>
                        <p className="text-base font-semibold text-card-foreground text-center">
                          Grab Pro Now
                        </p>
                        <p className="text-sm font-regular text-muted-foreground text-center">
                          Customize your admin
                        </p>
                      </div>
                      <Button className="w-fit px-4 py-2 shadow-none cursor-pointer rounded-xl bg-blue-500 font-medium hover:bg-blue-500/80">
                        Get Premium
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </SidebarContent>

          {/* ---------------- Collapse Toggle ---------------- */}
          <div className={cn("mt-auto py-2 px-2 border-t", isCollapsed ? "flex justify-center" : "px-4")}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className={cn("w-full flex items-center justify-center gap-2", isCollapsed && "w-10 px-0")}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4" />
                  <span>Collapse</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </Sidebar>

      {/* ---------------- Main Content with SidebarInset ---------------- */}
      {/* SidebarInset handles the margin transition automatically based on sidebar state */}
      <SidebarInset>
        <div className="flex flex-col min-h-screen transition-all duration-300">
          <header className="sticky top-0 z-50 flex items-center border-b px-6 py-3 bg-background">
            <SiteHeader user={loading ? null : user} />
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </SidebarInset>
    </>
  );
}

const AppSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarLayout>
        {children}
      </SidebarLayout>
    </SidebarProvider>
  );
};

export default AppSidebar;
