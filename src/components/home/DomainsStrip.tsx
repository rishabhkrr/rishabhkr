import { domains } from '@/content/copy';

export function DomainsStrip() {
  return (
    <section aria-labelledby="domains-title" className="py-12 sm:py-16">
      <div className="container-site">
        <h2 id="domains-title" className="text-center text-sm font-medium text-muted">
          {domains.label}
        </h2>
      </div>
      {/* Marquee: list rendered twice for a seamless loop; the copy is hidden from assistive tech.
          Pauses on hover/focus; under reduced motion it becomes a static wrapped list. */}
      <div className="marquee group relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]">
        <div className="marquee-track flex w-max animate-marquee gap-3 motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-4">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className={copy === 1 ? 'flex gap-3 motion-reduce:hidden' : 'flex gap-3 motion-reduce:flex-wrap motion-reduce:justify-center'}>
              {domains.chips.map((c) => (
                <li key={c} className="whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-fg">
                  {c}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="container-site">
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-display text-base font-semibold text-muted sm:text-lg">
          {domains.employers.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
