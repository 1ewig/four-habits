import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Modal } from './Modal';

interface ModalButtonProps {
  trigger: ReactNode;
  title: string;
  onClose?: () => void;
  children: ReactNode;
}

export function ModalButton({ trigger, title, onClose, children }: ModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>
      <Modal isOpen={isOpen} onClose={handleClose} title={title}>
        {children}
      </Modal>
    </>
  );
}

interface ModalButtonWrapperProps {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

export function ModalButtonWrapper({ onClick, className, children }: ModalButtonWrapperProps) {
  return (
    <motion.button
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}