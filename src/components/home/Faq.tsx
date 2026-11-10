import { Plus } from 'lucide-react';
import { faq, faqCopy } from '@/content/faq';
import { site } from '@/content/site';
import { SectionHeader } from '@/components/ui';

/** Native <details> accordion: keyboard and screen-reader support with zero JS. */
export function Faq() {
  if (!site.showFreelance) return null;
  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-surface/50">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeader id="faq-title" eyebrow="FAQ" title={faqCopy.heading} />
        <div className="reveal divide-y divide-line rounded-2xl border border-line bg-surface">
          {faq.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold text-fg [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="h-5 w-5 shrink-0 text-accent transition group-open:rotate-45" aria-hidden />
              </summary>
              <p className="px-6 pb-5 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
