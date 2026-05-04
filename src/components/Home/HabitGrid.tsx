import { motion, AnimatePresence } from 'motion/react';
import { HabitCard } from './HabitCard';

interface HabitGridProps {
  habits: string[];
  activeDone: boolean[];
  onToggle: (index: number) => void;
  viewDate: string;
}

export function HabitGrid({ habits, activeDone, onToggle, viewDate }: HabitGridProps) {
  return (
    <div className="flex-grow min-h-0 relative w-full">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={viewDate}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="grid grid-cols-2 grid-rows-2 gap-4 h-full w-full"
        >
          {habits.map((habit, index) => (
            <HabitCard
              key={index}
              habit={habit}
              isDone={activeDone[index]}
              onClick={() => onToggle(index)}
              viewDate={viewDate}
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
