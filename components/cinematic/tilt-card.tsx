'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * 3D tilt with a moving glare, for desktop pointers. Touch devices and
 * reduced motion (via MotionConfig) get a flat, static card.
 */
export function TiltCard({ children, className, max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches);
  }, []);
  // Touch / reduced motion: a plain wrapper — no springs, no 3D layers.
  if (!enabled) return <div className={className}>{children}</div>;
  return <Tilt3D className={className} max={max}>{children}</Tilt3D>;
}

function Tilt3D({ children, className, max }: { children: React.ReactNode; className?: string; max: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 20 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, hsl(var(--foreground) / 0.08), transparent 45%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className={cn('[perspective:1100px]', className)}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group/tilt relative h-full"
      >
        {children}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100" style={{ background: glare }} />
      </motion.div>
    </div>
  );
}
