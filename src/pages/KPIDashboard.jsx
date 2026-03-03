import { useState } from 'react'
import { TrendingUp, TrendingDown, Clock, Users, Pencil } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'

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
    addToast,
  } = useApp()

  // Health score calculation
  const taskScore = 27
  const anyKpiUpdated = !!(kpiData.mrrUpdated || kpiData.burnRateUpdated)
  const healthScore = Math.min(100, Math.round(taskScore * 0.5 + 40 + (anyKpiUpdated ? 20 : 0)))

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

  return (
    <Layout title="KPI Dashboard" subtitle="Venture health and key metrics">
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
            <p className="text-xs text-text-muted leading-relaxed">Calculated from task completion, milestone progress, and KPI update frequency.</p>
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

      </div>
    </Layout>
  )
}
