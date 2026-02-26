"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  cta?: {
    text: string;
    href: string;
    variant?: "default" | "outline";
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  title,
  description,
  eyebrow,
  cta,
  secondaryCta,
  children,
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {eyebrow && (
          <p className="text-sm font-medium text-primary/80 mb-4 tracking-wide uppercase">
            {eyebrow}
          </p>
        )}
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          {title}
        </h1>
        
        {description && (
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
            {description}
          </p>
        )}

        {children}

        <div className="flex flex-col sm:flex-row gap-4">
          {cta && (
            <Button asChild size="lg" className="group">
              <Link href={cta.href}>
                {cta.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
          {secondaryCta && (
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryCta.href}>
                {secondaryCta.text}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
