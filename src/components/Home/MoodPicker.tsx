import { motion } from 'motion/react';

interface MoodPickerProps {
  currentFeeling?: string;
  onSelect: (emoji: string) => void;
  isToday: boolean;
}

const EMOJIS = ['😞', '😐', '🤩'];

export function MoodPicker({ currentFeeling, onSelect, isToday }: MoodPickerProps) {
  return (
    <div className="bg-[var(--surface)] p-4 rounded-[var(--radius-xl)] flex items-center justify-between shrink-0">
      <span className="text-[var(--text-dim)] text-sm font-medium pl-2">
        how did {isToday ? 'today' : 'yesterday'} feel?
      </span>
      <div className="flex gap-2">
        {EMOJIS.map((emoji) => (
          <motion.button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className={`w-10 h-10 rounded-[var(--radius-full)] flex items-center justify-center text-xl transition-colors ${
              currentFeeling === emoji
                ? 'bg-[var(--surface-alt)] scale-110'
                : 'hover:bg-[var(--surface-alt)]/50 opacity-50'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
