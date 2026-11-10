export type SkillGroup = { group: string; daily: string[]; working: string[] };

export const skillsCopy = {
  heading: 'Skills & tools',
  legendDaily: 'Daily use',
  legendWorking: 'Working knowledge',
  toolsLabel: 'Tools',
  domainsLabel: 'Domains',
};

export const skills: SkillGroup[] = [
  {
    group: 'Product & delivery',
    daily: ['Backlog management', 'user stories', 'acceptance criteria', 'SAFe 5 (PI planning)', 'Scrum', 'sprint ceremonies', 'release planning', 'MoSCoW', 'JIRA', 'Confluence'],
    working: ['Kanban', 'RICE', 'OKRs', 'product roadmaps', 'A/B testing', 'EVM'],
  },
  {
    group: 'Business analysis',
    daily: ['BRD', 'FRD', 'FSD', 'PRD', 'stakeholder workshops', 'As-Is / To-Be mapping', 'gap analysis', 'RTM', 'use cases', 'change-request management'],
    working: ['BPMN', 'swimlanes', 'RACI', 'customer-journey mapping', 'wireframing'],
  },
  {
    group: 'Testing & audit',
    daily: ['UAT', 'SIT', 'regression', 'bug triage', 'UAT sign-off', 'audit-trail design'],
    working: ['Compliance frameworks', 'internal controls', 'financial reconciliation', 'data-validation frameworks'],
  },
  {
    group: 'Data & analytics',
    daily: ['SQL (Oracle, MS SQL)', 'Power BI', 'DAX', 'data modelling (ER, star schema)'],
    working: ['Python (Pandas, NumPy)', 'PostgreSQL', 'ETL pipelines', 'Excel', 'Mixpanel', 'Amplitude'],
  },
  {
    group: 'Tech & build',
    daily: ['REST API design', 'database schema design'],
    working: ['FastAPI', 'Java', 'Spring Boot', 'microservices', 'Django', 'React', 'TypeScript', 'Angular (spec level)', 'Vite', 'Tailwind', 'CI/CD', 'Docker', 'Git'],
  },
  {
    group: 'AI & cloud',
    daily: ['Prompt engineering for coding agents (Cursor, Copilot, Claude)', 'RAG design'],
    working: ['AWS Textract & S3', 'Ollama', 'vector search', 'OpenAI and Whisper APIs'],
  },
];

export const tools = ['JIRA', 'Confluence', 'Miro', 'Draw.io', 'Postman', 'Jenkins', 'GitHub', 'Power BI', 'Mixpanel', 'Adobe XD', 'MS Office'];

export const skillDomains = [
  'Fintech & BFSI',
  'Accounts Receivable',
  'Cash Application',
  'Remittance processing',
  'Manufacturing ERP',
  'OMS',
  'WMS',
  'Procurement',
  'BOM',
  'QC & compliance',
  'Capital markets (F&O)',
];
