import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Bell, Search } from 'lucide-react'

export default function Topbar({ title, subtitle, onSearchOpen }) {
  const navigate = useNavigate()
  const { notificationCount } = useApp()

  return (
    <header className="h-14 border-b border-border bg-white flex items-center px-6 gap-4 shrink-0">
      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[13px] font-semibold text-text tracking-[-0.01em] truncate">{title}</h1>
        {subtitle && <p className="text-[11px] text-text-dim leading-tight mt-0.5 truncate">{subtitle}</p>}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search trigger */}
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 h-8 px-3 rounded-lg border border-border bg-bg-elevated text-text-dim hover:text-text hover:border-border/80 transition-colors"
          aria-label="Open search (⌘K)"
        >
          <Search size={13} />
          <span className="text-[11px] hidden sm:block">Search</span>
          <kbd className="hidden sm:block text-[9px] font-mono px-1 py-0.5 rounded bg-white border border-border text-text-dim leading-none">⌘K</kbd>
        </button>

        {/* Notifications */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-bg-elevated transition-colors"
          aria-label="Notifications"
        >
          <Bell size={15} />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-pulse-red rounded-full" />
          )}
        </button>
      </div>
    </header>
  )
}
