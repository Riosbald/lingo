import { useState } from 'react'
import { apps as initialApps, type App } from '../data'

export default function Apps() {
  const [apps, setApps] = useState<App[]>(initialApps)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedApp, setSelectedApp] = useState<App | null>(null)

  const categories = ['all', ...new Set(initialApps.map(a => a.category))]

  const toggleInstall = (id: string) => {
    setApps(prev => prev.map(a =>
      a.id === id ? { ...a, installed: !a.installed, enabled: !a.installed } : a
    ))
  }

  const toggleEnabled = (id: string) => {
    setApps(prev => prev.map(a =>
      a.id === id ? { ...a, enabled: !a.enabled } : a
    ))
  }

  const filteredApps = apps.filter(a =>
    categoryFilter === 'all' || a.category === categoryFilter
  )

  const installedApps = apps.filter(a => a.installed)
  const riskColors = {
    low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    high: 'text-red-400 bg-red-500/10 border-red-500/20',
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-zinc-800/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Apps</h2>
            <p className="text-[11px] text-zinc-500">{installedApps.length} installed · {apps.length} available</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-zinc-500 hover:text-zinc-300 bg-zinc-900/30'
              }`}
            >
              {cat === 'all' ? 'All Apps' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* App Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedApp(null)}>
          <div
            className="w-full max-w-lg bg-zinc-900 border-t border-zinc-800 rounded-t-2xl p-5 animate-slide-up safe-bottom"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">{selectedApp.icon}</span>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-zinc-100">{selectedApp.name}</h3>
                <p className="text-xs text-zinc-400 mt-0.5">{selectedApp.category}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-4">{selectedApp.description}</p>

            <div className="space-y-3 mb-4">
              <div>
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Capabilities</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApp.capabilities.map(cap => (
                    <span key={cap} className="px-2 py-1 text-[10px] rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Risk Level</h4>
                <span className={`px-2 py-1 text-[10px] rounded-md border ${riskColors[selectedApp.risk]}`}>
                  {selectedApp.risk.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {selectedApp.installed ? (
                <>
                  <button
                    onClick={() => { toggleEnabled(selectedApp.id); setSelectedApp({ ...selectedApp, enabled: !selectedApp.enabled }) }}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedApp.enabled
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {selectedApp.enabled ? '✓ Enabled' : '○ Disabled'}
                  </button>
                  <button
                    onClick={() => { toggleInstall(selectedApp.id); setSelectedApp({ ...selectedApp, installed: false }) }}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { toggleInstall(selectedApp.id); setSelectedApp({ ...selectedApp, installed: true, enabled: true }) }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                >
                  Install App
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* App Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-24">
        {/* Installed Section */}
        {categoryFilter === 'all' && installedApps.length > 0 && (
          <div className="mb-4">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-1">Installed</h3>
            <div className="grid grid-cols-2 gap-2">
              {installedApps.map(app => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-all text-left"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl">{app.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-zinc-200 truncate">{app.name}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${app.enabled ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                    <span className="text-[9px] text-zinc-500">{app.enabled ? 'Active' : 'Paused'}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* All / Filtered Apps */}
        <div>
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-1">
            {categoryFilter === 'all' ? 'Discover' : categoryFilter}
          </h3>
          <div className="space-y-2">
            {filteredApps.map(app => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-all text-left"
              >
                <span className="text-2xl flex-shrink-0">{app.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-zinc-200 truncate">{app.name}</h4>
                    <span className={`px-1.5 py-0.5 text-[8px] rounded border ${riskColors[app.risk]}`}>
                      {app.risk}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 truncate mt-0.5">{app.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-zinc-600">{app.category}</span>
                    <span className="text-zinc-800">·</span>
                    <span className="text-[9px] text-zinc-600">{app.capabilities.length} capabilities</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {app.installed ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Installed
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      Install
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
