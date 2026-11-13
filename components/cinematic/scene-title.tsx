import { cn } from '@/lib/utils';

/**
 * Title-card heading: each word rises out of a mask when the heading enters
 * the frame. Pure CSS + <RevealObserver>; server-rendered, no hydration cost.
 */
export function SceneTitle({ text, className, as: Tag = 'h2', id }: { text: string; className?: string; as?: 'h1' | 'h2'; id?: string }) {
  const words = text.split(' ');
  return (
    <Tag id={id} data-reveal="" className={cn('section-title scene-title', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <span className="scene-word inline-block" style={{ '--i': i } as React.CSSProperties}>
              {w}
              {i < words.length - 1 && ' '}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Film-slate style section label: "Scene 02 — Impact". */
export function SceneLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="section-label flex items-center gap-3">
      <span className="text-foreground">Scene {n}</span>
      <span className="h-px w-8 bg-border" />
      <span>{children}</span>
    </p>
  );
}
