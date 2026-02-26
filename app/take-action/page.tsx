import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, FileQuestion, Users, GraduationCap, MapPin, BookOpen, MessageSquare, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { BentoCard, BentoSection, BentoCTASection } from "@/components/ui/bento-frame";
import { BentoScrollAnimation, BentoStaggerGrid, BentoGridItem, BentoSectionHeader } from "@/components/ui/bento-animations";

export const metadata: Metadata = {
  title: "Take Action - Budget Ndio Story",
  description: "Know the budget. Use it. Follow up. Join pathways for youth participation in Kenya's budget process.",
};

const pathways = [
  {
    icon: Calendar,
    title: "Budget Calendar",
    description: "Track participation windows and key dates in the budget cycle",
    cta: "View Calendar",
    href: "/learn",
  },
  {
    icon: FileQuestion,
    title: "Submission Support",
    description: "Templates and guidance for submitting memoranda and public comments",
    cta: "Get Template",
    href: "/learn",
  },
  {
    icon: MessageSquare,
    title: "Question Bank",
    description: "Questions to ask at public forums and participation sessions",
    cta: "Browse Questions",
    href: "/learn",
  },
  {
    icon: MapPin,
    title: "Community Tracking",
    description: "Guides for tracking budget delivery in your community",
    cta: "Start Tracking",
    href: "/tracker",
  },
  {
    icon: Users,
    title: "County Chapters",
    description: "Connect with local groups and organizers in your county",
    cta: "Find Chapter",
    href: "#",
  },
  {
    icon: GraduationCap,
    title: "Budget Champion",
    description: "Become a trained budget advocate in your community",
    cta: "Learn More",
    href: "#",
  },
  {
    icon: Users,
    title: "Campus Budget Voices",
    description: "Join university groups promoting budget literacy",
    cta: "Join Campus",
    href: "#",
  },
];

const toolkit = [
  { name: "Budget Calendar", description: "Key dates for FY 2025/26" },
  { name: "Submission Template", description: "How to write a memorandum" },
  { name: "Citizen Question Bank", description: "Questions for public forums" },
  { name: "Glossary", description: "Budget terms explained" },
  { name: "National vs County Guide", description: "Understanding government levels" },
];

const actionItems = [
  { text: "Join the Community", href: "#", icon: Users },
  { text: "Attend Training", href: "#", icon: GraduationCap },
  { text: "Start a County Chapter", href: "#", icon: MapPin },
];

export default function TakeActionPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
     
      {/* Pathways Section - Bento Grid */}
      <BentoSection id="pathways">
        <BentoSectionHeader
          title="Pathways to Participate"
          subtitle="Choose your path to civic engagement"
        />
        <BentoStaggerGrid stagger={0.08} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pathways.map((pathway, index) => (
            <BentoGridItem key={pathway.title} animation="fadeInUp" delay={index * 0.08}>
              <BentoCard padding="lg" accentColor="green" hover className="h-full group">
                <div className="mb-4 p-3 rounded-2xl bg-green-100 dark:bg-green-900/30 w-fit">
                  <pathway.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{pathway.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{pathway.description}</p>
                <Button asChild variant="outline" className="w-full rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link href={pathway.href}>
                    {pathway.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </BentoCard>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>
      </BentoSection>

      {/* Toolkit Section - Bento */}
      <BentoSection className="bg-secondary/10">
        <BentoSectionHeader
          title="Action Toolkit"
          subtitle="Resources to help you participate effectively in budget processes"
        />
        <BentoStaggerGrid stagger={0.1} className="grid-cols-2 md:grid-cols-5 gap-4">
          {toolkit.map((item, index) => (
            <BentoGridItem key={item.name} animation="scaleIn" delay={index * 0.1}>
              <Link href="/learn" className="block h-full">
                <BentoCard padding="md" accentColor="teal" hover className="h-full group">
                  <BookOpen className="h-5 w-5 text-teal-600 dark:text-teal-400 mb-3" />
                  <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </BentoCard>
              </Link>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>

        <BentoScrollAnimation animation="fadeInUp" delay={0.3}>
          <div className="text-center mt-8">
            <Button asChild className="rounded-full">
              <Link href="/learn">
                Access Full Toolkit <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Budget Calendar Section - Bento */}
      <BentoSection>
        <BentoSectionHeader title="Budget Calendar Highlights" />
        
        <BentoScrollAnimation animation="fadeInUp">
          <BentoCard padding="lg" accentColor="default">
            <div className="space-y-3">
              {[
                { month: "February", event: "Budget Policy Statement (BPS) Release", status: "Current" },
                { month: "March", event: "County Budgets Release", status: "Upcoming" },
                { month: "April", event: "Public Participation Period", status: "Upcoming" },
                { month: "June", event: "Finance Bill Submission", status: "Upcoming" },
                { month: "July", event: "Appropriation Act (Budget Approval)", status: "Upcoming" },
                { month: "August", event: "New FY Begins", status: "Upcoming" },
              ].map((item, index) => (
                <div
                  key={item.month}
                  className="flex items-center justify-between p-4 bg-background/60 rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-24 text-sm font-medium text-primary">{item.month}</span>
                    <span className="font-medium text-sm">{item.event}</span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.status === "Current"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-secondary text-muted-foreground"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>
        </BentoScrollAnimation>

        <BentoScrollAnimation animation="fadeInUp" delay={0.2}>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/learn">
                View Full Calendar <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Get Involved CTAs - Bento */}
      <BentoSection className="bg-secondary/10">
        <BentoScrollAnimation animation="scaleIn">
          <BentoCTASection>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Involved?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of young Kenyans who are making their voices heard in budget decisions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {actionItems.map((item) => (
                  <Button key={item.text} asChild size="lg" className="rounded-full">
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.text}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </BentoCTASection>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Contact/Support - Bento */}
      <BentoSection>
        <BentoScrollAnimation animation="fadeInUp">
          <BentoCard padding="lg" accentColor="green" className="max-w-2xl mx-auto text-center">
            <HandHeart className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Need Support?</h2>
            <p className="text-muted-foreground mb-6">
              Our team can help you understand how to participate in budget processes.
              Reach out for guidance on submissions, tracking, or organizing in your community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="rounded-full">
                <Link href="mailto:info@budgetndiostory.org">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/learn">Learn More</Link>
              </Button>
            </div>
          </BentoCard>
        </BentoScrollAnimation>
      </BentoSection>
    </main>
  );
}
