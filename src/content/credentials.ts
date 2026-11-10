import { certVerifyUrls, certYears, site } from './site';

export const credentialsCopy = {
  heading: 'Certifications & education',
  certsHeading: 'Certifications',
  verify: 'Verify',
  learningLabel: 'Currently learning',
  learning: 'Data & AI product management: the ML lifecycle, LLM evaluation and RAG system design.',
  educationHeading: 'Education',
  recognitionHeading: 'Recognition',
};

export const certifications = [
  { name: 'SAFe® 5 Product Owner / Product Manager (POPM)', issuer: 'Scaled Agile', year: certYears.safePopm, verify: certVerifyUrls.safePopm, featured: true },
  { name: 'Google Project Management Professional Certificate', issuer: 'Google / Coursera', year: certYears.googlePm, verify: certVerifyUrls.googlePm, featured: true },
  { name: 'Google Data Analytics Professional Certificate', issuer: 'Google / Coursera', year: certYears.googleDa, verify: certVerifyUrls.googleDa, featured: true },
  { name: 'Python: Zero to Hero', issuer: 'Udemy', year: certYears.pythonUdemy, verify: certVerifyUrls.pythonUdemy, featured: false },
];

export const education = [
  {
    degree: 'B.Tech, Computer Engineering',
    school: 'G.H. Raisoni College of Engineering & Management, Pune',
    years: '2017–2021',
    score: 'CGPA 8.47',
    note: 'Electives: Internet of Things, Distributed Systems',
  },
  { degree: 'Class XII (CBSE)', school: 'Valley View School, Jamshedpur', years: '2017', score: '', note: '' },
];

export const recognition = [
  site.scholarshipName
    ? `**${site.scholarshipName}** (Tata Motors), 2019`
    : '**Tata Motors scholarship recipient**, 2019',
];
