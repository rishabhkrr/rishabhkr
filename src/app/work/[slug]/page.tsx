import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { caseStudies, workCopy, type Block } from '@/content/caseStudies';
import { site } from '@/content/site';
import { publicImage } from '@/lib/assets';
import { absoluteUrl, withBase } from '@/lib/paths';
import { Rich } from '@/components/Rich';
import { Chips, CoverArt } from '@/components/ui';
import { Tabs } from '@/components/work/Tabs';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = caseStudies.find((x) => x.slug === params.slug);
  if (!c) return {};
  const url = absoluteUrl(`/work/${c.slug}/`);
  return {
    title: c.title,
    description: `${c.tagline} ${c.cardStat}.`,
    alternates: { canonical: url },
    openGraph: { title: c.title, description: c.tagline, url, type: 'article' },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="reveal border-t border-line py-10 sm:py-12">
      <div className="grid gap-4 md:grid-cols-[12rem_1fr] md:gap-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">{title}</h2>
        <div className="min-w-0 max-w-prose text-[1.05rem] text-muted">{children}</div>
      </div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((b) => (
        <li key={b} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent/70">
          <Rich text={b} />
        </li>
      ))}
    </ul>
  );
}

function Extras({ blocks }: { blocks?: Block[] }) {
  return (
    <>
      {(blocks || []).map((b, i) =>
        b.heading ? (
          <Section key={i} title={b.heading}>
            {b.text ? <p><Rich text={b.text} /></p> : null}
            {b.items ? <Bullets items={b.items} /> : null}
          </Section>
        ) : null,
      )}
    </>
  );
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const idx = caseStudies.findIndex((c) => c.slug === params.slug);
  if (idx < 0) notFound();
  const c = caseStudies[idx];
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const cover = publicImage(`images/work/${c.slug}`);
  const untitledExtras = (c.extra || []).filter((b) => !b.heading);
  const titledExtras = (c.extra || []).filter((b) => b.heading);
  const meta = [
    ['Role', c.meta.role],
    ['Timeline', c.meta.timeline],
    ['Status', c.meta.status],
  ].filter(([, v]) => v);

  return (
    <article>
      <header className="relative isolate overflow-hidden">
        <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
        <div className="container-site pb-10 pt-10 sm:pt-16">
          <Link href="/#work" className="link inline-flex min-h-[44px] items-center gap-1.5 text-sm no-underline">
            <ArrowLeft className="h-4 w-4" aria-hidden /> All work
          </Link>
          <p className="mt-6 text-sm font-medium text-muted">
            <span className="mr-2 rounded-full bg-accent/10 px-2 py-0.5 font-semibold text-accent">
              {c.kind === 'client' ? workCopy.clientLabel : workCopy.ownLabel}
            </span>
            {c.org}
          </p>
          <h1 className="mt-4 max-w-4xl font-display font-semibold leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {c.title}
          </h1>
          <p className="mt-5 max-w-prose text-lg text-muted sm:text-xl">{c.tagline}</p>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {meta.map(([k, v]) => (
              <div key={k} className="bg-surface p-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{k}</dt>
                <dd className="mt-1 font-medium text-fg">{v}</dd>
              </div>
            ))}
            <div className={`bg-surface p-5 ${meta.length === 3 ? '' : 'lg:col-span-2'}`}>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Stack</dt>
              <dd className="mt-2">
                <Chips items={c.meta.stack} />
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="container-site">
        {cover ? (
          <Image src={withBase(cover)} alt={`${c.title} cover`} width={1440} height={720} priority className="mb-4 w-full rounded-2xl border border-line object-cover" />
        ) : (
          <CoverArt seed={c.slug} label={c.title.split(' — ')[0]} className="mb-4 aspect-[21/9] rounded-2xl border border-line sm:aspect-[3/1]" />
        )}

        {c.problem ? (
          <Section title="The problem">
            <p><Rich text={c.problem} /></p>
          </Section>
        ) : null}
        {c.role ? (
          <Section title="My role">
            <p><Rich text={c.role} /></p>
          </Section>
        ) : null}

        {c.built || c.tabs || untitledExtras.length ? (
          <Section title={c.builtHeading || 'Overview'}>
            {untitledExtras.map((b, i) => (
              <p key={i} className="mb-4"><Rich text={b.text || ''} /></p>
            ))}
            {c.built ? <Bullets items={c.built} /> : null}
            {c.tabs ? (
              <Tabs
                label={c.builtHeading || 'What I delivered'}
                tabs={c.tabs.map((t) => ({ label: t.label, content: <Bullets items={t.items} /> }))}
              />
            ) : null}
          </Section>
        ) : null}

        {c.delivery ? (
          <Section title="Delivery">
            <Bullets items={c.delivery} />
          </Section>
        ) : null}

        <Extras blocks={titledExtras} />

        {c.decisions?.length ? (
          <Section title={c.decisions.length > 1 ? 'Key decisions' : 'Key decision'}>
            <div className="space-y-4">
              {c.decisions.map((d) => (
                <p key={d} className="border-l-2 border-accent pl-5 text-fg">
                  <Rich text={d} />
                </p>
              ))}
            </div>
          </Section>
        ) : null}

        <Extras blocks={c.extraAfterDecisions} />

        {c.results?.length ? (
          <section className="reveal border-t border-line py-10 sm:py-12">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">{c.resultsHeading || 'Results'}</h2>
            <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {c.results.map((r) => (
                <li key={r.label} className="card p-6">
                  <span className="num block text-4xl font-semibold sm:text-5xl">{r.value}</span>
                  <span className="mt-2 block text-sm text-muted">{r.label}</span>
                </li>
              ))}
            </ul>
            {c.resultNotes?.length ? (
              <ul className="mt-4 space-y-1 text-muted">
                {c.resultNotes.map((n) => (
                  <li key={n}>✓ {n}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ) : null}

        {c.links?.length ? (
          <Section title="Links">
            <ul className="flex flex-wrap gap-3">
              {c.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    {l.label} <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {c.disclaimer ? <p className="border-t border-line py-6 text-sm italic text-muted">{c.disclaimer}</p> : null}

        <nav aria-label="More case studies" className="grid gap-4 border-t border-line py-12 md:grid-cols-2">
          <Link href={`/work/${next.slug}/`} className="card card-hover group p-6">
            <span className="text-sm font-medium text-muted">Next case study →</span>
            <span className="mt-2 flex items-start justify-between gap-3 font-display text-xl font-semibold text-fg">
              {next.title}
              <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-accent" aria-hidden />
            </span>
          </Link>
          <div className="flex flex-col justify-center rounded-2xl border border-accent/30 bg-accent/10 p-6">
            <p className="font-display text-xl font-semibold text-fg">
              {site.showFreelance ? 'Need something like this built?' : 'Want to talk about this work?'}
            </p>
            <Link href="/#contact" data-reason="Project" className="btn-primary mt-4 self-start">
              {site.showFreelance ? 'Start a project' : 'Get in touch'} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </nav>
      </div>
    </article>
  );
}
