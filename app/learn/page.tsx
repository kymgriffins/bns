import { Metadata } from "next";
import { LearnHero } from "@/components/heros/LearnHero";
import { LearnClient, Module } from "@/components/learn/learn-client";
import { LearnPromoPopup } from "@/components/learn/learn-promo-popup";

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

      <LearnHero />

      <LearnClient modules={modules} />
    </main>
  );
}
