import { Metadata } from 'next';
import { Budget101Shell } from '@/components/learn/budget-101/Budget101Shell';

export const metadata: Metadata = {
  title: 'Budget 101 (Interactive) - Learn - Budget Ndio Story',
  description:
    "Interactive Budget 101: money in & out, national vs county, the budget cycle, and where you show up. Start here to understand Kenya's budget.",
};

export default function Budget101Page() {
  return (
    <main className="min-h-screen bg-background">
      <Budget101Shell />
    </main>
  );
}
