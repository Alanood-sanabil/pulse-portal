import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCheck, CheckSquare, HelpCircle, Flag, Radio, Bell, Archive, Settings, X, ToggleLeft, ToggleRight } from 'lucide-react'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'
import { notifications as allNotifications } from '../data/mockData'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'task', label: 'Tasks' },
  { key: 'request', label: 'Requests' },
  { key: 'milestone', label: 'Milestones' },
  { key: 'updates', label: 'Updates' },
]

const TYPE_CONFIG = {
  task: { icon: CheckSquare, color: 'text-pulse-blue', bg: 'bg-pulse-blue/10' },
  request: { icon: HelpCircle, color: 'text-pulse-green', bg: 'bg-pulse-green/10' },
  milestone: { icon: Flag, color: 'text-amber', bg: 'bg-amber/10' },
  updates: { icon: Radio, color: 'text-text-muted', bg: 'bg-bg-elevated' },
}

const DATE_GROUPS = ['Today', 'Yesterday', 'This Week', 'Earlier']

function getDateGroup(time) {
  if (!time) return 'Earlier'
  const t = time.toLowerCase()
  if (t.includes('today') || t.includes('just now') || t.includes('min') || t.includes('hour')) return 'Today'
  if (t.includes('yesterday')) return 'Yesterday'
  if (t.includes('day') || t.includes('week')) return 'This Week'
  return 'Earlier'
}

const DEFAULT_SETTINGS = { task: true, request: true, milestone: true, updates: true }

export default function Notifications() {
  const { notificationsRead, markAllNotificationsRead, addToast } = useApp()
  const navigate = useNavigate()

  const [activeFilter, setActiveFilter] = useState('all')
  const [localRead, setLocalRead] = useState(new Set(allNotifications.filter(n => n.read).map(n => n.id)))
  const [archivedIds, setArchivedIds] = useState(new Set())
  const [showSettings, setShowSettings] = useState(false)
  const [notifSettings, setNotifSettings] = useState(DEFAULT_SETTINGS)
  const [expandedId, setExpandedId] = useState(null)

  function handleMarkAllRead() {
    markAllNotificationsRead()
    setLocalRead(new Set(allNotifications.map(n => n.id)))
    addToast('All notifications marked as read', 'success')
  }

  function handleNotificationClick(notification) {
    setLocalRead(prev => new Set([...prev, notification.id]))
    setExpandedId(id => id === notification.id ? null : notification.id)
  }

  function handleNavigate(notification) {
    setLocalRead(prev => new Set([...prev, notification.id]))
    navigate(notification.route)
  }

  function handleArchive(id, e) {
    e.stopPropagation()
    setArchivedIds(prev => new Set([...prev, id]))
    addToast('Notification archived', 'success')
  }

  function isRead(notification) { return notificationsRead || localRead.has(notification.id) }

  function toggleNotifSetting(key) {
    setNotifSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const visibleNotifications = useMemo(() => {
    return allNotifications.filter(n => {
      if (archivedIds.has(n.id)) return false
      if (!notifSettings[n.type]) return false
      return true
    })
  }, [archivedIds, notifSettings])

  const filtered = activeFilter === 'all'
    ? visibleNotifications
    : visibleNotifications.filter(n => n.type === activeFilter)

  const unreadCount = visibleNotifications.filter(n => !isRead(n)).length

  // Group by date
  const grouped = useMemo(() => {
    const groups = {}
    filtered.forEach(n => {
      const group = getDateGroup(n.time)
      if (!groups[group]) groups[group] = []
      groups[group].push(n)
    })
    return groups
  }, [filtered])

  return (
    <Layout title="Notifications" subtitle="Stay up to date on tasks, requests, and updates">
      <div className="p-6 max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {unreadCount > 0
              ? <span className="text-sm text-text-muted"><span className="font-semibold text-text">{unreadCount}</span> unread</span>
              : <span className="text-sm text-text-muted">All caught up</span>
            }
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(s => !s)}
              className={`btn-ghost flex items-center gap-2 text-sm ${showSettings ? 'text-amber' : ''}`}
            >
              <Settings size={14} />
              Settings
            </button>
            <button
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              className="btn-secondary flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCheck size={14} />
              Mark All Read
            </button>
          </div>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="mb-6 p-4 bg-bg-elevated border border-border rounded-xl space-y-3">
            <p className="text-xs font-semibold text-text-dim uppercase tracking-widest">Notification Settings</p>
            {Object.entries(notifSettings).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-text capitalize">{key} notifications</span>
                <button onClick={() => toggleNotifSetting(key)} className={`transition-colors ${enabled ? 'text-amber' : 'text-text-dim'}`}>
                  {enabled ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Filter buttons */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {FILTERS.map(filter => {
            const count = filter.key === 'all'
              ? visibleNotifications.length
              : visibleNotifications.filter(n => n.type === filter.key).length
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activeFilter === filter.key
                    ? 'bg-amber/10 text-amber border border-amber/20'
                    : 'bg-bg-surface text-text-muted border border-border hover:text-text hover:bg-bg-elevated'
                }`}
              >
                {filter.label}
                <span className={`text-xs rounded-full px-1.5 py-0.5 ${activeFilter === filter.key ? 'bg-amber/10 text-amber' : 'bg-bg-elevated text-text-dim'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Grouped Notification list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Bell size={32} className="mx-auto text-text-dim mb-3" />
            <p className="text-text-muted text-sm">No notifications in this category.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {DATE_GROUPS.filter(g => grouped[g]).map(group => (
              <div key={group}>
                <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-3">{group}</p>
                <div className="space-y-2">
                  {grouped[group].map(notification => {
                    const read = isRead(notification)
                    const typeConf = TYPE_CONFIG[notification.type] || TYPE_CONFIG.updates
                    const TypeIcon = typeConf.icon
                    const isExpanded = expandedId === notification.id

                    return (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-150 group ${
                          !read
                            ? 'bg-pulse-blue/5 border-pulse-blue/15 hover:bg-pulse-blue/10'
                            : 'bg-bg-surface border-border hover:bg-bg-elevated'
                        }`}
                      >
                        {/* Unread dot */}
                        <div className="mt-1 shrink-0 w-2 flex justify-center">
                          {!read && <div className="w-2 h-2 rounded-full bg-pulse-blue shrink-0" />}
                        </div>

                        {/* Type icon */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${typeConf.bg}`}>
                          <TypeIcon size={15} className={typeConf.color} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm leading-snug ${!read ? 'font-semibold text-text' : 'font-medium text-text'}`}>
                              {notification.title}
                            </p>
                            <span className="text-xs text-text-dim shrink-0 mt-0.5">{notification.time}</span>
                          </div>
                          <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{notification.description}</p>
                          {isExpanded && (
                            <div className="mt-3 flex items-center gap-2">
                              <button
                                onClick={e => { e.stopPropagation(); handleNavigate(notification) }}
                                className="btn-primary text-xs py-1 px-3"
                              >
                                Go to {notification.type}
                              </button>
                              <button
                                onClick={e => handleArchive(notification.id, e)}
                                className="btn-ghost text-xs flex items-center gap-1.5 py-1 px-2"
                              >
                                <Archive size={11} /> Archive
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Archive button (hover) */}
                        {!isExpanded && (
                          <button
                            onClick={e => handleArchive(notification.id, e)}
                            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-text-dim hover:text-text hover:bg-bg-elevated transition-colors opacity-0 group-hover:opacity-100"
                            aria-label="Archive notification"
                          >
                            <Archive size={13} />
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
