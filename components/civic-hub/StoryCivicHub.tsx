"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

// Custom hook for swipe gestures
function useSwipeGesture(onSwipeLeft: () => void, onSwipeRight: () => void, enabled: boolean = true) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!enabled || touchStartX.current === null || touchStartY.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;
    
    // Only trigger if horizontal swipe is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }
    
    touchStartX.current = null;
    touchStartY.current = null;
  }, [enabled, onSwipeLeft, onSwipeRight]);

  return { handleTouchStart, handleTouchEnd };
}

type StoryModule = {
  id: string;
  num: string;
  title: string;
  desc: string;
  duration: string;
  slides: number;
  category: string;
  catColor: string;
  catBg: string;
  accentA: string;
  accentB: string;
  locked?: boolean;
  teacher: {
    name: string;
    role: string;
    avatar: string;
  };
};

type SlideType = "cover" | "concept" | "chapters" | "snapshot" | "pillars" | "risks" | "quiz" | "cta";

type QuizFeedback = {
  correct: string;
  wrong: string;
};

type QuizContent = {
  question: string;
  options: { letter: string; text: string }[];
  correct: number;
  feedback: QuizFeedback;
};

type SlideContent =
  | {
      tag: string;
      title: string;
      sub: string;
      promise: string;
    }
  | {
      tag: string;
      tagBg: string;
      tagColor: string;
      question: string;
      bullets: { dot: string; text: string }[];
      badge?: string;
    }
  | {
      headline: string;
      chapters: { num: string; label: string; name: string }[];
    }
  | {
      headline: string;
      divider1?: string;
      tiles1: { icon: string; val: string; label: string; accent?: string }[];
      debtNote?: string;
    }
  | {
      headline: string;
      sub: string;
      pillars: { emoji: string; title: string; desc: string; money: string }[];
    }
  | {
      headline: string;
      sub: string;
      risks: { icon: string; title: string; text: string }[];
      quote: string;
    }
  | QuizContent
  | {
      title: string;
      sub: string;
      actions: { icon: string; style: string; title: string; sub: string; onclickMsg: string }[];
    };

type StorySlide = {
  id: string;
  type: SlideType;
  bg: string;
  orbA?: string;
  orbB?: string;
  content: SlideContent;
  quizIdx?: number;
};

type ViewMode = "hub" | "module" | "stories";
type ActiveTab = "stories" | "learn" | "videos" | "quiz";

type ProgressState = {
  [moduleId: string]: {
    slide: number;
    completed?: boolean;
  };
};

type QuizState = {
  answered: boolean[];
  selectedIdx: (number | null)[];
};

// Hub Module Card Data
type HubModule = {
  id: string;
  num: string;
  title: string;
  desc: string;
  duration: string;
  category: string;
  catColor: string;
  catBg: string;
  level: "basic" | "advanced";
  slidesCount: number;
  lessonsCount: number;
  videosCount: number;
  quizCount: number;
  accentA: string;
  accentB: string;
  teacher: {
    name: string;
    role: string;
    avatar: string;
  };
  types: ("stories" | "learn" | "videos" | "quiz")[];
  locked?: boolean;
};

const MODULES_LIST: StoryModule[] = [
  {
    id: "bps-2026",
    num: "001",
    title: "Budget Policy Statement 2026",
    desc: "Understand how Kenya's budget roadmap works and exactly where you fit in. No jargon. 10 minutes.",
    duration: "10 min",
    slides: 12,
    category: "Budget Basics",
    catColor: "#E53E3E",
    catBg: "rgba(229,62,62,.15)",
    accentA: "#E53E3E",
    accentB: "#F5C842",
    teacher: {
      name: "Millicent Makini",
      role: "Budget Literacy Educator",
      avatar: "👩🏾‍💼",
    },
  },
  {
    id: "bps-2026-advanced",
    num: "002",
    title: "Reflecting on Kenya's 2026 Budget Policy Statement",
    desc: "Deep dive into BPS: BETA Agenda, debt analysis, fiscal risks and policy solutions. 20 minutes.",
    duration: "20 min",
    slides: 20,
    category: "Advanced",
    catColor: "#9F7AEA",
    catBg: "rgba(159,122,234,.15)",
    accentA: "#9F7AEA",
    accentB: "#38B2AC",
    teacher: {
      name: "Millicent Makini",
      role: "Budget Literacy Educator",
      avatar: "👩🏾‍💼",
    },
  },
  {
    id: "finance-bill",
    num: "003",
    title: "National Infrastructure Fund",
    desc: "The bill that changes what you pay. How to read it, track it, and respond to it. Coming soon.",
    duration: "15 min",
    slides: 0,
    category: "National",
    catColor: "#9F7AEA",
    catBg: "rgba(159,122,234,.15)",
    accentA: "#9F7AEA",
    accentB: "#F06060",
    teacher: {
      name: "Marcus Odhiambo",
      role: "Civic Rights Advocate",
      avatar: "👨🏾‍💼",
    },
    locked: true,
  },
];

// Hub Modules - For the new hub grid layout from HTML bible
const HUB_MODULES: HubModule[] = [
  {
    id: 'bps-2026',
    num: '001',
    title: 'The Budget Policy Statement 2026',
    level: 'basic',
    credits: 'Budget Ndio Story Team',
    desc: "Understand how Kenya's budget roadmap works and exactly where you fit in. No jargon. Plain language.",
    duration: '10 min',
    slidesCount: 12,
    lessonsCount: 5,
    videosCount: 3,
    quizCount: 4,
    category: 'Budget Basics',
    catColor: '#38B2AC',
    catBg: 'rgba(56,178,172,.12)',
    accentA: '#E53E3E',
    accentB: '#F5C842',
    teacher: { name: 'Wanjiru Kamau', role: 'Budget Literacy Educator', avatar: '👩🏾‍💼' },
    types: ['stories', 'learn', 'videos', 'quiz']
  },
  {
    id: 'bps-2026-advanced',
    num: '002',
    title: 'Reflecting on Kenya\'s 2026 Budget Policy Statement',
    level: 'advanced',
    credits: 'Millicent Makini',
    desc: "Decode the budget's secret, master the 5 BETA Agenda pillars, track the trillion-shilling debt, and understand fiscal risks.",
    duration: '25 min',
    slidesCount: 12,
    lessonsCount: 8,
    videosCount: 5,
    quizCount: 15,
    category: 'Advanced',
    catColor: '#9F7AEA',
    catBg: 'rgba(159,122,234,.12)',
    accentA: '#9F7AEA',
    accentB: '#F06060',
    teacher: { name: 'Millicent Makini', role: 'Budget & Policy Analyst', avatar: '👩🏾‍💻' },
    types: ['stories', 'learn', 'videos', 'quiz']
  },
  {
    id: 'finance-bill',
    num: '003',
    title: 'National Infrastructure Fund',
    level: 'basic',
    credits: 'Marcus Odhiambo',
    desc: 'The bill that changes what you pay. How to read it, track it, and respond to it. Coming soon.',
    duration: '15 min',
    slidesCount: 0,
    lessonsCount: 0,
    videosCount: 0,
    quizCount: 0,
    category: 'National',
    catColor: '#F06060',
    catBg: 'rgba(240,96,96,.12)',
    accentA: '#F06060',
    accentB: '#9F7AEA',
    teacher: { name: 'Marcus Odhiambo', role: 'Civic Rights Advocate', avatar: '👨🏾‍💼' },
    types: [],
    locked: true
  }
];

