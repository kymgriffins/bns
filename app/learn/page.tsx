import { Metadata } from "next";
import { LearnPageRedesign } from "@/components/learn/learn-page-redesign";
import { LearnPromoPopup } from "@/components/learn/learn-promo-popup";

export const metadata: Metadata = {
  title: "Learn - Budget Ndio Story",
  description:
    "Casual, Gen Z‑friendly lessons on Kenya's budget. Start with interactive Budget 101, then dive into modules on the BPS, budget cycle, and more.",
};

export default function LearnPage() {
  return (
    <main className="min-h-screen">
      <LearnPromoPopup />
      <LearnPageRedesign />
    </main>
  );
}
