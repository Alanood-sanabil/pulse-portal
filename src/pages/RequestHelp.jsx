import { useState, useRef } from 'react'
import {
  Search, FileText, Building2, Shield, ShieldCheck, Landmark, Receipt,
  BookOpen, CreditCard, UserPlus, PenLine, Globe, UserMinus, Home,
  Monitor, Truck, Wrench, Laptop, Package, Bug, HelpCircle, Paperclip,
  CheckCircle, ChevronRight, AlertTriangle, X, MessageSquare,
} from 'lucide-react'
import Layout from '../components/Layout'
import SidePanel from '../components/SidePanel'
import { useApp } from '../context/AppContext'
import { recentRequests } from '../data/mockData'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const CATEGORY_ORDER = ['Legal', 'Finance', 'Talent', 'Operations', 'IT', 'Other']

const REQUEST_TILES = {
  Legal: [
    {
      id: 'review-contract', title: 'Review a Contract', icon: FileText,
      desc: 'Commercial, vendor, or employment contracts',
      placeholder: 'Describe the contract: what type is it, what are the key terms you want reviewed, and what is the deadline?',
    },
    {
      id: 'company-registration', title: 'Company Registration Help', icon: Building2,
      desc: 'CR amendments, address changes, or new entity setup',
      placeholder: 'Describe what you need: CR registration, amendments, or address updates. Include any deadlines or regulatory context.',
    },
    {
      id: 'ip-trademark', title: 'IP & Trademark Question', icon: Shield,
      desc: 'Trademark registration, IP protection, or trade secrets',
      placeholder: 'Describe your IP question: is this about trademarks, patents, or trade secrets? What do you need protected and in which markets?',
    },
    {
      id: 'compliance', title: 'Compliance Question', icon: ShieldCheck,
      desc: 'SAMA, ZATCA, data protection, or sector-specific rules',
      placeholder: 'Describe the compliance question: which regulation does it relate to, and what is the business context?',
    },
  ],
  Finance: [
    {
      id: 'bank-account', title: 'Open a Bank Account', icon: Landmark,
      desc: 'Corporate account setup at any Saudi bank',
      placeholder: "We'll handle this for you. Just confirm your company registration is complete and let us know your preferred bank. We'll initiate the process.",
    },
    {
      id: 'vat-registration', title: 'VAT Registration Help', icon: Receipt,
      desc: 'ZATCA registration, Fatoora portal, or VAT filing',
      placeholder: 'Describe what you need: initial VAT registration, filing guidance, or a question about a specific transaction. Include any relevant deadlines.',
    },
    {
      id: 'accounting-setup', title: 'Accounting Setup', icon: BookOpen,
      desc: 'Chart of accounts, Qoyod, expense tracking, or payroll',
      placeholder: 'Describe what you need set up: chart of accounts, accounting software, expense tracking, or payroll. Include your team size and current tools.',
    },
    {
      id: 'expense-invoice', title: 'Expense or Invoice Question', icon: CreditCard,
      desc: 'Questions about specific expenses, invoices, or payments',
      placeholder: 'Describe the question: which transaction does it relate to, what is the amount, and what do you need clarified?',
    },
  ],
  Talent: [
    {
      id: 'hire-member', title: 'Hire a Team Member', icon: UserPlus,
      desc: 'Candidate sourcing, screening, and shortlisting',
      placeholder: 'Describe the role: job title, key responsibilities, seniority level, required skills, and when you need this person to start.',
    },
    {
      id: 'employment-contract', title: 'Draft an Employment Contract', icon: PenLine,
      desc: 'KSA-compliant employment contracts for new hires',
      placeholder: "Provide the employee's details: name, nationality, role, salary, start date, and any non-standard terms you want included.",
    },
    {
      id: 'visa-permit', title: 'Visa or Work Permit', icon: Globe,
      desc: 'Work visas, Iqama transfers, or residency support',
      placeholder: "Describe what you need: work visa, Iqama transfer, or residency support. Include the employee's nationality and current immigration status.",
    },
    {
      id: 'offboarding', title: 'Offboarding Help', icon: UserMinus,
      desc: 'End-of-service, document return, or separation process',
      placeholder: "Describe the offboarding situation: the employee's role, last day, and any specific requirements such as end-of-service benefits or document return.",
    },
  ],
  Operations: [
    {
      id: 'office-setup', title: 'Office Setup', icon: Home,
      desc: 'Office space, meeting rooms, or facilities access',
      placeholder: 'Describe what you need: office space, meeting room access, furniture, or facilities. Include your team size and preferred location.',
    },
    {
      id: 'equipment-request', title: 'Equipment Request', icon: Monitor,
      desc: 'Laptops, hardware, or office equipment',
      placeholder: 'List the equipment you need: device type, specifications, quantity, and when you need it. Include any budget constraints.',
    },
    {
      id: 'vendor-supplier', title: 'Vendor or Supplier Help', icon: Truck,
      desc: 'Procurement, supplier onboarding, or vendor contracts',
      placeholder: 'Describe the vendor question: is this about procurement, supplier onboarding, or a specific contract? Include the vendor name if applicable.',
    },
    {
      id: 'general-operations', title: 'General Operations', icon: Wrench,
      desc: 'Any other operational support request',
      placeholder: 'Describe your operations request in detail. Include any deadlines and who this affects.',
    },
  ],
  IT: [
    {
      id: 'it-setup', title: 'IT Setup & Access', icon: Laptop,
      desc: 'Device setup, email, or system access permissions',
      placeholder: 'Describe what you need set up: device configuration, software access, email setup, or system permissions. Include which team member this is for.',
    },
    {
      id: 'software-tools', title: 'Software or Tools Request', icon: Package,
      desc: 'Software licenses, SaaS subscriptions, or tool recommendations',
      placeholder: 'Describe the software or tool you need: what it does, how many licenses, and which team members will use it. Include any budget constraints.',
    },
    {
      id: 'technical-issue', title: 'Technical Issue', icon: Bug,
      desc: 'Bugs, outages, or blocked access to a system',
      placeholder: 'Describe the technical issue: what system is affected, what error you are seeing, when it started, and the business impact.',
    },
  ],
  Other: [
    {
      id: 'something-else', title: 'Something Else', icon: HelpCircle,
      desc: 'A request that does not fit any other category',
      placeholder: 'Describe your request in as much detail as possible. Include any relevant context, deadlines, and what outcome you are hoping for.',
    },
  ],
}

