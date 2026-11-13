'use client';

import { AlertCircle, ArrowRight, ArrowUpRight, Github, Linkedin, Loader2, Mail, MapPin, PenLine } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { insights, links, profile } from '@/content/site';
import { getArticle } from '@/content/articles';
import { asset } from '@/lib/contact';
import { PREFILL_EVENT } from '@/lib/contact';
import { Lottie } from '@/components/animations/Lottie';
import { BlurFade } from '@/components/magicui/blur-fade';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input, Label, Textarea } from '@/components/ui/input';
import { Logo } from './navbar';
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

/* ───────────────────────── Contact form ───────────────────────── */

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.subject.trim().length < 3) e.subject = 'Please add a short subject.';
  if (f.message.trim().length < 20) e.message = 'Please write at least 20 characters.';
  if (f.message.length > 5000) e.message = 'Please keep the message under 5,000 characters.';
  return e;
}

function ContactForm() {
  const empty: Fields = { name: '', email: '', subject: '', message: '' };
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      setFields((f) => ({ ...f, subject: (e as CustomEvent<string>).detail }));
      window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 900);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const bind = (k: keyof Fields) => ({
    id: `contact-${k}`,
    name: k,
    value: fields[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...fields, [k]: e.target.value };
      setFields(next);
      if (touched[k]) setErrors(validate(next));
    },
    onBlur: () => {
      setTouched((t) => ({ ...t, [k]: true }));
      setErrors(validate(fields));
    },
    'aria-invalid': !!(touched[k] && errors[k]),
    'aria-describedby': touched[k] && errors[k] ? `contact-${k}-error` : undefined,
  });

  // The message slot always reserves its height, so errors appearing on blur never shift
  // the submit button out from under the pointer mid-click.
  const err = (k: keyof Fields) => {
    const msg = touched[k] ? errors[k] : undefined;
    return (
      <p id={msg ? `contact-${k}-error` : undefined} className="flex min-h-4 items-center gap-1 text-xs leading-4 text-destructive">
        {msg && (
          <>
            <AlertCircle className="h-3.5 w-3.5" /> {msg}
          </>
        )}
      </p>
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if ((form.elements.namedItem('company') as HTMLInputElement | null)?.value) return; // honeypot
    const errs = validate(fields);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus('sending');
    setFeedback('');

    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('success');
        setFeedback("Thanks — your message is on its way. I'll reply soon.");
        setFields(empty);
        setTouched({});
      } catch {
        setStatus('error');
        setFeedback(links.email ? `Something went wrong. Please try again, or email ${links.email}.` : 'Something went wrong. Please try again shortly.');
      }
      return;
    }
    if (!links.email) {
      setStatus('error');
      setFeedback('The contact form is not configured yet. Please reach out on LinkedIn instead.');
      return;
    }
    const body = `${fields.message}\n\n— ${fields.name} (${fields.email})`;
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(body)}`;
    setStatus('success');
    setFeedback(`Your email app should open with the message ready to send. If it didn't, email ${links.email} directly.`);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-3" aria-describedby="contact-form-note">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input ref={nameRef} type="text" autoComplete="name" placeholder="Your name" {...bind('name')} />
          {err('name')}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" {...bind('email')} />
          {err('email')}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input type="text" placeholder="Role, project or question" {...bind('subject')} />
        {err('subject')}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea rows={5} placeholder="Tell me a little about it…" {...bind('message')} />
        {err('message')}
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="text-xs text-muted-foreground">
          {FORMSPREE_ID ? 'Sent securely via Formspree.' : 'Opens your email app with the message ready to send.'}
        </p>
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <Loader2 className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight />
            </>
          )}
        </Button>
      </div>
      <div aria-live="polite">
        {(status === 'success' || status === 'error') && feedback && (
          <div
            role={status === 'error' ? 'alert' : 'status'}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm ${status === 'success' ? 'border-success/30 bg-success/10' : 'border-destructive/30 bg-destructive/10 text-destructive'}`}
          >
            {status === 'success' ? <Lottie src="/lottie/success-check.json" trigger="mount" className="h-6 w-6 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
            <p>{feedback}</p>
          </div>
        )}
      </div>
    </form>
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
