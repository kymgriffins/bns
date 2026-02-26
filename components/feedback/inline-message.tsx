'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InlineMessageType, InlineMessageProps } from './types';

// =============================================================================
// Inline Message Component
// =============================================================================

const iconMap: Record<InlineMessageType, React.ElementType> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: {
    container: 'bg-neutral-50 border-neutral-200 dark:bg-neutral-950/30 dark:border-neutral-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-neutral-800 dark:text-neutral-200',
    description: 'text-neutral-700 dark:text-neutral-300',
  },
  error: {
    container: 'bg-neutral-50 border-neutral-200 dark:bg-neutral-950/30 dark:border-neutral-800',
    icon: 'text-neutral-600 dark:text-neutral-400',
    title: 'text-neutral-800 dark:text-neutral-200',
    description: 'text-neutral-700 dark:text-neutral-300',
  },
  warning: {
    container: 'bg-neutral-50 border-neutral-200 dark:bg-neutral-950/30 dark:border-neutral-800',
    icon: 'text-neutral-500 dark:text-neutral-400',
    title: 'text-neutral-800 dark:text-neutral-200',
    description: 'text-neutral-700 dark:text-neutral-300',
  },
  info: {
    container: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-neutral-800 dark:text-neutral-200',
    description: 'text-neutral-700 dark:text-neutral-300',
  },
};

/**
 * Inline message component for displaying feedback within content
 */
export function InlineMessage({
  type,
  title,
  description,
  showIcon = true,
  dismissible = false,
  onDismiss,
  className,
}: InlineMessageProps) {
  const Icon = iconMap[type];
  const style = styles[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn(
          'relative flex items-start gap-3 p-4 rounded-lg border',
          style.container,
          className
        )}
      >
        {/* Icon */}
        {showIcon && (
          <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', style.icon)} />
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <p className={cn('font-semibold text-sm', style.title)}>
              {title}
            </p>
          )}
          {description && (
            <p className={cn('text-sm mt-0.5', style.description)}>
              {description}
            </p>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={cn(
              'absolute top-2 right-2 p-1 rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/10',
              style.icon
            )}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// =============================================================================
// Convenience Components
// =============================================================================

/**
 * Success inline message
 */
export function SuccessMessage({ 
  title, 
  description, 
  ...props 
}: Omit<InlineMessageProps, 'type'>) {
  return (
    <InlineMessage 
      type="success" 
      title={title} 
      description={description} 
      {...props} 
    />
  );
}

/**
 * Error inline message
 */
export function ErrorMessage({ 
  title, 
  description, 
  ...props 
}: Omit<InlineMessageProps, 'type'>) {
  return (
    <InlineMessage 
      type="error" 
      title={title || 'Error'} 
      description={description} 
      {...props} 
    />
  );
}

/**
 * Warning inline message
 */
export function WarningMessage({ 
  title, 
  description, 
  ...props 
}: Omit<InlineMessageProps, 'type'>) {
  return (
    <InlineMessage 
      type="warning" 
      title={title || 'Warning'} 
      description={description} 
      {...props} 
    />
  );
}

/**
 * Info inline message
 */
export function InfoMessage({ 
  title, 
  description, 
  ...props 
}: Omit<InlineMessageProps, 'type'>) {
  return (
    <InlineMessage 
      type="info" 
      title={title} 
      description={description} 
      {...props} 
    />
  );
}

export default InlineMessage;
