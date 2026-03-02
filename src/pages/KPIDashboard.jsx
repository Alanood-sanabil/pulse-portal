import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Pencil,
} from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';

// Format today's date for the weekly update heading
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTimestamp(date) {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const KPI_CONFIG = [
  {
    key: 'mrr',
    updatedKey: 'mrrUpdated',
    label: 'MRR',
    icon: TrendingUp,
    colorIcon: 'text-pulse-green',
    colorBg: 'bg-pulse-green/10',
    placeholder: 'e.g. $42,000',
  },
  {
    key: 'burnRate',
    updatedKey: 'burnRateUpdated',
    label: 'Burn Rate',
    icon: TrendingDown,
    colorIcon: 'text-pulse-red',
    colorBg: 'bg-pulse-red/10',
    placeholder: 'e.g. $18,000/mo',
  },
  {
    key: 'runway',
    updatedKey: 'runwayUpdated',
    label: 'Runway',
    icon: Clock,
    colorIcon: 'text-pulse-blue',
    colorBg: 'bg-pulse-blue/10',
    placeholder: 'e.g. 14 months',
  },
  {
    key: 'teamSize',
    updatedKey: 'teamSizeUpdated',
    label: 'Team Size',
    icon: Users,
    colorIcon: 'text-purple-400',
    colorBg: 'bg-purple-500/10',
    placeholder: 'e.g. 8',
  },
];

function KPICard({ config, value, updatedAt, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const Icon = config.icon;

  function handleEdit() {
    setDraft(value || '');
    setEditing(true);
  }

  function handleSave() {
    if (draft.trim()) {
      onSave(config.key, draft.trim());
    }
    setEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setEditing(false);
  }

  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-lg ${config.colorBg} flex items-center justify-center`}>
          <Icon className={`w-4.5 h-4.5 ${config.colorIcon}`} />
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
      </div>

      <p className="text-text-dim text-xs">
        {updatedAt ? `Last updated: ${updatedAt}` : 'Never updated'}
      </p>
    </div>
  );
}

function WeeklyUpdateCard({ update, isExpanded, onToggle }) {
  const firstLine = update.done ? update.done.split('\n')[0] : '';

  return (
    <div className="card overflow-hidden">
      {/* Collapsed header — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0">
            {update.urgent ? (
              <AlertTriangle className="w-4 h-4 text-amber" />
            ) : (
              <CheckCircle className="w-4 h-4 text-pulse-green" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-text text-sm font-medium truncate">{update.week}</p>
            <p className="text-text-muted text-xs truncate mt-0.5">{firstLine}</p>
          </div>
        </div>
        <div className="shrink-0 ml-3 text-text-dim group-hover:text-text transition-colors">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded body */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border-subtle pt-4 space-y-4">
          {update.urgent && (
            <span className="badge bg-amber/10 text-amber border-amber/20 text-xs font-medium">
              Urgent
            </span>
          )}

          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              What we got done
            </p>
            <p className="text-text text-sm leading-relaxed whitespace-pre-line">{update.done}</p>
          </div>

          {update.numbers && (
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                Key numbers &amp; metrics
              </p>
              <p className="text-text text-sm leading-relaxed whitespace-pre-line">
                {update.numbers}
              </p>
            </div>
          )}

          {update.blocking && (
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                What's blocking us
              </p>
              <p className="text-text text-sm leading-relaxed whitespace-pre-line">
                {update.blocking}
              </p>
            </div>
          )}

          {update.needs && (
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                What we need from the studio
              </p>
              <p className="text-text text-sm leading-relaxed whitespace-pre-line">
                {update.needs}
              </p>
            </div>
          )}

          <p className="text-text-dim text-xs">Submitted {update.submittedAt}</p>
        </div>
      )}
    </div>
  );
}

export default function KPIDashboard() {
  const {
    kpiData,
    updateKPI,
    weeklyUpdates,
    addWeeklyUpdate,
    setWeeklyUpdateSubmitted,
    addToast,
  } = useApp();

  const today = new Date();
  const weekLabel = `Week of ${formatDate(today)}`;

  // Weekly update form state
  const [done, setDone] = useState('');
  const [numbers, setNumbers] = useState('');
  const [blocking, setBlocking] = useState('');
  const [needs, setNeeds] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [updateSubmitted, setUpdateSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState('');

  // Expanded state for previous updates
  const [expandedIds, setExpandedIds] = useState({});

  function toggleExpanded(id) {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleKPISave(key, value) {
    updateKPI(key, value);
    addToast(`${KPI_CONFIG.find((k) => k.key === key)?.label} updated.`, 'success');
  }

  function validateForm() {
    const errs = {};
    if (!done.trim()) errs.done = 'This field is required.';
    if (!numbers.trim()) errs.numbers = 'This field is required.';
    return errs;
  }

  function handleSubmitUpdate(e) {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setFormErrors({});

    const now = new Date();
    const ts = formatTimestamp(now);
    const newUpdate = {
      id: `wu-${Date.now()}`,
      week: weekLabel,
      done: done.trim(),
      numbers: numbers.trim(),
      blocking: blocking.trim(),
      needs: needs.trim(),
      urgent,
      submittedAt: ts,
    };

    addWeeklyUpdate(newUpdate);
    setWeeklyUpdateSubmitted();
    setSubmittedAt(ts);
    setUpdateSubmitted(true);
    addToast('Weekly update submitted!', 'success');

    // Clear fields
    setDone('');
    setNumbers('');
    setBlocking('');
    setNeeds('');
    setUrgent(false);
  }

  return (
    <Layout title="KPI Dashboard" subtitle="Track metrics and submit your weekly update">
      {/* KPI METRIC CARDS */}
      <section className="mb-8">
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

      {/* WEEKLY UPDATE FORM */}
      <section className="mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-text">Weekly Update</h2>
              <p className="text-text-muted text-sm mt-0.5">{weekLabel}</p>
            </div>
            {updateSubmitted && (
              <div className="flex items-center gap-2 text-pulse-green text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Submitted {submittedAt}</span>
              </div>
            )}
          </div>

          {updateSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="w-14 h-14 rounded-full bg-pulse-green/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-pulse-green" />
              </div>
              <div className="text-center">
                <p className="text-text font-semibold">Update submitted!</p>
                <p className="text-text-muted text-sm mt-1">Submitted at {submittedAt}</p>
                <button
                  className="btn-ghost text-xs mt-3"
                  onClick={() => setUpdateSubmitted(false)}
                >
                  Submit another update
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitUpdate} className="space-y-5">
              {/* What we got done */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">
                  What we got done this week{' '}
                  <span className="text-pulse-red text-xs">*</span>
                </label>
                <textarea
                  className="input-field w-full min-h-[90px] resize-y"
                  placeholder="Key accomplishments and shipped work…"
                  value={done}
                  onChange={(e) => {
                    setDone(e.target.value);
                    if (formErrors.done) setFormErrors((p) => ({ ...p, done: undefined }));
                  }}
                />
                {formErrors.done && (
                  <p className="text-pulse-red text-xs mt-1">{formErrors.done}</p>
                )}
              </div>

              {/* Key numbers */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">
                  Key numbers &amp; metrics{' '}
                  <span className="text-pulse-red text-xs">*</span>
                </label>
                <textarea
                  className="input-field w-full min-h-[90px] resize-y"
                  placeholder="Revenue, signups, DAU, burn — whatever moved this week…"
                  value={numbers}
                  onChange={(e) => {
                    setNumbers(e.target.value);
                    if (formErrors.numbers) setFormErrors((p) => ({ ...p, numbers: undefined }));
                  }}
                />
                {formErrors.numbers && (
                  <p className="text-pulse-red text-xs mt-1">{formErrors.numbers}</p>
                )}
              </div>

              {/* Blocking */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">
                  What's blocking us{' '}
                  <span className="text-text-dim text-xs">(optional)</span>
                </label>
                <textarea
                  className="input-field w-full min-h-[80px] resize-y"
                  placeholder="Dependencies, risks, bottlenecks…"
                  value={blocking}
                  onChange={(e) => setBlocking(e.target.value)}
                />
              </div>

              {/* Needs */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">
                  What we need from the studio{' '}
                  <span className="text-text-dim text-xs">(optional)</span>
                </label>
                <textarea
                  className="input-field w-full min-h-[80px] resize-y"
                  placeholder="Introductions, resources, decisions…"
                  value={needs}
                  onChange={(e) => setNeeds(e.target.value)}
                />
              </div>

              {/* Urgent flag */}
              <div>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border accent-amber cursor-pointer"
                    checked={urgent}
                    onChange={(e) => setUrgent(e.target.checked)}
                  />
                  <span className="text-sm text-text-muted">Flag as urgent</span>
                </label>
                {urgent && (
                  <div className="flex items-start gap-2 rounded-lg bg-amber/10 border border-amber/20 px-4 py-3 mt-3">
                    <AlertTriangle className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                    <p className="text-amber text-sm">
                      This update will be flagged as urgent and your Portfolio Manager will be
                      notified immediately.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="pt-1">
                <button type="submit" className="btn-primary w-full">
                  Submit Update
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* PREVIOUS UPDATES */}
      <section>
        <h2 className="text-base font-semibold text-text mb-4">Previous Updates</h2>
        {weeklyUpdates && weeklyUpdates.length > 0 ? (
          <div className="space-y-3">
            {[...weeklyUpdates].reverse().map((update) => (
              <WeeklyUpdateCard
                key={update.id}
                update={update}
                isExpanded={!!expandedIds[update.id]}
                onToggle={() => toggleExpanded(update.id)}
              />
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <p className="text-text-muted text-sm">No previous updates yet.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
