import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Modal } from './Modal';

interface HabitButtonProps {
  habits: string[];
  why: string;
  setWhy: (why: string) => void;
  setHabits: (habits: string[]) => void;
  showToast: (message: string, onUndo: () => void) => void;
}

export function HabitButton({ habits, why, setWhy, setHabits, showToast }: HabitButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempHabits, setTempHabits] = useState(habits);
  const [tempWhy, setTempWhy] = useState(why);

  useEffect(() => {
    if (isOpen) {
      setTempHabits(habits);
      setTempWhy(why);
    }
  }, [isOpen, habits, why]);

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
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--text-dim)]">your why (50 chars max)</label>
            <textarea
              value={tempWhy}
              onChange={(e) => setTempWhy(e.target.value)}
              enterKeyHint="done"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.currentTarget.blur();
                }
              }}
              onBlur={() => {
                if (tempWhy !== why) {
                  const prev = why;
                  setWhy(tempWhy);
                  showToast('why updated', () => {
                    setWhy(prev);
                    setTempWhy(prev);
                  });
                }
              }}
              maxLength={50}
              className="bg-[var(--surface-alt)] text-[var(--text)] p-4 rounded-[var(--radius-lg)] resize-none outline-none focus:ring-2 focus:ring-[var(--accent)]"
              rows={2}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--text-dim)]">core habits (30 chars max)</label>
            {tempHabits.map((h, i) => (
              <div key={i} className="relative">
                <input
                  value={h}
                  onChange={(e) => {
                    const newHabits = [...tempHabits];
                    newHabits[i] = e.target.value;
                    setTempHabits(newHabits);
                  }}
                  enterKeyHint="done"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.currentTarget.blur();
                    }
                  }}
                  onBlur={() => {
                    if (tempHabits[i] !== habits[i]) {
                      const prev = [...habits];
                      setHabits(tempHabits);
                      showToast('habit updated', () => {
                        setHabits(prev);
                        setTempHabits(prev);
                      });
                    }
                  }}
                  maxLength={30}
                  className="w-full bg-[var(--surface-alt)] text-[var(--text)] p-4 rounded-[var(--radius-lg)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
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
