import { useState } from 'react';
import { motion } from 'motion/react';

interface DayData {
  date: string;
  status: 'perfect' | 'partial' | 'rest';
}

interface MomentumChartsProps {
  allDays: DayData[];
  perfectDays: number;
  consistency: number;
}

export function MomentumCharts({ allDays, perfectDays, consistency }: MomentumChartsProps) {
  const [view, setView] = useState<'weekly' | 'monthly' | 'stats'>('weekly');

  return (
    <div style={{ flex: 3 }} className="min-h-0 bg-[var(--surface)] rounded-[var(--radius-xl)] p-5 flex flex-col">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h2 className="text-[var(--text-dim)] text-sm font-medium tracking-wide">momentum</h2>
        <div className="flex gap-2">
          {['weekly', 'monthly', 'stats'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as any)}
              className={`text-xs px-2 py-1 rounded-[var(--radius-full)] transition-colors ${
                view === v ? 'bg-[var(--text)] text-[var(--bg)]' : 'bg-[var(--surface-alt)] text-[var(--text-dim)]'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center min-h-0">
        {view === 'weekly' && (
          <div className="flex gap-2 w-full h-full items-end justify-between pt-2">
            {/* Show last 7 days */}
            {Array.from({ length: 7 }).map((_, i) => {
              const dayIndex = allDays.length - 7 + i;
              const day = dayIndex >= 0 ? allDays[dayIndex] : null;
              const height = day?.status === 'perfect' ? '100%' : day?.status === 'partial' ? '40%' : '15%';
              const bg =
                day?.status === 'perfect'
                  ? 'bg-[var(--accent)]'
                  : day?.status === 'partial'
                  ? 'bg-[var(--accent)]/40'
                  : 'bg-[var(--surface-alt)]';

              return (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-t-[var(--radius-sm)] ${bg}`}
                  initial={{ height: 0 }}
                  animate={{ height }}
                  transition={{ type: 'spring', bounce: 0.3, delay: i * 0.1 }}
                />
              );
            })}
          </div>
        )}

        {view === 'monthly' && (
          <div className="grid grid-cols-7 grid-rows-4 gap-1.5 sm:gap-2 w-full h-full justify-items-center items-center">
            {/* Show last 28 days for grid */}
            {Array.from({ length: 28 }).map((_, i) => {
              const dayIndex = allDays.length - 28 + i;
              const day = dayIndex >= 0 ? allDays[dayIndex] : null;
              const bg =
                day?.status === 'perfect'
                  ? 'bg-[var(--accent)]'
                  : day?.status === 'partial'
                  ? 'bg-[var(--accent)]/40 border border-[var(--accent)]'
                  : 'bg-[var(--surface-alt)]/40 border border-[var(--surface-alt)]';

              return (
                <div
                  key={i}
                  className={`w-full aspect-square max-w-[24px] sm:max-w-[28px] rounded-[var(--radius-full)] ${bg}`}
                />
              );
            })}
          </div>
        )}

        {view === 'stats' && (
          <div className="flex w-full h-full justify-around items-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-bold text-[var(--text)]">{consistency}%</span>
              <span className="text-xs text-[var(--text-dim)] mt-1">consistency</span>
            </div>
            <div className="w-px h-12 sm:h-16 bg-[var(--surface-alt)]" />
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-bold text-[var(--accent)]">{perfectDays}</span>
              <span className="text-xs text-[var(--text-dim)] mt-1">perfect days</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
