"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer2 from "@/components/shadcn-space/blocks/footer-01/footer";

const NO_CHROME_PREFIXES = ["/admin", "/dashboard-shell-01", "/protected", "/learn", "/civic-hub"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = NO_CHROME_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  if (hideChrome) {
    return <div className="min-h-screen bg-background"><main id="main-content" tabIndex={-1}>{children}</main></div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer2 />
    </div>
  );
}

