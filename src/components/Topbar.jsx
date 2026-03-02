import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Bell } from 'lucide-react'

export default function Topbar({ title, subtitle }) {
  const navigate = useNavigate()
  const { notificationCount } = useApp()

  return (
    <header className="h-14 border-b border-border bg-white flex items-center px-6 gap-4 shrink-0">
      {/* Title */}
      <div className="flex-1">
        <h1 className="text-[13px] font-semibold text-text tracking-[-0.01em]">{title}</h1>
        {subtitle && <p className="text-[11px] text-text-dim leading-tight mt-0.5">{subtitle}</p>}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => navigate('/notifications')}
          className="relative w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-bg-elevated transition-colors"
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
