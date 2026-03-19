"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Calendar, FileQuestion, Users, GraduationCap, MapPin, BookOpen, MessageSquare, HandHeart, Sparkles, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSection, Container2026, SectionHeader } from "@/components/layout";
import { BentoCard, BentoSection, BentoCTASection } from "@/components/ui/bento-frame";
import { BentoScrollAnimation, BentoStaggerGrid, BentoGridItem, BentoSectionHeader } from "@/components/ui/bento-animations";


// Pathway Progress Tracker
function PathwayTracker() {
  const [completed, setCompleted] = useState(0);
  const pathways = ['Budget Calendar', 'Submission Support', 'Question Bank', 'Community Tracking', 'County Chapters', 'Budget Champion', 'Campus Voices'];
  
  useEffect(() => {
    // Simulate progress tracking
    const timer = setInterval(() => {
      setCompleted(prev => {
        if (prev < pathways.length) return prev + 1;
        return prev;
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-green-400" />
        <h3 className="font-semibold">Your Action Progress</h3>
      </div>
      <p className="text-green-200 text-sm mb-4">Track your civic engagement journey</p>
      
      <div className="space-y-2">
        {pathways.map((pathway, index) => (
          <div 
            key={pathway}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-500 ${
              index < completed ? 'bg-white/20' : 'bg-white/5'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
              index < completed ? 'bg-green-400' : 'bg-white/20'
            }`}>
              {index < completed && <CheckCircle className="w-3 h-3 text-green-900" />}
            </div>
            <span className={`text-sm ${index < completed ? 'text-white' : 'text-green-200'}`}>
              {pathway}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-green-200">Progress</span>
          <span className="font-semibold">{completed}/{pathways.length}</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-400 rounded-full transition-all duration-1000"
            style={{ width: `${(completed / pathways.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

const pathways = [
  {
    icon: Calendar,
    title: "Budget Calendar",
    description: "Track participation windows and key dates in the budget cycle",
    cta: "View Calendar",
    href: "/learn",
  },
  {
    icon: FileQuestion,
    title: "Submission Support",
    description: "Templates and guidance for submitting memoranda and public comments",
    cta: "Get Template",
    href: "/learn",
  },
  {
    icon: MessageSquare,
    title: "Question Bank",
    description: "Questions to ask at public forums and participation sessions",
    cta: "Browse Questions",
    href: "/learn",
  },
  {
    icon: MapPin,
    title: "Community Tracking",
    description: "Guides for tracking budget delivery in your community",
    cta: "Start Tracking",
    href: "/tracker",
  },
  {
    icon: Users,
    title: "County Chapters",
    description: "Connect with local groups and organizers in your county",
    cta: "Find Chapter",
    href: "#",
  },
  {
    icon: GraduationCap,
    title: "Budget Champion",
    description: "Become a trained budget advocate in your community",
    cta: "Learn More",
    href: "#",
  },
  {
    icon: Users,
    title: "Campus Budget Voices",
    description: "Join university groups promoting budget literacy",
    cta: "Join Campus",
    href: "#",
  },
];

const toolkit = [
  { name: "Budget Calendar", description: "Key dates for FY 2025/26" },
  { name: "Submission Template", description: "How to write a memorandum" },
  { name: "Citizen Question Bank", description: "Questions for public forums" },
  { name: "Glossary", description: "Budget terms explained" },
  { name: "National vs County Guide", description: "Understanding government levels" },
];

const actionItems = [
  { text: "Join the Community", href: "#", icon: Users },
  { text: "Attend Training", href: "#", icon: GraduationCap },
  { text: "Start a County Chapter", href: "#", icon: MapPin },
];

export default function TakeActionPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-20px) scale(1); opacity: 0; }
        }
      `}</style>
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-green-400 to-teal-400"
            style={{
              left: `${Math.random() * 100}%`,
              width: 4 + Math.random() * 6,
              height: 4 + Math.random() * 6,
              animation: `floatUp ${15 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0.2 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>
      <PageSection size="lg" className="border-t-0">
        <Container2026>
          <SectionHeader
            label="Participation · Take action"
            title="Turn budget knowledge into real pressure."
            description="Plug into ready-made pathways — from questions to ask, to templates to send, to county chapters you can join."
            action={
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" className="rounded-full">
                  <Link href="#pathways">See participation pathways</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href="#toolkit">Open action toolkit</Link>
                </Button>
              </div>
            }
          />
        </Container2026>
      </PageSection>
      {/* Pathways Section - Bento Grid */}
      <BentoSection id="pathways" className="border-t border-border/50">
        <BentoSectionHeader
          title="Pathways to Participate"
          subtitle="Choose your path to civic engagement"
        />
        <BentoStaggerGrid stagger={0.08} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pathways.map((pathway, index) => (
            <BentoGridItem key={pathway.title} animation="fadeInUp" delay={index * 0.08}>
              <BentoCard padding="lg" accentColor="green" hover className="h-full group">
                <div className="mb-4 p-3 rounded-2xl bg-green-100 dark:bg-green-900/30 w-fit">
                  <pathway.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{pathway.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{pathway.description}</p>
                <Button asChild variant="outline" className="w-full rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link href={pathway.href}>
                    {pathway.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </BentoCard>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>
      </BentoSection>

      {/* Toolkit Section - Bento */}
      <BentoSection id="toolkit" className="bg-secondary/10">
        <BentoSectionHeader
          title="Action Toolkit"
          subtitle="Resources to help you participate effectively in budget processes"
        />
        <BentoStaggerGrid stagger={0.1} className="grid-cols-2 md:grid-cols-5 gap-4">
          {toolkit.map((item, index) => (
            <BentoGridItem key={item.name} animation="scaleIn" delay={index * 0.1}>
              <Link href="/learn" className="block h-full">
                <BentoCard padding="md" accentColor="teal" hover className="h-full group">
                  <BookOpen className="h-5 w-5 text-teal-600 dark:text-teal-400 mb-3" />
                  <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </BentoCard>
              </Link>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>

        <BentoScrollAnimation animation="fadeInUp" delay={0.3}>
          <div className="text-center mt-8">
            <Button asChild className="rounded-full">
              <Link href="/learn">
                Access Full Toolkit <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Budget Calendar Section - Bento */}
      <BentoSection>
        <BentoSectionHeader title="Budget Calendar Highlights" />
        
        <BentoScrollAnimation animation="fadeInUp">
          <BentoCard padding="lg" accentColor="default">
            <div className="space-y-3">
              {[
                { month: "February", event: "Budget Policy Statement (BPS) Release", status: "Current" },
                { month: "March", event: "County Budgets Release", status: "Upcoming" },
                { month: "April", event: "Public Participation Period", status: "Upcoming" },
                { month: "June", event: "Finance Bill Submission", status: "Upcoming" },
                { month: "July", event: "Appropriation Act (Budget Approval)", status: "Upcoming" },
                { month: "August", event: "New FY Begins", status: "Upcoming" },
              ].map((item, index) => (
                <div
                  key={item.month}
                  className="flex items-center justify-between p-4 bg-background/60 rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-24 text-sm font-medium text-primary">{item.month}</span>
                    <span className="font-medium text-sm">{item.event}</span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.status === "Current"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-secondary text-muted-foreground"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>
        </BentoScrollAnimation>

        <BentoScrollAnimation animation="fadeInUp" delay={0.2}>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/learn">
                View Full Calendar <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Get Involved CTAs - Bento */}
      <BentoSection className="bg-secondary/10">
        <BentoScrollAnimation animation="scaleIn">
          <BentoCTASection>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Involved?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of young Kenyans who are making their voices heard in budget decisions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {actionItems.map((item) => (
                  <Button key={item.text} asChild size="lg" className="rounded-full">
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.text}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </BentoCTASection>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Contact/Support - Bento */}
      <BentoSection>
        <BentoScrollAnimation animation="fadeInUp">
          <BentoCard padding="lg" accentColor="green" className="max-w-2xl mx-auto text-center">
            <HandHeart className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Need Support?</h2>
            <p className="text-muted-foreground mb-6">
              Our team can help you understand how to participate in budget processes.
              Reach out for guidance on submissions, tracking, or organizing in your community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="rounded-full">
                <Link href="mailto:info@budgetndiostory.org">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/learn">Learn More</Link>
              </Button>
            </div>
          </BentoCard>
        </BentoScrollAnimation>
      </BentoSection>
    </main>
  );
}
