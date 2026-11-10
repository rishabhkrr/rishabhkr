import { Award, ExternalLink, GraduationCap, Sparkles } from 'lucide-react';
import { certifications, credentialsCopy, education, recognition } from '@/content/credentials';
import { Rich } from '@/components/Rich';
import { SectionHeader } from '@/components/ui';

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-title" className="section">
      <div className="container-site">
        <SectionHeader id="credentials-title" eyebrow="Qualifications" title={credentialsCopy.heading} />

        <h3 className="sr-only">{credentialsCopy.certsHeading}</h3>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c) => (
            <li key={c.name} className={`reveal card flex flex-col p-6 ${c.featured ? '' : 'bg-surface-2/60'}`}>
              <Award className={`h-6 w-6 ${c.featured ? 'text-accent' : 'text-muted'}`} aria-hidden />
              <p className="mt-4 font-display font-semibold leading-snug text-fg">{c.name}</p>
              <p className="mt-1 text-sm text-muted">
                {c.issuer}
                {c.year ? ` · ${c.year}` : ''}
              </p>
              {c.verify ? (
                <a href={c.verify} target="_blank" rel="noopener noreferrer" className="link mt-auto inline-flex min-h-[44px] items-center gap-1 pt-3 text-sm">
                  {credentialsCopy.verify} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  <span className="sr-only">: {c.name}</span>
                </a>
              ) : null}
            </li>
          ))}
        </ul>

        <p className="reveal mt-6 flex items-start gap-2 text-muted">
          <Sparkles className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <span>
            <strong className="font-semibold text-fg">{credentialsCopy.learningLabel}:</strong> {credentialsCopy.learning}
          </span>
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="reveal">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
              <GraduationCap className="h-5 w-5 text-accent" aria-hidden /> {credentialsCopy.educationHeading}
            </h3>
            <ul className="mt-5 space-y-5">
              {education.map((e) => (
                <li key={e.degree} className="border-l-2 border-line pl-5">
                  <p className="font-semibold text-fg">{e.degree}</p>
                  <p className="text-muted">
                    {e.school} · <span className="tabular-nums">{e.years}</span>
                    {e.score ? (
                      <>
                        {' · '}
                        <strong className="num font-semibold">{e.score}</strong>
                      </>
                    ) : null}
                  </p>
                  {e.note ? <p className="mt-1 text-sm text-muted">{e.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <h3 className="font-display text-xl font-semibold">{credentialsCopy.recognitionHeading}</h3>
            <ul className="mt-5 space-y-2 text-muted">
              {recognition.map((r) => (
                <li key={r}>
                  <Rich text={r} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
