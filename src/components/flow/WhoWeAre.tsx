import React, { useState } from 'react'
import { Flowvatar } from './Flowvatar'

interface WhoWeAreProps {
  onOpenRegister: (topic?: string) => void
}

interface FocusArea {
  id: string
  title: string
  summary: string
  pill: string
}

export const WhoWeAre: React.FC<WhoWeAreProps> = ({ onOpenRegister }) => {
  const [activeArea, setActiveArea] = useState<FocusArea | null>(null)

  const focusAreas: FocusArea[] = [
    {
      id: 'f1',
      title: 'Spoken English & Fluency Mastery',
      summary:
        'Develop flawless articulation, eliminate vernacular hesitations, and build an expansive active vocabulary for natural, effortless conversations.',
      pill: 'FLUENCY & ACCENT',
    },
    {
      id: 'f2',
      title: 'Executive Presence & Body Language',
      summary:
        'Master non-verbal communication, postural alignment, confident gesture systems, and eye contact that signals authority and calm command.',
      pill: 'PRESENCE & POISE',
    },
    {
      id: 'f3',
      title: 'Public Speaking & Stage Delivery',
      summary:
        'Conquer stage fright, harness adrenaline, command attention in crowded auditoriums, and craft speeches that move audiences to action.',
      pill: 'KEYNOTES & AUDIENCES',
    },
    {
      id: 'f4',
      title: 'Job Interview & Career Pitching',
      summary:
        'Structure behavioral answers with the STAR method, deliver unforgettable elevator pitches, and negotiate career advancement with quiet confidence.',
      pill: 'CAREER ADVANCEMENT',
    },
    {
      id: 'f5',
      title: 'Business Communication & Etiquette',
      summary:
        'High-impact email writing, cross-cultural workplace fluency, meeting facilitation, and diplomatic assertiveness for modern professionals.',
      pill: 'WORKPLACE IMPACT',
    },
  ]

  return (
    <section id="who-we-are" className="py-24 bg-[#efece6] border-t border-[#141414]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Giant Stacked Editorial Tagline matching Flow Party */}
        <div className="mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#141414]/60 block mb-4">
            WHO WE ARE
          </span>
          <h2 className="font-flow text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#141414] leading-[0.88] tracking-tight">
            A PLACE TO FIND YOUR VOICE.
            <br />
            <span className="text-[#2458f5]">A SPACE TO BUILD CONFIDENCE.</span>
            <br />
            <span className="text-[#0f8b54]">A JOURNEY TO EXPRESS YOUR TRUE POTENTIAL.</span>
          </h2>
        </div>

        {/* Founder Showcase Card & Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          {/* Founder Profile Card */}
          <div className="lg:col-span-5 bg-[#101d35] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#d8c29b]">
                  LEAD MENTOR & FOUNDER
                </span>
                <span className="w-3 h-3 rounded-full bg-[#bfff0a] animate-pulse" />
              </div>

              {/* Founder Avatar */}
              <div className="flex items-center gap-6 mb-8">
                <Flowvatar size="md" theme="navy" />
                <div>
                  <h3 className="font-flow text-4xl sm:text-5xl leading-none text-white">
                    CHANDNI GALAGALI
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d8c29b] block mt-1">
                    Founder — Chandni's Academy
                  </span>
                  <span className="font-mono text-[11px] text-white/50 block mt-0.5">
                    HSR Layout, Bengaluru
                  </span>
                </div>
              </div>

              <blockquote className="font-editorial text-2xl text-[#d8c29b] leading-relaxed mb-6">
                “Communication is not merely about speaking English. It is about expressing ideas, developing self-belief, building meaningful relationships, and becoming an impactful individual.”
              </blockquote>

              <p className="font-sans text-sm text-white/80 leading-relaxed">
                Chandni Galagali established Chandni's Academy in HSR Layout with a focused mission: to bridge the gap between human potential and real-world expression through dedicated, personalized mentoring.
              </p>
            </div>

            <div className="pt-8 border-t border-white/10 mt-8 flex flex-wrap gap-4 items-center justify-between">
              <div className="font-mono text-xs text-white/60">
                <span>Direct Mentorship</span> • <span>Bengaluru</span>
              </div>
              <button
                onClick={() => onOpenRegister('Mentorship with Chandni Galagali')}
                className="px-5 py-2.5 bg-[#d8c29b] text-[#101d35] font-flow text-xl tracking-wider rounded-xl hover:bg-white transition-all cursor-pointer"
              >
                BOOK CONSULTATION ↗
              </button>
            </div>
          </div>

          {/* Interactive Focus Areas List with Hover Revealer */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-[#141414]/10 rounded-3xl p-8 sm:p-10 shadow-sm">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#141414]/60 block mb-6">
                EXPLORE CORE COMPETENCIES (HOVER TO PREVIEW)
              </span>

              <div className="divide-y divide-[#141414]/10">
                {focusAreas.map((area, idx) => (
                  <div
                    key={area.id}
                    onMouseEnter={() => setActiveArea(area)}
                    className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-2 cursor-pointer group hover:px-2 transition-all"
                    onClick={() => onOpenRegister(area.title)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-[#141414]/40 group-hover:text-[#2458f5] transition-colors">
                        0{idx + 1}
                      </span>
                      <h4 className="font-flow text-3xl sm:text-4xl text-[#141414] group-hover:text-[#2458f5] transition-colors">
                        {area.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#141414]/5 text-[#141414]/70">
                        {area.pill}
                      </span>
                      <span className="text-sm font-sans group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                        ↗
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Hover Preview Box */}
            <div className="mt-8 p-6 rounded-2xl bg-[#efece6] border border-[#141414]/10 min-h-[100px] flex items-center">
              {activeArea ? (
                <div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#2458f5] block mb-1">
                    PREVIEW: {activeArea.title}
                  </span>
                  <p className="font-sans text-sm text-[#141414]/80 leading-relaxed">
                    {activeArea.summary}
                  </p>
                </div>
              ) : (
                <p className="font-mono text-xs text-[#141414]/50 uppercase tracking-widest">
                  Hover or tap any competency above to preview the training scope.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
