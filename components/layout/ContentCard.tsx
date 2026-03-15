"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ContentCardProps {
  href: string;
  title: string;
  excerpt?: string;
  category?: string;
  image?: string | null;
  imageAlt?: string;
  meta?: React.ReactNode;
  ctaText?: string;
  className?: string;
}

/**
 * Shared content card for reports and articles: image/placeholder, category, title, excerpt, meta, optional CTA.
 * Uses semantic tokens (bg-card, text-foreground, text-muted-foreground) for theme support.
 */
export function ContentCard({
  href,
  title,
  excerpt,
  category,
  image,
  imageAlt,
  meta,
  ctaText = "Read more",
  className,
}: ContentCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-border bg-card text-card-foreground transition-[box-shadow,border-color] hover:shadow-md hover:border-primary/20",
        className
      )}
    >
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          {image ? (
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              className="object-cover transition-transform hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-muted-foreground/50"
              aria-hidden
            >
              <div className="h-12 w-12 rounded-full border-2 border-current" />
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          {category && (
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              {category}
            </p>
          )}
          <h3 className="text-lg font-semibold leading-tight text-foreground line-clamp-2">
            {title}
          </h3>
        </CardHeader>
        <CardContent className="pt-0">
          {excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {excerpt}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap items-center gap-2 pt-0">
          {meta && (
            <span className="text-xs text-muted-foreground">{meta}</span>
          )}
          {ctaText && (
            <span className="inline-flex items-center text-sm font-medium text-primary">
              {ctaText}
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </span>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
}
