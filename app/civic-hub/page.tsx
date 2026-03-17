import { Metadata } from "next";
import { StoryCivicHub } from "@/components/civic-hub/StoryCivicHub";

export const metadata: Metadata = {
  title: "Civic Hub - Budget Ndio Story",
  description: "Your central hub for understanding Kenya's budget process. Learn about the Budget Policy Statement, track budget delivery, and participate in civic engagement.",
  keywords: ["civic hub", "budget education", "Kenya budget", "BPS 2026", "citizen participation", "budget transparency", "public engagement"],
  openGraph: {
    title: "Civic Hub - Budget Ndio Story",
    description: "Your central hub for understanding Kenya's budget process and civic engagement.",
    type: "website",
  },
};

export default function CivicHubPage() {
  return <StoryCivicHub />;
}
