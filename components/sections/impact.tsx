'use client';

import { motion } from 'framer-motion';
import { Award, Briefcase, CheckCircle2, FileText, Layers, ScanLine, Sparkles, Target, Receipt } from 'lucide-react';
import { metrics } from '@/content/site';
import { BlurFade } from '@/components/magicui/blur-fade';
import { BorderBeam } from '@/components/magicui/border-beam';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BeamFlow } from '@/components/magicui/animated-beam';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const m = (label: string) => metrics.find((x) => x.label === label)!;

function Tile({ className, children, delay = 0 }: { className?: string; children: React.ReactNode; delay?: number }) {
  return (
    <BlurFade delay={delay} className={cn('relative overflow-hidden rounded-2xl border bg-card p-4 sm:p-6', className)}>
      {children}
    </BlurFade>
  );
}

function Delivered({ compact = false }: { compact?: boolean }) {
  return (
    <Badge variant="success" aria-label="Delivered">
      <CheckCircle2 className="h-3 w-3" /> <span className={compact ? 'hidden sm:inline' : ''}>Delivered</span>
    </Badge>
  );
}

function Bars() {
  const data = [28, 34, 31, 42, 47, 55, 61, 68, 75];
  return (
    <div className="flex h-28 items-end gap-1.5" aria-hidden>
      {data.map((h, i) => (
        <motion.div
          key={i}
          className={cn('flex-1 rounded-t-md', i === data.length - 1 ? 'bg-foreground' : 'bg-foreground/15')}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

export function Impact() {
  const capture = m('Remittance capture accuracy');
  const cost = m('Operational cost reduction');
  const matching = m('Matching automation improvement');
  const years = m('Years of experience');
  const projects = m('Projects delivered');
  const certs = m('Certifications completed');
  const tat = m('Turnaround time reduction');

  return (
    <section id="impact" aria-labelledby="impact-title" className="section pt-8 md:pt-12">
      <div className="container">
        <BlurFade className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="section-label">Impact</p>
            <h2 id="impact-title" className="section-title">
              Outcomes, not just output.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success" /> Delivered — reported results
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-warning" /> Target — goal for ongoing work
            </span>
          </div>
        </BlurFade>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          {/* Hero metric */}
          <Tile className="col-span-2 md:col-span-4 md:row-span-2">
            <BorderBeam size={220} duration={14} />
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ScanLine className="h-4 w-4" /> Cash App Relaunch · AWS Textract
              </div>
              <Delivered />
            </div>
            <p className="mt-6 text-6xl font-semibold tracking-tighter md:text-7xl">
              <NumberTicker value={capture.value} suffix="%" />
            </p>
            <p className="mt-1 text-muted-foreground">remittance capture accuracy</p>
            <div className="mt-8">
              <Bars />
              <p className="mt-2 text-right font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Illustrative trend</p>
            </div>
          </Tile>

          <Tile className="md:col-span-2" delay={0.05}>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <p className="mt-5 text-4xl font-semibold tracking-tighter sm:mt-6 sm:text-5xl">
              <NumberTicker value={years.value} suffix="+" />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">years across Fintech, ERP &amp; WMS</p>
          </Tile>

          <Tile className="md:col-span-2" delay={0.1}>
            <Layers className="h-5 w-5 text-muted-foreground" />
            <p className="mt-5 text-4xl font-semibold tracking-tighter sm:mt-6 sm:text-5xl">
              <NumberTicker value={projects.value} suffix="+" />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">projects delivered</p>
          </Tile>

          <Tile className="md:col-span-3" delay={0.05}>
            <div className="flex items-center justify-between">
              <Receipt className="h-5 w-5 text-muted-foreground" />
              <Delivered compact />
            </div>
            <p className="mt-5 text-4xl font-semibold tracking-tighter sm:mt-6 sm:text-5xl">
              <NumberTicker value={cost.value} suffix="%" />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">operational cost reduction</p>
          </Tile>

          <Tile className="md:col-span-3" delay={0.1}>
            <div className="flex items-center justify-between">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <Delivered compact />
            </div>
            <p className="mt-5 text-4xl font-semibold tracking-tighter sm:mt-6 sm:text-5xl">
              <NumberTicker value={matching.value} suffix="%" />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">matching automation improvement</p>
          </Tile>

          <Tile className="col-span-2 md:col-span-4" delay={0.05}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4" /> AI AutoMatch · ongoing
              </div>
              <Badge variant="warning">
                <Target className="h-3 w-3" /> Target
              </Badge>
            </div>
            <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-1">
              <p className="text-5xl font-semibold tracking-tighter">
                <NumberTicker value={tat.value} valueTo={tat.valueTo} suffix="%" />
              </p>
              <p className="pb-1.5 text-sm text-muted-foreground">reduction in turnaround time</p>
            </div>
            <BeamFlow
              className="mt-8"
              nodes={[
                { icon: <FileText />, label: 'Remittance' },
                { icon: <Sparkles />, label: 'AI extraction' },
                { icon: <Layers />, label: 'Smart match' },
                { icon: <CheckCircle2 />, label: 'Auto-post' },
              ]}
            />
          </Tile>

          <Tile className="col-span-2 md:col-span-2" delay={0.1}>
            <Award className="h-5 w-5 text-muted-foreground" />
            <p className="mt-5 text-4xl font-semibold tracking-tighter sm:mt-6 sm:text-5xl">
              <NumberTicker value={certs.value} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">certifications completed</p>
            <p className="mt-0.5 text-xs text-muted-foreground/80">{certs.context}</p>
          </Tile>
        </div>
      </div>
    </section>
  );
}
