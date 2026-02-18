'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface TikTokVideo {
  id: string;
  url: string;
  title: string;
  thumbnail?: string;
}

interface TikTokProfileFeedProps {
  username: string;
  count?: number;
  className?: string;
}

/**
 * TikTok Profile Feed Component
 * Fetches and displays videos from TikTok profile
 */
export default function TikTokProfileFeed({ username, count = 6, className }: TikTokProfileFeedProps) {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In production, this would fetch from TikTok API
    // For now, we'll use sample data that links to real TikTok videos
    const fetchVideos = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sample video IDs - in production these would come from TikTok API
        const sampleVideos: TikTokVideo[] = [
          {
            id: '7456891072277442848',
            url: `https://www.tiktok.com/@${username}/video/7456891072277442848`,
            title: 'Understanding Kenya\'s Budget Process 🏛️ #BudgetNdioStory #Kenya',
          },
          {
            id: '7455123456789012345',
            url: `https://www.tiktok.com/@${username}/video/7455123456789012345`,
            title: 'How your tax money is spent 💰 #FinanceBill #Kenya',
          },
          {
            id: '7452345678901234567',
            url: `https://www.tiktok.com/@${username}/video/7452345678901234567`,
            title: 'Public participation in budget making 🗣️ #CitizenEngagement',
          },
          {
            id: '7449876543210987654',
            url: `https://www.tiktok.com/@${username}/video/7449876543210987654`,
            title: 'Breaking down the Finance Bill 2024 📊 #FinanceBill2024',
          },
          {
            id: '7447654321098765432',
            url: `https://www.tiktok.com/@${username}/video/7447654321098765432`,
            title: 'Youth voices matter in budget 🗳️ #YouthPower',
          },
          {
            id: '7445432109876543210',
            url: `https://www.tiktok.com/@${username}/video/7445432109876543210`,
            title: 'Track your county budget 📍 #CountyBudget',
          },
        ].slice(0, count);

        setVideos(sampleVideos);
      } catch (err) {
        setError('Failed to load TikTok videos');
        console.error('Error fetching TikTok videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [username, count]);

  if (loading) {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="text-muted-foreground">{error}</p>
        <a
          href={`https://www.tiktok.com/@${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
        >
          View videos on TikTok
        </a>
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Profile Header */}
      <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">
          <span className="text-3xl font-bold text-white">B</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold">@{username}</h2>
          <p className="text-muted-foreground">Budget Ndio Story</p>
          <p className="text-sm text-muted-foreground mt-1">
            Making Kenya's budget process accessible to everyone 🇰🇪
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <TikTokVideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* View More Link */}
      <div className="text-center pt-4">
        <a
          href={`https://www.tiktok.com/@${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
          View More on TikTok
        </a>
      </div>
    </div>
  );
}

/**
 * Individual TikTok Video Card
 */
function TikTokVideoCard({ video }: { video: TikTokVideo }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl overflow-hidden bg-card border hover:shadow-lg transition-all hover:border-primary/50"
    >
      {/* Video Thumbnail / Embed */}
      <div className="relative aspect-[9/16] bg-muted">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${video.id}?embedId=${video.id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          title={video.title}
        />
      </div>

      {/* Video Info */}
      <div className="p-3">
        <p className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </p>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
          <span>Watch on TikTok</span>
        </div>
      </div>
    </a>
  );
}
