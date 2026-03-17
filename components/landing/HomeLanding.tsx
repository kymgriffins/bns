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
  Quote,
  Folder,
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

function getYouTubePlayerConfig(url: string) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');

    // Playlist embed
    const list = u.searchParams.get('list');
    if (list) {
      return {
        embedUrl: `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(list)}`,
        videoId: null as string | null,
      };
    }

    // Video embed (watch?v= or youtu.be/<id>)
    const v = u.searchParams.get('v');
    if (v) {
      return {
        embedUrl: `https://www.youtube.com/embed/${encodeURIComponent(v)}`,
        videoId: v,
      };
    }

    if (host === 'youtu.be') {
      const id = u.pathname.replace('/', '').trim();
      if (id) {
        return {
          embedUrl: `https://www.youtube.com/embed/${encodeURIComponent(id)}`,
          videoId: id,
        };
      }
    }

    // Fallback: don't embed unknown types (channels, handles, etc.)
    return null;
  } catch {
    return null;
  }
}

function FeaturedYouTubePlayer({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const config = getYouTubePlayerConfig(url);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!config) return null;

  const thumbnail = config.videoId
    ? `https://i.ytimg.com/vi/${encodeURIComponent(config.videoId)}/hqdefault.jpg`
    : null;

  return (
    <div className="relative aspect-video w-full bg-black/90">
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group relative h-full w-full overflow-hidden text-left"
          aria-label="Play featured video"
        >
          {thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt=""
              className="h-full w-full object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.25),transparent_55%)]" />
          )}

          <div className="pointer-events-none absolute inset-0 bg-black/35" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg transition-transform duration-200 ease-out group-hover:scale-[1.03]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                <Play className="h-4 w-4 translate-x-[0.5px]" />
              </span>
              Play
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 text-[11px] text-white/85 sm:bottom-4 sm:left-4 sm:right-4 sm:text-xs">
            <p className="min-w-0 truncate font-medium">{title}</p>
            <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 font-semibold text-white/90 backdrop-blur-sm">
              YouTube
            </span>
          </div>
        </button>
      ) : (
        <iframe
          className="h-full w-full"
          src={`${config.embedUrl}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}
    </div>
  );
}

const statistics = [
  { value: 10, suffix: ' years', label: 'Budget Reports Analyzed', icon: FileText },
  { value: 15000, suffix: '+', label: 'Kenyans Reached', icon: Users },
  { value: 47, suffix: '', label: 'Counties Covered', icon: MapPin },
  { value: 20, suffix: '+', label: 'Partner Organizations', icon: Handshake },
];

const howItWorks = [
  {
    step: '01',
    title: "Learn how Kenya's budget works",
    description:
      'Start at the civic hub: BPS 2026 basics and Millicent Makini’s summary—who decides, key documents, and where you show up.',
    icon: GraduationCap,
    href: '/civic-hub',
    badge: 'Civic hub',
  },
  {
    step: '02',
    title: 'Skim human reports',
    description:
      'Browse national, county and sector briefs written in plain language, not just legalese.',
    icon: BookOpen,
    href: '/reports',
    badge: 'Reports',
  },
  {
    step: '03',
    title: 'Show up in civic windows',
    description:
      'Use timelines, prompts and templates to act at barazas, hearings and other public participation moments.',
    icon: BarChart3,
    href: '/insights',
    badge: 'Act',
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
    title: 'Learn at the civic hub',
    description: 'BPS 2026 basics + Millicent Makini’s summary—decode the budget, quiz & reflections.',
    href: '/civic-hub',
    badge: 'Civic hub',
  },
  {
    title: 'Track county delivery',
    description: 'Check if projects your leaders promised are actually funded and moving.',
    href: '/tracker',
    badge: 'Tracker',
  },
  {
    title: 'Share a budget story',
    description: "Tell us what you're seeing in your ward—wins, gaps and broken promises.",
    href: '/take-action',
    badge: 'Stories',
  },
  {
    title: 'Get simplified briefs',
    description: 'Ask for plain-language explainers instead of 200-page PDFs.',
    href: '/reports',
    badge: 'Reports',
  },
  {
    title: 'Join civic updates',
    description: 'Get SMS and email nudges before key budget dates and hearings.',
    href: '/subscribe',
    badge: 'Alerts',
  },
];

/** Learn page modules – matches /learn for civic hub fake UI */
const civicHubLearnModules = [
  {
    id: 'budget-101',
    title: 'Budget 101',
    subtitle: 'Interactive',
    href: '/civic-hub/budget-101',
    minutes: 12,
    mediaType: 'video',
    mediaSrc: '/bnsoo1.mp4',
  },
  {
    id: 'budget-cycle',
    title: 'Budget Policy: The Data',
    subtitle: 'BPS 2026 · Data-first explainer',
    href: '/civic-hub/budget-cycle',
    minutes: 12,
    mediaType: 'link',
  },
  {
    id: 'roles',
    title: 'Public Advanced Learning 001',
    subtitle: "Reflecting on Kenya's 2026 BPS",
    href: '/civic-hub/roles',
    minutes: 10,
    mediaType: 'link',
  },
];

const MAX_MEDIA_ITEMS = 12;
const MEDIA_SCROLL_AMOUNT = 280; // roughly one card width

const testimonials = [
  {
    id: 1,
    name: 'Amina Ochieng',
    role: 'Youth Civic Leader, Nairobi',
    quote: 'Budget Ndio Story helped me understand how our county allocates funds. I now speak confidently at barazas.',
    avatar: 'AO',
  },
  {
    id: 2,
    name: 'David Mwangi',
    role: 'University Student, Kenyatta University',
    quote: 'The budget explainers made complex finance simple. I shared what I learned with my campus club.',
    avatar: 'DM',
  },
  {
    id: 3,
    name: 'Grace Atieno',
    role: 'Community Organizer, Kisumu',
    quote: 'Finally, a platform that breaks down government budgets into language we can understand and act on.',
    avatar: 'GA',
  },
];

const mediaPlaylist = [
  {
    id: 'bnsvideo-local-1',
    title: 'BNS Civic Reel 01',
    description: 'Wards, barazas and civic spaces across Kenya.',
    type: 'local' as const,
    src: '/bnsoo1.mp4',
  },
  {
    id: 'bnsvideo-local-2',
    title: 'BNS Civic Reel 02',
    description: 'Budget stories from youth spaces and campuses.',
    type: 'local' as const,
    src: '/bnsoo1.mp4',
  },
  {
    id: 'bnsvideo-local-3',
    title: 'BNS Civic Reel 03',
    description: 'Clips you can remix for TikTok and IG.',
    type: 'local' as const,
    src: '/bnsoo1.mp4',
  },
  {
    id: 'youtube-bps-playlist-1',
    title: 'BPS 2026 Explainers',
    description: 'Playlist breaking down the Budget Policy Statement.',
    type: 'youtube' as const,
    playlistId: 'PLxQxw7G6EOZ8WVD5JxYzCmT3ApKUie3N', // Example: Replace with actual playlist ID
  },
  {
    id: 'youtube-bps-playlist-2',
    title: 'Budget Cycle Series',
    description: 'From planning to audit in short episodes.',
    type: 'youtube' as const,
    playlistId: 'PLxQxw7G6EOZ9M_2YxQzJmT3ApKUie3N', // Example: Replace with actual playlist ID
  },
  {
    id: 'youtube-bps-playlist-3',
    title: 'County Stories',
    description: 'County-specific reels and explainers.',
    type: 'youtube' as const,
    playlistId: 'PLxQxw7G6EOZ7K_LmR8N_mT3ApKUie3N', // Example: Replace with actual playlist ID
  },
  // Add more entries here as new videos go live
];

/** Civic hub illustration: 4.3T, inflation %, fun fact. Promise → funded → delivered. */
function BudgetStoryIllustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 280 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      className="size-full text-primary-foreground/25"
      {...props}
    >
      {/* Central hub + main stat */}
      <circle cx="140" cy="100" r="32" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <circle cx="140" cy="100" r="24" fill="currentColor" opacity="0.08" />
      <text x="140" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor" opacity="0.75">4.3T</text>
      {/* Three nodes with micro labels */}
      <g opacity="0.9">
        <circle cx="72" cy="56" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="72" cy="56" r="6" fill="currentColor" opacity="0.5" />
        <path d="M86 68 L118 88" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <text x="72" y="48" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.65">6.2%</text>
      </g>
      <g opacity="0.9">
        <circle cx="208" cy="56" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="208" cy="56" r="6" fill="currentColor" opacity="0.5" />
        <path d="M194 68 L162 88" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <text x="208" y="48" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.65">BETA</text>
      </g>
      <g opacity="0.9">
        <circle cx="140" cy="168" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="140" cy="168" r="6" fill="currentColor" opacity="0.5" />
        <path d="M140 154 L140 124" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <text x="140" y="182" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.65">47</text>
      </g>
      {/* Fun fact badge below center */}
      <rect x="94" y="118" width="92" height="22" rx="11" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.25" />
      <text x="140" y="133" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.7">Fun fact: 47 counties</text>
      {/* Doc/chart hint */}
      <rect x="126" y="92" width="28" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M130 101h8M130 105h14" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

/** Civic hub promo card: short copy, clear alignment, sweet on mobile. */
function CivicHubCard() {
  return (
    <div className="relative flex min-h-0 flex-col overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-xl md:h-full md:min-h-[340px] md:flex-row">
      {/* Content column – reduced wording, aligned */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-between gap-3 p-4 sm:gap-4 sm:p-5 md:max-w-[55%] md:gap-5 md:p-8">
        <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
          <p className="text-[11px] uppercase tracking-[0.25em] opacity-80">
            Civic hub · 2026
          </p>
          <p className="text-sm font-semibold leading-snug sm:text-base md:text-lg lg:text-xl">
            Promised, funded & delivered—in one place.
          </p>
          <p className="text-xs leading-snug opacity-85 sm:text-sm">
            Budget lines, timelines & community voices. Hold power to account with receipts.
          </p>
          <ul className="space-y-1 text-xs opacity-90 sm:text-sm">
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary-foreground/60" />
              BPS 2026: purpose, timeline, BETA
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary-foreground/60" />
              Revenue & debt (Ksh 3.6T → 4.7T)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary-foreground/60" />
              Quiz & reflection lab
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary-foreground/60" />
              Tracker, insights & take-action
            </li>
          </ul>
          <div className="flex flex-wrap items-center gap-1.5 text-xs opacity-90 sm:gap-2">
            <span className="rounded-full bg-primary-foreground/10 px-2.5 py-0.5 sm:px-3 sm:py-1">47 counties</span>
            <span className="rounded-full bg-primary-foreground/10 px-2.5 py-0.5 sm:px-3 sm:py-1">Sector explainers</span>
            <span className="rounded-full bg-primary-foreground/10 px-2.5 py-0.5 sm:px-3 sm:py-1">Story prompts</span>
          </div>
        </div>
        <div className="mt-2 flex flex-shrink-0 items-end sm:mt-3 md:mt-4">
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="w-full rounded-full bg-primary-foreground text-primary shadow-md sm:w-auto"
          >
            <Link href="/civic-hub" className="inline-flex items-center justify-center">
              Open civic hub
              <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
      {/* Illustration: 4.3T, inflation %, fun fact – scales on all devices */}
      <div className="relative flex min-h-[120px] flex-1 items-center justify-center overflow-hidden sm:min-h-[160px] md:min-h-0 md:min-w-0">
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-transparent md:from-primary md:via-transparent md:to-transparent"
          aria-hidden
        />
        <div className="relative flex h-full w-full items-center justify-center px-3 py-4 sm:px-4 sm:py-6 md:justify-end md:items-end md:py-0 md:pr-6 md:pb-4">
          <div className="h-full max-h-[140px] w-full max-w-[200px] sm:max-h-[180px] sm:max-w-[240px] md:absolute md:bottom-4 md:right-4 md:h-[240px] md:max-h-[70%] md:w-[300px] md:max-w-[90%]">
            <BudgetStoryIllustration className="size-full" />
          </div>
        </div>
      </div>
    </div>
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
    role: 'Media lab & civic storytelling',
  },
  {
    name: 'Colour Twist Media',
    logo: 'CTM',
    image: 'https://colortwistmedia.co.ke/wp-content/uploads/2024/08/logo.png',
    website: 'https://colortwistmedia.co.ke',
    role: 'Creative studio & content',
  },
  {
    name: 'Sen Media & Events',
    logo: 'SME',
    image: '/senmedia.png',
    website: 'https://senmedia-events.co.ke',
    role: 'Events, community & organizing',
  },
];

export function HomeLanding() {
  const [activeHowStep, setActiveHowStep] = useState<typeof howItWorks[number]>(howItWorks[0]);
  const mediaScrollRef = useRef<HTMLDivElement | null>(null);
  const siteNoteStamp = new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date());

  // Fetch latest video from YouTube channel
  const { videos: latestVideos, loading: videoLoading, error: videoError } = useYouTubeVideos(1);
  const latestVideo = latestVideos.length > 0 ? latestVideos[0] : null;

  const scrollMedia = (direction: 'left' | 'right') => {
    const el = mediaScrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -MEDIA_SCROLL_AMOUNT : MEDIA_SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const el = mediaScrollRef.current;
    if (!el) return;
    // If there are enough items, nudge so the current one feels between two others
    if (mediaPlaylist.slice(0, MAX_MEDIA_ITEMS).length > 2) {
      el.scrollTo({ left: MEDIA_SCROLL_AMOUNT, behavior: 'auto' });
    }
  }, []);

  return (
    <>
      <LandingCursor />
      {/* Sections render in layout main scroll container so navbar stays visible */}
      {/* Landing hero view: hero (gradient + content) then marquee bar directly below */}
      <LandingSection id="hero" variant="dark" contained size="hero">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl" />
          </div>
          <div className="relative flex min-h-0 flex-1 flex-col justify-center">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-8 lg:gap-10">
              <div className="space-y-4 md:space-y-5">
                <p className="badge-minimal text-[10px] uppercase tracking-[0.25em] text-white/80 sm:text-xs">
                  Kenya · Budget Ndio Story
                </p>
                <h1 className="text-hero-2026 font-semibold leading-tight text-white">
                  See where Kenya&apos;s budget really goes.
                </h1>
                <p className="max-w-xl text-xs text-white/90 sm:text-sm md:text-base">
                  A civic hub for young Kenyans to follow the money—from Treasury ceilings to county
                  projects and the stories behind every shilling.
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-white px-4 text-sm font-semibold text-[var(--hero-bg)] hover:bg-white/95 focus-visible:ring-white/50 sm:px-6 sm:text-base"
                  >
                    <Link href="/civic-hub">
                      Enter the civic hub
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border-[rgba(255,255,255,0.5)] bg-transparent px-4 text-sm font-medium text-white hover:bg-white/15 hover:border-white/60 focus-visible:ring-white/40 sm:px-6 sm:text-base"
                  >
                    <Link href="/tracker">Track delivery</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-white/85 sm:gap-4 sm:text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Live for 47 counties</span>
                  </div>
                  <span className="hidden h-4 w-px bg-white/50 md:inline-block" aria-hidden="true" />
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Nairobi · Kisumu · Mombasa · Eldoret
                  </span>
                </div>
              </div>

              <div className="relative flex items-center">
                <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-black shadow-[0_18px_60px_rgba(15,23,42,0.7)] sm:rounded-2xl">
                  <video
                    className="aspect-video w-full object-cover"
                    src="/bnsoo1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label="Budget Ndio Story civic footage"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-[10px] text-slate-100 sm:bottom-4 sm:left-4 sm:right-4 sm:gap-3 sm:text-xs">
                    <div className="min-w-0">
                      <p className="font-semibold truncate">Budget Ndio Story · 2026</p>
                      <p className="text-[10px] text-slate-300 sm:text-[11px]">
                        Stories from wards, barazas and civic spaces.
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 sm:px-3 sm:py-1 sm:text-[11px]">
                      Youth civic hub
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LandingSection>

        {/* Marquee — white bar just below hero gradient; part of landing hero view */}
        <LandingSection size="bar" variant="muted" id="marquee" contained>
          <Marquee pauseOnHover className="py-1" duration="20s">
            <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                New
              </span>
              <span className="font-medium">Civic hub is live</span>
              <span className="text-muted-foreground">
                BPS 2026 basics + Millicent Makini’s summary—decode the budget, quiz & reflections.
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
        </LandingSection>

        {/* Podcast series (YouTube) */}
        <ScrollSection animation={scrollFadeUpXs} className="h-full min-h-full snap-start">
          <LandingSection id="podcast" variant="muted" contained>
            <div className="grid min-h-0 flex-1 gap-6 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-center md:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="order-2 relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:order-1"
              >
                <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />

                <div className="relative">
                  {/* Dynamic YouTube video - fetches latest from channel */}
                  {latestVideo && !videoError ? (
                    <FeaturedYouTubeVideo
                      video={latestVideo}
                      loading={videoLoading}
                    />
                  ) : getYouTubePlayerConfig(podcastUrl) ? (
                    <FeaturedYouTubePlayer
                      url={podcastUrl}
                      title="Budget Ndio Story podcast on YouTube"
                    />
                  ) : (
                    <div className="flex aspect-video w-full items-center justify-center bg-black/90 p-6 text-center">
                      <div className="max-w-md space-y-3">
                        <p className="text-sm font-semibold text-white">Podcast series on YouTube</p>
                        <p className="text-xs text-white/70">
                          Add a direct YouTube video or playlist URL to{' '}
                          <span className="font-medium">NEXT_PUBLIC_YOUTUBE_PODCAST_URL</span> to show the player here.
                        </p>
                        <a
                          href={podcastUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-white/90"
                        >
                          Open on YouTube <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Latest Video
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold">
                        {latestVideo?.title || 'Budget Ndio Story · Latest Episode'}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button asChild size="sm" className="rounded-full">
                        <a href={podcastUrl} target="_blank" rel="noopener noreferrer">
                          Watch on YouTube <ArrowUpRight className="ml-1.5 h-4 w-4" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="rounded-full">
                        <Link href="/media-hub">More media</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                className="order-1 space-y-4 md:order-2"
              >
                <SectionHeader
                  label="Podcast"
                  title="Budget talk — in real time."
                  description="One featured episode. Built for sharing."
                />
                <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Site note · {siteNoteStamp}
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        BNS-001 · The 5 Trillion Shilling Question
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        National Infrastructure Fund · public finance & governance.
                      </p>
                    </div>
                    <div className="hidden shrink-0 md:flex items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                        LIVE
                      </span>
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                        ~45 min
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {/* Compact hero data point */}
                    <div className="grid gap-3 rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                            Proposed fund size
                          </p>
                          <div className="mt-1 flex items-baseline gap-2">
                            <motion.p
                              initial={{ opacity: 0, y: 6 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                              className="text-2xl font-semibold tracking-tight"
                            >
                              KSh 5T
                            </motion.p>
                            <p className="text-xs font-semibold text-muted-foreground">(~$38B)</p>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            The question is not “can we build?” — it’s “who holds the key?”
                          </p>
                        </div>
                        <div className="hidden sm:flex flex-col items-end gap-2">
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                            Intermediate
                          </span>
                          <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                            Kenya
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Marketing vs mechanics', tone: 'bg-muted' },
                          { label: 'Participation paradox', tone: 'bg-muted' },
                          { label: 'Safaricom test', tone: 'bg-muted' },
                        ].map((t) => (
                          <span
                            key={t.label}
                            className={`rounded-full ${t.tone} px-3 py-1 text-[11px] font-semibold text-foreground/80`}
                          >
                            {t.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Governance mini scorecard */}
                    <div className="space-y-2">
                      {[
                        { label: 'Public participation', value: 0.28 },
                        { label: 'Parliament oversight', value: 0.34 },
                        { label: 'Audit access', value: 0.22 },
                      ].map((m, idx) => (
                        <div key={m.label} className="grid grid-cols-[110px_1fr_40px] items-center gap-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {m.label}
                          </p>
                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${Math.round(m.value * 100)}%` }}
                              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
                              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 + idx * 0.06 }}
                              className="h-full rounded-full bg-gradient-to-r from-primary/90 to-sky-500/80"
                            />
                          </div>
                          <p className="text-xs font-semibold text-foreground/70">
                            {Math.round(m.value * 100)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        In one line
                      </p>
                      <p className="text-xs text-muted-foreground">
                        “No more debt” pitch — but governance decides whether it helps youth.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </LandingSection>
        </ScrollSection>

        {/* Budget story – fixed height, responsive */}
        <ScrollSection animation={scrollFadeUp} className="h-full min-h-full snap-start">
          <LandingSection id="budget-story" contained>
            <div className="grid min-h-0 flex-1 gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-stretch md:gap-10">
              <div className="space-y-4 md:space-y-5">
                <SectionHeader
                  label="Budget Ndio Story"
                  title="Follow the money as a story, not a spreadsheet."
                  description="Scroll through the national, county and people stories to see how budgets move—and where citizens can show up."
                />
                <div className="space-y-4">
                  {budgetStoryChapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="group flex gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted/50"
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
              <CivicHubCard />
            </div>
          </LandingSection>
        </ScrollSection>

        {/* How it works – fixed height, responsive */}
        <ScrollSection animation={scrollFadeUpSm} className="h-full min-h-full snap-start">
          <LandingSection id="how-it-works" variant="muted" contained>
            <div className="grid min-h-0 flex-1 gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-stretch md:gap-10">
              <div className="space-y-6">
                <SectionHeader
                  label="How it works"
                  title="From confused to confident in three steps."
                  description="Hover each step to see what it looks like in the app, then click to jump in."
                />
                <div className="space-y-3">
                  {howItWorks.map((item) => {
                    const isActive = activeHowStep.step === item.step;
                    return (
                      <button
                        key={item.step}
                        type="button"
                        onMouseEnter={() => setActiveHowStep(item)}
                        onFocus={() => setActiveHowStep(item)}
                        className={`group flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left transition-colors md:px-5 md:py-5 ${
                          isActive
                            ? 'border-primary bg-card'
                            : 'border-border bg-muted/30 hover:border-primary/60 hover:bg-muted/50'
                        }`}
                      >
                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                          {item.step}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                              {item.badge}
                            </span>
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-background text-[11px] text-muted-foreground">
                              <item.icon className="h-3 w-3" />
                            </span>
                          </div>
                          <p className="text-sm font-semibold md:text-base">{item.title}</p>
                          <p className="text-xs text-muted-foreground md:text-sm">
                            {item.description}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                            {item.step === '01'
                              ? 'Start Budget 101'
                              : item.step === '02'
                                ? 'Browse reports'
                                : 'See where to act'}
                            <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="hidden min-h-0 flex-col rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:flex md:h-full md:min-h-0 md:p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Live preview
                </p>
                <div className="relative mt-3 flex min-h-[180px] flex-col overflow-hidden rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-4 sm:min-h-[200px] md:mt-4 md:min-h-0 md:flex-1">
                  <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Step {activeHowStep.step} · {activeHowStep.badge}
                      </p>
                      <p className="truncate text-sm font-semibold md:text-base">{activeHowStep.title}</p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground">
                      Hover to switch
                    </span>
                  </div>
                  <div className="relative min-h-0 flex-1 w-full">
                    {/* Mobile: single dark panel full-width */}
                    <div className="relative h-full w-full md:hidden">
                      <div className="absolute inset-0 rounded-xl bg-[var(--hero-bg)] text-xs text-slate-100">
                        <div className="flex h-full flex-col justify-between p-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="h-1.5 w-16 rounded-full bg-slate-200" />
                              <span className="h-1.5 w-8 rounded-full bg-slate-600" />
                            </div>
                            <div className="space-y-1">
                              <span className="block h-1.5 w-24 rounded-full bg-slate-500" />
                              <span className="block h-1 w-20 rounded-full bg-slate-700" />
                            </div>
                          </div>
                          <div className="flex items-end justify-between gap-2">
                            <div className="space-y-1">
                              <span className="block h-10 w-1.5 rounded-full bg-sky-500" />
                              <span className="block h-6 w-1.5 rounded-full bg-sky-700" />
                            </div>
                            <div className="space-y-1">
                              <span className="block h-8 w-1.5 rounded-full bg-emerald-400" />
                              <span className="block h-4 w-1.5 rounded-full bg-emerald-700" />
                            </div>
                            <div className="space-y-1">
                              <span className="block h-6 w-1.5 rounded-full bg-blue-400" />
                              <span className="block h-3 w-1.5 rounded-full bg-blue-700" />
                            </div>
                            <span className="h-1.5 w-10 rounded-full bg-slate-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: two-panel preview */}
                    <div className="relative hidden h-full w-full md:block">
                      <div className="absolute inset-0 rounded-xl bg-[var(--hero-bg)]" />
                      <div className="relative z-10 grid h-full grid-cols-2 gap-3 p-4">
                        {/* Left panel: navigation */}
                        <div className="flex flex-col gap-3 rounded-xl bg-background/60 p-4 shadow-inner ring-1 ring-white/10">
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                              Live preview
                            </p>
                            <span className="text-[11px] font-medium text-muted-foreground">
                              Hover a step
                            </span>
                          </div>
                          <div className="space-y-2">
                            {howItWorks.map((item) => {
                              const isActive = activeHowStep.step === item.step;
                              return (
                                <button
                                  key={item.step}
                                  type="button"
                                  onMouseEnter={() => setActiveHowStep(item)}
                                  onFocus={() => setActiveHowStep(item)}
                                  className={
                                    `w-full rounded-xl border px-3 py-2 text-left transition ${
                                      isActive
                                        ? 'border-primary/60 bg-primary/10 text-primary'
                                        : 'border-border bg-background/70 hover:border-primary/40 hover:bg-background/80'
                                    }`
                                  }
                                >
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={
                                        `flex h-8 w-8 items-center justify-center rounded-xl ${
                                          isActive ? 'bg-primary/15 text-primary' : 'bg-muted/20 text-muted-foreground'
                                        }`
                                      }
                                    >
                                      <item.icon className="h-4 w-4" />
                                    </span>
                                    <div className="min-w-0">
                                      <p className="text-sm font-semibold leading-snug truncate">
                                        {item.title}
                                      </p>
                                      <p className="text-xs text-muted-foreground line-clamp-2">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right panel: detail */}
                        <div className="flex flex-col justify-between rounded-xl bg-background/60 p-4 shadow-inner ring-1 ring-white/10">
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                Step {activeHowStep.step} · {activeHowStep.badge}
                              </p>
                              <span className="text-[11px] font-medium text-muted-foreground">
                                Hover to switch
                              </span>
                            </div>
                            <h3 className="mt-3 text-sm font-semibold md:text-base">
                              {activeHowStep.title}
                            </h3>
                            <p className="mt-2 text-xs text-muted-foreground md:text-sm">
                              {activeHowStep.description}
                            </p>
                          </div>

                          <div className="grid gap-2 text-xs">
                            {activeHowStep.step === '01' ? (
                              <>
                                <div className="rounded-lg bg-white/5 p-3">
                                  <p className="font-semibold">Budget 101 snapshot</p>
                                  <p className="mt-1 text-muted-foreground">
                                    Quick bites: what budgets are, who decides, and how to follow the process.
                                  </p>
                                </div>
                                <div className="rounded-lg bg-white/5 p-3">
                                  <p className="font-semibold">Interactive quiz</p>
                                  <p className="mt-1 text-muted-foreground">
                                    Test your knowledge with short quizzes and easy explainer videos.
                                  </p>
                                </div>
                              </>
                            ) : activeHowStep.step === '02' ? (
                              <>
                                <div className="rounded-lg bg-white/5 p-3">
                                  <p className="font-semibold">Report highlights</p>
                                  <p className="mt-1 text-muted-foreground">
                                    Browse short briefs from national to county budgets—written for people, not auditors.
                                  </p>
                                </div>
                                <div className="rounded-lg bg-white/5 p-3">
                                  <p className="font-semibold">Filtered search</p>
                                  <p className="mt-1 text-muted-foreground">
                                    Sort by sector, county, or recent updates to stay on top of what matters to you.
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="rounded-lg bg-white/5 p-3">
                                  <p className="font-semibold">Action timeline</p>
                                  <p className="mt-1 text-muted-foreground">
                                    See upcoming hearings, public forums, and deadlines near you.
                                  </p>
                                </div>
                                <div className="rounded-lg bg-white/5 p-3">
                                  <p className="font-semibold">Ready-made templates</p>
                                  <p className="mt-1 text-muted-foreground">
                                    Use simple templates to submit comments, attendance, or questions to officials.
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={activeHowStep.href}
                    className="mt-4 shrink-0 inline-flex items-center gap-1 text-xs font-medium text-primary"
                  >
                    {activeHowStep.step === '01'
                      ? 'Jump into Budget 101'
                      : activeHowStep.step === '02'
                        ? 'Open reports hub'
                        : 'See where to act'}
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </LandingSection>
        </ScrollSection>

        {/* Civic hub band – fixed height, responsive */}
        <ScrollSection animation={scrollFadeUpSm} className="h-full min-h-full snap-start">
          <LandingSection id="civic-hub-band" variant="primary" contained className="py-16 md:py-20 lg:py-24">
            <div className="flex min-h-0 flex-1 flex-col justify-center gap-12 sm:gap-14 md:flex-row md:items-start md:justify-between md:gap-16 lg:gap-20">
              <div className="space-y-6 max-w-md">
                <h2 className="text-xl font-semibold leading-snug sm:text-2xl md:text-3xl text-primary-foreground">
                  One home for Kenya&apos;s budget and the stories behind it.
                </h2>
                <p className="text-sm text-primary-foreground/90 md:text-base">
                  Move from PDFs to people: track projects, share evidence, and get briefings designed for young
                  Kenyans—not auditors.
                </p>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="group mt-2 w-full rounded-full bg-primary-foreground text-primary shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] md:w-auto md:px-6"
                >
                  <Link href="/civic-hub">
                    Enter the civic hub
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>

              <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
                {civicHubLearnModules.filter((m) => m.mediaType === 'video').map((mod) => (
                  <Link
                    key={mod.id}
                    href={mod.href}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/20 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/30 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-primary"
                  >
                    <div className="relative aspect-video w-full">
                      {mod.mediaSrc && (
                        <video
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                          src={mod.mediaSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      )}
                      <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        {mod.minutes} min
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <p className="font-semibold text-primary-foreground md:text-slate-900">
                          {mod.title}
                        </p>
                        <p className="mt-1 text-sm text-primary-foreground/70 md:text-slate-600">
                          {mod.subtitle}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>Video snippet</span>
                        </span>
                        <span className="rounded-full bg-background/70 px-3 py-1 text-[11px] font-medium">
                          {mod.minutes} min
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                <div className="grid h-full flex-1 grid-rows-2 gap-6 lg:gap-8">
                  {civicHubLearnModules.filter((m) => m.mediaType !== 'video').map((mod) => (
                    <Link
                      key={mod.id}
                      href={mod.href}
                      className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-primary"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-primary-foreground md:text-slate-900">
                            {mod.title}
                          </p>
                          <span className="rounded-full bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                            {mod.minutes} min
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-primary-foreground/70 md:text-slate-600">
                          {mod.subtitle}
                        </p>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground/90 transition-transform duration-300 group-hover:translate-x-0.5 md:text-slate-700">
                        Open
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </LandingSection>
        </ScrollSection>

        {/* Latest reports – fixed height, responsive */}
        <ScrollSection animation={scrollFadeUpSm} className="h-full min-h-full snap-start">
          <LandingSection id="latest-reports" contained>
            <div className="flex min-h-0 flex-1 flex-col gap-6 sm:gap-8">
              <SectionHeader
                label="Latest"
                title="Where Kenya's money is going right now."
                description="A quick mix of national, sector and county briefs you can read in minutes."
                action={
                  <Button asChild variant="outline" size="sm" className="rounded-full px-5">
                    <Link href="/reports">
                      View all reports
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                }
              />
              <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
                {/* Featured latest report */}
                {latestReports[0] && (
                  <Link
                    href={latestReports[0].href}
                    className="group h-full rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md md:p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="rounded-full border border-border px-2.5 py-1">
                        {latestReports[0].category}
                      </span>
                      <span>{latestReports[0].date}</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-primary">
                        New
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <h3 className="text-sm font-semibold md:text-lg group-hover:text-primary">
                        {latestReports[0].title}
                      </h3>
                      <p className="text-xs text-muted-foreground md:text-base">
                        {latestReports[0].summary}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 font-medium text-primary">
                        Read brief
                        <ChevronRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                      <span className="hidden rounded-full bg-background/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground md:inline-flex">
                        Featured
                      </span>
                    </div>
                  </Link>
                )}

                {/* Timeline for the rest */}
                <div className="relative">
                  <div className="absolute inset-y-2 left-0 hidden w-px bg-border/60 md:block" aria-hidden="true" />
                  <div className="space-y-1 md:pl-3">
                    {latestReports.slice(1).map((report) => (
                      <Link
                        key={report.title}
                        href={report.href}
                        className="group relative block rounded-lg py-3 transition-all duration-200 hover:bg-background/60 md:hover:pl-1 md:py-4"
                      >
                        <div className="absolute left-[-7px] top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-background md:block">
                          <span className="block h-2 w-2 rounded-full bg-primary/70" />
                        </div>
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                            <span className="rounded-full border border-border px-3 py-1">
                              {report.category}
                            </span>
                            <span>{report.date}</span>
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium md:text-base md:group-hover:translate-x-0.5 md:group-hover:text-primary transition-colors transition-transform duration-200">
                              {report.title}
                            </p>
                            <p className="text-xs text-muted-foreground md:text-sm">
                              {report.summary}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                            Read brief
                            <ChevronRight className="h-3 w-3 transition-transform duration-200 md:group-hover:translate-x-0.5" />
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

        {/* Partners – Led by storytellers (premium dark cards, carousel) */}
        <ScrollSection animation={scrollFadeUpXs} className="h-full min-h-full snap-start">
          <LandingSection id="partners" size="full" variant="default" contained={false} className="overflow-hidden p-0">
            <div className="relative flex min-h-0 flex-1 flex-col">
              {/* Hero strip – dark block, white text */}
              <div className="bg-[var(--hero-bg)] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
                <div className="container-2026 mx-auto max-w-5xl">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                    Led by storytellers
                  </p>
                  <h2 className="mb-6 max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
                    A Kenya-wide consortium at the intersection of media, data and organizing.
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                    Budget Ndio Story is led by <span className="font-medium text-white">The Continental Pot</span>,{' '}
                    <span className="font-medium text-white">Colour Twist Media</span>, and{' '}
                    <span className="font-medium text-white">Sen Media &amp; Events</span>. Together, they build
                    formats that make Kenya&apos;s public finance feel human—so young people can see themselves in the
                    story, not just the spreadsheets.
                  </p>
                </div>
              </div>

              {/* Light band – Consortium snapshot */}
              <div className="bg-background px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
                <div className="container-2026 mx-auto max-w-5xl">
                  {/* Consortium snapshot – single dark card, stats like testimonial block */}
                  <div className="overflow-hidden rounded-2xl bg-[var(--hero-bg)] px-6 py-8 shadow-lg sm:px-10 sm:py-10 md:flex md:items-center md:justify-between md:gap-8">
                    <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 md:mb-0">
                      Consortium snapshot
                    </p>
                    <div className="flex flex-wrap items-center gap-8 sm:gap-12 md:gap-16">
                      <div>
                        <p className="text-3xl font-semibold tabular-nums text-white sm:text-4xl">3</p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/60">Founding labs</p>
                        <p className="text-xs text-white/50">storyteller studios</p>
                      </div>
                      <div className="h-12 w-px bg-white/20" aria-hidden />
                      <div>
                        <p className="text-3xl font-semibold tabular-nums text-white sm:text-4xl">100+</p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/60">Room to grow</p>
                        <p className="text-xs text-white/50">future partners</p>
                      </div>
                      <div className="h-12 w-px bg-white/20" aria-hidden />
                      <div>
                        <p className="text-base font-semibold text-white sm:text-lg">Media · Data · Organizing</p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/60">Focus</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Constant carousel – infinite, aligned, no gaps (duplicate items for dense loop) */}
              <div className="relative w-full overflow-hidden pb-12 md:pb-16">
                <Marquee pauseOnHover duration="200s" repeat={10} gap="2rem" className="py-4">
                  {[...partners, ...partners, ...partners].map((partner, index) => (
                    <a
                      key={`${partner.name}-${index}`}
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-[260px] shrink-0 flex-col items-center gap-3 transition-opacity duration-200 hover:opacity-80 text-center"
                    >
                      <div className="flex h-14 w-full items-center justify-center">
                        {partner.image ? (
                          <img
                            src={partner.image}
                            alt={partner.name}
                            className="max-h-9 w-full max-w-[180px] object-contain object-center opacity-90 transition-transform duration-200 group-hover:scale-[1.02]"
                          />
                        ) : (
                          <span className="text-sm font-semibold text-primary">
                            {partner.logo}
                          </span>
                        )}
                      </div>
                      <div className="w-full text-center">
                        <p className="truncate font-semibold text-foreground">{partner.name}</p>
                        <p className="mt-0.5 truncate text-sm text-muted-foreground">{partner.role}</p>
                      </div>
                    </a>
                  ))}
                </Marquee>
              </div>
            </div>
          </LandingSection>
        </ScrollSection>

        {/* Donate – full-bleed darkest black section */}
        <LandingSection id="donate" align="center" contained={false} className="!bg-black">
          <div className="flex min-h-0 w-full flex-1 flex-col justify-center">
            <DonateSection variant="dark" />
          </div>
        </LandingSection>
    </>
  );
}
