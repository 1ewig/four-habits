import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';

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
}

const DEFAULT_DATA = {
  habits: ['sweat.', 'build.', 'read.', 'fast.'],
  history: {},
  feelings: {},
  today_done: [false, false, false, false],
  today_date: new Date().toISOString().split('T')[0],
  reset_h: 0,
  reset_m: 0,
  why: 'to become the best version of myself.',
  late_logging: true,
  theme: 'carbon',
  name: 'y.',
  bio: 'building momentum',
  demo_mode: false,
  demo_history: {},
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
          const dayDone = newDemoHistory[date] ? [...newDemoHistory[date]] : [false, false, false, false];
          dayDone[index] = !dayDone[index];
          newDemoHistory[date] = dayDone;
          return { demo_history: newDemoHistory };
        }

        const newHistory = { ...state.history };
        const dayDone = newHistory[date] ? [...newHistory[date]] : [false, false, false, false];
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
        const resetTime = new Date(now);
        resetTime.setHours(state.reset_h, state.reset_m, 0, 0);

        let logicalDate = new Date(now);
        if (now < resetTime) {
          logicalDate.setDate(logicalDate.getDate() - 1);
        }
        const todayStr = logicalDate.toISOString().split('T')[0];

        if (state.today_date !== todayStr) {
          set((prev) => ({
            history: { ...prev.history, [prev.today_date]: [...prev.today_done] },
            today_date: todayStr,
            today_done: [false, false, false, false],
          }));
        }
      },
      toggleDemoMode: () => {
        const state = get();
        if (!state.demo_mode) {
          // Generate demo data if it doesn't exist
          const demo_history: Record<string, boolean[]> = {};
          const now = new Date();
          for (let i = 1; i <= 30; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const rand = Math.random();
            let done: boolean[];
            if (rand < 0.4) done = [true, true, true, true];
            else if (rand < 0.8) {
              const count = Math.floor(Math.random() * 3) + 1;
              done = [false, false, false, false];
              const indices = [0, 1, 2, 3].sort(() => 0.5 - Math.random());
              for (let j = 0; j < count; j++) done[indices[j]] = true;
            } else done = [false, false, false, false];
            demo_history[dateStr] = done;
          }
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
    // Check reset once on mount
    store.checkReset();
    
    // Check reset when window gains focus
    const onFocus = () => store.checkReset();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  return store;
}
