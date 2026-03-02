import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scale,
  DollarSign,
  Users,
  Cpu,
  Layers,
  Target,
  Mail,
  CalendarDays,
  MessageSquare,
  FileQuestion,
  ChevronRight,
} from 'lucide-react';
import Layout from '../components/Layout';
import BookingModal from '../components/BookingModal';
import { useApp } from '../context/AppContext';
import { teamMembers, ssuTeam } from '../data/mockData';

const AVATAR_COLORS = [
  'bg-amber/20 text-amber',
  'bg-pulse-blue/10 text-pulse-blue',
  'bg-pulse-green/10 text-pulse-green',
  'bg-pulse-red/10 text-pulse-red',
  'bg-purple-500/10 text-purple-400',
  'bg-teal-500/10 text-teal-400',
];

function getAvatarColor(index) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

const WHO_HANDLES = [
  {
    icon: Scale,
    label: 'Legal matters',
    description: 'Contracts, IP, compliance',
    action: 'request',
    category: 'Legal',
    path: '/request-help',
  },
  {
    icon: DollarSign,
    label: 'Finance & accounting',
    description: 'Budgets, invoices, reporting',
    action: 'request',
    category: 'Finance',
    path: '/request-help',
  },
  {
    icon: Users,
    label: 'Hiring & HR',
    description: 'Recruiting, people ops',
    action: 'request',
    category: 'Talent',
    path: '/request-help',
  },
  {
    icon: Layers,
    label: 'Product & design',
    description: 'Frameworks, resources, tools',
    action: 'navigate',
    path: '/toolkit',
  },
  {
    icon: Cpu,
    label: 'Tech & infrastructure',
    description: 'Cloud, devtools, security',
    action: 'navigate',
    path: '/toolkit',
  },
  {
    icon: Target,
    label: 'Track milestones',
    description: 'Goals, deadlines, progress',
    action: 'navigate',
    path: '/milestones',
  },
];

function TeamCard({ member, index, onBook, onMessage }) {
  return (
    <div className="card p-5 flex flex-col gap-4">
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base shrink-0 ${getAvatarColor(index)}`}
        >
          {member.initials}
        </div>
        <div className="min-w-0">
          <p className="text-text font-semibold text-sm truncate">{member.name}</p>
          <p className="text-text-muted text-xs truncate">{member.role}</p>
        </div>
      </div>

      {/* Bio */}
      {member.bio && (
        <p className="text-text-dim text-xs leading-relaxed line-clamp-3">{member.bio}</p>
      )}

      {/* Email */}
      <a
        href={`mailto:${member.email}`}
        className="flex items-center gap-1.5 text-text-muted hover:text-amber text-xs transition-colors truncate"
      >
        <Mail className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">{member.email}</span>
      </a>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-1">
        <button className="btn-secondary flex items-center gap-1.5 text-xs" onClick={onBook}>
          <CalendarDays className="w-3.5 h-3.5" />
          Book
        </button>
        <button className="btn-ghost flex items-center gap-1.5 text-xs" onClick={onMessage}>
          <MessageSquare className="w-3.5 h-3.5" />
          Message
        </button>
      </div>
    </div>
  );
}

function SSUCard({ member, index, onBook, onMessage, onRequest }) {
  return (
    <div className="card p-5 flex flex-col gap-4">
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base shrink-0 ${getAvatarColor(index + teamMembers.length)}`}
        >
          {member.initials}
        </div>
        <div className="min-w-0">
          <p className="text-text font-semibold text-sm truncate">{member.name}</p>
          <p className="text-text-muted text-xs truncate">{member.role}</p>
        </div>
      </div>

      {/* Email */}
      <a
        href={`mailto:${member.email}`}
        className="flex items-center gap-1.5 text-text-muted hover:text-amber text-xs transition-colors truncate"
      >
        <Mail className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">{member.email}</span>
      </a>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-auto pt-1">
        <button className="btn-secondary flex items-center gap-1.5 text-xs" onClick={onBook}>
          <CalendarDays className="w-3.5 h-3.5" />
          Book
        </button>
        <button className="btn-ghost flex items-center gap-1.5 text-xs" onClick={onMessage}>
          <MessageSquare className="w-3.5 h-3.5" />
          Message
        </button>
        <button className="btn-ghost flex items-center gap-1.5 text-xs" onClick={onRequest}>
          <FileQuestion className="w-3.5 h-3.5" />
          Request
        </button>
      </div>
    </div>
  );
}

export default function MyTeam() {
  const navigate = useNavigate();
  const { setSelectedChannel, setSelectedCategory } = useApp();
  const [bookingPerson, setBookingPerson] = useState(null);

  function handleMessage(member) {
    setSelectedChannel(member.channel);
    navigate('/studio-chat');
  }

  function handleRequest(member) {
    setSelectedCategory(member.category);
    navigate('/request-help');
  }

  function handleWhoHandles(item) {
    if (item.action === 'request' && item.category) {
      setSelectedCategory(item.category);
    }
    navigate(item.path);
  }

  return (
    <Layout title="My Team" subtitle="Your Studio Support Team and SSU contacts">
      {/* Studio Support Team */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-text mb-4">Your Studio Support Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member, idx) => (
            <TeamCard
              key={member.id}
              member={member}
              index={idx}
              onBook={() => setBookingPerson(member)}
              onMessage={() => handleMessage(member)}
            />
          ))}
        </div>
      </section>

      {/* SSU Section */}
      <section className="mb-10">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-text">Studio Support Unit (SSU)</h2>
          <p className="text-text-muted text-sm mt-1">
            Specialists who handle legal, finance, talent, and operations across all portfolio
            companies.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ssuTeam.map((member, idx) => (
            <SSUCard
              key={member.id}
              member={member}
              index={idx}
              onBook={() => setBookingPerson(member)}
              onMessage={() => handleMessage(member)}
              onRequest={() => handleRequest(member)}
            />
          ))}
        </div>
      </section>

      {/* Who Handles What */}
      <section>
        <h2 className="text-base font-semibold text-text mb-4">Who Handles What</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {WHO_HANDLES.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleWhoHandles(item)}
                className="card p-4 text-left group hover:border-amber/40 transition-colors flex flex-col gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-amber/10 flex items-center justify-center shrink-0 group-hover:bg-amber/20 transition-colors">
                  <Icon className="w-4.5 h-4.5 text-amber" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-text text-sm font-medium leading-snug">{item.label}</p>
                  <p className="text-text-dim text-xs mt-0.5 leading-snug">{item.description}</p>
                </div>
                <div className="flex items-center gap-1 text-amber text-xs font-medium">
                  <span>Go</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Booking Modal */}
      {bookingPerson && (
        <BookingModal
          isOpen={!!bookingPerson}
          onClose={() => setBookingPerson(null)}
          person={bookingPerson}
        />
      )}
    </Layout>
  );
}
