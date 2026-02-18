// =============================================================================
// Feedback Types - Type definitions for the feedback system
// =============================================================================

/**
 * Toast/Notification types
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Position for toast notifications
 */
export type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

/**
 * Toast notification interface
 */
export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  dismissible?: boolean;
  action?: ToastAction;
}

/**
 * Toast action button
 */
export interface ToastAction {
  label: string;
  onClick: () => void;
}

/**
 * Toast creation options
 */
export interface ToastOptions {
  /** Toast type */
  type?: ToastType;
  /** Auto-dismiss duration in ms (default: 5000) */
  duration?: number;
  /** Whether the toast can be dismissed */
  dismissible?: boolean;
  /** Action button */
  action?: ToastAction;
  /** Additional message/description */
  message?: string;
}

/**
 * Inline message types
 */
export type InlineMessageType = 'success' | 'error' | 'warning' | 'info';

/**
 * Inline message props
 */
export interface InlineMessageProps {
  /** Message type */
  type: InlineMessageType;
  /** Title of the message */
  title?: string;
  /** Description text */
  description?: string;
  /** Whether to show an icon */
  showIcon?: boolean;
  /** Whether the message is dismissible */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Loading state types for CRUD operations
 */
export type CRUDOperation = 'create' | 'read' | 'update' | 'delete';

/**
 * Status of a loading operation
 */
export interface LoadingState {
  /** Whether the operation is in progress */
  isLoading: boolean;
  /** The current operation type */
  operation?: CRUDOperation;
  /** Error message if any */
  error?: string;
  /** Success message if any */
  success?: string;
}

/**
 * Feedback context value
 */
export interface FeedbackContextValue {
  // Toast methods
  toast: (message: string, options?: ToastOptions) => string;
  successToast: (message: string, options?: Omit<ToastOptions, 'type'>) => string;
  errorToast: (message: string, options?: Omit<ToastOptions, 'type'>) => string;
  warningToast: (message: string, options?: Omit<ToastOptions, 'type'>) => string;
  infoToast: (message: string, options?: Omit<ToastOptions, 'type'>) => string;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
  
  // Loading state methods
  setLoading: (operation: CRUDOperation) => void;
  setSuccess: (message: string) => void;
  setError: (message: string) => void;
  clearState: () => void;
  
  // Current state
  loadingState: LoadingState;
}

/**
 * Alert dialog options
 */
export interface AlertDialogOptions {
  /** Alert title */
  title: string;
  /** Alert description */
  description: string;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Alert type for styling */
  type?: 'danger' | 'warning' | 'info';
  /** Callback when confirmed (optional - can use returned promise instead) */
  onConfirm?: () => void;
  /** Callback when cancelled */
  onCancel?: () => void;
}
