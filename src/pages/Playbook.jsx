import { useState, useEffect, useRef } from 'react'
import {
  Search, BookOpen, Bookmark, BookmarkCheck, Share2, Clock, Sparkles,
  ArrowLeft, ThumbsUp, ThumbsDown,
} from 'lucide-react'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'

const AUTHOR_MAP = {
  Hiring:      { name: 'Rania Faisal',    role: 'Talent Lead',         initials: 'RF', bio: 'Rania leads talent strategy and hiring for all Sanabil Studio ventures.' },
  Finance:     { name: 'Ahmed Saleh',     role: 'Finance Lead',        initials: 'AS', bio: 'Ahmed oversees financial modeling, cash flow management, and fundraising support.' },
  Legal:       { name: 'Nora Khalid',     role: 'Legal Lead',          initials: 'NK', bio: 'Nora advises on corporate structure, compliance, and governance across the portfolio.' },
  GTM:         { name: 'Sarah Al-Rashid', role: 'Portfolio Manager',   initials: 'SA', bio: 'Sarah drives go-to-market strategy and investor relations across the portfolio.' },
  Board:       { name: 'Sarah Al-Rashid', role: 'Portfolio Manager',   initials: 'SA', bio: 'Sarah drives go-to-market strategy and investor relations across the portfolio.' },
  PR:          { name: 'Sarah Al-Rashid', role: 'Portfolio Manager',   initials: 'SA', bio: 'Sarah drives go-to-market strategy and investor relations across the portfolio.' },
  Fundraising: { name: 'Sarah Al-Rashid', role: 'Portfolio Manager',   initials: 'SA', bio: 'Sarah drives go-to-market strategy and investor relations across the portfolio.' },
  Operations:  { name: 'Omar Hassan',     role: 'Venture Architect',   initials: 'OH', bio: 'Omar designs operational systems and processes that help ventures scale efficiently.' },
}

