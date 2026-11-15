/**
 * GlowBorderCard — from Vengeance UI (https://www.vengenceui.com, "glow-border-card").
 * A rotating conic-gradient glow behind the card edge (CSS only, see .glow-card in globals.css).
 * Adapted for this site: the portfolio's monochrome + amber palette, sized by its content,
 * and the glow only appears (and only animates) on hover / keyboard focus, so idle pages
 * don't run blurred animations.
 */
import { cn } from '@/lib/utils';

export function GlowBorderCard({ children, className, contentClassName }: { children: React.ReactNode; className?: string; contentClassName?: string }) {
  return (
    <div className={cn('glow-card group/glow relative isolate h-full rounded-2xl', className)}>
      <div aria-hidden className="glow-card-glow pointer-events-none absolute -inset-1 -z-20 rounded-[inherit]" />
      <div aria-hidden className="glow-card-ring pointer-events-none absolute -inset-px -z-10 rounded-[inherit]" />
      <div className={cn('relative h-full rounded-[inherit] bg-background', contentClassName)}>{children}</div>
    </div>
  );
}
