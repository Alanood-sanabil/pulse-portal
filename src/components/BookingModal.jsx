import { useState } from 'react'
import Modal from './Modal'
import { useApp } from '../context/AppContext'
import { Check, Calendar } from 'lucide-react'

const days = ['Mon', 'Tue', 'Wed', 'Thu']
const slots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']

export default function BookingModal({ isOpen, onClose, personName, personRole }) {
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const { addToast } = useApp()

  function handleConfirm() {
    if (!selected) return
    setConfirmed(true)
    addToast(`Booking confirmed with ${personName}`, 'success')
  }

  function handleClose() {
    setSelected(null)
    setConfirmed(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Book a meeting with ${personName}`} maxWidth="max-w-xl">
      <div className="p-6">
        {!confirmed ? (
          <>
            <p className="text-sm text-text-muted mb-5">
              Select an available slot with <span className="text-text font-medium">{personName}</span> ({personRole}).
            </p>
            {/* Calendar grid */}
            <div className="grid grid-cols-5 gap-1 mb-6">
              {/* Header row */}
              <div className="text-xs text-text-dim" />
              {days.map(day => (
                <div key={day} className="text-xs font-medium text-text-muted text-center py-2">{day}</div>
              ))}
              {/* Slot rows */}
              {slots.map(slot => (
                <>
                  <div key={`label-${slot}`} className="text-xs text-text-dim flex items-center pr-2">{slot}</div>
                  {days.map((day, di) => {
                    const slotKey = `${day}-${slot}`
                    // Make some slots unavailable
                    const unavailable = (di === 1 && slot === '9:00 AM') || (di === 2 && slot === '2:00 PM') || (di === 3 && slot === '4:00 PM')
                    const isSelected = selected === slotKey
                    return (
                      <button
                        key={slotKey}
                        disabled={unavailable}
                        onClick={() => setSelected(slotKey)}
                        className={`
                          h-9 rounded-lg text-xs font-medium border transition-all
                          ${unavailable
                            ? 'border-border-subtle bg-bg-surface text-text-dim cursor-not-allowed opacity-40'
                            : isSelected
                              ? 'border-amber bg-amber/15 text-amber'
                              : 'border-border bg-bg-elevated text-text-muted hover:border-amber/50 hover:text-text cursor-pointer slot-available'
                          }
                        `}
                      >
                        {unavailable ? '—' : isSelected ? '✓' : 'Free'}
                      </button>
                    )
                  })}
                </>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                disabled={!selected}
                className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Calendar size={14} />
                Confirm Booking
              </button>
              <button onClick={handleClose} className="btn-secondary">Cancel</button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-pulse-green/15 flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-pulse-green" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">Booking Confirmed!</h3>
            <p className="text-sm text-text-muted mb-1">
              <span className="text-text font-medium">{selected?.replace('-', ' at ')}</span>
            </p>
            <p className="text-sm text-text-muted mb-6">
              with <span className="text-text font-medium">{personName}</span> ({personRole})
            </p>
            <p className="text-xs text-text-dim mb-6">A calendar invite has been sent to your email.</p>
            <button onClick={handleClose} className="btn-primary">Done</button>
          </div>
        )}
      </div>
    </Modal>
  )
}
