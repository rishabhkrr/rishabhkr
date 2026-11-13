import { cn } from '@/lib/utils';

/** Text with a light sheen sweeping across it. */
export function AnimatedShinyText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      style={{ '--shiny-width': '120px' } as React.CSSProperties}
      className={cn(
        'animate-shiny-text bg-clip-text bg-no-repeat text-muted-foreground [background-position:0_0] [background-size:var(--shiny-width)_100%]',
        'bg-gradient-to-r from-transparent via-foreground/80 via-50% to-transparent',
        className
      )}
    >
      {children}
    </span>
  );
}
