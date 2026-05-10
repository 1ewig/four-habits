import { DEMO_HISTORY_DAYS, PERFECT_DAY_PERCENTAGE, HABITS_COUNT } from './constants';

export function generateDemoHistory(days: number = DEMO_HISTORY_DAYS): Record<string, boolean[]> {
  const demo_history: Record<string, boolean[]> = {};
  const now = new Date();
  
  for (let i = 1; i <= days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const rand = Math.random();
    
    let done: boolean[];
    if (rand < PERFECT_DAY_PERCENTAGE) {
      done = [true, true, true, true];
    } else if (rand < 0.8) {
      const count = Math.floor(Math.random() * 3) + 1;
      done = [false, false, false, false];
      const indices = [0, 1, 2, 3].sort(() => 0.5 - Math.random());
      for (let j = 0; j < count; j++) done[indices[j]] = true;
    } else {
      done = [false, false, false, false];
    }
    
    demo_history[dateStr] = done;
  }
  
  return demo_history;
}

export function getDefaultHabits(): string[] {
  return ['sweat.', 'build.', 'read.', 'fast.'];
}

export function getEmptyTodayDone(): boolean[] {
  return Array(HABITS_COUNT).fill(false);
}

export function getStatusFromBooleans(done: boolean[]): 'perfect' | 'partial' | 'rest' {
  const count = done.filter(Boolean).length;
  if (count === HABITS_COUNT) return 'perfect';
  if (count > 0) return 'partial';
  return 'rest';
}

export function calculateConsistency(history: Record<string, boolean[]>, days: number = 30): number {
  const today = new Date();
  let total = 0;
  let completed = 0;
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayDone = history[dateStr];
    
    if (dayDone) {
      total += HABITS_COUNT;
      completed += dayDone.filter(Boolean).length;
    }
  }
  
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

export function countPerfectDays(allDays: { status: 'perfect' | 'partial' | 'rest' }[]): number {
  return allDays.filter(d => d.status === 'perfect').length;
}