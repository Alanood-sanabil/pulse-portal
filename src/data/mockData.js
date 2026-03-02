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
  { id: 'tm-1', name: 'Sarah Al-Rashid', role: 'Portfolio Manager', initials: 'SA', email: 'sarah@sanabilstudio.com', bio: 'Leads portfolio strategy and founder support. Former VC at STV with focus on fintech and SaaS.', channel: 'tradepay-pm-sarah' },
  { id: 'tm-2', name: 'Omar Hassan', role: 'Venture Architect', initials: 'OH', email: 'omar@sanabilstudio.com', bio: 'Product and technical strategy advisor. Previously built two fintech startups from 0→1.', channel: 'tradepay-general' },
  { id: 'tm-3', name: 'Layla Mahmoud', role: 'Product Manager', initials: 'LM', email: 'layla@sanabilstudio.com', bio: 'Embedded product support for Tradepay. Focus on roadmap, user research, and go-to-market.', channel: 'tradepay-general' },
]

export const ssuTeam = [
  { id: 'ssu-1', name: 'Khaled Al-Otaibi', role: 'Legal Counsel', initials: 'KA', email: 'legal@sanabilstudio.com', category: 'Legal', channel: 'tradepay-ssu-legal' },
  { id: 'ssu-2', name: 'Nora Faisal', role: 'Finance Lead', initials: 'NF', email: 'finance@sanabilstudio.com', category: 'Finance', channel: 'tradepay-ssu-finance' },
  { id: 'ssu-3', name: 'Rayan Al-Ghamdi', role: 'Talent Partner', initials: 'RA', email: 'talent@sanabilstudio.com', category: 'Talent', channel: 'tradepay-ssu-talent' },
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
    owner: 'Founder',
    dueDate: 'Jan 15, 2026',
    category: 'Legal',
    phase: 1,
    overdueDays: null,
  },
  {
    id: 'task-2',
    title: 'Sign Shareholder Agreement',
    description: 'Review and sign the shareholder agreement prepared by legal team.',
    steps: [
      'Review the draft SHA sent by legal team',
      'Highlight any clauses requiring clarification',
      'Schedule call with Khaled Al-Otaibi to discuss amendments',
      'Obtain co-founder signatures on final version',
      'Submit signed copy to SSU Legal',
    ],
    owner: 'Founder',
    dueDate: 'Jan 20, 2026',
    category: 'Legal',
    phase: 1,
    overdueDays: null,
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
    owner: 'Founder',
    dueDate: 'Feb 10, 2026',
    category: 'Finance',
    phase: 1,
    overdueDays: null,
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
    dueDate: 'Jan 30, 2026',
    category: 'Finance',
    phase: 1,
    overdueDays: 31,
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
    dueDate: 'Feb 1, 2026',
    category: 'Talent',
    phase: 1,
    overdueDays: 29,
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
    owner: 'Founder',
    dueDate: 'Feb 15, 2026',
    category: 'Finance',
    phase: 1,
    overdueDays: null,
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
    owner: 'SSU',
    dueDate: 'Feb 20, 2026',
    category: 'Legal',
    phase: 1,
    overdueDays: null,
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
    owner: 'SSU',
    dueDate: 'Mar 1, 2026',
    category: 'Operations',
    phase: 1,
    overdueDays: null,
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
    dueDate: 'Feb 25, 2026',
    category: 'Operations',
    phase: 1,
    overdueDays: null,
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
    dueDate: 'Mar 15, 2026',
    category: 'Talent',
    phase: 1,
    overdueDays: null,
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
    dueDate: 'Mar 31, 2026',
    category: 'Operations',
    phase: 1,
    overdueDays: null,
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
    id: 'ss-1', name: 'Legal & Compliance', icon: '⚖️', description: 'Entity formation, contract review, regulatory guidance for KSA market.',
    sla: '3–5 business days', contact: 'Khaled Al-Otaibi, Legal Counsel', category: 'Legal',
    article: `SSU Legal provides end-to-end legal support for all Sanabil Studio portfolio ventures. Our team handles everything from commercial registration and shareholder agreements to employment law and regulatory filings.

For Tradepay, this includes SAMA fintech licensing guidance, merchant agreements, and ongoing compliance monitoring as Saudi payment regulations evolve.

Our legal team operates under a service-level agreement of 3–5 business days for standard requests. Urgent matters (flagged as High or Urgent in the Request Help system) are escalated to a 24-hour response time.`,
    links: [
      { label: 'MISA Business Registration Guide', url: '#' },
      { label: 'SAMA Fintech Regulatory Sandbox', url: '#' },
      { label: 'ZATCA VAT Registration Portal', url: '#' },
      { label: 'SAIP Trademark Filing', url: '#' },
    ],
  },
  {
    id: 'ss-2', name: 'Finance & Accounting', icon: '💰', description: 'Financial modeling, accounting setup, audit prep, and tax compliance.',
    sla: '2–3 business days', contact: 'Nora Faisal, Finance Lead', category: 'Finance',
    article: `SSU Finance provides comprehensive financial support from Day 1. Our team helps you set up your chart of accounts, configure Qoyod (our recommended accounting platform), and establish monthly reporting cadences that align with IFRS standards.

For Tradepay specifically, we support fintech-specific financial modeling including unit economics for payment processing, interchange revenue modeling, and working capital analysis.

Monthly financial reviews are scheduled with your Portfolio Manager and Finance Lead to track burn rate, runway, and KPI performance against plan.`,
    links: [
      { label: 'Qoyod Accounting Platform', url: '#' },
      { label: 'SSU Financial Model Template', url: '#' },
      { label: 'ZATCA E-Invoicing Requirements', url: '#' },
    ],
  },
  {
    id: 'ss-3', name: 'Talent & Recruiting', icon: '👥', description: 'Hiring support, job descriptions, candidate sourcing, and HR setup.',
    sla: '5–7 business days', contact: 'Rayan Al-Ghamdi, Talent Partner', category: 'Talent',
    article: `The SSU Talent team helps portfolio ventures build their founding teams and early hires. We support job description writing, posting on premium job boards (LinkedIn, Bayt, Wellfound), screening, and interview coordination.

For senior roles (C-suite and Director level), we also activate our network of advisors and VC connections for warm referrals. Our Talent Partner can also negotiate offer terms and help structure equity compensation packages.

HR infrastructure setup (GOSI, payroll, onboarding processes) is included as part of standard Talent support during Phase 1.`,
    links: [
      { label: 'SSU Hiring Templates Library', url: '#' },
      { label: 'GOSI Registration Portal', url: '#' },
      { label: 'Bayt Posting Guidelines', url: '#' },
    ],
  },
  {
    id: 'ss-4', name: 'Product Design', icon: '🎨', description: 'UI/UX design, brand identity, user research, and design systems.',
    sla: '3–5 business days', contact: 'Layla Mahmoud, Product Manager', category: 'Operations',
    article: `SSU Product Design supports ventures with world-class design across product, brand, and marketing. Our design team uses Figma as the primary tool and delivers work in structured sprints aligned with your development cycles.

For new ventures in Phase 1, we offer a Brand Starter Pack: logo, color palette, typography system, and basic UI component library. This gives you a professional identity from Day 1 without hiring a full-time designer.

For product UX, we recommend engaging our team for user research sessions, wireframing, and prototype testing before committing engineering resources to build.`,
    links: [
      { label: 'Brand Starter Pack Request Form', url: '#' },
      { label: 'Figma Design System Starter', url: '#' },
      { label: 'User Research Session Booking', url: '#' },
      { label: 'Design Review Calendar', url: '#' },
    ],
  },
  {
    id: 'ss-5', name: 'Tech Infrastructure', icon: '🔧', description: 'Cloud setup, DevOps, security review, and architecture guidance.',
    sla: '2–4 business days', contact: 'Omar Hassan, Venture Architect', category: 'Operations',
    article: `Omar Hassan provides technical architecture guidance and infrastructure setup support for all portfolio ventures. For fintech ventures like Tradepay, this includes secure cloud architecture design (AWS or GCP), DevSecOps pipeline setup, and PCI-DSS compliance planning.

Our standard tech stack recommendations for Saudi-based fintechs include AWS Bahrain region for data residency compliance, Terraform for infrastructure-as-code, and GitHub Actions for CI/CD.

Security reviews are mandatory before any production deployment. Contact Omar at least 2 weeks before your planned launch date to schedule a security architecture review.`,
    links: [
      { label: 'AWS Bahrain Region Setup Guide', url: '#' },
      { label: 'PCI-DSS Checklist for Fintechs', url: '#' },
      { label: 'SSU Security Review Template', url: '#' },
    ],
  },
  {
    id: 'ss-6', name: 'Market Research', icon: '📊', description: 'Market sizing, competitive intelligence, and customer discovery support.',
    sla: '5–7 business days', contact: 'Sarah Al-Rashid, Portfolio Manager', category: 'Operations',
    article: `The SSU research team provides market intelligence to help you make data-driven product and go-to-market decisions. We have access to premium databases including SCAICT reports, Euromonitor, and PitchBook for market sizing and competitive benchmarking.

For Tradepay, we have already compiled a B2B payments market analysis covering Saudi Arabia and GCC. This report covers market size ($4.2B TAM), competitive landscape, and regulatory environment — available in your Document Library.

Custom research requests can be submitted via the Request Help system under the Operations category.`,
    links: [
      { label: 'B2B Payments Market Report (GCC)', url: '#' },
      { label: 'SCAICT Digital Payments Data', url: '#' },
      { label: 'Customer Discovery Interview Template', url: '#' },
    ],
  },
  {
    id: 'ss-7', name: 'PR & Communications', icon: '📣', description: 'Media relations, content strategy, thought leadership, and press releases.',
    sla: '7–10 business days', contact: 'Sarah Al-Rashid, Portfolio Manager', category: 'Operations',
    article: `SSU's communications team helps portfolio ventures build their brand presence in the Saudi and regional startup ecosystem. We have established relationships with key media outlets including Arab News, Saudi Gazette, Wamda, and Magnitt.

For Phase 1 ventures, we recommend focusing on LinkedIn presence and founder personal branding rather than press outreach. Our team can help craft your LinkedIn strategy, write thought leadership articles, and manage your company page.

Formal PR campaigns (press releases, media briefings) are typically activated at the time of a significant announcement: product launch, funding, or major partnership.`,
    links: [
      { label: 'SSU PR Request Form', url: '#' },
      { label: 'LinkedIn Personal Brand Guide', url: '#' },
      { label: 'Press Release Template', url: '#' },
    ],
  },
  {
    id: 'ss-8', name: 'Investor Relations', icon: '🤝', description: 'Fundraising prep, investor introductions, pitch coaching, and data room setup.',
    sla: '5–7 business days', contact: 'Sarah Al-Rashid, Portfolio Manager', category: 'Operations',
    article: `Sarah Al-Rashid leads investor relations support for all portfolio ventures. SSU has deep connections with 40+ active investors in the Saudi and GCC ecosystem, including family offices, VCs, and corporate venture arms.

For Tradepay, we recommend beginning fundraising preparation at the start of Month 4 (post-product launch), targeting a Seed round of $2–3M. This timeline allows you to show 2–3 months of revenue traction before approaching investors.

Our fundraising support package includes: pitch deck review, financial model validation, investor targeting, warm introductions, and term sheet coaching.`,
    links: [
      { label: 'SSU Investor Network Overview', url: '#' },
      { label: 'Pitch Deck Template (SSU Standard)', url: '#' },
      { label: 'Data Room Setup Guide', url: '#' },
      { label: 'Term Sheet Basics for Founders', url: '#' },
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
    id: 'pp-1', partner: 'AWS Activate', logo: 'AWS', description: '$100,000 in AWS credits for qualifying Sanabil Studio portfolio companies. Access to AWS startup support team and technical reviews.', category: 'Cloud',
    instructions: 'Use promo code SANABIL2026 at aws.amazon.com/activate. You will need to provide your Sanabil Studio portfolio company email. Credits are valid for 24 months from activation.',
  },
  {
    id: 'pp-2', partner: 'Notion for Startups', logo: 'NO', description: '6 months free Notion Business plan for your entire team. Includes unlimited blocks, version history, and API access.', category: 'Productivity',
    instructions: 'Go to notion.so/startups, click Apply, and use the referral code SANABIL. Omar Hassan can provide an additional reference letter if required.',
  },
  {
    id: 'pp-3', partner: 'Stripe Atlas', logo: 'ST', description: 'Free Stripe Atlas incorporation plus 12 months of Stripe fee waiver on first $20,000 in payments processed.', category: 'Payments',
    instructions: 'Apply at stripe.com/atlas/partners and select Sanabil Studio as your accelerator partner. Processing support from SSU Finance team.',
  },
  {
    id: 'pp-4', partner: 'HubSpot for Startups', logo: 'HS', description: '90% off HubSpot CRM, Marketing Hub, and Sales Hub for the first year. Full-featured platform for your go-to-market motion.', category: 'CRM',
    instructions: 'Contact HubSpot at hubspot.com/startups, mention Sanabil Studio, and your discount will be applied within 3 business days. Discounts stack with existing offers.',
  },
  {
    id: 'pp-5', partner: 'Linear', logo: 'LI', description: '12 months free Linear project management for teams under 10. Perfect for product and engineering sprint management.', category: 'Product',
    instructions: 'Email linear@sanabilstudio.com with your company name and we will provision your Linear workspace under the SSU deal within 1 business day.',
  },
  {
    id: 'pp-6', partner: 'Intercom', logo: 'IN', description: 'Early Stage program: $249/month flat fee for full Intercom suite (normally $1,200+/month). Includes product tours, chatbots, and support desk.', category: 'Support',
    instructions: 'Apply at intercom.com/early-stage, mention Sanabil Studio in your application. Sarah Al-Rashid can provide a reference to fast-track approval.',
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
    { id: 'cm-10', sender: 'Khaled Al-Otaibi', initials: 'KA', role: 'Legal Counsel', time: '2 days ago', text: 'Mustafa, CR is registered! 🎉 Certificate uploaded to your Document Library. Next steps: bank account opening and ZATCA VAT registration. I\'ve shared a checklist.' },
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
