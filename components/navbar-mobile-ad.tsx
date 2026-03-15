"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface NavbarMobileAdProps {
  /** Optional: image URL (e.g. gif) — if not set, shows motion placeholder */
  imageSrc?: string;
  /** Optional: link URL when the ad is clicked */
  href?: string;
  /** Optional: alt text for image */
  alt?: string;
  /** Optional: class for the wrapper */
  className?: string;
}

/**
 * Mobile-only ad slot for the navbar drawer. Fills whitespace with a gif or motion-based card.
 * Pass imageSrc for a gif/image; otherwise shows a subtle CSS-motion placeholder.
 */
export function NavbarMobileAd({ imageSrc, href = "/subscribe", alt = "Promo", className }: NavbarMobileAdProps) {
  const content = imageSrc ? (
    <span className="relative block w-full aspect-[16/10] sm:aspect-[2/1] overflow-hidden rounded-xl bg-muted/50">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 320px) 280px, 320px"
        unoptimized={imageSrc.endsWith(".gif")}
      />
    </span>
  ) : (
    <span className="relative flex items-center justify-center w-full aspect-[16/10] sm:aspect-[2/1] overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 border border-border/50">
      {/* Motion: gentle gradient shift */}
      <span className="absolute inset-0 animate-nav-ad-shine bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full [animation-delay:0.5s]" aria-hidden />
      <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm font-medium text-foreground/70">
        <span className="inline-flex h-2 w-2 rounded-full bg-primary/60 animate-pulse" />
        <span>Support budget transparency</span>
        <span className="inline-flex h-2 w-2 rounded-full bg-primary/60 animate-pulse [animation-delay:0.3s]" />
      </span>
    </span>
  );

  return (
    <div className={cn("px-4 py-3", className)}>
      <Link
        href={href}
        className="block rounded-xl overflow-hidden transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background"
      >
        {content}
      </Link>
    </div>
  );
}
