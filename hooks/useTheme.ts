'use client';

import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
import { THEME_KEY } from '@/lib/theme';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    setThemeState(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const apply = useCallback((next: Theme, persist: boolean) => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    root.classList.toggle('dark', next === 'dark');
    window.setTimeout(() => root.classList.remove('theme-transition'), 500);
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {}
    }
    setThemeState(next);
  }, []);

  const toggle = useCallback(() => apply(theme === 'dark' ? 'light' : 'dark', true), [apply, theme]);

  return { theme, toggle };
}
