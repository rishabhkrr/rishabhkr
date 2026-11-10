'use client';

import { useEffect, useId, useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { clsx } from 'clsx';
import { contact } from '@/content/copy';
import { site } from '@/content/site';

type Path = 'project' | 'hiring';
type Status = { kind: 'idle' | 'sending' | 'sent' | 'mailto' | 'error'; msg?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const uid = useId();
  const [path, setPath] = useState<Path>('project');
  const [reason, setReason] = useState('Project');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const showBudget = path === 'project' && site.budgetRanges.length > 0;

  // Links elsewhere on the page (e.g. hero "Start a project") can preselect a path.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>('[data-reason]');
      if (a?.dataset.reason) choose(a.dataset.reason === 'Hiring' ? 'hiring' : 'project');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  function choose(p: Path) {
    setPath(p);
    setReason(p === 'hiring' ? 'Hiring' : 'Project');
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const v = (k: string) => String(data.get(k) || '').trim();

    if (v('website')) return setStatus({ kind: 'sent' }); // honeypot: pretend success for bots

    const next: Record<string, string> = {};
    if (!v('name')) next.name = 'Please tell me your name.';
    if (!EMAIL_RE.test(v('email'))) next.email = 'Please enter a valid email address.';
    if (v('message').length < 10) next.message = 'A sentence or two about what you need, please.';
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    const subject = `[Portfolio] ${reason}${v('company') ? ` — ${v('company')}` : ''} — from ${v('name')}`;
    const lines = [
      `Name: ${v('name')}`,
      `Email: ${v('email')}`,
      v('company') ? `Company: ${v('company')}` : false,
      `About: ${reason}`,
      showBudget && v('budget') ? `Budget: ${v('budget')}` : false,
      '',
      v('message'),
    ].filter((l): l is string => typeof l === 'string');

    if (!site.contactFormKey) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      setStatus({ kind: 'mailto' });
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const isWeb3 = site.contactFormProvider === 'web3forms';
      const res = await fetch(isWeb3 ? 'https://api.web3forms.com/submit' : `https://formspree.io/f/${site.contactFormKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...(isWeb3 ? { access_key: site.contactFormKey, from_name: 'Portfolio contact form' } : {}),
          subject,
          name: v('name'),
          email: v('email'),
          company: v('company'),
          reason,
          budget: showBudget ? v('budget') : '',
          message: v('message'),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus({ kind: 'sent' });
    } catch {
      setStatus({ kind: 'error', msg: `Something went wrong sending that. Please email me directly at ${site.email}.` });
    }
  }

  const field = 'mt-1.5 block w-full rounded-xl border bg-bg px-4 py-3 text-base text-fg placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30';
  const err = (k: string) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-400">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: string) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${uid}-${k}-err` } : {});

  if (status.kind === 'sent') {
    return (
      <div role="status" className="flex flex-col items-start gap-3 py-6">
        <CheckCircle2 className="h-8 w-8 text-ok" aria-hidden />
        <p className="font-display text-xl font-semibold">Thanks — message received.</p>
        <p className="text-muted">I reply within 48 hours.</p>
        <button type="button" className="link text-sm" onClick={() => setStatus({ kind: 'idle' })}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-status`}>
      <fieldset>
        <legend className="sr-only">What brings you here?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(['project', 'hiring'] as Path[]).map((p) => {
            const c = contact.paths[p];
            return (
              <label
                key={p}
                className={clsx(
                  'flex cursor-pointer gap-3 rounded-xl border p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent',
                  path === p ? 'border-accent bg-accent/10' : 'border-line hover:border-accent/40',
                )}
              >
                <input type="radio" name="path" value={p} checked={path === p} onChange={() => choose(p)} className="sr-only" />
                <span className="text-xl" aria-hidden>
                  {c.emoji}
                </span>
                <span>
                  <span className="block font-semibold text-fg">{c.title}</span>
                  <span className="block text-sm text-muted">{c.text}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="text-sm font-semibold text-fg">Name</label>
          <input id={`${uid}-name`} name="name" autoComplete="name" required className={clsx(field, errors.name ? 'border-red-500' : 'border-line')} {...aria('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="text-sm font-semibold text-fg">Email</label>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" required className={clsx(field, errors.email ? 'border-red-500' : 'border-line')} {...aria('email')} />
          {err('email')}
        </div>
        <div>
          <label htmlFor={`${uid}-company`} className="text-sm font-semibold text-fg">
            Company <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={`${uid}-company`} name="company" autoComplete="organization" className={clsx(field, 'border-line')} />
        </div>
        <div>
          <label htmlFor={`${uid}-reason`} className="text-sm font-semibold text-fg">{"I'm reaching out about"}</label>
          <select
            id={`${uid}-reason`}
            name="reason"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (e.target.value === 'Project') setPath('project');
              if (e.target.value === 'Hiring') setPath('hiring');
            }}
            className={clsx(field, 'border-line')}
          >
            {contact.reasons.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        {showBudget ? (
          <div className="sm:col-span-2">
            <label htmlFor={`${uid}-budget`} className="text-sm font-semibold text-fg">Budget range</label>
            <select id={`${uid}-budget`} name="budget" className={clsx(field, 'border-line')} defaultValue="">
              <option value="" disabled>
                Choose a range
              </option>
              {site.budgetRanges.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className="text-sm font-semibold text-fg">Message</label>
          <textarea id={`${uid}-message`} name="message" rows={5} required className={clsx(field, 'resize-y', errors.message ? 'border-red-500' : 'border-line')} {...aria('message')} />
          {err('message')}
        </div>
        {/* Honeypot: hidden from people, tempting to bots */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={status.kind === 'sending'}>
          {status.kind === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
          {contact.submit}
        </button>
        {!site.contactFormKey ? <p className="text-xs text-muted">Opens your email app with the message ready to send.</p> : null}
      </div>

      <div id={`${uid}-status`} aria-live="polite" className="mt-4 text-sm">
        {status.kind === 'error' ? (
          <p className="flex items-start gap-2 font-medium text-red-600 dark:text-red-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {status.msg}
          </p>
        ) : null}
        {status.kind === 'mailto' ? (
          <p className="flex items-start gap-2 text-muted">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-hidden />
            <span>
              Your email app should have opened with the message filled in. If it didn&apos;t, write to{' '}
              <a className="link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </span>
          </p>
        ) : null}
      </div>
    </form>
  );
}
