'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export function MoreBullets({ visible, hidden, more, less, id }: { visible: ReactNode[]; hidden: ReactNode[]; more: string; less: string; id: string }) {
  const [open, setOpen] = useState(false);
  const li = (node: ReactNode, k: number) => (
    <li key={k} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent/70">
      {node}
    </li>
  );
  return (
    <>
      <ul id={id} className="mt-5 max-w-prose space-y-3 text-[0.97rem] text-muted">
        {visible.map(li)}
        {open ? hidden.map((n, k) => li(n, k + visible.length)) : null}
      </ul>
      {hidden.length ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="link mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm no-underline"
        >
          {open ? less : `${more} (${hidden.length})`}
          <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      ) : null}
    </>
  );
}
