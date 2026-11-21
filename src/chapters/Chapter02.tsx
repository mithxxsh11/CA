import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, CheckCircle2, Sparkles, Volume2, Shield, Compass } from 'lucide-react'
import { PILLARS, type PillarId, type PillarData } from '../data/content'
import { useRobot } from '../lib/robot'

export function Chapter02() {
  const { setPillar } = useRobot()
  const [activeId, setActiveId] = useState<PillarId>('communicate')

  const handleSelectPillar = (id: PillarId) => {
    setActiveId(id)
    setPillar(id)
  }

  const activePillar: PillarData = PILLARS.find((p) => p.id === activeId) || PILLARS[0]

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('ch3')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="ch2"
      aria-label="Chapter 02: Discover the Three Pillars"
      className="chapter-section min-h-[100svh] relative flex flex-col justify-between py-24 overflow-hidden"
    >
      <div className="container-x relative z-10 flex-1 flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#141414]/10 pb-4">
          <span className="mono-label">DISCOVER / 02</span>
          <span className="mono-label hidden sm:inline-block">THE THREE CORE PILLARS</span>
          <span className="mono-label text-[#f06b83]">INTERACTIVE MATRIX</span>
        </div>

        {/* Section Headline */}
        <div className="mt-8 mb-10 max-w-2xl">
          <span className="mono-label text-[#D8C29B]">CORE FRAMEWORK</span>
          <h2 className="font-display text-[clamp(40px,5.8vw,80px)] leading-[0.98] mt-2 font-normal">
            THREE SKILLS.{' '}
            <span className="grad-text italic font-medium">ONE STRONGER YOU.</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#141414]/70 leading-relaxed font-sans max-w-xl">
            Your next opportunity could begin with the way you communicate, express and lead. Explore how each pillar transforms your personal and professional presence.
          </p>
        </div>

        {/* Horizontal Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch my-auto">
          {/* Left Column: 3 Pillar Selectors */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {PILLARS.map((p) => {
              const isSelected = p.id === activeId
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPillar(p.id)}
                  className={`text-left p-6 sm:p-7 border transition-all duration-400 cursor-pointer relative ${
                    isSelected
                      ? 'bg-white border-[#D8C29B] shadow-md translate-x-2'
                      : 'bg-[#EFECE6]/60 border-[#141414]/15 hover:border-[#141414]/40 hover:bg-white/50'
                  }`}
                >
                  {/* Left indicator bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="pillarActiveBar"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#D8C29B] to-[#f06b83]"
                    />
                  )}

                  <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] mb-2">
                    <span className={isSelected ? 'text-[#f06b83] font-bold' : 'text-[#141414]/50'}>
                      {p.number}
                    </span>
                    <span className="text-[10px] uppercase opacity-40">
                      {p.id === 'communicate' && <Volume2 size={13} className="inline ml-1" />}
                      {p.id === 'confidence' && <Shield size={13} className="inline ml-1" />}
                      {p.id === 'lead' && <Compass size={13} className="inline ml-1" />}
                    </span>
                  </div>

                  <h3
                    className={`font-display text-[28px] sm:text-[34px] uppercase tracking-tight leading-tight ${
                      isSelected ? 'text-[#141414] font-semibold' : 'text-[#141414]/70'
                    }`}
                  >
                    {p.word}
                  </h3>

                  <p className="font-display italic text-[15px] sm:text-[17px] text-[#B89A65] mt-1">
                    {p.headline}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Right Column: Dynamic Deep Dive Card */}
          <div className="lg:col-span-7 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-10 bg-white/80 border border-[#D8C29B]/60 backdrop-blur-md flex-1 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-[#f06b83] uppercase mb-4">
                    <Sparkles size={14} />
                    <span>EXPLORING {activePillar.word}</span>
                  </div>

                  <h4 className="font-display text-[32px] sm:text-[42px] leading-tight text-[#141414]">
                    {activePillar.headline}
                  </h4>

                  <p className="font-display italic text-[18px] text-[#B89A65] mt-2">
                    {activePillar.tagline}
                  </p>

                  <p className="mt-5 text-[16px] text-[#141414]/80 leading-relaxed font-sans max-w-xl">
                    {activePillar.description}
                  </p>

                  <div className="mt-8 pt-6 border-t border-[#141414]/10">
                    <span className="mono-label block mb-3 text-[#141414]/60">
                      ACTIVE LEARNING MODULES
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {activePillar.areas.map((area) => (
                        <span
                          key={area}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EFECE6] border border-[#141414]/15 font-mono text-[11.5px] tracking-wider text-[#141414]"
                        >
                          <CheckCircle2 size={12} className="text-[#f06b83]" />
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[#141414]/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-[#141414]/50 tracking-wider">
                    MODULE: {activePillar.number} OF 03
                  </span>
                  <a
                    href="#ch5"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('ch5')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="btn-nova-primary !min-h-[42px] !px-5"
                  >
                    ENQUIRE ABOUT {activePillar.word} →
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Curiosity Hook at Bottom */}
        <div className="mt-12 pt-6 border-t border-[#141414]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="mono-label text-[#f06b83]">THE NEXT STEP</span>
            <p className="font-display text-[22px] sm:text-[26px] text-[#141414] leading-snug">
              WHICH VERSION OF YOU{' '}
              <span className="grad-text font-semibold italic">ARE YOU READY TO UNLOCK?</span>
            </p>
          </div>

          <a
            href="#ch3"
            onClick={handleNext}
            className="btn-nova-outline whitespace-nowrap flex items-center gap-2"
          >
            <span>DISCOVER THE EXPERIENCE</span>
            <ArrowDown size={14} className="cue-arrow text-[#f06b83]" />
          </a>
        </div>
      </div>
    </section>
  )
}
