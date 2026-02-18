'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ToastContainer } from './toast';
import { 
  Toast, 
  ToastOptions, 
  ToastType, 
  ToastPosition,
  LoadingState, 
  CRUDOperation,
  FeedbackContextValue 
} from './types';

// =============================================================================
// Create Context
// =============================================================================

const FeedbackContext = createContext<FeedbackContextValue | undefined>(undefined);

// =============================================================================
// Provider Props
// =============================================================================

interface FeedbackProviderProps {
  children: ReactNode;
  /** Default toast position */
  position?: ToastPosition;
  /** Default toast duration in ms */
  defaultDuration?: number;
}

// =============================================================================
// Provider Component
// =============================================================================

export function FeedbackProvider({ 
  children, 
  position = 'top-right',
  defaultDuration = 5000 
}: FeedbackProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
  });

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substring(2, 9);

  // Add a new toast
  const addToast = useCallback((title: string, options?: ToastOptions): string => {
    const id = generateId();
    const toast: Toast = {
      id,
      type: options?.type || 'info',
      title,
      message: options?.message,
      duration: options?.duration ?? defaultDuration,
      dismissible: options?.dismissible ?? true,
      action: options?.action,
    };
    
    setToasts((prev) => [...prev, toast]);
    return id;
  }, [defaultDuration]);

  // Convenience toast methods
  const toast = useCallback((message: string, options?: ToastOptions) => {
    return addToast(message, options);
  }, [addToast]);

  const successToast = useCallback((message: string, options?: Omit<ToastOptions, 'type'>) => {
    return addToast(message, { ...options, type: 'success' });
  }, [addToast]);

  const errorToast = useCallback((message: string, options?: Omit<ToastOptions, 'type'>) => {
    return addToast(message, { ...options, type: 'error', duration: options?.duration ?? 7000 });
  }, [addToast]);

  const warningToast = useCallback((message: string, options?: Omit<ToastOptions, 'type'>) => {
    return addToast(message, { ...options, type: 'warning' });
  }, [addToast]);

  const infoToast = useCallback((message: string, options?: Omit<ToastOptions, 'type'>) => {
    return addToast(message, { ...options, type: 'info' });
  }, [addToast]);

  // Dismiss a specific toast
  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Clear all toasts
  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Loading state management
  const setLoading = useCallback((operation: CRUDOperation) => {
    setLoadingState({
      isLoading: true,
      operation,
    });
  }, []);

  const setSuccess = useCallback((message: string) => {
    setLoadingState({
      isLoading: false,
      success: message,
    });
    // Auto-clear success message after 5 seconds
    setTimeout(() => {
      setLoadingState((prev) => ({ ...prev, success: undefined }));
    }, 5000);
  }, []);

  const setError = useCallback((message: string) => {
    setLoadingState({
      isLoading: false,
      error: message,
    });
  }, []);

  const clearState = useCallback(() => {
    setLoadingState({
      isLoading: false,
    });
  }, []);

  const value: FeedbackContextValue = {
    toast,
    successToast,
    errorToast,
    warningToast,
    infoToast,
    dismissToast,
    clearAllToasts,
    setLoading,
    setSuccess,
    setError,
    clearState,
    loadingState,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      <ToastContainer
        toasts={toasts}
        position={position}
        onDismiss={dismissToast}
      />
    </FeedbackContext.Provider>
  );
}

// =============================================================================
// Hook to use Feedback Context
// =============================================================================

export function useFeedback(): FeedbackContextValue {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}

// =============================================================================
// Convenience Hooks
// =============================================================================

/**
 * Simplified toast hook for components
 */
export function useToast() {
  const { toast, successToast, errorToast, warningToast, infoToast, dismissToast, clearAllToasts } = useFeedback();
  return { toast, successToast, errorToast, warningToast, infoToast, dismissToast, clearAllToasts };
}

/**
 * Hook for managing CRUD loading states
 */
export function useCRUDLoading() {
  const { loadingState, setLoading, setSuccess, setError, clearState } = useFeedback();
  return {
    ...loadingState,
    setLoading,
    setSuccess,
    setError,
    clearState,
  };
}

export default FeedbackProvider;
