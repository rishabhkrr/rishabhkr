import type { MetadataRoute } from 'next';
import { caseStudies } from '@/content/caseStudies';
import { publicFile } from '@/lib/assets';
import { absoluteUrl, buildDate } from '@/lib/paths';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', ...caseStudies.map((c) => `/work/${c.slug}/`), publicFile('resume.pdf') ? '/resume/' : null, '/now/'].filter(Boolean) as string[];
  return routes.map((r) => ({
    url: absoluteUrl(r),
    lastModified: buildDate,
    changeFrequency: r === '/' || r === '/now/' ? 'monthly' : 'yearly',
    priority: r === '/' ? 1 : r.startsWith('/work/') ? 0.8 : 0.5,
  }));
}
