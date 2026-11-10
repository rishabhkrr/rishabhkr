import type { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { pages } from '@/content/copy';
import { site } from '@/content/site';
import { publicFile } from '@/lib/assets';
import { absoluteUrl, withBase } from '@/lib/paths';

export const metadata: Metadata = {
  title: 'Résumé',
  description: `${site.fullName} — one-page résumé (PDF).`,
  alternates: { canonical: absoluteUrl('/resume/') },
};

export default function ResumePage() {
  const pdf = publicFile('resume.pdf');
  return (
    <div className="container-site py-14 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="h2">{pages.resume.heading}</h1>
          <p className="lead">
            {pages.resume.body.replace('see the case studies.', '')}
            <Link href="/#work" className="link">see the case studies</Link>.
          </p>
        </div>
        {pdf ? (
          <a href={withBase(pdf)} download className="btn-primary">
            <Download className="h-4 w-4" aria-hidden /> {pages.resume.download}
          </a>
        ) : null}
      </div>
      {pdf ? (
        <object
          data={withBase(pdf)}
          type="application/pdf"
          aria-label={`${site.fullName} résumé`}
          className="mt-10 h-[85vh] min-h-[32rem] w-full rounded-2xl border border-line bg-surface"
        >
          <p className="p-6 text-muted">
            Your browser can&apos;t show the PDF here.{' '}
            <a className="link" href={withBase(pdf)} download>
              Download it instead
            </a>
            .
          </p>
        </object>
      ) : (
        <p className="mt-10 text-muted">
          The PDF isn&apos;t available right now. Email{' '}
          <a className="link" href={`mailto:${site.email}`}>
            {site.email}
          </a>{' '}
          and I&apos;ll send it.
        </p>
      )}
    </div>
  );
}
