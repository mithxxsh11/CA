import React, { useState } from 'react'

interface AccordionItem {
  id: string
  title: string
  marqueeText: string
  reverse?: boolean
  description: string
  highlights: string[]
  format: string
  color: string
}

interface WhatWeDoAccordionProps {
  onOpenRegister: (title: string) => void
}

export const WhatWeDoAccordion: React.FC<WhatWeDoAccordionProps> = ({ onOpenRegister }) => {
  const [openId, setOpenId] = useState<string | null>('a1')

  const items: AccordionItem[] = [
    {
      id: 'a1',
      title: 'COMMUNICATION WORKSHOPS',
      marqueeText:
        'COMMUNICATION WORKSHOPS • SPOKEN ENGLISH • VOICE MODULATION • LIVE DRILLS • CONVERSATIONAL FLUENCY • ',
      description:
        'Interactive, small-group sessions structured around spontaneous speaking exercises, conversational drills, active listening exercises, and immediate constructive feedback. Designed to eliminate hesitation and install natural fluency.',
      highlights: [
        'Real-world conversational scenarios and situational dialogues',
        'Accent clarity, diction refinement and cadence control',
        'Eliminating hesitation and translation delays in thinking',
      ],
      format: 'Weekly Interactive Cohorts & Weekend Intensives',
      color: 'bg-[#2458f5]',
    },
    {
      id: 'a2',
      title: 'CONFIDENCE & PERSONAL DEVELOPMENT',
      marqueeText:
        'CONFIDENCE & PERSONAL DEVELOPMENT • BODY LANGUAGE • STAGE FRIGHT REMOVAL • POISE • AUTHENTIC SELF-EXPRESSION • ',
      reverse: true,
      description:
        'Transformational psychological and non-verbal coaching. We address the root causes of stage fright and social self-consciousness, guiding learners to build an authentic, commanding presence and resilient personal poise.',
      highlights: [
        'Overcoming public speaking anxiety and camera hesitation',
        'Commanding posture, purposeful gestures and steady eye contact',
        'Assertive communication and authentic self-advocacy',
      ],
      format: 'Mentorship Labs & Intensive Masterclasses',
      color: 'bg-[#0f8b54]',
    },
    {
      id: 'a3',
      title: 'CORPORATE & EXECUTIVE LABS',
      marqueeText:
        'CORPORATE & EXECUTIVE LABS • BOARDROOM PRESENTATIONS • NEGOTIATION DRILLS • LEADERSHIP PRESENCE • ',
      description:
        'High-impact executive training engineered for corporate professionals, tech leaders, and corporate teams in Bengaluru. From boardroom pitch delivery to high-stakes stakeholder management and executive interviews.',
      highlights: [
        'Executive presentation and storytelling for leadership teams',
        'Managing difficult conversations and negotiation dynamics',
        'Interview mastery for leadership and senior management roles',
      ],
      format: 'Corporate On-Site Training & Executive One-on-One',
      color: 'bg-[#101d35]',
    },
  ]

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="what-we-do" className="py-24 bg-[#141414] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 sm:mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#d8c29b] block mb-3">
          W H A T  W E  D O
        </span>
        <h2 className="font-flow text-4xl sm:text-7xl md:text-8xl leading-none text-white">
          THE METHODOLOGY OF TRANSFORMATION
        </h2>
        <p className="font-sans text-xs sm:text-base text-white/70 mt-3 max-w-xl">
          Click any domain below to examine our experiential curriculum and training structure.
        </p>
      </div>

      {/* Accordion List with Horizontal Marquees matching Flow Party */}
      <div className="border-t border-b border-white/15 divide-y divide-white/15">
        {items.map((item) => {
          const isOpen = openId === item.id
          return (
            <div key={item.id} className="transition-colors group">
              {/* Accordion Header with Infinite Scrolling Marquee */}
              <button
                onClick={() => toggle(item.id)}
                className="w-full text-left py-4 sm:py-8 flex flex-col justify-center cursor-pointer relative overflow-hidden focus:outline-none"
                aria-expanded={isOpen}
              >
                {/* Marquee Ticker Row */}
                <div className="w-full overflow-hidden whitespace-nowrap flex items-center py-2">
                  <div
                    className={
                      item.reverse
                        ? 'animate-marquee-right'
                        : 'animate-marquee-left'
                    }
                  >
                    {[1, 2, 3].map((rep) => (
                      <span
                        key={rep}
                        className={`font-flow text-3xl sm:text-6xl md:text-8xl tracking-tight transition-colors pr-6 ${
                          isOpen
                            ? 'text-[#d8c29b]'
                            : 'text-white/80 group-hover:text-white'
                        }`}
                      >
                        {item.marqueeText}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtitle Bar with Expand Indicator */}
                <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/50 pt-2">
                  <span>{item.title}</span>
                  <div className="flex items-center gap-2 text-white">
                    <span>{isOpen ? 'COLLAPSE' : 'DISCOVER MORE'}</span>
                    <span
                      className={`text-base sm:text-lg transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ↓
                    </span>
                  </div>
                </div>
              </button>

              {/* Accordion Body */}
              {isOpen && (
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 animate-fade-in">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start bg-white/5 rounded-3xl p-5 sm:p-10 border border-white/10">
                    <div className="lg:col-span-7">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#d8c29b] block mb-2">
                        CURRICULUM OVERVIEW
                      </span>
                      <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="space-y-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-white/50 block">
                          CORE TRAINING HIGHLIGHTS:
                        </span>
                        {item.highlights.map((h) => (
                          <div
                            key={h}
                            className="flex items-start gap-3 font-sans text-sm text-white/85"
                          >
                            <span className="text-[#bfff0a] font-bold">✓</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-between bg-black/40 rounded-2xl p-6 border border-white/10 h-full">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-white/50 block mb-1">
                          COHORT STRUCTURE
                        </span>
                        <p className="font-sans text-sm text-white/80 mb-6">
                          {item.format}
                        </p>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                          <span className="font-mono text-[11px] text-[#bfff0a] block mb-1">
                            LOCATION & ACCESS
                          </span>
                          <span className="font-sans text-xs text-white/70 block">
                            In-person sessions conducted at HSR Layout, Bengaluru. High-definition live interactive online batches available.
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenRegister(item.title)}
                        className="w-full py-4 bg-[#d8c29b] text-[#101d35] font-flow text-2xl tracking-wider rounded-xl hover:bg-white transition-all cursor-pointer shadow-lg"
                      >
                        ENQUIRE ABOUT THIS TRACK ↗
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