const BPS_SLIDES: StorySlide[] = [
  {
    id: "cover",
    type: "cover",
    bg: "bg-red",
    orbA: "rgba(229,62,62,.5)",
    orbB: "rgba(245,200,66,.3)",
    content: {
      tag: "Module 001 · Budget Basics",
      title: "Budget\nPolicy\n*Statement* 2026",
      sub: "How Kenya's budget roadmap works — and exactly where you fit in.",
      promise:
        "In the next 10 minutes, you'll understand how the government plans public money. No jargon. No confusion. Just the facts, in your language.",
    },
  },
  {
    id: "cover",
    type: "cover",
    bg: "bg-red",
    orbA: "rgba(229,62,62,.5)",
    orbB: "rgba(245,200,66,.3)",
    content: {
      tag: "Module 001 · Budget Basics",
      title: "Budget\nPolicy\n*Statement* 2026",
      sub: "How Kenya's budget roadmap works — and exactly where you fit in.",
      promise:
        "In the next 10 minutes, you'll understand how the government plans public money. No jargon. No confusion. Just the facts, in your language.",
    },
  },
  {
    id: "what-is-bps",
    type: "concept",
    bg: "bg-dark",
    orbA: "rgba(245,200,66,.3)",
    orbB: "rgba(56,178,172,.2)",
    content: {
      tag: "What is the BPS?",
      tagBg: "rgba(245,200,66,.15)",
      tagColor: "#F5C842",
      question: "Forget the complicated name.\nThe BPS is the government answering *3 questions* out loud:",
      bullets: [
        { dot: "#F5C842", text: "<strong>Where are we now?</strong> How's the economy actually doing?" },
        { dot: "#38B2AC", text: "<strong>Where do we want to go?</strong> What are our big goals for the year?" },
        { dot: "#9F7AEA", text: "<strong>How much will we need?</strong> And how will we get the money?" },
      ],
      badge:
        "🇰🇪 Kenya Context: BPS is the parent of every County Fiscal Strategy Paper (CFSP). Whatever BPS prioritises nationally — your county must align with it when planning local markets, health centres, and roads.",
    },
  },
  {
    id: "analogy",
    type: "concept",
    bg: "bg-gold",
    orbA: "rgba(245,200,66,.4)",
    orbB: "rgba(229,62,62,.2)",
    content: {
      tag: "Think of it this way",
      tagBg: "rgba(245,200,66,.2)",
      tagColor: "#F5C842",
      question: "The BPS is the *roadmap*.\nThe April Budget is the actual *trip.*",
      bullets: [
        {
          dot: "#F5C842",
          text: "Tabled in Parliament by <strong>February 15th</strong> every year",
        },
        {
          dot: "#F5C842",
          text: "Think of it as the government's <strong>term paper</strong> before the final exam (the April budget)",
        },
        {
          dot: "#F5C842",
          text: "Updates every year based on new economic data — like your <strong>maps app recalculating</strong>",
        },
        {
          dot: "#38B2AC",
          text: "Also sets <strong>budget ceilings</strong> for ministries so departments can't over-budget beyond what's available",
        },
      ],
    },
  },
  {
    id: "chapters",
    type: "chapters",
    bg: "bg-dark",
    orbA: "rgba(159,122,234,.35)",
    orbB: "rgba(245,200,66,.2)",
    content: {
      headline: "The 5 Core Chapters\nof every BPS",
      chapters: [
        { num: "1", label: "Vision", name: "Development Agenda" },
        { num: "2", label: "Reality", name: "Economic Outlook" },
        { num: "3", label: "Numbers", name: "Government Spending & Revenue" },
        { num: "4", label: "Counties", name: "Devolution Allocation" },
        { num: "5", label: "Risks", name: "Debt & Climate" },
      ],
    },
  },
  {
    id: "snapshot-spending",
    type: "snapshot",
    bg: "bg-dark",
    orbA: "rgba(229,62,62,.3)",
    orbB: "rgba(245,200,66,.2)",
    content: {
      headline: "BPS 2026 — The Numbers",
      divider1: "Budget",
      tiles1: [
        { icon: "💰", val: "KES 4.74T", label: "Total spending planned", accent: "accent-gold" },
        { icon: "📥", val: "KES 3.59T", label: "Revenue expected", accent: "accent-teal" },
        { icon: "📉", val: "KES 1.15T", label: "Fiscal deficit (gap)", accent: "accent-red" },
        { icon: "⚠️", val: "~KES 1.2T", label: "Debt interest — pre-committed", accent: "accent-purple" },
      ],
      debtNote:
        "That KES 1.2T debt interest? It's money that *can't go* to roads, teachers, or healthcare. It's already spoken for before Budget Day.",
    },
  },
  {
    id: "snapshot-counties",
    type: "snapshot",
    bg: "bg-teal",
    orbA: "rgba(56,178,172,.4)",
    orbB: "rgba(72,187,120,.2)",
    content: {
      headline: "Counties & Communities",
      divider1: "Devolution numbers",
      tiles1: [
        { icon: "🏛", val: "KES 420B", label: "County equitable share", accent: "accent-teal" },
        { icon: "🏥", val: "KES 3.24B", label: "Community Health Workers", accent: "accent-teal" },
        { icon: "🏭", val: "KES 3.25B", label: "Industrial Parks" },
        { icon: "⚖️", val: "KES 9.6B", label: "Equalisation Fund" },
      ],
    },
  },
  {
    id: "five-pillars",
    type: "pillars",
    bg: "bg-dark",
    orbA: "rgba(72,187,120,.3)",
    orbB: "rgba(56,178,172,.2)",
    content: {
      headline: "The 5 Pillars — what the\ngovernment is betting on",
      sub: "Each pillar has actual money attached. Find your tab.",
      pillars: [
        {
          emoji: "🌽",
          title: "Agriculture",
          desc: "Irrigation, crop diversification, improved agricultural value chain",
          money: "Funded priority",
        },
        {
          emoji: "🏪",
          title: "MSMEs (Small Business)",
          desc: "Hustler Fund expansion, NYOTA fund, business hubs in all 47 counties",
          money: "47 county hubs",
        },
        {
          emoji: "🏥",
          title: "Healthcare",
          desc: "Target: 35 million Kenyans covered by Universal Health Coverage + SHA",
          money: "35M target",
        },
        {
          emoji: "🏘",
          title: "Housing",
          desc: "Jobs in construction + affordable loans for homeownership",
          money: "Construction jobs",
        },
        {
          emoji: "💻",
          title: "Digital & Creative",
          desc: "Fibre internet + backing film, music, fashion, and the creative economy",
          money: "Creative economy",
        },
      ],
    },
  },
  {
    id: "infrastructure",
    type: "concept",
    bg: "bg-purple",
    orbA: "rgba(159,122,234,.4)",
    orbB: "rgba(245,200,66,.2)",
    content: {
      tag: "Infrastructure & Enablers",
      tagBg: "rgba(159,122,234,.18)",
      tagColor: "#9F7AEA",
      question: "Behind every pillar are the *systems* that make them work:",
      bullets: [
        { dot: "#9F7AEA", text: "More roads, railways, increased power connectivity, gas exploration" },
        {
          dot: "#9F7AEA",
          text: "<strong>National Infrastructure Fund</strong> — pooled money for big projects",
        },
        {
          dot: "#9F7AEA",
          text: "<strong>Sovereign Wealth Fund</strong> — savings from natural resources",
        },
      ],
      badge:
        "These are the government's five open tabs. If you're a farmer, a small business owner, an artist — this is where your opportunities live. Know which tab is yours.",
    },
  },
  {
    id: "risks",
    type: "risks",
    bg: "bg-red",
    orbA: "rgba(229,62,62,.4)",
    orbB: "rgba(245,200,66,.2)",
    content: {
      headline: "⚡ What Could Go Wrong?",
      sub: "This is mature budgeting. The government is literally listing what could break.",
      risks: [
        { icon: "🌪️", title: "Climate shocks", text: "Drought or floods cost unplanned emergency money" },
        { icon: "📉", title: "Revenue gaps", text: "If businesses struggle, tax collection drops" },
        { icon: "💸", title: "Debt pressure", text: "If the shilling weakens, foreign debt gets more expensive" },
        { icon: "🏛", title: "Devolution drama", text: "Counties' unpaid bills continue to pile up" },
      ],
      quote:
        "When you know the risks, you can <strong>spot them early and ask the right questions</strong> before crisis hits.",
    },
  },
  {
    id: "quiz-1",
    type: "quiz",
    bg: "bg-dark",
    orbA: "rgba(245,200,66,.3)",
    orbB: "rgba(56,178,172,.15)",
    quizIdx: 0,
    content: {
      question: "The BPS is best described as:",
      options: [
        { letter: "A", text: "The final, detailed list of every government project" },
        {
          letter: "B",
          text: "The government's strategic roadmap setting priorities and spending limits",
        },
        { letter: "C", text: "A tax collection manual" },
      ],
      correct: 1,
      feedback: {
        correct:
          "✓ Exactly! The BPS is the roadmap — priorities and ceilings — not the detailed project list. That comes later in the Estimates.",
        wrong:
          "Think roadmap, not project list. The BPS sets direction and spending limits. The detailed projects come in the Estimates of Revenue & Expenditure.",
      },
    },
  },
  {
    id: "quiz-2",
    type: "quiz",
    bg: "bg-dark",
    orbA: "rgba(245,200,66,.3)",
    orbB: "rgba(229,62,62,.15)",
    quizIdx: 1,
    content: {
      question:
        "In FY 2026/27, the government projects spending of KES 4.74T but revenue of only KES 3.59T. The KES 1.15T gap is called:",
      options: [
        { letter: "A", text: "A Surplus" },
        { letter: "B", text: "An Emergency Fund" },
        { letter: "C", text: "A Fiscal Deficit" },
      ],
      correct: 2,
      feedback: {
        correct:
          "✓ Correct. When spending exceeds revenue, that's a fiscal deficit. Kenya bridges it through borrowing — which is why the KES 1.2T debt interest figure matters so much.",
        wrong:
          "When a government spends more than it earns, that gap is a fiscal deficit — not a surplus (that's when you earn more), and not an emergency fund (that's a reserve).",
      },
    },
  },
  {
    id: "cta",
    type: "cta",
    bg: "bg-gold",
    orbA: "rgba(245,200,66,.5)",
    orbB: "rgba(56,178,172,.2)",
    content: {
      title: "You finished\n*Module 001.*",
      sub: "Budget Policy Statement 2026. You now know what the government is planning, what it's betting on, and what could go wrong.",
      actions: [
        {
          icon: "🔍",
          style: "cta-btn-primary",
          title: "Track the numbers",
          sub: "Check if projects match BPS priorities",
          onclickMsg: "Opening Budget Tracker →",
        },
        {
          icon: "🗳️",
          style: "cta-btn-teal",
          title: "Use your voice",
          sub: "Join public participation informed",
          onclickMsg: "Public participation dates →",
        },
        {
          icon: "🚀",
          style: "cta-btn-gold",
          title: "Monetise your talent",
          sub: "Creative economy = your next opportunity",
          onclickMsg: "Creative economy opportunities →",
        },
      ],
    },
  },
];

