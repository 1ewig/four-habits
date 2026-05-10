import { useState, useEffect, useCallback } from 'react';

interface UseUndoableOptions<T> {
  initialValue: T;
  onCommit: (value: T) => void;
  onShowToast: (message: string, onUndo: () => void) => void;
  commitMessage: string;
}

interface UseUndoableReturn<T> {
  tempValue: T;
  setTempValue: (value: T) => void;
  commit: (value: T) => void;
  reset: () => void;
}

export function useUndoable<T>({
  initialValue,
  onCommit,
  onShowToast,
  commitMessage,
}: UseUndoableOptions<T>): UseUndoableReturn<T> {
  const [tempValue, setTempValue] = useState<T>(initialValue);

  useEffect(() => {
    setTempValue(initialValue);
  }, [initialValue]);

  const commit = useCallback((value: T) => {
    if (value !== initialValue) {
      const prev = initialValue;
      onCommit(value);
      onShowToast(commitMessage, () => {
        onCommit(prev);
        setTempValue(prev);
      });
    }
  }, [initialValue, onCommit, onShowToast, commitMessage]);

  const reset = useCallback(() => {
    setTempValue(initialValue);
  }, [initialValue]);

  return { tempValue, setTempValue, commit, reset };
}