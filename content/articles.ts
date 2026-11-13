/**
 * Long-form Insights articles. An article is only built and linked when its
 * matching entry in `insights` (content/site.ts) has `published: true`.
 * Approved and published: ai-in-accounts-receivable, sql-for-business-analysts.
 * Drafts awaiting Rishabh's review (published: false in site.ts): the other four.
 */

export type ArticleBlock = { type: 'p'; text: string } | { type: 'h2'; text: string } | { type: 'ul'; items: string[] } | { type: 'code'; text: string };

export type Article = { slug: string; readingTime: string; blocks: ArticleBlock[] };

export const articles: Article[] = [
  {
    slug: 'product-ownership-in-fintech',
    readingTime: '5 min read',
    blocks: [
      { type: 'p', text: 'Owning a product in fintech means working inside three sets of constraints at once: money must reconcile to the cent, every change must survive an audit, and the systems you build on were often designed long before your users arrived. Good product ownership here is less about bold bets and more about sequencing value safely.' },
      { type: 'h2', text: 'Start from the reconciliation, not the screen' },
      { type: 'p', text: 'In finance products, the user interface is rarely the hard part. The hard part is the data trail behind it: where a number came from, how it was transformed, and how someone will prove it later. Writing acceptance criteria that include traceability — not just behaviour — prevents expensive rework at audit time.' },
      { type: 'h2', text: 'Make controls part of the backlog' },
      { type: 'p', text: 'Internal controls, validation rules and audit trails are often treated as non-functional afterthoughts. Putting them on the backlog as first-class stories makes their cost visible, lets you prioritise them honestly, and keeps compliance from becoming a last-minute release blocker.' },
      { type: 'ul', items: ['Every automated decision should record why it was made', 'Every manual override should record who made it and when', 'Every figure on a report should be traceable to a source record'] },
      { type: 'h2', text: 'Ship in reversible steps' },
      { type: 'p', text: 'Legacy financial platforms reward incremental change. Running a new capability alongside the old one, comparing outputs and switching over gradually is slower on paper but far faster than recovering from a failed big-bang release.' },
      { type: 'h2', text: 'Measure what the business already measures' },
      { type: 'p', text: 'Turnaround time, manual touch rate, exception volume and cost per transaction are numbers finance leaders already track. Framing product outcomes in those terms makes prioritisation conversations shorter and success easier to recognise.' },
    ],
  },
  {
    slug: 'erp-implementation-field-notes',
    readingTime: '5 min read',
    blocks: [
      { type: 'p', text: 'Every ERP implementation starts with a requirements template and ends with the realisation that the template was the least important document in the project. What matters is understanding how work actually moves through the business — and that is learned on the floor, not in the meeting room.' },
      { type: 'h2', text: 'Walk the process before you write it down' },
      { type: 'p', text: 'Following a single order from enquiry to dispatch exposes the workarounds no one mentions in workshops: the spreadsheet that tracks partial deliveries, the phone call that releases stock, the paper slip that triggers quality checks. Those workarounds are your real requirements.' },
      { type: 'h2', text: 'As-is and to-be are both maps, not wish lists' },
      { type: 'p', text: 'An honest as-is map shows where the current process breaks. A useful to-be map shows the smallest change that fixes it. Gap analysis is the bridge between them — and every gap should name an owner and a decision, not just a difference.' },
      { type: 'h2', text: 'Traceability is the product' },
      { type: 'p', text: 'In manufacturing, the ability to answer "where did this come from and what happened to it?" is worth more than any single screen. Designing traceability into procurement, production and quality control from the start avoids bolting it on later.' },
      { type: 'h2', text: 'UAT is where trust is earned' },
      { type: 'ul', items: ['Test with real scenarios from the floor, not idealised ones', 'Let operators run the tests, with the analyst observing', 'Treat every defect as a requirement you missed, and fix the spec as well as the code'] },
    ],
  },
  {
    slug: 'wms-process-automation',
    readingTime: '4 min read',
    blocks: [
      { type: 'p', text: 'Warehouses are full of small, repetitive decisions: where to put this, what to pick next, when to reorder. Automation pays off when it removes those decisions from people\'s heads without hiding the logic from them.' },
      { type: 'h2', text: 'Get the location model right first' },
      { type: 'p', text: 'A bin-level model — warehouse, rack, bin — is the foundation everything else depends on. Without it, stock visibility is approximate, picking is guesswork and cycle counts become investigations.' },
      { type: 'h2', text: 'Where automation earns its keep' },
      { type: 'ul', items: ['GRN and inward processing: validate receipts against the purchase order and ASN at the dock', 'Put-away: suggest a bin based on item, capacity and pick frequency', 'Picklists: sequence picks by location to shorten walking routes', 'Replenishment: trigger moves when stock crosses reorder levels (ROL / ROQ)', 'Cycle counts: schedule counts by value and movement, not by calendar alone'] },
      { type: 'h2', text: 'Keep humans in the loop on exceptions' },
      { type: 'p', text: 'Barcode scanning and rules handle the routine. Damaged goods, short receipts and location mismatches still need a person — so design exception screens as carefully as the happy path, with the reason and the next action shown together.' },
      { type: 'h2', text: 'Measure the floor, not the software' },
      { type: 'p', text: 'Useful WMS metrics are operational: dock-to-stock time, pick accuracy, stock accuracy after cycle counts and time spent searching for items. If those improve, the automation is working.' },
    ],
  },
  {
    slug: 'building-data-driven-products',
    readingTime: '4 min read',
    blocks: [
      { type: 'p', text: 'Most products have dashboards. Far fewer are data-driven. The difference is whether data changes decisions — what gets built, what gets cut and what gets fixed — or simply decorates status meetings.' },
      { type: 'h2', text: 'Instrument decisions, not just screens' },
      { type: 'p', text: 'Before adding a metric, write down the decision it will inform and the threshold that would change your mind. A metric without a decision attached is a candidate for removal.' },
      { type: 'h2', text: 'Agree on definitions early' },
      { type: 'p', text: 'Two teams calculating "active users" or "turnaround time" differently will argue about numbers instead of acting on them. A short, shared metric dictionary — definition, source, owner — prevents most of that friction.' },
      { type: 'h2', text: 'Pair quantitative with qualitative' },
      { type: 'p', text: 'Analytics tell you what is happening; conversations with users tell you why. A drop in a funnel step is a question, and the fastest way to answer it is usually to watch someone go through that step.' },
      { type: 'h2', text: 'Close the loop' },
      { type: 'ul', items: ['State the expected impact before a release', 'Check it after the release, on the agreed metric', 'Record what you learned, especially when the result surprised you'] },
    ],
  },
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
