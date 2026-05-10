import { useState, useCallback } from 'react';

export interface ToastState {
  message: string;
  onUndo?: () => void;
}

export function useToast(timeout: number = 3000) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, onUndo?: () => void) => {
    setToast({ message, onUndo });
    setTimeout(() => setToast(null), timeout);
  }, [timeout]);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, hideToast };
}