const ADVANCED_BPS_SLIDES: StorySlide[] = [
  {
    id: "adv-cover",
    type: "cover",
    bg: "bg-purple",
    orbA: "rgba(159,122,234,.5)",
    orbB: "rgba(56,178,172,.3)",
    content: {
      tag: "Module 002 · Advanced",
      title: "Reflecting on Kenya's 2026\n*Budget Policy Statement*",
      sub: "Deep dive into the BETA Agenda, trillion-shilling debt, and fiscal risks.",
      promise:
        "In the next 20 minutes, you'll master the BPS: understand the 5 pillars, analyze the big numbers, and form your own policy opinions.",
    },
  },
  {
    id: "adv-what-is-bps",
    type: "concept",
    bg: "bg-dark",
    orbA: "rgba(159,122,234,.3)",
    orbB: "rgba(245,200,66,.2)",
    content: {
      tag: "What is a Budget Policy Statement?",
      tagBg: "rgba(159,122,234,.15)",
      tagColor: "#9F7AEA",
      question: "The Budget Policy Statement (BPS) is a *government policy document* that sets out:",
      bullets: [
        { dot: "#9F7AEA", text: "<strong>Strategic priorities</strong> for national and county budgets" },
        { dot: "#38B2AC", text: "<strong>Economic assessments</strong> and growth forecasts" },
        { dot: "#F5C842", text: "<strong>Expenditure ceilings</strong> and revenue projections" },
        { dot: "#E53E3E", text: "<strong>Fiscal risks</strong> and responsibility principles" },
      ],
      badge:
        "📅 The BPS is submitted to Parliament by February 15th every year. It guides the County Fiscal Strategy Paper (CFSP) at county level.",
    },
  },
  {
    id: "adv-bps-2026-theme",
    type: "cover",
    bg: "bg-gold",
    orbA: "rgba(245,200,66,.5)",
    orbB: "rgba(56,178,172,.3)",
    content: {
      tag: "BPS 2026 Theme",
      title: "Consolidating Gains\n*Under the Bottom-Up*\nEconomic Transformation Agenda",
      sub: "For Inclusive and Sustainable Growth.",
      promise:
        "The BETA Agenda focuses on 5 key pillars: Agriculture, MSMEs, Healthcare, Housing, and Digital Economy.",
    },
  },
  {
    id: "adv-pillar-1",
    type: "pillars",
    bg: "bg-green",
    orbA: "rgba(72,187,120,.4)",
    orbB: "rgba(56,178,172,.2)",
    content: {
      headline: "Pillar 1: Agricultural Transformation",
      sub: "Prioritizing food security through:",
      pillars: [
        { emoji: "🌾", title: "Crop Diversification", desc: "Modernizing value chains, extension services", money: "KSh 12.5B" },
        { emoji: "💧", title: "Irrigation", desc: "Large-scale irrigation projects", money: "KSh 8.2B" },
        { emoji: "🛡️", title: "Agricultural Insurance", desc: "Crop and livestock protection schemes", money: "KSh 3.1B" },
        { emoji: "🚜", title: "Fertilizer Subsidies", desc: "Expanded access to affordable inputs", money: "KSh 6.8B" },
      ],
    },
  },
  {
    id: "adv-pillar-2",
    type: "pillars",
    bg: "bg-teal",
    orbA: "rgba(56,178,172,.4)",
    orbB: "rgba(159,122,234,.2)",
    content: {
      headline: "Pillar 2: Transforming MSMEs",
      sub: "Addressing structural constraints:",
      pillars: [
        { emoji: "💰", title: "Hustler Fund Expansion", desc: "Affordable credit for small businesses", money: "KSh 25B" },
        { emoji: "🤝", title: "Credit Guarantee Scheme", desc: "Reducing collateral requirements", money: "KSh 15B" },
        { emoji: "🏢", title: "MSME Hubs", desc: "Business mentorship in all 47 counties", money: "KSh 4.2B" },
        { emoji: "📈", title: "NYOTA Graduation", desc: "Linking beneficiaries to financial programs", money: "KSh 2.8B" },
      ],
    },
  },
  {
    id: "adv-pillar-3",
    type: "pillars",
    bg: "bg-red",
    orbA: "rgba(229,62,62,.4)",
    orbB: "rgba(245,200,66,.2)",
    content: {
      headline: "Pillar 3: Healthcare",
      sub: "Working towards Universal Health Coverage:",
      pillars: [
        { emoji: "🏥", title: "Social Health Authority", desc: "Targeting 35 million enrolled", money: "KSh 45B" },
        { emoji: "👩‍⚕️", title: "Community Health", desc: "Strengthening grassroots services", money: "KSh 8.5B" },
        { emoji: "🏗️", title: "Health Facilities", desc: "Building and equipping centers", money: "KSh 12.3B" },
        { emoji: "💻", title: "Digital Health Systems", desc: "Modernizing health records", money: "KSh 3.2B" },
      ],
    },
  },
  {
    id: "adv-pillar-4",
    type: "pillars",
    bg: "bg-purple",
    orbA: "rgba(159,122,234,.4)",
    orbB: "rgba(56,178,172,.2)",
    content: {
      headline: "Pillar 4: Housing & Settlement",
      sub: "Supporting affordable housing:",
      pillars: [
        { emoji: "🏠", title: "KMRC Support", desc: "Kenya Mortgage Refinance Company", money: "KSh 18B" },
        { emoji: "👷", title: "Construction Jobs", desc: "Creating employment in building sector", money: "KSh 8.5B" },
        { emoji: "🏙️", title: "Urban Renewal", desc: "Markets and urban development", money: "KSh 6.2B" },
        { emoji: "🏘️", title: "Affordable Housing", desc: "Social housing programs", money: "KSh 22B" },
      ],
    },
  },
  {
    id: "adv-pillar-5",
    type: "pillars",
    bg: "bg-teal",
    orbA: "rgba(56,178,172,.4)",
    orbB: "rgba(245,200,66,.2)",
    content: {
      headline: "Pillar 5: Digital Superhighway & Creative Economy",
      sub: "Building the digital future:",
      pillars: [
        { emoji: "📡", title: "Fibre Internet", desc: "Expanding connectivity nationwide", money: "KSh 15B" },
        { emoji: "📶", title: "Public Wi-Fi", desc: "Hotspots across the country", money: "KSh 3.5B" },
        { emoji: "🎬", title: "Creative Industries", desc: "Film, music, fashion, content", money: "KSh 5.2B" },
        { emoji: "👨‍💻", title: "Digital Skills", desc: "Youth training programs", money: "KSh 4.8B" },
      ],
    },
  },
  {
    id: "adv-economy-snapshot",
    type: "snapshot",
    bg: "bg-dark",
    orbA: "rgba(245,200,66,.3)",
    orbB: "rgba(72,187,120,.2)",
    content: {
      headline: "2025 Economic Performance",
      divider1: "Key Indicators",
      tiles1: [
        { icon: "📈", val: "5.0%", label: "GDP Growth", accent: "gold" },
        { icon: "📉", val: "4.2%", label: "Inflation Rate", accent: "teal" },
        { icon: "💵", val: "KSh 3.37T", label: "Revenue Collected", accent: "purple" },
        { icon: "⚠️", val: "KSh 933B", label: "Revenue Target Gap", accent: "red" },
      ],
    },
  },
  {
    id: "adv-budget-2026",
    type: "snapshot",
    bg: "bg-red",
    orbA: "rgba(229,62,62,.4)",
    orbB: "rgba(245,200,66,.2)",
    content: {
      headline: "FY 2026/27 Budget Projections",
      divider1: "The Big Numbers",
      tiles1: [
        { icon: "💰", val: "KSh 3.59T", label: "Total Revenue", accent: "gold" },
        { icon: "💸", val: "KSh 4.74T", label: "Total Expenditure", accent: "red" },
        { icon: "📊", val: "KSh 1.20T", label: "Interest Payments", accent: "purple" },
        { icon: "📉", val: "KSh 1.15T", label: "Fiscal Deficit", accent: "teal" },
      ],
    },
  },
  {
    id: "adv-debt-analysis",
    type: "risks",
    bg: "bg-dark",
    orbA: "rgba(229,62,62,.4)",
    orbB: "rgba(245,200,66,.2)",
    content: {
      headline: "The Trillion-Shilling Debt",
      sub: "Interest payments are the biggest budget pressure:",
      risks: [
        { icon: "💳", title: "KSh 1.2 Trillion", text: "Interest payments on public debt in 2026/27" },
        { icon: "📈", title: "27% of Revenue", text: "Goes just to paying interest on debt" },
        { icon: "🏦", title: "KSh 924 Billion", text: "Domestic borrowing to cover deficit" },
        { icon: "🌍", title: "KSh 225.5 Billion", text: "Foreign borrowing required" },
      ],
      quote: "When interest payments consume nearly a third of revenue, there's less money for roads, schools, and hospitals.",
    },
  },
  {
    id: "adv-county-allocations",
    type: "snapshot",
    bg: "bg-teal",
    orbA: "rgba(56,178,172,.4)",
    orbB: "rgba(159,122,234,.2)",
    content: {
      headline: "County Government Allocations",
      divider1: "FY 2026/27",
      tiles1: [
        { icon: "🏛️", val: "KSh 420B", label: "Total County Share", accent: "teal" },
        { icon: "➕", val: "+KSh 5B", label: "Increase from 2025/26", accent: "gold" },
        { icon: "🤝", val: "KSh 75.7B", label: "Additional Allocations", accent: "purple" },
        { icon: "⚖️", val: "KSh 9.6B", label: "Equalization Fund", accent: "gold" },
      ],
    },
  },
  {
    id: "adv-fiscal-risks",
    type: "risks",
    bg: "bg-red",
    orbA: "rgba(229,62,62,.5)",
    orbB: "rgba(245,200,66,.2)",
    content: {
      headline: "Fiscal Risks to Watch",
      sub: "What could derail the budget?",
      risks: [
        { icon: "📊", title: "Public Debt Risk", text: "Rising debt levels, interest rate pressures, exchange rate volatility" },
        { icon: "⚠️", title: "Contingent Liabilities", text: "Government guarantees, SOE obligations, PPP commitments" },
        { icon: "📉", title: "Macroeconomic Risks", text: "Lower growth, revenue shortfalls, global uncertainty" },
        { icon: "🌍", title: "Climate Risks", text: "Droughts, floods, food insecurity, infrastructure damage" },
        { icon: "🏛️", title: "Devolution Risks", text: "County fiscal pressures, pending bills" },
      ],
      quote: "Climate change alone could cost Kenya billions in emergency relief and agricultural losses.",
    },
  },
  {
    id: "adv-quiz-1",
    type: "quiz",
    bg: "bg-purple",
    quizIdx: 1,
    content: {
      question: "What is the main purpose of the Budget Policy Statement (BPS)?",
      options: [
        { letter: "A", text: "To collect taxes from citizens" },
        { letter: "B", text: "To guide how national and county governments prepare their budgets" },
        { letter: "C", text: "To replace the national development plan" },
        { letter: "D", text: "To approve all government projects" },
      ],
      correct: 1,
      feedback: {
        correct: "✅ Correct! The BPS sets strategic priorities that guide budget preparation at both national and county levels.",
        wrong: "❌ Not quite. The BPS guides budget preparation, not tax collection or project approval.",
      },
    },
  },
  {
    id: "adv-quiz-2",
    type: "quiz",
    bg: "bg-gold",
    quizIdx: 2,
    content: {
      question: "By law, when must the BPS be submitted to Parliament?",
      options: [
        { letter: "A", text: "January 1st" },
        { letter: "B", text: "February 15th" },
        { letter: "C", text: "March 30th" },
        { letter: "D", text: "April 30th" },
      ],
      correct: 1,
      feedback: {
        correct: "✅ Correct! The BPS must be submitted by February 15th each year per Section 25 of the PFM Act.",
        wrong: "❌ Not quite. The deadline is February 15th - any later would be a legal violation.",
      },
    },
  },
  {
    id: "adv-quiz-3",
    type: "quiz",
    bg: "bg-teal",
    quizIdx: 3,
    content: {
      question: "Which agenda guides the development priorities in the 2026 BPS?",
      options: [
        { letter: "A", text: "Vision 2030" },
        { letter: "B", text: "Bottom-Up Economic Transformation Agenda (BETA)" },
        { letter: "C", text: "East African Development Strategy" },
        { letter: "D", text: "National Industrial Policy" },
      ],
      correct: 1,
      feedback: {
        correct: "✅ Correct! The BETA (Bottom-Up Economic Transformation Agenda) is the guiding framework for the 2026 BPS.",
        wrong: "❌ Not quite. It's the BETA Agenda - focusing on the bottom-up approach to economic transformation.",
      },
    },
  },
  {
    id: "adv-quiz-4",
    type: "quiz",
    bg: "bg-green",
    quizIdx: 4,
    content: {
      question: "When government spending exceeds revenue, this is called:",
      options: [
        { letter: "A", text: "Fiscal surplus" },
        { letter: "B", text: "Fiscal deficit" },
        { letter: "C", text: "Monetary balance" },
        { letter: "D", text: "Public investment" },
      ],
      correct: 1,
      feedback: {
        correct: "✅ Correct! A fiscal deficit means the government must borrow to cover the spending gap.",
        wrong: "❌ Not quite. A deficit is when spending exceeds revenue - the opposite of a surplus.",
      },
    },
  },
  {
    id: "adv-quiz-5",
    type: "quiz",
    bg: "bg-red",
    quizIdx: 5,
    content: {
      question: "Interest payments on debt projected at KSh 1.2 trillion could lead to:",
      options: [
        { letter: "A", text: "Reduced funds for development and social services" },
        { letter: "B", text: "Lower tax collection" },
        { letter: "C", text: "Faster economic growth" },
        { letter: "D", text: "Reduced public borrowing" },
      ],
      correct: 0,
      feedback: {
        correct: "✅ Correct! When interest payments take 27% of revenue, there's less money for services.",
        wrong: "❌ Not quite. High interest payments mean less money available for development projects and services.",
      },
    },
  },
  {
    id: "adv-cta",
    type: "cta",
    bg: "bg-purple",
    orbA: "rgba(159,122,234,.5)",
    orbB: "rgba(56,178,172,.3)",
    content: {
      title: "You've Completed\n*Advanced BPS 2026*",
      sub: "Now you understand Kenya's budget roadmap, the BETA pillars, and fiscal challenges. What's your take?",
      actions: [
        { icon: "💬", style: "cta-btn-teal", title: "Share Your Opinion", sub: "What policy would you change?", onclickMsg: "Opening feedback form →" },
        { icon: "📱", style: "cta-btn-gold", title: "Challenge a Friend", sub: "Test their budget knowledge", onclickMsg: "Sharing module link →" },
        { icon: "🏛️", style: "cta-btn-primary", title: "Take Action", sub: "Contact your county assembly", onclickMsg: "Finding representatives →" },
      ],
    },
  },
];

