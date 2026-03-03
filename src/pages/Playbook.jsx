import { useState } from 'react'
import { Search, BookOpen } from 'lucide-react'
import Layout from '../components/Layout'
import SidePanel from '../components/SidePanel'

const ARTICLES = [
  {
    id: 'a-1',
    topic: 'Hiring',
    title: 'Hiring Your First Product Manager',
    description: 'How to assess PM candidates, structure your hiring process, and avoid common mistakes when building your first product team.',
    content: `Most early-stage founders wait too long to hire a PM — and then hire the wrong one. The most common mistake is treating the role as a project manager or a requirements writer. A strong first PM at an early-stage company is part strategist, part analyst, and part operator. They own the "why" behind the roadmap, align engineering and design around priorities, and translate customer insight into product decisions. If your candidate can't articulate why they killed a feature or what data changed their mind about a bet, they're not the right person.

When structuring your interview process, run at least three signal-generating conversations: a product sense interview where you give them a real problem from your business and ask them to think through it out loud; a metrics interview where you ask them how they would measure success for a feature you've recently shipped; and a cross-functional scenario where you describe a disagreement between engineering and design and ask how they'd resolve it. Reference checks are non-negotiable — call the references yourself, don't delegate to HR. Ask specifically: "What would this person be the last person you'd call for?" The answer tells you more than anything else.

In Saudi Arabia and the GCC, the PM talent pool is thin but growing fast. You'll often find strong candidates who have been doing PM work inside large enterprises or consultancies without the title. Look beyond job titles on LinkedIn — filter instead for people who have shipped products to real users, managed backlogs, and worked directly with engineers. University of business plus computer science combinations from KAUST, KSU, or top international schools are worth prioritizing, but so are self-taught operators who've built side projects. Compensation benchmarks in Riyadh for a first PM hire typically run SAR 18,000–30,000/month depending on experience and equity tolerance.

One thing founders consistently underinvest in is the onboarding plan. Before your PM starts, write down the three decisions you want them to own in their first 90 days. Share your product strategy document, your customer research, and your current roadmap with explicit annotations about what's decided and what's still open. Give them a project in week one — not a fake exercise, a real one. The best PMs will push back on your assumptions within the first month. If they don't, you may have hired someone who optimizes for approval rather than outcomes.`
  },
  {
    id: 'a-2',
    topic: 'Board',
    title: 'Running a Board Meeting in Saudi Arabia',
    description: 'What Companies Law requires, how to prepare board materials, and how to run meetings that actually help your business.',
    content: `Saudi Companies Law (as amended in 2022) requires that a closed joint-stock company hold at least one board meeting per year, though most institutional investors will push for quarterly meetings in your shareholders' agreement. Notice requirements for a board meeting are typically 10–21 days depending on your articles of association, and meetings require quorum — usually a majority of directors. Minutes must be signed by all attending directors and retained for at least 10 years. This sounds bureaucratic, but getting it right early matters: sloppy board governance is one of the most common red flags that comes up in Series B and later due diligence processes.

The materials you send before the meeting matter as much as the meeting itself. Aim to circulate a board pack at least five days in advance. A solid board pack includes: a one-page CEO letter covering what happened since the last meeting, what changed in your thinking, and what you need from the board; a P&L versus budget (actual and forecast); key operating metrics with month-over-month and year-over-year trends; a brief update on hiring; and a clear ask or decision item for each agenda point. Do not send a 40-slide deck with no narrative thread. Boards stop reading those after slide 12.

Structure the meeting itself in three segments. The first 20–30 minutes should be a consent agenda — approving prior minutes, routine corporate items that don't require discussion. The middle hour should go to your two or three most important strategic questions. Frame these as genuine questions, not updates you want applause for. The best board conversations happen when founders say "I don't know what to do here" and share the real tradeoffs. The final 15–20 minutes should be a closed session among independent directors, if you have them — standard governance practice that becomes expected as you scale.

One cultural consideration specific to the Saudi context: board members in the Kingdom often have significant other commitments — family offices, government roles, or multiple portfolio companies — that make last-minute rescheduling common. Build in flexibility on timing but hold firm on the pre-read requirement. A board meeting where no one has read the materials in advance is worse than no board meeting at all. If you have an independent director who consistently shows up unprepared, address it directly in a one-on-one before the next cycle. Good board hygiene is something you build early and compounds over time.`
  },
  {
    id: 'a-3',
    topic: 'GTM',
    title: 'Market Research Methods for B2B Founders',
    description: 'The fastest ways to validate your market size, talk to customers, and turn raw data into a compelling story for investors.',
    content: `The most expensive mistake in B2B market research is building a survey before you've done 20 open-ended discovery calls. Surveys are confirmation tools, not discovery tools. Start with conversations. In your first 20 customer interviews, your only job is to understand the problem as the customer experiences it — not to pitch your solution. Use the Mom Test framework: ask about the past, not the hypothetical future. "Walk me through the last time you had to do X" will tell you more than "Would you pay for a product that does Y?" Keep your question list to three or four prompts and spend 80% of the time listening.

For TAM/SAM/SOM calculations in a Saudi B2B context, avoid the top-down approach of citing McKinsey reports on the fintech or logistics market size and then claiming 1%. Investors discount this heavily. Instead, build a bottoms-up model: count the identifiable buyers in your category (use LinkedIn, Chamber of Commerce directories, ZATCA registrations, Monsha'at databases), estimate their average contract value based on your early pricing conversations, and show the realistic subset you can reach in 18–24 months given your current team and channels. This approach is more defensible and forces you to understand your market at a structural level.

Competitive research deserves more rigor than most founders apply. Go beyond reading competitor websites. Create free trials and use the products yourself. Hire a mystery shopper. Talk to customers who chose a competitor over you — these are the most valuable conversations you can have. Ask specifically what tipped the decision, what they wish were different, and under what circumstances they'd consider switching. Build a simple feature and positioning matrix, but keep it private — sharing a competitive analysis deck in fundraising often signals insecurity about your own differentiation.

When it comes to turning research into a story for investors, the goal is not to show that the market is large — it's to show that you understand the market better than anyone else in the room. The founders who win fundraising rounds are the ones who can say "here's something counterintuitive that we believe about this market that most people get wrong, and here's the evidence." Your research should fuel a point of view, not just validate an opportunity. In the GCC context, showing that you've talked to procurement leads at Saudi Aramco, SABIC, or major banks carries significant weight — it signals both distribution access and credibility.`
  },
  {
    id: 'a-4',
    topic: 'PR',
    title: 'Finding and Briefing a PR Agency in KSA',
    description: 'When to hire a PR agency, what to look for, how to run a pitch process, and what good agency briefs look like.',
    content: `Most early-stage founders hire a PR agency too early, driven by the belief that press coverage equals growth. It rarely does for B2B companies, and even for consumer companies it's a lagging indicator of product-market fit rather than a driver of it. The right time to hire a PR agency is when you have a repeatable story — a funding announcement, a significant customer win, a product launch with genuine news value — and enough internal bandwidth to manage the relationship properly. If you're pre-Series A and your team has fewer than 10 people, a freelance PR consultant is almost always a better use of money than a retainer with a full agency.

When you're ready to run a pitch process, shortlist three to five agencies and give them all the same brief. In the Saudi market, look for agencies that have placed stories in Arab News, Argaam, Aleqtisadiah, and Misk Innovation, as well as English-language regional outlets like WIRED Middle East, Sifted Arabia, or Wamda. Ask each agency to walk you through a specific campaign they ran for a startup client, including how they measured success. Red flags: agencies that promise exclusives to multiple outlets simultaneously, agencies that rely entirely on paid placements, and agencies that can't name the journalists they have genuine relationships with.

A good agency brief is one to two pages and covers six things: who you are and what you do in plain language; the news hook or story you want to tell; your target audience (not "everyone" — be specific about the job title and sector of the person you want to read this); the top two or three publications or journalists you care most about; what success looks like (coverage, tone, reach); and what you will and won't say publicly. The brief exists to protect you as much as to guide the agency. If they pitch a story that contradicts the brief, you have a document to point to.

Managing the agency relationship well is the part most founders underestimate. Assign one internal person as the agency owner — this should not be the CEO unless the company is very small. Set a monthly check-in with a written agenda. Require a media coverage tracker updated weekly. Review and approve all press releases and spokesperson quotes before they go out — never let an agency speak on your behalf without final sign-off. If you're six months into a retainer and haven't generated meaningful coverage, have a direct conversation before renewing. The best agency relationships are partnerships; the worst are expensive subscriptions with no accountability.`
  },
  {
    id: 'a-5',
    topic: 'Fundraising',
    title: 'Term Sheet Basics: What Founders Need to Know',
    description: 'A plain-English guide to the key clauses in a Saudi and GCC term sheet, and what you should push back on.',
    content: `A term sheet is a non-binding document that outlines the key economic and governance terms of an investment. Most founders sign them too quickly, overwhelmed by the excitement of a commitment and underestimating how much the details matter when things go wrong — or right. The two most consequential sections in any term sheet are the valuation and economic terms (how the money flows) and the control and governance terms (who gets to make decisions). Both deserve careful attention, ideally with a lawyer who has done at least 10–15 startup financing transactions in the GCC.

On the economic side, understand the difference between pre-money and post-money valuation — it determines exactly what percentage of your company you're giving up. Liquidation preference is the clause founders most often misread: a 1x non-participating preferred means investors get their money back before common shareholders in a downside exit, which is standard and fair. A 2x participating preferred means investors get twice their money back and then also participate in the remaining proceeds as if they owned equity — this is aggressive and worth pushing back on at any stage. Anti-dilution provisions (specifically weighted average versus full ratchet) determine what happens to investor ownership if you raise a down round; full ratchet is almost always investor-friendly to an unreasonable degree.

On the governance side, pay close attention to board composition. A typical early-stage term sheet gives investors one board seat. Watch out for provisions that give investors veto rights over operational decisions — approving the annual budget, hiring or firing executives above a certain salary level, entering new markets, or approving any contract above a threshold value. Some investor control is reasonable; excessive veto rights turn every decision into a negotiation. Pro-rata rights (the right to invest in future rounds to maintain ownership percentage) are standard and fair. Information rights (the right to receive quarterly financials and an annual audit) are also standard.

In the Saudi context, term sheets are increasingly following US VC conventions due to the influence of funds like STV, Sanabil, and Wa'ed, as well as international co-investors. However, you will sometimes encounter structures that mix GCC and conventional VC terms in awkward ways — convertible murabaha instruments, for instance, or structures designed to be Sharia-compliant that have unusual economic effects. Always have a local corporate lawyer review these, not just an international one. The cost of a proper legal review (typically SAR 10,000–30,000 for a seed round) is trivial compared to the cost of a misunderstood clause five years later at exit.`
  },
  {
    id: 'a-6',
    topic: 'GTM',
    title: 'Building Your First Sales Pipeline',
    description: 'How to build a repeatable pipeline from scratch using simple tools, discovery calls, and qualification frameworks.',
    content: `The most important thing to understand about building your first sales pipeline is that it must be founder-led. Not because you're the cheapest salesperson, but because the early sales process is still a discovery process — you're learning which customers convert and why, what objections keep appearing, and where your messaging breaks down. A hired sales rep following a script will run the motions without generating the institutional learning you need to build a repeatable system. Commit to personally running your first 30–50 sales conversations before you hire anyone into a revenue role.

Start with a simple three-column pipeline in a shared spreadsheet or a lightweight CRM like Notion, HubSpot's free tier, or Pipedrive. The columns that matter at early stage are: Prospect (identified but not yet contacted), Active (in conversation), and Closed (won or lost with a reason recorded). Do not build a 12-stage pipeline — it adds administrative burden without insight. The only metrics you should track in month one are number of first calls booked, number of proposals sent, and number of deals closed. Everything else is noise until you have at least 20 closed deals to analyze.

For discovery calls, use a modified MEDDIC qualification framework: understand the Metrics the customer cares about, the Economic Buyer (the person who controls the budget, not just the person you're talking to), the Decision Criteria (how they'll evaluate options), the Decision Process (who else needs to say yes and when), the Identified Pain (what is actually broken today), and the Champion (the internal person who wants you to win). In B2B sales in Saudi Arabia, the champion relationship is often the most important variable — buying decisions frequently require internal political alignment that happens outside of your formal pitch process, and a strong champion navigates that on your behalf.

Outbound prospecting in the Saudi market works differently than in the US. Cold emails have very low open rates. WhatsApp outreach — if you have a warm connection or mutual introduction — converts significantly better. LinkedIn messages from a founder account with a clear, specific ask perform well in the tech and finance sectors. The highest-converting channel is almost always a warm introduction from a mutual contact. Invest heavily in your network map: identify the 50 companies you most want as customers, then work backward to find who in your network knows someone there. The introduction request is a skill worth developing — keep it to three sentences, make the ask specific, and give the introducer easy language to forward.`
  },
  {
    id: 'a-7',
    topic: 'Operations',
    title: 'Setting Up OKRs for an Early-Stage Startup',
    description: 'A practical guide to writing OKRs that actually drive focus — not just fill a spreadsheet.',
    content: `OKRs — Objectives and Key Results — are one of the most misunderstood frameworks in startup operations. In most companies that adopt them, OKRs become a performance review tool or a status update ritual rather than what they're actually designed to do: force difficult conversations about priorities and create alignment on what matters most this quarter. If you're setting OKRs and everyone feels good about them, you're probably doing it wrong. Good OKRs should create a small amount of productive tension — they should require you to explicitly deprioritize things that feel important.

For a startup of fewer than 20 people, you should have company-level OKRs only — not department OKRs, not individual OKRs. You don't need three layers of goal-setting; you need one clear answer to "what are the three things that would make this quarter a success?" Objectives should be qualitative, memorable, and directional — something like "Establish us as the default choice for SME payroll in Riyadh" rather than "Grow revenue." Key Results should be quantitative, binary, and time-bound — "Signed 15 new SME customers by March 31" rather than "Increase customer count." Each Objective should have two to four Key Results. More than that and you're hedging, not committing.

The cadence matters as much as the content. Set OKRs at the start of each quarter in a two-hour working session with your full leadership team. Not asynchronously, not via a shared doc — in a room, with a facilitator. The most valuable part of the session is the debate about what doesn't make the list. Mid-quarter, run a 30-minute scoring session: rate each Key Result green (on track), yellow (at risk), or red (off track) and document one specific action to move each red to yellow. At end of quarter, score each Key Result on a 0–1.0 scale and do a short retrospective. The retrospective is where the actual learning happens.

A common failure mode for Saudi startups adopting OKRs is over-formality in early rollout. Teams spend weeks debating the exact wording of objectives, use complex scoring tools, and run training sessions — and by the time the quarter starts, everyone is exhausted and disengaged. Keep it simple: a shared Google Sheet with the three objectives, nine key results, and a weekly update column is sufficient for the first two quarters. The goal is to build the muscle of honest, regular check-ins against a shared north star. You can layer sophistication once the habit is established. The best OKR systems look embarrassingly simple from the outside.`
  },
  {
    id: 'a-8',
    topic: 'Finance',
    title: 'Managing Cash Flow as an Early-Stage Founder',
    description: 'How to build a 13-week cash flow model, manage burn, and avoid the runway surprises that kill startups.',
    content: `Cash flow is not the same as profit. You can have a profitable month on paper and still run out of cash if your customers pay 90 days after invoicing. This distinction kills early-stage companies more than almost any other financial misunderstanding. As a founder, your primary financial instrument is not the P&L — it's the 13-week cash flow forecast, which shows, week by week, exactly how much cash is coming in, how much is going out, and what your ending balance will be. Build this model on your first day of operations and update it every Friday. If you don't know where every riyal is going for the next three months, you don't have financial control.

To build a 13-week model, start with your opening bank balance. Then list every cash inflow you expect — customer payments, investor tranches, grants — with the specific week they'll hit. Be conservative: if a customer says they'll pay in 30 days, model it at 45. Then list every cash outflow — salaries, rent, vendor payments, VAT, GOSI contributions, software subscriptions — also mapped to the specific week they're due. GOSI (General Organization for Social Insurance) and VAT payments in Saudi Arabia have specific due dates that founders often miss, leading to penalties that compound quickly. Your ending balance each week is the only number that matters: if it goes negative at any point, you have a crisis that needs to be solved before it arrives.

Managing burn rate starts with understanding the difference between fixed and variable costs. Fixed costs — salaries, rent, insurance — accrue whether or not you have revenue. Variable costs — transaction fees, cloud infrastructure at scale, sales commissions — move with the business. In a cash crunch, you can cut variable costs quickly but fixed costs require notice periods and contractual obligations. In Saudi Arabia, the Nitaqat system creates additional labor cost considerations: employing Saudi nationals at the required ratio affects your total comp stack and should be modeled carefully as you grow past 10 employees. Build your first hire plan with an explicit line for Nitaqat compliance costs.

Runway conversations with your board or investors should happen before they're urgent. A good rule of thumb: when you have six months of runway remaining, start preparing your next raise or your path to profitability. By three months, you should already be in active fundraising conversations or executing a cost reduction plan. The founders who run out of cash almost always had warning signs 90–120 days earlier that they rationalized away. If your 13-week model shows a problem in week 10, that problem is today's problem — not week 10's problem. Build the model, look at it honestly, and act on what it tells you before the situation becomes an emergency.`
  },
]

