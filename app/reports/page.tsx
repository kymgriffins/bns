import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Building2, Shield, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Simplified Budget Reports - Budget Ndio Story",
  description: "Explore short briefs from major budget documents. Uncover what changed, what it means, what to do next.",
};

const nationalCategories = [
  "Budget Policy Statement (BPS)",
  "Estimates of Revenue & Expenditure",
  "Finance Bill / Finance Act",
  "Appropriation Bill / Act",
];

const countyCategories = [
  "County Fiscal Strategy Paper (CFSP)",
  "County Budget Estimates",
  "County \"Budget at a Glance\" briefs",
];

const oversightCategories = [
  "Selected Audit & Accountability Highlights Simplified",
];

const reportSections = [
  "What report?",
  "Key takeaways (5–8)",
  "What changed",
  "Why it matters (youth + communities)",
  "Questions to ask",
  "Next step in the cycle",
  "Sources (links)",
];

const filters = [
  { name: "Document Type", options: ["All", "BPS", "Estimates", "Finance Bill", "Appropriation Act"] },
  { name: "Year", options: ["2026", "2025", "2024", "2023"] },
  { name: "Level", options: ["All", "National", "County"] },
  { name: "Sector", options: ["All", "Education", "Health", "Agriculture", "Water", "Roads"] },
];

// Sample reports data
const sampleReports = [
  {
    title: "FY 2025/26 Budget Policy Statement",
    category: "National - BPS",
    date: "February 2026",
    excerpt: "Key highlights from the FY 2025/26 BPS including revenue projections, allocation changes, and youth-focused priorities.",
    takeaways: 6,
  },
  {
    title: "Health Sector Budget Brief 2025",
    category: "National - Sector",
    date: "January 2026",
    excerpt: "Analysis of health sector allocations with focus on primary healthcare and community health programs.",
    takeaways: 5,
  },
  {
    title: "Nairobi County Budget Estimates 2025/26",
    category: "County",
    date: "January 2026",
    excerpt: "Key allocations for Nairobi County including urban services, health, and youth programs.",
    takeaways: 7,
  },
  {
    title: "Education Sector Overview 2025",
    category: "National - Sector",
    date: "December 2025",
    excerpt: "TVET, university funding, and primary education allocations analyzed.",
    takeaways: 5,
  },
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Simplified Reports"
        description="Explore short briefs from major budget documents. Uncover what changed, what it means, what to do next."
        eyebrow="Budget Reports"
        cta={{ text: "Browse All Reports", href: "#reports" }}
        secondaryCta={{ text: "View Latest", href: "/reports" }}
      />

      {/* Report Structure Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">What Each Report Contains</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportSections.map((section, index) => (
              <div
                key={section}
                className="p-4 bg-secondary/50 rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="font-medium text-sm">{section}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Report Categories</h2>
          
          {/* National */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">National</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {nationalCategories.map((cat) => (
                <div
                  key={cat}
                  className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* County */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">County</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {countyCategories.map((cat) => (
                <div
                  key={cat}
                  className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Oversight */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Oversight</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {oversightCategories.map((cat) => (
                <div
                  key={cat}
                  className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Reports List */}
      <section id="reports" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            {filters.map((filter) => (
              <Button key={filter.name} variant="outline" size="sm" className="flex-shrink-0">
                {filter.name}
              </Button>
            ))}
          </div>

          {/* Reports Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {sampleReports.map((report, index) => (
              <article
                key={index}
                className="group p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded mb-2">
                      {report.category}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {report.date}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {report.takeaways} takeaways
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {report.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {report.excerpt}
                </p>

                <Button variant="link" className="p-0 h-auto group-hover:gap-2 transition-all">
                  Read Report <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </article>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link href="/reports">View All Reports</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Need a brief for your county or sector?</h2>
          <p className="text-muted-foreground mb-8">
            We can help you understand specific budget areas that matter to you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/take-action">Request a Report</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/take-action">Take Action</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
