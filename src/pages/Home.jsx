import { useState, useMemo } from 'react'
import tradepayLogo from '../images/Tradepay-logo.png'
import { useNavigate, Link } from 'react-router-dom'
import {
  HelpCircle,
  FolderOpen,
  Calendar,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Clock,
  Lock,
  ChevronRight,
  Flag,
  FileText,
  TrendingUp,
  Circle,
  ArrowRight,
  Zap,
  Building2,
  Users,
  PenLine,
  AlertTriangle,
} from 'lucide-react'
import Layout from '../components/Layout'
import TaskDetailPanel from '../components/TaskDetailPanel'
import BookingModal from '../components/BookingModal'
import { useApp } from '../context/AppContext'
import { tasks, teamMembers, recentActivity, venture } from '../data/mockData'

const CATEGORY_TAG = {
  Legal: 'tag-legal',
  Finance: 'tag-finance',
  Operations: 'tag-operations',
  Talent: 'tag-talent',
}

function VentureLogo({ initials }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="w-16 h-16 rounded-xl bg-amber/20 border border-amber/30 flex items-center justify-center shrink-0">
        <span className="text-amber font-bold text-lg">{initials}</span>
      </div>
    )
  }
  return (
    <img
      src={tradepayLogo}
      alt="Tradepay Logo"
      width={64}
      height={64}
      style={{ borderRadius: 12, objectFit: 'cover' }}
      className="shrink-0"
      onError={() => {
        console.error('Tradepay-logo.png failed to load')
        setFailed(true)
      }}
    />
  )
}

function StatusIcon({ status, size = 16 }) {
  if (status === 'done') return <CheckCircle size={size} className="text-pulse-green shrink-0" />
  if (status === 'overdue') return <AlertCircle size={size} className="text-pulse-red shrink-0" />
  if (status === 'in-progress') return <div className={`w-2.5 h-2.5 rounded-full bg-pulse-blue shrink-0`} />
  return <Circle size={size} className="text-text-dim shrink-0" />
}

function ActivityIcon({ type }) {
  const base = 'w-6 h-6 rounded-full flex items-center justify-center shrink-0'
  if (type === 'task') return <div className={`${base} bg-pulse-green/15`}><CheckCircle size={12} className="text-pulse-green" /></div>
  if (type === 'request') return <div className={`${base} bg-pulse-blue/10`}><MessageSquare size={12} className="text-pulse-blue" /></div>
  if (type === 'document') return <div className={`${base} bg-bg-elevated`}><FileText size={12} className="text-text-muted" /></div>
  if (type === 'milestone') return <div className={`${base} bg-amber/10`}><Flag size={12} className="text-amber" /></div>
  if (type === 'kpi') return <div className={`${base} bg-pulse-blue/10`}><TrendingUp size={12} className="text-pulse-blue" /></div>
  return <div className={`${base} bg-bg-elevated`}><Zap size={12} className="text-text-dim" /></div>
}

const TOTAL_TASKS = 11
const PHASE1_TASKS = tasks.slice(0, 5)

