import { BarChart3, Boxes, ClipboardList, Compass, Cpu, Sparkles, type LucideIcon } from 'lucide-react';
import { certifications, skillGroups } from '@/content/site';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck, Hourglass, ArrowUpRight } from 'lucide-react';

const icons: Record<string, LucideIcon> = { compass: Compass, clipboard: ClipboardList, chart: BarChart3, cpu: Cpu, boxes: Boxes, sparkles: Sparkles };

export function Skills() {
  return (
    <section id="skills" className="section border-y bg-muted/30">
      <div className="container">
        <BlurFade>
          <p className="section-label">Skills &amp; expertise</p>
          <h2 className="section-title">A connected skill set.</h2>
          <p className="section-lead">Product, analysis, data, technology, enterprise systems and AI — used together. No vanity percentages.</p>
        </BlurFade>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon];
            return (
              <BlurFade key={g.id} delay={i * 0.05}>
                <div className="h-full rounded-2xl border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-semibold tracking-tight">{g.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{g.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {g.skills.map((s) => (
                      <li key={s}>
                        <Badge variant="outline" className="font-normal text-foreground/80">
                          {s}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <BlurFade>
          <p className="section-label">Certifications</p>
          <h2 className="section-title">Credentials, and what&apos;s next.</h2>
        </BlurFade>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => {
            const done = c.status === 'completed';
            return (
              <BlurFade key={c.name} delay={i * 0.05}>
                <div className={`flex h-full flex-col rounded-2xl border p-6 ${done ? 'bg-card' : 'border-dashed'}`}>
                  <div className="flex items-center justify-between">
                    {done ? <BadgeCheck className="h-5 w-5" /> : <Hourglass className="h-5 w-5 text-muted-foreground" />}
                    {done ? <Badge variant="success">Completed</Badge> : <Badge variant="outline">In progress</Badge>}
                  </div>
                  <h3 className="mt-6 font-semibold leading-snug tracking-tight">{c.name}</h3>
                  {c.provider && <p className="mt-1 text-sm text-muted-foreground">{c.provider}</p>}
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium hover:underline">
                      View credential <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
