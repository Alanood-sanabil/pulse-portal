import { useState, useRef, useMemo } from 'react'
import { Upload, Search, Eye, Download, History, FileText, File, Sheet, Clock, CheckCircle2, AlertCircle, Star, FileQuestion, CheckSquare, Square, X } from 'lucide-react'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'

const CATEGORIES = ['Legal', 'Finance', 'Product', 'Fundraising', 'HR']

const TYPE_CONFIG = {
  PDF: { label: 'PDF', className: 'bg-pulse-red/10 text-pulse-red', icon: FileText },
  DOCX: { label: 'DOCX', className: 'bg-pulse-blue/10 text-pulse-blue', icon: File },
  XLSX: { label: 'XLSX', className: 'bg-pulse-green/10 text-pulse-green', icon: Sheet },
}

const STATUS_CONFIG = {
  signed: { label: 'Signed', className: 'bg-pulse-green/10 text-pulse-green', icon: CheckCircle2 },
  'pending-signature': { label: 'Pending Signature', className: 'bg-amber/10 text-amber', icon: AlertCircle },
  current: { label: 'Current', className: 'bg-bg-elevated text-text-muted', icon: Clock },
}

function TypeBadge({ type }) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.DOCX
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${config.className}`}>
      {type}
    </span>
  )
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.current
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${config.className}`}>
      {config.label}
    </span>
  )
}

