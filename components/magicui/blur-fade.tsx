import { cn } from '@/lib/utils';

/**
 * Fade + un-blur + rise when scrolled into view.
 *
 * Pure CSS, server-rendered: no hydration cost. <RevealObserver> adds
 * `is-revealed` when the element enters the viewport. Content is fully visible
 * without JS (the hidden start state only applies under `html.js`) and for
 * reduced motion.
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  inView = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** false = play on load (above the fold) instead of on scroll. */
  inView?: boolean;
}) {
  return (
    <div
      data-reveal={inView ? '' : 'load'}
      className={cn('reveal', className)}
      style={delay ? ({ '--reveal-delay': `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
