import { useState, useEffect } from 'react';
import { useHabitStore } from '../lib/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';
import { HabitGrid } from '../components/Home/HabitGrid';
import { MoodPicker } from '../components/Home/MoodPicker';

export function Home() {
  const { habits, today_done, toggleHabit, feelings, today_date, setFeeling, late_logging, history, toggleHistoryHabit, setHistoryFeeling, demo_mode, demo_history } = useHabitStore();
  const [viewDate, setViewDate] = useState(today_date);

  // If late_logging changes away from true, reset to today
  useEffect(() => {
    if (!late_logging) {
      setViewDate(today_date);
    }
  }, [late_logging, today_date]);

  const isToday = viewDate === today_date;
  const currentHistory = demo_mode ? demo_history : history;
  const activeDone = isToday ? today_done : (currentHistory[viewDate] || [false, false, false, false]);
  const currentFeeling = feelings[viewDate];

  const handleToggle = (index: number) => {
    // Haptic feedback
    if (navigator.vibrate) {
      const isNowDone = !activeDone[index];
      const willBePerfect = isNowDone && activeDone.filter((_, i) => i !== index && activeDone[i]).length === 3;
      
      if (willBePerfect) {
        navigator.vibrate([40, 30, 80]);
      } else {
        navigator.vibrate(10);
      }
    }
    
    if (isToday) {
      toggleHabit(index);
    } else {
      toggleHistoryHabit(viewDate, index);
    }
  };

  const handleFeeling = (emoji: string) => {
    if (isToday) {
      setFeeling(emoji);
    } else {
      setHistoryFeeling(viewDate, emoji);
    }
  };

  const getYesterdayStr = () => {
    const d = new Date(today_date);
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  };
  const yesterdayStr = getYesterdayStr();

  return (
    <div className="h-full w-full flex flex-col pt-2 px-6 pb-24 max-w-md mx-auto gap-4">
      {/* Header with Date Navigation */}
      <Header 
        date={viewDate} 
        leftAction={
          late_logging && isToday ? (
            <button 
              onClick={() => setViewDate(yesterdayStr)} 
              className="p-2 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          ) : undefined
        }
        rightAction={
          late_logging && !isToday ? (
            <button 
              onClick={() => setViewDate(today_date)} 
              className="p-2 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          ) : undefined
        }
      />

      <HabitGrid 
        habits={habits}
        activeDone={activeDone}
        onToggle={handleToggle}
        viewDate={viewDate}
      />

      <MoodPicker 
        currentFeeling={currentFeeling}
        onSelect={handleFeeling}
        isToday={isToday}
      />
    </div>
  );
}
