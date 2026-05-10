import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'ghost';
}

export function IconButton({
  icon: Icon,
  onClick,
  className = '',
  size = 'md',
  variant = 'default'
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variantClasses = {
    default: 'bg-[var(--surface-alt)] text-[var(--text-dim)]',
    filled: 'bg-[var(--accent)] text-[var(--bg)]',
    ghost: 'bg-transparent text-[var(--text-dim)] hover:bg-[var(--surface-alt)]'
  };

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <Icon className={iconSizes[size]} />
    </motion.button>
  );
}