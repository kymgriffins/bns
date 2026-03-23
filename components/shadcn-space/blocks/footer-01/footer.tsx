"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Facebook, Youtube, Mail } from "lucide-react";

function XLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const exploreLinks = [
  { label: "Budget Reports", href: "/reports" },
  { label: "Learn", href: "/learn" },
  { label: "Articles", href: "/blogs" },
];

const getInvolvedLinks = [
  { label: "About", href: "/about" },
  { label: "Subscribe", href: "/subscribe" },
  { label: "Donate", href: "/donate" },
];

const legalLinks = [
  { label: "Cookies", href: "/cookies" },
  { label: "Privacy", href: "/privacy" },
];

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61586898487932", icon: Facebook },
  { name: "YouTube", href: "https://www.youtube.com/@budgetndiostory", icon: Youtube },
  { name: "Instagram", href: "https://www.instagram.com/budgetndiostory", icon: Instagram },
  { name: "X", href: "https://x.com/BudgetNdioStory", icon: XLogo },
];

const Footer2 = () => {
  const pathname = usePathname();
  const hideFooterRoutes = ["/admin", "/dashboard-shell-01", "/protected"];
  const shouldHideFooter = hideFooterRoutes.some((route) => pathname.startsWith(route));

  if (shouldHideFooter) return null;

  return (
    <footer className="border-t border-border bg-background" aria-label="Site footer">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-12 lg:px-8">
        {/* Top: logo + tagline */}
        <div className="mb-8 sm:mb-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="relative h-8 w-28">
              <Image
                src="/logo.svg"
                alt="Budget Ndio Story"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Follow the budget. Find the story.
            </span>
          </Link>
        </div>

        {/* Link groups + contact */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Explore
            </p>
            <ul className="space-y-2">
              {exploreLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Get involved
            </p>
            <ul className="space-y-2">
              {getInvolvedLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contact
            </p>
            <a
              href="mailto:info@budgetndiostory.org"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4 shrink-0" />
              info@budgetndiostory.org
            </a>
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={name}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Legal
            </p>
            <ul className="space-y-2">
              {legalLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Budget Ndio Story. All rights reserved.</p>
          <p className="max-w-md">
            Making Kenya&apos;s budget clear and actionable for young citizens.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
