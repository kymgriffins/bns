"use client";

import { FileText, Calendar, Megaphone, Bell } from "lucide-react";

const BENEFITS = [
  {
    icon: FileText,
    title: "Budget briefs",
    description: "Plain-language summaries of national and county budgets.",
  },
  {
    icon: Megaphone,
    title: "Civic hub updates",
    description: "New learning modules, quizzes, and reflection prompts.",
  },
  {
    icon: Calendar,
    title: "Participation reminders",
    description: "Know when barazas, hearings, and public input windows open.",
  },
  {
    icon: Bell,
    title: "No spam",
    description: "We only email when there’s something useful. Unsubscribe anytime.",
  },
];

export function SubscribeBenefits() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">What you’ll get</h3>
      <ul className="space-y-4">
        {BENEFITS.map(({ icon: Icon, title, description }) => (
          <li key={title} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">{title}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
