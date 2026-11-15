/**
 * InteractiveHoverButton — from Vengeance UI (https://www.vengenceui.com, "interactive-hover-button").
 * Adapted: forwards all button props, optional trailing icon, keyboard focus plays the same
 * transition as hover, and it respects reduced motion.
 */
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function InteractiveHoverButton({
  children,
  className,
  icon = <ArrowRight className="h-4 w-4" />,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: React.ReactNode }) {
  return (
    <button
      className={cn(
        'group relative inline-flex h-10 w-auto cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-background px-6 text-sm font-semibold',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-60',
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary transition-transform duration-300 group-hover:scale-[100.8] group-focus-visible:scale-[100.8] motion-reduce:transition-none" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 group-focus-visible:translate-x-12 group-focus-visible:opacity-0 motion-reduce:transition-none">
          {children}
        </span>
      </span>
      <span
        aria-hidden
        className="absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
      >
        <span>{children}</span>
        {icon}
      </span>
    </button>
  );
}
