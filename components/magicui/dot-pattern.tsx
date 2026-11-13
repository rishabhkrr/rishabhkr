import { useId } from 'react';
import { cn } from '@/lib/utils';

/** Subtle dot grid, faded out with a radial mask. */
export function DotPattern({ className, gap = 22, radius = 1 }: { className?: string; gap?: number; radius?: number }) {
  const id = useId();
  return (
    <svg aria-hidden className={cn('pointer-events-none absolute inset-0 h-full w-full fill-foreground/[0.14]', className)}>
      <defs>
        <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse">
          <circle cx={gap / 2} cy={gap / 2} r={radius} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
