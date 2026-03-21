import type { Metadata } from "next";
import { StoryCivicHub } from "@/components/civic-hub/StoryCivicHub";

export const metadata: Metadata = {
  title: "Learn - Budget Ndio Story",
  description:
    "Learn how Kenya's budget works through short, story-style civic lessons. Swipe through modules, quiz yourself, and take action.",
  keywords: [
    "learn",
    "budget education",
    "Kenya budget",
    "BPS 2026",
    "citizen participation",
    "budget transparency",
  ],
  openGraph: {
    title: "Learn - Budget Ndio Story",
    description: "Short, story-style lessons to understand Kenya's budget and how to act.",
    type: "website",
  },
};

export default function LearnPage() {
  return <StoryCivicHub />;
}

