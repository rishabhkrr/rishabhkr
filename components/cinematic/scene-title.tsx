'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Title-card heading: each word rises out of a mask when the heading enters
 * the frame. SSR-stable; reduced motion is handled by the global MotionConfig.
 */
export function SceneTitle({ text, className, as: Tag = 'h2', id }: { text: string; className?: string; as?: 'h1' | 'h2'; id?: string }) {
  const words = text.split(' ');
  return (
    <Tag id={id} className={cn('section-title', className)} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: '110%', rotate: 4 }, show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
            >
              {w}
              {i < words.length - 1 && ' '}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Film-slate style section label: "Scene 02 — Impact". */
export function SceneLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="section-label flex items-center gap-3">
      <span className="text-foreground">Scene {n}</span>
      <span className="h-px w-8 bg-border" />
      <span>{children}</span>
    </p>
  );
}
