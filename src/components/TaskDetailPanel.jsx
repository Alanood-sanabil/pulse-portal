import { useState, useRef } from 'react'
import SidePanel from './SidePanel'
import { useApp } from '../context/AppContext'
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Tag,
  User,
  Paperclip,
  MessageSquare,
  ChevronDown,
  Building2,
  Users,
  Lock,
  Check,
  Bell,
} from 'lucide-react'

const STUDIO_STATUS_OPTIONS = [
  { value: 'not-started', label: 'Not Started', color: 'text-text-dim', bg: 'bg-bg-elevated' },
  { value: 'in-progress', label: 'In Progress', color: 'text-pulse-blue', bg: 'bg-pulse-blue/10' },
  { value: 'waiting', label: 'Waiting', color: 'text-amber', bg: 'bg-amber/10' },
  { value: 'done', label: 'Done', color: 'text-pulse-green', bg: 'bg-pulse-green/10' },
]

const CATEGORY_COLORS = {
  Legal: 'tag-legal',
  Finance: 'tag-finance',
  Operations: 'tag-operations',
  Talent: 'tag-talent',
  HR: 'tag-hr',
}

const OWNER_TYPE_BADGE = {
  founder: { icon: User, label: 'Founder Owned', color: 'text-text-muted', bg: 'bg-bg-elevated' },
  studio: { icon: Building2, label: 'Studio Owned', color: 'text-pulse-blue', bg: 'bg-pulse-blue/10' },
  shared: { icon: Users, label: 'Shared', color: 'text-amber', bg: 'bg-amber/10' },
}

// ── Shared history log entry ──────────────────────────────
function HistoryEntry({ entry }) {
  return (
    <div className="flex gap-3 text-sm">
      <div className="w-7 h-7 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-xs font-semibold text-text-muted shrink-0">
        {entry.initials}
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-text-muted leading-snug">
          <span className="font-medium text-text">{entry.name}</span>
          {' '}·{' '}
          <span className="text-text-dim">{entry.role}</span>
        </p>
        <p className="text-text-muted text-xs leading-relaxed mt-0.5">{entry.action}</p>
        <p className="text-text-dim text-xs mt-0.5">{entry.date}</p>
      </div>
    </div>
  )
}

