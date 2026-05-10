import { TodayHeader } from '../components/Home/TodayHeader';
import { HabitGrid } from '../components/Home/HabitGrid';
import { MoodPicker } from '../components/Home/MoodPicker';

export function Home() {
  return (
    <div className="h-full w-full flex flex-col pt-2 px-6 pb-24 max-w-md mx-auto gap-4">
      <TodayHeader />
      <HabitGrid />
      <MoodPicker />
    </div>
  );
}