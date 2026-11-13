import { Check, FileText, ScanLine, Sparkles } from 'lucide-react';
import type { CaseStudy } from '@/content/case-studies';
import { DotPattern } from '@/components/magicui/dot-pattern';

/** Conceptual mini-UIs per case study — generic, no client data, labelled as illustrations. */
export function ProjectVisual({ kind, size = 'md' }: { kind: CaseStudy['visual']; size?: 'md' | 'lg' }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted/40 p-6">
      <DotPattern className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" gap={16} />
      <div className={`relative w-full max-w-sm transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02] ${size === 'lg' ? 'origin-center scale-110 lg:scale-[1.3]' : ''}`}>
        {kind === 'ocr' && <Ocr />}
        {kind === 'ai' && <Ai />}
        {kind === 'erp' && <Erp />}
        {kind === 'dashboard' && <Dash />}
      </div>
      <span className="absolute bottom-2.5 right-3 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70">Illustration</span>
    </div>
  );
}

const Panel = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border bg-background p-3 shadow-sm ${className}`}>{children}</div>
);
const Line = ({ w }: { w: string }) => <div className="h-1.5 rounded-full bg-foreground/10" style={{ width: w }} />;

function Ocr() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <Panel>
        <p className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
          <FileText className="h-3 w-3" /> Remittance
        </p>
        <div className="mt-2.5 space-y-2">
          <div className="rounded border border-foreground/30 p-0.5"><Line w="80%" /></div>
          <Line w="60%" />
          <div className="rounded border border-foreground/30 p-0.5"><Line w="70%" /></div>
        </div>
      </Panel>
      <ScanLine className="h-4 w-4 text-muted-foreground" />
      <Panel>
        <p className="text-[10px] font-medium text-muted-foreground">Invoices</p>
        <ul className="mt-2 space-y-1.5">
          {[1, 1, 0, 1].map((ok, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span className={`flex h-3 w-3 items-center justify-center rounded-full ${ok ? 'bg-success text-background' : 'border border-warning'}`}>
                {ok ? <Check className="h-2 w-2" strokeWidth={4} /> : null}
              </span>
              <Line w="100%" />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function Ai() {
  const rows = [
    { w: 88, ok: true },
    { w: 76, ok: true },
    { w: 41, ok: false },
  ];
  return (
    <Panel className="p-4">
      <p className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
        <Sparkles className="h-3 w-3" /> Match confidence
      </p>
      <div className="mt-3 space-y-2.5">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
              <div className={`h-full rounded-full ${r.ok ? 'bg-foreground' : 'bg-warning'}`} style={{ width: `${r.w}%` }} />
            </div>
            <span className={`w-14 text-right text-[10px] font-medium ${r.ok ? 'text-success' : 'text-warning'}`}>{r.ok ? 'Auto-post' : 'Review'}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Erp() {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {['Orders', 'Warehouse', 'Procurement', 'Production'].map((m) => (
          <Panel key={m} className="px-3 py-2.5">
            <p className="flex items-center gap-1.5 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
              {m}
            </p>
          </Panel>
        ))}
      </div>
      <div className="flex items-center gap-1">
        {['Cut', 'Stitch', 'Wash', 'Finish', 'QC'].map((s) => (
          <span key={s} className="flex-1 rounded-full border bg-background py-1 text-center font-mono text-[9px] uppercase text-muted-foreground">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function Dash() {
  const line = 'M0,44 C20,40 30,28 50,30 S80,16 100,20 S130,6 160,10';
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-1.5">
        {['Cash', 'Profit', 'AR', 'AP'].map((k) => (
          <Panel key={k} className="p-2">
            <p className="text-[9px] text-muted-foreground">{k}</p>
            <div className="mt-1 h-1.5 w-3/4 rounded-full bg-foreground/70" />
          </Panel>
        ))}
      </div>
      <Panel className="p-2.5">
        <p className="text-[9px] text-muted-foreground">Sales trend</p>
        <svg viewBox="0 0 160 50" className="mt-1 h-14 w-full" aria-hidden>
          <path d={`${line} L160,50 L0,50 Z`} className="fill-foreground/[0.07]" />
          <path d={line} fill="none" strokeWidth="1.8" className="stroke-foreground" />
        </svg>
      </Panel>
    </div>
  );
}
