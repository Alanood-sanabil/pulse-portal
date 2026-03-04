import { useState } from 'react'
import { Search, Pin, Check, X } from 'lucide-react'
import Layout from '../components/Layout'
import SidePanel from '../components/SidePanel'

const MESSAGES = [
  {
    id: 'msg-1',
    sender: 'Sarah Al-Rashid',
    initials: 'SA',
    role: 'Portfolio Manager',
    timestamp: 'Today at 10:32 AM',
    category: 'Office Hours',
    pinnable: true,
    text: "Hey founders, just a reminder that Office Hours this Thursday (Mar 5) are from 3–5 PM. You can book your slot directly through the portal. Topics I'm available for: fundraising prep, KPI reviews, go-to-market strategy, and anything that's on your mind. Looking forward to it — book early, slots fill fast.",
  },
  {
    id: 'msg-2',
    sender: 'Studio Team',
    initials: 'ST',
    role: 'Sanabil Studio',
    timestamp: 'Yesterday at 2:15 PM',
    category: 'New Perk',
    pinnable: false,
    text: 'New partner perk just added! All Sanabil Studio portfolio companies now have access to AWS Activate — up to $100,000 in AWS credits, plus dedicated startup support and architecture reviews. Head to the Founder Toolkit → Partner Perks tab to claim your credits. Promo code is in the portal.',
  },
  {
    id: 'msg-3',
    sender: 'Nora Khalid',
    initials: 'NK',
    role: 'Legal Counsel, SSU',
    timestamp: 'Mar 3 at 11:00 AM',
    category: 'Event',
    pinnable: false,
    text: "Friendly reminder that we're hosting a Legal Workshop for founders next Tuesday, March 10 at 10 AM. Topics: company governance in KSA, board meeting requirements under Companies Law, employment contract essentials for local and expat hires, and IP protection basics. Register by replying to this message or pinging me directly. Attendance strongly recommended for Phase 1 founders.",
  },
  {
    id: 'msg-4',
    sender: 'Portal Team',
    initials: 'PT',
    role: 'Pulse Portal',
    timestamp: 'Mar 2 at 9:00 AM',
    category: 'Announcement',
    pinnable: false,
    text: "Portal Update v2.1 is live. New features this week: Studio Board (you're looking at it!), Founder Journey for your personal venture diary, Venture Growth replacing the Milestones tracker, and improved search and filters in the Playbook and Toolkit. As always, let us know if you find any issues or have feature requests.",
  },
  {
    id: 'msg-5',
    sender: 'Sarah Al-Rashid',
    initials: 'SA',
    role: 'Portfolio Manager',
    timestamp: 'Mar 1 at 4:45 PM',
    category: 'Important',
    pinnable: true,
    text: "Quarterly Review Deadline Reminder — all founders need to complete their Q1 2026 review submission by March 31. This includes: updated KPI dashboard (MRR, burn, runway, team size), Venture Growth milestone updates, and a brief narrative on what's changed since your last board update. Reach out if you need a template or guidance — happy to do a prep call.",
  },
]

const CATEGORY_COLORS = {
  'Announcement': 'bg-pulse-blue/10 text-pulse-blue',
  'Office Hours': 'bg-amber/10 text-amber',
  'New Perk': 'bg-pulse-green/10 text-pulse-green',
  'Important': 'bg-pulse-red/10 text-pulse-red',
  'Event': 'bg-purple-500/10 text-purple-400',
}

const AVATAR_COLORS = {
  'SA': 'bg-amber/20 text-amber',
  'ST': 'bg-pulse-blue/10 text-pulse-blue',
  'NK': 'bg-pulse-red/10 text-pulse-red',
  'PT': 'bg-bg-elevated text-text-muted',
}

const CATEGORIES = ['All', 'Announcement', 'Office Hours', 'New Perk', 'Important', 'Event']

