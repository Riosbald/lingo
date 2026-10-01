export default function MemoryFabric() {
  return (
    <section id="memory" className="py-20 px-6 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              PAL Memory Fabric
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Two retrieval dimensions: <span className="text-cyan-300">Semantic</span> and <span className="text-emerald-300">Graph</span>, 
            combined through Context Fusion for MÍMO-audited reasoning.
          </p>
        </div>

        {/* Three Memory Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-gray-800/30 border border-violet-700/30 hover:border-violet-600/50 transition-colors">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="text-lg font-bold text-violet-300 mb-2">Episodic Memory</h3>
            <p className="text-sm text-gray-400 mb-4">"What happened?"</p>
            <ul className="space-y-2 text-xs text-gray-500">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" />Conversations</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" />Meetings</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" />Captures</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" />Events</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" />Voice Notes</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" />Screen Context</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-gray-800/30 border border-cyan-700/30 hover:border-cyan-600/50 transition-colors">
            <div className="text-3xl mb-3">🧩</div>
            <h3 className="text-lg font-bold text-cyan-300 mb-2">Semantic Memory</h3>
            <p className="text-sm text-gray-400 mb-4">"What should I remember?"</p>
            <ul className="space-y-2 text-xs text-gray-500">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />Facts</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />Knowledge</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />Documents</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />Preferences</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />Procedures</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />Decisions</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-gray-800/30 border border-emerald-700/30 hover:border-emerald-600/50 transition-colors">
            <div className="text-3xl mb-3">🕸️</div>
            <h3 className="text-lg font-bold text-emerald-300 mb-2">Relational Graph</h3>
            <p className="text-sm text-gray-400 mb-4">"What is related to what?"</p>
            <ul className="space-y-2 text-xs text-gray-500">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Entities</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Projects</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />People</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Organizations</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Dependencies</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Relationships</li>
            </ul>
          </div>
        </div>

        {/* Retrieval Pipeline */}
        <div className="p-8 rounded-2xl bg-gray-800/20 border border-gray-700/50">
          <h3 className="text-lg font-bold text-gray-200 mb-6 text-center">Dual Retrieval Pipeline</h3>
          
          <div className="flex flex-col items-center gap-4">
            {/* Query */}
            <div className="px-6 py-3 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-300 font-mono text-sm">
              Query
            </div>
            
            <svg className="w-6 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>

            {/* Fork */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              <div className="p-4 rounded-xl bg-cyan-900/20 border border-cyan-700/30 text-center">
                <div className="text-xs font-bold text-cyan-300 mb-1">VECTOR RECALL</div>
                <div className="text-[10px] text-gray-500">Semantic similarity</div>
                <div className="text-[10px] text-gray-500">"What conversations are similar?"</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-700/30 text-center">
                <div className="text-xs font-bold text-emerald-300 mb-1">GRAPH RECALL</div>
                <div className="text-[10px] text-gray-500">Entity relationships</div>
                <div className="text-[10px] text-gray-500">"What is connected to this?"</div>
              </div>
            </div>

            <svg className="w-6 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>

            {/* Fusion */}
            <div className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-900/30 to-emerald-900/30 border border-gray-600/30 text-center">
              <div className="text-sm font-bold text-gray-200">Context Fusion</div>
              <div className="text-[10px] text-gray-500 mt-1">Combined semantic + graph context</div>
            </div>

            <svg className="w-6 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>

            {/* MÍMO */}
            <div className="px-8 py-4 rounded-xl bg-amber-900/20 border border-amber-700/30 text-center">
              <div className="text-sm font-bold text-amber-300">MÍMO Assurance</div>
              <div className="text-[10px] text-gray-500 mt-1">Representation gap audit before reasoning</div>
            </div>

            <svg className="w-6 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>

            {/* PAL */}
            <div className="px-8 py-4 rounded-xl bg-violet-900/20 border border-violet-700/30 text-center">
              <div className="text-sm font-bold text-violet-300">PAL Reasoning</div>
              <div className="text-[10px] text-gray-500 mt-1">Governed response generation</div>
            </div>
          </div>
        </div>

        {/* Memory Processing Unit */}
        <div className="mt-12 p-8 rounded-2xl bg-gray-800/20 border border-gray-700/50">
          <h3 className="text-lg font-bold text-gray-200 mb-6 text-center">Core Memory Processing Unit</h3>
          <p className="text-sm text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            The continuous transformation loop — from raw experience to personalized response to new experience.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {[
              'RAW EXPERIENCE',
              'CONVERSATION',
              'STRUCTURED EXPERIENCE',
              'FACT EXTRACTION',
              'MEMORY',
              'ENTITY GRAPH',
              'RETRIEVAL',
              'PERSONALIZED RESPONSE',
              'NEW EXPERIENCE'
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className={`px-3 py-2 rounded-lg font-mono ${
                  i === 0 ? 'bg-gray-700/50 text-gray-300' :
                  i === 4 ? 'bg-cyan-900/30 text-cyan-300 border border-cyan-700/30' :
                  i === 5 ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/30' :
                  i === 7 ? 'bg-violet-900/30 text-violet-300 border border-violet-700/30' :
                  'bg-gray-800/50 text-gray-400'
                }`}>
                  {step}
                </span>
                {i < 8 && <span className="text-gray-600">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
