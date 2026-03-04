import { useState } from 'react'
import {
  Search, ExternalLink, FileText, TrendingUp, Users, DollarSign, BarChart2,
  Calendar, Tag, Eye, X, Check, Layers, Globe, GitBranch, Building2,
  Handshake, FlaskConical, Microscope, Upload, Link,
} from 'lucide-react'
import Layout from '../components/Layout'
import SidePanel from '../components/SidePanel'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ventureContextData } from '../data/mockData'

// ─────────────────────────────────────────────
// Inline markdown parser: **bold** → <strong>
// ─────────────────────────────────────────────
function parseInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-text">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

// ─────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────

const SECTIONS = [
  { id: 'market-overview',   label: 'Market Overview',           icon: TrendingUp },
  { id: 'product-decisions', label: 'Product Decisions',         icon: Tag },
  { id: 'design-flows',      label: 'Design & Flows',            icon: Layers },
  { id: 'user-research',     label: 'User Research',             icon: Microscope },
  { id: 'partnerships',      label: 'Partnerships',              icon: Handshake },
  { id: 'prototype-testing', label: 'Prototype & Testing',       icon: FlaskConical },
  { id: 'market-research',   label: 'Market Research',           icon: Globe },
  { id: 'tech-stack',        label: 'Tech Stack',                icon: BarChart2 },
  { id: 'financial-history', label: 'Financial History',         icon: DollarSign },
  { id: 'team-history',      label: 'Team History',              icon: Users },
]

const TAG_COLORS = {
  'Market Size':       'bg-amber/10 text-amber',
  'Competitive Intel': 'bg-pulse-blue/10 text-pulse-blue',
  'Regulatory':        'bg-pulse-red/10 text-pulse-red',
  'Decision Log':      'bg-amber/10 text-amber',
  'Architecture':      'bg-pulse-blue/10 text-pulse-blue',
  'Legal':             'bg-pulse-red/10 text-pulse-red',
  'Finance':           'bg-pulse-green/10 text-pulse-green',
  'Market Sizing':     'bg-amber/10 text-amber',
  'Customer Research': 'bg-pulse-blue/10 text-pulse-blue',
  'Open Banking':      'bg-pulse-blue/10 text-pulse-blue',
  'Banking':           'bg-pulse-green/10 text-pulse-green',
  'Government':        'bg-amber/10 text-amber',
  'Distribution':      'bg-purple-500/10 text-purple-400',
}

const STATUS_COLORS = {
  'Final':      'bg-pulse-green/10 text-pulse-green border-pulse-green/20',
  'In Review':  'bg-amber/10 text-amber border-amber/20',
  'Superseded': 'bg-bg-elevated text-text-muted border-border',
  'Active':       'bg-pulse-green/10 text-pulse-green',
  'In Discussion':'bg-amber/10 text-amber',
  'Explored':     'bg-bg-elevated text-text-muted',
}

const PRODUCT_DECISIONS = [
  {
    id: 'pd-1', title: 'MVP Scope — Supplier Payments Only',
    date: 'Feb 3, 2026', decider: 'Mustafa Al-Amin, Layla Mahmoud',
    decided: 'Narrow MVP to supplier payment flows only. Invoice financing and working capital dashboard deferred to Phase 2.',
    why: 'Customer discovery with 12 SMEs showed supplier payment automation is the most acute pain point with highest willingness to pay. Invoice financing requires a balance sheet or banking partnership which adds 3–6 months to the timeline.',
    outcome: 'MVP shipped in 8 weeks. Two pilot customers signed within 30 days of launch.', status: 'Final',
  },
  {
    id: 'pd-2', title: 'API Architecture — REST over GraphQL',
    date: 'Jan 28, 2026', decider: 'Omar Hassan, Mustafa Al-Amin',
    decided: 'Use REST API architecture for the Tradepay backend. GraphQL explicitly ruled out for the initial build.',
    why: 'REST is better supported by the Lean Technologies open banking SDK. GraphQL adds complexity without benefit at this stage — no mobile app requiring flexible querying yet. Team has stronger REST expertise.',
    outcome: 'API documented in OpenAPI 3.0 spec. 12 endpoints live by Feb 2026.', status: 'Final',
  },
  {
    id: 'pd-3', title: 'Payment Flow UX — Guided Wizard over Free-Form',
    date: 'Feb 10, 2026', decider: 'Layla Mahmoud, User Research',
    decided: 'Use a 4-step guided wizard for payment initiation instead of a free-form payment form.',
    why: 'Usability testing (Session 1, Jan 10) showed 3 of 5 participants abandoned a free-form payment form at the bank account entry step. Guided wizard reduced average completion time from 4.2 minutes to 1.8 minutes in follow-up testing.',
    outcome: 'Wizard pattern adopted. Payment completion rate in pilot: 94%.', status: 'Final',
  },
  {
    id: 'pd-4', title: 'Target Segment — Mid-Market SMEs Only',
    date: 'Jan 20, 2026', decider: 'Sarah Al-Rashid, Mustafa Al-Amin',
    decided: 'Focus exclusively on SMEs with 20–200 employees and SAR 10M–200M annual revenue. Micro-SMEs explicitly excluded.',
    why: 'Micro-SMEs have very high churn and low ARPU. Mid-market SMEs have dedicated finance staff who can champion the product internally, higher transaction volumes, and can commit to pilot agreements faster.',
    outcome: 'ICP defined. All 3 pilot customers are mid-market SMEs within the defined range.', status: 'Final',
  },
  {
    id: 'pd-5', title: 'Pricing Model — Hybrid Transaction + Platform Fee',
    date: 'Feb 15, 2026', decider: 'Sarah Al-Rashid, Mustafa Al-Amin',
    decided: 'Charge 0.7% per transaction (capped at SAR 500) plus SAR 199/month platform fee. No tiered subscription model.',
    why: 'Three models evaluated: flat SaaS, per-transaction, and hybrid. Customer interviews showed SMEs strongly prefer paying on usage. Hybrid aligns incentives and provides predictable base revenue.',
    outcome: 'Pricing confirmed with all pilot customers. Average revenue per customer: SAR 4,600/month.', status: 'Final',
  },
  {
    id: 'pd-6', title: 'Go-Live Market — Riyadh Only in Phase 1',
    date: 'Feb 1, 2026', decider: 'Mustafa Al-Amin, Sarah Al-Rashid',
    decided: 'Phase 1 commercial launch limited to Riyadh. Jeddah and Dammam expansion deferred to Phase 2 (Q3 2026).',
    why: 'Riyadh represents 47% of Saudi B2B payment volume. Concentrated geography reduces operational complexity, lowers CAC through warm network, and allows tighter feedback loops.',
    outcome: 'All 3 pilot customers are Riyadh-based. Phase 2 expansion plan drafted.', status: 'Final',
  },
  {
    id: 'pd-7', title: 'Bulk Payment Upload — Added to Phase 1',
    date: 'Feb 25, 2026', decider: 'Layla Mahmoud',
    decided: 'Add CSV/Excel bulk payment upload to MVP before pilot launch. Was originally scoped as a Phase 2 feature.',
    why: 'Pilot customer Al-Mashreq processes 30–80 recurring supplier payments weekly. Manual entry per payment was identified as the #1 friction point. Bulk upload was a 5-day build with outsized impact.',
    outcome: 'Al-Mashreq rated bulk upload as the highest-value feature at launch. Feature shipped on time.', status: 'Final',
  },
  {
    id: 'pd-8', title: 'Mobile App — Defer to Phase 2',
    date: 'Jan 15, 2026', decider: 'Layla Mahmoud, Mustafa Al-Amin',
    decided: 'No native mobile app in Phase 1. Responsive web only. iOS/Android apps deferred.',
    why: 'B2B payment processing is primarily a desktop workflow for finance teams during office hours. Responsive web covers mobile approval use cases. Native app adds 3–4 months of development time.',
    outcome: 'Pilot feedback suggests CFO approval flow would benefit from native mobile notification + one-tap approval. Revisiting for Phase 2 scoping.',
    status: 'In Review',
  },
]

