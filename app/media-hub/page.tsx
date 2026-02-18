'use client';

import { useState, useEffect, useMemo } from 'react';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Loader2, X, Mail, Bell, Share2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Social platform configurations
const socialPlatforms = [
  {
    id: 'tiktok',
    name: 'TikTok',
    username: 'budget.ndio.story',
    color: 'from-pink-500 via-purple-500 to-cyan-500',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    followUrl: 'https://www.tiktok.com/@budget.ndio.story',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    username: 'BudgetNdioStory',
    color: 'from-black via-gray-500 to-black',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    followUrl: 'https://x.com/BudgetNdioStory',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    username: '@BudgetNdioStory',
    color: 'from-red-500 via-red-600 to-red-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    followUrl: 'https://www.youtube.com/@BudgetNdioStory',
  },
];

// Sample TikTok videos (static for now)
const tiktokVideos = [
  '7456891072277442848',
  '7455123456789012345',
  '7452345678901234567',
  '7449876543210987654',
  '7447654321098765432',
  '7445432109876543210',
];

// Sample tweets
const sampleTweets = [
  {
    id: '1',
    text: "Understanding Kenya's budget process is crucial for citizen engagement. 🏛️ #BudgetNdioStory #Kenya",
    author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
    created_at: new Date().toISOString(),
    public_metrics: { retweet_count: 15, reply_count: 8, like_count: 45 },
  },
  {
    id: '2',
    text: "Did you know you can participate in your county's budget-making process? Here's how 🗣️ #CitizenEngagement",
    author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
    created_at: new Date(Date.now() - 86400000).toISOString(),
    public_metrics: { retweet_count: 22, reply_count: 12, like_count: 67 },
  },
  {
    id: '3',
    text: "The Finance Bill 2024 is here! We break down what it means for everyday Kenyans 💰 #FinanceBill2024",
    author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
    created_at: new Date(Date.now() - 172800000).toISOString(),
    public_metrics: { retweet_count: 45, reply_count: 23, like_count: 120 },
  },
  {
    id: '4',
    text: "Youth voices matter in budget decisions! Join the conversation 🗳️ #YouthPower #Kenya",
    author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
    created_at: new Date(Date.now() - 259200000).toISOString(),
    public_metrics: { retweet_count: 18, reply_count: 9, like_count: 52 },
  },
  {
    id: '5',
    text: "Track how your tax money is being spent in your county. Transparency matters! 📍 #CountyBudget #OpenGov",
    author: { name: 'Budget Ndio Story', username: 'BudgetNdioStory' },
    created_at: new Date(Date.now() - 345600000).toISOString(),
    public_metrics: { retweet_count: 30, reply_count: 15, like_count: 89 },
  },
];

