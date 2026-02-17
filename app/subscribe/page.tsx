import { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { NewsletterForm } from "@/components/newsletter-form";
import { CheckCircle, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subscribe - Budget Ndio Story",
  description: "Get budget updates, reports, and alerts delivered straight to your inbox.",
};

export default function SubscribePage() {
  return (
    <main className="min-h-screen">
      <PageHero
        title="Stay Informed"
        description="Get budget updates, participation windows, and training alerts delivered straight to your inbox."
        eyebrow="Newsletter"
      />

      {/* Subscribe Form Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-muted/30 rounded-3xl p-8 lg:p-12 border border-border/50">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Join Our Newsletter</h2>
              <p className="text-muted-foreground">
                Be the first to know about new budget reports, analysis, and opportunities to participate.
              </p>
            </div>

            <NewsletterForm />

            <p className="text-xs text-muted-foreground text-center mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Get</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Budget Reports</h3>
              <p className="text-sm text-muted-foreground">
                Simplified breakdowns of national and county budgets
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Participation Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Notices about public participation opportunities
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Training Updates</h3>
              <p className="text-sm text-muted-foreground">
                Announcements about workshops and capacity building
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <p className="text-muted-foreground mb-8">
            Connect with us on social media for daily updates and budget insights.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link
              href="https://www.facebook.com/profile.php?id=61586898487932"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            
            <Link
              href="https://www.instagram.com/budgetndiostory"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            
            <Link
              href="https://www.youtube.com/@BudgetNdioStory"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <Youtube className="w-5 h-5" />
              <span className="sr-only">YouTube</span>
            </Link>
            
            <Link
              href="https://x.com/BudgetNdioStory"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span className="sr-only">X (Twitter)</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
