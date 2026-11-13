'use client';

import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import { createContext, useContext, useEffect, useState } from 'react';

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/**
 * Lenis smooth scrolling. Skipped entirely for reduced-motion users and on
 * touch devices, where native momentum scrolling is already good.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse) return;

    const instance = new Lenis({ duration: 1.1, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    setLenis(instance);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // reducedMotion="user": transform animations become instant for visitors who prefer reduced motion.
  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
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
