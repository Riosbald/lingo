import { useState } from 'react'
import { device, languages } from '../data'

export default function Settings() {
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [cloudSync, setCloudSync] = useState(true)
  const [localOnly, setLocalOnly] = useState(false)
  const [micGain, setMicGain] = useState(device.micGain)

  const storagePercent = (device.storage.used / device.storage.total) * 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '96px' }}>
        {/* Device Status Card */}
        <div style={{ padding: '16px' }}>
          <div style={{
            padding: '16px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #18181b, rgba(24, 24, 27, 0.5))',
            border: '1px solid rgba(39, 39, 42, 0.5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.2))',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    🔘
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: device.connected ? '#34d399' : '#52525b',
                    border: '2px solid #18181b'
                  }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fafafa', margin: '0 0 2px' }}>{device.name}</h3>
                  <p style={{ fontSize: '10px', color: '#71717a', margin: 0 }}>{device.model} · FW {device.firmware}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: device.battery > 50 ? '#34d399' : device.battery > 20 ? '#fbbf24' : '#f87171'
                  }}>
                    {device.battery}%
                  </span>
                </div>
                <p style={{ fontSize: '9px', color: '#71717a', margin: 0 }}>
                  {device.charging ? '⚡ Charging' : `~${Math.round(device.battery * 0.14)}h left`}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', color: '#71717a' }}>Local Storage</span>
                <span style={{ fontSize: '10px', color: '#a1a1aa' }}>{device.storage.used}GB / {device.storage.total}GB</span>
              </div>
              <div style={{ height: '8px', borderRadius: '9999px', background: '#27272a' }}>
                <div style={{
                  height: '100%',
                  borderRadius: '9999px',
                  background: storagePercent > 80 ? '#ef4444' : storagePercent > 60 ? '#f59e0b' : '#6366f1',
                  width: `${storagePercent}%`,
                  transition: 'width 0.3s'
                }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', color: '#71717a' }}>Microphone Gain</span>
                <span style={{ fontSize: '10px', color: '#a1a1aa' }}>{micGain}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={micGain}
                onChange={e => setMicGain(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '9999px',
                  appearance: 'none',
                  background: '#27272a',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
        </div>

        {/* Hardware Controls */}
        <div style={{ padding: '0 16px 12px' }}>
          <h3 style={{ fontSize: '10px', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Hardware Controls</h3>
          
          <div style={{
            padding: '12px',
            borderRadius: '12px',
            background: 'rgba(24, 24, 27, 0.5)',
            border: '1px solid rgba(39, 39, 42, 0.5)',
            marginBottom: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px' }}>💡</span>
                <div>
                  <p style={{ fontSize: '12px', color: '#e4e4e7', margin: '0 0 2px' }}>LED Status Color</p>
                  <p style={{ fontSize: '10px', color: '#71717a', margin: 0 }}>Indicates recording state</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#6366f1', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'].map(color => (
                  <button
                    key={color}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: color,
                      border: device.ledColor === color ? '2px solid white' : '2px solid transparent',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{
            padding: '12px',
            borderRadius: '12px',
            background: 'rgba(24, 24, 27, 0.5)',
            border: '1px solid rgba(39, 39, 42, 0.5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px' }}>👆</span>
                <div>
                  <p style={{ fontSize: '12px', color: '#e4e4e7', margin: '0 0 2px' }}>Double-Tap Action</p>
                  <p style={{ fontSize: '10px', color: '#71717a', margin: 0 }}>Physical button shortcut</p>
                </div>
              </div>
              <select
                value={device.doubleTapAction}
                style={{
                  padding: '4px 8px',
                  borderRadius: '8px',
                  background: '#27272a',
                  border: '1px solid #3f3f46',
                  color: '#d4d4d8',
                  fontSize: '10px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option>Quick Memo</option>
                <option>Pause Recording</option>
                <option>Bookmark 60s</option>
                <option>Send Alert</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div style={{ padding: '0 16px 12px' }}>
          <h3 style={{ fontSize: '10px', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Account</h3>
          
          <div style={{
            padding: '12px',
            borderRadius: '12px',
            background: 'rgba(24, 24, 27, 0.5)',
            border: '1px solid rgba(39, 39, 42, 0.5)',
            marginBottom: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px' }}>🌐</span>
                <div>
                  <p style={{ fontSize: '12px', color: '#e4e4e7', margin: '0 0 2px' }}>Language</p>
                  <p style={{ fontSize: '10px', color: '#71717a', margin: 0 }}>{languages.length}+ languages supported</p>
                </div>
              </div>
              <select
                value={selectedLanguage}
                onChange={e => setSelectedLanguage(e.target.value)}
                style={{
                  padding: '4px 8px',
                  borderRadius: '8px',
                  background: '#27272a',
                  border: '1px solid #3f3f46',
                  color: '#818cf8',
                  fontSize: '12px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{
            padding: '12px',
            borderRadius: '12px',
            background: 'rgba(24, 24, 27, 0.5)',
            border: '1px solid rgba(39, 39, 42, 0.5)',
            marginBottom: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px' }}>☁️</span>
                <div>
                  <p style={{ fontSize: '12px', color: '#e4e4e7', margin: '0 0 2px' }}>Cloud Sync</p>
                  <p style={{ fontSize: '10px', color: '#71717a', margin: 0 }}>Sync transcripts and memories</p>
                </div>
              </div>
              <button
                onClick={() => setCloudSync(!cloudSync)}
                style={{
                  width: '40px',
                  height: '22px',
                  borderRadius: '9999px',
                  background: cloudSync ? '#6366f1' : '#3f3f46',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  left: cloudSync ? '20px' : '2px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'left 0.2s'
                }} />
              </button>
            </div>
          </div>

          <div style={{
            padding: '12px',
            borderRadius: '12px',
            background: 'rgba(24, 24, 27, 0.5)',
            border: '1px solid rgba(39, 39, 42, 0.5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px' }}>🔒</span>
                <div>
                  <p style={{ fontSize: '12px', color: '#e4e4e7', margin: '0 0 2px' }}>Local-Only Mode</p>
                  <p style={{ fontSize: '10px', color: '#71717a', margin: 0 }}>All processing stays on device</p>
                </div>
              </div>
              <button
                onClick={() => setLocalOnly(!localOnly)}
                style={{
                  width: '40px',
                  height: '22px',
                  borderRadius: '9999px',
                  background: localOnly ? '#6366f1' : '#3f3f46',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  left: localOnly ? '20px' : '2px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'left 0.2s'
                }} />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div style={{ padding: '0 16px 12px' }}>
          <h3 style={{ fontSize: '10px', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Privacy & Security</h3>
          
          {[
            { icon: '🛡️', title: 'Encryption', desc: 'SOC 2 & HIPAA aligned · AES-256', color: '#34d399' },
            { icon: '📦', title: 'Self-Hosting', desc: 'Open-source · Host on your own hardware', color: '#a1a1aa' },
            { icon: '🗑️', title: 'Data Management', desc: 'Export or delete all data at any time', color: '#a1a1aa' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(24, 24, 27, 0.5)',
                border: '1px solid rgba(39, 39, 42, 0.5)',
                marginBottom: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px' }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: '12px', color: '#e4e4e7', margin: '0 0 2px' }}>{item.title}</p>
                  <p style={{ fontSize: '10px', color: item.color, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* About */}
        <div style={{ padding: '0 16px 24px' }}>
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(24, 24, 27, 0.3)',
            border: '1px solid rgba(39, 39, 42, 0.3)',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '12px', color: '#71717a', margin: '0 0 4px' }}>Omi AI v3.2.1</p>
            <p style={{ fontSize: '10px', color: '#52525b', margin: '0 0 2px' }}>Open Source · MIT License</p>
            <p style={{ fontSize: '10px', color: '#52525b', margin: 0 }}>github.com/BasedHardware/omi</p>
          </div>
        </div>
      </div>
    </div>
  )
}
