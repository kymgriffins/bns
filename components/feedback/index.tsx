'use client';

import React, { ReactNode } from 'react';
import { FeedbackProvider } from './feedback-provider';
import { AlertDialogProvider } from './alert-dialog';

// =============================================================================
// Combined Feedback Provider
// =============================================================================

interface CombinedFeedbackProviderProps {
  children: ReactNode;
  /** Default toast position */
  toastPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  /** Default toast duration in ms */
  defaultToastDuration?: number;
}

/**
 * Combined provider that wraps both Toast and AlertDialog functionality
 */
export function CombinedFeedbackProvider({ 
  children, 
  toastPosition = 'top-right',
  defaultToastDuration = 5000 
}: CombinedFeedbackProviderProps) {
  return (
    <FeedbackProvider position={toastPosition} defaultDuration={defaultToastDuration}>
      <AlertDialogProvider>
        {children}
      </AlertDialogProvider>
    </FeedbackProvider>
  );
}

// =============================================================================
// Export all feedback components
// =============================================================================

// Types
export * from './types';

// Toast components
export { ToastContainer, ToastItem, useToast as useToastComponent } from './toast';
export { 
  FeedbackProvider, 
  useFeedback, 
  useToast, 
  useCRUDLoading 
} from './feedback-provider';

// Inline message components
export { 
  InlineMessage, 
  SuccessMessage, 
  ErrorMessage, 
  WarningMessage, 
  InfoMessage 
} from './inline-message';

// Alert dialog components
export { 
  AlertDialogProvider, 
  useAlertDialog, 
  useDangerAlert, 
  useWarningAlert, 
  useInfoAlert 
} from './alert-dialog';

// CRUD operations hook
export { 
  useCRUDOperations,
  useLoadingState,
  useSubmitState
} from './use-crud-operations';

export default CombinedFeedbackProvider;
