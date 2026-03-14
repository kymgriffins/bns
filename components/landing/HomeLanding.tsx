'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  BarChart3,
  MapPin,
  Users,
  FileText,
  Handshake,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AgencyHeroSection from '@/components/shadcn-space/blocks/hero-01';
import Testimonial01 from '@/components/shadcn-space/blocks/testimonial-02';
import { DonateSection } from '@/components/donate-section';
import { Marquee } from '@/components/shadcn-space/animations/marquee';
import { PageSection, Container2026, SectionHeader } from '@/components/layout';
import { ScrollSection, PinnedChapter } from '@/components/scroll';
import { LandingCursor } from './LandingCursor';
import { HorizontalReveal } from './HorizontalReveal';

const statistics = [
  { value: 10, suffix: ' years', label: 'Budget Reports Analyzed', icon: FileText },
  { value: 15000, suffix: '+', label: 'Kenyans Reached', icon: Users },
  { value: 47, suffix: '', label: 'Counties Covered', icon: MapPin },
  { value: 20, suffix: '+', label: 'Partner Organizations', icon: Handshake },
];

const howItWorks = [
  {
    step: '01',
    title: 'Start with Budget 101',
    description:
      'Get the basics in plain language—what the budget is, who decides, and where you fit in.',
    icon: GraduationCap,
    href: '/learn/budget-101',
  },
  {
    step: '02',
    title: 'Browse Reports',
    description:
      'Explore simplified budget documents from national and county levels in plain language.',
    icon: BookOpen,
    href: '/reports',
  },
  {
    step: '03',
    title: 'Analyze & Take Action',
    description:
      'Dive into sector analysis, track delivery, and use templates to participate in budget processes.',
    icon: BarChart3,
    href: '/insights',
  },
];

const latestReports = [
  {
    title: 'FY 2025/26 Budget at a Glance',
    category: 'National',
    date: 'Feb 2025',
    summary: 'Key highlights from the national budget reading',
    href: '/reports',
  },
  {
    title: 'Health Sector Budget Analysis',
    category: 'Sector Analysis',
    date: 'Jan 2025',
    summary: 'Where healthcare funding is going and what it means',
    href: '/reports',
  },
  {
    title: 'Nairobi County Budget Brief',
    category: 'County',
    date: 'Dec 2024',
    summary: 'Understanding the city budget for residents',
    href: '/reports',
  },
];

const budgetStoryChapters = [
  {
    id: 1,
    label: 'National story',
    title: 'From Treasury to your county.',
    description:
      'We unpack how the national budget is set, where the big decisions sit, and how they ripple into county ceilings.',
  },
  {
    id: 2,
    label: 'County story',
    title: 'Promises, projects, and ward priorities.',
    description:
      'See what your county promised in health, education, and infrastructure—and what was actually funded.',
  },
  {
    id: 3,
    label: 'People story',
    title: 'Stories behind every shilling.',
    description:
      'Short videos, TikToks and briefs that follow budgets into clinics, classrooms, feeder roads and youth spaces.',
  },
];

const civicHubLinks = [
  {
    title: 'Track county delivery',
    description: 'See projects, timelines, and evidence from counties across Kenya.',
    href: '/tracker',
    badge: 'Tracker',
  },
  {
    title: 'Share a budget story',
    description: 'Submit stories from your ward—wins, gaps, and everything in between.',
    href: '/take-action',
    badge: 'Stories',
  },
  {
    title: 'Get simplified briefs',
    description: 'Request human, visual explainers instead of PDFs and legalese.',
    href: '/reports',
    badge: 'Reports',
  },
  {
    title: 'Join civic updates',
    description: 'Subscribe for SMS and email alerts when key budget dates are coming up.',
    href: '/subscribe',
    badge: 'Alerts',
  },
];

function CivicGridIllustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 220"
      aria-hidden="true"
      focusable="false"
      className="text-primary-foreground/20 dark:text-primary-foreground/30"
      {...props}
    >
      <rect x="8" y="12" width="304" height="196" rx="18" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="24" y="32" width="72" height="40" rx="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="120" y="32" width="88" height="40" rx="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="232" y="32" width="64" height="40" rx="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="24" y="92" width="120" height="44" rx="10" fill="currentColor" opacity="0.1" />
      <rect x="24" y="148" width="96" height="36" rx="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="136" y="148" width="96" height="36" rx="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="248" y="148" width="40" height="36" rx="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="260" cy="108" r="16" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M24 204h72M112 204h56M184 204h72"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

function BudgetStoryIllustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 260 200"
      aria-hidden="true"
      focusable="false"
      className="text-primary/30 dark:text-primary/40"
      {...props}
    >
      <rect x="10" y="16" width="240" height="168" rx="18" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M34 146c22-20 40-28 60-24 20 4 32 18 52 14 16-3 28-14 40-30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="58" cy="120" r="4" fill="currentColor" />
      <circle cx="110" cy="122" r="4" fill="currentColor" />
      <circle cx="156" cy="134" r="4" fill="currentColor" />
      <circle cx="202" cy="112" r="4" fill="currentColor" />
      <rect x="42" y="40" width="44" height="10" rx="5" fill="currentColor" opacity="0.12" />
      <rect x="92" y="40" width="60" height="10" rx="5" fill="currentColor" opacity="0.12" />
      <rect x="42" y="60" width="80" height="10" rx="5" fill="currentColor" opacity="0.12" />
      <rect x="42" y="80" width="56" height="10" rx="5" fill="currentColor" opacity="0.12" />
      <rect x="148" y="60" width="60" height="10" rx="5" fill="currentColor" opacity="0.12" />
    </svg>
  );
}

const scrollFadeUp = { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 } };
const scrollFadeUpSm = { from: { opacity: 0, y: 32 }, to: { opacity: 1, y: 0 } };
const scrollFadeUpXs = { from: { opacity: 0, y: 24 }, to: { opacity: 1, y: 0 } };

const partners = [
  {
    name: 'The Continental Pot',
    logo: 'TCP',
    image:
      'https://continentalpot.africa/wp-content/uploads/2025/02/The-Continental-Pot-Vertical.png',
    website: 'https://continentalpot.africa',
  },
  {
    name: 'Colour Twist Media',
    logo: 'CTM',
    image: 'https://colortwistmedia.co.ke/wp-content/uploads/2024/08/logo.png',
    website: 'https://colortwistmedia.co.ke',
  },
  {
    name: 'Sen Media & Events',
    logo: 'SME',
    image: '/senmedia.png',
    website: 'https://senmedia-events.co.ke',
  },
];

