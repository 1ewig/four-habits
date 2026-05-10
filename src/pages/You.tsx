import { ProfileButton } from '../components/You/ProfileButton';
import { HabitButton } from '../components/You/HabitButton';
import { ThemeButton } from '../components/You/ThemeButton';
import { ResetButton } from '../components/You/ResetButton';
import { UndoToast } from '../components/You/UndoToast';

export function You() {
  return (
    <div className="h-full w-full flex flex-col pt-8 px-6 pb-24 max-w-md mx-auto gap-4 overflow-y-auto no-scrollbar">
      <div className="grid grid-cols-2 gap-4">
        <ProfileButton />
        <HabitButton />
        <ThemeButton />
        <ResetButton />
      </div>
      <UndoToast />
    </div>
  );
}