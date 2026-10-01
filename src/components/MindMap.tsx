import { useState } from 'react'

interface GraphNode {
  id: string
  label: string
  type: 'person' | 'project' | 'organization' | 'conversation' | 'memory'
  x: number
  y: number
  connections: string[]
}

const nodes: GraphNode[] = [
  { id: 'you', label: 'YOU', type: 'person', x: 50, y: 50, connections: ['chinedu', 'projectx', 'acme'] },
  { id: 'chinedu', label: 'Chinedu', type: 'person', x: 25, y: 25, connections: ['you', 'projectx', 'acme'] },
  { id: 'sarah', label: 'Sarah', type: 'person', x: 75, y: 25, connections: ['you', 'projectx'] },
  { id: 'projectx', label: 'Project X', type: 'project', x: 35, y: 65, connections: ['you', 'chinedu', 'sarah', 'acme'] },
  { id: 'acme', label: 'Acme Corp', type: 'organization', x: 70, y: 70, connections: ['you', 'chinedu', 'projectx'] },
  { id: 'meeting1', label: 'Q4 Planning', type: 'conversation', x: 15, y: 60, connections: ['chinedu', 'projectx'] },
  { id: 'memory1', label: 'Prefers async', type: 'memory', x: 85, y: 45, connections: ['chinedu'] },
]

const typeColors: Record<string, string> = {
  person: 'bg-violet-500',
  project: 'bg-cyan-500',
  organization: 'bg-emerald-500',
  conversation: 'bg-amber-500',
  memory: 'bg-pink-500',
}

const typeBorders: Record<string, string> = {
  person: 'border-violet-400',
  project: 'border-cyan-400',
  organization: 'border-emerald-400',
  conversation: 'border-amber-400',
  memory: 'border-pink-400',
}

export default function MindMap() {
  const [selectedNode, setSelectedNode] = useState<string | null>('you')

  const selected = nodes.find(n => n.id === selectedNode)

  return (
    <section id="mindmap" className="py-20 px-6 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              PAL Mind Map — Visual Memory Graph
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every graph relationship carries provenance. Every fact is evidence-weighted. 
            This is PAL's flagship surface.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Graph Visualization */}
          <div className="lg:col-span-3 p-6 rounded-2xl bg-gray-800/20 border border-gray-700/50 min-h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />
            </div>
            
            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {nodes.map(node =>
                node.connections.map(connId => {
                  const target = nodes.find(n => n.id === connId)
                  if (!target || node.id > connId) return null
                  return (
                    <line
                      key={`${node.id}-${connId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="rgba(139, 92, 246, 0.2)"
                      strokeWidth="0.3"
                    />
                  )
                })
              )}
            </svg>

            {/* Nodes */}
            {nodes.map(node => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  selectedNode === node.id ? 'scale-125 z-10' : 'hover:scale-110'
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border ${
                  selectedNode === node.id
                    ? `${typeBorders[node.type]} bg-gray-800 shadow-lg`
                    : 'border-gray-700 bg-gray-900/80'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${typeColors[node.type]} inline-block mr-1.5`} />
                  {node.label}
                </div>
              </button>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {Object.entries(typeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-1.5 text-[9px] text-gray-500">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  {type}
                </div>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50">
            {selected ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full ${typeColors[selected.type]}`} />
                  <h3 className="font-bold text-gray-200">{selected.label}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-gray-700 text-gray-400 capitalize">{selected.type}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 mb-2">Connected To</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.connections.map(connId => {
                        const conn = nodes.find(n => n.id === connId)
                        return conn ? (
                          <button
                            key={connId}
                            onClick={() => setSelectedNode(connId)}
                            className="px-2 py-1 text-[10px] rounded bg-gray-900/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 transition-colors"
                          >
                            {conn.label}
                          </button>
                        ) : null
                      })}
                    </div>
                  </div>

                  {selected.type === 'person' && (
                    <>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 mb-2">Recent Facts</h4>
                        <ul className="space-y-1.5 text-[11px] text-gray-400">
                          <li className="flex items-start gap-2">
                            <span className="text-violet-400 mt-0.5">•</span>
                            Prefers asynchronous communication
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-violet-400 mt-0.5">•</span>
                            Working on Q4 product roadmap
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-violet-400 mt-0.5">•</span>
                            Based in Lagos, WAT timezone
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 mb-2">Evidence</h4>
                        <div className="space-y-1.5">
                          <div className="p-2 rounded bg-gray-900/50 text-[10px] text-gray-400">
                            📝 Conversation #123 — "I prefer async when possible"
                          </div>
                          <div className="p-2 rounded bg-gray-900/50 text-[10px] text-gray-400">
                            📝 Meeting #44 — Q4 Planning discussion
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 mb-2">Confidence</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-gray-700">
                            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                          </div>
                          <span className="text-[10px] text-gray-400">High (80%)</span>
                        </div>
                      </div>
                    </>
                  )}

                  {selected.type === 'project' && (
                    <>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 mb-2">Status</h4>
                        <p className="text-[11px] text-gray-400">Active — Q4 2024 delivery target</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 mb-2">Commitments</h4>
                        <ul className="space-y-1.5 text-[11px] text-gray-400">
                          <li>• Ship v2.0 by end of quarter</li>
                          <li>• Complete user research phase</li>
                        </ul>
                      </div>
                    </>
                  )}

                  <div>
                    <h4 className="text-xs font-bold text-amber-400 mb-2">PAL Provenance</h4>
                    <p className="text-[10px] text-gray-500">
                      Every relationship in this graph carries evidence links, confidence scores, 
                      and last-changed timestamps. Conflicts are surfaced, not hidden.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500">Click a node to see details</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
