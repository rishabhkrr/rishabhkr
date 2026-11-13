'use client';

import { useEffect, useRef } from 'react';

/** Desktop pointer devices with motion allowed get the WebGL scene; nothing loads elsewhere. */
const SCENE_QUERY = '(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/**
 * "Data constellation": a slowly turning sphere of points with an orbiting
 * ring, rendered with three.js (lazy-loaded). Depth responds to the pointer;
 * scrolling through the hero dollies the camera in and disperses the field —
 * the fourth dimension is time/scroll. Rendering pauses off-screen and when
 * the tab is hidden; DPR is capped for performance.
 */
export function HeroScene({ className = '' }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || !window.matchMedia(SCENE_QUERY).matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import('three');
      if (disposed) return;

      const canvasProbe = document.createElement('canvas');
      if (!canvasProbe.getContext('webgl2') && !canvasProbe.getContext('webgl')) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.domElement.setAttribute('aria-hidden', 'true');
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 7);

      const group = new THREE.Group();
      scene.add(group);

      // Fibonacci sphere of points, with slight radial jitter for depth.
      const N = 1800;
      const sphere = new Float32Array(N * 3);
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const t = golden * i;
        const radius = 2.4 + (Math.random() - 0.5) * 0.18;
        sphere[i * 3] = Math.cos(t) * r * radius;
        sphere[i * 3 + 1] = y * radius;
        sphere[i * 3 + 2] = Math.sin(t) * r * radius;
      }
      const sphereGeo = new THREE.BufferGeometry();
      sphereGeo.setAttribute('position', new THREE.BufferAttribute(sphere, 3));

      // Orbiting ring of points.
      const M = 700;
      const ring = new Float32Array(M * 3);
      for (let i = 0; i < M; i++) {
        const a = (i / M) * Math.PI * 2;
        const rr = 3.6 + (Math.random() - 0.5) * 0.25;
        ring[i * 3] = Math.cos(a) * rr;
        ring[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
        ring[i * 3 + 2] = Math.sin(a) * rr;
      }
      const ringGeo = new THREE.BufferGeometry();
      ringGeo.setAttribute('position', new THREE.BufferAttribute(ring, 3));

      const color = () => (document.documentElement.classList.contains('dark') ? 0xfafafa : 0x18181b);
      const sphereMat = new THREE.PointsMaterial({ color: color(), size: 0.022, transparent: true, opacity: 0.55, depthWrite: false });
      const ringMat = new THREE.PointsMaterial({ color: 0xf5b26b, size: 0.026, transparent: true, opacity: 0.7, depthWrite: false });
      const points = new THREE.Points(sphereGeo, sphereMat);
      const ringPoints = new THREE.Points(ringGeo, ringMat);
      ringPoints.rotation.x = Math.PI * 0.42;
      ringPoints.rotation.z = -0.25;
      group.add(points, ringPoints);

      // Inputs: pointer (depth parallax) and scroll (time axis).
      const target = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
        target.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
      };
      window.addEventListener('pointermove', onPointer, { passive: true });

      const scrollProgress = () => {
        const r = el.getBoundingClientRect();
        return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      };

      const onResize = () => {
        camera.aspect = el.clientWidth / el.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(el.clientWidth, el.clientHeight);
      };
      window.addEventListener('resize', onResize);

      const themeObserver = new MutationObserver(() => sphereMat.color.setHex(color()));
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

      // Only render while visible and the tab is active.
      let visible = true;
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
      io.observe(el);

      const clock = new THREE.Clock();
      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (!visible || document.hidden) return;
        const t = clock.getElapsedTime();
        const p = scrollProgress();

        group.rotation.y = t * 0.06 + target.x;
        group.rotation.x += (target.y - group.rotation.x) * 0.04;
        ringPoints.rotation.y = -t * 0.12;

        // Scroll: camera dollies in, the field expands and fades — the scene "passes through" you.
        camera.position.z = 7 - p * 4.2;
        const spread = 1 + p * 0.9;
        points.scale.setScalar(spread);
        sphereMat.opacity = 0.55 * (1 - p * 0.85);
        ringMat.opacity = 0.7 * (1 - p);

        renderer.render(scene, camera);
      };
      tick();
      el.dataset.ready = 'true';

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('resize', onResize);
        themeObserver.disconnect();
        io.disconnect();
        sphereGeo.dispose();
        ringGeo.dispose();
        sphereMat.dispose();
        ringMat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={host} aria-hidden className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 data-[ready=true]:opacity-100 ${className}`} />;
}
