import { BarChart3, Check, Factory, FileText, KanbanSquare, Sparkles } from 'lucide-react';
import { engagementModels, services, servicesCopy } from '@/content/services';
import { site } from '@/content/site';
import { SectionHeader } from '@/components/ui';

const icons = { FileText, Factory, KanbanSquare, BarChart3, Sparkles };

export function Services() {
  if (!site.showFreelance) return null;
  const bookHref = site.bookingUrl || '#contact';
  const external = Boolean(site.bookingUrl);
  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <div className="container-site">
        <SectionHeader id="services-title" eyebrow="Work with me" title={servicesCopy.heading} intro={servicesCopy.intro} />

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.title} className={`reveal card card-hover flex flex-col p-6 ${i === 0 ? 'lg:col-span-1' : ''}`}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-semibold">
                  <span className="mr-2 text-muted">{i + 1}.</span>
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.95rem] text-muted">{s.body}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-fg">You get</p>
                <ul className="mt-2 space-y-1.5 text-[0.95rem]">
                  {s.youGet.map((g) => (
                    <li key={g} className="flex gap-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      <span>{g.charAt(0).toUpperCase() + g.slice(1)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-5 text-sm text-muted">
                  <span className="font-semibold text-fg">Good for: </span>
                  {s.goodFor}
                </p>
              </li>
            );
          })}
          <li className="reveal flex flex-col justify-center rounded-2xl border border-dashed border-line p-6">
            <p className="font-display text-xl font-semibold text-fg">{servicesCopy.underTable}</p>
            <a
              href={bookHref}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="btn-primary mt-5 self-start"
            >
              {servicesCopy.button}
            </a>
          </li>
        </ul>

        <h3 id="engagement-title" className="reveal mt-16 font-display text-xl font-semibold">
          {servicesCopy.engagementHeading}
        </h3>
        <div className="reveal mt-5 overflow-x-auto rounded-2xl border border-line">
          <table aria-labelledby="engagement-title" className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-surface-2 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Model</th>
                <th scope="col" className="px-5 py-3 font-semibold">Best for</th>
                <th scope="col" className="px-5 py-3 font-semibold">Pricing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-surface">
              {engagementModels.map((m) => {
                const price = site[m.priceKey];
                return (
                  <tr key={m.model}>
                    <th scope="row" className="px-5 py-4 font-semibold text-fg">{m.model}</th>
                    <td className="px-5 py-4 text-muted">{m.bestFor}</td>
                    <td className="px-5 py-4 font-medium text-fg">
                      {site.showPricing && price ? <span className="num">{m.priceLabel(price)}</span> : servicesCopy.noPrice}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
