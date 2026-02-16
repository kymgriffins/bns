import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Wallet, CheckCircle, Clock, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";

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
      {/* Hero Section */}
      <PageHero
        title="Budget Tracker"
        description="Track delivery, not promises. Follow selected programmes and budget lines from allocation to delivery."
        eyebrow="Delivery Tracking"
        cta={{ text: "Browse Trackers", href: "#trackers" }}
        secondaryCta={{ text: "Submit a Tip", href: "/take-action" }}
      />

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">What You Can Track</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-background rounded-xl border border-border">
              <Wallet className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Selected Programmes</h3>
              <p className="text-sm text-muted-foreground">
                Track specific budget lines that matter to your community
              </p>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <MapPin className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Budget Journey</h3>
              <p className="text-sm text-muted-foreground">
                Follow funds from Allocated → Released → Delivered
              </p>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <AlertCircle className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Evidence & Notes</h3>
              <p className="text-sm text-muted-foreground">
                Community reports and evidence notes from the field
              </p>
            </div>
          </div>

          {/* Progress Stages */}
          <div className="flex items-center justify-center gap-4 mb-8">
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
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Track by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button key={category} variant="outline" asChild>
                <Link href={`/tracker?category=${encodeURIComponent(category)}`}>
                  {category}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tracked Items */}
      <section id="trackers" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Currently Tracking</h2>
          
          <div className="space-y-6">
            {trackedItems.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">Last updated: {item.lastUpdate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{item.progress}%</p>
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
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Released</span>
                      <span className="font-medium">{formatCurrency(item.released)}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
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
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${(item.delivered / item.allocated) * 100}%` }} 
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="link" className="p-0 h-auto">
                    View Details <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link href="/tracker">View All Trackers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Submit a Tip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Know Something About Budget Delivery?</h2>
          <p className="text-muted-foreground mb-8">
            Submit a tip about budget implementation in your area. Your information helps track delivery and hold leaders accountable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/take-action">
                <Send className="mr-2 h-4 w-4" />
                Submit a Tip
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/take-action">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