const ROUTING = {
  Legal:      { name: 'Nora Khalid',     role: 'Legal Lead',        initials: 'NK', avatarCls: 'bg-pulse-red/15 text-pulse-red border-pulse-red/30' },
  Finance:    { name: 'Ahmed Saleh',     role: 'Finance Lead',      initials: 'AS', avatarCls: 'bg-pulse-green/15 text-pulse-green border-pulse-green/30' },
  Talent:     { name: 'Rania Faisal',    role: 'Talent Lead',       initials: 'RF', avatarCls: 'bg-amber/15 text-amber border-amber/30' },
  Operations: { name: 'Omar Hassan',     role: 'Venture Architect', initials: 'OH', avatarCls: 'bg-pulse-blue/15 text-pulse-blue border-pulse-blue/30' },
  IT:         { name: 'Omar Hassan',     role: 'Venture Architect', initials: 'OH', avatarCls: 'bg-pulse-blue/15 text-pulse-blue border-pulse-blue/30' },
  Other:      { name: 'Sarah Al-Rashid', role: 'Portfolio Manager', initials: 'SA', avatarCls: 'bg-amber/15 text-amber border-amber/30' },
}

const CATEGORY_CONFIG = {
  Legal:      { color: 'text-pulse-red',   bg: 'bg-pulse-red/10'   },
  Finance:    { color: 'text-pulse-green', bg: 'bg-pulse-green/10' },
  Talent:     { color: 'text-amber',       bg: 'bg-amber/10'       },
  Operations: { color: 'text-pulse-blue',  bg: 'bg-pulse-blue/10'  },
  IT:         { color: 'text-purple-400',  bg: 'bg-purple-500/10'  },
  Other:      { color: 'text-text-muted',  bg: 'bg-bg-elevated'    },
}

const PRIORITY_CONFIG = {
  Normal: { active: 'bg-bg-elevated text-text border-border font-semibold', responseTime: 'Response within 1–2 business days' },
  High:   { active: 'bg-amber/10 text-amber border-amber/30 font-semibold', responseTime: 'Response within 4 hours during business hours' },
  Urgent: { active: 'bg-pulse-red/10 text-pulse-red border-pulse-red/30 font-semibold', responseTime: 'Immediate alert sent to your Portfolio Manager' },
}

