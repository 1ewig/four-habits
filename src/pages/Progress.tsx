import { useMemo } from 'react';
import { useHabitStore } from '../lib/store';
import { NeuralWeb } from '../components/Progress/NeuralWeb';
import { MomentumCharts } from '../components/Progress/MomentumCharts';

export function Progress() {
  const { history, today_done, today_date, demo_mode, demo_history } = useHabitStore();

  // Combine history and today for the visualization
  const allDays = useMemo(() => {
    const days: { date: string; status: 'perfect' | 'partial' | 'rest' }[] = [];
    const targetHistory = demo_mode ? demo_history : history;

    // Add history
    Object.entries(targetHistory).forEach(([date, doneArr]) => {
      const doneArray = doneArr as boolean[];
      const doneCount = doneArray.filter(Boolean).length;
      days.push({
        date,
        status: doneCount === 4 ? 'perfect' : doneCount > 0 ? 'partial' : 'rest',
      });
    });

    // Add today
    const todayCount = today_done.filter(Boolean).length;
    days.push({
      date: today_date,
      status: todayCount === 4 ? 'perfect' : todayCount > 0 ? 'partial' : 'rest',
    });

    // Sort by date ascending
    return days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [history, today_done, today_date]);

  // Stats calculation
  const perfectDays = allDays.filter((d) => d.status === 'perfect').length;
  const consistency = allDays.length > 0 ? Math.round((perfectDays / allDays.length) * 100) : 0;

  return (
    <div className="h-full w-full flex flex-col p-6 pb-[94px] max-w-md mx-auto gap-[var(--gap-md)]">
      <NeuralWeb allDays={allDays} />
      <MomentumCharts 
        allDays={allDays} 
        perfectDays={perfectDays} 
        consistency={consistency} 
      />
    </div>
  );
}
