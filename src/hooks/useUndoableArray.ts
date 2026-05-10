import { useState, useEffect, useCallback } from 'react';

interface UseUndoableArrayOptions<T> {
  initialValue: T[];
  onCommit: (value: T[]) => void;
  onShowToast: (message: string, onUndo: () => void) => void;
  commitMessage: string;
}

interface UseUndoableArrayReturn<T> {
  tempValue: T[];
  setTempValue: (value: T[]) => void;
  setItem: (index: number, value: T) => void;
  commitAll: () => void;
  reset: () => void;
}

export function useUndoableArray<T>({
  initialValue,
  onCommit,
  onShowToast,
  commitMessage,
}: UseUndoableArrayOptions<T>): UseUndoableArrayReturn<T> {
  const [tempValue, setTempValue] = useState<T[]>(initialValue);

  useEffect(() => {
    setTempValue(initialValue);
  }, [initialValue]);

  const setItem = useCallback((index: number, value: T) => {
    setTempValue(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const commitAll = useCallback(() => {
    const hasChanged = tempValue.some((v, i) => v !== initialValue[i]);
    if (hasChanged) {
      const prev = [...initialValue];
      onCommit(tempValue);
      onShowToast(commitMessage, () => {
        onCommit(prev);
        setTempValue(prev);
      });
    }
  }, [tempValue, initialValue, onCommit, onShowToast, commitMessage]);

  const reset = useCallback(() => {
    setTempValue(initialValue);
  }, [initialValue]);

  return { tempValue, setTempValue, setItem, commitAll, reset };
}