"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar, Clock, User, Tag, Share2, Bookmark, Eye, MessageCircle,
  Heart, ArrowUpRight, ArrowLeft, ExternalLink, Lock, Sparkles,
  Twitter, Facebook, Linkedin, Mail, Copy, ChevronUp, ChevronDown,
  ChevronRight, ChevronLeft, ArrowUp, ArrowDown, Award, Star, Crown, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_parsed?: {
    html?: string;
    plain?: string;
  };
  featured_image?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
    color?: string;
  };
  author?: {
    id: string;
    username: string;
    avatar?: string;
    bio?: string;
  };
  published_at: string;
  reading_time_minutes?: number;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  views_count?: number;
  likes_count?: number;
  comments_count?: number;
  is_featured?: boolean;
  is_premium?: boolean;
  source?: string;
  source_url?: string;
}

interface BlogPostViewProps {
  post: BlogPost;
}

export function BlogPostView({ post }: BlogPostViewProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes_count || 0);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [showAuthorBio, setShowAuthorBio] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get reading time
  const getReadingTime = () => {
    const minutes = post.reading_time_minutes || 
      Math.max(1, Math.ceil((post.content_parsed?.plain?.split(/\s+/).length || 0) / 200));
    return `${minutes} min read`;
  };

  // Extract headings from content for table of contents
  const extractHeadings = () => {
    const content = post.content_parsed?.html || "";
    const headingRegex = /<h[1-3][^>]*>(.*?)<\/h[1-3]>/g;
    const headings: Array<{text: string, level: number, id: string}> = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const text = match[1].replace(/<[^>]*>/g, '');
      const level = parseInt(match[0].match(/h([1-3])/)?.[1] || '3');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      headings.push({ text, level, id });
    }
    
    return headings;
  };

  const headings = extractHeadings();

  // Share handlers
  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = post.title;

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
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        break;
      case "copy":
        await navigator.clipboard.writeText(url);
        setShowShareMenu(false);
        break;
    }
    setShowShareMenu(false);
  };

  // Like handler
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    // In a real app, this would update the server
  };

  // Save handler
  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, this would save to user's bookmarks
  };

  // Fetch related posts
  const fetchRelatedPosts = async () => {
    setIsLoadingRelated(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_BASE}/api/v1/content/posts?category=${post.category?.slug}&limit=4`);
      if (res.ok) {
        const data = await res.json();
        setRelatedPosts(data.posts || []);
      }
    } catch (error) {
      console.error("Error fetching related posts:", error);
    } finally {
      setIsLoadingRelated(false);
    }
  };

  useEffect(() => {
    fetchRelatedPosts();
  }, [post.category?.slug]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <article>
              {/* Premium Badge */}
              {post.is_premium && (
                <Badge className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold">
                  <Crown className="h-4 w-4 mr-2" />
                  Premium Content
                </Badge>
              )}

              {/* Category Badge */}
              {post.category && (
                <Badge 
                  variant="secondary"
                  className="mb-4"
                  style={{ 
                    backgroundColor: post.category.color ? `${post.category.color}20` : undefined,
                    color: post.category.color || undefined,
                  }}
                >
                  {post.category.name}
                </Badge>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-6">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                {/* Author */}
                {post.author && (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowAuthorBio(!showAuthorBio)}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatar || undefined} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium text-foreground">{post.author.username}</span>
                      {post.author.bio && (
                        <div className="text-xs text-muted-foreground">{post.author.bio}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.published_at)}
                </div>

                {/* Reading Time */}
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {getReadingTime()}
                </div>

                {/* Views */}
                {post.views_count !== undefined && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {post.views_count.toLocaleString()} views
                  </div>
                )}

                {/* Source */}
                {post.source && (
                  <span className="text-muted-foreground">
                    via {post.source}
                  </span>
                )}
              </div>

              {/* Author Bio Modal */}
              {showAuthorBio && post.author?.bio && (
                <Card className="mb-6 bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={post.author.avatar || undefined} />
                        <AvatarFallback>
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{post.author.username}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{post.author.bio}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => setShowAuthorBio(false)}>
                      Close
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Cover Image */}
              {post.featured_image && (
                <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {post.is_premium && (
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Premium
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mb-8">
                {/* Table of Contents Toggle */}
                {headings.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowTableOfContents(!showTableOfContents)}
                    className="gap-2"
                  >
                    {showTableOfContents ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    Table of Contents
                  </Button>
                )}

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
                        onClick={() => handleShare("email")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted rounded"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </button>
                      <button
                        onClick={() => handleShare("copy")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted rounded"
                      >
                        <Copy className="h-4 w-4" />
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

                {/* Like Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLike}
                  className={cn(isLiked && "text-red-500")}
                >
                  <Heart className={cn("h-4 w-4 mr-2", isLiked && "fill-current")} />
                  {likeCount}
                </Button>

                {/* Comments Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <Link href="#comments" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments_count || 0}
                  </Link>
                </Button>
              </div>

              {/* Table of Contents */}
              {showTableOfContents && headings.length > 0 && (
                <Card className="mb-8 bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Table of Contents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-2">
                      {headings.map((heading, index) => (
                        <Link
                          key={index}
                          href={`#${heading.id}`}
                          className={cn(
                            "block pl-4 border-l-2 border-transparent hover:border-primary transition-colors",
                            heading.level === 1 && "font-semibold",
                            heading.level === 2 && "pl-8",
                            heading.level === 3 && "pl-12 text-sm"
                          )}
                          onClick={() => setActiveSection(heading.id)}
                        >
                          {heading.text}
                        </Link>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              )}

              {/* Article Content */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ 
                  __html: post.content_parsed?.html || post.content_parsed?.plain || "" 
                }}
              />

              {/* Source Link */}
              {post.source_url && (
                <div className="mb-8 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">External Source:</p>
                  <a 
                    href={post.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    {post.source || "Read original article"}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag.id} variant="outline" className="cursor-pointer hover:bg-primary/10">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Badge */}
              {post.is_featured && (
                <div className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Featured Article</h3>
                      <p className="text-sm text-muted-foreground">This article has been highlighted for its quality and importance.</p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Comments Section */}
            <section id="comments" className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Join the Conversation</h2>
              {/* Comments would go here */}
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Comments section coming soon. In the meantime, share your thoughts on social media!</p>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Related Posts */}
              {isLoadingRelated ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-muted rounded w-full"></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : relatedPosts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Related Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {relatedPosts.slice(0, 3).map((relatedPost) => (
                        <Link key={relatedPost.id} href={`/blogs/${relatedPost.slug || relatedPost.id}`} className="group block">
                          <div className="flex gap-3">
                            {relatedPost.featured_image && (
                              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={relatedPost.featured_image}
                                  alt={relatedPost.title}
                                  width={64}
                                  height={64}
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDate(relatedPost.published_at)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-4" asChild>
                      <Link href="/blogs">
                        View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Newsletter Signup */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    Stay Updated
                  </CardTitle>
                  <CardDescription>Get the latest blog posts delivered to your inbox.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </CardContent>
              </Card>

              {/* Categories */}
              {post.category && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Explore More</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        All Categories
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full justify-start"
                        style={{ 
                          backgroundColor: post.category.color ? `${post.category.color}20` : undefined,
                          color: post.category.color || undefined,
                          border: post.category.color ? `1px solid ${post.category.color}` : undefined,
                        }}
                      >
                        {post.category.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Social Sharing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Share This Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare("facebook")}>
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")}>
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare("copy")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPostView;