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
    container: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-800 dark:text-green-200',
    description: 'text-green-700 dark:text-green-300',
  },
  error: {
    container: 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-800 dark:text-red-200',
    description: 'text-red-700 dark:text-red-300',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-800 dark:text-yellow-200',
    description: 'text-yellow-700 dark:text-yellow-300',
  },
  info: {
    container: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-200',
    description: 'text-blue-700 dark:text-blue-300',
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
