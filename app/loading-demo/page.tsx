'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  LoadingScreen, 
  LoadingSpinner, 
  LoadingDots, 
  LoadingPulse, 
  LoadingBar,
  SuspenseWrapper,
  InlineLoader,
  PageLoader,
  TextSkeleton,
  CardSkeleton,
  ProfileSkeleton,
  TableSkeleton,
  ChartSkeleton,
  ImageGallerySkeleton,
  ListItemSkeleton,
  FormSkeleton,
  StatsSkeleton,
  HeroSkeleton,
  FeedSkeleton,
} from '@/components/loading';
import { Button } from '@/components/ui/button';

type DemoSection = 'fullscreen' | 'inline' | 'skeletons' | 'suspense';

export default function LoadingDemoPage() {
  const [activeSection, setActiveSection] = useState<DemoSection>('fullscreen');
  const [isLoading, setIsLoading] = useState(true);
  const [simulatedContent, setSimulatedContent] = useState<string | null>(null);

  // Simulate content loading
  const loadContent = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSimulatedContent('This is the loaded content after the loading state completes.');
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    loadContent();
  }, []);

  const sections = [
    { id: 'fullscreen', label: 'Full Screen' },
    { id: 'inline', label: 'Inline Loaders' },
    { id: 'skeletons', label: 'Skeleton Loaders' },
    { id: 'suspense', label: 'Suspense Wrapper' },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold font-[family-name:var(--font-founders-grotesk)]">
                GR8
              </Link>
              <p className="text-sm text-muted-foreground">Loading Components Demo</p>
            </div>
            <Button variant="outline" onClick={loadContent}>
              Reload Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection(section.id)}
                className="whitespace-nowrap"
              >
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Full Screen Loader */}
        {activeSection === 'fullscreen' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-bold">Full Screen Loading</h1>
              <p className="text-muted-foreground mt-2">
                Modal loading screens for complete page transitions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Basic Full Screen */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-4 py-2 border-b">
                  <code className="text-sm">LoadingScreen / basic</code>
                </div>
                <div className="relative h-80">
                  <LoadingScreen message="Loading..." fullScreen={false} size="lg" />
                </div>
              </div>

              {/* With Brand */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-4 py-2 border-b">
                  <code className="text-sm">LoadingScreen / with brand</code>
                </div>
                <div className="relative h-80">
                  <LoadingScreen 
                    message="Preparing your experience..." 
                    fullScreen={false} 
                    brandName="GR8"
                    size="lg"
                  />
                </div>
              </div>

              {/* Small */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-4 py-2 border-b">
                  <code className="text-sm">LoadingScreen / small</code>
                </div>
                <div className="relative h-80 flex items-center justify-center">
                  <LoadingScreen 
                    message="Loading..." 
                    fullScreen={false} 
                    size="sm"
                    showLogo={true}
                  />
                </div>
              </div>

              {/* Large */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-4 py-2 border-b">
                  <code className="text-sm">LoadingScreen / large</code>
                </div>
                <div className="relative h-80">
                  <LoadingScreen 
                    message="Please wait..." 
                    fullScreen={false} 
                    size="xl"
                    brandName="GR8"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Inline Loaders */}
        {activeSection === 'inline' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-bold">Inline Loading Indicators</h1>
              <p className="text-muted-foreground mt-2">
                Small loading indicators for use within components
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Spinner */}
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold">Spinner</h3>
                <div className="flex items-center gap-4">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" />
                  <LoadingSpinner size="lg" />
                </div>
              </div>

              {/* Dots */}
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold">Dots</h3>
                <div className="flex items-center gap-4">
                  <LoadingDots />
                </div>
              </div>

              {/* Pulse */}
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold">Pulse</h3>
                <div className="flex items-center gap-4">
                  <LoadingPulse />
                </div>
              </div>

              {/* Bar */}
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold">Bar</h3>
                <div className="flex items-center gap-4">
                  <LoadingBar />
                </div>
              </div>

              {/* Combined */}
              <div className="border rounded-lg p-6 space-y-4 md:col-span-2">
                <h3 className="font-semibold">Combined Example</h3>
                <div className="flex flex-col items-center gap-4 py-6">
                  <LoadingSpinner size="lg" />
                  <p className="text-sm text-muted-foreground">Loading data...</p>
                  <LoadingBar />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Skeleton Loaders */}
        {activeSection === 'skeletons' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-bold">Skeleton Loaders</h1>
              <p className="text-muted-foreground mt-2">
                Content placeholders that match the shape of your actual content
              </p>
            </div>

            <div className="space-y-6">
              {/* Stats Skeleton */}
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Stats Cards</h3>
                <StatsSkeleton count={4} />
              </div>

              {/* Card Skeletons */}
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Content Cards</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <CardSkeleton showImage={true} lines={2} />
                  <CardSkeleton showImage={true} lines={2} />
                  <CardSkeleton showImage={true} lines={2} />
                </div>
              </div>

              {/* Text Skeleton */}
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Text Blocks</h3>
                <div className="max-w-xl">
                  <TextSkeleton lines={4} />
                </div>
              </div>

              {/* Profile Skeleton */}
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Profile</h3>
                <ProfileSkeleton />
              </div>

              {/* Table Skeleton */}
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Data Table</h3>
                <TableSkeleton rows={4} columns={4} />
              </div>

              {/* Chart Skeleton */}
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Chart</h3>
                <ChartSkeleton showLegend={true} />
              </div>

              {/* Image Gallery */}
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Image Gallery</h3>
                <ImageGallerySkeleton count={6} />
              </div>

              {/* List Items */}
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-4">List Items</h3>
                <div className="max-w-md">
                  <ListItemSkeleton showAvatar={true} showMeta={true} />
                  <ListItemSkeleton showAvatar={true} showMeta={true} />
                  <ListItemSkeleton showAvatar={true} showMeta={true} />
                </div>
              </div>

              {/* Form */}
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Form</h3>
                <div className="max-w-md">
                  <FormSkeleton fields={3} showSubmit={true} />
                </div>
              </div>

              {/* Hero */}
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Hero Section</h3>
                <HeroSkeleton />
              </div>

              {/* Feed */}
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Social Feed</h3>
                <FeedSkeleton items={2} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Suspense Wrapper */}
        {activeSection === 'suspense' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-bold">Suspense Wrapper</h1>
              <p className="text-muted-foreground mt-2">
                HOC for handling async content loading with smooth transitions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Screen Variant */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-4 py-2 border-b">
                  <code className="text-sm">variant="screen"</code>
                </div>
                <div className="relative h-96">
                  <SuspenseWrapper
                    variant="screen"
                    fullScreen={false}
                    message="Loading content..."
                    minDisplayTime={1500}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold">Content Loaded!</h3>
                      <p className="text-muted-foreground mt-2">
                        This content was loaded after the minimum display time elapsed.
                      </p>
                    </div>
                  </SuspenseWrapper>
                </div>
              </div>

              {/* Spinner Variant */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-4 py-2 border-b">
                  <code className="text-sm">variant="spinner"</code>
                </div>
                <div className="relative h-96">
                  <SuspenseWrapper
                    variant="spinner"
                    message="Fetching data..."
                    minDisplayTime={1500}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold">Data Loaded!</h3>
                      <p className="text-muted-foreground mt-2">
                        Your data has been fetched successfully.
                      </p>
                    </div>
                  </SuspenseWrapper>
                </div>
              </div>

              {/* Dots Variant */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-4 py-2 border-b">
                  <code className="text-sm">variant="dots"</code>
                </div>
                <div className="relative h-96">
                  <SuspenseWrapper
                    variant="dots"
                    message="Processing..."
                    minDisplayTime={1500}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold">Processing Complete!</h3>
                      <p className="text-muted-foreground mt-2">
                        All operations have been completed.
                      </p>
                    </div>
                  </SuspenseWrapper>
                </div>
              </div>

              {/* Skeleton Variant */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-4 py-2 border-b">
                  <code className="text-sm">variant="skeleton"</code>
                </div>
                <div className="relative h-96">
                  <SuspenseWrapper
                    variant="skeleton"
                    minDisplayTime={1500}
                  >
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold">Content with Skeleton</h3>
                      <p className="text-muted-foreground">
                        The skeleton variant shows a placeholder that mimics the content layout.
                      </p>
                      <TextSkeleton lines={3} />
                    </div>
                  </SuspenseWrapper>
                </div>
              </div>
            </div>

            {/* Inline Loader Example */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-4">InlineLoader Component</h3>
              <InlineLoader isLoading={isLoading} className="p-4 border rounded-lg">
                <div className="p-4">
                  <h4 className="font-bold">Loaded Content</h4>
                  <p className="text-muted-foreground">{simulatedContent}</p>
                </div>
              </InlineLoader>
            </div>

            {/* Page Transition */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Page Transition with Loader</h3>
              <PageLoader isLoading={isLoading}>
                <div className="p-6 bg-muted/30 rounded-lg">
                  <h4 className="font-bold">Page Content</h4>
                  <p className="text-muted-foreground">
                    This demonstrates a page-level transition with loading state.
                  </p>
                </div>
              </PageLoader>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
