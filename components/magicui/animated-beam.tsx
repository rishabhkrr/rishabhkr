'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * A horizontal pipeline of nodes joined by a track with a beam of light
 * travelling left → right. Used to show process flows.
 */
export function BeamFlow({ nodes, className }: { nodes: { icon: React.ReactNode; label: string }[]; className?: string }) {
  return (
    <div className={cn('relative flex items-start justify-between', className)}>
      <div aria-hidden className="pointer-events-none absolute left-8 right-8 top-6 h-px overflow-hidden bg-border sm:left-10 sm:right-10">
        {/* Always rendered (SSR-stable); hidden via CSS for reduced motion. */}
        <motion.div
          className="absolute top-0 h-px w-24 bg-gradient-to-r from-transparent via-[hsl(var(--beam-from))] to-[hsl(var(--beam-to))] motion-reduce:hidden"
          initial={{ left: '-25%' }}
          animate={{ left: '100%' }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 }}
        />
      </div>
      {nodes.map((n) => (
        <div key={n.label} className="relative z-10 flex w-16 flex-col items-center gap-2 sm:w-20">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border bg-background shadow-sm [&_svg]:h-5 [&_svg]:w-5">{n.icon}</span>
          <span className="text-center text-[11px] leading-tight text-muted-foreground">{n.label}</span>
        </div>
      ))}
    </div>
  );
}