const TOPICS = ['All', 'Hiring', 'Finance', 'Fundraising', 'GTM', 'Legal', 'Operations', 'Board', 'PR']

const TOPIC_COLORS = {
  Hiring: 'bg-pulse-blue/10 text-pulse-blue',
  Finance: 'bg-pulse-green/10 text-pulse-green',
  Fundraising: 'bg-amber/10 text-amber',
  GTM: 'bg-pulse-blue/10 text-pulse-blue',
  Legal: 'bg-pulse-red/10 text-pulse-red',
  Operations: 'bg-bg-elevated text-text-muted',
  Board: 'bg-purple-500/10 text-purple-400',
  PR: 'bg-pulse-orange/10 text-pulse-orange',
}

export default function Playbook() {
  const [search, setSearch] = useState('')
  const [activeTopic, setActiveTopic] = useState('All')
  const [openArticle, setOpenArticle] = useState(null)

  const filtered = ARTICLES.filter(a => {
    const matchesTopic = activeTopic === 'All' || a.topic === activeTopic
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
    return matchesTopic && matchesSearch
  })

  return (
    <Layout title="Playbook" subtitle="Articles and guides for Saudi founders">
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

        {/* Topic filter buttons */}
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

        {/* Article grid or empty state */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm font-medium text-text">No articles match your search.</p>
            <p className="text-xs text-text-muted mt-1">Try a different keyword or topic.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(article => (
              <div key={article.id} className="card flex flex-col gap-3">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium w-fit ${TOPIC_COLORS[article.topic]}`}>
                  {article.topic}
                </span>
                <h3 className="text-sm font-semibold text-text">{article.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed flex-1">{article.description}</p>
                <button
                  onClick={() => setOpenArticle(article)}
                  className="btn-primary flex items-center gap-2 text-xs justify-center mt-auto"
                >
                  <BookOpen size={13} />
                  Read
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article side panel */}
      <SidePanel
        isOpen={!!openArticle}
        onClose={() => setOpenArticle(null)}
        title={openArticle?.title || ''}
        width="w-[560px]"
      >
        {openArticle && (
          <div className="px-6 py-6 space-y-4">
            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${TOPIC_COLORS[openArticle.topic]}`}>
              {openArticle.topic}
            </span>
            <div className="space-y-4">
              {openArticle.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-sm text-text-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
      </SidePanel>
    </Layout>
  )
}
