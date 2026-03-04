import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Clock, FileText, BookOpen, Users, Flag, X, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { tasks, teamMembers, ssuTeam } from '../data/mockData'

const SEARCH_ARTICLES = [
  { id: 'a-1', title: 'Hiring Your First Product Manager', topic: 'Hiring', route: '/playbook' },
  { id: 'a-2', title: 'Running a Board Meeting in Saudi Arabia', topic: 'Board', route: '/playbook' },
  { id: 'a-3', title: 'Market Research Methods for B2B Founders', topic: 'GTM', route: '/playbook' },
  { id: 'a-4', title: 'Finding and Briefing a PR Agency in KSA', topic: 'PR', route: '/playbook' },
  { id: 'a-5', title: 'Term Sheet Basics: What Founders Need to Know', topic: 'Fundraising', route: '/playbook' },
  { id: 'a-6', title: 'Building Your First Sales Pipeline', topic: 'GTM', route: '/playbook' },
  { id: 'a-7', title: 'Setting Up OKRs for an Early-Stage Startup', topic: 'Operations', route: '/playbook' },
  { id: 'a-8', title: 'Managing Cash Flow as an Early-Stage Founder', topic: 'Finance', route: '/playbook' },
]

function highlight(text, query) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-amber/20 text-amber rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function SearchModal({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { documents, milestones } = useApp()
  const [query, setQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState(['Bank account opening', 'Term sheet', 'CTO hire'])
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef(null)

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveIndex(-1)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Flatten documents object into array
  const allDocuments = useMemo(() => {
    if (!documents) return []
    return Object.entries(documents).flatMap(([category, docs]) =>
      docs.map(doc => ({ ...doc, category }))
    )
  }, [documents])

  // All team members combined
  const allTeam = useMemo(() => [
    ...teamMembers.map(m => ({ ...m, group: 'Studio Team' })),
    ...ssuTeam.map(m => ({ ...m, group: 'SSU' })),
  ], [])

  // Search results grouped by category
  const results = useMemo(() => {
    if (!query.trim()) return null
    const q = query.toLowerCase()

    const matchedTasks = tasks
      .filter(t => t.title.toLowerCase().includes(q) || t.category?.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q))
      .slice(0, 4)
      .map(t => ({
        id: t.id,
        title: t.title,
        subtitle: `${t.category} · Phase ${t.phase}`,
        route: '/onboarding',
        category: 'Tasks',
      }))

    const matchedDocs = allDocuments
      .filter(d => d.name.toLowerCase().includes(q) || d.category?.toLowerCase().includes(q) || d.type?.toLowerCase().includes(q))
      .slice(0, 4)
      .map(d => ({
        id: d.id,
        title: d.name,
        subtitle: `${d.category} · ${d.type} · ${d.version}`,
        route: '/document-library',
        category: 'Documents',
      }))

    const matchedArticles = SEARCH_ARTICLES
      .filter(a => a.title.toLowerCase().includes(q) || a.topic.toLowerCase().includes(q))
      .slice(0, 3)
      .map(a => ({
        id: a.id,
        title: a.title,
        subtitle: a.topic,
        route: a.route,
        category: 'Playbook',
      }))

    const matchedTeam = allTeam
      .filter(m => m.name.toLowerCase().includes(q) || m.role?.toLowerCase().includes(q) || m.category?.toLowerCase().includes(q))
      .slice(0, 3)
      .map(m => ({
        id: m.id,
        title: m.name,
        subtitle: `${m.role} · ${m.group || m.category || ''}`,
        route: '/my-team',
        category: 'Team',
      }))

    const groups = []
    if (matchedTasks.length) groups.push({ label: 'Tasks', items: matchedTasks })
    if (matchedDocs.length) groups.push({ label: 'Documents', items: matchedDocs })
    if (matchedArticles.length) groups.push({ label: 'Playbook', items: matchedArticles })
    if (matchedTeam.length) groups.push({ label: 'Team', items: matchedTeam })
    return groups
  }, [query, allDocuments, allTeam])

  // Flat list of all result items for keyboard nav
  const flatResults = useMemo(() => {
    if (!results) return []
    return results.flatMap(g => g.items)
  }, [results])

  const totalResults = flatResults.length

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    function handleKey(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex(i => (i + 1) % Math.max(totalResults, 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex(i => (i - 1 + Math.max(totalResults, 1)) % Math.max(totalResults, 1))
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && flatResults[activeIndex]) {
          handleResultClick(flatResults[activeIndex])
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, activeIndex, flatResults, totalResults])

  function handleResultClick(item) {
    if (query.trim()) {
      setRecentSearches(prev => {
        const filtered = prev.filter(s => s.toLowerCase() !== query.toLowerCase())
        return [query.trim(), ...filtered].slice(0, 5)
      })
    }
    onClose()
    navigate(item.route)
  }

  function handleRecentClick(term) {
    setQuery(term)
    inputRef.current?.focus()
  }

  function getCategoryIcon(category) {
    switch (category) {
      case 'Tasks': return <Flag size={13} className="text-amber shrink-0" />
      case 'Documents': return <FileText size={13} className="text-pulse-blue shrink-0" />
      case 'Playbook': return <BookOpen size={13} className="text-pulse-green shrink-0" />
      case 'Team': return <Users size={13} className="text-text-muted shrink-0" />
      default: return <Search size={13} className="text-text-dim shrink-0" />
    }
  }

  if (!isOpen) return null

  // Build flat index tracker for keyboard nav
  let flatIdx = 0

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-modal overflow-hidden flex flex-col"
        style={{ maxHeight: '72vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search size={16} className="text-text-dim shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIndex(-1) }}
            placeholder="Search tasks, documents, articles, team members…"
            className="flex-1 text-sm text-text placeholder:text-text-dim bg-transparent outline-none"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setActiveIndex(-1); inputRef.current?.focus() }}
              className="text-text-dim hover:text-text transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-bg-elevated border border-border text-text-dim font-mono">
            ESC
          </kbd>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Empty query — show recent searches */}
          {!query && (
            <div className="p-4">
              {recentSearches.length > 0 && (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-text-dim mb-2 px-1">
                    Recent Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map(term => (
                      <button
                        key={term}
                        onClick={() => handleRecentClick(term)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border text-xs text-text-muted hover:text-text hover:border-border/80 transition-colors"
                      >
                        <Clock size={11} className="text-text-dim" />
                        {term}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Search results */}
          {query && results && (
            <>
              {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-text-dim">
                  <Search size={28} strokeWidth={1.5} />
                  <p className="text-sm">No results for <span className="font-medium text-text">'{query}'</span></p>
                </div>
              ) : (
                <div className="py-2">
                  {results.map(group => {
                    return (
                      <div key={group.label} className="mb-1">
                        {/* Group header */}
                        <div className="flex items-center gap-2 px-4 py-2">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-text-dim">
                            {group.label}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-bg-elevated text-text-muted">
                            {group.items.length}
                          </span>
                        </div>
                        {/* Items */}
                        {group.items.map(item => {
                          const currentFlatIdx = flatIdx++
                          const isActive = currentFlatIdx === activeIndex
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleResultClick(item)}
                              onMouseEnter={() => setActiveIndex(currentFlatIdx)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${isActive ? 'bg-bg-elevated' : 'hover:bg-bg-elevated/60'}`}
                            >
                              <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                {getCategoryIcon(group.label)}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-text truncate">
                                  {highlight(item.title, query)}
                                </p>
                                {item.subtitle && (
                                  <p className="text-[11px] text-text-dim truncate mt-0.5">
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                              {isActive && (
                                <ArrowRight size={12} className="text-text-dim shrink-0" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-border px-4 py-2 flex items-center gap-4 bg-bg-base">
          <span className="text-[10px] text-text-dim flex items-center gap-1">
            <kbd className="font-mono px-1 py-0.5 rounded border border-border bg-white text-[9px]">↑↓</kbd>
            navigate
          </span>
          <span className="text-[10px] text-text-dim flex items-center gap-1">
            <kbd className="font-mono px-1 py-0.5 rounded border border-border bg-white text-[9px]">↵</kbd>
            select
          </span>
          <span className="text-[10px] text-text-dim flex items-center gap-1">
            <kbd className="font-mono px-1 py-0.5 rounded border border-border bg-white text-[9px]">ESC</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  )
}
