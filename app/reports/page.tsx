import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Building2,
  Shield,
  Filter,
  Calendar,
  Download,
  Clock,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BentoCard, BentoSection } from "@/components/ui/bento-frame";
import { ContentCard } from "@/components/layout";
import { ReportsHero } from "@/components/heros/ReportsHero";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
  CardHover,
} from "@/components/animations/hig-motion";

export const metadata: Metadata = {
  title: "Simplified Budget Reports - Budget Ndio Story",
  description: "Explore short briefs from major budget documents. Uncover what changed, what it means, what to do next.",
};

const nationalCategories = [
  { name: "Budget Policy Statement (BPS)", icon: BookOpen },
  { name: "Estimates of Revenue & Expenditure", icon: FileText },
  { name: "Finance Bill / Finance Act", icon: FileText },
  { name: "Appropriation Bill / Act", icon: FileText },
];

const countyCategories = [
  { name: "County Fiscal Strategy Paper (CFSP)", icon: Building2 },
  { name: "County Budget Estimates", icon: Building2 },
  { name: "County \"Budget at a Glance\" briefs", icon: Building2 },
];

const oversightCategories = [
  { name: "Selected Audit & Accountability Highlights Simplified", icon: Shield },
];

const reportSections = [
  { title: "What report?", description: "Understanding the document type" },
  { title: "Key takeaways", description: "5-8 main points" },
  { title: "What changed", description: "Year-over-year analysis" },
  { title: "Why it matters", description: "Impact on youth & communities" },
  { title: "Questions to ask", description: "For accountability" },
  { title: "Next step", description: "In the budget cycle" },
  { title: "Sources", description: "Links to original documents" },
];

// Filter options
const filters = [
  { name: "Document Type", options: ["All", "BPS", "Estimates", "Finance Bill", "Appropriation Act"] },
  { name: "Year", options: ["2026", "2025", "2024", "2023"] },
  { name: "Level", options: ["All", "National", "County"] },
  { name: "Sector", options: ["All", "Education", "Health", "Agriculture", "Water", "Roads"] },
];

// Sample reports data with more detail
const sampleReports = [
  {
    id: 1,
    title: "FY 2025/26 Budget Policy Statement",
    category: "National - BPS",
    date: "February 2026",
    readTime: "8 min",
    excerpt: "Key highlights from the FY 2025/26 BPS including revenue projections, allocation changes, and youth-focused priorities.",
    takeaways: 6,
    isNew: true,
  },
  {
    id: 2,
    title: "Health Sector Budget Brief 2025",
    category: "National - Sector",
    date: "January 2026",
    readTime: "6 min",
    excerpt: "Analysis of health sector allocations with focus on primary healthcare and community health programs.",
    takeaways: 5,
    isNew: false,
  },
  {
    id: 3,
    title: "Nairobi County Budget Estimates 2025/26",
    category: "County",
    date: "January 2026",
    readTime: "7 min",
    excerpt: "Key allocations for Nairobi County including urban services, health, and youth programs.",
    takeaways: 7,
    isNew: false,
  },
  {
    id: 4,
    title: "Education Sector Overview 2025",
    category: "National - Sector",
    date: "December 2025",
    readTime: "5 min",
    excerpt: "TVET, university funding, and primary education allocations analyzed.",
    takeaways: 5,
    isNew: false,
  },
  {
    id: 5,
    title: "Agriculture Sector Budget Analysis",
    category: "National - Sector",
    date: "December 2025",
    readTime: "6 min",
    excerpt: "Smallholder farmers, agribusiness, and food security budget allocations.",
    takeaways: 6,
    isNew: false,
  },
  {
    id: 6,
    title: "Mombasa County Budget Brief 2025/26",
    category: "County",
    date: "November 2025",
    readTime: "5 min",
    excerpt: "Port city development, tourism, and coastal region priorities.",
    takeaways: 5,
    isNew: false,
  },
];

