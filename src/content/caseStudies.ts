import { site } from './site';

export type Block = { heading?: string; items?: string[]; text?: string };
export type Tab = { label: string; items: string[] };

export type CaseStudy = {
  slug: string;
  kind: 'client' | 'own';
  org: string;
  title: string;
  tagline: string;
  cardStat: string;
  chips: string[]; // first 3 show on the home card
  meta: { role: string; timeline: string; status: string; stack: string[] };
  problem?: string;
  role?: string;
  builtHeading?: string;
  built?: string[];
  tabs?: Tab[];
  delivery?: string[];
  extra?: Block[]; // extra titled blocks after "What I built"
  decisions?: string[];
  extraAfterDecisions?: Block[];
  results?: { value: string; label: string }[];
  resultsHeading?: string;
  resultNotes?: string[];
  links?: { label: string; href: string }[];
  disclaimer?: string;
  /** hidden from routes, cards and sitemap when false */
  visible?: boolean;
};

const repoLink = (slug: string) =>
  site.privateRepoLinks[slug] ? [{ label: 'Source code', href: site.privateRepoLinks[slug] }] : [];

const allCaseStudies: CaseStudy[] = [
  {
    slug: 'cash-app-textract',
    kind: 'client',
    org: 'FIS Global · 2022–23',
    title: 'Cash App — legacy OCR to an AWS Textract pipeline',
    tagline: 'Rebuilt how a fintech platform reads remittance documents, with an audit trail behind every number.',
    cardStat: '75% data accuracy · 30% lower cost',
    chips: ['AWS Textract', 'S3', 'Oracle DB'],
    meta: {
      role: 'Product Owner',
      timeline: '2022–2023',
      status: 'Shipped to production',
      stack: ['AWS Textract', 'S3', 'microservices', 'Oracle DB', 'REST APIs'],
    },
    problem:
      'The Cash Application product depended on a legacy OCR engine to read remittance documents. Accuracy was low, costs were high, and finance teams had to correct extractions by hand before cash could be applied. In an audited financial process, every manual fix is also a compliance risk.',
    role: 'I owned the product end to end: discovery, the BRD and FSD, the backlog, UAT, system integration testing and the production release.',
    builtHeading: 'What we delivered',
    built: [
      'An event-driven microservice pipeline: **Textract → S3 → Oracle DB**',
      'Retry logic and data validation at every step, so a failed extraction never fails silently',
      'A full audit trail and stronger reconciliation controls, so every extracted value traces back to its source document',
      'A **zero-downtime production deployment**',
    ],
    decisions: [
      'Treat audit traceability as a requirement from day one, not a feature added later. In finance, an output nobody can trace is an output nobody can trust.',
    ],
    results: [
      { value: '75%', label: 'data accuracy' },
      { value: '30%', label: 'cost reduction' },
      { value: '25%', label: 'faster processing' },
    ],
  },
  {
    slug: 'ai-automatch',
    kind: 'client',
    org: 'FIS Global · 2023–25',
    title: 'AI AutoMatch — AI-driven remittance matching',
    tagline: 'Teaching a model to match payments to invoices, with rules auditors can check.',
    cardStat: '50% faster AR audit cycle',
    chips: ['AI/ML matching', 'Power BI', 'SQL'],
    meta: {
      role: 'Product Owner',
      timeline: '2023–2025',
      status: '6 release cycles shipped',
      stack: ['AI/ML matching', 'AWS', 'Oracle DB', 'Power BI', 'SQL'],
    },
    problem:
      'Matching incoming payments to open invoices was slow and relied on a third-party OCR provider. Every unmatched remittance meant manual work for accounts-receivable teams and a delay in closing the books.',
    role: 'I owned the AR audit and reconciliation product. I defined the audit validation rules, the AI/ML matching criteria, the KPIs and the training datasets, and led UAT and regression testing across six release cycles.',
    builtHeading: 'What we delivered',
    built: [
      'AI matching criteria paired with audit validation rules, so automated matches stay explainable',
      'Data-quality checks that make every extraction auditable and traceable to the source document',
      'Exception monitoring and audit KPIs in **Power BI** and SQL for executive reporting',
      'Root-cause analysis on the hard edge cases the model got wrong',
    ],
    decisions: [
      "Pair every AI match with a rule an auditor can read. An AI feature that can't explain itself doesn't survive a financial audit.",
    ],
    results: [
      { value: '50%', label: 'reduction in AR audit cycle time' },
      { value: '40–50%', label: 'accuracy uplift' },
    ],
    resultNotes: ['Removed the dependency on third-party OCR'],
  },
  {
    slug: 'manufacturing-erp',
    kind: 'client',
    org: 'Gemba Concepts · Dec 2025–present',
    title: 'Manufacturing ERP programme — garments, steel tubes and industrial inventory',
    tagline: 'Turning shop-floor knowledge into specs developers can build without guessing.',
    cardStat: `${site.garmentErpModuleCount} modules · 25,000+ lines of requirements`,
    chips: ['PostgreSQL', 'Angular', 'Power BI'],
    meta: {
      role: site.gembaTitle,
      timeline: 'Dec 2025–present',
      status: 'In delivery',
      stack: ['Angular', 'Java', 'MS SQL', 'PostgreSQL', 'Redis/BullMQ', 'AG Grid', 'React'],
    },
    problem:
      'In manufacturing, how the business really runs lives in the heads of warehouse supervisors and production planners, often explained in Hinglish voice notes and never written down. ERP projects fail when that knowledge gets lost between discovery and development.',
    role: "I lead requirements and product definition, from shop-floor workshops to developer-ready specs, UAT and sign-off. I'm the main link between the client's leadership, procurement, the warehouse and the development team.",
    builtHeading: 'What I delivered',
    tabs: [
      {
        label: 'Garment manufacturer',
        items: [
          `A **25,000+ line BRD/FRD/FSD suite across ${site.garmentErpModuleCount} modules**: OMS, WMS, Procurement, Production, BOM, SRM, CRM, Billing and Inventory, with an RTM, swimlane diagrams, use cases and a RACI`,
          'A **bin-level warehouse design**: 3 warehouses, 67 racks, 2,500+ bins, with the data model, seed data and traceability workflows for full inventory audit visibility',
          'A **QC & Compliance module**: quality-audit workflows, inspection checkpoints, compliance rules, audit-trail logic and change-log capture across Procurement, Production and Inbound QC',
          '**Master prompt documents** so developers can drive Cursor and Copilot agents straight from the spec, plus a React production-scheduling UI scaffold',
        ],
      },
      {
        label: 'Steel tubes & pipes manufacturer',
        items: [
          'A configurable **roles, permissions and multi-level approval workflow engine**: wireframes, PostgreSQL DDL, REST API contracts, Angular screen specs and a phased roadmap',
          'FRDs for the **Packaging, Dispatch and Production NCR** modules',
          'Gap analysis between QC FRD versions (v2 vs v3), As-Is / To-Be maps, an RTM update and UAT coordination, making QC workflows audit-ready across production and dispatch',
        ],
      },
      {
        label: 'Industrial client',
        items: ['An **Inventory & Purchase Order management** FRD'],
      },
    ],
    delivery: [
      'SIT, regression and UAT sign-off across 12 surfaces; **100+ defects** triaged through a bug-triage workflow',
      'Sprint planning, stand-ups, reviews and retros across **2 parallel ERP tracks**, tracking burn-down and velocity',
      'A 5-page **Power BI** manufacturing dashboard (star schema, DAX) for production visibility',
    ],
    decisions: [
      'Write requirements so AI coding agents can build from them directly. That keeps what developers build tied to what was signed off.',
    ],
    resultsHeading: 'By the numbers',
    results: [
      { value: site.garmentErpModuleCount, label: 'ERP modules specified' },
      { value: '25,000+', label: 'lines of requirements' },
      { value: '2,500+', label: 'warehouse bins mapped' },
      { value: '100+', label: 'defects triaged to UAT sign-off' },
    ],
  },
  {
    slug: 'quantdesk',
    kind: 'own',
    org: 'Personal product · 2026',
    title: 'QuantDesk — ML market intelligence for Indian F&O',
    tagline: "A trading decision-support system that is honest about how often it's wrong.",
    cardStat: '284 tests · 6/6 quality gates green',
    chips: ['Python', 'FastAPI', 'SQL Server'],
    meta: {
      role: 'Solo product + engineering',
      timeline: '2026',
      status: 'Phase 0 (foundation) complete',
      stack: ['Python', 'FastAPI', 'SQL Server', 'React'],
    },
    problem:
      "Retail F&O traders in India act on noise. Tools promise accuracy they can't prove, and deep historical options data doesn't exist to buy. Nobody published the option chain as it stood at 11:42 on 14 March 2021.",
    role: 'I wrote the two-volume specification (158 requirement IDs), made the architecture decisions (ADRs) and built Phase 0 myself.',
    builtHeading: 'What I built',
    built: [
      'A **snapshot collector** that captures 492 option strikes per cycle. It runs as a separate process, so an API bug can never stop data capture, and an import-linter contract enforces the isolation.',
      'A **Black-76 implied-volatility solver** with greeks',
      'A **risk manager with veto power** and a kill switch, built before any order can be placed (27 tests, with a negative-path test for every gate)',
      '**Auth with MFA** (32 security tests), AES-256-GCM envelope encryption for broker tokens, and an append-only audit log',
      'A **25-table SQL Server schema** with a decimal-only money layer: 10,000 round trips, zero drift',
      'A local **RAG memory over the spec** (181 chunks), so requirements are queried, not re-read',
    ],
    decisions: [
      'Replaced the goal of "100% accuracy" with *Sharpe ~1.5 at ≤12% max drawdown*. Any backtest showing a win rate above 75% is treated as a bug report.',
      'Built data capture first, before any model or UI. Every day without the collector is data that can never be recovered.',
      "Capped orders at 9 per second, below SEBI's limit of 10, as a database constraint rather than a code convention.",
    ],
    extra: [{ heading: 'Next', text: 'Broker adapters (Kite/Fyers), then the ML pipeline, backtester and UI (Phases 1–4).' }],
    resultsHeading: 'By the numbers',
    results: [
      { value: '284', label: 'tests' },
      { value: '6/6', label: 'quality gates green' },
      { value: '158', label: 'requirement IDs in the spec' },
      { value: '0', label: 'drift over 10,000 money round trips' },
    ],
    links: repoLink('quantdesk'),
    disclaimer: 'Personal project. Not investment advice.',
  },
  {
    slug: 'plm-dgp',
    kind: 'own',
    org: 'Personal product · 2026',
    title: 'PLM-DGP — Project Lifecycle & Delivery Governance Platform',
    tagline: 'Project health that is calculated, not chosen from a dropdown.',
    cardStat: '10 lifecycle stages · a stage gate at each',
    chips: ['React 19', 'FastAPI', 'SQL Server 2025'],
    meta: {
      role: 'Product owner + full-stack builder',
      timeline: '2026',
      status: 'M0 complete, M1 in progress',
      stack: ['React 19', 'FastAPI', 'SQL Server 2025 (VECTOR)', 'Ollama'],
    },
    problem:
      'Delivery teams report Green until the week before go-live. Requirements change silently after sign-off, and nobody can say who changed what, or why.',
    role: "I wrote the baseline specification from five years of living this problem as a BA and PO. I designed the ~92-table data model and I'm building it.",
    builtHeading: 'What makes it different',
    built: [
      '**Review Section:** every change to a baselined requirement records who changed it, who requested it, the module, a before/after diff and the phase. Edits outside a Change Request are refused.',
      '**Calculated RAG status:** Red/Amber/Green is computed from slippage, SPI, CPI, scope creep and risk scores. Overrides need a logged reason.',
      '**Blameless delay attribution:** delays map to a root-cause taxonomy, never to a person.',
      '**Integrated EVM:** timesheets → actual cost → CPI/SPI → portfolio dashboard, showing all four PMI EAC variants.',
      '**An AI copilot that acts safely:** RAG answers with citations, plus create/update actions behind confirm-before-commit, server-side permission checks and full audit logging.',
    ],
    decisions: [
      'The spec called for PostgreSQL, Redis, Celery, Keycloak, MinIO and vLLM. I replaced each with a local equivalent behind an interface, so the platform runs fully self-hosted. Each swap is recorded in an ADR, with the conditions for revisiting it.',
    ],
    extra: [
      {
        heading: 'Why it matters',
        text: "This is the tool I wish I'd had as a Product Owner. It shows I understand delivery governance, not just backlog grooming.",
      },
    ],
    resultsHeading: 'By the numbers',
    results: [
      { value: '10', label: 'lifecycle stages, a stage gate at each' },
      { value: '~92', label: 'tables in the data model' },
      { value: '4', label: 'PMI EAC variants on the portfolio dashboard' },
    ],
    links: repoLink('plm-dgp'),
  },
  {
    slug: 'job-search-copilot',
    kind: 'own',
    org: 'Personal product · 2026',
    title: 'Job Search Copilot — an AI job-search assistant that plays by the rules',
    tagline: 'An assistant that helps you apply, and refuses to apply for you.',
    cardStat: 'Rebuilt from scratch for compliance',
    chips: ['FastAPI', 'React + TypeScript', 'Ollama'],
    meta: {
      role: 'Product owner + builder (and its first user)',
      timeline: '2026',
      status: 'In build',
      stack: ['FastAPI', 'React + TypeScript', 'SQL Server', 'Ollama'],
    },
    problem:
      "Job hunting while employed leaves no time. Auto-apply bots break LinkedIn's and Naukri's terms and send out low-quality applications in bulk.",
    builtHeading: 'What it does',
    extra: [
      {
        text: 'Collects jobs from compliant sources, scores each one against your résumé, tailors the résumé per job and tracks every application. You submit every application yourself.',
      },
    ],
    decisions: [
      "The first version auto-applied. On 23 Oct 2026 I removed that feature, because it violated the platforms' terms. I rebuilt the product with written ground rules, a requirements document, ADRs, and dependency and risk registers. Most portfolios show what someone built. This one shows a Product Owner deciding *not* to ship a feature.",
    ],
    extraAfterDecisions: [{ heading: 'Roadmap', text: 'E1 intake → E2 scoring → E3 tailoring → E4 tracker' }],
    links: repoLink('job-search-copilot'),
  },
  {
    slug: 'agileflow',
    kind: 'own',
    org: 'Requirements-first case study',
    title: 'AgileFlow — enterprise ALM platform',
    tagline: 'One work-management tool for five delivery methodologies.',
    cardStat: '5 delivery methodologies',
    chips: ['Java', 'Spring Boot', 'BRD/FRD'],
    meta: { role: 'Product owner', timeline: '', status: 'Specification', stack: ['Java', 'Spring Boot'] },
    extra: [
      {
        text: 'A requirements-first case study: how I specify a product before a line of code is written. AgileFlow supports Scrum, Kanban, Waterfall, Hybrid and Support/Maintenance on a Java Spring Boot backend. This page shows the BRD/FRD outline, the database schema, the API catalogue and the screen inventory.',
      },
    ],
    visible: site.agileflowIsMyOwnProject === true,
  },
];

export const caseStudies = allCaseStudies.filter((c) => c.visible !== false);

export const workCopy = {
  heading: 'Selected work',
  intro: 'Real outcomes from client and employer work, followed by products I build myself.',
  clientLabel: 'Client work',
  ownLabel: 'Own product',
};
