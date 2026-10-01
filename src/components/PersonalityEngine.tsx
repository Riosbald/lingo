export default function PersonalityEngine() {
  return (
    <section id="personality" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              Personality Engine
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Personality as structured state, not a prompt string. 
            Separating personality from personalization from policy.
          </p>
        </div>

        {/* PersonaProfile Structure */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50">
            <h3 className="font-bold text-pink-300 mb-4 text-sm">PersonaProfile — Structured State</h3>
            <div className="space-y-2">
              {[
                { key: 'Identity', desc: 'Core stable identity traits' },
                { key: 'Voice', desc: 'Communication style and tone' },
                { key: 'Formality', desc: 'Register and professional distance' },
                { key: 'Verbosity', desc: 'How much detail to provide' },
                { key: 'Humor', desc: 'Humor style and frequency' },
                { key: 'Initiative', desc: 'How proactive to be' },
                { key: 'Decision Style', desc: 'How to present options vs. recommendations' },
                { key: 'Risk Tolerance', desc: 'Conservative vs. bold suggestions' },
                { key: 'Communication Prefs', desc: 'Preferred channels and formats' },
                { key: 'Domain Expertise', desc: 'Areas of deep knowledge' },
                { key: 'Cultural/Register', desc: 'Linguistic and social context' },
                { key: 'Relationship Context', desc: 'Per-relationship behavior' },
                { key: 'Behavioral Constraints', desc: 'Hard limits on behavior' },
              ].map(item => (
                <div key={item.key} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-900/30 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  <span className="text-xs font-medium text-gray-200 w-32">{item.key}</span>
                  <span className="text-[10px] text-gray-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Persona Layers */}
          <div className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50">
            <h3 className="font-bold text-violet-300 mb-4 text-sm">Persona Layers — Adaptive System</h3>
            <div className="space-y-3">
              {[
                { layer: 'CORE', desc: 'Stable identity — rarely changes', color: 'border-violet-500 bg-violet-900/20' },
                { layer: 'ADAPTIVE', desc: 'Evolving preferences — updates with interaction', color: 'border-cyan-500 bg-cyan-900/20' },
                { layer: 'SITUATIONAL', desc: 'Current mood/context/task — ephemeral', color: 'border-amber-500 bg-amber-900/20' },
                { layer: 'RELATIONAL', desc: 'Relationship-specific behavior — per person', color: 'border-pink-500 bg-pink-900/20' },
              ].map(l => (
                <div key={l.layer} className={`p-4 rounded-xl border ${l.color}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-200">{l.layer}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">{l.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-red-900/10 border border-red-800/30">
              <h4 className="text-xs font-bold text-red-300 mb-2">Policy {'>'} Persona</h4>
              <div className="grid grid-cols-2 gap-3 text-[10px]">
                <div>
                  <p className="text-gray-400 font-medium mb-1">Persona CAN affect:</p>
                  <ul className="space-y-0.5 text-gray-500">
                    <li>• tone</li>
                    <li>• style</li>
                    <li>• verbosity</li>
                    <li>• communication</li>
                  </ul>
                </div>
                <div>
                  <p className="text-red-400/70 font-medium mb-1">Persona CANNOT override:</p>
                  <ul className="space-y-0.5 text-gray-500">
                    <li>• permission</li>
                    <li>• privacy</li>
                    <li>• safety</li>
                    <li>• policy</li>
                    <li>• evidence requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prompt Assembly */}
        <div className="p-8 rounded-2xl bg-gray-800/20 border border-gray-700/50">
          <h3 className="text-lg font-bold text-gray-200 mb-6 text-center">Prompt Assembly Pipeline</h3>
          
          <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
            {[
              { label: 'SYSTEM POLICY', color: 'bg-red-900/20 border-red-700/30 text-red-300' },
              { label: 'PERSONA', color: 'bg-pink-900/20 border-pink-700/30 text-pink-300' },
              { label: 'USER PROFILE', color: 'bg-violet-900/20 border-violet-700/30 text-violet-300' },
              { label: 'MEMORY', color: 'bg-cyan-900/20 border-cyan-700/30 text-cyan-300' },
              { label: 'RELATIONSHIP', color: 'bg-emerald-900/20 border-emerald-700/30 text-emerald-300' },
              { label: 'CULTURAL CONTEXT', color: 'bg-amber-900/20 border-amber-700/30 text-amber-300' },
              { label: 'CURRENT TASK', color: 'bg-blue-900/20 border-blue-700/30 text-blue-300' },
              { label: 'MÍMO REPRESENTATION AUDIT', color: 'bg-orange-900/20 border-orange-700/30 text-orange-300' },
            ].map((item, i) => (
              <div key={item.label} className="w-full flex items-center gap-3">
                <div className={`flex-1 px-4 py-2.5 rounded-lg border text-xs font-mono text-center ${item.color}`}>
                  {item.label}
                </div>
                {i < 7 && (
                  <span className="text-gray-600 text-xs">+</span>
                )}
              </div>
            ))}
            
            <div className="w-full mt-2">
              <div className="px-4 py-3 rounded-lg bg-gradient-to-r from-violet-900/30 to-cyan-900/30 border border-gray-600/30 text-center">
                <span className="text-xs font-bold text-gray-200">→ FINAL MODEL CONTEXT ←</span>
              </div>
            </div>
          </div>
        </div>

        {/* Identity vs Personalization */}
        <div className="mt-12 grid md:grid-cols-5 gap-3">
          {[
            { title: 'PERSONALITY', q: 'What style should PAL use?', icon: '🎭' },
            { title: 'PERSONAL CONTEXT', q: 'What does PAL know about this user?', icon: '👤' },
            { title: 'RELATIONAL STATE', q: 'Who is PAL talking to?', icon: '🤝' },
            { title: 'CULTURAL CONTEXT', q: 'What linguistic/social context applies?', icon: '🌍' },
            { title: 'TASK CONTEXT', q: 'What is happening right now?', icon: '📋' },
          ].map(item => (
            <div key={item.title} className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 text-center">
              <div className="text-xl mb-2">{item.icon}</div>
              <div className="text-[10px] font-bold text-gray-300 mb-1">{item.title}</div>
              <div className="text-[9px] text-gray-500">{item.q}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
