import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ExternalLink, Download, Eye, Gift, Search,
  Scale, DollarSign, UserSearch, Palette, Server, LineChart, Megaphone, TrendingUp,
} from 'lucide-react'

const SERVICE_ICON_MAP = { Scale, DollarSign, UserSearch, Palette, Server, LineChart, Megaphone, TrendingUp }

function ServiceIcon({ name, size = 26, className = 'text-amber' }) {
  const Icon = SERVICE_ICON_MAP[name]
  if (!Icon) return null
  return <Icon size={size} className={className} />
}
import Layout from '../components/Layout'
import SidePanel from '../components/SidePanel'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { studioServices, templates, partnerPerks } from '../data/mockData'

const TABS = ['Studio Services', 'Templates & Docs', 'Partner Perks']

function FileTypeBadge({ type }) {
  const styles = {
    PDF: 'bg-pulse-red/10 text-pulse-red',
    DOCX: 'bg-pulse-blue/10 text-pulse-blue',
    XLSX: 'bg-pulse-green/10 text-pulse-green',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[type] || 'bg-bg-elevated text-text-muted'}`}>
      {type}
    </span>
  )
}

function CategoryBadge({ category }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber/10 text-amber">
      {category}
    </span>
  )
}

function ServiceArticle({ service, onRequestService }) {
  const navigate = useNavigate()

  const handleRequest = () => {
    onRequestService(service.category)
    navigate('/request-help')
  }

  const paragraphs = service.article.split('\n\n').filter(Boolean)

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="space-y-1">
        <ServiceIcon name={service.icon} size={28} />
        <h3 className="text-lg font-semibold text-text mt-2">{service.name}</h3>
        <p className="text-sm text-text-muted">{service.description}</p>
      </div>

      <div className="space-y-3">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-sm text-text leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {service.links && service.links.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Resources & Links</h4>
          <div className="space-y-1">
            {service.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-amber hover:text-amber/80 transition-colors py-1"
              >
                <ExternalLink size={13} className="shrink-0" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="bg-bg-elevated rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">SLA</span>
          <span className="text-text font-medium">{service.sla}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Who to Contact</span>
          <span className="text-text font-medium text-right">{service.contact}</span>
        </div>
      </div>

      <button
        onClick={handleRequest}
        className="btn-primary w-full"
      >
        Request This Service
      </button>
    </div>
  )
}

function StudioServicesTab() {
  const { setSelectedCategory } = useApp()
  const [activeService, setActiveService] = useState(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {studioServices.map((service) => (
          <button
            key={service.id}
            onClick={() => setActiveService(service)}
            className="bg-bg-card border border-border rounded-xl p-5 text-left hover:border-amber/40 hover:bg-bg-elevated transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center mb-3 group-hover:bg-amber/20 transition-colors">
              <ServiceIcon name={service.icon} size={20} />
            </div>
            <h3 className="text-sm font-semibold text-text mb-1 group-hover:text-amber transition-colors">
              {service.name}
            </h3>
            <p className="text-xs text-text-muted leading-relaxed mb-4">
              {service.description}
            </p>
            <span className="text-xs text-amber font-medium">View Service →</span>
          </button>
        ))}
      </div>

      <SidePanel
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        title={activeService?.name || ''}
        width="w-[520px]"
      >
        {activeService && (
          <ServiceArticle
            service={activeService}
            onRequestService={setSelectedCategory}
          />
        )}
      </SidePanel>
    </>
  )
}

const TEMPLATE_CATEGORIES = ['All', 'Legal', 'Finance', 'Fundraising', 'Product', 'HR']

function TemplatesTab() {
  const { addToast } = useApp()
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const handleDownload = (template) => {
    addToast(`Download started: ${template.name}`, 'success')
  }

  const filtered = templates.filter((t) => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* Search bar */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
        <input
          type="text"
          placeholder="Search templates…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-amber/60 focus:ring-2 focus:ring-amber/10 transition-all"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {TEMPLATE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all border ${
              activeCategory === cat
                ? 'bg-amber text-white border-amber shadow-sm'
                : 'bg-white border-border text-text-muted hover:text-text hover:border-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center space-y-1">
            <p className="text-sm text-text-muted">No templates match your search.</p>
            <p className="text-xs text-text-dim">Try a different keyword or category.</p>
          </div>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((template) => (
          <div key={template.id} className="bg-bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <FileTypeBadge type={template.type} />
              <CategoryBadge category={template.category} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text mb-1">{template.name}</h3>
              <p className="text-xs text-text-muted mb-2">Last updated: {template.updated}</p>
              <p className="text-xs text-text-muted leading-relaxed">{template.description}</p>
            </div>
            <div className="flex gap-2 mt-auto pt-1">
              <button
                onClick={() => handleDownload(template)}
                className="btn-secondary flex items-center gap-1.5 text-xs flex-1 justify-center"
              >
                <Download size={13} />
                Download
              </button>
              <button
                onClick={() => setPreviewTemplate(template)}
                className="btn-ghost flex items-center gap-1.5 text-xs flex-1 justify-center"
              >
                <Eye size={13} />
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      <Modal
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        title={previewTemplate?.name || ''}
        maxWidth="max-w-lg"
      >
        {previewTemplate && (
          <div className="px-6 py-5 space-y-4">
            <div className="flex items-center gap-2">
              <FileTypeBadge type={previewTemplate.type} />
              <CategoryBadge category={previewTemplate.category} />
            </div>
            <p className="text-xs text-text-muted">Last updated: {previewTemplate.updated}</p>
            <p className="text-sm text-text leading-relaxed">{previewTemplate.description}</p>
            <div className="bg-bg-elevated rounded-xl p-8 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-text-dim">{previewTemplate.type}</div>
                <p className="text-xs text-text-muted">Preview not available — download to view full document</p>
              </div>
            </div>
            <button
              onClick={() => {
                setPreviewTemplate(null)
              }}
              className="btn-secondary w-full"
            >
              Close Preview
            </button>
          </div>
        )}
      </Modal>
    </>
  )
}

const INTEGRATION_PERKS = [
  {
    id: 'int-1',
    partner: 'Notion',
    logo: 'NO',
    perkValue: 'Venture Management Workspace',
    description: 'A pre-built Notion workspace template tailored for Sanabil Studio portfolio ventures — covers company wiki, task tracking, meeting notes, and investor updates.',
    category: 'Integrations',
    instructions: 'Sign into Notion at notion.so. Click "Duplicate" on the shared template link provided. Rename the workspace to your venture name. Share access with your Portfolio Manager and Venture Architect at sanabilstudio.com.',
    activationCode: null,
    website: 'https://notion.so',
    supportEmail: 'studio@sanabilstudio.com',
    isIntegration: true,
    actionLabel: 'Setup',
  },
  {
    id: 'int-2',
    partner: 'Slack',
    logo: 'SL',
    perkValue: 'Studio Communication Setup Guide',
    description: 'Step-by-step guide to setting up your Slack workspace for studio communication, including channel structure, Sanabil Studio integrations, and notification best practices.',
    category: 'Integrations',
    instructions: 'Create a new Slack workspace at slack.com/get-started. Set up the recommended channels: #general, #product, #engineering, #finance, #legal. Invite the studio team using their @sanabilstudio.com emails. Pin the Pulse portal link in #general for easy team access.',
    activationCode: null,
    website: 'https://slack.com',
    supportEmail: 'studio@sanabilstudio.com',
    isIntegration: true,
    actionLabel: 'Setup',
  },
  {
    id: 'int-3',
    partner: 'Asana',
    logo: 'AS',
    perkValue: 'Onboarding Project Template',
    description: "An Asana project template covering all Phase 1 onboarding tasks, milestones, and dependencies — pre-populated with Sanabil Studio's standard spin-out checklist.",
    category: 'Integrations',
    instructions: 'Create an Asana account at asana.com (free tier supports teams under 15). Import the template using the link provided by your Portfolio Manager. All 11 Phase 1 tasks will be pre-loaded with due dates and dependencies. Assign tasks to your team members and share the project with your SSU contacts.',
    activationCode: null,
    website: 'https://asana.com',
    supportEmail: 'studio@sanabilstudio.com',
    isIntegration: true,
    actionLabel: 'Connect',
  },
]

const PERK_EXTRAS = {
  'pp-1': { activationCode: 'SANABIL2026', website: 'https://aws.amazon.com/activate', supportEmail: 'omar@sanabilstudio.com' },
  'pp-2': { activationCode: 'SANABILKSA', website: 'https://clio.com/partnerships', supportEmail: 'legal@sanabilstudio.com' },
  'pp-3': { activationCode: null, website: 'https://regus.com', supportEmail: 'coworking@sanabilstudio.com' },
  'pp-4': { activationCode: 'STUDIO50', website: 'https://qoyod.com', supportEmail: 'finance@sanabilstudio.com' },
  'pp-5': { activationCode: null, website: 'https://bayzat.com/partners', supportEmail: 'talent@sanabilstudio.com' },
  'pp-6': { activationCode: null, website: null, supportEmail: 'banking@sanabilstudio.com' },
}

const PERK_NAV_CATEGORIES = [
  { label: 'All', key: 'All' },
  { label: 'Cloud and Infrastructure', key: 'Cloud' },
  { label: 'Legal Tools', key: 'Legal Tools' },
  { label: 'Office Space', key: 'Office Space' },
  { label: 'Accounting', key: 'Accounting' },
  { label: 'HR and Payroll', key: 'HR Platform' },
  { label: 'Banking', key: 'Banking' },
  { label: 'Integrations', key: 'Integrations' },
  { label: 'Other', key: 'Other' },
]

const PERK_LOGO_COLORS = {
  'pp-1': 'bg-amber/20 text-amber',
  'pp-2': 'bg-pulse-blue/15 text-pulse-blue',
  'pp-3': 'bg-pulse-green/15 text-pulse-green',
  'pp-4': 'bg-purple-500/15 text-purple-400',
  'pp-5': 'bg-teal-500/15 text-teal-400',
  'pp-6': 'bg-pulse-red/15 text-pulse-red',
  'int-1': 'bg-neutral-400/15 text-neutral-400',
  'int-2': 'bg-green-500/15 text-green-500',
  'int-3': 'bg-pink-500/15 text-pink-400',
}

const KNOWN_CATEGORY_KEYS = PERK_NAV_CATEGORIES.map(c => c.key).filter(k => k !== 'All' && k !== 'Other')

function PerkDetailPanel({ perk }) {
  const logoColor = PERK_LOGO_COLORS[perk.id] || 'bg-bg-elevated text-text-muted'
  const steps = perk.instructions.split('. ').filter(Boolean)
  const websiteUrl = perk.website

  function handleCopy() {
    if (perk.activationCode) navigator.clipboard.writeText(perk.activationCode)
  }

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${logoColor}`}>
          {perk.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-text">{perk.partner}</h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-bg-elevated text-text-muted mt-0.5">
            {perk.category}
          </span>
        </div>
      </div>

      {/* Perk value */}
      <div className="bg-pulse-blue/5 border border-pulse-blue/15 rounded-xl px-4 py-3">
        <p className="text-[10px] text-text-dim uppercase tracking-wider mb-1">Perk Value</p>
        <p className="text-base font-bold text-pulse-blue">{perk.perkValue}</p>
      </div>

      {/* Description */}
      <div>
        <p className="text-[10px] font-semibold text-text-dim uppercase tracking-wider mb-2">About</p>
        <p className="text-sm text-text leading-relaxed">{perk.description}</p>
      </div>

      {/* Step-by-step instructions */}
      <div>
        <p className="text-[10px] font-semibold text-text-dim uppercase tracking-wider mb-3">
          {perk.isIntegration ? 'Setup Instructions' : 'Redemption Instructions'}
        </p>
        <div className="space-y-2.5">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-amber/15 text-amber text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-text leading-relaxed flex-1">
                {step.trim()}{step.trim().endsWith('.') ? '' : '.'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Activation code */}
      {perk.activationCode && (
        <div>
          <p className="text-[10px] font-semibold text-text-dim uppercase tracking-wider mb-2">Activation Code</p>
          <div className="flex items-center gap-3 bg-bg-elevated border border-border rounded-lg px-4 py-2.5">
            <span className="font-mono text-sm font-bold text-text tracking-widest flex-1">{perk.activationCode}</span>
            <button onClick={handleCopy} className="text-xs text-amber hover:text-amber/80 transition-colors shrink-0">
              Copy
            </button>
          </div>
        </div>
      )}

      {/* Website link */}
      {websiteUrl && (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-pulse-blue hover:text-pulse-blue/80 transition-colors"
        >
          <ExternalLink size={14} className="shrink-0" />
          Visit {perk.partner} website
        </a>
      )}

      {/* Support contact */}
      {perk.supportEmail && (
        <div>
          <p className="text-[10px] font-semibold text-text-dim uppercase tracking-wider mb-1.5">Support Contact</p>
          <a
            href={`mailto:${perk.supportEmail}`}
            className="text-sm text-text-muted hover:text-text transition-colors"
          >
            {perk.supportEmail}
          </a>
        </div>
      )}

      {/* CTA */}
      <button
        className="btn-primary w-full flex items-center gap-2 justify-center"
        onClick={() => { if (websiteUrl) window.open(websiteUrl, '_blank') }}
      >
        {perk.isIntegration ? (
          perk.actionLabel
        ) : (
          <><Gift size={14} />Claim Perk</>
        )}
      </button>
    </div>
  )
}

