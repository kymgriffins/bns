'use client';

import React, { useState, useCallback, createContext, useContext } from 'react';
import { AlertTriangle, Info, XCircle } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertDialogOptions } from './types';

// =============================================================================
// Alert Dialog Context
// =============================================================================

interface AlertDialogContextValue {
  alert: (options: AlertDialogOptions) => Promise<boolean>;
}

const AlertDialogContext = createContext<AlertDialogContextValue | undefined>(undefined);

// =============================================================================
// Alert Dialog Component
// =============================================================================

export function AlertDialogProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<AlertDialogOptions | null>(null);
  const [resolveRef, setResolveRef] = useState<((value: boolean) => void) | null>(null);

  const alert = useCallback((options: AlertDialogOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions(options);
      setResolveRef(() => resolve);
    });
  }, []);

  const handleConfirm = () => {
    resolveRef?.(true);
    setOptions(null);
    setResolveRef(null);
    options?.onConfirm?.();
  };

  const handleCancel = () => {
    resolveRef?.(false);
    setOptions(null);
    setResolveRef(null);
    options?.onCancel?.();
  };

  const typeStyles = {
    danger: {
      icon: XCircle,
      iconClass: 'text-neutral-600 dark:text-neutral-400',
      buttonClass: 'bg-neutral-700 hover:bg-neutral-800',
    },
    warning: {
      icon: AlertTriangle,
      iconClass: 'text-neutral-500 dark:text-neutral-400',
      buttonClass: 'bg-neutral-600 hover:bg-neutral-700',
    },
    info: {
      icon: Info,
      iconClass: 'text-blue-600 dark:text-blue-400',
      buttonClass: 'bg-primary hover:bg-primary/90',
    },
  };

  const style = options?.type ? typeStyles[options.type] : typeStyles.info;
  const Icon = style.icon;

  return (
    <AlertDialogContext.Provider value={{ alert }}>
      {children}
      <Dialog open={!!options} onOpenChange={(open) => !open && handleCancel()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className={cn('p-2 rounded-full bg-background', style.iconClass)}>
                <Icon className="w-5 h-5" />
              </div>
              <DialogTitle>{options?.title}</DialogTitle>
            </div>
            <DialogDescription className="pt-2">
              {options?.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              {options?.cancelText || 'Cancel'}
            </Button>
            <Button
              className={style.buttonClass}
              onClick={handleConfirm}
            >
              {options?.confirmText || 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AlertDialogContext.Provider>
  );
}

// =============================================================================
// Hook to use Alert Dialog
// =============================================================================

export function useAlertDialog() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error('useAlertDialog must be used within an AlertDialogProvider');
  }
  return context;
}

// =============================================================================
// Convenience Alert Functions
// =============================================================================

/**
 * Show a danger alert dialog
 */
export function useDangerAlert() {
  const { alert } = useAlertDialog();
  
  return useCallback((options: Omit<AlertDialogOptions, 'type'>) => {
    return alert({ ...options, type: 'danger' });
  }, [alert]);
}

/**
 * Show a warning alert dialog
 */
export function useWarningAlert() {
  const { alert } = useAlertDialog();
  
  return useCallback((options: Omit<AlertDialogOptions, 'type'>) => {
    return alert({ ...options, type: 'warning' });
  }, [alert]);
}

/**
 * Show an info alert dialog
 */
export function useInfoAlert() {
  const { alert } = useAlertDialog();
  
  return useCallback((options: Omit<AlertDialogOptions, 'type'>) => {
    return alert({ ...options, type: 'info' });
  }, [alert]);
}

export default AlertDialogProvider;
