import { useState, useEffect } from 'react'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const sections = [
  { id: 'hero', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'memory', label: 'Memory Fabric' },
  { id: 'mimo', label: 'MÍMO' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'mindmap', label: 'Mind Map' },
  { id: 'personality', label: 'Personality' },
  { id: 'marketplace', label: 'App Store' },
  { id: 'synthesis', label: 'Synthesis' },
]

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
      setMobileOpen(false)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-950/95 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold">
              P
            </div>
            <span className="font-semibold text-sm text-gray-200">PAL × Omi</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeSection === s.id
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            className="lg:hidden p-2 text-gray-400"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-3 py-2 rounded-md text-xs font-medium text-left ${
                  activeSection === s.id
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
