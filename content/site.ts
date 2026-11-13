/**
 * Central, editable profile content.
 *
 * Anything marked `VERIFY` came from older public material (the 2020 portfolio
 * in this repo's history) or from the brief, and should be confirmed before
 * going live. Leave a value `undefined` to hide it — the UI never renders
 * placeholders for missing facts.
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
  // VERIFY: taken from the 2020 portfolio. Replace with your current professional address.
  email: 'rishabh.kumar140298@gmail.com' as string | undefined,
  // VERIFY: taken from the 2020 portfolio.
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

export const metrics: Metric[] = [
  { value: 5, suffix: '+', label: 'Years of experience', kind: 'profile' },
  { value: 20, suffix: '+', label: 'Projects delivered', kind: 'profile' },
  { value: 2, suffix: '', label: 'Certifications completed', kind: 'profile', context: '2 more in progress' },
  { value: 75, suffix: '%', label: 'Remittance capture accuracy', kind: 'delivered', context: 'Cash App Relaunch' },
  { value: 30, suffix: '%', label: 'Operational cost reduction', kind: 'delivered', context: 'Cash App Relaunch' },
  { value: 25, suffix: '%', label: 'Matching automation improvement', kind: 'delivered', context: 'Cash App Relaunch' },
  { value: 40, valueTo: 50, suffix: '%', label: 'Turnaround time reduction', kind: 'target', context: 'AI AutoMatch — ongoing' },
];

export type Experience = {
  id: string;
  company: string;
  domain: string;
  roles: string[];
  /** VERIFY: add exact dates from your resume, e.g. 'Mar 2022 — Present'. Hidden while undefined. */
  period?: string;
  summary: string;
  focus: { title: string; items: string[] }[];
};

export const experience: Experience[] = [
  {
    id: 'fis',
    company: 'FIS Global',
    domain: 'Fintech · Accounts Receivable',
    roles: ['Business Analyst', 'Product Owner', 'Scrum Master'],
    summary:
      'Owned requirements and delivery for the Accounts Receivable cash module — from remittance capture through cash application — working across business stakeholders, engineering and AI/ML teams.',
    focus: [
      {
        title: 'Product & domain',
        items: [
          'Accounts Receivable domain and the Cash module',
          'Cash Application and remittance processing',
          'Exception handling workflows',
        ],
      },
      {
        title: 'Delivery',
        items: [
          'Product roadmap and requirement management',
          'Agile delivery as Product Owner and Scrum Master',
          'Stakeholder collaboration across business and engineering',
        ],
      },
      {
        title: 'Transformation',
        items: [
          'Migration of remittance capture to AWS Textract OCR',
          'Automation improvements in remittance-to-invoice matching',
          'Collaboration with AI/ML teams on intelligent remittance capture',
        ],
      },
    ],
  },
  {
    id: 'gemba',
    company: 'Gemba Concepts',
    domain: 'Enterprise Software · ERP',
    roles: ['Business Analyst', 'ERP Product Professional'],
    summary:
      'Drove ERP implementation for manufacturing clients across order, warehouse, procurement and production modules — translating shop-floor operations into system requirements.',
    focus: [
      {
        title: 'Modules',
        items: ['ERP implementation', 'OMS and WMS', 'Procurement, production and inventory management'],
      },
      {
        title: 'Analysis',
        items: ['Business process mapping', 'Requirements gathering', 'Gap analysis against client operations'],
      },
      {
        title: 'Client delivery',
        items: ['Client coordination', 'System enhancements', 'Implementation and rollout support'],
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
  { name: 'SAFe Product Owner / Product Manager', provider: 'Scaled Agile, Inc.', status: 'completed' },
  { name: 'Google Data Analytics Professional Certificate', provider: 'Google', status: 'completed' },
  { name: 'AI Product Management', status: 'in-progress' },
  { name: 'Project Management', status: 'in-progress' },
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
  { slug: 'product-ownership-in-fintech', topic: 'Product', title: 'Product Ownership in Fintech', excerpt: 'Balancing regulatory constraints, legacy systems and user value when owning a financial product backlog.', published: false },
  { slug: 'ai-in-accounts-receivable', topic: 'AI', title: 'AI in Accounts Receivable', excerpt: 'Where machine learning genuinely helps cash application — and where rules still win.', published: false },
  { slug: 'erp-implementation-field-notes', topic: 'ERP', title: 'ERP Implementation: Field Notes', excerpt: 'What shop-floor reality teaches you that a requirements template never will.', published: false },
  { slug: 'wms-process-automation', topic: 'WMS', title: 'WMS Process Automation', excerpt: 'From GRN to picklist: finding the automation wins hiding in warehouse workflows.', published: false },
  { slug: 'sql-for-business-analysts', topic: 'Data', title: 'SQL for Business Analysts', excerpt: 'The handful of query patterns that make a BA self-sufficient with data.', published: false },
  { slug: 'building-data-driven-products', topic: 'Product', title: 'Building Data-Driven Products', excerpt: 'Instrumenting decisions, not just dashboards.', published: false },
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
