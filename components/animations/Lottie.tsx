'use client';

import { useEffect, useRef } from 'react';
import { asset } from '@/lib/contact';

type Props = {
  /** Path under /public, e.g. "/lottie/connect.json". */
  src: string;
  className?: string;
  /** Play when scrolled into view (default) or immediately on mount. */
  trigger?: 'view' | 'mount';
  label?: string;
};

/**
 * Lazy Lottie player (lottie-web light build, SVG renderer). The library and
 * JSON load only when needed; it plays once, never loops, and shows the final
 * frame for reduced-motion users. Stroke colours follow the theme via CSS.
 */
export function Lottie({ src, className = '', trigger = 'view', label }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let destroy: (() => void) | undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const start = async () => {
      try {
        const [{ default: lottie }, data] = await Promise.all([
          import('lottie-web/build/player/lottie_light'),
          fetch(asset(src)).then((r) => {
            if (!r.ok) throw new Error(`Lottie ${src}: ${r.status}`);
            return r.json();
          }),
        ]);
        if (cancelled) return;
        const anim = lottie.loadAnimation({ container: el, renderer: 'svg', loop: false, autoplay: !reduce, animationData: data });
        if (reduce) anim.addEventListener('DOMLoaded', () => anim.goToAndStop(anim.totalFrames - 1, true));
        destroy = () => anim.destroy();
      } catch {
        // Decorative only — fail silently and leave the space empty.
      }
    };

    if (trigger === 'mount') {
      start();
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            start();
          }
        },
        { rootMargin: '0px 0px -15% 0px' }
      );
      io.observe(el);
      destroy = () => io.disconnect();
    }

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [src, trigger]);

  return <div ref={ref} className={`lottie-themed ${className}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} />;
}
