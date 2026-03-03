import { useState, useMemo } from 'react'
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Circle,
  Lock,
  ChevronRight,
  Tag,
  User,
  TrendingUp,
  Info,
  Building2,
  Users,
} from 'lucide-react'
import Layout from '../components/Layout'
import TaskDetailPanel from '../components/TaskDetailPanel'
import { useApp } from '../context/AppContext'
import { tasks, tasksByCategory } from '../data/mockData'

const TOTAL_TASKS = 11
const CATEGORY_ORDER = ['Legal', 'Finance', 'Operations', 'Talent']

const CATEGORY_TAG = {
  Legal: 'tag-legal',
  Finance: 'tag-finance',
  Operations: 'tag-operations',
  Talent: 'tag-talent',
}

const STATUS_LABEL = {
  'not-started': { label: 'Not Started', color: 'text-text-dim' },
  'in-progress': { label: 'In Progress', color: 'text-pulse-blue' },
  'waiting-ssu': { label: 'Waiting on SSU', color: 'text-amber' },
  'blocked': { label: 'Blocked', color: 'text-pulse-red' },
  'in-review': { label: 'In Review', color: 'text-pulse-purple' },
  'done': { label: 'Done', color: 'text-pulse-green' },
  'overdue': { label: 'Overdue', color: 'text-pulse-red' },
}

function TaskStatusIcon({ status }) {
  if (status === 'done') return <CheckCircle size={17} className="text-pulse-green shrink-0" />
  if (status === 'in-progress') return <Clock size={17} className="text-pulse-blue shrink-0" />
  if (status === 'overdue') return <AlertCircle size={17} className="text-pulse-red shrink-0" />
  return <Circle size={17} className="text-text-dim shrink-0" />
}

