'use client';

import { useState, useCallback } from 'react';
import { useToast, useDangerAlert } from './index';
import { CRUDOperation } from './types';

// =============================================================================
// CRUD Operation Types
// =============================================================================

interface CRUDState {
  isLoading: boolean;
  operation: CRUDOperation | null;
  error: string | null;
}

interface CRUDCallbacks<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

// =============================================================================
// useCRUDOperations Hook
// =============================================================================

/**
 * Hook for managing CRUD operations with loading states and toast notifications
 * Automatically handles loading states and provides success/error feedback
 */
export function useCRUDOperations<T = unknown>() {
  const [state, setState] = useState<CRUDState>({
    isLoading: false,
    operation: null,
    error: null,
  });
  
  const { successToast, errorToast } = useToast();
  const confirmDelete = useDangerAlert();

  // Execute a CRUD operation with automatic loading and feedback handling
  const execute = useCallback(async (
    operation: CRUDOperation,
    callback: () => Promise<T>,
    options: CRUDCallbacks<T> = {}
  ): Promise<T | null> => {
    const { 
      onSuccess, 
      onError, 
      successMessage, 
      errorMessage 
    } = options;

    // Set loading state
    setState({
      isLoading: true,
      operation,
      error: null,
    });

    try {
      // Execute the operation
      const result = await callback();

      // Show success toast if message provided
      if (successMessage) {
        successToast(getOperationSuccessMessage(operation, successMessage));
      }

      // Call success callback
      onSuccess?.(result);

      setState({
        isLoading: false,
        operation: null,
        error: null,
      });

      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      
      // Show error toast
      const message = errorMessage || getDefaultErrorMessage(operation);
      errorToast(message, { message: error.message });

      // Call error callback
      onError?.(error);

      setState({
        isLoading: false,
        operation,
        error: error.message,
      });

      return null;
    }
  }, [successToast, errorToast]);

  // Convenience methods for each operation
  const create = useCallback(async (
    callback: () => Promise<T>,
    options?: CRUDCallbacks<T>
  ) => execute('create', callback, options), [execute]);

  const read = useCallback(async (
    callback: () => Promise<T>,
    options?: CRUDCallbacks<T>
  ) => execute('read', callback, options), [execute]);

  const update = useCallback(async (
    callback: () => Promise<T>,
    options?: CRUDCallbacks<T>
  ) => execute('update', callback, options), [execute]);

  const remove = useCallback(async (
    callback: () => Promise<T>,
    options?: CRUDCallbacks<T>
  ) => execute('delete', callback, options), [execute]);

  // Reset state
  const reset = useCallback(() => {
    setState({
      isLoading: false,
      operation: null,
      error: null,
    });
  }, []);

  return {
    // State
    isLoading: state.isLoading,
    operation: state.operation,
    error: state.error,
    
    // Execute method
    execute,
    
    // Convenience methods
    create,
    read,
    update,
    remove,
    
    // Delete with confirmation
    deleteWithConfirmation: async (
      itemName: string,
      callback: () => Promise<T>,
      options?: Omit<CRUDCallbacks<T>, 'successMessage'>
    ) => {
      const confirmed = await confirmDelete({
        title: 'Delete Item',
        description: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
        confirmText: 'Delete',
        onConfirm: () => {},
      });

      if (confirmed) {
        return execute('delete', callback, {
          ...options,
          successMessage: 'deleted',
        });
      }
      return null;
    },
    
    // Reset
    reset,
  };
}

// =============================================================================
// Helper Functions
// =============================================================================

function getOperationSuccessMessage(operation: CRUDOperation, customMessage?: string): string {
  if (customMessage) return customMessage;
  
  switch (operation) {
    case 'create':
      return 'Item created successfully';
    case 'read':
      return 'Data loaded successfully';
    case 'update':
      return 'Item updated successfully';
    case 'delete':
      return 'Item deleted successfully';
    default:
      return 'Operation completed successfully';
  }
}

function getDefaultErrorMessage(operation: CRUDOperation): string {
  switch (operation) {
    case 'create':
      return 'Failed to create item';
    case 'read':
      return 'Failed to load data';
    case 'update':
      return 'Failed to update item';
    case 'delete':
      return 'Failed to delete item';
    default:
      return 'An error occurred';
  }
}

// =============================================================================
// useLoadingState Hook
// =============================================================================

/**
 * Simple hook for managing loading state with prevent duplicate submissions
 */
export function useLoadingState() {
  const [loadingState, setLoadingState] = useState<{
    isLoading: boolean;
    operation: string | null;
  }>({
    isLoading: false,
    operation: null,
  });

  const withLoading = useCallback(async <T>(
    operation: string,
    callback: () => Promise<T>
  ): Promise<T | null> => {
    if (loadingState.isLoading) {
      return null; // Prevent duplicate submissions
    }

    setLoadingState({ isLoading: true, operation });

    try {
      const result = await callback();
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoadingState({ isLoading: false, operation: null });
    }
  }, [loadingState.isLoading]);

  return {
    isLoading: loadingState.isLoading,
    operation: loadingState.operation,
    withLoading,
  };
}

// =============================================================================
// useSubmitState Hook
// =============================================================================

/**
 * Hook for managing form submission state with loading feedback
 */
export function useSubmitState() {
  const [state, setState] = useState<{
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: string | null;
  }>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    error: null,
  });

  const submit = useCallback(async <T>(
    callback: () => Promise<T>
  ): Promise<T | null> => {
    setState({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      error: null,
    });

    try {
      const result = await callback();
      setState({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        error: null,
      });
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        error: error.message,
      });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    submit,
    reset,
  };
}

export default useCRUDOperations;
