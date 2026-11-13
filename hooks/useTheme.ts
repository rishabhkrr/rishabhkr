'use client';

import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
export const THEME_KEY = 'rk-theme';

/** Inline script for <head>: applies the stored or system theme before first paint. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`;

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    setThemeState(document.documentElement.classList.contains('dark') ? 'dark' : 'light');

    // Follow the OS only until the visitor makes an explicit choice.
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(THEME_KEY);
      } catch {}
      if (stored) return;
      apply(e.matches ? 'dark' : 'light', false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
