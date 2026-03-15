"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Instagram, Facebook, Youtube, Mail } from "lucide-react";

const navLinks = [
  { label: "Budget Reports", href: "/reports" },
  { label: "Learn", href: "/learn" },
  { label: "Articles", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Subscribe", href: "/subscribe" },
  { label: "Donate", href: "/donate" },
];

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61586898487932", icon: Facebook },
  { name: "YouTube", href: "https://www.youtube.com/@BudgetNdioStory", icon: Youtube },
  { name: "Instagram", href: "https://www.instagram.com/budgetndiostory", icon: Instagram },
  { name: "X", href: "https://x.com/BudgetNdioStory", icon: X },
];

const Footer2 = () => {
  const pathname = usePathname();
  const hideFooterRoutes = ["/admin", "/dashboard-shell-01", "/protected"];
  const shouldHideFooter = hideFooterRoutes.some((route) => pathname.startsWith(route));

  if (shouldHideFooter) return null;

  return (
    <footer className="border-t border-border bg-background" aria-label="Site footer">
      <div className="mx-auto max-w-[80rem] px-4 py-6 md:px-6 md:py-8">
        {/* Main row: logo + links + social */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-8 w-28">
              <Image
                src="/logo.svg"
                alt="Budget Ndio Story"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Follow the budget. Find the story.
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm" aria-label="Footer navigation">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={name}
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom: legal + contact */}
        <div className="mt-6 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Budget Ndio Story. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/cookies" className="hover:text-foreground">Cookies</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <a href="mailto:info@budgetndiostory.org" className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Mail className="h-3.5 w-3" />
              info@budgetndiostory.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
