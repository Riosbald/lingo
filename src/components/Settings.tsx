import { useState } from 'react'
import { device, languages } from '../data'

export default function Settings() {
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [cloudSync, setCloudSync] = useState(true)
  const [localOnly, setLocalOnly] = useState(false)
  const [voiceProfileTrained, setVoiceProfileTrained] = useState(true)
  const [micGain, setMicGain] = useState(device.micGain)
  const [ledColor, setLedColor] = useState(device.ledColor)
  const [doubleTapAction, setDoubleTapAction] = useState(device.doubleTapAction)
  const [showLanguagePicker, setShowLanguagePicker] = useState(false)

  const storagePercent = (device.storage.used / device.storage.total) * 100

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Device Status Card */}
        <div className="px-4 pt-4 pb-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <span className="text-xl">🔘</span>
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-900 ${
                    device.connected ? 'bg-emerald-400' : 'bg-zinc-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">{device.name}</h3>
                  <p className="text-[10px] text-zinc-500">{device.model} · FW {device.firmware}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <BatteryIcon level={device.battery} charging={device.charging} />
                  <span className={`text-sm font-bold ${
                    device.battery > 50 ? 'text-emerald-400' :
                    device.battery > 20 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {device.battery}%
                  </span>
                </div>
                <p className="text-[9px] text-zinc-500">
                  {device.charging ? '⚡ Charging' : `~${Math.round(device.battery * 0.14)}h left`}
                </p>
              </div>
            </div>

            {/* Storage */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-zinc-500">Local Storage</span>
                <span className="text-[10px] text-zinc-400">{device.storage.used}GB / {device.storage.total}GB</span>
              </div>
              <div className="h-2 rounded-full bg-zinc-800">
                <div
                  className={`h-full rounded-full transition-all ${
                    storagePercent > 80 ? 'bg-red-500' : storagePercent > 60 ? 'bg-amber-500' : 'bg-indigo-500'
                  }`}
                  style={{ width: `${storagePercent}%` }}
                />
              </div>
            </div>

            {/* Mic Gain */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-zinc-500">Microphone Gain</span>
                <span className="text-[10px] text-zinc-400">{micGain}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={micGain}
                onChange={e => setMicGain(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-zinc-800 accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Hardware Controls */}
        <div className="px-4 pb-3">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-1">Hardware Controls</h3>
          <div className="space-y-2">
            {/* LED Color */}
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">💡</span>
                  <div>
                    <p className="text-xs text-zinc-200">LED Status Color</p>
                    <p className="text-[10px] text-zinc-500">Indicates recording state</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {['#6366f1', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'].map(color => (
                    <button
                      key={color}
                      onClick={() => setLedColor(color)}
                      className={`w-5 h-5 rounded-full border-2 transition-all ${
                        ledColor === color ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Double Tap Action */}
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">👆</span>
                  <div>
                    <p className="text-xs text-zinc-200">Double-Tap Action</p>
                    <p className="text-[10px] text-zinc-500">Physical button shortcut</p>
                  </div>
                </div>
                <select
                  value={doubleTapAction}
                  onChange={e => setDoubleTapAction(e.target.value)}
                  className="px-2 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-300 focus:outline-none focus:border-indigo-500/50"
                >
                  <option>Quick Memo</option>
                  <option>Pause Recording</option>
                  <option>Bookmark 60s</option>
                  <option>Send Alert</option>
                  <option>Stop & Process</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="px-4 pb-3">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-1">Account</h3>
          <div className="space-y-2">
            {/* Language */}
            <button
              onClick={() => setShowLanguagePicker(!showLanguagePicker)}
              className="w-full p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">🌐</span>
                  <div>
                    <p className="text-xs text-zinc-200">Language</p>
                    <p className="text-[10px] text-zinc-500">{languages.length}+ languages supported</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-indigo-400">{selectedLanguage}</span>
                  <svg className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${showLanguagePicker ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {showLanguagePicker && (
                <div className="mt-2 pt-2 border-t border-zinc-800/50 max-h-40 overflow-y-auto no-scrollbar">
                  <div className="grid grid-cols-2 gap-1">
                    {languages.map(lang => (
                      <button
                        key={lang}
                        onClick={() => { setSelectedLanguage(lang); setShowLanguagePicker(false) }}
                        className={`px-2 py-1.5 rounded text-[10px] text-left transition-colors ${
                          selectedLanguage === lang
                            ? 'bg-indigo-500/20 text-indigo-300'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </button>

            {/* Voice Profile */}
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">🎙️</span>
                  <div>
                    <p className="text-xs text-zinc-200">Voice Profile</p>
                    <p className="text-[10px] text-zinc-500">
                      {voiceProfileTrained ? 'Trained — Speaker diarization active' : 'Not trained — Tap to start'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setVoiceProfileTrained(!voiceProfileTrained)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                    voiceProfileTrained
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}
                >
                  {voiceProfileTrained ? '✓ Active' : 'Train'}
                </button>
              </div>
            </div>

            {/* Cloud Sync Toggle */}
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">☁️</span>
                  <div>
                    <p className="text-xs text-zinc-200">Cloud Sync</p>
                    <p className="text-[10px] text-zinc-500">Sync transcripts and memories to cloud</p>
                  </div>
                </div>
                <ToggleSwitch enabled={cloudSync} onToggle={() => setCloudSync(!cloudSync)} />
              </div>
            </div>

            {/* Local Only Mode */}
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">🔒</span>
                  <div>
                    <p className="text-xs text-zinc-200">Local-Only Mode</p>
                    <p className="text-[10px] text-zinc-500">All processing stays on device</p>
                  </div>
                </div>
                <ToggleSwitch enabled={localOnly} onToggle={() => setLocalOnly(!localOnly)} />
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="px-4 pb-3">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-1">Privacy & Security</h3>
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
              <div className="flex items-center gap-2.5">
                <span className="text-sm">🛡️</span>
                <div>
                  <p className="text-xs text-zinc-200">Encryption</p>
                  <p className="text-[10px] text-emerald-400">SOC 2 & HIPAA aligned · AES-256</p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
              <div className="flex items-center gap-2.5">
                <span className="text-sm">📦</span>
                <div>
                  <p className="text-xs text-zinc-200">Self-Hosting</p>
                  <p className="text-[10px] text-zinc-500">Open-source · Host on your own hardware</p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
              <div className="flex items-center gap-2.5">
                <span className="text-sm">🗑️</span>
                <div>
                  <p className="text-xs text-zinc-200">Data Management</p>
                  <p className="text-[10px] text-zinc-500">Export or delete all data at any time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="px-4 pb-6">
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/30 text-center">
            <p className="text-xs text-zinc-500">Omi AI v3.2.1</p>
            <p className="text-[10px] text-zinc-600 mt-1">Open Source · MIT License</p>
            <p className="text-[10px] text-zinc-600">github.com/BasedHardware/omi</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// Sub-components
// ============================================

function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={enabled}
      className={`relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 ${
        enabled ? 'bg-indigo-500' : 'bg-zinc-700'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-[20px]' : 'translate-x-[2px]'
        }`}
      />
    </button>
  )
}

function BatteryIcon({ level, charging }: { level: number; charging: boolean }) {
  return (
    <div className="relative w-6 h-3 rounded-sm border border-zinc-500 flex items-center p-px">
      <div
        className={`h-full rounded-sm transition-all ${
          level > 50 ? 'bg-emerald-400' : level > 20 ? 'bg-amber-400' : 'bg-red-400'
        }`}
        style={{ width: `${level}%` }}
      />
      <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-zinc-500 rounded-r" />
      {charging && (
        <span className="absolute -top-1 -right-2 text-[6px]">⚡</span>
      )}
    </div>
  )
}
