import { useState, useRef, useEffect } from 'react'
import { Search, Upload, ExternalLink, FileText, File, ChevronRight, TrendingUp, Users, DollarSign, BarChart2, Calendar, Tag, Filter } from 'lucide-react'
import Layout from '../components/Layout'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ventureContextData } from '../data/mockData'

const SECTIONS = [
  { id: 'market-overview', label: 'Market Overview', icon: TrendingUp },
  { id: 'product-decisions', label: 'Product Decisions', icon: Tag },
  { id: 'tech-stack', label: 'Tech Stack', icon: BarChart2 },
  { id: 'key-decisions', label: 'Key Decisions Log', icon: Calendar },
  { id: 'research-repository', label: 'Research Repository', icon: FileText },
  { id: 'financial-history', label: 'Financial History', icon: DollarSign },
  { id: 'team-history', label: 'Team History', icon: Users },
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

function StatCard({ label, value, sub, color = 'text-amber' }) {
  return (
    <div className="bg-bg-surface border border-border rounded-xl p-4">
      <p className="text-xs text-text-dim mb-1">{label}</p>
      <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
      {sub && <p className="text-xs text-text-muted mt-1">{sub}</p>}
    </div>
  )
}

function DecisionCard({ block, accentColor = 'border-amber' }) {
  const lines = block.content.split('\n').filter(Boolean)
  return (
    <div className={`bg-bg-card border border-border border-l-4 ${accentColor} rounded-xl p-5 space-y-3`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-text">{block.title}</h3>
        <TagBadge tag={block.tag} />
      </div>
      <div className="space-y-1.5">
        {lines.map((line, i) => {
          if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={i} className="text-xs font-semibold text-text mt-2">{line.replace(/\*\*/g, '')}</p>
          }
          if (line.startsWith('- ') || line.startsWith('• ')) {
            return <p key={i} className="text-sm text-text-muted leading-relaxed pl-3">{line}</p>
          }
          return <p key={i} className="text-sm text-text-muted leading-relaxed">{line}</p>
        })}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────
// Section Renderers
// ──────────────────────────────────────────────────────────────────

function MarketOverview() {
  const data = ventureContextData['market-overview']
  const competitors = [
    { name: 'Lean Technologies', focus: 'Open banking API', raised: '$33M', stage: 'Series B', threat: 'Medium' },
    { name: 'HyperPay', focus: 'Payment gateway', raised: '$22M', stage: 'Series A', threat: 'Low' },
    { name: 'Tabby/Tamara', focus: 'Consumer BNPL', raised: '$200M+', stage: 'Series C', threat: 'Low' },
    { name: 'Stcpay', focus: 'Consumer wallet', raised: 'State-backed', stage: 'Growth', threat: 'Medium' },
  ]
  const threatColor = { High: 'text-pulse-red', Medium: 'text-amber', Low: 'text-pulse-green' }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Addressable Market" value="$4.2B" sub="18% CAGR" />
        <StatCard label="Supplier Payments Segment" value="$2.1B" sub="35% CAGR" color="text-pulse-blue" />
        <StatCard label="Target SOM (Year 1)" value="$4.2M" sub="1% market share" color="text-pulse-green" />
      </div>

      {/* Content blocks */}
      {data && data.blocks.map(block => (
        <DecisionCard key={block.id} block={block} accentColor="border-amber" />
      ))}

      {/* Competitors table */}
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
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted">Threat Level</th>
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

      {/* Sources */}
      <div>
        <p className="text-xs text-text-dim uppercase tracking-widest font-semibold mb-3">Sources</p>
        <div className="space-y-1.5">
          {['SCAICT Digital Economy Report 2025', 'Euromonitor Saudi Arabia Country Report', 'SAMA Open Banking Framework', 'PitchBook GCC Fintech Deal Flow 2025'].map(src => (
            <div key={src} className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors group cursor-pointer">
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
  const data = ventureContextData['product-decisions']
  if (!data) return null
  return (
    <div className="space-y-4">
      {data.blocks.map(block => (
        <DecisionCard key={block.id} block={block} accentColor="border-pulse-blue" />
      ))}
    </div>
  )
}

const TECH_STACK_GROUPS = [
  {
    group: 'Frontend',
    color: 'bg-pulse-blue/10 text-pulse-blue',
    items: [
      { name: 'Next.js 14', detail: 'App Router, SSR' },
      { name: 'Tailwind CSS', detail: 'Utility-first styling' },
      { name: 'TypeScript', detail: 'Type safety' },
    ],
  },
  {
    group: 'Backend',
    color: 'bg-amber/10 text-amber',
    items: [
      { name: 'Node.js', detail: 'Runtime environment' },
      { name: 'Fastify', detail: '3x faster than Express' },
      { name: 'PostgreSQL', detail: 'Primary database on RDS' },
      { name: 'Redis', detail: 'Session & rate limiting' },
    ],
  },
  {
    group: 'Payments',
    color: 'bg-pulse-green/10 text-pulse-green',
    items: [
      { name: 'Lean Technologies', detail: 'Open banking connectivity' },
      { name: 'MADA', detail: 'Card processing via direct acquiring' },
    ],
  },
  {
    group: 'Infrastructure',
    color: 'bg-text-dim/10 text-text-muted',
    items: [
      { name: 'AWS Bahrain (me-south-1)', detail: 'Data residency compliance' },
      { name: 'Terraform', detail: 'Infrastructure as code' },
      { name: 'GitHub Actions', detail: 'CI/CD pipeline' },
      { name: 'Docker + ECS', detail: 'Container orchestration' },
    ],
  },
  {
    group: 'Observability',
    color: 'bg-pulse-red/10 text-pulse-red',
    items: [
      { name: 'Datadog', detail: 'APM & infrastructure monitoring' },
      { name: 'Sentry', detail: 'Error tracking' },
      { name: 'AWS Secrets Manager', detail: 'Secrets management' },
    ],
  },
]

function TechStack() {
  const [tooltip, setTooltip] = useState(null)
  return (
    <div className="space-y-6">
      {TECH_STACK_GROUPS.map(group => (
        <div key={group.group}>
          <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-3">{group.group}</p>
          <div className="flex flex-wrap gap-2">
            {group.items.map(item => (
              <div key={item.name} className="relative">
                <button
                  onMouseEnter={() => setTooltip(item.name)}
                  onMouseLeave={() => setTooltip(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border border-transparent hover:scale-105 transition-transform ${group.color}`}
                >
                  {item.name}
                </button>
                {tooltip === item.name && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-text text-white text-xs rounded-lg whitespace-nowrap shadow-lg z-10 pointer-events-none">
                    {item.detail}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const KEY_DECISION_CATEGORIES = ['All', 'Legal', 'Finance', 'Regulatory', 'Decision Log', 'Architecture']

function KeyDecisionsLog() {
  const data = ventureContextData['key-decisions']
  const [searchQ, setSearchQ] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const allBlocks = data ? data.blocks : []
  const filtered = allBlocks.filter(b => {
    const matchCat = activeCategory === 'All' || b.tag === activeCategory
    const matchQ = !searchQ || b.title.toLowerCase().includes(searchQ.toLowerCase()) || b.content.toLowerCase().includes(searchQ.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <div className="space-y-4">
      {/* Search + filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            placeholder="Search decisions…"
            className="input-field w-full pl-8 text-sm"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {KEY_DECISION_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-amber/10 text-amber border border-amber/20'
                  : 'bg-bg-elevated text-text-muted border border-border hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center text-text-muted text-sm">No decisions match your search.</div>
      ) : (
        filtered.map(block => (
          <DecisionCard key={block.id} block={block} accentColor="border-pulse-red" />
        ))
      )}
    </div>
  )
}

const RESEARCH_FILES = [
  { id: 'rf-1', name: 'Customer Discovery Report — 12 SME Interviews', type: 'PDF', date: 'Feb 2026', tag: 'Market Size' },
  { id: 'rf-2', name: 'B2B Payments Market Sizing Analysis', type: 'DOCX', date: 'Jan 2026', tag: 'Market Size' },
  { id: 'rf-3', name: 'Competitive Intelligence Brief — Q1 2026', type: 'PDF', date: 'Jan 2026', tag: 'Competitive Intel' },
  { id: 'rf-4', name: 'SCAICT Digital Payments Report 2025', type: 'PDF', date: 'Dec 2025', tag: 'Regulatory' },
  { id: 'rf-5', name: 'Euromonitor SME Finance KSA', type: 'DOCX', date: 'Nov 2025', tag: 'Market Size' },
  { id: 'rf-6', name: 'PitchBook GCC Fintech Deal Flow 2025', type: 'PDF', date: 'Dec 2025', tag: 'Competitive Intel' },
]

const TYPE_CONFIG = {
  PDF: 'bg-pulse-red/10 text-pulse-red',
  DOCX: 'bg-pulse-blue/10 text-pulse-blue',
  XLSX: 'bg-pulse-green/10 text-pulse-green',
}

function ResearchRepository() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">{RESEARCH_FILES.length} research files</p>
        <button className="btn-secondary flex items-center gap-1.5 text-sm">
          <Upload size={13} />
          Upload File
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {RESEARCH_FILES.map(file => (
          <div key={file.id} className="flex items-center gap-4 p-4 bg-bg-surface border border-border rounded-xl hover:bg-bg-elevated/60 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0">
              <FileText size={18} className="text-text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">{file.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${TYPE_CONFIG[file.type]}`}>{file.type}</span>
                <TagBadge tag={file.tag} />
                <span className="text-xs text-text-dim">{file.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="btn-ghost text-xs flex items-center gap-1 px-2 py-1">
                <ExternalLink size={12} />
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const BURN_DATA = [
  { month: 'Jan', burn: 72 },
  { month: 'Feb', burn: 104 },
  { month: 'Mar', burn: 118 },
]

const FINANCIAL_EVENTS = [
  { date: 'Jan 2026', event: 'Seed round closed', amount: 'SAR 2,400,000', type: 'funding' },
  { date: 'Jan 2026', event: 'Al-Rajhi corporate account opened', amount: null, type: 'milestone' },
  { date: 'Feb 2026', event: 'First pilot signed — Al-Mashreq Trading', amount: 'SAR 5,000/mo', type: 'revenue' },
  { date: 'Feb 2026', event: 'Q1 VAT return filed (SAR 0)', amount: null, type: 'compliance' },
  { date: 'Mar 2026', event: 'Second pilot — Nasser Trading Co.', amount: 'SAR 4,200/mo', type: 'revenue' },
]

const EVENT_COLORS = {
  funding: 'bg-pulse-green text-white',
  revenue: 'bg-amber text-white',
  milestone: 'bg-pulse-blue/10 text-pulse-blue',
  compliance: 'bg-bg-elevated text-text-muted',
}

function FinancialHistory() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Seed Capital Raised" value="SAR 2.4M" sub="January 2026" />
        <StatCard label="Current MRR" value="$12,400" sub="3 pilot customers" color="text-pulse-green" />
        <StatCard label="Runway Remaining" value="14 mo" sub="At SAR 118K/mo burn" color="text-pulse-blue" />
      </div>

      {/* Burn chart */}
      <div className="bg-bg-surface border border-border rounded-xl p-5">
        <p className="text-sm font-semibold text-text mb-4">Monthly Burn (SAR '000)</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={BURN_DATA} barSize={32}>
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

      {/* Timeline */}
      <div>
        <p className="text-sm font-semibold text-text mb-4">Financial Timeline</p>
        <div className="space-y-3">
          {FINANCIAL_EVENTS.map((ev, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center shrink-0 w-20">
                <span className="text-xs text-text-dim">{ev.date}</span>
              </div>
              <div className="flex-1 flex items-start gap-3 p-3 bg-bg-surface border border-border rounded-xl">
                <div>
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

const TEAM_MEMBERS = [
  { name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', type: 'Founding Team', joined: 'Jan 2026', note: 'Ex-STC Pay PM, Riyad Bank digital transformation' },
  { name: 'Layla Mahmoud', role: 'Product Manager', type: 'SSU Embedded', joined: 'Jan 2026', note: 'SSU PM embedded full-time in Tradepay' },
  { name: 'CTO (Open Role)', role: 'CTO', type: 'Hiring', joined: 'Target: Mar 15', note: 'Fintech/payments background, Golang expertise required' },
]

const ROLE_TYPE_COLORS = {
  'Founding Team': 'bg-amber/10 text-amber border-amber/20',
  'SSU Embedded': 'bg-pulse-blue/10 text-pulse-blue border-pulse-blue/20',
  'Hiring': 'bg-pulse-red/10 text-pulse-red border-pulse-red/20',
}

function TeamHistory() {
  const groups = ['Founding Team', 'SSU Embedded', 'Hiring']
  return (
    <div className="space-y-6">
      {groups.map(group => {
        const members = TEAM_MEMBERS.filter(m => m.type === group)
        if (!members.length) return null
        return (
          <div key={group}>
            <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-3">{group}</p>
            <div className="space-y-3">
              {members.map(m => (
                <div key={m.name} className={`flex items-start gap-4 p-4 bg-bg-surface border rounded-xl ${m.type === 'Hiring' ? 'border-dashed border-pulse-red/30' : 'border-border'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${m.type === 'Hiring' ? 'bg-pulse-red/10 text-pulse-red' : 'bg-amber/10 text-amber'}`}>
                    {m.type === 'Hiring' ? '?' : m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-text">{m.name}</p>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${ROLE_TYPE_COLORS[m.type]}`}>{m.type}</span>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{m.role}</p>
                    <p className="text-xs text-text-dim mt-1.5">{m.note}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-text-dim">Joined</p>
                    <p className="text-xs font-medium text-text">{m.joined}</p>
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

const SECTION_RENDERERS = {
  'market-overview': MarketOverview,
  'product-decisions': ProductDecisions,
  'tech-stack': TechStack,
  'key-decisions': KeyDecisionsLog,
  'research-repository': ResearchRepository,
  'financial-history': FinancialHistory,
  'team-history': TeamHistory,
}

export default function VentureContext() {
  const [activeSection, setActiveSection] = useState('market-overview')
  const contentRef = useRef(null)

  const SectionContent = SECTION_RENDERERS[activeSection]
  const activeDef = SECTIONS.find(s => s.id === activeSection)

  return (
    <Layout title="Venture Context" subtitle="Tradepay · Strategic context and decisions">
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
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                    isActive
                      ? 'bg-amber/10 text-amber font-medium'
                      : 'text-text-muted hover:text-text hover:bg-bg-elevated'
                  }`}
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
              PM: Sarah Al-Rashid
            </p>
          </div>
        </aside>

        {/* Right content */}
        <div className="flex-1 overflow-y-auto" ref={contentRef}>
          <div className="p-8 max-w-4xl">
            {/* Section header */}
            <div className="flex items-center gap-2 mb-6">
              {activeDef && <activeDef.icon size={18} className="text-amber shrink-0" />}
              <h2 className="text-lg font-semibold text-text">{activeDef?.label}</h2>
            </div>

            {SectionContent ? <SectionContent /> : (
              <div className="flex items-center justify-center py-24">
                <div className="text-center space-y-2">
                  <p className="text-text-muted text-sm">Content for this section is not yet available.</p>
                  <p className="text-text-dim text-xs">Contact your Portfolio Manager to add content here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
