'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Counts up once in view. SSR / no-JS / reduced motion render the final value. */
export function NumberTicker({ value, valueTo, suffix = '', className }: { value: number; valueTo?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState<[number, number | undefined]>([value, valueTo]);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN([0, valueTo === undefined ? undefined : 0]);

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1400, 1);
          const k = easeOutExpo(t);
          setN([Math.round(value * k), valueTo === undefined ? undefined : Math.round(valueTo * k)]);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, valueTo]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {n[0]}
      {n[1] !== undefined && <>–{n[1]}</>}
      {suffix}
    </span>
  );
}
