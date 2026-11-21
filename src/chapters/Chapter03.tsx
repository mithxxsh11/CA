import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Award } from 'lucide-react'
import { TRANSFORM_STAGES, PROGRAMME_EXPLORER } from '../data/content'
import { useRobot, type TransformStage } from '../lib/robot'

export function Chapter03() {
  const { state, setStage } = useRobot()
  const [selectedProg, setSelectedProg] = useState(PROGRAMME_EXPLORER[0].id)

  const handleStageSelect = (s: TransformStage) => {
    setStage(s)
  }

  const currentProg = PROGRAMME_EXPLORER.find((p) => p.id === selectedProg) || PROGRAMME_EXPLORER[0]

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('ch4')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="ch3"
      aria-label="Chapter 03: The Transformation"
      className="chapter-section min-h-[100svh] relative flex flex-col justify-between py-24 overflow-hidden"
    >
      <div className="container-x relative z-10 flex-1 flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#141414]/10 pb-4">
          <span className="mono-label">TRANSFORM / 03</span>
          <span className="mono-label hidden sm:inline-block">THE TRANSFORMATION ARC</span>
          <span className="mono-label text-[#f06b83]">STAGE 0{state.transformStage} / 03</span>
        </div>

        {/* Section Headline */}
        <div className="mt-8 mb-10 max-w-3xl">
          <span className="mono-label text-[#D8C29B]">EMOTIONAL JOURNEY</span>
          <h2 className="font-display text-[clamp(36px,5.4vw,76px)] leading-[1] mt-2 font-normal">
            IT'S NOT JUST ABOUT WHAT YOU SAY.{' '}
            <span className="grad-text italic font-medium block mt-1">
              IT'S ABOUT HOW YOU MAKE PEOPLE FEEL.
            </span>
          </h2>
          <p className="mt-4 text-[16px] text-[#141414]/70 leading-relaxed font-sans max-w-xl">
            From finding the right words to expressing your ideas and making your presence felt, personal growth begins when communication becomes natural.
          </p>
        </div>

        {/* 3-Stage Character Evolution Stepper */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 3 Stages */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="mono-label text-[#141414]/60 mb-1">
              THE THREE TRANSFORMATION PHASES
            </span>

            {TRANSFORM_STAGES.map((item) => {
              const isActive = state.transformStage === item.stage
              return (
                <button
                  key={item.stage}
                  type="button"
                  onClick={() => handleStageSelect(item.stage)}
                  className={`text-left p-6 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#D8C29B] shadow-md'
                      : 'bg-[#EFECE6]/60 border-[#141414]/12 hover:border-[#141414]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10.5px] tracking-[0.2em] text-[#f06b83]">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-[#141414]/40">
                      {item.stage === 1 && '● ○ ○'}
                      {item.stage === 2 && '● ● ○'}
                      {item.stage === 3 && '● ● ●'}
                    </span>
                  </div>

                  <h3
                    className={`font-display text-[22px] sm:text-[26px] leading-snug ${
                      isActive ? 'text-[#141414] font-semibold' : 'text-[#141414]/70'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[14.5px] text-[#141414]/65 font-sans leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-3 font-display italic text-[14.5px] text-[#B89A65]">
                    “{item.quote}”
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Column: Interactive Programme Explorer */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="p-8 sm:p-10 bg-white/85 border border-[#141414]/15 backdrop-blur-md shadow-sm">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-[#D8C29B] uppercase mb-4">
                <Award size={14} />
                <span>WHAT WOULD YOU LIKE TO WORK ON?</span>
              </div>

              {/* Selector Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {PROGRAMME_EXPLORER.map((prog) => {
                  const isSel = prog.id === selectedProg
                  return (
                    <button
                      key={prog.id}
                      type="button"
                      onClick={() => setSelectedProg(prog.id)}
                      className={`px-3.5 py-2 font-mono text-[11.5px] tracking-wider uppercase border transition-all cursor-pointer ${
                        isSel
                          ? 'bg-[#141414] text-[#EFECE6] border-[#141414]'
                          : 'bg-[#EFECE6] text-[#141414] border-[#141414]/15 hover:border-[#141414]/40'
                      }`}
                    >
                      {prog.name}
                    </button>
                  )
                })}
              </div>

              {/* Active Programme Detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="mono-label text-[#f06b83]">
                      CATEGORY: {currentProg.category}
                    </span>
                    <span className="font-mono text-[11px] text-[#141414]/50">CONFIRMED OFFERING</span>
                  </div>

                  <h4 className="font-display text-[28px] sm:text-[34px] leading-tight text-[#141414]">
                    {currentProg.name}
                  </h4>

                  <p className="text-[15.5px] text-[#141414]/75 leading-relaxed font-sans">
                    {currentProg.desc}
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-[#141414]/10">
                    <span className="text-[12px] font-mono text-[#141414]/50">HSR LAYOUT · BENGALURU</span>
                    <a
                      href="#ch5"
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById('ch5')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="inline-flex items-center gap-1.5 font-mono text-[11.5px] tracking-wider uppercase text-[#141414] font-semibold hover:text-[#f06b83] transition-colors"
                    >
                      ENQUIRE ABOUT THIS <ArrowUpRight size={13} />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Curiosity Hook */}
        <div className="mt-12 pt-6 border-t border-[#141414]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="mono-label text-[#f06b83]">CONTINUOUS MOMENTUM</span>
            <p className="font-display text-[22px] sm:text-[26px] text-[#141414] leading-snug">
              YOUR GROWTH DOESN'T{' '}
              <span className="grad-text font-semibold italic">HAVE TO STOP HERE.</span>
            </p>
          </div>

          <a
            href="#ch4"
            onClick={handleNext}
            className="btn-nova-outline whitespace-nowrap flex items-center gap-2"
          >
            <span>EXPLORE BEYOND WORDS</span>
            <ArrowDown size={14} className="cue-arrow text-[#f06b83]" />
          </a>
        </div>
      </div>
    </section>
  )
}
