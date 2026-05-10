import { useState } from 'react';
import { motion } from 'motion/react';
import { Modal } from '../ui/Modal';
import { FormField } from '../ui/FormField';

interface HabitButtonProps {
  habits: string[];
  why: string;
  setWhy: (why: string) => void;
  setHabits: (habits: string[]) => void;
  showToast: (message: string, onUndo: () => void) => void;
}

export function HabitButton({ habits, why, setWhy, setHabits, showToast }: HabitButtonProps) {
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
                    const newHabits = [...habits];
                    newHabits[i] = v;
                    setHabits(newHabits);
                    showToast('habit updated', () => {
                      newHabits[i] = h;
                      setHabits([...newHabits]);
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