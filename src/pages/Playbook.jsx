import { useState } from 'react'
import { CheckCircle, Circle, Clock, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'
import { playbookChapters, sectionContent } from '../data/mockData'

const PHASES = ['Foundation', 'Build', 'Launch', 'Scale']

const PHASE_COLORS = {
  Foundation: 'bg-amber/15 text-amber border-amber/30',
  Build: 'bg-pulse-blue/10 text-pulse-blue border-pulse-blue/20',
  Launch: 'bg-pulse-green/10 text-pulse-green border-pulse-green/20',
  Scale: 'bg-bg-elevated text-text-muted border-border',
}

const PHASE_ACTIVE = {
  Foundation: true,
  Build: false,
  Launch: false,
  Scale: false,
}

function JourneyMapBar() {
  return (
    <div className="flex items-center gap-0 w-full">
      {PHASES.map((phase, i) => (
        <div key={phase} className="flex items-center flex-1">
          <div
            className={`flex-1 flex items-center justify-center px-4 py-3 border rounded-xl text-sm font-semibold transition-all ${
              PHASE_ACTIVE[phase]
                ? 'bg-amber/15 text-amber border-amber/30'
                : 'bg-bg-card text-text-dim border-border'
            }`}
          >
            <span className="mr-2 text-xs font-normal opacity-60">{i + 1}</span>
            {phase}
          </div>
          {i < PHASES.length - 1 && (
            <div className="flex items-center justify-center w-8 shrink-0">
              <ArrowRight size={14} className="text-text-dim" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ProgressBar({ value }) {
  return (
    <div className="w-full bg-bg-elevated rounded-full h-1.5 overflow-hidden">
      <div
        className="h-full bg-amber rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

function parseArticleContent(content) {
  if (!content) return []
  const lines = content.split('\n')
  const elements = []
  let paragraphBuffer = []

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      elements.push({ type: 'paragraph', text: paragraphBuffer.join(' ').trim() })
      paragraphBuffer = []
    }
  }

  for (const line of lines) {
    if (line.startsWith('### ')) {
      flushParagraph()
      elements.push({ type: 'h3', text: line.replace(/^### /, '') })
    } else if (line.startsWith('## ')) {
      flushParagraph()
      elements.push({ type: 'h2', text: line.replace(/^## /, '') })
    } else if (line.startsWith('# ')) {
      flushParagraph()
      elements.push({ type: 'h1', text: line.replace(/^# /, '') })
    } else if (line.trim() === '') {
      flushParagraph()
    } else {
      paragraphBuffer.push(line)
    }
  }
  flushParagraph()

  return elements
}

function ArticleRenderer({ content }) {
  const elements = parseArticleContent(content)

  return (
    <div className="space-y-4">
      {elements.map((el, i) => {
        if (el.type === 'h1') {
          return <h1 key={i} className="text-xl font-bold text-text mt-2">{el.text}</h1>
        }
        if (el.type === 'h2') {
          return <h2 key={i} className="text-base font-semibold text-text mt-4 pt-2 border-t border-border-subtle">{el.text}</h2>
        }
        if (el.type === 'h3') {
          return <h3 key={i} className="text-sm font-semibold text-text mt-3">{el.text}</h3>
        }
        return (
          <p key={i} className="text-sm text-text-muted leading-relaxed">
            {el.text}
          </p>
        )
      })}
    </div>
  )
}

function SectionView({ section, chapter, onBack }) {
  const { readSections, markSectionRead } = useApp()
  const isRead = readSections.has(section.id)
  const [markedRead, setMarkedRead] = useState(isRead)
  const [comment, setComment] = useState('')
  const [commentSubmitted, setCommentSubmitted] = useState(false)

  const chapterSectionIds = chapter.sectionList.map(s => s.id)
  const currentIndex = chapter.sectionList.findIndex(s => s.id === section.id)
  const prevSection = currentIndex > 0 ? chapter.sectionList[currentIndex - 1] : null
  const nextSection = currentIndex < chapter.sectionList.length - 1 ? chapter.sectionList[currentIndex + 1] : null

  const content = sectionContent[section.id]

  const handleMarkRead = () => {
    markSectionRead(section.id, chapter.id, chapterSectionIds)
    setMarkedRead(true)
  }

  const handleSubmitComment = () => {
    if (comment.trim()) {
      setCommentSubmitted(true)
      setComment('')
    }
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
      >
        <ChevronLeft size={16} />
        Back to {chapter.title}
      </button>

      <div className="bg-bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${PHASE_COLORS[chapter.phase] || 'bg-bg-elevated text-text-muted'}`}>
              {chapter.phase}
            </span>
            <span className="text-xs text-text-muted">{chapter.title}</span>
          </div>
          <h1 className="text-xl font-bold text-text">{section.title}</h1>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Clock size={12} />
            {section.readTime} read
          </div>
        </div>

        <div className="border-t border-border pt-4">
          {content ? (
            <ArticleRenderer content={content.content} />
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-text-muted leading-relaxed">
                This section covers <strong className="text-text">{section.title}</strong> — a key topic in the {chapter.title} chapter of your Founder Playbook.
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                Full content for this section is being finalized by the Sanabil Studio team and will be available soon. In the meantime, reach out to your Portfolio Manager if you have specific questions related to this topic.
              </p>
              <div className="bg-bg-elevated rounded-xl p-4">
                <p className="text-xs text-text-muted italic">Content coming soon — estimated availability: Week 2 of your Foundation Phase.</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          {prevSection ? (
            <button
              onClick={() => onBack(prevSection)}
              className="btn-ghost flex items-center gap-1.5 text-sm"
            >
              <ChevronLeft size={15} />
              {prevSection.title}
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleMarkRead}
            disabled={markedRead}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              markedRead
                ? 'bg-pulse-green/10 text-pulse-green cursor-default'
                : 'btn-primary'
            }`}
          >
            {markedRead ? (
              <>
                <CheckCircle size={15} />
                Read
              </>
            ) : (
              'Mark as Read'
            )}
          </button>

          {nextSection ? (
            <button
              onClick={() => onBack(nextSection)}
              className="btn-ghost flex items-center gap-1.5 text-sm"
            >
              {nextSection.title}
              <ChevronRight size={15} />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>

      <div className="bg-bg-card border border-border rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-text">Leave a Comment</h3>
        {commentSubmitted ? (
          <div className="bg-pulse-green/10 rounded-xl p-3">
            <p className="text-sm text-pulse-green">Comment submitted. Your Portfolio Manager will respond shortly.</p>
          </div>
        ) : (
          <>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts, questions, or feedback on this section..."
              className="input-field w-full h-24 resize-none text-sm"
            />
            <button
              onClick={handleSubmitComment}
              disabled={!comment.trim()}
              className="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Comment
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function ChapterView({ chapter, onBack, onSelectSection }) {
  const { readSections, playbookProgress } = useApp()
  const progress = playbookProgress[chapter.id] || 0

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
      >
        <ChevronLeft size={16} />
        Back to Chapters
      </button>

      <div className="bg-bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${PHASE_COLORS[chapter.phase] || 'bg-bg-elevated text-text-muted'}`}>
              {chapter.phase}
            </span>
            <h2 className="text-lg font-bold text-text">{chapter.title}</h2>
            <p className="text-sm text-text-muted">{chapter.sections} sections · {chapter.readTime}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-2xl font-bold text-amber">{progress}%</span>
            <p className="text-xs text-text-muted">complete</p>
          </div>
        </div>
        <ProgressBar value={progress} />
      </div>

      <div className="space-y-2">
        {chapter.sectionList.map((section, i) => {
          const isRead = readSections.has(section.id)
          return (
            <button
              key={section.id}
              onClick={() => onSelectSection(section)}
              className="w-full bg-bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-amber/40 hover:bg-bg-elevated transition-all text-left group"
            >
              <span className="text-xs font-medium text-text-dim w-5 shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${isRead ? 'text-text-muted' : 'text-text'} group-hover:text-amber transition-colors`}>
                  {section.title}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock size={11} className="text-text-dim" />
                  <span className="text-xs text-text-dim">{section.readTime}</span>
                </div>
              </div>
              <div className="shrink-0">
                {isRead ? (
                  <CheckCircle size={18} className="text-pulse-green" />
                ) : (
                  <Circle size={18} className="text-text-dim" />
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ChaptersGrid({ onSelectChapter }) {
  const { playbookProgress } = useApp()

  return (
    <div className="space-y-6">
      <JourneyMapBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {playbookChapters.map((chapter) => {
          const progress = playbookProgress[chapter.id] || 0
          return (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter)}
              className="bg-bg-card border border-border rounded-xl p-5 text-left hover:border-amber/40 hover:bg-bg-elevated transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${PHASE_COLORS[chapter.phase] || 'bg-bg-elevated text-text-muted'}`}>
                    {chapter.phase}
                  </span>
                  <h3 className="text-sm font-semibold text-text group-hover:text-amber transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    {chapter.sections} sections · {chapter.readTime}
                  </p>
                </div>
                <span className="text-lg font-bold text-amber shrink-0 ml-3">{progress}%</span>
              </div>
              <ProgressBar value={progress} />
              <p className="text-xs text-text-muted mt-2">{progress}% complete</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Playbook() {
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [selectedSection, setSelectedSection] = useState(null)
  const [navigateToSection, setNavigateToSection] = useState(null)

  const handleSelectChapter = (chapter) => {
    setSelectedChapter(chapter)
    setSelectedSection(null)
  }

  const handleSelectSection = (section) => {
    setSelectedSection(section)
  }

  const handleBackFromSection = (nextSection) => {
    if (nextSection && nextSection.id) {
      setSelectedSection(nextSection)
    } else {
      setSelectedSection(null)
    }
  }

  const handleBackFromChapter = () => {
    setSelectedChapter(null)
    setSelectedSection(null)
  }

  return (
    <Layout title="Playbook" subtitle="Your founder guide to building in Saudi Arabia">
      <div className="p-6">
        {!selectedChapter && (
          <ChaptersGrid onSelectChapter={handleSelectChapter} />
        )}
        {selectedChapter && !selectedSection && (
          <ChapterView
            chapter={selectedChapter}
            onBack={handleBackFromChapter}
            onSelectSection={handleSelectSection}
          />
        )}
        {selectedChapter && selectedSection && (
          <SectionView
            section={selectedSection}
            chapter={selectedChapter}
            onBack={handleBackFromSection}
          />
        )}
      </div>
    </Layout>
  )
}
