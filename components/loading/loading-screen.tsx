'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  /**
   * Optional message to display below the spinner
   */
  message?: string;
  /**
   * Full screen or contained
   */
  fullScreen?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Show logo/brand
   */
  showLogo?: boolean;
  /**
   * Brand name to display
   */
  brandName?: string;
}

/**
 * Modern loading screen with animated spinner
 */
export function LoadingScreen({
  message = 'Loading...',
  fullScreen = true,
  className,
  size = 'lg',
  showLogo = true,
  brandName = 'GR8',
}: LoadingScreenProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const container = fullScreen
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center'
    : 'flex flex-col items-center justify-center py-12';

  return (
    <div className={cn(container, 'bg-background/80 backdrop-blur-sm', className)}>
      {/* Animated Logo/Brand */}
      {showLogo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className={cn(
              'relative rounded-full border-2 border-primary/20',
              sizeClasses[size]
            )}
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className={cn(
                'absolute inset-0 rounded-full border-2 border-transparent border-t-primary',
                sizeClasses[size]
              )}
            />
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className={cn(
                'absolute inset-1 rounded-full border-2 border-transparent border-t-primary/50',
                sizeClasses[size]
              )}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Brand Name */}
      {brandName && (
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-2xl font-bold font-[family-name:var(--font-founders-grotesk)] tracking-tight"
        >
          {brandName}
        </motion.h2>
      )}

      {/* Loading Message */}
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mt-4 text-muted-foreground text-sm"
        >
          {message}
        </motion.p>
      )}

      {/* Progress Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-1.5 mt-6"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
            }}
            className="w-2 h-2 rounded-full bg-primary"
          />
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Minimal spinner for inline loading
 */
export function LoadingSpinner({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={cn(
        'rounded-full border-2 border-primary/20 border-t-primary',
        sizeClasses[size],
        className
      )}
    />
  );
}

/**
 * Dots loading indicator
 */
export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-1.5', className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
          }}
          className="w-2 h-2 rounded-full bg-primary"
        />
      ))}
    </div>
  );
}

/**
 * Pulse loading indicator
 */
export function LoadingPulse({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={cn('w-3 h-3 rounded-full bg-primary', className)}
    />
  );
}

/**
 * Bar loading indicator
 */
export function LoadingBar({ className }: { className?: string }) {
  return (
    <div className={cn('w-32 h-1 rounded-full bg-muted overflow-hidden', className)}>
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="h-full w-1/2 rounded-full bg-primary"
      />
    </div>
  );
}

export default LoadingScreen;
