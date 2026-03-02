import { useState, useRef } from 'react'
import { Upload, Search, Eye, Download, History, FileText, File, Sheet, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
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

  // View modal
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewDoc, setViewDoc] = useState(null)

  // History modal
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [historyDoc, setHistoryDoc] = useState(null)

  const fileInputRef = useRef(null)

  const categoryDocs = documents[activeCategory] || []
  const filteredDocs = searchQuery.trim()
    ? categoryDocs.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : categoryDocs

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
      uploaded: 'Mar 2, 2026',
      version: 'v1',
      uploader: 'Mustafa',
      status: 'current',
      versions: [{ v: 'v1', date: 'Mar 2, 2026', uploader: 'Mustafa' }],
    })

    addToast('Document uploaded', 'success')
    // Reset input so same file can be re-selected
    e.target.value = ''
  }

  function handleView(doc) {
    setViewDoc(doc)
    setViewModalOpen(true)
  }

  function handleDownload(doc) {
    addToast('Download started', 'success')
  }

  function handleHistory(doc) {
    setHistoryDoc(doc)
    setHistoryModalOpen(true)
  }

  return (
    <Layout title="Document Library" subtitle="Manage your venture documents">
      <div className="p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
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
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary flex items-center gap-2 text-sm shrink-0"
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

        {/* Category tabs */}
        <div className="flex gap-1 border-b border-border mb-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setSearchQuery('') }}
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
                    className={`hover:bg-bg-elevated/50 transition-colors ${
                      doc.status === 'pending-signature' ? 'border-l-2 border-l-amber' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
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
                          onClick={() => handleView(doc)}
                          className="btn-ghost text-xs flex items-center gap-1 px-2 py-1"
                          title="View"
                        >
                          <Eye size={13} />
                          View
                        </button>
                        <button
                          onClick={() => handleDownload(doc)}
                          className="btn-ghost text-xs flex items-center gap-1 px-2 py-1"
                          title="Download"
                        >
                          <Download size={13} />
                          Download
                        </button>
                        <button
                          onClick={() => handleHistory(doc)}
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
              <div>
                <p className="font-semibold text-text text-sm leading-snug">{viewDoc.name}</p>
                <p className="text-xs text-text-muted mt-0.5">{activeCategory}</p>
              </div>
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
    </Layout>
  )
}
