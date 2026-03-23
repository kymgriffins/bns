'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  Loader2, X, Mail, Bell, Share2, Send, Sparkles, 
  Target, TrendingUp, Award, BookOpen, Play, 
  Heart, MessageCircle, Share, Eye, ExternalLink,
  Youtube, Twitter, Instagram, Facebook, Linkedin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  fetchYouTubeVideos, 
  fallbackContent, 
  platformConfigs, 
  formatNumber, 
  timeAgo,
  SocialMediaPost
} from '@/lib/socialMedia';

// Bento Card Component
interface BentoCardProps {
  title: string;
  platform: 'youtube' | 'twitter' | 'tiktok' | 'instagram' | 'facebook' | 'linkedin';
  posts: SocialMediaPost[];
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
}

function BentoCard({ title, platform, posts, className, size = 'medium' }: BentoCardProps) {
  const config = platformConfigs[platform];
  
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    large: 'col-span-1 md:col-span-2 row-span-2',
    wide: 'col-span-1 md:col-span-2 row-span-1',
    tall: 'col-span-1 row-span-2',
  };

  return (
    <div className={cn(
      'relative rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
      sizeClasses[size],
      'bg-gradient-to-br from-card to-card/80 border border-border/50',
      className
    )}>
      {/* Platform Header */}
      <div className={cn(
        'absolute top-0 left-0 right-0 p-4 bg-gradient-to-r',
        config.color
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d={config.icon} />
            </svg>
            <span className="font-bold">{title}</span>
          </div>
          <a
            href={platform === 'twitter' ? 'https://x.com/BudgetNdioStory' : 
                  platform === 'youtube' ? 'https://www.youtube.com/@budgetndiostory' :
                  platform === 'tiktok' ? 'https://www.tiktok.com/@budget.ndio.story' :
                  platform === 'instagram' ? 'https://www.instagram.com/budgetndiostory' :
                  platform === 'facebook' ? 'https://www.facebook.com/BudgetNdioStory' :
                  'https://linkedin.com/company/budget-ndio-story'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 p-4 h-full overflow-y-auto">
        <div className={cn(
          'grid gap-3',
          size === 'large' ? 'grid-cols-2' : 'grid-cols-1'
        )}>
          {posts.slice(0, size === 'large' ? 4 : size === 'wide' ? 3 : 2).map((post, idx) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group block p-3 rounded-2xl bg-background/50 hover:bg-background transition-all',
                idx === 0 && size === 'large' && 'col-span-2'
              )}
            >
              {/* Thumbnail for YouTube/Video posts */}
              {post.thumbnail && platform !== 'twitter' && (
                <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                  <img 
                    src={post.thumbnail} 
                    alt={post.content}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {platform === 'youtube' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  )}
                  {post.metrics?.views && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 text-white text-xs flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {formatNumber(post.metrics.views)}
                    </div>
                  )}
                </div>
              )}
              
              {/* Content */}
              <p className={cn(
                'text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors',
                platform === 'youtube' && 'line-clamp-1'
              )}>
                {post.content}
              </p>
              
              {/* Metrics & Time */}
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {formatNumber(post.metrics?.likes || 0)}
                </span>
                {post.metrics?.comments !== undefined && post.metrics?.comments > 0 && (
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {formatNumber(post.metrics.comments)}
                  </span>
                )}
                {post.metrics?.views !== undefined && post.metrics?.views > 0 && (
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {formatNumber(post.metrics.views)}
                  </span>
                )}
                <span className="ml-auto">
                  {timeAgo(post.publishedAt)}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// Featured Video Hero Component
function FeaturedVideo({ video }: { video: SocialMediaPost }) {
  return (
    <div className="col-span-1 md:col-span-2 row-span-2 relative rounded-3xl overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
      
      {/* Video Placeholder/Embed */}
      <a 
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 flex items-center justify-center"
      >
        {video.thumbnail ? (
          <div className="relative w-full h-full">
            <img 
              src={video.thumbnail} 
              alt={video.content}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
            <Play className="w-12 h-12 text-white ml-1" />
          </div>
        )}
      </a>
      
      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 rounded-md bg-red-600 text-white text-xs font-medium flex items-center gap-1">
            <Youtube className="w-3 h-3" />
            Featured
          </span>
          {video.metrics?.views && (
            <span className="text-white/70 text-xs flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatNumber(video.metrics.views)} views
            </span>
          )}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2">
          {video.content}
        </h3>
        <div className="flex items-center gap-4 text-white/70 text-sm">
          <span>{video.author.name}</span>
          <span>•</span>
          <span>{timeAgo(video.publishedAt)}</span>
        </div>
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard() {
  const [stats, setStats] = useState({ followers: 0, engagement: 0, videos: 0 });
  
  useEffect(() => {
    const targetStats = { followers: 125000, engagement: 89, videos: 342 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        followers: Math.floor(targetStats.followers * progress),
        engagement: Math.floor(targetStats.engagement * progress),
        videos: Math.floor(targetStats.videos * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="col-span-1 md:col-span-3 row-span-1 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-6 text-white">
      <div className="flex flex-wrap items-center justify-between gap-6 h-full">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold">
            {stats.followers.toLocaleString()}+
          </div>
          <div className="text-sm text-white/80 flex items-center justify-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> Followers
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold">
            {stats.engagement}%
          </div>
          <div className="text-sm text-white/80 flex items-center justify-center gap-1 mt-1">
            <Target className="w-3 h-3" /> Engagement
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold">
            {stats.videos}
          </div>
          <div className="text-sm text-white/80 flex items-center justify-center gap-1 mt-1">
            <Sparkles className="w-3 h-3" /> Videos
          </div>
        </div>
        <div className="hidden lg:block text-right">
          <h3 className="text-xl font-bold">Stay Connected</h3>
          <p className="text-sm text-white/80">Follow us on all platforms</p>
        </div>
      </div>
    </div>
  );
}

// Email Popup Component
function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('mediaHubPopupSeen');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('mediaHubPopupSeen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="bg-black p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Stay Updated!</h3>
              <p className="text-white/80 text-sm">Get the latest content delivered to your inbox</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {isSubscribed ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h4 className="font-semibold text-lg">You're Subscribed!</h4>
              <p className="text-muted-foreground text-sm">Check your email for confirmation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter and get notified about new videos, articles, and updates about Kenya's budget process.
              </p>
              <Input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
              <Button 
                type="submit" 
                className="w-full h-12 bg-black hover:bg-gray-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                No spam, unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Floating Particles Component
function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  return (
    <div className="particles absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? 'var(--gold)' : p.id % 3 === 1 ? 'var(--teal)' : 'var(--coral)',
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

// Main Page Component
export default function MediaHubPage() {
  const [youtubeVideos, setYoutubeVideos] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const videos = await fetchYouTubeVideos(6);
        setYoutubeVideos(videos);
      } catch (error) {
        console.error('Error loading YouTube videos:', error);
        setYoutubeVideos(fallbackContent.youtube);
      } finally {
        setLoading(false);
      }
    }
    
    loadContent();
  }, []);

  // Combine all content for the bento grid
  const featuredVideo = youtubeVideos[0] || fallbackContent.youtube[0];
  const remainingVideos = youtubeVideos.slice(1) || fallbackContent.youtube.slice(1);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-20px) scale(1); opacity: 0; }
        }
        .particles > div {
          position: absolute;
          border-radius: 50%;
          animation: floatUp linear infinite;
        }
        :root {
          --gold: #f5c842;
          --teal: #3ecfb2;
          --coral: #ff7c5c;
        }
      `}</style>
      
      <FloatingParticles />
      <EmailPopup />
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-teal-50 dark:from-amber-950/20 dark:via-background dark:to-teal-950/20" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Media Hub
            </h1>
            <p className="text-lg text-muted-foreground">
              Follow us across all platforms for daily updates about Kenya's budget process. 
              Stay informed, stay engaged!
            </p>
            
            {/* Social Links Row */}
            <div className="flex justify-center gap-3 pt-4 flex-wrap">
              <a
                href="https://www.youtube.com/@budgetndiostory"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <Youtube className="w-4 h-4" />
                YouTube
              </a>
              <a
                href="https://x.com/BudgetNdioStory"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <Twitter className="w-4 h-4" />
                X
              </a>
              <a
                href="https://www.tiktok.com/@budget.ndio.story"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                TikTok
              </a>
              <a
                href="https://www.instagram.com/budgetndiostory"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border/50 flex flex-wrap justify-center gap-3 text-sm">
              <span className="text-muted-foreground">Want to go deeper?</span>
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link href="/learn">Learn Budget 101</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link href="/take-action">Take action</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="container py-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-3xl bg-card animate-pulse h-64" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
              {/* Stats Card */}
              <StatsCard />
              
              {/* Featured Video - Takes 2 cols, 2 rows */}
              <FeaturedVideo video={featuredVideo} />
              
              {/* Twitter Feed */}
              <BentoCard
                title="X (Twitter)"
                platform="twitter"
                posts={fallbackContent.twitter}
                size="medium"
              />
              
              {/* TikTok Feed */}
              <BentoCard
                title="TikTok"
                platform="tiktok"
                posts={fallbackContent.tiktok}
                size="medium"
              />
              
              {/* Instagram Feed */}
              <BentoCard
                title="Instagram"
                platform="instagram"
                posts={fallbackContent.instagram}
                size="medium"
              />
              
              {/* Facebook Feed */}
              <BentoCard
                title="Facebook"
                platform="facebook"
                posts={fallbackContent.facebook}
                size="medium"
              />
              
              {/* YouTube Videos Row */}
              {remainingVideos.slice(0, 2).map((video) => (
                <BentoCard
                  key={video.id}
                  title="YouTube"
                  platform="youtube"
                  posts={[video]}
                  size="medium"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container pb-12">
        <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to learn more?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join our training programs and get hands-on experience with Kenya's budget process. 
            Stay informed, stay engaged!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/take-action"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Join Our Programs
            </a>
            <a
              href="/news"
              className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background rounded-full font-medium hover:bg-accent transition-colors"
            >
              Read Our Stories
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
