import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';
import { HABITS_COUNT, DEMO_HISTORY_DAYS } from './constants';
import { generateDemoHistory, getDefaultHabits, getEmptyTodayDone, getStatusFromBooleans } from './habitUtils';
import { getTodayStr, getLogicalDate } from './dateUtils';

export interface HabitState {
  habits: string[];
  history: Record<string, boolean[]>;
  feelings: Record<string, string>;
  today_done: boolean[];
  today_date: string;
  reset_h: number;
  reset_m: number;
  why: string;
  late_logging: boolean;
  theme: string;
  name: string;
  bio: string;
  demo_mode: boolean;
  demo_history: Record<string, boolean[]>;
  viewDate: string;

  // Actions
  setHabits: (habits: string[]) => void;
  toggleHabit: (index: number) => void;
  toggleHistoryHabit: (date: string, index: number) => void;
  setFeeling: (feeling: string) => void;
  setHistoryFeeling: (date: string, feeling: string) => void;
  setTheme: (theme: string) => void;
  setWhy: (why: string) => void;
  setResetTime: (h: number, m: number) => void;
  setName: (name: string) => void;
  setBio: (bio: string) => void;
  checkReset: () => void;
  toggleDemoMode: () => void;
  setViewDate: (date: string) => void;
  syncViewDate: () => void;
}

const DEFAULT_DATA = {
  habits: getDefaultHabits(),
  history: {},
  feelings: {},
  today_done: getEmptyTodayDone(),
  today_date: getTodayStr(),
  reset_h: 0,
  reset_m: 0,
  why: 'to become the best version of myself.',
  late_logging: true,
  theme: 'carbon',
  name: 'y.',
  bio: 'building momentum',
  demo_mode: false,
  demo_history: {},
  viewDate: getTodayStr(),
};

export const useHabitStoreBase = create<HabitState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_DATA,

      setHabits: (habits) => set({ habits }),
      toggleHabit: (index) => set((state) => {
        const newDone = [...state.today_done];
        newDone[index] = !newDone[index];
        return { today_done: newDone };
      }),
      toggleHistoryHabit: (date, index) => set((state) => {
        if (date === state.today_date) {
          const newDone = [...state.today_done];
          newDone[index] = !newDone[index];
          return { today_done: newDone };
        }
        
        if (state.demo_mode) {
          const newDemoHistory = { ...state.demo_history };
          const dayDone = newDemoHistory[date] ? [...newDemoHistory[date]] : getEmptyTodayDone();
          dayDone[index] = !dayDone[index];
          newDemoHistory[date] = dayDone;
          return { demo_history: newDemoHistory };
        }

        const newHistory = { ...state.history };
        const dayDone = newHistory[date] ? [...newHistory[date]] : getEmptyTodayDone();
        dayDone[index] = !dayDone[index];
        newHistory[date] = dayDone;
        return { history: newHistory };
      }),
      setFeeling: (feeling) => set((state) => ({
        feelings: { ...state.feelings, [state.today_date]: feeling }
      })),
      setHistoryFeeling: (date, feeling) => set((state) => {
        const newFeelings = { ...state.feelings };
        if (newFeelings[date] === feeling) {
          delete newFeelings[date];
        } else {
          newFeelings[date] = feeling;
        }
        return { feelings: newFeelings };
      }),
      setTheme: (theme) => set({ theme }),
      setWhy: (why) => set({ why }),
      setResetTime: (reset_h, reset_m) => set({ reset_h, reset_m }),
      setName: (name) => set({ name }),
      setBio: (bio) => set({ bio }),
      checkReset: () => {
        const state = get();
        const now = new Date();
        const todayStr = getLogicalDate(now, state.reset_h, state.reset_m);

        if (state.today_date !== todayStr) {
          set((prev) => ({
            history: { ...prev.history, [prev.today_date]: [...prev.today_done] },
            today_date: todayStr,
            today_done: getEmptyTodayDone(),
          }));
        }
      },
      setViewDate: (date) => set({ viewDate: date }),
      syncViewDate: () => {
        const state = get();
        set({ viewDate: state.today_date });
      },
      toggleDemoMode: () => {
        const state = get();
        if (!state.demo_mode) {
          const demo_history = generateDemoHistory(DEMO_HISTORY_DAYS);
          set({ demo_mode: true, demo_history });
        } else {
          set({ demo_mode: false });
        }
      },
    }),
    {
      name: 'habit_v4',
    }
  )
);

// Wrapper hook to keep compatibility and handle focus events
export function useHabitStore() {
  const store = useHabitStoreBase();
  
  useEffect(() => {
    store.checkReset();
    store.syncViewDate();
    
    const onFocus = () => {
      store.checkReset();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  return store;
}

// Selector hooks for optimized re-renders
export function useIsPerfectDay() {
  return useHabitStoreBase((s) => s.today_done.every(Boolean));
}

export function useActiveHistory() {
  return useHabitStoreBase((s) => s.demo_mode ? s.demo_history : s.history);
}

export function useDayDone(date: string) {
  return useHabitStoreBase((s) => 
    date === s.today_date 
      ? s.today_done 
      : (s.demo_mode ? s.demo_history : s.history)[date] || getEmptyTodayDone()
  );
}

// Utility functions (not hooks - use in useMemo or handlers)
export function isPerfectDay(today_done: boolean[]): boolean {
  return today_done.every(Boolean);
}

export function getActiveHistory(
  demo_mode: boolean,
  demo_history: Record<string, boolean[]>,
  history: Record<string, boolean[]>
): Record<string, boolean[]> {
  return demo_mode ? demo_history : history;
}
