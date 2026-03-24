import { Metadata } from "next";
import { HomeLandingV2 } from "@/components/landing-v2/HomeLandingV2";

export const metadata: Metadata = {
  title: "Budget Ndio Story - Kenya Budget Transparency Platform",
  description:
    "Kenyan budget transparency platform for young citizens. We turn national and county budgets into clear insights, practical analysis, and trackable evidence.",
  alternates: {
    canonical: "https://budgetndiostory.org/",
  },
};

export default function HomePage() {
  return <HomeLandingV2 />;
}