// Sample YouTube videos
const youtubeVideos = [
  { id: 'dQw4w9WgXcQ', title: "Understanding Kenya's Budget Process", thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
  { id: 'jNQXAC9IVRw', title: 'Citizen Engagement in Budget Making', thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg' },
  { id: '9bZkp7q19f0', title: 'Finance Bill 2024 Breakdown', thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg' },
  { id: 'kJQP7kiw5Fk', title: 'Youth Voices in County Budget', thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg' },
  { id: 'fC7oUOUEEi4', title: 'Tracking Your Tax Money', thumbnail: 'https://img.youtube.com/vi/fC7oUOUEEi4/mqdefault.jpg' },
  { id: 'uelHwf8o7_U', title: 'Open Government Partnership', thumbnail: 'https://img.youtube.com/vi/uelHwf8o7_U/mqdefault.jpg' },
];

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
        
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-6 text-white">
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
                className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-90"
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

// TikTok Feed Component
function TikTokFeed({ username, count = 6 }: { username: string; count?: number }) {
  const videos = tiktokVideos.slice(0, count);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">B</span>
        </div>
        <div>
          <h3 className="font-bold text-lg">@{username}</h3>
          <p className="text-sm text-muted-foreground">Budget Ndio Story</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((videoId) => (
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
              title={`TikTok video`}
            />
          </a>
        ))}
      </div>

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

// Twitter Feed Component
function TwitterFeedComponent({ username, count = 5 }: { username: string; count?: number }) {
  const tweets = sampleTweets.slice(0, count);

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <a
          key={tweet.id}
          href={`https://x.com/${tweet.author.username}/status/${tweet.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {tweet.author.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{tweet.author.name}</p>
              <p className="text-sm text-muted-foreground truncate">@{tweet.author.username}</p>
            </div>
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-muted-foreground" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <p className="text-sm mb-3 whitespace-pre-wrap">{tweet.text}</p>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {tweet.public_metrics.reply_count}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {tweet.public_metrics.retweet_count}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {tweet.public_metrics.like_count}
            </span>
            <span className="ml-auto text-xs">{timeAgo(tweet.created_at)}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

// YouTube Feed Component
function YouTubeFeed({ username, count = 6 }: { username: string; count?: number }) {
  const videos = youtubeVideos.slice(0, count);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">B</span>
        </div>
        <div>
          <h3 className="font-bold text-lg">{username}</h3>
          <p className="text-sm text-muted-foreground">Budget Ndio Story</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl overflow-hidden bg-card hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="relative aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-3">
              <p className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {video.title}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center">
        <a
          href={`https://www.youtube.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          View more on YouTube
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// Engagement Buttons Component
function EngagementButtons({ platform }: { platform: typeof socialPlatforms[0] }) {
  const handleShare = () => {
    const shareData = {
      title: `Follow ${platform.name} - Budget Ndio Story`,
      text: `Check out ${platform.name} content from Budget Ndio Story`,
      url: platform.followUrl,
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(platform.followUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        asChild
        className={cn(
          'gap-2 text-white',
          platform.id === 'tiktok' && 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-90',
          platform.id === 'twitter' && 'bg-black hover:bg-black/80',
          platform.id === 'youtube' && 'bg-red-600 hover:bg-red-700'
        )}
      >
        <a href={platform.followUrl} target="_blank" rel="noopener noreferrer">
          {platform.icon}
          Follow
        </a>
      </Button>
      
      <Button variant="outline" size="icon" onClick={handleShare} title="Share">
        <Share2 className="w-4 h-4" />
      </Button>
      
      <Button variant="outline" size="icon" onClick={() => window.location.href = '/subscribe'} title="Subscribe">
        <Bell className="w-4 h-4" />
      </Button>
    </div>
  );
}

// Tab Content Component
function TabContent({ platform, isActive }: { platform: typeof socialPlatforms[0]; isActive: boolean }) {
  if (!isActive) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <EngagementButtons platform={platform} />
      
      <div className="mt-8">
        {platform.id === 'tiktok' && <TikTokFeed username={platform.username} count={6} />}
        {platform.id === 'twitter' && <TwitterFeedComponent username={platform.username} count={5} />}
        {platform.id === 'youtube' && <YouTubeFeed username={platform.username} count={6} />}
      </div>
    </div>
  );
}

export default function MediaHubPage() {
  const [activeTab, setActiveTab] = useState('tiktok');

  return (
    <div className="min-h-screen bg-background">
      <EmailPopup />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10" />
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
            <div className="flex justify-center gap-4 pt-4 flex-wrap">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.followUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-white transition-transform hover:scale-105',
                    platform.id === 'tiktok' && 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500',
                    platform.id === 'twitter' && 'bg-black',
                    platform.id === 'youtube' && 'bg-red-600'
                  )}
                >
                  {platform.icon}
                  @{platform.username}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-1 p-1 bg-muted rounded-full">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setActiveTab(platform.id)}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                    activeTab === platform.id
                      ? 'bg-background shadow-sm text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className={cn(
                    'p-1 rounded',
                    platform.id === 'tiktok' && 'text-pink-500',
                    platform.id === 'twitter' && 'text-gray-900',
                    platform.id === 'youtube' && 'text-red-600'
                  )}>
                    {platform.icon}
                  </span>
                  <span className="hidden sm:inline">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Contents */}
          <div className="min-h-[600px]">
            {socialPlatforms.map((platform) => (
              <TabContent 
                key={platform.id} 
                platform={platform} 
                isActive={activeTab === platform.id} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12">
        <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl p-8 md:p-12 text-center">
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