function TaskRow({ task, onOpen }) {
  const { taskStatuses, subTaskStatuses } = useApp()
  const ownerType = task.ownerType || 'founder'
  const status = taskStatuses[task.id] || 'not-started'
  const isDone = status === 'done'
  const isOverdue = status === 'overdue'
  const isInProgress = status === 'in-progress'

  // Shared task progress
  const sharedDone = ownerType === 'shared' && task.subTasks
    ? task.subTasks.filter(st => subTaskStatuses[st.id]).length
    : 0
  const sharedTotal = ownerType === 'shared' && task.subTasks ? task.subTasks.length : 0
  const sharedPct = sharedTotal > 0 ? Math.round((sharedDone / sharedTotal) * 100) : 0

  // Studio display status
  const studioStatusLabel =
    status === 'done' ? 'Done' :
    status === 'in-progress' ? 'In Progress' :
    status === 'waiting-ssu' ? 'Waiting' : 'Not Started'
  const studioStatusColor =
    status === 'done' ? 'text-pulse-green' :
    status === 'in-progress' ? 'text-pulse-blue' :
    status === 'waiting-ssu' ? 'text-amber' : 'text-text-dim'

  return (
    <button
      onClick={() => onOpen(task)}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors group
        ${isOverdue
          ? 'border-l-2 border-pulse-red bg-pulse-red/5 hover:bg-pulse-red/8 pl-3.5'
          : 'hover:bg-bg-elevated border border-transparent hover:border-border-subtle'
        }
      `}
    >
      {/* Left icon */}
      {ownerType === 'founder' && <TaskStatusIcon status={status} />}
      {ownerType === 'studio' && (
        <div className={`w-[17px] h-[17px] flex items-center justify-center shrink-0 ${isDone ? 'text-pulse-green' : 'text-pulse-blue'}`}>
          <Building2 size={15} />
        </div>
      )}
      {ownerType === 'shared' && (
        <div className="w-[17px] h-[17px] flex items-center justify-center shrink-0 text-amber">
          <Users size={15} />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isDone ? 'line-through text-text-dim' : isOverdue ? 'text-pulse-red' : 'text-text'}`}>
          {task.title}
        </p>

        {/* Shared: mini progress bar */}
        {ownerType === 'shared' && (
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 max-w-[120px] bg-bg-elevated rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all ${'bg-amber'}`}
                style={{ width: `${sharedPct}%` }}
              />
            </div>
            <span className="text-xs text-text-dim">{sharedDone}/{sharedTotal} steps</span>
            <span className={`badge ${CATEGORY_TAG[task.category] || 'bg-bg-elevated text-text-dim'}`}>
              <Tag size={9} className="mr-1" />{task.category}
            </span>
          </div>
        )}

        {/* Studio: status badge */}
        {ownerType === 'studio' && (
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`badge ${CATEGORY_TAG[task.category] || 'bg-bg-elevated text-text-dim'}`}>
              <Tag size={9} className="mr-1" />{task.category}
            </span>
            <span className={`text-xs font-medium ${studioStatusColor}`}>{studioStatusLabel}</span>
            {task.assignedTo && (
              <span className="text-xs text-text-dim">· {task.assignedTo.name}</span>
            )}
            {isOverdue && (
              <span className="badge bg-pulse-red/10 text-pulse-red">
                <AlertCircle size={9} className="mr-1" />{task.overdueDays}d overdue
              </span>
            )}
          </div>
        )}

        {/* Founder: original badges */}
        {ownerType === 'founder' && (
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`badge ${CATEGORY_TAG[task.category] || 'bg-bg-elevated text-text-dim'}`}>
              <Tag size={9} className="mr-1" />{task.category}
            </span>
            {isOverdue ? (
              <span className="badge bg-pulse-red/10 text-pulse-red">
                <AlertCircle size={9} className="mr-1" />{task.overdueDays}d overdue
              </span>
            ) : (
              <span className="text-xs text-text-dim flex items-center gap-1">
                <Clock size={10} />Due {task.dueDate}
              </span>
            )}
            {isInProgress && <span className="badge bg-pulse-blue/10 text-pulse-blue">In Progress</span>}
            {isDone && <span className="badge bg-pulse-green/10 text-pulse-green">Done</span>}
          </div>
        )}
      </div>

      <ChevronRight size={14} className="text-text-dim opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </button>
  )
}

export default function Onboarding() {
  const { taskStatuses } = useApp()
  const [selectedTask, setSelectedTask] = useState(null)

  const doneCount = useMemo(
    () => tasks.filter(t => taskStatuses[t.id] === 'done').length,
    [taskStatuses]
  )
  const progressPct = Math.round((doneCount / TOTAL_TASKS) * 100)
  const remainingCount = TOTAL_TASKS - doneCount

  return (
    <Layout title="Onboarding Hub" subtitle="Phase 1: Foundation · 30 days remaining">
      <div className="p-6 space-y-6 max-w-[900px] mx-auto">

        {/* ── Phase Tab Bar ── */}
        <div className="flex items-center border-b border-border">
          {/* Phase 1 - Active */}
          <button className="relative px-4 py-3 text-sm font-semibold text-amber flex items-center gap-2 shrink-0">
            Phase 1: Foundation
            <span className="badge bg-amber/15 text-amber ml-1 text-xs">Active</span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber rounded-t" />
          </button>

          {/* Phase 2 - Locked */}
          <div
            className="relative px-4 py-3 text-sm font-medium text-text-dim flex items-center gap-1.5 cursor-not-allowed select-none group shrink-0"
            title="Complete Phase 1 to unlock Phase 2"
          >
            <Lock size={13} className="text-text-dim" />
            Phase 2: Build
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-bg-elevated border border-border rounded-lg px-3 py-2 text-xs text-text-muted whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Complete Phase 1 to unlock Phase 2
            </div>
          </div>

          {/* Phase 3 - Locked */}
          <div
            className="relative px-4 py-3 text-sm font-medium text-text-dim flex items-center gap-1.5 cursor-not-allowed select-none group shrink-0"
            title="Complete Phase 2 to unlock Phase 3"
          >
            <Lock size={13} className="text-text-dim" />
            Phase 3: Scale
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-bg-elevated border border-border rounded-lg px-3 py-2 text-xs text-text-muted whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Complete Phase 2 to unlock Phase 3
            </div>
          </div>
        </div>

        {/* ── Progress Summary Card ── */}
        <div className="card">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-amber" />
                <h3 className="text-sm font-semibold text-text">Phase 1 Progress</h3>
              </div>
              <p className="text-2xl font-bold text-text">
                {doneCount}
                <span className="text-base font-normal text-text-muted">/{TOTAL_TASKS} tasks complete</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-amber">{progressPct}%</p>
              <p className="text-xs text-text-dim">complete</p>
            </div>
          </div>
          <div className="w-full bg-bg-elevated rounded-full h-2.5 mb-3">
            <div
              className="bg-amber h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-pulse-green" />
              {doneCount} complete
            </span>
            <span>On track for March 31, 2026 completion</span>
            <span className="flex items-center gap-1.5">
              <Circle size={12} className="text-text-dim" />
              {remainingCount} remaining
            </span>
          </div>
        </div>

        {/* ── Phase Unlock Info Card ── */}
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber/10 flex items-center justify-center shrink-0 mt-0.5">
              <Info size={14} className="text-amber" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text mb-1.5">How to unlock Phase 2</h4>
              <p className="text-sm text-text-muted leading-relaxed mb-3">
                Complete all 11 Phase 1 tasks and submit the Phase 1 Completion Report to Sarah Al-Rashid.
                Phase 2 unlocks access to Build-phase resources and additional SSU support hours.
              </p>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-text-muted">
                  <CheckCircle size={12} className="text-pulse-green" />
                  {doneCount} of {TOTAL_TASKS} tasks complete
                </span>
                {remainingCount > 0 && (
                  <span className="flex items-center gap-1.5 text-text-dim">
                    <Circle size={12} />
                    {remainingCount} task{remainingCount !== 1 ? 's' : ''} remaining
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Task Type Legend ── */}
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-4">
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Task Ownership Types</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0 mt-0.5">
                <User size={13} className="text-text-muted" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text">Founder Owned</p>
                <p className="text-xs text-text-dim leading-relaxed mt-0.5">You complete this yourself. Mark it done when finished.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-pulse-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                <Building2 size={13} className="text-pulse-blue" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text">Studio Owned</p>
                <p className="text-xs text-text-dim leading-relaxed mt-0.5">Handled by the SSU team. Track status and follow up if needed.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber/10 flex items-center justify-center shrink-0 mt-0.5">
                <Users size={13} className="text-amber" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text">Shared</p>
                <p className="text-xs text-text-dim leading-relaxed mt-0.5">Steps split between you and the Studio. Check your own steps.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Task List Grouped by Category ── */}
        <div className="space-y-5">
          {CATEGORY_ORDER.map(category => {
            const categoryTasks = tasksByCategory[category] || []
            if (categoryTasks.length === 0) return null

            const catDone = categoryTasks.filter(t => taskStatuses[t.id] === 'done').length

            return (
              <div key={category} className="card p-0 overflow-hidden">
                {/* Category Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-bg-surface/50">
                  <div className="flex items-center gap-2.5">
                    <span className={`badge ${CATEGORY_TAG[category] || 'bg-bg-elevated text-text-dim'}`}>
                      {category}
                    </span>
                    <span className="text-sm font-semibold text-text">
                      {category}
                    </span>
                    <span className="text-xs text-text-dim">
                      · {categoryTasks.length} task{categoryTasks.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <span className="text-xs text-text-muted">
                    {catDone}/{categoryTasks.length} done
                  </span>
                </div>

                {/* Task Rows */}
                <div className="p-2 space-y-0.5">
                  {categoryTasks.map(task => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onOpen={setSelectedTask}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* ── Task Detail Panel ── */}
      <TaskDetailPanel
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
      />
    </Layout>
  )
}
