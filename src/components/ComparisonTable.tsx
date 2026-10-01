export default function ComparisonTable() {
  return (
    <section id="comparison" className="py-20 px-6 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 to-amber-400 bg-clip-text text-transparent">
              Architecture Comparison
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            What PAL adopts from Omi vs. what it deliberately diverges on
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Dimension</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Omi</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">PAL</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {[
                { dim: 'Memory Retrieval', omi: 'Vector + Graph', pal: 'Vector + Graph + Evidence', action: 'Adopt' },
                { dim: 'Knowledge Graph', omi: 'Entity/relationship extraction', pal: 'Graph + provenance per edge', action: 'Adopt + Extend' },
                { dim: 'Memory Processing', omi: 'Conversation → structured extraction', pal: 'Same pipeline + MÍMO audit', action: 'Adopt + Extend' },
                { dim: 'Memory Types', omi: 'Conversation / Extracted / Graph / Task', pal: 'Episodic / Semantic / Relational + Evidence', action: 'Adopt' },
                { dim: 'Task System', omi: 'Candidates → Tasks → Goals → Workstreams', pal: 'Same + Policy-aware commitment layer', action: 'Adopt + Extend' },
                { dim: 'Chat Engine', omi: '22+ tools, agentic loop', pal: 'Tool selection + MÍMO + Policy gate', action: 'Diverge' },
                { dim: 'Action Model', omi: 'LLM autonomous tool selection', pal: 'Intent → Policy → Approval → Execute', action: 'Diverge' },
                { dim: 'Persona', omi: 'Condensed behavioral representation', pal: 'Structured profile + Policy constraints', action: 'Adopt + Govern' },
                { dim: 'App Store', omi: '1000+ apps, capability registry', pal: 'Same + risk profile + verification contract', action: 'Adopt + Govern' },
                { dim: 'MCP', omi: 'Hosted endpoint + app-level MCP', pal: 'MCP subordinate to governance model', action: 'Adopt + Subordinate' },
                { dim: 'Capture', omi: 'Wearable + Glass + Mobile + Desktop', pal: 'Same + IoT + Documents + Messages', action: 'Adopt + Extend' },
                { dim: 'Proactive Intel', omi: 'Goals + What Matters Now', pal: 'Same + MÍMO-filtered proposals', action: 'Adopt + Govern' },
              ].map(row => (
                <tr key={row.dim} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                  <td className="py-3 px-4 text-gray-200 font-medium">{row.dim}</td>
                  <td className="py-3 px-4 text-gray-400">{row.omi}</td>
                  <td className="py-3 px-4 text-gray-300">{row.pal}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      row.action === 'Adopt' ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/30' :
                      row.action === 'Diverge' ? 'bg-red-900/30 text-red-300 border border-red-700/30' :
                      row.action.includes('Extend') ? 'bg-cyan-900/30 text-cyan-300 border border-cyan-700/30' :
                      'bg-amber-900/30 text-amber-300 border border-amber-700/30'
                    }`}>
                      {row.action}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Insight */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-emerald-900/10 border border-emerald-800/30">
            <h4 className="font-bold text-emerald-300 text-sm mb-3">✅ Adopt from Omi</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>• Knowledge graph with entity extraction</li>
              <li>• Core memory processing pipeline</li>
              <li>• Dual retrieval (vector + graph)</li>
              <li>• Candidate → Task → Goal lifecycle</li>
              <li>• App marketplace infrastructure</li>
              <li>• Chat tools as capability registry</li>
              <li>• Multi-runtime capture fabric</li>
              <li>• Proactive intelligence system</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-red-900/10 border border-red-800/30">
            <h4 className="font-bold text-red-300 text-sm mb-3">🚫 Do NOT Adopt</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>• Autonomous LLM tool execution</li>
              <li>• Model as authority</li>
              <li>• Ungoverned action pipeline</li>
              <li>• No representation assurance</li>
              <li>• No policy gate before execution</li>
              <li>• No evidence-weighted memory</li>
              <li>• No human/community correction</li>
              <li>• No epistemic state tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