export function HomeLanding() {
  return (
    <main className="min-h-screen bg-background">
      <LandingCursor />

      {/* Hero — cinematic civic hub with video (no gradients) */}
      <section className="relative overflow-hidden border-b border-border bg-[#050816]">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl" />
        </div>
        <Container2026>
          <div className="relative grid gap-10 py-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:py-24 lg:py-28">
            <div className="space-y-6">
              <p className="badge-minimal text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Kenya · Budget Ndio Story
              </p>
              <h1 className="text-hero-2026 font-semibold leading-tight text-white">
                See where Kenya&apos;s budget really goes.
              </h1>
              <p className="max-w-xl text-sm text-muted-foreground md:text-base">
                A civic hub for young Kenyans to follow the money—from Treasury ceilings to county projects
                and the stories behind every shilling.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/learn/budget-101">
                    Start with Budget 101
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                  <Link href="/tracker">
                    Track delivery
                    
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="rounded-full px-6">
                  <Link href="/take-action">
                    Join the civic hub
                    <Users className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground md:text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Live for 47 counties</span>
                </div>
                <span className="hidden h-4 w-px bg-border md:inline-block" aria-hidden="true" />
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Nairobi · Kisumu · Mombasa · Eldoret
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-black shadow-[0_18px_60px_rgba(15,23,42,0.7)]">
                <video
                  className="h-full w-full object-cover"
                  src="/bnsoo1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="Budget Ndio Story civic footage"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-xs text-slate-100">
                  <div>
                    <p className="font-semibold">Budget Ndio Story · 2026</p>
                    <p className="text-[11px] text-slate-300">
                      Stories from wards, barazas and civic spaces across Kenya.
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                    Youth civic hub
                  </span>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-10 -right-10 hidden h-40 w-40 rounded-full border border-primary/30 md:block" />
              <div className="pointer-events-none absolute -bottom-24 -left-6 hidden h-40 w-64 md:block">
                <CivicGridIllustration className="h-full w-full" />
              </div>
            </div>
          </div>
        </Container2026>
      </section>

      {/* Marquee — scrolls with page */}
      <section
        className="border-b border-border bg-secondary/20 py-3"
        aria-label="Updates"
      >
        <Container2026>
          <Marquee pauseOnHover className="py-1" duration="26s">
            <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                New
              </span>
              <span className="font-medium">Budget 101 · Learn hub is live</span>
              <span className="text-muted-foreground">
                Start with BPS 2026 and move from &quot;confused&quot; to &quot;I can explain this.&quot;
              </span>
            </div>
            <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full bg-secondary px-3 py-1 font-medium text-foreground/80">
                Creators
              </span>
              <span className="font-medium">
                Visual budget stories for TikTok, IG &amp; YouTube
              </span>
              <span className="text-muted-foreground">
                Briefs, hooks and formats that make public finance scroll‑stopping.
              </span>
            </div>
            <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                Civic windows
              </span>
              <span className="font-medium">Track key dates in Kenya&apos;s budget calendar</span>
              <span className="text-muted-foreground">
                From BPS to county barazas, we surface when your voice matters most.
              </span>
            </div>
          </Marquee>
        </Container2026>
      </section>

      {/* Budget story – pinned civic narrative */}
      <ScrollSection animation={scrollFadeUp}>
        <PinnedChapter className="bg-background py-14 md:py-20">
          <Container2026>
            <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
              <div className="space-y-5">
                <SectionHeader
                  label="Budget Ndio Story"
                  title="Follow the money as a story, not a spreadsheet."
                  description="Scroll through the national, county and people stories to see how budgets move—and where citizens can show up."
                />
                <div className="space-y-4">
                  {budgetStoryChapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="group flex gap-4 rounded-2xl border border-border/60 bg-secondary/20 p-4 transition-colors hover:bg-secondary/40"
                    >
                      <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                        {chapter.id.toString().padStart(2, '0')}
                      </div>
                      <div className="space-y-1">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                          {chapter.label}
                        </p>
                        <p className="text-sm font-semibold md:text-base">{chapter.title}</p>
                        <p className="text-xs text-muted-foreground md:text-sm">
                          {chapter.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-6 shadow-lg md:p-8">
                <div className="relative space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.25em] opacity-80">
                    Civic hub · 2026
                  </p>
                  <p className="text-lg font-semibold md:text-xl">
                    One place to see what was promised, what was funded, and what was delivered.
                  </p>
                  <p className="text-sm opacity-80">
                    Each story blends budget lines, timelines, and community voices—so you can hold power to
                    account with receipts, not vibes.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs opacity-90">
                    <span className="rounded-full bg-primary-foreground/10 px-3 py-1">
                      47 counties
                    </span>
                    <span className="rounded-full bg-primary-foreground/10 px-3 py-1">
                      Sector explainers
                    </span>
                    <span className="rounded-full bg-primary-foreground/10 px-3 py-1">
                      Storytelling prompts
                    </span>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="mt-4 rounded-full bg-primary-foreground text-primary"
                  >
                    <Link href="/insights">
                      Explore insights
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
                <div className="pointer-events-none absolute -right-4 -bottom-4 h-32 w-40 opacity-70">
                  <BudgetStoryIllustration className="h-full w-full" />
                </div>
              </div>
            </div>
          </Container2026>
        </PinnedChapter>
      </ScrollSection>

      {/* Horizontal reveal: How it works */}
      <section className="bg-secondary/30 py-6 md:py-8">
        <div className="container-2026 mb-4 px-4 md:px-6">
          <SectionHeader
            label="How it works"
            title="Learn → Reports → Action."
            description="Three steps. Scroll to reveal."
          />
        </div>
        <HorizontalReveal scrollHeight={2.2} className="bg-secondary/30">
          {howItWorks.map((item) => (
            <Card
              key={item.step}
              className="card-2026 w-[85vw] max-w-md flex-shrink-0 md:w-[400px]"
            >
              <CardContent className="flex h-full min-h-[320px] flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      Step {item.step}
                    </span>
                    <div className="icon-wrapper">
                      <item.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-h3-2026 mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary"
                >
                  {item.step === '01' ? 'Start module' : 'Explore'}
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </HorizontalReveal>
      </section>

      {/* Scroll-triggered: Impact in numbers */}
      <ScrollSection animation={scrollFadeUp}>
        <PageSection size="md" variant="muted">
          <Container2026>
            <div className="space-y-8">
              <SectionHeader
                label="Impact"
                title="People first, not PDFs."
                description="Analysts, creators and organizers keeping Kenya's budget story measurable and shareable."
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statistics.map((item, index) => (
                  <Card key={item.label} className="card-2026 h-full">
                    <CardContent className="space-y-3 p-5 md:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="icon-wrapper">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          {index === 0 ? 'Reports' : index === 1 ? 'People' : 'Network'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-2xl font-semibold md:text-3xl">
                          {item.value}
                          {item.suffix}
                        </span>
                        <p className="text-xs text-muted-foreground md:text-sm">
                          {item.label}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Container2026>
        </PageSection>
      </ScrollSection>

      {/* Civic hub band – blue, premium */}
      <ScrollSection animation={scrollFadeUpSm}>
        <PageSection className="bg-primary text-primary-foreground">
          <Container2026>
            <div className="space-y-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                  <p className="badge-minimal text-xs uppercase tracking-[0.25em] text-primary-foreground/80">
                    Civic hub
                  </p>
                  <h2 className="text-2xl font-semibold md:text-3xl">
                    One home for Kenya&apos;s budget and the stories behind it.
                  </h2>
                  <p className="max-w-xl text-sm md:text-base md:text-primary-foreground/90">
                    Move from PDFs to people: track projects, share evidence, and get briefings designed for
                    young Kenyans—not auditors.
                  </p>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="secondary"
                  className="mt-2 w-full rounded-full bg-primary-foreground text-primary md:w-auto"
                >
                  <Link href="/take-action">
                    Enter the civic hub
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {civicHubLinks.map((link) => (
                  <Card
                    key={link.title}
                    className="card-2026 h-full border-primary-foreground/20 bg-primary/40 text-primary-foreground"
                  >
                    <CardContent className="flex h-full flex-col justify-between gap-3 p-5 md:p-6">
                      <div className="space-y-2">
                        <span className="inline-flex items-center rounded-full bg-primary-foreground/10 px-3 py-1 text-[11px] font-medium">
                          {link.badge}
                        </span>
                        <p className="text-sm font-semibold md:text-base">{link.title}</p>
                        <p className="text-xs md:text-sm md:text-primary-foreground/90">
                          {link.description}
                        </p>
                      </div>
                      <Link
                        href={link.href}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium md:text-sm"
                      >
                        Open
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Container2026>
        </PageSection>
      </ScrollSection>

      {/* Latest reports */}
      <ScrollSection animation={scrollFadeUpSm}>
        <PageSection>
          <Container2026>
            <div className="space-y-8">
              <SectionHeader
                label="Latest"
                title="Reports and explainers."
                action={
                  <Button asChild variant="outline" size="sm" className="rounded-full px-5">
                    <Link href="/reports">
                      View all reports
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                }
              />
              <div className="divide-y divide-border/70">
                {latestReports.map((report) => (
                  <Link
                    key={report.title}
                    href={report.href}
                    className="-mx-2 block rounded-lg py-4 transition-colors hover:bg-background/50 md:py-5"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="rounded-full border border-border px-3 py-1">
                          {report.category}
                        </span>
                        <span>{report.date}</span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium md:text-base">{report.title}</p>
                        <p className="text-xs text-muted-foreground md:text-sm">
                          {report.summary}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                        Read brief
                        <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container2026>
        </PageSection>
      </ScrollSection>

      {/* Scroll-triggered: Testimonial */}
      <ScrollSection animation={scrollFadeUpXs}>
        <PageSection>
          <Container2026>
            <Testimonial01 />
          </Container2026>
        </PageSection>
      </ScrollSection>

      {/* Scroll-triggered: Partners */}
      <ScrollSection animation={scrollFadeUpXs}>
        <PageSection size="md" variant="muted">
          <Container2026>
            <div className="space-y-8">
              <SectionHeader
                label="Led by storytellers"
                title="A Kenya-wide consortium at the intersection of media, data and organizing."
                description={
                  <>
                    Budget Ndio Story is led by{' '}
                    <span className="font-medium">The Continental Pot, Colour Twist Media,</span>{' '}
                    and <span className="font-medium">Sen Media &amp; Events</span>, working with
                    creators, universities, civil society and partners across the country.
                  </>
                }
                align="center"
              />
              <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
                {partners.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card className="card-2026 h-full transition-shadow duration-200 group-hover:shadow-lg">
                      <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                        {partner.image ? (
                          <div className="relative flex h-16 w-40 items-center justify-center">
                            <img
                              src={partner.image}
                              alt={partner.name}
                              className="max-h-full max-w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                            />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
                            <span className="text-xs font-semibold">{partner.logo}</span>
                          </div>
                        )}
                        <span className="text-center text-sm font-semibold">{partner.name}</span>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          </Container2026>
        </PageSection>
      </ScrollSection>

      <DonateSection />
    </main>
  );
}
