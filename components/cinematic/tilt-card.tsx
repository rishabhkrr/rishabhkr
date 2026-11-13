'use client';

import { useEffect, useState } from 'react';

type Tilt3DType = typeof import('./tilt-3d').default;

/**
 * 3D tilt with a moving glare, for desktop pointers. Touch devices and
 * reduced motion get a flat, static card. The 3D layer (and framer-motion)
 * is fetched only when it will be used; until then the flat wrapper shows.
 */
export function TiltCard({ children, className, max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const [Tilt3D, setTilt3D] = useState<Tilt3DType | null>(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    let alive = true;
    import('./tilt-3d').then((m) => alive && setTilt3D(() => m.default));
    return () => {
      alive = false;
    };
  }, []);
  if (!Tilt3D) return <div className={className}>{children}</div>;
  return (
    <Tilt3D className={className} max={max}>
      {children}
    </Tilt3D>
  );
}
