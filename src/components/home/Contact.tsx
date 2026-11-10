import { CalendarDays, FileDown, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { contact } from '@/content/copy';
import { site } from '@/content/site';
import { withBase } from '@/lib/paths';
import { Rich } from '@/components/Rich';
import { ContactForm } from './ContactForm';

export function Contact({ resumeHref }: { resumeHref: string | null }) {
  const wa = site.phoneWhatsapp.replace(/[^\d]/g, '');
  const links = [
    { label: site.email, href: `mailto:${site.email}`, Icon: Mail },
    wa && { label: `WhatsApp: ${site.phoneWhatsapp}`, href: `https://wa.me/${wa}`, Icon: MessageCircle },
    site.linkedinUrl && { label: 'LinkedIn', href: site.linkedinUrl, Icon: Linkedin },
    site.githubUrl && { label: site.githubUrl.replace(/^https?:\/\//, ''), href: site.githubUrl, Icon: Github },
    resumeHref && { label: contact.resume, href: withBase(resumeHref), Icon: FileDown, download: true },
  ].filter(Boolean) as { label: string; href: string; Icon: typeof Mail; download?: boolean }[];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container-site">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="mt-3 font-display font-semibold leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            {contact.heading}
          </h2>
          <p className="lead">
            <Rich text={contact.body} />
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="reveal card p-5 sm:p-8">
            <ContactForm />
          </div>

          <aside aria-label="Direct links" className="reveal">
            <ul className="space-y-2">
              {links.map(({ label, href, Icon, download }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(download ? { download: true } : {})}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex min-h-[48px] items-center gap-3 rounded-xl border border-line bg-surface px-4 text-sm font-medium text-fg transition hover:border-accent/50"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span className="break-all">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            {site.bookingUrl ? (
              <p className="mt-6 text-sm text-muted">
                {contact.bookPrefix}{' '}
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" aria-hidden /> {contact.book}
                </a>
              </p>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
