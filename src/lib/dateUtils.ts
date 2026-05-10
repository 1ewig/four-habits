export function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export function getYesterdayStr(from?: string): string {
  const d = new Date(from || getTodayStr());
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}`;
}

export function generateDateRange(days: number, endDate?: string): string[] {
  const dates: string[] = [];
  const now = new Date(endDate || getTodayStr());
  for (let i = 1; i <= days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function isToday(dateStr: string): boolean {
  return dateStr === getTodayStr();
}

export function getLogicalDate(
  now: Date,
  resetHours: number,
  resetMinutes: number
): string {
  const resetTime = new Date(now);
  resetTime.setHours(resetHours, resetMinutes, 0, 0);

  const logicalDate = new Date(now);
  if (now < resetTime) {
    logicalDate.setDate(logicalDate.getDate() - 1);
  }
  return logicalDate.toISOString().split('T')[0];
}