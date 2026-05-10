import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Modal } from './Modal';
import { useUndoable } from '../../hooks/useUndoable';
import { useUndoableArray } from '../../hooks/useUndoableArray';

interface HabitButtonProps {
  habits: string[];
  why: string;
  setWhy: (why: string) => void;
  setHabits: (habits: string[]) => void;
  showToast: (message: string, onUndo: () => void) => void;
}

export function HabitButton({ habits, why, setWhy, setHabits, showToast }: HabitButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const whyUndo = useUndoable({
    initialValue: why,
    onCommit: setWhy,
    onShowToast: showToast,
    commitMessage: 'why updated',
  });

  const habitsUndo = useUndoableArray({
    initialValue: habits,
    onCommit: setHabits,
    onShowToast: showToast,
    commitMessage: 'habits updated',
  });

  useEffect(() => {
    if (!isOpen) {
      whyUndo.reset();
      habitsUndo.reset();
    }
  }, [isOpen]);

  const handleKeyDown = (callback: () => void) => (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      callback();
    }
  };

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
              value={whyUndo.tempValue}
              onChange={(e) => whyUndo.setTempValue(e.target.value)}
              onBlur={() => whyUndo.commit(whyUndo.tempValue)}
              onKeyDown={handleKeyDown(() => whyUndo.commit(whyUndo.tempValue))}
              maxLength={50}
              className="bg-[var(--surface-alt)] text-[var(--text)] p-4 rounded-[var(--radius-lg)] resize-none outline-none focus:ring-2 focus:ring-[var(--accent)]"
              rows={2}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--text-dim)]">core habits (30 chars max)</label>
            {habitsUndo.tempValue.map((h, i) => (
              <div key={i} className="relative">
                <input
                  value={h}
                  onChange={(e) => habitsUndo.setItem(i, e.target.value)}
                  onBlur={() => habitsUndo.commitAll()}
                  onKeyDown={handleKeyDown(() => habitsUndo.commitAll())}
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