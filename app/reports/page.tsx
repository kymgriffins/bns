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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 20% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)`
        }} />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm">
              <FileText className="w-4 h-4 mr-2" />
              Budget Reports
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Simplified Reports
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore short briefs from major budget documents. Uncover what changed, 
              what it means, and what to do next.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search reports by topic, sector, or county..." 
                className="pl-12 h-12 text-lg bg-background/80 backdrop-blur-sm border-2"
              />
            </div>
          </div>

          {/* Popular Topics */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {popularTopics.map((topic) => (
              <Button key={topic.name} variant="outline" size="sm" className="text-xs">
                {topic.name}
                <span className="ml-1 text-muted-foreground">({topic.count})</span>
              </Button>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#reports">
                Browse All Reports <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/insights">Explore Insights</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Report Structure Section - Visual Guide */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">What Each Report Contains</h2>
            <p className="text-muted-foreground">Our simplified reports follow a consistent structure for easy understanding</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportSections.map((section, index) => (
              <div
                key={section.title}
                className="relative p-5 bg-background rounded-xl border border-border hover:border-primary/30 transition-all hover:shadow-md group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{section.title}</h3>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Visual Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Report Categories</h2>
          
          {/* National Categories */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">National</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {nationalCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:border-primary/30 transition-all hover:shadow-sm group cursor-pointer"
                >
                  <div className={`h-10 w-10 rounded-lg ${cat.color} flex items-center justify-center flex-shrink-0`}>
                    <cat.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium group-hover:text-primary transition-colors">{cat.name}</span>
                  <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* County Categories */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">County</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {countyCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:border-primary/30 transition-all hover:shadow-sm group cursor-pointer"
                >
                  <div className={`h-10 w-10 rounded-lg ${cat.color} flex items-center justify-center flex-shrink-0`}>
                    <cat.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium group-hover:text-primary transition-colors">{cat.name}</span>
                  <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Oversight */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Oversight</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {oversightCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:border-primary/30 transition-all hover:shadow-sm group cursor-pointer"
                >
                  <div className={`h-10 w-10 rounded-lg ${cat.color} flex items-center justify-center flex-shrink-0`}>
                    <cat.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium group-hover:text-primary transition-colors">{cat.name}</span>
                  <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Reports List */}
      <section id="reports" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-muted-foreground flex-shrink-0">Filters:</span>
              {filters.map((filter) => (
                <Button key={filter.name} variant="outline" size="sm" className="flex-shrink-0">
                  {filter.name}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{sampleReports.length} reports available</span>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleReports.map((report) => (
              <article
                key={report.id}
                className="group flex flex-col h-full bg-background rounded-2xl border border-border hover:border-primary/40 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <Badge className={`${report.categoryColor} text-white hover:${report.categoryColor}`}>
                      {report.category}
                    </Badge>
                    {report.isNew && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        New
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {report.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {report.excerpt}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-auto p-6 pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
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
                  
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Read Report <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/reports">
                View All Reports <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12 text-white">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
                <Download className="h-8 w-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a brief for your county or sector?</h2>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                We can help you understand specific budget areas that matter to you. 
                Request a custom report or join our training program.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/take-action">
                    Request a Report
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Link href="/take-action">
                    Take Action
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
