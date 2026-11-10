/**
 * Personal details and on/off switches (Part A of MASTER_PROMPT.md).
 * Leave a value as "" (or [] / null) to hide whatever it feeds on the site.
 * Nothing on the site is invented to fill a blank.
 */
export const site = {
  // ---- Identity ----
  fullName: 'Rishabh Kumar',
  location: 'Bengaluru, India',
  email: 'imrishabhkr14@gmail.com',
  phoneWhatsapp: '', // e.g. "+91 87886 33914"
  linkedinUrl: 'https://www.linkedin.com/in/rishabh-kumar-ba2099193/', // taken from the link in your résumé PDF
  githubUrl: 'https://github.com/rishabhkrr',
  bookingUrl: '', // Calendly / Cal.com link for the free 30-min call
  siteUrl: 'https://rishabhkrr.github.io',

  // ---- Freelance ----
  showFreelance: true,
  showPricing: false,
  priceProjectFrom: '',
  priceRetainerFrom: '',
  priceHourly: '',
  budgetRanges: [] as string[], // e.g. ["Under ₹50k", "₹50k–2L", "Over ₹2L", "Not sure yet"]

  // ---- Hiring ----
  showOpenToRoles: true,

  // ---- Forms ----
  contactFormProvider: 'web3forms' as 'web3forms' | 'formspree',
  contactFormKey: '', // empty -> the form opens a pre-filled email instead of posting

  // ---- Facts ----
  gembaTitle: 'Product Owner / Business Analyst',
  garmentErpModuleCount: '12+',
  tataMotorsInternLine: '',
  scholarshipName: '',
  agileflowIsMyOwnProject: null as boolean | null,
  privateRepoLinks: { quantdesk: '', 'plm-dgp': '', 'job-search-copilot': '' } as Record<string, string>,

  // ---- Analytics (optional) ----
  // A Plausible or Umami script URL, e.g. "https://plausible.io/js/script.js". Empty loads nothing.
  analyticsScriptUrl: '',
  analyticsDomain: '', // data-domain for Plausible / data-website-id for Umami
};

export type Testimonial = { quote: string; name: string; title: string; company: string };
/** Real quotes only. The section stays hidden while this is empty. */
export const testimonials: Testimonial[] = [];

export const certYears = { safePopm: '', googlePm: '', googleDa: '', pythonUdemy: '' };
export const certVerifyUrls = { safePopm: '', googlePm: '', googleDa: '', pythonUdemy: '' };
