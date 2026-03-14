import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import TwitterFeed from '@/components/twitter-feed';
import { PageSection, Container2026, SectionHeader } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Twitter Feed - Budget Ndio Story',
  description: 'Latest updates and insights from our Twitter/X account',
  openGraph: {
    title: 'Twitter Feed - Budget Ndio Story',
    description: 'Latest updates and insights from our Twitter/X account',
    url: 'https://budgetndiostory.com/twitter',
    siteName: 'Budget Ndio Story',
    images: [
      {
        url: 'https://budgetndiostory.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Budget Ndio Story Twitter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function TwitterPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageSection size="lg" className="border-t-0">
        <Container2026>
          <SectionHeader
            label="Social · X (Twitter)"
            title="Follow us on X"
            description="Latest insights about Kenya's budget process. Follow @BudgetNdioStory for real-time updates."
            align="center"
            action={
              <div className="flex flex-wrap justify-center gap-2">
                <Button asChild size="lg" className="rounded-full px-6">
                  <a href="https://x.com/BudgetNdioStory" target="_blank" rel="noopener noreferrer">
                    Follow @BudgetNdioStory
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                  <Link href="/learn">Start Budget 101</Link>
                </Button>
              </div>
            }
          />
        </Container2026>
      </PageSection>

      <section className="container-2026 py-12">
        <div className="max-w-2xl mx-auto space-y-10">
          <TwitterFeed username="BudgetNdioStory" count={5} />
          <div className="text-center pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Want to go deeper?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link href="/learn">Learn Budget 101</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link href="/take-action">Take action</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
