import { useState } from 'react'
import Home from './components/Home'
import Tasks from './components/Tasks'
import Memories from './components/Memories'
import Apps from './components/Apps'
import Settings from './components/Settings'
import ChatModal from './components/ChatModal'

type Tab = 'home' | 'tasks' | 'memories' | 'apps' | 'settings'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'tasks', label: 'Tasks', icon: 'tasks' },
  { id: 'memories', label: 'Memories', icon: 'memories' },
  { id: 'apps', label: 'Apps', icon: 'apps' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

function TabIcon({ icon, active }: { icon: string; active: boolean }) {
  const color = active ? 'text-indigo-400' : 'text-zinc-500'
  
  switch (icon) {
    case 'home':
      return (
        <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    case 'tasks':
      return (
        <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    case 'memories':
      return (
        <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    case 'apps':
      return (
        <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    case 'settings':
      return (
        <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    default:
      return null
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Top Bar */}
      <header className="flex-shrink-0 h-12 flex items-center justify-between px-4 border-b border-zinc-800/50 bg-zinc-950/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">O</span>
          </div>
          <span className="text-sm font-semibold text-zinc-200">Omi</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Connected
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Chat Button */}
          <button
            onClick={() => setShowChat(true)}
            className="p-2 rounded-lg text-zinc-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
            title="Ask OmiGPT"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          
          {/* Device Status */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-zinc-400">73%</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'home' && <Home />}
        {activeTab === 'tasks' && <Tasks />}
        {activeTab === 'memories' && <Memories />}
        {activeTab === 'apps' && <Apps />}
        {activeTab === 'settings' && <Settings />}
      </main>

      {/* Bottom Navigation */}
      <nav className="flex-shrink-0 border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-md safe-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'text-indigo-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <TabIcon icon={tab.icon} active={activeTab === tab.id} />
              <span className={`text-[9px] font-medium ${
                activeTab === tab.id ? 'text-indigo-400' : 'text-zinc-500'
              }`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="absolute -bottom-0 w-8 h-0.5 rounded-full bg-indigo-500" style={{ marginTop: '2px' }} />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Chat Modal */}
      {showChat && <ChatModal onClose={() => setShowChat(false)} />}
    </div>
  )
}
