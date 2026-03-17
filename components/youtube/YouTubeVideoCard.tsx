'use client';

import { useState } from 'react';
import { Play, Clock, Eye, Calendar, BookOpen, FileText, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  channelId: string;
  channelTitle: string;
  tags?: string[];
  formattedDuration?: string;
  formattedViewCount?: string;
}

interface KeyTakeaway {
  id: string;
  videoId: string;
  title: string;
  points: string[];
  summary: string;
}

interface Lesson {
  id: string;
  video: YouTubeVideo;
  takeaways?: KeyTakeaway[];
}

/**
 * YouTube Video Card - Displays a video with optional lesson data
 */
interface YouTubeVideoCardProps {
  video: YouTubeVideo;
  showDetails?: boolean;
  showTakeaways?: boolean;
  takeaways?: KeyTakeaway[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function YouTubeVideoCard({
  video,
  showDetails = true,
  showTakeaways = false,
  takeaways,
  size = 'md',
  className,
}: YouTubeVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailSizes = {
    sm: 'aspect-video',
    md: 'aspect-video',
    lg: 'aspect-[16/9]',
  };

  return (
    <div className={cn('group rounded-xl overflow-hidden bg-card border shadow-sm hover:shadow-md transition-all hover:-translate-y-1', className)}>
      {/* Video Thumbnail */}
      <div className="relative">
        <div className={thumbnailSizes[size]}>
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="relative h-full w-full overflow-hidden text-left"
              aria-label={`Play ${video.title}`}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-black shadow-lg transition-transform duration-200 group-hover:scale-105">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white">
                    <Play className="h-3 w-3 ml-0.5" />
                  </span>
                  Play
                </span>
              </div>

              {/* Duration Badge */}
              {video.formattedDuration && (
                <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
                  {video.formattedDuration}
                </span>
              )}
            </button>
          ) : (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </div>
      </div>

      {/* Video Details */}
      {showDetails && (
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {video.title}
          </h3>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {video.formattedViewCount && (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {video.formattedViewCount}
              </span>
            )}
            {video.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(video.publishedAt).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Key Takeaways Preview */}
          {showTakeaways && takeaways && takeaways.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary mb-2">
                <BookOpen className="w-3 h-3" />
                Key Takeaways
              </div>
              <ul className="space-y-1">
                {takeaways[0].points.slice(0, 3).map((point, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">•</span>
                    <span className="line-clamp-2">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Featured YouTube Video - For landing page hero
 */
interface FeaturedVideoProps {
  video?: YouTubeVideo | null;
  loading?: boolean;
  fallbackUrl?: string;
}

export function FeaturedYouTubeVideo({ video, loading, fallbackUrl }: FeaturedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Use fallback URL if no video provided
  const videoUrl = video?.id 
    ? `https://www.youtube.com/watch?v=${video.id}`
    : fallbackUrl;

  if (loading) {
    return (
      <div className="relative aspect-video w-full bg-muted animate-pulse rounded-2xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
    );
  }

  if (!video && !fallbackUrl) {
    return null;
  }

  const videoId = video?.id || fallbackUrl?.split('v=')[1]?.split('&')[0] || fallbackUrl?.split('/').pop();

  return (
    <div className="relative aspect-video w-full bg-black/90 rounded-2xl overflow-hidden">
      {!isPlaying && videoId ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group relative h-full w-full overflow-hidden text-left"
          aria-label="Play featured video"
        >
          {videoId && (
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt={video?.title || 'Featured video'}
              className="h-full w-full object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              loading="eager"
            />
          )}
          
          <div className="pointer-events-none absolute inset-0 bg-black/35" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg transition-transform duration-200 ease-out group-hover:scale-[1.03]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white">
                <Play className="h-4 w-4 translate-x-[0.5px]" />
              </span>
              Play Latest Video
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 text-[11px] text-white/85 sm:bottom-4 sm:left-4 sm:right-4 sm:text-xs">
            <p className="min-w-0 truncate font-medium">
              {video?.title || 'Latest from Budget Ndio Story'}
            </p>
            <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 font-semibold text-white/90 backdrop-blur-sm">
              YouTube
            </span>
          </div>
        </button>
      ) : (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
          title={video?.title || 'Featured video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}
    </div>
  );
}

/**
 * Lesson Card - Shows video as a lesson with key takeaways
 */
interface LessonCardProps {
  lesson: Lesson;
  className?: string;
}

export function LessonCard({ lesson, className }: LessonCardProps) {
  const { video, takeaways } = lesson;
  const [showLesson, setShowLesson] = useState(false);

  return (
    <div className={cn('group rounded-xl overflow-hidden bg-card border shadow-sm', className)}>
      <div className="flex flex-col">
        {/* Video Section */}
        <div className="relative">
          <div className="aspect-video">
            {!showLesson ? (
              <button
                onClick={() => setShowLesson(true)}
                className="relative h-full w-full overflow-hidden text-left"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-black shadow-lg">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white">
                      <Play className="h-3 w-3 ml-0.5" />
                    </span>
                    Watch Lesson
                  </span>
                </div>

                {video.formattedDuration && (
                  <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
                    {video.formattedDuration}
                  </span>
                )}
              </button>
            ) : (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&playsinline=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            {video.formattedViewCount && (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {video.formattedViewCount}
              </span>
            )}
            {video.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(video.publishedAt).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Key Takeaways */}
          {takeaways && takeaways.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary mb-2">
                <BookOpen className="w-3 h-3" />
                {takeaways[0].title}
              </div>
              
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {takeaways[0].summary}
              </p>
              
              <ul className="space-y-1">
                {takeaways[0].points.slice(0, 3).map((point, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {takeaways[0].points.length > 3 && (
                <Link 
                  href={`/media-hub/lesson/${video.id}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2 hover:underline"
                >
                  View all {takeaways[0].points.length} takeaways
                  <ChevronRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Video Grid - Displays a grid of YouTube videos
 */
interface VideoGridProps {
  videos: YouTubeVideo[];
  showDetails?: boolean;
  className?: string;
}

export function VideoGrid({ videos, showDetails = true, className }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No videos available</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {videos.map((video) => (
        <YouTubeVideoCard key={video.id} video={video} showDetails={showDetails} />
      ))}
    </div>
  );
}