export default function StudioBoard() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQ, setSearchQ] = useState('')
  const [readIds, setReadIds] = useState(new Set())
  const [pinnedIds, setPinnedIds] = useState(new Set())
  const [selectedMessage, setSelectedMessage] = useState(null)

  function markRead(id) {
    setReadIds(prev => new Set([...prev, id]))
  }

  function togglePin(id, e) {
    e.stopPropagation()
    setPinnedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleMessageClick(message) {
    markRead(message.id)
    setSelectedMessage(message)
  }

  const filtered = MESSAGES
    .filter(m => {
      const matchCat = activeCategory === 'All' || m.category === activeCategory
      const matchQ = !searchQ || m.text.toLowerCase().includes(searchQ.toLowerCase()) || m.sender.toLowerCase().includes(searchQ.toLowerCase())
      return matchCat && matchQ
    })
    .sort((a, b) => {
      const aPinned = pinnedIds.has(a.id) ? 1 : 0
      const bPinned = pinnedIds.has(b.id) ? 1 : 0
      return bPinned - aPinned
    })

  const unreadCount = MESSAGES.filter(m => !readIds.has(m.id)).length

  return (
    <Layout title="Studio Board" subtitle="Announcements from your studio team">
      <div className="p-6 space-y-5 max-w-4xl mx-auto">

        {/* Slack Banner */}
        <div className="bg-bg-elevated border border-border rounded-xl px-4 py-3 flex items-center gap-2.5">
          <span className="text-[#4A154B] font-bold text-sm">#</span>
          <p className="text-xs text-text-muted flex-1">
            Connected to <span className="font-semibold text-text">#studio-announcements</span> in Slack.
          </p>
          {unreadCount > 0 && (
            <button
              onClick={() => setReadIds(new Set(MESSAGES.map(m => m.id)))}
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors"
            >
              <Check size={12} />
              Mark all read ({unreadCount})
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            placeholder="Search messages…"
            className="input-field w-full pl-9 text-sm"
          />
          {searchQ && (
            <button onClick={() => setSearchQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeCategory === category
                  ? 'bg-amber text-white border-amber'
                  : 'bg-white border-border text-text-muted hover:text-text hover:border-text-dim'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Message Feed */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-text-muted text-sm">No messages match your search.</div>
          ) : (
            filtered.map(message => {
              const isRead = readIds.has(message.id)
              const isPinned = pinnedIds.has(message.id)
              return (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message)}
                  className={`card p-5 flex gap-4 cursor-pointer transition-all group ${
                    !isRead ? 'border-pulse-blue/20 bg-pulse-blue/3' : 'hover:border-amber/20'
                  } ${isPinned ? 'ring-1 ring-amber/30' : ''}`}
                >
                  {/* Unread dot */}
                  <div className="w-2 shrink-0 mt-2">
                    {!isRead && <div className="w-2 h-2 rounded-full bg-pulse-blue" />}
                  </div>

                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${AVATAR_COLORS[message.initials] || 'bg-bg-elevated text-text-muted'}`}>
                    {message.initials}
                  </div>

                  {/* Right Side */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-semibold text-text text-sm">{message.sender}</span>
                      <span className="text-xs text-text-dim">{message.role}</span>
                      <span className="text-xs text-text-dim ml-auto">{message.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 mb-2">
                      <div className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[message.category] || 'bg-bg-elevated text-text-muted'}`}>
                        {message.category}
                      </div>
                      {isPinned && (
                        <span className="inline-flex items-center gap-1 text-xs text-amber font-medium">
                          <Pin size={10} fill="currentColor" /> Pinned
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-text-muted leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">{message.text}</p>
                  </div>

                  {/* Pin button */}
                  {message.pinnable && (
                    <button
                      onClick={e => togglePin(message.id, e)}
                      className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-colors opacity-0 group-hover:opacity-100 ${
                        isPinned ? 'text-amber bg-amber/10' : 'text-text-dim hover:text-amber hover:bg-amber/10'
                      }`}
                      aria-label={isPinned ? 'Unpin' : 'Pin'}
                    >
                      <Pin size={13} />
                    </button>
                  )}
                </div>
              )
            })
          )}
        </div>

        <p className="text-center text-xs text-text-dim pt-2">
          Messages are synced from #studio-announcements in Slack. Reply there to respond.
        </p>
      </div>

      {/* Detail Side Panel */}
      <SidePanel
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title={selectedMessage?.sender || ''}
        width="w-[520px]"
      >
        {selectedMessage && (
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${AVATAR_COLORS[selectedMessage.initials] || 'bg-bg-elevated text-text-muted'}`}>
                {selectedMessage.initials}
              </div>
              <div>
                <p className="font-semibold text-text text-sm">{selectedMessage.sender}</p>
                <p className="text-xs text-text-dim">{selectedMessage.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[selectedMessage.category] || 'bg-bg-elevated text-text-muted'}`}>
                {selectedMessage.category}
              </div>
              <span className="text-xs text-text-dim">{selectedMessage.timestamp}</span>
            </div>
            <div className="bg-bg-elevated rounded-xl p-4">
              <p className="text-sm text-text leading-relaxed">{selectedMessage.text}</p>
            </div>
            <p className="text-xs text-text-dim">To reply, respond in #studio-announcements on Slack.</p>
          </div>
        )}
      </SidePanel>
    </Layout>
  )
}