const ARTICLES = [
  {
    id: 'a-1',
    topic: 'Hiring',
    title: 'Hiring Your First Product Manager',
    description: 'How to assess PM candidates, structure your hiring process, and avoid common mistakes when building your first product team.',
    readTime: 6,
    content: `## What to Look For
Most early-stage founders wait too long to hire a PM — and then hire the wrong one. The most common mistake is treating the role as a project manager or a requirements writer. A strong first PM at an early-stage company is part strategist, part analyst, and part operator. They own the "why" behind the roadmap, align engineering and design around priorities, and translate customer insight into product decisions. If your candidate can't articulate why they killed a feature or what data changed their mind about a bet, they're not the right person.

## Structuring the Interview Process
When structuring your interview process, run at least three signal-generating conversations: a product sense interview where you give them a real problem from your business and ask them to think through it out loud; a metrics interview where you ask them how they would measure success for a feature you've recently shipped; and a cross-functional scenario where you describe a disagreement between engineering and design and ask how they'd resolve it. Reference checks are non-negotiable — call the references yourself, don't delegate to HR. Ask specifically: "What would this person be the last person you'd call for?" The answer tells you more than anything else.

## Finding Talent in the GCC
In Saudi Arabia and the GCC, the PM talent pool is thin but growing fast. You'll often find strong candidates who have been doing PM work inside large enterprises or consultancies without the title. Look beyond job titles on LinkedIn — filter instead for people who have shipped products to real users, managed backlogs, and worked directly with engineers. University of business plus computer science combinations from KAUST, KSU, or top international schools are worth prioritizing, but so are self-taught operators who've built side projects. Compensation benchmarks in Riyadh for a first PM hire typically run SAR 18,000–30,000/month depending on experience and equity tolerance.

## The Onboarding Plan
One thing founders consistently underinvest in is the onboarding plan. Before your PM starts, write down the three decisions you want them to own in their first 90 days. Share your product strategy document, your customer research, and your current roadmap with explicit annotations about what's decided and what's still open. Give them a project in week one — not a fake exercise, a real one. The best PMs will push back on your assumptions within the first month. If they don't, you may have hired someone who optimizes for approval rather than outcomes.`,
  },
  {
    id: 'a-2',
    topic: 'Board',
    title: 'Running a Board Meeting in Saudi Arabia',
    description: 'What Companies Law requires, how to prepare board materials, and how to run meetings that actually help your business.',
    readTime: 7,
    content: `## Legal Requirements
Saudi Companies Law (as amended in 2022) requires that a closed joint-stock company hold at least one board meeting per year, though most institutional investors will push for quarterly meetings in your shareholders' agreement. Notice requirements for a board meeting are typically 10–21 days depending on your articles of association, and meetings require quorum — usually a majority of directors. Minutes must be signed by all attending directors and retained for at least 10 years.

## Preparing Your Board Pack
The materials you send before the meeting matter as much as the meeting itself. Aim to circulate a board pack at least five days in advance. A solid board pack includes: a one-page CEO letter covering what happened since the last meeting, what changed in your thinking, and what you need from the board; a P&L versus budget (actual and forecast); key operating metrics with month-over-month and year-over-year trends; a brief update on hiring; and a clear ask or decision item for each agenda point. Do not send a 40-slide deck with no narrative thread.

## Running the Meeting
Structure the meeting itself in three segments. The first 20–30 minutes should be a consent agenda — approving prior minutes, routine corporate items that don't require discussion. The middle hour should go to your two or three most important strategic questions. Frame these as genuine questions, not updates you want applause for. The best board conversations happen when founders say "I don't know what to do here" and share the real tradeoffs. The final 15–20 minutes should be a closed session among independent directors.

## Cultural Considerations
One cultural consideration specific to the Saudi context: board members in the Kingdom often have significant other commitments — family offices, government roles, or multiple portfolio companies — that make last-minute rescheduling common. Build in flexibility on timing but hold firm on the pre-read requirement.`,
  },
  {
    id: 'a-3',
    topic: 'GTM',
    title: 'Market Research Methods for B2B Founders',
    description: 'The fastest ways to validate your market size, talk to customers, and turn raw data into a compelling story for investors.',
    readTime: 8,
    content: `## Start With Conversations
The most expensive mistake in B2B market research is building a survey before you've done 20 open-ended discovery calls. Surveys are confirmation tools, not discovery tools. Start with conversations. In your first 20 customer interviews, your only job is to understand the problem as the customer experiences it — not to pitch your solution. Use the Mom Test framework: ask about the past, not the hypothetical future.

## TAM/SAM/SOM Calculations
For TAM/SAM/SOM calculations in a Saudi B2B context, avoid the top-down approach of citing McKinsey reports on the fintech or logistics market size and then claiming 1%. Investors discount this heavily. Instead, build a bottoms-up model: count the identifiable buyers in your category, estimate their average contract value based on your early pricing conversations, and show the realistic subset you can reach in 18–24 months.

## Competitive Research
Competitive research deserves more rigor than most founders apply. Go beyond reading competitor websites. Create free trials and use the products yourself. Hire a mystery shopper. Talk to customers who chose a competitor over you — these are the most valuable conversations you can have.

## Turning Research Into a Story
When it comes to turning research into a story for investors, the goal is not to show that the market is large — it's to show that you understand the market better than anyone else in the room.`,
  },
  {
    id: 'a-4',
    topic: 'PR',
    title: 'Finding and Briefing a PR Agency in KSA',
    description: 'When to hire a PR agency, what to look for, how to run a pitch process, and what good agency briefs look like.',
    readTime: 6,
    content: `## When to Hire
Most early-stage founders hire a PR agency too early, driven by the belief that press coverage equals growth. It rarely does for B2B companies, and even for consumer companies it's a lagging indicator of product-market fit rather than a driver of it. The right time to hire a PR agency is when you have a repeatable story — a funding announcement, a significant customer win, a product launch with genuine news value.

## Running the Pitch Process
When you're ready to run a pitch process, shortlist three to five agencies and give them all the same brief. In the Saudi market, look for agencies that have placed stories in Arab News, Argaam, Aleqtisadiah, and Misk Innovation, as well as English-language regional outlets like WIRED Middle East, Sifted Arabia, or Wamda.

## Writing the Brief
A good agency brief is one to two pages and covers six things: who you are and what you do in plain language; the news hook or story you want to tell; your target audience; the top two or three publications or journalists you care most about; what success looks like; and what you will and won't say publicly.

## Managing the Relationship
Managing the agency relationship well is the part most founders underestimate. Assign one internal person as the agency owner. Set a monthly check-in with a written agenda. Require a media coverage tracker updated weekly.`,
  },
  {
    id: 'a-5',
    topic: 'Fundraising',
    title: 'Term Sheet Basics: What Founders Need to Know',
    description: 'A plain-English guide to the key clauses in a Saudi and GCC term sheet, and what you should push back on.',
    readTime: 9,
    content: `## What Is a Term Sheet
A term sheet is a non-binding document that outlines the key economic and governance terms of an investment. Most founders sign them too quickly, overwhelmed by the excitement of a commitment and underestimating how much the details matter when things go wrong — or right.

## Economic Terms
On the economic side, understand the difference between pre-money and post-money valuation — it determines exactly what percentage of your company you're giving up. Liquidation preference is the clause founders most often misread: a 1x non-participating preferred means investors get their money back before common shareholders in a downside exit, which is standard and fair.

## Governance Terms
On the governance side, pay close attention to board composition. A typical early-stage term sheet gives investors one board seat. Watch out for provisions that give investors veto rights over operational decisions — approving the annual budget, hiring or firing executives above a certain salary level, entering new markets.

## The Saudi Context
In the Saudi context, term sheets are increasingly following US VC conventions due to the influence of funds like STV, Sanabil, and Wa'ed, as well as international co-investors. Always have a local corporate lawyer review these, not just an international one.`,
  },
  {
    id: 'a-6',
    topic: 'GTM',
    title: 'Building Your First Sales Pipeline',
    description: 'How to build a repeatable pipeline from scratch using simple tools, discovery calls, and qualification frameworks.',
    readTime: 7,
    content: `## Why It Must Be Founder-Led
The most important thing to understand about building your first sales pipeline is that it must be founder-led. Not because you're the cheapest salesperson, but because the early sales process is still a discovery process — you're learning which customers convert and why, what objections keep appearing, and where your messaging breaks down.

## Setting Up Your Pipeline
Start with a simple three-column pipeline in a shared spreadsheet or a lightweight CRM like Notion, HubSpot's free tier, or Pipedrive. The columns that matter at early stage are: Prospect (identified but not yet contacted), Active (in conversation), and Closed (won or lost with a reason recorded).

## Discovery and Qualification
For discovery calls, use a modified MEDDIC qualification framework: understand the Metrics the customer cares about, the Economic Buyer, the Decision Criteria, the Decision Process, the Identified Pain, and the Champion.

## Outbound in Saudi Arabia
Outbound prospecting in the Saudi market works differently than in the US. Cold emails have very low open rates. WhatsApp outreach — if you have a warm connection or mutual introduction — converts significantly better.`,
  },
  {
    id: 'a-7',
    topic: 'Operations',
    title: 'Setting Up OKRs for an Early-Stage Startup',
    description: 'A practical guide to writing OKRs that actually drive focus — not just fill a spreadsheet.',
    readTime: 7,
    content: `## What OKRs Are Actually For
OKRs — Objectives and Key Results — are one of the most misunderstood frameworks in startup operations. In most companies that adopt them, OKRs become a performance review tool or a status update ritual rather than what they're actually designed to do: force difficult conversations about priorities and create alignment on what matters most this quarter.

## Keep It Company-Level
For a startup of fewer than 20 people, you should have company-level OKRs only — not department OKRs, not individual OKRs. You don't need three layers of goal-setting; you need one clear answer to "what are the three things that would make this quarter a success?"

## The Cadence
The cadence matters as much as the content. Set OKRs at the start of each quarter in a two-hour working session with your full leadership team. Not asynchronously, not via a shared doc — in a room, with a facilitator.

## Common Failure Modes
A common failure mode for Saudi startups adopting OKRs is over-formality in early rollout. Teams spend weeks debating the exact wording of objectives, use complex scoring tools, and run training sessions. Keep it simple: a shared Google Sheet with the three objectives, nine key results, and a weekly update column is sufficient for the first two quarters.`,
  },
  {
    id: 'a-8',
    topic: 'Finance',
    title: 'Managing Cash Flow as an Early-Stage Founder',
    description: 'How to build a 13-week cash flow model, manage burn, and avoid the runway surprises that kill startups.',
    readTime: 8,
    content: `## Cash Flow vs. Profit
Cash flow is not the same as profit. You can have a profitable month on paper and still run out of cash if your customers pay 90 days after invoicing. As a founder, your primary financial instrument is not the P&L — it's the 13-week cash flow forecast, which shows, week by week, exactly how much cash is coming in, how much is going out, and what your ending balance will be.

## Building the 13-Week Model
To build a 13-week model, start with your opening bank balance. Then list every cash inflow you expect — customer payments, investor tranches, grants — with the specific week they'll hit. Be conservative: if a customer says they'll pay in 30 days, model it at 45.

## Managing Burn Rate
Managing burn rate starts with understanding the difference between fixed and variable costs. Fixed costs — salaries, rent, insurance — accrue whether or not you have revenue. Variable costs — transaction fees, cloud infrastructure at scale, sales commissions — move with the business.

## Talking to Investors
Runway conversations with your board or investors should happen before they're urgent. A good rule of thumb: when you have six months of runway remaining, start preparing your next raise or your path to profitability.`,
  },
]

