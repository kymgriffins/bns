"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { usePathname } from "next/navigation";

export type NavigationSection = {
  title: string;
  href: string;
};

type HeaderProps = {
  navigationData: NavigationSection[];
  className?: string;
};

const SubscribeButton = ({ className }: { className?: string }) => (
  <Button className={cn("relative text-sm font-medium rounded-full h-10 p-1 ps-4 pe-12 group transition-all duration-500 hover:ps-12 hover:pe-4 w-fit overflow-hidden", className)}>
    <span className="relative z-10 transition-all duration-500">
      Subscribe
    </span>
    <div className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
      <ArrowUpRight size={16} />
    </div>
  </Button>
);

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Routes where Navbar should be hidden (admin/dashboard routes)
  const hideNavbarRoutes = ["/admin", "/dashboard-shell-01", "/protected"];
  const shouldHideNavbar = hideNavbarRoutes.some((route) => pathname.startsWith(route));

  // Don't render Navbar on admin routes
  if (shouldHideNavbar) {
    return null;
  }

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  const navigationData: NavigationSection[] = [
    // {
    //   title: "Partners",
    //   href: "/partners",
    // },
    {
      title: "Budget Reports",
      href: "/reports",
    },
    {
      title: "Media Hub",
      href: "/media-hub",
    },
    // {
    //   title: "Budget Insights",
    //   href: "/insights",
    // },
    // {
    //   title: "Budget Tracker",
    //   href: "/tracker",
    // },
    // {
    //   title: "Take Action",
    //   href: "/take-action",
    // },
    // {
    //   title: "Learn",
    //   href: "/learn",
    // },
    {
      title: "News",
      href: "/news",
    },
    {
      title: "About",
      href: "/about",
    },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className={cn(
        "inset-x-0 z-50 px-4 flex items-center justify-center sticky top-0 h-20",
      )}
    >
      <div
        className={cn(
          "w-full max-w-6xl flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-all duration-500",
          sticky
            ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
            : isHomePage ? "bg-transparent border-transparent" : "bg-background border-border",
        )}
      >
        {/* Logo */}
        <div>
          <Link href="/">
            <div className="relative h-10 w-32">
              <Image
                src="/logo.svg"
                alt="Budget Ndio Story"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div>
          <NavigationMenu className={cn("max-lg:hidden p-0.5 rounded-full", isHomePage && !sticky ? "bg-white/10" : "bg-muted")}>
            <NavigationMenuList className="flex gap-0">
              {navigationData.map((navItem) => (
                <NavigationMenuItem key={navItem.title}>
                  <NavigationMenuLink
                    href={navItem.href}
                    className={cn(
                      "px-2 lg:px-4 py-2 text-sm font-medium rounded-full outline outline-transparent hover:outline-border hover:shadow-xs transition tracking-normal",
                      isHomePage && !sticky
                        ? "text-white hover:text-white hover:bg-white/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-background"
                    )}
                  >
                    {navItem.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop CTA */}
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          
         
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="https://www.facebook.com/profile.php?id=61586898487932"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center rounded-full outline outline-transparent hover:outline-border transition p-2",
                isHomePage && !sticky ? "text-white hover:bg-white/20" : ""
              )}
            >
              <Icon icon="lucide:facebook" width={18} height={18} />
            </a>
            <a
              href="https://www.instagram.com/budgetndiostory"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center rounded-full outline outline-transparent hover:outline-border transition p-2",
                isHomePage && !sticky ? "text-white hover:bg-white/20" : ""
              )}
            >
              <Icon icon="lucide:instagram" width={18} height={18} />
            </a>
            <a
              href="https://www.youtube.com/@BudgetNdioStory"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center rounded-full outline outline-transparent hover:outline-border transition p-2",
                isHomePage && !sticky ? "text-white hover:bg-white/20" : ""
              )}
            >
              <Icon icon="lucide:youtube" width={18} height={18} />
            </a>
            <a
              href="https://www.tiktok.com/@budget.ndio.story"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center rounded-full outline outline-transparent hover:outline-border transition p-2",
                isHomePage && !sticky ? "text-white hover:bg-white/20" : ""
              )}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} className={isHomePage && !sticky ? "text-white" : ""}>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href="https://x.com/BudgetNdioStory"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center rounded-full outline outline-transparent hover:outline-border transition p-2",
                isHomePage && !sticky ? "text-white hover:bg-white/20" : ""
              )}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} className={isHomePage && !sticky ? "text-white" : ""}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <Link href="/subscribe">
            <SubscribeButton className="hidden lg:flex" />
          </Link>

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger>
                <div className={cn(
                  "rounded-full border p-2",
                  isHomePage && !sticky ? "border-white/30 text-white bg-white/10" : "border-border"
                )}>
                  <Icon
                    icon="solar:hamburger-menu-linear"
                    width={20}
                    height={20}
                  />
                  <span className="sr-only">Menu</span>
                </div>
              </SheetTrigger>

              <SheetContent
                showCloseButton={false}
                side="right"
                className="w-full sm:w-96 p-0 border-l-0"
              >
                <div className="flex items-center justify-between p-6">
                  <Link href="/">
                    <div className="relative h-10 w-32">
                      <Image
                        src="/logo.svg"
                        alt="Budget Ndio Story"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </Link>
                  <SheetClose>
                    <div className="rounded-full border border-border p-2.5">
                      <Icon icon="lucide:x" width={16} height={16} />
                    </div>
                  </SheetClose>
                </div>

                <div className="flex flex-col gap-12 px-6 pb-6 overflow-y-auto">
                  <div className="flex flex-col gap-8">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <NavigationMenu
                      orientation="vertical"
                      className="items-start flex-none"
                    >
                      <NavigationMenuList className="flex flex-col items-start gap-3">
                        {navigationData.map((item) => (
                          <NavigationMenuItem key={item.title}>
                            <NavigationMenuLink
                              href={item.href}
                              className="text-2xl font-semibold tracking-tight transition-all hover:translate-x-2 p-0 hover:bg-transparent"
                            >
                              {item.title}
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                        {/* <NavigationMenuItem>
                          <NavigationMenuLink
                            href="/advertisements"
                            className="text-2xl font-semibold tracking-tight transition-all hover:translate-x-2 p-0 hover:bg-transparent text-amber-600"
                          >
                            Advertise
                          </NavigationMenuLink>
                        </NavigationMenuItem> */}
                      </NavigationMenuList>
                    </NavigationMenu>

                    <div className="w-fit">
                      <Link href="/subscribe">
                        <SubscribeButton />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-4">
                    
                   

                    <p className="text-sm text-muted-foreground">
                      © 2026 Budget Ndio Story
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
