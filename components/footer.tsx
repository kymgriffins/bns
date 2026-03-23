"use client";
import { Mail, MapPin, Phone, Sun, Moon, Laptop } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
// import Newsletter from "./newsletter";
import { Button } from "./ui/button";

function XLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const navLinks = [
  { name: "Reports", href: "/reports" },
  { name: "Tracker", href: "/tracker" },
  { name: "Take Action", href: "/take-action" },
  { name: "Learn", href: "/learn" },
  { name: "News", href: "/news" },
  { name: "Partner", href: "/about" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/about" },
];

const transparencyLinks = [
  { name: "Accuracy Commitment", href: "/accuracy" },
  { name: "Corrections", href: "/corrections" },
  { name: "Sources", href: "/sources" },
];

const contactInfo = [
  {
    icon: <Mail size={20} strokeWidth={1.5} />,
    label: "Email",
    value: "info@budgetndiostory.org",
    href: "mailto:info@budgetndiostory.org",
  },
  {
    icon: <Phone size={20} strokeWidth={1.5} />,
    label: "Phone",
    value: "+254711106814",
    href: "tel:+254711106814",
  },
  {
    icon: <MapPin size={20} strokeWidth={1.5} />,
    label: "Location",
    value: "Nairobi, Kenya",
    href: "#",
  },
];

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61586898487932" },
  { name: "TikTok", href: "https://www.tiktok.com/@budget.ndio.story" },
  { name: "Instagram", href: "https://www.instagram.com/budgetndiostory" },
  { name: "X", href: "https://x.com/BudgetNdioStory" },
  { name: "YouTube", href: "https://www.youtube.com/@budgetndiostory" },
];

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="inline-flex h-10 w-10 shrink-0" aria-hidden />;
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
    >
      {theme === "light" ? (
        <Sun size={20} className="text-gray-600" />
      ) : theme === "dark" ? (
        <Moon size={20} className="text-white/60" />
      ) : (
        <Laptop size={20} className="text-gray-600 dark:text-white/60" />
      )}
    </Button>
  );
}

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="bg-white dark:bg-[#0a0a0a] py-16 border-t border-foreground/10 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Subscribe Block - Spans 2 columns on lg, full width on smaller */}
          <div className="lg:col-span-2">
            <h3 className="font-neue-montreal text-2xl font-medium text-gray-900 dark:text-white mb-2">
              Get budget updates
            </h3>
            <p className="font-NeueMontreal text-gray-600 dark:text-white/60 mb-4 max-w-md">
              Reports, participation windows, and training alerts—straight to you.
            </p>
            {/* <Newsletter
              variant="dark"
              placeholder="Your email"
              buttonText="Subscribe"
            /> */}
          </div>
          {/* Navigation Links */}
          <div className="flex flex-col">
            <h3 className="font-neue-montreal text-lg font-medium text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              Explore
            </h3>
            <div className="flex flex-col gap-3">
              {navLinks.slice(0, 5).map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="font-NeueMontreal text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          {/* More Links + Transparency */}
          <div className="flex flex-col">
            <h3 className="font-neue-montreal text-lg font-medium text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              More
            </h3>
            <div className="flex flex-col gap-3 mb-6">
              {navLinks.slice(5).map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="font-NeueMontreal text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-foreground/10">
              <p className="font-NeueMontreal text-xs text-foreground/40 mb-3 uppercase tracking-wider">
                Transparency
              </p>
              <div className="flex flex-col gap-2">
                {transparencyLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="font-NeueMontreal text-sm text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Contact Info */}
          <div className="flex flex-col">
            <h3 className="font-neue-montreal text-lg font-medium text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              Contact
            </h3>
            <div className="flex flex-col gap-4 mb-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-foreground/50 mt-0.5" aria-hidden="true">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-NeueMontreal text-foreground/40 mb-0.5">
                      {item.label}
                    </p>
                    <Link
                      href={item.href}
                      className="text-sm font-NeueMontreal text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {item.value}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-foreground/10">
              <p className="font-NeueMontreal text-xs text-foreground/40 mb-3 uppercase tracking-wider">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-NeueMontreal text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {social.name === "X" ? <XLogo className="h-5 w-5" /> : social.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="pt-10 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            {/* Powered By + Signature */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="flex items-center gap-2">
                <span className="font-NeueMontreal text-sm text-foreground/50">
                  Powered by
                </span>
                <span className="font-neue-montreal text-sm font-medium text-foreground/70">
                  Budget Ndio Story
                </span>
              </div>
              <div className="hidden md:block w-px h-4 bg-foreground/20" />
              <p className="font-NeueMontreal text-foreground/70">
                Follow the Budget. Find the Story.
              </p>
            </div>
            {/* Copyright + Legal Links + Theme */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <p className="text-sm font-NeueMontreal text-foreground/50">
                © {year} budgetndiostory.org
              </p>
              <div className="flex items-center gap-4 sm:gap-6">
                <ThemeToggle />
                <Link
                  href="/privacy"
                  className="text-sm font-NeueMontreal text-foreground/60 hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm font-NeueMontreal text-foreground/60 hover:text-foreground transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}