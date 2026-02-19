"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Video, 
  Users, 
  Send, 
  Calendar, 
  Tag, 
  Search, 
  Loader2,
  Clock,
  Play,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Types for news data
interface Story {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  author: string;
  image_url?: string;
  is_featured?: boolean;
  source_type?: string;
}

interface Video {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail?: string;
  video_url?: string;
  is_featured?: boolean;
}

interface Update {
  id: string;
  title: string;
  tag: string;
  date: string;
  description?: string;
  link_url?: string;
}

interface NewsData {
  stories: Story[];
  videos: Video[];
  updates: Update[];
}

interface NewsHubProps {
  initialData?: NewsData;
}

const storiesFilters = [
  "All",
  "Investigations",
  "Explainers",
  "County",
  "Sector",
  "Youth Voices",
  "Field Reports",
];

const videosCategories = [
  "All",
  "Basics",
  "Finance Bill",
  "National",
  "County",
  "Sector",
  "Tracker Stories",
];

const updatesTags = [
  "All",
  "Participation",
  "Release",
  "Training",
  "Event",
  "Tracker",
  "New Report",
];

export function NewsHub({ initialData }: NewsHubProps) {
  const [activeTab, setActiveTab] = useState<"stories" | "videos" | "updates">("stories");
  const [newsData, setNewsData] = useState<NewsData>(initialData || { stories: [], videos: [], updates: [] });
  const [loading, setLoading] = useState(!initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Fetch data on mount if not provided
  useEffect(() => {
    if (initialData) {
      setNewsData(initialData);
      setLoading(false);
      return;
    }

    async function fetchNews() {
      try {
        const response = await fetch("/api/news", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          setNewsData(data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [initialData]);

  // Filter and search logic
  const filteredStories = useMemo(() => {
    let result = newsData.stories;
    
    if (selectedFilter !== "All") {
      result = result.filter(story => story.category === selectedFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        story => 
          story.title.toLowerCase().includes(query) || 
          story.excerpt.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [newsData.stories, selectedFilter, searchQuery]);

  const filteredVideos = useMemo(() => {
    let result = newsData.videos;
    
    if (selectedFilter !== "All") {
      result = result.filter(video => video.category === selectedFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(video => video.title.toLowerCase().includes(query));
    }
    
    return result;
  }, [newsData.videos, selectedFilter, searchQuery]);

  const filteredUpdates = useMemo(() => {
    let result = newsData.updates;
    
    if (selectedFilter !== "All") {
      result = result.filter(update => update.tag === selectedFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        update => 
          update.title.toLowerCase().includes(query) ||
          (update.description?.toLowerCase().includes(query) ?? false)
      );
    }
    
    return result;
  }, [newsData.updates, selectedFilter, searchQuery]);

  // Get current filters based on active tab
  const currentFilters = activeTab === "stories" 
    ? storiesFilters 
    : activeTab === "videos" 
      ? videosCategories 
      : updatesTags;

  // Featured story
  const featuredStory = newsData.stories.find(s => s.is_featured);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-primary font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Latest Updates</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            News & Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Stories, videos, and updates—built for clarity and action. 
            Stay informed about Kenya's budget process.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-4 overflow-x-auto">
            {(["stories", "videos", "updates"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedFilter("All");
                  setSearchQuery("");
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className="ml-2 text-xs opacity-70">
                  ({tab === "stories" ? newsData.stories.length : tab === "videos" ? newsData.videos.length : newsData.updates.length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-b bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {currentFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedFilter === filter
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Stories Tab */}
          {activeTab === "stories" && (
            <div className="space-y-8">
              {/* Featured Story */}
              {featuredStory && !searchQuery && selectedFilter === "All" && (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-1">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      <TrendingUp className="h-3 w-3" />
                      Featured
                    </span>
                  </div>
                  <div className="bg-background rounded-xl p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded mb-4">
                          {featuredStory.category}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                          <Link href={`/news/${featuredStory.id}`} className="hover:text-primary transition-colors">
                            {featuredStory.title}
                          </Link>
                        </h2>
                        <p className="text-muted-foreground mb-6 line-clamp-3">
                          {featuredStory.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {featuredStory.date}
                          </span>
                          <span>•</span>
                          <span>{featuredStory.author}</span>
                        </div>
                        <Button asChild className="rounded-full">
                          <Link href={`/news/${featuredStory.id}`}>
                            Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                      <div className="hidden md:flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center">
                          <Sparkles className="h-20 w-20 text-primary/30" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stories Grid */}
              {filteredStories.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStories.map((story) => (
                    <article
                      key={story.id}
                      className="group p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                          {story.category}
                        </span>
                        {story.is_featured && (
                          <TrendingUp className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {story.date} • {story.author}
                      </p>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/news/${story.id}`} className="focus:outline-none">
                          {story.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {story.excerpt}
                      </p>
                      <Button variant="link" asChild className="p-0 h-auto text-sm">
                        <Link href={`/news/${story.id}`}>
                          Read More <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState type="stories" />
              )}

              {/* CTA Strip */}
              <div className="mt-12 p-8 bg-gradient-to-r from-secondary/50 to-primary/5 rounded-2xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Have a story tip?</h3>
                    <p className="text-muted-foreground text-sm">
                      Share your insights or request a budget brief.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button asChild variant="outline">
                      <Link href="/take-action">
                        <Send className="mr-2 h-4 w-4" />
                        Submit a Tip
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/reports">Request a Brief</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === "videos" && (
            <div className="space-y-8">
              {/* Featured Video */}
              {newsData.videos.find(v => v.is_featured) && !searchQuery && selectedFilter === "All" && (
                <div className="relative overflow-hidden rounded-2xl bg-black aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play className="h-10 w-10 text-white ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground mb-3">
                      <Play className="h-3 w-3" />
                      Featured Video
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {newsData.videos.find(v => v.is_featured)?.title}
                    </h2>
                    <p className="text-white/70">
                      {newsData.videos.find(v => v.is_featured)?.category} • {newsData.videos.find(v => v.is_featured)?.duration}
                    </p>
                  </div>
                </div>
              )}

              {/* Videos Grid */}
              {filteredVideos.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-4 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="h-6 w-6 text-white ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                          {video.category}
                        </span>
                        {video.is_featured && (
                          <TrendingUp className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState type="videos" />
              )}

              {/* CTA Strip */}
              <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-secondary/50 rounded-2xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Want to see a specific topic?</h3>
                    <p className="text-muted-foreground text-sm">
                      Request a video or join our training program.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button asChild variant="outline">
                      <Link href="/take-action">Request a Topic</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/take-action">Join Training</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Updates Tab */}
          {activeTab === "updates" && (
            <div className="space-y-8">
              {/* Updates Timeline */}
              {filteredUpdates.length > 0 ? (
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

                  <div className="space-y-4">
                    {filteredUpdates.map((update, index) => (
                      <div
                        key={update.id}
                        className="flex gap-6 p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-md"
                      >
                        {/* Date */}
                        <div className="hidden md:flex flex-col items-center">
                          <div className="w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                            <Calendar className="h-5 w-5 text-primary mb-1" />
                            <span className="text-xs text-muted-foreground">{update.date.split(',')[0]}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                              <Tag className="h-3 w-3" />
                              {update.tag}
                            </span>
                            <span className="md:hidden text-xs text-muted-foreground">
                              {update.date}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer mb-2">
                            {update.title}
                          </h3>
                          {update.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {update.description}
                            </p>
                          )}
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center">
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <EmptyState type="updates" />
              )}

              {/* CTA Strip */}
              <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Never miss an update</h3>
                    <p className="text-muted-foreground text-sm">
                      Subscribe to our newsletter or join the community.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button asChild variant="outline">
                      <Link href="/#subscribe">Subscribe</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/take-action">
                        <Users className="mr-2 h-4 w-4" />
                        Join Community
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function EmptyState({ type }: { type: string }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
        {type === "stories" && <Sparkles className="h-10 w-10 text-muted-foreground" />}
        {type === "videos" && <Video className="h-10 w-10 text-muted-foreground" />}
        {type === "updates" && <Clock className="h-10 w-10 text-muted-foreground" />}
      </div>
      <h3 className="text-xl font-semibold mb-2">No {type} found</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        {type === "stories" && "We couldn't find any stories matching your criteria. Try adjusting your filters or search."}
        {type === "videos" && "We couldn't find any videos matching your criteria. Try adjusting your filters or search."}
        {type === "updates" && "We couldn't find any updates matching your criteria. Try adjusting your filters or search."}
      </p>
    </div>
  );
}
