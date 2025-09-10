'use client';

import { GovIcon } from '@gov-design-system-ce/react';

import { useTheme } from '@/components/contexts/ThemeProvider';
import { useState } from 'react';

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  // const [theme, setTheme] = useState('light');
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-10 h-6 rounded-3xl transition-colors duration-300 outline-0 focus-visible:outline-1"
      style={{ backgroundColor: isDark ? '#2362a2' : '#b0b0b0' }}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 flex items-center justify-center ${
          isDark ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      >
        <GovIcon name={isDark ? 'moon' : 'sun'} className="!size-3" />
      </div>
    </button>
  );
};
