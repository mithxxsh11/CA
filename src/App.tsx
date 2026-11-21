import { useState } from 'react'
import { IntroLoader } from './components/flow/IntroLoader'
import { Navbar } from './components/flow/Navbar'
import { SocialRail } from './components/flow/SocialRail'
import { HeroSection } from './components/flow/HeroSection'
import { ProgrammeSlider } from './components/flow/ProgrammeSlider'
import { AboutIntro } from './components/flow/AboutIntro'
import { WhoWeAre } from './components/flow/WhoWeAre'
import { LearningPathways } from './components/flow/LearningPathways'
import { WhatWeDoAccordion } from './components/flow/WhatWeDoAccordion'
import { BeyondWords } from './components/flow/BeyondWords'
import { Footer } from './components/flow/Footer'
import { InterestModal } from './components/flow/InterestModal'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProgramme, setSelectedProgramme] = useState('')

  const handleOpenRegister = (programme?: string) => {
    setSelectedProgramme(programme || 'Spoken English & Communication Mastery')
    setModalOpen(true)
  }

  const handleCloseRegister = () => {
    setModalOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-[#efece6] text-[#141414] overflow-x-hidden selection:bg-[#d8c29b] selection:text-[#101d35]">
      {/* Signature Multi-stage Intro Loader */}
      {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}

      {/* Fixed Vertical Social Rail for Desktop */}
      <SocialRail />

      {/* Top Glassmorphic Navigation */}
      <Navbar onOpenRegister={handleOpenRegister} />

      {/* Main Single-Page Content */}
      <main id="main">
        {/* Hero Section with Interactive Flowvatar & Rotating Badge */}
        <HeroSection onOpenRegister={handleOpenRegister} />

        {/* Horizontal Draggable Programme Slider */}
        <ProgrammeSlider onOpenRegister={handleOpenRegister} />

        {/* What is Chandni's Academy / About Intro */}
        <AboutIntro onOpenRegister={() => handleOpenRegister('General Academy Enquiry')} />

        {/* Who We Are & Founder Showcase */}
        <WhoWeAre onOpenRegister={handleOpenRegister} />

        {/* Learning Pathways: Individual & Corporate */}
        <LearningPathways onOpenRegister={handleOpenRegister} />

        {/* What We Do Accordion with Infinite Marquees */}
        <WhatWeDoAccordion onOpenRegister={handleOpenRegister} />

        {/* Beyond Words Community Initiative */}
        <BeyondWords />
      </main>

      {/* Grand Footer */}
      <Footer onOpenRegister={() => handleOpenRegister('Footer General Enquiry')} />

      {/* Full-Screen Interest / Registration Modal */}
      <InterestModal
        isOpen={modalOpen}
        onClose={handleCloseRegister}
        initialProgramme={selectedProgramme}
      />
    </div>
  )
}
