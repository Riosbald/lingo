import { useState } from 'react'

const tiers = [
  {
    name: 'Tier 0 — Foundational',
    color: 'violet',
    description: 'Core infrastructure that everything depends on',
    modules: [
      'Capture Fabric', 'Conversation Engine', 'Memory Processing Unit',
      'Memory Fabric', 'Knowledge Graph', 'Vector Retrieval',
      'Evidence Graph', 'MÍMO', 'Context Assembly',
      'Persona Engine', 'Policy Engine', 'Approval Engine',
      'Execution Kernel', 'Verification'
    ]
  },
  {
    name: 'Tier 1 — Omi Parity',
    color: 'cyan',
    description: 'Feature parity with Omi\'s current capabilities',
    modules: [
      'Continuous Transcription', 'Speaker Profiles', 'Diarization',
      'Conversation Summaries', 'Action Extraction', 'Event Extraction',
      'Memory Extraction', 'Ask PAL', 'Daily Recap',
      'Timeline', 'Mind Map', 'Search',
      'Tasks', 'Calendar', 'Notifications', 'Screen Intelligence'
    ]
  },
  {
    name: 'Tier 2 — Platform',
    color: 'emerald',
    description: 'Ecosystem and extensibility infrastructure',
    modules: [
      'App Store', 'Capability Registry', 'OAuth Connections',
      'Chat Tools', 'Imports', 'Webhooks',
      'Notifications', 'Developer SDK', 'MCP Hub',
      'App Review', 'App Analytics', 'App Billing',
      'App Permissions', 'App Recommendations'
    ]
  },
  {
    name: 'Tier 3 — Proactive Intelligence',
    color: 'amber',
    description: 'Proactive life and work intelligence',
    modules: [
      'Goals', 'Workstreams', 'Commitments',
      'Open Loops', 'Suggested Tasks', 'What Matters Now',
      'Proactive Notifications', 'Routine Intelligence', 'Relationship Intelligence'
    ]
  },
  {
    name: 'Tier 4 — PAL Differentiation',
    color: 'red',
    description: 'Unique PAL capabilities that no other system has',
    modules: [
      'MÍMO RGC', 'Representation Gap Detection', 'Cultural/Linguistic Context',
      'Code-Switch Semantic Assurance', 'Evidence-Weighted Memory', 'Policy-Aware Capability Selection',
      'Action Leakage Detection', 'Tool Payload Assurance', 'Human/Community Correction',
      'Epistemic State Tracking'
    ]
  }
]

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  violet: { bg: 'bg-violet-900/20', border: 'border-violet-700/30', text: 'text-violet-300', dot: 'bg-violet-500' },
  cyan: { bg: 'bg-cyan-900/20', border: 'border-cyan-700/30', text: 'text-cyan-300', dot: 'bg-cyan-500' },
  emerald: { bg: 'bg-emerald-900/20', border: 'border-emerald-700/30', text: 'text-emerald-300', dot: 'bg-emerald-500' },
  amber: { bg: 'bg-amber-900/20', border: 'border-amber-700/30', text: 'text-amber-300', dot: 'bg-amber-500' },
  red: { bg: 'bg-red-900/20', border: 'border-red-700/30', text: 'text-red-300', dot: 'bg-red-500' },
}

export default function ModuleRoadmap() {
  const [expandedTier, setExpandedTier] = useState(0)

  return (
    <section id="roadmap" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
              Expanded Module Roadmap
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Five tiers of capability — from foundational infrastructure to PAL-unique differentiation
          </p>
        </div>

        <div className="space-y-4">
          {tiers.map((tier, i) => {
            const colors = colorMap[tier.color]
            const isExpanded = expandedTier === i
            return (
              <div
                key={tier.name}
                className={`rounded-xl border transition-all duration-300 ${colors.bg} ${colors.border} ${
                  isExpanded ? 'ring-1 ring-gray-600' : ''
                }`}
              >
                <button
                  onClick={() => setExpandedTier(isExpanded ? -1 : i)}
                  className="w-full text-left p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
                    <div>
                      <h3 className={`font-bold text-sm ${colors.text}`}>{tier.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{tier.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{tier.modules.length} modules</span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {tier.modules.map(mod => (
                        <div
                          key={mod}
                          className="px-3 py-2 rounded-lg bg-gray-900/50 border border-gray-800/50 text-xs text-gray-300 hover:bg-gray-800/50 transition-colors"
                        >
                          {mod}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Five Cores */}
        <div className="mt-16 p-8 rounded-2xl bg-gray-800/20 border border-gray-700/50">
          <h3 className="text-lg font-bold text-gray-200 mb-6 text-center">Five Core Restructuring</h3>
          <div className="grid sm:grid-cols-5 gap-3">
            {[
              { name: 'Experience Core', icon: '🎙️', desc: 'Capture + Perception' },
              { name: 'Memory Core', icon: '🧠', desc: 'Fabric + Graph + Processing' },
              { name: 'MÍMO Core', icon: '🛡️', desc: 'Representation Assurance' },
              { name: 'Execution Core', icon: '⚡', desc: 'Governance + Action' },
              { name: 'Ecosystem Core', icon: '🏪', desc: 'Apps + MCP + Platform' },
            ].map(core => (
              <div key={core.name} className="p-4 rounded-xl bg-gray-900/50 border border-gray-700/30 text-center">
                <div className="text-2xl mb-2">{core.icon}</div>
                <div className="text-xs font-bold text-gray-200 mb-1">{core.name}</div>
                <div className="text-[10px] text-gray-500">{core.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
