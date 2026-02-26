import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Calendar, Users, FileText, BarChart3, MapPin, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/page-hero";
import { BentoCard, BentoSection } from "@/components/ui/bento-frame";
import { BentoScrollAnimation, BentoStaggerGrid, BentoGridItem, BentoSectionHeader, BentoCTASection } from "@/components/ui/bento-animations";

export const metadata: Metadata = {
  title: "Budget 101 - Learn - Budget Ndio Story",
  description: "Practical lessons designed for Kenyan youth. Learn about budgets, participation, and tracking.",
};

const modules = [
  {
    id: "module-one",
    icon: BookOpen,
    title: "Module 001: BPS 2026",
    description: "The Budget Policy Statement 2026 - Understand how public money is planned, spent, and monitored.",
    lessons: ["What is the BPS?", "5 Core Chapters", "Strategic Priorities", "Key Budget Numbers", "Potential Risks", "Counties & Devolution"],
    isNew: true,
    isAvailable: true,
  },
  {
    icon: BarChart3,
    title: "Module 002: Budget Cycle",
    description: "Learn the stages of Kenya's budget process from planning to implementation.",
    lessons: ["Planning & Policy", "Formulation", "Approval", "Implementation", "Audit & Review"],
    isAvailable: false,
  },
  {
    icon: Users,
    title: "Module 003: Roles & Responsibilities",
    description: "Who does what in Kenya's budget process at national and county levels.",
    lessons: ["National Government", "County Government", "Assembly/Council", "Citizens", "Auditor General"],
    isAvailable: false,
  },
  // {
  //   icon: FileText,
  //   title: "Module 004: Reading Tables",
  //   description: "How to read and understand budget documents and financial tables.",
  //   lessons: ["Reading estimates", "Understanding allocations", "Tracking changes", "Finding key numbers"],
  //   isAvailable: false,
  // },
  // {
  //   icon: Calendar,
  //   title: "Module 005: Participation",
  //   description: "When and how to participate in budget decisions.",
  //   lessons: ["Budget calendar", "Public participation", "Submitting memos", "Attending forums"],
  //   isAvailable: false,
  // },
  // {
  //   icon: MapPin,
  //   title: "Module 006: Tracking",
  //   description: "How to track budget implementation in your community.",
  //   lessons: ["Finding projects", "Monitoring delivery", "Reporting issues", "Following up"],
  //   isAvailable: false,
  // },
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
   

      {/* Learning Modules */}
      <section id="modules" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Learning Modules</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.title}
                className={`group p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg ${module.isNew ? 'border-primary/30 bg-primary/5' : ''} ${!module.isAvailable ? 'opacity-60' : ''}`}
              >
                {/* <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <module.icon className="h-6 w-6 text-primary" />
                </div> */}
                {module.isNew && (
                  <Badge className="mb-3">NEW</Badge>
                )}
                {module.isAvailable === false && (
                  <Badge variant="outline" className="mb-3">Coming Soon</Badge>
                )}
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

                <Button
                  asChild
                  variant={module.isNew ? "default" : "outline"}
                  className="w-full"
                  disabled={!module.isAvailable}
                >
                  <Link href={module.isAvailable ? (module.isNew ? "/learn/module-one" : `/learn?module=${encodeURIComponent(module.title)}`) : "#"}>
                    {module.isAvailable ? (module.isNew ? "Start Module" : "Start Module") : <><Lock className="mr-2 h-4 w-4" />Coming Soon</>} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </main>
  );
}
