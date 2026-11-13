'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { profile } from '@/content/site';

import { INTRO_DONE_EVENT, INTRO_KEY } from '@/lib/intro';

/** True once the opening sequence has finished (or was skipped). */
export function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (document.documentElement.classList.contains('intro-done')) {
      setDone(true);
      return;
    }
    const on = () => setDone(true);
    window.addEventListener(INTRO_DONE_EVENT, on);
    return () => window.removeEventListener(INTRO_DONE_EVENT, on);
  }, []);
  return done;
}

const name = profile.name.toUpperCase();

/**
 * Opening title sequence: the name resolves letter by letter on black, a rule
 * draws out, then the frame opens like a letterbox to reveal the page.
 * Rendered on the server so there's no flash of content; hidden by CSS
 * (html.intro-done) for returning visitors and reduced motion.
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const tlRef = useRef<{ kill: () => void; progress: (n: number) => unknown } | null>(null);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {}
    document.documentElement.classList.add('intro-done');
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    setGone(true);
  }, []);

  useEffect(() => {
    if (document.documentElement.classList.contains('intro-done')) {
      setGone(true);
      return;
    }
    const el = root.current;
    if (!el) return;
    document.documentElement.style.overflow = 'hidden';
    let cancelled = false;

    (async () => {
      const { gsap } = await import('gsap');
      if (cancelled) return;
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ onComplete: finish, defaults: { ease: 'power3.out' } });
      tl.to(q('[data-kicker]'), { opacity: 1, y: 0, duration: 0.6 })
        .to(q('[data-char]'), { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.045 }, '-=0.2')
        .to(q('[data-rule]'), { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, '-=0.4')
        .to(q('[data-role]'), { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to(q('[data-content]'), { opacity: 0, scale: 0.98, duration: 0.5, ease: 'power2.in' }, '+=0.6')
        .to(q('[data-bar="top"]'), { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=0.1')
        .to(q('[data-bar="bottom"]'), { yPercent: 100, duration: 1.1, ease: 'expo.inOut' }, '<');
      tlRef.current = tl;
    })();

    return () => {
      cancelled = true;
      tlRef.current?.kill();
      document.documentElement.style.overflow = '';
    };
  }, [finish]);

  useEffect(() => {
    if (gone) document.documentElement.style.overflow = '';
  }, [gone]);

  if (gone) return null;

  return (
    <div ref={root} data-intro className="fixed inset-0 z-[100]">
      <div data-bar="top" className="absolute inset-x-0 top-0 h-1/2 bg-black" />
      <div data-bar="bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-black" />
      <div data-content className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        <p data-kicker className="translate-y-2 font-mono text-[11px] uppercase tracking-[0.4em] text-white/50 opacity-0">
          A portfolio by
        </p>
        <p className="mt-5 flex flex-wrap justify-center text-[clamp(2.2rem,7vw,5.5rem)] font-semibold leading-none tracking-[0.12em]">
          <span className="sr-only">{profile.name}</span>
          {name.split('').map((c, i) => (
            <span key={i} data-char aria-hidden className="inline-block translate-y-6 opacity-0 [filter:blur(10px)]">
              {c === ' ' ? ' ' : c}
            </span>
          ))}
        </p>
        <span data-rule className="mt-6 block h-px w-48 origin-center scale-x-0 bg-white/40" />
        <p data-role className="mt-5 translate-y-2 font-mono text-xs uppercase tracking-[0.3em] text-white/60 opacity-0">
          Business Analyst · Product Owner
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          tlRef.current?.progress(1);
          finish();
        }}
        className="absolute bottom-6 right-6 rounded-full border border-white/20 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/60 transition-colors hover:border-white/50 hover:text-white"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        Skip intro
      </button>
    </div>
  );
}
