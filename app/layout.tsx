import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { links, profile, siteUrl } from '@/content/site';
import { themeInitScript } from '@/hooks/useTheme';
import { SmoothScroll } from '@/components/animations/SmoothScroll';
import { Navbar } from '@/components/sections/navbar';
import { Analytics } from '@vercel/analytics/react';

const title = 'Rishabh Kumar | Senior Business Analyst & Product Owner | Fintech, ERP & AI';
const description =
  "Explore Rishabh Kumar's professional portfolio showcasing 5+ years of experience in Business Analysis, Product Ownership, Fintech, ERP, WMS, SQL, Power BI and AI-driven automation.";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title,
  description,
  keywords: [
    'Rishabh Kumar',
    'Senior Business Analyst',
    'Product Owner',
    'Product Analyst',
    'Technical Product Manager',
    'Fintech',
    'Accounts Receivable',
    'Cash Application',
    'ERP',
    'WMS',
    'SQL',
    'Power BI',
    'AWS Textract',
    'Bangalore',
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: './' },
  openGraph: {
    type: 'profile',
    url: './',
    siteName: `${profile.name} — Portfolio`,
    title,
    description,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
  // Google Search Console: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the token from the HTML-tag method.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } } : {}),
};

// Vercel sets VERCEL=1 at build time; elsewhere (e.g. GitHub Pages) the analytics script would 404.
const onVercel = process.env.VERCEL === '1';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  description: profile.summary.join(' '),
  url: siteUrl,
  address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
  knowsAbout: ['Business Analysis', 'Product Ownership', 'Fintech', 'Accounts Receivable', 'Cash Application', 'ERP', 'WMS', 'SQL', 'Power BI', 'AI-driven automation'],
  sameAs: [links.linkedin, links.github].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-modal focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background">
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main">{children}</main>
        </SmoothScroll>
        {onVercel && <Analytics />}
      </body>
    </html>
  );
}
