'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Toast as ToastType, ToastType as ToastVariant, ToastPosition } from './types';

// =============================================================================
// Toast Icon Component
// =============================================================================

const ToastIcon = ({ type }: { type: ToastVariant }) => {
  const iconProps = {
    className: 'w-5 h-5 flex-shrink-0',
  };

  switch (type) {
    case 'success':
      return <CheckCircle {...iconProps} className={cn(iconProps.className, 'text-green-500')} />;
    case 'error':
      return <XCircle {...iconProps} className={cn(iconProps.className, 'text-red-500')} />;
    case 'warning':
      return <AlertTriangle {...iconProps} className={cn(iconProps.className, 'text-yellow-500')} />;
    case 'info':
    default:
      return <Info {...iconProps} className={cn(iconProps.className, 'text-blue-500')} />;
  }
};

// =============================================================================
// Toast Styles by Type
// =============================================================================

const toastStyles = {
  success: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
  error: 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800',
  warning: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800',
  info: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
};

const toastIconStyles = {
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400',
};

// =============================================================================
// Individual Toast Component
// =============================================================================

interface ToastItemProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
  position: ToastPosition;
}

export function ToastItem({ toast, onDismiss, position }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onDismiss(toast.id), 300);
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(toast.id), 300);
  };

  // Position-specific styles
  const positionStyles = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position.includes('top') ? -20 : 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'relative flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-sm w-full',
            toastStyles[toast.type],
            positionStyles[position]
          )}
        >
          {/* Icon */}
          <ToastIcon type={toast.type} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={cn('font-semibold text-sm', toastIconStyles[toast.type])}>
              {toast.title}
            </p>
            {toast.message && (
              <p className="text-sm text-muted-foreground mt-0.5">{toast.message}</p>
            )}

            {/* Action Button */}
            {toast.action && (
              <button
                onClick={toast.action.onClick}
                className="mt-2 text-sm font-medium text-primary hover:underline"
              >
                {toast.action.label}
              </button>
            )}
          </div>

          {/* Dismiss Button */}
          {toast.dismissible !== false && (
            <button
              onClick={handleDismiss}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// Toast Container Component
// =============================================================================

interface ToastContainerProps {
  toasts: ToastType[];
  position?: ToastPosition;
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, position = 'top-right', onDismiss }: ToastContainerProps) {
  // Group toasts by position for multiple toasts
  const groupedToasts = toasts;

  return (
    <div className="fixed z-[100] pointer-events-none">
      <div className={cn('flex flex-col gap-2 pointer-events-auto', position.includes('left') ? 'items-start' : position.includes('right') ? 'items-end' : 'items-center', position.includes('top') ? 'justify-start' : 'justify-end')}>
        {groupedToasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            position={position}
            onDismiss={onDismiss}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// Toast Hook for Simple Usage
// =============================================================================

export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (toast: Omit<ToastType, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const clearAll = () => {
    setToasts([]);
  };

  return {
    toasts,
    addToast,
    dismissToast,
    clearAll,
    // Convenience methods
    success: (title: string, message?: string, options?: Partial<ToastType>) =>
      addToast({ type: 'success', title, message, ...options }),
    error: (title: string, message?: string, options?: Partial<ToastType>) =>
      addToast({ type: 'error', title, message, ...options }),
    warning: (title: string, message?: string, options?: Partial<ToastType>) =>
      addToast({ type: 'warning', title, message, ...options }),
    info: (title: string, message?: string, options?: Partial<ToastType>) =>
      addToast({ type: 'info', title, message, ...options }),
  };
}

export default ToastContainer;