const USER_FLOWS = [
  {
    id: 'uf-1', name: 'Supplier Payment Flow',
    description: 'End-to-end flow from payment initiation through bank authorization to confirmation and receipt generation.',
    designer: 'Layla Mahmoud', date: 'Jan 25, 2026',
    steps: [
      'Buyer logs into Tradepay dashboard',
      'Selects "New Payment" from the main navigation',
      'Enters supplier from saved contacts or adds a new supplier with IBAN',
      'System validates IBAN format and verifies via Lean Technologies',
      'Uploads invoice PDF or enters invoice reference number',
      'System validates invoice against ZATCA Fatoora registry in real time',
      'Buyer reviews payment summary: supplier, amount, VAT breakdown, scheduled date',
      'If payment exceeds approval threshold, routed to approver — otherwise proceeds',
      'System initiates open banking payment flow via Lean Technologies',
      'Buyer redirected to their bank authentication screen',
      'Buyer authenticates with OTP or biometric',
      'Payment initiated — status changes to "Pending Clearance"',
      'Buyer and supplier receive confirmation via email and WhatsApp',
      'Payment appears in transaction history with full audit trail',
    ],
  },
  {
    id: 'uf-2', name: 'Buyer Onboarding Flow',
    description: 'Company registration, KYB verification, bank account linking, and first payment setup.',
    designer: 'Layla Mahmoud', date: 'Jan 18, 2026',
    steps: [
      'Buyer visits Tradepay landing page and clicks "Get Started"',
      'Enters business email and creates a password',
      'Receives and confirms email verification link',
      'Enters company details: CR number, business name, industry',
      'Uploads Commercial Registration (CR) document',
      'Uploads authorized signatory national ID or Iqama',
      'System runs automated KYB check using Lean Identity APIs',
      'Manual review queue if automated check flags an issue (SLA: 24 hours)',
      'Approval notification sent via email and SMS',
      'Buyer links corporate bank account via Lean open banking consent flow',
      'Bank account verified — account name confirmed against company name',
      'Buyer completes profile: team members, approval thresholds, notification preferences',
      'Welcome email with quick-start guide dispatched',
      'Buyer prompted to add first supplier and initiate first payment',
    ],
  },
  {
    id: 'uf-3', name: 'Invoice Upload Flow',
    description: 'Invoice ingestion, OCR extraction, ZATCA validation, and attachment to payment record.',
    designer: 'Omar Hassan', date: 'Feb 2, 2026',
    steps: [
      'User selects "Upload Invoice" from dashboard or within a payment',
      'Drag-and-drop or file picker accepts PDF, image, or CSV',
      'System sends document to AWS Textract for OCR processing',
      'Extracted data presented for review: invoice number, amount, supplier, VAT number',
      'User corrects any OCR errors — inline editing with field-level highlights',
      'System validates VAT number against ZATCA registry',
      'System checks for duplicate invoices matching same number and supplier',
      'Invoice saved to Tradepay document store with version control',
      'Invoice linked to payment record and tracked through payment lifecycle',
    ],
  },
  {
    id: 'uf-4', name: 'Payment Approval Flow',
    description: 'Multi-level approval workflow for payments above configurable thresholds.',
    designer: 'Layla Mahmoud', date: 'Feb 20, 2026',
    steps: [
      'Finance staff initiates payment above the company approval threshold',
      'Payment saved as "Pending Approval" — not yet sent to bank',
      'Approver notified via email and WhatsApp with payment summary',
      'Approver reviews details in web dashboard or mobile-responsive view',
      'Approver selects: Approve, Reject, or Request Modification (with comment)',
      'If approved: payment moves to "Ready to Send" and initiates bank authorization',
      'If rejected: initiator notified with reason, payment saved for revision',
      'Full approval log retained: who approved, when, from which device',
    ],
  },
  {
    id: 'uf-5', name: 'Reconciliation Flow',
    description: 'Matching completed payments to invoices and exporting to Qoyod accounting software.',
    designer: 'Layla Mahmoud', date: 'Feb 12, 2026',
    steps: [
      'Finance team opens Reconciliation module from navigation',
      'Selects date range and optional filters: supplier, amount range, status',
      'System displays all payments with auto-matched invoice status',
      'Auto-matching uses invoice number, amount, and supplier — 87% accuracy rate',
      'User manually matches remaining unmatched payments to invoices',
      'User marks reconciliation period as complete',
      'Export reconciliation report as PDF or CSV',
      'Optional: sync directly to Qoyod via API integration',
      'Monthly reconciliation summary emailed to CFO',
    ],
  },
]

const WIREFRAMES = [
  { id: 'wf-1', name: 'Login & Registration',            designer: 'Layla Mahmoud', date: 'Jan 15, 2026', version: 'v1.2' },
  { id: 'wf-2', name: 'Main Dashboard',                  designer: 'Layla Mahmoud', date: 'Jan 20, 2026', version: 'v2.0' },
  { id: 'wf-3', name: 'New Payment Wizard',               designer: 'Layla Mahmoud', date: 'Jan 28, 2026', version: 'v3.1' },
  { id: 'wf-4', name: 'Invoice Upload & Review',          designer: 'Omar Hassan',   date: 'Feb 2, 2026',  version: 'v1.5' },
  { id: 'wf-5', name: 'Payment History & Reconciliation', designer: 'Layla Mahmoud', date: 'Feb 10, 2026', version: 'v2.0' },
  { id: 'wf-6', name: 'Admin & Team Settings',            designer: 'Layla Mahmoud', date: 'Feb 15, 2026', version: 'v1.0' },
]

const DESIGN_DECISIONS = [
  {
    id: 'dd-1', title: 'Design System — shadcn/ui + Tailwind CSS',
    date: 'Jan 15, 2026', decider: 'Layla Mahmoud, Omar Hassan',
    decided: 'Use shadcn/ui component library with Tailwind CSS for the product design system.',
    why: 'shadcn/ui provides accessible, unstyled components that integrate cleanly with Tailwind. No vendor lock-in — code is copied, not imported. Layla has prior experience with the stack, reducing ramp-up time significantly.',
    outcome: 'Design system established in 2 days. 12 core UI components documented in Storybook.', status: 'Final',
  },
  {
    id: 'dd-2', title: 'Mobile-First Design Approach',
    date: 'Jan 18, 2026', decider: 'Layla Mahmoud',
    decided: 'Design all screens mobile-first, then enhance for desktop. Desktop is the primary use case but approval flows must work seamlessly on mobile.',
    why: 'CFOs and finance managers frequently approve payments away from their desks. If mobile is an afterthought, the approval UX suffers. Mobile-first is cheaper to retrofit for desktop than the reverse.',
    outcome: 'All screens responsive. Payment approval successfully tested on iOS and Android in Usability Session 2.', status: 'Final',
  },
  {
    id: 'dd-3', title: 'Accessibility — WCAG 2.1 AA Compliance',
    date: 'Jan 20, 2026', decider: 'Layla Mahmoud, Omar Hassan',
    decided: 'All screens must meet WCAG 2.1 Level AA accessibility standards. Automated axe-core testing added to CI pipeline.',
    why: 'Saudi enterprise procurement increasingly audits supplier software for accessibility. Cost of retrofitting is 10x building it in. Sets Tradepay apart in the market.',
    outcome: '94% WCAG 2.1 AA compliance at pilot launch. Remaining 6% are known exceptions with documented remediation plan.', status: 'Final',
  },
  {
    id: 'dd-4', title: 'Arabic RTL Support — Deferred to Phase 2',
    date: 'Feb 5, 2026', decider: 'Mustafa Al-Amin, Layla Mahmoud',
    decided: 'English-only UI for Phase 1. Full Arabic RTL layout deferred to Phase 2 (Q3 2026 target).',
    why: 'Target mid-market SMEs use English-language financial software. Adding RTL doubles layout testing scope and adds 3–4 weeks. Pilot customers specifically requested English-first UI.',
    outcome: 'Arabic support scoped and designed. RTL CSS variables prepared in codebase for easier rollout. Under active review for Phase 2 prioritization.',
    status: 'In Review',
  },
]

const RESEARCH_THEMES = [
  { stat: '82%', label: 'of SMEs rely on manual bank transfers for supplier payments', color: 'text-amber' },
  { stat: '3.5 hrs', label: 'average payment reconciliation time per week per company', color: 'text-pulse-blue' },
  { stat: '#1 barrier', label: 'to adoption is trust in a new payment provider — above price', color: 'text-pulse-red' },
]

