import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, FileQuestion, Users, GraduationCap, MapPin, BookOpen, MessageSquare, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";

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
      <PageHero
        title="Take Action"
        description="Know the budget. Use it. Follow up. Your participation shapes how public resources are used."
        eyebrow="Civic Engagement"
        cta={{ text: "Join the Movement", href: "#pathways" }}
      />

      {/* Pathways Section */}
      <section id="pathways" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Pathways to Participate</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pathways.map((pathway) => (
              <div
                key={pathway.title}
                className="group p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <pathway.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">{pathway.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pathway.description}</p>
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link href={pathway.href}>
                    {pathway.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toolkit Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Action Toolkit</h2>
          <p className="text-center text-muted-foreground mb-8">
            Resources to help you participate effectively in budget processes
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {toolkit.map((item) => (
              <Link
                key={item.name}
                href="/learn"
                className="group p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-all"
              >
                <BookOpen className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/learn">
                Access Full Toolkit <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Budget Calendar Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Budget Calendar Highlights</h2>
          
          <div className="space-y-4">
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
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
              >
                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm font-medium text-primary">{item.month}</span>
                  <span className="font-medium">{item.event}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.status === "Current" 
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/learn">
                View Full Calendar <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Get Involved CTAs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Involved?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of young Kenyans who are making their voices heard in budget decisions.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {actionItems.map((item) => (
              <Button key={item.text} asChild size="lg">
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.text}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Support */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-background rounded-2xl border border-border text-center">
            <HandHeart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Need Support?</h2>
            <p className="text-muted-foreground mb-6">
              Our team can help you understand how to participate in budget processes.
              Reach out for guidance on submissions, tracking, or organizing in your community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="mailto:info@budgetndiostory.org">Contact Us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/learn">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
