import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  Home, BookOpen, Wrench, Map, Layers, HelpCircle, Users,
  BarChart2, Flag, FolderOpen, Bell, Layout, Zap, Lock, PenLine,
  LifeBuoy, ExternalLink,
} from 'lucide-react'
import SidePanel from './SidePanel'

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
      { path: '/studio-board', label: 'Studio Board', icon: Layout },
    ],
  },
  {
    label: 'Track',
    items: [
      { path: '/kpi-dashboard', label: 'KPI Dashboard', icon: BarChart2 },
      { path: '/founder-journey', label: 'Founder Journey', icon: PenLine },
      { path: '/milestones', label: 'Venture Growth', icon: Flag },
      { path: '/document-library', label: 'Document Library', icon: FolderOpen },
      { path: '/notifications', label: 'Notifications', icon: Bell, badgeKey: 'notifications' },
    ],
  },
]

const HELP_ARTICLES = [
  { title: 'Navigating the Onboarding Hub', topic: 'Onboarding' },
  { title: 'How to Submit a Help Request', topic: 'Support' },
  { title: 'Reading Your KPI Dashboard', topic: 'KPIs' },
  { title: 'Using the Founder Journey Log', topic: 'Journaling' },
  { title: 'Managing Venture Growth Milestones', topic: 'Milestones' },
  { title: 'Uploading & Versioning Documents', topic: 'Docs' },
]

export default function Sidebar() {
  const { notificationCount } = useApp()
  const navigate = useNavigate()
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <>
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

        {/* Help button */}
        <div className="px-3 pb-2">
          <button
            onClick={() => setHelpOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-text-muted hover:text-text hover:bg-bg-elevated transition-colors text-sm"
          >
            <LifeBuoy size={15} className="shrink-0" />
            <span>Help & Resources</span>
          </button>
        </div>

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

      {/* Help Panel */}
      <SidePanel
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="Help & Resources"
        width="w-[400px]"
      >
        <div className="p-6 space-y-6">
          <div>
            <p className="text-xs text-text-dim uppercase tracking-widest font-semibold mb-3">Quick Actions</p>
            <div className="space-y-2">
              <button
                onClick={() => { setHelpOpen(false); navigate('/request-help') }}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-bg-surface hover:bg-bg-elevated transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center shrink-0">
                  <HelpCircle size={15} className="text-amber" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">Submit a Request</p>
                  <p className="text-xs text-text-muted">Ask the studio team for help</p>
                </div>
              </button>
              <button
                onClick={() => { setHelpOpen(false); navigate('/studio-board') }}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-bg-surface hover:bg-bg-elevated transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-pulse-blue/10 flex items-center justify-center shrink-0">
                  <Layout size={15} className="text-pulse-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">Studio Board</p>
                  <p className="text-xs text-text-muted">Updates from the studio team</p>
                </div>
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs text-text-dim uppercase tracking-widest font-semibold mb-3">Playbook Articles</p>
            <div className="space-y-1">
              {HELP_ARTICLES.map(article => (
                <button
                  key={article.title}
                  onClick={() => { setHelpOpen(false); navigate('/playbook') }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-elevated transition-colors text-left group"
                >
                  <Map size={13} className="text-text-dim shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text truncate">{article.title}</p>
                    <p className="text-[11px] text-text-dim">{article.topic}</p>
                  </div>
                  <ExternalLink size={11} className="text-text-dim opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-text-dim text-center">
              Need more help? Message the team on{' '}
              <button
                onClick={() => { setHelpOpen(false); navigate('/studio-board') }}
                className="text-amber hover:underline"
              >
                Studio Board
              </button>
            </p>
          </div>
        </div>
      </SidePanel>
    </>
  )
}
