'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type SlidingNumberType = typeof import('@/components/animate-ui/primitives/texts/sliding-number').SlidingNumber;

/**
 * Metric number. The server (and no-JS / reduced-motion visitors) get the final value as
 * plain text. Shortly before it scrolls into view, the client swaps in Animate UI's
 * SlidingNumber (odometer-style digits rolling up from 0). The motion library is fetched
 * only at that point, never on first load. Screen readers always get the final value.
 */
export function NumberTicker({ value, valueTo, suffix = '', className }: { value: number; valueTo?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [Sliding, setSliding] = useState<SlidingNumberType | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let alive = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        import('@/components/animate-ui/primitives/texts/sliding-number').then((m) => alive && setSliding(() => m.SlidingNumber));
      },
      { rootMargin: '250px 0px' }
    );
    io.observe(el);
    return () => {
      alive = false;
      io.disconnect();
    };
  }, []);

  const finalText = `${value}${valueTo !== undefined ? `–${valueTo}` : ''}${suffix}`;

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {Sliding ? (
        <>
          <span className="sr-only">{finalText}</span>
          <span aria-hidden className="inline-flex items-baseline">
            <Sliding number={value} fromNumber={0} inView inViewOnce inViewMargin="-40px" />
            {valueTo !== undefined && (
              <>
                –<Sliding number={valueTo} fromNumber={0} inView inViewOnce inViewMargin="-40px" />
              </>
            )}
            {suffix}
          </span>
        </>
      ) : (
        finalText
      )}
    </span>
  );
}
