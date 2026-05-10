import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SettingsCardProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

export function SettingsCard({ children, onClick, className = '' }: SettingsCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`bg-[var(--surface)] rounded-[var(--radius-xl)] flex text-[var(--text)] transition-colors hover:bg-[var(--surface-alt)] h-32 w-full ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}