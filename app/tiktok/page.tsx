import { Metadata } from 'next';
import TikTokProfileFeed from './tiktok-profile-feed';

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Follow us on TikTok
            </h1>
            <p className="text-lg text-muted-foreground">
              Get quick, engaging insights about Kenya's budget process. 
              Follow <span className="font-semibold text-primary">@budget.ndio.story</span> for daily updates!
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <a
                href="https://www.tiktok.com/@budget.ndio.story"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                Follow @budget.ndio.story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TikTok Feed Section */}
      <section className="container py-12">
        <div className="max-w-4xl mx-auto">
          <TikTokProfileFeed username="budget.ndio.story" count={6} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12">
        <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl p-8 md:p-12 text-center">
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
