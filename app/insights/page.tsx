import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Building2, Users, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Budget Insights - Budget Ndio Story",
  description: "National, county, and sector breakdowns built for clarity and accountability.",
};

const sectors = [
  "Youth Budget Perception Surveys",
  "Education",
  "Health",
  "Agriculture",
  "Water",
  "Roads & Transport",
  "Creative",
  "Social Protection",
  "Housing & Urban",
  "ICT/Digital",
  "Climate",
  "ASAL",
];

const nationalSections = [
  { title: "Big picture", description: "Revenue, spending, deficit, borrowing" },
  { title: "What changed", description: "Increases, cuts, flat lines" },
  { title: "Youth lens", description: "Jobs, education, health, digital economy, cost of living" },
  { title: "What to watch", description: "Risks + participation points" },
];

const countySections = [
  { title: "Priorities explained", description: "What the county is focusing on" },
  { title: "Allocations", description: "By department/programme" },
  { title: "Watchlist", description: "Lines to track closely" },
  { title: "Questions", description: "For public participation" },
];

const sectorPageSections = [
  "Overview",
  "Trend (what changed + why)",
  "Expected results (3–5 indicators)",
  "Questions to ask (5–7)",
  "Related reports + stories",
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Budget Insights"
        description="National, county, and sector breakdowns built for clarity and accountability."
        eyebrow="Budget Analysis"
        cta={{ text: "Explore Analysis", href: "#national" }}
      />

      {/* Overview Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* National Analysis */}
            <div className="group p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">National Analysis</h3>
              <p className="text-muted-foreground text-sm mb-4">
                The big shifts explained simply, with youth implications.
              </p>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link href="#national">
                  Explore <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>

            {/* County Analysis */}
            <div className="group p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">County Analysis</h3>
              <p className="text-muted-foreground text-sm mb-4">
                County budgets shape daily life. Understand what's planned.
              </p>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link href="#county">
                  Explore <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Sector Analysis */}
            <div className="group p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sector Analysis</h3>
              <p className="text-muted-foreground text-sm mb-4">
                What Kenya is prioritising and what outcomes to demand.
              </p>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link href="#sector">
                  Explore <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* National Analysis Section */}
      <section id="national" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">National Budget Analysis</h2>
          <p className="text-lg text-muted-foreground mb-8">
            The big shifts explained simply, with youth implications.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nationalSections.map((section) => (
              <div
                key={section.title}
                className="p-5 bg-background rounded-xl border border-border"
              >
                <h3 className="font-semibold mb-2">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button asChild>
              <Link href="/reports">Read Reports</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/news">See Updates</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/take-action">Join Training</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* County Analysis Section */}
      <section id="county" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">County Budget Analysis</h2>
          <p className="text-lg text-muted-foreground mb-8">
            County budgets shape daily life. Understand what's planned and what to track.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {countySections.map((section) => (
              <div
                key={section.title}
                className="p-5 bg-background rounded-xl border border-border"
              >
                <h3 className="font-semibold mb-2">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            ))}
          </div>

          {/* County Selector Placeholder */}
          <div className="mt-10 p-6 bg-secondary/50 rounded-xl">
            <h3 className="font-semibold mb-4">Select Your County</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Explore budget allocations for your county. Currently covering all 47 counties.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline">
                <Link href="/insights">Choose County</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/reports">Download Brief</Link>
              </Button>
              <Button asChild>
                <Link href="/take-action">Take Action</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sector Analysis Section */}
      <section id="sector" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Sector Budget Analysis</h2>
          <p className="text-lg text-muted-foreground mb-8">
            What Kenya is prioritising and what outcomes to demand.
          </p>

          {/* Sectors Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectors.map((sector) => (
              <Link
                key={sector}
                href={`/insights?sector=${encodeURIComponent(sector)}`}
                className="group flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-all"
              >
                <span className="text-sm font-medium">{sector}</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </Link>
            ))}
          </div>

          {/* Sector Deep Dive Info */}
          <div className="mt-10">
            <h3 className="font-semibold mb-4">Each Sector Deep Dive Includes:</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {sectorPageSections.map((section) => (
                <div
                  key={section}
                  className="p-3 bg-background rounded-lg border border-border text-sm"
                >
                  {section}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Youth Budget Perception Survey */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Youth Budget Perception Survey</h2>
          <p className="text-muted-foreground mb-8">
            Have your say! Share your priorities and perceptions about the national budget.
            Your input helps us understand what matters most to Kenyan youth.
          </p>
          <Button asChild size="lg">
            <Link href="/take-action">Take the Survey</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
