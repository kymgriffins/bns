import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Wallet, CheckCircle, Clock, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSection, Container2026, SectionHeader } from "@/components/layout";
import { BentoCard, BentoSection, BentoCTASection } from "@/components/ui/bento-frame";
import { BentoScrollAnimation, BentoStaggerGrid, BentoGridItem, BentoSectionHeader } from "@/components/ui/bento-animations";

export const metadata: Metadata = {
  title: "Budget Tracker - Budget Ndio Story",
  description: "Track delivery, not promises. Follow selected budget lines from allocation to delivery.",
};

const categories = [
  "Youth livelihoods",
  "Health",
  "Education",
  "Water",
  "Agriculture",
  "Roads",
  "Markets",
  "Climate resilience",
];

const stages = [
  { name: "Allocated", description: "Budget approved by assembly", color: "bg-blue-500" },
  { name: "Released", description: "Funds sent to implementing agency", color: "bg-yellow-500" },
  { name: "Delivered", description: "Outputs achieved on ground", color: "bg-green-500" },
];

// Sample tracked items
const trackedItems = [
  {
    title: "Youth Empowerment Programme - Nairobi",
    category: "Youth livelihoods",
    allocated: 500000000,
    released: 350000000,
    delivered: 280000000,
    progress: 56,
    lastUpdate: "February 2026",
  },
  {
    title: "Primary Healthcare Fund - Kiambu",
    category: "Health",
    allocated: 200000000,
    released: 200000000,
    delivered: 180000000,
    progress: 90,
    lastUpdate: "January 2026",
  },
  {
    title: "Farm Input Subsidy - Nakuru",
    category: "Agriculture",
    allocated: 150000000,
    released: 100000000,
    delivered: 75000000,
    progress: 50,
    lastUpdate: "December 2025",
  },
  {
    title: "Rural Water Project - Mandera",
    category: "Water",
    allocated: 300000000,
    released: 150000000,
    delivered: 45000000,
    progress: 15,
    lastUpdate: "November 2025",
  },
];

function formatCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return `KES ${(amount / 1000000000).toFixed(1)}B`;
  } else if (amount >= 1000000) {
    return `KES ${(amount / 1000000).toFixed(0)}M`;
  }
  return `KES ${amount.toLocaleString()}`;
}

export default function TrackerPage() {
  return (
    <main className="min-h-screen">
      <PageSection size="lg" className="border-t-0">
        <Container2026>
          <SectionHeader
            label="Delivery · Budget tracker"
            title="Track delivery, not just promises."
            description="Follow selected budget lines from paper to the ground, see where money stalls, and add evidence from your community."
            action={
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" className="rounded-full">
                  <Link href="#trackers">View live trackers</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href="/take-action">Submit a tip</Link>
                </Button>
              </div>
            }
          />
        </Container2026>
      </PageSection>

      {/* How It Works - Bento */}
      <BentoSection>
        <BentoSectionHeader title="What You Can Track" />
        
        <BentoStaggerGrid stagger={0.1} className="grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <BentoGridItem animation="fadeInUp">
            <BentoCard padding="lg" accentColor="blue" hover>
              <div className="h-10 w-10 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Selected Programmes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track specific budget lines that matter to your community
              </p>
            </BentoCard>
          </BentoGridItem>
          <BentoGridItem animation="fadeInUp" delay={0.1}>
            <BentoCard padding="lg" accentColor="orange" hover>
              <div className="h-10 w-10 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold mb-2">Budget Journey</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Follow funds from Allocated → Released → Delivered
              </p>
            </BentoCard>
          </BentoGridItem>
          <BentoGridItem animation="fadeInUp" delay={0.2}>
            <BentoCard padding="lg" accentColor="red" hover>
              <div className="h-10 w-10 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold mb-2">Evidence & Notes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Community reports and evidence notes from the field
              </p>
            </BentoCard>
          </BentoGridItem>
        </BentoStaggerGrid>

        {/* Progress Stages */}
        <BentoScrollAnimation animation="fadeInUp" delay={0.3}>
          <BentoCard padding="lg" accentColor="default">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {stages.map((stage, index) => (
                <div key={stage.name} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${stage.color}`} />
                    <div className="text-center">
                      <p className="font-semibold text-sm">{stage.name}</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">{stage.description}</p>
                    </div>
                  </div>
                  {index < stages.length - 1 && (
                    <div className="w-8 sm:w-16 h-0.5 bg-border mx-2" />
                  )}
                </div>
              ))}
            </div>
          </BentoCard>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Categories - Bento */}
      <BentoSection className="bg-secondary/10">
        <BentoSectionHeader title="Track by Category" />
        <BentoScrollAnimation animation="fadeInUp">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button key={category} variant="outline" asChild className="rounded-full">
                <Link href={`/tracker?category=${encodeURIComponent(category)}`}>
                  {category}
                </Link>
              </Button>
            ))}
          </div>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Tracked Items - Bento */}
      <BentoSection id="trackers">
        <BentoSectionHeader title="Currently Tracking" />
        
        <div className="space-y-5">
          {trackedItems.map((item, index) => (
            <BentoScrollAnimation key={index} animation="fadeInUp" delay={index * 0.1}>
              <BentoCard padding="lg" accentColor="green" hover>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">Last updated: {item.lastUpdate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{item.progress}%</p>
                    <p className="text-xs text-muted-foreground">Overall Progress</p>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Allocated</span>
                      <span className="font-medium">{formatCurrency(item.allocated)}</span>
                    </div>
                    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Released</span>
                      <span className="font-medium">{formatCurrency(item.released)}</span>
                    </div>
                    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${(item.released / item.allocated) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Delivered</span>
                      <span className="font-medium">{formatCurrency(item.delivered)}</span>
                    </div>
                    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(item.delivered / item.allocated) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50">
                  <Button variant="link" className="p-0 h-auto text-green-600 dark:text-green-400">
                    View Details <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </BentoCard>
            </BentoScrollAnimation>
          ))}
        </div>

        <BentoScrollAnimation animation="fadeInUp" delay={0.3}>
          <div className="text-center mt-10">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/tracker">View All Trackers</Link>
            </Button>
          </div>
        </BentoScrollAnimation>
      </BentoSection>

      {/* Submit a Tip - Bento */}
      <BentoSection className="bg-secondary/10">
        <BentoScrollAnimation animation="scaleIn">
          <BentoCTASection>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Know Something About Budget Delivery?</h2>
              <p className="text-muted-foreground mb-8">
                Submit a tip about budget implementation in your area. Your information helps track delivery and hold leaders accountable.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="rounded-full">
                  <Link href="/take-action">
                    <Send className="mr-2 h-4 w-4" />
                    Submit a Tip
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/take-action">Learn More</Link>
                </Button>
              </div>
            </div>
          </BentoCTASection>
        </BentoScrollAnimation>
      </BentoSection>
    </main>
  );
}
