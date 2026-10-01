import { useState } from 'react'
import Hero from './components/Hero'
import ArchitectureOverview from './components/ArchitectureOverview'
import MemoryFabric from './components/MemoryFabric'
import MIMOLayer from './components/MIMOLayer'
import ModuleRoadmap from './components/ModuleRoadmap'
import SynthesisDiagram from './components/SynthesisDiagram'
import ComparisonTable from './components/ComparisonTable'
import MindMap from './components/MindMap'
import PersonalityEngine from './components/PersonalityEngine'
import AppMarketplace from './components/AppMarketplace'
import Navigation from './components/Navigation'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <ArchitectureOverview />
      <MemoryFabric />
      <MIMOLayer />
      <ComparisonTable />
      <ModuleRoadmap />
      <MindMap />
      <PersonalityEngine />
      <AppMarketplace />
      <SynthesisDiagram />
      <footer className="py-12 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>PAL × Omi Architecture Synthesis — Universal Contextual Operating System</p>
        <p className="mt-2 text-gray-600">Memory Core · MÍMO Assurance · Governance · Execution · Ecosystem</p>
      </footer>
    </div>
  )
}

export default App
