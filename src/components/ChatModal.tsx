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

    // Simulate AI response
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg h-[85vh] sm:h-[70vh] bg-zinc-900 border border-zinc-800 rounded-t-2xl sm:rounded-2xl flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-zinc-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <span className="text-xs font-bold text-white">AI</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">OmiGPT</h3>
              <p className="text-[10px] text-zinc-500">Context-aware · {messages.length - 1} queries</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`max-w-[85%] ${
                msg.role === 'user'
                  ? 'bg-indigo-500/20 border border-indigo-500/30 rounded-2xl rounded-br-md'
                  : 'bg-zinc-800/50 border border-zinc-700/30 rounded-2xl rounded-bl-md'
              } px-3.5 py-2.5`}>
                <p className="text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <p className="text-[9px] text-zinc-600 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-zinc-800/50 border border-zinc-700/30 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" style={{ animation: 'typing 1s infinite' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" style={{ animation: 'typing 1s infinite 0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" style={{ animation: 'typing 1s infinite 0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="flex-shrink-0 px-4 py-2 border-t border-zinc-800/30">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {['What did we decide?', 'Who is Sarah?', 'My tasks today', 'Summarize yesterday'].map(q => (
              <button
                key={q}
                onClick={() => { setInput(q); }}
                className="px-2.5 py-1 rounded-full text-[10px] text-zinc-400 bg-zinc-800/50 border border-zinc-700/30 whitespace-nowrap hover:bg-zinc-700/50 hover:text-zinc-300 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex-shrink-0 px-4 py-3 border-t border-zinc-800/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your conversations..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-4 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