function PartnerPerksTab() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPerk, setSelectedPerk] = useState(null)

  const allPerks = [
    ...partnerPerks.map(p => ({ ...p, ...(PERK_EXTRAS[p.id] || {}) })),
    ...INTEGRATION_PERKS,
  ]

  function countForCategory(key) {
    if (key === 'All') return allPerks.length
    if (key === 'Other') return allPerks.filter(p => !KNOWN_CATEGORY_KEYS.includes(p.category)).length
    return allPerks.filter(p => p.category === key).length
  }

  const filtered = activeCategory === 'All'
    ? allPerks
    : activeCategory === 'Other'
    ? allPerks.filter(p => !KNOWN_CATEGORY_KEYS.includes(p.category))
    : allPerks.filter(p => p.category === activeCategory)

  return (
    <>
      <div className="flex gap-6 items-start">

        {/* ── Left category nav ── */}
        <div className="w-52 shrink-0 sticky top-6">
          <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest px-2 mb-2">Categories</p>
          <div className="space-y-0.5">
            {PERK_NAV_CATEGORIES.map(cat => {
              const count = countForCategory(cat.key)
              const isActive = activeCategory === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-amber/10 text-amber'
                      : 'text-text-muted hover:text-text hover:bg-bg-elevated'
                  }`}
                >
                  <span className={`text-sm truncate ${isActive ? 'font-semibold' : ''}`}>{cat.label}</span>
                  {count > 0 && (
                    <span className={`text-xs font-semibold ml-2 shrink-0 ${isActive ? 'text-amber' : 'text-text-dim'}`}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Right perk list ── */}
        <div className="flex-1 min-w-0 space-y-3">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-text-muted">No perks in this category.</p>
            </div>
          ) : (
            filtered.map(perk => {
              const logoColor = PERK_LOGO_COLORS[perk.id] || 'bg-bg-elevated text-text-muted'
              return (
                <div key={perk.id} className="bg-bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4 hover:border-border/80 transition-colors">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${logoColor}`}>
                    {perk.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="text-sm font-semibold text-text">{perk.partner}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-bg-elevated text-text-muted shrink-0">
                        {perk.category}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-pulse-blue mb-1">{perk.perkValue}</p>
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{perk.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPerk(perk)}
                    className="btn-primary shrink-0 flex items-center gap-2 text-sm whitespace-nowrap"
                  >
                    {perk.isIntegration ? (
                      perk.actionLabel
                    ) : (
                      <><Gift size={14} />Claim Perk</>
                    )}
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>

      <SidePanel
        isOpen={!!selectedPerk}
        onClose={() => setSelectedPerk(null)}
        title={selectedPerk?.partner || ''}
        width="w-[480px]"
      >
        {selectedPerk && <PerkDetailPanel perk={selectedPerk} />}
      </SidePanel>
    </>
  )
}

export default function Toolkit() {
  const [activeTab, setActiveTab] = useState('Studio Services')

  return (
    <Layout title="Founder Toolkit" subtitle="Resources, templates, and studio services">
      <div className="p-6 space-y-6">
        {/* Tab Bar */}
        <div className="flex gap-1 bg-bg-surface border border-border rounded-xl p-1 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-amber text-bg-base shadow-sm'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Studio Services' && <StudioServicesTab />}
        {activeTab === 'Templates & Docs' && <TemplatesTab />}
        {activeTab === 'Partner Perks' && <PartnerPerksTab />}
      </div>
    </Layout>
  )
}
