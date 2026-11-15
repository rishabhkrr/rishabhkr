import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { insights, profile } from '@/content/site';
import { getArticle } from '@/content/articles';

// Share image for each article, rendered once at build time to /insights/<slug>/og.png
// (a real .png path so GitHub Pages serves it as image/png).
export const dynamic = 'force-static';
const size = { width: 1200, height: 630 };
const fontDir = join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans');

export function generateStaticParams() {
  const slugs = insights.filter((i) => i.published && getArticle(i.slug)).map((i) => i.slug);
  return (slugs.length ? slugs : ['_']).map((slug) => ({ slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = insights.find((i) => i.slug === slug);
  const article = getArticle(slug);
  const [regular, semibold] = await Promise.all([readFile(join(fontDir, 'Geist-Regular.ttf')), readFile(join(fontDir, 'Geist-SemiBold.ttf'))]);
  const title = meta?.title ?? 'Insights';
  const excerpt = meta?.excerpt ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#09090b',
          backgroundImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(245,158,11,0.10), rgba(9,9,11,0) 70%)',
          color: '#fafafa',
          fontFamily: 'Geist',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 14,
              background: '#fafafa',
              color: '#09090b',
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            RK
          </div>
          <div style={{ display: 'flex', fontSize: 24, letterSpacing: 4, textTransform: 'uppercase', color: '#a1a1aa' }}>
            {`Insights · ${meta?.topic ?? ''}`}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: title.length > 34 ? 68 : 80, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2.5 }}>{title}</div>
          <div style={{ display: 'flex', fontSize: 30, lineHeight: 1.35, color: '#a1a1aa', maxWidth: 1000 }}>{excerpt}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#a1a1aa' }}>
          <div style={{ display: 'flex' }}>{`${profile.name} · Business Analyst & Product Owner`}</div>
          <div style={{ display: 'flex' }}>{article?.readingTime ?? ''}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Geist', data: regular, weight: 400, style: 'normal' },
        { name: 'Geist', data: semibold, weight: 600, style: 'normal' },
      ],
    }
  );
}
