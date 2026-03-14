'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Trophy, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const QUIZ = [
  {
    question: 'When government spending is higher than revenue, we call the gap:',
    options: [
      { value: 'a', label: 'Surplus' },
      { value: 'b', label: 'Deficit' },
      { value: 'c', label: 'Balance' },
    ],
    correct: 'b',
  },
  {
    question: 'County governments are responsible for things like:',
    options: [
      { value: 'a', label: 'Defence and foreign affairs' },
      { value: 'b', label: 'Primary healthcare and county roads' },
      { value: 'c', label: 'National debt servicing' },
    ],
    correct: 'b',
  },
  {
    question: 'Public participation in the budget cycle means:',
    options: [
      { value: 'a', label: 'Only MPs can give input' },
      { value: 'b', label: 'Citizens can give input at stages like barazas and submissions' },
      { value: 'c', label: 'Budget is decided without any public input' },
    ],
    correct: 'b',
  },
];

interface WrapUpProps {
  quizScore: number | null;
  onQuizComplete: (score: number) => void;
  onReset: () => void;
}

export function WrapUp({ quizScore, onQuizComplete, onReset }: WrapUpProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    let correct = 0;
    QUIZ.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    onQuizComplete(correct);
    setSubmitted(true);
  };

  const score = submitted
    ? QUIZ.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0)
    : quizScore ?? 0;
  const total = QUIZ.length;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Wrap-up
        </p>
        <h2 className="text-h2-2026 font-semibold mt-1">You’re ready to use the budget</h2>
        <p className="text-muted-foreground mt-2">
          Quick recap: money in vs out, national vs county, the cycle, and where you show up.
          Take the short quiz below, then grab our briefings or share what you learned.
        </p>
      </div>

      <Card className="card-2026">
        <CardContent className="p-6 space-y-6">
          <h3 className="font-semibold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Quick quiz
          </h3>
          {QUIZ.map((q, i) => (
            <div key={i} className="space-y-2">
              <p className="text-sm font-medium">{q.question}</p>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [i]: opt.value }))}
                    className={`rounded-full px-4 py-2 text-sm border-2 transition-colors ${
                      answers[i] === opt.value ? 'border-primary bg-primary/10' : 'border-border'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {!submitted && Object.keys(answers).length === total && (
            <Button onClick={handleSubmit} className="rounded-full">
              Submit answers
            </Button>
          )}
          {submitted && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="font-medium">
                You got {score} out of {total}.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {score === total
                  ? "Nice! You've got the basics."
                  : 'Review the chapters anytime from the progress bar above.'}
              </p>
              <Button variant="outline" size="sm" className="mt-3 rounded-full" onClick={onReset}>
                Retry quiz
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="card-2026 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Mail className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Get budget briefings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We send simplified budget updates so you stay in the loop.
            </p>
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/subscribe">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="card-2026 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <FileText className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Explore reports</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Dive into simplified budget reports and sector analysis.
            </p>
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/reports">
                Browse reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg" className="rounded-full px-6">
          <Link href="/learn">
            Back to Learn hub
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-6">
          <Link href="/take-action">Take action</Link>
        </Button>
      </div>
    </div>
  );
}
