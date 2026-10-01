import { useState } from 'react'

interface AppDef {
  id: string
  name: string
  category: string
  capabilities: string[]
  risk: 'low' | 'medium' | 'high'
  status: 'approved' | 'review' | 'suspended'
  mcp: boolean
  tools: number
}

const apps: AppDef[] = [
  { id: '1', name: 'Slack Bridge', category: 'Communication', capabilities: ['Chat Tools', 'Imports', 'Notifications'], risk: 'medium', status: 'approved', mcp: true, tools: 5 },
  { id: '2', name: 'GitHub Sync', category: 'Development', capabilities: ['Imports', 'Triggers', 'Chat Tools'], risk: 'medium', status: 'approved', mcp: true, tools: 8 },
  { id: '3', name: 'Calendar Pro', category: 'Productivity', capabilities: ['Chat Tools', 'Triggers'], risk: 'low', status: 'approved', mcp: false, tools: 4 },
  { id: '4', name: 'Notion Memory', category: 'Knowledge', capabilities: ['Memory', 'Imports', 'Chat Tools'], risk: 'medium', status: 'approved', mcp: true, tools: 6 },
  { id: '5', name: 'Finance Tracker', category: 'Finance', capabilities: ['Imports', 'External Integration'], risk: 'high', status: 'review', mcp: false, tools: 3 },
  { id: '6', name: 'Health Monitor', category: 'Health', capabilities: ['Memory', 'Notifications'], risk: 'high', status: 'review', mcp: false, tools: 2 },
]

const riskColors = {
  low: 'bg-emerald-900/30 text-emerald-300 border-emerald-700/30',
  medium: 'bg-amber-900/30 text-amber-300 border-amber-700/30',
  high: 'bg-red-900/30 text-red-300 border-red-700/30',
}

const statusColors = {
  approved: 'bg-emerald-900/30 text-emerald-300',
  review: 'bg-amber-900/30 text-amber-300',
  suspended: 'bg-red-900/30 text-red-300',
}

export default function AppMarketplace() {
  const [selectedApp, setSelectedApp] = useState<AppDef | null>(apps[0])

  return (
    <section id="marketplace" className="py-20 px-6 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              PAL App Marketplace
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            An agent capability marketplace — not just a directory. 
            Apps expose capabilities, tools, and MCP endpoints with governance.
          </p>
        </div>

        {/* App Object Schema */}
        <div className="p-6 rounded-2xl bg-gray-800/20 border border-gray-700/50 mb-8">
          <h3 className="text-sm font-bold text-gray-300 mb-4">PAL App Object — Governance-Aware</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { field: 'capabilities', desc: 'Memory, Chat, Integration, Triggers' },
              { field: 'permissions', desc: 'Explicit user-granted access scope' },
              { field: 'riskProfile', desc: 'Low / Medium / High classification' },
              { field: 'dataAccess', desc: 'What data the app can read/write' },
              { field: 'executionPolicy', desc: 'What actions require approval' },
              { field: 'verification', desc: 'Contract for outcome verification' },
              { field: 'mcp', desc: 'Optional MCP server definition' },
              { field: 'provenance', desc: 'Source metadata and audit trail' },
            ].map(item => (
              <div key={item.field} className="p-3 rounded-lg bg-gray-900/50 border border-gray-800/50">
                <div className="text-[10px] font-mono text-cyan-300 mb-1">{item.field}</div>
                <div className="text-[10px] text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* App Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
            {apps.map(app => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedApp?.id === app.id
                    ? 'bg-gray-800/60 border-gray-600'
                    : 'bg-gray-800/20 border-gray-800 hover:bg-gray-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-gray-200">{app.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                </div>
                <div className="text-[10px] text-gray-500 mb-2">{app.category}</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {app.capabilities.map(cap => (
                    <span key={cap} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-700/50 text-gray-400">
                      {cap}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border ${riskColors[app.risk]}`}>
                    {app.risk} risk
                  </span>
                  {app.mcp && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-900/30 text-violet-300 border border-violet-700/30">
                      MCP
                    </span>
                  )}
                  <span className="text-[9px] text-gray-500">{app.tools} tools</span>
                </div>
              </button>
            ))}
          </div>

          {/* App Detail */}
          <div className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50">
            {selectedApp && (
              <>
                <h3 className="font-bold text-gray-200 mb-1">{selectedApp.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{selectedApp.category}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 mb-2">CAPABILITIES</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedApp.capabilities.map(cap => (
                        <span key={cap} className="text-[10px] px-2 py-1 rounded bg-cyan-900/20 text-cyan-300 border border-cyan-700/30">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 mb-2">RISK PROFILE</h4>
                    <span className={`text-[10px] px-2 py-1 rounded border ${riskColors[selectedApp.risk]}`}>
                      {selectedApp.risk.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 mb-2">CHAT TOOLS EXPOSED</h4>
                    <div className="space-y-1">
                      {Array.from({ length: selectedApp.tools }).map((_, i) => (
                        <div key={i} className="text-[10px] text-gray-400 font-mono p-1.5 rounded bg-gray-900/50">
                          {selectedApp.name.toLowerCase().replace(' ', '_')}_{['search', 'list', 'create', 'update', 'delete', 'send', 'get', 'sync'][i] || 'action'}_{i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-900/10 border border-amber-800/30">
                    <p className="text-[10px] text-amber-300/70">
                      ⚡ PAL addition: Every tool call goes through Policy → MÍMO → Approval pipeline. 
                      Apps cannot bypass governance.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Capability Flow */}
        <div className="mt-12 p-8 rounded-2xl bg-gray-800/20 border border-gray-700/50">
          <h3 className="text-sm font-bold text-gray-200 mb-6 text-center">PAL Capability Flow — Governed Tool Selection</h3>
          <div className="flex flex-col items-center gap-2 max-w-md mx-auto">
            {[
              { label: 'Capability Proposal', color: 'bg-gray-800/50 text-gray-300 border-gray-700' },
              { label: 'MÍMO Check', color: 'bg-amber-900/20 text-amber-300 border-amber-700/30' },
              { label: 'Policy Gate', color: 'bg-red-900/20 text-red-300 border-red-700/30' },
              { label: 'Permission Check', color: 'bg-violet-900/20 text-violet-300 border-violet-700/30' },
              { label: 'User Approval', color: 'bg-cyan-900/20 text-cyan-300 border-cyan-700/30' },
              { label: 'Credential Broker', color: 'bg-emerald-900/20 text-emerald-300 border-emerald-700/30' },
              { label: 'MCP / Connector', color: 'bg-pink-900/20 text-pink-300 border-pink-700/30' },
            ].map((step, i) => (
              <div key={step.label} className="w-full flex items-center gap-2">
                <div className={`flex-1 px-4 py-2 rounded-lg border text-xs font-mono text-center ${step.color}`}>
                  {step.label}
                </div>
                {i < 6 && <span className="text-gray-600 text-xs">↓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
