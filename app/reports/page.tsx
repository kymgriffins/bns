'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
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
  Search,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BentoSection } from '@/components/ui/bento-frame';
import { ReportsHero } from '@/components/heros/ReportsHero';
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
  CardHover,
} from '@/components/animations/hig-motion';

// ─── Data ────────────────────────────────────────────────────────────────────

const nationalCategories = [
  { name: 'Budget Policy Statement (BPS)', icon: BookOpen, count: 3 },
  { name: 'Estimates of Revenue & Expenditure', icon: FileText, count: 2 },
  { name: 'Finance Bill / Finance Act', icon: FileText, count: 2 },
  { name: 'Appropriation Bill / Act', icon: FileText, count: 1 },
];

const countyCategories = [
  { name: 'County Fiscal Strategy Paper (CFSP)', icon: Building2, count: 4 },
  { name: 'County Budget Estimates', icon: Building2, count: 6 },
  { name: 'County "Budget at a Glance" briefs', icon: Building2, count: 8 },
];

const oversightCategories = [
  { name: 'Selected Audit & Accountability Highlights Simplified', icon: Shield, count: 2 },
];

const reportSections = [
  { title: 'What report?', description: 'Understanding the document type' },
  { title: 'Key takeaways', description: '5–8 main points' },
  { title: 'What changed', description: 'Year-over-year analysis' },
  { title: 'Why it matters', description: 'Impact on youth & communities' },
  { title: 'Questions to ask', description: 'For accountability' },
  { title: 'Next step', description: 'In the budget cycle' },
  { title: 'Sources', description: 'Links to original documents' },
];

const allReports = [
  {
    id: 1,
    title: 'FY 2025/26 Budget Policy Statement',
    category: 'National',
    type: 'BPS',
    level: 'National',
    date: 'February 2026',
    readTime: '8 min',
    excerpt:
      'Key highlights from the FY 2025/26 BPS including revenue projections, allocation changes, and youth-focused priorities. Total budget set at KSh 4.3T with education at KSh 580B.',
    takeaways: 6,
    isNew: true,
    sector: 'All',
  },
  {
    id: 2,
    title: 'Health Sector Budget Brief 2025',
    category: 'Sector',
    type: 'Estimates',
    level: 'National',
    date: 'January 2026',
    readTime: '6 min',
    excerpt:
      'Analysis of health sector allocations (KSh 127B) with focus on primary healthcare and community health programs. Examines the CHW rollout funding gap.',
    takeaways: 5,
    isNew: false,
    sector: 'Health',
  },
  {
    id: 3,
    title: 'Nairobi County Budget Estimates 2025/26',
    category: 'County',
    type: 'County Brief',
    level: 'County',
    date: 'January 2026',
    readTime: '7 min',
    excerpt:
      'Key allocations for Nairobi County including urban services, health, and youth programs. Ward-level breakdown and what changed versus 2024/25.',
    takeaways: 7,
    isNew: false,
    sector: 'All',
  },
  {
    id: 4,
    title: 'Education Sector Overview 2025',
    category: 'Sector',
    type: 'Estimates',
    level: 'National',
    date: 'December 2025',
    readTime: '5 min',
    excerpt:
      'TVET, university funding, and primary education allocations analyzed. Education remains the largest single sector at KSh 580B. Where the money actually flows.',
    takeaways: 5,
    isNew: false,
    sector: 'Education',
  },
  {
    id: 5,
    title: 'Agriculture Sector Budget Analysis',
    category: 'Sector',
    type: 'BPS',
    level: 'National',
    date: 'December 2025',
    readTime: '6 min',
    excerpt:
      'Smallholder farmers, agribusiness, and food security budget allocations. Agriculture receives KSh 62B — 5 questions to ask about food security commitments.',
    takeaways: 6,
    isNew: false,
    sector: 'Agriculture',
  },
  {
    id: 6,
    title: 'Mombasa County Budget Brief 2025/26',
    category: 'County',
    type: 'County Brief',
    level: 'County',
    date: 'November 2025',
    readTime: '5 min',
    excerpt:
      'Port city development, tourism, and coastal region priorities. Includes breakdown of development vs recurrent spending.',
    takeaways: 5,
    isNew: false,
    sector: 'All',
  },
];

const popularTopics = [
  { name: 'Youth Employment', count: 12 },
  { name: 'Healthcare Access', count: 8 },
  { name: 'Education Funding', count: 15 },
  { name: 'Climate Finance', count: 6 },
  { name: 'County Allocation', count: 10 },
];

const LEVEL_OPTIONS = ['All', 'National', 'County'] as const;
const SECTOR_OPTIONS = ['All', 'Education', 'Health', 'Agriculture', 'Water', 'Roads'] as const;
const TYPE_OPTIONS = ['All', 'BPS', 'Estimates', 'Finance Bill', 'County Brief', 'Audit'] as const;

// ─── Report Card ─────────────────────────────────────────────────────────────

