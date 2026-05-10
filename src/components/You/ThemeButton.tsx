import { useState } from 'react';
import { useHabitStoreBase } from '../../lib/store';
import { THEMES } from '../../lib/constants';
import { Modal } from '../ui/Modal';
import { SettingsCard } from '../ui/SettingsCard';
import { Palette } from 'lucide-react';

export function ThemeButton() {
  const theme = useHabitStoreBase((s) => s.theme);
  const setTheme = useHabitStoreBase((s) => s.setTheme);
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsCard onClick={() => setIsOpen(true)} className="p-6 flex-col items-center justify-center gap-2">
        <Palette className="w-6 h-6 text-[var(--accent)]" />
        <span className="text-xs font-medium tracking-wide text-[var(--text-dim)] uppercase">theme</span>
      </SettingsCard>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="evolution themes">
        <div className="grid grid-cols-2 gap-3">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`theme-${t} p-4 rounded-[var(--radius-lg)] text-left transition-all border-2 flex items-center justify-between ${
                theme === t
                  ? 'border-[var(--accent)] bg-[var(--surface-alt)] text-[var(--text)]'
                  : 'border-transparent bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-alt)]'
              }`}
            >
              <span className="font-medium">{t}</span>
              <div className="w-3 h-3 rounded-[var(--radius-full)] bg-[var(--accent)] opacity-80" />
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}