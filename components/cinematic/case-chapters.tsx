'use client';

import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { CaseStudy } from '@/content/case-studies';
import { ProjectVisual } from '@/components/sections/project-visual';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Pin only where there's room and motion is welcome; everyone else gets stacked frames. */
const PIN_QUERY = '(min-width: 1024px) and (min-height: 700px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

function Chapter({ s, i, total, onOpen, pinned }: { s: CaseStudy; i: number; total: number; onOpen: () => void; pinned: boolean }) {
  const headline = s.outcomes.filter((o) => o.value).slice(0, 2);
  return (
    <article
      data-chapter
      className={cn(
        'grid items-center gap-8 overflow-hidden rounded-3xl border bg-card p-6 md:p-10 lg:grid-cols-12 lg:gap-12',
        pinned && 'absolute inset-0 rounded-none border-0 bg-transparent p-0 md:p-0'
      )}
      aria-label={`Chapter ${s.index}: ${s.title}`}
    >
      <div className={cn('lg:col-span-6', pinned && 'pl-[max(1.25rem,calc((100vw-1200px)/2+1.25rem))]')}>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Chapter {s.index} <span className="text-foreground/30">/ {String(total).padStart(2, '0')}</span>
        </p>
        <h3 data-ch-title className="mt-4 text-balance text-4xl font-semibold leading-[1] tracking-tighter md:text-6xl">
          {s.title}
        </h3>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.domain}</p>
        <p className="mt-6 max-w-lg text-pretty text-lg text-muted-foreground">{s.tagline}</p>
        {headline.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {headline.map((o) => (
              <div key={o.label}>
                <p className="text-5xl font-semibold tracking-tighter md:text-6xl">{o.value}</p>
                <p className="mt-1 max-w-[18ch] text-sm text-muted-foreground">{o.label}</p>
              </div>
            ))}
          </div>
        )}
        <Button className="mt-10" size="lg" onClick={onOpen} aria-haspopup="dialog">
          Watch the full story <ArrowUpRight />
        </Button>
      </div>
      <div className={cn('relative aspect-[4/3] overflow-hidden rounded-2xl border lg:col-span-6', pinned && 'mr-[max(1.25rem,calc((100vw-1200px)/2+1.25rem))] aspect-auto h-[62svh]')}>
        <div data-ch-visual className="h-full w-full">
          <ProjectVisual kind={s.visual} size="lg" />
        </div>
        <span className="pointer-events-none absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Frame {s.index}.{String(i + 1).padStart(2, '0')}
        </span>
      </div>
    </article>
  );
}

/**
 * Case studies as film chapters. On large screens GSAP ScrollTrigger pins the
 * stage and cross-cuts between chapters as you scroll (scrubbed, never
 * hijacked). GSAP is lazy-loaded only where the pinned version runs.
 */
export function CaseChapters({ studies, onOpen }: { studies: CaseStudy[]; onOpen: (i: number) => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!pinned || !stage.current) return;
    const el = stage.current;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const frames = gsap.utils.toArray<HTMLElement>('[data-chapter]', el);
        gsap.set(frames, { autoAlpha: 0 });
        gsap.set(frames[0], { autoAlpha: 1 });
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: el,
            pin: true,
            start: 'top top',
            end: () => `+=${window.innerHeight * (frames.length - 1) * 1.1}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.min(frames.length - 1, Math.round(self.progress * (frames.length - 1)))),
          },
        });
        frames.forEach((frame, i) => {
          if (i === 0) return;
          const prev = frames[i - 1];
          tl.to(prev, { autoAlpha: 0, scale: 0.94, filter: 'blur(8px)', duration: 1 })
            .fromTo(frame, { autoAlpha: 0, scale: 1.06, filter: 'blur(8px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1 }, '<0.35')
            .fromTo(frame.querySelector('[data-ch-visual]'), { scale: 1.15 }, { scale: 1, duration: 1.4 }, '<');
        });
      }, el);
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [pinned, studies.length]);

  if (!pinned) {
    return (
      <div className="container grid gap-4">
        {studies.map((s, i) => (
          <Chapter key={s.id} s={s} i={i} total={studies.length} onOpen={() => onOpen(i)} pinned={false} />
        ))}
      </div>
    );
  }

  return (
    <div ref={stage} className="relative h-[100svh] w-full overflow-hidden" aria-roledescription="carousel">
      <div className="absolute inset-0 flex items-center pt-16">
        <div className="relative h-[72svh] w-full">
          {studies.map((s, i) => (
            <Chapter key={s.id} s={s} i={i} total={studies.length} onOpen={() => onOpen(i)} pinned />
          ))}
        </div>
      </div>
      {/* Timecode / progress */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8">
        <div className="container flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>
            {String(active + 1).padStart(2, '0')} / {String(studies.length).padStart(2, '0')}
          </span>
          <span className="relative h-px flex-1 bg-border">
            <span className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-300" style={{ width: `${((active + 1) / studies.length) * 100}%` }} />
          </span>
          <span>Scroll</span>
        </div>
      </div>
    </div>
  );
}
