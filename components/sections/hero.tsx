'use client';

import { ArrowRight, ArrowUpRight, Download, FileText, MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { HeroScene } from '@/components/cinematic/hero-scene';
import { links, profile } from '@/content/site';
import { asset, prefillContact } from '@/lib/contact';
import { scrollToId, useLenis } from '@/components/animations/SmoothScroll';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { Marquee } from '@/components/magicui/marquee';
import { Button } from '@/components/ui/button';

const tools = ['AWS Textract', 'Amazon S3', 'CloudWatch', 'Oracle DB', 'Advanced SQL', 'Python', 'Power BI', 'Excel', 'Postman', 'Agile / Scrum', 'SAFe', 'Spring Boot', 'Angular', 'ERP', 'WMS', 'OMS'];

export function ResumeButton({ hasResume, size = 'lg' }: { hasResume: boolean; size?: 'lg' | 'default' }) {
  const lenis = useLenis();
  if (hasResume) {
    return (
      <Button asChild variant="outline" size={size}>
        <a href={asset(links.resumePath)} download="Rishabh-Kumar-Resume.pdf">
          <Download /> Download resume
        </a>
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      size={size}
      onClick={() => {
        prefillContact('Resume request');
        scrollToId('contact', lenis);
      }}
    >
      <FileText /> Request resume
    </Button>
  );
}

export function Hero({ hasResume }: { hasResume: boolean }) {
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id, lenis);
  };

  // Scene exit: as you scroll, the frame pulls back and fades into the next scene.
  // Plain rAF + inline styles (no animation library). The blur is desktop-only — it is costly on phones.
  useEffect(() => {
    const section = ref.current;
    const frame = frameRef.current;
    if (!section || !frame) return;
    const blur = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = section.offsetHeight || 1;
      const p = Math.min(Math.max(window.scrollY / h, 0), 1);
      if (p === 0) {
        frame.style.transform = frame.style.opacity = frame.style.filter = '';
        return;
      }
      frame.style.transform = `translate3d(0, ${-12 * p}%, 0) scale(${1 - 0.14 * p})`;
      frame.style.opacity = String(Math.max(1 - p / 0.75, 0));
      if (blur) frame.style.filter = `blur(${10 * p}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Cursor-following key light (mouse only).
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current || !lightRef.current) return;
    const r = ref.current.getBoundingClientRect();
    lightRef.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    lightRef.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  /** Entrance: pure CSS (.hero-in in globals.css), played when <html> gets `intro-done`. */
  const enter = (delay: number) => ({
    'data-hero-anim': true,
    className: 'hero-in',
    style: { '--d': `${delay}s` } as React.CSSProperties,
  });

  return (
    <section id="home" ref={ref} onPointerMove={onMove} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <DotPattern className="[mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <HeroScene className="opacity-0 [mask-image:radial-gradient(ellipse_60%_65%_at_50%_45%,black_20%,transparent_75%)]" />
      <div ref={lightRef} aria-hidden className="hero-light pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[1100px] max-w-[140%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(32_90%_60%/0.10),transparent_60%)] blur-2xl" />

      {/* Film HUD — corner credits */}
      <div {...enter(0.6)} aria-hidden className="hero-in pointer-events-none absolute inset-x-0 top-24 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:block">
        <div className="container flex justify-between">
          <span>Scene 01 — Opening</span>
          <span>{profile.location}</span>
        </div>
      </div>

      <div ref={frameRef} className="container relative flex flex-1 flex-col items-center justify-center pb-10 pt-32 text-center">
        <div {...enter(0)}>
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3.5 py-1 text-[13px] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 [animation-iteration-count:3]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <AnimatedShinyText>
              Open to opportunities<span className="hidden sm:inline"> · Remote / Hybrid / Pan India</span>
            </AnimatedShinyText>
          </div>
        </div>

        <h1 className="mt-8 max-w-5xl text-balance text-[clamp(2.75rem,8.5vw,7.5rem)] font-semibold leading-[0.95] tracking-tighter">
          <span className="sr-only">{profile.name} — Business Analyst &amp; Product Owner</span>
          <span aria-hidden className="block overflow-hidden pb-[0.08em]">
            <span data-hero-anim className="hero-rise text-gradient inline-block" style={{ '--d': '0.1s' } as React.CSSProperties}>
              Business Analyst
            </span>
          </span>
          <span aria-hidden className="block overflow-hidden pb-[0.08em]">
            <span data-hero-anim className="hero-rise text-gradient inline-block" style={{ '--d': '0.22s' } as React.CSSProperties}>
              &amp; Product Owner
            </span>
          </span>
        </h1>

        <p {...enter(0.45)} className="hero-in mt-7 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
          I&apos;m <span className="font-medium text-foreground">{profile.name}</span> — {profile.supporting.charAt(0).toLowerCase() + profile.supporting.slice(1)}
        </p>

        <div {...enter(0.6)} className="hero-in mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <a href="#projects" onClick={go('projects')}>
              View my work <ArrowRight />
            </a>
          </Button>
          <ResumeButton hasResume={hasResume} />
          <Button asChild size="lg" variant="ghost">
            <a href="#contact" onClick={go('contact')}>
              Let&apos;s talk <ArrowUpRight />
            </a>
          </Button>
        </div>

        <p {...enter(0.75)} className="hero-in mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground md:hidden">
          <MapPin className="h-3.5 w-3.5" /> {profile.location}
        </p>
      </div>

      <div {...enter(0.9)} className="hero-in relative pb-8">
        <Marquee duration={45}>
          {tools.map((t) => (
            <span key={t} className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
              {t}
            </span>
          ))}
        </Marquee>
        <a
          href="#impact"
          onClick={go('impact')}
          className="mx-auto mt-6 flex w-fit flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
        >
          Scroll
          <span className="relative h-8 w-px overflow-hidden bg-border">
            <span className="absolute left-0 top-0 h-3 w-px animate-[scrollcue_1.8s_ease-in-out_infinite] bg-foreground" />
          </span>
        </a>
      </div>
    </section>
  );
}
