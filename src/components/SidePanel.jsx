import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function SidePanel({ isOpen, onClose, title, children, width = 'w-[480px]' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/20 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />
      {/* Panel */}
      <div className={`${width} max-w-full bg-white border-l border-border shadow-panel animate-slide-in-right flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 className="text-[15px] font-semibold text-text truncate pr-4">{title}</h2>
          <button
            onClick={onClose}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-text-dim hover:text-text hover:bg-bg-elevated transition-colors"
          >
            <X size={15} />
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}
