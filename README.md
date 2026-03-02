# Pulse Founder Portal — Sanabil Studio

An internal venture management portal for founders spun out of Sanabil Studio. Built as a fully interactive prototype for the Tradepay venture (Founder: Mustafa Al-Amin).

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** for styling
- **React Router v6** for navigation
- **Lucide React** for icons
- **React Context + useReducer** for global state

## Getting Started

### Prerequisites
- Node.js 18+ and npm 9+

### Installation

```bash
# Clone or navigate to the project
cd pulse-portal

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for production
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx          # Navigation sidebar with all 12 routes
│   ├── Topbar.jsx           # Top header with notifications bell
│   ├── Layout.jsx           # Page wrapper (Sidebar + Topbar + main)
│   ├── SidePanel.jsx        # Reusable slide-in right panel
│   ├── Modal.jsx            # Reusable centered modal
│   ├── Toast.jsx            # Toast notification system (bottom-right)
│   ├── BookingModal.jsx     # Calendar booking modal
│   └── TaskDetailPanel.jsx  # Task detail panel (shared between Home & Onboarding)
├── context/
│   └── AppContext.jsx       # Global state (tasks, notifications, KPIs, milestones, docs)
├── data/
│   └── mockData.js          # All hardcoded mock data for Tradepay venture
├── pages/
│   ├── Home.jsx             # Founder Home with venture snapshot, tasks, activity
│   ├── Onboarding.jsx       # Onboarding Hub with task checklist and progress
│   ├── Toolkit.jsx          # Founder Toolkit (services, templates, perks)
│   ├── Playbook.jsx         # Founder Playbook with chapters and sections
│   ├── VentureContext.jsx   # Venture context with market, product, decisions
│   ├── RequestHelp.jsx      # Request help form and recent requests
│   ├── MyTeam.jsx           # Team directory with booking and messaging
│   ├── KPIDashboard.jsx     # KPI tracking and weekly updates
│   ├── Milestones.jsx       # Milestone timeline with achievement logging
│   ├── DocumentLibrary.jsx  # Document management with upload and versioning
│   ├── Notifications.jsx    # Notification center with filtering
│   └── StudioChat.jsx       # Slack-style messaging interface
├── App.jsx                  # Route configuration
├── main.jsx                 # React entry point
└── index.css                # Tailwind directives + custom CSS
```

## Venture Data

All data is mock data for the **Tradepay** venture:
- **Founder**: Mustafa Al-Amin (CEO & Co-Founder)
- **Portfolio Manager**: Sarah Al-Rashid
- **Venture Architect**: Omar Hassan
- **Stage**: Spin-out Phase 1

## Key Features

| Feature | Screen | Description |
|---|---|---|
| Task management | Home, Onboarding | Click any task to open detail panel with status, steps, notes |
| Phase progress | Home, Onboarding | Live progress bar tracking from global state |
| Weekly updates | KPI Dashboard | Submit updates; banner on Home hides after submission |
| Milestone logging | Milestones | Log achievements, add custom milestones |
| Document upload | Document Library | Upload files, view version history |
| Booking calendar | My Team, Home | Book meetings with Mon–Thu slot calendar |
| Studio Chat | Studio Chat | Slack-style messaging with 5 pre-loaded channels |
| Notifications | Notifications | Filter + mark all read (updates sidebar badge) |
| Request Help | Request Help | Form with pre-selection from My Team → navigates with category |
| Playbook | Playbook | Chapter → section drill-down with mark-as-read tracking |
