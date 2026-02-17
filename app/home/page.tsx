import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, BarChart3, MapPin, Calendar, Users, Video, FileText, ChevronRight, TrendingUp, Eye, HandHeart, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";

import AgencyHeroSection from "@/components/shadcn-space/blocks/hero-01";
import Testimonial01 from "@/components/shadcn-space/blocks/testimonial-02";


export const metadata: Metadata = {
  title: "Budget Ndio Story - Follow the Budget. Find the Story.",
  description: "Kenyan budget transparency platform for young citizens. We turn national and county budgets into clear insights, practical analysis, and trackable evidence.",
};

// Statistics data for the impact section
const statistics = [
  { value: "500+", label: "Budget Reports Analyzed", icon: FileText },
  { value: "15K+", label: "Citizens Engaged", icon: Users },
  { value: "47", label: "Counties Covered", icon: MapPin },
  { value: "120+", label: "Youth Trainings", icon: TrendingUp },
];

// How it works steps
const howItWorks = [
  {
    step: "01",
    title: "Browse Reports",
    description: "Explore simplified budget documents from national and county levels in plain language.",
    icon: BookOpen,
  },
  {
    step: "02", 
    title: "Analyze Insights",
    description: "Dive deep into sector analysis, track changes over time, and understand what it means for you.",
    icon: BarChart3,
  },
  {
    step: "03",
    title: "Take Action",
    description: "Use templates, join trainings, and participate in budget processes to make your voice heard.",
    icon: HandHeart,
  },
];

// Latest reports data
const latestReports = [
  {
    title: "FY 2025/26 Budget at a Glance",
    category: "National",
    date: "Feb 2025",
    summary: "Key highlights from the national budget reading",
    href: "/reports",
  },
  {
    title: "Health Sector Budget Analysis",
    category: "Sector Analysis", 
    date: "Jan 2025",
    summary: "Where healthcare funding is going and what it means",
    href: "/reports",
  },
  {
    title: "Nairobi County Budget Brief",
    category: "County",
    date: "Dec 2024",
    summary: "Understanding the city budget for residents",
    href: "/reports",
  },
];



const features = [
  {
    title: "Simplified Reports",
    description: "Key takeaways from major budget documents—fast, clear, shareable.",
    icon: FileText,
    href: "/reports",
    cta: "Browse Reports",
  },
  {
    title: "Budget Analysis",
    description: "What changed, what it means, and what to watch—national, county, sector.",
    icon: BarChart3,
    href: "/insights",
    cta: "Explore Analysis",
  },
  {
    title: "Budget Tracker",
    description: "Follow selected lines from allocation → release → delivery (where visible).",
    icon: MapPin,
    href: "/tracker",
    cta: "Open Tracker",
  },
];

const startHereLinks = [
  { text: "Budget Basics", href: "/learn" },
  { text: "National vs County", href: "/learn" },
  { text: "Budget Calendar", href: "/learn" },
];

const actionItems = [
  { text: "Join the Community", href: "/take-action" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <AgencyHeroSection showHeader={false}/>

      {/* Statistics/Impact Section */}
   
    

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to understand and engage with Kenya's budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute top-0 right-0 text-8xl font-bold text-primary/5 -z-10 group-hover:text-primary/10 transition-colors">
                  {item.step}
                </div>
                <div className="p-8 bg-background rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-xl h-full">
                  
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
 {/* Testimonials Section */}
      <section className="py-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Testimonial01 />
        </div>
      </section>
      {/* Latest Reports Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Latest Reports</h2>
              <p className="text-muted-foreground">Fresh budget insights and analysis</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/reports">
                View All Reports <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestReports.map((report, index) => (
              <Link
                key={index}
                href={report.href}
                className="group p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {report.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{report.date}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {report.title}
                </h3>
                <p className="text-sm text-muted-foreground">{report.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Do Today Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What you can do today</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-8 bg-background rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-xl"
              >
                
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link href={feature.href}>
                    {feature.cta}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 dark:from-primary/5 dark:via-primary/2 dark:to-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Informed</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get budget updates, participation windows, and training alerts delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="lg" className="rounded-full px-8">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

     

     

      
    </main>
  );
}
