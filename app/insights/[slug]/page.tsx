import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { insights, profile, siteUrl } from '@/content/site';
import { articles, getArticle } from '@/content/articles';

export const dynamicParams = false;

/** Only published insights that have a full article get a page. */
const publishedSlugs = () => insights.filter((i) => i.published && getArticle(i.slug)).map((i) => i.slug);

export function generateStaticParams() {
  const slugs = publishedSlugs();
  // Static export needs at least one path; a placeholder renders a 404 until something is published.
  return (slugs.length ? slugs : ['_']).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const meta = insights.find((i) => i.slug === params.slug);
  if (!meta || !publishedSlugs().includes(params.slug)) return { robots: { index: false } };
  return {
    title: `${meta.title} — ${profile.name}`,
    description: meta.excerpt,
    alternates: { canonical: `${siteUrl}/insights/${meta.slug}` },
    openGraph: { type: 'article', title: meta.title, description: meta.excerpt },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const meta = insights.find((i) => i.slug === params.slug);
  const article = articles.find((a) => a.slug === params.slug);
  if (!meta || !article || !publishedSlugs().includes(params.slug)) notFound();

  return (
    <article className="container max-w-3xl pb-24 pt-32">
      <Link href="/#insights" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All insights
      </Link>
      <p className="section-label mt-10">
        {meta.topic} · {article.readingTime}
      </p>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tighter md:text-5xl">{meta.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{meta.excerpt}</p>
      <p className="mt-6 text-sm text-muted-foreground">By {profile.name}</p>
      <div className="mt-10 space-y-6 border-t pt-10 leading-relaxed">
        {article.blocks.map((b, i) => {
          if (b.type === 'h2') return <h2 key={i} className="pt-4 text-2xl font-semibold tracking-tight">{b.text}</h2>;
          if (b.type === 'ul')
            return (
              <ul key={i} className="list-disc space-y-2 pl-5 text-muted-foreground">
                {b.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            );
          if (b.type === 'code')
            return (
              <pre key={i} className="overflow-x-auto rounded-xl border bg-muted/50 p-4 font-mono text-[13px] leading-relaxed">
                <code>{b.text}</code>
              </pre>
            );
          return <p key={i} className="text-pretty text-muted-foreground">{b.text}</p>;
        })}
      </div>
    </article>
  );
}