// ── Notes section (shared across all types) ──────────────
function NotesSection({ addToast }) {
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef()
  const [attachments, setAttachments] = useState([])

  function handleSubmitNote() {
    if (!note.trim()) return
    setSubmitted(true)
    setNote('')
    addToast('Note submitted', 'success')
    setTimeout(() => setSubmitted(false), 3000)
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) {
      setAttachments(prev => [...prev, file.name])
      addToast('Attachment uploaded', 'success')
    }
  }

  return (
    <>
      {/* Attachments */}
      <div>
        <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Attachments</h3>
        {attachments.length > 0 && (
          <ul className="mb-2 space-y-1">
            {attachments.map((name, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                <Paperclip size={12} />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 border border-dashed border-border rounded-lg text-sm text-text-muted hover:border-amber/40 hover:text-text transition-colors w-full"
        >
          <Paperclip size={14} />
          Upload attachment
        </button>
        <input ref={fileRef} type="file" className="hidden" onChange={handleFileChange} />
      </div>

      {/* Notes */}
      <div>
        <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">
          <MessageSquare size={11} className="inline mr-1" />Notes & Comments
        </h3>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Add a note or comment..."
          rows={3}
          className="input-field resize-none mb-2"
        />
        {submitted ? (
          <div className="flex items-center gap-2 text-sm text-pulse-green">
            <CheckCircle size={14} />
            <span>Note submitted</span>
          </div>
        ) : (
          <button
            onClick={handleSubmitNote}
            disabled={!note.trim()}
            className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed text-xs"
          >
            Submit Note
          </button>
        )}
      </div>
    </>
  )
}

// ── FOUNDER OWNED panel ───────────────────────────────────
function FounderPanel({ task, addToast, updateTaskStatus, taskStatuses }) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const STATUS_OPTIONS = [
    { value: 'not-started', label: 'Not Started', color: 'text-text-dim' },
    { value: 'in-progress', label: 'In Progress', color: 'text-pulse-blue' },
    { value: 'waiting-ssu', label: 'Waiting on SSU', color: 'text-amber' },
    { value: 'blocked', label: 'Blocked', color: 'text-pulse-red' },
    { value: 'in-review', label: 'In Review', color: 'text-pulse-purple' },
    { value: 'done', label: 'Done', color: 'text-pulse-green' },
  ]

  const currentStatus = taskStatuses[task.id] || 'not-started'
  const statusOption = STATUS_OPTIONS.find(s => s.value === currentStatus) || STATUS_OPTIONS[0]

  function handleStatusChange(value) {
    updateTaskStatus(task.id, value)
    setShowStatusDropdown(false)
    addToast(`Status updated to "${STATUS_OPTIONS.find(s => s.value === value)?.label}"`, 'success')
  }

  function handleMarkDone() {
    updateTaskStatus(task.id, 'done')
    addToast('Task marked as Done', 'success')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Steps */}
      <div>
        <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-3">How to complete</h3>
        <ol className="space-y-2">
          {task.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-text-muted">
              <span className="shrink-0 w-5 h-5 rounded-full bg-bg-elevated border border-border text-xs flex items-center justify-center text-text-dim font-medium">
                {i + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Status */}
      <div>
        <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Status</h3>
        <div className="relative">
          <button
            onClick={() => setShowStatusDropdown(p => !p)}
            className="flex items-center gap-2 px-3 py-2 bg-bg-elevated border border-border rounded-lg text-sm hover:border-amber/40 transition-colors w-full"
          >
            <span className={`font-medium ${statusOption.color}`}>{statusOption.label}</span>
            <ChevronDown size={14} className="ml-auto text-text-dim" />
          </button>
          {showStatusDropdown && (
            <div className="absolute top-full mt-1 left-0 w-full bg-bg-elevated border border-border rounded-lg shadow-xl z-10 overflow-hidden">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleStatusChange(opt.value)}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-bg-card transition-colors ${opt.color} ${currentStatus === opt.value ? 'bg-bg-card' : ''}`}
                >
                  {opt.label} {currentStatus === opt.value && '✓'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <NotesSection addToast={addToast} />

      {/* History */}
      {task.history && task.history.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-3">History</h3>
          <div className="space-y-4">
            {task.history.map((entry, i) => <HistoryEntry key={i} entry={entry} />)}
          </div>
        </div>
      )}

      {/* Mark as Done */}
      {currentStatus !== 'done' ? (
        <button onClick={handleMarkDone} className="w-full btn-primary flex items-center justify-center gap-2">
          <CheckCircle size={15} />
          Mark as Done
        </button>
      ) : (
        <div className="flex items-center gap-2 justify-center py-3 bg-pulse-green/10 border border-pulse-green/20 rounded-xl text-pulse-green text-sm font-medium">
          <CheckCircle size={16} />
          Task completed
        </div>
      )}
    </div>
  )
}

// ── STUDIO OWNED panel ────────────────────────────────────
function StudioPanel({ task, addToast, taskStatuses }) {
  const rawStatus = taskStatuses[task.id] || 'not-started'
  // Map task statuses to studio display statuses
  const studioStatus = rawStatus === 'done' ? 'done'
    : rawStatus === 'in-progress' ? 'in-progress'
    : rawStatus === 'waiting-ssu' ? 'waiting'
    : 'not-started'

  const statusOpt = STUDIO_STATUS_OPTIONS.find(s => s.value === studioStatus) || STUDIO_STATUS_OPTIONS[0]

  function handleFollowUp() {
    addToast(`Follow up sent to ${task.assignedTo.name}`, 'success')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Description */}
      <div>
        <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Overview</h3>
        <p className="text-sm text-text-muted leading-relaxed">{task.description}</p>
      </div>

      {/* Assigned person */}
      {task.assignedTo && (
        <div>
          <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Assigned to</h3>
          <div className="flex items-center gap-3 px-4 py-3 bg-bg-elevated border border-border rounded-xl">
            <div className="w-9 h-9 rounded-full bg-pulse-blue/10 border border-pulse-blue/20 flex items-center justify-center text-xs font-bold text-pulse-blue shrink-0">
              {task.assignedTo.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-text">{task.assignedTo.name}</p>
              <p className="text-xs text-text-muted">{task.assignedTo.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Read-only status */}
      <div>
        <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Current Status</h3>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${statusOpt.bg} ${
          studioStatus === 'done' ? 'border-pulse-green/30' :
          studioStatus === 'in-progress' ? 'border-pulse-blue/30' :
          studioStatus === 'waiting' ? 'border-amber/30' : 'border-border'
        }`}>
          {studioStatus === 'done' && <CheckCircle size={14} className="text-pulse-green" />}
          {studioStatus === 'in-progress' && <Clock size={14} className="text-pulse-blue" />}
          {studioStatus === 'waiting' && <Clock size={14} className="text-amber" />}
          {studioStatus === 'not-started' && <Clock size={14} className="text-text-dim" />}
          <span className={`text-sm font-medium ${statusOpt.color}`}>{statusOpt.label}</span>
        </div>
        <p className="text-xs text-text-dim mt-2">This task is managed by the Studio. Status is updated by the assigned team member.</p>
      </div>

      {/* Completion note */}
      {studioStatus === 'done' && (
        <div className="flex items-center gap-3 px-4 py-3 bg-pulse-green/10 border border-pulse-green/20 rounded-xl">
          <CheckCircle size={16} className="text-pulse-green shrink-0" />
          <div>
            <p className="text-sm font-semibold text-pulse-green">Completed by Studio</p>
            {task.history && task.history.length > 0 && (
              <p className="text-xs text-text-muted mt-0.5">
                {task.history[task.history.length - 1].date}
              </p>
            )}
          </div>
        </div>
      )}

      <NotesSection addToast={addToast} />

      {/* History */}
      {task.history && task.history.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-3">History</h3>
          <div className="space-y-4">
            {task.history.map((entry, i) => <HistoryEntry key={i} entry={entry} />)}
          </div>
        </div>
      )}

      {/* Follow Up button */}
      {studioStatus !== 'done' && (
        <button
          onClick={handleFollowUp}
          className="w-full btn-secondary flex items-center justify-center gap-2"
        >
          <Bell size={15} />
          Follow Up with {task.assignedTo?.name}
        </button>
      )}
    </div>
  )
}

// ── SHARED panel ──────────────────────────────────────────
function SharedPanel({ task, addToast, subTaskStatuses, toggleSubTask }) {
  const siblingIds = task.subTasks.map(st => st.id)
  const doneCount = task.subTasks.filter(st => subTaskStatuses[st.id]).length
  const total = task.subTasks.length
  const progressPct = total > 0 ? Math.round((doneCount / total) * 100) : 0
  const allDone = doneCount === total

  function handleToggle(subTask) {
    if (!subTask.isFounder) return
    const newDone = !subTaskStatuses[subTask.id]
    toggleSubTask(subTask.id, newDone, task.id, siblingIds)
    if (newDone) addToast('Sub-task completed', 'success')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Description */}
      <div>
        <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Overview</h3>
        <p className="text-sm text-text-muted leading-relaxed">{task.description}</p>
      </div>

      {/* Progress indicator */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider">Progress</h3>
          <span className="text-xs font-semibold text-text-muted">{doneCount} of {total} complete</span>
        </div>
        <div className="w-full bg-bg-elevated rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${allDone ? 'bg-pulse-green' : 'bg-amber'}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {allDone && (
          <div className="flex items-center gap-2 mt-2 text-pulse-green text-xs font-medium">
            <CheckCircle size={12} />
            All steps complete
          </div>
        )}
      </div>

      {/* Sub-task checklist */}
      <div>
        <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-3">Steps & Ownership</h3>
        <div className="space-y-2">
          {task.subTasks.map((subTask) => {
            const isDone = !!subTaskStatuses[subTask.id]
            const canToggle = subTask.isFounder

            return (
              <div
                key={subTask.id}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border transition-colors ${
                  isDone
                    ? 'bg-pulse-green/5 border-pulse-green/15'
                    : canToggle
                    ? 'bg-bg-elevated border-border hover:border-amber/30 cursor-pointer'
                    : 'bg-bg-surface border-border-subtle opacity-80'
                }`}
                onClick={() => canToggle && handleToggle(subTask)}
              >
                {/* Checkbox area */}
                <div className="shrink-0 mt-0.5">
                  {canToggle ? (
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      isDone ? 'bg-pulse-green border-pulse-green' : 'border-border hover:border-amber'
                    }`}>
                      {isDone && <Check size={11} className="text-white" />}
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded border-2 border-border-subtle flex items-center justify-center">
                      {isDone ? (
                        <Check size={11} className="text-pulse-green" />
                      ) : (
                        <Lock size={10} className="text-text-dim" />
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-snug ${isDone ? 'line-through text-text-dim' : 'text-text'}`}>
                    {subTask.label}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="w-4 h-4 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-[9px] font-bold text-text-muted shrink-0">
                      {subTask.person.initials}
                    </div>
                    <span className="text-xs text-text-dim">{subTask.person.name} · {subTask.person.role}</span>
                    {!canToggle && (
                      <span className="text-xs text-text-dim opacity-60">· Studio</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-text-dim mt-2.5">
          You can only check your own steps. Studio steps are updated by the assigned team member.
        </p>
      </div>

      <NotesSection addToast={addToast} />

      {/* History */}
      {task.history && task.history.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-3">History</h3>
          <div className="space-y-4">
            {task.history.map((entry, i) => <HistoryEntry key={i} entry={entry} />)}
          </div>
        </div>
      )}

      {allDone && (
        <div className="flex items-center gap-2 justify-center py-3 bg-pulse-green/10 border border-pulse-green/20 rounded-xl text-pulse-green text-sm font-medium">
          <CheckCircle size={16} />
          All steps complete — task done
        </div>
      )}
    </div>
  )
}

// ── Main export ───────────────────────────────────────────
export default function TaskDetailPanel({ isOpen, onClose, task }) {
  const { taskStatuses, updateTaskStatus, addToast, subTaskStatuses, toggleSubTask } = useApp()

  if (!task) return null

  const ownerType = task.ownerType || 'founder'
  const ownerBadge = OWNER_TYPE_BADGE[ownerType]
  const OwnerIcon = ownerBadge.icon

  return (
    <SidePanel isOpen={isOpen} onClose={onClose} title={task.title} width="w-[520px]">
      {/* Meta row */}
      <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2 border-b border-border">
        <span className={`badge ${CATEGORY_COLORS[task.category] || 'bg-bg-elevated text-text-muted'}`}>
          <Tag size={10} className="mr-1" />{task.category}
        </span>
        <span className={`badge ${ownerBadge.bg} ${ownerBadge.color}`}>
          <OwnerIcon size={10} className="mr-1" />{ownerBadge.label}
        </span>
        {task.overdueDays ? (
          <span className="badge bg-pulse-red/10 text-pulse-red">
            <AlertCircle size={10} className="mr-1" />{task.overdueDays}d overdue
          </span>
        ) : (
          <span className="badge bg-bg-elevated text-text-dim">
            <Clock size={10} className="mr-1" />Due {task.dueDate}
          </span>
        )}
      </div>

      {ownerType === 'founder' && (
        <FounderPanel
          task={task}
          addToast={addToast}
          updateTaskStatus={updateTaskStatus}
          taskStatuses={taskStatuses}
        />
      )}
      {ownerType === 'studio' && (
        <StudioPanel
          task={task}
          addToast={addToast}
          taskStatuses={taskStatuses}
        />
      )}
      {ownerType === 'shared' && (
        <SharedPanel
          task={task}
          addToast={addToast}
          subTaskStatuses={subTaskStatuses}
          toggleSubTask={toggleSubTask}
        />
      )}
    </SidePanel>
  )
}
