import { cn } from '@/lib/utils';

/** Infinite horizontal marquee; pauses on hover and stops for reduced motion. */
export function Marquee({ children, className, duration = 40, repeat = 3 }: { children: React.ReactNode; className?: string; duration?: number; repeat?: number }) {
  return (
    <div
      style={{ '--duration': `${duration}s`, '--gap': '2.5rem' } as React.CSSProperties}
      className={cn(
        'group flex overflow-hidden [gap:var(--gap)] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]',
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div key={i} aria-hidden={i > 0} className="flex shrink-0 animate-marquee items-center justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]">
          {children}
        </div>
      ))}
    </div>
  );
}
