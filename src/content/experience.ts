import { site } from './site';

export type Role = {
  title: string;
  company: string;
  place: string;
  dates: string;
  summary: string;
  bullets: string[];
  chips: string[];
};

export const experienceCopy = { heading: 'Experience', showMore: 'Show more', showLess: 'Show less' };

export const experience: Role[] = [
  {
    title: site.gembaTitle,
    company: 'Gemba Concepts Pvt. Ltd.',
    place: 'Bengaluru',
    dates: 'Dec 2025 – Present',
    summary:
      'I lead requirements and product definition for manufacturing ERP implementations, from shop-floor discovery to developer-ready specs and UAT sign-off.',
    bullets: [
      `Led requirements elicitation across **${site.garmentErpModuleCount} ERP modules**. I ran business-process workshops and As-Is / To-Be mapping, and authored a **25,000+ line BRD/FRD/FSD suite** with an RTM, swimlane diagrams, use cases and a RACI.`,
      'Designed a **bin-level warehouse management system** (3 warehouses, 67 racks, 2,500+ bins), including the data model, seed data and traceability workflows for full inventory audit visibility.',
      'Defined the **QC & Compliance module**: quality-audit workflows, inspection checkpoints, compliance rules, audit-trail logic and internal controls across Procurement, Production and Inbound QC.',
      'Designed a configurable **roles, permissions and multi-level approval engine** for a steel-industry ERP: PostgreSQL DDL, REST API contracts, Angular screen specs and a phased roadmap.',
      'Ran **SIT, regression and UAT sign-off across 12 surfaces** and triaged **100+ defects**. Ran sprint ceremonies and tracked velocity across **2 parallel ERP tracks**.',
      "Main liaison between the client's MD, procurement, the warehouse and developers. I turned voice-of-customer feedback into Given/When/Then user stories and delivered sprint demos and executive reports.",
      'Introduced **AI-assisted delivery**: master prompt documents that let developers build from the spec with Cursor and Copilot agents.',
    ],
    chips: ['BRD/FRD/FSD', 'JIRA', 'MoSCoW', 'UAT/SIT', 'PostgreSQL', 'MS SQL', 'REST APIs', 'Angular', 'Java', 'Power BI', 'AI-assisted development'],
  },
  {
    title: 'Product Owner',
    company: 'FIS Global',
    place: 'Pune / Remote',
    dates: 'June 2021 – Sept 2025',
    summary:
      'Product Owner for Cash Application and Accounts Receivable products in a SAFe Agile environment, covering document intelligence, AI matching and audit compliance.',
    bullets: [
      '**Cash App relaunch:** moved the product from legacy OCR to an event-driven **AWS Textract → S3 → Oracle** pipeline with retry logic, validation and a full audit trail. Released with zero downtime. **Result: 75% data accuracy, 30% cost reduction, 25% faster processing.**',
      '**AI AutoMatch Remittance:** owned AR audit and reconciliation, defining AI/ML matching criteria, audit validation rules, KPIs and training datasets across **6 release cycles**. **Result: 50% shorter AR audit cycle, 40–50% accuracy uplift, no more third-party OCR dependency.**',
      '**Internal controls:** defined data-quality checks so every extraction step produced auditable output traceable to its source document. Built exception monitoring in **Power BI** and SQL for audit KPIs and executive reporting.',
      '**Agile delivery:** owned backlog grooming, story points, Definition of Done, OKR alignment and release planning. **Improved sprint velocity by 35%.** Used A/B testing, Mixpanel and Amplitude for product analytics.',
      '**Material Tracking System (MTS):** defined functional requirements, traceability workflows and validation rules for end-to-end material visibility, and coordinated UAT sign-off.',
    ],
    chips: ['SAFe', 'Product backlog', 'AWS Textract & S3', 'Microservices', 'Oracle DB', 'REST APIs', 'Power BI', 'SQL', 'JIRA/Confluence', 'Mixpanel', 'Amplitude'],
  },
  {
    title: 'IT Intern',
    company: 'Tata Motors Ltd.',
    place: 'Jamshedpur',
    dates: 'May 2019 – June 2019',
    summary: [
      "My first look at how enterprise IT runs inside one of India's largest automakers.",
      site.tataMotorsInternLine,
    ]
      .filter(Boolean)
      .join(' '),
    bullets: [],
    chips: [],
  },
];
