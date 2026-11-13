'use client';

import { motion } from 'framer-motion';

/**
 * Fade + un-blur + rise when scrolled into view. The initial state is identical on server and
 * client (no hydration mismatch); reduced motion is handled globally by <MotionConfig reducedMotion="user">.
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  y = 12,
  inView = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** false = animate on mount (above the fold). */
  inView?: boolean;
}) {
  const hidden = { opacity: 0, y, filter: 'blur(6px)' };
  const shown = { opacity: 1, y: 0, filter: 'blur(0px)' };
  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(inView ? { whileInView: shown, viewport: { once: true, margin: '-60px' } } : { animate: shown })}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
