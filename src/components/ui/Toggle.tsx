import { motion } from 'motion/react';
import { TRANSITIONS } from '../../lib/animations';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-[var(--radius-full)] p-1 transition-colors ${
        checked ? 'bg-[var(--accent)]' : 'bg-[var(--surface-alt)]'
      }`}
    >
      <motion.div
        className="w-4 h-4 bg-white rounded-[var(--radius-full)] shadow-sm"
        animate={{ x: checked ? 24 : 0 }}
        transition={TRANSITIONS.toggle}
      />
    </button>
  );
}