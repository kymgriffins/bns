'use client';

import React, { useState } from 'react';
import { ArrowRight, Building2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Chapter2NationalCountyProps {
  onComplete: () => void;
}

const NATIONAL_ITEMS = [
  'Defence, foreign affairs',
  'National roads, railways',
  'Higher education (universities)',
  'Health policy, referral hospitals',
  'Debt servicing',
];

const COUNTY_ITEMS = [
  'County roads, markets',
  'Pre-primary, polytechnics',
  'Primary healthcare, dispensaries',
  'Agriculture, livestock',
  'Public participation at county level',
];

export function Chapter2NationalCounty({ onComplete }: Chapter2NationalCountyProps) {
  const [selected, setSelected] = useState<'national' | 'county' | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Chapter 2
        </p>
        <h2 className="text-h2-2026 font-semibold mt-1">National vs county</h2>
        <p className="text-muted-foreground mt-2">
          Kenya has two main levels of government that share the budget: <strong>national</strong>{' '}
          and <strong>47 counties</strong>. Tap a card to see who does what.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => setSelected(selected === 'national' ? null : 'national')}
          className={`text-left transition-all rounded-2xl border-2 p-6 ${
            selected === 'national'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 bg-card'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <span className="font-semibold text-lg">National government</span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {NATIONAL_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                {item}
              </li>
            ))}
          </ul>
        </button>

        <button
          type="button"
          onClick={() => setSelected(selected === 'county' ? null : 'county')}
          className={`text-left transition-all rounded-2xl border-2 p-6 ${
            selected === 'county'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 bg-card'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <span className="font-semibold text-lg">County government</span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {COUNTY_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                {item}
              </li>
            ))}
          </ul>
        </button>
      </div>

      <Card className="card-2026 border-primary/20">
        <CardContent className="p-6">
          <p className="text-sm">
            Your county gets a share of national revenue (and can raise some of its own). When you
            participate in budget discussions, you might do it at <strong>national</strong> level
            (e.g. through MPs) or at <strong>county</strong> level (barazas, county assembly). Know
            which level handles what so you know where to show up.
          </p>
        </CardContent>
      </Card>

      <Button size="lg" className="rounded-full px-6" onClick={onComplete}>
        Next: Budget cycle
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
