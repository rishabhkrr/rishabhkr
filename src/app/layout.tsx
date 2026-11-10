import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { site } from '@/content/site';
import { seo } from '@/content/copy';
import { services } from '@/content/services';
import { experience } from '@/content/experience';
import { absoluteUrl } from '@/lib/paths';
import { publicFile } from '@/lib/assets';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { RevealObserver } from '@/components/layout/RevealObserver';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  title: { default: seo.title, template: `%s · ${site.fullName}` },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: site.fullName, url: absoluteUrl('/') }],
  alternates: { canonical: absoluteUrl('/') },
  icons: {
    icon: [
      { url: absoluteUrl('/icon.svg'), type: 'image/svg+xml' },
      { url: absoluteUrl('/favicon-32.png'), type: 'image/png', sizes: '32x32' },
    ],
    apple: absoluteUrl('/apple-touch-icon.png'),
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: absoluteUrl('/'),
    siteName: site.fullName,
    title: seo.title,
    description: seo.description,
    images: [{ url: absoluteUrl('/og.png'), width: 1200, height: 630, alt: `${site.fullName} — ${seo.ogHeadline}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [absoluteUrl('/og.png')],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF7' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0D12' },
  ],
};

/** Runs before paint: apply a remembered theme and flag that JS is on (enables scroll reveals). */
const themeInit = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t);}catch(e){}})();`;

function jsonLd() {
  const sameAs = [site.linkedinUrl, site.githubUrl].filter(Boolean);
  const person = {
    '@type': 'Person',
    '@id': absoluteUrl('/#person'),
    name: site.fullName,
    url: absoluteUrl('/'),
    email: `mailto:${site.email}`,
    jobTitle: experience[0].title,
    worksFor: { '@type': 'Organization', name: 'Gemba Concepts Pvt. Ltd.' },
    address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
    sameAs,
  };
  const graph: object[] = [person];
  if (site.showFreelance) {
    graph.push({
      '@type': 'ProfessionalService',
      name: `${site.fullName} — Product & Business Analysis`,
      url: absoluteUrl('/'),
      founder: { '@id': absoluteUrl('/#person') },
      areaServed: 'Worldwide',
      address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.body } })),
      },
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const resume = publicFile('resume.pdf');
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Nav resumeHref={resume} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer resumeHref={resume} />
        <RevealObserver />
        {site.analyticsScriptUrl ? (
          <Script
            src={site.analyticsScriptUrl}
            strategy="afterInteractive"
            data-domain={site.analyticsDomain || undefined}
            data-website-id={site.analyticsDomain || undefined}
          />
        ) : null}
      </body>
    </html>
  );
}
