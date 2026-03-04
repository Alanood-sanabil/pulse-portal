export const venture = {
  name: 'Tradepay',
  initials: 'TP',
  description: 'B2B embedded payments infrastructure for Saudi SMEs — enabling instant supplier payments, invoice financing, and working capital management through a unified API.',
  stage: 'Spin-out Phase 1',
  accessUrl: null,
  pm: { name: 'Sarah Al-Rashid', role: 'Portfolio Manager', email: 'sarah@sanabilstudio.com', initials: 'SA' },
  va: { name: 'Omar Hassan', role: 'Venture Architect', email: 'omar@sanabilstudio.com', initials: 'OH' },
  founder: { name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', email: 'mustafa@tradepay.sa', initials: 'MA' },
}

export const teamMembers = [
  { id: 'tm-1', name: 'Sarah Al-Rashid', role: 'Portfolio Manager', initials: 'SA', email: 'sarah@sanabilstudio.com', bio: 'Leads portfolio strategy and founder support. Former VC at STV with focus on fintech and SaaS.', channel: 'tradepay-pm-sarah', slackHandle: 'sarah.alrashid' },
  { id: 'tm-2', name: 'Omar Hassan', role: 'Venture Architect', initials: 'OH', email: 'omar@sanabilstudio.com', bio: 'Product and technical strategy advisor. Previously built two fintech startups from 0→1.', channel: 'tradepay-general', slackHandle: 'omar.hassan' },
  { id: 'tm-3', name: 'Layla Mahmoud', role: 'Product Manager', initials: 'LM', email: 'layla@sanabilstudio.com', bio: 'Embedded product support for Tradepay. Focus on roadmap, user research, and go-to-market.', channel: 'tradepay-general', slackHandle: 'layla.mahmoud' },
]

export const ssuTeam = [
  { id: 'ssu-1', name: 'Nora Khalid', role: 'Legal Counsel', initials: 'NK', email: 'legal@sanabilstudio.com', category: 'Legal', channel: 'tradepay-ssu-legal', slackHandle: 'nora.khalid' },
  { id: 'ssu-2', name: 'Ahmed Saleh', role: 'Finance Lead', initials: 'AS', email: 'finance@sanabilstudio.com', category: 'Finance', channel: 'tradepay-ssu-finance', slackHandle: 'ahmed.saleh' },
  { id: 'ssu-3', name: 'Rania Faisal', role: 'Talent Partner', initials: 'RF', email: 'talent@sanabilstudio.com', category: 'Talent', channel: 'tradepay-ssu-talent', slackHandle: 'rania.faisal' },
]

export const tasks = [
  {
    id: 'task-1',
    title: 'Submit Commercial Registration documents',
    description: 'Submit all required documents to MISA for commercial registration.',
    steps: [
      'Gather all shareholder ID copies and notarized authorization letters',
      'Complete the MISA online application form at misa.gov.sa',
      'Upload the Memorandum of Association and Articles of Association',
      'Pay the registration fee via Sadad or bank transfer',
      'Submit and track application status in the MISA portal',
    ],
    owner: 'Studio',
    ownerType: 'studio',
    assignedTo: { name: 'Nora Khalid', role: 'SSU Legal', initials: 'NK' },
    dueDate: 'Jan 15, 2026',
    category: 'Legal',
    phase: 1,
    overdueDays: null,
    history: [
      { initials: 'NK', name: 'Nora Khalid', role: 'SSU Legal', action: 'created this task and assigned to SSU Legal', date: 'Jan 8 2026 at 9:00 AM' },
      { initials: 'NK', name: 'Nora Khalid', role: 'SSU Legal', action: 'changed status to In Progress', date: 'Jan 10 2026 at 10:30 AM' },
      { initials: 'NK', name: 'Nora Khalid', role: 'SSU Legal', action: 'submitted documents to MISA portal', date: 'Jan 14 2026 at 2:15 PM' },
      { initials: 'NK', name: 'Nora Khalid', role: 'SSU Legal', action: 'changed status to Done — CR issued', date: 'Jan 18 2026 at 11:00 AM' },
    ],
  },
  {
    id: 'task-2',
    title: 'Sign Shareholder Agreement',
    description: 'Review and sign the shareholder agreement prepared by legal team.',
    steps: [
      'Review the draft SHA sent by legal team',
      'Highlight any clauses requiring clarification',
      'Schedule call with Nora Khalid to discuss amendments',
      'Obtain co-founder signatures on final version',
      'Submit signed copy to SSU Legal',
    ],
    owner: 'Shared',
    ownerType: 'shared',
    subTasks: [
      { id: 'sub-2-1', label: 'Review SHA draft and flag any amendments needed', person: { name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', initials: 'MA' }, isFounder: true },
      { id: 'sub-2-2', label: 'Finalize SHA terms and prepare signature-ready document', person: { name: 'Nora Khalid', role: 'SSU Legal', initials: 'NK' }, isFounder: false },
      { id: 'sub-2-3', label: 'Sign and submit finalized SHA to entity registry', person: { name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', initials: 'MA' }, isFounder: true },
    ],
    dueDate: 'Jan 20, 2026',
    category: 'Legal',
    phase: 1,
    overdueDays: null,
    history: [
      { initials: 'NK', name: 'Nora Khalid', role: 'SSU Legal', action: 'sent SHA draft for founder review', date: 'Jan 15 2026 at 3:00 PM' },
      { initials: 'MA', name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', action: 'reviewed SHA and flagged 2 amendment requests', date: 'Jan 17 2026 at 10:00 AM' },
      { initials: 'NK', name: 'Nora Khalid', role: 'SSU Legal', action: 'updated SHA with amendments and marked sub-task done', date: 'Jan 18 2026 at 4:30 PM' },
      { initials: 'MA', name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', action: 'signed and submitted final SHA', date: 'Jan 20 2026 at 9:45 AM' },
    ],
  },
  {
    id: 'task-3',
    title: 'Complete bank account opening',
    description: 'Open a corporate bank account with an approved Saudi bank.',
    steps: [
      'Choose between Al-Rajhi Bank, SNB, or Riyad Bank (SSU recommended)',
      'Prepare KYB documents: CR, SHA, board resolution, IDs',
      'Book appointment with business banking team',
      'Attend in-person verification meeting',
      'Follow up within 7 business days for account activation',
    ],
    owner: 'Studio',
    ownerType: 'studio',
    assignedTo: { name: 'Ahmed Saleh', role: 'SSU Finance', initials: 'AS' },
    dueDate: 'Feb 10, 2026',
    category: 'Finance',
    phase: 1,
    overdueDays: null,
    history: [
      { initials: 'AS', name: 'Ahmed Saleh', role: 'SSU Finance', action: 'initiated bank account application with SNB', date: 'Jan 25 2026 at 11:00 AM' },
      { initials: 'AS', name: 'Ahmed Saleh', role: 'SSU Finance', action: 'changed status to In Progress — KYB docs submitted', date: 'Feb 2 2026 at 2:00 PM' },
      { initials: 'AS', name: 'Ahmed Saleh', role: 'SSU Finance', action: 'changed status to Waiting — pending bank verification', date: 'Feb 5 2026 at 9:30 AM' },
    ],
  },
  {
    id: 'task-4',
    title: 'Submit ZATCA VAT registration',
    description: 'Register for VAT with the Zakat, Tax and Customs Authority.',
    steps: [
      'Log in to ZATCA Fatoora portal with CR credentials',
      'Complete the VAT registration form',
      'Upload CR certificate and bank account details',
      'Submit and note the VAT registration number',
      'Share VAT number with SSU Finance team',
    ],
    owner: 'Founder',
    ownerType: 'founder',
    dueDate: 'Jan 30, 2026',
    category: 'Finance',
    phase: 1,
    overdueDays: 31,
    history: [
      { initials: 'MA', name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', action: 'started ZATCA registration form', date: 'Jan 28 2026 at 10:00 AM' },
      { initials: 'MA', name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', action: 'task became overdue — registration still pending', date: 'Jan 30 2026 at 11:59 PM' },
    ],
  },
  {
    id: 'task-5',
    title: 'Hire first full-time employee (CTO)',
    description: 'Complete hiring process for the CTO role.',
    steps: [
      'Finalize job description with Omar Hassan',
      'Post on LinkedIn, Bayt, and Wellfound',
      'Review applicants with SSU Talent team',
      'Conduct 3-round interviews (technical + culture + founders)',
      'Extend offer and negotiate terms with Talent support',
      'Submit onboarding paperwork to HR',
    ],
    owner: 'Founder',
    ownerType: 'founder',
    dueDate: 'Feb 1, 2026',
    category: 'Talent',
    phase: 1,
    overdueDays: 29,
    history: [
      { initials: 'MA', name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', action: 'posted CTO job description on LinkedIn and Bayt', date: 'Jan 22 2026 at 9:00 AM' },
      { initials: 'MA', name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', action: 'shortlisted 3 finalists from 47 applicants', date: 'Jan 28 2026 at 4:00 PM' },
      { initials: 'MA', name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', action: 'task became overdue — final interviews in progress', date: 'Feb 1 2026 at 11:59 PM' },
    ],
  },
  {
    id: 'task-6',
    title: 'Set up accounting software (Qoyod)',
    description: 'Configure Qoyod accounting system with chart of accounts.',
    steps: [
      'Create Qoyod account using SSU voucher code',
      'Set up chart of accounts per SSU Finance template',
      'Connect bank account via open banking API',
      'Import initial capital and formation costs',
      'Share access credentials with SSU Finance',
    ],
    owner: 'Studio',
    ownerType: 'studio',
    assignedTo: { name: 'Ahmed Saleh', role: 'SSU Finance', initials: 'AS' },
    dueDate: 'Feb 15, 2026',
    category: 'Finance',
    phase: 1,
    overdueDays: null,
    history: [
      { initials: 'AS', name: 'Ahmed Saleh', role: 'SSU Finance', action: 'created Qoyod account using SSU enterprise code', date: 'Feb 3 2026 at 10:00 AM' },
      { initials: 'AS', name: 'Ahmed Saleh', role: 'SSU Finance', action: 'configured chart of accounts and initial capital entries', date: 'Feb 10 2026 at 3:30 PM' },
    ],
  },
  {
    id: 'task-7',
    title: 'Complete IP assignment agreement',
    description: 'Ensure all pre-formation IP is assigned to the new entity.',
    steps: [
      'List all IP assets (code, designs, trademarks) created pre-formation',
      'Review IP assignment template from SSU Legal',
      'Complete and sign the IP assignment agreement',
      'File with SAIP (Saudi Authority for Intellectual Property) if applicable',
      'Submit signed copy to SSU Legal vault',
    ],
    owner: 'Shared',
    ownerType: 'shared',
    subTasks: [
      { id: 'sub-7-1', label: 'List all pre-formation IP assets and complete assignment form', person: { name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', initials: 'MA' }, isFounder: true },
      { id: 'sub-7-2', label: 'Review and countersign IP assignment agreement', person: { name: 'Nora Khalid', role: 'SSU Legal', initials: 'NK' }, isFounder: false },
      { id: 'sub-7-3', label: 'File signed agreement with SAIP and store in legal vault', person: { name: 'Nora Khalid', role: 'SSU Legal', initials: 'NK' }, isFounder: false },
    ],
    dueDate: 'Feb 20, 2026',
    category: 'Legal',
    phase: 1,
    overdueDays: null,
    history: [
      { initials: 'NK', name: 'Nora Khalid', role: 'SSU Legal', action: 'sent IP assignment template to founder', date: 'Feb 12 2026 at 9:00 AM' },
    ],
  },
  {
    id: 'task-8',
    title: 'Set up HR onboarding process',
    description: 'Establish standard HR onboarding process for new hires.',
    steps: [
      'Review SSU HR onboarding template',
      'Customize offer letter and employment contract templates',
      'Set up payroll in Qoyod HR module',
      'Configure GOSI registration for Saudi employees',
      'Create employee handbook based on SSU template',
    ],
    owner: 'Studio',
    ownerType: 'studio',
    assignedTo: { name: 'Rayan Al-Ghamdi', role: 'SSU Talent & Operations', initials: 'RA' },
    dueDate: 'Mar 1, 2026',
    category: 'Operations',
    phase: 1,
    overdueDays: null,
    history: [
      { initials: 'RA', name: 'Rayan Al-Ghamdi', role: 'SSU Talent & Operations', action: 'began customizing HR onboarding templates for Tradepay', date: 'Feb 15 2026 at 11:00 AM' },
      { initials: 'RA', name: 'Rayan Al-Ghamdi', role: 'SSU Talent & Operations', action: 'changed status to In Progress — GOSI setup underway', date: 'Feb 22 2026 at 2:00 PM' },
    ],
  },
  {
    id: 'task-9',
    title: 'Define 90-day product roadmap',
    description: 'Finalize and align on the product roadmap for the first 90 days.',
    steps: [
      'Complete competitive analysis of MADA, HyperPay, PayTabs',
      'Define MVP feature set with Layla (Product Manager)',
      'Build roadmap in Linear or Notion using SSU template',
      'Present roadmap to Sarah Al-Rashid for PM review',
      'Publish roadmap to Venture Context for SSU visibility',
    ],
    owner: 'Founder',
    ownerType: 'founder',
    dueDate: 'Feb 25, 2026',
    category: 'Operations',
    phase: 1,
    overdueDays: null,
    history: [
      { initials: 'MA', name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', action: 'started competitive analysis of payment providers', date: 'Feb 5 2026 at 9:00 AM' },
      { initials: 'MA', name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', action: 'aligned MVP feature set with Layla Mahmoud', date: 'Feb 15 2026 at 3:00 PM' },
    ],
  },
  {
    id: 'task-10',
    title: 'Recruit advisory board member',
    description: 'Identify and onboard at least one strategic advisor.',
    steps: [
      'Define advisor profile (fintech, B2B SaaS, Saudi market)',
      'Source candidates via SSU network and personal connections',
      'Conduct introductory meetings with top 5 candidates',
      'Draft and sign advisor agreement via SSU Legal',
      'Announce advisor appointment',
    ],
    owner: 'Founder',
    ownerType: 'founder',
    dueDate: 'Mar 15, 2026',
    category: 'Talent',
    phase: 1,
    overdueDays: null,
    history: [
      { initials: 'MA', name: 'Mustafa Al-Amin', role: 'CEO & Co-Founder', action: 'defined advisor profile — fintech & KSA market focus', date: 'Feb 20 2026 at 10:00 AM' },
    ],
  },
  {
    id: 'task-11',
    title: 'Submit Phase 1 completion report',
    description: 'Complete and submit the Phase 1 evaluation report to SSU.',
    steps: [
      'Download Phase 1 completion report template from Document Library',
      'Complete all required sections with evidence',
      'Attach supporting documents (CR, SHA, bank statement, etc.)',
      'Submit for Sarah Al-Rashid review',
      'Address any feedback within 5 business days',
    ],
    owner: 'Founder',
    ownerType: 'founder',
    dueDate: 'Mar 31, 2026',
    category: 'Operations',
    phase: 1,
    overdueDays: null,
    history: [
      { initials: 'SA', name: 'Sarah Al-Rashid', role: 'Portfolio Manager', action: 'shared Phase 1 completion report template', date: 'Mar 1 2026 at 9:00 AM' },
    ],
  },
]

export const journeyEntries = [
  {
    id: 'je-3',
    weekLabel: 'Week of Feb 10 – Feb 16, 2026',
    weekStart: '2026-02-10',
    focus: 'Trying to get the corporate bank account open — it has been the main blocker this week. Everything else is dependent on having the account active before we can move on payroll and vendor payments.',
    achievements: 'Got the company stamp from the notary and submitted the initial KYB package to SNB. Also completed the board resolution document that was missing from the first submission.',
    blockers: 'SNB rejected our KYB application citing a missing certified translation of the shareholder agreement. We have been going back and forth since Tuesday. The clock is ticking on payroll setup.',
    numbers: 'No revenue yet. Burn is coming out of founder personal funds for now. Team: just me and one part-time contractor.',
    milestone: 'Nothing major this week — it felt like a week of obstacles more than wins. But getting the KYB package in was still progress even if it got bounced back.',
    savedAt: 'Feb 16, 2026',
  },
  {
    id: 'je-2',
    weekLabel: 'Week of Feb 17 – Feb 23, 2026',
    weekStart: '2026-02-17',
    focus: 'Getting the legal foundation properly in place — specifically the commercial registration approval from MISA and locking in the shareholder agreement signatures with the co-founder.',
    achievements: 'MISA approved the commercial registration. CR certificate received on Feb 18. This was a huge unlock — we can now open bank accounts, sign contracts, and officially operate. Also got both co-founder signatures on the SHA.',
    blockers: 'Ministry portal was down for most of Tuesday which delayed the CR certificate download by two days. Minor but frustrating.',
    numbers: 'Still pre-revenue. Formation costs so far around SAR 18,000 including notary, translations, and MISA fees.',
    milestone: 'Getting the CR was the biggest moment so far. Tradepay is now a real, registered company. I took a screenshot of the certificate and it still feels surreal.',
    savedAt: 'Feb 23, 2026',
  },
  {
    id: 'je-1',
    weekLabel: 'Week of Feb 24 – Mar 2, 2026',
    weekStart: '2026-02-24',
    focus: 'Wrapping up the IP assignment agreement and holding the first formal team meeting with the full early crew — me, the contractor, and a new part-time product advisor who came on board this week.',
    achievements: 'IP assignment agreement signed and submitted to the legal vault. First team meeting went well — set a clear 60-day focus: get the MVP payment flow working and land 2 pilot customers. Also finalized the product advisor terms.',
    blockers: 'Trying to onboard the product advisor into Qoyod for expense tracking but the SSU finance setup is not fully done yet. Small delay.',
    numbers: 'MRR: SAR 0 still. Burn: ~SAR 22,000 this month. Team now at 3 (me + contractor + advisor). Pipeline: 2 warm conversations going.',
    milestone: 'First real team meeting. Felt like the venture actually started for real this week. The IP transfer also means everything I built before Tradepay was registered now officially belongs to the company.',
    savedAt: 'Mar 2, 2026',
  },
]

export const tasksByCategory = {
  Legal: tasks.filter(t => t.category === 'Legal'),
  Finance: tasks.filter(t => t.category === 'Finance'),
  Operations: tasks.filter(t => t.category === 'Operations'),
  Talent: tasks.filter(t => t.category === 'Talent'),
}

export const recentActivity = [
  { id: 'act-1', type: 'task', text: 'Marked "Submit Commercial Registration documents" as Done', time: '2 hours ago', icon: 'check' },
  { id: 'act-2', type: 'request', text: 'Request REQ-2026-044 responded to by SSU Legal team', time: '5 hours ago', icon: 'reply' },
  { id: 'act-3', type: 'document', text: 'Employment Contract — CTO updated to v3 by Omar Hassan', time: '1 day ago', icon: 'file' },
  { id: 'act-4', type: 'milestone', text: 'Milestone "First Hire" flagged as At Risk by Sarah Al-Rashid', time: '2 days ago', icon: 'flag' },
  { id: 'act-5', type: 'kpi', text: 'Weekly update submitted for Week of Feb 24', time: '4 days ago', icon: 'chart' },
]

export const notifications = [
  { id: 'n-1', type: 'task', title: 'Task overdue: ZATCA VAT registration', description: 'This task is now 31 days overdue. Action required.', time: '2 hours ago', read: false, route: '/onboarding' },
  { id: 'n-2', type: 'milestone', title: 'Milestone at risk: First Hire', description: 'Company Formation was planned for Feb 1, 2026 and is now at risk.', time: '1 day ago', read: false, route: '/milestones' },
  { id: 'n-3', type: 'request', title: 'Request REQ-2026-044 updated', description: 'SSU Legal has responded to your help request about employment contracts.', time: '2 days ago', read: false, route: '/request-help' },
  { id: 'n-4', type: 'updates', title: 'Reminder: Weekly update due', description: 'Submit your weekly update for the week of Mar 1, 2026.', time: '3 days ago', read: false, route: '/kpi-dashboard' },
  { id: 'n-5', type: 'task', title: 'Phase 1 completion due in 30 days', description: 'You have 30 days to complete all Phase 1 tasks before evaluation.', time: '5 days ago', read: true, route: '/onboarding' },
]

export const studioServices = [
  {
    id: 'ss-1', name: 'Legal & Compliance', icon: 'Scale', description: 'Entity formation, contract review, regulatory guidance for KSA market.',
    sla: '3–5 business days', contact: 'Khaled Al-Otaibi, Legal Counsel', category: 'Legal',
    article: `SSU Legal provides end-to-end legal support for all Sanabil Studio portfolio ventures. Our team handles everything from commercial registration (CR) and Memorandum of Association (AoA) drafting to shareholder agreements, employment contracts, and MISA fast-track filings. All legal work is done in-house by our Saudi-qualified counsel team with deep experience in the KSA Companies Law (2022 edition) and the new Foreign Investment Law amendments.

For fintech ventures specifically, we provide regulatory mapping against SAMA's Open Banking framework, BNPL licensing requirements, and the Saudi Central Bank's Regulatory Sandbox process. We have supported 12 previous Sanabil portfolio companies through their regulatory submissions and can fast-track pre-application advisory sessions with SAMA through our existing relationship.

All engagement starts with a kick-off session within 3 business days of your request. Scope is confirmed upfront, and you'll always know what we're working on and when it will be delivered. Urgent matters (court deadlines, regulatory filing windows) are prioritized on the same business day. Reach out via Request Help and mark the category as Legal.`,
    links: [
      { label: 'MISA Foreign Investment Guide (2025)', url: '#' },
      { label: 'SAMA Open Banking Regulatory Framework', url: '#' },
      { label: 'KSA Companies Law — Official Text', url: '#' },
      { label: 'Saudi Central Bank Sandbox Application Portal', url: '#' },
    ],
  },
  {
    id: 'ss-2', name: 'Finance & Accounting', icon: 'DollarSign', description: 'Financial modeling, accounting setup, audit prep, and tax compliance.',
    sla: '2–3 business days', contact: 'Nora Faisal, Finance Lead', category: 'Finance',
    article: `SSU Finance provides comprehensive financial support from Day 1. Our team helps you set up your chart of accounts, configure Qoyod (our recommended accounting platform, available at 50% off via the Partner Perks tab), and establish monthly reporting cadences that align with IFRS standards. We prepare board-ready financials every quarter and can support ZATCA e-invoicing compliance, which is mandatory for all Saudi companies.

For early-stage ventures, we build your financial model in the first month — including 18-month cash flow projections, unit economics analysis, and scenario planning. We run monthly finance reviews on the last Thursday of each month to align on burn rate, runway, and upcoming funding needs. These sessions are 30–45 minutes and can be joined by your lead investor or board observer if appropriate.

Our finance team also manages the relationship with your external auditor (required for CR renewal), coordinates with GAZT for VAT filings, and can prepare investor-grade data rooms for fundraising rounds. Nora Faisal leads all finance engagements and has prior experience at Big 4 firms in Riyadh.`,
    links: [
      { label: 'ZATCA E-Invoicing Portal', url: '#' },
      { label: 'Qoyod Setup Guide for Sanabil Ventures', url: '#' },
      { label: 'IFRS for SMEs — SOCPA Reference', url: '#' },
    ],
  },
  {
    id: 'ss-3', name: 'Talent & Recruiting', icon: 'UserSearch', description: 'Hiring support, job descriptions, candidate sourcing, and HR setup.',
    sla: '5–7 business days', contact: 'Rayan Al-Ghamdi, Talent Partner', category: 'Talent',
    article: `The SSU Talent team helps portfolio ventures build their founding teams and early hires. We support job description writing, posting on premium job boards (LinkedIn, Bayt, Wellfound), candidate screening, and interview coordination. For senior hires (CTO, CFO, Head of Sales), we run structured executive search processes with a shortlist typically ready within 3 weeks of kick-off.

We have a proprietary candidate database of 400+ pre-vetted Saudi tech and business talent built over 3 years of running studio search processes. This database is continuously updated and includes passive candidates who are not actively searching job boards. For your most critical hires, this network is your biggest advantage over going to a traditional recruiter.

Rayan Al-Ghamdi leads talent for all Sanabil ventures and will be your primary point of contact. He runs weekly candidate update calls during active searches. We also support employment contract drafting (in coordination with the Legal team) and onboarding checklists to ensure new hires are set up correctly under KSA Labour Law from day one.`,
    links: [
      { label: 'SSU Talent Intake Form', url: '#' },
      { label: 'Saudi Labour Law Guide for Startups', url: '#' },
      { label: 'KSA Salary Benchmark Report 2025 (Tech)', url: '#' },
    ],
  },
  {
    id: 'ss-4', name: 'Product Design', icon: 'Palette', description: 'UI/UX design, brand identity, user research, and design systems.',
    sla: '3–5 business days', contact: 'Layla Mahmoud, Product Manager', category: 'Operations',
    article: `SSU Product Design supports ventures with world-class design across product, brand, and marketing. Our design team uses Figma as the primary tool and delivers work in structured 2-week sprints aligned with your development cycles. We can take a concept from user research brief to final hi-fidelity prototype — ready for developer handoff — within 4–6 weeks depending on scope.

For early-stage ventures, the first engagement is typically a product strategy workshop where we map your user journeys, define your core use case, and establish a design language (colours, typography, component library) that can scale with your product. This workshop is run as a half-day session with your founding team and produces a Figma starter kit and UX brief.

Layla Mahmoud leads product design engagements and has shipped products used by millions of users across fintech, marketplace, and SaaS contexts in the GCC. She is also your embedded Portfolio Manager and can join your weekly team stand-ups to ensure design is not a bottleneck at any stage of development.`,
    links: [
      { label: 'SSU Figma Design System Template', url: '#' },
      { label: 'Product Design Brief Template', url: '#' },
      { label: 'GCC UX Research Panel Access', url: '#' },
    ],
  },
  {
    id: 'ss-5', name: 'Tech Infrastructure', icon: 'Server', description: 'Cloud setup, DevOps, security review, and architecture guidance.',
    sla: '2–4 business days', contact: 'Omar Hassan, Venture Architect', category: 'Operations',
    article: `Omar Hassan provides technical architecture guidance and infrastructure setup for all portfolio ventures. For fintech ventures like Tradepay, this includes secure cloud architecture design on AWS (Bahrain region, me-south-1), DevSecOps pipeline setup using GitHub Actions, containerization with Docker and ECS, and PCI-DSS compliance scoping for payment processing environments.

The first engagement is a 2-hour architecture review where we assess your current stack (or design one from scratch), identify security and scalability risks, and produce a written architecture recommendation document. This document can be shared with your CTO candidate as a technical brief or with your lead investor as part of diligence. We also perform quarterly security reviews to ensure your posture is appropriate for your stage and data sensitivity.

Omar has built infrastructure for 8 Sanabil portfolio companies and can activate the AWS Activate credits ($100K, available in Partner Perks) for qualified ventures within 24 hours. He also maintains relationships with Lean Technologies for open banking API integration and can make introductions for KSA payment rails setup.`,
    links: [
      { label: 'AWS Bahrain Region Setup Guide', url: '#' },
      { label: 'Lean Technologies Open Banking API Docs', url: '#' },
      { label: 'PCI-DSS Scoping Tool for Fintech', url: '#' },
      { label: 'DevSecOps Runbook Template', url: '#' },
    ],
  },
  {
    id: 'ss-6', name: 'Market Research', icon: 'LineChart', description: 'Market sizing, competitive intelligence, and customer discovery support.',
    sla: '5–7 business days', contact: 'Sarah Al-Rashid, Portfolio Manager', category: 'Operations',
    article: `The SSU research team provides market intelligence to help you make data-driven product and go-to-market decisions. We have access to premium databases including SCAICT reports, Euromonitor, PitchBook GCC deal flow data, and SAMA's financial sector publications. Custom research requests are turned around in 5–7 business days with a structured output document ready to embed in your investor deck or board materials.

For most early-stage ventures, we run a market sizing workshop in month 1 to establish your TAM, SAM, and SOM with defensible methodology. This workshop uses a combination of top-down (SCAICT data) and bottom-up (customer discovery) approaches and produces a 1-page market size summary that can be updated quarterly as your real-world data improves the estimates.

We also run competitive intelligence briefs on request — mapping direct and indirect competitors, their pricing models, funding history, and positioning. These briefs are used by founders for product differentiation decisions and by the portfolio team for investment thesis validation. Sarah Al-Rashid leads market research engagements and can be reached via the Request Help system.`,
    links: [
      { label: 'SCAICT Digital Economy Report 2025', url: '#' },
      { label: 'Euromonitor Saudi Arabia Country Report', url: '#' },
      { label: 'PitchBook GCC Startup Deal Flow H2 2025', url: '#' },
    ],
  },
  {
    id: 'ss-7', name: 'PR & Communications', icon: 'Megaphone', description: 'Media relations, content strategy, thought leadership, and press releases.',
    sla: '7–10 business days', contact: 'Sarah Al-Rashid, Portfolio Manager', category: 'Operations',
    article: `SSU's communications team helps portfolio ventures build their brand presence in the Saudi and regional startup ecosystem. We have established relationships with key media outlets including Arab News, Saudi Gazette, Wamda, Magnitt, and Sifted, and can place well-crafted stories at the right time in your company's journey. For most ventures, this means securing first press at product launch and again at fundraising announcement.

PR strategy begins with a messaging workshop where we define your company's narrative, key messages, and spokesperson training points. This workshop is held before any public announcements and ensures your founding team is aligned on how to talk about the company to media, investors, and potential customers. We also prepare a press kit (company backgrounder, founder bios, product screenshots, usage data) that can be activated at short notice.

For ongoing communications, we support monthly thought leadership content (LinkedIn articles, conference speaking submissions, podcast pitches) that builds the founder's personal brand alongside the company. A strong founder profile accelerates hiring, fundraising, and customer trust in the GCC market more than in most global markets. Sarah Al-Rashid manages all PR relationships and can fast-track introductions based on story timing.`,
    links: [
      { label: 'Magnitt Saudi Arabia Startup Database', url: '#' },
      { label: 'Wamda Editorial Guidelines', url: '#' },
      { label: 'SSU Press Kit Template (Figma)', url: '#' },
    ],
  },
  {
    id: 'ss-8', name: 'Investor Relations', icon: 'TrendingUp', description: 'Fundraising prep, investor introductions, pitch coaching, and data room setup.',
    sla: '5–7 business days', contact: 'Sarah Al-Rashid, Portfolio Manager', category: 'Operations',
    article: `Sarah Al-Rashid leads investor relations support for all portfolio ventures. SSU has deep connections with 40+ active investors in the Saudi and GCC ecosystem, including family offices (Al-Faisaliah Group, Kingdom Holding), VCs (STV, Sanabil Investments, Outliers Venture Capital), and corporate venture arms (STC Ventures, Aramco Ventures). Introductions are made selectively based on fit — we do not blast your deck to a list.

Fundraising preparation starts 4–6 months before you plan to raise. The standard package includes: pitch deck review and refinement (we've seen 200+ decks and know what GCC investors look for), financial model validation, data room setup (using Notion or Carta), and a structured investor outreach pipeline with 15–20 qualified targets per raise. We also run mock pitch sessions to prepare you for common investor questions on unit economics, competitive differentiation, and team gaps.

For post-term-sheet support, SSU Legal works in parallel to manage the due diligence process and flag any red-line issues in term sheet language. Our goal is to close your round with the right partner at the right valuation — not just the fastest yes. Sarah is available for weekly IR updates during active fundraising processes and can join investor calls when appropriate.`,
    links: [
      { label: 'STV Portfolio Application Process', url: '#' },
      { label: 'Sanabil Investments Venture Application', url: '#' },
      { label: 'GCC Term Sheet Red Lines — Founder Guide', url: '#' },
      { label: 'Carta Data Room Setup for KSA Companies', url: '#' },
    ],
  },
]

export const templates = [
  { id: 't-1', name: 'Shareholder Agreement Template', type: 'DOCX', category: 'Legal', updated: 'Feb 1, 2026', description: 'Standard SHA for 2-3 co-founder Saudi ventures. Covers vesting, drag-along, and tag-along rights.' },
  { id: 't-2', name: 'Employment Contract (KSA Labour Law)', type: 'DOCX', category: 'Legal', updated: 'Jan 15, 2026', description: 'Compliant employment contract template for Saudi and expatriate hires.' },
  { id: 't-3', name: 'NDA — Mutual', type: 'PDF', category: 'Legal', updated: 'Dec 10, 2025', description: 'Mutual non-disclosure agreement for use with potential partners and vendors.' },
  { id: 't-4', name: 'Financial Model — SaaS/Fintech', type: 'XLSX', category: 'Finance', updated: 'Feb 10, 2026', description: '5-year financial model with unit economics, cohort analysis, and investor metrics.' },
  { id: 't-5', name: 'Cap Table Template', type: 'XLSX', category: 'Finance', updated: 'Jan 8, 2026', description: 'Cap table with SAFEs, options pool, and dilution modeling across 3 funding rounds.' },
  { id: 't-6', name: 'Board Meeting Minutes Template', type: 'DOCX', category: 'Legal', updated: 'Nov 20, 2025', description: 'Standard board minutes template for Saudi companies under Companies Law.' },
  { id: 't-7', name: 'Investor Pitch Deck (SSU Standard)', type: 'PDF', category: 'Fundraising', updated: 'Feb 15, 2026', description: '12-slide pitch deck structure optimized for GCC investor expectations.' },
  { id: 't-8', name: 'Due Diligence Checklist', type: 'XLSX', category: 'Fundraising', updated: 'Jan 25, 2026', description: 'Comprehensive DD checklist covering legal, financial, technical, and commercial areas.' },
  { id: 't-9', name: 'Product Requirements Document', type: 'DOCX', category: 'Product', updated: 'Feb 5, 2026', description: 'PRD template with user stories, acceptance criteria, and technical requirements sections.' },
  { id: 't-10', name: 'Job Description Template Pack', type: 'DOCX', category: 'HR', updated: 'Feb 20, 2026', description: 'JD templates for CTO, Head of Sales, Finance Manager, and Product Manager roles.' },
  { id: 't-11', name: 'Weekly Update Report', type: 'DOCX', category: 'Operations', updated: 'Mar 1, 2026', description: 'Structured weekly update format used for Portfolio Manager reporting.' },
  { id: 't-12', name: 'Company Valuation Worksheet', type: 'XLSX', category: 'Finance', updated: 'Jan 30, 2026', description: 'Pre-money valuation worksheet using revenue multiples and comparable transactions.' },
]

export const partnerPerks = [
  {
    id: 'pp-1',
    partner: 'AWS Activate',
    logo: 'AWS',
    perkValue: '$100,000 in credits',
    description: '$100,000 in AWS cloud credits for qualifying Sanabil Studio portfolio companies. Includes startup support, architecture reviews, and dedicated technical account management.',
    category: 'Cloud',
    instructions: 'Use promo code SANABIL2026 at aws.amazon.com/activate. Provide your Sanabil Studio portfolio company email. Credits are valid for 24 months from activation. Contact Omar Hassan for the activation letter.',
  },
  {
    id: 'pp-2',
    partner: 'Clio Legal Software',
    logo: 'CL',
    perkValue: '6 months free',
    description: 'Free access to Clio Grow (client intake and legal CRM) for 6 months, then 40% off for 12 months. Ideal for tracking legal matters, contracts, and compliance workflows.',
    category: 'Legal Tools',
    instructions: 'Visit clio.com/partnerships and enter code SANABILKSA at checkout. Khaled Al-Otaibi from the SSU Legal team can provide a referral if needed to unlock additional features.',
  },
  {
    id: 'pp-3',
    partner: 'Regus Co-working Riyadh',
    logo: 'RG',
    perkValue: '3 months free',
    description: 'Three months of free hot-desking or private office access at the Regus King Fahd Road location in Riyadh. Perfect for early team meeting spaces and client visits.',
    category: 'Office Space',
    instructions: 'Email coworking@sanabilstudio.com with your company name and team size. Sarah Al-Rashid will coordinate directly with the Regus account manager to activate your membership within 2 business days.',
  },
  {
    id: 'pp-4',
    partner: 'Qoyod Accounting',
    logo: 'QY',
    perkValue: '12 months at 50% off',
    description: 'Qoyod is the recommended accounting software for Sanabil Studio portfolio companies in KSA. Get 50% off for your first year — ZATCA-compliant invoicing, payroll, and VAT filing built in.',
    category: 'Accounting',
    instructions: 'Sign up at qoyod.com and use promo code STUDIO50. Nora Faisal from the SSU Finance team is available for onboarding support and can set up your chart of accounts in the first session.',
  },
  {
    id: 'pp-5',
    partner: 'Bayzat HR Platform',
    logo: 'BZ',
    perkValue: '40% off annually',
    description: 'Bayzat is a GCC-native HR and payroll platform. Get 40% off your first annual subscription — covers automated payroll, leave management, and employee benefits suited for KSA Labour Law compliance.',
    category: 'HR Platform',
    instructions: 'Contact Bayzat at bayzat.com/partners and mention Sanabil Studio to unlock the discount. Rayan Al-Ghamdi from SSU Talent can assist with onboarding and configuration for your first hire.',
  },
  {
    id: 'pp-6',
    partner: 'Riyad Bank Fast Track',
    logo: 'RB',
    perkValue: '5-day account opening',
    description: 'Sanabil Studio has a partnership with Riyad Bank to fast-track business account opening for portfolio companies. Skip the standard 6–8 week queue and get a corporate account in as little as 5 business days.',
    category: 'Banking',
    instructions: 'Email banking@sanabilstudio.com with your commercial registration number and company name. Sarah Al-Rashid will connect you with the Riyad Bank relationship manager directly. Have your CR, AoA, and shareholder IDs ready.',
  },
]

export const playbookChapters = [
  {
    id: 'chapter-1',
    title: 'Studio Operating Model',
    sections: 6,
    readTime: '22 min',
    phase: 'Foundation',
    sectionList: [
      { id: 's-1-1', title: 'How Sanabil Studio Works', readTime: '4 min' },
      { id: 's-1-2', title: 'Your Studio Support Unit (SSU)', readTime: '3 min' },
      { id: 's-1-3', title: 'The Spin-out Phase Framework', readTime: '5 min' },
      { id: 's-1-4', title: 'Communication Protocols', readTime: '3 min' },
      { id: 's-1-5', title: 'Governance and Reporting Requirements', readTime: '4 min' },
      { id: 's-1-6', title: 'Getting Your First 30 Days Right', readTime: '3 min' },
    ],
  },
  {
    id: 'chapter-2',
    title: 'Building in Saudi Arabia',
    sections: 5,
    readTime: '18 min',
    phase: 'Foundation',
    sectionList: [
      { id: 's-2-1', title: 'Legal Entity Formation', readTime: '4 min' },
      { id: 's-2-2', title: 'KSA Regulatory Landscape', readTime: '4 min' },
      { id: 's-2-3', title: 'Saudi Market Entry Playbook', readTime: '4 min' },
      { id: 's-2-4', title: 'Hiring in KSA: Saudization and Labour Law', readTime: '3 min' },
      { id: 's-2-5', title: 'Culture, Relationships, and Business Norms', readTime: '3 min' },
    ],
  },
  {
    id: 'chapter-3',
    title: 'Product Development',
    sections: 4,
    readTime: '14 min',
    phase: 'Build',
    sectionList: [
      { id: 's-3-1', title: 'The 0→1 Product Playbook', readTime: '5 min' },
      { id: 's-3-2', title: 'Customer Discovery Framework', readTime: '3 min' },
      { id: 's-3-3', title: 'MVPs vs Prototypes vs Pilots', readTime: '3 min' },
      { id: 's-3-4', title: 'Engineering Velocity at Early Stage', readTime: '3 min' },
    ],
  },
  {
    id: 'chapter-4',
    title: 'Go-to-Market',
    sections: 5,
    readTime: '20 min',
    phase: 'Launch',
    sectionList: [
      { id: 's-4-1', title: 'GTM Strategy for B2B SaaS in Saudi', readTime: '5 min' },
      { id: 's-4-2', title: 'Sales Motion and Process', readTime: '4 min' },
      { id: 's-4-3', title: 'Pricing Strategy', readTime: '4 min' },
      { id: 's-4-4', title: 'Partnerships and Channel Strategy', readTime: '4 min' },
      { id: 's-4-5', title: 'Marketing on a Startup Budget', readTime: '3 min' },
    ],
  },
  {
    id: 'chapter-5',
    title: 'Fundraising & Investor Relations',
    sections: 4,
    readTime: '16 min',
    phase: 'Scale',
    sectionList: [
      { id: 's-5-1', title: 'GCC Fundraising Landscape', readTime: '4 min' },
      { id: 's-5-2', title: 'Preparing Your Seed Round', readTime: '5 min' },
      { id: 's-5-3', title: 'The Pitch: Structure and Narrative', readTime: '4 min' },
      { id: 's-5-4', title: 'Term Sheet Negotiation Basics', readTime: '3 min' },
    ],
  },
  {
    id: 'chapter-6',
    title: 'Scaling and Team Building',
    sections: 4,
    readTime: '15 min',
    phase: 'Scale',
    sectionList: [
      { id: 's-6-1', title: 'Hiring for Scale', readTime: '4 min' },
      { id: 's-6-2', title: 'Building a High-Performance Culture', readTime: '4 min' },
      { id: 's-6-3', title: 'Org Design for Early Stage', readTime: '4 min' },
      { id: 's-6-4', title: 'Managing Board and Investor Relationships', readTime: '3 min' },
    ],
  },
]

export const sectionContent = {
  's-1-1': {
    title: 'How Sanabil Studio Works',
    content: `# How Sanabil Studio Works

Sanabil Studio is a company builder — not an accelerator or a VC fund. We build ventures from scratch, combining proprietary deal flow and thesis-driven ideation with a dedicated Studio Support Unit (SSU) that provides hands-on operational support during the critical first 12–18 months.

## The Studio Model

Unlike traditional VC, we don't invest in existing companies — we create them. Our team identifies high-potential market opportunities through primary research and strategic thesis work, then partners with exceptional founders to build ventures that address those opportunities.

**What we bring to every venture:**
- Thesis validation and initial market research
- Legal entity formation support
- Seed capital (typically SAR 2–4M for Phase 1)
- A dedicated Studio Support Unit (SSU)
- Access to the Sanabil investor network
- Brand and design support
- Office space at Sanabil HQ in Riyadh

## Our Role vs Your Role

We are your co-builders, not your managers. You own the company and run the business. We provide the operational scaffolding so you can focus on customers, product, and team building.

Your success metrics are our success metrics. When Tradepay grows, the Studio grows. This alignment is intentional.

## The Phase Framework

We structure our support in three phases: Foundation (Months 1–3), Build (Months 4–9), and Scale (Months 10+). Each phase has specific milestones, deliverables, and support packages. Completing a phase unlocks additional support and potential follow-on capital.

Read more about this in the Spin-out Phase Framework section.`,
  },
  's-1-2': {
    title: 'Your Studio Support Unit (SSU)',
    content: `# Your Studio Support Unit (SSU)

The SSU is your operational backbone during the first phase of building Tradepay. Think of it as having a full operations team on day one — without the overhead.

## SSU Structure

Your SSU includes specialists across six functional areas:

**Legal** — Khaled Al-Otaibi handles all legal matters including entity formation, contract review, regulatory guidance, and IP protection. SLA: 3–5 business days for standard requests.

**Finance** — Nora Faisal supports financial modeling, accounting setup, monthly reporting, and tax compliance. Monthly finance reviews are scheduled on the last Thursday of each month.

**Talent** — Rayan Al-Ghamdi provides full-cycle recruitment support, HR infrastructure setup, and compensation benchmarking. SLA: 5–7 business days for new hiring requests.

**Product** — Layla Mahmoud is embedded as your Product Manager, supporting roadmap development, user research coordination, and sprint planning.

**Tech & Architecture** — Omar Hassan (your Venture Architect) provides technical guidance, architecture reviews, and infrastructure setup.

**Studio Relations** — Sarah Al-Rashid (your Portfolio Manager) is your primary point of contact and ensures you have everything you need to succeed.

## How to Work with SSU

Submit requests via the Request Help system in this portal. For urgent matters, flag your request as "Urgent" and Sarah will be notified immediately.

Weekly team syncs are every Monday at 10:00 AM. Block this time — it's your most important recurring meeting.`,
  },
  's-1-3': {
    title: 'The Spin-out Phase Framework',
    content: `# The Spin-out Phase Framework

Sanabil Studio structures venture support across three phases, each with specific objectives, milestones, and support packages.

## Phase 1: Foundation (Months 1–3)

**Objective:** Build the legal, operational, and team foundations to enable product development.

**Key milestones:**
- Legal entity registered and bank account opened
- Shareholder agreement and IP assignment completed
- First key hire (CTO or technical co-founder)
- 90-day product roadmap defined
- Financial model v1 completed

**Support included:** Full SSU access, office space, seed capital deployment, weekly PM check-ins.

**Unlock condition:** All 11 Phase 1 tasks completed and Phase 1 completion report submitted.

## Phase 2: Build (Months 4–9)

**Objective:** Build and launch the MVP, acquire first customers, and prove product-market fit signals.

**Key milestones:**
- MVP launched to first 5 pilot customers
- First SAR revenue received
- Product-market fit hypothesis validated (or pivoted)
- Series A preparation materials drafted

**Support included:** Reduced SSU hours (you should be self-sufficient by now), retained PM and Venture Architect access, intro to Series A investors.

## Phase 3: Scale (Months 10–18)

**Objective:** Scale the business with Series A capital, expand the team, and build a defensible market position.

**Key milestones:**
- Series A closed
- Team scaled to 15+ people
- MRR exceeds SAR 200,000
- Second market entered (UAE or Egypt)

**Support included:** Monthly PM check-ins, advisory board activation, follow-on capital consideration.`,
  },
}

export const ventureContextData = {
  'market-overview': {
    title: 'Market Overview',
    blocks: [
      {
        id: 'mo-1', title: 'B2B Payments Market in Saudi Arabia', tag: 'Market Size',
        content: `The Saudi B2B payments market represents a $4.2 billion total addressable market growing at 18% CAGR. SMEs — which represent 99.6% of businesses in KSA — currently rely on manual payment processes: cheques, wire transfers, and cash. The shift to digital B2B payments is accelerating under Vision 2030's digital economy agenda.

SAMA's open banking regulation (effective 2025) and the mandatory Fatoora e-invoicing rollout have created a structural forcing function for SME digitization. Tradepay's timing is aligned with this regulatory tailwind.

Key market segments:
• **Supplier payments:** $2.1B market, 35% CAGR
• **Invoice financing:** $1.4B market, 22% CAGR
• **Working capital management:** $700M market, 15% CAGR`,
      },
      {
        id: 'mo-2', title: 'Competitive Landscape', tag: 'Competitive Intel',
        content: `**Direct competitors:**
- Lean Technologies: Open banking API layer, $33M raised, primarily focused on bank account connectivity
- HyperPay: Payment gateway, established player but lacks B2B-specific features
- Tabby/Tamara: BNPL focused on consumer, not B2B

**Tradepay's differentiation:**
- First mover in embedded B2B payment flows (not just infrastructure)
- Invoice-native: payments tied to invoice lifecycle, not standalone transactions
- Working capital product bundled with payments — creates stickiness
- Saudi-first compliance: built around SAMA, ZATCA, and Fatoora from day one

**Indirect competition:** Traditional banks (SNB, Al-Rajhi) improving corporate banking apps but slow to innovate on SME-specific workflows.`,
      },
      {
        id: 'mo-3', title: 'Regulatory Environment', tag: 'Regulatory',
        content: `SAMA has positioned Saudi Arabia as a global fintech hub through its regulatory sandbox and open banking framework. Key regulations affecting Tradepay:

**Relevant regulations:**
- Open Banking Framework (2022): Mandates API access for third-party providers
- E-invoicing (Fatoora) Phase 2 (2025): Requires VAT invoices to be submitted via ZATCA — creates data layer Tradepay can leverage
- Payment Services Provider Regulations (2021): Defines licensing requirements for payment facilitators
- SAMA Fintech Sandbox: Fast-track regulatory approval pathway Tradepay should pursue

**Our recommendation:** Apply for SAMA Fintech Sandbox approval in Month 2. This provides regulatory cover while full PSP license is pursued (12–18 month process).`,
      },
    ],
  },
  'product-decisions': {
    title: 'Product Decisions',
    blocks: [
      {
        id: 'pd-1', title: 'MVP Scope Decision — Feb 2026', tag: 'Decision Log',
        content: `**Decision:** Narrow MVP scope to supplier payment flows only. Remove invoice financing from Phase 1 product.

**Context:** Original product vision included three modules: (1) Supplier Payments, (2) Invoice Financing, (3) Working Capital Dashboard. After customer discovery sessions with 12 target SMEs, we found that supplier payment automation is the most acute pain point with highest willingness to pay.

**Rationale:** Invoice financing requires balance sheet or bank partnership (complex, slow) while supplier payments can be built on top of open banking APIs (fast, scalable). Starting narrow allows us to ship in 8 weeks rather than 6 months.

**Owner:** Mustafa + Layla | **Date:** Feb 3, 2026 | **Status:** Final`,
      },
      {
        id: 'pd-2', title: 'Tech Stack Selection', tag: 'Architecture',
        content: `**Frontend:** Next.js 14 (App Router) — chosen for SSR performance and React ecosystem. Tailwind CSS for styling.

**Backend:** Node.js + Fastify on AWS ECS (containerized). Fastify chosen over Express for performance benchmarks (3x faster at high concurrency).

**Database:** PostgreSQL on RDS + Redis for session and rate limiting.

**Payments:** Lean Technologies for open banking connectivity. MADA network for card processing via direct acquiring.

**Infrastructure:** AWS Bahrain region (me-south-1) for data residency compliance. Terraform for IaC, GitHub Actions for CI/CD.

**Decision date:** Jan 28, 2026 | **Reviewed by:** Omar Hassan`,
      },
    ],
  },
  'key-decisions': {
    title: 'Key Decisions Log',
    blocks: [
      {
        id: 'kd-1', title: 'Entity Structure: LLC vs Closed Joint Stock', tag: 'Legal',
        content: `**Decision:** Register as a Limited Liability Company (LLC) rather than a Closed Joint Stock Company (CJSC).

**Rationale:** LLC is faster to register (2–3 weeks vs 6–8 weeks for CJSC), has fewer ongoing compliance requirements, and is more appropriate for pre-revenue stage. Can convert to CJSC when Series A requires it.

**Risk:** LLC limits share class flexibility. If seed investors require preferred shares, we may need to restructure. SSU Legal advises this risk is manageable given Saudi Corporate Law updates in 2023 that allow LLCs more flexibility.

**Date:** Jan 8, 2026 | **Owner:** Mustafa + Khaled Al-Otaibi`,
      },
      {
        id: 'kd-2', title: 'Banking Partner: Al-Rajhi vs SNB', tag: 'Finance',
        content: `**Decision:** Al-Rajhi Bank for primary corporate account.

**Rationale:** Al-Rajhi has significantly faster KYB processing for startups (2 weeks vs 6 weeks at SNB). Their digital banking app for businesses is superior. They also have an established fintech partnership program that Tradepay can leverage for future payment processing deals.

**Open item:** SNB may be needed as secondary account for corporate clients who require same-bank transfers.

**Date:** Jan 25, 2026 | **Owner:** Mustafa + Nora Faisal`,
      },
      {
        id: 'kd-3', title: 'SAMA Sandbox vs Full PSP License', tag: 'Regulatory',
        content: `**Decision:** Pursue SAMA Fintech Sandbox first, then full PSP license.

**Rationale:** Full PSP license requires 12–18 months and SAR 10M+ capital requirement. Sandbox allows us to operate commercially with up to 500 users and process up to SAR 5M/month during the test phase. This gives us 12 months to prove the model before committing to the full license process.

**Timeline:** Apply for Sandbox by end of Month 2. Expected approval: 4–6 weeks. Expected sandbox operation period: 12 months.

**Date:** Feb 1, 2026 | **Owner:** Mustafa + Khaled Al-Otaibi + Sarah Al-Rashid`,
      },
    ],
  },
}

export const recentRequests = [
  {
    id: 'REQ-2026-044',
    category: 'Legal',
    priority: 'High',
    title: 'Employment contract template for CTO hire',
    description: 'Need a KSA-compliant employment contract template for our upcoming CTO hire. The candidate is an Egyptian national with current UAE visa.',
    status: 'Responded',
    submittedAt: 'Feb 25, 2026 at 09:14',
    response: 'Hi Mustafa, I have shared the updated employment contract template to your Document Library. Given the candidate is non-Saudi, ensure you check the Iqama transfer timeline — typically 2–4 weeks. Let me know if you need help with the offer negotiation. — Khaled',
    timeline: [
      { date: 'Feb 25, 2026', event: 'Request submitted', by: 'Mustafa' },
      { date: 'Feb 26, 2026', event: 'Assigned to Khaled Al-Otaibi', by: 'System' },
      { date: 'Feb 27, 2026', event: 'Response sent', by: 'Khaled Al-Otaibi' },
    ],
  },
  {
    id: 'REQ-2026-039',
    category: 'Finance',
    priority: 'Normal',
    title: 'VAT filing guidance for first quarter',
    description: 'We are approaching our first VAT filing deadline. Need guidance on what to include and how to submit via ZATCA Fatoora portal.',
    status: 'Resolved',
    submittedAt: 'Feb 18, 2026 at 14:32',
    response: 'Filed the first VAT return on your behalf as agreed. SAR 0 due for Q1 (pre-revenue). Set up the monthly filing calendar in your shared Notion — bookmark the ZATCA portal. — Nora',
    timeline: [
      { date: 'Feb 18, 2026', event: 'Request submitted', by: 'Mustafa' },
      { date: 'Feb 18, 2026', event: 'Assigned to Nora Faisal', by: 'System' },
      { date: 'Feb 19, 2026', event: 'Filing completed and documented', by: 'Nora Faisal' },
      { date: 'Feb 19, 2026', event: 'Request marked Resolved', by: 'Nora Faisal' },
    ],
  },
  {
    id: 'REQ-2026-031',
    category: 'Talent',
    priority: 'High',
    title: 'CTO candidate sourcing support',
    description: 'Looking for a CTO with Saudi fintech experience. Strong Golang and distributed systems background. 3+ years at a fintech or payments company.',
    status: 'In Progress',
    submittedAt: 'Feb 5, 2026 at 11:00',
    response: 'Currently screening 12 candidates from LinkedIn, Bayt, and referral network. Sharing first shortlist (5 candidates) by end of week. All have fintech background, 3 are in Saudi, 2 are Dubai-based open to relocate. — Rayan',
    timeline: [
      { date: 'Feb 5, 2026', event: 'Request submitted', by: 'Mustafa' },
      { date: 'Feb 6, 2026', event: 'Assigned to Rayan Al-Ghamdi', by: 'System' },
      { date: 'Feb 10, 2026', event: 'Candidate sourcing started', by: 'Rayan Al-Ghamdi' },
      { date: 'Feb 28, 2026', event: 'First shortlist shared', by: 'Rayan Al-Ghamdi' },
    ],
  },
  {
    id: 'REQ-2026-022',
    category: 'Operations',
    priority: 'Normal',
    title: 'Office space access setup',
    description: 'Need access cards and parking stickers for myself and the new hire starting March 10.',
    status: 'Resolved',
    submittedAt: 'Jan 28, 2026 at 08:45',
    response: 'Access cards ready for collection at reception. Parking stickers issued for Level B2, spots 14 and 15. Building access is 6AM–10PM weekdays, 8AM–6PM weekends. — Studio Ops',
    timeline: [
      { date: 'Jan 28, 2026', event: 'Request submitted', by: 'Mustafa' },
      { date: 'Jan 29, 2026', event: 'Access cards prepared', by: 'Studio Operations' },
      { date: 'Jan 30, 2026', event: 'Request marked Resolved', by: 'Studio Operations' },
    ],
  },
]

export const chatMessages = {
  'tradepay-general': [
    { id: 'cm-1', sender: 'Sarah Al-Rashid', initials: 'SA', role: 'Portfolio Manager', time: '09:15', text: 'Good morning Mustafa! Quick reminder — Phase 1 completion is 30 days away. Let\'s plan a mid-phase review this week. When works for you?' },
    { id: 'cm-2', sender: 'Omar Hassan', initials: 'OH', role: 'Venture Architect', time: '09:32', text: 'Mustafa, I reviewed your tech architecture diagram. Overall looks solid. One suggestion: consider adding a Redis cache layer between your API and database. Happy to jump on a call.' },
    { id: 'cm-3', sender: 'Mustafa Al-Amin', initials: 'MA', role: 'CEO & Co-Founder', time: '10:01', text: 'Morning Sarah! Thursday afternoon works. Omar — yes, Redis cache makes sense. Let\'s add it to the architecture review agenda.' },
    { id: 'cm-4', sender: 'Layla Mahmoud', initials: 'LM', role: 'Product Manager', time: '10:45', text: 'I\'ve shared the updated PRD v2 in the Document Library. Main change: added the bulk payment upload feature based on user research findings. Please review by EOD.' },
    { id: 'cm-5', sender: 'Sarah Al-Rashid', initials: 'SA', role: 'Portfolio Manager', time: '11:00', text: 'Thursday at 3PM confirmed. I\'ll send a calendar invite. Also — great job on the pilot agreement with Al-Mashreq! That\'s a strong early signal.' },
  ],
  'tradepay-pm-sarah': [
    { id: 'cm-6', sender: 'Sarah Al-Rashid', initials: 'SA', role: 'Portfolio Manager', time: 'Yesterday 16:30', text: 'Mustafa, I wanted to share some feedback from the board review. Very positive reception to the B2B payments thesis. Two board members want to meet you next month.' },
    { id: 'cm-7', sender: 'Mustafa Al-Amin', initials: 'MA', role: 'CEO & Co-Founder', time: 'Yesterday 17:05', text: 'That\'s great news! I\'d love to meet them. Should I prepare a short update deck? Or is this more informal?' },
    { id: 'cm-8', sender: 'Sarah Al-Rashid', initials: 'SA', role: 'Portfolio Manager', time: 'Yesterday 17:20', text: 'Keep it informal — 15-minute update, 45-minute Q&A. Focus on what you\'ve learned from customers, not the product itself. I\'ll brief you beforehand.' },
    { id: 'cm-9', sender: 'Sarah Al-Rashid', initials: 'SA', role: 'Portfolio Manager', time: 'Today 08:45', text: 'Also — don\'t forget to submit your weekly update today. KPI data from the Nora is ready to pull in.' },
  ],
  'tradepay-ssu-legal': [
    { id: 'cm-10', sender: 'Khaled Al-Otaibi', initials: 'KA', role: 'Legal Counsel', time: '2 days ago', text: 'Mustafa, CR is registered! Certificate uploaded to your Document Library. Next steps: bank account opening and ZATCA VAT registration. I\'ve shared a checklist.' },
    { id: 'cm-11', sender: 'Mustafa Al-Amin', initials: 'MA', role: 'CEO & Co-Founder', time: '2 days ago', text: 'Amazing! Thank you Khaled. Moving on the bank account today. One question — do I need both founders to be present for the Al-Rajhi appointment?' },
    { id: 'cm-12', sender: 'Khaled Al-Otaibi', initials: 'KA', role: 'Legal Counsel', time: '2 days ago', text: 'Yes, all shareholders with >25% ownership need to be present in person. Alternatively, I can prepare a Power of Attorney so you can go alone. Let me know.' },
    { id: 'cm-13', sender: 'Khaled Al-Otaibi', initials: 'KA', role: 'Legal Counsel', time: 'Yesterday', text: 'Also checking in on the IP Assignment Agreement — I need it signed by both founders before end of month. It\'s in your Document Library under Legal.' },
  ],
  'tradepay-ssu-finance': [
    { id: 'cm-14', sender: 'Nora Faisal', initials: 'NF', role: 'Finance Lead', time: '3 days ago', text: 'Hi Mustafa! Qoyod is all set up with your chart of accounts. I\'ve shared the login credentials via 1Password. Let me know when you want a walkthrough.' },
    { id: 'cm-15', sender: 'Mustafa Al-Amin', initials: 'MA', role: 'CEO & Co-Founder', time: '3 days ago', text: 'Perfect, thanks Nora. Can we do the walkthrough tomorrow at 2PM?' },
    { id: 'cm-16', sender: 'Nora Faisal', initials: 'NF', role: 'Finance Lead', time: '3 days ago', text: '2PM tomorrow works great. I\'ll also walk you through the monthly reporting process and how to read your burn rate dashboard.' },
    { id: 'cm-17', sender: 'Nora Faisal', initials: 'NF', role: 'Finance Lead', time: 'Today 09:00', text: 'Quick note: February burn came in at SAR 104,000 — under budget by SAR 6k. Well done on keeping costs lean. Full report in your Document Library.' },
  ],
  'tradepay-ssu-talent': [
    { id: 'cm-18', sender: 'Rayan Al-Ghamdi', initials: 'RA', role: 'Talent Partner', time: '4 days ago', text: 'Mustafa, I\'ve shared the CTO shortlist in your email. 5 strong candidates. My top pick is Candidate #3 — 8 years fintech, led payments engineering at HyperPay.' },
    { id: 'cm-19', sender: 'Mustafa Al-Amin', initials: 'MA', role: 'CEO & Co-Founder', time: '4 days ago', text: 'Reviewing the profiles now. Candidate #3 looks impressive. Let\'s schedule technical interviews for the top 3. Can you coordinate?' },
    { id: 'cm-20', sender: 'Rayan Al-Ghamdi', initials: 'RA', role: 'Talent Partner', time: '3 days ago', text: 'Technical interviews scheduled for next week Mon-Wed. I\'ll share calendar invites. Should I also arrange a culture fit call with you before the technicals?' },
    { id: 'cm-21', sender: 'Rayan Al-Ghamdi', initials: 'RA', role: 'Talent Partner', time: 'Today 10:30', text: 'Quick update: Candidate #3 confirmed availability. Candidate #1 withdrew (accepted another offer). Still strong with 4 candidates in pipeline.' },
  ],
}
