import { useState, useMemo } from 'react'
import { CheckCircle, ChevronDown, ChevronUp, PenLine, BookOpen, Zap, Flame, Search, Download, Filter } from 'lucide-react'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'

function getCurrentWeekLabel() {
  const today = new Date('2026-03-04')
  const day = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1))
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const fmt = d => `${months[d.getMonth()]} ${d.getDate()}`
  return `Week of ${fmt(monday)} – ${fmt(sunday)}, ${sunday.getFullYear()}`
}

function getAutoTags(entry) {
  const tags = []
  if (entry.achievements?.trim()) tags.push('Win')
  if (entry.blockers?.trim()) tags.push('Blocker')
  if (entry.milestone?.trim()) tags.push('Milestone')
  if (entry.numbers?.trim()) tags.push('Growth')
  return tags
}

const TAG_STYLES = {
  Win: 'bg-pulse-green/10 text-pulse-green',
  Blocker: 'bg-pulse-red/10 text-pulse-red',
  Milestone: 'bg-amber/15 text-amber',
  Growth: 'bg-pulse-blue/10 text-pulse-blue',
}

function wordCount(str) {
  if (!str?.trim()) return 0
  return str.trim().split(/\s+/).filter(Boolean).length
}

const FORM_FIELDS = [
  { key: 'focus', question: 'What was your venture focused on this week?', placeholder: 'What was pulling most of your attention and energy this week?', hint: null, rows: 3 },
  { key: 'achievements', question: 'What did you achieve or move forward?', placeholder: 'Wins, progress made, decisions locked in, things that finally clicked…', hint: null, rows: 3 },
  { key: 'blockers', question: 'What blockers or challenges came up?', placeholder: 'Anything slowing you down, open questions, or things that need resolving…', hint: null, rows: 3 },
  { key: 'numbers', question: 'How are your key numbers looking this week?', placeholder: 'Share whatever feels relevant right now…', hint: 'Optional — MRR, burn, users, deals, whatever matters to you right now.', rows: 2 },
  { key: 'milestone', question: 'Any milestone or moment worth remembering from this week?', placeholder: 'A first, a breakthrough, something that felt meaningful…', hint: 'This becomes part of your venture story.', rows: 2 },
]

function EntryForm({ onSaved, weekLabel, journeyWeekSubmitted }) {
  const { addJourneyEntry, addToast } = useApp()
  const [form, setForm] = useState({ focus: '', achievements: '', blockers: '', numbers: '', milestone: '' })
  const [saved, setSaved] = useState(false)

  if (journeyWeekSubmitted || saved) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
        <div className="w-14 h-14 rounded-full bg-pulse-green/15 flex items-center justify-center mx-auto">
          <CheckCircle size={26} className="text-pulse-green" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-text mb-1">Entry saved.</h3>
          <p className="text-sm text-text-muted leading-relaxed max-w-xs mx-auto">
            This week is now part of your journey. Come back next week to keep the story going.
          </p>
        </div>
      </div>
    )
  }

  function handleChange(key, value) { setForm(prev => ({ ...prev, [key]: value })) }

  function handleSave() {
    if (!form.focus.trim()) { addToast('Add at least a focus for the week before saving.', 'default'); return }
    const entry = { id: `je-${Date.now()}`, weekLabel, weekStart: '2026-03-03', ...form, savedAt: 'Mar 9, 2026' }
    addJourneyEntry(entry)
    setSaved(true)
    addToast('This week is now part of your journey.', 'success')
    if (onSaved) onSaved()
  }

  const totalWords = FORM_FIELDS.reduce((sum, f) => sum + wordCount(form[f.key]), 0)

  return (
    <div className="space-y-6">
      {FORM_FIELDS.map(field => (
        <div key={field.key}>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-semibold text-text">{field.question}</label>
            {form[field.key] && (
              <span className="text-[10px] text-text-dim">{wordCount(form[field.key])} words</span>
            )}
          </div>
          {field.hint && <p className="text-xs text-text-dim mb-2 leading-relaxed">{field.hint}</p>}
          <textarea
            value={form[field.key]}
            onChange={e => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows}
            className="input-field resize-none w-full"
          />
        </div>
      ))}

      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-text-dim">{totalWords} words total</span>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <PenLine size={15} />
          Save Entry
        </button>
      </div>
    </div>
  )
}

