import { motion } from 'motion/react';

interface HabitCardProps {
  key?: string | number;
  habit: string;
  isDone: boolean;
  onClick: () => void;
  viewDate: string;
  index: number;
}

export function HabitCard({ habit, isDone, onClick, viewDate, index }: HabitCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative flex flex-col items-start justify-end p-6 rounded-[var(--radius-xl)] overflow-hidden transition-colors duration-[var(--transition-base)] ${
        isDone ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-[var(--surface)] text-[var(--text)]'
      }`}
      whileTap={{ scale: 0.95 }}
      layout
    >
      {/* Soft background pulse when done */}
      {isDone && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.5] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
      <span className="relative z-10 text-[26px] leading-tight font-semibold tracking-tight break-words line-clamp-2">
        {habit}
      </span>
    </motion.button>
  );
}
