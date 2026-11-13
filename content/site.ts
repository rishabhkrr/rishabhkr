/**
 * Central, editable profile content.
 *
 * Facts here were confirmed by Rishabh or taken from his resume (Nov 2026).
 * Leave a value `undefined` to hide it — the UI never renders placeholders
 * for missing facts.
 */

export const profile = {
  name: 'Rishabh Kumar',
  initials: 'RK',
  title: 'Product-Focused Business Analyst & Product Owner',
  headline: 'Product-Focused Business Analyst & Product Owner.',
  tagline: 'Building scalable products at the intersection of business, finance & technology.',
  supporting:
    'Bridging business, finance and technology to build scalable, data-driven products across Fintech, ERP/WMS and AI-powered automation.',
  summary: [
    'Business Analyst and Product Owner with 5+ years of experience bridging business strategy, technology and product delivery.',
    'Experienced in Fintech, Accounts Receivable, Cash Application, ERP, WMS, business process optimisation and AI-driven automation.',
    'Passionate about building scalable, data-driven products that improve operational efficiency and business outcomes.',
  ],
  location: 'Bangalore, India',
  workModes: ['Remote', 'Hybrid', 'Pan India'],
  availability: 'Open to new opportunities',
  targetRoles: [
    'Senior Business Analyst',
    'Product Owner',
    'Product Analyst',
    'Product Manager',
    'Technical Product Manager',
    'ERP / WMS Product Owner',
  ],
};

export const links = {
  // Confirmed by Rishabh (Nov 2026); matches the resume.
  email: 'imrishabhkr14@gmail.com' as string | undefined,
  // Confirmed by Rishabh (Nov 2026).
  linkedin: 'https://www.linkedin.com/in/rishabh-kumar-ba2099193/' as string | undefined,
  github: 'https://github.com/rishabhkrr' as string | undefined,
  /** Drop a PDF at public/resume.pdf — the download buttons appear automatically. */
  resumePath: '/resume.pdf',
};

/** Public site URL, used for canonical/OG/sitemap. Override with NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://rishabhkrr.github.io/rishabhkr').replace(/\/$/, '');

export type MetricKind = 'profile' | 'delivered' | 'target';

export type Metric = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  kind: MetricKind;
  context?: string;
  /** Optional upper bound for ranges, e.g. 40–50% */
  valueTo?: number;
};

// Figures from Rishabh's resume (Nov 2026).
export const metrics: Metric[] = [
  { value: 5, suffix: '+', label: 'Years of experience', kind: 'profile' },
  { value: 20, suffix: '+', label: 'Projects delivered', kind: 'profile' },
  { value: 3, suffix: '', label: 'Certifications completed', kind: 'profile', context: 'AI Product Management in progress' },
  { value: 75, suffix: '%', label: 'Data accuracy', kind: 'delivered', context: 'Cash App Relaunch · AWS Textract' },
  { value: 30, suffix: '%', label: 'Cost reduction', kind: 'delivered', context: 'Cash App Relaunch' },
  { value: 25, suffix: '%', label: 'Faster processing', kind: 'delivered', context: 'Cash App Relaunch' },
  { value: 50, suffix: '%', label: 'AR audit cycle time reduction', kind: 'delivered', context: 'AI AutoMatch' },
  { value: 35, suffix: '%', label: 'Sprint velocity improvement', kind: 'delivered', context: 'FIS Global' },
];

export type Experience = {
  id: string;
  company: string;
  domain: string;
  roles: string[];
  /** Hidden while undefined. */
  period?: string;
  summary: string;
  focus: { title: string; items: string[] }[];
};

export const experience: Experience[] = [
  {
    id: 'gemba',
    company: 'Gemba Concepts',
    domain: 'Manufacturing ERP · Bengaluru',
    roles: ['Product Owner', 'Business Analyst'],
    period: 'Dec 2025 — Present',
    summary:
      'Owning requirements and delivery for manufacturing ERP products — from business process workshops and as-is / to-be mapping through UAT sign-off — as the primary liaison between client leadership, procurement, warehouse and development.',
    focus: [
      {
        title: 'Requirements & ownership',
        items: [
          'Led requirements elicitation across 12+ ERP modules',
          'Authored a 25,000+ line BRD / FRD / FSD suite with RTM, swimlanes, use cases and RACI',
          'Maintained the product backlog in JIRA with MoSCoW prioritisation',
        ],
      },
      {
        title: 'Modules designed',
        items: [
          'QC & Compliance: audit workflows, inspection checkpoints, audit-trail logic across Procurement, Production and Inbound QC',
          'Bin-level WMS: 3 warehouses, 67 racks, 2,500+ bins with full inventory traceability',
          'Material Tracking System: traceability workflows and validation rules',
        ],
      },
      {
        title: 'Quality & delivery',
        items: [
          'Test plans, SIT, regression and UAT sign-off across 12 surfaces; triaged 100+ defects',
          'Sprint planning, reviews and retrospectives across 2 parallel ERP tracks',
          'Root cause analysis and change requests for complex mid-sprint incidents',
        ],
      },
    ],
  },
  {
    id: 'fis',
    company: 'FIS Global',
    domain: 'Fintech · Accounts Receivable · Pune / Remote',
    roles: ['Product Owner'],
    period: 'Jun 2021 — Sep 2025',
    summary:
      'Product Owner for Cash Application and Accounts Receivable — leading the AWS Textract relaunch of remittance capture and the AI AutoMatch remittance module, from discovery to zero-downtime production releases.',
    focus: [
      {
        title: 'Products',
        items: [
          'Cash App relaunch: legacy OCR → event-driven AWS Textract pipeline (75% data accuracy, 30% cost reduction, 25% faster processing)',
          'AI AutoMatch: AI/ML matching with audit validation rules (50% reduction in AR audit cycle time)',
          'Power BI and SQL exception monitoring for audit KPIs and executive reporting',
        ],
      },
      {
        title: 'Controls & quality',
        items: [
          'Internal control and data-quality requirements for auditable, source-traceable outputs',
          'UAT execution and regression testing across 6 release cycles',
          'Root cause analysis on complex matching edge cases',
        ],
      },
      {
        title: 'Agile delivery',
        items: [
          'Backlog grooming, story points, definition of done, OKR alignment and release planning',
          'Improved sprint velocity by 35%, partnering with the Scrum Master on ceremonies',
          'Product analytics with A/B testing, Mixpanel and Amplitude',
        ],
      },
    ],
  },
];

