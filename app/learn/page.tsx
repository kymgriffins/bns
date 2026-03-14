import { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { PageSection, Container2026, SectionHeader } from "@/components/layout";
import { LearnClient, Module } from "@/components/learn/learn-client";
import { LearnPromoPopup } from "@/components/learn/learn-promo-popup";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Learn - Budget Ndio Story",
  description:
    "Casual, Gen Z‑friendly lessons on Kenya's budget. Start with interactive Budget 101, then dive into modules on the BPS, budget cycle, and more.",
};

const modules: Module[] = [
  {
    id: "budget-101",
    iconName: "GraduationCap",
    title: "Budget 101 (Interactive)",
    description:
      "Start here. Money in & out, national vs county, the budget cycle, and where you show up. Interactive sliders, timelines, and scenarios.",
    lessons: ["Money in & out", "National vs county", "Budget cycle", "Where you show up"],
    isNew: true,
    isAvailable: true,
    estimatedMinutes: 12,
  },
  {
    id: "module-one",
    iconName: "BookOpen",
    title: "Module 001: BPS 2026",
    description:
      "The Budget Policy Statement 2026 - Understand how public money is planned, spent, and monitored.",
    lessons: [
      "What is the BPS?",
      "5 Core Chapters",
      "Strategic Priorities",
      "Key Budget Numbers",
      "Potential Risks",
      "Counties & Devolution",
    ],
    isNew: false,
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
    lessons: [
      "National Government",
      "County Government",
      "Assembly/Council",
      "Citizens",
      "Auditor General",
    ],
    isNew: false,
    isAvailable: false,
    estimatedMinutes: 10,
  },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen">
      <LearnPromoPopup />

      <PageSection size="lg" className="border-t-0">
        <Container2026>
          <SectionHeader
            label="Budget 101 · Learn"
            title="Budget school: your one-stop hub for money mechanics"
            description="Short, interactive lessons and quizzes that help you actually use Kenya's budget — not just read about it. Start with Budget 101, then go deeper with BPS 2026."
            action={
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/learn/budget-101">
                  Start Budget 101
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            }
          />
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
              <span className="text-primary">★</span>
              <span>Built for Kenyan youth & creators</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>10–15 minutes per module</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
              <span className="text-primary">✓</span>
              <span>Learn solo, apply with friends</span>
            </div>
          </div>
        </Container2026>
      </PageSection>

      <LearnClient modules={modules} />
    </main>
  );
}
