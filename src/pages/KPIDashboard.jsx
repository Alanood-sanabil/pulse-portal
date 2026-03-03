import { useState } from 'react'
import { TrendingUp, TrendingDown, Clock, Users, CheckCircle, Pencil } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'

const MOODS = [
  { value: 'struggling', emoji: '😰', label: 'Struggling' },
  { value: 'tough', emoji: '😓', label: 'Tough week' },
  { value: 'steady', emoji: '😐', label: 'Steady' },
  { value: 'good', emoji: '🙂', label: 'Good progress' },
  { value: 'great', emoji: '🚀', label: 'Great week' },
]

const KPI_CONFIG = [
  { key: 'mrr', updatedKey: 'mrrUpdated', label: 'MRR', icon: TrendingUp, colorIcon: 'text-pulse-green', colorBg: 'bg-pulse-green/10', placeholder: 'e.g. $42,000', target: '$25,000', trend: 'up' },
  { key: 'burnRate', updatedKey: 'burnRateUpdated', label: 'Burn Rate', icon: TrendingDown, colorIcon: 'text-pulse-red', colorBg: 'bg-pulse-red/10', placeholder: 'e.g. $18,000/mo', target: '$25,000', trend: 'down' },
  { key: 'runway', updatedKey: 'runwayUpdated', label: 'Runway', icon: Clock, colorIcon: 'text-pulse-blue', colorBg: 'bg-pulse-blue/10', placeholder: 'e.g. 14 months', target: '12 months', trend: 'flat' },
  { key: 'teamSize', updatedKey: 'teamSizeUpdated', label: 'Team Size', icon: Users, colorIcon: 'text-purple-400', colorBg: 'bg-purple-500/10', placeholder: 'e.g. 8', target: '6', trend: 'up' },
]

function extractNumber(str) {
  if (!str) return 0
  return parseInt(str.replace(/[^0-9]/g, '')) || 0
}

