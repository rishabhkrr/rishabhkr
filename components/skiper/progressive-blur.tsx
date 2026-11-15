/**
 * ProgressiveBlur — from Skiper UI (skiper41, free), https://skiper-ui.com
 * Author: @gurvinder-singh02. Attribution to Skiper UI is required for the free version
 * (credited in the site footer). Adapted: theme-token background colour, `fixed` option.
 */
import { cn } from '@/lib/utils';

type ProgressiveBlurProps = {
  className?: string;
  backgroundColor?: string;
  position?: 'top' | 'bottom';
  height?: string;
  blurAmount?: string;
};

export function ProgressiveBlur({
  className = '',
  backgroundColor = 'hsl(var(--background))',
  position = 'top',
  height = '150px',
  blurAmount = '4px',
}: ProgressiveBlurProps) {
  const isTop = position === 'top';
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute left-0 w-full select-none', className)}
      style={{
        [isTop ? 'top' : 'bottom']: 0,
        height,
        background: isTop ? `linear-gradient(to top, transparent, ${backgroundColor})` : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
        maskImage: isTop ? 'linear-gradient(to bottom, black 50%, transparent)' : 'linear-gradient(to top, black 50%, transparent)',
        WebkitMaskImage: isTop ? 'linear-gradient(to bottom, black 50%, transparent)' : 'linear-gradient(to top, black 50%, transparent)',
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
      }}
    />
  );
}
