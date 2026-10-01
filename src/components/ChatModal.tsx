import { useState, useRef, useEffect } from 'react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
  timestamp: string
}

const sampleResponses: Record<string, string> = {
  'marketing': 'Based on your conversation from yesterday\'s product roadmap meeting, the three marketing changes you agreed to were:\n\n1. **Shift to content-led growth** — Sarah proposed moving 40% of the ad budget to organic content\n2. **Launch the referral program** — Marcus confirmed engineering can support it by Q1\n3. **Rebrand the landing page** — Design sprint scheduled for next week\n\nThese were discussed during the "Product Roadmap Planning" session at 2:30 PM.',
  'budget': 'From your Acme Corp client call today, the budget discussion covered:\n\n• Additional engineering support: **$45K allocated** for SSO integration\n• Timeline: End of month delivery for 500-user deployment\n• Payment terms: Net-30, invoiced upon milestone completion\n\nShall I create a task to follow up on the budget approval?',
  'sarah': '**Sarah Chen** — VP of Design\n\n• Based in San Francisco\n• Prefers async communication over meetings\n• Leading the mobile experience redesign sprint\n• Working on the Acme Corp onboarding design\n• Last mentioned in: Product Roadmap Planning (today), Client Call — Acme Corp (today)\n\nShe has 18 conversations in your history and is one of your most frequent collaborators.',
  'default': 'I searched through your conversations and memories. Here\'s what I found relevant to your query. Would you like me to go deeper into any specific conversation or create a task based on this information?',
}

export default function ChatModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi! I\'m OmiGPT. I can search through all your conversations, memories, and tasks. Try asking me something like "What marketing changes did we agree on?" or "What do I know about Sarah?"',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const lowerInput = input.toLowerCase()
      let response = sampleResponses['default']
      
      if (lowerInput.includes('marketing') || lowerInput.includes('agreed')) {
        response = sampleResponses['marketing']
      } else if (lowerInput.includes('budget') || lowerInput.includes('acme')) {
        response = sampleResponses['budget']
      } else if (lowerInput.includes('sarah') || lowerInput.includes('who is')) {
        response = sampleResponses['sarah']
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, assistantMsg])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '500px',
          height: '85vh',
          background: '#18181b',
          borderTop: '1px solid #27272a',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          flexShrink: 0,
          padding: '12px 16px',
          borderBottom: '1px solid rgba(39, 39, 42, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              AI
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fafafa', margin: 0 }}>OmiGPT</h3>
              <p style={{ fontSize: '10px', color: '#71717a', margin: 0 }}>Context-aware · {messages.length - 1} queries</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '8px',
              color: '#71717a',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '16px'
              }}
            >
              <div style={{
                maxWidth: '85%',
                padding: '10px 14px',
                borderRadius: '16px',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                background: msg.role === 'user' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(39, 39, 42, 0.5)',
                border: msg.role === 'user' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(63, 63, 70, 0.3)'
              }}>
                <p style={{ fontSize: '12px', color: '#e4e4e7', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                <p style={{ fontSize: '9px', color: '#52525b', margin: '4px 0 0' }}>{msg.timestamp}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                padding: '12px 16px',
                borderRadius: '16px',
                borderBottomLeftRadius: '4px',
                background: 'rgba(39, 39, 42, 0.5)',
                border: '1px solid rgba(63, 63, 70, 0.3)'
              }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#71717a', animation: 'pulse 1s infinite' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#71717a', animation: 'pulse 1s infinite 0.2s' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#71717a', animation: 'pulse 1s infinite 0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div style={{ flexShrink: 0, padding: '8px 16px', borderTop: '1px solid rgba(39, 39, 42, 0.3)' }}>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {['What did we decide?', 'Who is Sarah?', 'My tasks today', 'Summarize yesterday'].map(q => (
              <button
                key={q}
                onClick={() => setInput(q)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '10px',
                  color: '#a1a1aa',
                  background: 'rgba(39, 39, 42, 0.5)',
                  border: '1px solid rgba(63, 63, 70, 0.3)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div style={{ flexShrink: 0, padding: '12px 16px', borderTop: '1px solid rgba(39, 39, 42, 0.5)' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your conversations..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '12px',
                background: '#27272a',
                border: '1px solid #3f3f46',
                color: '#e4e4e7',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              style={{
                padding: '10px 16px',
                borderRadius: '12px',
                background: '#6366f1',
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                opacity: input.trim() ? 1 : 0.3
              }}
            >
              ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
