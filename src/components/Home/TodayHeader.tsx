import { useHabitStoreBase } from '../../lib/store';
import { getYesterdayStr } from '../../lib/dateUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function formatDate(dateStr: string): string {
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return dateStr;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(dateObj).toLowerCase();
}

export function TodayHeader() {
  const viewDate = useHabitStoreBase((s) => s.viewDate);
  const today_date = useHabitStoreBase((s) => s.today_date);
  const late_logging = useHabitStoreBase((s) => s.late_logging);
  const why = useHabitStoreBase((s) => s.why);
  const setViewDate = useHabitStoreBase((s) => s.setViewDate);

  const isToday = viewDate === today_date;
  const isYesterday = viewDate === getYesterdayStr(today_date);
  const yesterdayDate = getYesterdayStr(today_date);

  const displayTitle = isYesterday ? 'yesterday' : formatDate(viewDate);

  return (
    <header className="w-full flex flex-col items-center text-center gap-1 pt-2 pb-2 px-6 shrink-0 z-50">
      <div className="relative flex items-center justify-center w-full min-h-[40px]">
        {late_logging && isToday && (
          <button 
            onClick={() => setViewDate(yesterdayDate)} 
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        <h1 className="text-[var(--text)] text-3xl font-bold tracking-tight leading-tight">
          {displayTitle}
        </h1>

        {late_logging && !isToday && (
          <button 
            onClick={() => setViewDate(today_date)} 
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
      <p className="text-[var(--text-dim)] text-sm opacity-80 italic max-w-[85%] line-clamp-2">
        "{why}"
      </p>
    </header>
  );
}