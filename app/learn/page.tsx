import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Calendar, Users, FileText, BarChart3, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { BentoCard, BentoSection } from "@/components/ui/bento-frame";
import { BentoScrollAnimation, BentoStaggerGrid, BentoGridItem, BentoSectionHeader, BentoCTASection } from "@/components/ui/bento-animations";

export const metadata: Metadata = {
  title: "Budget 101 - Learn - Budget Ndio Story",
  description: "Practical lessons designed for Kenyan youth. Learn about budgets, participation, and tracking.",
};

const modules = [
  {
    icon: BookOpen,
    title: "Budget Basics",
    description: "Understand what a budget is, why it matters, and how it affects your daily life.",
    lessons: ["What is a budget?", "Where does money come from?", "Where does money go?", "Why should you care?"],
  },
  {
    icon: BarChart3,
    title: "Budget Cycle",
    description: "Learn the stages of Kenya's budget process from planning to implementation.",
    lessons: ["Planning & Policy", "Formulation", "Approval", "Implementation", "Audit & Review"],
  },
  {
    icon: Users,
    title: "Roles & Responsibilities",
    description: "Who does what in Kenya's budget process at national and county levels.",
    lessons: ["National Government", "County Government", "Assembly/Council", "Citizens", "Auditor General"],
  },
  {
    icon: FileText,
    title: "Reading Tables",
    description: "How to read and understand budget documents and financial tables.",
    lessons: ["Reading estimates", "Understanding allocations", "Tracking changes", "Finding key numbers"],
  },
  {
    icon: Calendar,
    title: "Participation",
    description: "When and how to participate in budget decisions.",
    lessons: ["Budget calendar", "Public participation", "Submitting memos", "Attending forums"],
  },
  {
    icon: MapPin,
    title: "Tracking",
    description: "How to track budget implementation in your community.",
    lessons: ["Finding projects", "Monitoring delivery", "Reporting issues", "Following up"],
  },
];

const advancedTracks = [
  "Budget Analysis for Advocates",
  "Data Visualization for Budgets",
  "Media & Storytelling",
  "Community Organizing",
  "Research & Verification",
];

export default function LearnPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Budget 101"
        description="Practical lessons designed for Kenyan youth. Precise and usable skills for civic engagement."
        eyebrow="Learning Center"
        cta={{ text: "Start Learning", href: "#modules" }}
        secondaryCta={{ text: "View Reports", href: "/reports" }}
      />

      {/* Learning Modules */}
      <section id="modules" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Learning Modules</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.title}
                className="group p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                {/* <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <module.icon className="h-6 w-6 text-primary" />
                </div> */}
                <h3 className="text-lg font-bold mb-2">{module.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                
                <div className="space-y-2 mb-4">
                  {module.lessons.map((lesson) => (
                    <div key={lesson} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="h-3 w-3 text-primary" />
                      {lesson}
                    </div>
                  ))}
                </div>

                <Button asChild variant="outline" className="w-full">
                  <Link href={`/learn?module=${encodeURIComponent(module.title)}`}>
                    Start Module <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Tracks */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Advanced Tracks</h2>
          <p className="text-center text-muted-foreground mb-8">
            For those ready to dive deeper into budget analysis and advocacy
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {advancedTracks.map((track) => (
              <div
                key={track}
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
              >
                <span className="font-medium">{track}</span>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/take-action">
                <GraduationCap className="mr-2 h-4 w-4" />
                Enroll in Advanced Track
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Reference Guides</h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-background rounded-xl border border-border">
              <h3 className="font-bold mb-3">Budget Glossary</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Common budget terms explained in plain language.
              </p>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link href="/learn">
                  Browse Glossary <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="p-6 bg-background rounded-xl border border-border">
              <h3 className="font-bold mb-3">National vs County</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Understanding the differences between national and county budgets.
              </p>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link href="/learn">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="p-6 bg-background rounded-xl border border-border">
              <h3 className="font-bold mb-3">Budget Calendar</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Key dates and deadlines in Kenya's annual budget cycle.
              </p>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link href="/learn">
                  View Calendar <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="p-6 bg-background rounded-xl border border-border">
              <h3 className="font-bold mb-3">Document Types</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Understanding BPS, Finance Bill, Appropriation Act, and more.
              </p>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link href="/learn">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-8">
            Begin your budget literacy journey today. Each module takes about 15-20 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/learn">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/reports">View Reports</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
