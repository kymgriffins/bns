'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BarChart3,
  MapPin,
  Users,
  FileText,
  Handshake,
  ChevronRight,
  GraduationCap,
  Play,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { DonateSection } from '@/components/donate-section';
import { Marquee } from '@/components/shadcn-space/animations/marquee';
import { SectionHeader } from '@/components/layout';
import { ScrollSection } from '@/components/scroll';
import { LandingCursor } from './LandingCursor';
import { LandingSection } from './LandingSection';
import { FeaturedYouTubeVideo } from '@/components/youtube/YouTubeVideoCard';
import { useYouTubeVideos } from '@/hooks/useYouTube';

const podcastUrl =
  process.env.NEXT_PUBLIC_YOUTUBE_PODCAST_URL || 'https://www.youtube.com/@BudgetNdioStory';

// ─── Helpers ────────────────────────────────────────────────────────────────

function getYouTubePlayerConfig(url: string) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    const list = u.searchParams.get('list');
    if (list) return { embedUrl: `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(list)}`, videoId: null as string | null };
    const v = u.searchParams.get('v');
    if (v) return { embedUrl: `https://www.youtube.com/embed/${encodeURIComponent(v)}`, videoId: v };
    if (host === 'youtu.be') {
      const id = u.pathname.replace('/', '').trim();
      if (id) return { embedUrl: `https://www.youtube.com/embed/${encodeURIComponent(id)}`, videoId: id };
    }
    return null;
  } catch { return null; }
}

function FeaturedYouTubePlayer({ url, title }: { url: string; title: string }) {
  const config = getYouTubePlayerConfig(url);
  const [playing, setPlaying] = useState(false);
  if (!config) return null;
  const thumb = config.videoId ? `https://i.ytimg.com/vi/${config.videoId}/hqdefault.jpg` : null;
  return (
    <div className="relative aspect-video w-full bg-black/90">
      {!playing ? (
        <button type="button" onClick={() => setPlaying(true)} className="group relative h-full w-full overflow-hidden" aria-label="Play">
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumb} alt="" className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_55%)]" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg transition-transform duration-200 group-hover:scale-[1.03]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                <Play className="h-4 w-4 translate-x-[0.5px]" />
              </span>
              Play
            </span>
          </div>
          <p className="absolute bottom-3 left-3 right-3 truncate text-[11px] font-medium text-white/85 sm:bottom-4 sm:left-4">{title}</p>
        </button>
      ) : (
        <iframe className="h-full w-full" src={`${config.embedUrl}?rel=0&modestbranding=1&playsinline=1&autoplay=1`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      )}
    </div>
  );
}

// ─── Animated counter for the stats strip ───────────────────────────────────

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
        const duration = 1600;
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const cur = Math.round(eased * value);
          if (el) el.textContent = value >= 1000 ? `${Math.round(cur / 1000)}K${suffix}` : `${cur}${suffix}`;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix]);

  const initial = value >= 1000 ? `0K${suffix}` : `0${suffix}`;
  return <span ref={ref}>{initial}</span>;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const statistics = [
  { value: 10,    suffix: ' yrs', label: 'Budget Reports Analyzed' },
  { value: 15000, suffix: '+',    label: 'Kenyans Reached'         },
  { value: 47,    suffix: '',     label: 'Counties Covered'        },
  { value: 20,    suffix: '+',    label: 'Partner Organizations'   },
];

const howItWorks = [
  {
    step: '01',
    title: "Learn how Kenya's budget works",
    description: 'BPS 2026 basics, who decides, and where you show up.',
    icon: GraduationCap,
    href: '/learn',
    badge: 'Learn',
    cta: 'Start Budget 101',
  },
  {
    step: '02',
    title: 'Read human-first reports',
    description: 'National, county and sector briefs in plain language.',
    icon: BookOpen,
    href: '/reports',
    badge: 'Reports',
    cta: 'Browse reports',
  },
  {
    step: '03',
    title: 'Show up in civic windows',
    description: 'Templates and timelines for barazas, hearings and forums.',
    icon: BarChart3,
    href: '/reports',
    badge: 'Act',
    cta: 'See where to act',
  },
];

