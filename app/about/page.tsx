import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Heart, Users, Shield, CheckCircle, GraduationCap, Building2, Megaphone, Video, Search, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { BentoCard, BentoSection, BentoCTASection } from "@/components/ui/bento-frame";
import { BentoScrollAnimation, BentoStaggerGrid, BentoGridItem, BentoSectionHeader } from "@/components/ui/bento-animations";

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
      {/* Hero Section */}
      <PageHero
        title="About Us"
        description="Budget Ndio Story is a Kenya-wide consortium translating public budgets into clear, usable, youth-friendly information."
        eyebrow="Our Mission"
        cta={{ text: "Partner With Us", href: "#partner" }}
        secondaryCta={{ text: "Take Action", href: "/take-action" }}
      />

      {/* Mission Statement - Bento */}
      <BentoSection>
        <BentoScrollAnimation animation="scaleIn">
          <BentoCard padding="xl" className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We make Kenya's budget information clear, usable, and youth-friendly—so young people can participate, shape priorities, and track results.
            </p>
          </BentoCard>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Consortium Partners - Bento */}
      <BentoSection className="border-t border-foreground/10">
        <BentoSectionHeader
          title="Consortium Partners"
          subtitle="Budget Ndio Story is led by three organizations with complementary expertise"
        />
        <BentoStaggerGrid stagger={0.1} className="grid-cols-1 md:grid-cols-3 gap-6">
          {consortiumPartners.map((partner, index) => (
            <BentoGridItem key={partner.name} animation="fadeInUp" delay={index * 0.1}>
              <BentoCard padding="lg" hover className="text-center">
                <div className="h-10 w-10 rounded-full border border-foreground/20 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-5 w-5 text-foreground/70" />
                </div>
                <h3 className="text-lg font-bold mb-1">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.role}</p>
              </BentoCard>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>
        <BentoScrollAnimation animation="fadeInUp" delay={0.3}>
          <p className="text-center mt-8 text-muted-foreground">
            Working with creators, influencers, civil society, universities, and partners across Kenya to grow budget literacy and strengthen accountability.
          </p>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Values - Bento */}
      <BentoSection className="border-t border-foreground/10">
        <BentoSectionHeader title="Our Values" />
        <BentoStaggerGrid stagger={0.08} className="grid-cols-2 md:grid-cols-5 gap-4">
          {values.map((value, index) => (
            <BentoGridItem key={value.title} animation="scaleIn" delay={index * 0.08}>
              <BentoCard padding="md" hover className="text-center">
                <div className="h-10 w-10 rounded-full border border-foreground/20 flex items-center justify-center mx-auto mb-3">
                  <value.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <h3 className="font-bold mb-2 text-sm">{value.title}</h3>
                <p className="text-xs text-muted-foreground">{value.description}</p>
              </BentoCard>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>
      </BentoSection>

      {/* Approach - Bento */}
      <BentoSection className="border-t border-foreground/10">
        <BentoSectionHeader
          title="Our Approach"
          subtitle="How we turn budget data into civic action"
        />
        <BentoStaggerGrid stagger={0.1} className="grid-cols-2 md:grid-cols-4 gap-6">
          {approachSteps.map((step, index) => (
            <BentoGridItem key={step.number} animation="fadeInUp" delay={index * 0.1}>
              <BentoCard padding="lg" hover className="relative">
                <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center font-bold mb-4 text-foreground/70">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {step.number < 4 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                )}
              </BentoCard>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>
      </BentoSection>

      {/* Partner Section - Bento */}
      <BentoSection id="partner" className="border-t border-foreground/10">
        <BentoSectionHeader
          title="Partner With Us"
          subtitle="We work with universities, youth networks, civil society, media, and institutions to expand budget literacy and civic action."
        />
        <BentoStaggerGrid stagger={0.1} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerOptions.map((option, index) => (
            <BentoGridItem key={option.title} animation="fadeInUp" delay={index * 0.1}>
              <BentoCard padding="lg" hover>
                <div className="h-10 w-10 rounded-full border border-foreground/20 flex items-center justify-center mb-4">
                  <option.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <h3 className="text-lg font-bold mb-2">{option.title}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </BentoCard>
            </BentoGridItem>
          ))}
        </BentoStaggerGrid>

        <BentoScrollAnimation animation="fadeInUp" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/take-action">
                Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/take-action">
                <Mail className="mr-2 h-4 w-4" />
                Request a Training
              </Link>
            </Button>
          </div>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Contact Section - Bento */}
      <BentoSection className="border-t border-foreground/10">
        <BentoScrollAnimation animation="scaleIn">
          <BentoCTASection>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have questions about budget literacy or want to collaborate? We'd love to hear from you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="rounded-full">
                  <Link href="mailto:info@budgetndiostory.org">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Us
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/take-action">Join the Community</Link>
                </Button>
              </div>
            </div>
          </BentoCTASection>
        </BentoScrollAnimation>
      </BentoSection>
    </main>
  );
}
