import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mail, CalendarDays, MessageSquare, FileQuestion, Search, Clock,
} from 'lucide-react'
import Layout from '../components/Layout'
import BookingModal from '../components/BookingModal'
import SidePanel from '../components/SidePanel'
import { useApp } from '../context/AppContext'
import { teamMembers, ssuTeam } from '../data/mockData'

const AVATAR_COLORS = [
  'bg-amber/20 text-amber',
  'bg-pulse-blue/10 text-pulse-blue',
  'bg-pulse-green/10 text-pulse-green',
  'bg-pulse-red/10 text-pulse-red',
  'bg-purple-500/10 text-purple-400',
  'bg-teal-500/10 text-teal-400',
]
function getAvatarColor(index) { return AVATAR_COLORS[index % AVATAR_COLORS.length] }

const MEMBER_META = {
  'tm-1': { availability: 'available', lastInteraction: 'Mar 4, 2026', owns: ['Project management', 'Milestone tracking', 'KPI reviews', 'Office hours'], history: [{ date: 'Mar 4, 2026', type: 'Message', detail: 'Discussed Q1 milestone progress' }, { date: 'Feb 28, 2026', type: 'Office Hours', detail: '30-min session — fundraising prep' }] },
  'tm-2': { availability: 'busy', lastInteraction: 'Feb 27, 2026', owns: ['Legal contracts', 'IP protection', 'Regulatory compliance', 'Governance'], history: [{ date: 'Feb 27, 2026', type: 'Message', detail: 'Employment contract template sent' }, { date: 'Feb 15, 2026', type: 'Request', detail: 'REQ-2026-044 resolved' }] },
  'tm-3': { availability: 'out', lastInteraction: 'Mar 1, 2026', owns: ['Financial modeling', 'VAT/ZATCA', 'Burn rate tracking', 'Monthly P&L'], history: [{ date: 'Mar 1, 2026', type: 'Message', detail: 'Q1 VAT filing confirmed' }] },
  'ssu-1': { availability: 'available', lastInteraction: 'Mar 3, 2026', owns: ['UI/UX strategy', 'Design frameworks', 'Sprint facilitation'], history: [{ date: 'Mar 3, 2026', type: 'Message', detail: 'Shared design system resources' }] },
  'ssu-2': { availability: 'available', lastInteraction: 'Feb 25, 2026', owns: ['CTO search', 'Engineering talent pipeline', 'Technical interviews'], history: [{ date: 'Feb 25, 2026', type: 'Message', detail: 'CTO shortlist shared — 4 candidates' }] },
  'ssu-3': { availability: 'busy', lastInteraction: 'Feb 18, 2026', owns: ['Cloud architecture', 'AWS setup', 'DevOps', 'Security review'], history: [{ date: 'Feb 18, 2026', type: 'Message', detail: 'AWS Activate credits setup guide sent' }] },
}

const AVAILABILITY_CONFIG = {
  available: { label: 'Available', dotClass: 'bg-pulse-green', textClass: 'text-pulse-green' },
  busy: { label: 'In a meeting', dotClass: 'bg-amber', textClass: 'text-amber' },
  out: { label: 'Out of office', dotClass: 'bg-text-dim', textClass: 'text-text-dim' },
}


function AvailabilityDot({ availability }) {
  const config = AVAILABILITY_CONFIG[availability] || AVAILABILITY_CONFIG.available
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full shrink-0 ${config.dotClass}`} />
      <span className={`text-[10px] font-medium ${config.textClass}`}>{config.label}</span>
    </div>
  )
}

function MemberCard({ member, index, onBook, onMessage, onRequest, onViewHistory, isSSU }) {
  const meta = MEMBER_META[member.id] || {}
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base shrink-0 ${getAvatarColor(index)}`}>
          {member.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-text font-semibold text-sm truncate">{member.name}</p>
          <p className="text-text-muted text-xs truncate">{member.role}</p>
          {meta.availability && <AvailabilityDot availability={meta.availability} />}
        </div>
      </div>

      {member.bio && <p className="text-text-dim text-xs leading-relaxed line-clamp-3">{member.bio}</p>}

      {meta.owns && meta.owns.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-1.5">Owns</p>
          <div className="flex flex-wrap gap-1">
            {meta.owns.map(own => (
              <span key={own} className="text-[10px] bg-bg-elevated text-text-muted px-2 py-0.5 rounded-full">{own}</span>
            ))}
          </div>
        </div>
      )}

      {meta.lastInteraction && (
        <div className="flex items-center gap-1.5 text-xs text-text-dim">
          <Clock size={11} />
          Last contact: {meta.lastInteraction}
        </div>
      )}

      <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-text-muted hover:text-amber text-xs transition-colors truncate">
        <Mail className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">{member.email}</span>
      </a>

      <div className="flex flex-wrap gap-2 mt-auto pt-1">
        <button className="btn-secondary flex items-center gap-1.5 text-xs" onClick={onBook}>
          <CalendarDays className="w-3.5 h-3.5" /> Office Hours
        </button>
        <button className="btn-ghost flex items-center gap-1.5 text-xs" onClick={onMessage}>
          <MessageSquare className="w-3.5 h-3.5" /> Message
        </button>
        {isSSU && onRequest && (
          <button className="btn-ghost flex items-center gap-1.5 text-xs" onClick={onRequest}>
            <FileQuestion className="w-3.5 h-3.5" /> Request
          </button>
        )}
        {meta.history && (
          <button className="btn-ghost flex items-center gap-1.5 text-xs" onClick={onViewHistory}>
            <Clock className="w-3.5 h-3.5" /> History
          </button>
        )}
      </div>
    </div>
  )
}

