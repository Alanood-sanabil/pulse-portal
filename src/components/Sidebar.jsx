import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  Home, BookOpen, Wrench, Map, Layers, HelpCircle, Users,
  BarChart2, Flag, FolderOpen, Bell, MessageSquare, Zap, Lock,
} from 'lucide-react'

const navSections = [
  {
    label: 'Main',
    items: [
      { path: '/', label: 'Founder Home', icon: Home },
      { path: '/onboarding', label: 'Onboarding', icon: BookOpen, badge: 28 },
    ],
  },
  {
    label: 'Resources',
    items: [
      { path: '/toolkit', label: 'Founder Toolkit', icon: Wrench },
      { path: '/playbook', label: 'Playbook', icon: Map },
      { path: '/venture-context', label: 'Venture Context', icon: Layers },
    ],
  },
  {
    label: 'Support',
    items: [
      { path: '/request-help', label: 'Request Help', icon: HelpCircle },
      { path: '/my-team', label: 'My Team', icon: Users },
      { path: '/studio-chat', label: 'Studio Chat', icon: MessageSquare },
    ],
  },
  {
    label: 'Track',
    items: [
      { path: '/kpi-dashboard', label: 'KPI Dashboard', icon: BarChart2 },
      { path: '/milestones', label: 'Milestones', icon: Flag },
      { path: '/document-library', label: 'Document Library', icon: FolderOpen },
      { path: '/notifications', label: 'Notifications', icon: Bell, badgeKey: 'notifications' },
    ],
  },
]

export default function Sidebar() {
  const { notificationCount } = useApp()
  const navigate = useNavigate()

  return (
    <aside className="w-64 shrink-0 bg-bg-surface border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <button onClick={() => navigate('/')} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center">
            <Zap size={15} className="text-bg-base" fill="currentColor" />
          </div>
          <div>
            <div className="text-sm font-bold text-text leading-tight">Pulse</div>
            <div className="text-[10px] text-text-dim leading-tight">Sanabil Studio</div>
          </div>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navSections.map(section => (
          <div key={section.label}>
            <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest px-2 mb-2">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(item => {
                const Icon = item.icon
                const badge = item.badge || (item.badgeKey === 'notifications' ? notificationCount : 0)
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon size={15} className="shrink-0" />
                        <span className="flex-1 text-sm">{item.label}</span>
                        {badge > 0 && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${isActive ? 'bg-amber/20 text-amber' : 'bg-bg-elevated text-text-muted'}`}>
                            {badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber/15 border border-amber/30 flex items-center justify-center text-xs font-bold text-amber">
            MA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-text truncate">Mustafa Al-Amin</p>
            <p className="text-[10px] text-text-dim truncate">CEO · Tradepay</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
