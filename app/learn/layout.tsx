import type { Metadata } from "next";
import { LearnChapterNav } from "@/components/learn/LearnChapterNav";

export const metadata: Metadata = {
  title: {
    default: "Civic hub – Learn · Budget Ndio Story",
    template: "%s · Civic hub",
  },
  description:
    "BPS 2026 basics and Millicent Makini's summary. Decode the budget, master the pillars, track the numbers, quiz and reflections.",
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row md:gap-10 md:py-10">
        <LearnChapterNav />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
