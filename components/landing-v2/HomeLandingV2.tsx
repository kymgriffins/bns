'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BarChart3,
  Users,
  FileText,
  ChevronRight,
  GraduationCap,
  Play,
  Activity,
  Zap,
  Shield,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DonateSection } from '@/components/donate-section';
import { Marquee } from '@/components/shadcn-space/animations/marquee';
import { SectionHeader } from '@/components/layout';
import { ScrollSection } from '@/components/scroll';
import { LandingCursor } from '../landing/LandingCursor';
import { LandingSection } from '../landing/LandingSection';
import { AnimatedFAQ } from '@/components/ui/animated-faq';
import { FeaturedYouTubeVideo } from '@/components/youtube/YouTubeVideoCard';
import { useYouTubeVideos } from '@/hooks/useYouTube';

// ─── Constants & Types ────────────────────────────────────────────────────────

const statistics = [
  { value: 10, suffix: 'y', label: 'Analysis' },
  { value: 15, suffix: 'k+', label: 'Citizens' },
  { value: 47, suffix: '', label: 'Counties' },
  { value: 20, suffix: '+', label: 'Partners' },
];

const faqItems = [
  {
    question: "What is Budget Ndio Story?",
    answer: "Budget Ndio Story is a Kenyan civic hub that turns national and county budget documents into clear, youth-friendly briefs, interactive learning modules, and tracking tools. We make public finance feel human — not bureaucratic.",
  },
  {
    question: "Who is this platform for?",
    answer: "Primarily for young Kenyans aged 18–35 who want to understand where public money goes and how to participate in budget processes. But our briefs and tools are useful for anyone.",
  },
  {
    question: "How do I read a budget report?",
    answer: "Go to the Reports page and browse by category (National, County, or Sector). Each report follows a consistent structure including key takeaways and why it matters for youth.",
  },
  {
    question: "Are your reports based on official documents?",
    answer: "Yes. All our briefs are derived from publicly available documents — the Budget Policy Statement, Estimates of Revenue & Expenditure, Finance Bills, and County Budget documents.",
  },
];

// ─── Animated Elements ────────────────────────────────────────────────────────

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 2000;
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          const cur = Math.round(eased * value);
          if (el) el.textContent = `${cur}${suffix}`;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ─── New Component: The Insight Grid (Replacment for Stats Strip) ────────────

function InsightGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {statistics.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center group"
        >
          <div className="mb-4 relative">
             <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <p className="text-4xl md:text-5xl font-black tracking-tighter text-foreground relative z-10 transition-transform duration-500 group-hover:scale-110">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </p>
          </div>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/60 transition-colors duration-500 group-hover:text-primary">
            {stat.label}
          </p>
          <div className="mt-6 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span className="w-1 h-1 rounded-full bg-primary/10" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── New Component: The Hub Module (Replacement for How It Works) ─────────────

const modules = [
  {
    title: 'Decode BPS 2026',
    description: 'Break down the Budget Policy Statement in plain language. No jargon, just the facts.',
    icon: GraduationCap,
    color: 'from-blue-600/10 via-transparent to-cyan-500/5',
    link: '/learn',
    action: 'Start Learning',
    borderColor: 'group-hover:border-blue-500/50'
  },
  {
    title: 'County Intelligence',
    description: 'Track where every shilling goes in your ward. Comparative data for all 47 counties.',
    icon: BarChart3,
    color: 'from-amber-600/10 via-transparent to-orange-500/5',
    link: '/reports',
    action: 'Explore County Data',
    borderColor: 'group-hover:border-amber-500/50'
  },
  {
    title: 'Public Action Network',
    description: 'Direct access to hearings, timelines, and tools for civic engagement.',
    icon: Users,
    color: 'from-emerald-600/10 via-transparent to-teal-500/5',
    link: '/take-action',
    action: 'Get Involved',
    borderColor: 'group-hover:border-emerald-500/50'
  }
];

function HubModuleSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {modules.map((mod, i) => (
        <Link key={mod.title} href={mod.link} className="group flex">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className={`flex flex-col w-full rounded-[2rem] bg-card border border-border/40 p-10 hover:shadow-[0_22px_70px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden ${mod.borderColor}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            
            {/* Subtle glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-8 group-hover:scale-105 group-hover:bg-primary/5 transition-all duration-500 ring-1 ring-border/50">
                <mod.icon className="w-7 h-7 text-foreground/80 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{mod.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-10 text-[15px]">{mod.description}</p>
              <div className="mt-auto flex items-center gap-3 text-sm font-bold text-primary tracking-wide">
                <span>{mod.action}</span>
                <div className="w-6 h-px bg-primary/30 group-hover:w-10 transition-all duration-500" />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}

// ─── New Component: The Activity Feed (Replacement for Latest Reports) ────────

const activities = [
  { id: 1, type: 'Report', title: 'FY 2025/26 National Brief', time: '2h ago', status: 'Published' },
  { id: 2, type: 'Event', title: 'Nairobi County Hearing', time: '5h ago', status: 'Live Soon' },
  { id: 3, type: 'Update', title: 'Health Sector Analysis 2026', time: '1d ago', status: 'Updated' },
  { id: 4, type: 'Action', title: 'Citizen Petition: Ward Development', time: '2d ago', status: 'Active' },
];

function ActivityFeed() {
  return (
    <div className="rounded-3xl border border-border/40 bg-card overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest opacity-70">Real-time Pulse</span>
        </div>
        <Button variant="ghost" size="sm" className="text-[10px] h-7 px-2 uppercase tracking-tighter">View Feed</Button>
      </div>
      <div className="divide-y divide-border/30">
        {activities.map((act) => (
          <div key={act.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-[10px] font-bold text-primary">
                {act.type[0]}
              </div>
              <div>
                <p className="text-sm font-semibold group-hover:text-primary transition-colors">{act.title}</p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                  <Clock className="w-3 h-3" />
                  {act.time}
                  <span>•</span>
                  <span className="text-emerald-500 font-medium">{act.status}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Landing Component ──────────────────────────────────────────────────

export function HomeLandingV2() {
  const { videos: latestVideos, loading: videoLoading, error: videoError } = useYouTubeVideos(1);
  const latestVideo = latestVideos[0] ?? null;
  const podcastUrl = process.env.NEXT_PUBLIC_YOUTUBE_PODCAST_URL || 'https://www.youtube.com/@budgetndiostory';

  return (
    <div className="bg-background">
      <LandingCursor />

      {/* ── 1. HERO (KEPT AS-IS) ───────────────────────────────────────────── */}
      <LandingSection id="hero" variant="dark" contained size="hero">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl" />
        </div>
        <div className="relative flex min-h-0 flex-1 flex-col justify-center">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
            <div className="space-y-6">
              <p className="badge-minimal text-[10px] uppercase tracking-[0.25em] text-white/70 sm:text-xs">
                Kenya · Budget Ndio Story
              </p>
              <h1 className="text-hero-2026 font-semibold leading-tight text-white">
                See where Kenya's budget really goes.
              </h1>
              <p className="max-w-xl text-sm text-white/85 md:text-base">
                A civic hub for young Kenyans to follow the money — from Treasury ceilings to county projects.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-full bg-white px-6 text-sm font-semibold text-[var(--hero-bg)] hover:bg-white/95">
                  <Link href="/learn">Enter Learn <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-white/40 bg-transparent px-6 text-sm font-medium text-white hover:bg-white/15">
                  <Link href="/tracker">Track delivery</Link>
                </Button>
              </div>
            </div>
            <div className="relative flex items-center">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-black shadow-[0_18px_60px_rgba(15,23,42,0.7)] sm:rounded-2xl">
                <video className="aspect-video w-full object-cover" src="/bnsoo1.mp4" autoPlay muted loop playsInline aria-label="Budget Ndio Story civic footage" />
                <div className="pointer-events-none absolute inset-0 bg-black/40" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-[10px] text-slate-100 sm:bottom-4 sm:left-4 sm:right-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">Budget Ndio Story · 2026</p>
                    <p className="text-[10px] text-slate-300 sm:text-[11px]">Stories from wards, barazas and civic spaces.</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 sm:px-3 sm:py-1 sm:text-[11px]">Youth civic hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LandingSection>

      {/* ── 2. THE INSIGHT GRID (REDONE) ─────────────────────────────────── */}
      <LandingSection id="insights" contained className="border-y border-border/20">
        <InsightGrid />
      </LandingSection>

      {/* ── 3. THE HUB MODULES (REDONE) ──────────────────────────────────── */}
      <LandingSection id="modules" contained variant="muted">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">
            <Shield className="w-3 h-3" />
            Core Infrastructure
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.05]">Designed for impact, <br className="hidden md:block"/>not just information.</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">Every module is built to translate complex billion-shilling documents into clear pathways for community action.</p>
        </div>
        <HubModuleSection />
      </LandingSection>

      {/* ── 4. LIVE FEED & STORY (REDONE) ────────────────────────────────── */}
      <LandingSection id="the-pulse" contained>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-start">
          <div className="space-y-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Latest Insights</p>
              <h2 className="text-4xl font-bold mb-6">Real-time reports for real-time citizens.</h2>
              <p className="text-muted-foreground max-w-xl">Stay ahead of the budget calendar. Our analytical hub processes document data as it drops from Treasury.</p>
            </div>
            
            <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
               {latestVideo && !videoError ? (
                  <FeaturedYouTubeVideo video={latestVideo} loading={videoLoading} />
                ) : (
                  <div className="aspect-video w-full bg-black flex items-center justify-center p-8">
                    <Button asChild variant="outline" size="lg" className="rounded-full border-white/20 text-white">
                      <a href={podcastUrl} target="_blank" rel="noopener noreferrer">
                        Watch Latest Episode <ArrowUpRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}
            </div>
          </div>
          
          <div className="lg:pt-24">
            <ActivityFeed />
            <div className="mt-8 p-8 rounded-[2rem] bg-indigo-500 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <Zap className="w-12 h-12" />
              </div>
              <p className="text-lg font-bold mb-2">Join the Action</p>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">Submit reports from your ward directly to our tracking board.</p>
              <Button size="sm" className="rounded-full bg-white text-indigo-500 hover:bg-white/90">Submit Report</Button>
            </div>
          </div>
        </div>
      </LandingSection>

      {/* ── 5. FAQ (KEPT AS-IS) ────────────────────────────────────────────── */}
      <LandingSection id="faq" contained variant="muted">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-1/3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Knowledge Base</p>
            <h2 className="text-4xl font-bold mb-6">FAQ.</h2>
            <p className="text-muted-foreground mb-8">Quick answers to help you navigate the civic hub.</p>
            <Button asChild variant="link" className="p-0 h-auto text-primary font-bold">
              <a href="mailto:info@budgetndiostory.org" className="flex items-center gap-2">
                Need more help? Contact us <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
          <div className="lg:w-2/3">
            <AnimatedFAQ items={faqItems} />
          </div>
        </div>
      </LandingSection>

      {/* ── 6. DONATE (KEPT AS-IS) ────────────────────────────────────────── */}
      <LandingSection id="donate" align="center" contained={false} className="!bg-black">
        <DonateSection variant="dark" />
      </LandingSection>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-border/40 bg-background text-center">
         <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
          © 2026 Budget Ndio Story · Consortium of Storytellers
        </p>
      </footer>
    </div>
  );
}
