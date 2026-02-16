import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, BarChart3, MapPin, Calendar, Users, Video, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import AgencyHeroSection from "@/components/shadcn-space/blocks/hero-01";


export const metadata: Metadata = {
  title: "Budget Ndio Story - Follow the Budget. Find the Story.",
  description: "Kenyan budget transparency platform for young citizens. We turn national and county budgets into clear insights, practical analysis, and trackable evidence.",
};

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
    

      {/* Start Here Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start Here</h2>
            <p className="text-lg text-muted-foreground">New to budgets? Start your journey here.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {startHereLinks.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="group flex items-center justify-center gap-3 p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-medium group-hover:text-primary transition-colors">
                  {link.text}
                </span>
                <ChevronRight className="h-4 w-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="link">
              <Link href="/learn">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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

      {/* Take Action This Week Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Take Action This Week</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Know the budget. Use it. Follow up.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {actionItems.map((item) => (
              <Button key={item.text} asChild variant="default" size="lg" className="px-6">
                <Link href={item.href}>
                  {item.text}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      
    </main>
  );
}
