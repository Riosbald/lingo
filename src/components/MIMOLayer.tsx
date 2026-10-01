export default function MIMOLayer() {
  return (
    <section id="mimo" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              MÍMO — Representation Assurance
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The layer that challenges whether the context being acted upon is actually adequate. 
            This is PAL's key differentiator from Omi.
          </p>
        </div>

        {/* Core Principle */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-900/10 to-orange-900/10 border border-amber-800/30 mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h4 className="font-bold text-amber-300 text-sm mb-2">Interpretation Audit</h4>
              <p className="text-xs text-gray-400">
                Is the model's interpretation of the user's intent faithful to what was actually said/needed?
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📐</div>
              <h4 className="font-bold text-amber-300 text-sm mb-2">Representation Gap</h4>
              <p className="text-xs text-gray-400">
                What critical information is missing from the context being assembled for action?
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📦</div>
              <h4 className="font-bold text-amber-300 text-sm mb-2">Payload Audit</h4>
              <p className="text-xs text-gray-400">
                Does the proposed action payload match the user's actual intent and constraints?
              </p>
            </div>
          </div>
        </div>

        {/* Omi vs PAL distinction */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-gray-800/30 border border-gray-700/50">
            <h4 className="font-bold text-gray-300 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-500" />
              Omi Architecture
            </h4>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2 rounded bg-gray-900/50 text-gray-400">Memory</div>
              <div className="text-center text-gray-600">↓</div>
              <div className="p-2 rounded bg-gray-900/50 text-gray-400">Agent (LLM decides)</div>
              <div className="text-center text-gray-600">↓</div>
              <div className="p-2 rounded bg-gray-900/50 text-gray-400">Tool Execution</div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              LLM autonomously chooses and calls tools. No intermediate assurance layer.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-amber-900/10 border border-amber-700/30">
            <h4 className="font-bold text-amber-300 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              PAL Architecture
            </h4>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2 rounded bg-gray-900/50 text-gray-400">Memory</div>
              <div className="text-center text-gray-600">↓</div>
              <div className="p-2 rounded bg-amber-900/30 text-amber-300 border border-amber-700/30">MÍMO Assurance</div>
              <div className="text-center text-gray-600">↓</div>
              <div className="p-2 rounded bg-gray-900/50 text-gray-400">Intent / Plan</div>
              <div className="text-center text-gray-600">↓</div>
              <div className="p-2 rounded bg-gray-900/50 text-gray-400">Policy / Authorization</div>
              <div className="text-center text-gray-600">↓</div>
              <div className="p-2 rounded bg-gray-900/50 text-gray-400">Approval</div>
              <div className="text-center text-gray-600">↓</div>
              <div className="p-2 rounded bg-gray-900/50 text-gray-400">Tool → Verification</div>
            </div>
            <p className="text-xs text-amber-400/70 mt-4">
              MODEL ≠ AUTHORITY · MÍMO ≠ AUTHORIZATION · MCP ≠ AUTHORIZATION
            </p>
          </div>
        </div>

        {/* MÍMO Flow */}
        <div className="p-8 rounded-2xl bg-gray-800/20 border border-gray-700/50">
          <h3 className="text-lg font-bold text-gray-200 mb-6 text-center">MÍMO Integration Points</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { phase: 'Pre-Context', desc: 'Audit assembled context before reasoning', icon: '🔎' },
              { phase: 'Pre-Action', desc: 'Verify intent matches representation', icon: '🛡️' },
              { phase: 'Pre-Execution', desc: 'Payload assurance before tool call', icon: '📋' },
              { phase: 'Post-Execution', desc: 'Verify outcome matches expectation', icon: '✅' },
            ].map(item => (
              <div key={item.phase} className="p-4 rounded-xl bg-gray-900/50 border border-gray-700/30 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs font-bold text-amber-300 mb-1">{item.phase}</div>
                <div className="text-[10px] text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sacred Distinction */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-red-900/10 to-amber-900/10 border border-red-800/20">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h4 className="font-semibold text-red-300 mb-1">Sacred Architectural Distinction</h4>
              <p className="text-sm text-gray-400">
                PAL should NOT copy Omi's action semantics. Omi's LLM autonomously selects and executes tools. 
                PAL deliberately inserts governance between intent and execution. 
                This distinction must remain sacred — it is the core of PAL's trust model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
