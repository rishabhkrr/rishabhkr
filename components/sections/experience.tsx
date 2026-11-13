import { experience } from '@/content/site';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { SceneLabel, SceneTitle } from '@/components/cinematic/scene-title';

const initials = (s: string) =>
  s
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

export function Experience() {
  return (
    <section id="experience" className="section border-y bg-muted/30">
      <div className="container">
        <BlurFade>
          <SceneLabel n="04">Experience</SceneLabel>
          <SceneTitle text="Two domains. One way of working." />
          <p className="section-lead">Fintech taught me rigour with money and data; ERP taught me how physical operations really run.</p>
        </BlurFade>

        <ol className="relative mt-12 space-y-4 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-px before:bg-border md:before:left-[31px]">
          {experience.map((job, i) => (
            <li key={job.id} className="relative">
              <BlurFade delay={i * 0.08} className="flex gap-4 md:gap-6">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border bg-background font-mono text-sm font-semibold md:h-16 md:w-16">
                  {initials(job.company)}
                </span>
                <div className="min-w-0 flex-1 rounded-2xl border bg-card p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-semibold tracking-tight">{job.company}</h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      {job.domain}
                      {job.period && <> · {job.period}</>}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {job.roles.map((r) => (
                      <Badge key={r} variant="secondary">
                        {r}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{job.summary}</p>

                  <Accordion type="single" collapsible defaultValue={i === 0 ? job.focus[0].title : undefined} className="mt-4">
                    {job.focus.map((f) => (
                      <AccordionItem key={f.title} value={f.title} className="last:border-b-0">
                        <AccordionTrigger>{f.title}</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {f.items.map((it) => (
                              <li key={it} className="flex gap-2.5 text-muted-foreground">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                                {it}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </BlurFade>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
