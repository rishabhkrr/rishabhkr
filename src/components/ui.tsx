import { clsx } from 'clsx';
import { Rich } from './Rich';

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={clsx('reveal max-w-3xl', className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="h2 mt-3">
        {title}
      </h2>
      {intro ? (
        <p className="lead">
          <Rich text={intro} />
        </p>
      ) : null}
    </div>
  );
}

export function Chips({ items, className }: { items: string[]; className?: string }) {
  if (!items.length) return null;
  return (
    <ul className={clsx('flex flex-wrap gap-1.5', className)} aria-label="Stack">
      {items.map((c) => (
        <li key={c} className="chip">
          {c}
        </li>
      ))}
    </ul>
  );
}

const hues = [174, 199, 222, 245, 160, 190, 210];
const hueFor = (seed: string) => hues[[...seed].reduce((a, c) => a + c.charCodeAt(0), 0) % hues.length];

/** Placeholder cover used when no image exists in public/images/... */
export function CoverArt({ seed, label, className }: { seed: string; label: string; className?: string }) {
  const h = hueFor(seed);
  return (
    <div
      aria-hidden
      className={clsx('relative flex items-end overflow-hidden', className)}
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, hsl(${h} 70% 45% / 0.35), transparent 60%), radial-gradient(90% 80% at 100% 100%, hsl(${h + 40} 70% 50% / 0.28), transparent 60%), rgb(var(--surface-2))`,
      }}
    >
      <div className="hero-grid absolute inset-0 opacity-60" />
      <span className="relative p-5 font-display text-4xl font-semibold leading-none tracking-tight text-fg/70">{label}</span>
    </div>
  );
}
