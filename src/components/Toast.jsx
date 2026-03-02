import { useApp } from '../context/AppContext'
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react'

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  default: Info,
}

const colorMap = {
  success: 'border-pulse-green/20 bg-white text-pulse-green',
  error: 'border-pulse-red/20 bg-white text-pulse-red',
  default: 'border-border bg-white text-text',
}

export default function Toast() {
  const { toasts, removeToast } = useApp()

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => {
        const Icon = iconMap[toast.type] || iconMap.default
        const colorClass = colorMap[toast.type] || colorMap.default
        return (
          <div
            key={toast.id}
            className={`animate-toast-in pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-panel min-w-[280px] max-w-[360px] ${colorClass}`}
          >
            <Icon size={15} className="shrink-0" />
            <p className="text-sm font-medium flex-1 text-text">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-text-dim opacity-60 hover:opacity-100 transition-opacity"
            >
              <X size={13} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
