"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Calendar,
  Users,
  FileText,
  BarChart3,
  MapPin,
  ChevronRight,
  Lock,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BentoCard, BentoSection } from "@/components/ui/bento-frame";
import { BentoScrollAnimation, BentoStaggerGrid, BentoGridItem, BentoSectionHeader } from "@/components/ui/bento-animations";
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { cn } from "@/lib/utils";

export interface Module {
  id: string;
  iconName?: string;
  icon?: React.ElementType;
  title: string;
  description: string;
  lessons: string[];
  isNew: boolean;
  isAvailable: boolean;
  estimatedMinutes?: number;
}

interface LearnClientProps {
  modules: Module[];
}

const howToUseSteps = [
  {
    icon: Rocket,
    title: "Start with Module 001",
    description: "Begin with BPS 2026 to understand the big picture of Kenya's budget.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Clock,
    title: "10-15 min per module",
    description: "Short, digestible lessons you can complete during your coffee break.",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    icon: Target,
    title: "Take the quiz & actions",
    description: "Each module ends with a quick quiz and real actions you can take.",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    icon: Lightbulb,
    title: "Apply what you learned",
    description: "Use your new knowledge to engage with budget decisions in your county.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
];

export function LearnClient({ modules }: LearnClientProps) {
  // Internal icon map - defined here since this is a client component
  // This avoids passing React components from Server to Client Components
  const iconMap: Record<string, React.ElementType> = {
    BookOpen,
    BarChart3,
    Users,
  };

  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Helper to get icon component
  const getIconComponent = (module: Module): React.ElementType => {
    // If module has direct icon prop (passed from client), use it
    if (module.icon) return module.icon;
    // Otherwise look up from iconMap by name
    if (module.iconName && iconMap[module.iconName]) return iconMap[module.iconName];
    // Default fallback
    return BookOpen;
  };

  useEffect(() => {
    setIsClient(true);
    // Load completed modules from localStorage
    const saved = localStorage.getItem("bns-completed-modules");
    if (saved) {
      try {
        setCompletedModules(JSON.parse(saved));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  const isModuleCompleted = (moduleId: string) => completedModules.includes(moduleId);

  // Separate available and coming soon modules
  const availableModules = modules.filter((m) => m.isAvailable);
  const comingSoonModules = modules.filter((m) => !m.isAvailable);

  return (
    <main className="min-h-screen">
      {/* How to Use This Page - New Section */}
      <section className="border-b border-border bg-secondary/10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight">How to use these modules</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Your journey from "what's a budget?" to "I can explain this to anyone"
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {howToUseSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-border/50"
              >
                <div className={cn("p-2 rounded-lg shrink-0", step.color)}>
                  <step.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sliding marquee for upcoming drops / discounts */}
      <section className="border-b border-border bg-secondary/20 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Marquee pauseOnHover className="py-1" duration="26s">
            <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                New
              </span>
              <span className="font-medium">Module 001 · BPS 2026 live now</span>
              <span className="text-muted-foreground">
                Start with the big picture in under 15 minutes.
              </span>
            </div>
            <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                Coming soon
              </span>
              <span className="font-medium">Creator track · Visualising the budget</span>
              <span className="text-muted-foreground">
                Turn dry numbers into content people actually share.
              </span>
            </div>
            <div className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                Cohort
              </span>
              <span className="font-medium">Youth Budget Lab · Live micro‑course</span>
              <span className="text-muted-foreground">
                Limited seats, early access via Learn hub.
              </span>
            </div>
          </Marquee>
        </div>
      </section>

      {/* Learning Modules - Available Now */}
      <section id="modules" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold tracking-tight">Learning modules</h2>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  {availableModules.length} Available now
                </Badge>
              </div>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Move from "I kind of get it" to "I can explain this to my friends" — one small
                module at a time.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>Self‑paced</span>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-secondary/40 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Quiz + actions inside</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableModules.map((module) => (
              <BentoCard
                key={module.title}
                padding="lg"
                accentColor="neutral"
                hover
                className={`group h-full rounded-2xl border border-border/70 bg-background/80 backdrop-blur-sm transition-all ${
                  module.isNew ? "border-primary/40 bg-primary/5" : ""
                }`}
              >
                <div className="flex h-full flex-col">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        {(() => {
                          const Icon = getIconComponent(module);
                          return <Icon className="h-4 w-4" />;
                        })()}
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-medium">Budget 101</p>
                        {module.isNew ? (
                          <p className="text-[11px] uppercase tracking-wide text-primary">
                            Fresh drop
                          </p>
                        ) : (
                          <p className="text-[11px] uppercase tracking-wide">
                            In this track
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-[11px] text-muted-foreground">
                      {module.isNew && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5">New</span>
                      )}
                      {module.estimatedMinutes && (
                        <span className="rounded-full bg-secondary px-2 py-0.5 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {module.estimatedMinutes} min
                        </span>
                      )}
                      {isClient && isModuleCompleted(module.id) && (
                        <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 flex items-center gap-1 dark:bg-emerald-900/30 dark:text-emerald-300">
                          <CheckCircle2 className="h-3 w-3" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="mb-2 text-base font-semibold leading-snug">{module.title}</h3>
                  <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                    {module.description}
                  </p>

                  <div className="mb-4 space-y-1.5 text-xs text-muted-foreground">
                    {module.lessons.map((lesson) => (
                      <div key={lesson} className="flex items-center gap-2">
                        <ChevronRight className="h-3 w-3 text-primary" />
                        <span>{lesson}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    variant={module.isNew ? "default" : "outline"}
                    className="mt-auto w-full rounded-full text-sm"
                    disabled={!module.isAvailable}
                  >
                    <Link
                      href={
                        module.isAvailable
                          ? module.isNew
                            ? "/learn/module-one"
                            : `/learn?module=${encodeURIComponent(module.title)}`
                          : "#"
                      }
                    >
                      {module.isAvailable ? (
                        <>
                          {isClient && isModuleCompleted(module.id) ? "Review module" : "Start module"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Coming soon
                        </>
                      )}
                    </Link>
                  </Button>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Modules - Visually Separated */}
      {comingSoonModules.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/5 border-t border-border">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">Coming Soon</h2>
              <Badge variant="secondary" className="bg-secondary">
                {comingSoonModules.length} modules in development
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              These modules are currently being developed. Sign up for updates to be notified when
              they're released.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {comingSoonModules.map((module) => (
                <BentoCard
                  key={module.title}
                  padding="lg"
                  accentColor="neutral"
                  hover
                  className="group h-full rounded-2xl border border-dashed border-border/50 bg-background/40 backdrop-blur-sm opacity-75"
                >
                  <div className="flex h-full flex-col">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                          {(() => {
                            const Icon = getIconComponent(module);
                            return <Icon className="h-4 w-4" />;
                          })()}
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-medium">Budget 101</p>
                          <p className="text-[11px] uppercase tracking-wide">In development</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px]">
                        <Lock className="h-3 w-3 inline mr-1" />
                        Locked
                      </span>
                    </div>

                    <h3 className="mb-2 text-base font-semibold leading-snug">{module.title}</h3>
                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                      {module.description}
                    </p>

                    <div className="mb-4 space-y-1.5 text-xs text-muted-foreground">
                      {module.lessons.map((lesson) => (
                        <div key={lesson} className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3" />
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="mt-auto w-full rounded-full text-sm"
                      disabled
                    >
                      <Link href="#">
                        <Lock className="mr-2 h-4 w-4" />
                        Coming soon
                      </Link>
                    </Button>
                  </div>
                </BentoCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA to Take Action */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-primary/5 border-t border-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            Ready to put your knowledge into action?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            After completing the modules, you'll have the skills to engage with budget decisions in
            your county, submit memos, and make your voice heard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/take-action">
                Explore action pathways
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/subscribe">Support our work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Promo strip for events / discounts / courses */}
      <BentoSection className="bg-secondary/10">
        <BentoSectionHeader
          title="Upcoming events, discounts & creator courses"
          subtitle="Drop‑style launches, not boring bulletins. Pick what matches your vibe and schedule."
        />
        <BentoStaggerGrid stagger={0.08} className="grid-cols-1 md:grid-cols-3 gap-6">
          <BentoGridItem animation="fadeInUp">
            <BentoCard padding="lg" hover accentColor="default" className="h-full">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Live · Online</span>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                  Limited seats
                </span>
              </div>
              <h3 className="mb-2 text-base font-semibold">
                Youth Budget Lab · Cohort‑based micro‑course
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                A 3‑session sprint where you unpack the national budget with facilitators and ship
                something small: a thread, explainer, or local memo.
              </p>
              <Button asChild size="sm" className="rounded-full text-sm">
                <Link href="/take-action">
                  Get on the waitlist
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </BentoCard>
          </BentoGridItem>

          <BentoGridItem animation="fadeInUp" delay={0.1}>
            <BentoCard padding="lg" hover accentColor="default" className="h-full">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BarChart3 className="h-4 w-4" />
                  <span>Creator track</span>
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  50% launch discount
                </span>
              </div>
              <h3 className="mb-2 text-base font-semibold">
                Visualising the Budget for TikTok & IG
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Learn formats, hooks, and simple data visuals that make budget content scroll‑stopping
                instead of sleepy.
              </p>
              <Button asChild size="sm" variant="outline" className="rounded-full text-sm">
                <Link href="/media-hub">
                  See media hub
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </BentoCard>
          </BentoGridItem>

          <BentoGridItem animation="fadeInUp" delay={0.16}>
            <BentoCard padding="lg" hover accentColor="default" className="h-full">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>In‑person · Nairobi</span>
                </div>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">
                  Coming soon
                </span>
              </div>
              <h3 className="mb-2 text-base font-semibold">Campus Budget Voices pop‑ups</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Short campus sessions with play‑by‑play explainers, live polls, and pathways to join
                county‑level work.
              </p>
              <Button asChild size="sm" variant="outline" className="rounded-full text-sm">
                <Link href="/take-action">
                  Invite us to your campus
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </BentoCard>
          </BentoGridItem>
        </BentoStaggerGrid>
      </BentoSection>
    </main>
  );
}
