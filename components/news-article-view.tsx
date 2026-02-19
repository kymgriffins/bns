"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, Clock, Share2, Bookmark, ArrowLeft, 
  Facebook, Twitter, Linkedin, Link as LinkIcon,
  MessageCircle, Eye, User
} from "lucide-react";
import { NewsComments } from "@/components/comments/news-comments";
import { LiveDiscussion } from "@/components/comments/live-discussion";
import { cn } from "@/lib/utils";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_parsed?: {
    html?: string;
    plain?: string;
  };
  cover_image?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
    color?: string;
  };
  author_name: string;
  author_avatar?: string;
  published_date: string;
  reading_time_minutes?: number;
  source?: string;
  source_url?: string;
  views_count?: number;
  type: 'news' | 'blog';
}

interface NewsArticleViewProps {
  article: Article;
}

export function NewsArticleView({ article }: NewsArticleViewProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate reading time if not provided
  const readingTime = article.reading_time_minutes || 
    Math.max(1, Math.ceil((article.content_parsed?.plain?.split(/\s+/).length || 0) / 200));

  // Share handlers
  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = article.title;

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, "_blank");
        break;
      case "copy":
        await navigator.clipboard.writeText(url);
        setShowShareMenu(false);
        break;
    }
    setShowShareMenu(false);
  };

  // Save handler
  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, this would save to user's bookmarks
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Header */}
            <article>
              {/* Category Badge */}
              {article.category && (
                <Badge 
                  variant="secondary"
                  className="mb-4"
                  style={{ 
                    backgroundColor: article.category.color ? `${article.category.color}20` : undefined,
                    color: article.category.color || undefined,
                  }}
                >
                  {article.category.name}
                </Badge>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-xl text-muted-foreground mb-6">
                  {article.excerpt}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                {/* Author */}
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author_avatar || undefined} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{article.author_name}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.published_date)}
                </div>

                {/* Reading Time */}
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readingTime} min read
                </div>

                {/* Views */}
                {article.views_count !== undefined && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {article.views_count.toLocaleString()} views
                  </div>
                )}

                {/* Source */}
                {article.source && (
                  <span className="text-muted-foreground">
                    via {article.source}
                  </span>
                )}
              </div>

              {/* Cover Image */}
              {article.cover_image && (
                <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={article.cover_image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mb-8">
                {/* Share Button */}
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  
                  {showShareMenu && (
                    <div className="absolute top-full left-0 mt-1 bg-background border rounded-lg shadow-lg p-2 z-10 min-w-[160px]">
                      <button
                        onClick={() => handleShare("facebook")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted rounded"
                      >
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare("twitter")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted rounded"
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare("linkedin")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted rounded"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare("copy")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted rounded"
                      >
                        <LinkIcon className="h-4 w-4" />
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSave}
                  className={cn(isSaved && "text-primary")}
                >
                  <Bookmark className={cn("h-4 w-4 mr-2", isSaved && "fill-current")} />
                  {isSaved ? "Saved" : "Save"}
                </Button>

                {/* Live Chat Toggle */}
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => setShowLiveChat(!showLiveChat)}
                  className="gap-2 ml-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  {showLiveChat ? "Hide Chat" : "Live Chat"}
                </Button>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ 
                  __html: article.content_parsed?.html || article.content_parsed?.plain || "" 
                }}
              />

              {/* Source Link */}
              {article.source_url && (
                <div className="mb-8 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Source:</p>
                  <a 
                    href={article.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {article.source || "Read more"}
                  </a>
                </div>
              )}
            </article>

            {/* Comments Section */}
            <NewsComments newsId={article.id} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Related Articles Card */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Related Articles</h3>
                  <p className="text-sm text-muted-foreground">
                    More articles coming soon...
                  </p>
                </CardContent>
              </Card>

              {/* Categories Card */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.category && (
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                        {article.category.name}
                      </Badge>
                    )}
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                      News
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                      Updates
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Card */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest news delivered to your inbox.
                  </p>
                  <Link href="/subscribe">
                    <Button className="w-full" size="sm">
                      Subscribe Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Live Discussion Widget */}
      {showLiveChat && (
        <LiveDiscussion 
          newsId={article.id} 
          newsTitle={article.title} 
        />
      )}
    </div>
  );
}

export default NewsArticleView;
