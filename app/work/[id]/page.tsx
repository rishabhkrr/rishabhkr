import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { caseStudies } from '@/content/case-studies';
import { profile, siteUrl } from '@/content/site';
import { CaseStudyBody, StatusBadge } from '@/components/sections/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((s) => ({ id: s.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const s = caseStudies.find((c) => c.id === id);
  if (!s) return { robots: { index: false } };
  const url = `${siteUrl}/work/${s.id}`;
  return {
    title: `${s.title} — Case study — ${profile.name}`,
    description: s.tagline,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: `${s.title} — Case study`, description: s.tagline, url },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params;
  const i = caseStudies.findIndex((c) => c.id === id);
  if (i < 0) notFound();
  const s = caseStudies[i];
  const prev = caseStudies[(i - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(i + 1) % caseStudies.length];

  return (
    <article className="container max-w-3xl pb-24 pt-32">
      <div aria-hidden className="read-progress" />
      <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All work
      </Link>
      <p className="section-label mt-10 flex flex-wrap items-center gap-2">
        Case study {s.index} · {s.domain} <StatusBadge status={s.status} />
      </p>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tighter md:text-5xl">{s.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{s.tagline}</p>
      <p className="mt-6 text-sm text-muted-foreground">By {profile.name}</p>
      <div className="mt-10 border-t pt-10">
        <CaseStudyBody s={s} flat />
      </div>
      <nav aria-label="More case studies" className="mt-16 grid gap-3 border-t pt-8 sm:grid-cols-2">
        <Link href={`/work/${prev.id}`} className="rounded-xl border p-4 transition-colors hover:bg-accent/50">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Previous
          </span>
          <span className="mt-1 block font-medium">{prev.title}</span>
        </Link>
        <Link href={`/work/${next.id}`} className="rounded-xl border p-4 text-right transition-colors hover:bg-accent/50">
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            Next <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-1 block font-medium">{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
