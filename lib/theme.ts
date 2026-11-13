/** Shared, server-safe theme constants (no 'use client'). */
export const THEME_KEY = 'rk-theme';

/** Inline script for <head>: applies the stored theme before first paint; the cinematic default is dark. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark'){t='dark'}if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`;
