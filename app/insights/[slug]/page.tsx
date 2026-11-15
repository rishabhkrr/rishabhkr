import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { insights, profile, siteUrl } from '@/content/site';
import { articles, getArticle } from '@/content/articles';

export const dynamicParams = false;

const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Only published insights that have a full article get a page. */
const publishedSlugs = () => insights.filter((i) => i.published && getArticle(i.slug)).map((i) => i.slug);

export function generateStaticParams() {
  const slugs = publishedSlugs();
  // Static export needs at least one path; a placeholder renders a 404 until something is published.
  return (slugs.length ? slugs : ['_']).map((slug) => ({ slug }));
}

// Next 15: route params are async.
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = insights.find((i) => i.slug === slug);
  if (!meta || !publishedSlugs().includes(slug)) return { robots: { index: false } };
  return {
    title: `${meta.title} — ${profile.name}`,
    description: meta.excerpt,
    alternates: { canonical: `${siteUrl}/insights/${meta.slug}` },
    openGraph: { type: 'article', title: meta.title, description: meta.excerpt, url: `${siteUrl}/insights/${meta.slug}`, ...(meta.date ? { publishedTime: meta.date } : {}), authors: [profile.name], images: [{ url: `${siteUrl}/insights/${meta.slug}/og.png`, width: 1200, height: 630, alt: meta.title }] },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.excerpt, images: [`${siteUrl}/insights/${meta.slug}/og.png`] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const meta = insights.find((i) => i.slug === slug);
  const article = articles.find((a) => a.slug === slug);
  if (!meta || !article || !publishedSlugs().includes(slug)) notFound();

  const toc = article.blocks.flatMap((b) => (b.type === 'h2' ? [b.text] : []));
  const url = `${siteUrl}/insights/${meta.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.excerpt,
    url,
    mainEntityOfPage: url,
    image: `${url}/og.png`,
    ...(meta.date ? { datePublished: meta.date, dateModified: meta.date } : {}),
    inLanguage: 'en',
    articleSection: meta.topic,
    author: { '@type': 'Person', name: profile.name, url: siteUrl },
    publisher: { '@type': 'Person', name: profile.name, url: siteUrl },
  };

  return (
    <article className="container max-w-3xl pb-24 pt-32">
      <div aria-hidden className="read-progress" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} />
      <Link href="/#insights" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All insights
      </Link>
      <p className="section-label mt-10">
        {meta.topic} · {article.readingTime}
      </p>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tighter md:text-5xl">{meta.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{meta.excerpt}</p>
      <p className="mt-6 text-sm text-muted-foreground">
        By {profile.name}
        {meta.date && (
          <>
            {' · '}
            <time dateTime={meta.date}>{new Date(`${meta.date}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time>
          </>
        )}
      </p>
      {toc.length >= 3 && (
        <nav aria-label="On this page" className="mt-10 rounded-xl border p-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">On this page</p>
          <ol className="mt-3 space-y-1.5 text-sm">
            {toc.map((t) => (
              <li key={t}>
                <a href={`#${slugify(t)}`} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  {t}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="mt-10 space-y-6 border-t pt-10 leading-relaxed">
        {article.blocks.map((b, i) => {
          if (b.type === 'h2') return <h2 key={i} id={slugify(b.text)} className="scroll-mt-24 pt-4 text-2xl font-semibold tracking-tight">{b.text}</h2>;
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
