import { motion } from 'motion/react';
import { getThemeEmoji } from '../lib/themes';

interface NavigationProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isPerfectDay: boolean;
  theme: string;
}

export function Navigation({ activePage, setActivePage, isPerfectDay, theme }: NavigationProps) {
  const emoji = getThemeEmoji(theme);
  const navItems = [
    { id: 'home', label: isPerfectDay ? `perfect ${emoji}` : 'habits' },
    { id: 'progress', label: 'progress' },
    { id: 'you', label: 'you' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] pb-6 pt-2 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-transparent">
      <motion.div
        className="flex items-center gap-1 p-1.5 rounded-[var(--radius-full)] shadow-lg backdrop-blur-md transition-colors duration-500 bg-[var(--surface)]/90 text-[var(--text-dim)] border border-[var(--surface-alt)] mx-auto w-max"
        layout
      >
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`relative px-5 py-2.5 rounded-[var(--radius-full)] text-sm font-medium transition-colors ${
                isActive
                  ? 'text-[var(--bg)]'
                  : 'hover:text-[var(--text)]/70'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-[var(--radius-full)] bg-[var(--accent)]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