function TimelineCard({ entry }) {
  const [expanded, setExpanded] = useState(false)
  const tags = getAutoTags(entry)
  const preview = entry.focus?.split('\n')[0]?.slice(0, 100)
  const totalWords = FORM_FIELDS.reduce((sum, f) => sum + wordCount(entry[f.key]), 0)

  return (
    <div
      className={`card p-5 cursor-pointer transition-all ${expanded ? 'ring-1 ring-amber/20' : 'hover:border-amber/25'}`}
      onClick={() => setExpanded(e => !e)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-amber uppercase tracking-wider mb-1">{entry.weekLabel}</p>
          {!expanded && (
            <p className="text-sm text-text-muted leading-relaxed line-clamp-2">{preview}</p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {tags.map(tag => (
              <span key={tag} className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${TAG_STYLES[tag]}`}>
                {tag}
              </span>
            ))}
            <span className="text-[10px] text-text-dim ml-auto">{totalWords} words</span>
          </div>
        </div>
        <div className="shrink-0 mt-0.5 text-text-dim">
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </div>

      {expanded && (
        <div className="mt-5 space-y-4 border-t border-border-subtle pt-5" onClick={e => e.stopPropagation()}>
          {FORM_FIELDS.map(field => {
            const value = entry[field.key]
            if (!value?.trim()) return null
            return (
              <div key={field.key}>
                <p className="text-[10px] font-semibold text-text-dim uppercase tracking-wider mb-1.5">{field.question}</p>
                <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">{value}</p>
              </div>
            )
          })}
          <p className="text-xs text-text-dim pt-1 border-t border-border-subtle">Saved {entry.savedAt} · {totalWords} words</p>
        </div>
      )}
    </div>
  )
}

const ALL_TAGS = ['All', 'Win', 'Blocker', 'Milestone', 'Growth']

export default function FounderJourney() {
  const { journeyEntries, journeyWeekSubmitted } = useApp()
  const weekLabel = getCurrentWeekLabel()
  const [searchQ, setSearchQ] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  // Streak: count consecutive weeks from most recent going back
  const streak = useMemo(() => {
    if (journeyEntries.length === 0) return 0
    return journeyEntries.length // simplified: one entry per week assumed
  }, [journeyEntries])

  // Filter entries
  const filteredEntries = useMemo(() => {
    let entries = [...journeyEntries].reverse()
    if (searchQ.trim()) {
      const q = searchQ.toLowerCase()
      entries = entries.filter(e =>
        e.focus?.toLowerCase().includes(q) ||
        e.achievements?.toLowerCase().includes(q) ||
        e.blockers?.toLowerCase().includes(q) ||
        e.weekLabel?.toLowerCase().includes(q)
      )
    }
    if (activeTag !== 'All') {
      entries = entries.filter(e => getAutoTags(e).includes(activeTag))
    }
    return entries
  }, [journeyEntries, searchQ, activeTag])

  function handleExport() {
    window.print()
  }

  return (
    <Layout
      title="Founder Journey"
      subtitle="Your venture story, week by week. A record of everything you are building."
    >
      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

          {/* LEFT: Weekly Entry Form */}
          <div>
            <div className="card p-6">
              <div className="flex items-center gap-2.5 mb-6 pb-5 border-b border-border">
                <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center shrink-0">
                  <PenLine size={15} className="text-amber" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-dim">Current entry</p>
                  <p className="text-sm font-semibold text-text">{weekLabel}</p>
                </div>
                {/* Streak counter */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber/10 rounded-lg">
                  <Flame size={14} className="text-amber" />
                  <span className="text-sm font-bold text-amber">{streak}</span>
                  <span className="text-xs text-amber/80">week streak</span>
                </div>
              </div>

              <EntryForm weekLabel={weekLabel} journeyWeekSubmitted={journeyWeekSubmitted} />
            </div>

            {/* This week last year */}
            <div className="mt-4 p-4 bg-bg-surface border border-border rounded-xl">
              <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-2">This Week Last Year</p>
              <p className="text-sm text-text-muted italic">Week of Mar 3 – Mar 9, 2025</p>
              <p className="text-xs text-text-dim mt-1">No entry recorded for this week last year — you've come a long way.</p>
            </div>
          </div>

          {/* RIGHT: Journey Timeline */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <BookOpen size={15} className="text-text-dim shrink-0" />
                <h2 className="text-sm font-semibold text-text">Your Journey</h2>
                <span className="text-xs text-text-dim">· {journeyEntries.length} {journeyEntries.length === 1 ? 'entry' : 'entries'}</span>
              </div>
              <button
                onClick={handleExport}
                className="btn-ghost flex items-center gap-1.5 text-xs py-1 px-2"
                title="Export / Print"
              >
                <Download size={12} />
                Export
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search entries…"
                className="input-field w-full pl-8 text-sm"
              />
            </div>

            {/* Tag filter */}
            <div className="flex gap-1.5 mb-4 flex-wrap">
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    activeTag === tag
                      ? (tag === 'All' ? 'bg-amber/10 text-amber border border-amber/20' : `${TAG_STYLES[tag]} border border-current/20`)
                      : 'bg-bg-elevated text-text-muted border border-border hover:text-text'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {journeyEntries.length === 0 ? (
              <div className="card p-8 text-center">
                <Zap size={20} className="text-text-dim mx-auto mb-3" />
                <p className="text-sm text-text-muted">Your first entry will appear here.</p>
                <p className="text-xs text-text-dim mt-1">Every week you write becomes part of your story.</p>
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="card p-8 text-center">
                <Search size={20} className="text-text-dim mx-auto mb-3" />
                <p className="text-sm text-text-muted">No entries match your search.</p>
                <button onClick={() => { setSearchQ(''); setActiveTag('All') }} className="btn-ghost text-xs mt-2">Clear filters</button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredEntries.map(entry => (
                  <TimelineCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}

            {filteredEntries.length > 0 && (
              <p className="text-xs text-text-dim text-center mt-4">Click any entry to read the full week.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