const USER_INTERVIEWS = [
  {
    id: 'ui-1', subject: 'SME Finance Manager', companySize: '45 employees · Wholesale Trade',
    date: 'Dec 15, 2025', conductor: 'Sarah Al-Rashid',
    insights: [
      'Spends 3.5 hours/week reconciling supplier payments across 3 bank portals',
      'Cannot see which invoices have been paid without calling suppliers directly',
      'Would pay up to SAR 3,000/month for a tool that fully automates reconciliation',
    ],
    fullNotes: `Interview duration: 52 minutes. Subject is Finance Manager at a Riyadh-based wholesale distributor supplying 12 product categories to retail chains.

Current state: All supplier payments processed via Al-Rajhi business internet banking. No accounting software — all records in Excel. Month-end reconciliation done manually by cross-referencing bank statements against supplier invoices.

Key quote: "Every month I spend at least 3 hours just matching payments to invoices. And then I still have to call two or three suppliers because I can't tell if they received the payment."

Pain points ranked by severity:
1. Reconciliation time ("embarrassing how manual this is")
2. No visibility into supplier payment status
3. Approval process by WhatsApp to owner — no audit trail

Willingness to pay: SAR 2,500–3,500/month depending on supplier count. Currently has 38 active suppliers.

Decision-maker: Subject is the decision-maker for this category of purchase. Owner approval only needed above SAR 5,000/month.`,
  },
  {
    id: 'ui-2', subject: 'Operations Director', companySize: '120 employees · Manufacturing',
    date: 'Dec 18, 2025', conductor: 'Sarah Al-Rashid',
    insights: [
      'Manages 80+ supplier relationships — payments processed by a team of 3',
      'Company recently failed an external audit due to incomplete payment documentation',
      'Primary need: clean, exportable audit trail from payment approval to bank confirmation',
    ],
    fullNotes: `Interview duration: 45 minutes. Operations Director at a Jeddah-based manufacturing company with 80+ active suppliers.

Current payment process: All payments via SNB corporate portal. Finance clerks process; Operations Director approves above SAR 50,000. Approval via WhatsApp message chain.

Key incident: Failed an external audit by a government contractor client. Auditors could not trace 14 transactions — documentation scattered across email, WhatsApp, and scanned PDFs in Google Drive.

Product interest: Very high. Wants clean audit trail from approval to payment confirmation. Also interested in supplier self-service portal so suppliers can upload invoices directly without emailing.

Willingness to pay: SAR 5,000–8,000/month. Would need to demonstrate time savings to CFO for approval.

Note: Not final decision-maker — CFO sign-off required. However, owns the internal recommendation.`,
  },
  {
    id: 'ui-3', subject: 'Business Owner', companySize: '12 employees · Food Distribution',
    date: 'Jan 5, 2026', conductor: 'Layla Mahmoud',
    insights: [
      'Personally handles all supplier payments from his mobile banking app — 2 hours per week',
      'Made 2 wrong payments in the past year due to manual IBAN entry errors',
      'One wrong payment took 3 weeks and 8 calls to recover — major trust-related trauma',
    ],
    fullNotes: `Interview duration: 38 minutes. Business owner of a small food distribution company in Riyadh. 12 employees, 25 active suppliers.

Current process: Owner personally processes all payments via Al-Rajhi mobile. Suppliers send invoices via WhatsApp. Owner copies account details manually.

Major incident: Made a SAR 12,000 wrong payment to an incorrect IBAN due to a typo. Took 3 weeks and 8 calls to recover. "It was a nightmare. I lost a week of sleep."

Product feedback: Wants IBAN validation and supplier account verification before payment. Would love to "just approve" after an assistant enters the details.

Willingness to pay: SAR 500–1,000/month. Budget constrained.

Interviewer note: This profile is at the boundary of target segment (too small). However, the IBAN error prevention insight is directly applicable to mid-market target and should inform product safety features.`,
  },
  {
    id: 'ui-4', subject: 'CFO', companySize: '200 employees · Construction Materials',
    date: 'Jan 8, 2026', conductor: 'Sarah Al-Rashid',
    insights: [
      'Processes SAR 8M+ in supplier payments monthly across 120 suppliers',
      'Uses SAP but lacks local payment integration — exports files and imports to bank portal manually',
      'Would pay significant premium for real-time SAP or Qoyod integration',
    ],
    fullNotes: `Interview duration: 60 minutes. CFO of a large construction materials distributor. Dedicated finance team of 5.

Current state: SAP Business One for ERP. Exports payment files from SAP, imports to SNB corporate portal, manually reconciles back in SAP. This round-trip takes 2 days per payment cycle (bi-weekly runs).

Critical requirement: Any solution must integrate with SAP. Standalone tool without ERP integration won't pass the evaluation stage.

Assessment: This customer may be too enterprise for Phase 1. SAP integration adds 3–4 months of development. However, this validates ERP integration as a Phase 2 must-have.

Willingness to pay: SAR 15,000–25,000/month with SAP integration. SAR 5,000–8,000 standalone.

Key insight: Payment status visibility (paid, in transit, cleared) is as valuable as payment execution itself at this scale.`,
  },
  {
    id: 'ui-5', subject: 'Finance Controller', companySize: '80 employees · Retail Chain',
    date: 'Jan 12, 2026', conductor: 'Layla Mahmoud',
    insights: [
      'Month-end reconciliation takes a full week for a team of 2',
      'Trust is the #1 adoption barrier — very wary of linking bank account to a new platform',
      'Would feel confident if a recognized Saudi bank endorsed or co-branded the product',
    ],
    fullNotes: `Interview duration: 42 minutes. Finance Controller at a Riyadh retail chain with 12 outlets and 65 active suppliers.

Current process: Qoyod for accounting, manual payment export to Riyad Bank portal. Month-end reconciliation is a 5-day process.

Trust barrier: Subject was initially very skeptical. "How do I know my money is safe? This is a new company." Only became comfortable after learning about Sanabil backing and SAMA sandbox pathway.

Key insight: Trust barrier is significant and consistent across profiles. Bank co-branding or visible SAMA certification would meaningfully reduce adoption friction.

Willingness to pay: SAR 2,000–3,500/month.`,
  },
  {
    id: 'ui-6', subject: 'Founder / CEO', companySize: '15 employees · B2B Tech Startup',
    date: 'Jan 15, 2026', conductor: 'Sarah Al-Rashid',
    insights: [
      'Uses Qoyod for accounting and desperately wants it to sync with their payment tool',
      'Pays 8 freelancers weekly — wants automated recurring payment templates',
      'Would switch from current bank portal immediately if Qoyod integration existed',
    ],
    fullNotes: `Interview duration: 30 minutes. CEO of a SaaS startup providing B2B software to Saudi government entities.

Current process: CEO handles all finance personally. Qoyod for accounting (very satisfied). Manual payment entry into Al-Rajhi. Monthly reconciliation takes 4–5 hours.

Key feature request: Recurring payment templates — "I pay the same 8 freelancers every month. I want to set it once and have it run automatically."

Additional feature request: SADAD integration for government invoice payments.

Willingness to pay: SAR 800–1,200/month. Price-sensitive given startup stage.

Interviewer note: Recurring payments is a compelling Phase 2 feature. SADAD integration is a Saudi-specific differentiator worth scoping.`,
  },
]

const SURVEYS = [
  {
    id: 'sv-1', name: 'SME Digital Payment Readiness Survey', respondents: 142, date: 'Dec 2025',
    findings: [
      '82% of respondents still rely primarily on manual bank transfers for supplier payments',
      '67% experienced at least one payment error in the past 12 months; average recovery time: 2.3 weeks',
      '78% said they would switch platforms if reconciliation could be fully automated',
    ],
  },
  {
    id: 'sv-2', name: 'B2B Payment Pain Points Survey', respondents: 89, date: 'Jan 2026',
    findings: [
      'Reconciliation time (avg 3.5 hrs/week) ranked #1 pain point by 71% of respondents',
      'Trust in new payment platforms ranked #1 adoption barrier (68% cited this)',
      'Only 12% currently use dedicated B2B payment software — rest use generic banking portals',
    ],
  },
]

const PARTNERSHIPS = [
  {
    id: 'pt-1', partner: 'Lean Technologies', type: 'Open Banking', status: 'Active',
    contact: 'Mohammed Al-Haddad · Head of Partnerships',
    description: 'Open banking API integration for bank account connectivity, instant IBAN verification, and payment initiation. Powers all bank-link flows and real-time payment status in Tradepay.',
    initiated: 'Jan 10, 2026',
    nextSteps: 'Upgrade to Lean Pro tier by March 2026 to access bulk payment initiation APIs and real-time payment status webhooks.',
  },
  {
    id: 'pt-2', partner: 'Riyad Bank', type: 'Banking', status: 'Active',
    contact: 'Faisal Al-Shammari · Fintech Partnerships Manager',
    description: 'Corporate banking fast-track program for Tradepay and its pilot customers. Dedicated relationship manager and accelerated KYB processing (48-hour turnaround vs standard 2 weeks).',
    initiated: 'Jan 20, 2026',
    nextSteps: 'Explore Riyad Bank co-branding on the Tradepay platform to reduce trust barrier. Exploratory meeting scheduled March 15.',
  },
  {
    id: 'pt-3', partner: 'SAMA', type: 'Government', status: 'In Discussion',
    contact: 'Regulatory Relations — formal application pending',
    description: 'Regulatory Sandbox application filed under SAMA Fintech Saudi initiative. Approved sandbox allows commercial operation up to 500 users and SAR 5M/month volume while full PSP license is processed.',
    initiated: 'Feb 1, 2026',
    nextSteps: 'Awaiting SAMA acknowledgement. Expected response in 4–6 weeks. Omar Hassan managing the regulatory relationship.',
  },
  {
    id: 'pt-4', partner: 'Nana Direct', type: 'Distribution', status: 'Explored',
    contact: 'Intro via Sanabil portfolio introduction — Growth team',
    description: 'Explored embedding Tradepay as the default payment layer for suppliers on the Nana Direct B2B marketplace. Nana has 2,000+ registered SME buyers — distribution at zero CAC.',
    initiated: 'Dec 20, 2025',
    nextSteps: 'Exploration paused. Nana undergoing internal platform restructure until Q3 2026. Revisit then.',
  },
  {
    id: 'pt-5', partner: 'ZATCA', type: 'Government', status: 'Active',
    contact: 'ZATCA Developer Portal — technical integration',
    description: 'Integration with ZATCA Fatoora e-invoicing API for real-time VAT invoice validation. When a buyer uploads an invoice, Tradepay queries ZATCA to verify registration, reducing fraud risk.',
    initiated: 'Feb 5, 2026',
    nextSteps: 'Integration live in staging. Production go-live scheduled March 10, 2026.',
  },
]

const PROTOTYPE_VERSIONS = [
  {
    id: 'pv-1', version: 'v0.1', date: 'Dec 10, 2025',
    built: 'Omar Hassan (engineering) · Layla Mahmoud (design)',
    description: 'Initial clickable Figma prototype. No real backend — all screens static with pre-filled data. Covers the core payment wizard (4 steps) and dashboard summary only.',
    changes: 'Initial version — no prior version.',
    testingOutcome: 'Tested with 3 internal SSU team members. Main finding: bank selection step was confusing. Users expected auto-detection, not a dropdown list.',
  },
  {
    id: 'pv-2', version: 'v0.2', date: 'Jan 15, 2026',
    built: 'Omar Hassan (engineering) · Layla Mahmoud (design)',
    description: 'First working prototype with real Lean Technologies API integration for bank account linking. Payment initiation functional but terminates at bank authorization screen — no actual transfers.',
    changes: 'Bank auto-detection added (linked bank shown by default). Dashboard shows real transaction history from sandbox data. Onboarding flow added end-to-end.',
    testingOutcome: 'Tested in Usability Session 1 (Jan 10). Bank auto-detection resolved prior confusion. New finding: invoice OCR had 60% accuracy — too many corrections required.',
  },
  {
    id: 'pv-3', version: 'v0.3', date: 'Feb 15, 2026',
    built: 'Omar Hassan (engineering) · Layla Mahmoud (design)',
    description: 'Full payment flow with end-to-end bank transfers in Lean sandbox. ZATCA invoice validation integrated. Multi-level payment approval workflow added. Bulk CSV upload added based on pilot customer request.',
    changes: 'AWS Textract integrated for OCR (accuracy improved to 87%). ZATCA Fatoora API validation live. Approval workflow with WhatsApp notification. CSV bulk upload for recurring payments.',
    testingOutcome: 'Tested in Usability Session 2 (Feb 18). 94% task completion rate on core payment flow. OCR still sub-optimal for handwritten invoices — manual fallback documented.',
  },
]

