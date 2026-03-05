import { useState, useEffect } from 'react'
import {
  Folder, FileText, ExternalLink, Check, Clock, ChevronRight,
  ChevronDown, Paperclip, Link2, MessageSquare, Plus, RefreshCw,
} from 'lucide-react'
import Layout from '../components/Layout'

// ─────────────────────────────────────────────
// Brand icons
// ─────────────────────────────────────────────

function GDriveIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 38l6-10h24l6 10H6z" fill="#34A853" />
      <path d="M30 14H18L6 34h12z" fill="#4285F4" />
      <path d="M36 34H24L30 14l12 20z" fill="#FBBC04" />
    </svg>
  )
}

function AsanaIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="10" r="6.5" fill="#F06A6A" />
      <circle cx="7"  cy="22" r="6.5" fill="#F06A6A" opacity="0.85" />
      <circle cx="25" cy="22" r="6.5" fill="#F06A6A" opacity="0.85" />
    </svg>
  )
}

// ─────────────────────────────────────────────
// Shared config
// ─────────────────────────────────────────────

const ASSIGNEE_COLORS = {
  OH: 'bg-pulse-blue/20 text-pulse-blue',
  LM: 'bg-pulse-green/20 text-pulse-green',
  SA: 'bg-amber/20 text-amber',
  AS: 'bg-purple-500/20 text-purple-400',
  NK: 'bg-pink-500/20 text-pink-400',
  MA: 'bg-pulse-red/20 text-pulse-red',
}

const FILE_TYPE_CONFIG = {
  pdf:  { label: 'PDF', bg: 'bg-pulse-red/10',   text: 'text-pulse-red' },
  docx: { label: 'DOC', bg: 'bg-pulse-blue/10',  text: 'text-pulse-blue' },
  xlsx: { label: 'XLS', bg: 'bg-pulse-green/10', text: 'text-pulse-green' },
  pptx: { label: 'PPT', bg: 'bg-amber/10',        text: 'text-amber' },
}

const STATUS_CFG = {
  completed:     { label: 'Done',        bg: 'bg-pulse-green/10', text: 'text-pulse-green' },
  'in-progress': { label: 'In Progress', bg: 'bg-amber/10',       text: 'text-amber' },
  'not-started': { label: 'Not Started', bg: 'bg-bg-elevated',    text: 'text-text-muted' },
}

// ─────────────────────────────────────────────
// Topic Validation mock data
// ─────────────────────────────────────────────

const VALIDATION_FOLDERS = [
  {
    id: 'val-mkt', name: 'Market Research', fileCount: 3, lastModified: 'Feb 10, 2026',
    files: [
      { id: 'vmf-1', name: 'Saudi B2B Payments Market Analysis', ext: 'pdf',  modifier: 'Sarah Al-Rashid', date: 'Feb 10, 2026', asanaRef: { taskName: 'Conduct Saudi B2B payments market sizing' } },
      { id: 'vmf-2', name: 'Vision 2030 Digital Economy Report',  ext: 'pdf',  modifier: 'Omar Hassan',      date: 'Jan 20, 2026', asanaRef: { taskName: 'Research Vision 2030 fintech implications' } },
      { id: 'vmf-3', name: 'SME Landscape KSA',                   ext: 'xlsx', modifier: 'Layla Mahmoud',   date: 'Feb 5, 2026',  asanaRef: { taskName: 'Analyse SME financial behaviour patterns' } },
    ],
  },
  {
    id: 'val-comp', name: 'Competitive Analysis', fileCount: 2, lastModified: 'Jan 28, 2026',
    files: [
      { id: 'vcf-1', name: 'Competitor Matrix',           ext: 'xlsx', modifier: 'Omar Hassan',      date: 'Jan 28, 2026', asanaRef: null },
      { id: 'vcf-2', name: 'Lean Technologies Deep Dive', ext: 'docx', modifier: 'Sarah Al-Rashid',  date: 'Jan 25, 2026', asanaRef: null },
    ],
  },
  {
    id: 'val-disc', name: 'Customer Discovery', fileCount: 3, lastModified: 'Jan 18, 2026',
    files: [
      { id: 'vdf-1', name: 'User Interview Notes',  ext: 'docx', modifier: 'Layla Mahmoud',  date: 'Jan 15, 2026', asanaRef: { taskName: 'Conduct 12 SME discovery interviews' } },
      { id: 'vdf-2', name: 'Survey Results',         ext: 'xlsx', modifier: 'Layla Mahmoud',  date: 'Jan 12, 2026', asanaRef: { taskName: 'Run payment behaviour survey (100+ responses)' } },
      { id: 'vdf-3', name: 'Customer Persona Deck',  ext: 'pptx', modifier: 'Sarah Al-Rashid', date: 'Jan 18, 2026', asanaRef: { taskName: 'Build customer personas and ICP definition' } },
    ],
  },
  {
    id: 'val-fin', name: 'Financial Projections', fileCount: 2, lastModified: 'Feb 8, 2026',
    files: [
      { id: 'vff-1', name: '13-Week Cash Flow Model', ext: 'xlsx', modifier: 'Ahmed Saleh', date: 'Feb 5, 2026', asanaRef: null },
      { id: 'vff-2', name: 'Unit Economics Model',    ext: 'xlsx', modifier: 'Ahmed Saleh', date: 'Feb 8, 2026', asanaRef: null },
    ],
  },
  {
    id: 'val-thesis', name: 'Thesis Documents', fileCount: 2, lastModified: 'Feb 22, 2026',
    files: [
      { id: 'vtf-1', name: 'Tradepay Investment Thesis', ext: 'docx', modifier: 'Sarah Al-Rashid',  date: 'Feb 20, 2026', asanaRef: { taskName: 'Write Tradepay investment thesis document' } },
      { id: 'vtf-2', name: 'Go No-Go Decision Memo',     ext: 'docx', modifier: 'Mustafa Al-Amin', date: 'Feb 22, 2026', asanaRef: null },
    ],
  },
  {
    id: 'val-appr', name: 'Approval Materials', fileCount: 2, lastModified: 'Feb 26, 2026',
    files: [
      { id: 'vaf-1', name: 'Investment Committee Deck', ext: 'pptx', modifier: 'Sarah Al-Rashid', date: 'Feb 25, 2026', asanaRef: { taskName: 'Present to Sanabil investment committee' } },
      { id: 'vaf-2', name: 'Board Approval Minutes',   ext: 'docx', modifier: 'Nora Khalid',      date: 'Feb 26, 2026', asanaRef: null },
    ],
  },
]

