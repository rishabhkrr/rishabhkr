import Image from 'next/image';
import { about } from '@/content/copy';
import { site } from '@/content/site';
import { publicImage } from '@/lib/assets';
import { withBase } from '@/lib/paths';
import { Rich } from '@/components/Rich';
import { SectionHeader } from '@/components/ui';

export function About() {
  const photo = publicImage('images/headshot');
  return (
    <section id="about" aria-labelledby="about-title" className="section bg-surface/50">
      <div className="container-site">
        <SectionHeader id="about-title" eyebrow="About" title={about.heading} />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_22rem]">
          <div className="reveal max-w-prose space-y-5 text-[1.05rem] text-muted">
            {about.body.map((p) => (
              <p key={p.slice(0, 24)}>
                <Rich text={p} />
              </p>
            ))}
          </div>

          <aside aria-label="Quick facts" className="reveal space-y-5 lg:sticky lg:top-24 lg:self-start">
            {photo ? (
              <Image
                src={withBase(photo)}
                alt={`Portrait of ${site.fullName}`}
                width={800}
                height={800}
                loading="lazy"
                className="aspect-square w-full rounded-2xl border border-line object-cover"
              />
            ) : (
              <div
                aria-hidden
                className="flex aspect-square w-full items-center justify-center rounded-2xl border border-line font-display text-7xl font-semibold tracking-tight text-accent"
                style={{
                  background:
                    'radial-gradient(80% 80% at 20% 10%, rgb(var(--accent) / 0.22), transparent 60%), radial-gradient(80% 80% at 90% 100%, rgb(99 102 241 / 0.16), transparent 60%), rgb(var(--surface-2))',
                }}
              >
                RK
              </div>
            )}
            <dl className="card divide-y divide-line text-sm">
              {about.facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 px-5 py-3">
                  <dt className="font-semibold text-fg">{k}</dt>
                  <dd className="text-muted">{v.replace('{gembaTitle}', site.gembaTitle)}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="mt-16">
          <h3 className="reveal font-display text-xl font-semibold">{about.beyondHeading}</h3>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {about.beyond.map((b) => (
              <li key={b.title} className="reveal card flex gap-3 p-4 text-sm lg:flex-col">
                <span className="text-2xl" aria-hidden>
                  {b.emoji}
                </span>
                <p className="text-muted">
                  <strong className="font-semibold text-fg">{b.title}</strong>
                  {b.text ? (b.text.startsWith(',') ? b.text : ` ${b.text}`) : null}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
