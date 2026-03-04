import { useState, useEffect, useRef } from 'react'
import { CheckCircle, Paperclip, AlertTriangle, Clock, Info, Zap, ChevronRight } from 'lucide-react'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { recentRequests } from '../data/mockData'

const CATEGORIES = ['Legal', 'Finance', 'HR', 'IT', 'Talent', 'Operations']
const PRIORITIES = ['Normal', 'High', 'Urgent']
const MAX_DESC = 500

const PRIORITY_INFO = {
  Normal: { label: 'Normal', desc: 'Response within 2 business days. For non-urgent questions and general support.', color: 'text-text-muted' },
  High: { label: 'High', desc: 'Response within 4 hours during business hours. For time-sensitive matters that affect your operations.', color: 'text-amber' },
  Urgent: { label: 'Urgent', desc: 'Immediate alert to your Portfolio Manager. Use only for blocking issues or legal/financial emergencies.', color: 'text-pulse-red' },
}

const TEMPLATES = [
  { label: 'Employment contract', category: 'Legal', priority: 'High', title: 'Employment contract template needed', description: 'We need a KSA-compliant employment contract template for a new hire. The candidate is [nationality] and will be based in Riyadh.' },
  { label: 'VAT / ZATCA guidance', category: 'Finance', priority: 'Normal', title: 'VAT filing guidance', description: 'We need guidance on VAT filing via the ZATCA Fatoora portal. This is for [quarter/period]. Please advise on what to include and the submission deadline.' },
  { label: 'Bank account opening', category: 'Finance', priority: 'Normal', title: 'Corporate bank account setup', description: 'We need help opening a corporate bank account. We are considering [bank name]. Please advise on the required documents and expected timeline.' },
  { label: 'Talent sourcing request', category: 'Talent', priority: 'High', title: 'Candidate sourcing for [role] hire', description: 'We are looking to hire a [role]. Required experience: [X years] in [field]. Key technical skills: [skills]. Target start date: [date].' },
  { label: 'IT infrastructure setup', category: 'IT', priority: 'Normal', title: 'IT setup and tooling recommendation', description: 'We need recommendations for [tool/system]. Our current setup is [describe]. Team size: [N] people. Budget constraint: [if any].' },
  { label: 'Office space / CR help', category: 'Operations', priority: 'Normal', title: 'Commercial Registration / office address support', description: 'We need assistance with [CR registration / virtual office / physical office]. Timeline: [when needed]. Please advise on next steps.' },
]

const priorityStyles = {
  Normal: 'bg-bg-elevated text-text-muted border border-border',
  High: 'bg-amber/10 text-amber border border-amber/20',
  Urgent: 'bg-pulse-red/10 text-pulse-red border border-pulse-red/20',
}

const statusStyles = {
  Resolved: 'bg-pulse-green/10 text-pulse-green',
  'In Progress': 'bg-amber/10 text-amber',
  Responded: 'bg-pulse-blue/10 text-pulse-blue',
}

