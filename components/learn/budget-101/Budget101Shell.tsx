'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useBudget101Progress } from './useBudget101Progress';
import { Chapter1Money } from './chapters/Chapter1Money';
import { Chapter2NationalCounty } from './chapters/Chapter2NationalCounty';
import { Chapter3BudgetCycle } from './chapters/Chapter3BudgetCycle';
import { Chapter4WhereYouShowUp } from './chapters/Chapter4WhereYouShowUp';
import { WrapUp } from './chapters/WrapUp';

const CHAPTERS = [
  { id: 'money', title: 'Money in & out' },
  { id: 'national', title: 'National vs county' },
  { id: 'cycle', title: 'Budget cycle' },
  { id: 'you', title: 'Where you show up' },
  { id: 'wrap', title: 'Wrap-up' },
];

const TOTAL_CHAPTERS = 5; // 4 chapters + wrap-up

export function Budget101Shell() {
  const {
    progress,
    hydrated,
    setChapter,
    markChapterComplete,
    setQuizScore,
    progressPercent,
    resetProgress,
  } = useBudget101Progress(TOTAL_CHAPTERS);

  const [onboardingDone, setOnboardingDone] = useState(false);
  if (!hydrated) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Onboarding screen
  if (!onboardingDone) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="card-2026 p-8 md:p-10 space-y-6">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Budget 101
          </p>
          <h1 className="text-hero-2026 font-semibold">
            From &quot;What even is a budget?&quot; to &quot;I can explain this.&quot;
          </h1>
          <p className="text-muted-foreground">
            In about 10 minutes you&apos;ll get the basics: where Kenya&apos;s money comes from,
            how national and county budgets work, the budget cycle, and where you can show up.
            Interactive, no jargon.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="rounded-full px-6"
              onClick={() => {
                setOnboardingDone(true);
                setChapter(0);
              }}
            >
              Start Budget 101
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-6" asChild>
              <Link href="/learn">Back to Learn hub</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="sm" className="rounded-full -ml-2" asChild>
              <Link href="/learn">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Learn hub
              </Link>
            </Button>
            <div className="flex-1 max-w-xs">
              <Progress value={progressPercent} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(progressPercent)}% complete
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2 mt-3" aria-label="Chapters">
            {CHAPTERS.map((ch, i) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setChapter(i)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  progress.currentChapter === i
                    ? 'bg-primary text-primary-foreground'
                    : progress.completedChapters.includes(i)
                      ? 'bg-primary/10 text-primary'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {progress.completedChapters.includes(i) ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Circle className="h-3.5 w-3.5" />
                )}
                {ch.title}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {progress.currentChapter === 0 && (
          <Chapter1Money
            onComplete={() => {
              markChapterComplete(0);
              setChapter(1);
            }}
          />
        )}
        {progress.currentChapter === 1 && (
          <Chapter2NationalCounty
            onComplete={() => {
              markChapterComplete(1);
              setChapter(2);
            }}
          />
        )}
        {progress.currentChapter === 2 && (
          <Chapter3BudgetCycle
            onComplete={() => {
              markChapterComplete(2);
              setChapter(3);
            }}
          />
        )}
        {progress.currentChapter === 3 && (
          <Chapter4WhereYouShowUp
            onComplete={() => {
              markChapterComplete(3);
              setChapter(4);
            }}
          />
        )}
        {progress.currentChapter === 4 && (
          <WrapUp
            quizScore={progress.quizScore}
            onQuizComplete={setQuizScore}
            onReset={resetProgress}
          />
        )}
      </div>
    </div>
  );
}
