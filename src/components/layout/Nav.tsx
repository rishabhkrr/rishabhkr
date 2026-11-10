'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { nav } from '@/content/copy';
import { site } from '@/content/site';
import { withBase } from '@/lib/paths';
import { ThemeToggle } from './ThemeToggle';

const links = nav.links.filter((l) => !l.freelanceOnly || site.showFreelance);

export function Nav({ resumeHref }: { resumeHref: string | null }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav section whose area contains the viewport's midline (home page only).
  // Sections that aren't in the nav (artefacts, projects, skills, FAQ…) clear the highlight.
  // An observer (not scroll + getBoundingClientRect) so it never forces a synchronous layout.
  useEffect(() => {
    if (!isHome) return setActive('');
    const ids = new Set(links.map((l) => l.href.slice(1)));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(ids.has(e.target.id) ? `#${e.target.id}` : '');
          else setActive((cur) => (cur === `#${e.target.id}` ? '' : cur));
        });
      },
      { rootMargin: '-45% 0px -55% 0px' }, // a 0px band at 45% of the viewport height
    );
    document.querySelectorAll('main section').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  // Mobile menu: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a,button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  // Plain <a> (not next/link) so in-page hash jumps work; off the home page it needs the basePath.
  const href = (h: string) => (isHome ? h : withBase(`/${h}`));

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-colors duration-200',
        scrolled || open ? 'border-b border-line bg-bg/80 backdrop-blur-lg' : 'border-b border-transparent',
      )}
    >
      <nav aria-label="Main" className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-fg">
          {nav.logo}
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={href(l.href)}
                aria-current={active === l.href ? 'true' : undefined}
                className={clsx(
                  'relative inline-flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium transition-colors',
                  active === l.href ? 'text-fg' : 'text-muted hover:text-fg',
                )}
              >
                {l.label}
                <span
                  aria-hidden
                  className={clsx(
                    'absolute bottom-1.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-accent transition-all',
                    active === l.href ? 'w-4' : 'w-0',
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {resumeHref ? (
            <a href={withBase(resumeHref)} download className="btn-secondary hidden !px-3 sm:inline-flex">
              {nav.resume} <Download className="h-4 w-4" aria-hidden />
            </a>
          ) : null}
          <a href={href('#contact')} className="btn-primary hidden sm:inline-flex">
            {nav.hire}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="btn-secondary !px-3 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-in panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-bg px-4 pb-10 pt-4 lg:hidden"
      >
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={href(l.href)}
                onClick={() => setOpen(false)}
                className="flex min-h-[52px] items-center border-b border-line font-display text-2xl font-medium text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3">
          <a href={href('#contact')} onClick={() => setOpen(false)} className="btn-primary w-full">
            {nav.hire}
          </a>
          {resumeHref ? (
            <a href={withBase(resumeHref)} download className="btn-secondary w-full">
              {nav.resume} <Download className="h-4 w-4" aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
