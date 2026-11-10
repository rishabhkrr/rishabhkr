import { skillDomains, skills, skillsCopy, tools } from '@/content/skills';
import { capitalise } from '@/components/Rich';
import { SectionHeader } from '@/components/ui';

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section bg-surface/50">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader id="skills-title" eyebrow="Toolkit" title={skillsCopy.heading} />
          <p className="reveal flex items-center gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden /> {skillsCopy.legendDaily}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full border border-muted" aria-hidden /> {skillsCopy.legendWorking}
            </span>
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => (
            <div key={g.group} className="reveal card p-6">
              <h3 className="font-display text-lg font-semibold">{g.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${g.group}: ${skillsCopy.legendDaily}`}>
                {g.daily.map((s) => (
                  <li key={s} className="chip border-accent/30 bg-accent/10 text-fg">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    {capitalise(s)}
                  </li>
                ))}
              </ul>
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`${g.group}: ${skillsCopy.legendWorking}`}>
                {g.working.map((s) => (
                  <li key={s} className="chip">
                    {capitalise(s)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 grid gap-6 md:grid-cols-[7rem_1fr] md:items-baseline">
          <h3 className="text-sm font-semibold text-fg">{skillsCopy.toolsLabel}</h3>
          <ul className="flex flex-wrap gap-1.5">
            {tools.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
          <h3 className="text-sm font-semibold text-fg">{skillsCopy.domainsLabel}</h3>
          <ul className="flex flex-wrap gap-1.5">
            {skillDomains.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
