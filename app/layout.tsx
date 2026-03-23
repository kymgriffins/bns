import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ScrollShell } from "@/components/scroll";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CombinedFeedbackProvider } from "@/components/feedback";
// import { ChatWidget } from "@/components/chatbot";
import { AuthProvider } from "@/hooks/useAuth";
import { GlobalEmailPopup } from "@/components/global-email-popup";
import { ConsentProvider } from "@/hooks/useConsent";
import { CookieConsentBanner } from "@/components/cookie-consent";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { AppShell } from "@/components/AppShell";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Budget Ndio Story - Kenya Budget Transparency Platform",
    template: "%s | Budget Ndio Story",
  },
  description: "Kenyan budget transparency platform for young citizens. We turn national and county budgets into clear insights, practical analysis, and trackable evidence to enhance youth participation and accountability.",
  keywords: ["Kenya budget", "budget transparency", "county budgets", "youth participation", "budget tracking", "government accountability", "public finance", "Kenya"],
  authors: [{ name: "Budget Ndio Story" }],
  creator: "Budget Ndio Story",
  publisher: "Budget Ndio Story",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://budgetndiostory.org"),
  alternates: {
    canonical: defaultUrl,
    languages: {
      "en": defaultUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "/",
    siteName: "Budget Ndio Story",
    title: "Budget Ndio Story - Kenya Budget Transparency Platform",
    description: "Kenyan budget transparency platform for young citizens. We turn national and county budgets into clear insights, practical analysis, and trackable evidence.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Budget Ndio Story - Follow the Budget, Find the Story",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Ndio Story - Kenya Budget Transparency Platform",
    description: "Kenyan budget transparency platform for young citizens. We turn national and county budgets into clear insights.",
    images: ["/twitter-image.png"],
    creator: "@BudgetNdioStory",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

const neueMontreal = localFont({
  src: [
    {
      path: "../components/ui/NeueMontreal.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

// Routes that should not show Navbar and Footer (admin/dashboard routes)
const NO_NAVBAR_ROUTES = [
  "/admin",
  "/dashboard-shell-01",
  "/protected",
  "/learn",
  "/civic-hub",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if current route should hide Navbar/Footer
  // Note: In server components, we can't directly get the pathname
  // We'll handle this via client-side check or layout props
  
  return (
    <html lang="en" suppressHydrationWarning data-ai-optout>
      <head>
        {/* Skip to main content link for accessibility - Nielsen Heuristic 11 */}
        <style>{`
          .skip-to-content {
            position: absolute;
            top: -40px;
            left: 0;
            background: #2F4494;
            color: white;
            padding: 8px 16px;
            z-index: 100;
            transition: top 0.2s;
          }
          .skip-to-content:focus {
            top: 0;
          }
        `}</style>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,300;1,9..144,500&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Cookie Consent Meta Tags */}
        <meta name="cookie-consent" content="banner" />
      </head>
      <body className={`${neueMontreal.className} antialiased`}>
        {/* Skip to main content link for accessibility - Nielsen Heuristic 11 */}
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollShell
            options={{
              enabled: true,
              duration: 1.2,
              mouseWheelMultiplier: 1,
              touchMultiplier: 2,
            }}
          >
            <TooltipProvider>
              <CombinedFeedbackProvider>
                <ConsentProvider>
                  <AnalyticsProvider>
                    <AuthProvider>
                      <AppShell>{children}</AppShell>
                      <GlobalEmailPopup />
                      {/* <ChatWidget /> */}
                      <CookieConsentBanner />
                    </AuthProvider>
                  </AnalyticsProvider>
                </ConsentProvider>
              </CombinedFeedbackProvider>
            </TooltipProvider>
          </ScrollShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
