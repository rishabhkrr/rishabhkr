import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DotPattern } from '@/components/magicui/dot-pattern';

export const metadata: Metadata = {
  title: 'Scene not found — Rishabh Kumar',
  robots: { index: false },
};

/** 404 — served by GitHub Pages as /404.html for any unknown path. */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <DotPattern className="[mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black,transparent)]" />
      <p className="section-label relative flex items-center gap-3">
        <span className="text-foreground">Scene 404</span>
        <span className="h-px w-8 bg-border" />
        <span>Cut from the final edit</span>
      </p>
      <h1 className="text-gradient relative mt-6 text-[clamp(5rem,22vw,12rem)] font-semibold leading-none tracking-tighter">404</h1>
      <p className="relative mt-4 max-w-md text-pretty text-muted-foreground md:text-lg">
        This page didn&apos;t make it past the edit. The link may be old, or the address mistyped.
      </p>
      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft /> Back to the portfolio
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/#insights">
            <BookOpen /> Read the insights
          </Link>
        </Button>
      </div>
      <p className="relative mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Take 2 — Rishabh Kumar</p>
    </section>
  );
}
