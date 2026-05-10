import { useMemo } from 'react';
import { getThemeEmoji } from '../lib/themes';
import { SegmentedControl } from './ui/SegmentedControl';

interface NavigationProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isPerfectDay: boolean;
  theme: string;
}

export function Navigation({ activePage, setActivePage, isPerfectDay, theme }: NavigationProps) {
  const emoji = getThemeEmoji(theme);
  
  const navItems = useMemo(() => {
    return [
      isPerfectDay ? `perfect ${emoji}` : 'habits',
      'progress',
      'you',
    ] as const;
  }, [isPerfectDay, emoji]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] pb-6 pt-2 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-transparent">
      <div className="mx-auto w-max">
        <SegmentedControl
          options={navItems}
          active={activePage === 'home' ? navItems[0] : activePage}
          onChange={(label) => {
            if (label === navItems[0]) setActivePage('home');
            else if (label === 'progress') setActivePage('progress');
            else if (label === 'you') setActivePage('you');
          }}
          variant="nav"
        />
      </div>
    </div>
  );
}