import { useState } from 'react'
import { TrendingUp, TrendingDown, Clock, Users, Pencil, Plus, Download, StickyNote, X, History } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'

const DATE_RANGES = ['This Month', 'Last 3 Months', 'Last 6 Months', 'All Time']

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

function KPICard({ config, value, updatedAt, onSave, history, note, onSaveNote }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [editingNote, setEditingNote] = useState(false)
  const [noteDraft, setNoteDraft] = useState(note || '')
  const Icon = config.icon

  function handleEdit() { setDraft(value || ''); setEditing(true) }
  function handleSave() { if (draft.trim()) onSave(config.key, draft.trim()); setEditing(false) }
  function handleKeyDown(e) { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setEditing(false) }

  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-lg ${config.colorBg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${config.colorIcon}`} />
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowHistory(h => !h)}
            className="btn-ghost flex items-center gap-1 text-xs py-1 px-2"
            title="View history"
          >
            <History className="w-3 h-3" />
          </button>
          {!editing && (
            <button className="btn-ghost flex items-center gap-1 text-xs py-1 px-2" onClick={handleEdit}>
              <Pencil className="w-3 h-3" />
              Edit
            </button>
          )}
        </div>
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
              onChange={e => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn-primary text-xs py-1.5 px-3" onClick={handleSave}>Save</button>
          </div>
        ) : (
          <p className="text-text font-bold font-mono text-2xl mt-1 leading-tight">
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
          <span className="text-xs text-text-dim ml-auto">Target: {config.target}</span>
        </div>
      </div>

      <p className="text-text-dim text-xs">{updatedAt ? `Last updated: ${updatedAt}` : 'Never updated'}</p>

      {/* History log */}
      {showHistory && (
        <div className="border-t border-border pt-3 space-y-1.5">
          <p className="text-[10px] font-semibold text-text-dim uppercase tracking-widest">Recent History</p>
          {history && history.length > 0 ? (
            history.slice(-5).reverse().map((h, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="font-mono text-text">{h.value}</span>
                <span className="text-text-dim">{h.date}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-text-dim">No history yet</p>
          )}
        </div>
      )}

      {/* Notes */}
      <div className="border-t border-border pt-3">
        {editingNote ? (
          <div className="space-y-2">
            <textarea
              autoFocus
              value={noteDraft}
              onChange={e => setNoteDraft(e.target.value)}
              placeholder="Add a note for this KPI…"
              rows={2}
              className="input-field w-full text-xs resize-none"
            />
            <div className="flex gap-2">
              <button onClick={() => { onSaveNote(config.key, noteDraft); setEditingNote(false) }} className="btn-primary text-xs py-1 px-3">Save</button>
              <button onClick={() => setEditingNote(false)} className="btn-ghost text-xs py-1 px-2">Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => { setNoteDraft(note || ''); setEditingNote(true) }}
            className="flex items-center gap-1.5 text-xs text-text-dim hover:text-text transition-colors"
          >
            <StickyNote size={11} />
            {note ? <span className="truncate max-w-[140px]">{note}</span> : 'Add note'}
          </button>
        )}
      </div>
    </div>
  )
}

function exportKPIsToCSV(kpiData, customKPIs) {
  const allKPIs = [
    ...KPI_CONFIG.map(c => ({ label: c.label, value: kpiData[c.key] || '', target: c.target, updated: kpiData[c.updatedKey] || '' })),
    ...customKPIs.map(c => ({ label: c.label, value: c.value || '', target: c.target || '', updated: c.updatedAt || '' })),
  ]
  const header = ['KPI', 'Current Value', 'Target', 'Last Updated']
  const lines = [header.join(','), ...allKPIs.map(k => [k.label, k.value, k.target, k.updated].join(','))]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'kpi-snapshot.csv'; a.click()
  URL.revokeObjectURL(url)
}

export default function KPIDashboard() {
  const { kpiData, updateKPI, addToast } = useApp()
  const [dateRange, setDateRange] = useState('This Month')
  const [showAddKPI, setShowAddKPI] = useState(false)
  const [customKPIs, setCustomKPIs] = useState([])
  const [newKPI, setNewKPI] = useState({ label: '', placeholder: '', target: '' })
  const [kpiHistory, setKpiHistory] = useState({})
  const [kpiNotes, setKpiNotes] = useState({})

  const taskScore = 27
  const anyKpiUpdated = !!(kpiData.mrrUpdated || kpiData.burnRateUpdated)
  const healthScore = Math.min(100, Math.round(taskScore * 0.5 + 40 + (anyKpiUpdated ? 20 : 0)))

  const chartData = [
    { name: 'MRR ($)', Target: 25000, Actual: extractNumber(kpiData.mrr) },
    { name: 'Burn ($)', Target: 25000, Actual: extractNumber(kpiData.burnRate) },
    { name: 'Runway (mo)', Target: 12, Actual: extractNumber(kpiData.runway) },
    { name: 'Team', Target: 6, Actual: extractNumber(kpiData.teamSize) },
  ]

  function handleKPISave(key, value) {
    const date = 'Mar 4, 2026'
    updateKPI(key, value)
    setKpiHistory(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), { value, date }]
    }))
    addToast(`${KPI_CONFIG.find(k => k.key === key)?.label} updated.`, 'success')
  }

  function handleSaveNote(key, note) {
    setKpiNotes(prev => ({ ...prev, [key]: note }))
    addToast('Note saved', 'success')
  }

  function handleAddCustomKPI() {
    if (!newKPI.label.trim()) return
    setCustomKPIs(prev => [...prev, { ...newKPI, id: `custom-${Date.now()}`, value: '', updatedAt: '' }])
    setNewKPI({ label: '', placeholder: '', target: '' })
    setShowAddKPI(false)
    addToast('Custom KPI added', 'success')
  }

  return (
    <Layout title="KPI Dashboard" subtitle="Venture health and key metrics">
      <div className="p-6 space-y-6">

        {/* Date range + Export */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2">
            {DATE_RANGES.map(r => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  dateRange === r ? 'bg-amber/10 text-amber border-amber/20' : 'bg-bg-elevated text-text-muted border-border hover:text-text'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={() => { exportKPIsToCSV(kpiData, customKPIs); addToast('CSV exported', 'success') }}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>

        {/* VENTURE HEALTH SCORE */}
        <div className="card p-6 flex items-center gap-6">
          <div className="shrink-0 text-center">
            <div className="text-5xl font-bold font-mono text-amber leading-none">{healthScore}</div>
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
            <div className="w-full bg-bg-elevated rounded-full h-1.5 mt-3">
              <div className="bg-amber h-1.5 rounded-full" style={{ width: `${healthScore}%` }} />
            </div>
            <div className="flex gap-4 mt-3">
              <div className="text-center"><div className="text-sm font-semibold text-text">27%</div><div className="text-[10px] text-text-dim">Tasks</div></div>
              <div className="text-center"><div className="text-sm font-semibold text-text">1/6</div><div className="text-[10px] text-text-dim">Milestones</div></div>
              <div className="text-center"><div className={`text-sm font-semibold ${anyKpiUpdated ? 'text-pulse-green' : 'text-text-dim'}`}>{anyKpiUpdated ? 'Updated' : 'Stale'}</div><div className="text-[10px] text-text-dim">KPIs</div></div>
            </div>
          </div>
        </div>

        {/* KPI METRIC CARDS */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text">Key Metrics · {dateRange}</h2>
            <button
              onClick={() => setShowAddKPI(s => !s)}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <Plus size={14} />
              Add Custom KPI
            </button>
          </div>

          {/* Add custom KPI form */}
          {showAddKPI && (
            <div className="mb-4 p-4 bg-bg-elevated border border-border rounded-xl space-y-3">
              <p className="text-xs font-semibold text-text-dim uppercase tracking-widest">New Custom KPI</p>
              <div className="grid grid-cols-3 gap-3">
                <input type="text" placeholder="KPI Name (e.g. CAC)" value={newKPI.label} onChange={e => setNewKPI(p => ({ ...p, label: e.target.value }))} className="input-field text-sm" />
                <input type="text" placeholder="Placeholder value" value={newKPI.placeholder} onChange={e => setNewKPI(p => ({ ...p, placeholder: e.target.value }))} className="input-field text-sm" />
                <input type="text" placeholder="Target value" value={newKPI.target} onChange={e => setNewKPI(p => ({ ...p, target: e.target.value }))} className="input-field text-sm" />
              </div>
              <div className="flex gap-2">
                <button onClick={handleAddCustomKPI} className="btn-primary text-sm">Add KPI</button>
                <button onClick={() => setShowAddKPI(false)} className="btn-ghost text-sm">Cancel</button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {KPI_CONFIG.map(config => (
              <KPICard
                key={config.key}
                config={config}
                value={kpiData[config.key]}
                updatedAt={kpiData[config.updatedKey]}
                onSave={handleKPISave}
                history={kpiHistory[config.key]}
                note={kpiNotes[config.key]}
                onSaveNote={handleSaveNote}
              />
            ))}
            {customKPIs.map(ckpi => (
              <div key={ckpi.id} className="card p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-bg-elevated flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-text-muted" />
                  </div>
                  <button
                    onClick={() => setCustomKPIs(prev => prev.filter(k => k.id !== ckpi.id))}
                    className="w-6 h-6 flex items-center justify-center rounded text-text-dim hover:text-pulse-red transition-colors"
                    aria-label="Remove KPI"
                  >
                    <X size={12} />
                  </button>
                </div>
                <div>
                  <p className="text-text-muted text-xs font-medium">{ckpi.label}</p>
                  <p className="text-text-dim font-normal text-base mt-1">Not set</p>
                </div>
                {ckpi.target && <p className="text-xs text-text-dim">Target: {ckpi.target}</p>}
                <p className="text-text-dim text-xs">Never updated</p>
              </div>
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
                <Tooltip contentStyle={{ border: '1px solid #E4E2DC', borderRadius: '8px', fontSize: '12px' }} cursor={{ fill: '#F5F4F0' }} />
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
