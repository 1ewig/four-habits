import { useState } from 'react';
import { useHabitStoreBase } from '../../lib/store';
import { motion } from 'motion/react';
import { Modal } from '../ui/Modal';
import { FormField } from '../ui/FormField';

export function HabitButton() {
  const habits = useHabitStoreBase((s) => s.habits);
  const why = useHabitStoreBase((s) => s.why);
  const setWhy = useHabitStoreBase((s) => s.setWhy);
  const setHabits = useHabitStoreBase((s) => s.setHabits);
  const showToast = useHabitStoreBase((s) => s.showToast);
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="bg-[var(--surface)] p-4 rounded-[var(--radius-xl)] flex flex-col items-center justify-center gap-1 text-[var(--text)] transition-colors hover:bg-[var(--surface-alt)] h-32"
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xs font-medium tracking-wide text-[var(--text-dim)] mb-1">habits</span>
        <span className="text-lg font-bold text-[var(--text)] text-center line-clamp-3 italic leading-tight">
          "{why}"
        </span>
      </motion.button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="habits & system">
        <div className="flex flex-col gap-6">
          <FormField
            label="your why (50 chars max)"
            value={why}
            onCommit={setWhy}
            onShowToast={showToast}
            commitMessage="why updated"
            maxLength={50}
            rows={2}
            inputType="textarea"
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--text-dim)]">core habits (30 chars max)</label>
            {habits.map((h, i) => (
              <div key={i}>
                <FormField
                  label=""
                  value={h}
                  onCommit={(v) => {
                    const currentHabits = useHabitStoreBase.getState().habits;
                    const prevHabit = currentHabits[i];
                    const newHabits = [...currentHabits];
                    newHabits[i] = v;
                    setHabits(newHabits);
                    showToast('habit updated', () => {
                      const undoHabits = [...useHabitStoreBase.getState().habits];
                      undoHabits[i] = prevHabit;
                      setHabits(undoHabits);
                    });
                  }}
                  onShowToast={showToast}
                  commitMessage="habit updated"
                  maxLength={30}
                  placeholder={`habit ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}