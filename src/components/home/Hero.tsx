import { ArrowRight, Download } from 'lucide-react';
import { hero } from '@/content/copy';
import { site } from '@/content/site';
import { withBase } from '@/lib/paths';
import { RotatingLine } from './RotatingLine';

export function Hero({ resumeHref }: { resumeHref: string | null }) {
  const badge = [site.showFreelance && hero.badgeFreelance, site.showOpenToRoles && hero.badgeRoles].filter(Boolean) as string[];
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
      <div aria-hidden className="hero-grid absolute inset-0 -z-10" />
      <div className="container-site pb-16 pt-14 sm:pb-24 sm:pt-24">
        {badge.length ? (
          <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ok" />
            </span>
            {badge.map((b, i) => (
              <span key={b}>
                {i > 0 ? <span className="mr-2 hidden text-muted sm:inline" aria-hidden>·</span> : null}
                {b}
              </span>
            ))}
          </p>
        ) : null}

        <p className="eyebrow mt-8">{hero.eyebrow}</p>
        <h1
          id="hero-title"
          className="mt-4 max-w-4xl font-display font-semibold leading-[1.02] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 4.75rem)' }}
        >
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-prose text-lg text-muted sm:text-xl">{hero.subline}</p>

        <RotatingLine prefix={hero.rotatingPrefix} words={hero.rotating} />

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#contact" data-reason="Project" className="btn-primary">
            {hero.primary} <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a href="#work" className="btn-secondary">
            {hero.secondary}
          </a>
          {resumeHref ? (
            <a href={withBase(resumeHref)} download className="link ml-1 inline-flex min-h-[44px] items-center gap-1.5 text-sm">
              <Download className="h-4 w-4" aria-hidden /> {hero.resumeLink}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
