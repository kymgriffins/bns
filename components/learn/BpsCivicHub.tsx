"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Lightbulb,
  Target,
  Sparkles,
  Zap,
  ChevronDown,
  CheckCircle2,
  BarChart3,
  Shield,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, useInView } from "motion/react";

const CHAP = [
  { id: "overview", label: "Course overview", short: "Overview" },
  { id: "bps-basics", label: "What is the BPS?", short: "BPS 101" },
  { id: "beta-pillars", label: "BETA pillars", short: "Pillars" },
  { id: "numbers-risks", label: "Numbers & risks", short: "Numbers" },
  { id: "learning-challenge", label: "Quiz & reflect", short: "Challenge" },
] as const;

type ChapterId = (typeof CHAP)[number]["id"];

const quizQuestions = [
  {
    question: "What is the main purpose of the Budget Policy Statement (BPS)?",
    options: [
      "To collect taxes from citizens",
      "To guide how national and county governments prepare their budgets",
      "To replace the national development plan",
      "To approve all government projects",
    ],
    correctIndex: 1,
  },
  {
    question: "By law, the BPS must be submitted to Parliament by:",
    options: ["January 1", "February 15", "March 30", "April 30"],
    correctIndex: 1,
  },
  {
    question: "Which agenda guides the 2026 BPS development priorities?",
    options: [
      "Vision 2030 Growth Plan",
      "Bottom-Up Economic Transformation Agenda (BETA)",
      "East African Development Strategy",
      "National Industrial Policy",
    ],
    correctIndex: 1,
  },
  {
    question: "When government spending exceeds revenue, the difference is called:",
    options: ["Fiscal surplus", "Fiscal deficit", "Monetary balance", "Public investment"],
    correctIndex: 1,
  },
  {
    question: "Interest on Kenya's public debt (~Ksh 1T) may lead to:",
    options: [
      "Reduced funds for development and social services",
      "Lower tax collection",
      "Faster economic growth",
      "Reduced public borrowing",
    ],
    correctIndex: 0,
  },
  {
    question: "KES 420B to county governments is mainly for:",
    options: [
      "Funding local development and public services",
      "Repaying domestic loans",
      "Supporting foreign investments",
      "Honouring the constitution",
    ],
    correctIndex: 0,
  },
  {
    question: "A major fiscal risk in the BPS is:",
    options: [
      "Rising public debt and interest payments",
      "Decreasing internet use",
      "Reduced population growth",
      "Lower rainfall every year",
    ],
    correctIndex: 0,
  },
];

const PILLARS = [
  { name: "Agricultural transformation", tag: "Food security · value chains" },
  { name: "Transforming MSMEs", tag: "Hustler Fund · 47 county hubs" },
  { name: "Healthcare", tag: "UHC · Social Health Authority ~35M" },
  { name: "Housing and Settlement", tag: "KMRC · urban renewal" },
  { name: "Digital & creative economy", tag: "Fibre · youth skills · film/music" },
  { name: "Enablers", tag: "Roads · energy · water · e-mobility" },
  { name: "National Infrastructure Fund", tag: "Sovereign wealth · long-term" },
];

