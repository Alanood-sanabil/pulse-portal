import { useState, useRef } from 'react'
import SidePanel from './SidePanel'
import { useApp } from '../context/AppContext'
import { CheckCircle, Clock, AlertCircle, Tag, User, Paperclip, MessageSquare, ChevronDown } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'not-started', label: 'Not Started', color: 'text-text-dim' },
  { value: 'in-progress', label: 'In Progress', color: 'text-pulse-blue' },
  { value: 'waiting-ssu', label: 'Waiting on SSU', color: 'text-amber' },
  { value: 'blocked', label: 'Blocked', color: 'text-pulse-red' },
  { value: 'in-review', label: 'In Review', color: 'text-pulse-purple' },
  { value: 'done', label: 'Done', color: 'text-pulse-green' },
]

const CATEGORY_COLORS = {
  Legal: 'tag-legal',
  Finance: 'tag-finance',
  Operations: 'tag-operations',
  Talent: 'tag-talent',
  HR: 'tag-hr',
}

export default function TaskDetailPanel({ isOpen, onClose, task }) {
  const { taskStatuses, updateTaskStatus, addToast } = useApp()
  const [note, setNote] = useState('')
  const [commentSubmitted, setCommentSubmitted] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [attachments, setAttachments] = useState([])
  const fileRef = useRef()

  if (!task) return null

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

  function handleSubmitNote() {
    if (!note.trim()) return
    setCommentSubmitted(true)
    setNote('')
    addToast('Note submitted', 'success')
    setTimeout(() => setCommentSubmitted(false), 3000)
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) {
      setAttachments(prev => [...prev, file.name])
      addToast('Attachment uploaded', 'success')
    }
  }

  const historyLog = []
  if (currentStatus === 'done') historyLog.push({ date: 'Today', text: 'Status changed to Done', user: 'Mustafa' })
  if (task.overdueDays) historyLog.push({ date: `${task.overdueDays} days ago`, text: 'Task became overdue', user: 'System' })
  historyLog.push({ date: task.dueDate, text: 'Due date set', user: 'SSU' })

  return (
    <SidePanel isOpen={isOpen} onClose={onClose} title={task.title} width="w-[520px]">
      <div className="p-6 space-y-6">

        {/* Meta row */}
        <div className="flex flex-wrap gap-2">
          <span className={`badge ${CATEGORY_COLORS[task.category] || 'bg-bg-elevated text-text-muted'}`}>
            <Tag size={10} className="mr-1" />{task.category}
          </span>
          <span className="badge bg-bg-elevated text-text-dim">
            <User size={10} className="mr-1" />{task.owner}
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

        {/* Description */}
        <div>
          <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">Overview</h3>
          <p className="text-sm text-text-muted leading-relaxed">{task.description}</p>
        </div>

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

        {/* Notes & Comments */}
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
          {commentSubmitted ? (
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

        {/* History */}
        <div>
          <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-3">History</h3>
          <div className="space-y-3">
            {historyLog.map((entry, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-border-subtle mt-2 shrink-0" />
                <div>
                  <span className="text-text-muted">{entry.text}</span>
                  <span className="text-text-dim"> · {entry.date} by {entry.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mark as Done */}
        {currentStatus !== 'done' && (
          <button
            onClick={handleMarkDone}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <CheckCircle size={15} />
            Mark as Done
          </button>
        )}
        {currentStatus === 'done' && (
          <div className="flex items-center gap-2 justify-center py-3 bg-pulse-green/10 border border-pulse-green/20 rounded-xl text-pulse-green text-sm font-medium">
            <CheckCircle size={16} />
            Task completed
          </div>
        )}
      </div>
    </SidePanel>
  )
}
