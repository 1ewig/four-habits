import { useState } from 'react';
import { motion } from 'motion/react';
import { Modal } from './Modal';

interface ProfileButtonProps {
  name: string;
  bio: string;
  setName: (name: string) => void;
  setBio: (bio: string) => void;
  demo_mode: boolean;
  toggleDemoMode: () => void;
  showToast: (message: string, onUndo: () => void) => void;
}

export function ProfileButton({
  name,
  bio,
  setName,
  setBio,
  demo_mode,
  toggleDemoMode,
  showToast
}: ProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempBio, setTempBio] = useState(bio);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="col-span-2 bg-[var(--surface)] p-6 rounded-[var(--radius-xl)] flex items-center gap-4 h-32 w-full text-left transition-colors hover:bg-[var(--surface-alt)]"
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-16 h-16 rounded-[var(--radius-full)] bg-[var(--accent)] flex items-center justify-center text-[var(--bg)] text-2xl font-bold shrink-0">
          {name.charAt(0).toLowerCase() || 'y.'}
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-[var(--text)]">{name}</span>
          <span className="text-sm text-[var(--text-dim)]">{bio}</span>
        </div>
      </motion.button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="your identity">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--text-dim)]">name</label>
            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={() => {
                if (tempName !== name) {
                  const prev = name;
                  setName(tempName);
                  showToast('name updated', () => {
                    setName(prev);
                    setTempName(prev);
                  });
                }
              }}
              className="bg-[var(--surface-alt)] text-[var(--text)] p-4 rounded-[var(--radius-lg)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--text-dim)]">short bio</label>
            <input
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              onBlur={() => {
                if (tempBio !== bio) {
                  const prev = bio;
                  setBio(tempBio);
                  showToast('bio updated', () => {
                    setBio(prev);
                    setTempBio(prev);
                  });
                }
              }}
              className="bg-[var(--surface-alt)] text-[var(--text)] p-4 rounded-[var(--radius-lg)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--surface-alt)]">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[var(--text)]">developer profile</span>
              <span className="text-xs text-[var(--text-dim)]">enable 30-day random history for testing</span>
            </div>
            <button
              onClick={toggleDemoMode}
              className={`w-12 h-6 rounded-[var(--radius-full)] p-1 transition-colors ${
                demo_mode ? 'bg-[var(--accent)]' : 'bg-[var(--surface-alt)]'
              }`}
            >
              <motion.div
                className="w-4 h-4 bg-white rounded-[var(--radius-full)] shadow-sm"
                animate={{ x: demo_mode ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
