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

// =============================================================================
// Admin-specific Skeleton Loaders
// =============================================================================

/**
 * Admin table skeleton with search, filters, and actions
 */
export function AdminTableSkeleton({
  rows = 5,
  columns = 5,
  showSearch = true,
  showActions = true,
  className,
}: {
  rows?: number;
  columns?: number;
  showSearch?: boolean;
  showActions?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Header with search and actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {showSearch && (
          <Skeleton className="h-10 w-full max-w-md bg-muted/50" />
        )}
        <div className="flex gap-2">
          {showActions && (
            <>
              <Skeleton className="h-10 w-24 bg-muted/50" />
              <Skeleton className="h-10 w-24 bg-muted/30" />
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        {/* Table Header */}
        <div className="border-b bg-muted/30">
          <div
            className="grid gap-4 px-4 py-3"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)${showActions ? ' 100px' : ''}` }}
          >
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className="h-4 bg-muted/50" />
            ))}
            {showActions && <Skeleton className="h-4 bg-muted/50" />}
          </div>
        </div>

        {/* Table Body */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="border-b last:border-0"
          >
            <div
              className="grid gap-4 px-4 py-4"
              style={{ gridTemplateColumns: `repeat(${columns}, 1fr)${showActions ? ' 100px' : ''}` }}
            >
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={colIndex}
                  className={cn(
                    'h-4 bg-muted/30 rounded',
                    colIndex === 0 && 'w-3/4'
                  )}
                  style={{
                    animationDelay: `${rowIndex * 50 + colIndex * 25}ms`,
                  }}
                />
              ))}
              {showActions && (
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 bg-muted/30 rounded" />
                  <Skeleton className="h-8 w-8 bg-muted/30 rounded" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32 bg-muted/30" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 bg-muted/30" />
          <Skeleton className="h-8 w-20 bg-muted/30" />
        </div>
      </div>
    </div>
  );
}

/**
 * Admin card skeleton for dashboard or card grid layouts
 */
export function AdminCardSkeleton({
  cards = 4,
  showImage = true,
  className,
}: {
  cards?: number;
  showImage?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {Array.from({ length: cards }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border bg-card p-4 space-y-3"
          style={{ animationDelay: `${i * 75}ms` }}
        >
          {/* Card header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-3/4 bg-muted/50" />
              <Skeleton className="h-4 w-1/2 bg-muted/30" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full bg-muted/30" />
          </div>

          {showImage && (
            <Skeleton className="h-32 w-full rounded-md bg-muted/30" />
          )}

          {/* Card content */}
          <TextSkeleton lines={2} />

          {/* Card footer */}
          <div className="flex items-center justify-between pt-2">
            <Skeleton className="h-4 w-24 bg-muted/30" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 bg-muted/30 rounded" />
              <Skeleton className="h-8 w-8 bg-muted/30 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Admin form skeleton with various field types
 */
export function AdminFormSkeleton({
  fields = 5,
  showImageUpload = true,
  showSlug = true,
  showStatus = true,
  showSubmit = true,
  className,
}: {
  fields?: number;
  showImageUpload?: boolean;
  showSlug?: boolean;
  showStatus?: boolean;
  showSubmit?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Title field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24 bg-muted/50" />
        <Skeleton className="h-10 w-full bg-muted/30" />
      </div>

      {/* Slug field */}
      {showSlug && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-16 bg-muted/50" />
          <Skeleton className="h-10 w-full bg-muted/30" />
        </div>
      )}

      {/* Image upload */}
      {showImageUpload && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-muted/50" />
          <Skeleton className="h-40 w-full bg-muted/30 rounded-lg" />
        </div>
      )}

      {/* Dynamic fields */}
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-20 bg-muted/50" />
          {i % 2 === 0 ? (
            <Skeleton className="h-24 w-full bg-muted/30" />
          ) : (
            <Skeleton className="h-10 w-full bg-muted/30" />
          )}
        </div>
      ))}

      {/* Status select */}
      {showStatus && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-16 bg-muted/50" />
          <Skeleton className="h-10 w-full bg-muted/30" />
        </div>
      )}

      {/* Submit button */}
      {showSubmit && (
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-10 w-24 bg-muted/50" />
          <Skeleton className="h-10 w-32 bg-primary/50" />
        </div>
      )}
    </div>
  );
}

/**
 * Detail page skeleton for viewing single items
 */
export function DetailPageSkeleton({
  showImage = true,
  showMetadata = true,
  showActions = true,
  className,
}: {
  showImage?: boolean;
  showMetadata?: boolean;
  showActions?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with title and actions */}
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-8 w-2/3 bg-muted/50" />
          <Skeleton className="h-4 w-1/3 bg-muted/30" />
        </div>
        {showActions && (
          <div className="flex gap-2">
            <Skeleton className="h-10 w-20 bg-muted/50" />
            <Skeleton className="h-10 w-20 bg-muted/50" />
          </div>
        )}
      </div>

      {/* Main image */}
      {showImage && (
        <Skeleton className="h-64 w-full bg-muted/30 rounded-lg" />
      )}

      {/* Content sections */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/4 bg-muted/50" />
          <Skeleton className="h-4 w-full bg-muted/30" />
          <Skeleton className="h-4 w-full bg-muted/30" />
          <Skeleton className="h-4 w-3/4 bg-muted/30" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-1/4 bg-muted/50" />
          <Skeleton className="h-4 w-full bg-muted/30" />
        </div>
      </div>

      {/* Metadata */}
      {showMetadata && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-3 w-16 bg-muted/30" />
              <Skeleton className="h-4 w-24 bg-muted/50" />
            </div>
          ))}
        </div>
      )}
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
  // Admin-specific skeletons
  AdminTableSkeleton,
  AdminCardSkeleton,
  AdminFormSkeleton,
  DetailPageSkeleton,
};
