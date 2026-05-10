import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { TRANSITIONS } from '../../lib/animations';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITIONS.quick}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={TRANSITIONS.modalSlide}
            className="fixed bottom-0 left-0 right-0 bg-[var(--surface)] rounded-t-3xl z-[80] p-6 pb-10 max-h-[85vh] overflow-y-auto max-w-md mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-[var(--text)] capitalize">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--surface-alt)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}