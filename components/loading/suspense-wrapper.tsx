'use client';

import React, { Suspense, ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen, LoadingSpinner, LoadingDots } from './loading-screen';
import { cn } from '@/lib/utils';

interface SuspenseWrapperProps {
  /**
   * The content to render when loaded
   */
  children: ReactNode;
  /**
   * Fallback UI when loading
   */
  fallback?: ReactNode;
  /**
   * Loading type variant
   */
  variant?: 'screen' | 'spinner' | 'dots' | 'skeleton' | 'custom';
  /**
   * Show a subtle skeleton while loading (for content layout preservation)
   */
  showSkeleton?: boolean;
  /**
   * Minimum display time to prevent flash (ms)
   */
  minDisplayTime?: number;
  /**
   * Delay before showing loader (ms) - helps prevent flash for fast loads
   */
  delay?: number;
  /**
   * Custom loading message
   */
  message?: string;
  /**
   * Full screen loading
   */
  fullScreen?: boolean;
  /**
   * Enable smooth transition when content loads
   */
  smoothTransition?: boolean;
}

/**
 * Wrapper component that handles Suspense state with custom loading UI
 */
export function SuspenseWrapper({
  children,
  fallback,
  variant = 'spinner',
  showSkeleton = false,
  minDisplayTime = 0,
  delay = 0,
  message,
  fullScreen = false,
  smoothTransition = true,
}: SuspenseWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showDelayedLoader, setShowDelayedLoader] = useState(false);

  // Handle delay before showing loader
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setShowDelayedLoader(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowDelayedLoader(true);
    }
  }, [delay]);

  // Handle min display time and cleanup
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleLoad = () => {
      if (minDisplayTime > 0) {
        timer = setTimeout(() => {
          setIsLoading(false);
        }, minDisplayTime);
      } else {
        setIsLoading(false);
      }
    };

    // Check if children are rendered (content is ready)
    if (!showDelayedLoader) {
      handleLoad();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showDelayedLoader, minDisplayTime]);

  // Default fallback based on variant
  const defaultFallback = () => {
    if (fullScreen || variant === 'screen') {
      return <LoadingScreen message={message} fullScreen={fullScreen} />;
    }

    if (variant === 'spinner') {
      return (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
          {message && <span className="ml-3 text-muted-foreground">{message}</span>}
        </div>
      );
    }

    if (variant === 'dots') {
      return (
        <div className="flex items-center justify-center py-12">
          <LoadingDots />
          {message && <span className="ml-3 text-muted-foreground">{message}</span>}
        </div>
      );
    }

    if (variant === 'skeleton' || showSkeleton) {
      return <SkeletonContent />;
    }

    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  };

  const fallbackContent = fallback || defaultFallback();

  if (smoothTransition) {
    return (
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {fallbackContent}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <Suspense fallback={fallbackContent}>
      {isLoading ? fallbackContent : children}
    </Suspense>
  );
}

/**
 * Skeleton content placeholder
 */
function SkeletonContent() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header skeleton */}
      <div className="h-8 w-1/3 bg-muted rounded" />
      {/* Paragraph skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />
      </div>
      {/* Card skeleton */}
      <div className="h-32 bg-muted rounded-lg" />
    </div>
  );
}

/**
 * Inline loading wrapper - shows content when loaded, spinner inline
 */
export function InlineLoader({
  isLoading,
  children,
  className,
}: {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-8"
          >
            <LoadingSpinner />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Page transition wrapper with loading state
 */
export function PageLoader({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <LoadingScreen
            message="Preparing your experience..."
            showLogo={true}
            brandName="GR8"
          />
        </motion.div>
      ) : (
        <motion.div
          key="page-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SuspenseWrapper;
