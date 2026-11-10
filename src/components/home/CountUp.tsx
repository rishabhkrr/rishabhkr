'use client';

import { useEffect, useRef, useState } from 'react';

/** Animates the numeric part of "2,500+" / "75%" from 0 once it scrolls into view. Server HTML has the final value. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const m = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = m ? parseInt(m[2].replace(/,/g, ''), 10) : NaN;
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<string>(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m || Number.isNaN(target)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const fmt = (n: number) => `${m[1]}${m[2].includes(',') ? n.toLocaleString('en-US') : n}${m[3]}`;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1100;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(fmt(Math.round(target * eased)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setShown(fmt(0));
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
