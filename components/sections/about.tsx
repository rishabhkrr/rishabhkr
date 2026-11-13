import { Boxes, ClipboardList, Compass, Database, Landmark, Users, Workflow } from 'lucide-react';
import { profile } from '@/content/site';
import { BlurFade } from '@/components/magicui/blur-fade';
import { TextReveal } from '@/components/magicui/text-reveal';

const expertise = [
  { icon: ClipboardList, title: 'Business analysis', text: 'BRDs, FRDs, process maps and gap analysis engineers can build from.' },
  { icon: Compass, title: 'Product ownership', text: 'Roadmaps, backlogs and sprint goals tied to measurable outcomes.' },
  { icon: Landmark, title: 'Fintech domain', text: 'Accounts Receivable, Cash Application and remittance processing.' },
  { icon: Boxes, title: 'ERP / WMS', text: 'Order, warehouse, procurement and production systems end to end.' },
  { icon: Database, title: 'Technology & data', text: 'SQL, Python, Power BI and cloud services like AWS Textract.' },
  { icon: Users, title: 'Stakeholder management', text: 'Aligning business, operations, engineering and AI/ML teams.' },
  { icon: Workflow, title: 'Process automation', text: 'Removing manual effort where it measurably improves throughput.' },
];

export function About({ portrait }: { portrait?: string }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <BlurFade>
          <p className="section-label">About</p>
        </BlurFade>
        <TextReveal
          className="mt-6 max-w-5xl text-3xl font-semibold leading-[1.15] tracking-tighter md:text-5xl"
          text="I turn complex operations — cash application, warehouse flows, production lines — into products teams can ship and operators actually use."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <BlurFade className="lg:col-span-4">
            <div className="flex items-center gap-4">
              {portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={portrait} alt={`Portrait of ${profile.name}`} className="h-16 w-16 rounded-full border object-cover" loading="lazy" />
              ) : (
                <span className="flex h-16 w-16 items-center justify-center rounded-full border bg-muted font-mono text-lg font-semibold">RK</span>
              )}
              <div>
                <p className="font-semibold">{profile.name}</p>
                <p className="text-sm text-muted-foreground">{profile.location}</p>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-muted-foreground">
              {profile.summary.map((p) => (
                <p key={p} className="text-pretty leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Target roles</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {profile.targetRoles.map((r) => (
                  <li key={r} className="rounded-full border px-2.5 py-1 text-xs">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>

          <div role="list" className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {expertise.map(({ icon: Icon, title, text }, i) => (
              <BlurFade key={title} delay={i * 0.04} className={i === expertise.length - 1 ? 'sm:col-span-2' : ''}>
                <div role="listitem" className="group h-full rounded-xl border bg-card p-5 transition-colors hover:bg-accent/50">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 font-medium">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
