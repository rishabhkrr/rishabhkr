'use client';

import { useEffect } from 'react';

/**
 * One observer for every [data-reveal] element on the page — replaces dozens
 * of per-component animation instances. Elements get `is-revealed` once they
 * enter the viewport (or immediately for data-reveal="load").
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add('is-revealed');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );

    const scan = (root: ParentNode) => {
      root.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => {
        if (el.getAttribute('data-reveal') === 'load') reveal(el);
        else io.observe(el);
      });
    };
    scan(document);

    // Pick up content mounted later (e.g. "Show all" lists, dialogs).
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && scan(n.parentElement ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
