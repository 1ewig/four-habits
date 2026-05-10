import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface ResetButtonProps {
  reset_h: number;
  reset_m: number;
  setResetTime: (h: number, m: number) => void;
  showToast: (message: string, onUndo: () => void) => void;
}

export function ResetButton({
  reset_h,
  reset_m,
  setResetTime,
  showToast
}: ResetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="col-span-2 bg-[var(--surface)] p-6 rounded-[var(--radius-xl)] flex items-center justify-between w-full text-left transition-colors hover:bg-[var(--surface-alt)]"
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex flex-col">
          <span className="text-xs font-medium tracking-wide text-[var(--text-dim)] mb-1">reset time</span>
          <span className="text-2xl font-bold text-[var(--text)]">
            {reset_h.toString().padStart(2, '0')}:{reset_m.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="bg-[var(--surface-alt)] p-2 rounded-full text-[var(--text-dim)]">
          <Info className="w-5 h-5" />
        </div>
      </motion.button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="system settings">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-[var(--text-dim)]">reset time</label>
            <div className="flex gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const prevH = reset_h;
                  const newH = (reset_h + 1) % 24;
                  setResetTime(newH, reset_m);
                  showToast('reset hour updated', () => setResetTime(prevH, reset_m));
                }}
                className="bg-[var(--surface-alt)] text-[var(--text)] p-4 rounded-[var(--radius-lg)] outline-none focus:ring-2 focus:ring-[var(--accent)] w-24 text-center cursor-pointer text-2xl font-bold"
              >
                {reset_h.toString().padStart(2, '0')}
              </motion.button>
              <span className="text-2xl font-bold text-[var(--text-dim)] self-center">:</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const prevM = reset_m;
                  const newM = (reset_m + 15) % 60;
                  setResetTime(reset_h, newM);
                  showToast('reset minute updated', () => setResetTime(reset_h, prevM));
                }}
                className="bg-[var(--surface-alt)] text-[var(--text)] p-4 rounded-[var(--radius-lg)] outline-none focus:ring-2 focus:ring-[var(--accent)] w-24 text-center cursor-pointer text-2xl font-bold"
              >
                {reset_m.toString().padStart(2, '0')}
              </motion.button>
            </div>
          </div>

          <div className="text-xs text-[var(--text-dim)] flex flex-col gap-3 bg-[var(--surface-alt)] p-4 rounded-2xl">
            <p>
              <strong className="text-[var(--text)]">late logging</strong> is always enabled. You can use the arrows on the home page to mark habits from yesterday at any time.
            </p>
            <p>
              <strong className="text-[var(--text)]">reset time</strong> determines when your day starts. Set this to when you usually wake up or when you want your habits to refresh.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
