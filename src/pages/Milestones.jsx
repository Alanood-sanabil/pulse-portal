import { useState } from 'react'
import { Plus, CheckCircle2, AlertTriangle, Clock, XCircle, CalendarDays, FileText, History, ChevronDown } from 'lucide-react'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import SidePanel from '../components/SidePanel'
import { useApp } from '../context/AppContext'

const STATUS_CONFIG = {
  achieved: {
    label: 'Achieved',
    badgeClass: 'bg-pulse-green/10 text-pulse-green',
    dotClass: 'bg-pulse-green border-pulse-green',
    icon: CheckCircle2,
  },
  'at-risk': {
    label: 'At Risk',
    badgeClass: 'bg-amber/10 text-amber',
    dotClass: 'bg-amber border-amber',
    icon: AlertTriangle,
  },
  upcoming: {
    label: 'Upcoming',
    badgeClass: 'bg-bg-elevated text-text-muted',
    dotClass: 'bg-bg-elevated border-border',
    icon: Clock,
  },
  missed: {
    label: 'Missed',
    badgeClass: 'bg-pulse-red/10 text-pulse-red',
    dotClass: 'bg-pulse-red border-pulse-red',
    icon: XCircle,
  },
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.upcoming
  return (
    <span className={`badge ${config.badgeClass} text-xs font-medium px-2 py-0.5 rounded-full`}>
      {config.label}
    </span>
  )
}

