import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  message: string;
  onUndo?: () => void;
  onDismiss: () => void;
}

export function Toast({ message, onUndo, onDismiss }: ToastProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[var(--surface)] text-[var(--text)] px-4 py-3 rounded-[var(--radius-lg)] shadow-lg flex items-center gap-3 z-[90]"
    >
      <span className="text-sm">{message}</span>
      {onUndo && (
        <button
          onClick={onUndo}
          className="text-xs font-medium text-[var(--accent)] hover:underline"
        >
          undo
        </button>
      )}
    </motion.div>
  );
}

interface ToastContainerProps {
  toast: { message: string; onUndo?: () => void } | null;
  onDismiss: () => void;
}

export function ToastContainer({ toast, onDismiss }: ToastContainerProps) {
  return (
    <AnimatePresence>
      {toast && (
        <Toast
          message={toast.message}
          onUndo={toast.onUndo}
          onDismiss={onDismiss}
        />
      )}
    </AnimatePresence>
  );
}