import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, Download, Eye, Gift, Search } from 'lucide-react'
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
        <div className="text-3xl">{service.icon}</div>
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
            <div className="text-3xl mb-3">{service.icon}</div>
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

const LOGO_COLORS = [
  'bg-amber/20 text-amber',
  'bg-pulse-blue/20 text-pulse-blue',
  'bg-pulse-green/20 text-pulse-green',
  'bg-pulse-red/20 text-pulse-red',
  'bg-amber/15 text-amber',
  'bg-pulse-blue/15 text-pulse-blue',
]

function PartnerPerksTab() {
  const [claimPerk, setClaimPerk] = useState(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {partnerPerks.map((perk, i) => (
          <div key={perk.id} className="bg-bg-card border border-border rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${LOGO_COLORS[i % LOGO_COLORS.length]}`}>
                {perk.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-text">{perk.partner}</h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-bg-elevated text-text-muted">
                    {perk.category}
                  </span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{perk.description}</p>
              </div>
            </div>
            <button
              onClick={() => setClaimPerk(perk)}
              className="btn-primary flex items-center gap-2 justify-center w-full"
            >
              <Gift size={14} />
              Claim Perk
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!claimPerk}
        onClose={() => setClaimPerk(null)}
        title={claimPerk ? `Claim: ${claimPerk.partner}` : ''}
        maxWidth="max-w-md"
      >
        {claimPerk && (
          <div className="px-6 py-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${LOGO_COLORS[partnerPerks.findIndex(p => p.id === claimPerk.id) % LOGO_COLORS.length]}`}>
                {claimPerk.logo}
              </div>
              <div>
                <p className="text-sm font-semibold text-text">{claimPerk.partner}</p>
                <p className="text-xs text-text-muted">{claimPerk.category}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Redemption Instructions</h4>
              <div className="bg-bg-elevated rounded-xl p-4">
                <p className="text-sm text-text leading-relaxed">{claimPerk.instructions}</p>
              </div>
            </div>
            <button
              onClick={() => setClaimPerk(null)}
              className="btn-primary w-full"
            >
              Got it
            </button>
          </div>
        )}
      </Modal>
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
