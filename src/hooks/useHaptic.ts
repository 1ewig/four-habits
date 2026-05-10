import { useCallback } from 'react';
import { HAPTIC_PATTERNS } from '../lib/constants';

interface HapticOptions {
  perfect?: boolean;
}

export function useHaptic() {
  const vibrate = useCallback((options: HapticOptions = {}) => {
    if (!navigator.vibrate) return;
    
    if (options.perfect) {
      navigator.vibrate(HAPTIC_PATTERNS.perfect);
    } else {
      navigator.vibrate(HAPTIC_PATTERNS.normal);
    }
  }, []);

  const checkPerfectDay = useCallback((currentDone: boolean[], index: number) => {
    const willBeDone = !currentDone[index];
    const otherCount = currentDone.filter((_, i) => i !== index && currentDone[i]).length;
    return willBeDone && otherCount === 3;
  }, []);

  const triggerToggle = useCallback((currentDone: boolean[], index: number) => {
    const isPerfect = checkPerfectDay(currentDone, index);
    vibrate({ perfect: isPerfect });
  }, [vibrate, checkPerfectDay]);

  return { vibrate, checkPerfectDay, triggerToggle };
}