const VALIDATION_TASKS = [
  {
    section: 'Market Research',
    tasks: [
      {
        id: 'vt-1', name: 'Conduct Saudi B2B payments market sizing',
        assignee: { name: 'Omar Hassan', initials: 'OH' }, dueDate: 'Jan 10, 2026',
        status: 'completed', subtaskCount: 3,
        driveFile: { id: 'vmf-1', name: 'Saudi B2B Payments Market Analysis.pdf' },
        comments: [
          { initials: 'SA', author: 'Sarah Al-Rashid', text: 'Great analysis. TAM is higher than expected — leading with this in the thesis.', date: 'Jan 11, 2026' },
          { initials: 'OH', author: 'Omar Hassan', text: 'Updated with SAMA open banking framework data. Final version uploaded to Drive.', date: 'Jan 11, 2026' },
        ],
      },
      {
        id: 'vt-2', name: 'Research Vision 2030 fintech implications',
        assignee: { name: 'Omar Hassan', initials: 'OH' }, dueDate: 'Jan 15, 2026',
        status: 'completed', subtaskCount: 0,
        driveFile: { id: 'vmf-2', name: 'Vision 2030 Digital Economy Report.pdf' },
        comments: [
          { initials: 'SA', author: 'Sarah Al-Rashid', text: 'Good summary. The e-invoicing mandate section is key for our thesis.', date: 'Jan 16, 2026' },
        ],
      },
      {
        id: 'vt-3', name: 'Analyse SME financial behaviour patterns',
        assignee: { name: 'Omar Hassan', initials: 'OH' }, dueDate: 'Jan 20, 2026',
        status: 'completed', subtaskCount: 2,
        driveFile: { id: 'vmf-3', name: 'SME Landscape KSA.xlsx' },
        comments: [],
      },
      {
        id: 'vt-4', name: 'Map open banking regulatory landscape',
        assignee: { name: 'Omar Hassan', initials: 'OH' }, dueDate: 'Jan 25, 2026',
        status: 'completed', subtaskCount: 0, driveFile: null,
        comments: [
          { initials: 'NK', author: 'Nora Khalid', text: "Reviewed — SAMA sandbox pathway is confirmed as the right initial route. I'll add detail to the regulatory section.", date: 'Jan 26, 2026' },
        ],
      },
    ],
  },
  {
    section: 'Customer Discovery',
    tasks: [
      {
        id: 'vt-5', name: 'Conduct 12 SME discovery interviews',
        assignee: { name: 'Layla Mahmoud', initials: 'LM' }, dueDate: 'Jan 18, 2026',
        status: 'completed', subtaskCount: 4,
        driveFile: { id: 'vdf-1', name: 'User Interview Notes.docx' },
        comments: [
          { initials: 'SA', author: 'Sarah Al-Rashid', text: 'The reconciliation time stat (3.5 hrs/week) is compelling — leading with this in the pitch.', date: 'Jan 19, 2026' },
        ],
      },
      {
        id: 'vt-6', name: 'Run payment behaviour survey (100+ responses)',
        assignee: { name: 'Layla Mahmoud', initials: 'LM' }, dueDate: 'Jan 12, 2026',
        status: 'completed', subtaskCount: 2,
        driveFile: { id: 'vdf-2', name: 'Survey Results.xlsx' },
        comments: [],
      },
      {
        id: 'vt-7', name: 'Build customer personas and ICP definition',
        assignee: { name: 'Sarah Al-Rashid', initials: 'SA' }, dueDate: 'Jan 20, 2026',
        status: 'completed', subtaskCount: 0,
        driveFile: { id: 'vdf-3', name: 'Customer Persona Deck.pptx' },
        comments: [
          { initials: 'LM', author: 'Layla Mahmoud', text: 'ICP is well-defined. Mid-market SME (50–200 employees) aligns with all interview findings.', date: 'Jan 21, 2026' },
        ],
      },
    ],
  },
  {
    section: 'Thesis and Approval',
    tasks: [
      {
        id: 'vt-8', name: 'Write Tradepay investment thesis document',
        assignee: { name: 'Sarah Al-Rashid', initials: 'SA' }, dueDate: 'Feb 20, 2026',
        status: 'completed', subtaskCount: 3,
        driveFile: { id: 'vtf-1', name: 'Tradepay Investment Thesis.docx' },
        comments: [
          { initials: 'MA', author: 'Mustafa Al-Amin', text: 'Reviewed and approved. Strong case — especially the regulatory timing argument.', date: 'Feb 21, 2026' },
        ],
      },
      {
        id: 'vt-9', name: 'Present to Sanabil investment committee',
        assignee: { name: 'Sarah Al-Rashid', initials: 'SA' }, dueDate: 'Feb 25, 2026',
        status: 'completed', subtaskCount: 0,
        driveFile: { id: 'vaf-1', name: 'Investment Committee Deck.pptx' },
        comments: [
          { initials: 'SA', author: 'Sarah Al-Rashid', text: 'Go decision approved. Tradepay moves to prototype phase. Mustafa joining as founding CEO.', date: 'Feb 25, 2026' },
        ],
      },
    ],
  },
]