export default function MyTeam() {
  const navigate = useNavigate()
  const { setSelectedCategory } = useApp()
  const [bookingPerson, setBookingPerson] = useState(null)
  const [historyMember, setHistoryMember] = useState(null)
  const [searchQ, setSearchQ] = useState('')

  const allMembers = [
    ...teamMembers.map(m => ({ ...m, group: 'studio' })),
    ...ssuTeam.map(m => ({ ...m, group: 'ssu' })),
  ]
  const filteredIds = searchQ.trim()
    ? new Set(allMembers.filter(m => m.name.toLowerCase().includes(searchQ.toLowerCase()) || m.role.toLowerCase().includes(searchQ.toLowerCase())).map(m => m.id))
    : null
  function isVisible(id) { return !filteredIds || filteredIds.has(id) }

  function handleMessage(member) {
    window.open(`https://slack.com/app_redirect?channel=${member.slackHandle}`, '_blank')
  }
  function handleRequest(member) { setSelectedCategory(member.category); navigate('/request-help') }

  return (
    <Layout title="My Team" subtitle="Your Studio Support Team and SSU contacts">
      <div className="p-6 space-y-10">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search team members…" className="input-field w-full pl-9 text-sm" />
        </div>

        {/* Studio Support Team */}
        <section>
          <h2 className="text-base font-semibold text-text mb-4">Your Studio Support Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.filter(m => isVisible(m.id)).map((member, idx) => (
              <MemberCard key={member.id} member={member} index={idx} onBook={() => setBookingPerson(member)} onMessage={() => handleMessage(member)} onViewHistory={() => setHistoryMember(member)} isSSU={false} />
            ))}
          </div>
        </section>

        {/* SSU */}
        <section>
          <div className="mb-4">
            <h2 className="text-base font-semibold text-text">Studio Support Unit (SSU)</h2>
            <p className="text-text-muted text-sm mt-1">Specialists who handle legal, finance, talent, and operations across all portfolio companies.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ssuTeam.filter(m => isVisible(m.id)).map((member, idx) => (
              <MemberCard key={member.id} member={member} index={idx + teamMembers.length} onBook={() => setBookingPerson(member)} onMessage={() => handleMessage(member)} onRequest={() => handleRequest(member)} onViewHistory={() => setHistoryMember(member)} isSSU={true} />
            ))}
          </div>
        </section>

      </div>

      {/* Interaction History Panel */}
      <SidePanel isOpen={!!historyMember} onClose={() => setHistoryMember(null)} title={historyMember ? `${historyMember.name} — History` : ''} width="w-[400px]">
        {historyMember && (() => {
          const meta = MEMBER_META[historyMember.id] || {}
          return (
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber/20 text-amber flex items-center justify-center font-bold text-sm shrink-0">{historyMember.initials}</div>
                <div>
                  <p className="font-semibold text-text text-sm">{historyMember.name}</p>
                  <p className="text-xs text-text-dim">{historyMember.role}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-3">Interaction History</p>
                {meta.history && meta.history.length > 0 ? (
                  <div className="space-y-3">
                    {meta.history.map((h, i) => (
                      <div key={i} className="p-3 bg-bg-elevated rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-text">{h.type}</span>
                          <span className="text-xs text-text-dim">{h.date}</span>
                        </div>
                        <p className="text-xs text-text-muted">{h.detail}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-muted">No interactions recorded yet.</p>
                )}
              </div>
            </div>
          )
        })()}
      </SidePanel>

      {bookingPerson && (
        <BookingModal isOpen={!!bookingPerson} onClose={() => setBookingPerson(null)} person={bookingPerson} />
      )}
    </Layout>
  )
}
