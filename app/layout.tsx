import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rishabh Kumar — Product Owner & Developer',
  description: 'Senior Business Analyst & Product Owner bridging business strategy and engineering. 5+ years in fintech, ERP, and AI-driven products.',
  keywords: ['Product Owner', 'Business Analyst', 'Software Developer', 'Bangalore', 'FIS', 'Gemba', 'Portfolio'],
  authors: [{ name: 'Rishabh Kumar' }],
  openGraph: {
    title: 'Rishabh Kumar — Product Owner & Developer',
    description: 'Building data-driven products at the intersection of business & engineering',
    type: 'website',
    locale: 'en_US',
    siteName: 'Rishabh Kumar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rishabh Kumar — Product Owner & Developer',
    description: 'Building data-driven products at the intersection of business & engineering',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Mesh gradient background */}
        <div className="mesh-bg">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 backdrop-blur-xl bg-bg/60 border-b border-border">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <a href="#" className="font-display text-lg font-bold gradient-text">
              Rishabh Kumar
            </a>
            <ul className="flex gap-8 list-none">
              <li><a href="#projects" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Projects</a></li>
              <li><a href="#experience" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Experience</a></li>
              <li><a href="#skills" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Skills</a></li>
              <li><a href="#contact" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Contact</a></li>
            </ul>
            <a href="#contact" className="btn-primary text-xs px-4 py-2">
              Let's Talk
            </a>
          </div>
        </nav>

        {/* Main content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