// ─────────────────────────────────────────────
// Prototype mock data
// ─────────────────────────────────────────────

const PROTOTYPE_FOLDERS = [
  {
    id: 'pro-prod', name: 'Product and Design', fileCount: 4, lastModified: 'Feb 15, 2026',
    files: [
      { id: 'ppf-1', name: 'Tradepay PRD v1.0',                 ext: 'docx', modifier: 'Layla Mahmoud', date: 'Feb 1, 2026',  asanaRef: { taskName: 'Write PRD for MVP supplier payment flow' } },
      { id: 'ppf-2', name: 'Design System — shadcn + Tailwind', ext: 'pptx', modifier: 'Layla Mahmoud', date: 'Jan 20, 2026', asanaRef: { taskName: 'Create design system and component library' } },
      { id: 'ppf-3', name: 'Product Roadmap Q1–Q2 2026',        ext: 'xlsx', modifier: 'Layla Mahmoud', date: 'Feb 10, 2026', asanaRef: null },
      { id: 'ppf-4', name: 'Feature Specifications',             ext: 'docx', modifier: 'Layla Mahmoud', date: 'Feb 15, 2026', asanaRef: null },
    ],
  },
  {
    id: 'pro-tech', name: 'Tech and Architecture', fileCount: 3, lastModified: 'Feb 12, 2026',
    files: [
      { id: 'ptf-1', name: 'System Architecture Diagram',        ext: 'pdf',  modifier: 'Omar Hassan', date: 'Jan 28, 2026', asanaRef: null },
      { id: 'ptf-2', name: 'API Specification — OpenAPI 3.0',    ext: 'docx', modifier: 'Omar Hassan', date: 'Feb 5, 2026',  asanaRef: null },
      { id: 'ptf-3', name: 'Infrastructure as Code — Terraform', ext: 'docx', modifier: 'Omar Hassan', date: 'Feb 12, 2026', asanaRef: { taskName: 'Set up AWS Bahrain infrastructure (Terraform)' } },
    ],
  },
  {
    id: 'pro-res', name: 'User Research', fileCount: 4, lastModified: 'Feb 18, 2026',
    files: [
      { id: 'prf-1', name: 'Usability Test Session 1 Notes',  ext: 'docx', modifier: 'Layla Mahmoud',   date: 'Jan 10, 2026', asanaRef: { taskName: 'Run Usability Test Session 1 (5 participants)' } },
      { id: 'prf-2', name: 'Usability Test Session 2 Report', ext: 'pdf',  modifier: 'Layla Mahmoud',   date: 'Feb 18, 2026', asanaRef: { taskName: 'Run Usability Test Session 2 (6 participants)' } },
      { id: 'prf-3', name: 'Research Synthesis — Key Themes', ext: 'docx', modifier: 'Sarah Al-Rashid', date: 'Jan 25, 2026', asanaRef: null },
      { id: 'prf-4', name: 'B2B Payment Pain Points Survey',  ext: 'xlsx', modifier: 'Layla Mahmoud',   date: 'Jan 12, 2026', asanaRef: null },
    ],
  },
  {
    id: 'pro-wire', name: 'Wireframes and Flows', fileCount: 5, lastModified: 'Feb 20, 2026',
    files: [
      { id: 'pwf-1', name: 'Supplier Payment Flow v3.1',     ext: 'pdf', modifier: 'Layla Mahmoud', date: 'Feb 20, 2026', asanaRef: null },
      { id: 'pwf-2', name: 'Buyer Onboarding Flow v2.0',     ext: 'pdf', modifier: 'Layla Mahmoud', date: 'Jan 28, 2026', asanaRef: null },
      { id: 'pwf-3', name: 'Dashboard Wireframes v2.0',      ext: 'pdf', modifier: 'Layla Mahmoud', date: 'Jan 25, 2026', asanaRef: null },
      { id: 'pwf-4', name: 'Payment Wizard Wireframes v3.1', ext: 'pdf', modifier: 'Layla Mahmoud', date: 'Feb 2, 2026',  asanaRef: { taskName: 'Design payment wizard UX (4-step guided flow)' } },
      { id: 'pwf-5', name: 'Admin Settings Wireframes v1.0', ext: 'pdf', modifier: 'Layla Mahmoud', date: 'Feb 16, 2026', asanaRef: null },
    ],
  },
  {
    id: 'pro-test', name: 'Testing and QA', fileCount: 3, lastModified: 'Feb 20, 2026',
    files: [
      { id: 'pqf-1', name: 'Usability Test Plan',       ext: 'docx', modifier: 'Layla Mahmoud', date: 'Jan 8, 2026',  asanaRef: null },
      { id: 'pqf-2', name: 'Technical Review Findings', ext: 'docx', modifier: 'Omar Hassan',   date: 'Feb 5, 2026',  asanaRef: null },
      { id: 'pqf-3', name: 'UAT Test Cases',            ext: 'xlsx', modifier: 'Omar Hassan',   date: 'Feb 20, 2026', asanaRef: null },
    ],
  },
  {
    id: 'pro-part', name: 'Partnerships', fileCount: 2, lastModified: 'Feb 1, 2026',
    files: [
      { id: 'parf-1', name: 'Lean Technologies Partnership Brief', ext: 'docx', modifier: 'Mustafa Al-Amin', date: 'Jan 15, 2026', asanaRef: { taskName: 'Onboard Lean Technologies as open banking provider' } },
      { id: 'parf-2', name: 'SAMA Sandbox Application',           ext: 'pdf',  modifier: 'Nora Khalid',      date: 'Feb 1, 2026',  asanaRef: { taskName: 'File SAMA Regulatory Sandbox application' } },
    ],
  },
  {
    id: 'pro-fin', name: 'Financial Model', fileCount: 2, lastModified: 'Feb 20, 2026',
    files: [
      { id: 'pfin-1', name: 'Tradepay Financial Model v2', ext: 'xlsx', modifier: 'Ahmed Saleh', date: 'Feb 20, 2026', asanaRef: null },
      { id: 'pfin-2', name: 'Seed Round Cap Table',        ext: 'xlsx', modifier: 'Nora Khalid', date: 'Jan 25, 2026', asanaRef: null },
    ],
  },
]

