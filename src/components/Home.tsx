import { useState, useEffect, useRef, useMemo } from 'react'
import { conversations, liveTranscript, speakers, type Message, type Conversation } from '../data'

function generateWaveformBars(count: number) {
  const bars: { height: number; duration: number; delay: number }[] = []
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

const speakerColors = ['#818cf8', '#34d399', '#fbbf24', '#f472b6', '#38bdf8']

export default function Home() {
  const [isLive, setIsLive] = useState(true)
  const [streamMessages, setStreamMessages] = useState<Message[]>(liveTranscript)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [filter, setFilter] = useState<'all' | 'today' | 'yesterday' | 'older'>('all')
  const streamRef = useRef<HTMLDivElement>(null)
  const waveformBars = useMemo(() => generateWaveformBars(32), [])

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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Live Stream Section */}
      <div style={{ flexShrink: 0, borderBottom: '1px solid rgba(39, 39, 42, 0.5)' }}>
        <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: isLive ? '#ef4444' : '#52525b'
              }} />
              {isLive && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  animation: 'pulse-ring 1.5s infinite'
                }} />
              )}
            </div>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#e4e4e7', margin: 0 }}>Live Stream</h2>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            style={{
              padding: '6px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 500,
              background: isLive ? 'rgba(239, 68, 68, 0.1)' : '#27272a',
              color: isLive ? '#f87171' : '#a1a1aa',
              border: isLive ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid #3f3f46',
              cursor: 'pointer'
            }}
          >
            {isLive ? '● Recording' : '○ Paused'}
          </button>
        </div>

        {/* Waveform */}
        {isLive && (
          <div style={{ padding: '0 16px 8px', display: 'flex', alignItems: 'center', gap: '2px', height: '24px' }}>
            {waveformBars.map((bar, i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  borderRadius: '9999px',
                  background: 'rgba(99, 102, 241, 0.6)',
                  height: `${bar.height}px`,
                  animation: `waveform ${bar.duration}s ease-in-out infinite`,
                  animationDelay: `${bar.delay}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Live transcript */}
        <div
          ref={streamRef}
          style={{
            padding: '0 16px 16px',
            maxHeight: '160px',
            overflowY: 'auto',
            scrollbarWidth: 'none'
          }}
        >
          {streamMessages.map(msg => {
            const speaker = getSpeaker(msg.speakerId)
            return (
              <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  color: speakerColors[speaker.colorIndex - 1],
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  {speaker.name.split(' ')[0]}
                </span>
                <p style={{ fontSize: '12px', color: '#d4d4d8', lineHeight: 1.6, margin: 0 }}>
                  {msg.text}
                  {msg.isLive && (
                    <span style={{
                      display: 'inline-block',
                      width: '4px',
                      height: '12px',
                      background: '#818cf8',
                      marginLeft: '2px',
                      animation: 'pulse 1s infinite'
                    }} />
                  )}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Conversation Feed */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '16px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#e4e4e7', margin: 0 }}>Conversations</h2>
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['all', 'today', 'yesterday', 'older'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '10px',
                  fontWeight: 500,
                  background: filter === f ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                  color: filter === f ? '#a5b4fc' : '#71717a',
                  border: filter === f ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                  cursor: 'pointer'
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 16px 96px' }}>
          {filteredConversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(24, 24, 27, 0.5)',
                border: '1px solid rgba(39, 39, 42, 0.5)',
                marginBottom: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#e4e4e7', margin: 0 }}>
                  {conv.title}
                </h3>
                <span style={{ fontSize: '10px', color: '#71717a', flexShrink: 0, marginLeft: '8px' }}>{conv.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', color: '#71717a' }}>{conv.date}</span>
                <span style={{ color: '#3f3f46' }}>·</span>
                <span style={{ fontSize: '10px', color: '#71717a' }}>{conv.duration}</span>
                {conv.location && (
                  <>
                    <span style={{ color: '#3f3f46' }}>·</span>
                    <span style={{ fontSize: '10px', color: '#71717a' }}>{conv.location}</span>
                  </>
                )}
              </div>
              {conv.summary && (
                <p style={{ fontSize: '12px', color: '#a1a1aa', lineHeight: 1.5, margin: '0 0 8px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>
                  {conv.summary}
                </p>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {conv.speakers.map(s => (
                  <div
                    key={s.id}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '8px',
                      fontWeight: 'bold',
                      background: `${speakerColors[s.colorIndex - 1]}15`,
                      border: `1px solid ${speakerColors[s.colorIndex - 1]}40`,
                      color: speakerColors[s.colorIndex - 1]
                    }}
                    title={s.name}
                  >
                    {s.name.charAt(0)}
                  </div>
                ))}
                {conv.actionItems && conv.actionItems.length > 0 && (
                  <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'rgba(251, 191, 36, 0.7)' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flexShrink: 0, padding: '16px', borderBottom: '1px solid rgba(39, 39, 42, 0.5)' }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#a1a1aa',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '12px',
            padding: 0
          }}
        >
          ← Back to timeline
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fafafa', margin: '0 0 4px' }}>{conversation.title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#71717a' }}>
          <span>{conversation.date} · {conversation.time}</span>
          <span style={{ color: '#3f3f46' }}>·</span>
          <span>{conversation.duration}</span>
          {conversation.location && (
            <>
              <span style={{ color: '#3f3f46' }}>·</span>
              <span>{conversation.location}</span>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
          {conversation.speakers.map(s => (
            <span
              key={s.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '10px',
                background: `${speakerColors[s.colorIndex - 1]}15`,
                border: `1px solid ${speakerColors[s.colorIndex - 1]}40`,
                color: speakerColors[s.colorIndex - 1]
              }}
            >
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: speakerColors[s.colorIndex - 1]
              }} />
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', paddingBottom: '96px' }}>
        {conversation.summary && (
          <div style={{
            padding: '14px',
            borderRadius: '12px',
            background: 'rgba(99, 102, 241, 0.05)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            marginBottom: '16px'
          }}>
            <h4 style={{ fontSize: '10px', fontWeight: 'bold', color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>AI Summary</h4>
            <p style={{ fontSize: '12px', color: '#d4d4d8', lineHeight: 1.6, margin: 0 }}>{conversation.summary}</p>
          </div>
        )}

        {conversation.actionItems && conversation.actionItems.length > 0 && (
          <div style={{
            padding: '14px',
            borderRadius: '12px',
            background: 'rgba(251, 191, 36, 0.05)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            marginBottom: '16px'
          }}>
            <h4 style={{ fontSize: '10px', fontWeight: 'bold', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Action Items</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {conversation.actionItems.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#d4d4d8', marginBottom: '6px' }}>
                  <span style={{ color: '#fbbf24', marginTop: '2px' }}>⚡</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 style={{ fontSize: '10px', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px' }}>Transcript</h4>
          {conversation.messages.map(msg => {
            const speaker = getSpeaker(msg.speakerId)
            return (
              <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  flexShrink: 0,
                  background: `${speakerColors[speaker.colorIndex - 1]}15`,
                  border: `1px solid ${speakerColors[speaker.colorIndex - 1]}40`,
                  color: speakerColors[speaker.colorIndex - 1]
                }}>
                  {speaker.name.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 500, color: speakerColors[speaker.colorIndex - 1] }}>
                      {speaker.name}
                    </span>
                    <span style={{ fontSize: '10px', color: '#52525b' }}>{msg.timestamp}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#d4d4d8', lineHeight: 1.6, margin: 0 }}>{msg.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

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
