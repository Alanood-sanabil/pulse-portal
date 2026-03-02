import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Paperclip, AlertTriangle, ChevronRight, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import { recentRequests } from '../data/mockData';

const CATEGORIES = ['Legal', 'Finance', 'HR', 'IT', 'Talent', 'Operations'];
const PRIORITIES = ['Normal', 'High', 'Urgent'];

const priorityStyles = {
  Normal: 'bg-bg-elevated text-text-muted border border-border',
  High: 'bg-amber/10 text-amber border border-amber/20',
  Urgent: 'bg-pulse-red/10 text-pulse-red border border-pulse-red/20',
};

const statusStyles = {
  Resolved: 'bg-pulse-green/10 text-pulse-green',
  'In Progress': 'bg-amber/10 text-amber',
  Responded: 'bg-pulse-blue/10 text-pulse-blue',
};

export default function RequestHelp() {
  const { selectedCategory, setSelectedCategory, addToast } = useApp();

  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fileInputRef = useRef(null);

  // Pre-select category from context (e.g., navigating from My Team)
  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
      setSelectedCategory(null);
    }
  }, [selectedCategory, setSelectedCategory]);

  // Auto-reset form after 4 seconds on success
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setCategory('');
        setPriority('Normal');
        setTitle('');
        setDescription('');
        setAttachment(null);
        setErrors({});
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  function validate() {
    const newErrors = {};
    if (!category) newErrors.category = 'Please select a category.';
    if (!title.trim()) newErrors.title = 'Please enter a title.';
    if (!description.trim()) newErrors.description = 'Please enter a description.';
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    addToast('Request submitted successfully!', 'success');
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  }

  return (
    <Layout title="Request Help" subtitle="Get support from your Studio Support Unit">
      <div className="flex gap-6 items-start">
        {/* LEFT COLUMN — REQUEST FORM */}
        <div className="flex-[3] min-w-0">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-text mb-5">Submit a New Request</h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4">
                <div className="w-14 h-14 rounded-full bg-pulse-green/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-pulse-green" />
                </div>
                <div className="text-center">
                  <p className="text-text font-semibold text-lg">Request Submitted!</p>
                  <p className="text-text-muted text-sm mt-1">
                    Reference number:{' '}
                    <span className="font-mono font-medium text-text">REQ-2026-047</span>
                  </p>
                  <p className="text-text-dim text-xs mt-2">
                    Your form will reset in a few seconds…
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Category
                  </label>
                  <select
                    className="input-field w-full"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      if (errors.category) setErrors((prev) => ({ ...prev, category: undefined }));
                    }}
                  >
                    <option value="">Select a category…</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-pulse-red text-xs mt-1">{errors.category}</p>
                  )}
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Priority
                  </label>
                  <select
                    className="input-field w-full"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Urgent warning */}
                {priority === 'Urgent' && (
                  <div className="flex items-start gap-2 rounded-lg bg-amber/10 border border-amber/20 px-4 py-3">
                    <AlertTriangle className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                    <p className="text-amber text-sm">
                      Your Portfolio Manager{' '}
                      <span className="font-semibold">Sarah Al-Rashid</span> will be notified
                      immediately.
                    </p>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Title</label>
                  <input
                    type="text"
                    className="input-field w-full"
                    placeholder="Brief summary of your request"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
                    }}
                  />
                  {errors.title && (
                    <p className="text-pulse-red text-xs mt-1">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Description
                  </label>
                  <textarea
                    className="input-field w-full min-h-[120px] resize-y"
                    placeholder="Describe your request in detail…"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description)
                        setErrors((prev) => ({ ...prev, description: undefined }));
                    }}
                  />
                  {errors.description && (
                    <p className="text-pulse-red text-xs mt-1">{errors.description}</p>
                  )}
                </div>

                {/* Attachment */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    className="btn-ghost flex items-center gap-2 text-sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-4 h-4" />
                    {attachment ? attachment.name : 'Attach a file'}
                  </button>
                </div>

                {/* Submit */}
                <div className="pt-1">
                  <button type="submit" className="btn-primary w-full">
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN — RECENT REQUESTS */}
        <div className="flex-[2] min-w-0">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-text mb-5">Recent Requests</h2>
            <div className="space-y-3">
              {recentRequests.slice(0, 4).map((req) => (
                <button
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className="w-full text-left rounded-xl border border-border bg-bg-surface hover:bg-bg-elevated transition-colors p-4 group"
                >
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="badge font-mono text-xs">{req.id}</span>
                    <span className="badge">{req.category}</span>
                    <span
                      className={`badge text-xs font-medium ${priorityStyles[req.priority] || priorityStyles.Normal}`}
                    >
                      {req.priority}
                    </span>
                    <span
                      className={`badge text-xs font-medium ml-auto ${statusStyles[req.status] || 'bg-bg-elevated text-text-muted'}`}
                    >
                      {req.status}
                    </span>
                  </div>
                  {/* Title */}
                  <p className="text-text text-sm font-medium leading-snug group-hover:text-amber transition-colors">
                    {req.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* REQUEST DETAIL MODAL */}
      {selectedRequest && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title={selectedRequest.title}
        >
          <div className="space-y-5">
            {/* Meta badges */}
            <div className="flex flex-wrap gap-2">
              <span className="badge font-mono text-xs">{selectedRequest.id}</span>
              <span className="badge">{selectedRequest.category}</span>
              <span
                className={`badge text-xs font-medium ${priorityStyles[selectedRequest.priority] || priorityStyles.Normal}`}
              >
                {selectedRequest.priority}
              </span>
              <span
                className={`badge text-xs font-medium ${statusStyles[selectedRequest.status] || 'bg-bg-elevated text-text-muted'}`}
              >
                {selectedRequest.status}
              </span>
            </div>

            {/* Submitted date */}
            <div className="flex items-center gap-1.5 text-text-muted text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>Submitted {selectedRequest.submittedAt}</span>
            </div>

            {/* Description */}
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                Description
              </p>
              <p className="text-text text-sm leading-relaxed">{selectedRequest.description}</p>
            </div>

            {/* SSU Response */}
            {selectedRequest.response && (
              <div className="rounded-lg bg-bg-elevated border border-border p-4">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                  SSU Response
                </p>
                <p className="text-text text-sm leading-relaxed">{selectedRequest.response}</p>
              </div>
            )}

            {/* Timeline */}
            {selectedRequest.timeline && selectedRequest.timeline.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                  Status Timeline
                </p>
                <div className="relative space-y-0">
                  {selectedRequest.timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-amber mt-1.5 shrink-0" />
                        {idx < selectedRequest.timeline.length - 1 && (
                          <div className="w-px flex-1 bg-border-subtle mt-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-text text-sm font-medium">{item.event}</p>
                        <p className="text-text-muted text-xs mt-0.5">
                          {item.date} · {item.by}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </Layout>
  );
}
