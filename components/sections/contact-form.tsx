'use client';

import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { links } from '@/content/site';
import { PREFILL_EVENT } from '@/lib/contact';
import { Lottie } from '@/components/animations/Lottie';
import { Button } from '@/components/ui/button';
import { Input, Label, Textarea } from '@/components/ui/input';

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

export function ContactForm() {
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
