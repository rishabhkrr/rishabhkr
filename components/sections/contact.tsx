import { ArrowUpRight, Github, Linkedin, Mail, MapPin, PenLine } from 'lucide-react';
import { insights, links, profile } from '@/content/site';
import { getArticle } from '@/content/articles';
import { asset } from '@/lib/contact';
import { Lottie } from '@/components/animations/Lottie';
import { BlurFade } from '@/components/magicui/blur-fade';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { Badge } from '@/components/ui/badge';
import { Logo } from './navbar';
import { ContactForm } from './contact-form';
import { ResumeButton } from './hero';
import { SceneLabel, SceneTitle } from '@/components/cinematic/scene-title';

/* ───────────────────────── Insights ───────────────────────── */

export function Insights() {
  return (
    <section id="insights" className="section border-t">
      <div className="container">
        <BlurFade>
          <SceneLabel n="08">Insights</SceneLabel>
          <SceneTitle text="Notes from the product floor." />
          <p className="section-lead">
            Writing on product ownership, fintech, ERP and data.
            {insights.some((i) => !i.published) && ' Items marked Draft are still in progress.'}
          </p>
        </BlurFade>
        <BlurFade>
        <ul className="mt-10 divide-y border-y">
          {insights.map((post, i) => {
            // Published posts link to an external URL or to the on-site article page.
            const href = post.published ? post.href ?? (getArticle(post.slug) ? asset(`/insights/${post.slug}`) : undefined) : undefined;
            const external = !!href?.startsWith('http');
            const live = !!href;
            const inner = (
              <>
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0">
                  <span className="block font-medium">{post.title}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{post.excerpt}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Badge variant="outline" className="hidden sm:inline-flex">
                    {post.topic}
                  </Badge>
                  {live ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <Badge variant="secondary">
                      <PenLine className="h-3 w-3" /> Draft
                    </Badge>
                  )}
                </span>
              </>
            );
            const cls = 'grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5';
            return (
                <li key={post.slug}>
                  {live ? (
                    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`${cls} transition-colors hover:bg-accent/40`}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cls} aria-label={`${post.title} (unpublished draft)`}>
                      {inner}
                    </div>
                  )}
                </li>
            );
          })}
        </ul>
        </BlurFade>
      </div>
    </section>
  );
}

/* ───────────────────────── Contact section ───────────────────────── */

export function Contact({ hasResume }: { hasResume: boolean }) {
  const channels = [
    links.email && { icon: Mail, label: 'Email', value: links.email, href: `mailto:${links.email}`, external: false },
    links.linkedin && { icon: Linkedin, label: 'LinkedIn', value: 'Connect on LinkedIn', href: links.linkedin, external: true },
    links.github && { icon: Github, label: 'GitHub', value: links.github.replace('https://', ''), href: links.github, external: true },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string; external: boolean }[];

  return (
    <section id="contact" className="section">
      <div className="container">
        <BlurFade>
          <div className="relative overflow-hidden rounded-3xl border bg-card">
            <DotPattern className="[mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />
            <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-5 lg:gap-14 lg:p-14">
              <div className="lg:col-span-2">
                <Lottie src="/lottie/connect.json" className="-ml-2 h-14 w-14" />
                <div className="mt-4"><SceneLabel n="09">Contact</SceneLabel></div>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tighter md:text-4xl">Let&apos;s build something impactful together.</h2>
                <p className="mt-4 text-pretty text-muted-foreground">
                  Hiring for a Business Analyst, Product Owner or Product Manager role in fintech, ERP/WMS or AI-driven products? I&apos;d like to hear about it.
                </p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {profile.location} · {profile.workModes.join(' / ')}
                </p>
                <ul className="mt-8 grid gap-2">
                  {channels.map(({ icon: Icon, label, value, href, external }) => (
                    <li key={label}>
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex items-center gap-3 rounded-xl border bg-background/60 p-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs text-muted-foreground">{label}</span>
                          <span className="block truncate text-sm font-medium">{value}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        {external && <span className="sr-only">(opens in new tab)</span>}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <ResumeButton hasResume={hasResume} size="default" />
                </div>
              </div>
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t py-8" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <Logo />
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex gap-4">
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              LinkedIn
            </a>
          )}
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              GitHub
            </a>
          )}
          <a href="#home" className="hover:text-foreground">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