const TOPICS = ['All', 'Hiring', 'Finance', 'Fundraising', 'GTM', 'Legal', 'Operations', 'Board', 'PR']

const TOPIC_COLORS = {
  Hiring:      'bg-pulse-blue/10 text-pulse-blue',
  Finance:     'bg-pulse-green/10 text-pulse-green',
  Fundraising: 'bg-amber/10 text-amber',
  GTM:         'bg-pulse-blue/10 text-pulse-blue',
  Legal:       'bg-pulse-red/10 text-pulse-red',
  Operations:  'bg-bg-elevated text-text-muted',
  Board:       'bg-purple-500/10 text-purple-400',
  PR:          'bg-text-muted/10 text-text-muted',
}

function parseContent(content) {
  return content.split('\n\n').map(block => {
    const trimmed = block.trim()
    if (trimmed.startsWith('## ')) {
      return { type: 'heading', text: trimmed.slice(3).trim() }
    }
    return { type: 'paragraph', text: trimmed }
  }).filter(b => b.text)
}

function ArticleView({ article, onBack, bookmarks, onToggleBookmark, onShare, onNavigate, onReadArticle }) {
  const [progress, setProgress] = useState(0)
  const [helpful, setHelpful] = useState(null)
  const headingRefs = useRef({})

  const author = AUTHOR_MAP[article.topic] || AUTHOR_MAP.GTM
  const blocks = parseContent(article.content)
  const headings = blocks.filter(b => b.type === 'heading')
  const related = ARTICLES.filter(a => a.id !== article.id).slice(0, 3)
  const isBookmarked = bookmarks.has(article.id)

  useEffect(() => {
    const mainEl = document.querySelector('main')
    if (!mainEl) return
    mainEl.scrollTop = 0
    setProgress(0)
    setHelpful(null)

    function handleScroll() {
      const scrolled = mainEl.scrollTop
      const total = mainEl.scrollHeight - mainEl.clientHeight
      setProgress(total > 0 ? Math.round((scrolled / total) * 100) : 0)
    }

    mainEl.addEventListener('scroll', handleScroll, { passive: true })
    return () => mainEl.removeEventListener('scroll', handleScroll)
  }, [article.id])

  function scrollToHeading(text) {
    const el = headingRefs.current[text]
    if (!el) return
    const mainEl = document.querySelector('main')
    if (mainEl) {
      const offset = el.getBoundingClientRect().top - mainEl.getBoundingClientRect().top + mainEl.scrollTop - 24
      mainEl.scrollTo({ top: offset, behavior: 'smooth' })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* Reading progress bar — sticky at top of main */}
      <div className="sticky top-0 z-10 h-1 bg-border">
        <div
          className="h-full bg-amber transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Two-column layout */}
      <div className="flex gap-10 px-8 py-8 max-w-6xl mx-auto">

        {/* ── Left: Article content ── */}
        <div className="flex-1 min-w-0">

          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-text mb-7 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Playbook
          </button>

          {/* Topic badge */}
          <div className="mb-3">
            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${TOPIC_COLORS[article.topic] || 'bg-bg-elevated text-text-muted'}`}>
              {article.topic}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[32px] font-bold text-text leading-tight mb-6">
            {article.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-amber/15 border border-amber/30 flex items-center justify-center text-sm font-bold text-amber shrink-0">
              {author.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-text">Written by {author.name}</p>
              <p className="text-xs text-text-muted">{author.role} · Published March 1, 2026</p>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-3 py-4 border-t border-b border-border mb-8">
            <span className="flex items-center gap-1.5 text-sm text-text-muted">
              <Clock size={13} />
              {article.readTime} min read
            </span>
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={e => onShare(article, e)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-text-dim hover:text-text hover:bg-bg-elevated transition-colors"
                title="Share"
              >
                <Share2 size={14} />
              </button>
              <button
                onClick={e => onToggleBookmark(article.id, e)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${isBookmarked ? 'text-amber' : 'text-text-dim hover:text-amber hover:bg-bg-elevated'}`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              >
                {isBookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
              </button>
            </div>
          </div>

          {/* Article body */}
          <div className="space-y-5">
            {blocks.map((block, i) => {
              if (block.type === 'heading') {
                return (
                  <h2
                    key={i}
                    ref={el => { headingRefs.current[block.text] = el }}
                    className="text-[20px] font-bold text-text pt-4 scroll-mt-6"
                  >
                    {block.text}
                  </h2>
                )
              }
              return (
                <p key={i} className="text-[15px] leading-[1.8] text-[#374151]">
                  {block.text}
                </p>
              )
            })}
          </div>

          {/* Related articles at bottom */}
          <div className="mt-14 pt-8 border-t border-border">
            <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-4">Related Articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.slice(0, 2).map(a => (
                <button
                  key={a.id}
                  onClick={() => onNavigate(a)}
                  className="card text-left hover:border-amber/40 transition-colors group"
                >
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${TOPIC_COLORS[a.topic] || 'bg-bg-elevated text-text-muted'}`}>
                    {a.topic}
                  </span>
                  <p className="text-sm font-semibold text-text group-hover:text-amber transition-colors">{a.title}</p>
                  <p className="text-xs text-text-muted mt-1">{a.readTime} min read</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Sticky sidebar ── */}
        <div className="w-60 shrink-0 hidden lg:block">
          <div className="sticky top-8 space-y-6">

            {/* Table of Contents */}
            {headings.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-3">In This Article</p>
                <nav className="space-y-0.5">
                  {headings.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToHeading(h.text)}
                      className="w-full text-left text-[13px] text-text-muted hover:text-text transition-colors py-1.5 pl-3 border-l-2 border-transparent hover:border-amber leading-snug"
                    >
                      {h.text}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* About the Author */}
            <div className="card !p-4">
              <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-3">About the Author</p>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-amber/15 border border-amber/30 flex items-center justify-center text-xs font-bold text-amber shrink-0">
                  {author.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text">{author.name}</p>
                  <p className="text-xs text-text-muted mb-1.5">{author.role}</p>
                  <p className="text-xs text-text-dim leading-relaxed">{author.bio}</p>
                </div>
              </div>
            </div>

            {/* Was this helpful */}
            <div className="card !p-4">
              <p className="text-sm font-semibold text-text mb-3">Was this helpful?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setHelpful('yes')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-sm font-medium transition-colors ${helpful === 'yes' ? 'border-pulse-green/60 bg-pulse-green/10 text-pulse-green' : 'border-border text-text-muted hover:bg-bg-elevated'}`}
                >
                  <ThumbsUp size={13} />
                  Yes
                </button>
                <button
                  onClick={() => setHelpful('no')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-sm font-medium transition-colors ${helpful === 'no' ? 'border-pulse-red/60 bg-pulse-red/10 text-pulse-red' : 'border-border text-text-muted hover:bg-bg-elevated'}`}
                >
                  <ThumbsDown size={13} />
                  No
                </button>
              </div>
              {helpful && (
                <p className="text-xs text-text-muted mt-2.5 text-center">
                  {helpful === 'yes' ? 'Glad it helped!' : 'Thanks for the feedback.'}
                </p>
              )}
            </div>

            {/* More articles */}
            <div>
              <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest mb-3">More Articles</p>
              <div className="space-y-1">
                {related.map(a => (
                  <button
                    key={a.id}
                    onClick={() => onNavigate(a)}
                    className="w-full text-left px-2 py-2 rounded-lg hover:bg-bg-elevated transition-colors group"
                  >
                    <p className="text-[13px] text-text group-hover:text-amber transition-colors leading-snug">{a.title}</p>
                    <p className="text-xs text-text-dim mt-0.5">{a.readTime} min · {a.topic}</p>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default function Playbook() {
  const { addToast } = useApp()
  const [search, setSearch] = useState('')
  const [activeTopic, setActiveTopic] = useState('All')
  const [openArticle, setOpenArticle] = useState(null)
  const [bookmarks, setBookmarks] = useState(new Set())
  const [readHistory, setReadHistory] = useState(new Set())

  const filtered = ARTICLES.filter(a => {
    const matchesTopic = activeTopic === 'All' || a.topic === activeTopic
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
    return matchesTopic && matchesSearch
  })

  const savedArticles = ARTICLES.filter(a => bookmarks.has(a.id))
  const readTopics = new Set(ARTICLES.filter(a => readHistory.has(a.id)).map(a => a.topic))
  const recommended = ARTICLES.filter(a => !readTopics.has(a.topic) && !readHistory.has(a.id)).slice(0, 3)

  function toggleBookmark(id, e) {
    e.stopPropagation()
    setBookmarks(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id); addToast('Bookmark removed', 'info') }
      else { next.add(id); addToast('Saved to bookmarks', 'success') }
      return next
    })
  }

  function openArticleFn(article) {
    setOpenArticle(article)
    setReadHistory(prev => new Set([...prev, article.id]))
  }

  function handleShare(article, e) {
    e.stopPropagation()
    navigator.clipboard?.writeText(`${window.location.origin}/playbook#${article.id}`).catch(() => {})
    addToast('Link copied to clipboard', 'success')
  }

  function ArticleCard({ article }) {
    const isBookmarked = bookmarks.has(article.id)
    const isRead = readHistory.has(article.id)
    return (
      <div className={`card flex flex-col gap-3 relative group ${isRead ? 'opacity-80' : ''}`}>
        <div className="flex items-start justify-between gap-2">
          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium w-fit ${TOPIC_COLORS[article.topic] || 'bg-bg-elevated text-text-muted'}`}>
            {article.topic}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={e => handleShare(article, e)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-text-dim hover:text-text hover:bg-bg-elevated transition-colors opacity-0 group-hover:opacity-100"
              title="Share"
              aria-label="Share article"
            >
              <Share2 size={13} />
            </button>
            <button
              onClick={e => toggleBookmark(article.id, e)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${isBookmarked ? 'text-amber' : 'text-text-dim hover:text-amber hover:bg-bg-elevated opacity-0 group-hover:opacity-100'}`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            >
              {isBookmarked ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
            </button>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-text">{article.title}</h3>
        <p className="text-xs text-text-muted leading-relaxed flex-1">{article.description}</p>
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="flex items-center gap-1 text-xs text-text-dim">
            <Clock size={11} />
            {article.readTime} min read
          </span>
          {isRead && <span className="text-xs text-pulse-green font-medium">Read</span>}
        </div>
        <button
          onClick={() => openArticleFn(article)}
          className="btn-primary flex items-center gap-2 text-xs justify-center"
        >
          <BookOpen size={13} />
          {isRead ? 'Read Again' : 'Read'}
        </button>
      </div>
    )
  }

  return (
    <Layout title="Playbook" subtitle="Articles and guides for Saudi founders">
      {openArticle ? (
        <ArticleView
          article={openArticle}
          onBack={() => setOpenArticle(null)}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          onShare={handleShare}
          onNavigate={openArticleFn}
        />
      ) : (
        <div className="p-6 space-y-5">
          {/* Search bar */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-amber/60 focus:ring-2 focus:ring-amber/10 transition-all"
            />
          </div>

          {/* Topic filter */}
          <div className="flex flex-wrap gap-2">
            {TOPICS.map(topic => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                  activeTopic === topic
                    ? 'bg-amber text-white border-amber shadow-sm'
                    : 'bg-white border-border text-text-muted hover:text-text'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Saved Articles */}
          {savedArticles.length > 0 && !search && activeTopic === 'All' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookmarkCheck size={14} className="text-amber" />
                <p className="text-xs font-semibold text-text-dim uppercase tracking-widest">Saved Articles</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedArticles.map(article => <ArticleCard key={article.id} article={article} />)}
              </div>
            </div>
          )}

          {/* Recommended */}
          {recommended.length > 0 && !search && activeTopic === 'All' && readHistory.size > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-pulse-blue" />
                <p className="text-xs font-semibold text-text-dim uppercase tracking-widest">Recommended for You</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommended.map(article => <ArticleCard key={article.id} article={article} />)}
              </div>
            </div>
          )}

          {/* Reading history notice */}
          {readHistory.size > 0 && !search && activeTopic === 'All' && (
            <div className="flex items-center gap-2 px-3 py-2 bg-bg-elevated rounded-lg">
              <Clock size={13} className="text-text-dim" />
              <p className="text-xs text-text-muted">
                You've read <span className="font-semibold text-text">{readHistory.size}</span> of {ARTICLES.length} articles
              </p>
            </div>
          )}

          {/* All articles */}
          <div>
            {(search || activeTopic !== 'All' || readHistory.size > 0) && (
              <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-3">
                {search || activeTopic !== 'All' ? 'Search Results' : 'All Articles'}
              </p>
            )}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm font-medium text-text">No articles match your search.</p>
                <p className="text-xs text-text-muted mt-1">Try a different keyword or topic.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(article => <ArticleCard key={article.id} article={article} />)}
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}
