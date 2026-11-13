'use client';

import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Download, FileText, MapPin } from 'lucide-react';
import { useRef } from 'react';
import { useIntroDone } from '@/components/cinematic/intro';
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
  const introDone = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id, lenis);
  };

  // Scene exit: as you scroll, the frame pulls back, softens and fades into the next scene.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(10px)']);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  // Cursor-following key light.
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const light = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, hsl(var(--foreground) / 0.10), transparent 60%)`;
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  const enter = (delay: number) => ({
    'data-hero-anim': true,
    initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: introDone ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="home" ref={ref} onPointerMove={onMove} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <DotPattern className="[mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <HeroScene className="opacity-0 [mask-image:radial-gradient(ellipse_60%_65%_at_50%_45%,black_20%,transparent_75%)]" />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: light }} />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[1100px] max-w-[140%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(32_90%_60%/0.10),transparent_60%)] blur-2xl" />

      {/* Film HUD — corner credits */}
      <motion.div {...enter(0.6)} aria-hidden className="pointer-events-none absolute inset-x-0 top-24 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:block">
        <div className="container flex justify-between">
          <span>Scene 01 — Opening</span>
          <span>{profile.location}</span>
        </div>
      </motion.div>

      <motion.div style={{ scale, opacity, filter: blur, y }} className="container relative flex flex-1 flex-col items-center justify-center pb-10 pt-32 text-center">
        <motion.div {...enter(0)}>
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3.5 py-1 text-[13px] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 [animation-iteration-count:3]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <AnimatedShinyText>
              Open to opportunities<span className="hidden sm:inline"> · Remote / Hybrid / Pan India</span>
            </AnimatedShinyText>
          </div>
        </motion.div>

        <h1 className="mt-8 max-w-5xl text-balance text-[clamp(2.75rem,8.5vw,7.5rem)] font-semibold leading-[0.95] tracking-tighter">
          <span className="sr-only">{profile.name} — Business Analyst &amp; Product Owner</span>
          <span aria-hidden className="block overflow-hidden pb-[0.08em]">
            <motion.span
              data-hero-anim
              className="text-gradient inline-block"
              initial={{ y: '105%' }}
              animate={introDone ? { y: '0%' } : undefined}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Business Analyst
            </motion.span>
          </span>
          <span aria-hidden className="block overflow-hidden pb-[0.08em]">
            <motion.span
              data-hero-anim
              className="text-gradient inline-block"
              initial={{ y: '105%' }}
              animate={introDone ? { y: '0%' } : undefined}
              transition={{ duration: 1.2, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              &amp; Product Owner
            </motion.span>
          </span>
        </h1>

        <motion.p {...enter(0.45)} className="mt-7 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
          I&apos;m <span className="font-medium text-foreground">{profile.name}</span> — {profile.supporting.charAt(0).toLowerCase() + profile.supporting.slice(1)}
        </motion.p>

        <motion.div {...enter(0.6)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
        </motion.div>

        <motion.p {...enter(0.75)} className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground md:hidden">
          <MapPin className="h-3.5 w-3.5" /> {profile.location}
        </motion.p>
      </motion.div>

      <motion.div {...enter(0.9)} className="relative pb-8">
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
      </motion.div>
    </section>
  );
}
