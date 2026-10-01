import { useState, useEffect, useRef, useMemo } from 'react'
import { conversations, liveTranscript, speakers, type Message, type Conversation } from '../data'

// Pre-compute stable waveform values to prevent flicker on re-render
function generateWaveformBars(count: number) {
  const bars: { height: number; duration: number; delay: number }[] = []
  // Use a simple seeded pseudo-random for stability
  let seed = 42
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
  for (let i = 0; i < count; i++) {
    bars.push({
      height: rand() * 14 + 4,
      duration: 0.5 + rand() * 0.5,
      delay: i * 0.05,
    })
  }
  return bars
}

export default function Home() {
  const [isLive, setIsLive] = useState(true)
  const [streamMessages, setStreamMessages] = useState<Message[]>(liveTranscript)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [filter, setFilter] = useState<'all' | 'today' | 'yesterday' | 'older'>('all')
  const streamRef = useRef<HTMLDivElement>(null)

  // Simulate live transcription
  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      setStreamMessages(prev => {
        const newMsg: Message = {
          id: `live-${Date.now()}`,
          speakerId: speakers[Math.floor(Math.random() * 3)].id,
          text: generateLiveText(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isLive: true,
        }
        return [...prev.slice(-12), newMsg]
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [isLive])

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight
    }
  }, [streamMessages])

  const filteredConversations = conversations.filter(c => {
    if (filter === 'today') return c.date === 'Today'
    if (filter === 'yesterday') return c.date === 'Yesterday'
    if (filter === 'older') return !['Today', 'Yesterday'].includes(c.date)
    return true
  })

  const getSpeaker = (id: string) => speakers.find(s => s.id === id) || speakers[0]
  const waveformBars = useMemo(() => generateWaveformBars(32), [])

  if (selectedConversation) {
    return (
      <ConversationDetail
        conversation={selectedConversation}
        onBack={() => setSelectedConversation(null)}
        getSpeaker={getSpeaker}
      />
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Live Stream Section */}
      <div className="flex-shrink-0 border-b border-zinc-800/50">
        <div className="px-4 pt-4 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500' : 'bg-zinc-600'}`} />
              {isLive && <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-pulse-ring" />}
            </div>
            <h2 className="text-sm font-semibold text-zinc-200">Live Stream</h2>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isLive
                ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
            }`}
          >
            {isLive ? '● Recording' : '○ Paused'}
          </button>
        </div>

        {/* Waveform visualization */}
        {isLive && (
          <div className="px-4 pb-2 flex items-center gap-0.5 h-6">
            {waveformBars.map((bar, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-indigo-500/60"
                style={{
                  height: `${bar.height}px`,
                  animation: `waveform ${bar.duration}s ease-in-out infinite`,
                  animationDelay: `${bar.delay}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Live transcript */}
        <div
          ref={streamRef}
          className="px-4 pb-4 max-h-40 overflow-y-auto no-scrollbar space-y-2"
        >
          {streamMessages.map(msg => {
            const speaker = getSpeaker(msg.speakerId)
            return (
              <div key={msg.id} className="flex items-start gap-2 animate-fade-in">
                <span className={`text-[10px] font-medium mt-0.5 flex-shrink-0 speaker-${speaker.colorIndex}`}>
                  {speaker.name.split(' ')[0]}
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {msg.text}
                  {msg.isLive && <span className="inline-block w-1 h-3 bg-indigo-400 ml-0.5 animate-pulse" />}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Conversation Feed */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-200">Conversations</h2>
          <div className="flex gap-1">
            {(['all', 'today', 'yesterday', 'older'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                  filter === f
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pb-24 space-y-2">
          {filteredConversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className="w-full text-left p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800/50 hover:border-zinc-700/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-1.5">
                <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                  {conv.title}
                </h3>
                <span className="text-[10px] text-zinc-500 flex-shrink-0 ml-2">{conv.time}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-zinc-500">{conv.date}</span>
                <span className="text-zinc-700">·</span>
                <span className="text-[10px] text-zinc-500">{conv.duration}</span>
                {conv.location && (
                  <>
                    <span className="text-zinc-700">·</span>
                    <span className="text-[10px] text-zinc-500">{conv.location}</span>
                  </>
                )}
              </div>
              {conv.summary && (
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-2">
                  {conv.summary}
                </p>
              )}
              <div className="flex items-center gap-1.5">
                {conv.speakers.map(s => (
                  <div
                    key={s.id}
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold speaker-bg-${s.colorIndex} border`}
                    title={s.name}
                  >
                    {s.name.charAt(0)}
                  </div>
                ))}
                {conv.actionItems && conv.actionItems.length > 0 && (
                  <span className="ml-auto text-[10px] text-amber-400/70">
                    ⚡ {conv.actionItems.length} actions
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// Conversation Detail View
// ============================================

function ConversationDetail({
  conversation,
  onBack,
  getSpeaker,
}: {
  conversation: Conversation
  onBack: () => void
  getSpeaker: (id: string) => typeof speakers[0]
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-zinc-800/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 mb-3 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to timeline
        </button>
        <h2 className="text-lg font-semibold text-zinc-100">{conversation.title}</h2>
        <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500">
          <span>{conversation.date} · {conversation.time}</span>
          <span className="text-zinc-700">·</span>
          <span>{conversation.duration}</span>
          {conversation.location && (
            <>
              <span className="text-zinc-700">·</span>
              <span>{conversation.location}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          {conversation.speakers.map(s => (
            <span key={s.id} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] speaker-bg-${s.colorIndex} border`}>
              <span className={`w-1.5 h-1.5 rounded-full bg-current speaker-${s.colorIndex}`} />
              {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-24">
        {/* Summary */}
        {conversation.summary && (
          <div className="p-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
            <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1.5">AI Summary</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">{conversation.summary}</p>
          </div>
        )}

        {/* Action Items */}
        {conversation.actionItems && conversation.actionItems.length > 0 && (
          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2">Action Items</h4>
            <ul className="space-y-1.5">
              {conversation.actionItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                  <span className="text-amber-400 mt-0.5">⚡</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Transcript */}
        <div>
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Transcript</h4>
          <div className="space-y-3">
            {conversation.messages.map(msg => {
              const speaker = getSpeaker(msg.speakerId)
              return (
                <div key={msg.id} className="flex items-start gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 speaker-bg-${speaker.colorIndex} border`}>
                    {speaker.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[11px] font-medium speaker-${speaker.colorIndex}`}>
                        {speaker.name}
                      </span>
                      <span className="text-[10px] text-zinc-600">{msg.timestamp}</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// Helpers
// ============================================

function generateLiveText(): string {
  const phrases = [
    'and then we need to consider the timeline for the next phase',
    'I think the key takeaway here is that we should prioritize user feedback',
    'let me pull up the latest metrics from last sprint',
    'that makes sense, especially given the constraints we discussed earlier',
    'we should probably loop in the design team on this one',
    'the data suggests we\'re heading in the right direction',
    'I\'ll follow up with the stakeholders and get back to you',
    'can we schedule a deeper dive on this topic for next week',
    'the budget allocation looks good for Q1',
    'we need to make sure we\'re aligned on the technical approach',
  ]
  return phrases[Math.floor(Math.random() * phrases.length)]
}
