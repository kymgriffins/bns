import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, BarChart3, MapPin, Users, FileText, TrendingUp, HandHeart, ChevronRight, Heart, Globe, Mail, Award, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import AgencyHeroSection from "@/components/shadcn-space/blocks/hero-01";
import Testimonial01 from "@/components/shadcn-space/blocks/testimonial-02";
import { BentoCard, BentoGrid, BentoSection, BentoStat } from "@/components/ui/bento-frame";
import { BentoScrollAnimation, BentoStaggerGrid, BentoGridItem, BentoSectionHeader, BentoCTASection } from "@/components/ui/bento-animations";
import { Marquee } from "@/components/shadcn-space/animations/marquee";

export const metadata: Metadata = {
  title: "Budget Ndio Story - Follow the Budget. Find the Story.",
  description: "Kenyan budget transparency platform for young citizens. We turn national and county budgets into clear insights, practical analysis, and trackable evidence.",
};

// Statistics data for the impact section
const statistics = [
  { value: "500+", label: "Budget Reports Analyzed", icon: FileText, color: "green" as const },
  { value: "15K+", label: "Citizens Engaged", icon: Users, color: "blue" as const },
  { value: "47+", label: "Countries Worldwide", icon: Globe, color: "orange" as const },
  { value: "200+", label: "Partner Organizations", icon: Handshake, color: "purple" as const },
];

// How it works steps
const howItWorks = [
  {
    step: "01",
    title: "Browse Reports",
    description: "Explore simplified budget documents from national and county levels in plain language.",
    icon: BookOpen,
    color: "green" as const,
  },
  {
    step: "02",
    title: "Analyze Insights",
    description: "Dive deep into sector analysis, track changes over time, and understand what it means for you.",
    icon: BarChart3,
    color: "blue" as const,
  },
  {
    step: "03",
    title: "Take Action",
    description: "Use templates, join trainings, and participate in budget processes to make your voice heard.",
    icon: HandHeart,
    color: "orange" as const,
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
    color: "blue" as const,
  },
  {
    title: "Health Sector Budget Analysis",
    category: "Sector Analysis",
    date: "Jan 2025",
    summary: "Where healthcare funding is going and what it means",
    href: "/reports",
    color: "red" as const,
  },
  {
    title: "Nairobi County Budget Brief",
    category: "County",
    date: "Dec 2024",
    summary: "Understanding the city budget for residents",
    href: "/reports",
    color: "orange" as const,
  },
];

const features = [
  {
    title: "Simplified Reports",
    description: "Key takeaways from major budget documents—fast, clear, shareable.",
    icon: FileText,
    href: "/reports",
    cta: "Browse Reports",
    color: "green" as const,
  },
  {
    title: "Budget Analysis",
    description: "What changed, what it means, and what to watch—national, county, sector.",
    icon: BarChart3,
    href: "/insights",
    cta: "Explore Analysis",
    color: "blue" as const,
  },
  {
    title: "Budget Tracker",
    description: "Follow selected lines from allocation → release → delivery (where visible).",
    icon: MapPin,
    href: "/tracker",
    cta: "Open Tracker",
    color: "teal" as const,
  },
];

// Partner data for marquee
const partners = [
  { name: "The Continental Pot", logo: "TCP", color: "bg-blue-500" },
  { name: "Colour Twist Media", logo: "CTM", color: "bg-purple-500" },
  { name: "Sen Media & Events", logo: "SME", color: "bg-green-500" },
  { name: "Open Government", logo: "OGP", color: "bg-orange-500" },
  { name: "Intl Budget Partnership", logo: "IBP", color: "bg-teal-500" },
  { name: "Transparency Intl", logo: "TI", color: "bg-red-500" },
];

// Sponsors for advertisement marquee
const sponsors = [
  { name: "World Bank Kenya", tagline: "Building a Better Kenya" },
  { name: "USAID Kenya", tagline: "Partnership for Prosperity" },
  { name: "Kenya Government", tagline: "Public Finance for Development" },
  { name: "EU Delegation", tagline: "Team Europe for Kenya" },
  { name: "UNDP Kenya", tagline: "Future-Ready Kenya" },
];

