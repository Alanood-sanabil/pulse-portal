import { useState, useEffect, useRef } from 'react'
import { Hash, Send, Zap } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useApp } from '../context/AppContext'
import { chatMessages as initialChatMessages } from '../data/mockData'

const CHANNELS = [
  { id: 'tradepay-general', label: 'tradepay-general' },
  { id: 'tradepay-pm-sarah', label: 'tradepay-pm-sarah' },
  { id: 'tradepay-ssu-legal', label: 'tradepay-ssu-legal' },
  { id: 'tradepay-ssu-finance', label: 'tradepay-ssu-finance' },
  { id: 'tradepay-ssu-talent', label: 'tradepay-ssu-talent' },
]

// Avatar color palette — consistent per initials
const AVATAR_COLORS = {
  SA: 'bg-pulse-blue/20 text-pulse-blue',
  OH: 'bg-pulse-green/20 text-pulse-green',
  MA: 'bg-amber/20 text-amber',
  LM: 'bg-pulse-red/20 text-pulse-red',
  KA: 'bg-purple-500/20 text-purple-400',
  NF: 'bg-teal-500/20 text-teal-400',
  RA: 'bg-orange-500/20 text-orange-400',
}

function getAvatarColor(initials) {
  return AVATAR_COLORS[initials] || 'bg-bg-elevated text-text-muted'
}

function formatMessageTime() {
  const now = new Date()
  const h = now.getHours().toString().padStart(2, '0')
  const m = now.getMinutes().toString().padStart(2, '0')
  return `Today ${h}:${m}`
}

function Avatar({ initials, size = 'w-9 h-9' }) {
  return (
    <div className={`${size} rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getAvatarColor(initials)}`}>
      {initials}
    </div>
  )
}

export default function StudioChat() {
  const { selectedChannel, setSelectedChannel } = useApp()

  // Local messages state — initialized from mock data, allows adding new messages
  const [channelMessages, setChannelMessages] = useState(() => {
    const init = {}
    CHANNELS.forEach(ch => {
      init[ch.id] = [...(initialChatMessages[ch.id] || [])]
    })
    return init
  })

  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const activeChannel = selectedChannel || 'tradepay-general'
  const messages = channelMessages[activeChannel] || []

  // Scroll to bottom when channel changes or new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeChannel, messages.length])

  function handleChannelSelect(channelId) {
    setSelectedChannel(channelId)
    setInputValue('')
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  function sendMessage() {
    const text = inputValue.trim()
    if (!text) return

    const newMsg = {
      id: 'm-' + Date.now(),
      sender: 'Mustafa Al-Amin',
      initials: 'MA',
      role: 'CEO & Co-Founder',
      time: formatMessageTime(),
      text,
    }

    setChannelMessages(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg],
    }))
    setInputValue('')
    textareaRef.current?.focus()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const channelLabel = CHANNELS.find(c => c.id === activeChannel)?.label || activeChannel

  return (
    <div className="flex h-screen bg-bg-base overflow-hidden">
      {/* App-wide Sidebar */}
      <Sidebar />

      {/* Chat area — two-panel layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Channel list */}
        <aside className="w-56 shrink-0 bg-bg-surface border-r border-border flex flex-col">
          <div className="px-4 py-4 border-b border-border">
            <p className="text-xs font-semibold text-text-dim uppercase tracking-widest">Channels</p>
          </div>
          <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
            {CHANNELS.map(channel => (
              <button
                key={channel.id}
                onClick={() => handleChannelSelect(channel.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                  activeChannel === channel.id
                    ? 'bg-amber/10 text-amber font-medium'
                    : 'text-text-muted hover:text-text hover:bg-bg-elevated'
                }`}
              >
                <Hash size={13} className="shrink-0" />
                <span className="truncate text-xs leading-snug">{channel.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Message area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Channel header */}
          <div className="px-5 py-3.5 border-b border-border bg-bg-surface shrink-0">
            <div className="flex items-center gap-2">
              <Hash size={15} className="text-text-muted" />
              <h2 className="text-sm font-semibold text-text">{channelLabel}</h2>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Hash size={32} className="mx-auto text-text-dim mb-2" />
                  <p className="text-text-muted text-sm">No messages yet. Start the conversation!</p>
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const prevMsg = messages[idx - 1]
                const sameAuthor = prevMsg && prevMsg.sender === msg.sender
                const compactTop = sameAuthor ? 'mt-0.5' : 'mt-4'

                return (
                  <div key={msg.id} className={`flex items-start gap-3 group ${compactTop}`}>
                    {/* Avatar — only show when sender changes */}
                    <div className="w-9 shrink-0">
                      {!sameAuthor && <Avatar initials={msg.initials} />}
                    </div>

                    {/* Message content */}
                    <div className="flex-1 min-w-0">
                      {!sameAuthor && (
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-text">{msg.sender}</span>
                          <span className="text-xs text-text-dim">{msg.role}</span>
                          <span className="text-xs text-text-dim ml-auto opacity-0 group-hover:opacity-100 transition-opacity">{msg.time}</span>
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <p className="text-sm text-text leading-relaxed flex-1">{msg.text}</p>
                        {sameAuthor && (
                          <span className="text-xs text-text-dim opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">{msg.time}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <div className="px-4 py-3 border-t border-border bg-bg-surface shrink-0">
            <div className="flex items-end gap-2 bg-bg-elevated border border-border rounded-xl px-4 py-2.5 focus-within:border-amber/40 transition-colors">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message #${channelLabel}...`}
                rows={1}
                className="flex-1 bg-transparent resize-none outline-none text-sm text-text placeholder:text-text-dim leading-relaxed max-h-32 overflow-y-auto"
                style={{ minHeight: '22px' }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  inputValue.trim()
                    ? 'bg-amber text-bg-base hover:bg-amber/90'
                    : 'bg-bg-card text-text-dim cursor-not-allowed'
                }`}
                title="Send (Enter)"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-[10px] text-text-dim mt-1 pl-1">Press Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      </div>
    </div>
  )
}
