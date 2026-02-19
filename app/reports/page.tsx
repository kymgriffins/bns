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
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BentoCard, BentoGrid, BentoSection, BentoCTASection } from "@/components/ui/bento-frame";
import { BentoScrollAnimation, BentoStaggerGrid, BentoGridItem, BentoSectionHeader, BentoIconBox } from "@/components/ui/bento-animations";

export const metadata: Metadata = {
  title: "Simplified Budget Reports - Budget Ndio Story",
  description: "Explore short briefs from major budget documents. Uncover what changed, what it means, what to do next.",
};

const nationalCategories = [
  { name: "Budget Policy Statement (BPS)", icon: BookOpen, color: "bg-blue-500" },
  { name: "Estimates of Revenue & Expenditure", icon: FileText, color: "bg-cyan-500" },
  { name: "Finance Bill / Finance Act", icon: FileText, color: "bg-green-500" },
  { name: "Appropriation Bill / Act", icon: FileText, color: "bg-purple-500" },
];

const countyCategories = [
  { name: "County Fiscal Strategy Paper (CFSP)", icon: Building2, color: "bg-orange-500" },
  { name: "County Budget Estimates", icon: Building2, color: "bg-amber-500" },
  { name: "County \"Budget at a Glance\" briefs", icon: Building2, color: "bg-yellow-500" },
];

const oversightCategories = [
  { name: "Selected Audit & Accountability Highlights Simplified", icon: Shield, color: "bg-red-500" },
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
    categoryColor: "bg-blue-500",
    accentColor: "blue" as const,
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
    categoryColor: "bg-red-500",
    accentColor: "red" as const,
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
    categoryColor: "bg-orange-500",
    accentColor: "orange" as const,
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
    categoryColor: "bg-cyan-500",
    accentColor: "teal" as const,
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
    categoryColor: "bg-green-500",
    accentColor: "green" as const,
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
    categoryColor: "bg-amber-500",
    accentColor: "orange" as const,
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
      {/* Hero Section - Bento Style */}
      <BentoSection className="bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <BentoScrollAnimation animation="fadeInUp">
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm rounded-full">
              <FileText className="w-4 h-4 mr-2" />
              Budget Reports
            </Badge>
          </BentoScrollAnimation>
          <BentoScrollAnimation animation="fadeInUp" delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simplified Reports
            </h1>
          </BentoScrollAnimation>
          <BentoScrollAnimation animation="fadeInUp" delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore short briefs from major budget documents. Uncover what changed, 
              what it means, and what to do next.
            </p>
          </BentoScrollAnimation>

          {/* Search Bar */}
          <BentoScrollAnimation animation="scaleIn" delay={0.3}>
            <div className="max-w-xl mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search reports by topic, sector, or county..." 
                  className="pl-12 h-12 text-base bg-background border-2 rounded-2xl"
                />
              </div>
            </div>
          </BentoScrollAnimation>

          {/* Popular Topics */}
          <BentoScrollAnimation animation="fadeInUp" delay={0.4}>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="text-sm text-muted-foreground self-center">Popular:</span>
              {popularTopics.map((topic) => (
                <Button key={topic.name} variant="outline" size="sm" className="text-xs rounded-full">
                  {topic.name}
                  <span className="ml-1 text-muted-foreground">({topic.count})</span>
                </Button>
              ))}
            </div>
          </BentoScrollAnimation>

          <BentoScrollAnimation animation="fadeInUp" delay={0.5}>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="#reports">
                  Browse All Reports <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/insights">Explore Insights</Link>
              </Button>
            </div>
          </BentoScrollAnimation>
        </div>
      </BentoSection>

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
            <BentoCard padding="lg" accentColor="blue" hover>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">National</h3>
              </div>
              <div className="space-y-3">
                {nationalCategories.map((cat) => (
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

          {/* County */}
          <BentoScrollAnimation animation="fadeInUp" delay={0.1}>
            <BentoCard padding="lg" accentColor="orange" hover>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold">County</h3>
              </div>
              <div className="space-y-3">
                {countyCategories.map((cat) => (
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
