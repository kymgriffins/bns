import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Heart,
  Users,
  Shield,
  CheckCircle,
  GraduationCap,
  Building2,
  Megaphone,
  Video,
  Search,
  Mail,
  FileText,
  Microscope,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutHero } from "@/components/heros/AboutHero";
import { BentoSection } from "@/components/ui/bento-frame";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
  CardHover,
} from "@/components/animations/hig-motion";

export const metadata: Metadata = {
  title: "About Us - Budget Ndio Story",
  description:
    "Learn about our mission, values, and approach to budget transparency and youth engagement in Kenya.",
};

const values = [
  { icon: CheckCircle, title: "Clarity", description: "We make complex budget information simple and accessible" },
  { icon: Search, title: "Evidence", description: "We base our work on verified data and sources" },
  { icon: Heart, title: "Respect", description: "We treat all perspectives with dignity and openness" },
  { icon: Users, title: "Inclusion", description: "We ensure everyone, especially youth, can participate" },
  { icon: Shield, title: "Accountability", description: "We help citizens track promises and demand answers" },
];

const approachSteps = [
  {
    number: 1,
    icon: Microscope,
    title: "Research",
    description: "Gather and analyze budget documents from national and county sources, cross-checked with credible data.",
  },
  {
    number: 2,
    icon: CheckCircle,
    title: "Verify",
    description: "Cross-check data and ensure accuracy. No claim goes live without confirmation from an official source.",
  },
  {
    number: 3,
    icon: FileText,
    title: "Explain",
    description: "Translate findings into clear, youth-friendly content — briefs, videos, and short reads.",
  },
  {
    number: 4,
    icon: Zap,
    title: "Support Action",
    description: "Provide tools, templates, and pathways for civic participation in budget processes.",
  },
];

const partnerOptions = [
  {
    icon: GraduationCap,
    title: "Trainings",
    description: "Budget literacy workshops for your organization or community.",
  },
  {
    icon: Megaphone,
    title: "Forums",
    description: "Host public discussions on budget priorities in your county.",
  },
  {
    icon: FileText,
    title: "Co-created Briefs",
    description: "Custom analysis and simplified reports for your sector or county.",
  },
  {
    icon: Video,
    title: "Multimedia Campaigns",
    description: "Create budget-focused content together for broader reach on social media.",
  },
  {
    icon: Search,
    title: "Research & Verification",
    description: "Fact-check budget claims and verify spending data for your work.",
  },
];

const consortiumPartners = [
  {
    name: "The Continental Pot",
    role: "Lead Implementing Partner",
    description: "Media lab and civic storytelling hub driving the narrative and research strategy.",
    website: "https://continentalpot.africa",
    image: "https://continentalpot.africa/wp-content/uploads/2025/02/The-Continental-Pot-Vertical.png",
  },
  {
    name: "Colour Twist Media",
    role: "Media & Communications Partner",
    description: "Creative studio producing visual content, graphic design, and digital campaigns.",
    website: "https://colortwistmedia.co.ke",
    image: "https://colortwistmedia.co.ke/wp-content/uploads/2024/08/logo.png",
  },
  {
    name: "Sen Media & Events",
    role: "Events & Engagement Partner",
    description: "Events production and community organizing, bringing Budget Ndio Story to the ground.",
    website: "https://senmedia-events.co.ke",
    image: "/senmedia.png",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />

      {/* ── Mission ── */}
      <BentoSection id="mission" className="border-t border-border/50">
        <ScrollReveal variant="scaleIn" className="max-w-3xl mx-auto text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Why we exist
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-4xl leading-tight">
            We make Kenya's budget information clear, usable, and youth-friendly.
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            So young people can participate, shape priorities, and track results — not as spectators,
            but as informed citizens with the tools to show up and speak up.
          </p>
        </ScrollReveal>
      </BentoSection>

      {/* ── Our Approach ── */}
      <BentoSection className="border-t border-border/50 bg-muted/20">
        <ScrollReveal className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            How we work
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Four steps from raw government document to civic action.
          </p>
        </ScrollReveal>
        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {approachSteps.map((step) => (
            <StaggerItem key={step.number}>
              <CardHover className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </BentoSection>

      {/* ── Consortium Partners ── */}
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
              <CardHover className="h-full rounded-2xl border border-border bg-card p-7 shadow-sm">
                {/* Logo */}
                <div className="mb-6 flex h-14 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="max-h-10 max-w-[160px] object-contain opacity-90"
                  />
                </div>
                <h3 className="text-base font-semibold text-foreground">{partner.name}</h3>
                <p className="mt-1 text-xs font-medium text-primary">{partner.role}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {partner.description}
                </p>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Visit website <ChevronRight className="h-3 w-3" />
                </a>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerChildren>
        <ScrollReveal className="mt-8 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Working with creators, influencers, civil society organizations, universities, and partners
            across Kenya to grow budget literacy and strengthen accountability.
          </p>
        </ScrollReveal>
      </BentoSection>

      {/* ── Values ── */}
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

      {/* ── Partner with us ── */}
      <BentoSection id="partner" className="border-t border-border/50">
        <ScrollReveal className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Partner with us
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Whether you're a CSO, university, county government, or media house — here's how we can work together.
          </p>
        </ScrollReveal>
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partnerOptions.map((opt) => (
            <StaggerItem key={opt.title}>
              <CardHover className="h-full rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <opt.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{opt.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {opt.description}
                </p>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </BentoSection>

      {/* ── Contact ── */}
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
