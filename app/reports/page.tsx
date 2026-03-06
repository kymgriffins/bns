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
  Search,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BentoCard,
  BentoGrid,
  BentoSection,
  BentoCTASection,
} from "@/components/ui/bento-frame";
import {
  BentoScrollAnimation,
  BentoStaggerGrid,
  BentoGridItem,
  BentoSectionHeader,
  BentoIconBox,
} from "@/components/ui/bento-animations";
import { PageHero } from "@/components/page-hero";

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
      <PageHero
        eyebrow="Budget briefs · Reports"
        title="Short, sharp budget reports you can actually use."
        description="Skip the 200‑page PDFs. Read clear, youth‑friendly briefs that tell you what changed, why it matters, and what to ask next."
        cta={{
          text: "Browse latest briefs",
          href: "#reports",
        }}
        secondaryCta={{
          text: "Go to Budget Insights",
          href: "/insights",
        }}
        className="pb-10 lg:pb-12"
      />

      {/* Report Structure Section - Bento Grid */}
      <BentoSection>
        <BentoSectionHeader
          title="What Each Report Contains"
          subtitle="Our simplified reports follow a consistent structure for easy understanding"
        />
        <BentoStaggerGrid stagger={0.08} className="grid-cols-2 md:grid-cols-4 gap-4">
          {reportSections.map((section, index) => (
            <BentoGridItem key={section.title} animation="fadeInUp" delay={index * 0.05}>
              <BentoCard padding="md" accentColor="green" hover>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm">{section.title}</h3>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </BentoCard>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>
      </BentoSection>

      {/* Categories Section - Bento Layout */}
      <BentoSection className="bg-secondary/10">
        <BentoSectionHeader title="Report Categories" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* National */}
          <BentoScrollAnimation animation="fadeInUp">
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
          </BentoScrollAnimation>

          {/* County */}
          <BentoScrollAnimation animation="fadeInUp" delay={0.1}>
            <BentoCard padding="lg" hover>
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
          </BentoScrollAnimation>

          {/* Oversight */}
          <BentoScrollAnimation animation="fadeInUp" delay={0.2}>
            <BentoCard padding="lg" accentColor="red" hover>
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
                    <div className={`h-8 w-8 rounded-xl ${cat.color} flex items-center justify-center flex-shrink-0`}>
                      <cat.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{cat.name}</span>
                    <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </BentoCard>
          </BentoScrollAnimation>
        </div>
      </BentoSection>

      {/* Filters and Reports List */}
      <BentoSection id="reports">
        {/* Filter Bar */}
        <BentoScrollAnimation animation="fadeInUp">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-muted-foreground flex-shrink-0">Filters:</span>
              {filters.map((filter) => (
                <Button key={filter.name} variant="outline" size="sm" className="flex-shrink-0 rounded-full">
                  {filter.name}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{sampleReports.length} reports available</span>
            </div>
          </div>
        </BentoScrollAnimation>

        {/* Reports Grid - Bento Style */}
        <BentoStaggerGrid stagger={0.08} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleReports.map((report, index) => (
            <BentoGridItem key={report.id} animation="fadeInUp" delay={index * 0.05}>
              <BentoCard padding="none" accentColor={report.accentColor} hover className="flex flex-col h-full overflow-hidden">
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <Badge className={`${report.categoryColor} text-white text-xs rounded-full`}>
                      {report.category}
                    </Badge>
                    {report.isNew && (
                      <Badge variant="outline" className="text-green-600 border-green-600 text-xs rounded-full">
                        New
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-3 leading-snug">
                    {report.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {report.excerpt}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-auto p-6 pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {report.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {report.readTime} read
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {report.takeaways} takeaways
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full rounded-2xl group">
                    Read Report <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </BentoCard>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>

        {/* View All CTA */}
        <BentoScrollAnimation animation="fadeInUp" delay={0.3}>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/reports">
                View All Reports <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </BentoScrollAnimation>
      </BentoSection>

      {/* CTA Strip - Bento Style */}
      <BentoSection>
        <BentoScrollAnimation animation="scaleIn">
          <BentoCTASection>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
                <Download className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a brief for your county or sector?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                We can help you understand specific budget areas that matter to you. 
                Request a custom report or join our training program.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/take-action">
                    Request a Report
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link href="/take-action">
                    Take Action
                  </Link>
                </Button>
              </div>
            </div>
          </BentoCTASection>
        </BentoScrollAnimation>
      </BentoSection>
    </main>
  );
}
