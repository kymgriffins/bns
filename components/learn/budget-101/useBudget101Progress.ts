'use client';

import { useCallback, useEffect, useState } from 'react';
import { trackBnsModuleProgress } from '@/lib/analytics';

const STORAGE_KEY = 'bns-budget-101-progress';

export interface Budget101Progress {
  currentChapter: number;
  completedChapters: number[];
  quizScore: number | null;
  completedAt: string | null;
}

const defaultProgress: Budget101Progress = {
  currentChapter: 0,
  completedChapters: [],
  quizScore: null,
  completedAt: null,
};

export function useBudget101Progress(totalChapters: number) {
  const [progress, setProgress] = useState<Budget101Progress>(defaultProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Budget101Progress;
        setProgress({
          currentChapter: Math.min(parsed.currentChapter ?? 0, totalChapters - 1),
          completedChapters: Array.isArray(parsed.completedChapters) ? parsed.completedChapters : [],
          quizScore: parsed.quizScore ?? null,
          completedAt: parsed.completedAt ?? null,
        });
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, [totalChapters]);

  const saveProgress = useCallback((next: Partial<Budget101Progress>) => {
    setProgress((prev) => {
      const merged = { ...prev, ...next };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch {
          // ignore
        }
      }
      return merged;
    });
  }, []);

  const setChapter = useCallback(
    (chapter: number) => {
      const clamped = Math.max(0, Math.min(chapter, totalChapters - 1));
      saveProgress({ currentChapter: clamped });
    },
    [totalChapters, saveProgress]
  );

  const markChapterComplete = useCallback(
    (chapter: number) => {
      setProgress((prev) => {
        const completed = prev.completedChapters.includes(chapter)
          ? prev.completedChapters
          : [...prev.completedChapters, chapter].sort((a, b) => a - b);
        const next = { ...prev, completedChapters: completed };
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch {
            // ignore
          }
        }
        const percent = totalChapters > 0 ? (completed.length / totalChapters) * 100 : 0;
        trackBnsModuleProgress('budget-101', `chapter_${chapter}`, percent, completed.length === totalChapters);
        return next;
      });
    },
    [totalChapters]
  );

  const setQuizScore = useCallback(
    (score: number) => {
      saveProgress({ quizScore: score, completedAt: new Date().toISOString() });
    },
    [saveProgress]
  );

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const progressPercent =
    totalChapters > 0
      ? (progress.completedChapters.length / totalChapters) * 100
      : 0;

  return {
    progress,
    hydrated,
    setChapter,
    markChapterComplete,
    setQuizScore,
    saveProgress,
    resetProgress,
    progressPercent,
  };
}
