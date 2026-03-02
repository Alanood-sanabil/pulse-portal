import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCheck, CheckSquare, HelpCircle, Flag, Radio, Bell, Circle } from 'lucide-react'
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
  task: {
    icon: CheckSquare,
    color: 'text-pulse-blue',
    bg: 'bg-pulse-blue/10',
  },
  request: {
    icon: HelpCircle,
    color: 'text-pulse-green',
    bg: 'bg-pulse-green/10',
  },
  milestone: {
    icon: Flag,
    color: 'text-amber',
    bg: 'bg-amber/10',
  },
  updates: {
    icon: Radio,
    color: 'text-text-muted',
    bg: 'bg-bg-elevated',
  },
}

export default function Notifications() {
  const { notificationsRead, markAllNotificationsRead, addToast } = useApp()
  const navigate = useNavigate()

  const [activeFilter, setActiveFilter] = useState('all')
  const [localRead, setLocalRead] = useState(new Set(
    allNotifications.filter(n => n.read).map(n => n.id)
  ))

  function handleMarkAllRead() {
    markAllNotificationsRead()
    setLocalRead(new Set(allNotifications.map(n => n.id)))
    addToast('All notifications marked as read', 'success')
  }

  function handleNotificationClick(notification) {
    setLocalRead(prev => new Set([...prev, notification.id]))
    navigate(notification.route)
  }

  function isRead(notification) {
    return notificationsRead || localRead.has(notification.id)
  }

  const filtered = activeFilter === 'all'
    ? allNotifications
    : allNotifications.filter(n => n.type === activeFilter)

  const unreadCount = allNotifications.filter(n => !isRead(n)).length

  return (
    <Layout title="Notifications" subtitle="Stay up to date on tasks, requests, and updates">
      <div className="p-6 max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <span className="text-sm text-text-muted">
                <span className="font-semibold text-text">{unreadCount}</span> unread
              </span>
            )}
            {unreadCount === 0 && (
              <span className="text-sm text-text-muted">All caught up</span>
            )}
          </div>
          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="btn-secondary flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CheckCheck size={14} />
            Mark All as Read
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {FILTERS.map(filter => {
            const count = filter.key === 'all'
              ? allNotifications.length
              : allNotifications.filter(n => n.type === filter.key).length
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
                <span className={`text-xs rounded-full px-1.5 py-0.5 ${
                  activeFilter === filter.key ? 'bg-amber/10 text-amber' : 'bg-bg-elevated text-text-dim'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Notification list */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Bell size={32} className="mx-auto text-text-dim mb-3" />
              <p className="text-text-muted text-sm">No notifications in this category.</p>
            </div>
          ) : (
            filtered.map(notification => {
              const read = isRead(notification)
              const typeConf = TYPE_CONFIG[notification.type] || TYPE_CONFIG.updates
              const TypeIcon = typeConf.icon

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
                    {!read && (
                      <div className="w-2 h-2 rounded-full bg-pulse-blue shrink-0" />
                    )}
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
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                      {notification.description}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </Layout>
  )
}