const latestReports = [
  { title: 'FY 2025/26 Budget at a Glance',  category: 'National',         date: 'Feb 2025', summary: 'Key highlights from the national budget reading',         href: '/reports' },
  { title: 'Health Sector Budget Analysis',   category: 'Sector Analysis',  date: 'Jan 2025', summary: 'Where healthcare funding is going and what it means',      href: '/reports' },
  { title: 'Nairobi County Budget Brief',     category: 'County',           date: 'Dec 2024', summary: 'Understanding the city budget for residents',               href: '/reports' },
];

const budgetStoryChapters = [
  { id: 1, label: 'National story', title: 'From Treasury to your county.',        description: 'How the national budget is set and how decisions ripple into county ceilings.' },
  { id: 2, label: 'County story',   title: 'Promises, projects, ward priorities.', description: 'What your county funded in health, education and infrastructure.' },
  { id: 3, label: 'People story',   title: 'Stories behind every shilling.',       description: 'Videos and briefs that follow budgets into clinics, classrooms and roads.' },
];

const civicHubLearnModules = [
  { id: 'budget-101',   title: 'Budget 101',                   subtitle: 'Interactive',                  href: '/learn/budget-101',   minutes: 12, mediaType: 'video', mediaSrc: '/bnsoo1.mp4' },
  { id: 'budget-cycle', title: 'Budget Policy: The Data',      subtitle: 'BPS 2026 · Data-first',        href: '/learn/budget-cycle', minutes: 12, mediaType: 'link'  },
  { id: 'roles',        title: 'Public Advanced Learning 001', subtitle: "Reflecting on Kenya's 2026 BPS", href: '/learn/roles',      minutes: 10, mediaType: 'link'  },
];

const partners = [
  { name: 'The Continental Pot', logo: 'TCP', image: 'https://continentalpot.africa/wp-content/uploads/2025/02/The-Continental-Pot-Vertical.png', website: 'https://continentalpot.africa',    role: 'Media lab & civic storytelling'  },
  { name: 'Colour Twist Media',  logo: 'CTM', image: 'https://colortwistmedia.co.ke/wp-content/uploads/2024/08/logo.png',                         website: 'https://colortwistmedia.co.ke',  role: 'Creative studio & content'       },
  { name: 'Sen Media & Events',  logo: 'SME', image: '/senmedia.png',                                                                               website: 'https://senmedia-events.co.ke',  role: 'Events, community & organizing'  },
];

// ─── Civic hub card ──────────────────────────────────────────────────────────

function BudgetStoryIllustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 280 200" preserveAspectRatio="xMidYMid meet" aria-hidden focusable="false" className="size-full text-primary-foreground/25" {...props}>
      <circle cx="140" cy="100" r="32" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <circle cx="140" cy="100" r="24" fill="currentColor" opacity="0.08" />
      <text x="140" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor" opacity="0.75">4.3T</text>
      <g opacity="0.9"><circle cx="72" cy="56" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="72" cy="56" r="6" fill="currentColor" opacity="0.5" /><path d="M86 68 L118 88" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" /><text x="72" y="48" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.65">6.2%</text></g>
      <g opacity="0.9"><circle cx="208" cy="56" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="208" cy="56" r="6" fill="currentColor" opacity="0.5" /><path d="M194 68 L162 88" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" /><text x="208" y="48" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.65">BETA</text></g>
      <g opacity="0.9"><circle cx="140" cy="168" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="140" cy="168" r="6" fill="currentColor" opacity="0.5" /><path d="M140 154 L140 124" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" /><text x="140" y="182" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.65">47</text></g>
      <rect x="94" y="118" width="92" height="22" rx="11" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.25" />
      <text x="140" y="133" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.7">Fun fact: 47 counties</text>
    </svg>
  );
}

