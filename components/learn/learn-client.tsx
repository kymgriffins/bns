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
import { BentoSectionHeader, BentoStaggerGrid, BentoGridItem } from "@/components/ui/bento-animations";
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
  CardHover,
} from "@/components/animations/hig-motion";
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
    GraduationCap,
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
      {/* How to Use - HIG clarity + staggered motion */}
      <section className="border-b border-border bg-muted/30 py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              How to use these modules
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              Your journey from &quot;what&apos;s a budget?&quot; to &quot;I can explain this to anyone&quot;
            </p>
          </ScrollReveal>
          <StaggerChildren className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howToUseSteps.map((step, index) => (
              <StaggerItem key={index}>
                <CardHover className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", step.color)}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </CardHover>
              </StaggerItem>
            ))}
          </StaggerChildren>
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
          <ScrollReveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  Learning modules
                </h2>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  {availableModules.length} available now
                </Badge>
              </div>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Move from &quot;I kind of get it&quot; to &quot;I can explain this to my friends&quot; — one small
                module at a time.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <div className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>Self‑paced</span>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>Quiz + actions inside</span>
              </div>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableModules.map((module) => (
              <StaggerItem key={module.id}>
                <CardHover className="h-full rounded-2xl">
                  <BentoCard
                    padding="lg"
                    accentColor="neutral"
                    className={cn(
                      "group h-full rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300",
                      module.isNew && "border-primary/30 bg-primary/5"
                    )}
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
                          ? `/learn/${module.id}`
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
                </CardHover>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Coming Soon Modules */}
      {comingSoonModules.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/20 border-t border-border">
          <div className="max-w-6xl mx-auto space-y-8">
            <ScrollReveal className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">Coming soon</h2>
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                {comingSoonModules.length} modules in development
              </Badge>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-sm text-muted-foreground max-w-2xl">
                These modules are currently being developed. Sign up for updates to be notified when
                they&apos;re released.
              </p>
            </ScrollReveal>
            <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {comingSoonModules.map((module) => (
                <StaggerItem key={module.title}>
                  <BentoCard
                    padding="lg"
                    accentColor="neutral"
                    className="group h-full rounded-2xl border border-dashed border-border bg-card/50 opacity-90"
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
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* CTA to Take Action */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-primary/5 border-t border-primary/10">
        <ScrollReveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Ready to put your knowledge into action?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            After completing the modules, you&apos;ll have the skills to engage with budget decisions in
            your county, submit memos, and make your voice heard.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full transition-transform duration-200 active:scale-[0.98]"
            >
              <Link href="/take-action" className="inline-flex items-center gap-2">
                Explore action pathways
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full transition-transform duration-200 active:scale-[0.98]"
            >
              <Link href="/subscribe">Support our work</Link>
            </Button>
          </div>
        </ScrollReveal>
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
