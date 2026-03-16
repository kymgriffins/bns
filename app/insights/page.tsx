"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BentoCard,
  BentoSection,
  BentoStat,
  BentoCTASection,
} from "@/components/ui/bento-frame";
import {
  BentoScrollAnimation,
  BentoStaggerGrid,
  BentoGridItem,
  BentoSectionHeader,
} from "@/components/ui/bento-animations";
import { PageSection, Container2026, SectionHeader } from "@/components/layout";

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

// Floating Particles Component
function FloatingOrbs() {
  const orbs = [
    { size: 120, x: '10%', y: '20%', duration: 25, color: 'from-amber-400/20 to-orange-500/20' },
    { size: 80, x: '80%', y: '30%', duration: 20, color: 'from-teal-400/20 to-cyan-500/20' },
    { size: 100, x: '60%', y: '60%', duration: 30, color: 'from-purple-400/20 to-pink-500/20' },
    { size: 60, x: '30%', y: '70%', duration: 22, color: 'from-blue-400/20 to-indigo-500/20' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            animation: `pulse ${orb.duration}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

// Interactive Budget Explorer
function BudgetExplorer() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [animatedValue, setAnimatedValue] = useState(0);
  
  const sectors = [
    { name: 'Education', value: 45, color: 'bg-blue-500' },
    { name: 'Health', value: 30, color: 'bg-red-500' },
    { name: 'Infrastructure', value: 25, color: 'bg-amber-500' },
  ];
  
  useEffect(() => {
    if (selectedSector) {
      const target = sectors.find(s => s.name === selectedSector)?.value || 0;
      const timer = setTimeout(() => setAnimatedValue(target), 100);
      return () => clearTimeout(timer);
    }
  }, [selectedSector]);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <h3 className="font-semibold">Interactive Budget Explorer</h3>
      </div>
      <p className="text-slate-300 text-sm mb-4">Click a sector to see its allocation</p>
      <div className="space-y-3">
        {sectors.map((sector) => (
          <button
            key={sector.name}
            onClick={() => setSelectedSector(sector.name)}
            className={`w-full p-3 rounded-xl transition-all duration-300 ${
              selectedSector === sector.name 
                ? 'bg-white/20 ring-2 ring-amber-400' 
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{sector.name}</span>
              <span className="text-sm text-slate-300">{sector.value}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${sector.color} rounded-full transition-all duration-1000`}
                style={{ width: selectedSector === sector.name ? `${sector.value}%` : '0%' }}
              />
            </div>
          </button>
        ))}
      </div>
      {selectedSector && (
        <div className="mt-4 p-3 bg-amber-400/20 rounded-xl text-center animate-in fade-in">
          <span className="text-amber-400 font-semibold">{selectedSector}: {animatedValue}% of budget</span>
        </div>
      )}
    </div>
  );
}

export default function InsightsPage() {
  return (
    <main className="min-h-screen relative">
      <FloatingOrbs />
      <PageSection size="lg" className="border-t-0">
        <Container2026>
          <SectionHeader
            label="Analysis · Budget insights"
            title="Understand the story behind Kenya’s numbers."
            description="See how money shifts between years, sectors, and counties – and what that means for jobs, services, and youth futures."
            action={
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" className="rounded-full">
                  <Link href="#national">Start with national view</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href="#sector">Jump to sectors</Link>
                </Button>
              </div>
            }
          />
        </Container2026>
      </PageSection>

      <BentoSection className="bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <BentoScrollAnimation animation="fadeInUp">
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm rounded-full">
              <BarChart3 className="w-4 h-4 mr-2" />
              Budget Analysis
            </Badge>
          </BentoScrollAnimation>
          <BentoScrollAnimation animation="fadeInUp" delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Budget Insights</h1>
          </BentoScrollAnimation>
          <BentoScrollAnimation animation="fadeInUp" delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              National, county, and sector breakdowns built for clarity and accountability.
              Understand where money goes and what it means for you.
            </p>
          </BentoScrollAnimation>

          {/* Quick Stats - Bento Grid */}
          <BentoStaggerGrid stagger={0.1} className="grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {budgetStats.map((stat, index) => (
              <BentoGridItem key={stat.label} animation="scaleIn" delay={index * 0.1}>
                <BentoCard padding="md" accentColor={stat.positive ? "green" : "orange"} hover>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                  <div className={`text-xs font-medium ${stat.positive ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    {stat.change}
                  </div>
                </BentoCard>
              </BentoGridItem>
            ))}
          </BentoStaggerGrid>

          <BentoScrollAnimation animation="fadeInUp" delay={0.5}>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="#national">
                  Explore Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/reports">View Reports</Link>
              </Button>
            </div>
          </BentoScrollAnimation>
        </div>
      </BentoSection>

      {/* Overview Sections - Bento Cards */}
      <BentoSection>
        <BentoStaggerGrid stagger={0.1} className="grid-cols-1 md:grid-cols-3 gap-6">
          {/* National Analysis */}
          <BentoGridItem animation="fadeInUp">
            <Link href="#national" className="block h-full">
              <BentoCard padding="lg" accentColor="blue" hover className="h-full group">
                <div className="h-14 w-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-5">
                  <BarChart3 className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">National Analysis</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  The big shifts explained simply, with youth implications. Understand the national budget direction.
                </p>
                <div className="flex items-center text-primary font-medium gap-1">
                  <span>Explore</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </BentoCard>
            </Link>
          </BentoGridItem>

          {/* County Analysis */}
          <BentoGridItem animation="fadeInUp" delay={0.1}>
            <Link href="#county" className="block h-full">
              <BentoCard padding="lg" accentColor="green" hover className="h-full group">
                <div className="h-14 w-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-5">
                  <Building2 className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">County Analysis</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  County budgets shape daily life. Understand what's planned in your county.
                </p>
                <div className="flex items-center text-primary font-medium gap-1">
                  <span>Explore</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </BentoCard>
            </Link>
          </BentoGridItem>

          {/* Sector Analysis */}
          <BentoGridItem animation="fadeInUp" delay={0.2}>
            <Link href="#sector" className="block h-full">
              <BentoCard padding="lg" accentColor="purple" hover className="h-full group">
                <div className="h-14 w-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-5">
                  <Users className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sector Analysis</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  What Kenya is prioritising and what outcomes to demand from each sector.
                </p>
                <div className="flex items-center text-primary font-medium gap-1">
                  <span>Explore</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </BentoCard>
            </Link>
          </BentoGridItem>
        </BentoStaggerGrid>
      </BentoSection>

      {/* National Analysis Section - Bento */}
      <BentoSection id="national" className="bg-secondary/10">
        <BentoScrollAnimation animation="fadeInUp">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">National Budget Analysis</h2>
              <p className="text-muted-foreground">The big picture explained simply</p>
            </div>
          </div>
        </BentoScrollAnimation>

        <BentoStaggerGrid stagger={0.1} className="grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {nationalSections.map((section, index) => (
            <BentoGridItem key={section.title} animation="fadeInUp" delay={index * 0.1}>
              <BentoCard padding="md" accentColor="blue" hover>
                <div className="h-10 w-10 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                  <section.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-1 text-sm">{section.title}</h3>
                <p className="text-xs text-muted-foreground">{section.description}</p>
              </BentoCard>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>

        {/* Budget Distribution */}
        <BentoScrollAnimation animation="fadeInUp" delay={0.3}>
          <BentoCard padding="lg" accentColor="default">
            <h3 className="font-semibold mb-5">Budget Distribution Preview</h3>
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Recurrent Expenditure</span>
                  <span className="text-muted-foreground">KSh 2.1T</span>
                </div>
                <Progress value={52} className="h-3 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Development Expenditure</span>
                  <span className="text-muted-foreground">KSh 1.4T</span>
                </div>
                <Progress value={35} className="h-3 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>County Allocation</span>
                  <span className="text-muted-foreground">KSh 0.6T</span>
                </div>
                <Progress value={15} className="h-3 rounded-full" />
              </div>
            </div>
          </BentoCard>
        </BentoScrollAnimation>

        <BentoScrollAnimation animation="fadeInUp" delay={0.4}>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button asChild className="rounded-full">
              <Link href="/reports">Read Reports</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/news">See Updates</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/take-action">Join Training</Link>
            </Button>
          </div>
        </BentoScrollAnimation>
      </BentoSection>

      {/* County Analysis Section - Bento */}
      <BentoSection id="county">
        <BentoScrollAnimation animation="fadeInUp">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">County Budget Analysis</h2>
              <p className="text-muted-foreground">What's happening in your county</p>
            </div>
          </div>
        </BentoScrollAnimation>

        <BentoStaggerGrid stagger={0.1} className="grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {countySections.map((section, index) => (
            <BentoGridItem key={section.title} animation="fadeInUp" delay={index * 0.1}>
              <BentoCard padding="md" accentColor="green" hover>
                <h3 className="font-semibold mb-2 text-sm">{section.title}</h3>
                <p className="text-xs text-muted-foreground">{section.description}</p>
              </BentoCard>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>

        {/* County Selector */}
        <BentoScrollAnimation animation="scaleIn" delay={0.3}>
          <BentoCard padding="lg" accentColor="green">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Select Your County
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Explore budget allocations for your county. Currently covering all 47 counties with detailed breakdowns.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/insights">
                    <Building2 className="mr-2 h-4 w-4" />
                    Choose County
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/reports">Download Brief</Link>
                </Button>
                <Button asChild className="rounded-full">
                  <Link href="/take-action">Take Action</Link>
                </Button>
              </div>
            </div>
          </BentoCard>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Sector Analysis Section - Bento */}
      <BentoSection id="sector" className="bg-secondary/10">
        <BentoScrollAnimation animation="fadeInUp">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Sector Budget Analysis</h2>
              <p className="text-muted-foreground">What Kenya is prioritising</p>
            </div>
          </div>
        </BentoScrollAnimation>

        {/* Sectors Grid */}
        <BentoStaggerGrid stagger={0.05} className="grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {sectors.map((sector, index) => (
            <BentoGridItem key={sector.name} animation="scaleIn" delay={index * 0.05}>
              <Link href={`/insights?sector=${encodeURIComponent(sector.name)}`} className="block">
                <BentoCard padding="md" accentColor="purple" hover>
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-2xl ${sector.color} flex items-center justify-center flex-shrink-0`}>
                      <sector.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{sector.name}</span>
                  </div>
                </BentoCard>
              </Link>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>

        {/* Sector Deep Dive Info */}
        <BentoScrollAnimation animation="fadeInUp" delay={0.3}>
          <BentoCard padding="lg" accentColor="default">
            <h3 className="font-semibold mb-5 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Each Sector Deep Dive Includes:
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {sectorPageSections.map((section, index) => (
                <div
                  key={section}
                  className="p-3 bg-background/60 rounded-2xl"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-xs font-medium">{section}</span>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Youth Budget Perception Survey CTA - Bento */}
      <BentoSection>
        <BentoScrollAnimation animation="scaleIn">
          <BentoCTASection>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Youth Budget Perception Survey</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Have your say! Share your priorities and perceptions about the national budget.
                Your input helps us understand what matters most to Kenyan youth.
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link href="/take-action">
                  Take the Survey <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </BentoCTASection>
        </BentoScrollAnimation>
      </BentoSection>
    </main>
  );
}
