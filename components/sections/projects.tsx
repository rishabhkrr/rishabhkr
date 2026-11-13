'use client';

import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, Github, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { caseStudies, type CaseStudy, type Outcome } from '@/content/case-studies';
import { projects as builds } from '@/content/projects';
import { useLenis } from '@/components/animations/SmoothScroll';
import { BlurFade } from '@/components/magicui/blur-fade';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ProjectVisual } from './project-visual';

const spans = ['md:col-span-4', 'md:col-span-2', 'md:col-span-3', 'md:col-span-3'];

function StatusBadge({ status }: { status: CaseStudy['status'] }) {
  return status === 'Ongoing' ? <Badge variant="warning">Ongoing</Badge> : <Badge variant="secondary">{status}</Badge>;
}

function OutcomeCard({ o }: { o: Outcome }) {
  return (
    <li className="rounded-xl border bg-card p-4">
      {o.kind === 'delivered' && (
        <Badge variant="success">
          <CheckCircle2 className="h-3 w-3" /> Delivered
        </Badge>
      )}
      {o.kind === 'target' && (
        <Badge variant="warning">
          <Target className="h-3 w-3" /> Target
        </Badge>
      )}
      {o.kind === 'qualitative' && <Badge variant="outline">Outcome</Badge>}
      {o.value && <p className="mt-3 text-3xl font-semibold tracking-tighter">{o.value}</p>}
      <p className={cn('text-sm text-muted-foreground', !o.value && 'mt-3')}>{o.label}</p>
    </li>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
          {it}
        </li>
      ))}
    </ul>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{title}</h4>
      {children}
    </div>
  );
}

