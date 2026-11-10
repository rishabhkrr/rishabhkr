import { learningArchive, projects, projectsCopy } from '@/content/projects';
import { publicImage } from '@/lib/assets';
import { SectionHeader } from '@/components/ui';
import { ProjectGrid } from './ProjectGrid';
import { ChevronDown } from 'lucide-react';

export function MoreProjects() {
  const withShots = projects.map((p) => ({ ...p, image: publicImage(`images/projects/${p.slug}`) }));
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container-site">
        <SectionHeader id="projects-title" eyebrow="Builds" title={projectsCopy.heading} intro={projectsCopy.intro} />
        <ProjectGrid projects={withShots} />

        <details className="reveal group mt-12 rounded-2xl border border-line bg-surface">
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {learningArchive.title}
            <ChevronDown className="h-5 w-5 text-muted transition group-open:rotate-180" aria-hidden />
          </summary>
          <div className="border-t border-line px-6 pb-6 pt-4">
            <p className="max-w-prose text-sm text-muted">{learningArchive.intro}</p>
            <dl className="mt-4 divide-y divide-line text-sm">
              {learningArchive.tracks.map(([track, covers]) => (
                <div key={track} className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-4">
                  <dt className="font-semibold text-fg">{track}</dt>
                  <dd className="text-muted">{covers}</dd>
                </div>
              ))}
            </dl>
          </div>
        </details>
      </div>
    </section>
  );
}
