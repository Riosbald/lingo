import { useState } from 'react'
import { memories, graphNodes, type Memory, type GraphNode } from '../data'

const categoryConfig: Record<string, { icon: string; color: string; bgColor: string }> = {
  person: { icon: '👤', color: 'text-violet-400', bgColor: 'bg-violet-500/10 border-violet-500/20' },
  project: { icon: '📁', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10 border-cyan-500/20' },
  preference: { icon: '⚙️', color: 'text-amber-400', bgColor: 'bg-amber-500/10 border-amber-500/20' },
  location: { icon: '📍', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10 border-emerald-500/20' },
  fact: { icon: '💡', color: 'text-pink-400', bgColor: 'bg-pink-500/10 border-pink-500/20' },
  organization: { icon: '🏢', color: 'text-blue-400', bgColor: 'bg-blue-500/10 border-blue-500/20' },
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  const categories = ['all', 'person', 'project', 'organization', 'preference', 'location', 'fact']

  const filteredMemories = memories.filter(m => {
    const matchesSearch = searchQuery === '' ||
      m.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.detail.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-zinc-800/50">
        <div className="relative mb-3">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Semantic search across all memories..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1">
            <button
              onClick={() => setView('graph')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                view === 'graph'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              🧠 Brain Map
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                view === 'list'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              📋 List
            </button>
          </div>
          <span className="text-[10px] text-zinc-500">{filteredMemories.length} memories</span>
        </div>

        {/* Category Filter */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => {
            const config = cat !== 'all' ? categoryConfig[cat] : null
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-zinc-500 hover:text-zinc-300 bg-zinc-900/30 border border-transparent'
                }`}
              >
                {config ? `${config.icon} ${cat.charAt(0).toUpperCase() + cat.slice(1)}s` : 'All'}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {view === 'graph' ? (
          <BrainMapView
            nodes={graphNodes}
            selectedNode={selectedNode}
            onSelectNode={setSelectedNode}
          />
        ) : (
          <div className="px-4 py-3 space-y-2">
            {filteredMemories.map(memory => {
              const config = categoryConfig[memory.category]
              return (
                <button
                  key={memory.id}
                  onClick={() => setSelectedMemory(selectedMemory?.id === memory.id ? null : memory)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedMemory?.id === memory.id
                      ? 'bg-zinc-800/50 border-zinc-600/50'
                      : 'bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-lg">{config.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-zinc-200">{memory.label}</h4>
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 h-1.5 rounded-full bg-zinc-800">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                              style={{ width: `${memory.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-[9px] text-zinc-500">{Math.round(memory.confidence * 100)}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{memory.detail}</p>
                      {selectedMemory?.id === memory.id && (
                        <div className="mt-2 pt-2 border-t border-zinc-800/50">
                          <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                            <span>📝 {memory.sourceIds.length} sources</span>
                            <span>🕐 {memory.lastUpdated}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// Brain Map Visualization
// ============================================

function BrainMapView({
  nodes,
  selectedNode,
  onSelectNode,
}: {
  nodes: GraphNode[]
  selectedNode: GraphNode | null
  onSelectNode: (node: GraphNode | null) => void
}) {
  const connectedIds = selectedNode ? new Set(selectedNode.connections) : new Set<string>()

  return (
    <div className="relative">
      {/* Graph Canvas */}
      <div className="relative mx-4 mt-4 h-72 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {nodes.map(node =>
            node.connections.map(connId => {
              const target = nodes.find(n => n.id === connId)
              if (!target || node.id > connId) return null
              const isActive = selectedNode && (
                (node.id === selectedNode.id && connectedIds.has(connId)) ||
                (connId === selectedNode.id && connectedIds.has(node.id))
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

        {/* Nodes */}
        {nodes.map(node => {
          const isSelected = selectedNode?.id === node.id
          const isConnected = connectedIds.has(node.id)
          const isDimmed = selectedNode && !isSelected && !isConnected
          const color = nodeColors[node.type] || '#71717a'

          return (
            <button
              key={node.id}
              onClick={() => onSelectNode(isSelected ? null : node)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isDimmed ? 'opacity-30' : 'opacity-100'
              } ${isSelected ? 'scale-125 z-10' : 'hover:scale-110'}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div
                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-all ${
                  isSelected ? 'shadow-lg' : ''
                }`}
                style={{
                  background: `${color}15`,
                  borderColor: `${color}40`,
                  color: color,
                  boxShadow: isSelected ? `0 0 12px ${color}30` : 'none',
                }}
              >
                {node.label}
              </div>
            </button>
          )
        })}
      </div>

      {/* Node Detail */}
      {selectedNode && (
        <div className="mx-4 mt-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: nodeColors[selectedNode.type] }}
            />
            <h4 className="text-sm font-medium text-zinc-200">{selectedNode.label}</h4>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 capitalize">
              {selectedNode.type}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedNode.connections.map(connId => {
              const conn = nodes.find(n => n.id === connId)
              return conn ? (
                <button
                  key={connId}
                  onClick={() => onSelectNode(conn)}
                  className="px-2 py-1 text-[10px] rounded bg-zinc-800/50 border border-zinc-700/30 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50 transition-colors"
                >
                  {conn.label}
                </button>
              ) : null
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mx-4 mt-3 flex flex-wrap gap-3 px-3 py-2 rounded-lg bg-zinc-900/30">
        {Object.entries(nodeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            <span className="w-2 h-2 rounded-full" style={{ background: color }} />
            {type}
          </div>
        ))}
      </div>

      {/* Memory List below graph */}
      <div className="px-4 mt-4 space-y-2">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Recent Memories</h4>
        {memories.slice(0, 5).map(memory => {
          const config = categoryConfig[memory.category]
          return (
            <div key={memory.id} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900/30 border border-zinc-800/30">
              <span>{config.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-300 truncate">{memory.label}</p>
                <p className="text-[10px] text-zinc-500 truncate">{memory.detail}</p>
              </div>
              <span className="text-[9px] text-zinc-600">{memory.lastUpdated}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
