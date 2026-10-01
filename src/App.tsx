import { useState } from 'react'
import Home from './components/Home'
import Tasks from './components/Tasks'
import Memories from './components/Memories'
import Apps from './components/Apps'
import Settings from './components/Settings'
import ChatModal from './components/ChatModal'

type Tab = 'home' | 'tasks' | 'memories' | 'apps' | 'settings'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [showChat, setShowChat] = useState(false)

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#09090b',
      color: '#fafafa',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Top Bar */}
      <header style={{
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid rgba(39, 39, 42, 0.5)',
        background: 'rgba(9, 9, 11, 0.9)',
        backdropFilter: 'blur(12px)',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 'bold',
            color: 'white'
          }}>
            O
          </div>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#e4e4e7' }}>Omi</span>
          <span style={{
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.1)',
            color: '#34d399',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            Connected
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowChat(true)}
            style={{
              padding: '8px',
              borderRadius: '8px',
              color: '#a1a1aa',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            💬
          </button>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 8px',
            borderRadius: '8px',
            background: 'rgba(24, 24, 27, 0.5)',
            border: '1px solid rgba(39, 39, 42, 0.5)'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399' }} />
            <span style={{ fontSize: '10px', color: '#a1a1aa' }}>73%</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: 'hidden' }}>
        {activeTab === 'home' && <Home />}
        {activeTab === 'tasks' && <Tasks />}
        {activeTab === 'memories' && <Memories />}
        {activeTab === 'apps' && <Apps />}
        {activeTab === 'settings' && <Settings />}
      </main>

      {/* Bottom Navigation */}
      <nav style={{
        borderTop: '1px solid rgba(39, 39, 42, 0.5)',
        background: 'rgba(9, 9, 11, 0.95)',
        backdropFilter: 'blur(12px)',
        flexShrink: 0
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '64px',
          padding: '0 8px'
        }}>
          {(['home', 'tasks', 'memories', 'apps', 'settings'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                padding: '6px 12px',
                borderRadius: '12px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: activeTab === tab ? '#818cf8' : '#71717a',
                transition: 'color 0.2s'
              }}
            >
              <span style={{ fontSize: '20px' }}>
                {tab === 'home' && '🏠'}
                {tab === 'tasks' && '📋'}
                {tab === 'memories' && '🧠'}
                {tab === 'apps' && '🛍️'}
                {tab === 'settings' && '⚙️'}
              </span>
              <span style={{ fontSize: '9px', fontWeight: 500 }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Chat Modal */}
      {showChat && <ChatModal onClose={() => setShowChat(false)} />}
    </div>
  )
}