const TESTING_SESSIONS = [
  {
    id: 'ts-1', type: 'Usability Test', date: 'Jan 10, 2026', participants: 5,
    conductor: 'Layla Mahmoud',
    findings: [
      'Task completion on core payment flow: 60% on first attempt (target was 80%)',
      'Bank selection step caused abandonment in 3 of 5 sessions',
      'Invoice OCR at 60% accuracy — users frustrated by correction overhead',
      'Dashboard summary rated positively — "exactly what I need to see at a glance"',
    ],
    actions: 'Redesigned bank selection to auto-detect linked bank. Replaced custom OCR with AWS Textract. Added inline correction hints for OCR results.',
  },
  {
    id: 'ts-2', type: 'Stakeholder Demo', date: 'Jan 20, 2026', participants: 8,
    conductor: 'Sarah Al-Rashid, Mustafa Al-Amin',
    findings: [
      'Sanabil investment committee reacted positively to the payment automation concept',
      'Key question raised: how does Tradepay prevent unauthorized payment initiation?',
      'Riyad Bank partnership team suggested co-branding for trust signaling',
      'Two committee members requested direct introduction to pilot customers',
    ],
    actions: 'Multi-level approval workflow accelerated from Phase 2 to Phase 1. Fraud detection layer brief drafted. Riyad Bank co-branding exploratory call scheduled.',
  },
  {
    id: 'ts-3', type: 'Technical Review', date: 'Feb 5, 2026', participants: 4,
    conductor: 'Omar Hassan',
    findings: [
      'Transactions table lacks partitioning — will degrade at scale (rec: partition by month)',
      'Lean webhook signature verification missing — security gap',
      'Redis session TTL set to 30 days — too long for a financial application',
      'No rate limiting on payment initiation endpoint — potential for automated abuse',
    ],
    actions: 'Transactions table partitioned by month. Lean webhook HMAC-SHA256 verification added. Session TTL reduced to 8 hours with refresh token. Rate limiting added: 10 payment initiations/hour/account.',
  },
  {
    id: 'ts-4', type: 'Usability Test', date: 'Feb 18, 2026', participants: 6,
    conductor: 'Layla Mahmoud',
    findings: [
      'Task completion rate improved to 94% — significant uplift from January (60%)',
      'Bulk CSV upload was highest-rated feature — all 6 participants said it saved significant time',
      'CFO-profile participants approved payments within 60 seconds on mobile',
      'Remaining friction: invoice OCR takes 45–60 seconds — users expect faster response',
    ],
    actions: 'Added progress indicator and optimistic UI during OCR. Implemented async OCR (upload immediately, validate in background). v0.4 planning session scheduled.',
  },
]

const MARKET_STATS = [
  { label: 'Total Saudi B2B Payment Volume', value: 'SAR 4.5T', sub: 'Annual, all companies' },
  { label: 'Target SMEs in Saudi Arabia', value: '128,000', sub: '20–200 employees', color: 'text-pulse-blue' },
  { label: 'Average Transaction Size', value: 'SAR 24,500', sub: 'Mid-market SME segment', color: 'text-pulse-green' },
  { label: 'Market Growth Rate', value: '18% CAGR', sub: 'B2B digital payments segment', color: 'text-amber' },
]

const MARKET_RESEARCH_ITEMS = [
  {
    id: 'mr-1', title: 'TAM / SAM / SOM Analysis — Saudi B2B Payments', type: 'Market Sizing',
    date: 'Jan 2026', conductor: 'Sarah Al-Rashid',
    summary: 'Bottom-up market sizing for Saudi B2B payments. TAM of SAR 4.5T total payment volume; Tradepay\'s SAM (SMEs 20–200 employees) is approximately SAR 420B. Year 1 target: capture 0.01% of SAM (SAR 42M payment volume), generating approximately SAR 295K in transaction fees.',
    fullReport: `Methodology: Bottom-up, building from SME count and average transaction frequency.

TAM — Total Saudi B2B Payment Volume
Total Saudi B2B payment volume (all companies): approximately SAR 4.5 trillion annually (SCAICT 2025). This includes large corporates, government entities, and SMEs. CAGR: 18%, driven by e-invoicing mandate and Vision 2030 digitization.

SAM — Serviceable Addressable Market
Target segment: SMEs with 20–200 employees and SAR 10M–200M revenue. Estimated count in Saudi Arabia: 128,000 companies (Monsha'at 2025). Average monthly B2B payment volume per company: SAR 2.7M. Total SAM: approximately SAR 420B annually.

SOM — Serviceable Obtainable Market (Year 1)
Riyadh-only focus in Phase 1. Riyadh represents approximately 47% of Saudi B2B volume. Year 1 target: 50 paying customers by end of 2026. Average payment volume per customer: SAR 2.7M/month. Total Year 1 payment volume: SAR 1.62B annually. Tradepay fee: 0.7% per transaction (blended, net of bank costs). Year 1 revenue target: SAR 11.3M.

Key assumptions: Customer conversion from trial: 40% (conservative). Time to first payment: 14 days after signup. Annual churn: 15% in Year 1 (new category, expected higher).

Sources: SCAICT Digital Economy Report 2025, Monsha'at SME Survey 2024, Euromonitor Saudi Arabia.`,
  },
  {
    id: 'mr-2', title: 'Competitive Landscape Analysis', type: 'Competitive Intel',
    date: 'Jan 2026', conductor: 'Layla Mahmoud',
    summary: 'Analysis of 11 direct and indirect competitors across open banking infrastructure, B2B payments, and traditional corporate banking. Key finding: no Saudi-native product currently addresses the full supplier payment workflow — initiation, invoice matching, and reconciliation — for mid-market SMEs.',
    fullReport: `Scope: Direct competitors (B2B payment software), infrastructure players (open banking), and indirect competitors (traditional corporate banking, accounting software).

Direct Competitors
Lean Technologies: Open banking API infrastructure. Not a consumer product — Tradepay is actually a Lean customer, not a competitor. Threat: Low.
HyperPay: Payment gateway, primarily consumer and e-commerce. Limited B2B-specific features, no invoice management. Threat: Low.
Geidea: POS and payments, primarily retail-focused. Recently expanding into SME payments. Raised SAR 500M. Threat: Medium (could expand into B2B workflows).
Stcpay: Consumer wallet backed by STC. No B2B payment workflow. Threat: Low.

Indirect Competitors
Al-Rajhi Business Banking App: Most-used corporate banking app in Saudi. Better UX than peers but not designed for payment workflow management. Threat: Medium-High (bank could build this natively).
Qoyod: Saudi accounting software with supplier payment feature but no integrated payment initiation. Potential integration partner. Threat: Low.
SAP Business One: Used by larger SMEs. Finance teams use it as system of record. Integration opportunity rather than threat.

Key Finding: No Saudi-native product combines open banking payment initiation, invoice matching, and reconciliation in a single workflow for mid-market SMEs. This is the gap Tradepay fills.

International analogues not in Saudi: Tipalti (US, B2B AP automation), Stripe Treasury (US), Modulr (UK). None have Saudi operations.

Our sustainable differentiation: Saudi-first compliance (SAMA, ZATCA, Fatoora), Arabic UI roadmap, local bank integrations, and Sanabil Studio support network.`,
  },
  {
    id: 'mr-3', title: 'Regulatory Landscape Review', type: 'Regulatory',
    date: 'Dec 2025', conductor: 'Nora Khalid',
    summary: 'Comprehensive review of SAMA regulations, ZATCA requirements, and fintech licensing pathways. Conclusion: SAMA Sandbox is the correct initial route. Full PSP license required before scaling beyond 500 customers or SAR 5M/month payment volume.',
    fullReport: `Prepared by: Nora Khalid, Legal Lead, Sanabil Studio — December 2025

1. SAMA Fintech Regulatory Sandbox
Application requires: detailed business model, risk assessment, compliance framework. Approval timeline: 4–6 weeks from complete application. Operating limits: up to 500 users, SAR 5M/month volume. Duration: 12 months, renewable once. Recommendation: Apply immediately. This is the correct initial path.

2. Payment Services Provider (PSP) License
Required for commercial operation beyond Sandbox limits. Capital requirement: SAR 10M minimum paid-up capital. Processing timeline: 12–18 months. Recommendation: Begin preparation after Sandbox approval. Target full license by Q1 2027.

3. ZATCA and E-Invoicing (Fatoora)
Phase 2 (Integration Phase) effective January 2025 for large companies. SME cascade rolling through 2025–2026. Invoice validation via ZATCA API is both a compliance requirement and a product feature (fraud reduction). Already integrated in Tradepay v0.3.

4. Open Banking Framework
SAMA published Open Banking Framework in 2022, defining standards for Account Information Services and Payment Initiation Services. Lean Technologies holds the relevant licenses — Tradepay operating as a Lean customer is compliant.

5. Data Residency
Saudi financial data must be processed and stored within Saudi Arabia or Bahrain. AWS Bahrain (me-south-1) satisfies this requirement.

Key Risks
1. Sandbox application rejected — mitigation: engage SAMA regulatory consultants.
2. ZATCA API changes — mitigation: subscribe to developer portal updates, build abstraction layer.
3. Foreign ownership restrictions — confirmed structure is compliant as Saudi-owned entity.`,
  },
  {
    id: 'mr-4', title: 'Customer Segmentation Study', type: 'Customer Research',
    date: 'Jan 2026', conductor: 'Layla Mahmoud, Sarah Al-Rashid',
    summary: 'Analysis of 142 survey respondents and 12 in-depth interviews to identify highest-value segments. Key finding: the "Finance-Mature Mid-Market" segment (50–200 employees, dedicated finance staff) shows highest willingness to pay, fastest sales cycles, and lowest churn indicators.',
    fullReport: `Methodology: 142 survey responses + 12 qualitative interviews + analysis of comparable B2B fintech customer data from SSU portfolio.

Segment 1: Micro SMEs (fewer than 20 employees, under SAR 10M revenue)
Saudi count: approximately 380,000 companies. Payment behavior: Owner manages all payments personally, typically 5–15 suppliers. Willingness to pay: SAR 300–800/month. Fit: Poor. Budget constrained, high churn expected, owner is single point of failure. Decision: Excluded from Phase 1.

Segment 2: Finance-Mature Mid-Market (50–200 employees, SAR 50M–200M revenue)
Saudi count: approximately 45,000 companies. Payment behavior: Dedicated finance team of 2–5 people, 40–150 active suppliers, monthly payment runs. Willingness to pay: SAR 3,000–8,000/month. Fit: Excellent. Primary target segment.

Segment 3: Finance-Emerging Mid-Market (20–50 employees, SAR 10M–50M revenue)
Saudi count: approximately 83,000 companies. Payment behavior: Single finance person or owner, 15–40 suppliers. Willingness to pay: SAR 800–2,500/month. Fit: Good. Serve with self-service onboarding and lower-touch model. Secondary target.

Segment 4: Enterprise SME (200+ employees, over SAR 200M revenue)
Saudi count: approximately 12,000 companies. Payment behavior: ERP-dependent, treasury management tools, complex approval workflows. Willingness to pay: SAR 10,000–25,000/month but only with ERP integration. Fit: Poor for Phase 1. SAP integration not yet built. Sales cycle 6–12 months. Phase 3 opportunity.

ICP Defined: Industry: wholesale trade, food distribution, construction materials, manufacturing. Size: 50–150 employees. Revenue: SAR 30M–150M. Suppliers: 30–100 active. Finance team: 2–4 people. Technology: uses Qoyod or similar. Geography: Riyadh (Phase 1).`,
  },
]

