import { Metadata } from 'next';
import TwitterFeed from '@/components/twitter-feed';

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-gray-500/5 to-black/5" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Follow us on X
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest insights about Kenya's budget process. 
              Follow <span className="font-semibold text-primary">@BudgetNdioStory</span> for real-time updates!
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <a
                href="https://x.com/BudgetNdioStory"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow @BudgetNdioStory
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Twitter Feed Section */}
      <section className="container py-12">
        <div className="max-w-2xl mx-auto">
          <TwitterFeed username="BudgetNdioStory" count={5} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12">
        <div className="bg-gradient-to-r from-black/5 via-gray-500/5 to-black/5 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to learn more?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join our training programs and get hands-on experience with Kenya's budget process. 
            Stay informed, stay engaged!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/take-action"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Join Our Programs
            </a>
            <a
              href="/news"
              className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background rounded-full font-medium hover:bg-accent transition-colors"
            >
              Read Our Stories
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
