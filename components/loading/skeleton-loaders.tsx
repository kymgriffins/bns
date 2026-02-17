'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// =============================================================================
// Skeleton Loaders - Modern Loading States
// =============================================================================

/**
 * Text skeleton with animated pulse
 */
export function TextSkeleton({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4 bg-muted/50',
            i === lines - 1 && 'w-3/4'
          )}
          style={{
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Card skeleton for content cards
 */
export function CardSkeleton({
  className,
  showImage = true,
  lines = 2,
}: {
  className?: string;
  showImage?: boolean;
  lines?: number;
}) {
  return (
    <div className={cn('rounded-lg border bg-card p-4 space-y-3', className)}>
      {showImage && (
        <Skeleton className="h-40 w-full rounded-md bg-muted/50" />
      )}
      <Skeleton className="h-5 w-3/4 bg-muted/50" />
      <TextSkeleton lines={lines} />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full bg-muted/50" />
        <Skeleton className="h-6 w-16 rounded-full bg-muted/50" />
      </div>
    </div>
  );
}

/**
 * Profile skeleton
 */
export function ProfileSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Skeleton className="h-10 w-10 rounded-full bg-muted/50" />
      <div className="space-y-1.5 flex-1">
        <Skeleton className="h-4 w-24 bg-muted/50" />
        <Skeleton className="h-3 w-32 bg-muted/50" />
      </div>
    </div>
  );
}

/**
 * Table skeleton
 */
export function TableSkeleton({
  rows = 5,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {/* Header */}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 bg-muted/50" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className="h-8 bg-muted/30 rounded"
              style={{
                animationDelay: `${rowIndex * 50 + colIndex * 25}ms`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Chart skeleton
 */
export function ChartSkeleton({
  className,
  showLegend = true,
}: {
  className?: string;
  showLegend?: boolean;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-32 bg-muted/50" />
        <Skeleton className="h-6 w-20 bg-muted/50" />
      </div>
      <div className="h-48 flex items-end gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 bg-muted/50 rounded-t"
            style={{
              height: `${30 + Math.random() * 70}%`,
              animationDelay: `${i * 75}ms`,
            }}
          />
        ))}
      </div>
      {showLegend && (
        <div className="flex gap-4 justify-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full bg-muted/50" />
            <Skeleton className="h-3 w-16 bg-muted/50" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full bg-muted/50" />
            <Skeleton className="h-3 w-16 bg-muted/50" />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Image gallery skeleton
 */
export function ImageGallerySkeleton({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className="aspect-square rounded-lg bg-muted/50"
          style={{
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * List item skeleton
 */
export function ListItemSkeleton({
  showAvatar = true,
  showMeta = true,
  className,
}: {
  showAvatar?: boolean;
  showMeta?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3 py-2', className)}>
      {showAvatar && (
        <Skeleton className="h-10 w-10 rounded-full bg-muted/50" />
      )}
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-1/2 bg-muted/50" />
        {showMeta && (
          <Skeleton className="h-3 w-3/4 bg-muted/30" />
        )}
      </div>
      {showMeta && (
        <Skeleton className="h-3 w-12 bg-muted/50" />
      )}
    </div>
  );
}

/**
 * Form skeleton
 */
export function FormSkeleton({
  fields = 3,
  showSubmit = true,
  className,
}: {
  fields?: number;
  showSubmit?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <Skeleton className="h-4 w-24 bg-muted/50" />
          <Skeleton className="h-10 w-full bg-muted/30" />
        </div>
      ))}
      {showSubmit && (
        <Skeleton className="h-10 w-32 bg-muted/50" />
      )}
    </div>
  );
}

/**
 * Dashboard stats skeleton
 */
export function StatsSkeleton({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-lg border bg-card space-y-2"
          style={{ animationDelay: `${i * 75}ms` }}
        >
          <Skeleton className="h-4 w-20 bg-muted/50" />
          <Skeleton className="h-8 w-24 bg-muted/30" />
          <Skeleton className="h-3 w-16 bg-muted/30" />
        </div>
      ))}
    </div>
  );
}

/**
 * Hero section skeleton
 */
export function HeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6 py-12', className)}>
      <Skeleton className="h-12 w-2/3 bg-muted/50" />
      <Skeleton className="h-6 w-full bg-muted/30" />
      <Skeleton className="h-6 w-4/5 bg-muted/30" />
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-10 w-32 bg-muted/50" />
        <Skeleton className="h-10 w-32 bg-muted/30" />
      </div>
    </div>
  );
}

/**
 * Sidebar skeleton
 */
export function SidebarSkeleton({
  items = 6,
  className,
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-1', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-3 py-2"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <Skeleton className="h-5 w-5 bg-muted/50" />
          <Skeleton className="h-4 flex-1 bg-muted/30" />
        </div>
      ))}
    </div>
  );
}

/**
 * Feed skeleton (like social media feeds)
 */
export function FeedSkeleton({
  items = 3,
  className,
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-lg border bg-card space-y-3"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <ProfileSkeleton />
          <TextSkeleton lines={2} />
          <Skeleton className="h-48 w-full rounded-md bg-muted/30" />
          <div className="flex gap-4 pt-1">
            <Skeleton className="h-6 w-16 bg-muted/30" />
            <Skeleton className="h-6 w-16 bg-muted/30" />
            <Skeleton className="h-6 w-16 bg-muted/30" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default {
  TextSkeleton,
  CardSkeleton,
  ProfileSkeleton,
  TableSkeleton,
  ChartSkeleton,
  ImageGallerySkeleton,
  ListItemSkeleton,
  FormSkeleton,
  StatsSkeleton,
  HeroSkeleton,
  SidebarSkeleton,
  FeedSkeleton,
};
