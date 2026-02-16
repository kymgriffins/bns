import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/footer";
import { SmoothScrollProvider } from "@/components/scroll";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Budget Ndio Story",
  description: "Kenyan budget transparency platform for young citizens",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.className} antialiased`}>
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
            <div className="min-h-screen flex flex-col">
              {children}
              <Footer />
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
