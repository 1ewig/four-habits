import { useMemo } from 'react';
import { useHabitStoreBase } from '../lib/store';
import { getStatusFromBooleans } from '../lib/habitUtils';

interface DayData {
  date: string;
  status: 'perfect' | 'partial' | 'rest';
}

interface ProgressData {
  allDays: DayData[];
  perfectDays: number;
  consistency: number;
}

export function useProgressData(): ProgressData {
  const today_done = useHabitStoreBase((s) => s.today_done);
  const today_date = useHabitStoreBase((s) => s.today_date);
  const demo_mode = useHabitStoreBase((s) => s.demo_mode);
  const demo_history = useHabitStoreBase((s) => s.demo_history);
  const history = useHabitStoreBase((s) => s.history);

  return useMemo(() => {
    const activeHistory = demo_mode ? demo_history : history;
    const days: DayData[] = [];

    Object.entries(activeHistory).forEach(([date, doneArr]) => {
      days.push({
        date,
        status: getStatusFromBooleans(doneArr),
      });
    });

    days.push({
      date: today_date,
      status: getStatusFromBooleans(today_done),
    });

    const sortedDays = days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const perfectDays = sortedDays.filter((d) => d.status === 'perfect').length;
    const consistency = sortedDays.length > 0 ? Math.round((perfectDays / sortedDays.length) * 100) : 0;

    return {
      allDays: sortedDays,
      perfectDays,
      consistency,
    };
  }, [history, demo_history, demo_mode, today_date, today_done]);
}