import { useHabitStoreBase } from '../../lib/store';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw } from 'lucide-react';

export function UndoToast() {
  const toast = useHabitStoreBase((s) => s.toast);
  const hideToast = useHabitStoreBase((s) => s.hideToast);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-6 left-0 right-0 mx-auto w-max z-[90] flex items-center gap-4 bg-[var(--text)] text-[var(--bg)] px-5 py-3 rounded-[var(--radius-full)] shadow-xl"
        >
          <span className="text-sm font-medium">{toast.message}</span>
          <div className="w-px h-4 bg-[var(--bg)] opacity-20" />
          <button
            onClick={() => {
              toast.onUndo();
              hideToast();
            }}
            className="flex items-center gap-1.5 text-sm font-bold text-[var(--bg)] hover:opacity-80 transition-opacity"
          >
            <RotateCcw className="w-4 h-4" />
            undo
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}