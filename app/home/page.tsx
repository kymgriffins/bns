import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BarChart3,
  MapPin,
  Users,
  FileText,
  HandHeart,
  ChevronRight,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AgencyHeroSection from "@/components/shadcn-space/blocks/hero-01";
import Testimonial01 from "@/components/shadcn-space/blocks/testimonial-02";
import { BentoSection } from "@/components/ui/bento-frame";
import {
  BentoScrollAnimation,
  BentoCTASection,
} from "@/components/ui/bento-animations";
import {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  SmoothFade,
} from "@/components/ui/enhanced-animations";
import { DonateSection } from "@/components/donate-section";
import { Marquee } from "@/components/shadcn-space/animations/marquee";

export const metadata: Metadata = {
  title: "Budget Ndio Story - Follow the Budget. Find the Story.",
  description: "Kenyan budget transparency platform for young citizens. We turn national and county budgets into clear insights, practical analysis, and trackable evidence.",
};

// Statistics data for the impact section
const statistics = [
  { value: 10 , suffix: " years", label: "Budget Reports Analyzed", icon: FileText },
  { value: 15000, suffix: "+", label: "Kenyans Reached", icon: Users },
  { value: 47, suffix: "", label: "Counties & Contexts Covered", icon: MapPin },
  { value: 20, suffix: "+", label: "Partner Organizations", icon: Handshake },
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

const partners = [
  { 
    name: "The Continental Pot", 
    logo: "TCP", 
    image: "https://continentalpot.africa/wp-content/uploads/2025/02/The-Continental-Pot-Vertical.png",
    website: "https://continentalpot.africa",
    benefit: "Leading African media platform providing continental reach and storytelling expertise for budget narratives across Africa."
  },
  { 
    name: "Colour Twist Media", 
    logo: "CTM", 
    image: "https://colortwistmedia.co.ke/wp-content/uploads/2024/08/logo.png",
    website: "https://colortwistmedia.co.ke",
    benefit: "Creative media solutions bringing visual storytelling and production capabilities to make budget information engaging."
  },
  { 
    name: "Sen Media & Events", 
    logo: "SME", 
    image: "/senmedia.png",
    website: "https://senmedia-events.co.ke",
    benefit: "Professional event management and media services enabling workshops, trainings, and community engagement activities."
  },
 
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero: cinematic but now paired with very calm layout */}
      <AgencyHeroSection showHeader={false} />

      {/* Sliding marquee, mirroring Learn page but tuned for the main story */}
      <section className="border-b border-border bg-secondary/20 py-3">
        <div className="container-hig">
          <Marquee pauseOnHover className="py-1" duration="26s">
            <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                New
              </span>
              <span className="font-medium">
                Budget 101 · Learn hub is live
              </span>
              <span className="text-muted-foreground">
                Start with BPS 2026 and move from &quot;confused&quot; to
                &quot;I can explain this.&quot;
              </span>
            </div>
            <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                Creators
              </span>
              <span className="font-medium">
                Visual budget stories for TikTok, IG &amp; YouTube
              </span>
              <span className="text-muted-foreground">
                Briefs, hooks and formats that make public finance scroll‑stopping.
              </span>
            </div>
            <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                Civic windows
              </span>
              <span className="font-medium">
                Track key dates in Kenya&apos;s budget calendar
              </span>
              <span className="text-muted-foreground">
                From BPS to county barazas, we surface when your voice matters most.
              </span>
            </div>
          </Marquee>
        </div>
      </section>

      {/* Editorial intro: lots of whitespace, clear hierarchy */}
      <section className="section-hig border-t border-border/60">
        <div className="container-hig grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
          <ScrollAnimation animation="fadeInUp">
            <div className="space-y-6">
              <p className="badge-minimal text-xs  uppercase">
                Youth-first public finance
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                A premium home for Kenya&apos;s budget story.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl">
                We pair serious fiscal analysis with cinematic storytelling so young Kenyans can
                see where money starts, where it moves, and what actually lands on the ground.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-7">
                  <Link href="/reports">
                    Browse latest reports
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-7"
                >
                  <Link href="/take-action">
                    Join as a budget storyteller
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span>Co-created with creators, universities &amp; civic groups.</span>
                <span className="h-px w-8 bg-border" />
                <span>Always free to access.</span>
              </div>
            </div>
          </ScrollAnimation>

          <SmoothFade>
            <Card className="card-hig-blur">
              <CardContent className="p-6 md:p-7 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      Next civic windows
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      We surface the moments in Kenya&apos;s budget calendar that actually
                      need your voice.
                    </p>
                  </div>
                  <div className="rounded-full border border-border px-3 py-1 text-xs">
                    Live tracker
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-border/60">
                    <div className="space-y-0.5">
                      <p className="font-medium">Budget reading &amp; debate</p>
                      <p className="text-xs text-muted-foreground">
                        Follow allocations as they&apos;re tabled and amended.
                      </p>
                    </div>
                    <Link
                      href="/tracker"
                      className="text-xs font-medium text-primary flex items-center gap-1"
                    >
                      Open tracker
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <p className="font-medium">County public participation</p>
                      <p className="text-xs text-muted-foreground">
                        Templates, briefs, and examples that actually work in a baraza.
                      </p>
                    </div>
                    <Link
                      href="/take-action"
                      className="text-xs font-medium text-primary flex items-center gap-1"
                    >
                      Take action
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SmoothFade>
        </div>
      </section>

      {/* Impact numbers: animated, very clean */}
      <section className="section-hig border-t border-border/60">
        <div className="container-hig space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <p className="badge-minimal text-xs  uppercase">
                Impact in numbers
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
                A budget platform that starts with people, not PDFs.
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                We work with analysts, creators and organizers to keep Kenya&apos;s budget
                story measurable, searchable and shareable.
              </p>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground max-w-sm">
              All numbers are rounded, regularly updated and linked back to
              source documents where possible.
            </p>
          </div>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            animation="fadeInUp"
          >
            {statistics.map((item, index) => (
              <StaggerItem key={item.label}>
                <Card className="card-hig-neutral h-full">
                  <CardContent className="p-5 md:p-6 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="icon-wrapper">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {index === 0 ? "Reports" : index === 1 ? "People" : "Network"}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <AnimatedCounter
                        value={item.value}
                        suffix={item.suffix}
                        className="text-2xl md:text-3xl font-semibold"
                      />
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How it works: three clear, animated steps */}
      <section className="section-hig border-t border-border/60">
        <div className="container-hig space-y-10">
          <ScrollAnimation animation="fadeInUp">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <p className="badge-minimal text-xs  uppercase">
                  How Budget Ndio Story works
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
                  Three simple moves from document to story to pressure.
                </h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Every feature on the platform mirrors this flow so you never lose
                track of where you are in the process.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((item) => (
              <ScrollAnimation key={item.step} animation="fadeInUp">
                <div className="card-hig-neutral h-full p-6 rounded-2xl flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                      Step {item.step}
                    </span>
                    <div className="icon-wrapper">
                      <item.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    {item.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>


      {/* Latest reports: editorial-style list, not tiles */}
      <section className="section-hig border-t border-border/60">
        <div className="container-hig space-y-8">
          <ScrollAnimation animation="fadeInUp">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <p className="badge-minimal text-xs  uppercase">
                  Fresh from the budget
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
                  Latest reports and visual explainers.
                </h2>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full px-5"
              >
                <Link href="/reports">
                  View all reports
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </ScrollAnimation>

          <div className="divide-y divide-border/70">
            {latestReports.map((report) => (
              <Link
                key={report.title}
                href={report.href}
                className="block py-4 md:py-5 hover:bg-secondary/40 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="px-3 py-1 rounded-full border border-border">
                      {report.category}
                    </span>
                    <span>{report.date}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm md:text-base font-medium">
                      {report.title}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {report.summary}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-primary flex items-center gap-1">
                    Read brief
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stories from the ground */}
      <section className="section-hig border-t border-border/60">
        <div className="container-hig">
          <Testimonial01 />
        </div>
      </section>

      {/* Partners */}
      <section className="section-hig border-t border-border/60">
        <div className="container-hig space-y-8">
          <div className="text-left md:text-center space-y-3">
            <p className="badge-minimal text-xs  uppercase">
              Led by storytellers
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              A Kenya-wide consortium at the intersection of media, data and organizing.
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl md:mx-auto">
              Budget Ndio Story is led by{" "}
              <span className="font-medium">The Continental Pot, Colour Twist Media,</span>{" "}
              and <span className="font-medium">Sen Media &amp; Events</span>, working with
              creators, universities, civil society and partners across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl md:mx-auto">
            {partners.slice(0, 3).map((partner) => (
              <a
                key={partner.name}
                href={partner.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="card-hig h-full hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                    {partner.image ? (
                      <div className="relative h-16 w-40 flex items-center justify-center">
                        <img
                          src={partner.image}
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center">
                        <span className="text-xs font-semibold">
                          {partner.logo}
                        </span>
                      </div>
                    )}
                    <span className="text-sm font-semibold text-center">
                      {partner.name}
                    </span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Support Our Work - Donation CTA (kept very minimal) */}
      <DonateSection />
    </main>
  );
}
