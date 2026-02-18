import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  BarChart3, 
  Building2, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  Globe,
  MapPin,
  PieChart,
  Target,
  Lightbulb,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const metadata: Metadata = {
  title: "Budget Insights - Budget Ndio Story",
  description: "National, county, and sector breakdowns built for clarity and accountability.",
};

const sectors = [
  { name: "Youth Budget Perception Surveys", icon: Users, color: "bg-purple-500" },
  { name: "Education", icon: BookOpenIcon, color: "bg-blue-500" },
  { name: "Health", icon: HeartIcon, color: "bg-red-500" },
  { name: "Agriculture", icon: LeafIcon, color: "bg-green-500" },
  { name: "Water", icon: DropletIcon, color: "bg-cyan-500" },
  { name: "Roads & Transport", icon: TruckIcon, color: "bg-orange-500" },
  { name: "Creative", icon: SparklesIcon, color: "bg-pink-500" },
  { name: "Social Protection", icon: ShieldIcon, color: "bg-indigo-500" },
  { name: "Housing & Urban", icon: BuildingIcon, color: "bg-amber-500" },
  { name: "ICT/Digital", icon: CpuIcon, color: "bg-violet-500" },
  { name: "Climate", icon: WindIcon, color: "bg-teal-500" },
  { name: "ASAL", icon: SunIcon, color: "bg-yellow-500" },
];

// Icon components
function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

function DropletIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
      <path d="M15 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 13.52 8H14"/>
      <circle cx="17" cy="18" r="2"/>
      <circle cx="7" cy="18" r="2"/>
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/>
      <path d="M16 6h.01"/>
      <path d="M12 6h.01"/>
      <path d="M12 10h.01"/>
      <path d="M12 14h.01"/>
      <path d="M16 10h.01"/>
      <path d="M16 14h.01"/>
      <path d="M8 10h.01"/>
      <path d="M8 14h.01"/>
    </svg>
  );
}

function CpuIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="16" height="16" x="4" y="4" rx="2" ry="2"/>
      <rect width="6" height="6" x="9" y="9" rx="1"/>
      <path d="M9 1v3"/>
      <path d="M15 1v3"/>
      <path d="M9 20v3"/>
      <path d="M15 20v3"/>
      <path d="M20 9h3"/>
      <path d="M20 14h3"/>
      <path d="M1 9h3"/>
      <path d="M1 14h3"/>
    </svg>
  );
}

function WindIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
      <path d="M9.6 4.6 0 1A2 2 1 11 8H2"/>
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/>
      <path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/>
      <path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/>
      <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  );
}

const nationalSections = [
  { 
    title: "Big picture", 
    description: "Revenue, spending, deficit, borrowing",
    icon: Globe,
    color: "from-blue-500 to-cyan-500"
  },
  { 
    title: "What changed", 
    description: "Increases, cuts, flat lines",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500"
  },
  { 
    title: "Youth lens", 
    description: "Jobs, education, health, digital economy",
    icon: Users,
    color: "from-purple-500 to-pink-500"
  },
  { 
    title: "What to watch", 
    description: "Risks + participation points",
    icon: AlertCircle,
    color: "from-orange-500 to-red-500"
  },
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

// Stats data for visual interest
const budgetStats = [
  { label: "Total Budget", value: "KSh 4.1T", change: "+12%", positive: true },
  { label: "National Share", value: "65%", change: "+2%", positive: true },
  { label: "County Share", value: "35%", change: "Flat", positive: false },
  { label: "Youth Sectors", value: "KSh 892B", change: "+18%", positive: true },
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`
        }} />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Budget Analysis
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Budget Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              National, county, and sector breakdowns built for clarity and accountability. 
              Understand where money goes and what it means for you.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {budgetStats.map((stat, index) => (
              <div 
                key={stat.label}
                className="p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 text-center"
              >
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className={`text-xs font-medium mt-1 ${stat.positive ? 'text-green-600' : 'text-orange-600'}`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#national">
                Explore Analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/reports">View Reports</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Overview Sections - Interactive Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* National Analysis */}
            <Card className="group relative overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">National Analysis</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground text-sm mb-4">
                  The big shifts explained simply, with youth implications. Understand the national budget direction.
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Card>

            {/* County Analysis */}
            <Card className="group relative overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 shadow-lg">
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">County Analysis</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground text-sm mb-4">
                  County budgets shape daily life. Understand what's planned in your county.
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Card>

            {/* Sector Analysis */}
            <Card className="group relative overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Sector Analysis</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground text-sm mb-4">
                  What Kenya is prioritising and what outcomes to demand from each sector.
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* National Analysis Section */}
      <section id="national" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">National Budget Analysis</h2>
              <p className="text-muted-foreground">The big picture explained simply</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nationalSections.map((section, index) => (
              <div
                key={section.title}
                className="p-6 bg-background rounded-2xl border border-border hover:border-primary/30 transition-all hover:shadow-lg group"
              >
                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4`}>
                  <section.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            ))}
          </div>

          {/* Visual Element - Budget Distribution Bar */}
          <div className="mt-10 p-6 bg-background rounded-2xl border border-border">
            <h3 className="font-semibold mb-4">Budget Distribution Preview</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Recurrent Expenditure</span>
                  <span className="text-muted-foreground">KSh 2.1T</span>
                </div>
                <Progress value={52} className="h-3" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Development Expenditure</span>
                  <span className="text-muted-foreground">KSh 1.4T</span>
                </div>
                <Progress value={35} className="h-3" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>County Allocation</span>
                  <span className="text-muted-foreground">KSh 0.6T</span>
                </div>
                <Progress value={15} className="h-3" />
              </div>
            </div>
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
      <section id="county" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">County Budget Analysis</h2>
              <p className="text-muted-foreground">What's happening in your county</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {countySections.map((section) => (
              <div
                key={section.title}
                className="p-5 bg-background rounded-xl border border-border hover:border-primary/30 transition-all"
              >
                <h3 className="font-semibold mb-2">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            ))}
          </div>

          {/* County Selector */}
          <div className="mt-10 p-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Select Your County
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Explore budget allocations for your county. Currently covering all 47 counties with detailed breakdowns.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href="/insights">
                    <Building2 className="mr-2 h-4 w-4" />
                    Choose County
                  </Link>
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
        </div>
      </section>

      {/* Sector Analysis Section */}
      <section id="sector" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Sector Budget Analysis</h2>
              <p className="text-muted-foreground">What Kenya is prioritising</p>
            </div>
          </div>

          {/* Sectors Grid with Icons */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectors.map((sector) => (
              <Link
                key={sector.name}
                href={`/insights?sector=${encodeURIComponent(sector.name)}`}
                className="group flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-md"
              >
                <div className={`h-10 w-10 rounded-lg ${sector.color} flex items-center justify-center flex-shrink-0`}>
                  <sector.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {sector.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Sector Deep Dive Info */}
          <div className="mt-12">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Each Sector Deep Dive Includes:
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {sectorPageSections.map((section, index) => (
                <div
                  key={section}
                  className="p-4 bg-background rounded-xl border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{section}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Youth Budget Perception Survey CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 md:p-12 text-white">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Youth Budget Perception Survey</h2>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                Have your say! Share your priorities and perceptions about the national budget.
                Your input helps us understand what matters most to Kenyan youth.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/take-action">
                  Take the Survey <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
