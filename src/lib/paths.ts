import { site } from '@/content/site';

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefix a public asset path (e.g. "/resume.pdf") with the basePath. next/link does this itself; raw <a>/<img> don't. */
export const withBase = (path: string) => `${basePath}${path}`;

/** Absolute public URL for canonical links, sitemap and JSON-LD. */
export const absoluteUrl = (path = '/') => `${site.siteUrl.replace(/\/$/, '')}${basePath}${path}`;

export const buildDate = new Date(process.env.NEXT_PUBLIC_BUILD_DATE || Date.now());