function useChapterInView() {
  const [active, setActive] = useState<ChapterId>("overview");
  const refs = useRef<Record<ChapterId, HTMLElement | null>>({} as Record<ChapterId, HTMLElement | null>);

  useEffect(() => {
    const sections = CHAP.map((c) => ({ id: c.id, el: refs.current[c.id] })).filter(
      (s): s is { id: ChapterId; el: HTMLElement } => !!s.el
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = sections.find((s) => s.el === e.target)?.id;
          if (id) setActive(id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return { active, refs };
}

export default function BpsCivicHub() {
  const [currentChapter, setCurrentChapter] = useState<ChapterId>("overview");
  const { active, refs } = useChapterInView();
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const correctCount = quizQuestions.reduce(
    (acc, q, idx) => acc + (quizAnswers[idx] === q.correctIndex ? 1 : 0),
    0
  );

  const scrollTo = (id: ChapterId) => {
    refs.current[id]?.scrollIntoView({ behavior: "smooth" });
    setCurrentChapter(id);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white antialiased">
      {/* Ambient grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Sticky chapter nav – blockchain-style pill bar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {CHAP.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => scrollTo(ch.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  active === ch.id
                    ? "bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/40"
                    : "text-white/60 hover:bg-white/5 hover:text-white/90"
                }`}
              >
                <span className="hidden sm:inline">{ch.short}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Zap className="mr-1.5 h-3.5 w-3.5" />
                  60s refresher
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md border-white/10 bg-[#0c0c12] text-white">
                <DialogHeader>
                  <DialogTitle className="text-cyan-300">BPS 2026 · One-minute brief</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-white/80">
                  The BPS sets strategic priorities and guides national and county budgets. Submitted by 15 Feb (PFM Act); guides the budget by 30 April. Theme: BETA for inclusive, sustainable growth.
                </p>
              </DialogContent>
            </Dialog>
            <Button asChild size="sm" className="rounded-full bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/30 hover:bg-cyan-500/30">
              <Link href="/profile">Profile <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero – gradient headline, no old layout */}
      <section className="relative border-b border-white/5 px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-cyan-400/90"
          >
            Civic hub · BPS 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
              Decode the budget.
            </span>
            <br />
            <span className="text-white/95">Master the pillars. Own the story.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mx-auto mt-6 max-w-2xl text-sm text-white/60 md:text-base"
          >
            One track from two works: Module One + Millicent Makini. Learn what the BPS is, walk the BETA pillars, track the numbers—then quiz and reflect.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              onClick={() => scrollTo("overview")}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 text-black hover:from-cyan-400 hover:to-emerald-400"
            >
              Start learning
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/tracker">Track delivery</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/50"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400/70" />
              Credits: Millicent Makini · Module One
            </span>
            <span>5 chapters</span>
            <span>~20 min</span>
          </motion.div>
        </div>
      </section>

      {/* Chapter 1: Overview */}
      <ChapterBlock
        id="overview"
        ref={(el) => { refs.current["overview"] = el; }}
        number={1}
        title="Course overview"
        gradient="from-cyan-500/10 to-emerald-500/5"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {[
            "Decode the Budget's Secret: purpose and timeline of the BPS",
            "Master the 5 Key Pillars: BETA agenda",
            "Track the Trillion-Shilling Debt: big numbers and interest",
            "Battle the Climate Risk: fiscal dangers",
            "Quiz: Budget detective challenges",
            "Share Your Policy Opinion: reflect and propose solutions",
          ].map((text, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
              <span className="text-sm text-white/90">{text}</span>
            </motion.div>
          ))}
        </div>
      </ChapterBlock>

      {/* Chapter 2: What is BPS */}
      <ChapterBlock
        id="bps-basics"
        ref={(el) => { refs.current["bps-basics"] = el; }}
        number={2}
        title="What is a Budget Policy Statement?"
        gradient="from-violet-500/10 to-cyan-500/5"
      >
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-white/80">
            The BPS sets out the broad strategic priorities and policy goals that guide national and county governments in preparing their budgets for the next financial year and the medium term.
          </p>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
            <p className="text-sm text-white/90">
              Submitted to Parliament by the <strong className="text-cyan-300">15th of February</strong> every year (section 25, PFM Act). Contains: economy assessment, revenue/expenditure outlook, expenditure ceilings, fiscal principles, and specific fiscal risks.
            </p>
          </div>
          <p className="text-sm text-white/80">
            The BPS guides the <strong className="text-white/95">County Fiscal Strategy Paper (CFSP)</strong>. Once approved by Parliament, it forms the basis for the national budget presented by 30 April.
          </p>
        </div>
      </ChapterBlock>

      {/* Chapter 3: Pillars – card grid */}
      <ChapterBlock
        id="beta-pillars"
        ref={(el) => { refs.current["beta-pillars"] = el; }}
        number={3}
        title="BETA pillars & 2026 theme"
        gradient="from-emerald-500/10 to-cyan-500/5"
      >
        <p className="mb-8 text-sm text-white/70">
          &quot;Consolidating Gains Under the Bottom-Up Economic Transformation Agenda for Inclusive and Sustainable Growth.&quot;
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-500/30 hover:bg-white/[0.07]"
            >
              <Target className="mb-2 h-4 w-4 text-cyan-400" />
              <p className="font-medium text-white/95">{p.name}</p>
              <p className="mt-1 text-xs text-white/55">{p.tag}</p>
            </motion.div>
          ))}
        </div>
      </ChapterBlock>

      {/* Chapter 4: Numbers – stat cards */}
      <ChapterBlock
        id="numbers-risks"
        ref={(el) => { refs.current["numbers-risks"] = el; }}
        number={4}
        title="Budget 2026/27 · Counties · Risks"
        gradient="from-amber-500/10 to-orange-500/5"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Revenue", value: "Ksh. 3,588B", icon: BarChart3 },
            { label: "Expenditure", value: "Ksh. 4,737B", icon: BarChart3 },
            { label: "Interest (debt)", value: "Ksh. 1,203B", icon: Shield },
            { label: "To counties", value: "Ksh. 420B", icon: Target },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
            >
              <s.icon className="mx-auto mb-2 h-5 w-5 text-cyan-400/80" />
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-white/55">{s.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-amber-200/90">
            <Flame className="h-4 w-4" />
            Fiscal risks
          </p>
          <p className="mt-2 text-sm text-white/75">
            Public debt · Contingent liabilities · Macro risks · Climate change · Devolution (pending bills, county pressures).
          </p>
        </div>
      </ChapterBlock>

      {/* Chapter 5: Quiz + Reflections */}
      <ChapterBlock
        id="learning-challenge"
        ref={(el) => { refs.current["learning-challenge"] = el; }}
        number={5}
        title="Quiz & reflection lab"
        gradient="from-cyan-500/10 to-violet-500/5"
      >
        <div className="space-y-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <Lightbulb className="h-5 w-5 text-cyan-400" />
              Budget detective
            </h3>
            <div className="space-y-6">
              {quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3">
                  <p className="text-sm font-medium text-white/95">{qIdx + 1}. {q.question}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {q.options.map((opt, optIdx) => {
                      const selected = quizAnswers[qIdx] === optIdx;
                      const isCorrect = optIdx === q.correctIndex;
                      const show = showQuizResults;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => {
                            setQuizAnswers((p) => ({ ...p, [qIdx]: optIdx }));
                            setShowQuizResults(false);
                          }}
                          className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                            !show
                              ? selected
                                ? "border-cyan-400/50 bg-cyan-500/15 text-white"
                                : "border-white/15 bg-white/5 text-white/85 hover:border-white/25 hover:bg-white/10"
                              : isCorrect
                                ? "border-emerald-500/40 bg-emerald-500/15 text-white"
                                : selected
                                  ? "border-red-400/40 bg-red-500/10 text-white"
                                  : "border-white/10 bg-white/5 text-white/60"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
              <Button
                onClick={() => setShowQuizResults(true)}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className="rounded-full bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/30 hover:bg-cyan-500/30"
              >
                Check answers
              </Button>
              {showQuizResults && (
                <span className="text-sm text-white/70">
                  You got <strong className="text-cyan-300">{correctCount}</strong> of {quizQuestions.length}.
                </span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <BookOpen className="h-5 w-5 text-emerald-400" />
              Reflection lab
            </h3>
            {[
              {
                id: "first-reflection",
                title: "Your First Reflection",
                prompt: "How often did you think about how national budgets affect your daily life? What areas do government budgets influence most?",
              },
              {
                id: "pause-reflect",
                title: "Pause & Reflect",
                prompt: "If you were designing an economic strategy for Kenya, which sector would you prioritise first and why?",
              },
              {
                id: "citizens-lens",
                title: "Citizens' Lens",
                prompt: "Why should citizens understand government budgets even if they are not economists?",
              },
              {
                id: "final-challenge",
                title: "Final Budget Challenge",
                prompt: "Imagine Parliament asks for one key improvement before approving the BPS. Which area would you strengthen most and why?",
              },
            ].map(({ id, title, prompt }) => (
              <div key={id} className="mb-6">
                <p className="font-medium text-white/95">{title}</p>
                <p className="mt-1 text-xs text-white/55">{prompt}</p>
                <textarea
                  className="mt-3 min-h-[88px] w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-500/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                  placeholder="Type your thoughts…"
                  value={answers[id] ?? ""}
                  onChange={(e) => setAnswers((p) => ({ ...p, [id]: e.target.value }))}
                />
              </div>
            ))}
            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
              <Button asChild className="rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 ring-1 ring-cyan-400/30 hover:from-cyan-500/30 hover:to-emerald-500/30">
                <Link href="/media-hub">Turn into content <ArrowRight className="ml-2 h-3.5 w-3.5" /></Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/20 bg-white/5 text-white/90 hover:bg-white/10">
                <Link href="/tracker">Check tracker</Link>
              </Button>
            </div>
          </div>
        </div>
      </ChapterBlock>

      {/* Bottom CTA */}
      <section className="border-t border-white/5 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400/80">
            You’re set
          </p>
          <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Take this into the real world
          </h2>
          <p className="mt-3 text-sm text-white/60">
            Track delivery, share stories, get briefs—all from the civic hub.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-full bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/30 hover:bg-cyan-500/30">
              <Link href="/tracker">Tracker</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
              <Link href="/take-action">Take action</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ChapterBlock({
  id,
  ref: refProp,
  number,
  title,
  gradient,
  children,
}: {
  id: ChapterId;
  ref: (el: HTMLElement | null) => void;
  number: number;
  title: string;
  gradient: string;
  children: React.ReactNode;
}) {
  const inViewRef = useRef<HTMLElement>(null);
  const setRef = (el: HTMLElement | null) => {
    (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
    refProp(el);
  };
  const isInView = useInView(inViewRef, { once: false, amount: 0.2 });
  return (
    <section
      ref={setRef}
      id={id}
      className={`relative border-b border-white/5 py-16 md:py-24 ${isInView ? `bg-gradient-to-b ${gradient}` : ""}`}
    >
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
            Chapter {number}
          </span>
          <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
