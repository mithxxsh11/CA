import React from 'react'

interface LearningPathwaysProps {
  onOpenRegister: (pathway?: string) => void
}

export const LearningPathways: React.FC<LearningPathwaysProps> = ({ onOpenRegister }) => {
  const audiences = [
    {
      title: 'STUDENTS & YOUNG ADULTS',
      tag: 'FOUNDATION',
      focus: 'Campus interviews, overcoming hesitation, social fluency, classroom presentations.',
      benefit: 'Express your natural ideas with self-belief.',
    },
    {
      title: 'WORKING PROFESSIONALS',
      tag: 'EXECUTIVE',
      focus: 'Meeting leadership, client negotiations, cross-cultural team fluency, upward reporting.',
      benefit: 'Be heard and recognized for your contributions.',
    },
    {
      title: 'JOB SEEKERS & ASPIRANTS',
      tag: 'CAREER',
      focus: 'Acing technical & HR interviews, personal branding pitch, group discussions.',
      benefit: 'Convert career opportunities with poised conviction.',
    },
    {
      title: 'CORPORATE TEAMS & FIRMS',
      tag: 'ENTERPRISE',
      focus: 'Custom workshops, business writing, leadership alignment, presentation culture.',
      benefit: 'Elevate team collaboration and executive delivery.',
    },
  ]

  return (
    <section id="learning" className="py-24 bg-[#efece6] border-t border-[#141414]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 px-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#141414]/60 block mb-3">
            LEARNING PATHWAYS
          </span>
          <h2 className="font-flow text-4xl sm:text-7xl md:text-8xl leading-none text-[#141414]">
            GROW AT YOUR OWN PACE
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#141414]/70 mt-3 sm:mt-4 max-w-2xl mx-auto">
            Whether preparing for a career leap or equipping an entire team, choose the pathway tailored to your goals.
          </p>
        </div>

        {/* 4 Audience Stream Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
          {audiences.map((aud, idx) => (
            <div
              key={aud.title}
              className="bg-white border border-[#141414]/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#101d35]/5 text-[#101d35]">
                    {aud.tag}
                  </span>
                  <span className="font-mono text-xs text-[#141414]/40">0{idx + 1}</span>
                </div>
                <h3 className="font-flow text-3xl sm:text-4xl text-[#141414] leading-tight mb-3">
                  {aud.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#141414]/70 leading-relaxed mb-4">
                  {aud.focus}
                </p>
              </div>

              <div className="pt-4 border-t border-[#141414]/10">
                <span className="font-mono text-[11px] text-[#0f8b54] font-medium block">
                  ★ {aud.benefit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dual Enquiry Cards matching Flow Party's Bottom Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card A: Individual Learning */}
          <div className="bg-[#101d35] text-white rounded-3xl p-6 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/20 p-2 flex items-center justify-center shrink-0 shadow-lg">
                  <img
                    src="/logos/chandnis-academy-badge.png"
                    alt="Individual Coaching"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#d8c29b] block mb-1">
                    PERSON-TO-PERSON
                  </span>
                  <h3 className="font-flow text-3xl sm:text-4xl lg:text-5xl text-white leading-none">
                    INDIVIDUAL LEARNING
                  </h3>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-base text-white/80 leading-relaxed mb-8">
                Personalized communication coaching, spoken English fluency, confidence building, and one-on-one presentation preparation in HSR Layout, Bengaluru or Online.
              </p>
            </div>

            <div className="relative z-10">
              <button
                onClick={() => onOpenRegister('Individual Learning Cohort')}
                className="w-full sm:w-auto px-8 py-4 bg-[#d8c29b] text-[#101d35] font-flow text-2xl tracking-wider rounded-2xl hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-3 shadow-lg"
              >
                <span>ENQUIRE FOR INDIVIDUALS</span>
                <span>↗</span>
              </button>
            </div>
          </div>

          {/* Card B: Corporate & Team Training */}
          <div className="bg-[#0f8b54] text-white rounded-3xl p-6 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black/20 border border-[#bfff0a]/40 p-2 flex items-center justify-center shrink-0 shadow-lg text-[#bfff0a]">
                  <span className="font-flow text-2xl font-bold tracking-wider">CORP</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#bfff0a] block mb-1">
                    ORGANISATIONS & FIRMS
                  </span>
                  <h3 className="font-flow text-3xl sm:text-4xl lg:text-5xl text-white leading-none">
                    CORPORATE TRAINING
                  </h3>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-base text-white/90 leading-relaxed mb-8">
                Customized corporate workshops, team communication labs, managerial presentation drills, and cross-cultural communication training for enterprises and fast-growing startups.
              </p>
            </div>

            <div className="relative z-10">
              <button
                onClick={() => onOpenRegister('Corporate & Team Training')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#0f8b54] font-flow text-2xl tracking-wider rounded-2xl hover:bg-[#bfff0a] hover:text-black transition-all cursor-pointer flex items-center justify-center gap-3 shadow-lg"
              >
                <span>ENQUIRE FOR TEAMS</span>
                <span>↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