export default function DocumentLibrary() {
  const { documents, addDocument, addToast } = useApp()

  const [activeCategory, setActiveCategory] = useState('Legal')
  const [searchQuery, setSearchQuery] = useState('')

  // Recently viewed: array of { id, name, type, category }
  const [recentlyViewed, setRecentlyViewed] = useState([])

  // Starred: Set of doc IDs
  const [starredIds, setStarredIds] = useState(new Set())

  // Bulk select
  const [bulkMode, setBulkMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState(new Set())

  // View modal
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewDoc, setViewDoc] = useState(null)

  // History modal
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [historyDoc, setHistoryDoc] = useState(null)

  // Request doc modal
  const [requestModalOpen, setRequestModalOpen] = useState(false)
  const [requestForm, setRequestForm] = useState({ name: '', category: 'Legal', description: '' })

  const fileInputRef = useRef(null)

  const categoryDocs = documents[activeCategory] || []
  const filteredDocs = searchQuery.trim()
    ? categoryDocs.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : categoryDocs

  // All docs flat for starred/recently viewed lookup
  const allDocs = useMemo(() => {
    return CATEGORIES.flatMap(cat => (documents[cat] || []).map(d => ({ ...d, category: cat })))
  }, [documents])

  const starredDocs = useMemo(() => allDocs.filter(d => starredIds.has(d.id)), [allDocs, starredIds])

  function addToRecent(doc, category) {
    setRecentlyViewed(prev => {
      const entry = { id: doc.id, name: doc.name, type: doc.type, category }
      const filtered = prev.filter(r => r.id !== doc.id)
      return [entry, ...filtered].slice(0, 3)
    })
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return

    let type = 'DOCX'
    if (file.name.toLowerCase().endsWith('.pdf')) type = 'PDF'
    else if (file.name.toLowerCase().endsWith('.xlsx') || file.name.toLowerCase().endsWith('.xls')) type = 'XLSX'

    const sizeMB = (file.size / (1024 * 1024)).toFixed(1)
    const sizeDisplay = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${Math.round(file.size / 1024)} KB`

    addDocument(activeCategory, {
      id: 'd-' + Date.now(),
      name: file.name,
      type,
      size: sizeDisplay,
      uploaded: 'Mar 4, 2026',
      version: 'v1',
      uploader: 'Mustafa',
      status: 'current',
      versions: [{ v: 'v1', date: 'Mar 4, 2026', uploader: 'Mustafa' }],
    })

    addToast('Document uploaded', 'success')
    e.target.value = ''
  }

  function handleView(doc) {
    setViewDoc(doc)
    setViewModalOpen(true)
    addToRecent(doc, activeCategory)
  }

  function handleDownload(doc) {
    addToast('Download started', 'success')
  }

  function handleBulkDownload() {
    if (selectedIds.size === 0) return
    addToast(`Downloading ${selectedIds.size} document${selectedIds.size > 1 ? 's' : ''}…`, 'success')
    setSelectedIds(new Set())
    setBulkMode(false)
  }

  function handleHistory(doc) {
    setHistoryDoc(doc)
    setHistoryModalOpen(true)
  }

  function toggleStar(id, e) {
    e.stopPropagation()
    setStarredIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id); addToast('Removed from starred', 'default') }
      else { next.add(id); addToast('Document starred', 'success') }
      return next
    })
  }

  function toggleSelect(id) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleSelectAll() {
    if (selectedIds.size === filteredDocs.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(filteredDocs.map(d => d.id)))
  }

  function handleSubmitRequest() {
    if (!requestForm.name.trim()) { addToast('Enter a document name', 'default'); return }
    addToast(`Request submitted: ${requestForm.name}`, 'success')
    setRequestForm({ name: '', category: 'Legal', description: '' })
    setRequestModalOpen(false)
  }

  return (
    <Layout title="Document Library" subtitle="Manage your venture documents">
      <div className="p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="input-field w-full pl-9 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setRequestModalOpen(true)}
              className="btn-ghost flex items-center gap-2 text-sm"
            >
              <FileQuestion size={14} />
              Request Doc
            </button>
            <button
              onClick={() => { setBulkMode(b => !b); setSelectedIds(new Set()) }}
              className={`btn-ghost flex items-center gap-2 text-sm ${bulkMode ? 'text-amber' : ''}`}
            >
              <CheckSquare size={14} />
              {bulkMode ? 'Cancel Select' : 'Select'}
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Upload size={14} />
              Upload Document
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc,.xlsx,.xls"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-3">Recently Viewed</p>
            <div className="flex gap-2 flex-wrap">
              {recentlyViewed.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => {
                    setActiveCategory(doc.category)
                    const full = (documents[doc.category] || []).find(d => d.id === doc.id)
                    if (full) handleView(full)
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-bg-surface hover:bg-bg-elevated hover:border-amber/30 transition-colors text-xs text-text-muted group"
                >
                  <Clock size={11} className="text-text-dim group-hover:text-amber transition-colors" />
                  <span className="max-w-[140px] truncate font-medium text-text">{doc.name}</span>
                  <TypeBadge type={doc.type} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Starred Documents */}
        {starredDocs.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-3">Starred</p>
            <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <tbody className="divide-y divide-border">
                  {starredDocs.map(doc => (
                    <tr key={doc.id} className="hover:bg-bg-elevated/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={e => toggleStar(doc.id, e)} className="text-amber shrink-0">
                            <Star size={13} fill="currentColor" />
                          </button>
                          <FileText size={14} className="text-text-dim shrink-0" />
                          <span className="text-sm font-medium text-text">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><TypeBadge type={doc.type} /></td>
                      <td className="px-4 py-3"><span className="text-xs text-text-muted">{doc.category}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => { setActiveCategory(doc.category); handleView(doc) }}
                            className="btn-ghost text-xs flex items-center gap-1 px-2 py-1"
                          >
                            <Eye size={13} /> View
                          </button>
                          <button
                            onClick={() => handleDownload(doc)}
                            className="btn-ghost text-xs flex items-center gap-1 px-2 py-1"
                          >
                            <Download size={13} /> Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Category tabs */}
        <div className="flex gap-1 border-b border-border mb-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setSearchQuery(''); setSelectedIds(new Set()) }}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                activeCategory === cat
                  ? 'text-amber'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber rounded-t-full" />
              )}
              <span className="ml-1.5 text-xs text-text-dim">
                ({(documents[cat] || []).length})
              </span>
            </button>
          ))}
        </div>

        {/* Bulk action bar */}
        {bulkMode && (
          <div className="mt-3 flex items-center gap-3 px-4 py-2.5 bg-bg-elevated border border-border rounded-xl">
            <button onClick={handleSelectAll} className="text-xs text-text-muted hover:text-text transition-colors">
              {selectedIds.size === filteredDocs.length ? 'Deselect All' : 'Select All'}
            </button>
            <span className="text-xs text-text-dim">{selectedIds.size} selected</span>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={handleBulkDownload}
                disabled={selectedIds.size === 0}
                className="btn-secondary flex items-center gap-1.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Download size={12} /> Download Selected
              </button>
            </div>
          </div>
        )}

        {/* Document table */}
        <div className="bg-bg-surface border border-border rounded-xl overflow-hidden mt-4">
          {filteredDocs.length === 0 ? (
            <div className="py-16 text-center">
              <FileText size={32} className="mx-auto text-text-dim mb-3" />
              <p className="text-text-muted text-sm">
                {searchQuery ? 'No documents match your search.' : `No documents in ${activeCategory} yet.`}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary text-sm mt-3"
                >
                  Upload your first document
                </button>
              )}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-bg-elevated">
                  {bulkMode && <th className="w-10 px-4 py-3" />}
                  <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wide">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wide">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wide">Version</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wide">Size</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wide">Uploaded</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wide">Uploader</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredDocs.map(doc => (
                  <tr
                    key={doc.id}
                    className={`hover:bg-bg-elevated/50 transition-colors group ${
                      doc.status === 'pending-signature' ? 'border-l-2 border-l-amber' : ''
                    } ${bulkMode && selectedIds.has(doc.id) ? 'bg-amber/5' : ''}`}
                    onClick={bulkMode ? () => toggleSelect(doc.id) : undefined}
                  >
                    {bulkMode && (
                      <td className="px-4 py-3">
                        <button onClick={() => toggleSelect(doc.id)} className="text-text-dim hover:text-amber transition-colors">
                          {selectedIds.has(doc.id)
                            ? <CheckSquare size={14} className="text-amber" />
                            : <Square size={14} />
                          }
                        </button>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={e => toggleStar(doc.id, e)}
                          className={`shrink-0 transition-colors ${starredIds.has(doc.id) ? 'text-amber' : 'text-transparent group-hover:text-text-dim hover:!text-amber'}`}
                          title={starredIds.has(doc.id) ? 'Remove star' : 'Star document'}
                        >
                          <Star size={13} fill={starredIds.has(doc.id) ? 'currentColor' : 'none'} />
                        </button>
                        <FileText size={14} className="text-text-dim shrink-0" />
                        <span className="text-sm font-medium text-text">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <TypeBadge type={doc.type} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-text-muted font-mono">{doc.version}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-text-muted">{doc.size}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-text-muted">{doc.uploaded}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-text-muted">{doc.uploader}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={e => { e.stopPropagation(); handleView(doc) }}
                          className="btn-ghost text-xs flex items-center gap-1 px-2 py-1"
                          title="View"
                        >
                          <Eye size={13} />
                          View
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); handleDownload(doc) }}
                          className="btn-ghost text-xs flex items-center gap-1 px-2 py-1"
                          title="Download"
                        >
                          <Download size={13} />
                          Download
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); handleHistory(doc) }}
                          className="btn-ghost text-xs flex items-center gap-1 px-2 py-1"
                          title="Version history"
                        >
                          <History size={13} />
                          History
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ─── View Modal ─── */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => { setViewModalOpen(false); setViewDoc(null) }}
        title="Document Details"
      >
        {viewDoc && (
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3 p-4 bg-bg-elevated rounded-xl">
              <FileText size={28} className="text-text-muted shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text text-sm leading-snug">{viewDoc.name}</p>
                <p className="text-xs text-text-muted mt-0.5">{activeCategory}</p>
              </div>
              <button
                onClick={e => toggleStar(viewDoc.id, e)}
                className={`shrink-0 transition-colors ${starredIds.has(viewDoc.id) ? 'text-amber' : 'text-text-dim hover:text-amber'}`}
                title={starredIds.has(viewDoc.id) ? 'Remove star' : 'Star document'}
              >
                <Star size={16} fill={starredIds.has(viewDoc.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Type', value: <TypeBadge type={viewDoc.type} /> },
                { label: 'Version', value: <span className="text-sm text-text font-mono">{viewDoc.version}</span> },
                { label: 'Size', value: viewDoc.size },
                { label: 'Uploader', value: viewDoc.uploader },
                { label: 'Uploaded', value: viewDoc.uploaded },
                { label: 'Status', value: <StatusBadge status={viewDoc.status} /> },
              ].map(({ label, value }) => (
                <div key={label} className="bg-bg-surface rounded-lg p-3">
                  <p className="text-xs text-text-muted mb-1 uppercase tracking-wide">{label}</p>
                  {typeof value === 'string' ? (
                    <p className="text-sm text-text font-medium">{value}</p>
                  ) : value}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => { handleDownload(viewDoc); setViewModalOpen(false) }}
                className="btn-secondary text-sm flex items-center gap-1.5"
              >
                <Download size={13} />
                Download
              </button>
              <button
                onClick={() => setViewModalOpen(false)}
                className="btn-primary text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ─── Version History Modal ─── */}
      <Modal
        isOpen={historyModalOpen}
        onClose={() => { setHistoryModalOpen(false); setHistoryDoc(null) }}
        title="Version History"
      >
        {historyDoc && (
          <div className="p-6 space-y-4">
            <p className="text-sm font-medium text-text">{historyDoc.name}</p>

            {historyDoc.versions && historyDoc.versions.length > 0 ? (
              <div className="space-y-2">
                {[...historyDoc.versions].reverse().map((ver, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      i === 0 ? 'bg-amber/5 border-amber/20' : 'bg-bg-elevated border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full ${
                        i === 0 ? 'bg-amber/10 text-amber' : 'bg-bg-card text-text-muted'
                      }`}>
                        {ver.v}
                      </span>
                      <div>
                        <p className="text-xs font-medium text-text">{ver.uploader}</p>
                        <p className="text-xs text-text-dim">{ver.date}</p>
                      </div>
                    </div>
                    {i === 0 && (
                      <span className="text-xs text-amber font-medium">Latest</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-muted text-center py-4">No version history available.</p>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setHistoryModalOpen(false)}
                className="btn-primary text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ─── Request Document Modal ─── */}
      <Modal
        isOpen={requestModalOpen}
        onClose={() => { setRequestModalOpen(false); setRequestForm({ name: '', category: 'Legal', description: '' }) }}
        title="Request a Document"
      >
        <div className="p-6 space-y-4">
          <p className="text-sm text-text-muted leading-relaxed">
            Need a document from the studio team? Submit a request and they'll prepare it for you.
          </p>

          <div>
            <label className="block text-xs font-semibold text-text mb-1.5">Document Name <span className="text-pulse-red">*</span></label>
            <input
              type="text"
              value={requestForm.name}
              onChange={e => setRequestForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g., Employment Contract Template"
              className="input-field w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text mb-1.5">Category</label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setRequestForm(p => ({ ...p, category: cat }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    requestForm.category === cat
                      ? 'bg-amber/10 text-amber border-amber/20'
                      : 'bg-bg-elevated text-text-muted border-border hover:text-text'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text mb-1.5">Additional Details</label>
            <textarea
              value={requestForm.description}
              onChange={e => setRequestForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Any specific requirements or context for the team…"
              rows={3}
              className="input-field w-full text-sm resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={() => { setRequestModalOpen(false); setRequestForm({ name: '', category: 'Legal', description: '' }) }}
              className="btn-ghost text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitRequest}
              className="btn-primary text-sm flex items-center gap-1.5"
            >
              <FileQuestion size={13} />
              Submit Request
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  )
}
