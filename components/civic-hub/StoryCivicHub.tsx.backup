"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { getModule, loadModuleSlides, getUnlockedModules, getAllModules, convertToHubModule } from "@/app/learn/utils";
import type { ModuleMetadata, HubModule, StorySlide, QuizState } from "@/app/learn/utils";

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

type ViewMode = "hub" | "module" | "stories";
type ActiveTab = "stories" | "learn" | "videos" | "quiz";

type ProgressState = {
  [moduleId: string]: {
    slide: number;
    completed?: boolean;
  };
};

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
    answered: [],
    selectedIdx: [],
  });
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: "" });

  // Module data loading
  const [modules, setModules] = useState<ModuleMetadata[]>([]);
  const [currentSlides, setCurrentSlides] = useState<StorySlide[]>([]);
  const [activeModule, setActiveModule] = useState<ModuleMetadata | null>(null);
  const [loadingSlides, setLoadingSlides] = useState(false);

  // Load modules on mount
  useEffect(() => {
    const loadModules = async () => {
      const unlockedModules = getUnlockedModules();
      setModules(unlockedModules);
    };
    loadModules();
  }, []);

  // Load slides when module changes or level changes
  useEffect(() => {
    const loadSlides = async () => {
      if (!activeModuleId || !activeModule) {
        setCurrentSlides([]);
        return;
      }

      setLoadingSlides(true);
      try {
        // Determine which level to load (basic or advanced)
        const level = activeModuleId.includes("advanced") ? "advanced" : "basic";
        const slides = await loadModuleSlides(activeModuleId.replace("-advanced", ""), level);

        if (slides) {
          setCurrentSlides(slides);
          // Validate and re-initialize quiz state based on number of quizzes
          const quizCount = slides.filter((s) => s.type === "quiz").length;
          setQuizState({
            answered: new Array(quizCount).fill(false),
            selectedIdx: new Array(quizCount).fill(null),
          });
        }
      } catch (error) {
        console.error("Failed to load slides:", error);
        setCurrentSlides([]);
      } finally {
        setLoadingSlides(false);
      }
    };

    loadSlides();
  }, [activeModuleId, activeModule]);

  // Get current hub module
  const currentHubModule = useMemo(() => {
    if (!activeModule) return null;

    // Determine level from activeModuleId
    const level = activeModuleId?.includes("advanced") ? "advanced" : "basic";
    return convertToHubModule(activeModule, level as any);
  }, [activeModule, activeModuleId]);

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
    if (!activeModuleId) return;

    setProgress((prev) => {
      const current = prev[activeModuleId] ?? { slide: 0, completed: false };
      const nextItem = {
        slide: Math.max(current.slide, newSlide),
        completed: completed ?? current.completed,
      };
      const next = { ...prev, [activeModuleId]: nextItem };
      saveProgress(next);
      return next;
    });
  }

  function startModule(id: string) {
    const moduleData = getModule(id);
    if (!moduleData) return;

    setActiveModule(moduleData);
    setActiveModuleId(id);

    const existing = progress[id];
    const startAt = existing && !existing.completed ? Math.min(existing.slide, totalSlides - 1) : 0;
    setSlideIdx(startAt);
  }

  function exitToMenu() {
    setActiveModuleId(null);
    setCurrentSlides([]);
    setActiveModule(null);
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
    !!activeModuleId && !loadingSlides
  );

  // Build hub modules list from metadata
  const hubModules = useMemo(() => {
    const hubs: HubModule[] = [];
    modules.forEach((metadata) => {
      if (metadata.structure.basic) {
        const hub = convertToHubModule(metadata, "basic");
        if (hub) hubs.push(hub);
      }
      if (metadata.structure.advanced) {
        const hub = convertToHubModule(metadata, "advanced");
        if (hub) hubs.push(hub);
      }
    });
    return hubs;
  }, [modules]);

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
              <button className="civic-top-btn" onClick={toggleTheme} style={{ marginLeft: "auto" }}>
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
                  const completedCount = hubModules.filter((m) => progress[m.id]?.completed).length;
                  const progressPct = hubModules.length ? Math.round((completedCount / hubModules.length) * 100) : 0;
                  return (
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {hubModules.length} modules · {completedCount} done
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
                {hubModules.map((m) => {
                  const p = progress[m.id] ?? { slide: 0, completed: false };
                  const pct = p.completed ? 100 : m.slidesCount ? Math.round((p.slide / (m.slidesCount || 1)) * 100) : 0;
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
                    m.level === "advanced"
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
                              {m.level === "advanced" ? "Advanced" : "Basic"}
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
                            📋 {m.slidesCount} slides
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
        {activeModuleId && !loadingSlides && currentSlide && (
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
                  <div className="civic-t-ring">{activeModule?.teacher.avatar}</div>
                  <div className="civic-t-info">
                    <div className="civic-t-name">{activeModule?.teacher.name}</div>
                    <div className="civic-t-role">{activeModule?.teacher.role}</div>
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

        {/* Loading state */}
        {activeModuleId && loadingSlides && (
          <div className="flex items-center justify-center" style={{ height: "100vh" }}>
            <div className="text-center">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✦</div>
              <p style={{ fontSize: "0.875rem", color: "var(--ch-text-m)" }}>Loading module...</p>
            </div>
          </div>
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

// [Continue with renderSlideContent function below...]
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
            <div style={{ fontSize: "0.78rem", lineHeight: 1.55 }}>{c.debtNote.replace(/\*(.+?)\*/g, "<em>$1</em>")}</div>
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
        <div className="civic-quote-block" dangerouslySetInnerHTML={{ __html: c.quote.replace(/\*(.+?)\*/g, "<strong>$1</strong>") }} />
      </div>
    );
  }

  if (slide.type === "quiz") {
    const qi = slide.quizIdx ?? 0;
    const answered = quizState.answered[qi];
    const selected = quizState.selectedIdx[qi];
    const quiz = slide.content as any;
    return (
      <div className="civic-quiz-slide civic-slide-inner">
        <div className="civic-qz-tag">✦ Knowledge Check {qi + 1}</div>
        <div className="civic-qz-question">{quiz.question}</div>
        <div className="civic-qz-options">
          {quiz.options.map((o: any, i: number) => {
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
              className={`civic-cta-btn ${a.style.replace("cta-btn-", "civic-cta-btn-")}`}
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