const STATUS_CONFIG = {
  Resolved:      'bg-pulse-green/10 text-pulse-green',
  'In Progress': 'bg-amber/10 text-amber',
  Responded:     'bg-pulse-blue/10 text-pulse-blue',
  Submitted:     'bg-bg-elevated text-text-muted',
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

export default function RequestHelp() {
  const { addToast } = useApp()
  const fileInputRef = useRef(null)

  // Search
  const [search, setSearch] = useState('')

  // Form panel
  const [selectedTile, setSelectedTile] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [priority, setPriority] = useState('Normal')
  const [description, setDescription] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [submittedRef, setSubmittedRef] = useState(null)
  const [reqCounter, setReqCounter] = useState(48)

  // Detail panel
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [noteSubmitted, setNoteSubmitted] = useState(false)

  // ── Filtered tiles by search ──
  const visibleCategories = CATEGORY_ORDER.reduce((acc, cat) => {
    const tiles = REQUEST_TILES[cat].filter(tile =>
      !search ||
      tile.title.toLowerCase().includes(search.toLowerCase()) ||
      tile.desc.toLowerCase().includes(search.toLowerCase()) ||
      cat.toLowerCase().includes(search.toLowerCase())
    )
    if (tiles.length) acc.push({ cat, tiles })
    return acc
  }, [])

  // ── Handlers ──
  function handleTileClick(tile, cat) {
    setSelectedTile({ ...tile, category: cat })
    setPriority('Normal')
    setDescription('')
    setAttachment(null)
    setSubmitted(false)
    setSubmittedRef(null)
    setFormOpen(true)
  }

  function handleFormSubmit() {
    if (!description.trim() && selectedTile?.id !== 'bank-account') return
    const ref = `REQ-2026-0${reqCounter}`
    setReqCounter(c => c + 1)
    setSubmittedRef(ref)
    setSubmitted(true)
    addToast('Request submitted successfully', 'success')
  }

  function handleFormDone() {
    setFormOpen(false)
    setSubmitted(false)
  }

  function handleRequestClick(req) {
    setSelectedRequest(req)
    setNoteText('')
    setNoteSubmitted(false)
    setDetailOpen(true)
  }

  function handleNoteSubmit() {
    setNoteSubmitted(true)
    addToast('Note added to request', 'success')
  }

  // ── Derived ──
  const formAssignee = selectedTile ? ROUTING[selectedTile.category] : null

  function getAssignee(req) {
    return ROUTING[req.category] || ROUTING.Other
  }

  function getLastUpdated(req) {
    if (!req.timeline?.length) return req.submittedAt?.split(' at')[0] || '—'
    return req.timeline[req.timeline.length - 1].date
  }

  function getSubmittedDate(req) {
    return req.submittedAt?.split(' at')[0] || '—'
  }

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <Layout title="Request Help" subtitle="Get support from your Studio Support Unit">
      <div className="p-6 flex gap-6 items-start">

        {/* ── LEFT: Search + Tile Grid ── */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Search bar */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
            <input
              type="text"
              placeholder="Search for help or a service…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-amber/60 focus:ring-2 focus:ring-amber/10 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Tile grid */}
          {visibleCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <HelpCircle size={32} className="text-text-dim mb-3" />
              <p className="text-sm font-medium text-text">No services match your search.</p>
              <p className="text-xs text-text-muted mt-1">Try a different keyword or use "Something Else".</p>
            </div>
          ) : (
            <div className="space-y-6">
              {visibleCategories.map(({ cat, tiles }) => {
                const cfg = CATEGORY_CONFIG[cat]
                return (
                  <div key={cat}>
                    <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-3">{cat}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {tiles.map(tile => {
                        const Icon = tile.icon
                        const isFullWidth = cat === 'Other'
                        return (
                          <button
                            key={tile.id}
                            onClick={() => handleTileClick(tile, cat)}
                            className={`text-left p-4 bg-bg-surface border border-border rounded-xl hover:border-amber/30 hover:shadow-sm transition-all group ${isFullWidth ? 'col-span-2' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cfg.bg}`}>
                                <Icon size={16} className={cfg.color} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-text group-hover:text-amber transition-colors leading-tight">
                                  {tile.title}
                                </p>
                                <p className="text-xs text-text-muted mt-0.5 leading-snug">{tile.desc}</p>
                              </div>
                              <ChevronRight size={14} className="text-text-dim group-hover:text-amber shrink-0 mt-0.5 transition-colors" />
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── RIGHT: Request Tracker ── */}
        <div className="w-80 shrink-0 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text">Your Requests</h2>
            <span className="text-xs text-text-dim">{recentRequests.length} total</span>
          </div>

          {recentRequests.length === 0 ? (
            <div className="card p-6 text-center">
              <p className="text-sm text-text-muted">No requests yet.</p>
              <p className="text-xs text-text-dim mt-1">Your submitted requests will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentRequests.map(req => {
                const assignee = getAssignee(req)
                const statusCls = STATUS_CONFIG[req.status] || STATUS_CONFIG.Submitted
                return (
                  <button
                    key={req.id}
                    onClick={() => handleRequestClick(req)}
                    className="w-full text-left bg-bg-surface border border-border rounded-xl p-4 hover:bg-bg-elevated transition-colors group"
                  >
                    {/* Top row: ref + status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-medium text-text-dim">{req.id}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusCls}`}>
                        {req.status}
                      </span>
                    </div>
                    {/* Title */}
                    <p className="text-sm font-semibold text-text group-hover:text-amber transition-colors leading-snug mb-2">
                      {req.title}
                    </p>
                    {/* Assigned SSU member */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold shrink-0 ${assignee.avatarCls}`}>
                        {assignee.initials}
                      </div>
                      <p className="text-xs text-text-muted">{assignee.name} · {assignee.role}</p>
                    </div>
                    {/* Dates */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-[10px] text-text-dim">Submitted {getSubmittedDate(req)}</span>
                      <span className="text-[10px] text-text-dim">Updated {getLastUpdated(req)}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── FORM SIDE PANEL ── */}
      <SidePanel
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setSubmitted(false) }}
        title={submitted ? 'Request Submitted' : (selectedTile?.title || 'New Request')}
        width="w-[480px]"
      >
        {selectedTile && (
          submitted ? (
            /* ── Confirmation state ── */
            <div className="p-6 flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-full bg-pulse-green/10 flex items-center justify-center mt-4">
                <CheckCircle size={32} className="text-pulse-green" />
              </div>
              <div className="space-y-1.5">
                <p className="text-lg font-bold text-text">Request Submitted</p>
                <p className="font-mono text-sm font-semibold text-amber">{submittedRef}</p>
              </div>
              <div className="w-full bg-bg-elevated border border-border rounded-xl p-4 text-left space-y-3">
                <div>
                  <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1">Request</p>
                  <p className="text-sm font-semibold text-text">{selectedTile.title}</p>
                </div>
                <div className="border-t border-border pt-3">
                  <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-2">Assigned to</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-sm font-bold shrink-0 ${formAssignee.avatarCls}`}>
                      {formAssignee.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text">{formAssignee.name}</p>
                      <p className="text-xs text-text-muted">{formAssignee.role}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border pt-3">
                  <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1">Expected response</p>
                  <p className="text-sm text-text-muted">{PRIORITY_CONFIG[priority].responseTime}</p>
                </div>
              </div>
              <button onClick={handleFormDone} className="btn-primary w-full">
                Done
              </button>
            </div>
          ) : (
            /* ── Form state ── */
            <div className="p-6 space-y-5">
              {/* Category badge (read-only) */}
              <div>
                <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-2">Category</p>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${CATEGORY_CONFIG[selectedTile.category]?.bg} ${CATEGORY_CONFIG[selectedTile.category]?.color}`}>
                    {selectedTile.category}
                  </span>
                  {/* Routing preview */}
                  {formAssignee && (
                    <span className="text-xs text-text-dim">→ will be sent to {formAssignee.name}</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-2">Details</p>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={selectedTile.placeholder}
                  rows={6}
                  className="w-full rounded-xl border border-border bg-bg-elevated text-sm text-text placeholder:text-text-dim p-3 focus:outline-none focus:border-amber/60 focus:ring-2 focus:ring-amber/10 transition-all resize-none"
                />
              </div>

              {/* Priority */}
              <div>
                <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-2">Priority</p>
                <div className="flex gap-2">
                  {['Normal', 'High', 'Urgent'].map(p => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-2 rounded-lg border text-xs transition-all ${priority === p ? PRIORITY_CONFIG[p].active : 'border-border text-text-muted hover:bg-bg-elevated'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-text-dim mt-2">{PRIORITY_CONFIG[priority].responseTime}</p>
              </div>

              {/* Urgent warning */}
              {priority === 'Urgent' && (
                <div className="flex items-start gap-2 rounded-lg bg-pulse-red/5 border border-pulse-red/20 px-4 py-3">
                  <AlertTriangle size={14} className="text-pulse-red mt-0.5 shrink-0" />
                  <p className="text-sm text-pulse-red">
                    <span className="font-semibold">Sarah Al-Rashid</span> (Portfolio Manager) will be notified immediately.
                  </p>
                </div>
              )}

              {/* File attachment */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={e => setAttachment(e.target.files?.[0] || null)}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
                >
                  <Paperclip size={14} />
                  {attachment ? (
                    <span className="text-amber font-medium">{attachment.name}</span>
                  ) : (
                    'Attach a file (optional)'
                  )}
                </button>
              </div>

              {/* Assigned to preview */}
              {formAssignee && (
                <div className="flex items-center gap-3 p-3 bg-bg-elevated rounded-xl border border-border">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${formAssignee.avatarCls}`}>
                    {formAssignee.initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text">{formAssignee.name}</p>
                    <p className="text-[10px] text-text-muted">{formAssignee.role} · will be notified</p>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleFormSubmit}
                className="btn-primary w-full"
              >
                Submit Request
              </button>
            </div>
          )
        )}
      </SidePanel>

      {/* ── DETAIL SIDE PANEL ── */}
      <SidePanel
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        title={selectedRequest?.title || 'Request Detail'}
        width="w-[520px]"
      >
        {selectedRequest && (() => {
          const assignee = getAssignee(selectedRequest)
          const statusCls = STATUS_CONFIG[selectedRequest.status] || STATUS_CONFIG.Submitted
          return (
            <div className="p-6 space-y-6">
              {/* Header meta */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-medium text-text-dim">{selectedRequest.id}</span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusCls}`}>{selectedRequest.status}</span>
                <span className="text-xs text-text-dim">· {getSubmittedDate(selectedRequest)}</span>
              </div>

              {/* Assigned SSU member */}
              <div className="flex items-center gap-3 p-4 bg-bg-elevated rounded-xl border border-border">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0 ${assignee.avatarCls}`}>
                  {assignee.initials}
                </div>
                <div>
                  <p className="text-xs text-text-dim mb-0.5">Assigned to</p>
                  <p className="text-sm font-semibold text-text">{assignee.name}</p>
                  <p className="text-xs text-text-muted">{assignee.role}</p>
                </div>
              </div>

              {/* Original request */}
              <div>
                <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-2">Your Request</p>
                <div className="bg-bg-surface border border-border rounded-xl p-4">
                  <p className="text-sm text-text-muted leading-relaxed">{selectedRequest.description}</p>
                </div>
              </div>

              {/* SSU Response as message bubble */}
              {selectedRequest.response && (
                <div>
                  <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-3">Response from SSU</p>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${assignee.avatarCls}`}>
                      {assignee.initials}
                    </div>
                    <div className="flex-1 bg-bg-elevated border border-border rounded-xl rounded-tl-sm p-4">
                      <p className="text-xs font-semibold text-text mb-1.5">{assignee.name}</p>
                      <p className="text-sm text-text-muted leading-relaxed">{selectedRequest.response}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status timeline */}
              {selectedRequest.timeline?.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-3">Timeline</p>
                  <div className="space-y-0">
                    {selectedRequest.timeline.map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-2 h-2 rounded-full bg-amber mt-1.5" />
                          {idx < selectedRequest.timeline.length - 1 && (
                            <div className="w-px flex-1 bg-border mt-1" />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="text-sm text-text font-medium">{item.event}</p>
                          <p className="text-xs text-text-muted mt-0.5">{item.date} · {item.by}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add a note */}
              <div className="pt-2 border-t border-border">
                <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-3">Add a Note</p>
                {noteSubmitted ? (
                  <div className="flex items-center gap-2 text-sm text-pulse-green">
                    <CheckCircle size={14} />
                    Note added. The team has been notified.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <textarea
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      placeholder="Add context or a follow-up to this request…"
                      rows={3}
                      className="w-full rounded-xl border border-border bg-bg-elevated text-sm text-text placeholder:text-text-dim p-3 focus:outline-none focus:border-amber/60 focus:ring-2 focus:ring-amber/10 transition-all resize-none"
                    />
                    <button
                      onClick={handleNoteSubmit}
                      disabled={!noteText.trim()}
                      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-amber text-white hover:bg-amber/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <MessageSquare size={13} />
                      Add Note
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })()}
      </SidePanel>
    </Layout>
  )
}
