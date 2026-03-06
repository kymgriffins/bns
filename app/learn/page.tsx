import { Metadata } from "next";
import { Calendar } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { LearnClient, Module } from "@/components/learn/learn-client";
import { LearnPromoPopup } from "@/components/learn/learn-promo-popup";

export const metadata: Metadata = {
  title: "Budget 101 - Learn - Budget Ndio Story",
  description:
    "Casual, Gen Z‑friendly lessons on Kenya's budget. Learn the basics, take quick quizzes, and plug into real participation moments.",
};

const modules: Module[] = [
  {
    id: "module-one",
    iconName: "BookOpen",
    title: "Module 001: BPS 2026",
    description: "The Budget Policy Statement 2026 - Understand how public money is planned, spent, and monitored.",
    lessons: ["What is the BPS?", "5 Core Chapters", "Strategic Priorities", "Key Budget Numbers", "Potential Risks", "Counties & Devolution"],
    isNew: true,
    isAvailable: true,
    estimatedMinutes: 15,
  },
  {
    id: "module-two",
    iconName: "BarChart3",
    title: "Module 002: Budget Cycle",
    description: "Learn the stages of Kenya's budget process from planning to implementation.",
    lessons: ["Planning & Policy", "Formulation", "Approval", "Implementation", "Audit & Review"],
    isNew: false,
    isAvailable: false,
    estimatedMinutes: 12,
  },
  {
    id: "module-three",
    iconName: "Users",
    title: "Module 003: Roles & Responsibilities",
    description: "Who does what in Kenya's budget process at national and county levels.",
    lessons: ["National Government", "County Government", "Assembly/Council", "Citizens", "Auditor General"],
    isNew: false,
    isAvailable: false,
    estimatedMinutes: 10,
  },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen">
      <LearnPromoPopup />

      <PageHero
        eyebrow="Budget 101 · Learn"
        title="Budget school, Your one Stop Hub for Money Mechanics"
        description="Short, swipeable lessons, quizzes, and real‑world tasks that help you actually use Kenya's budget — not just read about it."
        cta={{
          text: "Start Module 001",
          href: "/learn/module-one",
        }}
        secondaryCta={{
          text: "See all modules",
          href: "#modules",
        }}
        className="pb-8 lg:pb-12"
      >
        <div className="mb-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
            <span className="text-primary">★</span>
            <span>Built for Kenyan youth & creators</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>10–15 minutes per module</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
            <span className="text-emerald-500">✓</span>
            <span>Learn solo, apply with friends</span>
          </div>
        </div>
      </PageHero>

      {/* Pass modules to client component - iconMap is now defined internally in LearnClient */}
      <LearnClient modules={modules} />
    </main>
  );
}
