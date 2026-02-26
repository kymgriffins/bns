"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, Clock, User, Tag, Search, Filter, 
  ArrowUpRight, TrendingUp, BookOpen, Heart, Share2,
  ChevronLeft, ChevronRight, Eye, MessageCircle
} from "lucide-react";
import { DebugBlogData } from "./debug-blog-data";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  post_type?: string;
  post_type_display?: string;
  status?: string;
  status_display?: string;
  author_name?: string;
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
    color?: string;
    icon?: string;
    is_active?: boolean;
  }>;
  read_time_minutes?: number;
  published_at: string;
  view_count?: number;
  is_featured?: boolean;
  is_premium?: boolean;
}

interface BlogHubProps {
  initialPosts?: BlogPost[];
}

export function BlogHub({ initialPosts = [] }: BlogHubProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<Array<{id: string, name: string, slug: string, color?: string}>>([]);
  const [tags, setTags] = useState<Array<{id: string, name: string, slug: string}>>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);

  const postsPerPage = 12;

  // Fetch blog data
  const fetchBlogData = useCallback(async () => {
    setLoading(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      
      // Fetch posts with pagination
      const postsRes = await fetch(`${API_BASE}/api/v1/content/posts/?page=${currentPage}&limit=${postsPerPage}`);
      console.log("Posts API URL:", `${API_BASE}/api/v1/content/posts/?page=${currentPage}&limit=${postsPerPage}`);
      console.log("Posts API Response Status:", postsRes.status);
      if (postsRes.ok) {
        const postsData = await postsRes.json();
        console.log("Posts data:", postsData);
        console.log("Posts results:", postsData.results);
        console.log("Posts count:", postsData.count);
        console.log("Posts results length:", postsData.results ? postsData.results.length : 0);
        setPosts(postsData.results || []);
        setTotalPages(Math.ceil((postsData.count || 0) / postsPerPage));
      } else {
        console.error("Failed to fetch posts:", postsRes.status, postsRes.statusText);
        const errorText = await postsRes.text();
        console.error("Error response:", errorText);
      }

      // Fetch categories
      const categoriesRes = await fetch(`${API_BASE}/api/v1/content/categories/`);
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        console.log("Categories data:", categoriesData);
        setCategories(categoriesData.results || []);
      } else {
        console.error("Failed to fetch categories:", categoriesRes.status, categoriesRes.statusText);
      }

      // Fetch tags
      const tagsRes = await fetch(`${API_BASE}/api/v1/content/tags/`);
      if (tagsRes.ok) {
        const tagsData = await tagsRes.json();
        console.log("Tags data:", tagsData);
        setTags(tagsData.results || []);
      } else {
        console.error("Failed to fetch tags:", tagsRes.status, tagsRes.statusText);
      }

      // Fetch featured posts
      const featuredRes = await fetch(`${API_BASE}/api/v1/content/posts/?featured=true&limit=6`);
      if (featuredRes.ok) {
        const featuredData = await featuredRes.json();
        console.log("Featured data:", featuredData);
        setFeaturedPosts(featuredData.results || []);
      } else {
        console.error("Failed to fetch featured posts:", featuredRes.status, featuredRes.statusText);
      }

      // Fetch popular posts
      const popularRes = await fetch(`${API_BASE}/api/v1/content/posts/?sort=popular&limit=8`);
      if (popularRes.ok) {
        const popularData = await popularRes.json();
        console.log("Popular data:", popularData);
        setPopularPosts(popularData.results || []);
      } else {
        console.error("Failed to fetch popular posts:", popularRes.status, popularRes.statusText);
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  // Filter and sort posts
  const filteredAndSortedPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || post.categories?.some(cat => cat.slug === selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
        case "oldest":
          return new Date(a.published_at).getTime() - new Date(b.published_at).getTime();
        case "popular":
          return (b.view_count || 0) - (a.view_count || 0);
        case "trending":
          return 0; // likes_count not available in API response
        default:
          return 0;
      }
    });

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get reading time
  const getReadingTime = (post: BlogPost) => {
    const minutes = post.read_time_minutes || 
      Math.max(1, Math.ceil((post.excerpt?.split(/\s+/).length || 0) / 200));
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center section-hig-blur p-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Insights & Stories
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Dive deep into budget analysis, community stories, and expert insights that matter to our nation's financial future.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Reading
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/subscribe">
                  <Heart className="mr-2 h-5 w-5" />
                  Support Our Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-card rounded-lg p-6 mb-8 border">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex-1 max-w-lg">
                  <Label htmlFor="search" className="sr-only">Search blogs</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="search"
                      placeholder="Search blogs, topics, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedTag("all"); }}>
                    <Filter className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex-1">
                  <Label htmlFor="category" className="text-sm font-medium mb-2 block">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="tag" className="text-sm font-medium mb-2 block">Topic</Label>
                  <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Topics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Topics</SelectItem>
                      {tags.map(tag => (
                        <SelectItem key={tag.id} value={tag.slug}>
                          {tag.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Featured Stories
                  </h2>
                  <Button variant="ghost" asChild>
                    <Link href="#all-posts" className="text-primary hover:text-primary/80">
                      View All <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPosts.slice(0, 3).map((post) => (
                    <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      {post.featured_image && (
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {post.is_premium && (
                            <Badge className="absolute top-3 left-3 bg-primary/90 text-white">
                              Premium
                            </Badge>
                          )}
                        </div>
                      )}
                      <CardHeader className="space-y-2">
                        {post.categories && post.categories.length > 0 && (
                          <Badge 
                            variant="secondary"
                            className="w-fit"
                            style={{ 
                              backgroundColor: post.categories[0].color ? `${post.categories[0].color}20` : undefined,
                              color: post.categories[0].color || undefined,
                            }}
                          >
                            {post.categories[0].name}
                          </Badge>
                        )}
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          <Link href={`/blogs/${post.slug || post.id}`}>
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          {post.author_name && (
                            <div className="flex items-center gap-2">
                              <span>{post.author_name}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.published_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {getReadingTime(post)}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {post.view_count !== undefined && (
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {post.view_count.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Debug Component */}
            <div className="mb-8">
              <DebugBlogData />
            </div>

            {/* All Posts */}
            <section id="all-posts">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  All Blog Posts
                  {searchQuery && (
                    <span className="text-sm text-muted-foreground">
                      (filtered by: "{searchQuery}")
                    </span>
                  )}
                </h2>
                <div className="text-sm text-muted-foreground">
                  {filteredAndSortedPosts.length} posts found
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="aspect-video bg-muted rounded-t-lg"></div>
                      <CardHeader>
                        <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                        <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-full mb-2"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : filteredAndSortedPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAndSortedPosts.map((post) => (
                    <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      {post.featured_image && (
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {post.is_premium && (
                            <Badge className="absolute top-3 left-3 bg-primary/90 text-white">
                              Premium
                            </Badge>
                          )}
                        </div>
                      )}
                      <CardHeader className="space-y-2">
                        <div className="flex items-center justify-between">
                          {post.categories && post.categories.length > 0 && (
                            <Badge 
                              variant="secondary"
                              className="w-fit"
                              style={{ 
                                backgroundColor: post.categories[0].color ? `${post.categories[0].color}20` : undefined,
                                color: post.categories[0].color || undefined,
                              }}
                            >
                              {post.categories[0].name}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          <Link href={`/blogs/${post.slug || post.id}`}>
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          {post.author_name && (
                            <div className="flex items-center gap-2">
                              <span>{post.author_name}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.published_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {getReadingTime(post)}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {post.view_count !== undefined && (
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {post.view_count.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search criteria or check back later for new content.
                  </p>
                  <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedTag("all"); }}>
                    Clear Search
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Popular Posts */}
              {popularPosts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Popular Now
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {popularPosts.slice(0, 5).map((post, index) => (
                        <Link key={post.id} href={`/blogs/${post.slug || post.id}`} className="flex gap-3 group">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDate(post.published_at)} • {getReadingTime(post)}
                            </p>
                          </div>
                          {post.featured_image && (
                            <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={post.featured_image}
                                alt={post.title}
                                width={64}
                                height={64}
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Categories */}
              {categories.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Tag className="h-5 w-5 text-primary" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant={selectedCategory === "all" ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory("all")}
                      >
                        All Categories
                      </Button>
                      {categories.slice(0, 8).map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.slug ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory(category.slug)}
                        >
                          {category.name}
                        </Button>
                      ))}
                      {categories.length > 8 && (
                        <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-muted-foreground">
                          +{categories.length - 8} more
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Tag className="h-5 w-5 text-primary" />
                      Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={selectedTag === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag("all")}
                      >
                        All Topics
                      </Button>
                      {tags.slice(0, 12).map((tag) => (
                        <Button
                          key={tag.id}
                          variant={selectedTag === tag.slug ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTag(tag.slug)}
                        >
                          {tag.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Newsletter */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-primary" />
                    Support Our Work
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Help us continue creating quality content and keeping our platform independent.
                  </p>
                  <Button className="w-full" asChild>
                    <Link href="/subscribe">
                      <Heart className="mr-2 h-4 w-4" />
                      Donate Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default BlogHub;