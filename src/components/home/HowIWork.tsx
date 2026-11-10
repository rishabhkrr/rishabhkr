import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { process } from '@/content/copy';
import { caseStudies } from '@/content/caseStudies';
import { site } from '@/content/site';
import { SectionHeader } from '@/components/ui';

const live = new Set(caseStudies.map((c) => c.slug));

export function HowIWork() {
  return (
    <section id="process" aria-labelledby="process-title" className="section">
      <div className="container-site">
        <SectionHeader id="process-title" eyebrow="Process" title={process.heading} intro={process.intro} />

        {/* Stepper: vertical on mobile, horizontal on desktop */}
        <ol className="mt-12 grid gap-0 lg:grid-cols-6 lg:gap-4">
          {process.steps.map((s, i) => (
            <li key={s.title} className="reveal relative flex gap-4 pb-8 lg:flex-col lg:gap-0 lg:pb-0">
              <div className="flex flex-col items-center lg:flex-row">
                <span className="num flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-sm font-semibold">
                  {i + 1}
                </span>
                {i < process.steps.length - 1 ? (
                  <span aria-hidden className="mt-2 w-px flex-1 bg-line lg:ml-3 lg:mt-0 lg:h-px lg:w-auto lg:flex-1" />
                ) : null}
              </div>
              <div className="lg:mt-4 lg:pr-2">
                <h3 className="text-lg font-semibold">{s.title.replace(/\.$/, '')}</h3>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="reveal mt-16 font-display text-xl font-semibold">Principles</h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {process.principles.map((p) => (
            <li key={p.title} className="reveal card p-6">
              <p className="font-display text-lg font-semibold">{p.title}</p>
              <p className="mt-2 text-muted">{p.text}</p>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {p.see
                  .filter((s) => live.has(s.slug))
                  .map((s) => (
                    <Link key={s.slug} href={`/work/${s.slug}/`} className="link inline-flex min-h-[44px] items-center gap-1 no-underline">
                      See {s.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  ))}
              </p>
            </li>
          ))}
        </ul>

        {site.showFreelance ? (
          <div className="reveal mt-16 rounded-2xl border border-line bg-surface p-6 sm:p-10">
            <h3 className="font-display text-xl font-semibold sm:text-2xl">{process.clientHeading}</h3>
            <ol className="mt-6 grid gap-6 md:grid-cols-5">
              {process.clientSteps.map((s, i) => (
                <li key={s.title}>
                  <span className="num text-sm font-semibold">0{i + 1}</span>
                  <p className="mt-1 font-semibold text-fg">{s.title.replace(/\.$/, '')}</p>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  );
}
