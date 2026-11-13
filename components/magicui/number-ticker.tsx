'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/** Counts up once in view. SSR / reduced motion render the final value. */
export function NumberTicker({ value, valueTo, suffix = '', className }: { value: number; valueTo?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState<[number, number | undefined]>([value, valueTo]);
  const started = useRef(false);

  useEffect(() => {
    if (!reduce && !started.current) setN([0, valueTo === undefined ? undefined : 0]);
  }, [reduce, valueTo]);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    const c = animate(0, 1, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (t) => setN([Math.round(value * t), valueTo === undefined ? undefined : Math.round(valueTo * t)]),
    });
    return () => c.stop();
  }, [inView, reduce, value, valueTo]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {n[0]}
      {n[1] !== undefined && <>–{n[1]}</>}
      {suffix}
    </span>
  );
}