// Popular topics
const popularTopics = [
  { name: "Youth Employment", count: 12 },
  { name: "Healthcare Access", count: 8 },
  { name: "Education Funding", count: 15 },
  { name: "Climate Finance", count: 6 },
  { name: "County Allocation", count: 10 },
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen">
      <ReportsHero />

      {/* Report Structure Section - HIG clarity + motion */}
      <BentoSection className="border-t border-border/50">
        <ScrollReveal className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            What each report contains
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Our simplified reports follow a consistent structure for easy understanding.
          </p>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {reportSections.map((section, index) => (
            <StaggerItem key={section.title}>
              <CardHover className="rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </BentoSection>

      {/* Categories Section - HIG depth + motion */}
      <BentoSection className="border-t border-border/50 bg-muted/30">
        <ScrollReveal className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Report categories
          </h2>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <StaggerItem>
            {/* National */}
            <BentoCard padding="lg" hover>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-2xl border border-foreground/20 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-foreground/70" />
                </div>
                <h3 className="text-xl font-semibold">National</h3>
              </div>
              <div className="space-y-3">
                {nationalCategories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-background/60 hover:bg-background transition-colors cursor-pointer group"
                  >
                    <div className="h-8 w-8 rounded-xl border border-foreground/20 flex items-center justify-center flex-shrink-0">
                      <cat.icon className="h-4 w-4 text-foreground/70" />
                    </div>
                    <span className="text-sm font-medium">{cat.name}</span>
                    <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </BentoCard>
          </StaggerItem>
          <StaggerItem>
            {/* County */}
            <BentoCard padding="lg" className="transition-shadow duration-300 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-2xl border border-foreground/20 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-foreground/70" />
                </div>
                <h3 className="text-xl font-semibold">County</h3>
              </div>
              <div className="space-y-3">
                {countyCategories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-background/60 hover:bg-background transition-colors cursor-pointer group"
                  >
                    <div className="h-8 w-8 rounded-xl border border-foreground/20 flex items-center justify-center flex-shrink-0">
                      <cat.icon className="h-4 w-4 text-foreground/70" />
                    </div>
                    <span className="text-sm font-medium">{cat.name}</span>
                    <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </BentoCard>
          </StaggerItem>
          <StaggerItem>
            {/* Oversight */}
            <BentoCard padding="lg" className="transition-shadow duration-300 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold">Oversight</h3>
              </div>
              <div className="space-y-3">
                {oversightCategories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-background/60 hover:bg-background transition-colors cursor-pointer group"
                  >
                    <div className="h-8 w-8 rounded-xl border border-foreground/20 flex items-center justify-center flex-shrink-0">
                      <cat.icon className="h-4 w-4 text-foreground/70" />
                    </div>
                    <span className="text-sm font-medium">{cat.name}</span>
                    <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </BentoCard>
          </StaggerItem>
        </StaggerChildren>
      </BentoSection>

      {/* Filters and Reports List - HIG clarity + staggered cards */}
      <BentoSection id="reports" className="border-t border-border/50">
        <ScrollReveal className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" aria-hidden />
              <span className="text-sm font-medium text-foreground">Filters</span>
              {filters.map((f) => (
                <Button
                  key={f.name}
                  variant="outline"
                  size="sm"
                  className="rounded-full transition-transform duration-200 active:scale-[0.98]"
                >
                  {f.name}
                </Button>
              ))}
            </div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              {sampleReports.length} reports available
            </p>
          </div>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleReports.map((report) => (
            <StaggerItem key={report.id}>
              <CardHover className="rounded-xl overflow-hidden">
                <ContentCard
                  href="/reports"
                  title={report.title}
                  excerpt={report.excerpt}
                  category={report.category}
                  meta={
                    <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {report.readTime}
                      </span>
                      {report.takeaways != null && (
                        <span className="inline-flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {report.takeaways} takeaways
                        </span>
                      )}
                    </span>
                  }
                  ctaText="Read report"
                />
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <ScrollReveal className="mt-12 text-center" delay={0.2}>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full transition-transform duration-200 active:scale-[0.98]"
          >
            <Link href="/reports" className="inline-flex items-center gap-2">
              View all reports
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </BentoSection>

      {/* CTA Strip - HIG deference: content first, clear CTAs */}
      <BentoSection className="border-t border-border/50">
        <ScrollReveal variant="scaleIn" className="text-center">
          <div className="mx-auto max-w-2xl">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
              <Download className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Need a brief for your county or sector?
            </h2>
            <p className="mt-3 text-muted-foreground">
              We can help you understand specific budget areas that matter to you.
              Request a custom report or join our training program.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full transition-transform duration-200 active:scale-[0.98]"
              >
                <Link href="/take-action">Request a report</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full transition-transform duration-200 active:scale-[0.98]"
              >
                <Link href="/take-action">Take action</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </BentoSection>
    </main>
  );
}
