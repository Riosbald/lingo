import { useState } from 'react'
import { memories, graphNodes, type GraphNode } from '../data'

const categoryConfig: Record<string, { icon: string; color: string }> = {
  person: { icon: '👤', color: '#a78bfa' },
  project: { icon: '📁', color: '#22d3ee' },
  preference: { icon: '⚙️', color: '#fbbf24' },
  location: { icon: '📍', color: '#34d399' },
  fact: { icon: '💡', color: '#f472b6' },
  organization: { icon: '🏢', color: '#60a5fa' },
}

const nodeColors: Record<string, string> = {
  person: '#818cf8',
  project: '#22d3ee',
  organization: '#34d399',
  location: '#fbbf24',
  preference: '#f472b6',
}

export default function Memories() {
  const [view, setView] = useState<'graph' | 'list'>('graph')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)

  const categories = ['all', 'person', 'project', 'organization', 'preference', 'location', 'fact']

  const filteredMemories = memories.filter(m => {
    const matchesSearch = searchQuery === '' ||
      m.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.detail.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flexShrink: 0, padding: '16px', borderBottom: '1px solid rgba(39, 39, 42, 0.5)' }}>
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#71717a' }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search memories..."
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              borderRadius: '12px',
              background: 'rgba(24, 24, 27, 0.5)',
              border: '1px solid rgba(39, 39, 42, 0.5)',
              color: '#e4e4e7',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setView('graph')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: 500,
                background: view === 'graph' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                color: view === 'graph' ? '#a5b4fc' : '#71717a',
                border: view === 'graph' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              🧠 Brain Map
            </button>
            <button
              onClick={() => setView('list')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: 500,
                background: view === 'list' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                color: view === 'list' ? '#a5b4fc' : '#71717a',
                border: view === 'list' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              📋 List
            </button>
          </div>
          <span style={{ fontSize: '10px', color: '#71717a' }}>{filteredMemories.length} memories</span>
        </div>

        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {categories.map(cat => {
            const config = cat !== 'all' ? categoryConfig[cat] : null
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '10px',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  background: selectedCategory === cat ? 'rgba(99, 102, 241, 0.2)' : 'rgba(24, 24, 27, 0.3)',
                  color: selectedCategory === cat ? '#a5b4fc' : '#71717a',
                  border: selectedCategory === cat ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {config ? `${config.icon} ${cat.charAt(0).toUpperCase() + cat.slice(1)}s` : 'All'}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '96px' }}>
        {view === 'graph' ? (
          <div style={{ padding: '16px' }}>
            <div style={{
              position: 'relative',
              height: '280px',
              borderRadius: '16px',
              background: 'rgba(24, 24, 27, 0.3)',
              border: '1px solid rgba(39, 39, 42, 0.5)',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.2,
                backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} />

              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                {graphNodes.map(node =>
                  node.connections.map(connId => {
                    const target = graphNodes.find(n => n.id === connId)
                    if (!target || node.id > connId) return null
                    const isActive = selectedNode && (
                      (node.id === selectedNode.id && selectedNode.connections.includes(connId)) ||
                      (connId === selectedNode.id && selectedNode.connections.includes(node.id))
                    )
                    return (
                      <line
                        key={`${node.id}-${connId}`}
                        x1={node.x}
                        y1={node.y}
                        x2={target.x}
                        y2={target.y}
                        stroke={isActive ? 'rgba(99, 102, 241, 0.6)' : 'rgba(63, 63, 70, 0.4)'}
                        strokeWidth={isActive ? '0.5' : '0.2'}
                      />
                    )
                  })
                )}
              </svg>

              {graphNodes.map(node => {
                const isSelected = selectedNode?.id === node.id
                const isConnected = selectedNode ? selectedNode.connections.includes(node.id) : false
                const isDimmed = selectedNode && !isSelected && !isConnected
                const color = nodeColors[node.type] || '#71717a'

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(isSelected ? null : node)}
                    style={{
                      position: 'absolute',
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.25)' : 'scale(1)'}`,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '10px',
                      fontWeight: 500,
                      background: `${color}15`,
                      border: `1px solid ${color}40`,
                      color: color,
                      cursor: 'pointer',
                      opacity: isDimmed ? 0.3 : 1,
                      transition: 'all 0.3s',
                      boxShadow: isSelected ? `0 0 12px ${color}30` : 'none',
                      zIndex: isSelected ? 10 : 1
                    }}
                  >
                    {node.label}
                  </button>
                )
              })}
            </div>

            {selectedNode && (
              <div style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(24, 24, 27, 0.5)',
                border: '1px solid rgba(39, 39, 42, 0.5)',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: nodeColors[selectedNode.type] }} />
                  <h4 style={{ fontSize: '14px', fontWeight: 500, color: '#e4e4e7', margin: 0 }}>{selectedNode.label}</h4>
                  <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: '#27272a', color: '#a1a1aa', textTransform: 'capitalize' }}>{selectedNode.type}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedNode.connections.map(connId => {
                    const conn = graphNodes.find(n => n.id === connId)
                    return conn ? (
                      <button
                        key={connId}
                        onClick={() => setSelectedNode(conn)}
                        style={{
                          padding: '4px 8px',
                          fontSize: '10px',
                          borderRadius: '4px',
                          background: 'rgba(39, 39, 42, 0.5)',
                          border: '1px solid rgba(63, 63, 70, 0.3)',
                          color: '#a1a1aa',
                          cursor: 'pointer'
                        }}
                      >
                        {conn.label}
                      </button>
                    ) : null
                  })}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '12px', borderRadius: '8px', background: 'rgba(24, 24, 27, 0.3)' }}>
              {Object.entries(nodeColors).map(([type, color]) => (
                <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#71717a' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                  {type}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: '12px 16px' }}>
            {filteredMemories.map(memory => {
              const config = categoryConfig[memory.category]
              return (
                <div
                  key={memory.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'rgba(24, 24, 27, 0.5)',
                    border: '1px solid rgba(39, 39, 42, 0.5)',
                    marginBottom: '8px'
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{config.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 500, color: '#e4e4e7', margin: 0 }}>{memory.label}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '48px', height: '6px', borderRadius: '9999px', background: '#27272a' }}>
                          <div style={{
                            height: '100%',
                            borderRadius: '9999px',
                            background: 'linear-gradient(to right, #6366f1, #06b6d4)',
                            width: `${memory.confidence * 100}%`
                          }} />
                        </div>
                        <span style={{ fontSize: '9px', color: '#71717a' }}>{Math.round(memory.confidence * 100)}%</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '12px', color: '#a1a1aa', lineHeight: 1.5, margin: 0 }}>{memory.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
