'use client';

import type Lenis from 'lenis';
import { createContext, useContext, useEffect, useState } from 'react';

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/**
 * Lenis smooth scrolling, loaded lazily. Skipped entirely for reduced-motion users and on
 * touch devices, where native momentum scrolling is already good.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse) return;

    // Loaded on demand so phones never download it.
    let instance: Lenis | null = null;
    let frame = 0;
    let cancelled = false;
    import('lenis').then(({ default: LenisCtor }) => {
      if (cancelled) return;
      const lenisInstance = new LenisCtor({ duration: 1.1, smoothWheel: true });
      instance = lenisInstance;
      const raf = (time: number) => {
        lenisInstance.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
      setLenis(lenisInstance);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Scroll to an in-page section, via Lenis when active. */
export function scrollToId(id: string, lenis: Lenis | null) {
  const el = id === 'home' ? document.body : document.getElementById(id);
  if (!el) return;
  const navH = 80;
  if (lenis) {
    // Lenis already honours the html scroll-padding-top (nav height), so no extra offset.
    lenis.scrollTo(id === 'home' ? 0 : el);
  } else {
    const top = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`);
}
