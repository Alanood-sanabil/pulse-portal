import { createContext, useContext, useReducer, useCallback } from 'react'

const AppContext = createContext(null)

const initialTaskStatuses = {
  'task-1': 'done',
  'task-2': 'done',
  'task-3': 'in-progress',
  'task-4': 'overdue',
  'task-5': 'not-started',
  'task-6': 'not-started',
  'task-7': 'not-started',
  'task-8': 'not-started',
  'task-9': 'not-started',
  'task-10': 'not-started',
  'task-11': 'not-started',
}

// Initial subtask completion state for shared tasks
const initialSubTaskStatuses = {
  // task-2 (Sign Shareholder Agreement) — all done since task is done
  'sub-2-1': true,
  'sub-2-2': true,
  'sub-2-3': true,
  // task-7 (IP assignment) — not started
  'sub-7-1': false,
  'sub-7-2': false,
  'sub-7-3': false,
}

const initialState = {
  taskStatuses: initialTaskStatuses,
  subTaskStatuses: initialSubTaskStatuses,
  notificationCount: 5,
  notificationsRead: false,
  weeklyUpdateSubmitted: false,
  pulseCheck: null,
  toasts: [],
  selectedCategory: null,
  selectedChannel: 'tradepay-general',
  playbookProgress: {
    'chapter-1': 33,
    'chapter-2': 0,
    'chapter-3': 0,
    'chapter-4': 0,
    'chapter-5': 0,
    'chapter-6': 0,
  },
  readSections: new Set(),
  kpiData: {
    mrr: '$12,400',
    burnRate: '$28,000',
    runway: '14 months',
    teamSize: '4',
    mrrUpdated: null,
    burnRateUpdated: null,
    runwayUpdated: null,
    teamSizeUpdated: null,
  },
  weeklyUpdates: [
    {
      id: 'wu-1',
      week: 'Week of Feb 17, 2026',
      done: 'Completed legal entity registration, onboarded first team member, finalized product roadmap v1.',
      numbers: 'MRR: $0, Burn: $18k, Pipeline: 3 prospects',
      blocking: 'Bank account opening delayed — waiting on KYB docs.',
      needs: 'Intro to legal team for employment contracts.',
      urgent: false,
      submittedAt: 'Feb 21, 2026 at 09:14',
    },
    {
      id: 'wu-2',
      week: 'Week of Feb 24, 2026',
      done: 'Closed first pilot agreement with Al-Mashreq Trading. Built MVP payment flow.',
      numbers: 'MRR: $4,200, Burn: $22k, Active pilots: 1',
      blocking: 'Stripe not available in KSA — exploring local payment rails.',
      needs: 'Fintech regulatory guidance from SSU.',
      urgent: false,
      submittedAt: 'Feb 28, 2026 at 11:32',
    },
    {
      id: 'wu-3',
      week: 'Week of Mar 1, 2026',
      done: 'Onboarded 2nd pilot customer. Completed finance audit prep. Demoed to 4 prospects.',
      numbers: 'MRR: $8,900, Burn: $25k, Active pilots: 3',
      blocking: 'Need senior engineer — current team at capacity.',
      needs: 'Talent sourcing support for CTO hire.',
      urgent: true,
      submittedAt: 'Mar 5, 2026 at 14:05',
    },
  ],
  milestones: [
    {
      id: 'ms-1',
      name: 'Company Formation',
      status: 'achieved',
      plannedDate: 'Jan 15, 2026',
      actualDate: 'Jan 18, 2026',
      description: 'Register the legal entity in KSA',
      notes: 'Completed with MISA fast-track approval.',
      history: [
        { date: 'Jan 18, 2026', note: 'Entity registered — CR issued', user: 'Mustafa' },
      ],
    },
    {
      id: 'ms-2',
      name: 'First Hire',
      status: 'at-risk',
      plannedDate: 'Feb 1, 2026',
      actualDate: null,
      description: 'Hire first full-time team member',
      notes: 'CTO search ongoing — 3 finalists in pipeline.',
      history: [
        { date: 'Jan 20, 2026', note: 'Job posted on LinkedIn and Bayt', user: 'Mustafa' },
        { date: 'Feb 5, 2026', note: 'Status changed to At Risk — target date missed', user: 'Sarah Al-Rashid' },
      ],
    },
    {
      id: 'ms-3',
      name: 'Product Launch',
      status: 'upcoming',
      plannedDate: 'Mar 15, 2026',
      actualDate: null,
      description: 'Launch MVP to first paying customers',
      notes: '',
      history: [],
    },
    {
      id: 'ms-4',
      name: 'First Customer',
      status: 'upcoming',
      plannedDate: 'Apr 1, 2026',
      actualDate: null,
      description: 'Sign first paying customer',
      notes: 'Al-Mashreq Trading is warm prospect.',
      history: [],
    },
    {
      id: 'ms-5',
      name: 'First Revenue',
      status: 'upcoming',
      plannedDate: 'Apr 30, 2026',
      actualDate: null,
      description: 'Collect first revenue payment',
      notes: '',
      history: [],
    },
    {
      id: 'ms-6',
      name: 'Seed Fundraise',
      status: 'upcoming',
      plannedDate: 'Aug 1, 2026',
      actualDate: null,
      description: 'Close seed round ($2-3M)',
      notes: 'Will begin outreach after Product Launch milestone.',
      history: [],
    },
  ],
  documents: {
    Legal: [
      { id: 'd-1', name: 'Commercial Registration Certificate', type: 'PDF', size: '2.4 MB', uploaded: 'Jan 18, 2026', version: 'v2', uploader: 'Mustafa', status: 'signed', versions: [{ v: 'v1', date: 'Jan 18, 2026', uploader: 'Mustafa' }, { v: 'v2', date: 'Jan 22, 2026', uploader: 'Omar Hassan' }] },
      { id: 'd-2', name: 'Shareholder Agreement', type: 'PDF', size: '1.8 MB', uploaded: 'Jan 20, 2026', version: 'v1', uploader: 'Sarah Al-Rashid', status: 'pending-signature', versions: [{ v: 'v1', date: 'Jan 20, 2026', uploader: 'Sarah Al-Rashid' }] },
      { id: 'd-3', name: 'IP Assignment Agreement', type: 'DOCX', size: '320 KB', uploaded: 'Jan 25, 2026', version: 'v1', uploader: 'Mustafa', status: 'signed', versions: [{ v: 'v1', date: 'Jan 25, 2026', uploader: 'Mustafa' }] },
      { id: 'd-4', name: 'Employment Contract — CTO', type: 'DOCX', size: '450 KB', uploaded: 'Feb 10, 2026', version: 'v3', uploader: 'Omar Hassan', status: 'pending-signature', versions: [{ v: 'v1', date: 'Feb 5, 2026', uploader: 'Omar Hassan' }, { v: 'v2', date: 'Feb 8, 2026', uploader: 'Mustafa' }, { v: 'v3', date: 'Feb 10, 2026', uploader: 'Omar Hassan' }] },
    ],
    Finance: [
      { id: 'd-5', name: 'Seed Investment Term Sheet', type: 'PDF', size: '1.1 MB', uploaded: 'Jan 15, 2026', version: 'v1', uploader: 'Sarah Al-Rashid', status: 'signed', versions: [{ v: 'v1', date: 'Jan 15, 2026', uploader: 'Sarah Al-Rashid' }] },
      { id: 'd-6', name: 'Financial Model — Tradepay v4', type: 'XLSX', size: '890 KB', uploaded: 'Feb 28, 2026', version: 'v4', uploader: 'Mustafa', status: 'current', versions: [{ v: 'v1', date: 'Jan 10, 2026', uploader: 'Mustafa' }, { v: 'v4', date: 'Feb 28, 2026', uploader: 'Mustafa' }] },
      { id: 'd-7', name: 'Bank Account Opening Documents', type: 'PDF', size: '3.2 MB', uploaded: 'Feb 20, 2026', version: 'v1', uploader: 'Mustafa', status: 'pending-signature', versions: [{ v: 'v1', date: 'Feb 20, 2026', uploader: 'Mustafa' }] },
    ],
    Product: [
      { id: 'd-8', name: 'Product Requirements Document v1', type: 'DOCX', size: '780 KB', uploaded: 'Feb 1, 2026', version: 'v2', uploader: 'Mustafa', status: 'current', versions: [{ v: 'v1', date: 'Jan 28, 2026', uploader: 'Mustafa' }, { v: 'v2', date: 'Feb 1, 2026', uploader: 'Mustafa' }] },
      { id: 'd-9', name: 'Wireframes — Payment Flow', type: 'PDF', size: '4.5 MB', uploaded: 'Feb 10, 2026', version: 'v1', uploader: 'Omar Hassan', status: 'current', versions: [{ v: 'v1', date: 'Feb 10, 2026', uploader: 'Omar Hassan' }] },
    ],
    Fundraising: [
      { id: 'd-10', name: 'Investor Pitch Deck', type: 'PDF', size: '8.2 MB', uploaded: 'Feb 25, 2026', version: 'v3', uploader: 'Mustafa', status: 'current', versions: [{ v: 'v1', date: 'Feb 1, 2026', uploader: 'Mustafa' }, { v: 'v3', date: 'Feb 25, 2026', uploader: 'Mustafa' }] },
      { id: 'd-11', name: 'Cap Table', type: 'XLSX', size: '210 KB', uploaded: 'Jan 18, 2026', version: 'v2', uploader: 'Sarah Al-Rashid', status: 'current', versions: [{ v: 'v1', date: 'Jan 15, 2026', uploader: 'Sarah Al-Rashid' }, { v: 'v2', date: 'Jan 18, 2026', uploader: 'Sarah Al-Rashid' }] },
    ],
    HR: [
      { id: 'd-12', name: 'Employee Handbook', type: 'PDF', size: '1.5 MB', uploaded: 'Feb 5, 2026', version: 'v1', uploader: 'Omar Hassan', status: 'current', versions: [{ v: 'v1', date: 'Feb 5, 2026', uploader: 'Omar Hassan' }] },
      { id: 'd-13', name: 'Job Description — CTO', type: 'DOCX', size: '180 KB', uploaded: 'Jan 28, 2026', version: 'v2', uploader: 'Mustafa', status: 'current', versions: [{ v: 'v1', date: 'Jan 20, 2026', uploader: 'Mustafa' }, { v: 'v2', date: 'Jan 28, 2026', uploader: 'Omar Hassan' }] },
    ],
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        taskStatuses: { ...state.taskStatuses, [action.taskId]: action.status },
      }
    case 'TOGGLE_SUBTASK': {
      const newSubTaskStatuses = { ...state.subTaskStatuses, [action.subTaskId]: action.done }
      // Check if all subtasks for the parent task are now done
      const allDone = action.siblingIds.every(id => (id === action.subTaskId ? action.done : newSubTaskStatuses[id]))
      const newTaskStatus = allDone ? 'done' : (action.done ? 'in-progress' : 'in-progress')
      return {
        ...state,
        subTaskStatuses: newSubTaskStatuses,
        taskStatuses: { ...state.taskStatuses, [action.taskId]: newTaskStatus },
      }
    }
    case 'MARK_ALL_NOTIFICATIONS_READ':
      return { ...state, notificationsRead: true, notificationCount: 0 }
    case 'SET_WEEKLY_UPDATE_SUBMITTED':
      return { ...state, weeklyUpdateSubmitted: true }
    case 'SUBMIT_PULSE_CHECK':
      return { ...state, pulseCheck: action.data, weeklyUpdateSubmitted: true }
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, { id: Date.now(), message: action.message, type: action.toastType || 'default' }] }
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.id) }
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.category }
    case 'SET_SELECTED_CHANNEL':
      return { ...state, selectedChannel: action.channel }
    case 'UPDATE_KPI':
      return { ...state, kpiData: { ...state.kpiData, [action.key]: action.value, [`${action.key}Updated`]: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) } }
    case 'ADD_WEEKLY_UPDATE':
      return { ...state, weeklyUpdates: [action.update, ...state.weeklyUpdates], weeklyUpdateSubmitted: true }
    case 'UPDATE_MILESTONE':
      return {
        ...state,
        milestones: state.milestones.map(m => m.id === action.id ? { ...m, ...action.data } : m),
      }
    case 'ADD_MILESTONE':
      return { ...state, milestones: [...state.milestones, action.milestone] }
    case 'MARK_SECTION_READ':
      const newRead = new Set(state.readSections)
      newRead.add(action.sectionId)
      const chapterSections = action.chapterSections
      const readCount = chapterSections.filter(s => newRead.has(s)).length
      const pct = Math.round((readCount / chapterSections.length) * 100)
      return {
        ...state,
        readSections: newRead,
        playbookProgress: { ...state.playbookProgress, [action.chapterId]: pct },
      }
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.category]: [action.doc, ...(state.documents[action.category] || [])],
        },
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const updateTaskStatus = useCallback((taskId, status) => dispatch({ type: 'UPDATE_TASK_STATUS', taskId, status }), [])
  const toggleSubTask = useCallback((subTaskId, done, taskId, siblingIds) => dispatch({ type: 'TOGGLE_SUBTASK', subTaskId, done, taskId, siblingIds }), [])
  const markAllNotificationsRead = useCallback(() => dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' }), [])
  const setWeeklyUpdateSubmitted = useCallback(() => dispatch({ type: 'SET_WEEKLY_UPDATE_SUBMITTED' }), [])
  const addToast = useCallback((message, toastType = 'default') => {
    const id = Date.now()
    dispatch({ type: 'ADD_TOAST', message, toastType })
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', id }), 3500)
  }, [])
  const removeToast = useCallback((id) => dispatch({ type: 'REMOVE_TOAST', id }), [])
  const setSelectedCategory = useCallback((category) => dispatch({ type: 'SET_SELECTED_CATEGORY', category }), [])
  const setSelectedChannel = useCallback((channel) => dispatch({ type: 'SET_SELECTED_CHANNEL', channel }), [])
  const updateKPI = useCallback((key, value) => dispatch({ type: 'UPDATE_KPI', key, value }), [])
  const addWeeklyUpdate = useCallback((update) => dispatch({ type: 'ADD_WEEKLY_UPDATE', update }), [])
  const updateMilestone = useCallback((id, data) => dispatch({ type: 'UPDATE_MILESTONE', id, data }), [])
  const addMilestone = useCallback((milestone) => dispatch({ type: 'ADD_MILESTONE', milestone }), [])
  const markSectionRead = useCallback((sectionId, chapterId, chapterSections) => dispatch({ type: 'MARK_SECTION_READ', sectionId, chapterId, chapterSections }), [])
  const addDocument = useCallback((category, doc) => dispatch({ type: 'ADD_DOCUMENT', category, doc }), [])
  const submitPulseCheck = useCallback((data) => dispatch({ type: 'SUBMIT_PULSE_CHECK', data }), [])

  return (
    <AppContext.Provider value={{
      ...state,
      updateTaskStatus,
    toggleSubTask,
      markAllNotificationsRead,
      setWeeklyUpdateSubmitted,
      addToast,
      removeToast,
      setSelectedCategory,
      setSelectedChannel,
      updateKPI,
      addWeeklyUpdate,
      updateMilestone,
      addMilestone,
      markSectionRead,
      addDocument,
      submitPulseCheck,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
