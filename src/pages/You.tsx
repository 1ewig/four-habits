import { useState } from 'react';
import { useHabitStore } from '../lib/store';
import { UndoToast } from '../components/You/UndoToast';
import { HabitButton } from '../components/You/HabitButton';
import { ResetButton } from '../components/You/ResetButton';
import { ThemeButton } from '../components/You/ThemeButton';
import { ProfileButton } from '../components/You/ProfileButton';

const THEMES = [
  'carbon', 'ghost', 'sand', 'birch', 'sakura', 'frost', 'arctic', 'bone', 'obsidian'
];

export function You() {
  const { 
    name, bio, setName, setBio, 
    habits, why, setWhy, setHabits,
    reset_h, reset_m, setResetTime,
    late_logging,
    theme, setTheme,
    demo_mode, toggleDemoMode
  } = useHabitStore();

  const [toast, setToast] = useState<{ message: string; onUndo: () => void } | null>(null);

  const showToast = (message: string, onUndo: () => void) => {
    setToast({ message, onUndo });
  };

  return (
    <div className="h-full w-full flex flex-col pt-8 px-6 pb-24 max-w-md mx-auto gap-4 overflow-y-auto no-scrollbar">

      <div className="grid grid-cols-2 gap-4">
        {/* Profile Identity */}
        <ProfileButton 
          name={name}
          bio={bio}
          setName={setName}
          setBio={setBio}
          demo_mode={demo_mode}
          toggleDemoMode={toggleDemoMode}
          showToast={showToast}
        />

        {/* Habit Settings */}
        <HabitButton 
          habits={habits}
          why={why}
          setWhy={setWhy}
          setHabits={setHabits}
          showToast={showToast}
        />

        {/* Theme Selection */}
        <ThemeButton 
          themes={THEMES}
          currentTheme={theme}
          onSelect={setTheme}
        />

        {/* System Settings */}
        <ResetButton 
          reset_h={reset_h}
          reset_m={reset_m}
          setResetTime={setResetTime}
          showToast={showToast}
        />
      </div>

      <UndoToast 
        message={toast?.message || ''} 
        visible={!!toast} 
        onUndo={() => {
          toast?.onUndo();
          setToast(null);
        }}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
