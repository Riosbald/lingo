export default function SynthesisDiagram() {
  return (
    <section id="synthesis" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Final Synthesis
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Omi supplies the persistent perception + memory layer. 
            PAL supplies the governed decision + action layer. 
            MÍMO supplies the representation assurance layer.
          </p>
        </div>

        {/* Main Architecture Diagram */}
        <div className="p-8 rounded-2xl bg-gray-800/20 border border-gray-700/50 mb-12">
          <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
            {/* Omi Layer */}
            <div className="w-full p-5 rounded-xl bg-gradient-to-r from-violet-900/20 to-blue-900/20 border border-violet-700/30">
              <div className="text-center">
                <span className="text-xs font-bold text-violet-300">OMI</span>
                <p className="text-[10px] text-gray-500 mt-1">Perception + Memory + Personal Computing</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">Capture Fabric</div>
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">Memory Engine</div>
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">Knowledge Graph</div>
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">Task Intelligence</div>
              </div>
            </div>

            <div className="text-gray-600 text-lg">↓</div>

            {/* PAL Core */}
            <div className="w-full p-5 rounded-xl bg-gradient-to-r from-cyan-900/20 to-emerald-900/20 border border-cyan-700/30">
              <div className="text-center">
                <span className="text-xs font-bold text-cyan-300">PAL CORE</span>
                <p className="text-[10px] text-gray-500 mt-1">Reasoning + Persona + Decision Layer</p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">MÍMO</div>
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">Reasoning</div>
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">Persona</div>
              </div>
            </div>

            <div className="text-gray-600 text-lg">↓</div>

            {/* Decision Layer */}
            <div className="w-full p-5 rounded-xl bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-700/30">
              <div className="text-center">
                <span className="text-xs font-bold text-amber-300">DECISION LAYER</span>
                <p className="text-[10px] text-gray-500 mt-1">Policy + Authorization + Approval</p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">Policy Engine</div>
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">Approval</div>
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">Consent</div>
              </div>
            </div>

            <div className="text-gray-600 text-lg">↓</div>

            {/* Execution */}
            <div className="w-full p-5 rounded-xl bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-700/30">
              <div className="text-center">
                <span className="text-xs font-bold text-emerald-300">EXECUTION KERNEL</span>
                <p className="text-[10px] text-gray-500 mt-1">MCP Hub + Connectors + Verification</p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">MCP Hub</div>
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">App Store</div>
                <div className="text-[9px] text-gray-400 text-center p-1.5 rounded bg-gray-900/30">Verification</div>
              </div>
            </div>

            <div className="text-gray-600 text-lg">↓</div>

            {/* External World */}
            <div className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700/30 text-center">
              <span className="text-xs font-bold text-gray-400">EXTERNAL WORLD</span>
              <p className="text-[10px] text-gray-600 mt-1">Calendar · Slack · Notion · GitHub · Web · IoT · ...</p>
            </div>
          </div>
        </div>

        {/* Key Principles */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-violet-900/10 border border-violet-800/30">
            <h4 className="font-bold text-violet-300 text-sm mb-3">Omi's Contribution</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>✓ Multi-runtime capture</li>
              <li>✓ Persistent memory pipeline</li>
              <li>✓ Knowledge graph extraction</li>
              <li>✓ Dual retrieval (vector + graph)</li>
              <li>✓ Candidate/task lifecycle</li>
              <li>✓ Proactive intelligence</li>
              <li>✓ App marketplace model</li>
              <li>✓ MCP infrastructure</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-amber-900/10 border border-amber-800/30">
            <h4 className="font-bold text-amber-300 text-sm mb-3">MÍMO's Contribution</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>✓ Representation gap detection</li>
              <li>✓ Interpretation audit</li>
              <li>✓ Payload assurance</li>
              <li>✓ Cultural context awareness</li>
              <li>✓ Code-switch verification</li>
              <li>✓ Epistemic state tracking</li>
              <li>✓ Action leakage detection</li>
              <li>✓ Community correction</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-emerald-900/10 border border-emerald-800/30">
            <h4 className="font-bold text-emerald-300 text-sm mb-3">PAL's Contribution</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>✓ Governance before action</li>
              <li>✓ Evidence-weighted memory</li>
              <li>✓ Policy-aware capabilities</li>
              <li>✓ Human approval loops</li>
              <li>✓ Verification contracts</li>
              <li>✓ Credential brokering</li>
              <li>✓ Structured persona state</li>
              <li>✓ Sacred MODEL ≠ AUTHORITY</li>
            </ul>
          </div>
        </div>

        {/* Final Statement */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-900/10 via-gray-800/20 to-cyan-900/10 border border-gray-700/50 text-center">
          <h3 className="text-xl font-bold text-gray-200 mb-4">The Universal Contextual Operating System</h3>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            PAL should not be built as merely "Omi + MÍMO + workflows." 
            The correct mental model is a layered convergence where each system 
            contributes its architectural strength while respecting the boundaries of the others.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-lg bg-violet-900/20 border border-violet-700/30 text-xs text-violet-300">
              Omi = Perception + Memory
            </span>
            <span className="px-4 py-2 rounded-lg bg-amber-900/20 border border-amber-700/30 text-xs text-amber-300">
              MÍMO = Assurance
            </span>
            <span className="px-4 py-2 rounded-lg bg-emerald-900/20 border border-emerald-700/30 text-xs text-emerald-300">
              PAL = Governance + Execution
            </span>
          </div>
        </div>

        {/* Engineering Lesson */}
        <div className="mt-12 p-6 rounded-xl bg-gray-800/30 border border-gray-700/50">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔑</span>
            <div>
              <h4 className="font-semibold text-gray-200 mb-2">The Engineering Lesson from Omi</h4>
              <p className="text-sm text-gray-400">
                Omi became technically sophisticated because it did <span className="text-cyan-300">not</span> make everything one model. 
                It has specialized subsystems: STT, VAD, Diarization, Conversation processing, Memory extraction, 
                Knowledge graph, Vector search, Chat, Persona, Task intelligence, Apps, MCP, Notifications, Goals. 
                This reinforces PAL's architectural decision: <span className="text-violet-300">PAL should not become one giant autonomous agent.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
