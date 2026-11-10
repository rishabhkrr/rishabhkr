import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { footer } from '@/content/copy';
import { site } from '@/content/site';
import { buildDate } from '@/lib/paths';

export function Footer({ resumeHref }: { resumeHref: string | null }) {
  const updated = buildDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
  const pageLinks = [
    site.showFreelance && { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    resumeHref && { label: 'Résumé', href: '/resume/' },
    { label: 'Contact', href: '/#contact' },
  ].filter(Boolean) as { label: string; href: string }[];
  const social = [
    site.linkedinUrl && { label: 'LinkedIn', href: site.linkedinUrl, Icon: Linkedin },
    site.githubUrl && { label: 'GitHub', href: site.githubUrl, Icon: Github },
    { label: 'Email', href: `mailto:${site.email}`, Icon: Mail },
  ].filter(Boolean) as { label: string; href: string; Icon: typeof Mail }[];

  return (
    <footer className="border-t border-line">
      <div className="container-site grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display font-semibold text-fg">{footer.line1}</p>
          <p className="mt-1 text-sm text-muted">{footer.line2}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {pageLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-muted hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex gap-2 md:justify-end">
          {social.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="btn-secondary !px-3"
                aria-label={label}
                title={label}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="container-site flex flex-col gap-1 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>{footer.credit}</p>
        <p>
          Last updated <time dateTime={buildDate.toISOString()}>{updated}</time>
        </p>
      </div>
    </footer>
  );
}