const TECH_STACK_GROUPS = [
  {
    group: 'Frontend', color: 'bg-pulse-blue/10 text-pulse-blue',
    items: [
      { name: 'Next.js 14', detail: 'App Router, SSR', why: 'Chosen for SSR performance and React ecosystem maturity. App Router enables granular caching and streaming.', limitations: 'App Router still maturing; some third-party libraries lack full support.', docs: 'https://nextjs.org/docs' },
      { name: 'Tailwind CSS', detail: 'Utility-first styling', why: 'Rapid UI iteration without leaving HTML. Consistent design token system reduces CSS bugs.', limitations: 'Class verbosity can make templates harder to read without tooling or plugins.', docs: 'https://tailwindcss.com/docs' },
      { name: 'TypeScript', detail: 'Type safety', why: 'Catches payment-critical bugs at compile time. API response types auto-validated.', limitations: 'Adds initial overhead. Strict mode requires careful vendor type declarations.', docs: 'https://www.typescriptlang.org/docs' },
      { name: 'shadcn/ui', detail: 'Accessible components', why: 'Unstyled, accessible components — no vendor lock-in. Code is copied, not imported.', limitations: 'Component updates are manual. No automatic upgrades.', docs: 'https://ui.shadcn.com' },
    ],
  },
  {
    group: 'Backend', color: 'bg-amber/10 text-amber',
    items: [
      { name: 'Node.js', detail: 'v20 LTS runtime', why: 'Team expertise. Large ecosystem for fintech libraries. Same language as frontend reduces context switching.', limitations: 'Single-threaded — CPU-intensive tasks (OCR) must be offloaded to worker threads or Lambda.', docs: 'https://nodejs.org/en/docs' },
      { name: 'Fastify', detail: '3x faster than Express', why: 'Benchmarks show 3x throughput over Express at high concurrency. Built-in JSON Schema validation reduces boilerplate.', limitations: 'Smaller ecosystem than Express. Some middleware is Express-only and requires adapters.', docs: 'https://fastify.dev/docs/latest' },
      { name: 'PostgreSQL', detail: 'Primary database on RDS', why: 'ACID compliance critical for financial transactions. Row-level locking prevents double-spend. Rich JSON support for flexible invoice storage.', limitations: 'Schema migrations require careful zero-downtime planning.', docs: 'https://www.postgresql.org/docs' },
      { name: 'Redis', detail: 'Session & rate limiting', why: 'Sub-millisecond session lookup. Atomic operations for rate limiting counters. Pub/sub for real-time payment status updates.', limitations: 'In-memory only — must be treated as cache, not primary data store.', docs: 'https://redis.io/docs' },
    ],
  },
  {
    group: 'Payments', color: 'bg-pulse-green/10 text-pulse-green',
    items: [
      { name: 'Lean Technologies', detail: 'Open banking', why: 'SAMA-licensed open banking API. Covers 95% of Saudi bank accounts. Best-in-class developer experience and SDK.', limitations: 'Sandbox has limited bank coverage. Webhook latency can be 2–5 seconds.', docs: 'https://leantechnologies.com/docs' },
      { name: 'MADA', detail: 'Card processing', why: 'Essential for Saudi — 95% of Saudi cards are MADA. Direct acquiring avoids payment facilitator fees.', limitations: 'Direct acquiring requires SAMA approval. Currently using acquiring bank intermediary.', docs: 'https://www.mada.com.sa/en' },
      { name: 'AWS Textract', detail: 'Invoice OCR', why: 'Best Arabic + English OCR accuracy in benchmarks. Handles scanned, photographed, and PDF invoices. Native AWS integration.', limitations: 'Accuracy on handwritten Arabic text: approximately 60%. Manual correction UI required as fallback.', docs: 'https://aws.amazon.com/textract' },
    ],
  },
  {
    group: 'Infrastructure', color: 'bg-text-dim/10 text-text-muted',
    items: [
      { name: 'AWS Bahrain (me-south-1)', detail: 'Data residency', why: 'Saudi financial data residency regulations require storage in KSA or Bahrain. AWS me-south-1 is the only hyperscale region meeting this requirement.', limitations: 'Limited service availability vs us-east-1. Some newer AWS services not yet available in Bahrain.', docs: 'https://aws.amazon.com/about-aws/global-infrastructure/regions_az/' },
      { name: 'Terraform', detail: 'Infrastructure as code', why: 'All infrastructure defined in code — reproducible, version-controlled, and auditable. Critical for compliance audit trails.', limitations: 'State management requires careful team coordination. Remote state locking is mandatory.', docs: 'https://developer.hashicorp.com/terraform/docs' },
      { name: 'GitHub Actions', detail: 'CI/CD pipeline', why: 'Integrated with existing GitHub code hosting. Large actions marketplace for Node, Docker, and AWS deployments.', limitations: 'Minutes quota on shared runners can slow builds during peak periods.', docs: 'https://docs.github.com/en/actions' },
      { name: 'Docker + ECS', detail: 'Containers', why: 'Containers ensure consistent environments from development to production. ECS is simpler than Kubernetes for our current scale.', limitations: 'ECS lacks some advanced Kubernetes routing features. Acceptable trade-off at current scale.', docs: 'https://docs.aws.amazon.com/ecs' },
    ],
  },
  {
    group: 'Observability', color: 'bg-pulse-red/10 text-pulse-red',
    items: [
      { name: 'Datadog', detail: 'APM & monitoring', why: 'End-to-end transaction tracing is critical for debugging payment failures. Real-time alerting on p95 latency and error rates.', limitations: 'Cost scales with data volume — monitoring cost must be budgeted as payment volume grows.', docs: 'https://docs.datadoghq.com' },
      { name: 'Sentry', detail: 'Error tracking', why: 'Automatic error capture with full stack traces. Source maps integration means production errors are debuggable against original TypeScript source.', limitations: 'PII scrubbing rules must be carefully configured for financial data compliance.', docs: 'https://docs.sentry.io' },
      { name: 'AWS Secrets Manager', detail: 'Secrets management', why: 'Centralized, audited secret rotation. Bank API keys rotated automatically. Full access audit log for compliance requirements.', limitations: 'AWS-vendor specific. Migration cost if cloud provider changes.', docs: 'https://docs.aws.amazon.com/secretsmanager' },
    ],
  },
]

const BURN_DATA = [
  { month: 'Oct \'25', burn: 48 },
  { month: 'Nov \'25', burn: 61 },
  { month: 'Dec \'25', burn: 79 },
  { month: 'Jan \'26', burn: 95 },
  { month: 'Feb \'26', burn: 104 },
  { month: 'Mar \'26', burn: 118 },
]

