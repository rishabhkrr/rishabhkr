import type { MetadataRoute } from 'next';
import { insights, siteUrl } from '@/content/site';
import { getArticle } from '@/content/articles';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = insights
    .filter((i) => i.published && !i.href && getArticle(i.slug))
    .map((i) => ({ url: `${siteUrl}/insights/${i.slug}`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.6 }));
  return [{ url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }, ...articles];
}