const PROTOTYPE_TASKS = [
  {
    section: 'Product Tasks',
    tasks: [
      {
        id: 'pt-1', name: 'Write PRD for MVP supplier payment flow',
        assignee: { name: 'Layla Mahmoud', initials: 'LM' }, dueDate: 'Feb 1, 2026',
        status: 'completed', subtaskCount: 4,
        driveFile: { id: 'ppf-1', name: 'Tradepay PRD v1.0.docx' },
        comments: [
          { initials: 'MA', author: 'Mustafa Al-Amin', text: 'PRD approved. Scope is tight — exactly right for MVP. Build phase can start.', date: 'Feb 2, 2026' },
        ],
      },
      {
        id: 'pt-2', name: 'Define MVP scope and feature prioritisation',
        assignee: { name: 'Layla Mahmoud', initials: 'LM' }, dueDate: 'Jan 25, 2026',
        status: 'completed', subtaskCount: 2, driveFile: null,
        comments: [
          { initials: 'SA', author: 'Sarah Al-Rashid', text: 'Agreed on narrowing to supplier payment flows only. Invoice financing deferred to Phase 2.', date: 'Jan 25, 2026' },
        ],
      },
      {
        id: 'pt-3', name: 'Design payment wizard UX (4-step guided flow)',
        assignee: { name: 'Layla Mahmoud', initials: 'LM' }, dueDate: 'Feb 10, 2026',
        status: 'completed', subtaskCount: 3,
        driveFile: { id: 'pwf-4', name: 'Payment Wizard Wireframes v3.1.pdf' },
        comments: [],
      },
      {
        id: 'pt-4', name: 'Add bulk CSV payment upload feature',
        assignee: { name: 'Layla Mahmoud', initials: 'LM' }, dueDate: 'Feb 28, 2026',
        status: 'completed', subtaskCount: 0, driveFile: null,
        comments: [
          { initials: 'LM', author: 'Layla Mahmoud', text: 'Shipped in 5 days. Al-Mashreq rated it the highest-value feature at pilot launch.', date: 'Feb 28, 2026' },
        ],
      },
      {
        id: 'pt-5', name: 'Scope mobile app requirements for Phase 2',
        assignee: { name: 'Layla Mahmoud', initials: 'LM' }, dueDate: 'Mar 10, 2026',
        status: 'in-progress', subtaskCount: 1, driveFile: null,
        comments: [],
      },
    ],
  },
  {
    section: 'Tech Tasks',
    tasks: [
      {
        id: 'pt-6', name: 'Set up AWS Bahrain infrastructure (Terraform)',
        assignee: { name: 'Omar Hassan', initials: 'OH' }, dueDate: 'Jan 28, 2026',
        status: 'completed', subtaskCount: 3,
        driveFile: { id: 'ptf-3', name: 'Infrastructure as Code — Terraform.docx' },
        comments: [],
      },
      {
        id: 'pt-7', name: 'Integrate Lean Technologies open banking API',
        assignee: { name: 'Omar Hassan', initials: 'OH' }, dueDate: 'Feb 5, 2026',
        status: 'completed', subtaskCount: 4, driveFile: null,
        comments: [
          { initials: 'OH', author: 'Omar Hassan', text: 'Bank account linking and payment initiation live in sandbox. Real-time IBAN verification working.', date: 'Feb 5, 2026' },
        ],
      },
      {
        id: 'pt-8', name: 'Integrate ZATCA Fatoora invoice validation',
        assignee: { name: 'Omar Hassan', initials: 'OH' }, dueDate: 'Mar 1, 2026',
        status: 'completed', subtaskCount: 2, driveFile: null,
        comments: [
          { initials: 'OH', author: 'Omar Hassan', text: 'Integration live in staging. Production go-live scheduled Mar 10.', date: 'Mar 1, 2026' },
        ],
      },
      {
        id: 'pt-9', name: 'Security review and penetration testing',
        assignee: { name: 'Omar Hassan', initials: 'OH' }, dueDate: 'Mar 15, 2026',
        status: 'in-progress', subtaskCount: 5, driveFile: null,
        comments: [],
      },
    ],
  },
  {
    section: 'Design Tasks',
    tasks: [
      {
        id: 'pt-10', name: 'Create design system and component library',
        assignee: { name: 'Layla Mahmoud', initials: 'LM' }, dueDate: 'Jan 20, 2026',
        status: 'completed', subtaskCount: 2,
        driveFile: { id: 'ppf-2', name: 'Design System — shadcn + Tailwind.pptx' },
        comments: [],
      },
      {
        id: 'pt-11', name: 'Design all dashboard and payment screens',
        assignee: { name: 'Layla Mahmoud', initials: 'LM' }, dueDate: 'Feb 12, 2026',
        status: 'completed', subtaskCount: 6, driveFile: null,
        comments: [
          { initials: 'MA', author: 'Mustafa Al-Amin', text: 'Dashboard looks clean. The payment history view is exactly what pilot customers need.', date: 'Feb 13, 2026' },
        ],
      },
      {
        id: 'pt-12', name: 'WCAG 2.1 AA accessibility audit and fixes',
        assignee: { name: 'Layla Mahmoud', initials: 'LM' }, dueDate: 'Feb 25, 2026',
        status: 'completed', subtaskCount: 0, driveFile: null,
        comments: [],
      },
    ],
  },
  {
    section: 'Research Tasks',
    tasks: [
      {
        id: 'pt-13', name: 'Run Usability Test Session 1 (5 participants)',
        assignee: { name: 'Layla Mahmoud', initials: 'LM' }, dueDate: 'Jan 10, 2026',
        status: 'completed', subtaskCount: 0,
        driveFile: { id: 'prf-1', name: 'Usability Test Session 1 Notes.docx' },
        comments: [
          { initials: 'LM', author: 'Layla Mahmoud', text: 'Task completion at 60%. Bank selection step caused abandonment in 3 of 5 sessions. Redesigning to auto-detect linked bank.', date: 'Jan 10, 2026' },
        ],
      },
      {
        id: 'pt-14', name: 'Run Usability Test Session 2 (6 participants)',
        assignee: { name: 'Layla Mahmoud', initials: 'LM' }, dueDate: 'Feb 18, 2026',
        status: 'completed', subtaskCount: 0,
        driveFile: { id: 'prf-2', name: 'Usability Test Session 2 Report.pdf' },
        comments: [
          { initials: 'LM', author: 'Layla Mahmoud', text: '94% task completion — major uplift. Bulk upload rated #1 feature by all 6 participants.', date: 'Feb 18, 2026' },
        ],
      },
      {
        id: 'pt-15', name: 'Compile research synthesis and key findings',
        assignee: { name: 'Sarah Al-Rashid', initials: 'SA' }, dueDate: 'Jan 25, 2026',
        status: 'completed', subtaskCount: 0, driveFile: null,
        comments: [],
      },
    ],
  },
  {
    section: 'Partnership Tasks',
    tasks: [
      {
        id: 'pt-16', name: 'Onboard Lean Technologies as open banking provider',
        assignee: { name: 'Mustafa Al-Amin', initials: 'MA' }, dueDate: 'Jan 20, 2026',
        status: 'completed', subtaskCount: 2,
        driveFile: { id: 'parf-1', name: 'Lean Technologies Partnership Brief.docx' },
        comments: [
          { initials: 'MA', author: 'Mustafa Al-Amin', text: 'Agreement signed. Sandbox API keys received. Omar starting integration next week.', date: 'Jan 20, 2026' },
        ],
      },
      {
        id: 'pt-17', name: 'File SAMA Regulatory Sandbox application',
        assignee: { name: 'Nora Khalid', initials: 'NK' }, dueDate: 'Feb 5, 2026',
        status: 'completed', subtaskCount: 3,
        driveFile: { id: 'parf-2', name: 'SAMA Sandbox Application.pdf' },
        comments: [
          { initials: 'NK', author: 'Nora Khalid', text: 'Application submitted. Awaiting SAMA acknowledgement. Expected response in 4–6 weeks.', date: 'Feb 5, 2026' },
        ],
      },
    ],
  },
]

