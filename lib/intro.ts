/** Shared, server-safe constants for the opening sequence (no 'use client'). */
export const INTRO_KEY = 'rk-intro-seen';
export const INTRO_DONE_EVENT = 'intro:done';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Inline <head> script: the intro plays only on the homepage, and is skipped for returning
 * visitors (this session), reduced motion, and phones/touch (faster first paint).
 * Deep links (articles, 404) open straight onto their content.
 */
export const introInitScript = `(function(){try{var p=location.pathname.replace(/\\/(index\\.html)?$/,'');if(p!=='${BASE}'||sessionStorage.getItem('${INTRO_KEY}')||window.matchMedia('(prefers-reduced-motion: reduce)').matches||!window.matchMedia('(min-width: 768px) and (pointer: fine)').matches){document.documentElement.classList.add('intro-done')}}catch(e){document.documentElement.classList.add('intro-done')}})();`;