const FINANCIAL_EVENTS = [
  { date: 'Sep 2025', event: 'Studio venture thesis approved by investment committee', type: 'milestone' },
  { date: 'Nov 2025', event: 'Market validation budget allocated — SAR 120,000', amount: 'SAR 120K', type: 'funding' },
  { date: 'Jan 2026', event: 'Seed round closed', amount: 'SAR 2,400,000', type: 'funding' },
  { date: 'Jan 2026', event: 'Al-Rajhi corporate account opened', type: 'milestone' },
  { date: 'Jan 2026', event: 'ZATCA VAT registration completed', type: 'compliance' },
  { date: 'Feb 2026', event: 'First pilot signed — Al-Mashreq Trading', amount: 'SAR 5,000/mo', type: 'revenue' },
  { date: 'Feb 2026', event: 'Q1 VAT return filed (SAR 0 — pre-revenue quarter)', type: 'compliance' },
  { date: 'Mar 2026', event: 'Second pilot — Nasser Trading Co.', amount: 'SAR 4,200/mo', type: 'revenue' },
  { date: 'Mar 2026', event: 'Third pilot — Al-Farouk Distribution', amount: 'SAR 3,800/mo', type: 'revenue' },
]

const EVENT_COLORS = {
  funding:    'bg-pulse-green text-white',
  revenue:    'bg-amber text-white',
  milestone:  'bg-pulse-blue/10 text-pulse-blue',
  compliance: 'bg-bg-elevated text-text-muted',
}

const PRE_SPINOUT_TEAM = [
  {
    id: 'th-1', name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', type: 'Founding Team',
    period: 'Jan 2026 – Present', initials: 'MA',
    contribution: 'Founded Tradepay following 5 years at STC Pay (led B2B product team) and 2 years at Riyad Bank (digital transformation). Drove company vision, closed the seed round, signed the first 3 pilot customers, and owns all regulatory relationships.',
    contact: 'mustafa@tradepay.sa',
  },
  {
    id: 'th-2', name: 'Sarah Al-Rashid', role: 'Portfolio Manager', type: 'SSU Team',
    period: 'Sep 2025 – Present', initials: 'SA',
    contribution: 'Led the initial market validation, conducted or facilitated all 12 customer discovery interviews, defined the go-to-market strategy, and managed investor relations during the prototype phase. Drove MVP scope decisions and ICP definition.',
    contact: 'sarah@sanabilstudio.sa',
  },
  {
    id: 'th-3', name: 'Omar Hassan', role: 'Venture Architect', type: 'SSU Team',
    period: 'Oct 2025 – Present', initials: 'OH',
    contribution: 'Designed the end-to-end technical architecture, selected the tech stack, built prototype v0.1 and v0.2, and established engineering best practices including CI/CD, IaC, and security standards. Conducted the technical review session.',
    contact: 'omar@sanabilstudio.sa',
  },
  {
    id: 'th-4', name: 'Layla Mahmoud', role: 'Product Manager (Embedded)', type: 'SSU Embedded',
    period: 'Jan 2026 – Present', initials: 'LM',
    contribution: 'Embedded full-time as founding PM. Owns the product roadmap, designed all user flows, ran all 4 usability testing sessions, authored the PRD, and shipped the bulk payment feature in 5 days from concept to production.',
    contact: 'layla@sanabilstudio.sa',
  },
  {
    id: 'th-5', name: 'Nora Khalid', role: 'Legal Lead', type: 'SSU Team',
    period: 'Jan 2026 – Feb 2026', initials: 'NK',
    contribution: 'Managed Commercial Registration process, drafted shareholder agreement, conducted full regulatory landscape review, prepared SAMA Sandbox application, and set up ZATCA VAT registration. Advised on LLC vs CJSC entity structure decision.',
    contact: 'nora@sanabilstudio.sa',
  },
  {
    id: 'th-6', name: 'Ahmed Saleh', role: 'Finance Lead', type: 'SSU Team',
    period: 'Jan 2026 – Present', initials: 'AS',
    contribution: 'Set up financial infrastructure including Qoyod accounting, chart of accounts, and expense policy. Built the 13-week cash flow model and monthly burn rate dashboard. Managed seed round financial reporting and filed Q1 VAT return.',
    contact: 'ahmed@sanabilstudio.sa',
  },
  {
    id: 'th-7', name: 'Rania Faisal', role: 'Talent Lead', type: 'SSU Team',
    period: 'Feb 2026 – Mar 2026', initials: 'RF',
    contribution: 'Led CTO recruitment: sourced 47 candidates, screened to 12, shortlisted to 5 for founder interviews. Provided hiring process design and compensation benchmarking for early-stage Saudi fintech roles.',
    contact: 'rania@sanabilstudio.sa',
  },
]

// ─────────────────────────────────────────────
// Shared UI components
// ─────────────────────────────────────────────

function TagBadge({ tag }) {
  const colorClass = TAG_COLORS[tag] || 'bg-bg-elevated text-text-muted'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {tag}
    </span>
  )
}

