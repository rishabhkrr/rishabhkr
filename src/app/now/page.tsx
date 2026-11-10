import type { Metadata } from 'next';
import Link from 'next/link';
import { pages } from '@/content/copy';
import { absoluteUrl, buildDate } from '@/lib/paths';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Rishabh Kumar is working on, building and learning this month.',
  alternates: { canonical: absoluteUrl('/now/') },
};

export default function NowPage() {
  // The month is the build month, so it stays accurate as long as the site is rebuilt when this page is edited.
  const month = buildDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
  return (
    <div className="container-site py-14 sm:py-20">
      <p className="eyebrow">/now</p>
      <h1 className="h2 mt-3">{pages.now.heading}</h1>
      <p className="mt-2 text-sm text-muted">
        Updated <time dateTime={buildDate.toISOString().slice(0, 7)}>{month}</time>
      </p>
      <ul className="mt-10 max-w-prose space-y-5 text-lg">
        {pages.now.lines.map((l) => {
          const [k, ...rest] = l.split(': ');
          return (
            <li key={l} className="border-l-2 border-accent pl-5">
              <span className="font-semibold text-fg">{k}:</span> <span className="text-muted">{rest.join(': ')}</span>
            </li>
          );
        })}
      </ul>
      <Link href="/" className="link mt-12 inline-flex min-h-[44px] items-center">
        ← Back to home
      </Link>
    </div>
  );
}
