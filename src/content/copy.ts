/**
 * Section copy for the home page and extra pages, verbatim from PORTFOLIO_CONTENT.md.
 * `**bold**` and `*italic*` markers are rendered by <Rich>.
 */

export const nav = {
  logo: 'Rishabh Kumar',
  links: [
    { label: 'Services', href: '#services', freelanceOnly: true },
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  resume: 'Résumé',
  hire: 'Hire me',
};

export const hero = {
  eyebrow: 'Product Owner · Business Analyst · Builder — Bengaluru, India',
  headline: 'I write the spec. Then I ship it.',
  subline:
    "I'm Rishabh, a Product Owner and Business Analyst with 5+ years in fintech and manufacturing ERP. I turn messy business problems into clear requirements, data models and working software. Teams hire me to own their product. Businesses and founders hire me to take an idea from a conversation to a first working version.",
  rotatingPrefix: 'I build…',
  rotating: ['requirements', 'data models', 'APIs', 'dashboards', 'AI copilots'],
  primary: 'Start a project',
  secondary: 'See my work',
  resumeLink: 'Download résumé',
  badgeFreelance: 'Available for freelance projects',
  badgeRoles: 'Open to Data & AI Product Owner roles',
};

export type Stat = { value: string; label: string };
export const proof: { primary: Stat[]; secondary: Stat[] } = {
  primary: [
    { value: '5+', label: 'years in fintech & manufacturing ERP' },
    { value: '75%', label: 'data accuracy uplift on a fintech cash-application platform' },
    { value: '50%', label: 'faster accounts-receivable audit cycle' },
    { value: '30%', label: 'processing cost reduction after an AWS migration' },
  ],
  secondary: [
    { value: '12+', label: 'ERP modules specified' },
    { value: '2,500+', label: 'warehouse bins mapped in a WMS design' },
    { value: '35%', label: 'sprint velocity improvement' },
    { value: '100+', label: 'defects triaged to UAT sign-off' },
  ],
};

export const domains = {
  label: "Industries I've worked in",
  chips: [
    'Fintech & BFSI',
    'Accounts Receivable & Cash Application',
    'Manufacturing ERP',
    'Garments',
    'Steel tubes & pipes',
    'Warehouse & inventory',
    'Procurement & QC',
    'Capital markets (F&O)',
  ],
  employers: ['FIS Global', 'Gemba Concepts', 'Tata Motors (internship)'],
};

export const about = {
  heading: 'The bridge between "what we need" and "what we built"',
  body: [
    'I grew up in **Jamshedpur, Jharkhand**, and moved to Pune to study Computer Engineering. In college I built because it was fun: a space shooter in Pygame, a voice assistant, a tour-booking site in PHP, and a desktop app that pushed live COVID-19 case counts during the 2020 lockdown. My first taste of enterprise software was an IT internship at **Tata Motors**.',
    "Then I joined **FIS Global**, and moved from writing code to owning products. As Product Owner for Cash Application and Accounts Receivable, I learned the lesson that shaped my career: most delivery failures aren't coding failures. They're requirements failures. A rule nobody wrote down. An edge case nobody asked about. A field two teams defined differently.",
    'Today at **Gemba Concepts** I lead business analysis for manufacturing ERPs: garments, steel tubes and pipes, and industrial inventory. I sit with warehouse supervisors and production planners, often over Hinglish voice notes, and turn what they say into FRDs, database schemas, API contracts and UI specs that developers can build without guessing.',
    'Outside work I still build my own products end to end, to stay sharp and test ideas properly. That includes a market-intelligence platform whose risk manager can veto every trade, and a delivery-governance platform where project health is calculated rather than picked from a dropdown.',
    "I'm moving toward **Data and AI products**, where knowing how the model, the data and the business rules fit together matters most. And I take on freelance projects where a business needs someone who can define the problem *and* build the first version.",
  ],
  facts: [
    ['Based in', 'Bengaluru, India'],
    ['Currently', '{gembaTitle}, Gemba Concepts'],
    ['Previously', 'Product Owner, FIS Global (4+ years)'],
    ['Domains', 'Fintech & AR, manufacturing ERP, capital markets'],
    ['Certified', 'SAFe® 5 POPM · Google Project Management · Google Data Analytics'],
    ['Languages', 'English, Hindi (Hinglish welcome)'],
    ['Works with', 'Clients in India and worldwide, remote-first'],
  ] as [string, string][],
  beyondHeading: "When I'm not writing specs",
  beyond: [
    { emoji: '✈️', title: 'Travelling.', text: 'I love switching places, and a new city resets how I see problems.' },
    { emoji: '✏️', title: 'Sketching.', text: "Mostly anime characters, a habit I've kept since I was a teenager." },
    { emoji: '📷', title: 'Photography.', text: '' },
    { emoji: '🏏', title: 'Cricket and volleyball', text: ', and the occasional video-game night.' },
    { emoji: '🩸', title: 'Volunteering.', text: "I've volunteered at blood-donation camps." },
  ],
};

export const process = {
  heading: 'How I work',
  intro: "The same process whether you're a client, an employer or my own side project.",
  steps: [
    { title: 'Discover.', text: 'I sit with the people who do the work: the shop floor, the finance desk, or voice notes in Hinglish if that\'s how they talk.' },
    { title: 'Define.', text: 'I write the BRD and FRD, the edge cases and the acceptance criteria. Nothing is "obvious".' },
    { title: 'Model.', text: 'I design the data model and API contracts before anyone builds a screen.' },
    { title: 'Prototype.', text: 'I build a working UI or proof of concept, so feedback comes from something people can click.' },
    { title: 'Deliver.', text: 'Backlog, sprints and UAT, with a change request for every change to the baseline.' },
    { title: 'Measure.', text: 'After go-live I check the outcomes and feed what I learn into the next release.' },
  ],
  principles: [
    { title: "Calculate, don't declare.", text: 'Status, risk and progress come from data, not opinion.', see: [{ label: 'PLM-DGP', slug: 'plm-dgp' }] },
    { title: 'Decide in writing.', text: 'Every significant trade-off gets an ADR or a decision log, so the reasoning outlives the meeting.', see: [{ label: 'QuantDesk', slug: 'quantdesk' }] },
    { title: 'Build the guardrail first.', text: 'Audit trails before features, and the risk manager before the trading engine.', see: [{ label: 'Cash App', slug: 'cash-app-textract' }, { label: 'QuantDesk', slug: 'quantdesk' }] },
    { title: 'Say no on purpose.', text: "I'd rather cut a feature than ship one that breaks a rule or a user's trust.", see: [{ label: 'Job Search Copilot', slug: 'job-search-copilot' }] },
  ],
  clientHeading: 'What working with me looks like',
  clientSteps: [
    { title: 'Free 30-minute call.', text: 'You explain the problem, and I tell you honestly whether I can help.' },
    { title: 'Proposal within 48 hours.', text: 'Scope, deliverables, timeline and price, in writing.' },
    { title: 'Kick-off.', text: 'Discovery sessions with your team, in English or Hindi.' },
    { title: 'Weekly updates.', text: "A short written update every week, with a demo where there's something to show." },
    { title: 'Handover.', text: 'Every document, diagram and line of code is yours, explained so your team can carry it forward.' },
  ],
};

/** Artefact cards. A card shows only if its PDF exists in public/artefacts/. */
export const artefacts = {
  heading: 'See the work, not just the claims',
  intro: 'Redacted samples of what I deliver. Most portfolios show screens. This shows the thinking behind them.',
  button: 'Preview PDF',
  items: [
    { title: 'Sample FRD (one module)', source: 'Manufacturing ERP', file: 'sample-frd.pdf' },
    { title: 'Approval workflow diagram + DDL excerpt', source: 'Steel ERP', file: 'approval-workflow-ddl.pdf' },
    { title: 'User stories + acceptance criteria', source: 'Any project', file: 'user-stories.pdf' },
    { title: 'Architecture Decision Record (ADR)', source: 'QuantDesk or PLM-DGP', file: 'adr.pdf' },
    { title: 'Power BI dashboard', source: 'Manufacturing dashboard', file: 'power-bi-dashboard.pdf' },
    { title: 'Requirements traceability matrix', source: 'PLM-DGP spec', file: 'rtm.pdf' },
    { title: 'Warehouse bin-layout data model', source: 'WMS design', file: 'wms-bin-model.pdf' },
  ],
};

export const testimonialsCopy = { heading: 'What people say' };

export const contact = {
  heading: "Let's build something that ships.",
  body: 'Got a messy problem and need someone who can define it *and* build the first version? Or hiring a Product Owner who speaks both business and engineering? Write to me. I reply within 48 hours.',
  paths: {
    project: { emoji: '💼', title: 'I have a project.', text: 'Freelance, consulting or a retainer.' },
    hiring: { emoji: '🧑‍💼', title: "I'm hiring.", text: 'Product Owner, Senior BA or Data/AI PO roles.' },
  },
  reasons: ['Project', 'Hiring', 'Something else'],
  submit: 'Send message',
  resume: 'Download résumé (PDF)',
  bookPrefix: 'Prefer to talk?',
  book: 'Book a free 30-minute call',
};

export const footer = {
  line1: 'Rishabh Kumar · Product Owner · Business Analyst · Builder',
  line2: 'Bengaluru, India · Working with clients worldwide',
  credit: 'Designed and built by Rishabh Kumar · © 2026',
};

export const pages = {
  resume: {
    heading: 'Résumé',
    body: 'The one-page version. For the full story, see the case studies.',
    download: 'Download PDF',
  },
  now: {
    heading: "What I'm doing now",
    lines: [
      'At work: manufacturing ERP delivery at Gemba Concepts.',
      'Building: QuantDesk Phase 1 (broker adapters) and PLM-DGP M1.',
      'Learning: LLM evaluation and RAG system design.',
    ],
  },
  notFound: {
    heading: 'This requirement was descoped.',
    body: "The page you're looking for didn't make it past UAT.",
    button: 'Back to home',
  },
};

export const seo = {
  title: 'Rishabh Kumar — Product Owner, Business Analyst & ERP Consultant',
  description:
    'Product Owner and Business Analyst with 5+ years in fintech and manufacturing ERP. I write specs, design data models and build the first version. Available for freelance projects. Based in Bengaluru.',
  keywords: [
    'Product Owner',
    'Business Analyst',
    'freelance business analyst',
    'ERP consultant',
    'manufacturing ERP',
    'BRD FRD writer',
    'Power BI consultant',
    'fractional Product Owner',
    'SAFe POPM',
    'fintech',
    'AI product owner',
  ],
  ogHeadline: 'I write the spec. Then I ship it.',
};
