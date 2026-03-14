'use client';

import React, { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Chapter4WhereYouShowUpProps {
  onComplete: () => void;
}

const SCENARIOS = [
  {
    question: 'Your county is holding a public participation baraza on the draft budget. You should:',
    options: [
      { label: 'Skip it — only officials understand budgets', value: 'skip' },
      { label: 'Go with a few neighbours and ask how your ward’s priorities are reflected', value: 'go' },
      { label: 'Send a written submission only', value: 'written' },
    ],
    best: 'go',
    feedback: 'Showing up with others and asking specific questions (e.g. ward priorities) makes your voice count. Barazas are exactly for this.',
  },
  {
    question: 'The BPS says "agriculture transformation" is a priority. You’re a young farmer. You could:',
    options: [
      { label: 'Ignore it — national plans never reach us', value: 'ignore' },
      { label: 'Check your county budget to see if irrigation or extension services are funded', value: 'check' },
      { label: 'Wait for the county to contact you', value: 'wait' },
    ],
    best: 'check',
    feedback: 'County budgets must align with national priorities. Checking whether your county is funding agriculture programs helps you hold them accountable.',
  },
];

export function Chapter4WhereYouShowUp({ onComplete }: Chapter4WhereYouShowUpProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});

  const handleChoice = (scenarioIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [scenarioIndex]: value }));
    setShowFeedback((prev) => ({ ...prev, [scenarioIndex]: true }));
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Chapter 4
        </p>
        <h2 className="text-h2-2026 font-semibold mt-1">Where you show up</h2>
        <p className="text-muted-foreground mt-2">
          Your voice fits into the budget process in real ways. Try these scenarios — there’s no
          wrong answer; we’ll suggest what often works best.
        </p>
      </div>

      <div className="space-y-8">
        {SCENARIOS.map((s, i) => (
          <Card key={i} className="card-2026">
            <CardContent className="p-6 space-y-4">
              <p className="font-medium">{s.question}</p>
              <div className="space-y-2">
                {s.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleChoice(i, opt.value)}
                    className={`w-full text-left rounded-lg border-2 p-4 transition-all ${
                      answers[i] === opt.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {showFeedback[i] && (
                <div className="flex gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <MessageCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">{s.feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button size="lg" className="rounded-full px-6" onClick={onComplete}>
        Go to wrap-up
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