function CaseStudyBody({ s }: { s: CaseStudy }) {
  return (
    <Tabs defaultValue="overview" key={s.id}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="role">My role</TabsTrigger>
        <TabsTrigger value="solution">Solution</TabsTrigger>
        <TabsTrigger value="impact">Impact</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <p className="leading-relaxed">{s.overview}</p>
        <Block title="Business problem">
          <p className="text-sm leading-relaxed text-muted-foreground">{s.problem}</p>
        </Block>
        {s.existingProcess && (
          <Block title="Existing process">
            <ol className="grid gap-2 sm:grid-cols-2">
              {s.existingProcess.map((p, i) => (
                <li key={p} className="flex gap-2.5 rounded-lg border p-3 text-sm">
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  {p}
                </li>
              ))}
            </ol>
          </Block>
        )}
        <Block title="Objectives">
          <List items={s.objectives} />
        </Block>
      </TabsContent>

      <TabsContent value="role" className="space-y-6">
        <Block title="Responsibilities">
          <List items={s.responsibilities} />
        </Block>
        <Block title="Requirements & approach">
          <List items={s.approach} />
        </Block>
      </TabsContent>

      <TabsContent value="solution" className="space-y-6">
        {s.modules ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {s.modules.map((m) => (
              <div key={m.name} className="rounded-xl border p-4">
                <p className="text-sm font-medium">{m.name}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {m.items.map((it) => (
                    <li key={it}>
                      <Badge variant="outline" className="font-normal">
                        {it}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <Block title="Solution">
            <List items={s.solution} />
          </Block>
        )}
        {s.architecture && (
          <Block title="System flow (simplified)">
            <ol className="flex flex-wrap items-center gap-y-2">
              {s.architecture.map((step, i) => (
                <li key={step} className="flex items-center">
                  <span className="rounded-md border bg-muted/50 px-2.5 py-1.5 text-xs font-medium">{step}</span>
                  {i < s.architecture!.length - 1 && <ArrowRight aria-hidden className="mx-1 h-3.5 w-3.5 text-muted-foreground" />}
                </li>
              ))}
            </ol>
          </Block>
        )}
        <Block title="Stack">
          <div className="flex flex-wrap gap-1.5">
            {s.stack.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        </Block>
      </TabsContent>

      <TabsContent value="impact" className="space-y-6">
        <ul className="grid gap-3 sm:grid-cols-2">
          {s.outcomes.map((o) => (
            <OutcomeCard key={o.label} o={o} />
          ))}
        </ul>
        {s.outcomes.some((o) => o.kind === 'target') && <p className="text-xs text-muted-foreground">Targets are goals for ongoing work, not reported results.</p>}
        <Block title="Lessons learned">
          <List items={s.learnings} />
        </Block>
      </TabsContent>
    </Tabs>
  );
}

export function Projects() {
  const lenis = useLenis();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const study = openIdx === null ? null : caseStudies[openIdx];
  const publicBuilds = builds.filter((b) => b.github && !b.isPrivate);
  const shownBuilds = showAll ? publicBuilds : publicBuilds.slice(0, 6);

  // Pause smooth scrolling while the dialog owns scroll.
  useEffect(() => {
    if (study) lenis?.stop();
    else lenis?.start();
  }, [study, lenis]);

  const step = (dir: 1 | -1) => setOpenIdx((i) => (i === null ? i : (i + dir + caseStudies.length) % caseStudies.length));

  return (
    <section id="projects" className="section">
      <div className="container">
        <BlurFade>
          <p className="section-label">Featured work</p>
          <h2 className="section-title">Products shaped end to end.</h2>
          <p className="section-lead">Four case studies across fintech, AI, enterprise systems and analytics. Open any card for the full story.</p>
        </BlurFade>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
          {caseStudies.map((s, i) => {
            const headline = s.outcomes.filter((o) => o.value).slice(0, 2);
            return (
              <BlurFade key={s.id} delay={i * 0.06} className={spans[i]}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(i)}
                  aria-haspopup="dialog"
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-card text-left transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {i === 0 && <BorderBeam size={200} duration={16} />}
                  <div className="h-52 border-b md:h-60">
                    <ProjectVisual kind={s.visual} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {s.index} · {s.domain}
                      </span>
                      <StatusBadge status={s.status} />
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 text-pretty text-sm text-muted-foreground">{s.tagline}</p>
                    {headline.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                        {headline.map((o) => (
                          <div key={o.label}>
                            <p className="text-2xl font-semibold tracking-tighter">
                              {o.value}
                              {o.kind === 'target' && <span className="ml-1.5 align-middle text-[10px] font-medium uppercase tracking-wider text-warning">target</span>}
                            </p>
                            <p className="max-w-[18ch] text-xs text-muted-foreground">{o.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium">
                      Read case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </button>
              </BlurFade>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Visuals are conceptual illustrations. No client names, proprietary data or production screenshots are shown.</p>

        {/* Side builds */}
        <BlurFade className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="section-label">Side builds</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">Hands-on technical range</h3>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">Personal projects that keep my technical judgement sharp when designing with engineers.</p>
          </div>
        </BlurFade>
        <ul id="side-builds" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shownBuilds.map((b) => (
            <li key={b.id}>
              <a
                href={b.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border bg-card p-4 transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-medium">{b.title}</span>
                  <Github className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </span>
                <span className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{b.description}</span>
                <span className="mt-auto pt-3 font-mono text-[11px] text-muted-foreground">{b.stack.slice(0, 3).join(' · ')}</span>
                <span className="sr-only">(opens GitHub in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        {publicBuilds.length > 6 && (
          <Button variant="ghost" size="sm" className="mt-4" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll} aria-controls="side-builds">
            {showAll ? 'Show fewer' : `Show all ${publicBuilds.length} builds`}
            <ChevronDown className={cn('transition-transform', showAll && 'rotate-180')} />
          </Button>
        )}
      </div>

      <Dialog open={!!study} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <DialogContent className="max-h-[90svh] gap-0 overflow-hidden p-0">
          {study && (
            <div className="flex max-h-[90svh] flex-col">
              <div className="border-b p-6 pr-14">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    Case study {study.index} · {study.domain}
                  </span>
                  <StatusBadge status={study.status} />
                </div>
                <DialogTitle className="mt-2">{study.title}</DialogTitle>
                <DialogDescription className="mt-1">{study.tagline}</DialogDescription>
              </div>
              <div data-lenis-prevent className="overflow-y-auto overscroll-contain p-6">
                <CaseStudyBody s={study} />
              </div>
              <div className="flex items-center justify-between border-t px-6 py-3">
                <Button variant="ghost" size="sm" onClick={() => step(-1)} aria-label="Previous case study">
                  <ArrowLeft /> Previous
                </Button>
                <span className="font-mono text-xs text-muted-foreground">
                  {(openIdx ?? 0) + 1} / {caseStudies.length}
                </span>
                <Button variant="ghost" size="sm" onClick={() => step(1)} aria-label="Next case study">
                  Next <ArrowRight />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
