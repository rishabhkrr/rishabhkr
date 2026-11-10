import { experience, experienceCopy } from '@/content/experience';
import { Chips, SectionHeader } from '@/components/ui';
import { Rich } from '@/components/Rich';
import { MoreBullets } from './MoreBullets';

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="container-site">
        <SectionHeader id="experience-title" eyebrow="Career" title={experienceCopy.heading} />
        <ol className="mt-12 space-y-0">
          {experience.map((r, i) => (
            <li key={r.company} className="reveal relative grid gap-4 pb-14 pl-8 last:pb-0 md:grid-cols-[13rem_1fr] md:gap-10 md:pl-0">
              {/* timeline rail */}
              <span aria-hidden className="absolute left-[5px] top-2 h-full w-px bg-line md:left-[13.6rem]" />
              <span
                aria-hidden
                className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-bg md:left-[13.3rem] ${i === 0 ? 'bg-accent ring-4 ring-accent/20' : 'bg-muted'}`}
              />
              <div className="md:pt-0.5 md:text-right">
                <p className="text-sm font-medium tabular-nums text-muted">{r.dates}</p>
                <p className="mt-1 text-sm text-muted">{r.place}</p>
              </div>
              <div className="md:pl-8">
                <h3 className="text-xl font-semibold sm:text-2xl">{r.title}</h3>
                <p className="mt-1 font-medium text-accent">{r.company}</p>
                <p className="mt-3 max-w-prose text-muted">{r.summary}</p>
                {r.bullets.length ? (
                  <MoreBullets
                    visible={r.bullets.slice(0, 3).map((b) => <Rich key={b} text={b} strongClass="font-semibold text-fg" />)}
                    hidden={r.bullets.slice(3).map((b) => <Rich key={b} text={b} strongClass="font-semibold text-fg" />)}
                    more={experienceCopy.showMore}
                    less={experienceCopy.showLess}
                    id={`role-${i}`}
                  />
                ) : null}
                <Chips items={r.chips} className="mt-5" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
