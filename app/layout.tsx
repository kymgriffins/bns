import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";
// import Footer from "@/components/footer";
import { SmoothScrollProvider } from "@/components/scroll";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import Footer2 from "@/components/shadcn-space/blocks/footer-01/footer";
import { CombinedFeedbackProvider } from "@/components/feedback";
import { ChatWidget } from "@/components/chatbot";
import { cookies } from "next/headers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Budget Ndio Story",
  description: "Kenyan budget transparency platform for young citizens",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
      </head>
      <body className={`${neueMontreal.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider
            options={{
              enabled: true,
              duration: 1.2,
              smoothness: 1,
              mouseWheelMultiplier: 1,
              touchMultiplier: 2,
            }}
          >
            <TooltipProvider>
              <CombinedFeedbackProvider>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main>
                    {children}
                  </main>
                  <Footer2 />
                </div>
                <ChatWidget />
              </CombinedFeedbackProvider>
            </TooltipProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
