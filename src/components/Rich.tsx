import { Fragment } from 'react';

/**
 * Renders the `**bold**` and `*italic*` markers used in the content files.
 * `strongClass` lets result numbers pick up the accent colour.
 */
export function Rich({ text, strongClass = 'font-semibold text-fg' }: { text: string; strongClass?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i} className={strongClass}>{p.slice(2, -2)}</strong>;
        if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

export const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
