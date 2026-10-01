export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-sm text-gray-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Architecture Synthesis — Deep Research Complete
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            PAL × Omi
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-300 mb-4 font-light">
          Universal Contextual Operating System
        </p>
        
        <p className="text-base sm:text-lg text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">
          The convergence of Omi's persistent perception + memory + personal-computing layer 
          with PAL's governed decision + action + verification layer, 
          unified through MÍMO representation assurance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="p-5 rounded-xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm">
            <div className="text-2xl mb-2">🧠</div>
            <h3 className="font-semibold text-violet-300 text-sm mb-1">Memory Core</h3>
            <p className="text-xs text-gray-500">Episodic · Semantic · Relational · Evidence</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm">
            <div className="text-2xl mb-2">🛡️</div>
            <h3 className="font-semibold text-cyan-300 text-sm mb-1">MÍMO Assurance</h3>
            <p className="text-xs text-gray-500">Representation Gap · Payload Audit · Policy</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-emerald-300 text-sm mb-1">Execution Core</h3>
            <p className="text-xs text-gray-500">Governance · Approval · MCP · Verification</p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
          <span className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/30">Knowledge Graph</span>
          <span className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/30">Core Memory Processing</span>
          <span className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/30">Personality Engine</span>
          <span className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/30">App Marketplace</span>
          <span className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/30">Goal Intelligence</span>
          <span className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/30">MCP Hub</span>
          <span className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/30">Capture Fabric</span>
        </div>
      </div>
    </section>
  )
}
