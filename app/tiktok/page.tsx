import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TikTokProfileFeed from './tiktok-profile-feed';
import { PageSection, Container2026, SectionHeader } from '@/components/layout';

export const metadata: Metadata = {
  title: 'TikTok Videos - Budget Ndio Story',
  description: 'Watch our latest TikTok videos about Kenya\'s budget process',
  openGraph: {
    title: 'TikTok Videos - Budget Ndio Story',
    description: 'Watch our latest TikTok videos about Kenya\'s budget process',
    url: 'https://budgetndiostory.com/tiktok',
    siteName: 'Budget Ndio Story',
    images: [
      {
        url: 'https://budgetndiostory.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Budget Ndio Story TikTok',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function TikTokPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageSection size="lg" className="border-t-0">
        <Container2026>
          <SectionHeader
            label="Social · TikTok"
            title="Follow us on TikTok"
            description="Quick, engaging insights about Kenya's budget process. Follow @budget.ndio.story for daily updates."
            align="center"
            action={
              <div className="flex flex-wrap justify-center gap-2">
                <Button asChild size="lg" className="rounded-full px-6">
                  <a href="https://www.tiktok.com/@budget.ndio.story" target="_blank" rel="noopener noreferrer">
                    Follow @budget.ndio.story
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                  <Link href="/civic-hub">Start Budget 101</Link>
                </Button>
              </div>
            }
          />
        </Container2026>
      </PageSection>

      <section className="container-2026 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <TikTokProfileFeed username="budget.ndio.story" count={6} />
          <div className="text-center pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Want to go deeper?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link href="/civic-hub">Learn Budget 101</Link>
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
