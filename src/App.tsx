/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useHabitStore } from './lib/store';
import { TRANSITIONS } from './lib/animations';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Progress } from './pages/Progress';
import { You } from './pages/You';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const { theme, today_done } = useHabitStore();

  const isPerfectDay = today_done.every(Boolean);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <div className="h-full w-full relative overflow-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={TRANSITIONS.page}
          className="h-full w-full absolute inset-0"
        >
          {activePage === 'home' && <Home />}
          {activePage === 'progress' && <Progress />}
          {activePage === 'you' && <You />}
        </motion.div>
      </AnimatePresence>

      <Navigation
        activePage={activePage}
        setActivePage={setActivePage}
        isPerfectDay={isPerfectDay}
        theme={theme}
      />
    </div>
  );
}

