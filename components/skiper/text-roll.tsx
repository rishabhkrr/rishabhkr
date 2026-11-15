/**
 * TextRoll — from Skiper UI (skiper58, free), https://skiper-ui.com
 * Attribution to Skiper UI is required for the free version (credited in the site footer).
 * Adapted: the per-letter roll is pure CSS (see .text-roll in globals.css) instead of
 * framer-motion variants, so it costs nothing on first load. Same stagger and easing.
 * The roll plays when the closest `.group` ancestor (e.g. a link) is hovered or focused.
 */
import { cn } from '@/lib/utils';

const STAGGER = 0.035;

export function TextRoll({ children, className, center = false }: { children: string; className?: string; center?: boolean }) {
  const letters = children.split('');
  const delay = (i: number) => (center ? STAGGER * Math.abs(i - (letters.length - 1) / 2) : STAGGER * i);
  const row = (copy: 'a' | 'b') =>
    letters.map((l, i) => (
      <span key={`${copy}${i}`} className="text-roll-letter inline-block" style={{ transitionDelay: `${delay(i)}s` }}>
        {l === ' ' ? ' ' : l}
      </span>
    ));
  return (
    <span className={cn('text-roll relative inline-block overflow-hidden align-bottom', className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="text-roll-a block">
        {row('a')}
      </span>
      <span aria-hidden className="text-roll-b absolute inset-0 block">
        {row('b')}
      </span>
    </span>
  );
}
