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
import { NavbarMobileAd } from "@/components/navbar-mobile-ad";
import { AppreciationToken } from "@/components/appreciation-token";
import { Heart, MessageCircle, Sparkles } from "lucide-react";

export type NavigationSection = {
  title: string;
  href: string;
};

type HeaderProps = {
  navigationData: NavigationSection[];
  className?: string;
};

const onHero = (isHome: boolean, scrolled: boolean) => isHome && !scrolled;

const DonateButton = ({
  onHeroState,
  className,
}: {
  onHeroState: boolean;
  className?: string;
}) => (
  <Link href="/donate">
    <Button
      className={cn(
        "relative text-sm font-medium rounded-full h-10 p-1 ps-4 pe-12 group transition-all duration-200 ease-out w-fit overflow-hidden",
        onHeroState
          ? "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary-foreground/50"
          : "bg-primary text-primary-foreground hover:bg-primary/90",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
    >
      <span className="relative z-10 transition-all duration-200 ease-out font-bold">
        Donate
      </span>
      <div className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRight size={16} />
      </div>
    </Button>
  </Link>
);

/** Desktop-only: Donate with hover card showing BNS video + "With gratitude" appreciation */
const DesktopDonateWithHover = ({
  onHeroState,
  className,
}: {
  onHeroState: boolean;
  className?: string;
}) => (
  <div className="relative group/donate">
    <Link href="/donate">
      <Button
        className={cn(
          "relative text-sm font-medium rounded-full h-10 p-1 ps-4 pe-12 transition-all duration-200 ease-out w-fit overflow-hidden",
          onHeroState
            ? "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary-foreground/50"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
          "focus-visible:ring-2 focus-visible:ring-offset-2",
          className
        )}
      >
        <span className="relative z-10 transition-all duration-200 ease-out font-bold">
          Donate
        </span>
        <div className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-transform duration-200 ease-out group-hover/donate:translate-x-0.5 group-hover/donate:-translate-y-0.5">
          <ArrowUpRight size={16} />
        </div>
      </Button>
    </Link>
    <div
      className="pointer-events-none absolute right-0 top-full z-50 mt-2 flex flex-col gap-2 opacity-0 transition-[opacity,transform] duration-200 ease-out delay-100 group-hover/donate:pointer-events-auto group-hover/donate:opacity-100 group-hover/donate:translate-y-0 group-hover/donate:delay-0 -translate-y-1"
      aria-hidden
    >
      <div className="w-56 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
        <div className="relative aspect-video w-full bg-muted">
          <video
            src="/bnsoo1.mp4"
            muted
            loop
            playsInline
            autoPlay
            className="h-full w-full object-cover"
            aria-hidden
          />
        </div>
        <div className="p-3">
          <AppreciationToken
            message="With gratitude"
            subtext="Your support powers budget transparency."
            className="min-h-0 px-3 py-2 border-0 bg-transparent"
          />
        </div>
      </div>
    </div>
  </div>
);

const SubscribeButtonNav = ({
  onHeroState,
  className,
}: {
  onHeroState: boolean;
  className?: string;
}) => (
  <Link href="/subscribe">
    <Button
      variant="outline"
      size="lg"
      className={cn(
        "rounded-full h-10 font-medium transition-all duration-200 ease-out active:scale-[0.98]",
        onHeroState
          ? "bg-transparent border-2 border-white text-white shadow-none hover:bg-white/15 hover:border-white focus-visible:ring-white/40"
          : "text-foreground hover:border-muted-foreground/25",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
    >
      Subscribe
    </Button>
  </Link>
);

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/home";
  const onHeroState = onHero(isHomePage, sticky);

  // Routes where Navbar should be hidden (admin/dashboard routes)
  const hideNavbarRoutes = ["/admin", "/dashboard-shell-01", "/protected"];
  const shouldHideNavbar = hideNavbarRoutes.some((route) => pathname.startsWith(route));

  // Don't render Navbar on admin routes
  if (shouldHideNavbar) {
    return null;
  }

  const handleScroll = useCallback(() => {
    // Start transparent at the very top, then give the pill
    // a subtle background once the user starts scrolling.
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
    // {
    //   title: "Media Hub",
    //   href: "/media-hub",
    // },
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
    {
      title: "Learn",
      href: "/learn",
    },
    // {
    //   title: "News",
    //   href: "/news",
    // },
    {
      title: "Articles",
      href: "/blogs",
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
        "inset-x-0 z-50 flex items-center justify-center h-20",
        "w-full px-3 sm:px-4 lg:px-4",
        isHomePage ? "fixed top-0" : "sticky top-0",
      )}
    >
      <div
        className={cn(
          "w-full max-w-full lg:max-w-6xl flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-[background-color,border-color,box-shadow] duration-300 ease-out",
          "min-w-0",
          sticky
            ? "p-2.5 bg-background/95 dark:bg-background/90 backdrop-blur-lg rounded-full border border-border shadow-sm"
            : isHomePage
              ? "bg-transparent"
              : "rounded-full border border-border/60 bg-background",
        )}
      >
        {/* Logo – original colors (no invert) */}
        <Link
          href="/"
          className="block transition-[opacity,transform] duration-200 ease-out hover:opacity-90 active:scale-[0.98]"
        >
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

        {/* Desktop Navigation */}
        <div>
            <NavigationMenu className="max-lg:hidden p-0.5 rounded-full">
            <NavigationMenuList className="flex gap-0">
              {navigationData.map((navItem) => (
                <NavigationMenuItem key={navItem.title}>
                  <NavigationMenuLink
                    href={navItem.href}
                    className={cn(
                      "px-2 lg:px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 tracking-normal hover:opacity-100 hover:translate-x-0.5",
                      onHeroState ? "text-white" : "text-foreground",
                      pathname === navItem.href && "opacity-100 font-semibold underline underline-offset-4"
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
          <div
            className={cn(
              "transition-[color,background-color] duration-200 ease-out rounded-full p-1 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-transparent",
              onHeroState ? "text-white hover:bg-white/20 focus-within:ring-white/50" : "hover:bg-muted focus-within:ring-ring"
            )}
          >
            <ThemeSwitcher />
          </div>
          <div className="hidden lg:flex items-center gap-2 text-muted-foreground [&_a:hover]:text-foreground">
            <a
              href="https://www.facebook.com/profile.php?id=61586898487932"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center rounded-full p-2 transition-[color,background-color,transform] duration-200 ease-out hover:opacity-80 active:scale-95",
                onHeroState ? "text-white" : ""
              )}
            >
              <Icon icon="lucide:facebook" width={18} height={18} />
            </a>
            <a
              href="https://www.instagram.com/budgetndiostory"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center rounded-full p-2 transition-[color,background-color,transform] duration-200 ease-out hover:opacity-80 active:scale-95",
                onHeroState ? "text-white" : ""
              )}
            >
              <Icon icon="lucide:instagram" width={18} height={18} />
            </a>
            <a
              href="https://www.youtube.com/@BudgetNdioStory"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center rounded-full p-2 transition-[color,background-color,transform] duration-200 ease-out hover:opacity-80 active:scale-95",
                onHeroState ? "text-white" : ""
              )}
            >
              <Icon icon="lucide:youtube" width={18} height={18} />
            </a>
            <a
              href="https://www.tiktok.com/@budget.ndio.story"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center rounded-full p-2 transition-[color,background-color,transform] duration-200 ease-out hover:opacity-80 active:scale-95",
                onHeroState ? "text-white" : ""
              )}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} className={onHeroState ? "text-white" : ""}>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href="https://x.com/BudgetNdioStory"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center rounded-full p-2 transition-[color,background-color,transform] duration-200 ease-out hover:opacity-80 active:scale-95",
                onHeroState ? "text-white" : ""
              )}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} className={onHeroState ? "text-white" : ""}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <SubscribeButtonNav onHeroState={onHeroState} />
            <DesktopDonateWithHover onHeroState={onHeroState} />
          </div>

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "rounded-full p-2 transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-offset-2",
                    onHeroState ? "text-white hover:bg-white/25 focus-visible:ring-white/50" : "hover:bg-muted focus-visible:ring-ring"
                  )}
                >
                  <Icon
                    icon="solar:hamburger-menu-linear"
                    width={20}
                    height={20}
                  />
                  <span className="sr-only">Menu</span>
                </button>
              </SheetTrigger>

              <SheetContent
                showCloseButton={false}
                side="right"
                className="w-full max-w-full sm:max-w-full md:max-w-md h-dvh max-h-dvh p-0 rounded-none border-l border-border bg-background text-foreground"
              >
                <div className="flex h-full min-h-0 flex-col">
                  <div className="flex shrink-0 items-center justify-between px-6 pt-8 pb-4">
                    <Link href="/" className="block">
                      <div className="relative h-10 w-32">
                        <Image
                          src="/logo.svg"
                          alt="Budget Ndio Story"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Link>
                    <SheetClose asChild>
                      <button
                        type="button"
                        className="flex items-center rounded-full p-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        Close
                        <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/70" aria-hidden />
                      </button>
                    </SheetClose>
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-6 pb-10 pt-2">
                    <SheetTitle className="sr-only">Menu</SheetTitle>

                    {/* Discover – nav links with dotted separators */}
                    <section className="flex flex-col" aria-label="Discover">
                      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Discover
                      </p>
                      <nav className="flex flex-col">
                        {navigationData.map((item) => (
                          <SheetClose asChild key={item.title}>
                            <Link
                              href={item.href}
                              className={cn(
                                "block border-b border-dotted border-border py-4 text-base font-semibold text-foreground transition-colors hover:text-foreground/90 last:border-b-0",
                                pathname === item.href && "text-primary"
                              )}
                            >
                              {item.title}
                            </Link>
                          </SheetClose>
                        ))}
                      </nav>
                    </section>

                    {/* Stay connected – primary CTAs */}
                    <section className="flex flex-col gap-4" aria-label="Stay connected">
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Stay connected
                      </p>
                      <div className="flex flex-col gap-3">
                        <SheetClose asChild>
                          <Link
                            href="/subscribe"
                            className="flex items-center justify-between gap-3 rounded-xl bg-primary px-5 py-3.5 text-primary-foreground transition-opacity hover:opacity-95"
                          >
                            <span className="text-sm font-semibold">Subscribe</span>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20">
                              <ArrowUpRight className="h-4 w-4 text-primary-foreground" size={16} />
                            </span>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/donate"
                            className="flex items-center justify-center rounded-xl border border-border bg-transparent px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                          >
                            Donate
                          </Link>
                        </SheetClose>
                      </div>
                    </section>

                    {/* With gratitude / Share a tip */}
                    <section className="flex flex-col gap-3" aria-label="Acknowledgments">
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        With gratitude
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        BNS is community-led. Share a tip or support our work.
                      </p>
                      <div className="flex flex-col gap-2">
                        <SheetClose asChild>
                          <Link
                            href="/take-action"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-2 hover:underline"
                          >
                            <MessageCircle className="h-4 w-4 shrink-0" />
                            Share a tip — see something in your ward? Tell us.
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/donate"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Sparkles className="h-4 w-4 shrink-0" />
                            Support our work
                          </Link>
                        </SheetClose>
                      </div>
                    </section>

                    {/* Contact */}
                    <section className="flex flex-col gap-2" aria-label="Contact">
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Contact
                      </p>
                      <a
                        href="mailto:info@budgetndiostory.org"
                        className="text-sm font-medium text-foreground hover:underline underline-offset-2"
                      >
                        info@budgetndiostory.org
                      </a>
                    </section>

                    {/* Social media */}
                    <div className="mt-auto flex flex-col gap-4 pt-6">
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Social
                      </p>
                      <div className="flex items-center gap-2">
                        <a href="https://www.facebook.com/profile.php?id=61586898487932" target="_blank" rel="noopener noreferrer" className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Facebook">
                          <Icon icon="lucide:facebook" width={20} height={20} />
                        </a>
                        <a href="https://www.instagram.com/budgetndiostory" target="_blank" rel="noopener noreferrer" className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Instagram">
                          <Icon icon="lucide:instagram" width={20} height={20} />
                        </a>
                        <a href="https://www.youtube.com/@BudgetNdioStory" target="_blank" rel="noopener noreferrer" className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="YouTube">
                          <Icon icon="lucide:youtube" width={20} height={20} />
                        </a>
                        <a href="https://www.tiktok.com/@budget.ndio.story" target="_blank" rel="noopener noreferrer" className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="TikTok">
                          <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                          </svg>
                        </a>
                        <a href="https://x.com/BudgetNdioStory" target="_blank" rel="noopener noreferrer" className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="X (Twitter)">
                          <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        © 2026 Budget Ndio Story
                      </p>
                    </div>
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
