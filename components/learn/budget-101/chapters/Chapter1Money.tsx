'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Chapter1MoneyProps {
  onComplete: () => void;
}

export function Chapter1Money({ onComplete }: Chapter1MoneyProps) {
  const [revenue, setRevenue] = useState(60);
  const [spending, setSpending] = useState(75);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Chapter 1
        </p>
        <h2 className="text-h2-2026 font-semibold mt-1">Money in &amp; out</h2>
        <p className="text-muted-foreground mt-2">
          Kenya&apos;s government gets money from taxes and other revenue. It spends on health,
          education, roads, debt interest, and more. When spending is higher than revenue, we borrow
          (deficit).
        </p>
      </div>

      <Card className="card-2026 overflow-hidden">
        <CardContent className="p-6 md:p-8 space-y-8">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Revenue (money in) — e.g. taxes</span>
              <input
                type="range"
                min="0"
                max="100"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="mt-2 w-full h-2 rounded-full appearance-none bg-secondary accent-primary"
              />
              <span className="block text-2xl font-semibold mt-2 text-primary">{revenue}%</span>
            </label>
          </div>
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Spending (money out)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={spending}
                onChange={(e) => setSpending(Number(e.target.value))}
                className="mt-2 w-full h-2 rounded-full appearance-none bg-secondary accent-primary"
              />
              <span className="block text-2xl font-semibold mt-2 text-primary">{spending}%</span>
            </label>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm">
              {spending > revenue ? (
                <>Gap = <strong>deficit</strong> → government borrows to cover the difference.</>
              ) : spending < revenue ? (
                <>Surplus → extra can pay down debt or save.</>
              ) : (
                <>Balanced.</>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        In reality, Kenya often runs a deficit. The 2025/26 budget planned to spend more than it
        collects; the gap is financed by borrowing. Understanding this helps you see why debt and
        revenue collection matter.
      </p>

      <Button size="lg" className="rounded-full px-6" onClick={onComplete}>
        Next: National vs county
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
