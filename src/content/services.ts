export type Service = {
  icon: 'FileText' | 'Factory' | 'KanbanSquare' | 'BarChart3' | 'Sparkles';
  title: string;
  body: string;
  youGet: string[];
  goodFor: string;
};

export const servicesCopy = {
  heading: 'How I can help',
  intro:
    "Most projects don't fail because of bad code. They fail because a rule nobody wrote down, an edge case nobody asked about, or a field two teams defined differently. I fix that part, and when you need it, I build the first version too.",
  engagementHeading: 'Engagement models',
  underTable: "Not sure which fits? Book a free 30-minute call. I'll tell you honestly whether I'm the right person.",
  button: 'Book a free call',
  noPrice: 'Quote after a free call',
};

export const services: Service[] = [
  {
    icon: 'FileText',
    title: 'Requirements & product documentation',
    body: 'You have an idea, a process or a dev team, but no clear spec. I run discovery with the people who do the work and turn it into documents developers can build from without guessing.',
    youGet: [
      'BRD, FRD/FSD or PRD',
      'user stories with acceptance criteria',
      'process flows (As-Is / To-Be)',
      'requirements traceability matrix',
      'data model',
    ],
    goodFor: 'founders before hiring developers, agencies starting a new client build, teams rescuing a stalled project',
  },
  {
    icon: 'Factory',
    title: 'ERP & operations consulting',
    body: "Manufacturing knowledge lives in people's heads. I get it onto paper and into the system: orders, warehouse, procurement, production, quality and compliance.",
    youGet: [
      'module-by-module ERP specifications',
      'warehouse/bin design',
      'QC & audit-trail workflows',
      'approval and permission design',
      'UAT plans',
    ],
    goodFor: 'manufacturers moving off Excel, ERP vendors that need a domain BA, businesses replacing a legacy system',
  },
  {
    icon: 'KanbanSquare',
    title: 'Product Owner on demand',
    body: "A part-time Product Owner for teams that need one but aren't ready to hire full time. I own the backlog, run the ceremonies and get releases through UAT.",
    youGet: [
      'a prioritised backlog',
      'sprint planning, reviews and retros',
      'release plans',
      'UAT coordination and sign-off',
      'weekly stakeholder reporting',
    ],
    goodFor: 'startups with developers but no PO, agencies running several client builds',
  },
  {
    icon: 'BarChart3',
    title: 'Dashboards & data',
    body: 'Your data should answer business questions without anyone waiting on IT. I design the model first, then the dashboard.',
    youGet: [
      'Power BI dashboards (star schema, DAX)',
      'SQL analysis',
      'KPI definitions',
      'data validation and reconciliation checks',
    ],
    goodFor: 'owners and managers who want production, sales or finance visibility',
  },
  {
    icon: 'Sparkles',
    title: 'MVPs, prototypes & AI features',
    body: 'I prototype what I specify, so feedback comes from something people can click, not a PDF.',
    youGet: [
      'a working React + FastAPI prototype',
      'REST API design',
      'AI features such as document extraction, RAG search over your documents, or an LLM assistant with guardrails',
    ],
    goodFor: 'founders validating an idea, teams that want to test an AI feature before committing to it',
  },
];

/** `price` is filled from site.ts when showPricing is on; otherwise "Quote after a free call". */
export const engagementModels = [
  { model: 'Fixed-scope project', bestFor: 'A defined deliverable: a spec, a dashboard, a prototype', priceKey: 'priceProjectFrom', priceLabel: (p: string) => `From ${p} per project` },
  { model: 'Monthly retainer', bestFor: 'Product Owner on demand, ongoing ERP support', priceKey: 'priceRetainerFrom', priceLabel: (p: string) => `From ${p} per month` },
  { model: 'Hourly consulting', bestFor: 'Reviews, workshops, second opinions', priceKey: 'priceHourly', priceLabel: (p: string) => `${p} per hour` },
] as const;
