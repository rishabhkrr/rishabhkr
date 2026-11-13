/**
 * Flagship case studies. Figures come from the portfolio brief; `kind` keeps
 * delivered results visibly separate from targets for ongoing work.
 * No client names, proprietary data or real screenshots are included — every
 * visual is a conceptual illustration.
 */

export type Outcome = {
  value?: string;
  label: string;
  kind: 'delivered' | 'target' | 'qualitative';
};

export type ModuleGroup = { name: string; items: string[] };

export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  domain: string;
  status: 'Delivered' | 'Ongoing' | 'Implementation';
  visual: 'ocr' | 'ai' | 'erp' | 'dashboard';
  tagline: string;
  overview: string;
  problem: string;
  existingProcess?: string[];
  objectives: string[];
  responsibilities: string[];
  approach: string[];
  solution: string[];
  architecture?: string[];
  modules?: ModuleGroup[];
  stack: string[];
  outcomes: Outcome[];
  learnings: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'cash-app-relaunch',
    index: '01',
    title: 'Cash App Relaunch',
    domain: 'Fintech · FIS Global · 2022–23',
    status: 'Delivered',
    visual: 'ocr',
    tagline: 'Re-platforming remittance capture and cash application on AWS Textract OCR.',
    overview:
      'Migration and enhancement of remittance capture and Cash Application processes using AWS Textract OCR, improving how incoming payments are read, matched to invoices and resolved when they do not match.',
    problem:
      'Remittance data arrives in inconsistent formats. When capture is unreliable, payments cannot be matched to open invoices automatically, so analysts fall back to manual keying and investigation — slowing cash posting and raising processing cost.',
    existingProcess: [
      'Remittance documents captured by a legacy OCR pipeline',
      'Low-confidence reads pushed to manual data entry',
      'Unmatched payments investigated case by case',
      'Limited visibility into where and why exceptions occurred',
    ],
    objectives: [
      'Raise remittance capture accuracy',
      'Increase automated remittance-to-invoice matching',
      'Reduce manual processing and operational cost',
      'Make exception handling structured and traceable',
    ],
    responsibilities: [
      'Defined requirements and acceptance criteria for the Textract migration',
      'Owned and prioritised the backlog across capture, matching and exceptions',
      'Coordinated business stakeholders and engineering through Agile delivery',
      'Validated outcomes with SQL analysis and UAT',
    ],
    approach: [
      'Mapped the current-state capture-to-posting flow and its failure points',
      'Broke the migration into incremental, independently testable releases',
      'Defined data-quality checks for extracted remittance fields',
      'Designed exception categories and routing rules with operations users',
    ],
    solution: [
      'Remittance documents stored in Amazon S3 and processed with AWS Textract',
      'Extracted fields validated and persisted to Oracle DB',
      'Matching logic links remittance lines to open invoices',
      'CloudWatch monitoring for pipeline health and failures',
      'Exceptions routed to a structured queue for analyst review',
    ],
    architecture: ['Remittance intake', 'Amazon S3', 'AWS Textract', 'Validation', 'Oracle DB', 'Invoice matching', 'Exception queue'],
    stack: ['AWS Textract', 'Amazon S3', 'CloudWatch', 'SQL', 'Oracle DB', 'Automation'],
    outcomes: [
      { value: '75%', label: 'Data accuracy', kind: 'delivered' },
      { value: '30%', label: 'Operational cost reduction', kind: 'delivered' },
      { value: '25%', label: 'Faster processing', kind: 'delivered' },
      { label: 'Reduced manual processing', kind: 'qualitative' },
      { label: 'Full audit trail and zero-downtime production deployment', kind: 'qualitative' },
    ],
    learnings: [
      'OCR accuracy is only half the problem — downstream matching rules decide the business result.',
      'Exception categories designed with operations users get adopted; ones designed for them do not.',
      'Incremental migration kept the cash module stable while capability improved.',
    ],
  },
  {
    id: 'ai-automatch',
    index: '02',
    title: 'AI AutoMatch Remittance Module',
    domain: 'AI · Fintech · FIS Global · 2023–25',
    status: 'Delivered',
    visual: 'ai',
    tagline: 'AI/ML remittance matching that replaced third-party OCR and halved the AR audit cycle.',
    overview:
      'A custom AI-powered solution that replaced third-party OCR-based remittance capture and brought AI/ML matching, with audit validation rules, to Accounts Receivable reconciliation.',
    problem:
      'Template-driven OCR struggles with the variety of real-world remittance formats. Every new layout or ambiguous reference becomes manual work, capping how far matching automation can go.',
    objectives: [
      'Extract remittance data intelligently across varied formats',
      'Improve invoice matching beyond rule-based logic',
      'Reduce exceptions that require manual handling',
      'Shorten the AR audit cycle and remove the third-party OCR dependency',
    ],
    responsibilities: [
      'Owned the AR audit & reconciliation product and its backlog',
      'Translating cash-application domain knowledge for the AI/ML team',
      'Defined audit validation rules, AI/ML matching criteria, KPIs and training datasets',
      'Led UAT execution and regression testing across 6 release cycles',
    ],
    approach: [
      'Collaborating with the AI/ML team on extraction and matching requirements',
      'Defining labelled scenarios from real exception patterns',
      'Using confidence thresholds to decide auto-post versus review',
      'Ran root cause analysis on complex matching edge cases',
    ],
    solution: [
      'Intelligent remittance extraction model',
      'AI-assisted invoice matching',
      'Confidence-based exception routing',
      'Continuous accuracy measurement against baseline',
    ],
    architecture: ['Remittance intake', 'AI extraction', 'Confidence scoring', 'Intelligent matching', 'Auto-post / Review'],
    stack: ['AI/ML collaboration', 'Intelligent automation', 'Fintech', 'Exception handling'],
    outcomes: [
      { value: '50%', label: 'Reduction in AR audit cycle time', kind: 'delivered' },
      { value: '40–50%', label: 'Accuracy uplift', kind: 'delivered' },
      { label: 'Eliminated the third-party OCR dependency', kind: 'qualitative' },
    ],
    learnings: [
      'Model confidence must map to a clear business action, or it is just a number.',
      'Domain-labelled edge cases are the most valuable input a PO can give an ML team.',
    ],
  },
  {
    id: 'erp-wms',
    index: '03',
    title: 'ERP / WMS Implementation',
    domain: 'Manufacturing ERP · Gemba Concepts · 2025–',
    status: 'Implementation',
    visual: 'erp',
    tagline: 'Order, warehouse, procurement and production — mapped end to end into one ERP.',
    overview:
      'Implementation of an ERP covering order management, warehouse management, procurement and production for manufacturing operations, from requirements through rollout.',
    problem:
      'Operations ran across disconnected tools and manual records, limiting stock visibility, slowing procurement and making production progress hard to track.',
    objectives: [
      'Real-time stock visibility and control',
      'Structured procurement from planning to ASN',
      'Stage-by-stage production tracking with quality control',
      'Traceable order processing and sales workflows',
    ],
    responsibilities: [
      'Business process mapping with client teams',
      'Requirements gathering and documentation',
      'Client coordination through implementation',
      'System enhancements and implementation support',
    ],
    approach: [
      'Walked each operational process with the people who run it',
      'Mapped current state to ERP modules and identified gaps',
      'Prioritised enhancements by operational impact',
      'Supported configuration, testing and rollout',
    ],
    solution: ['Order Management', 'Warehouse Management', 'Procurement', 'Production'],
    modules: [
      { name: 'Order Management', items: ['Order tracking', 'Order processing', 'Sales workflows'] },
      {
        name: 'Warehouse',
        items: ['Stock visibility', 'Stock control', 'Stock valuation', 'Stock ledger', 'Reservations', 'ROL / ROQ', 'Cycle count', 'GRN', 'Barcode scanning', 'Inward processing', 'Replenishment', 'Picklist'],
      },
      { name: 'Procurement', items: ['Procurement planning', 'RFQ', 'Quotations', 'Price negotiation', 'Purchase orders', 'ASN scheduling'] },
      { name: 'Production', items: ['Input planning', 'Output planning', 'Job cards', 'Cutting', 'Stitching', 'Washing', 'Finishing', 'Quality control'] },
    ],
    stack: ['ERP', 'OMS', 'WMS', 'QC & Compliance', 'Angular', 'Java', 'MS SQL'],
    outcomes: [
      { value: '12+', label: 'ERP modules specified', kind: 'delivered' },
      { value: '2,500+', label: 'Bins modelled in the WMS across 3 warehouses and 67 racks', kind: 'delivered' },
      { value: '25,000+', label: 'Lines of BRD / FRD / FSD with full traceability', kind: 'delivered' },
      { label: 'QC & Compliance module with audit workflows and end-to-end traceability', kind: 'qualitative' },
      { label: 'UAT sign-off across 12 surfaces; 100+ defects triaged', kind: 'qualitative' },
    ],
    learnings: [
      'The shop floor is the real requirements document.',
      'Reorder levels and cycle counts only work when the data feeding them is trusted.',
    ],
  },
  {
    id: 'finance-analytics',
    index: '04',
    title: 'Finance & Analytics Dashboard',
    domain: 'Data · Business Intelligence',
    status: 'Delivered',
    visual: 'dashboard',
    tagline: 'One view of cash, profit, receivables, payables and inventory.',
    overview:
      'A Power BI and SQL reporting suite bringing finance, sales, purchase and inventory metrics into a single management view.',
    problem:
      'Financial and operational figures lived in separate reports, so answering simple questions — how is cash trending, who owes us, what is in stock — took manual consolidation.',
    objectives: [
      'Consolidate finance metrics into one view',
      'Track sales and purchase trends over time',
      'Surface receivables and payables positions',
      'Make inventory reporting self-serve',
    ],
    responsibilities: [
      'Defined metrics and reporting requirements with stakeholders',
      'Wrote SQL for data extraction and shaping',
      'Designed Power BI data model and visuals',
    ],
    approach: [
      'Started from the questions management actually asks',
      'Modelled data around a shared date and entity structure',
      'Validated every figure against source reports',
    ],
    solution: ['Cash and bank', 'Net profit', 'Receivables and payables', 'Sales trends', 'Purchase trends', 'Inventory reporting'],
    architecture: ['Source systems', 'SQL extraction', 'Power BI model', 'Dashboards'],
    stack: ['Power BI', 'SQL', 'Excel', 'Data modelling'],
    outcomes: [
      { label: 'Single source for finance and operational KPIs', kind: 'qualitative' },
      { label: 'Self-serve trend analysis for sales and purchases', kind: 'qualitative' },
    ],
    learnings: ['A metric everyone agrees on is worth more than ten clever charts.'],
  },
];
