"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/api";
import {
  CircleUserRound,
  CreditCard,
  ReceiptText,
  Settings,
  LogOut,
  User,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type User = {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
};

type Props = {
  user: User | null;
  defaultOpen?: boolean;
  align?: "start" | "center" | "end";
  className?: string;
};

type MenuItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  destructive?: boolean;
};

// Application navigation links matching the route structure
const PROFILE_ITEMS: MenuItem[] = [
  { label: "My Dashboard", href: "/dashboard-shell-01", icon: LayoutDashboard },
  { label: "My Profile", href: "/profile", icon: CircleUserRound },
  { label: "My Subscription", href: "/subscribe", icon: CreditCard },
  { label: "My Invoice", href: "/invoices", icon: ReceiptText },
];

const SETTINGS_ITEMS: MenuItem[] = [
  { label: "Account Settings", href: "/settings", icon: Settings },
];

const LOGOUT_ITEM: MenuItem = {
  label: "Sign Out",
  href: "/auth/login",
  icon: LogOut,
  destructive: true,
};

const itemClass =
  "flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer gap-3";

const UserDropdown = ({
  user,
  defaultOpen = false,
  align = "end",
  className,
}: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isLoading, setIsLoading] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Get user display name and avatar
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "";
  const avatarUrl = user?.user_metadata?.avatar_url || "";
  
  // Generate initials for avatar fallback
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      // clear local auth state if using context/provider
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // If no user, render a login trigger
  if (!user) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Link
          href="/auth/login"
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
        >
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Sign In</span>
        </Link>
        <Link
          href="/subscribe"
          className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-colors"
        >
          Subscribe
        </Link>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          ref={triggerRef}
          asChild
          aria-label="User menu"
        >
          <button
            className="flex items-center gap-2 rounded-full p-1 hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-ring/20 transition-all">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={displayName} />
              ) : null}
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:flex items-center gap-1 text-sm font-medium text-foreground max-w-[120px] truncate">
              {displayName}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={align}
          sideOffset={8}
          className="w-72 rounded-2xl p-2 shadow-lg border border-border/50 bg-popover animate-in fade-in zoom-in-95 duration-200"
          onCloseAutoFocus={(event) => {
            // Prevent focus from returning to trigger when closing
            if (triggerRef.current) {
              event.preventDefault();
            }
          }}
        >
          {/* User Info */}
          <DropdownMenuLabel className="flex items-center gap-3 px-3 py-4 border-b border-border/50">
            <div className="relative flex-shrink-0">
              <Avatar className="h-10 w-10">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={displayName} />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span
                className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-popover"
                aria-label="Online"
              />
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold text-popover-foreground truncate">
                {displayName}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {userEmail}
              </span>
            </div>
          </DropdownMenuLabel>

          {/* Main Navigation Links */}
          <DropdownMenuGroup className="mt-2">
            <DropdownMenuLabel className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Account
            </DropdownMenuLabel>
            {PROFILE_ITEMS.map((item) => (
              <DropdownMenuItem
                key={item.href}
                asChild
                className={cn(
                  itemClass,
                  "text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
              >
                <Link href={item.href} className="flex items-center w-full">
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  <ChevronRight className="w-3 h-3 opacity-50" />
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-2" />

          {/* Settings */}
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Preferences
            </DropdownMenuLabel>
            {SETTINGS_ITEMS.map((item) => (
              <DropdownMenuItem
                key={item.href}
                asChild
                className={cn(
                  itemClass,
                  "text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
              >
                <Link href={item.href} className="flex items-center w-full">
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  <ChevronRight className="w-3 h-3 opacity-50" />
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-2" />

          {/* Logout */}
          <DropdownMenuItem
            onClick={handleLogout}
            disabled={isLoading}
            className={cn(
              itemClass,
              "text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            aria-label={isLoading ? "Signing out..." : "Sign out"}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
                <span>Signing out...</span>
              </span>
            ) : (
              <>
                <LOGOUT_ITEM.icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{LOGOUT_ITEM.label}</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropdown;
