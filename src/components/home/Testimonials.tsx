import { testimonials } from '@/content/site';
import { testimonialsCopy } from '@/content/copy';
import { SectionHeader } from '@/components/ui';

/** Hidden until there are real quotes in site.ts. */
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section bg-surface/50">
      <div className="container-site">
        <SectionHeader id="testimonials-title" eyebrow="Testimonials" title={testimonialsCopy.heading} />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} className="reveal card p-6">
              <figure>
                <blockquote className="text-lg text-fg">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-sm text-muted">
                  <span className="font-semibold text-fg">{t.name}</span>
                  <br />
                  {t.title}, {t.company}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
