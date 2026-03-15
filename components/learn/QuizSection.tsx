"use client";

import { useState } from "react";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUIZ_QUESTIONS, QUESTIONS_PER_PAGE } from "@/lib/learn-content";
import { cn } from "@/lib/utils";

export function QuizSection() {
  const [page, setPage] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  const [showResults, setShowResults] = useState(false);

  const totalPages = Math.ceil(QUIZ_QUESTIONS.length / QUESTIONS_PER_PAGE);
  const start = page * QUESTIONS_PER_PAGE;
  const questionsOnPage = QUIZ_QUESTIONS.slice(start, start + QUESTIONS_PER_PAGE);

  const correctCount = QUIZ_QUESTIONS.reduce(
    (acc, q, idx) => acc + (quizAnswers[idx] === q.correctIndex ? 1 : 0),
    0
  );
  const allAnswered = QUIZ_QUESTIONS.every((_, i) => quizAnswers[i] != null);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-foreground">
        <Lightbulb className="h-5 w-5 text-primary" />
        Budget detective
      </h2>

      <div className="space-y-6">
        {questionsOnPage.map((q, localIdx) => {
          const qIdx = start + localIdx;
          return (
            <div key={qIdx} className="space-y-3">
              <p className="text-sm font-medium text-foreground">
                {qIdx + 1}. {q.question}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, optIdx) => {
                  const selected = quizAnswers[qIdx] === optIdx;
                  const isCorrect = optIdx === q.correctIndex;
                  const show = showResults;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => {
                        setQuizAnswers((p) => ({ ...p, [qIdx]: optIdx }));
                        setShowResults(false);
                      }}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-left text-sm transition",
                        !show
                          ? selected
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-muted/30 text-foreground hover:border-primary/40 hover:bg-muted/50"
                          : isCorrect
                            ? "border-green-500/40 bg-green-500/10 text-foreground dark:border-green-400/40 dark:bg-green-400/10"
                            : selected
                              ? "border-red-500/40 bg-red-500/10 text-foreground dark:border-red-400/40 dark:bg-red-400/10"
                              : "border-border bg-muted/20 text-muted-foreground"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            {page + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          >
            Next
          </Button>
        </div>
        <div className="flex items-center gap-3">
          {showResults && (
            <span className="text-sm text-muted-foreground">
              Score: <strong className="text-primary">{correctCount}</strong> / {QUIZ_QUESTIONS.length}
            </span>
          )}
          <Button
            size="sm"
            onClick={() => setShowResults(true)}
            disabled={!allAnswered}
          >
            Check answers
          </Button>
        </div>
      </div>
    </div>
  );
}
