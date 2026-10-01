import { useState } from 'react'

const layers = [
  {
    name: 'CAPTURE LAYER',
    color: 'from-violet-500 to-violet-700',
    items: ['Wearable', 'Glass', 'Phone', 'Mac', 'Windows', 'Screen', 'Audio', 'Photos', 'Text'],
    description: 'Multi-runtime capture across all devices and modalities'
  },
  {
    name: 'PERCEPTION LAYER',
    color: 'from-blue-500 to-blue-700',
    items: ['VAD', 'STT', 'Speaker ID', 'Language', 'Translation', 'Visual Context'],
    description: 'Transform raw signals into structured perception'
  },
  {
    name: 'MEMORY ENGINE',
    color: 'from-cyan-500 to-cyan-700',
    items: ['Conversations', 'Summaries', 'Facts', 'Embeddings', 'Knowledge Graph', 'Entities'],
    description: 'Persistent memory with semantic + graph retrieval'
  },
  {
    name: 'COGNITIVE / AGENT LAYER',
    color: 'from-emerald-500 to-emerald-700',
    items: ['Chat', 'Retrieval', 'Persona', 'Tools', 'Apps', 'Goals', 'Tasks'],
    description: 'Reasoning, planning, and proactive intelligence'
  },
  {
    name: 'ACTION / EXTENSION',
    color: 'from-amber-500 to-amber-700',
    items: ['Calendar', 'Slack', 'Notion', 'GitHub', 'MCP', 'Webhooks', 'Notifications'],
    description: 'Governed execution through MCP and connectors'
  }
]

export default function ArchitectureOverview() {
  const [activeLayer, setActiveLayer] = useState(0)

  return (
    <section id="architecture" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              The Bigger Discovery
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Omi is not just a wearable. It is a <span className="text-cyan-300">personal context operating platform</span> — 
            substantially closer to the PAL direction.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Layer Stack */}
          <div className="space-y-2">
            {layers.map((layer, i) => (
              <button
                key={layer.name}
                onClick={() => setActiveLayer(i)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  activeLayer === i
                    ? 'bg-gray-800/80 border-gray-600 scale-[1.02]'
                    : 'bg-gray-900/40 border-gray-800 hover:bg-gray-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${layer.color}`} />
                  <span className="font-mono text-xs font-bold text-gray-300">{layer.name}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2 ml-6">
                  {layer.items.map(item => (
                    <span key={item} className="px-2 py-0.5 text-[10px] rounded bg-gray-700/50 text-gray-400">
                      {item}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="flex flex-col justify-center">
            <div className="p-8 rounded-2xl bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${layers[activeLayer].color} text-white mb-4`}>
                {layers[activeLayer].name}
              </div>
              <p className="text-gray-300 text-lg mb-6">{layers[activeLayer].description}</p>
              
              <div className="space-y-3">
                {layers[activeLayer].items.map((item, i) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50">
                    <span className="text-xs font-mono text-gray-500">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-violet-900/20 to-cyan-900/20 border border-violet-800/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-violet-300 mb-1">Key Architectural Insight</h4>
              <p className="text-sm text-gray-400">
                The architecture is not merely: <code className="text-gray-300">conversation → embedding → vector search</code>. 
                It is a multi-stage pipeline: <code className="text-cyan-300">conversation → memory → entity extraction → node normalization → relationship extraction → knowledge graph → vector + graph retrieval</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
