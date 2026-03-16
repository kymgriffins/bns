"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  CivicHubProgress,
  CivicHubQuiz,
  CivicHubQuizResults,
  CivicHubSeed,
  CivicHubStep,
  CivicHubTheme,
} from "./types";
import {
  loadModuleOverrides,
  loadProgress,
  loadQuizResults,
  loadTeacherOverrides,
  loadTheme,
  saveModuleOverrides,
  saveProgress,
  saveQuizResults,
  saveTeacherOverrides,
  saveTheme,
} from "./storage";

type Screen = "hub" | "player";

function richTextToHtml(text: string) {
  // Minimal formatting compatible with the PRD HTML seed:
  // - preserve existing <strong>
  // - convert *italic* to <em>
  // - convert line breaks
  const withItalic = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
  return withItalic.replace(/\n/g, "<br />");
}

function clampPct(n: number) {
  return Math.max(0, Math.min(100, n));
}

function categoryLabel(cat: string) {
  if (cat === "budget-basics") return "Budget Basics";
  if (cat === "national") return "National";
  if (cat === "county") return "County";
  if (cat === "oversight") return "Oversight";
  if (cat === "action") return "Action";
  return cat;
}

export function CivicHubApp() {
  const { theme, setTheme } = useTheme();
  const [screen, setScreen] = useState<Screen>("hub");
  const [seed, setSeed] = useState<CivicHubSeed | null>(null);
  const [loading, setLoading] = useState(true);

  const [progress, setProgress] = useState<CivicHubProgress>({});
  const [quizResults, setQuizResults] = useState<CivicHubQuizResults>({});

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const [quizOpen, setQuizOpen] = useState(false);
  const [quizState, setQuizState] = useState<{
    moduleId: string;
    stepId: string;
    quiz: CivicHubQuiz;
    selectedIdx: number | null;
    revealed: boolean;
  } | null>(null);

  const [scrollGateReady, setScrollGateReady] = useState(true);
  const stepPaneRef = useRef<HTMLDivElement | null>(null);

  // Load: seed -> apply local overrides -> load progress/quiz/theme
  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const res = await fetch("/api/civic-hub", { cache: "no-store" });
        const base = (await res.json()) as CivicHubSeed;
        const teachersOverride = loadTeacherOverrides();
        const modulesOverride = loadModuleOverrides();

        const merged: CivicHubSeed = {
          ...base,
          teachers: teachersOverride ?? base.teachers,
          modules: modulesOverride ?? base.modules,
        };

        if (!cancelled) {
          setSeed(merged);
          setProgress(loadProgress());
          setQuizResults(loadQuizResults());
          const savedTheme = loadTheme();
          if (savedTheme) setTheme(savedTheme);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [setTheme]);

  // Persist theme into PRD key
  useEffect(() => {
    if (theme === "dark" || theme === "light") saveTheme(theme as CivicHubTheme);
  }, [theme]);

  const modules = seed?.modules ?? [];
  const teachers = seed?.teachers ?? {};

  const activeModule = useMemo(
    () => modules.find((m) => m.id === activeModuleId) ?? null,
    [modules, activeModuleId]
  );

  const activeStep: CivicHubStep | null = useMemo(() => {
    if (!activeModule) return null;
    return activeModule.steps[activeStepIdx] ?? null;
  }, [activeModule, activeStepIdx]);

  const doneCount = useMemo(
    () => Object.values(progress).filter((p) => p?.completed).length,
    [progress]
  );

  const totalModules = modules.length;
  const platformPct = totalModules > 0 ? clampPct((doneCount / totalModules) * 100) : 0;

  const categories = useMemo(() => {
    const set = new Set<string>();
    modules.forEach((m) => set.add(m.category));
    return ["all", ...Array.from(set)];
  }, [modules]);

  const filteredModules = useMemo(() => {
    if (activeCategory === "all") return modules;
    return modules.filter((m) => m.category === activeCategory);
  }, [modules, activeCategory]);

  // Scroll gate: require scrolling through content on lesson/intro
  useEffect(() => {
    const el = stepPaneRef.current;
    if (!el) return;

    const needsGate = !!activeStep && activeStep.type !== "cta";
    if (!needsGate) {
      setScrollGateReady(true);
      return;
    }

    setScrollGateReady(false);
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return setScrollGateReady(true);
      const pct = el.scrollTop / max;
      setScrollGateReady(pct >= 0.85);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [activeStep?.id, activeStep?.type]);

  function ensureProgressItem(moduleId: string) {
    setProgress((prev) => {
      if (prev[moduleId]) return prev;
      const next: CivicHubProgress = { ...prev, [moduleId]: { stepIdx: 0, completed: false } };
      saveProgress(next);
      return next;
    });
  }

  function openModule(moduleId: string) {
    ensureProgressItem(moduleId);
    const savedIdx = progress[moduleId]?.stepIdx ?? 0;
    setActiveModuleId(moduleId);
    setActiveStepIdx(savedIdx);
    setScreen("player");
  }

  function goHub() {
    setScreen("hub");
    setActiveModuleId(null);
    setActiveStepIdx(0);
    setQuizOpen(false);
    setQuizState(null);
  }

  function markStepProgress(moduleId: string, idx: number, completed?: boolean) {
    setProgress((prev) => {
      const current = prev[moduleId] ?? { stepIdx: 0, completed: false };
      const nextItem = {
        stepIdx: Math.max(current.stepIdx, idx),
        completed: completed ?? current.completed,
      };
      const next: CivicHubProgress = { ...prev, [moduleId]: nextItem };
      saveProgress(next);
      return next;
    });
  }

  function nextStep() {
    if (!activeModule) return;
    const next = Math.min(activeModule.steps.length - 1, activeStepIdx + 1);
    if (next === activeStepIdx) return;
    setActiveStepIdx(next);
    markStepProgress(activeModule.id, next);
  }

  function prevStep() {
    const prev = Math.max(0, activeStepIdx - 1);
    setActiveStepIdx(prev);
  }

  function finishModule() {
    if (!activeModule) return;
    markStepProgress(activeModule.id, activeModule.steps.length - 1, true);
    goHub();
  }

  function beginQuiz(moduleId: string, step: CivicHubStep) {
    if (!step.quiz) return;
    const stored = quizResults[`${moduleId}:${step.id}`];
    setQuizState({
      moduleId,
      stepId: step.id,
      quiz: step.quiz,
      selectedIdx: stored?.selectedIdx ?? null,
      revealed: !!stored,
    });
    setQuizOpen(true);
  }

  function submitQuiz(choiceIdx: number) {
    if (!quizState) return;
    const correct = choiceIdx === quizState.quiz.correct;
    const key = `${quizState.moduleId}:${quizState.stepId}`;
    const nextItem = { stepId: quizState.stepId, selectedIdx: choiceIdx, correct, at: Date.now() };
    setQuizResults((prev) => {
      const next: CivicHubQuizResults = { ...prev, [key]: nextItem };
      saveQuizResults(next);
      return next;
    });
    setQuizState({ ...quizState, selectedIdx: choiceIdx, revealed: true });
  }

  function exportJson() {
    if (!seed) return;
    const payload: CivicHubSeed = { ...seed, teachers, modules };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "civic-hub-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importJson(file: File) {
    const raw = await file.text();
    const parsed = JSON.parse(raw) as CivicHubSeed;
    saveTeacherOverrides(parsed.teachers);
    saveModuleOverrides(parsed.modules);
    setSeed(parsed);
    // Ping dummy backend for teacher test validation/echo
    fetch("/api/civic-hub", { method: "POST", headers: { "Content-Type": "application/json" }, body: raw }).catch(
      () => {}
    );
  }

  const hasAnyProgress = doneCount > 0;

  if (loading) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
          <div className="relative h-9 w-28">
            <Image src="/logo.svg" alt="Budget Ndio Story" fill className="object-contain opacity-80" />
          </div>
          <div>Loading Civic Hub…</div>
        </div>
      </div>
    );
  }

  if (!seed) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-sm text-muted-foreground">Failed to load Civic Hub data.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#020617,_#020617_40%,_#000000)]">
      {/* Top nav – dedicated Civic Hub shell */}
      <div className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5">
          <button
            className="flex items-center gap-3"
            onClick={() => {
              if (screen === "player") {
                goHub();
              }
            }}
          >
            <div className="relative h-8 w-28">
              <Image src="/logo.svg" alt="Budget Ndio Story" fill className="object-contain" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Civic Hub
              </span>
              <span className="text-xs text-foreground/80">Budget Ndio Story · Premium civic lessons</span>
            </div>
          </button>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden xs:flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-[11px] text-muted-foreground">
              <span>
                {doneCount} / {totalModules} modules
              </span>
              <span className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full"
                  style={{
                    width: `${platformPct}%`,
                    background: "linear-gradient(90deg, var(--bns-gold), var(--bns-teal))",
                  }}
                />
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Toggle theme"
            >
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Learn mode only – studio is hidden for end users */}
      <>
          {/* Hub */}
          {screen === "hub" && (
            <div className="px-4 py-6 sm:py-10">
              <div className="civic-hub-hero-shell px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <div className="civic-hub-hero-badge mb-3 text-xs">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400/90 text-[9px] font-bold text-black">
                        ✶
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-slate-200">
                        Premium civic hub · Free for you
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
                      Understand Kenya&apos;s budget.
                      <br className="hidden sm:block" />
                      <span className="text-slate-300"> Follow the story, slide by slide.</span>
                    </h1>
                    <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-300/80">
                      Budget Ndio Story&apos;s Civic Hub feels like Instagram stories, not a textbook — short lessons,
                      pop-up quizzes, and real actions you can take in your county.
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Button
                        className="civic-hub-hero-cta-primary"
                        onClick={() => {
                          const first = modules.find((m) => m.status === "published") ?? modules[0];
                          if (first) openModule(first.id);
                        }}
                      >
                        Start learning now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <button
                        type="button"
                        className="civic-hub-hero-cta-secondary text-slate-200/90"
                        onClick={() => {
                          const firstInProgress = modules.find((m) => progress[m.id]?.stepIdx);
                          if (firstInProgress) {
                            openModule(firstInProgress.id);
                          }
                        }}
                      >
                        {hasAnyProgress ? "Resume where you left off" : "Browse all modules"}
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-0 w-full max-w-xs sm:max-w-sm">
                    <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-slate-200">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">Today in Civic Hub</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Live
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-3 text-[11px] text-slate-300/90">
                        <div>
                          <div className="text-sm font-semibold text-slate-50">{modules.length}</div>
                          <div className="mt-0.5 text-slate-400">Modules</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-50">
                            {doneCount}/{modules.length || 1}
                          </div>
                          <div className="mt-0.5 text-slate-400">You&apos;ve finished</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-50">Youth-first</div>
                          <div className="mt-0.5 text-slate-400">No jargon</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-[11px] text-slate-400">
                      Built by{" "}
                      <Link href="/" className="underline underline-offset-2 decoration-slate-500 hover:text-slate-200">
                        Budget Ndio Story
                      </Link>
                      . Premium-grade budget literacy, still free.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-6 max-w-5xl">
                {/* Filters */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-xs font-medium transition",
                        activeCategory === cat
                          ? "border-red-500/30 bg-red-500/10 text-red-500"
                          : "border-border text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {cat === "all" ? "All" : categoryLabel(cat)}
                    </button>
                  ))}
                </div>

                {/* Module grid */}
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredModules.map((m) => {
                    const p = progress[m.id];
                    const isPublished = m.status === "published";
                    const isLocked = !isPublished && doneCount < m.moduleNumber - 1;
                    const pct =
                      m.steps.length > 0 && p
                        ? clampPct(((Math.min(p.stepIdx, m.steps.length - 1) + 1) / m.steps.length) * 100)
                        : 0;
                    const t = teachers[m.teacherId];
                    return (
                      <Card
                        key={m.id}
                        className={cn(
                          "group cursor-pointer overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg",
                          isLocked && "cursor-not-allowed opacity-70"
                        )}
                        onClick={() => {
                          if (isLocked) return;
                          openModule(m.id);
                        }}
                        style={{
                          borderColor: "rgba(255,255,255,.08)",
                        }}
                      >
                        <div
                          className="h-1"
                          style={{ background: `linear-gradient(90deg, ${m.accentA}, ${m.accentB})` }}
                        />
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <Badge
                              variant="secondary"
                              className="text-[10px] font-semibold uppercase tracking-wider"
                              style={{ background: m.badgeBg, color: m.badgeColor }}
                            >
                              {m.badgeLabel}
                            </Badge>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {String(m.moduleNumber).padStart(2, "0")}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="grid h-8 w-8 place-items-center rounded-full border"
                                style={{ borderColor: `${t?.accentColor ?? "#F5C842"}55` }}
                              >
                                <span className="text-lg">{t?.avatar ?? "👩🏾‍🏫"}</span>
                              </div>
                              <div>
                                <div className="text-xs font-medium">{t?.name ?? "Teacher"}</div>
                                <div className="text-[11px] text-muted-foreground">{m.estimatedMinutes} min</div>
                              </div>
                            </div>
                            {p?.completed ? <CheckCircle2 className="h-4 w-4 text-teal-500" /> : null}
                          </div>

                          <div className="mt-3">
                            <div className="text-base font-semibold leading-snug">{m.title}</div>
                            <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                              {m.steps[0]?.hook?.headline ?? "Open to begin learning."}
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                              <div
                                className="h-full"
                                style={{
                                  width: `${pct}%`,
                                  background: `linear-gradient(90deg, ${m.accentA}, ${m.accentB})`,
                                }}
                              />
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                              <span>{p?.completed ? "Completed" : p?.stepIdx ? "In progress" : "Not started"}</span>
                              <span>{isLocked ? "Locked" : isPublished ? "Published" : "Draft"}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Player */}
          {screen === "player" && activeModule && activeStep && (
            <div className="min-h-[calc(100vh-56px)]">
              <div className="flex">
                {/* Sidebar (hidden on mobile) */}
                <aside className="hidden w-[280px] shrink-0 border-r bg-card p-4 md:block">
                  <Button variant="ghost" className="mb-4 w-full justify-start" onClick={goHub}>
                    ← All modules
                  </Button>
                  <div className="text-sm font-semibold">{activeModule.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {teachers[activeModule.teacherId]?.name ?? "Teacher"} · {activeModule.steps.length} steps
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>
                        {clampPct(((activeStepIdx + 1) / activeModule.steps.length) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-teal-400"
                        style={{ width: `${((activeStepIdx + 1) / activeModule.steps.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 space-y-1">
                    {activeModule.steps.map((s, idx) => {
                      const done = idx < (progress[activeModule.id]?.stepIdx ?? 0) || progress[activeModule.id]?.completed;
                      const active = idx === activeStepIdx;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setActiveStepIdx(idx)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition",
                            active
                              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                              : "border-transparent hover:border-border hover:bg-muted/40 text-muted-foreground",
                            done && !active && "text-teal-500"
                          )}
                        >
                          <span
                            className={cn(
                              "grid h-6 w-6 place-items-center rounded-full border text-[11px] font-semibold",
                              active ? "border-yellow-500/30 bg-yellow-500 text-black" : "border-border bg-background"
                            )}
                          >
                            {idx + 1}
                          </span>
                          <span className="flex-1">
                            <span className="block text-xs text-muted-foreground">{s.label}</span>
                            <span className="block leading-snug">{s.title}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </aside>

                {/* Main */}
                <main className="flex-1">
                  {/* Topbar */}
                  <div className="sticky top-[56px] z-30 flex items-center gap-3 border-b bg-background/80 backdrop-blur px-4 py-3 md:px-8">
                    <Badge
                      variant="secondary"
                      className="uppercase tracking-wider"
                      style={{ background: "rgba(245,200,66,.12)", color: "#F5C842" }}
                    >
                      {activeStep.type}
                    </Badge>
                    <div className="flex-1 text-sm text-muted-foreground">{activeStep.title}</div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={prevStep} disabled={activeStepIdx === 0}>
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Prev
                      </Button>
                      {activeStepIdx < activeModule.steps.length - 1 ? (
                        <Button size="sm" onClick={nextStep} disabled={!scrollGateReady}>
                          Next
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button size="sm" onClick={finishModule}>
                          Finish
                          <CheckCircle2 className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Step pane */}
                  <div ref={stepPaneRef} className="h-[calc(100vh-56px-49px)] overflow-y-auto">
                    <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
                      {/* Teacher bubble */}
                      {activeStep.teacherLine && (
                        <div className="mb-8 flex gap-4">
                          <div className="relative shrink-0">
                            <div
                              className="grid h-16 w-16 place-items-center rounded-full border-2"
                              style={{ borderColor: "rgba(245,200,66,.6)" }}
                            >
                              <span className="text-3xl">{teachers[activeModule.teacherId]?.avatar ?? "👩🏾‍🏫"}</span>
                            </div>
                            <div className="mt-2 text-center text-[10px] font-bold uppercase tracking-wide text-yellow-500">
                              {teachers[activeModule.teacherId]?.name?.split(" ")[0] ?? "Teacher"}
                            </div>
                          </div>
                          <div className="flex-1 rounded-2xl border bg-card p-5">
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-yellow-500">
                              {activeStep.teacherLine.intro}
                            </div>
                            <div
                              className="mt-2 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: richTextToHtml(activeStep.teacherLine.text) }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Hook */}
                      {activeStep.hook && (
                        <div className="mb-8 rounded-2xl border bg-gradient-to-br from-yellow-500/10 to-teal-500/10 p-6">
                          <div className="text-xl font-semibold">{activeStep.hook.headline}</div>
                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {activeStep.hook.statTiles?.map((t) => (
                              <div key={t.label} className="rounded-xl border bg-card p-4 text-center">
                                <div className="text-2xl font-bold text-yellow-500">{t.value}</div>
                                <div className="text-xs text-muted-foreground">{t.label}</div>
                              </div>
                            ))}
                          </div>
                          {activeStep.hook.outcomes?.length ? (
                            <div className="mt-5 space-y-2">
                              {activeStep.hook.outcomes.map((o) => (
                                <div key={o} className="flex gap-2 rounded-xl border bg-teal-500/10 p-3">
                                  <span className="mt-0.5 text-teal-500">✓</span>
                                  <span className="text-sm">{o}</span>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      )}

                      {/* Content blocks */}
                      {activeStep.content?.blockType === "key-points" && (
                        <div className="mb-8">
                          <div className="mb-3 text-lg font-semibold">{activeStep.content.sectionTitle}</div>
                          <div className="space-y-3">
                            {activeStep.content.points.map((p) => (
                              <div key={p.id} className="flex gap-3 border-b py-3 text-sm text-muted-foreground">
                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-500" />
                                <div dangerouslySetInnerHTML={{ __html: richTextToHtml(p.text) }} />
                              </div>
                            ))}
                          </div>
                          {activeStep.content.callout && (
                            <div className="mt-6 rounded-xl border bg-yellow-500/10 p-4">
                              <div className="text-[10px] font-semibold uppercase tracking-wider text-yellow-500">
                                {activeStep.content.callout.label}
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">{activeStep.content.callout.text}</div>
                            </div>
                          )}
                        </div>
                      )}

                      {activeStep.content?.blockType === "concept-cards" && (
                        <div className="mb-8">
                          <div className="mb-3 text-lg font-semibold">{activeStep.content.sectionTitle}</div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {activeStep.content.cards.map((c) => (
                              <div key={c.id} className="rounded-2xl border bg-card p-5">
                                <div className="font-semibold">{c.title}</div>
                                <div className="mt-2 text-sm text-muted-foreground">{c.body}</div>
                                {c.keyPoint ? (
                                  <div className="mt-4 rounded-xl border bg-yellow-500/10 p-3 text-xs text-muted-foreground">
                                    <div className="text-[10px] font-semibold uppercase tracking-wider text-yellow-500">
                                      Key point
                                    </div>
                                    <div className="mt-1">{c.keyPoint}</div>
                                  </div>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeStep.content?.blockType === "framework" && (
                        <div className="mb-8">
                          <div className="mb-3 text-lg font-semibold">{activeStep.content.sectionTitle}</div>
                          <div className="space-y-3">
                            {activeStep.content.steps.map((s) => (
                              <div key={s.id} className="flex gap-4 rounded-xl border bg-card p-4">
                                <div className="grid h-9 w-9 place-items-center rounded-full border bg-yellow-500/10 text-xs font-semibold text-yellow-500">
                                  {s.stepNumber}
                                </div>
                                <div>
                                  <div className="font-medium">{s.verb}</div>
                                  <div className="text-sm text-muted-foreground">{s.description}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {activeStep.content.resources?.length ? (
                            <div className="mt-5 flex flex-wrap gap-2">
                              {activeStep.content.resources.map((r) => (
                                <Badge
                                  key={r.id}
                                  variant="outline"
                                  className={cn(
                                    "rounded-full",
                                    r.type === "video" && "border-red-500/30 text-red-500",
                                    r.type === "article" && "border-teal-500/30 text-teal-500"
                                  )}
                                >
                                  {r.type === "video" ? "🎬" : "📄"} {r.label}
                                </Badge>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      )}

                      {activeStep.callout && (
                        <div className="mb-8 rounded-2xl border bg-gradient-to-br from-yellow-500/10 to-teal-500/10 p-5">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-yellow-500">
                            {activeStep.callout.label}
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">{activeStep.callout.text}</div>
                        </div>
                      )}

                      {/* Quiz trigger */}
                      {activeStep.quiz && (
                        <div className="mb-8 rounded-2xl border bg-card p-6">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <div className="text-sm font-semibold">Quick check</div>
                              <div className="text-xs text-muted-foreground">Answer to unlock full confidence before moving on.</div>
                            </div>
                            <Button className="rounded-full" onClick={() => beginQuiz(activeModule.id, activeStep)}>
                              Start quiz
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      {activeStep.type === "cta" && (
                        <div className="rounded-3xl border bg-gradient-to-br from-yellow-500/10 to-red-500/10 p-8 text-center">
                          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-yellow-400 to-teal-400 text-3xl">
                            🎯
                          </div>
                          <div className="text-2xl font-bold">{activeStep.title}</div>
                          <div className="mt-2 text-muted-foreground">
                            {teachers[activeModule.teacherId]?.signoffLine ?? "You did it. Keep going."}
                          </div>
                          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Button className="rounded-full bg-red-500 hover:bg-red-600" onClick={finishModule}>
                              Mark complete
                              <CheckCircle2 className="ml-2 h-4 w-4" />
                            </Button>
                            <Button variant="outline" className="rounded-full" onClick={goHub}>
                              Back to hub
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Scroll gate bar */}
                    {activeStep.type !== "cta" && !scrollGateReady && (
                      <div className="sticky bottom-0 border-t bg-background/90 backdrop-blur">
                        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 md:px-8">
                          <div className="text-sm text-muted-foreground">Read through the content to continue.</div>
                          <Button size="sm" disabled className="rounded-full">
                            Continue →
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </main>
              </div>
            </div>
          )}

          {/* Quiz overlay */}
          {quizOpen && quizState && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="w-full max-w-lg rounded-3xl border bg-card p-6 shadow-2xl">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full border bg-muted text-xl">
                    {teachers[activeModule?.teacherId ?? ""]?.avatar ?? "👩🏾‍🏫"}
                  </div>
                  <Badge className="rounded-full bg-yellow-500/10 text-yellow-500" variant="secondary">
                    ✦ Quick Check
                  </Badge>
                  <button
                    className="ml-auto grid h-9 w-9 place-items-center rounded-full border bg-muted hover:bg-muted/70"
                    onClick={() => setQuizOpen(false)}
                    aria-label="Close quiz"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-lg font-semibold">{quizState.quiz.question}</div>

                <div className="mt-4 space-y-2">
                  {quizState.quiz.options.map((opt, idx) => {
                    const selected = quizState.selectedIdx === idx;
                    const correct = quizState.revealed && idx === quizState.quiz.correct;
                    const wrong = quizState.revealed && selected && idx !== quizState.quiz.correct;
                    return (
                      <button
                        key={opt}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                          !quizState.revealed && "hover:border-yellow-500/30 hover:bg-yellow-500/10",
                          selected && !quizState.revealed && "border-yellow-500/50 bg-yellow-500/10",
                          correct && "border-teal-500/50 bg-teal-500/10 text-teal-500",
                          wrong && "border-red-500/50 bg-red-500/10 text-red-500"
                        )}
                        onClick={() => {
                          if (quizState.revealed) return;
                          submitQuiz(idx);
                        }}
                        disabled={quizState.revealed}
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] font-semibold",
                            correct && "border-teal-500 bg-teal-500 text-black",
                            wrong && "border-red-500 bg-red-500 text-white",
                            !correct && !wrong && "border-border bg-muted"
                          )}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {quizState.revealed && (
                  <div
                    className={cn(
                      "mt-4 rounded-xl border p-4 text-sm",
                      quizState.selectedIdx === quizState.quiz.correct
                        ? "border-teal-500/40 bg-teal-500/10 text-teal-500"
                        : "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                    )}
                  >
                    {quizState.selectedIdx === quizState.quiz.correct
                      ? quizState.quiz.feedback.correct
                      : quizState.quiz.feedback.wrong}
                  </div>
                )}

                <Button
                  className="mt-5 w-full rounded-full"
                  onClick={() => setQuizOpen(false)}
                  disabled={!quizState.revealed}
                >
                  Continue learning →
                </Button>
              </div>
            </div>
          )}
        </>

    </div>
  );
}

