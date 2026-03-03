import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Toast from './components/Toast'
import Login from './pages/Login'
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'
import Toolkit from './pages/Toolkit'
import Playbook from './pages/Playbook'
import VentureContext from './pages/VentureContext'
import RequestHelp from './pages/RequestHelp'
import MyTeam from './pages/MyTeam'
import KPIDashboard from './pages/KPIDashboard'
import Milestones from './pages/Milestones'
import DocumentLibrary from './pages/DocumentLibrary'
import Notifications from './pages/Notifications'
import StudioBoard from './pages/StudioBoard'

function PortalRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/toolkit" element={<Toolkit />} />
      <Route path="/playbook" element={<Playbook />} />
      <Route path="/venture-context" element={<VentureContext />} />
      <Route path="/request-help" element={<RequestHelp />} />
      <Route path="/my-team" element={<MyTeam />} />
      <Route path="/kpi-dashboard" element={<KPIDashboard />} />
      <Route path="/milestones" element={<Milestones />} />
      <Route path="/document-library" element={<DocumentLibrary />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/studio-board" element={<StudioBoard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={() => setIsAuthenticated(true)} />
        <Toast />
      </>
    )
  }

  return (
    <>
      <PortalRoutes />
      <Toast />
    </>
  )
}