export default function RequestHelp() {
  const { selectedCategory, setSelectedCategory, addToast } = useApp()

  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('Normal')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showPriorityTooltip, setShowPriorityTooltip] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [duplicateWarning, setDuplicateWarning] = useState(null)

  const fileInputRef = useRef(null)
  const priorityRef = useRef(null)

  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory)
      setSelectedCategory(null)
    }
  }, [selectedCategory, setSelectedCategory])

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false)
        setCategory('')
        setPriority('Normal')
        setTitle('')
        setDescription('')
        setAttachment(null)
        setErrors({})
        setDuplicateWarning(null)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [submitted])

  // Check for duplicate as user types title
  useEffect(() => {
    if (title.trim().length < 5) { setDuplicateWarning(null); return }
    const similar = recentRequests.find(r =>
      r.title.toLowerCase().includes(title.toLowerCase().slice(0, 10)) ||
      title.toLowerCase().includes(r.title.toLowerCase().slice(0, 10))
    )
    setDuplicateWarning(similar || null)
  }, [title])

  function applyTemplate(tpl) {
    setCategory(tpl.category)
    setPriority(tpl.priority)
    setTitle(tpl.title)
    setDescription(tpl.description)
    setErrors({})
    setShowTemplates(false)
    addToast('Template applied', 'success')
  }

  function validate() {
    const newErrors = {}
    if (!category) newErrors.category = 'Please select a category.'
    if (!title.trim()) newErrors.title = 'Please enter a title.'
    if (!description.trim()) newErrors.description = 'Please enter a description.'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setSubmitted(true)
    addToast('Request submitted successfully!', 'success')
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0])
    }
  }

  const descLeft = MAX_DESC - description.length

  return (
    <Layout title="Request Help" subtitle="Get support from your Studio Support Unit">
      <div className="p-6 flex gap-6 items-start">
        {/* LEFT — REQUEST FORM */}
        <div className="flex-[3] min-w-0">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-text">Submit a New Request</h2>
              <button
                onClick={() => setShowTemplates(t => !t)}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <Zap size={14} />
                Templates
              </button>
            </div>

            {/* Template picker */}
            {showTemplates && (
              <div className="mb-5 p-4 bg-bg-elevated rounded-xl border border-border space-y-2">
                <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-3">Quick Start Templates</p>
                {TEMPLATES.map(tpl => (
                  <button
                    key={tpl.label}
                    onClick={() => applyTemplate(tpl)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-bg-surface border border-border hover:bg-white hover:border-amber/20 transition-colors text-left group"
                  >
                    <div>
                      <p className="text-sm font-medium text-text">{tpl.label}</p>
                      <p className="text-xs text-text-dim">{tpl.category} · {tpl.priority} priority</p>
                    </div>
                    <ChevronRight size={13} className="text-text-dim group-hover:text-amber transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4">
                <div className="w-14 h-14 rounded-full bg-pulse-green/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-pulse-green" />
                </div>
                <div className="text-center">
                  <p className="text-text font-semibold text-lg">Request Submitted!</p>
                  <p className="text-text-muted text-sm mt-1">
                    Reference number:{' '}
                    <span className="font-mono font-medium text-text">REQ-2026-047</span>
                  </p>
                  <p className="text-text-dim text-xs mt-2">Your form will reset in a few seconds…</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Category</label>
                  <select
                    className="input-field w-full"
                    value={category}
                    onChange={e => { setCategory(e.target.value); if (errors.category) setErrors(p => ({ ...p, category: undefined })) }}
                  >
                    <option value="">Select a category…</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.category && <p className="text-pulse-red text-xs mt-1">{errors.category}</p>}
                </div>

                {/* Priority with tooltip */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="text-sm font-medium text-text-muted">Priority</label>
                    <div className="relative" ref={priorityRef}>
                      <button
                        type="button"
                        onMouseEnter={() => setShowPriorityTooltip(true)}
                        onMouseLeave={() => setShowPriorityTooltip(false)}
                        className="w-4 h-4 text-text-dim hover:text-text transition-colors"
                        aria-label="Priority levels explained"
                      >
                        <Info size={14} />
                      </button>
                      {showPriorityTooltip && (
                        <div className="absolute left-6 top-0 z-30 w-72 bg-white border border-border rounded-xl shadow-lg p-4 space-y-3">
                          {PRIORITIES.map(p => (
                            <div key={p}>
                              <p className={`text-xs font-semibold ${PRIORITY_INFO[p].color}`}>{p}</p>
                              <p className="text-xs text-text-muted mt-0.5">{PRIORITY_INFO[p].desc}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {PRIORITIES.map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${priority === p ? priorityStyles[p] : 'bg-bg-elevated text-text-muted border-border hover:border-border/80'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Urgent warning */}
                {priority === 'Urgent' && (
                  <div className="flex items-start gap-2 rounded-lg bg-pulse-red/5 border border-pulse-red/20 px-4 py-3">
                    <AlertTriangle className="w-4 h-4 text-pulse-red mt-0.5 shrink-0" />
                    <p className="text-pulse-red text-sm">
                      Your Portfolio Manager <span className="font-semibold">Sarah Al-Rashid</span> will be notified immediately.
                    </p>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Title</label>
                  <input
                    type="text"
                    className="input-field w-full"
                    placeholder="Brief summary of your request"
                    value={title}
                    onChange={e => { setTitle(e.target.value); if (errors.title) setErrors(p => ({ ...p, title: undefined })) }}
                  />
                  {errors.title && <p className="text-pulse-red text-xs mt-1">{errors.title}</p>}
                  {/* Duplicate warning */}
                  {duplicateWarning && (
                    <div className="flex items-start gap-2 mt-2 rounded-lg bg-amber/5 border border-amber/20 px-3 py-2">
                      <AlertTriangle size={13} className="text-amber shrink-0 mt-0.5" />
                      <p className="text-xs text-amber">
                        Similar request found: <span className="font-medium">{duplicateWarning.title}</span> ({duplicateWarning.status}).{' '}
                        <button type="button" onClick={() => setSelectedRequest(duplicateWarning)} className="underline hover:no-underline">
                          View it
                        </button>
                      </p>
                    </div>
                  )}
                </div>

                {/* Description with char count */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Description</label>
                  <textarea
                    className="input-field w-full min-h-[120px] resize-y"
                    placeholder="Describe your request in detail…"
                    value={description}
                    maxLength={MAX_DESC}
                    onChange={e => { setDescription(e.target.value); if (errors.description) setErrors(p => ({ ...p, description: undefined })) }}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {errors.description
                      ? <p className="text-pulse-red text-xs">{errors.description}</p>
                      : <span />
                    }
                    <span className={`text-xs ${descLeft < 50 ? 'text-pulse-red' : descLeft < 100 ? 'text-amber' : 'text-text-dim'}`}>
                      {descLeft} characters remaining
                    </span>
                  </div>
                </div>

                {/* Attachment */}
                <div>
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                  <button
                    type="button"
                    className="btn-ghost flex items-center gap-2 text-sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-4 h-4" />
                    {attachment ? attachment.name : 'Attach a file'}
                  </button>
                </div>

                {/* Submit */}
                <div className="pt-1">
                  <button type="submit" className="btn-primary w-full">Submit Request</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT — RECENT REQUESTS */}
        <div className="flex-[2] min-w-0">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-text mb-5">Recent Requests</h2>
            <div className="space-y-3">
              {recentRequests.slice(0, 4).map(req => (
                <button
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className="w-full text-left rounded-xl border border-border bg-bg-surface hover:bg-bg-elevated transition-colors p-4 group"
                >
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="badge font-mono text-xs">{req.id}</span>
                    <span className="badge">{req.category}</span>
                    <span className={`badge text-xs font-medium ${priorityStyles[req.priority] || priorityStyles.Normal}`}>{req.priority}</span>
                    <span className={`badge text-xs font-medium ml-auto ${statusStyles[req.status] || 'bg-bg-elevated text-text-muted'}`}>{req.status}</span>
                  </div>
                  <p className="text-text text-sm font-medium leading-snug group-hover:text-amber transition-colors">{req.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* REQUEST DETAIL MODAL */}
      {selectedRequest && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title={selectedRequest.title}
        >
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="badge font-mono text-xs">{selectedRequest.id}</span>
              <span className="badge">{selectedRequest.category}</span>
              <span className={`badge text-xs font-medium ${priorityStyles[selectedRequest.priority] || priorityStyles.Normal}`}>{selectedRequest.priority}</span>
              <span className={`badge text-xs font-medium ${statusStyles[selectedRequest.status] || 'bg-bg-elevated text-text-muted'}`}>{selectedRequest.status}</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-muted text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>Submitted {selectedRequest.submittedAt}</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Description</p>
              <p className="text-text text-sm leading-relaxed">{selectedRequest.description}</p>
            </div>
            {selectedRequest.response && (
              <div className="rounded-lg bg-bg-elevated border border-border p-4">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">SSU Response</p>
                <p className="text-text text-sm leading-relaxed">{selectedRequest.response}</p>
              </div>
            )}
            {selectedRequest.timeline && selectedRequest.timeline.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Status Timeline</p>
                <div className="relative space-y-0">
                  {selectedRequest.timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-amber mt-1.5 shrink-0" />
                        {idx < selectedRequest.timeline.length - 1 && <div className="w-px flex-1 bg-border-subtle mt-1" />}
                      </div>
                      <div className="pb-4">
                        <p className="text-text text-sm font-medium">{item.event}</p>
                        <p className="text-text-muted text-xs mt-0.5">{item.date} · {item.by}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </Layout>
  )
}
