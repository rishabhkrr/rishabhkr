import { cn } from '@/lib/utils';

/**
 * A short gradient light that travels around the parent's border.
 * Parent needs `relative` and a border radius.
 */
export function BorderBeam({ className, size = 160, duration = 12, delay = 0 }: { className?: string; size?: number; duration?: number; delay?: number }) {
  return (
    <div
      aria-hidden
      style={
        {
          '--size': size,
          '--duration': duration,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent]',
        '![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',
        'after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)]',
        'after:[background:linear-gradient(to_left,hsl(var(--beam-from)),hsl(var(--beam-to)),transparent)]',
        'after:[offset-anchor:90%_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]',
        className
      )}
    />
  );
}
