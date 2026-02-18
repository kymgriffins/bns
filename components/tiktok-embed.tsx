'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TikTokEmbedProps {
  /** TikTok video URL */
  url: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * TikTok Video Embed Component
 * Embeds TikTok videos using the official embed iframe
 */
export function TikTokEmbed({ url, className }: TikTokEmbedProps) {
  // Extract video ID from TikTok URL
  const getVideoId = (url: string): string | null => {
    // Handle various TikTok URL formats
    const patterns = [
      /tiktok\.com\/@[\w.]+\/video\/(\d+)/,
      /tiktok\.com\/v\/(\d+)/,
      /tiktok\.com\/[\w.]+\/video\/(\d+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const videoId = getVideoId(url);

  if (!videoId) {
    return (
      <div className={cn('rounded-lg bg-muted p-4 text-center', className)}>
        <p className="text-sm text-muted-foreground">Invalid TikTok URL</p>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      <iframe
        src={`https://www.tiktok.com/embed/v2/${videoId}?embedId=${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full aspect-[9/16] md:aspect-video border-0"
        title="TikTok video"
      />
    </div>
  );
}

/**
 * TikTok Profile Feed Component
 * Shows a feed of TikTok videos from a profile
 */
interface TikTokProfileFeedProps {
  /** TikTok username (without @) */
  username: string;
  /** Number of videos to display */
  count?: number;
  /** Additional CSS classes */
  className?: string;
}

export function TikTokProfileFeed({ username, count = 6, className }: TikTokProfileFeedProps) {
  // Pre-defined video IDs from the TikTok profile (sample videos)
  // In production, this would fetch from TikTok API
  const sampleVideos = [
    '7456891072277442848', // Sample video ID 1
    '7455123456789012345', // Sample video ID 2
    '7452345678901234567', // Sample video ID 3
    '7449876543210987654', // Sample video ID 4
    '7447654321098765432', // Sample video ID 5
    '7445432109876543210', // Sample video ID 6
  ].slice(0, count);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">B</span>
        </div>
        <div>
          <h3 className="font-bold text-lg">@{username}</h3>
          <p className="text-sm text-muted-foreground">Budget Ndio Story</p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sampleVideos.map((videoId, index) => (
          <a
            key={videoId}
            href={`https://www.tiktok.com/@${username}/video/${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-[9/16] rounded-lg overflow-hidden bg-muted"
          >
            <iframe
              src={`https://www.tiktok.com/embed/v2/${videoId}?embedId=${videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
              title={`TikTok video ${index + 1}`}
            />
          </a>
        ))}
      </div>

      {/* View More Link */}
      <div className="text-center">
        <a
          href={`https://www.tiktok.com/@${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          View more on TikTok
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/**
 * Single TikTok Video Card
 */
interface TikTokVideoCardProps {
  /** TikTok video URL */
  url: string;
  /** Video title/description */
  title?: string;
  /** Show full embed or just thumbnail link */
  fullEmbed?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function TikTokVideoCard({ url, title, fullEmbed = true, className }: TikTokVideoCardProps) {
  if (fullEmbed) {
    return (
      <div className={cn('rounded-xl overflow-hidden bg-card', className)}>
        <TikTokEmbed url={url} />
        {title && (
          <div className="p-3">
            <p className="font-medium text-sm line-clamp-2">{title}</p>
          </div>
        )}
      </div>
    );
  }

  // Thumbnail preview with link
  const videoId = url.split('/video/')[1]?.split('?')[0];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group block rounded-xl overflow-hidden bg-muted hover:shadow-lg transition-shadow',
        className
      )}
    >
      <div className="relative aspect-[9/16]">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}?embedId=${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          title={title || 'TikTok video'}
        />
      </div>
      {title && (
        <div className="p-3">
          <p className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </p>
        </div>
      )}
    </a>
  );
}

export default TikTokEmbed;
