'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { clsx } from 'clsx';

/** WAI-ARIA tabs: arrow keys / Home / End move between tabs; only the active tab is in the tab order. */
export function Tabs({ label, tabs }: { label: string; tabs: { label: string; content: ReactNode }[] }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const last = tabs.length - 1;
    let n = active;
    if (e.key === 'ArrowRight') n = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowLeft') n = active === 0 ? last : active - 1;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = last;
    else return;
    e.preventDefault();
    setActive(n);
    refs.current[n]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1" onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={clsx(
              'min-h-[44px] shrink-0 whitespace-nowrap rounded-xl border px-4 text-sm font-semibold transition',
              active === i ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-surface text-muted hover:text-fg',
            )}
          >
            <span className="mr-1.5 tabular-nums opacity-70">{i + 1}</span>
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="mt-6 rounded-xl focus-visible:outline-offset-4"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
