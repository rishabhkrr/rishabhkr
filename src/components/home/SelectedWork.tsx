import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies, workCopy } from '@/content/caseStudies';
import { publicImage } from '@/lib/assets';
import { withBase } from '@/lib/paths';
import { Chips, CoverArt, SectionHeader } from '@/components/ui';

export function SelectedWork() {
  const groups = [
    { label: workCopy.clientLabel, items: caseStudies.filter((c) => c.kind === 'client') },
    { label: workCopy.ownLabel, items: caseStudies.filter((c) => c.kind === 'own') },
  ];
  return (
    <section id="work" aria-labelledby="work-title" className="section bg-surface/50">
      <div className="container-site">
        <SectionHeader id="work-title" eyebrow="Case studies" title={workCopy.heading} intro={workCopy.intro} />
        {groups.map((g) => (
          <div key={g.label} className="mt-12">
            <h3 className="reveal text-xs font-semibold uppercase tracking-[0.14em] text-muted">{g.label}</h3>
            <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {g.items.map((c) => {
                const cover = publicImage(`images/work/${c.slug}`);
                return (
                  <li key={c.slug} className="reveal">
                    <Link
                      href={`/work/${c.slug}/`}
                      className="card card-hover group flex h-full flex-col overflow-hidden focus-visible:outline-offset-4"
                    >
                      {cover ? (
                        <Image
                          src={withBase(cover)}
                          alt=""
                          width={800}
                          height={450}
                          loading="lazy"
                          className="aspect-[16/9] w-full border-b border-line object-cover"
                        />
                      ) : (
                        <CoverArt seed={c.slug} label={c.title.split(' — ')[0]} className="aspect-[16/9] border-b border-line" />
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-xs font-medium text-muted">
                          <span className="mr-2 rounded-full bg-accent/10 px-2 py-0.5 font-semibold text-accent">{g.label}</span>
                          {c.org}
                        </p>
                        <h4 className="mt-3 flex items-start justify-between gap-3 font-display text-xl font-semibold leading-snug">
                          {c.title}
                          <ArrowUpRight
                            className="mt-1 h-5 w-5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                            aria-hidden
                          />
                        </h4>
                        <p className="mt-2 text-[0.95rem] text-muted">{c.tagline}</p>
                        <p className="num mt-5 text-lg font-semibold">{c.cardStat}</p>
                        <Chips items={c.chips} className="mt-auto pt-5" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
