import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Heart, Users, Shield, CheckCircle, GraduationCap, Building2, Megaphone, Video, Search, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";

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
  { name: "The Continental Pot", role: "Lead Partner" },
  { name: "Colour Twist Media", role: "Media Partner" },
  { name: "Sen Media & Events", role: "Events Partner" },
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

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We make Kenya's budget information clear, usable, and youth-friendly—so young people can participate, shape priorities, and track results.
          </p>
        </div>
      </section>

      {/* Consortium Partners */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Consortium Partners</h2>
          <p className="text-center text-muted-foreground mb-8">
            Budget Ndio Story is led by three organizations with complementary expertise
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {consortiumPartners.map((partner) => (
              <div
                key={partner.name}
                className="p-6 bg-background rounded-xl border border-border text-center"
              >
                <Building2 className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-1">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.role}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-muted-foreground">
            Working with creators, influencers, civil society, universities, and partners across Kenya to grow budget literacy and strengthen accountability.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-4 bg-background rounded-xl border border-border text-center"
              >
                <value.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Approach</h2>
          <p className="text-center text-muted-foreground mb-12">
            How we turn budget data into civic action
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approachSteps.map((step) => (
              <div key={step.number} className="relative">
                <div className="p-6 bg-background rounded-xl border border-border h-full">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {step.number < 4 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section id="partner" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Partner With Us</h2>
          <p className="text-center text-muted-foreground mb-12">
            We work with universities, youth networks, civil society, media, and institutions to expand budget literacy and civic action.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerOptions.map((option) => (
              <div
                key={option.title}
                className="p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all"
              >
                <option.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">{option.title}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button asChild size="lg">
              <Link href="/take-action">
                Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/take-action">
                <Mail className="mr-2 h-4 w-4" />
                Request a Training
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">
            Have questions about budget literacy or want to collaborate? We'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="mailto:info@budgetndiostory.org">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/take-action">Join the Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