function TimelineDot({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.upcoming
  return (
    <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${config.dotClass} z-10 relative`} />
  )
}

export default function Milestones() {
  const { milestones, addMilestone, updateMilestone, addToast } = useApp()

  // Side panel state
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)

  // Panel edit state
  const [panelStatus, setPanelStatus] = useState('')
  const [panelNotes, setPanelNotes] = useState('')
  const [panelNotesChanged, setPanelNotesChanged] = useState(false)

  // Log achievement modal
  const [logModalOpen, setLogModalOpen] = useState(false)
  const [logDate, setLogDate] = useState(new Date().toISOString().slice(0, 10))
  const [logNote, setLogNote] = useState('')

  // Add milestone modal
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newDesc, setNewDesc] = useState('')

  function openPanel(milestone) {
    setSelectedMilestone(milestone)
    setPanelStatus(milestone.status)
    setPanelNotes(milestone.notes || '')
    setPanelNotesChanged(false)
    setPanelOpen(true)
  }

  function closePanel() {
    setPanelOpen(false)
    setSelectedMilestone(null)
  }

  function handleStatusChange(e) {
    const newStatus = e.target.value
    setPanelStatus(newStatus)
    updateMilestone(selectedMilestone.id, { status: newStatus })
    setSelectedMilestone(prev => ({ ...prev, status: newStatus }))
    addToast('Milestone status updated', 'success')
  }

  function handleSaveNotes() {
    updateMilestone(selectedMilestone.id, { notes: panelNotes })
    setSelectedMilestone(prev => ({ ...prev, notes: panelNotes }))
    setPanelNotesChanged(false)
    addToast('Notes saved', 'success')
  }

  function handleLogAchievement() {
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    const displayDate = logDate
      ? new Date(logDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : today

    const newHistory = [
      ...(selectedMilestone.history || []),
      { date: displayDate, note: logNote || 'Achievement logged', user: 'Mustafa' },
    ]

    updateMilestone(selectedMilestone.id, {
      status: 'achieved',
      actualDate: displayDate,
      notes: logNote || selectedMilestone.notes,
      history: newHistory,
    })

    setSelectedMilestone(prev => ({
      ...prev,
      status: 'achieved',
      actualDate: displayDate,
      notes: logNote || prev.notes,
      history: newHistory,
    }))
    setPanelStatus('achieved')

    setLogModalOpen(false)
    setLogDate(new Date().toISOString().slice(0, 10))
    setLogNote('')
    addToast('Milestone marked as achieved!', 'success')
  }

  function handleAddMilestone() {
    if (!newName.trim()) return
    const displayDate = newDate
      ? new Date(newDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '—'

    addMilestone({
      id: 'ms-' + Date.now(),
      name: newName.trim(),
      status: 'upcoming',
      plannedDate: displayDate,
      actualDate: null,
      description: newDesc.trim(),
      notes: '',
      history: [],
    })

    setAddModalOpen(false)
    setNewName('')
    setNewDate('')
    setNewDesc('')
    addToast('Milestone added', 'success')
  }

  // Get the live milestone from context (keeps in sync)
  const liveMilestone = selectedMilestone
    ? milestones.find(m => m.id === selectedMilestone.id) || selectedMilestone
    : null

  return (
    <Layout title="Milestones" subtitle="Track your venture milestones and key achievements">
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-text-muted text-sm">{milestones.filter(m => m.status === 'achieved').length} of {milestones.length} achieved</p>
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Plus size={15} />
            Add Custom Milestone
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[7px] top-4 bottom-4 w-px bg-border" />

          <div className="space-y-0">
            {milestones.map((milestone, idx) => {
              const config = STATUS_CONFIG[milestone.status] || STATUS_CONFIG.upcoming
              return (
                <div key={milestone.id} className="flex gap-4 group">
                  {/* Dot column */}
                  <div className="flex flex-col items-center pt-4">
                    <TimelineDot status={milestone.status} />
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 mb-4 card p-4 cursor-pointer hover:border-amber/40 transition-all duration-150 ${
                      milestone.status === 'at-risk' ? 'border-l-2 border-l-amber' :
                      milestone.status === 'achieved' ? 'border-l-2 border-l-pulse-green' :
                      milestone.status === 'missed' ? 'border-l-2 border-l-pulse-red' : ''
                    }`}
                    onClick={() => openPanel(milestone)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-text text-sm">{milestone.name}</span>
                          <StatusBadge status={milestone.status} />
                        </div>
                        {milestone.description && (
                          <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{milestone.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-text-dim">
                            <CalendarDays size={11} />
                            <span>Planned: {milestone.plannedDate || '—'}</span>
                          </div>
                          {milestone.status === 'achieved' && milestone.actualDate && (
                            <div className="flex items-center gap-1 text-xs text-pulse-green">
                              <CheckCircle2 size={11} />
                              <span>Achieved: {milestone.actualDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <config.icon
                        size={16}
                        className={
                          milestone.status === 'achieved' ? 'text-pulse-green' :
                          milestone.status === 'at-risk' ? 'text-amber' :
                          milestone.status === 'missed' ? 'text-pulse-red' :
                          'text-text-dim'
                        }
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── Milestone Detail Side Panel ─── */}
      <SidePanel
        isOpen={panelOpen}
        onClose={closePanel}
        title={liveMilestone?.name || ''}
        width="w-[520px]"
      >
        {liveMilestone && (
          <div className="p-6 space-y-6">
            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Status</label>
              <div className="relative">
                <select
                  value={panelStatus}
                  onChange={handleStatusChange}
                  className="input-field w-full pr-8 appearance-none cursor-pointer"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="at-risk">At Risk</option>
                  <option value="achieved">Achieved</option>
                  <option value="missed">Missed</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wide">Planned Date</label>
                <p className="text-sm text-text flex items-center gap-1.5">
                  <CalendarDays size={13} className="text-text-dim" />
                  {liveMilestone.plannedDate || '—'}
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wide">Actual Date</label>
                <p className={`text-sm flex items-center gap-1.5 ${liveMilestone.actualDate ? 'text-pulse-green' : 'text-text-dim'}`}>
                  <CheckCircle2 size={13} />
                  {liveMilestone.actualDate || '—'}
                </p>
              </div>
            </div>

            {/* Description */}
            {liveMilestone.description && (
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Description</label>
                <p className="text-sm text-text leading-relaxed">{liveMilestone.description}</p>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Notes</label>
              <textarea
                value={panelNotes}
                onChange={e => { setPanelNotes(e.target.value); setPanelNotesChanged(true) }}
                rows={3}
                className="input-field w-full resize-none text-sm"
                placeholder="Add notes..."
              />
              {panelNotesChanged && (
                <button
                  onClick={handleSaveNotes}
                  className="btn-primary text-xs mt-2"
                >
                  Save Notes
                </button>
              )}
            </div>

            {/* History */}
            {liveMilestone.history && liveMilestone.history.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-text-muted mb-2 uppercase tracking-wide flex items-center gap-1.5">
                  <History size={12} />
                  History
                </label>
                <div className="space-y-2">
                  {liveMilestone.history.map((entry, i) => (
                    <div key={i} className="bg-bg-elevated rounded-lg p-3">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-medium text-text">{entry.user}</span>
                        <span className="text-xs text-text-dim">{entry.date}</span>
                      </div>
                      <p className="text-xs text-text-muted">{entry.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Log Achievement button */}
            {liveMilestone.status !== 'achieved' && (
              <button
                onClick={() => setLogModalOpen(true)}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
              >
                <CheckCircle2 size={15} />
                Log Achievement
              </button>
            )}
          </div>
        )}
      </SidePanel>

      {/* ─── Log Achievement Modal ─── */}
      <Modal
        isOpen={logModalOpen}
        onClose={() => { setLogModalOpen(false); setLogDate(new Date().toISOString().slice(0, 10)); setLogNote('') }}
        title="Log Achievement"
      >
        <div className="p-6 space-y-4">
          <p className="text-sm text-text-muted">
            Record the achievement of <span className="font-medium text-text">{liveMilestone?.name}</span>.
          </p>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Achievement Date</label>
            <input
              type="date"
              value={logDate}
              onChange={e => setLogDate(e.target.value)}
              className="input-field w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Notes (optional)</label>
            <textarea
              value={logNote}
              onChange={e => setLogNote(e.target.value)}
              rows={3}
              className="input-field w-full resize-none text-sm"
              placeholder="Add context about this achievement..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => { setLogModalOpen(false); setLogDate(new Date().toISOString().slice(0, 10)); setLogNote('') }}
              className="btn-secondary text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleLogAchievement}
              className="btn-primary text-sm flex items-center gap-1.5"
            >
              <CheckCircle2 size={14} />
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      {/* ─── Add Custom Milestone Modal ─── */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => { setAddModalOpen(false); setNewName(''); setNewDate(''); setNewDesc('') }}
        title="Add Custom Milestone"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Milestone Name *</label>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="input-field w-full text-sm"
              placeholder="e.g. Series A Close"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Target Date</label>
            <input
              type="date"
              value={newDate}
              onChange={e => setNewDate(e.target.value)}
              className="input-field w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Description</label>
            <textarea
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              rows={3}
              className="input-field w-full resize-none text-sm"
              placeholder="What does achieving this milestone mean?"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => { setAddModalOpen(false); setNewName(''); setNewDate(''); setNewDesc('') }}
              className="btn-secondary text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleAddMilestone}
              disabled={!newName.trim()}
              className="btn-primary text-sm flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={14} />
              Add Milestone
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  )
}
