import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Heart, Users, Shield, CheckCircle, GraduationCap, Building2, Megaphone, Video, Search, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutHero } from "@/components/heros/AboutHero";
import { BentoCard, BentoSection } from "@/components/ui/bento-frame";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
  CardHover,
} from "@/components/animations/hig-motion";

export const metadata: Metadata = {
  title: "About Us - Budget Ndio Story",
  description: "Learn about our mission, values, and approach to budget transparency and youth engagement in Kenya.",
};

const values = [
  { icon: CheckCircle, title: "Clarity", description: "We make complex budget information simple and accessible" },
  { icon: Search, title: "Evidence", description: "We base our work on verified data and sources" },
  { icon: Heart, title: "Respect", description: "We treat all perspectives with dignity and openness" },
  { icon: Users, title: "Inclusion", description: "We ensure everyone, especially youth, can participate" },
  { icon: Shield, title: "Accountability", description: "We help citizens track promises and demand answers" },
];

const approachSteps = [
  { number: 1, title: "Research", description: "Gather and analyze budget documents from national and county sources" },
  { number: 2, title: "Verify", description: "Cross-check data and ensure accuracy with credible sources" },
  { number: 3, title: "Explain", description: "Translate findings into clear, youth-friendly content" },
  { number: 4, title: "Support Action", description: "Provide tools and pathways for civic participation" },
];

const partnerOptions = [
  { icon: GraduationCap, title: "Trainings", description: "Budget literacy workshops for your organization" },
  { icon: Megaphone, title: "Forums", description: "Host public discussions on budget priorities" },
  { icon: FileText, title: "Co-created Briefs", description: "Custom analysis for your sector or county" },
  { icon: Video, title: "Multimedia Campaigns", description: "Create content together for broader reach" },
  { icon: Search, title: "Research & Verification", description: "Fact-check budget claims and spending" },
];

const consortiumPartners = [
  { name: "The Continental Pot", role: "Lead Implementing Partner" },
  { name: "Colour Twist Media", role: "Media & Communications Partner" },
  { name: "Sen Media & Events", role: "Events & Engagement Partner" },
];

const keySupporters = [
  { name: "Become a Supporter", role: "Partner with us" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />

      {/* Mission Statement */}
      <BentoSection id="mission" className="border-t border-border/50">
        <ScrollReveal variant="scaleIn" className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl border border-border bg-card px-8 py-10 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Our mission</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              We make Kenya&apos;s budget information clear, usable, and youth-friendly—so young people can participate, shape priorities, and track results.
            </p>
          </div>
        </ScrollReveal>
      </BentoSection>

      {/* Consortium Partners */}
      <BentoSection className="border-t border-border/50">
        <ScrollReveal className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Consortium partners
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Budget Ndio Story is led by three organizations with complementary expertise.
          </p>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {consortiumPartners.map((partner) => (
            <StaggerItem key={partner.name}>
              <CardHover className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted/50">
                  <Building2 className="h-6 w-6 text-foreground/70" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{partner.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{partner.role}</p>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerChildren>
        <ScrollReveal className="mt-8 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Working with creators, influencers, civil society, universities, and partners across Kenya to grow budget literacy and strengthen accountability.
          </p>
        </ScrollReveal>
      </BentoSection>

      {/* Values */}
      <BentoSection className="border-t border-border/50 bg-muted/20">
        <ScrollReveal className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Our values
          </h2>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <CardHover className="rounded-xl border border-border bg-card p-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/50">
                  <value.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{value.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{value.description}</p>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </BentoSection>

      {/* Approach */}
      <BentoSection id="approach" className="border-t border-border/50">
        <ScrollReveal className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Our approach
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl">
            How we turn budget data into civic action.
          </p>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {approachSteps.map((step) => (
            <StaggerItem key={step.number}>
              <CardHover className="relative rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/50 text-sm font-semibold text-foreground/80">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                {step.number < 4 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground lg:block" />
                )}
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </BentoSection>

      {/* Partner Section */}
      <BentoSection id="partner" className="border-t border-border/50 bg-muted/20">
        <ScrollReveal className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Partner with us
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            We work with universities, youth networks, civil society, media, and institutions to expand budget literacy and civic action.
          </p>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partnerOptions.map((option) => (
            <StaggerItem key={option.title}>
              <CardHover className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/50">
                  <option.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{option.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{option.description}</p>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <ScrollReveal className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full transition-transform duration-200 active:scale-[0.98]"
          >
            <Link href="/take-action" className="inline-flex items-center gap-2">
              Become a partner <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full transition-transform duration-200 active:scale-[0.98]"
          >
            <Link href="/take-action" className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Request a training
            </Link>
          </Button>
        </ScrollReveal>
      </BentoSection>

      {/* Contact Section */}
      <BentoSection id="contact" className="border-t border-border/50">
        <ScrollReveal variant="scaleIn">
          <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card px-8 py-12 text-center shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Get in touch</h2>
            <p className="mt-3 text-muted-foreground">
              Have questions about budget literacy or want to collaborate? We&apos;d love to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="rounded-full transition-transform duration-200 active:scale-[0.98]"
              >
                <Link href="mailto:info@budgetndiostory.org" className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact us
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full transition-transform duration-200 active:scale-[0.98]"
              >
                <Link href="/take-action">Join the community</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </BentoSection>
    </main>
  );
}
