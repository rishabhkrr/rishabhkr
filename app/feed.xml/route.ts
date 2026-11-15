import { insights, profile, siteUrl } from '@/content/site';
import { getArticle } from '@/content/articles';

export const dynamic = 'force-static';

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** RSS 2.0 feed of published on-site articles, at /feed.xml. */
export function GET() {
  const items = insights
    .filter((i) => i.published && !i.href && getArticle(i.slug))
    .map((i) => {
      const url = `${siteUrl}/insights/${i.slug}`;
      return `<item><title>${esc(i.title)}</title><link>${url}</link><guid>${url}</guid><description>${esc(i.excerpt)}</description><category>${esc(i.topic)}</category>${i.date ? `<pubDate>${new Date(`${i.date}T00:00:00Z`).toUTCString()}</pubDate>` : ''}</item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(`${profile.name} — Insights`)}</title><link>${siteUrl}/</link><description>Writing on product ownership, fintech, ERP and data.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