function KPICard({ config, value, updatedAt, onSave }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const Icon = config.icon

  function handleEdit() {
    setDraft(value || '')
    setEditing(true)
  }

  function handleSave() {
    if (draft.trim()) {
      onSave(config.key, draft.trim())
    }
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') setEditing(false)
  }

  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-lg ${config.colorBg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${config.colorIcon}`} />
        </div>
        {!editing && (
          <button
            className="btn-ghost flex items-center gap-1 text-xs py-1 px-2"
            onClick={handleEdit}
          >
            <Pencil className="w-3 h-3" />
            Edit
          </button>
        )}
      </div>

      <div>
        <p className="text-text-muted text-xs font-medium">{config.label}</p>
        {editing ? (
          <div className="flex items-center gap-2 mt-1.5">
            <input
              autoFocus
              type="text"
              className="input-field text-sm py-1.5 flex-1"
              placeholder={config.placeholder}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn-primary text-xs py-1.5 px-3" onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          <p className="text-text font-bold text-2xl mt-1 leading-tight">
            {value || <span className="text-text-dim font-normal text-base">Not set</span>}
          </p>
        )}

        <div className="flex items-center gap-1.5 mt-1">
          {config.trend === 'up' && <TrendingUp size={12} className="text-pulse-green" />}
          {config.trend === 'down' && <TrendingDown size={12} className="text-pulse-red" />}
          {config.trend === 'flat' && <span className="text-xs text-text-dim">—</span>}
          <span className={`text-xs ${config.trend === 'up' ? 'text-pulse-green' : config.trend === 'down' ? 'text-pulse-red' : 'text-text-dim'}`}>
            {config.trend === 'up' ? 'Improving' : config.trend === 'down' ? 'Declining' : 'Flat'}
          </span>
        </div>
      </div>

      <p className="text-text-dim text-xs">
        {updatedAt ? `Last updated: ${updatedAt}` : 'Never updated'}
      </p>
    </div>
  )
}

export default function KPIDashboard() {
  const {
    kpiData,
    updateKPI,
    pulseCheck,
    submitPulseCheck,
    setWeeklyUpdateSubmitted,
    addToast,
  } = useApp()

  // Pulse check form state
  const [mood, setMood] = useState('')
  const [forward, setForward] = useState('')
  const [stuck, setStuck] = useState('')

  // Health score calculation
  const taskScore = 27
  const anyKpiUpdated = !!(kpiData.mrrUpdated || kpiData.burnRateUpdated)
  const healthScore = Math.min(100, Math.round(taskScore * 0.4 + 30 + (pulseCheck ? 15 : 0) + (anyKpiUpdated ? 20 : 0)))

  // Chart data
  const chartData = [
    { name: 'MRR ($)', Target: 25000, Actual: extractNumber(kpiData.mrr) },
    { name: 'Burn ($)', Target: 25000, Actual: extractNumber(kpiData.burnRate) },
    { name: 'Runway (mo)', Target: 12, Actual: extractNumber(kpiData.runway) },
    { name: 'Team', Target: 6, Actual: extractNumber(kpiData.teamSize) },
  ]

  function handleKPISave(key, value) {
    updateKPI(key, value)
    addToast(`${KPI_CONFIG.find((k) => k.key === key)?.label} updated.`, 'success')
  }

  function handleSubmitPulse() {
    if (!mood) return
    const now = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
    submitPulseCheck({ mood, forward: forward.trim(), stuck: stuck.trim(), submittedAt: now })
    addToast('Pulse Check submitted!', 'success')
  }

  return (
    <Layout title="KPI Dashboard" subtitle="Venture health and weekly pulse">
      <div className="p-6 space-y-6">

        {/* VENTURE HEALTH SCORE */}
        <div className="card p-6 flex items-center gap-6">
          <div className="shrink-0 text-center">
            <div className="text-5xl font-bold text-amber leading-none">{healthScore}</div>
            <div className="text-xs text-text-muted mt-1">out of 100</div>
          </div>
          <div className="flex-1 border-l border-border pl-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-base font-semibold text-text">Venture Health Score</h2>
              <span className={`text-xs font-medium flex items-center gap-1 ${healthScore >= 50 ? 'text-pulse-green' : 'text-pulse-red'}`}>
                {healthScore >= 50 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {healthScore >= 50 ? '+3 this week' : '-2 this week'}
              </span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">Calculated from task completion, milestone progress, KPI update frequency, and Pulse Check consistency.</p>
            <div className="flex gap-4 mt-3">
              <div className="text-center">
                <div className="text-sm font-semibold text-text">27%</div>
                <div className="text-[10px] text-text-dim">Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-text">1/6</div>
                <div className="text-[10px] text-text-dim">Milestones</div>
              </div>
              <div className="text-center">
                <div className={`text-sm font-semibold ${anyKpiUpdated ? 'text-pulse-green' : 'text-text-dim'}`}>{anyKpiUpdated ? 'Updated' : 'Stale'}</div>
                <div className="text-[10px] text-text-dim">KPIs</div>
              </div>
              <div className="text-center">
                <div className={`text-sm font-semibold ${pulseCheck ? 'text-pulse-green' : 'text-text-dim'}`}>{pulseCheck ? 'Done' : 'Pending'}</div>
                <div className="text-[10px] text-text-dim">Pulse</div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI METRIC CARDS */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {KPI_CONFIG.map((config) => (
              <KPICard
                key={config.key}
                config={config}
                value={kpiData[config.key]}
                updatedAt={kpiData[config.updatedKey]}
                onSave={handleKPISave}
              />
            ))}
          </div>
        </section>

        {/* TARGET VS ACTUAL CHART */}
        <section>
          <h2 className="text-base font-semibold text-text mb-4">Target vs Actual</h2>
          <div className="card p-5">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E2DC" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B6B6B' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ border: '1px solid #E4E2DC', borderRadius: '8px', fontSize: '12px' }}
                  cursor={{ fill: '#F5F4F0' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#6B6B6B' }} />
                <Bar dataKey="Target" fill="#EFF6FF" stroke="#2563EB" strokeWidth={1} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Actual" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* WEEKLY PULSE CHECK */}
        <section>
          {pulseCheck === null || pulseCheck === undefined ? (
            <div className="card p-6 space-y-5">
              <div>
                <h2 className="text-base font-semibold text-text">Weekly Pulse Check</h2>
                <p className="text-text-muted text-sm mt-0.5">Takes 60 seconds. Just for you.</p>
              </div>

              <div>
                <p className="text-xs font-medium text-text-muted mb-3 uppercase tracking-wide">How is the venture feeling this week?</p>
                <div className="flex gap-2">
                  {MOODS.map(m => (
                    <button
                      key={m.value}
                      onClick={() => setMood(m.value)}
                      className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all ${mood === m.value ? 'border-amber bg-amber/5' : 'border-border hover:border-border-subtle'}`}
                    >
                      <span className="text-2xl">{m.emoji}</span>
                      <span className="text-[10px] text-text-muted leading-tight text-center">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5">What moved forward this week</label>
                <textarea
                  value={forward}
                  onChange={e => setForward(e.target.value)}
                  rows={2}
                  className="input-field w-full resize-none text-sm"
                  placeholder="Key wins, shipped features, conversations..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5">What is stuck or needs help</label>
                <textarea
                  value={stuck}
                  onChange={e => setStuck(e.target.value)}
                  rows={2}
                  className="input-field w-full resize-none text-sm"
                  placeholder="Blockers, risks, where you need studio support..."
                />
              </div>

              <button
                onClick={handleSubmitPulse}
                disabled={!mood}
                className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit Pulse
              </button>
            </div>
          ) : (
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-pulse-green/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-pulse-green" />
                </div>
                <div>
                  <p className="text-text font-semibold text-sm">Pulse submitted</p>
                  <p className="text-text-dim text-xs">{pulseCheck.submittedAt}</p>
                </div>
              </div>
              <div className="space-y-3 bg-bg-elevated rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{MOODS.find(m => m.value === pulseCheck.mood)?.emoji}</span>
                  <span className="text-sm font-medium text-text">{MOODS.find(m => m.value === pulseCheck.mood)?.label}</span>
                </div>
                {pulseCheck.forward && <p className="text-xs text-text-muted"><span className="font-medium text-text">Moved forward:</span> {pulseCheck.forward}</p>}
                {pulseCheck.stuck && <p className="text-xs text-text-muted"><span className="font-medium text-text">Stuck on:</span> {pulseCheck.stuck}</p>}
              </div>
              <p className="text-xs text-text-dim mt-3 text-center">Thank you. Sarah will review your pulse before your next check-in.</p>
            </div>
          )}
        </section>

      </div>
    </Layout>
  )
}
