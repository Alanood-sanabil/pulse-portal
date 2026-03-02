import { useState } from 'react'
import Layout from '../components/Layout'
import { ventureContextData } from '../data/mockData'

const SECTION_TABS = [
  { id: 'market-overview', label: 'Market Overview' },
  { id: 'product-decisions', label: 'Product Decisions' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'key-decisions', label: 'Key Decisions Log' },
  { id: 'research-repository', label: 'Research Repository' },
  { id: 'financial-history', label: 'Financial History' },
  { id: 'team-history', label: 'Team History' },
]

const TAG_COLORS = {
  'Market Size': 'bg-amber/10 text-amber',
  'Competitive Intel': 'bg-pulse-blue/10 text-pulse-blue',
  'Regulatory': 'bg-pulse-red/10 text-pulse-red',
  'Decision Log': 'bg-amber/10 text-amber',
  'Architecture': 'bg-pulse-blue/10 text-pulse-blue',
  'Legal': 'bg-pulse-red/10 text-pulse-red',
  'Finance': 'bg-pulse-green/10 text-pulse-green',
}

function TagBadge({ tag }) {
  const colorClass = TAG_COLORS[tag] || 'bg-bg-elevated text-text-muted'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {tag}
    </span>
  )
}

function ContentBlock({ block, accentColor = 'border-amber' }) {
  const paragraphs = block.content.split('\n\n').filter(Boolean)

  return (
    <div className={`bg-bg-card border border-border border-l-4 ${accentColor} rounded-xl p-5 space-y-3`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-text">{block.title}</h3>
        <TagBadge tag={block.tag} />
      </div>
      <div className="space-y-2">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-sm text-text-muted leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </div>
  )
}

const PLACEHOLDER_CONTENT = {
  'tech-stack': {
    title: 'Tech Stack',
    blocks: [
      {
        id: 'ts-placeholder-1',
        title: 'Frontend & Backend Stack',
        tag: 'Architecture',
        content: `Tradepay's current tech stack is documented in the Product Decisions tab under "Tech Stack Selection." The full technical architecture document is available in the Document Library.\n\nKey technologies: Next.js 14 (frontend), Node.js + Fastify (backend), PostgreSQL + Redis (database), AWS Bahrain region (infrastructure), Lean Technologies (open banking), GitHub Actions (CI/CD).`,
      },
      {
        id: 'ts-placeholder-2',
        title: 'Infrastructure & DevOps',
        tag: 'Architecture',
        content: `Infrastructure is managed as code using Terraform. All services are containerized via Docker and deployed on AWS ECS in the Bahrain region (me-south-1) for data residency compliance.\n\nMonitoring: Datadog for APM and infrastructure monitoring. Error tracking: Sentry. Secrets management: AWS Secrets Manager. A full DevOps runbook is maintained in the engineering Notion workspace.`,
      },
    ],
  },
  'research-repository': {
    title: 'Research Repository',
    blocks: [
      {
        id: 'rr-placeholder-1',
        title: 'Customer Discovery: 12 SME Interviews (Jan–Feb 2026)',
        tag: 'Market Size',
        content: `Structured discovery interviews were conducted with 12 Saudi SMEs across three sectors: wholesale trading, construction supply, and professional services. The primary finding was that supplier payment automation — not invoice financing — was the most acute and immediate pain point.\n\nKey insight: 10 of 12 SMEs still use manual cheque processing for supplier payments. Average payment cycle: 14–21 days. Willingness to pay for automation: SAR 200–500/month for businesses with 20–50 suppliers.`,
      },
      {
        id: 'rr-placeholder-2',
        title: 'Market Sizing Analysis: B2B Payments KSA (Jan 2026)',
        tag: 'Competitive Intel',
        content: `Full market sizing report is available in the Document Library. Summary: $4.2B TAM growing at 18% CAGR. Serviceable Addressable Market (SAM) for Tradepay's initial segment: $420M. Initial target SOM: $4.2M in Year 1 (1% market share).\n\nAdditional research reports available: SCAICT Digital Payments Report 2025, Euromonitor SME Finance KSA, PitchBook GCC Fintech Deal Flow 2025.`,
      },
    ],
  },
  'financial-history': {
    title: 'Financial History',
    blocks: [
      {
        id: 'fh-placeholder-1',
        title: 'Burn Rate & Runway History',
        tag: 'Finance',
        content: `Month 1 (January 2026): Burn SAR 72,000. Primarily team costs and formation expenses.\nMonth 2 (February 2026): Burn SAR 104,000. Team scaled to 3 people, office setup costs, legal and accounting fees.\n\nCurrent runway: 14 months based on SAR 2.4M seed capital deployed. Full financial model and monthly P&L reports are available in the Document Library under Finance. Monthly finance review with Nora Faisal on last Thursday of each month.`,
      },
      {
        id: 'fh-placeholder-2',
        title: 'Revenue Milestones & KPI Tracking',
        tag: 'Finance',
        content: `First pilot agreement signed with Al-Mashreq Trading (Feb 2026): pilot fee SAR 5,000/month.\nMRR as of March 2026: $12,400 (SAR ~46,500) across 3 active pilot customers.\n\nTarget KPIs for Phase 1 completion: MRR > SAR 20,000, 3+ pilot customers, burn rate below SAR 120,000/month. Current status: MRR on track, burn within budget. Full KPI dashboard visible in the Home page and updated weekly.`,
      },
    ],
  },
  'team-history': {
    title: 'Team History',
    blocks: [
      {
        id: 'th-placeholder-1',
        title: 'Founding Team & Key Hires',
        tag: 'Decision Log',
        content: `Mustafa Al-Amin joined as CEO & Co-Founder at inception (January 2026). Prior experience: 4 years at STC Pay in product management, 2 years at Riyad Bank in digital transformation.\n\nCTO search is ongoing (see REQ-2026-031). Candidate shortlist of 4 finalists in interview process. Target hire date: March 15, 2026. SSU Talent Partner Rayan Al-Ghamdi is managing the process end-to-end.`,
      },
      {
        id: 'th-placeholder-2',
        title: 'Organizational Structure & Roles',
        tag: 'Decision Log',
        content: `Current org structure: CEO (Mustafa) → Engineering (CTO hire pending) → Product (Layla Mahmoud, SSU embedded PM). Finance and legal handled by SSU team.\n\nPhase 2 hiring plan: CTO, Head of Sales, 2x Backend Engineers, 1x Frontend Engineer. Full hiring plan and org chart are in the Document Library under HR. SSU Talent team supporting all Phase 2 hires with targeted activation in Month 4.`,
      },
    ],
  },
}

const ACCENT_COLORS_BY_TAB = {
  'market-overview': 'border-amber',
  'product-decisions': 'border-pulse-blue',
  'tech-stack': 'border-pulse-blue',
  'key-decisions': 'border-pulse-red',
  'research-repository': 'border-amber',
  'financial-history': 'border-pulse-green',
  'team-history': 'border-amber',
}

export default function VentureContext() {
  const [activeTab, setActiveTab] = useState('market-overview')

  const getTabContent = () => {
    if (ventureContextData[activeTab]) {
      return ventureContextData[activeTab]
    }
    return PLACEHOLDER_CONTENT[activeTab] || null
  }

  const tabContent = getTabContent()
  const accentColor = ACCENT_COLORS_BY_TAB[activeTab] || 'border-amber'

  return (
    <Layout title="Venture Context" subtitle="Tradepay · Strategic context and decisions">
      <div className="p-6 space-y-6">
        {/* Header */}
        <p className="text-xs text-text-muted">Strategic knowledge base for Tradepay founders and SSU team</p>

        {/* Section Tab Bar */}
        <div className="border-b border-border">
          <div className="flex gap-0 overflow-x-auto">
            {SECTION_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-amber text-amber'
                    : 'border-transparent text-text-muted hover:text-text hover:border-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {tabContent ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-text">{tabContent.title}</h2>
              <span className="text-xs text-text-muted">{tabContent.blocks.length} entries</span>
            </div>

            <div className="space-y-4">
              {tabContent.blocks.map((block) => (
                <ContentBlock
                  key={block.id}
                  block={block}
                  accentColor={accentColor}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-24">
            <div className="text-center space-y-2">
              <p className="text-text-muted text-sm">Content for this section is not yet available.</p>
              <p className="text-text-dim text-xs">Contact your Portfolio Manager to add content here.</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
