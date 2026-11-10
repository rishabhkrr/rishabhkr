import { FileText } from 'lucide-react';
import { artefacts } from '@/content/copy';
import { publicFile } from '@/lib/assets';
import { withBase } from '@/lib/paths';
import { SectionHeader } from '@/components/ui';

/** Shows only artefacts whose PDF exists in public/artefacts/; the whole section hides if none do. */
export function Artefacts() {
  const items = artefacts.items.map((a) => ({ ...a, href: publicFile(`artefacts/${a.file}`) })).filter((a) => a.href);
  if (!items.length) return null;
  return (
    <section id="artefacts" aria-labelledby="artefacts-title" className="section bg-surface/50">
      <div className="container-site">
        <SectionHeader id="artefacts-title" eyebrow="Artefacts" title={artefacts.heading} intro={artefacts.intro} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <li key={a.file} className="reveal card card-hover flex flex-col p-6">
              <FileText className="h-6 w-6 text-accent" aria-hidden />
              <p className="mt-4 font-display text-lg font-semibold">{a.title}</p>
              <p className="mt-1 text-sm text-muted">{a.source}</p>
              <a href={withBase(a.href!)} target="_blank" rel="noopener" className="link mt-auto inline-flex min-h-[44px] items-center pt-4 text-sm">
                {artefacts.button}
                <span className="sr-only">: {a.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
