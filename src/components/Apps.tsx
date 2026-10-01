import { useState } from 'react'
import { apps as initialApps, type App } from '../data'

export default function Apps() {
  const [apps, setApps] = useState<App[]>(initialApps)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedApp, setSelectedApp] = useState<App | null>(null)

  const categories = ['all', ...new Set(initialApps.map(a => a.category))]

  const toggleInstall = (id: string) => {
    setApps(prev => prev.map(a =>
      a.id === id ? { ...a, installed: !a.installed, enabled: !a.installed } : a
    ))
  }

  const filteredApps = apps.filter(a =>
    categoryFilter === 'all' || a.category === categoryFilter
  )

  const installedApps = apps.filter(a => a.installed)

  const riskColors = {
    low: { color: '#34d399', bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.2)' },
    medium: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.2)' },
    high: { color: '#f87171', bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.2)' },
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flexShrink: 0, padding: '16px', borderBottom: '1px solid rgba(39, 39, 42, 0.5)' }}>
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fafafa', margin: '0 0 4px' }}>Apps</h2>
          <p style={{ fontSize: '11px', color: '#71717a', margin: 0 }}>{installedApps.length} installed · {apps.length} available</p>
        </div>

        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '10px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                background: categoryFilter === cat ? 'rgba(99, 102, 241, 0.2)' : 'rgba(24, 24, 27, 0.3)',
                color: categoryFilter === cat ? '#a5b4fc' : '#71717a',
                border: categoryFilter === cat ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              {cat === 'all' ? 'All Apps' : cat}
            </button>
          ))}
        </div>
      </div>

      {selectedApp && (
        <div
          onClick={() => setSelectedApp(null)}
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
              background: '#18181b',
              borderTop: '1px solid #27272a',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              padding: '20px',
              paddingBottom: '32px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px' }}>{selectedApp.icon}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fafafa', margin: '0 0 4px' }}>{selectedApp.name}</h3>
                <p style={{ fontSize: '12px', color: '#a1a1aa', margin: 0 }}>{selectedApp.category}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                style={{
                  padding: '6px',
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

            <p style={{ fontSize: '14px', color: '#d4d4d8', lineHeight: 1.6, marginBottom: '16px' }}>{selectedApp.description}</p>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '10px', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>Capabilities</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedApp.capabilities.map(cap => (
                  <span key={cap} style={{
                    padding: '4px 8px',
                    fontSize: '10px',
                    borderRadius: '6px',
                    background: 'rgba(6, 182, 212, 0.1)',
                    color: '#22d3ee',
                    border: '1px solid rgba(6, 182, 212, 0.2)'
                  }}>
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {selectedApp.installed ? (
                <>
                  <button
                    onClick={() => {
                      const updated = { ...selectedApp, enabled: !selectedApp.enabled }
                      setSelectedApp(updated)
                      setApps(prev => prev.map(a => a.id === updated.id ? updated : a))
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: 500,
                      background: selectedApp.enabled ? 'rgba(16, 185, 129, 0.2)' : '#27272a',
                      color: selectedApp.enabled ? '#34d399' : '#a1a1aa',
                      border: selectedApp.enabled ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid #3f3f46',
                      cursor: 'pointer'
                    }}
                  >
                    {selectedApp.enabled ? '✓ Enabled' : '○ Disabled'}
                  </button>
                  <button
                    onClick={() => {
                      toggleInstall(selectedApp.id)
                      setSelectedApp(null)
                    }}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: 500,
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#f87171',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    toggleInstall(selectedApp.id)
                    setSelectedApp(null)
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    background: '#6366f1',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Install App
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 96px' }}>
        {categoryFilter === 'all' && installedApps.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '10px', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Installed</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {installedApps.map(app => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'rgba(24, 24, 27, 0.5)',
                    border: '1px solid rgba(39, 39, 42, 0.5)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '20px' }}>{app.icon}</span>
                    <h4 style={{ fontSize: '12px', fontWeight: 500, color: '#e4e4e7', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</h4>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: app.enabled ? '#34d399' : '#52525b' }} />
                    <span style={{ fontSize: '9px', color: '#71717a' }}>{app.enabled ? 'Active' : 'Paused'}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 style={{ fontSize: '10px', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>
            {categoryFilter === 'all' ? 'Discover' : categoryFilter}
          </h3>
          {filteredApps.map(app => (
            <button
              key={app.id}
              onClick={() => setSelectedApp(app)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(24, 24, 27, 0.5)',
                border: '1px solid rgba(39, 39, 42, 0.5)',
                marginBottom: '8px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '24px', flexShrink: 0 }}>{app.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 500, color: '#e4e4e7', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</h4>
                  <span style={{
                    padding: '2px 6px',
                    fontSize: '8px',
                    borderRadius: '4px',
                    color: riskColors[app.risk].color,
                    background: riskColors[app.risk].bg,
                    border: `1px solid ${riskColors[app.risk].border}`
                  }}>
                    {app.risk}
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: '#71717a', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '9px', color: '#52525b' }}>{app.category}</span>
                  <span style={{ color: '#3f3f46' }}>·</span>
                  <span style={{ fontSize: '9px', color: '#52525b' }}>{app.capabilities.length} capabilities</span>
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '10px',
                  fontWeight: 500,
                  background: app.installed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                  color: app.installed ? '#34d399' : '#818cf8',
                  border: app.installed ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(99, 102, 241, 0.2)'
                }}>
                  {app.installed ? 'Installed' : 'Install'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
