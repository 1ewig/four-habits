import React from 'react';
import { useHabitStore } from '../lib/store';

interface HeaderProps {
  date: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}

export function Header({ date, leftAction, rightAction }: HeaderProps) {
  const { why } = useHabitStore();

  // Format date or use as title
  const dateObj = new Date(date);
  const isDate = !isNaN(dateObj.getTime());

  const displayTitle = isDate 
    ? new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      }).format(dateObj).toLowerCase()
    : date;

  return (
    <header className="w-full flex flex-col items-center text-center gap-1 pt-2 pb-2 px-6 shrink-0 z-50">
      <div className="relative flex items-center justify-center w-full min-h-[40px]">
        {leftAction && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            {leftAction}
          </div>
        )}
        
        <h1 className="text-[var(--text)] text-3xl font-bold tracking-tight leading-tight">
          {displayTitle}
        </h1>

        {rightAction && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            {rightAction}
          </div>
        )}
      </div>
      <p className="text-[var(--text-dim)] text-sm opacity-80 italic max-w-[85%] line-clamp-2">
        "{why}"
      </p>
    </header>
  );
}
