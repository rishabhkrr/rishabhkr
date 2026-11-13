/**
 * Long-form Insights articles. An article is only built and linked when its
 * matching entry in `insights` (content/site.ts) has `published: true`.
 * Both articles below are DRAFTS for Rishabh to review and edit before publishing.
 */

export type ArticleBlock = { type: 'p'; text: string } | { type: 'h2'; text: string } | { type: 'ul'; items: string[] } | { type: 'code'; text: string };

export type Article = { slug: string; readingTime: string; blocks: ArticleBlock[] };

export const articles: Article[] = [
  {
    slug: 'ai-in-accounts-receivable',
    readingTime: '5 min read',
    blocks: [
      { type: 'p', text: 'Cash application looks simple on a slide: a payment arrives, it is matched to the invoices it pays, and the ledger moves on. In practice, the hard part is the remittance — the information that tells you which invoices a payment is for. It arrives as PDFs, emails, portal exports and scanned paper, in formats that change without notice.' },
      { type: 'h2', text: 'Where rules stop working' },
      { type: 'p', text: 'Template-based OCR and rule-based matching handle the predictable cases well. The trouble is the long tail: a new customer layout, a reference number with a typo, a single payment covering forty invoices with short-pays and deductions. Each of these drops out of automation and lands in an analyst’s queue.' },
      { type: 'ul', items: ['New or changed remittance layouts break templates', 'Partial references and typos defeat exact-match rules', 'Bundled payments with deductions need judgement, not lookups'] },
      { type: 'h2', text: 'What AI genuinely adds' },
      { type: 'p', text: 'Machine learning helps most where variety is the problem: extracting fields from layouts it has not seen before, and proposing likely invoice matches when references are incomplete. The output that matters is not just a match — it is a confidence score that maps to a business action.' },
      { type: 'ul', items: ['High confidence → post automatically', 'Medium confidence → suggest a match for one-click review', 'Low confidence → route to an exception queue with the reason attached'] },
      { type: 'h2', text: 'Where rules still win' },
      { type: 'p', text: 'Deterministic rules remain the right tool for policy: tolerance thresholds, write-off limits, customer-specific agreements and anything an auditor will ask about. The best designs keep these explicit and let the model operate inside them, rather than replacing them.' },
      { type: 'h2', text: 'What a product owner should bring' },
      { type: 'p', text: 'The most valuable input to an ML team is not a requirements template — it is labelled, real exception patterns from operations, a clear definition of what “correct” means for each case, and success measures that the business already cares about, such as turnaround time and manual touch rate.' },
    ],
  },
  {
    slug: 'sql-for-business-analysts',
    readingTime: '6 min read',
    blocks: [
      { type: 'p', text: 'A business analyst who can query data directly stops waiting on others to answer basic questions — and starts asking better ones. You do not need to be a database engineer. A handful of patterns covers most of what analysis work needs.' },
      { type: 'h2', text: '1. Count and group before you conclude' },
      { type: 'p', text: 'Most questions start as “how many, by what”. Grouping turns a vague concern into a shape you can discuss.' },
      { type: 'code', text: "SELECT status, COUNT(*) AS items\nFROM orders\nWHERE created_at >= DATE '2025-01-01'\nGROUP BY status\nORDER BY items DESC;" },
      { type: 'h2', text: '2. Find what is missing with a left join' },
      { type: 'p', text: 'Gaps are often the real requirement: payments without an invoice, orders without a shipment, items without a reorder level.' },
      { type: 'code', text: 'SELECT p.payment_id, p.amount\nFROM payments p\nLEFT JOIN invoice_matches m ON m.payment_id = p.payment_id\nWHERE m.payment_id IS NULL;' },
      { type: 'h2', text: '3. Compare periods with conditional aggregation' },
      { type: 'code', text: "SELECT customer_id,\n  SUM(CASE WHEN period = 'Q1' THEN amount ELSE 0 END) AS q1,\n  SUM(CASE WHEN period = 'Q2' THEN amount ELSE 0 END) AS q2\nFROM sales\nGROUP BY customer_id;" },
      { type: 'h2', text: '4. Rank within groups using window functions' },
      { type: 'p', text: 'Window functions answer “top N per category” and “change versus last time” without exporting to a spreadsheet.' },
      { type: 'code', text: 'SELECT *\nFROM (\n  SELECT item_id, warehouse_id, stock_value,\n         RANK() OVER (PARTITION BY warehouse_id ORDER BY stock_value DESC) AS rnk\n  FROM stock_ledger\n) ranked\nWHERE rnk <= 5;' },
      { type: 'h2', text: 'Habits that matter more than syntax' },
      { type: 'ul', items: ['Reconcile your totals against a known report before sharing anything', 'Write down the definition behind every metric you calculate', 'Keep queries read-only and work on agreed, permitted data sources', 'Save the query alongside the conclusion so others can verify it'] },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
