/** Shared, server-safe theme constants (no 'use client'). */
export const THEME_KEY = 'rk-theme';

/** Inline script for <head>: marks JS as available (enables reveal start states) and applies the stored theme; dark is the default. */
export const themeInitScript = `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark'){t='dark'}if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`;