// ─────────────────────────────────────────────
// Skeleton loaders
// ─────────────────────────────────────────────

function SkeletonBar({ className = '' }) {
  return <div className={`bg-bg-elevated rounded animate-pulse ${className}`} />
}

function DriveSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <SkeletonBar className="h-3 w-2/3" />
      <div className="grid grid-cols-2 gap-2 mt-2">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-16 bg-bg-elevated rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  )
}

function AsanaSkeleton() {
  return (
    <div className="p-4 space-y-5">
      {[0, 1, 2].map(i => (
        <div key={i} className="space-y-2">
          <SkeletonBar className="h-3 w-28" />
          {[0, 1, 2].map(j => (
            <div key={j} className="h-[72px] bg-bg-elevated rounded-xl animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// Connection bar
// ─────────────────────────────────────────────

function ConnectionBar() {
  return (
    <div className="flex items-center gap-5 px-6 py-2 border-b border-border bg-bg-surface text-xs shrink-0">
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-pulse-green shrink-0" />
        <GDriveIcon size={11} />
        <span className="font-medium text-text">Tradepay Venture Folder</span>
        <span className="text-text-dim">· Synced Mar 5, 2026 at 9:14 AM</span>
        <button className="ml-0.5 text-text-dim hover:text-text transition-colors">
          <RefreshCw size={9} />
        </button>
      </div>
      <div className="w-px h-3 bg-border" />
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-pulse-green shrink-0" />
        <AsanaIcon size={11} />
        <span className="font-medium text-text">Tradepay Onboarding</span>
        <span className="text-text-dim">· Synced Mar 5, 2026 at 9:14 AM</span>
        <button className="ml-0.5 text-text-dim hover:text-text transition-colors">
          <RefreshCw size={9} />
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Drive panel components
// ─────────────────────────────────────────────

function FileTypeTag({ ext }) {
  const cfg = FILE_TYPE_CONFIG[ext] || { label: ext.toUpperCase(), bg: 'bg-bg-elevated', text: 'text-text-muted' }
  return (
    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
  )
}

function FolderCard({ folder, isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all w-full ${
        isOpen
          ? 'bg-[#4285F4]/5 border-[#4285F4]/30 shadow-sm'
          : 'bg-bg-surface border-border hover:border-[#4285F4]/30 hover:bg-[#4285F4]/[0.02]'
      }`}
    >
      <Folder size={18} className={`shrink-0 ${isOpen ? 'text-[#4285F4]' : 'text-text-dim'}`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-text truncate">{folder.name}</p>
        <p className="text-[10px] text-text-dim mt-0.5">{folder.fileCount} files · {folder.lastModified}</p>
      </div>
      {isOpen
        ? <ChevronDown size={12} className="text-[#4285F4] shrink-0" />
        : <ChevronRight size={12} className="text-text-dim shrink-0" />}
    </button>
  )
}

function FileCard({ file }) {
  return (
    <div className="flex items-start gap-2.5 p-3 bg-bg-surface border border-border rounded-lg hover:border-[#4285F4]/30 transition-colors group">
      <div className="mt-0.5 shrink-0">
        <FileTypeTag ext={file.ext} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <p className="text-xs font-medium text-text leading-snug flex-1 min-w-0 truncate">{file.name}</p>
          {file.asanaRef && (
            <span className="flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 bg-[#F06A6A]/10 text-[#F06A6A] rounded-full shrink-0 whitespace-nowrap">
              <Link2 size={8} />
              Asana
            </span>
          )}
        </div>
        {file.asanaRef && (
          <p className="text-[10px] text-text-dim mt-0.5 truncate">↗ {file.asanaRef.taskName}</p>
        )}
        <p className="text-[10px] text-text-dim mt-1">{file.modifier} · {file.date}</p>
      </div>
      <button className="flex items-center gap-1 text-[10px] font-medium text-[#4285F4] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hover:underline">
        <ExternalLink size={9} />
        Open
      </button>
    </div>
  )
}

function DrivePanel({ title, path, folders }) {
  const [openFolderId, setOpenFolderId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 750)
    return () => clearTimeout(t)
  }, [])

  const openFolder = folders.find(f => f.id === openFolderId)

  return (
    <div className="flex flex-col">
      <div className="px-5 py-4 border-b border-border sticky top-0 bg-bg-surface z-10">
        <div className="flex items-center gap-2 mb-2.5">
          <GDriveIcon size={14} />
          <h2 className="text-sm font-semibold text-text">{title}</h2>
        </div>
        <div className="flex items-center gap-0.5 text-[10px] text-text-dim flex-wrap">
          {path.map((seg, i) => (
            <span key={i} className="flex items-center gap-0.5">
              {i > 0 && <ChevronRight size={9} className="text-border mx-0.5" />}
              <span className={i === path.length - 1 ? 'text-[#4285F4] font-semibold' : ''}>{seg}</span>
            </span>
          ))}
        </div>
      </div>

      {loading ? <DriveSkeleton /> : (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {folders.map(folder => (
              <FolderCard
                key={folder.id}
                folder={folder}
                isOpen={openFolderId === folder.id}
                onClick={() => setOpenFolderId(openFolderId === folder.id ? null : folder.id)}
              />
            ))}
          </div>

          {openFolder && (
            <div className="border border-[#4285F4]/20 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#4285F4]/5 border-b border-[#4285F4]/15">
                <Folder size={13} className="text-[#4285F4] shrink-0" />
                <p className="text-xs font-semibold text-[#4285F4]">{openFolder.name}</p>
                <span className="text-[10px] text-[#4285F4]/60 ml-auto">{openFolder.fileCount} files</span>
              </div>
              <div className="p-3 space-y-1.5 bg-bg-base/40">
                {openFolder.files.length === 0 ? (
                  <div className="py-6 text-center text-text-dim text-xs">No files in this folder yet.</div>
                ) : (
                  openFolder.files.map(file => <FileCard key={file.id} file={file} />)
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// Asana panel components
// ─────────────────────────────────────────────

function TaskCard({ task }) {
  const [showComments, setShowComments] = useState(false)
  const status = STATUS_CFG[task.status] || STATUS_CFG['not-started']
  const avatarColor = ASSIGNEE_COLORS[task.assignee.initials] || 'bg-bg-elevated text-text-muted'

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-bg-surface">
      <div className="p-3.5">
        <div className="flex items-start gap-2.5">
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            task.status === 'completed'
              ? 'bg-pulse-green border-pulse-green'
              : task.status === 'in-progress'
                ? 'border-amber bg-transparent'
                : 'border-border bg-transparent'
          }`}>
            {task.status === 'completed' && <Check size={9} className="text-white" strokeWidth={3} />}
          </div>

          <div className="flex-1 min-w-0">
            <p className={`text-xs font-medium leading-snug ${task.status === 'completed' ? 'text-text-muted line-through' : 'text-text'}`}>
              {task.name}
            </p>

            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 ${avatarColor}`}>
                  {task.assignee.initials}
                </div>
                <span className="text-[10px] text-text-muted">{task.assignee.name}</span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-text-dim">
                <Clock size={9} />
                {task.dueDate}
              </div>

              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                {status.label}
              </span>

              {task.subtaskCount > 0 && (
                <span className="text-[10px] text-text-dim flex items-center gap-0.5">
                  <Plus size={9} />
                  {task.subtaskCount}
                </span>
              )}
            </div>

            {task.driveFile && (
              <button className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-[#4285F4] bg-[#4285F4]/8 hover:bg-[#4285F4]/15 px-2 py-1 rounded-md transition-colors max-w-full">
                <Paperclip size={9} className="shrink-0" />
                <span className="truncate">{task.driveFile.name}</span>
              </button>
            )}
          </div>
        </div>

        {task.comments && task.comments.length > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className="mt-2.5 ml-6 flex items-center gap-1.5 text-[10px] text-text-muted hover:text-text transition-colors"
          >
            <MessageSquare size={9} />
            {showComments ? 'Hide updates' : `Show updates (${task.comments.length})`}
            {showComments ? <ChevronDown size={9} /> : <ChevronRight size={9} />}
          </button>
        )}
      </div>

      {showComments && task.comments && task.comments.length > 0 && (
        <div className="border-t border-border bg-bg-elevated/60 px-4 py-3 space-y-3">
          {task.comments.map((c, i) => {
            const cc = ASSIGNEE_COLORS[c.initials] || 'bg-bg-elevated text-text-muted'
            return (
              <div key={i} className="flex items-start gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5 ${cc}`}>
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold text-text">{c.author}</span>
                    <span className="text-[10px] text-text-dim">{c.date}</span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{c.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function AsanaSection({ section }) {
  const done = section.tasks.filter(t => t.status === 'completed').length
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest">{section.section}</p>
        <span className="text-[10px] text-text-dim">{done}/{section.tasks.length} done</span>
      </div>
      {section.tasks.length === 0 ? (
        <div className="py-4 text-center text-text-dim text-xs border border-dashed border-border rounded-xl">
          No tasks in this section.
        </div>
      ) : (
        <div className="space-y-2">
          {section.tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      )}
    </div>
  )
}

function AsanaPanel({ title, projectName, completion, sections }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 950)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col">
      <div className="px-5 py-4 border-b border-border sticky top-0 bg-bg-surface z-10">
        <div className="flex items-center gap-2 mb-1.5">
          <AsanaIcon size={14} />
          <h2 className="text-sm font-semibold text-text">{title}</h2>
        </div>
        <p className="text-[10px] text-text-muted mb-2">{projectName}</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
            <div className="h-full bg-pulse-green rounded-full" style={{ width: `${completion}%` }} />
          </div>
          <span className="text-[10px] font-semibold text-pulse-green shrink-0">{completion}% complete</span>
        </div>
      </div>

      {loading ? <AsanaSkeleton /> : (
        <div className="p-4 space-y-6">
          {sections.map(section => (
            <AsanaSection key={section.section} section={section} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────

export default function VentureContext() {
  const [activeTab, setActiveTab] = useState('validation')

  const tabs = [
    { id: 'validation', label: 'Topic Validation', sub: 'Dec 2025 – Feb 2026' },
    { id: 'prototype',  label: 'Prototype',        sub: 'Jan 2026 – Mar 2026' },
  ]

  return (
    <Layout title="Venture Context" subtitle="Tradepay · Phase records — Topic Validation & Prototype">
      <div className="flex flex-col h-full">
        <ConnectionBar />

        {/* Tab switcher */}
        <div className="flex items-end border-b border-border bg-bg-surface px-6 shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-start px-5 py-3.5 border-b-2 transition-all text-left mr-1 ${
                activeTab === tab.id
                  ? 'border-pulse-blue text-pulse-blue'
                  : 'border-transparent text-text-muted hover:text-text hover:border-border'
              }`}
            >
              <span className="text-sm font-semibold">{tab.label}</span>
              <span className={`text-[10px] mt-0.5 ${activeTab === tab.id ? 'text-pulse-blue/70' : 'text-text-dim'}`}>
                {tab.sub}
              </span>
            </button>
          ))}
        </div>

        {/* Two-column content */}
        <div className="flex-1 flex min-h-0">
          <div className="w-[44%] border-r border-border overflow-y-auto">
            {activeTab === 'validation' ? (
              <DrivePanel
                key="val-drive"
                title="Validation Folder"
                path={['Sanabil Studio Drive', 'Ventures', 'Tradepay', 'Topic Validation']}
                folders={VALIDATION_FOLDERS}
              />
            ) : (
              <DrivePanel
                key="pro-drive"
                title="Prototype Folder"
                path={['Sanabil Studio Drive', 'Ventures', 'Tradepay', 'Prototype']}
                folders={PROTOTYPE_FOLDERS}
              />
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeTab === 'validation' ? (
              <AsanaPanel
                key="val-asana"
                title="Validation Tasks"
                projectName="Tradepay — Topic Validation"
                completion={100}
                sections={VALIDATION_TASKS}
              />
            ) : (
              <AsanaPanel
                key="pro-asana"
                title="Prototype Tasks"
                projectName="Tradepay — Prototype"
                completion={72}
                sections={PROTOTYPE_TASKS}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