const PROGRESS_KEY = "bns_progress_stories";
const THEME_KEY = "bns_theme_stories";

function loadProgress(): ProgressState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressState;
  } catch {
    return {};
  }
}

function saveProgress(progress: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

function loadTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  const v = window.localStorage.getItem(THEME_KEY);
  return v === "light" ? "light" : "dark";
}

function saveTheme(theme: "dark" | "light") {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEME_KEY, theme);
}

export function StoryCivicHub() {
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme();

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [viewMode, setViewMode] = useState<ViewMode>("hub");
  const [activeTab, setActiveTab] = useState<ActiveTab>("stories");
  const [progress, setProgress] = useState<ProgressState>({});
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>({
    answered: [false, false],
    selectedIdx: [null, null],
  });
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: "" });

  // Get current hub module
  const currentHubModule = useMemo(
    () => HUB_MODULES.find((m) => m.id === activeModuleId) ?? HUB_MODULES[0],
    [activeModuleId]
  );

  const activeModule = useMemo(
    () => MODULES_LIST.find((m) => m.id === (activeModuleId ?? "bps-2026")) ?? MODULES_LIST[0],
    [activeModuleId],
  );

  const currentSlides = activeModule.id === "bps-2026-advanced" ? ADVANCED_BPS_SLIDES : BPS_SLIDES;
  const totalSlides = currentSlides.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModuleId) return;
      
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleTapRight();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        exitToMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModuleId, slideIdx, quizState]);

  useEffect(() => {
    const storedTheme = loadTheme();
    setTheme(storedTheme);
    if (storedTheme !== nextTheme && (storedTheme === "dark" || storedTheme === "light")) {
      setNextTheme(storedTheme);
    }
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
    setProgress(loadProgress());
  }, [nextTheme, setNextTheme]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    saveTheme(theme);
    if (theme !== nextTheme && (theme === "dark" || theme === "light")) {
      setNextTheme(theme);
    }
  }, [theme, nextTheme, setNextTheme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  function updateProgress(newSlide: number, completed?: boolean) {
    setProgress((prev) => {
      const current = prev[activeModule.id] ?? { slide: 0, completed: false };
      const nextItem = {
        slide: Math.max(current.slide, newSlide),
        completed: completed ?? current.completed,
      };
      const next = { ...prev, [activeModule.id]: nextItem };
      saveProgress(next);
      return next;
    });
  }

  function startModule(id: string) {
    const m = MODULES_LIST.find((mm) => mm.id === id) ?? MODULES_LIST[0];
    setActiveModuleId(m.id);
    const existing = progress[m.id];
    const startAt = existing && !existing.completed ? Math.min(existing.slide, totalSlides - 1) : 0;
    setSlideIdx(startAt);
  }

  function exitToMenu() {
    setActiveModuleId(null);
  }

  function showToast(msg: string) {
    setToast({ show: true, msg });
    window.setTimeout(() => {
      setToast((prev) => (prev.msg === msg ? { show: false, msg: "" } : prev));
    }, 2600);
  }

  function handleTapRight() {
    const slide = currentSlides[slideIdx];
    if (slide.type === "quiz" && typeof slide.quizIdx === "number") {
      if (!quizState.answered[slide.quizIdx]) {
        showToast("Answer the question first!");
        return;
      }
    }
    goNext();
  }

  function goNext() {
    if (slideIdx >= totalSlides - 1) return;
    const next = slideIdx + 1;
    setSlideIdx(next);
    updateProgress(next);
  }

  function goPrev() {
    if (slideIdx <= 0) return;
    const prev = slideIdx - 1;
    setSlideIdx(prev);
    updateProgress(prev);
  }

  function goToSlide(idx: number) {
    if (idx < 0 || idx >= totalSlides) return;
    setSlideIdx(idx);
    updateProgress(idx);
  }

  function completeModule() {
    updateProgress(totalSlides - 1, true);
    showToast("Module completed ✓");
    exitToMenu();
  }

  function answerQuiz(qi: number, idx: number) {
    const slide = currentSlides.find((s) => s.quizIdx === qi);
    if (!slide || slide.type !== "quiz" || quizState.answered[qi]) return;

    setQuizState((prev) => {
      const answered = [...prev.answered];
      const selectedIdx = [...prev.selectedIdx];
      answered[qi] = true;
      selectedIdx[qi] = idx;
      return { answered, selectedIdx };
    });
  }

  const currentSlide = currentSlides[slideIdx];

  const slideCounterLabel = `${slideIdx + 1}/${totalSlides}`;

  const slideBars = currentSlides.map((_, i) => {
    if (i < slideIdx) return 100;
    if (i === slideIdx) return 100;
    return 0;
  });

  // Swipe gesture handlers
  const swipeHandlers = useSwipeGesture(
    () => handleTapRight(), // swipe left = next
    () => goPrev(), // swipe right = prev
    !!activeModuleId
  );

  return (
    <>
      <div className="civic-shell" id="shell">
        {/* Module select screen */}
        {!activeModuleId && (
          <div className="civic-module-screen">
            <div className="civic-ms-top">
              <div className="civic-ms-logo">
                <div className="relative h-8 w-28">
                  <Image src="/logo.svg" alt="Budget Ndio Story" fill className="object-contain" />
                </div>
              </div>
              <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <Link href="/" style={{ fontSize: 12, color: "var(--ch-muted)", textDecoration: "none" }}>
                  Home
                </Link>
                <span aria-hidden="true" style={{ opacity: 0.45, fontSize: 12 }}>
                  /
                </span>
                <Link href="/learn" style={{ fontSize: 12, color: "var(--ch-text)", textDecoration: "none" }}>
                  Learn
                </Link>
              </nav>
              <button className="civic-top-btn" onClick={toggleTheme} style={{ marginLeft: 'auto' }}>
                {theme === "dark" ? "🌙" : "☀️"}
              </button>
            </div>
            <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-8 sm:px-6">
              <div className="mb-6 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Learn · Story modules
                </p>
                <h1 className="font-neue-montreal text-2xl font-medium tracking-tight sm:text-3xl">
                  Watch Kenya's budget explained — episode by episode. Each part includes takeaways, discussion prompts, notes, and a quiz.
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Short lessons you can finish fast. Swipe through, quiz yourself, then take action with receipts.
                </p>

                {(() => {
                  const unlocked = MODULES_LIST.filter((m) => !m.locked && (m.slides ?? 0) > 0);
                  const completedCount = unlocked.filter((m) => progress[m.id]?.completed).length;
                  const progressPct = unlocked.length ? Math.round((completedCount / unlocked.length) * 100) : 0;
                  return (
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {unlocked.length} modules · {completedCount} done
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{progressPct}%</span> overall
                      </span>
                    </div>
                  );
                })()}
              </div>

              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Modules
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {MODULES_LIST.map((m) => {
                  const p = progress[m.id] ?? { slide: 0, completed: false };
                  const pct = p.completed ? 100 : m.slides ? Math.round((p.slide / (m.slides || 1)) * 100) : 0;
                  const status = p.completed ? "done" : p.slide > 0 ? "progress" : m.locked ? "locked" : "new";
                  const statusLabel =
                    status === "done"
                      ? "Done"
                      : status === "progress"
                      ? "In progress"
                      : status === "locked"
                      ? "Coming soon"
                      : "New";
                  const locked = m.locked;
                  const levelClass =
                    m.category.toLowerCase().includes("advanced")
                      ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                      : "bg-teal-500/10 text-teal-400 border-teal-500/20";
                  const statusClass =
                    status === "done"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : status === "progress"
                      ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                      : status === "locked"
                      ? "bg-muted text-muted-foreground border-border"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20";

                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        if (locked) {
                          showToast("Coming soon! Finish Module 001 first");
                          return;
                        }
                        startModule(m.id);
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                      style={{ opacity: locked ? 0.6 : 1 }}
                    >
                      <div
                        className="h-1.5 w-full"
                        style={{ background: `linear-gradient(90deg,${m.accentA},${m.accentB})` }}
                        aria-hidden="true"
                      />
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${levelClass}`}>
                              {m.category}
                            </span>
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusClass}`}>
                              {statusLabel}
                            </span>
                          </div>
                          <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                            {m.num}
                          </span>
                        </div>

                        <p className="mt-3 line-clamp-2 text-base font-semibold leading-snug">
                          {m.title}
                        </p>
                        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                          {m.desc}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1">
                            ⏱ {m.duration}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1">
                            📋 {m.slides || "?"} slides
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                            <span aria-hidden="true">{m.teacher.avatar}</span>
                            {m.teacher.name.split(" ")[0]}
                          </span>
                        </div>

                        {pct > 0 && (
                          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full transition-[width] duration-700"
                              style={{
                                width: `${pct}%`,
                                background: `linear-gradient(90deg,${m.accentA},${m.accentB})`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Story UI */}
        {activeModuleId && (
          <>
            {/* Keyboard hints for desktop */}
            <div className="civic-keyboard-hints" aria-hidden="true">
              <span>←</span>
              <span>→</span>
            </div>

            {/* Top bar */}
            <div className="civic-top-bar">
              <div className="civic-story-bars">
                {slideBars.map((w, i) => (
                  <div key={i} className="civic-story-bar-track">
                    <div className="civic-story-bar-fill" style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
              <div className="civic-top-row">
                <div className="civic-teacher-bubble-sm">
                  <div className="civic-t-ring">{activeModule.teacher.avatar}</div>
                  <div className="civic-t-info">
                    <div className="civic-t-name">{activeModule.teacher.name}</div>
                    <div className="civic-t-role">{activeModule.teacher.role}</div>
                  </div>
                </div>
                <div className="civic-slide-counter">{slideCounterLabel}</div>
                <button className="civic-top-btn" onClick={toggleTheme} aria-label="Toggle theme">
                  {theme === "dark" ? "🌙" : "☀️"}
                </button>
                <button className="civic-top-btn" onClick={exitToMenu} aria-label="Exit to menu">
                  ✕
                </button>
              </div>
            </div>

            {/* Story viewport */}
            <div 
              className="civic-story-viewport"
              onTouchStart={swipeHandlers.handleTouchStart}
              onTouchEnd={swipeHandlers.handleTouchEnd}
            >
              <div className="civic-tap-zone civic-tap-left" onClick={goPrev} aria-label="Previous slide" />
              <div className="civic-tap-zone civic-tap-right" onClick={handleTapRight} aria-label="Next slide" />
              <div className="civic-story-slide entering">
                <div className={`civic-slide-bg ${currentSlide.bg}`}>
                  <div className="civic-orb civic-orb-1" style={{ background: currentSlide.orbA || "transparent" }} />
                  <div className="civic-orb civic-orb-2" style={{ background: currentSlide.orbB || "transparent" }} />
                </div>
                <div className="civic-story-slide-content">
                  {renderSlideContent(currentSlide, quizState, answerQuiz, handleTapRight, showToast, completeModule)}
                </div>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="civic-bottom-nav">
              <button className="civic-nav-prev" onClick={goPrev} disabled={slideIdx === 0}>
                ←
              </button>
              <div className="civic-nav-center">
                {currentSlides.map((_, i) => (
                  <button
                    key={i}
                    className={[
                      "civic-nc-dot",
                      i < slideIdx ? "civic-done" : "",
                      i === slideIdx ? "civic-current" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                className={slideIdx === totalSlides - 1 ? "civic-nav-next civic-final" : "civic-nav-next"}
                onClick={slideIdx === totalSlides - 1 ? completeModule : handleTapRight}
              >
                {slideIdx === totalSlides - 1 ? "✓" : "→"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Toast */}
      <div className={`civic-toast ${toast.show ? "civic-show" : ""}`}>
        <span className="civic-toast-icon">✦</span>
        <span>{toast.msg}</span>
      </div>
    </>
  );
}

function renderSlideContent(
  slide: StorySlide,
  quizState: QuizState,
  answerQuiz: (quizIdx: number, choiceIdx: number) => void,
  handleTapRight: () => void,
  showToast: (msg: string) => void,
  completeModule: () => void,
) {
  const c = slide.content as any;

  if (slide.type === "cover") {
    const titleParts = (c.title as string).split("\n");
    return (
      <div className="civic-slide-cover civic-slide-inner">
        <div className="civic-cover-module-tag">{c.tag}</div>
        <h1 className="civic-cover-title">
          {titleParts.map((line: string, idx: number) => {
            const hasEm = line.includes("*");
            const clean = line.replace(/\*/g, "");
            return (
              <span key={idx}>
                {hasEm ? <em>{clean}</em> : clean}
                {idx < titleParts.length - 1 && <br />}
              </span>
            );
          })}
        </h1>
        <p className="civic-cover-sub">{c.sub}</p>
        <div className="civic-cover-promise">
          <div className="civic-cp-icon">⏱</div>
          <div>{c.promise}</div>
        </div>
      </div>
    );
  }

  if (slide.type === "concept") {
    const qLines = (c.question as string).split("\n");
    return (
      <div className="civic-slide-concept civic-slide-inner">
        <div className="civic-concept-tag" style={{ background: c.tagBg, color: c.tagColor }}>
          {c.tag}
        </div>
        <div className="civic-concept-question">
          {qLines.map((line: string, idx: number) => (
            <span key={idx}>
              {line.replace(/\*([^*]+)\*/g, "$1")}
              {idx < qLines.length - 1 && <br />}
            </span>
          ))}
        </div>
        <div className="civic-concept-bullets">
          {c.bullets?.map((b: any, i: number) => (
            <div key={i} className="civic-cb-item">
              <div className="civic-cb-dot" style={{ background: b.dot }} />
              <div dangerouslySetInnerHTML={{ __html: b.text }} />
            </div>
          ))}
        </div>
        {c.badge && (
          <div className="civic-kenya-badge">
            <div className="civic-kb-flag">🇰🇪</div>
            <div>{c.badge}</div>
          </div>
        )}
      </div>
    );
  }

  if (slide.type === "chapters") {
    return (
      <div className="civic-slide-chapters civic-slide-inner">
        <div className="civic-slide-headline">
          {(c.headline as string).split("\n").map((line: string, idx: number) => (
            <span key={idx}>
              {line}
              {idx < (c.headline as string).split("\n").length - 1 && <br />}
            </span>
          ))}
        </div>
        <div className="civic-chapter-list">
          {c.chapters?.map((ch: any) => (
            <div key={ch.num} className="civic-ch-item">
              <div className="civic-ch-num">{ch.num}</div>
              <div className="civic-ch-body">
                <div className="civic-ch-label">{ch.label}</div>
                <div className="civic-ch-name">{ch.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === "snapshot") {
    return (
      <div className="civic-slide-inner">
        <div className="civic-slide-headline">{c.headline}</div>
        {c.divider1 && <div className="civic-snap-divider">{c.divider1}</div>}
        <div className="civic-snapshot-grid">
          {c.tiles1?.map((t: any, idx: number) => (
            <div key={idx} className={`civic-snap-tile ${t.accent ? `civic-${t.accent}` : ""}`}>
              <span className="civic-snap-icon">{t.icon}</span>
              <div className="civic-snap-val">{t.val}</div>
              <div className="civic-snap-label">{t.label}</div>
            </div>
          ))}
        </div>
        {c.debtNote && (
          <div className="civic-kenya-badge" style={{ marginTop: "0.25rem" }}>
            <div className="civic-kb-flag">⚠️</div>
            <div style={{ fontSize: "0.78rem", lineHeight: 1.55 }}>{c.debtNote.replace(/\*([^*]+)\*/g, "<em>$1</em>")}</div>
          </div>
        )}
      </div>
    );
  }

  if (slide.type === "pillars") {
    return (
      <div className="civic-slide-inner">
        <div className="civic-slide-headline">
          {(c.headline as string).split("\n").map((line: string, idx: number) => (
            <span key={idx}>
              {line}
              {idx < (c.headline as string).split("\n").length - 1 && <br />}
            </span>
          ))}
        </div>
        <div style={{ fontSize: "0.75rem", color: "var(--ch-text-m)", marginBottom: "0.65rem" }}>{c.sub}</div>
        <div className="civic-pillar-scroll">
          {c.pillars?.map((p: any, idx: number) => (
            <div key={idx} className="civic-pillar-card">
              <div className="civic-pillar-emoji">{p.emoji}</div>
              <div className="civic-pillar-body">
                <div className="civic-pillar-title">{p.title}</div>
                <div className="civic-pillar-desc">{p.desc}</div>
                <div className="civic-pillar-money">💰 {p.money}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === "risks") {
    return (
      <div className="civic-slide-inner">
        <div className="civic-slide-headline">{c.headline}</div>
        <div style={{ fontSize: "0.78rem", color: "var(--ch-text-m)", marginBottom: "0.75rem" }}>{c.sub}</div>
        <div className="civic-risk-list">
          {c.risks?.map((r: any, idx: number) => (
            <div key={idx} className="civic-risk-item">
              <div className="civic-risk-icon">{r.icon}</div>
              <div className="civic-risk-text">
                <strong>{r.title}</strong> — {r.text}
              </div>
            </div>
          ))}
        </div>
        <div className="civic-quote-block" dangerouslySetInnerHTML={{ __html: c.quote.replace(/\*([^*]+)\*/g, "<strong>$1</strong>") }} />
      </div>
    );
  }

  if (slide.type === "quiz") {
    const qi = slide.quizIdx ?? 0;
    const answered = quizState.answered[qi];
    const selected = quizState.selectedIdx[qi];
    const quiz = slide.content as QuizContent;
    return (
      <div className="civic-quiz-slide civic-slide-inner">
        <div className="civic-qz-tag">✦ Knowledge Check {qi + 1}</div>
        <div className="civic-qz-question">{quiz.question}</div>
        <div className="civic-qz-options">
          {quiz.options.map((o, i) => {
            const isCorrect = i === quiz.correct;
            const isSelected = i === selected;
            const cls = [
              "civic-qz-opt",
              answered && isCorrect && isSelected && "civic-selected-correct",
              answered && isCorrect && !isSelected && "civic-reveal-correct",
              answered && !isCorrect && isSelected && "civic-selected-wrong",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={o.letter}
                className={cls}
                disabled={answered}
                onClick={() => {
                  if (!answered) answerQuiz(qi, i);
                }}
              >
                <span className="civic-opt-ltr">{o.letter}</span>
                {o.text}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className={`civic-qz-feedback civic-show ${selected === quiz.correct ? "civic-correct-fb" : "civic-wrong-fb"}`}>
            {selected === quiz.correct ? quiz.feedback.correct : quiz.feedback.wrong}
          </div>
        )}
        {answered && (
          <button className="civic-qz-next civic-show" onClick={handleTapRight}>
            Continue →
          </button>
        )}
      </div>
    );
  }

  if (slide.type === "cta") {
    const titleParts = (c.title as string).split("\n");
    return (
      <div className="civic-cta-slide civic-slide-inner">
        <div className="civic-cta-celebration">🎉</div>
        <h2 className="civic-cta-title">
          {titleParts.map((line: string, idx: number) => {
            const hasEm = line.includes("*");
            const clean = line.replace(/\*/g, "");
            return (
              <span key={idx}>
                {hasEm ? <em>{clean}</em> : clean}
                {idx < titleParts.length - 1 && <br />}
              </span>
            );
          })}
        </h2>
        <p className="civic-cta-sub">{c.sub}</p>
        <div className="civic-cta-buttons">
          {c.actions?.map((a: any, i: number) => (
            <button
              key={a.title}
              className={`civic-cta-btn ${a.style.replace('cta-btn-', 'civic-cta-btn-')}`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              onClick={() => showToast(a.onclickMsg)}
            >
              <div className="civic-cta-btn-icon">{a.icon}</div>
              <div className="civic-cta-btn-body">
                <div className="civic-cta-btn-title">{a.title}</div>
                <div className="civic-cta-btn-sub">{a.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="slide-inner">
      <div className="slide-headline">{c.headline ?? ""}</div>
    </div>
  );
}
