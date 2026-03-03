import { useState } from 'react'
import Layout from '../components/Layout'

const MESSAGES = [
  {
    id: 'msg-1',
    sender: 'Sarah Al-Rashid',
    initials: 'SA',
    role: 'Portfolio Manager',
    timestamp: 'Today at 10:32 AM',
    category: 'Office Hours',
    text: "Hey founders 👋 Just a reminder that Office Hours this Thursday (Mar 5) are from 3–5 PM. You can book your slot directly through the portal. Topics I'm available for: fundraising prep, KPI reviews, go-to-market strategy, and anything that's on your mind. Looking forward to it — book early, slots fill fast.",
  },
  {
    id: 'msg-2',
    sender: 'Studio Team',
    initials: 'ST',
    role: 'Sanabil Studio',
    timestamp: 'Yesterday at 2:15 PM',
    category: 'New Perk',
    text: '🎉 New partner perk just added! All Sanabil Studio portfolio companies now have access to AWS Activate — up to $100,000 in AWS credits, plus dedicated startup support and architecture reviews. Head to the Founder Toolkit → Partner Perks tab to claim your credits. Promo code is in the portal.',
  },
  {
    id: 'msg-3',
    sender: 'Nora Khalid',
    initials: 'NK',
    role: 'Legal Counsel, SSU',
    timestamp: 'Mar 3 at 11:00 AM',
    category: 'Event',
    text: "📋 Friendly reminder that we're hosting a Legal Workshop for founders next Tuesday, March 10 at 10 AM. Topics: company governance in KSA, board meeting requirements under Companies Law, employment contract essentials for local and expat hires, and IP protection basics. Register by replying to this message or pinging me directly. Attendance strongly recommended for Phase 1 founders.",
  },
  {
    id: 'msg-4',
    sender: 'Portal Team',
    initials: 'PT',
    role: 'Pulse Portal',
    timestamp: 'Mar 2 at 9:00 AM',
    category: 'Announcement',
    text: "⚡ Portal Update v2.1 is live. New features this week: Studio Board (you're looking at it!), Founder Journey for your personal venture diary, Venture Growth replacing the Milestones tracker, and improved search and filters in the Playbook and Toolkit. As always, let us know if you find any issues or have feature requests.",
  },
  {
    id: 'msg-5',
    sender: 'Sarah Al-Rashid',
    initials: 'SA',
    role: 'Portfolio Manager',
    timestamp: 'Mar 1 at 4:45 PM',
    category: 'Important',
    text: "📅 Quarterly Review Deadline Reminder — all founders need to complete their Q1 2026 review submission by March 31. This includes: updated KPI dashboard (MRR, burn, runway, team size), Venture Growth milestone updates, and a brief narrative on what's changed since your last board update. Reach out if you need a template or guidance — happy to do a prep call.",
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

  const filtered = activeCategory === 'All' ? MESSAGES : MESSAGES.filter(m => m.category === activeCategory)

  return (
    <Layout title="Studio Board" subtitle="Announcements from your studio team">
      <div className="p-6 space-y-5 max-w-4xl mx-auto">

        {/* Slack Banner */}
        <div className="bg-bg-elevated border border-border rounded-xl px-4 py-3 flex items-center gap-2.5">
          <span className="text-[#4A154B] font-bold text-sm">#</span>
          <p className="text-xs text-text-muted">
            This channel is connected to{' '}
            <span className="font-semibold text-text">#studio-announcements</span>{' '}
            in Slack. Messages posted there appear here automatically.
          </p>
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
          {filtered.map(message => (
            <div key={message.id} className="card p-5 flex gap-4">
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${AVATAR_COLORS[message.initials] || 'bg-bg-elevated text-text-muted'}`}>
                {message.initials}
              </div>

              {/* Right Side */}
              <div className="flex-1 min-w-0">
                {/* Header Row */}
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-semibold text-text text-sm">{message.sender}</span>
                  <span className="text-xs text-text-dim">{message.role}</span>
                  <span className="text-xs text-text-dim ml-auto">{message.timestamp}</span>
                </div>

                {/* Category Badge */}
                <div className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium mt-1 mb-2 ${CATEGORY_COLORS[message.category] || 'bg-bg-elevated text-text-muted'}`}>
                  {message.category}
                </div>

                {/* Message Text */}
                <p className="text-sm text-text-muted leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Read-only Note */}
        <p className="text-center text-xs text-text-dim pt-2">
          Messages are synced from #studio-announcements in Slack. Reply there to respond.
        </p>

      </div>
    </Layout>
  )
}