// Global presence data
const globalPresence = [
  { city: "Nairobi", country: "Kenya", flag: "🇰🇪", role: "HQ" },
  { city: "Singapore", country: "Singapore", flag: "🇸🇬", role: "Asia Pacific" },
  { city: "Brussels", country: "Belgium", flag: "🇧🇪", role: "Europe" },
  { city: "Washington D.C.", country: "USA", flag: "🇺🇸", role: "Americas" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <AgencyHeroSection showHeader={false} />

    
      {/* How It Works - Bento Layout */}
      <BentoSection className="bg-secondary/20">
        <BentoScrollAnimation animation="fadeInUp">
          <BentoSectionHeader
            title="How It Works"
            subtitle="Three simple steps to understand and engage with Kenya's budget"
          />
        </BentoScrollAnimation>

        <BentoStaggerGrid stagger={0.15} className="grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorks.map((item, index) => (
            <BentoGridItem key={index} animation="fadeInUp" delay={index * 0.1}>
              <BentoCard padding="lg" accentColor={item.color} hover>
                <div className="relative">
                  {/* Step number watermark */}
                  <div className="absolute -top-2 -right-2 text-7xl font-bold text-foreground/5 select-none">
                    {item.step}
                  </div>
                  {/* Icon */}
                  <div className={`mb-5 p-3 rounded-2xl w-fit ${
                    item.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                    item.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    'bg-orange-100 dark:bg-orange-900/30'
                  }`}>
                  
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </BentoCard>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>
      </BentoSection>

      {/* Features Bento - Asymmetric Layout */}
      <BentoSection>
        <BentoScrollAnimation animation="fadeInUp">
          <BentoSectionHeader
            title="What You Can Do Today"
            subtitle="Explore our tools designed to make budget information accessible and actionable"
          />
        </BentoScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <BentoScrollAnimation key={index} animation="fadeInUp" delay={index * 0.1}>
              <Link href={feature.href} className="block h-full">
                <BentoCard padding="lg" accentColor={feature.color} hover className="h-full group">
                  <div className={`mb-5 p-3 rounded-2xl w-fit ${
                    feature.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                    feature.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    'bg-teal-100 dark:bg-teal-900/30'
                  }`}>
                    <feature.icon className={`h-6 w-6 ${
                      feature.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      feature.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      'text-teal-600 dark:text-teal-400'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed">{feature.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    {feature.cta}
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </BentoCard>
              </Link>
            </BentoScrollAnimation>
          ))}
        </div>
      </BentoSection>

      {/* Testimonials Section */}
      <section className="py-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Testimonial01 />
        </div>
      </section>

      {/* Support Our Work - Donation CTA */}
      <BentoSection className="bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-blue-950/30 dark:via-background dark:to-amber-950/30">
        <BentoScrollAnimation animation="fadeInUp">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              Support Our Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Help Us Keep Kenya's Budget Transparent</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Budget Ndio Story is a youth-led initiative making budget information accessible to all Kenyans. 
              Your support helps us continue this work—producing reports, training champions, and keeping government accountable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
              <Button size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700">
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Button>
              </Link>
              
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>We accept international donations</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Contact us for partnership: info@budgetndiostory.org</span>
              </div>
            </div>
          </div>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Latest Reports - Bento Grid */}
      <BentoSection className="bg-secondary/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <BentoScrollAnimation animation="fadeInUp">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Latest Reports</h2>
              <p className="text-muted-foreground">Fresh budget insights and analysis</p>
            </div>
          </BentoScrollAnimation>
          <BentoScrollAnimation animation="fadeInUp" delay={0.1}>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/reports">
                View All Reports <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </BentoScrollAnimation>
        </div>

        <BentoStaggerGrid stagger={0.1} className="grid-cols-1 md:grid-cols-3 gap-6">
          {latestReports.map((report, index) => (
            <BentoGridItem key={index} animation="fadeInUp" delay={index * 0.1}>
              <Link href={report.href} className="block h-full">
                <BentoCard padding="lg" accentColor={report.color} hover className="h-full group">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      report.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                      report.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                      'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                    }`}>
                      {report.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{report.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors leading-snug">
                    {report.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{report.summary}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                    Read Brief <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </BentoCard>
              </Link>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>
      </BentoSection>

      {/* Newsletter CTA - Bento Style */}
      <BentoSection>
        <BentoScrollAnimation animation="scaleIn">
          <BentoCTASection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Informed</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get budget updates, participation windows, and training alerts delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-full border-2 border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <Button size="lg" className="rounded-full px-8">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </BentoCTASection>
        </BentoScrollAnimation>
      </BentoSection>
    </main>
  );
}
