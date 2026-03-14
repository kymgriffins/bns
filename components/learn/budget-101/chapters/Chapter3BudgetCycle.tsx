'use client';

import React, { useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Chapter3BudgetCycleProps {
  onComplete: () => void;
}

const STEPS = [
  { label: 'BPS / CFSP', desc: 'Policy priorities and ceilings (Feb–Mar)' },
  { label: 'Estimates', desc: 'Ministries/counties submit detailed budgets' },
  { label: 'Approval', desc: 'Parliament/County Assembly vote' },
  { label: 'Implementation', desc: 'Spending and delivery through the year' },
  { label: 'Audit & review', desc: 'Auditor-General and oversight' },
  { label: 'Public participation', desc: 'Your input at various stages' },
];

export function Chapter3BudgetCycle({ onComplete }: Chapter3BudgetCycleProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Chapter 3
        </p>
        <h2 className="text-h2-2026 font-semibold mt-1">The budget cycle</h2>
        <p className="text-muted-foreground mt-2">
          Kenya&apos;s budget doesn&apos;t happen in one day. It follows a cycle: plan → table →
          approve → implement → audit. Tap each step to see where it fits.
        </p>
      </div>

      <div className="relative">
        <div className="space-y-2">
          {STEPS.map((step, i) => (
            <button
              key={step.label}
              type="button"
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                activeIndex === i ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="font-medium">{step.label}</span>
              </div>
              {activeIndex === i && (
                <p className="mt-2 ml-11 text-sm text-muted-foreground">{step.desc}</p>
              )}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Public participation is built into the cycle: you can give input during formulation, at
        county barazas, and through your representatives. Knowing the calendar helps you show up
        at the right time.
      </p>

      <Button size="lg" className="rounded-full px-6" onClick={onComplete}>
        Next: Where you show up
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
