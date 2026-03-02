import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />
      {/* Modal */}
      <div className={`relative z-10 w-full ${maxWidth} bg-white border border-border rounded-2xl shadow-modal animate-fade-in max-h-[90vh] flex flex-col`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
            <h2 className="text-[15px] font-semibold text-text">{title}</h2>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-text-dim hover:text-text hover:bg-bg-elevated transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-text-dim hover:text-text hover:bg-bg-elevated transition-colors z-10"
          >
            <X size={15} />
          </button>
        )}
        <div className="overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