function ReportCard({ report, featured }: { report: (typeof allReports)[0]; featured?: boolean }) {
  return (
    <Link
      href={`/reports/${report.id}`}
      className={`group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md ${featured ? 'md:p-6' : ''}`}
    >
      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
        <span className="rounded-full border border-border px-2.5 py-1">{report.category}</span>
        <span className="rounded-full border border-border px-2.5 py-1">{report.type}</span>
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {report.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {report.readTime}
        </span>
        {report.isNew && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
            New
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className={`font-semibold leading-snug group-hover:text-primary transition-colors ${featured ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
          {report.title}
        </h3>
        <p className="text-xs text-muted-foreground md:text-sm leading-relaxed line-clamp-3">
          {report.excerpt}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary/60" />
          {report.takeaways} key takeaways
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
          Read brief <ChevronRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

// ─── Filter Pills ─────────────────────────────────────────────────────────────

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
      }`}
    >
      {label}
    </button>
  );
}

// ─── Main client section ──────────────────────────────────────────────────────

function ReportsListSection() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState<string>('All');
  const [sector, setSector] = useState<string>('All');
  const [type, setType] = useState<string>('All');

  const filtered = useMemo(() => {
    return allReports.filter((r) => {
      const matchSearch =
        !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchLevel = level === 'All' || r.level === level;
      const matchSector = sector === 'All' || r.sector === sector;
      const matchType = type === 'All' || r.type === type;
      return matchSearch && matchLevel && matchSector && matchType;
    });
  }, [search, level, sector, type]);

  const hasFilters = level !== 'All' || sector !== 'All' || type !== 'All' || search;

  function clearFilters() {
    setSearch('');
    setLevel('All');
    setSector('All');
    setType('All');
  }

  return (
    <BentoSection id="reports" className="border-t border-border/50">
      <ScrollReveal className="mb-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Budget briefs
            </h2>
            <p className="mt-1.5 text-muted-foreground">
              {filtered.length} brief{filtered.length !== 1 ? 's' : ''} available
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search reports…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mr-1">
              Level
            </span>
            {LEVEL_OPTIONS.map((opt) => (
              <FilterPill
                key={opt}
                label={opt}
                active={level === opt}
                onClick={() => setLevel(opt)}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mr-1">
              Sector
            </span>
            {SECTOR_OPTIONS.map((opt) => (
              <FilterPill
                key={opt}
                label={opt}
                active={sector === opt}
                onClick={() => setSector(opt)}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mr-1">
              Type
            </span>
            {TYPE_OPTIONS.map((opt) => (
              <FilterPill
                key={opt}
                label={opt}
                active={type === opt}
                onClick={() => setType(opt)}
              />
            ))}
          </div>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" /> Clear filters
            </button>
          )}
        </div>
      </ScrollReveal>

      {/* Report grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
            <Filter className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="font-semibold text-foreground">No reports match your filters</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or search term</p>
          <Button variant="outline" size="sm" className="mt-2 rounded-full" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((report) => (
            <StaggerItem key={report.id}>
              <ReportCard report={report} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      )}
    </BentoSection>
  );
}

// ─── Category navigation ──────────────────────────────────────────────────────

function CategoryItem({ icon: Icon, name, count }: { icon: any; name: string; count: number }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary/30 hover:bg-muted/40">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <span className="flex-1 font-medium text-foreground">{name}</span>
      <span className="text-xs text-muted-foreground">{count}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  return (
    <main className="min-h-screen">
      <ReportsHero />

      {/* ── What each report contains ── */}
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
              <CardHover className="rounded-xl border border-border bg-card p-4 shadow-sm">
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

      {/* ── Report categories ── */}
      <BentoSection className="border-t border-border/50 bg-muted/20">
        <ScrollReveal className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Browse by category
          </h2>
          <p className="mt-2 text-muted-foreground">National, county, and oversight reports.</p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          <StaggerChildren className="space-y-2">
            <StaggerItem>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                National
              </p>
            </StaggerItem>
            {nationalCategories.map((cat) => (
              <StaggerItem key={cat.name}>
                <CategoryItem icon={cat.icon} name={cat.name} count={cat.count} />
              </StaggerItem>
            ))}
          </StaggerChildren>

          <StaggerChildren className="space-y-2">
            <StaggerItem>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                County
              </p>
            </StaggerItem>
            {countyCategories.map((cat) => (
              <StaggerItem key={cat.name}>
                <CategoryItem icon={cat.icon} name={cat.name} count={cat.count} />
              </StaggerItem>
            ))}
          </StaggerChildren>

          <StaggerChildren className="space-y-2">
            <StaggerItem>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Oversight
              </p>
            </StaggerItem>
            {oversightCategories.map((cat) => (
              <StaggerItem key={cat.name}>
                <CategoryItem icon={cat.icon} name={cat.name} count={cat.count} />
              </StaggerItem>
            ))}
            {/* Popular topics */}
            <StaggerItem>
              <p className="mb-3 mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Popular topics
              </p>
            </StaggerItem>
            {popularTopics.map((topic) => (
              <StaggerItem key={topic.name}>
                <button className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary/30 hover:bg-muted/40">
                  <span className="font-medium text-foreground">{topic.name}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    {topic.count}
                  </span>
                </button>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </BentoSection>

      {/* ── Live report listing with filters ── */}
      <ReportsListSection />

      {/* ── CTA ── */}
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
              Request a custom report or join our training programme.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full transition-transform duration-200 active:scale-[0.98]"
              >
                <Link href="mailto:info@budgetndiostory.org" className="inline-flex items-center gap-2">
                  Request a report <ArrowUpRight className="h-4 w-4" />
                </Link>
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
