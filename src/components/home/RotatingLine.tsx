'use client';

import { useEffect, useState } from 'react';

/**
 * "I build… requirements → data models → …". Cycles one word at a time; under
 * prefers-reduced-motion it shows the full chain statically.
 */
export function RotatingLine({ prefix, words }: { prefix: string; words: string[] }) {
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => window.clearInterval(t);
  }, [reduced, words.length]);

  return (
    <p className="mt-8 font-display text-lg text-muted sm:text-xl">
      <span className="text-fg">{prefix}</span>{' '}
      {/* Screen readers get the whole sentence once, not a changing word */}
      <span className="sr-only">{words.join(' → ')}</span>
      <span aria-hidden className="inline-flex flex-wrap items-baseline gap-x-2">
        {reduced ? (
          words.map((w, n) => (
            <span key={w} className="text-accent">
              {w}
              {n < words.length - 1 ? <span className="ml-2 text-muted">→</span> : null}
            </span>
          ))
        ) : (
          <>
            <span key={words[i]} className="animate-[fadeUp_300ms_ease-out] font-semibold text-accent">
              {words[i]}
            </span>
            <span className="text-sm text-muted">
              {i + 1}/{words.length}
            </span>
          </>
        )}
      </span>
    </p>
  );
}
