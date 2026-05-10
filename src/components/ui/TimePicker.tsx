import { motion } from 'motion/react';

interface TimePickerProps {
  hours: number;
  minutes: number;
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
  hourLabel?: string;
  minuteLabel?: string;
}

export function TimePicker({
  hours,
  minutes,
  onHoursChange,
  onMinutesChange,
  hourLabel = 'hour',
  minuteLabel = 'min'
}: TimePickerProps) {
  const incrementHours = () => onHoursChange((hours + 1) % 24);
  const incrementMinutes = () => onMinutesChange((minutes + 15) % 60);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[var(--text-dim)]">{hourLabel}</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={incrementHours}
            className="bg-[var(--surface-alt)] text-[var(--text)] p-4 rounded-[var(--radius-lg)] w-20 text-center cursor-pointer text-2xl font-bold hover:bg-[var(--surface-alt)]/80 transition-colors"
          >
            {hours.toString().padStart(2, '0')}
          </motion.button>
        </div>

        <span className="text-3xl font-bold text-[var(--text-dim)] self-start mt-8">:</span>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[var(--text-dim)]">{minuteLabel}</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={incrementMinutes}
            className="bg-[var(--surface-alt)] text-[var(--text)] p-4 rounded-[var(--radius-lg)] w-20 text-center cursor-pointer text-2xl font-bold hover:bg-[var(--surface-alt)]/80 transition-colors"
          >
            {minutes.toString().padStart(2, '0')}
          </motion.button>
        </div>
      </div>
    </div>
  );
}