import { motion } from 'motion/react';

interface SegmentedControlProps<T extends string> {
  options: readonly T[];
  active: T;
  onChange: (value: T) => void;
  variant?: 'default' | 'nav';
}

export function SegmentedControl<T extends string>({
  options,
  active,
  onChange,
  variant = 'default',
}: SegmentedControlProps<T>) {
  if (variant === 'nav') {
    return (
      <div className="flex items-center gap-1 p-1.5 rounded-[var(--radius-full)] shadow-lg backdrop-blur-md transition-colors duration-500 bg-[var(--surface)]/90 text-[var(--text-dim)] border border-[var(--surface-alt)]">
        {options.map((option) => {
          const isActive = active === option;
          return (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`relative px-5 py-2.5 rounded-[var(--radius-full)] text-sm font-medium transition-colors ${
                isActive ? 'text-[var(--bg)]' : 'hover:text-[var(--text)]/70'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-[var(--radius-full)] bg-[var(--accent)]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{option}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {options.map((option) => {
        const isActive = active === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`text-xs px-2 py-1 rounded-[var(--radius-full)] transition-colors ${
              isActive
                ? 'bg-[var(--accent)] text-[var(--bg)]'
                : 'bg-[var(--surface-alt)] text-[var(--text-dim)]'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}