function CivicHubCard() {
  return (
    <div className="relative flex min-h-0 flex-col overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-xl md:h-full md:min-h-[340px] md:flex-row">
      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-between gap-4 p-6 md:max-w-[55%] md:p-8">
        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.25em] opacity-70">Civic hub · 2026</p>
          <p className="text-base font-semibold leading-snug md:text-lg">Promised, funded and delivered — in one place.</p>
          <ul className="space-y-2 text-xs opacity-85 sm:text-sm">
            {['BPS 2026: purpose, timeline, BETA', 'Revenue & debt (Ksh 3.6T → 4.7T)', 'Quiz & reflection lab', 'Tracker, insights & take-action'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 shrink-0 rounded-full bg-primary-foreground/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Button asChild size="sm" variant="secondary" className="w-full rounded-full bg-primary-foreground text-primary sm:w-auto">
          <Link href="/learn" className="inline-flex items-center justify-center">Open Learn <ArrowRight className="ml-2 h-3 w-3" /></Link>
        </Button>
      </div>
      <div className="relative flex min-h-[120px] flex-1 items-center justify-center overflow-hidden sm:min-h-[160px] md:min-h-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-transparent md:from-primary md:via-transparent md:to-transparent" aria-hidden />
        <div className="relative h-full w-full max-w-[240px] px-4 py-6 sm:max-w-[280px] md:absolute md:bottom-4 md:right-4 md:h-[240px] md:w-[300px] md:max-w-full md:p-0">
          <BudgetStoryIllustration className="size-full" />
        </div>
      </div>
    </div>
  );
}

// ─── Easing presets ──────────────────────────────────────────────────────────

const fadeUp   = { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 } };
const fadeUpSm = { from: { opacity: 0, y: 28 }, to: { opacity: 1, y: 0 } };
const fadeUpXs = { from: { opacity: 0, y: 18 }, to: { opacity: 1, y: 0 } };

// ─── Page ────────────────────────────────────────────────────────────────────

