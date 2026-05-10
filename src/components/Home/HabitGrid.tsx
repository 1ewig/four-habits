import { useMemo } from 'react';
import { useHabitStoreBase } from '../../lib/store';
import { useHaptic } from '../../hooks/useHaptic';
import { getEmptyTodayDone } from '../../lib/habitUtils';
import { TRANSITIONS } from '../../lib/animations';
import { motion, AnimatePresence } from 'motion/react';
import { HabitCard } from './HabitCard';

export function HabitGrid() {
  const habits = useHabitStoreBase((s) => s.habits);
  const viewDate = useHabitStoreBase((s) => s.viewDate);
  const today_date = useHabitStoreBase((s) => s.today_date);
  const today_done = useHabitStoreBase((s) => s.today_done);
  const demo_mode = useHabitStoreBase((s) => s.demo_mode);
  const demo_history = useHabitStoreBase((s) => s.demo_history);
  const history = useHabitStoreBase((s) => s.history);
  const toggleHabit = useHabitStoreBase((s) => s.toggleHabit);
  const toggleHistoryHabit = useHabitStoreBase((s) => s.toggleHistoryHabit);
  const { triggerToggle } = useHaptic();

  const isToday = viewDate === today_date;

  const activeDone = useMemo(() => {
    if (isToday) {
      return today_done;
    }
    const currentHistory = demo_mode ? demo_history : history;
    return currentHistory[viewDate] || getEmptyTodayDone();
  }, [isToday, today_done, demo_mode, demo_history, history, viewDate]);

  const handleToggle = (index: number) => {
    triggerToggle(activeDone, index);
    if (isToday) {
      toggleHabit(index);
    } else {
      toggleHistoryHabit(viewDate, index);
    }
  };

  return (
    <div className="flex-grow min-h-0 relative w-full">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={viewDate}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={TRANSITIONS.habitPage}
          className="grid grid-cols-2 grid-rows-2 gap-4 h-full w-full"
        >
          {habits.map((habit, index) => (
            <HabitCard
              key={index}
              habit={habit}
              isDone={activeDone[index]}
              onClick={() => handleToggle(index)}
              viewDate={viewDate}
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}