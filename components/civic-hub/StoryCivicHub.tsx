"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";

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
    id: "national-county",
    num: "002",
    title: "National vs County Budget",
    desc: "47 counties, one national government. Who funds what? Coming soon.",
    duration: "12 min",
    slides: 0,
    category: "National",
    catColor: "#38B2AC",
    catBg: "rgba(56,178,172,.15)",
    accentA: "#38B2AC",
    accentB: "#9F7AEA",
    teacher: {
      name: "Dr. Amara Osei",
      role: "Head of Fiscal Analysis",
      avatar: "👩🏿‍🏫",
    },
    locked: true,
  },
  {
    id: "finance-bill",
    num: "003",
    title: "Finance Bill 101",
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
  const [progress, setProgress] = useState<ProgressState>({});
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>({
    answered: [false, false],
    selectedIdx: [null, null],
  });
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: "" });

  const activeModule = useMemo(
    () => MODULES_LIST.find((m) => m.id === (activeModuleId ?? "bps-2026")) ?? MODULES_LIST[0],
    [activeModuleId],
  );

  const totalSlides = BPS_SLIDES.length;

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
    const slide = BPS_SLIDES[slideIdx];
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
    const slide = BPS_SLIDES.find((s) => s.quizIdx === qi);
    if (!slide || slide.type !== "quiz" || quizState.answered[qi]) return;

    setQuizState((prev) => {
      const answered = [...prev.answered];
      const selectedIdx = [...prev.selectedIdx];
      answered[qi] = true;
      selectedIdx[qi] = idx;
      return { answered, selectedIdx };
    });
  }

  const currentSlide = BPS_SLIDES[slideIdx];

  const slideCounterLabel = `${slideIdx + 1}/${totalSlides}`;

  const slideBars = BPS_SLIDES.map((_, i) => {
    if (i < slideIdx) return 100;
    if (i === slideIdx) return 100;
    return 0;
  });

  return (
    <>
      <div className="civic-shell" id="shell">
        {/* Module select screen */}
        {!activeModuleId && (
          <div className="civic-module-screen">
            <div className="civic-ms-top">
              <div className="civic-ms-logo">
                <div className="civic-ms-logo-icon">📊</div>
                <div className="civic-ms-logo-text">
                  Budget <strong>Ndio</strong> Story
                </div>
              </div>
              <button className="civic-top-btn" onClick={toggleTheme} style={{ marginLeft: 'auto' }}>
                {theme === "dark" ? "🌙" : "☀️"}
              </button>
            </div>
            <div className="civic-ms-body">
              <div className="civic-ms-greeting">
                Civic <em>Hub</em>
              </div>
              <div className="civic-ms-sub">
                Quick civic lessons — like stories. Swipe (or click) through, learn something real, then act on it.
              </div>
              <div id="civic-ms-modules">
                {MODULES_LIST.map((m) => {
                  const p = progress[m.id] ?? { slide: 0, completed: false };
                  const pct = p.completed ? 100 : m.slides ? Math.round((p.slide / (m.slides || 1)) * 100) : 0;
                  const status = p.completed ? "done" : p.slide > 0 ? "progress" : m.locked ? "locked" : "";
                  const statusLabel = p.completed
                    ? "✓ Done"
                    : p.slide > 0
                    ? "In Progress"
                    : m.locked
                    ? "Coming soon"
                    : "New";
                  const statusClass =
                    status === "done" ? "civic-status-done" : status === "progress" ? "civic-status-progress" : "civic-status-locked";
                  const locked = m.locked;
                  return (
                    <button
                      key={m.id}
                      className="civic-ms-module-card"
                      onClick={() => {
                        if (locked) {
                          showToast("Coming soon! Finish Module 001 first");
                          return;
                        }
                        startModule(m.id);
                      }}
                      style={{ opacity: locked ? 0.6 : 1 }}
                    >
                      <div
                        className="civic-ms-module-bar"
                        style={{ background: `linear-gradient(90deg,${m.accentA},${m.accentB})` }}
                      />
                      <div className="civic-ms-module-inner">
                        <div className="civic-ms-mod-top">
                          <div className="civic-ms-badge" style={{ background: m.catBg, color: m.catColor }}>
                            {m.category}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                            <div className={`civic-ms-mod-status ${statusClass}`}>{statusLabel}</div>
                            <div className="civic-ms-mod-num">{m.num}</div>
                          </div>
                        </div>
                        <div className="civic-ms-mod-title">{m.title}</div>
                        <div className="civic-ms-mod-desc">{m.desc}</div>
                        <div className="civic-ms-mod-footer">
                          <span>⏱ {m.duration}</span>
                          <span>·</span>
                          <span>📋 {m.slides || "?"} slides</span>
                          <div className="civic-ms-teacher">
                            <span>{m.teacher.avatar}</span>
                            <span>{m.teacher.name.split(" ")[0]}</span>
                          </div>
                        </div>
                        {pct > 0 && (
                          <div className="civic-ms-prog-bar">
                            <div
                              className="civic-ms-prog-fill"
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
                <button className="civic-top-btn" onClick={toggleTheme}>
                  {theme === "dark" ? "🌙" : "☀️"}
                </button>
                <button className="civic-top-btn" onClick={exitToMenu}>
                  ✕
                </button>
              </div>
            </div>

            {/* Story viewport */}
            <div className="civic-story-viewport">
              <div className="civic-tap-zone civic-tap-left" onClick={goPrev} />
              <div className="civic-tap-zone civic-tap-right" onClick={handleTapRight} />
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
                {BPS_SLIDES.map((_, i) => (
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
