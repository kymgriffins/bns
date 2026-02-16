"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AuthButton } from "./auth-button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";

// Navigation links configuration
export interface NavLink {
  href: string;
  label: string;
  description?: string;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

export interface MenuBarDropdownProps {
  navSections?: NavSection[];
  authButton?: React.ReactNode;
  className?: string;
}

const defaultNavSections: NavSection[] = [
  {
    title: "Learn",
    links: [
      { href: "/learn", label: "Budget Basics", description: "Understand the fundamentals" },
      { href: "/insights", label: "Insights", description: "Deep dive into budget data" },
    ],
  },
  {
    title: "Track",
    links: [
      { href: "/tracker", label: "Budget Tracker", description: "Follow budget delivery" },
      { href: "/reports", label: "Reports", description: "Detailed analysis reports" },
    ],
  },
  {
    title: "Act",
    links: [
      { href: "/take-action", label: "Take Action", description: "Get involved" },
      { href: "/news", label: "News", description: "Latest updates and stories" },
    ],
  },
];

export function MenuBarDropdown({
  navSections = defaultNavSections,
  authButton,
  className,
}: MenuBarDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Focus management when dropdown opens
  React.useEffect(() => {
    if (isOpen) {
      // Focus first item when dropdown opens
      const firstItem = dropdownRef.current?.querySelector(
        '[role="menuitem"]:not([data-disabled])'
      ) as HTMLElement;
      firstItem?.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }

      // Arrow key navigation
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const items = Array.from(
          dropdownRef.current?.querySelectorAll(
            '[role="menuitem"]:not([data-disabled])'
          ) || []
        ) as HTMLElement[];
        
        const currentIndex = items.findIndex((item) => item === document.activeElement);
        let nextIndex: number;

        if (e.key === "ArrowDown") {
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }

        items[nextIndex]?.focus();
        e.preventDefault();
      }
    },
    []
  );

  // Handle link click
  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setMobileMenuOpen(false);
    router.push(href);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <span className="text-primary">GR8</span>
          <span className="text-muted-foreground">Budget</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
              ref={triggerRef}
              className={cn(
                "flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1",
                isOpen && "text-foreground"
              )}
              aria-haspopup="true"
              aria-expanded={isOpen}
              aria-label="Open navigation menu"
            >
              Menu
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              ref={dropdownRef}
              className="w-[600px] max-w-[90vw] p-0 overflow-hidden"
              sideOffset={8}
              align="start"
              role="menu"
              onKeyDown={handleKeyDown}
            >
              {/* Animated dropdown content */}
              <div
                className={cn(
                  "grid gap-1 p-4 transition-all duration-300 ease-out animate-dropdown-in"
                )}
              >
                {/* Navigation Sections */}
                <div className="grid grid-cols-3 gap-4">
                  {navSections.map((section) => (
                    <div key={section.title} className="space-y-2">
                      <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-0">
                        {section.title}
                      </DropdownMenuLabel>
                      {section.links.map((link) => (
                        <DropdownMenuItem
                          key={link.href}
                          asChild
                          className="cursor-pointer focus:bg-accent focus:text-accent-foreground rounded-md"
                        >
                          <button
                            onClick={() => handleLinkClick(link.href)}
                            className="flex flex-col items-start w-full text-left px-2 py-1.5 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
                            role="menuitem"
                          >
                            <span className="font-medium text-sm">{link.label}</span>
                            {link.description && (
                              <span className="text-xs text-muted-foreground">
                                {link.description}
                              </span>
                            )}
                          </button>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ))}
                </div>

                <DropdownMenuSeparator className="my-2" />

                {/* Auth Section */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">Account</span>
                  <div className="flex items-center gap-2">
                    {authButton || <AuthButton />}
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Direct nav links for desktop */}
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1"
          >
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t",
          mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="container mx-auto px-4 py-4 space-y-4" role="navigation" aria-label="Mobile navigation">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="grid gap-1">
                {section.links.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="flex flex-col items-start w-full text-left px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
                  >
                    <span>{link.label}</span>
                    {link.description && (
                      <span className="text-xs text-muted-foreground font-normal">
                        {link.description}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <DropdownMenuSeparator />

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            About
          </Link>

          <DropdownMenuSeparator />

          {/* Mobile Auth */}
          <div className="pt-2">
            <AuthButton />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default MenuBarDropdown;
