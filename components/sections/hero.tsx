'use client';

import { ArrowRight, ArrowUpRight, Download, FileText, MapPin } from 'lucide-react';
import { links, profile } from '@/content/site';
import { asset, prefillContact } from '@/lib/contact';
import { scrollToId, useLenis } from '@/components/animations/SmoothScroll';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { BlurFade } from '@/components/magicui/blur-fade';
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
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id, lenis);
  };

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <DotPattern className="[mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--foreground)/0.08),transparent_65%)]" />

      <div className="container relative flex flex-col items-center text-center">
        <BlurFade inView={false}>
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3.5 py-1 text-[13px] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 [animation-iteration-count:3]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <AnimatedShinyText>
              Open to opportunities<span className="hidden sm:inline"> · Remote / Hybrid / Pan India</span>
            </AnimatedShinyText>
          </div>
        </BlurFade>

        <BlurFade inView={false} delay={0.08}>
          <h1 className="mt-7 max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-tighter sm:text-6xl md:text-7xl">
            <span className="sr-only">{profile.name} — </span>
            <span className="text-gradient">Business Analyst &amp; Product Owner</span>
          </h1>
        </BlurFade>

        <BlurFade inView={false} delay={0.16}>
          <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            I&apos;m <span className="font-medium text-foreground">{profile.name}</span> — {profile.supporting.charAt(0).toLowerCase() + profile.supporting.slice(1)}
          </p>
        </BlurFade>

        <BlurFade inView={false} delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
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
        </BlurFade>

        <BlurFade inView={false} delay={0.32}>
          <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {profile.location}
          </p>
        </BlurFade>
      </div>

      <BlurFade inView={false} delay={0.4} className="relative mt-16 md:mt-20">
        <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Tools &amp; platforms I work with</p>
        <Marquee duration={45}>
          {tools.map((t) => (
            <span key={t} className="whitespace-nowrap text-sm font-medium text-muted-foreground/80">
              {t}
            </span>
          ))}
        </Marquee>
      </BlurFade>
    </section>
  );
}
