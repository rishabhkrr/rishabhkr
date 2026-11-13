'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Scroll-scrubbed word reveal powered by GSAP ScrollTrigger (lazy-loaded).
 * Words start dim and light up as the paragraph scrolls through the viewport.
 * Without JS or with reduced motion, the text is simply fully visible.
 */
export function TextReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const start = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll('[data-word]'),
          { opacity: 0.35 }, // ≥3:1 contrast for large text even before reveal
          { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.5 } }
        );
      }, el);
    };

    // Fetch GSAP only when the paragraph is about a screen away — keeps it out of the initial load.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        void start();
      },
      { rootMargin: '100% 0px' }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <p ref={ref} className={cn('text-balance', className)}>
      {text.split(' ').map((w, i) => (
        <span key={i} data-word className="inline-block whitespace-pre">
          {w}{' '}
        </span>
      ))}
    </p>
  );
}
