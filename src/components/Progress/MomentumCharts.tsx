import { useState } from 'react';
import { motion } from 'motion/react';
import { WEEKLY_DAYS, MONTHLY_DAYS, BAR_CHART_HEIGHTS } from '../../lib/constants';
import { SegmentedControl } from '../ui/SegmentedControl';

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
        <SegmentedControl
          options={['weekly', 'monthly', 'stats'] as const}
          active={view}
          onChange={setView}
        />
      </div>

      <div className="flex-grow flex items-center justify-center min-h-0">
        {view === 'weekly' && (
          <div className="flex gap-2 w-full h-full items-end justify-between pt-2">
            {Array.from({ length: WEEKLY_DAYS }).map((_, i) => {
              const dayIndex = allDays.length - WEEKLY_DAYS + i;
              const day = dayIndex >= 0 ? allDays[dayIndex] : null;
              const height = day?.status === 'perfect' ? BAR_CHART_HEIGHTS.perfect : day?.status === 'partial' ? BAR_CHART_HEIGHTS.partial : BAR_CHART_HEIGHTS.rest;
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
            {Array.from({ length: MONTHLY_DAYS }).map((_, i) => {
              const dayIndex = allDays.length - MONTHLY_DAYS + i;
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