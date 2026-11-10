import { proof } from '@/content/copy';
import { CountUp } from './CountUp';

export function ProofBar() {
  return (
    <section aria-label="Results in numbers" className="border-y border-line bg-surface/60">
      <div className="container-site py-12 sm:py-14">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {proof.primary.map((s) => (
            <li key={s.label} className="reveal">
              <CountUp value={s.value} className="num block text-4xl font-semibold sm:text-5xl" />
              <span className="mt-2 block text-sm text-muted">{s.label}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 lg:grid-cols-4">
          {proof.secondary.map((s) => (
            <li key={s.label} className="reveal flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
              <CountUp value={s.value} className="num text-2xl font-semibold" />
              <span className="text-sm text-muted">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