export type SkillGroup = { id: string; title: string; icon: string; blurb: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    id: 'product',
    title: 'Product Management',
    icon: 'compass',
    blurb: 'Shaping what gets built, why, and in what order.',
    skills: ['Product Ownership', 'Product Strategy', 'Roadmapping', 'Backlog Management', 'Sprint Planning', 'Agile / Scrum', 'Stakeholder Management'],
  },
  {
    id: 'analysis',
    title: 'Business Analysis',
    icon: 'clipboard',
    blurb: 'Turning ambiguous operations into precise requirements.',
    skills: ['BRD', 'FRD', 'Requirement Gathering', 'Process Mapping', 'Gap Analysis', 'UAT', 'Business Process Improvement'],
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    icon: 'chart',
    blurb: 'Grounding decisions in numbers stakeholders trust.',
    skills: ['Advanced SQL', 'Python', 'Power BI', 'Excel', 'Reporting', 'Data Analysis'],
  },
  {
    id: 'tech',
    title: 'Technology',
    icon: 'cpu',
    blurb: 'Fluent enough to design with engineers, not just for them.',
    skills: ['AWS Textract', 'Amazon S3', 'CloudWatch', 'Postman', 'Oracle DB', 'Microservices', 'Angular', 'Java Spring Boot'],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Systems',
    icon: 'boxes',
    blurb: 'End-to-end operational systems, from order to ledger.',
    skills: ['ERP', 'WMS', 'OMS', 'Procurement', 'Inventory', 'Production', 'Finance / AR'],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    icon: 'sparkles',
    blurb: 'Applying AI where it measurably removes manual work.',
    skills: ['AI/ML Collaboration', 'GenAI Fundamentals', 'Intelligent Automation', 'Process Automation', 'AI Product Development'],
  },
];

export type Certification = {
  name: string;
  provider?: string;
  status: 'completed' | 'in-progress';
  /** Only add real credential URLs. Hidden while undefined. */
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  { name: 'SAFe® 5 Product Owner / Product Manager', provider: 'Scaled Agile', status: 'completed' },
  { name: 'Google Project Management Certificate', provider: 'Google · Coursera', status: 'completed' },
  { name: 'Google Data Analytics Certificate', provider: 'Google · Coursera', status: 'completed' },
  { name: 'AI Product Management', status: 'in-progress' },
];

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  /** Set true and add a URL once the article is live. Drafts are never linked. */
  published: boolean;
  href?: string;
};

export const insights: Insight[] = [
  { slug: 'product-ownership-in-fintech', topic: 'Product', title: 'Product Ownership in Fintech', excerpt: 'Balancing regulatory constraints, legacy systems and user value when owning a financial product backlog.', published: true },
  { slug: 'ai-in-accounts-receivable', topic: 'AI', title: 'AI in Accounts Receivable', excerpt: 'Where machine learning genuinely helps cash application — and where rules still win.', published: true },
  { slug: 'erp-implementation-field-notes', topic: 'ERP', title: 'ERP Implementation: Field Notes', excerpt: 'What shop-floor reality teaches you that a requirements template never will.', published: true },
  { slug: 'wms-process-automation', topic: 'WMS', title: 'WMS Process Automation', excerpt: 'From GRN to picklist: finding the automation wins hiding in warehouse workflows.', published: true },
  { slug: 'sql-for-business-analysts', topic: 'Data', title: 'SQL for Business Analysts', excerpt: 'The handful of query patterns that make a BA self-sufficient with data.', published: true },
  { slug: 'building-data-driven-products', topic: 'Product', title: 'Building Data-Driven Products', excerpt: 'Instrumenting decisions, not just dashboards.', published: true },
];

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const;
