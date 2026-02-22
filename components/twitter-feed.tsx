'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface Tweet {
  id: string;
  text: string;
  author: {
    name: string;
    username: string;
    profile_image_url?: string;
  };
  created_at: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
  };
}

interface TwitterFeedProps {
  /** Twitter username (without @) */
  username: string;
  /** Number of tweets to display */
  count?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Twitter Feed Component
 * Displays tweets from a Twitter/X profile
 */
export function TwitterFeed({ username, count = 5, className }: TwitterFeedProps) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTweets = async () => {
      setLoading(true);
      try {
        // Simulate API call - in production, use Twitter API
        await new Promise(resolve => setTimeout(resolve, 500));

        // Sample tweets data
        const sampleTweets: Tweet[] = [
          {
            id: '1',
            text: 'Understanding Kenya\'s budget process is crucial for citizen engagement. 🏛️ #BudgetNdioStory #Kenya',
            author: {
              name: 'Budget Ndio Story',
              username: 'BudgetNdioStory',
            },
            created_at: new Date().toISOString(),
            public_metrics: { retweet_count: 15, reply_count: 8, like_count: 45 },
          },
          {
            id: '2',
            text: 'Did you know you can participate in your county\'s budget-making process? Here\'s how 🗣️ #CitizenEngagement',
            author: {
              name: 'Budget Ndio Story',
              username: 'BudgetNdioStory',
            },
            created_at: new Date(Date.now() - 86400000).toISOString(),
            public_metrics: { retweet_count: 22, reply_count: 12, like_count: 67 },
          },
          {
            id: '3',
            text: 'The Finance Bill 2024 is here! We break down what it means for everyday Kenyans 💰 #FinanceBill2024',
            author: {
              name: 'Budget Ndio Story',
              username: 'BudgetNdioStory',
            },
            created_at: new Date(Date.now() - 172800000).toISOString(),
            public_metrics: { retweet_count: 45, reply_count: 23, like_count: 120 },
          },
          {
            id: '4',
            text: 'Youth voices matter in budget decisions! Join the conversation 🗳️ #YouthPower #Kenya',
            author: {
              name: 'Budget Ndio Story',
              username: 'BudgetNdioStory',
            },
            created_at: new Date(Date.now() - 259200000).toISOString(),
            public_metrics: { retweet_count: 18, reply_count: 9, like_count: 52 },
          },
          {
            id: '5',
            text: 'Track how your tax money is being spent in your county. Transparency matters! 📍 #CountyBudget #OpenGov',
            author: {
              name: 'Budget Ndio Story',
              username: 'BudgetNdioStory',
            },
            created_at: new Date(Date.now() - 345600000).toISOString(),
            public_metrics: { retweet_count: 30, reply_count: 15, like_count: 89 },
          },
        ].slice(0, count);

        setTweets(sampleTweets);
      } catch (err) {
        setError('Failed to load tweets');
        console.error('Error fetching tweets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
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
          href={`https://x.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
        >
          View tweets on X
        </a>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}

/**
 * Individual Tweet Card
 */
function TweetCard({ tweet }: { tweet: Tweet }) {
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
    <a
      href={`https://x.com/${tweet.author.username}/status/${tweet.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors"
    >
      {/* Author */}
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
        <span className="w-5 h-5 text-muted-foreground flex items-center justify-center">
          X
        </span>
      </div>

      {/* Content */}
      <p className="text-sm mb-3 whitespace-pre-wrap">{tweet.text}</p>

      {/* Metrics */}
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
  );
}

export default TwitterFeed;
