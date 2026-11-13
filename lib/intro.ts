/** Shared, server-safe constants for the opening sequence (no 'use client'). */
export const INTRO_KEY = 'rk-intro-seen';
export const INTRO_DONE_EVENT = 'intro:done';

/** Inline <head> script: skip the intro for returning visitors (this session), reduced motion, and phones/touch (faster first paint). */
export const introInitScript = `(function(){try{if(sessionStorage.getItem('${INTRO_KEY}')||window.matchMedia('(prefers-reduced-motion: reduce)').matches||!window.matchMedia('(min-width: 768px) and (pointer: fine)').matches){document.documentElement.classList.add('intro-done')}}catch(e){document.documentElement.classList.add('intro-done')}})();`;
