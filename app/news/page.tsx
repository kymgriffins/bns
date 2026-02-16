import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Video, FileText, Users, Send, Calendar, Tag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "News & Updates - Budget Ndio Story",
  description: "Stories, videos, and updates. Built for clarity and action.",
};

const tabs = ["Stories", "Videos", "Updates"];

const storiesFilters = [
  "Investigations",
  "Explainers",
  "County",
  "Sector",
  "Youth Voices",
  "Field Reports",
];

const videosCategories = [
  "Basics",
  "Finance Bill",
  "National",
  "County",
  "Sector",
  "Tracker Stories",
];

const updatesTags = [
  "Participation",
  "Release",
  "Training",
  "Event",
  "Tracker",
  "New Report",
];

// Sample content
const sampleStories = [
  {
    title: "How Youth Livelihood Funds Are Being Spent in Nairobi",
    category: "Investigations",
    date: "February 2026",
    excerpt: "A deep dive into the youth empowerment programme allocations and what's actually reaching young people.",
    author: "Budget Team",
  },
  {
    title: "Understanding the 2025/26 Finance Bill",
    category: "Explainers",
    date: "January 2026",
    excerpt: "What the new taxes mean for ordinary Kenyans and what you can do about it.",
    author: "Analysis Team",
  },
  {
    title: "Makueni County Budget: What's Changed Since Last Year",
    category: "County",
    date: "January 2026",
    excerpt: "Comparing this year's allocations with last year's spending in one of Kenya's ASAL counties.",
    author: "County Watch",
  },
];

const sampleVideos = [
  {
    title: "Budget Basics: What is a Budget?",
    category: "Basics",
    duration: "5:30",
    thumbnail: "🎬",
  },
  {
    title: "Understanding the Finance Bill 2025",
    category: "Finance Bill",
    duration: "8:15",
    thumbnail: "🎬",
  },
  {
    title: "County Budgets Explained",
    category: "County",
    duration: "6:45",
    thumbnail: "🎬",
  },
];

const sampleUpdates = [
  {
    title: "Public Participation Window Opens for FY 2026/27 Budget",
    tag: "Participation",
    date: "February 15, 2026",
  },
  {
    title: "2025 Budget Policy Statement Now Available",
    tag: "New Report",
    date: "February 1, 2026",
  },
  {
    title: "Free Budget Training: Nairobi Cohort Starting Soon",
    tag: "Training",
    date: "January 28, 2026",
  },
  {
    title: "Virtual Public Forum: Have Your Say on Health Budget",
    tag: "Event",
    date: "January 25, 2026",
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="News"
        description="Stories, videos, and updates. Built for clarity and action."
        eyebrow="Latest Updates"
        cta={{ text: "Browse All", href: "#stories" }}
      />

      {/* Tabs Navigation */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={tab === "Stories" ? "default" : "outline"}
                className="rounded-full"
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Emerging Stories</h2>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search stories..."
                className="bg-transparent border-b border-border focus:border-primary outline-none px-2 py-1 text-sm w-48"
              />
            </div>
          </div>
          
          <p className="text-muted-foreground mb-8">
            Investigations and explainers connecting budgets to real life in Kenya.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {storiesFilters.map((filter) => (
              <Button key={filter} variant="outline" size="sm" className="rounded-full">
                {filter}
              </Button>
            ))}
          </div>

          {/* Stories Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {sampleStories.map((story, index) => (
              <article
                key={index}
                className="group p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded mb-3">
                  {story.category}
                </span>
                <p className="text-xs text-muted-foreground mb-2">
                  {story.date} • {story.author}
                </p>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {story.excerpt}
                </p>
                <Button variant="link" className="p-0 h-auto">
                  Read Story <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </article>
            ))}
          </div>

          {/* CTA Strip */}
          <div className="mt-12 p-6 bg-secondary/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-medium">Have a story tip or need a specific brief?</p>
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
      </section>

      {/* Videos Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Videos</h2>
          <p className="text-muted-foreground mb-8">
            Short explainers made for mobile.
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {videosCategories.map((category) => (
              <Button key={category} variant="outline" size="sm" className="rounded-full">
                {category}
              </Button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {sampleVideos.map((video, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="aspect-video bg-primary/10 rounded-xl mb-3 flex items-center justify-center">
                  <Video className="h-12 w-12 text-primary" />
                </div>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded mb-2">
                  {video.category}
                </span>
                <h3 className="font-bold group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-muted-foreground">{video.duration}</p>
              </div>
            ))}
          </div>

          {/* CTA Strip */}
          <div className="mt-12 p-6 bg-secondary/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-medium">Want to see a specific topic covered?</p>
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
      </section>

      {/* Updates Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Updates</h2>
          <p className="text-muted-foreground mb-8">
            Budget participation windows, document releases, trainings, and tracker changes.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {updatesTags.map((tag) => (
              <Button key={tag} variant="outline" size="sm" className="rounded-full">
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Button>
            ))}
          </div>

          {/* Updates List */}
          <div className="space-y-4">
            {sampleUpdates.map((update, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex-shrink-0 w-16 text-center">
                  <Calendar className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">{update.date}</p>
                </div>
                <div className="flex-1">
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded mb-1">
                    {update.tag}
                  </span>
                  <h3 className="font-medium hover:text-primary transition-colors cursor-pointer">
                    {update.title}
                  </h3>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>

          {/* CTA Strip */}
          <div className="mt-12 p-6 bg-primary/5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-medium">Stay informed about budget developments</p>
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
      </section>
    </main>
  );
}
