import { useState } from 'react';
import { useHabitStoreBase } from '../../lib/store';
import { Modal } from '../ui/Modal';
import { FormField } from '../ui/FormField';
import { Toggle } from '../ui/Toggle';
import { SettingsCard } from '../ui/SettingsCard';

export function ProfileButton() {
  const name = useHabitStoreBase((s) => s.name);
  const bio = useHabitStoreBase((s) => s.bio);
  const demo_mode = useHabitStoreBase((s) => s.demo_mode);
  const setName = useHabitStoreBase((s) => s.setName);
  const setBio = useHabitStoreBase((s) => s.setBio);
  const toggleDemoMode = useHabitStoreBase((s) => s.toggleDemoMode);
  const showToast = useHabitStoreBase((s) => s.showToast);
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsCard onClick={() => setIsOpen(true)} className="col-span-2 justify-start items-center gap-4 text-left px-6">
        <div className="w-16 h-16 rounded-[var(--radius-full)] bg-[var(--accent)] flex items-center justify-center text-[var(--bg)] text-2xl font-bold shrink-0">
          {name.charAt(0).toLowerCase() || 'y.'}
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-[var(--text)]">{name}</span>
          <span className="text-sm text-[var(--text-dim)]">{bio}</span>
        </div>
      </SettingsCard>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="your identity">
        <div className="flex flex-col gap-6">
          <FormField
            label="name"
            value={name}
            onCommit={setName}
            onShowToast={showToast}
            commitMessage="name updated"
            maxLength={30}
          />

          <FormField
            label="short bio"
            value={bio}
            onCommit={setBio}
            onShowToast={showToast}
            commitMessage="bio updated"
            maxLength={50}
          />

          <div className="flex items-center justify-between pt-4 border-t border-[var(--surface-alt)]">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[var(--text)]">developer profile</span>
              <span className="text-xs text-[var(--text-dim)]">enable 30-day random history for testing</span>
            </div>
            <Toggle checked={demo_mode} onChange={toggleDemoMode} />
          </div>
        </div>
      </Modal>
    </>
  );
}