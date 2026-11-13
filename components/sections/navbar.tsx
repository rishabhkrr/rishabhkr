'use client';

import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navItems, profile } from '@/content/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/hooks/useTheme';
import { scrollToId, useLenis } from '@/components/animations/SmoothScroll';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ids = navItems.map((n) => n.id);

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground font-mono text-[13px] font-semibold text-background">RK</span>
      <span className="hidden text-sm font-semibold tracking-tight sm:inline">{profile.name}</span>
    </span>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}

export function Navbar() {
  const lenis = useLenis();
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lenis]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollToId(id, lenis));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-nav px-3 pt-3 sm:px-4" style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top, 0px))' }}>
      <nav
        aria-label="Primary"
        className={cn(
          'mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full border px-3 pl-4 transition-all duration-300',
          scrolled ? 'border-border bg-background/75 shadow-lg shadow-black/5 backdrop-blur-xl' : 'border-transparent bg-transparent'
        )}
      >
        <a href="#home" onClick={go('home')} className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Logo />
          <span className="sr-only">
            <span className="sm:hidden"> {profile.name}</span> — home
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems
            .filter((n) => n.id !== 'home')
            .map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      isActive ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contact" onClick={go('contact')}>
              Let&apos;s talk
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="mx-auto mt-2 duration-200 animate-in fade-in-0 slide-in-from-top-2 max-w-5xl rounded-2xl border bg-background/95 p-2 shadow-xl backdrop-blur-xl lg:hidden"
          >
            <ul className="grid gap-0.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-accent',
                      active === item.id ? 'bg-accent text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-2 w-full">
              <a href="#contact" onClick={go('contact')}>
                Let&apos;s talk
              </a>
            </Button>
          </div>
        )}
    </header>
  );
}
