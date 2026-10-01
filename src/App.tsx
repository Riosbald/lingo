import { useState } from 'react'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#09090b',
      color: '#fafafa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid #27272a',
        background: '#18181b'
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
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'white'
          }}>
            O
          </div>
          <span style={{ fontSize: '16px', fontWeight: 600 }}>Omi AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981'
          }} />
          <span style={{ fontSize: '12px', color: '#a1a1aa' }}>Connected</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        {activeTab === 'home' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>🏠 Home</h2>
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              background: '#18181b',
              border: '1px solid #27272a',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  animation: 'pulse 2s infinite'
                }} />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Live Stream</span>
              </div>
              <div style={{ fontSize: '13px', color: '#a1a1aa', lineHeight: 1.6 }}>
                <p style={{ margin: '0 0 8px' }}><strong style={{ color: '#818cf8' }}>You:</strong> Let's discuss the Q4 roadmap priorities...</p>
                <p style={{ margin: '0 0 8px' }}><strong style={{ color: '#34d399' }}>Sarah:</strong> I think we should focus on mobile experience improvements...</p>
                <p style={{ margin: 0 }}><strong style={{ color: '#fbbf24' }}>Marcus:</strong> The API v2 migration is blocking three partner integrations...</p>
              </div>
            </div>
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              background: '#18181b',
              border: '1px solid #27272a'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Recent Conversations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Product Roadmap Planning', 'Client Call — Acme Corp', 'Morning Standup'].map((title, i) => (
                  <div key={i} style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: '#09090b',
                    border: '1px solid #27272a'
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{title}</div>
                    <div style={{ fontSize: '12px', color: '#71717a' }}>Today · 47 min · 3 speakers</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>📋 Tasks</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '8px', background: '#18181b', border: '1px solid #27272a', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>8</div>
                <div style={{ fontSize: '11px', color: '#71717a' }}>Active</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '8px', background: '#18181b', border: '1px solid #27272a', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>3</div>
                <div style={{ fontSize: '11px', color: '#71717a' }}>Done</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '8px', background: '#18181b', border: '1px solid #27272a', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>6</div>
                <div style={{ fontSize: '11px', color: '#71717a' }}>AI Extracted</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Finalize API v2 spec by Friday', 'Schedule design sprint with Sarah', 'Send SSO integration spec to Acme'].map((task, i) => (
                <div key={i} style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: '#18181b',
                  border: '1px solid #27272a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid #3f3f46',
                    flexShrink: 0
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px' }}>{task}</div>
                    <div style={{ fontSize: '11px', color: '#71717a', marginTop: '4px' }}>
                      <span style={{ color: '#ef4444', marginRight: '8px' }}>High</span>
                      <span style={{ color: '#f59e0b' }}>⚡ AI</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'memories' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>🧠 Memories</h2>
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              background: '#18181b',
              border: '1px solid #27272a',
              marginBottom: '16px',
              height: '200px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ fontSize: '12px', color: '#71717a', marginBottom: '12px' }}>Brain Map</div>
              <svg width="100%" height="160" style={{ position: 'absolute', top: '32px', left: 0 }}>
                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
                <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
                <line x1="50%" y1="50%" x2="35%" y2="75%" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
                <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
                <circle cx="50%" cy="50%" r="8" fill="#6366f1" />
                <circle cx="25%" cy="25%" r="6" fill="#34d399" />
                <circle cx="75%" cy="25%" r="6" fill="#fbbf24" />
                <circle cx="35%" cy="75%" r="6" fill="#f472b6" />
                <circle cx="70%" cy="70%" r="6" fill="#06b6d4" />
                <text x="50%" y="50%" textAnchor="middle" dy="25" fill="#fafafa" fontSize="10">You</text>
                <text x="25%" y="25%" textAnchor="middle" dy="20" fill="#fafafa" fontSize="10">Sarah</text>
                <text x="75%" y="25%" textAnchor="middle" dy="20" fill="#fafafa" fontSize="10">Marcus</text>
                <text x="35%" y="75%" textAnchor="middle" dy="20" fill="#fafafa" fontSize="10">API v2</text>
                <text x="70%" y="70%" textAnchor="middle" dy="20" fill="#fafafa" fontSize="10">Acme</text>
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { icon: '👤', label: 'Sarah Chen', detail: 'VP of Design · Prefers async', color: '#a78bfa' },
                { icon: '📁', label: 'API v2 Migration', detail: 'Blocking 3 integrations · Due Friday', color: '#22d3ee' },
                { icon: '🏢', label: 'Acme Corp', detail: 'Enterprise client · 500 users', color: '#34d399' }
              ].map((memory, i) => (
                <div key={i} style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: '#18181b',
                  border: '1px solid #27272a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '24px' }}>{memory.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: memory.color }}>{memory.label}</div>
                    <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '2px' }}>{memory.detail}</div>
                  </div>
                  <div style={{
                    width: '48px',
                    height: '6px',
                    borderRadius: '3px',
                    background: '#27272a',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '95%',
                      height: '100%',
                      background: 'linear-gradient(to right, #6366f1, #06b6d4)'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'apps' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>🛍️ Apps</h2>
            <div style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '16px' }}>
              6 installed · 12 available
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              {[
                { icon: '📝', name: 'Notion Sync', status: 'Active' },
                { icon: '📅', name: 'Calendar Auto', status: 'Active' },
                { icon: '💬', name: 'Slack Bridge', status: 'Active' },
                { icon: '🛡️', name: 'Scam Guard', status: 'Active' }
              ].map((app, i) => (
                <div key={i} style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: '#18181b',
                  border: '1px solid #27272a'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '20px' }}>{app.icon}</span>
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>{app.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontSize: '10px', color: '#71717a' }}>{app.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { icon: '🎤', name: 'Speech Coach', desc: 'Analyzes vocal tone and pacing', risk: 'Low' },
                { icon: '🔍', name: 'Lie Detector Pro', desc: 'Analyzes text logic patterns', risk: 'High' },
                { icon: '⚡', name: 'Zapier Connect', desc: 'Automated workflows', risk: 'Medium' }
              ].map((app, i) => (
                <div key={i} style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: '#18181b',
                  border: '1px solid #27272a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '24px' }}>{app.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>{app.name}</div>
                    <div style={{ fontSize: '12px', color: '#71717a', marginTop: '2px' }}>{app.desc}</div>
                  </div>
                  <button style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: '#6366f1',
                    color: 'white',
                    fontSize: '12px',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    Install
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>⚙️ Settings</h2>
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              background: '#18181b',
              border: '1px solid #27272a',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.2))',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    🔘
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>Omi Pendant</div>
                    <div style={{ fontSize: '11px', color: '#71717a' }}>v3 · Aluminum Edition</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981' }}>73%</div>
                  <div style={{ fontSize: '10px', color: '#71717a' }}>~10h left</div>
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#71717a' }}>Storage</span>
                  <span style={{ fontSize: '11px', color: '#a1a1aa' }}>4.2GB / 8.0GB</span>
                </div>
                <div style={{ height: '6px', borderRadius: '3px', background: '#27272a' }}>
                  <div style={{ width: '52%', height: '100%', borderRadius: '3px', background: '#6366f1' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { icon: '🌐', title: 'Language', value: 'English' },
                { icon: '☁️', title: 'Cloud Sync', value: 'Enabled' },
                { icon: '🔒', title: 'Local-Only Mode', value: 'Disabled' }
              ].map((setting, i) => (
                <div key={i} style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: '#18181b',
                  border: '1px solid #27272a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px' }}>{setting.icon}</span>
                    <span style={{ fontSize: '14px' }}>{setting.title}</span>
                  </div>
                  <span style={{ fontSize: '13px', color: '#818cf8' }}>{setting.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav style={{
        borderTop: '1px solid #27272a',
        background: '#18181b',
        padding: '8px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {['home', 'tasks', 'memories', 'apps', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: activeTab === tab ? '#818cf8' : '#71717a'
              }}
            >
              <span style={{ fontSize: '20px' }}>
                {tab === 'home' && '🏠'}
                {tab === 'tasks' && '📋'}
                {tab === 'memories' && '🧠'}
                {tab === 'apps' && '🛍️'}
                {tab === 'settings' && '⚙️'}
              </span>
              <span style={{ fontSize: '10px', fontWeight: 500 }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
