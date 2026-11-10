'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { clsx } from 'clsx';
import { projectsCopy, type Project } from '@/content/projects';
import { withBase } from '@/lib/paths';

type Item = Project & { image: string | null };

export function ProjectGrid({ projects }: { projects: Item[] }) {
  const [filter, setFilter] = useState<(typeof projectsCopy.filters)[number]>('All');
  const shown = filter === 'All' ? projects : projects.filter((p) => p.filter === filter);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="reveal mt-10 flex flex-wrap gap-2">
        {projectsCopy.filters.map((f) => {
          const count = f === 'All' ? projects.length : projects.filter((p) => p.filter === f).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={clsx(
                'min-h-[44px] rounded-full border px-4 text-sm font-medium transition',
                filter === f ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-surface text-muted hover:text-fg',
              )}
            >
              {f} <span className="ml-1 tabular-nums">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} projects
      </p>

      {/* Keyed on the filter so the cards re-run their fade-in (CSS only; off under reduced motion) */}
      <ul key={filter} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <li
            key={p.slug}
            className="card card-hover flex flex-col overflow-hidden motion-safe:animate-[cardIn_240ms_ease-out_both]"
            style={{ animationDelay: `${Math.min(i, 8) * 25}ms` }}
          >
            {p.image ? (
              <Image src={withBase(p.image)} alt={`Screenshot of ${p.title}`} width={640} height={360} loading="lazy" className="aspect-[16/9] w-full border-b border-line object-cover" />
            ) : null}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between text-xs font-medium text-muted">
                <span className="rounded-full bg-accent/10 px-2 py-0.5 font-semibold text-accent">{p.filter}</span>
                <span className="tabular-nums">{p.year}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{p.copy}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                {p.chips.map((c) => (
                  <li key={c} className="chip">
                    {c}
                  </li>
                ))}
              </ul>
              {p.code || p.live ? (
                <div className="mt-auto flex gap-2 pt-5">
                  {p.code ? (
                    <a href={p.code} target="_blank" rel="noopener noreferrer" className="btn-secondary !min-h-[40px] !px-3 !text-xs">
                      <Github className="h-4 w-4" aria-hidden /> {projectsCopy.code}
                      <span className="sr-only"> for {p.title} (opens GitHub)</span>
                    </a>
                  ) : null}
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-secondary !min-h-[40px] !px-3 !text-xs">
                      <ExternalLink className="h-4 w-4" aria-hidden /> {projectsCopy.live}
                      <span className="sr-only"> for {p.title}</span>
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