export function HomeLanding() {
  const { videos: latestVideos, loading: videoLoading, error: videoError } = useYouTubeVideos(1);
  const latestVideo = latestVideos[0] ?? null;

  return (
    <>
      <LandingCursor />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
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
                    <p className="truncate font-semibold">Budget Ndio Story · 2026</p>
                    <p className="text-[10px] text-slate-300 sm:text-[11px]">Stories from wards, barazas and civic spaces.</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 sm:px-3 sm:py-1 sm:text-[11px]">Youth civic hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LandingSection>

      {/* ── 2. MARQUEE ───────────────────────────────────────────────────── */}
      <LandingSection size="bar" variant="muted" id="marquee" contained>
        <Marquee pauseOnHover className="py-1" duration="20s">
          <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
            <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">New</span>
            <span className="font-medium">Civic hub is live</span>
            <span className="text-muted-foreground">BPS 2026 basics — decode the budget, quiz & reflections.</span>
          </div>
          <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
            <span className="rounded-full bg-secondary px-3 py-1 font-medium text-foreground/80">Creators</span>
            <span className="font-medium">Visual budget stories for TikTok, IG & YouTube</span>
          </div>
          <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
            <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">Civic windows</span>
            <span className="font-medium">Track key dates in Kenya's budget calendar</span>
          </div>
        </Marquee>
      </LandingSection>

      {/* ── 3. STATS STRIP — the premium moment ──────────────────────────── */}
      {/* Full-bleed dark section. Four animated numbers count up on scroll.  */}
      {/* This is the single "holy shit" beat that earns the page credibility. */}
     

      {/* ── 4. PODCAST ───────────────────────────────────────────────────── */}
      {/* One video. Three lines of copy. One CTA. Nothing else.             */}
      <ScrollSection animation={fadeUpXs} className="h-full min-h-full snap-start">
        <LandingSection id="podcast" variant="muted" contained>
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {latestVideo && !videoError ? (
                <FeaturedYouTubeVideo video={latestVideo} loading={videoLoading} />
              ) : getYouTubePlayerConfig(podcastUrl) ? (
                <FeaturedYouTubePlayer url={podcastUrl} title="Budget Ndio Story podcast on YouTube" />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center bg-black/90 p-6 text-center">
                  <a href={podcastUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black">
                    Open on YouTube <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              )}
              <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-5 sm:py-4">
                <p className="min-w-0 truncate text-sm font-semibold">
                  {latestVideo?.title ?? 'Budget Ndio Story · Latest Episode'}
                </p>
                <Button asChild size="sm" className="shrink-0 rounded-full">
                  <a href={podcastUrl} target="_blank" rel="noopener noreferrer">
                    YouTube <ArrowUpRight className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
              className="space-y-6"
            >
              <SectionHeader
                label="Podcast"
                title="Budget talk — in real time."
                description="One episode per week. Built for sharing. From Treasury decisions to what they mean for your ward."
              />
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link href="/media-hub">More episodes <ChevronRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </motion.div>
          </div>
        </LandingSection>
      </ScrollSection>

      {/* ── 5. BUDGET STORY ──────────────────────────────────────────────── */}
      <ScrollSection animation={fadeUp} className="h-full min-h-full snap-start">
        <LandingSection id="budget-story" contained>
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-stretch md:gap-12">
            <div className="space-y-8">
              <SectionHeader
                label="Budget Ndio Story"
                title="Follow the money as a story, not a spreadsheet."
                description="Scroll through the national, county and people stories — see how budgets move and where citizens show up."
              />
              <div className="space-y-3">
                {budgetStoryChapters.map((chapter) => (
                  <div key={chapter.id} className="flex gap-4 rounded-2xl border border-border bg-card px-4 py-4 transition-colors hover:bg-muted/40">
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                      {chapter.id.toString().padStart(2, '0')}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{chapter.label}</p>
                      <p className="text-sm font-semibold md:text-base">{chapter.title}</p>
                      <p className="text-xs text-muted-foreground">{chapter.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <CivicHubCard />
          </div>
        </LandingSection>
      </ScrollSection>

      {/* ── 6. HOW IT WORKS — 3-col grid, no redundant preview panel ────── */}
      {/* The original right-side "live preview" was a mirror of the steps.  */}
      {/* Steps are the product. Let them breathe on their own.              */}
      <ScrollSection animation={fadeUpSm} className="h-full min-h-full snap-start">
        <LandingSection id="how-it-works" variant="muted" contained>
          <div className="flex flex-1 flex-col gap-10 md:gap-14">
            <SectionHeader
              label="How it works"
              title="From confused to confident."
              description="Three steps to turn budget documents into civic action."
            />
            <div className="grid gap-5 sm:grid-cols-3 md:gap-8">
              {howItWorks.map((item) => (
                <Link
                  key={item.step}
                  href={item.href}
                  className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md md:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                      {item.step}
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {item.badge}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold leading-snug md:text-base">{item.title}</p>
                    <p className="text-xs text-muted-foreground md:text-sm">{item.description}</p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    {item.cta} <ChevronRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </LandingSection>
      </ScrollSection>

      {/* ── 7. CIVIC HUB BAND ────────────────────────────────────────────── */}
      <ScrollSection animation={fadeUpSm} className="h-full min-h-full snap-start">
        <LandingSection id="civic-hub-band" variant="primary" contained className="py-16 md:py-20 lg:py-28">
          <div className="flex min-h-0 flex-1 flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-16">
            <div className="max-w-md space-y-6">
              <h2 className="text-xl font-semibold leading-snug text-primary-foreground sm:text-2xl md:text-3xl">
                One home for Kenya's budget and the stories behind it.
              </h2>
              <p className="text-sm text-primary-foreground/85 md:text-base">
                Track projects, share evidence, and get briefings designed for young Kenyans — not auditors.
              </p>
              <Button asChild size="lg" variant="secondary" className="rounded-full bg-primary-foreground text-primary">
                <Link href="/learn">Enter Learn <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="grid w-full gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
              {civicHubLearnModules.filter((m) => m.mediaType === 'video').map((mod) => (
                <Link key={mod.id} href={mod.href} className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md transition-all duration-300 hover:bg-white/25 hover:shadow-xl">
                  <div className="relative aspect-video w-full">
                    {mod.mediaSrc && (
                      <video className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" src={mod.mediaSrc} autoPlay muted loop playsInline />
                    )}
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">{mod.minutes} min</span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
                    <div>
                      <p className="font-semibold text-primary-foreground">{mod.title}</p>
                      <p className="mt-1 text-sm text-primary-foreground/65">{mod.subtitle}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-foreground/80 transition-transform duration-300 group-hover:translate-x-0.5">
                      Open <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
              <div className="grid grid-rows-2 gap-5 lg:gap-6">
                {civicHubLearnModules.filter((m) => m.mediaType !== 'video').map((mod) => (
                  <Link key={mod.id} href={mod.href} className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-primary-foreground">{mod.title}</p>
                        <span className="shrink-0 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{mod.minutes} min</span>
                      </div>
                      <p className="mt-2 text-sm text-primary-foreground/65">{mod.subtitle}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground/80 transition-transform duration-300 group-hover:translate-x-0.5">
                      Open <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </LandingSection>
      </ScrollSection>

      {/* ── 8. LATEST REPORTS ────────────────────────────────────────────── */}
      <ScrollSection animation={fadeUpSm} className="h-full min-h-full snap-start">
        <LandingSection id="latest-reports" contained>
          <div className="flex min-h-0 flex-1 flex-col gap-10">
            <SectionHeader
              label="Latest"
              title="Where Kenya's money is going."
              description="National, sector and county briefs you can read in minutes."
              action={
                <Button asChild variant="outline" size="sm" className="rounded-full px-5">
                  <Link href="/reports">View all <ArrowRight className="ml-2 h-3 w-3" /></Link>
                </Button>
              }
            />
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
              {latestReports[0] && (
                <Link href={latestReports[0].href} className="group h-full rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md md:p-6">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="rounded-full border border-border px-2.5 py-1">{latestReports[0].category}</span>
                    <span>{latestReports[0].date}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-primary">New</span>
                  </div>
                  <div className="mt-5 space-y-2">
                    <h3 className="text-sm font-semibold group-hover:text-primary md:text-lg">{latestReports[0].title}</h3>
                    <p className="text-xs text-muted-foreground md:text-base">{latestReports[0].summary}</p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Read brief <ChevronRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )}
              <div className="relative">
                <div className="absolute inset-y-2 left-0 hidden w-px bg-border/50 md:block" aria-hidden />
                <div className="space-y-1 md:pl-4">
                  {latestReports.slice(1).map((report) => (
                    <Link key={report.title} href={report.href} className="group relative block rounded-lg py-3 transition-all duration-200 hover:bg-background/60 md:py-4">
                      <div className="absolute left-[-7px] top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-background md:block">
                        <span className="block h-2 w-2 rounded-full bg-primary/70" />
                      </div>
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                          <span className="rounded-full border border-border px-3 py-1">{report.category}</span>
                          <span>{report.date}</span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium md:text-base md:group-hover:text-primary transition-colors">{report.title}</p>
                          <p className="text-xs text-muted-foreground">{report.summary}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                          Read brief <ChevronRight className="h-3 w-3 md:group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </LandingSection>
      </ScrollSection>

      {/* ── 9. PARTNERS — dark intro + marquee only ───────────────────────── */}
      {/* The consortium snapshot card was noise. The story tells itself.    */}
      <ScrollSection animation={fadeUpXs} className="h-full min-h-full snap-start">
        <LandingSection id="partners" size="full" variant="default" contained={false} className="overflow-hidden p-0">
          <div className="bg-[var(--hero-bg)] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24">
            <div className="mx-auto max-w-5xl">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">Led by storytellers</p>
              <h2 className="max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
                A Kenya-wide consortium at the intersection of media, data and organizing.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
                Budget Ndio Story is led by The Continental Pot, Colour Twist Media, and Sen Media & Events — building formats that make Kenya's public finance feel human.
              </p>
            </div>
          </div>
          <div className="relative w-full overflow-hidden bg-background py-10 md:py-14">
            <Marquee pauseOnHover duration="160s" repeat={10} gap="3rem" className="py-4">
              {[...partners, ...partners, ...partners].map((partner, i) => (
                <a key={`${partner.name}-${i}`} href={partner.website} target="_blank" rel="noopener noreferrer" className="group flex w-[240px] shrink-0 flex-col items-center gap-3 text-center transition-opacity duration-200 hover:opacity-70">
                  <div className="flex h-12 w-full items-center justify-center">
                    {partner.image ? (
                      <img src={partner.image} alt={partner.name} className="max-h-8 w-full max-w-[160px] object-contain opacity-80 transition-transform duration-200 group-hover:scale-[1.02]" />
                    ) : (
                      <span className="text-sm font-semibold text-primary">{partner.logo}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{partner.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{partner.role}</p>
                  </div>
                </a>
              ))}
            </Marquee>
          </div>
        </LandingSection>
      </ScrollSection>

      {/* ── 10. DONATE ───────────────────────────────────────────────────── */}
      <LandingSection id="donate" align="center" contained={false} className="!bg-black">
        <div className="flex min-h-0 w-full flex-1 flex-col justify-center">
          <DonateSection variant="dark" />
        </div>
      </LandingSection>
    </>
  );
}