function StatusBadge({ status }) {
  const cls = STATUS_COLORS[status] || 'bg-bg-elevated text-text-muted border-border'
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${cls}`}>
      {status === 'Final' && <Check size={9} />}
      {status}
    </span>
  )
}

function StatCard({ label, value, sub, color = 'text-amber' }) {
  return (
    <div className="bg-bg-surface border border-border rounded-xl p-4">
      <p className="text-xs text-text-dim mb-1">{label}</p>
      <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
      {sub && <p className="text-xs text-text-muted mt-1">{sub}</p>}
    </div>
  )
}

function SectionSubheading({ children }) {
  return (
    <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-3 mt-8 first:mt-0">
      {children}
    </p>
  )
}

// Decision card used for Product Decisions and Design Decisions (structured)
function StructuredDecisionCard({ decision }) {
  return (
    <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
      <div className="flex items-start justify-between gap-3 p-5 pb-4">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text">{decision.title}</h3>
          <p className="text-xs text-text-dim mt-1">{decision.date} · {decision.decider}</p>
        </div>
        <StatusBadge status={decision.status} />
      </div>
      <div className="mx-5 mb-4 p-3 bg-amber/5 border border-amber/20 rounded-lg">
        <p className="text-[10px] font-semibold text-amber uppercase tracking-widest mb-1.5">Decision</p>
        <p className="text-sm text-text">{decision.decided}</p>
      </div>
      <div className="px-5 mb-3">
        <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1.5">Rationale</p>
        <p className="text-sm text-text-muted leading-relaxed">{decision.why}</p>
      </div>
      <div className="px-5 pb-5">
        <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1.5">Outcome</p>
        <p className="text-sm text-text-muted leading-relaxed">{decision.outcome}</p>
      </div>
    </div>
  )
}

// Legacy decision card (for mockData content) — renders inline bold properly
function LegacyDecisionCard({ block, accentColor = 'border-amber' }) {
  const lines = block.content.split('\n').filter(l => l.trim())
  return (
    <div className={`bg-bg-card border border-border border-l-4 ${accentColor} rounded-xl p-5 space-y-2`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-text">{block.title}</h3>
        <TagBadge tag={block.tag} />
      </div>
      <div className="space-y-1.5 pt-1">
        {lines.map((line, i) => (
          <p key={i} className="text-sm text-text-muted leading-relaxed">{parseInline(line)}</p>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Section renderers
// ─────────────────────────────────────────────

function MarketOverview() {
  const data = ventureContextData['market-overview']
  const competitors = [
    { name: 'Lean Technologies', focus: 'Open banking API', raised: '$33M',   stage: 'Series B', threat: 'Low' },
    { name: 'HyperPay',          focus: 'Payment gateway',  raised: '$22M',   stage: 'Series A', threat: 'Low' },
    { name: 'Geidea',            focus: 'SME payments / POS', raised: 'SAR 500M', stage: 'Growth', threat: 'Medium' },
    { name: 'Tabby / Tamara',    focus: 'Consumer BNPL',    raised: '$200M+', stage: 'Series C', threat: 'Low' },
    { name: 'Stcpay',            focus: 'Consumer wallet',  raised: 'State-backed', stage: 'Growth', threat: 'Low' },
  ]
  const threatColor = { High: 'text-pulse-red', Medium: 'text-amber', Low: 'text-pulse-green' }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Addressable Market" value="$4.2B" sub="18% CAGR" />
        <StatCard label="Supplier Payments Segment" value="$2.1B" sub="35% CAGR" color="text-pulse-blue" />
        <StatCard label="Target SOM — Year 1" value="$4.2M" sub="1% market share" color="text-pulse-green" />
      </div>
      {data && data.blocks.map(block => (
        <LegacyDecisionCard key={block.id} block={block} accentColor="border-amber" />
      ))}
      <div>
        <h3 className="text-sm font-semibold text-text mb-3">Competitor Map</h3>
        <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg-elevated">
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">Company</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">Focus</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">Raised</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">Stage</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">Threat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {competitors.map(c => (
                <tr key={c.name} className="hover:bg-bg-elevated/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-text">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-text-muted">{c.focus}</td>
                  <td className="px-4 py-3 text-sm font-mono text-text-muted">{c.raised}</td>
                  <td className="px-4 py-3 text-xs text-text-muted">{c.stage}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${threatColor[c.threat]}`}>{c.threat}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p className="text-xs text-text-dim uppercase tracking-widest font-semibold mb-3">Sources</p>
        <div className="space-y-1.5">
          {['SCAICT Digital Economy Report 2025', 'Euromonitor Saudi Arabia Country Report', 'SAMA Open Banking Framework', 'PitchBook GCC Fintech Deal Flow 2025'].map(src => (
            <div key={src} className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors cursor-pointer">
              <ExternalLink size={12} className="text-text-dim shrink-0" />
              {src}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductDecisions() {
  return (
    <div className="space-y-4">
      {PRODUCT_DECISIONS.map(d => <StructuredDecisionCard key={d.id} decision={d} />)}
    </div>
  )
}

function DesignFlows() {
  const [openFlow, setOpenFlow] = useState(null)

  return (
    <div className="space-y-8">
      {/* User Flows */}
      <div>
        <SectionSubheading>User Flows</SectionSubheading>
        <div className="space-y-3">
          {USER_FLOWS.map(flow => (
            <div key={flow.id} className="bg-bg-surface border border-border rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-pulse-blue/10 flex items-center justify-center shrink-0">
                <Layers size={16} className="text-pulse-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text">{flow.name}</p>
                <p className="text-xs text-text-muted mt-0.5 mb-2 leading-relaxed">{flow.description}</p>
                <p className="text-xs text-text-dim">Designed by {flow.designer} · {flow.date} · {flow.steps.length} steps</p>
              </div>
              <button
                onClick={() => setOpenFlow(flow)}
                className="flex items-center gap-1.5 text-xs font-medium text-pulse-blue hover:text-pulse-blue/80 shrink-0 bg-pulse-blue/10 hover:bg-pulse-blue/15 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Eye size={12} />
                View Flow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Wireframes */}
      <div>
        <SectionSubheading>Wireframes</SectionSubheading>
        <div className="grid grid-cols-3 gap-4">
          {WIREFRAMES.map(wf => (
            <div key={wf.id} className="bg-bg-surface border border-border rounded-xl overflow-hidden group">
              {/* Wireframe placeholder */}
              <div className="h-28 bg-bg-elevated border-b border-border flex items-center justify-center relative">
                <div className="w-16 h-10 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                  <FileText size={16} className="text-text-dim" />
                </div>
                <button className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors opacity-0 group-hover:opacity-100">
                  <span className="text-xs font-medium text-white bg-black/60 px-2.5 py-1 rounded-lg">View</span>
                </button>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-text">{wf.name}</p>
                <p className="text-[10px] text-text-dim mt-0.5">{wf.designer} · {wf.date}</p>
                <span className="inline-block mt-1.5 text-[10px] font-medium px-1.5 py-0.5 bg-bg-elevated rounded text-text-muted">{wf.version}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Decisions */}
      <div>
        <SectionSubheading>Design Decisions</SectionSubheading>
        <div className="space-y-4">
          {DESIGN_DECISIONS.map(d => <StructuredDecisionCard key={d.id} decision={d} />)}
        </div>
      </div>

      {/* Flow detail panel */}
      <SidePanel
        isOpen={!!openFlow}
        onClose={() => setOpenFlow(null)}
        title={openFlow?.name || ''}
        width="w-[500px]"
      >
        {openFlow && (
          <div className="p-6 space-y-5">
            <div>
              <p className="text-xs text-text-muted mb-1">{openFlow.description}</p>
              <p className="text-xs text-text-dim">Designed by {openFlow.designer} · {openFlow.date}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-3">Flow Steps</p>
              <ol className="space-y-2.5">
                {openFlow.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber/10 text-amber text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-text-muted leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </SidePanel>
    </div>
  )
}

function UserResearch() {
  const [openInterview, setOpenInterview] = useState(null)

  return (
    <div className="space-y-8">
      {/* Key themes */}
      <div>
        <SectionSubheading>Key Research Themes</SectionSubheading>
        <div className="grid grid-cols-3 gap-4">
          {RESEARCH_THEMES.map((theme, i) => (
            <div key={i} className="bg-bg-surface border border-border rounded-xl p-5 text-center">
              <p className={`text-3xl font-bold font-mono ${theme.color} mb-2`}>{theme.stat}</p>
              <p className="text-xs text-text-muted leading-relaxed">{theme.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Interviews */}
      <div>
        <SectionSubheading>User Interviews</SectionSubheading>
        <div className="space-y-3">
          {USER_INTERVIEWS.map(interview => (
            <div key={interview.id} className="bg-bg-surface border border-border rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm font-semibold text-text">{interview.subject}</p>
                  <p className="text-xs text-text-dim mt-0.5">{interview.companySize} · {interview.date} · Conducted by {interview.conductor}</p>
                </div>
                <button
                  onClick={() => setOpenInterview(interview)}
                  className="flex items-center gap-1.5 text-xs font-medium text-pulse-blue hover:text-pulse-blue/80 shrink-0 bg-pulse-blue/10 hover:bg-pulse-blue/15 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <FileText size={12} />
                  Full Notes
                </button>
              </div>
              <ul className="space-y-1.5">
                {interview.insights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="w-1 h-1 rounded-full bg-amber mt-2 shrink-0" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Survey Results */}
      <div>
        <SectionSubheading>Survey Results</SectionSubheading>
        <div className="space-y-4">
          {SURVEYS.map(survey => (
            <div key={survey.id} className="bg-bg-surface border border-border rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm font-semibold text-text">{survey.name}</p>
                  <p className="text-xs text-text-dim mt-0.5">{survey.respondents} respondents · {survey.date}</p>
                </div>
                <span className="text-[10px] font-medium px-2.5 py-1 bg-pulse-blue/10 text-pulse-blue rounded-full shrink-0">Survey</span>
              </div>
              <ul className="space-y-1.5">
                {survey.findings.map((finding, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="w-1 h-1 rounded-full bg-pulse-blue mt-2 shrink-0" />
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Interview notes panel */}
      <SidePanel
        isOpen={!!openInterview}
        onClose={() => setOpenInterview(null)}
        title={openInterview?.subject || ''}
        width="w-[540px]"
      >
        {openInterview && (
          <div className="p-6 space-y-5">
            <div>
              <p className="text-xs text-text-muted">{openInterview.companySize}</p>
              <p className="text-xs text-text-dim mt-0.5">{openInterview.date} · Conducted by {openInterview.conductor}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-3">Key Insights</p>
              <ul className="space-y-2">
                {openInterview.insights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber mt-1.5 shrink-0" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-3">Full Interview Notes</p>
              <div className="space-y-3">
                {openInterview.fullNotes.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-text-muted leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </SidePanel>
    </div>
  )
}

function Partnerships() {
  const partnerTypeColor = TAG_COLORS

  return (
    <div className="space-y-4">
      {PARTNERSHIPS.map(p => (
        <div key={p.id} className="bg-bg-surface border border-border rounded-xl p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0">
                <Building2 size={16} className="text-text-muted" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text">{p.partner}</p>
                <p className="text-xs text-text-dim mt-0.5">{p.contact}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <TagBadge tag={p.type} />
              <StatusBadge status={p.status} />
            </div>
          </div>
          <p className="text-sm text-text-muted leading-relaxed mb-3">{p.description}</p>
          <div className="flex items-start gap-6 pt-3 border-t border-border">
            <div>
              <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1">Initiated</p>
              <p className="text-xs text-text-muted">{p.initiated}</p>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1">Next Steps</p>
              <p className="text-xs text-text-muted leading-relaxed">{p.nextSteps}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function PrototypeTesting() {
  const versionColors = ['bg-bg-elevated', 'bg-pulse-blue/10', 'bg-amber/10']
  const versionTextColors = ['text-text-muted', 'text-pulse-blue', 'text-amber']
  const typeColors = {
    'Usability Test':    'bg-pulse-blue/10 text-pulse-blue',
    'Stakeholder Demo':  'bg-amber/10 text-amber',
    'Technical Review':  'bg-pulse-red/10 text-pulse-red',
  }

  return (
    <div className="space-y-8">
      {/* Prototype Versions */}
      <div>
        <SectionSubheading>Prototype Versions</SectionSubheading>
        <div className="space-y-4">
          {PROTOTYPE_VERSIONS.map((pv, idx) => (
            <div key={pv.id} className="bg-bg-surface border border-border rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${versionColors[idx]}`}>
                  <span className={`text-sm font-bold font-mono ${versionTextColors[idx]}`}>{pv.version}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-text">{pv.date}</p>
                      <p className="text-xs text-text-dim mt-0.5">{pv.built}</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed mt-2">{pv.description}</p>
                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1">Changes from prior</p>
                      <p className="text-xs text-text-muted leading-relaxed">{pv.changes}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1">Testing outcome</p>
                      <p className="text-xs text-text-muted leading-relaxed">{pv.testingOutcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testing Sessions */}
      <div>
        <SectionSubheading>Testing Sessions</SectionSubheading>
        <div className="space-y-4">
          {TESTING_SESSIONS.map(ts => (
            <div key={ts.id} className="bg-bg-surface border border-border rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeColors[ts.type] || 'bg-bg-elevated text-text-muted'}`}>
                      {ts.type}
                    </span>
                    <p className="text-sm font-semibold text-text">{ts.date}</p>
                  </div>
                  <p className="text-xs text-text-dim">{ts.participants} participants · Run by {ts.conductor}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-2">Key Findings</p>
                  <ul className="space-y-1.5">
                    {ts.findings.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="w-1 h-1 rounded-full bg-pulse-blue mt-2 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1.5">Actions Taken</p>
                  <p className="text-sm text-text-muted leading-relaxed">{ts.actions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MarketResearch() {
  const [openReport, setOpenReport] = useState(null)

  return (
    <div className="space-y-6">
      {/* Market stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MARKET_STATS.map((s, i) => (
          <StatCard key={i} label={s.label} value={s.value} sub={s.sub} color={s.color} />
        ))}
      </div>

      {/* Research items */}
      <div className="space-y-4">
        {MARKET_RESEARCH_ITEMS.map(item => (
          <div key={item.id} className="bg-bg-surface border border-border rounded-xl p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text">{item.title}</p>
                <p className="text-xs text-text-dim mt-0.5">{item.date} · {item.conductor}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <TagBadge tag={item.type} />
                <button
                  onClick={() => setOpenReport(item)}
                  className="flex items-center gap-1.5 text-xs font-medium text-pulse-blue hover:text-pulse-blue/80 bg-pulse-blue/10 hover:bg-pulse-blue/15 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Eye size={12} />
                  View Report
                </button>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">{item.summary}</p>
          </div>
        ))}
      </div>

      {/* Report panel */}
      <SidePanel
        isOpen={!!openReport}
        onClose={() => setOpenReport(null)}
        title={openReport?.title || ''}
        width="w-[560px]"
      >
        {openReport && (
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-2">
              <TagBadge tag={openReport.type} />
              <span className="text-xs text-text-dim">{openReport.date} · {openReport.conductor}</span>
            </div>
            <div className="space-y-4">
              {openReport.fullReport.split('\n\n').map((para, i) => {
                const trimmed = para.trim()
                if (!trimmed) return null
                // If the paragraph is a single short line (likely a heading)
                if (trimmed.length < 80 && !trimmed.includes('.')) {
                  return <p key={i} className="text-xs font-bold text-text uppercase tracking-wide mt-4 first:mt-0">{trimmed}</p>
                }
                return <p key={i} className="text-sm text-text-muted leading-relaxed">{trimmed}</p>
              })}
            </div>
          </div>
        )}
      </SidePanel>
    </div>
  )
}

function TechStack() {
  const [openTech, setOpenTech] = useState(null)

  function handleBadgeClick(item) {
    setOpenTech(prev => prev?.name === item.name ? null : item)
  }

  return (
    <div className="space-y-6">
      {TECH_STACK_GROUPS.map(group => (
        <div key={group.group}>
          <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-3">{group.group}</p>
          <div className="flex flex-wrap gap-2">
            {group.items.map(item => (
              <button
                key={item.name}
                onClick={() => handleBadgeClick(item)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105 ${group.color} ${openTech?.name === item.name ? 'ring-2 ring-amber/40 scale-105' : 'border-transparent'}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Tech detail panel */}
      {openTech && (
        <div className="bg-bg-surface border border-border rounded-xl p-5 mt-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-text">{openTech.name}</h3>
              <p className="text-xs text-text-dim mt-0.5">{openTech.detail}</p>
            </div>
            <button
              onClick={() => setOpenTech(null)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-text-dim hover:text-text hover:bg-bg-elevated transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1.5">Why chosen</p>
              <p className="text-sm text-text-muted leading-relaxed">{openTech.why}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1.5">Known limitations</p>
              <p className="text-sm text-text-muted leading-relaxed">{openTech.limitations}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1.5">Documentation</p>
              <a
                href={openTech.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-pulse-blue hover:text-pulse-blue/80 hover:underline transition-colors"
              >
                <ExternalLink size={12} />
                {openTech.docs}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function KeyDecisionsLog() {
  const data = ventureContextData['key-decisions']
  const [searchQ, setSearchQ] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', 'Legal', 'Finance', 'Regulatory', 'Decision Log', 'Architecture']

  const allBlocks = data ? data.blocks : []
  const filtered = allBlocks.filter(b => {
    const matchCat = activeCategory === 'All' || b.tag === activeCategory
    const matchQ = !searchQ || b.title.toLowerCase().includes(searchQ.toLowerCase()) || b.content.toLowerCase().includes(searchQ.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            placeholder="Search decisions…"
            className="w-full pl-8 pr-3 py-2 rounded-lg border border-border bg-white text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-amber/60 focus:ring-2 focus:ring-amber/10 transition-all"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${activeCategory === cat ? 'bg-amber/10 text-amber border border-amber/20' : 'bg-bg-elevated text-text-muted border border-border hover:text-text'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-text-muted text-sm">No decisions match your search.</div>
      ) : (
        filtered.map(block => <LegacyDecisionCard key={block.id} block={block} accentColor="border-pulse-red" />)
      )}
    </div>
  )
}

function FinancialHistory() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Pre-Spin-Out Investment" value="SAR 120K" sub="Studio validation budget" />
        <StatCard label="Seed Capital Raised" value="SAR 2.4M" sub="January 2026" color="text-pulse-green" />
        <StatCard label="Runway Remaining" value="14 mo" sub="At SAR 118K/mo burn" color="text-pulse-blue" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Current MRR" value="SAR 13,000" sub="3 pilot customers" color="text-amber" />
        <StatCard label="Monthly Burn at Spin-Out" value="SAR 95K" sub="January 2026 baseline" />
      </div>

      <div className="bg-bg-surface border border-border rounded-xl p-5">
        <p className="text-sm font-semibold text-text mb-4">Monthly Burn Rate (SAR '000)</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={BURN_DATA} barSize={28}>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 12 }}
              formatter={v => [`SAR ${v}K`, 'Burn']}
            />
            <Bar dataKey="burn" fill="#2563EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <p className="text-sm font-semibold text-text mb-4">Financial Timeline</p>
        <div className="space-y-3">
          {FINANCIAL_EVENTS.map((ev, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-20 shrink-0 pt-2.5">
                <span className="text-xs text-text-dim">{ev.date}</span>
              </div>
              <div className="flex-1 flex items-start gap-3 p-3 bg-bg-surface border border-border rounded-xl">
                <div className="flex-1">
                  <p className="text-sm text-text font-medium">{ev.event}</p>
                  {ev.amount && <p className="text-xs font-mono text-text-muted mt-0.5">{ev.amount}</p>}
                </div>
                <span className={`ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${EVENT_COLORS[ev.type]}`}>
                  {ev.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TeamHistory() {
  const groups = ['Founding Team', 'SSU Team', 'SSU Embedded']
  const groupColors = {
    'Founding Team': 'bg-amber/10 text-amber',
    'SSU Team':      'bg-pulse-blue/10 text-pulse-blue',
    'SSU Embedded':  'bg-pulse-green/10 text-pulse-green',
  }

  return (
    <div className="space-y-8">
      {groups.map(group => {
        const members = PRE_SPINOUT_TEAM.filter(m => m.type === group)
        if (!members.length) return null
        return (
          <div key={group}>
            <SectionSubheading>{group}</SectionSubheading>
            <div className="space-y-3">
              {members.map(m => (
                <div key={m.id} className="bg-bg-surface border border-border rounded-xl p-5 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${groupColors[group]}`}>
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="text-sm font-semibold text-text">{m.name}</p>
                        <p className="text-xs text-text-muted">{m.role} · {m.period}</p>
                      </div>
                      <a
                        href={`mailto:${m.contact}`}
                        className="flex items-center gap-1.5 text-xs text-pulse-blue hover:underline shrink-0"
                      >
                        <Link size={11} />
                        {m.contact}
                      </a>
                    </div>
                    <p className="text-xs text-text-dim leading-relaxed mt-2">{m.contribution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────
// Section map
// ─────────────────────────────────────────────

const SECTION_RENDERERS = {
  'market-overview':   MarketOverview,
  'product-decisions': ProductDecisions,
  'design-flows':      DesignFlows,
  'user-research':     UserResearch,
  'partnerships':      Partnerships,
  'prototype-testing': PrototypeTesting,
  'market-research':   MarketResearch,
  'tech-stack':        TechStack,
  'financial-history': FinancialHistory,
  'team-history':      TeamHistory,
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────

export default function VentureContext() {
  const [activeSection, setActiveSection] = useState('market-overview')

  const SectionContent = SECTION_RENDERERS[activeSection]
  const activeDef = SECTIONS.find(s => s.id === activeSection)

  return (
    <Layout title="Venture Context" subtitle="Tradepay · Full institutional memory from prototype phase">
      <div className="flex h-full">
        {/* Left sticky nav */}
        <aside className="w-56 shrink-0 border-r border-border bg-bg-surface flex flex-col py-4 px-3 sticky top-0 h-full overflow-y-auto">
          <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest px-2 mb-3">Sections</p>
          <nav className="space-y-0.5">
            {SECTIONS.map(section => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${isActive ? 'bg-amber/10 text-amber font-medium' : 'text-text-muted hover:text-text hover:bg-bg-elevated'}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-amber' : 'bg-transparent'}`} />
                  <Icon size={14} className="shrink-0" />
                  <span className="leading-tight">{section.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="mt-auto pt-4 border-t border-border px-2">
            <p className="text-[10px] text-text-dim leading-relaxed">
              Tradepay · Founded Jan 2026<br />
              Founder: Mustafa Al-Amin<br />
              PM: Layla Mahmoud
            </p>
          </div>
        </aside>

        {/* Right content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              {activeDef && <activeDef.icon size={18} className="text-amber shrink-0" />}
              <h2 className="text-lg font-semibold text-text">{activeDef?.label}</h2>
            </div>
            {SectionContent ? <SectionContent /> : (
              <div className="flex items-center justify-center py-24">
                <p className="text-text-muted text-sm">Content not yet available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