export default function Home() {
  const navigate = useNavigate()
  const { taskStatuses, setSelectedChannel, kpiData, milestones, subTaskStatuses, journeyWeekSubmitted } = useApp()

  const [selectedTask, setSelectedTask] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingPerson, setBookingPerson] = useState(null)

  const doneCount = useMemo(
    () => tasks.filter(t => taskStatuses[t.id] === 'done').length,
    [taskStatuses]
  )
  const progressPct = Math.round((doneCount / TOTAL_TASKS) * 100)

  const milestoneDate = new Date('2026-02-01')
  const today = new Date('2026-03-02')
  const msOverdueDays = Math.floor((today - milestoneDate) / (1000 * 60 * 60 * 24))

  function openBooking(person) {
    setBookingPerson(person)
    setShowBooking(true)
  }

  function handleMessageMember(member) {
    setSelectedChannel(member.channel)
    navigate('/studio-chat')
  }

  const svgRadius = 54
  const svgCircumference = 2 * Math.PI * svgRadius
  const svgDash = (progressPct / 100) * svgCircumference

  const isCompanyHome = progressPct >= 80

  const anyKpiUpdated = !!(kpiData?.mrrUpdated || kpiData?.burnRateUpdated)
  const taskScore = Math.round((doneCount / TOTAL_TASKS) * 100)
  const healthScore = Math.min(100, Math.round(taskScore * 0.5 + 40 + (anyKpiUpdated ? 20 : 0)))

  const upcomingMilestones = milestones ? milestones.filter(m => m.status !== 'achieved').slice(0, 3) : []

  const overdueTasks = tasks.filter(t => taskStatuses[t.id] === 'overdue' || taskStatuses[t.id] === 'not-started')

  return (
    <Layout title="Founder Home" subtitle="Tradepay · Spin-out Phase 1">
      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">

        {/* ── Venture Snapshot Card ── */}
        <div className="card">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex items-start gap-4 flex-1">
              <VentureLogo initials={venture.initials} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-text">{venture.name}</h2>
                  <span className="badge bg-amber/15 text-amber">{venture.stage}</span>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">{venture.description}</p>
              </div>
            </div>
            <div className="lg:border-l lg:border-border lg:pl-5 flex flex-col gap-2 text-sm min-w-[240px]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-xs font-semibold text-text-muted shrink-0">
                  {venture.pm.initials}
                </div>
                <div>
                  <span className="text-text-dim text-xs">Portfolio Manager</span>
                  <p className="text-text font-medium text-sm leading-tight">{venture.pm.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-xs font-semibold text-text-muted shrink-0">
                  {venture.va.initials}
                </div>
                <div>
                  <span className="text-text-dim text-xs">Venture Architect</span>
                  <p className="text-text font-medium text-sm leading-tight">{venture.va.name}</p>
                </div>
              </div>
              <div className="mt-1 pt-2 border-t border-border-subtle flex items-center justify-between">
                <div>
                  <span className="text-text-dim text-xs">Access URL</span>
                  <p className="text-text-muted text-sm italic">Not yet live</p>
                </div>
                <div className="text-right">
                  <span className="text-text-dim text-xs">Journey Day</span>
                  <p className="text-sm font-bold font-mono text-amber">Day 62</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Founder Journey Banner ── */}
        {!journeyWeekSubmitted && (
          <div className="flex items-center justify-between gap-4 bg-bg-surface border border-border rounded-xl px-5 py-4">
            <div className="flex items-center gap-3">
              <PenLine size={17} className="text-text-muted shrink-0" />
              <p className="text-sm text-text-muted">
                This week's Journey entry is waiting.{' '}
                <span className="text-text-dim">Capture what you built, learned, and experienced.</span>
              </p>
            </div>
            <button
              onClick={() => navigate('/founder-journey')}
              className="btn-secondary shrink-0 flex items-center gap-2 text-xs"
            >
              Add your entry
              <ArrowRight size={13} />
            </button>
          </div>
        )}

        {/* ── What to Focus on Today (always visible) ── */}
        <div className="card">
          <h3 className="text-sm font-semibold text-text mb-3">What to Focus on Today</h3>
          {overdueTasks.length === 0 && upcomingMilestones.length === 0 && journeyWeekSubmitted ? (
            <p className="text-sm text-text-muted py-2">All caught up — no urgent actions today.</p>
          ) : (
            <div className="space-y-2">
              {overdueTasks.slice(0, 2).map((task, i) => (
                <div key={task.id} className="flex items-center gap-3 px-3 py-2.5 bg-bg-elevated rounded-lg">
                  <span className="w-5 h-5 rounded-full bg-amber/15 text-amber text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text truncate">{task.title}</p>
                    <p className="text-xs text-text-dim">{task.category} · Due {task.dueDate}</p>
                  </div>
                </div>
              ))}
              {!journeyWeekSubmitted && (
                <div className="flex items-center gap-3 px-3 py-2.5 bg-bg-elevated rounded-lg">
                  <span className="w-5 h-5 rounded-full bg-amber/15 text-amber text-xs font-bold flex items-center justify-center shrink-0">{Math.min(overdueTasks.length, 2) + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text">Write your weekly Journey entry</p>
                    <p className="text-xs text-text-dim">Founder Journey · Pending</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-6">

            {/* ── Phase Progress + Progress Ring Row (only when not company home) ── */}
            {!isCompanyHome && (
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                {/* Phase Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Phase 1 - Active */}
                  <button
                    onClick={() => navigate('/onboarding')}
                    className="card border-amber/40 text-left hover:border-amber/70 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge bg-amber/15 text-amber text-xs">Phase 1</span>
                      <ChevronRight size={14} className="text-amber group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-sm font-semibold text-text mb-1">Foundation</p>
                    <p className="text-xs text-text-muted mb-3">{doneCount}/{TOTAL_TASKS} tasks</p>
                    <div className="w-full bg-bg-elevated rounded-full h-1.5">
                      <div
                        className="bg-amber h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <p className="text-xs text-amber mt-1.5">{progressPct}% complete</p>
                  </button>

                  {/* Phase 2 - Locked */}
                  <div className="card opacity-50 cursor-not-allowed relative group" title="Complete Phase 1 to unlock">
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge bg-bg-elevated text-text-dim text-xs">Phase 2</span>
                      <Lock size={13} className="text-text-dim" />
                    </div>
                    <p className="text-sm font-semibold text-text-dim mb-1">Build</p>
                    <p className="text-xs text-text-dim mb-3">Locked</p>
                    <div className="w-full bg-bg-elevated rounded-full h-1.5" />
                    <div className="absolute inset-0 rounded-xl hidden group-hover:flex items-center justify-center bg-bg-card/60 backdrop-blur-[1px]">
                      <span className="text-xs text-text-dim bg-bg-elevated border border-border rounded-lg px-2.5 py-1.5">
                        Complete Phase 1 to unlock
                      </span>
                    </div>
                  </div>

                  {/* Phase 3 - Locked */}
                  <div className="card opacity-50 cursor-not-allowed relative group" title="Complete Phase 1 to unlock">
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge bg-bg-elevated text-text-dim text-xs">Phase 3</span>
                      <Lock size={13} className="text-text-dim" />
                    </div>
                    <p className="text-sm font-semibold text-text-dim mb-1">Scale</p>
                    <p className="text-xs text-text-dim mb-3">Locked</p>
                    <div className="w-full bg-bg-elevated rounded-full h-1.5" />
                    <div className="absolute inset-0 rounded-xl hidden group-hover:flex items-center justify-center bg-bg-card/60 backdrop-blur-[1px]">
                      <span className="text-xs text-text-dim bg-bg-elevated border border-border rounded-lg px-2.5 py-1.5">
                        Complete Phase 2 to unlock
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Ring Card */}
                <button
                  onClick={() => navigate('/onboarding')}
                  className="card flex flex-col items-center justify-center hover:border-amber/40 transition-colors min-w-[140px]"
                >
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle
                      cx="60" cy="60" r={svgRadius}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-bg-elevated"
                    />
                    <circle
                      cx="60" cy="60" r={svgRadius}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${svgDash} ${svgCircumference}`}
                      strokeDashoffset="0"
                      transform="rotate(-90 60 60)"
                      className="text-amber transition-all duration-700"
                    />
                    <text x="60" y="55" textAnchor="middle" className="fill-text" style={{ fontSize: '18px', fontWeight: 700, fill: '#1A1A1A' }}>
                      {progressPct}%
                    </text>
                    <text x="60" y="72" textAnchor="middle" style={{ fontSize: '9px', fill: '#6B6B6B' }}>
                      Phase 1
                    </text>
                  </svg>
                  <p className="text-xs text-text-muted mt-1">{doneCount} of {TOTAL_TASKS} tasks</p>
                </button>
              </div>
            )}

            {/* ── Company Home top section (when isCompanyHome) ── */}
            {isCompanyHome && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Venture Health Score widget */}
                <div className="card flex flex-col items-center justify-center py-6 gap-2 text-center">
                  <p className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-1">Venture Health</p>
                  <div className="text-5xl font-bold font-mono text-amber leading-none">{healthScore}</div>
                  <div className="text-xs text-text-muted">out of 100</div>
                  <div className="w-full bg-bg-elevated rounded-full h-1.5 mt-3">
                    <div className="bg-amber h-1.5 rounded-full transition-all" style={{ width: `${healthScore}%` }} />
                  </div>
                  <p className="text-xs text-text-dim">Tasks · Milestones · KPIs</p>
                </div>

                {/* KPI Snapshot */}
                <div className="card">
                  <p className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-3">KPI Snapshot</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'MRR', value: kpiData?.mrr || '—', color: 'text-pulse-green' },
                      { label: 'Burn', value: kpiData?.burnRate || '—', color: 'text-pulse-red' },
                      { label: 'Runway', value: kpiData?.runway || '—', color: 'text-pulse-blue' },
                      { label: 'Team', value: kpiData?.teamSize || '—', color: 'text-text' },
                    ].map(item => (
                      <div key={item.label} className="bg-bg-elevated rounded-lg px-3 py-2">
                        <div className={`text-base font-bold font-mono ${item.color}`}>{item.value}</div>
                        <div className="text-[10px] text-text-dim">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── What to Focus on This Week (when isCompanyHome) ── */}
            {isCompanyHome && (
              <div className="card">
                <h3 className="text-sm font-semibold text-text mb-3">What to Focus on This Week</h3>
                <div className="space-y-2">
                  {overdueTasks.slice(0, 3).map((task, i) => (
                    <div key={task.id} className="flex items-center gap-3 px-3 py-2.5 bg-bg-elevated rounded-lg">
                      <span className="w-5 h-5 rounded-full bg-amber/15 text-amber text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text truncate">{task.title}</p>
                        <p className="text-xs text-text-dim">{task.category} · Due {task.dueDate}</p>
                      </div>
                    </div>
                  ))}
                  {overdueTasks.length === 0 && (
                    <p className="text-sm text-text-muted text-center py-4">All tasks are on track. Great work!</p>
                  )}
                </div>
              </div>
            )}

            {/* ── Quick Access Tiles ── */}
            <div>
              <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-3">Quick Access</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link
                  to="/request-help"
                  className="card hover:border-amber/40 flex flex-col items-center justify-center gap-2.5 py-5 transition-colors group no-underline"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center group-hover:bg-amber/20 transition-colors">
                    <HelpCircle size={20} className="text-amber" />
                  </div>
                  <span className="text-sm font-medium text-text-muted group-hover:text-text transition-colors">Request Help</span>
                </Link>

                <Link
                  to="/document-library"
                  className="card hover:border-amber/40 flex flex-col items-center justify-center gap-2.5 py-5 transition-colors group no-underline"
                >
                  <div className="w-10 h-10 rounded-xl bg-pulse-blue/10 flex items-center justify-center group-hover:bg-pulse-blue/20 transition-colors">
                    <FolderOpen size={20} className="text-pulse-blue" />
                  </div>
                  <span className="text-sm font-medium text-text-muted group-hover:text-text transition-colors">Document Library</span>
                </Link>

                <button
                  onClick={() => openBooking({ name: venture.pm.name, role: venture.pm.role })}
                  className="card hover:border-amber/40 flex flex-col items-center justify-center gap-2.5 py-5 transition-colors group text-left w-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-pulse-green/10 flex items-center justify-center group-hover:bg-pulse-green/15 transition-colors">
                    <Calendar size={20} className="text-pulse-green" />
                  </div>
                  <span className="text-sm font-medium text-text-muted group-hover:text-text transition-colors">Office Hours</span>
                </button>

                <Link
                  to="/studio-board"
                  className="card hover:border-amber/40 flex flex-col items-center justify-center gap-2.5 py-5 transition-colors group no-underline"
                >
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center group-hover:bg-amber/10 transition-colors">
                    <MessageSquare size={20} className="text-text-muted group-hover:text-amber transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-text-muted group-hover:text-text transition-colors">Studio Board</span>
                </Link>
              </div>
            </div>

            {/* ── Upcoming Tasks (only when not company home) ── */}
            {!isCompanyHome && (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-text">Upcoming Tasks</h3>
                  <Link to="/onboarding" className="text-xs text-amber hover:text-amber/80 transition-colors flex items-center gap-1">
                    View all <ChevronRight size={12} />
                  </Link>
                </div>
                <div className="space-y-1">
                  {PHASE1_TASKS.map(task => {
                    const status = taskStatuses[task.id] || 'not-started'
                    const isDone = status === 'done'
                    const isOverdue = status === 'overdue'
                    const isInProgress = status === 'in-progress'
                    const ownerType = task.ownerType || 'founder'

                    const sharedDone = ownerType === 'shared' && task.subTasks
                      ? task.subTasks.filter(st => subTaskStatuses[st.id]).length : 0
                    const sharedTotal = ownerType === 'shared' && task.subTasks ? task.subTasks.length : 0
                    const sharedPct = sharedTotal > 0 ? Math.round((sharedDone / sharedTotal) * 100) : 0

                    const studioStatusLabel = status === 'done' ? 'Done' : status === 'in-progress' ? 'In Progress' : status === 'waiting-ssu' ? 'Waiting' : 'Not Started'
                    const studioStatusColor = status === 'done' ? 'text-pulse-green' : status === 'in-progress' ? 'text-pulse-blue' : status === 'waiting-ssu' ? 'text-amber' : 'text-text-dim'

                    return (
                      <button
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors group
                          ${isOverdue
                            ? 'hover:bg-pulse-red/5 border-l-2 border-pulse-red pl-2.5'
                            : 'hover:bg-bg-elevated'
                          }
                        `}
                      >
                        {ownerType === 'founder' && <StatusIcon status={status} size={15} />}
                        {ownerType === 'studio' && (
                          <Building2 size={15} className={`shrink-0 ${isDone ? 'text-pulse-green' : 'text-pulse-blue'}`} />
                        )}
                        {ownerType === 'shared' && (
                          <Users size={15} className="shrink-0 text-amber" />
                        )}

                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${isDone ? 'line-through text-text-dim' : isOverdue ? 'text-pulse-red' : 'text-text'}`}>
                            {task.title}
                          </p>

                          {ownerType === 'shared' && (
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 max-w-[100px] bg-bg-elevated rounded-full h-1.5">
                                <div className={`h-1.5 rounded-full ${'bg-amber'}`} style={{ width: `${sharedPct}%` }} />
                              </div>
                              <span className="text-xs text-text-dim">{sharedDone}/{sharedTotal} steps</span>
                            </div>
                          )}

                          {ownerType === 'studio' && (
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <span className={`badge ${CATEGORY_TAG[task.category] || 'bg-bg-elevated text-text-dim'}`}>{task.category}</span>
                              <span className={`text-xs font-medium ${studioStatusColor}`}>{studioStatusLabel}</span>
                            </div>
                          )}

                          {ownerType === 'founder' && (
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <span className={`badge ${CATEGORY_TAG[task.category] || 'bg-bg-elevated text-text-dim'}`}>
                                {task.category}
                              </span>
                              {isOverdue ? (
                                <span className="badge bg-pulse-red/10 text-pulse-red">
                                  {task.overdueDays}d overdue
                                </span>
                              ) : (
                                <span className="text-xs text-text-dim flex items-center gap-1">
                                  <Clock size={10} />
                                  {task.dueDate}
                                </span>
                              )}
                              {isInProgress && (
                                <span className="badge bg-pulse-blue/10 text-pulse-blue">In Progress</span>
                              )}
                            </div>
                          )}
                        </div>

                        <ChevronRight size={14} className="text-text-dim opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── Upcoming Milestone ── */}
            <button
              onClick={() => navigate('/milestones')}
              className="card w-full text-left hover:border-amber/40 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Flag size={15} className="text-amber" />
                    <span className="text-xs font-semibold text-text-dim uppercase tracking-wider">Next Milestone</span>
                  </div>
                  <h4 className="text-base font-semibold text-text mb-1">First Hire</h4>
                  <p className="text-sm text-text-muted mb-3">Due Feb 1, 2026</p>
                  <div className="flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-lg px-3 py-2">
                    <AlertTriangle size={13} className="text-amber shrink-0" />
                    <span className="text-xs text-amber">
                      At risk — {msOverdueDays} days overdue
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="badge bg-amber/15 text-amber">At Risk</span>
                  <ChevronRight size={16} className="text-text-dim group-hover:text-amber transition-colors mt-auto" />
                </div>
              </div>
            </button>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="space-y-5">

            {/* ── Studio Support Team ── */}
            <div className="card">
              <h3 className="text-sm font-semibold text-text mb-4">Studio Support Team</h3>
              <div className="space-y-4">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-xs font-semibold text-text-muted shrink-0">
                      {member.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text leading-tight truncate">{member.name}</p>
                      <p className="text-xs text-text-dim truncate">{member.role}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <button
                          onClick={() => openBooking(member)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-bg-elevated border border-border text-xs text-text-muted hover:border-amber/40 hover:text-text transition-colors"
                        >
                          <Calendar size={11} />
                          Office Hours
                        </button>
                        <button
                          onClick={() => handleMessageMember(member)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-bg-elevated border border-border text-xs text-text-muted hover:border-amber/40 hover:text-text transition-colors"
                        >
                          <MessageSquare size={11} />
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Recent Activity ── */}
            <div className="card">
              <h3 className="text-sm font-semibold text-text mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map(item => (
                  <div key={item.id} className="flex items-start gap-3">
                    <ActivityIcon type={item.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-muted leading-relaxed">{item.text}</p>
                      <p className="text-xs text-text-dim mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Task Detail Panel ── */}
      <TaskDetailPanel
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
      />

      {/* ── Booking Modal ── */}
      {bookingPerson && (
        <BookingModal
          isOpen={showBooking}
          onClose={() => { setShowBooking(false); setBookingPerson(null) }}
          personName={bookingPerson.name}
          personRole={bookingPerson.role}
        />
      )}
    </Layout>
  )
}
