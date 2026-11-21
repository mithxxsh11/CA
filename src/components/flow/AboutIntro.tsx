import React from 'react'
import { RotatingBadge } from './RotatingBadge'

interface AboutIntroProps {
  onOpenRegister: () => void
}

export const AboutIntro: React.FC<AboutIntroProps> = ({ onOpenRegister }) => {
  return (
    <section
      id="about"
      className="relative py-28 bg-[#101d35] text-[#efece6] overflow-hidden"
    >
      {/* Decorative Parallax Background Typography */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center opacity-5">
        <span className="font-flow text-[25vw] tracking-tighter leading-none outline-text-white block whitespace-nowrap">
          CONFIDENCE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d8c29b] block mb-3">
              WHAT IS CHANDNI'S ACADEMY?
            </span>
            <h2 className="font-flow text-5xl sm:text-7xl lg:text-8xl leading-[0.9] text-white max-w-4xl">
              MORE THAN WORDS. A VEHICLE FOR HUMAN EMPOWERMENT.
            </h2>
          </div>

          <div className="hidden lg:block">
            <RotatingBadge
              text="WHERE EXCELLENCE MEETS EXPRESSION • CHANDNI'S ACADEMY • "
              centerText="CLARITY"
              size="md"
              theme="gold"
            />
          </div>
        </div>

        {/* Philosophy Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-center">
          <div className="lg:col-span-7">
            <p className="font-sans text-xl sm:text-2xl text-[#efece6]/90 font-light leading-relaxed">
              We reject the belief that communication is simply about grammatical correctness. Real communication is the power to articulate complex ideas with simplicity, express conviction without hesitation, and build authentic connections that lead to opportunity.
            </p>
          </div>
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <span className="font-mono text-xs uppercase tracking-widest text-[#bfff0a] block mb-2">
              OUR BELIEF
            </span>
            <blockquote className="font-editorial text-2xl text-[#d8c29b] leading-snug">
              “When your voice reflects your true intellect and confidence, the trajectory of your personal and professional life changes completely.”
            </blockquote>
            <span className="font-mono text-xs uppercase tracking-wider text-white/60 block mt-4">
              — Chandni Galagali, Founder
            </span>
          </div>
        </div>

        {/* 3 Pillars Breakdown (Flow Party Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 01 */}
          <div className="bg-[#172b49]/70 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-[#d8c29b]/50 transition-all">
            <span className="font-mono text-sm tracking-widest text-[#d8c29b] block mb-4">
              01 / CLARITY
            </span>
            <h3 className="font-flow text-4xl sm:text-5xl text-white mb-3 leading-none">
              SPEAK WITH CLARITY
            </h3>
            <p className="font-sans text-sm text-[#efece6]/80 leading-relaxed mb-6">
              Structure your thinking before you speak. Eliminate filler words, speak with rhythm and precision, and convey complex messages that everyone grasps immediately.
            </p>
            <div className="font-mono text-xs text-[#bfff0a] flex items-center gap-2">
              <span>●</span> Precision of Expression
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="bg-[#172b49]/70 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-[#ff7bca]/50 transition-all">
            <span className="font-mono text-sm tracking-widest text-[#ff7bca] block mb-4">
              02 / CONFIDENCE
            </span>
            <h3 className="font-flow text-4xl sm:text-5xl text-white mb-3 leading-none">
              EXPRESS WITHOUT LIMITS
            </h3>
            <p className="font-sans text-sm text-[#efece6]/80 leading-relaxed mb-6">
              Dismantle stage fright, impostor syndrome, and conversational self-doubt. Cultivate commanding body posture, steady eye contact, and an authentic resonant voice.
            </p>
            <div className="font-mono text-xs text-[#ff7bca] flex items-center gap-2">
              <span>●</span> Unshakeable Self-Belief
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="bg-[#172b49]/70 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-[#2458f5]/50 transition-all">
            <span className="font-mono text-sm tracking-widest text-[#2458f5] block mb-4">
              03 / LEAD
            </span>
            <h3 className="font-flow text-4xl sm:text-5xl text-white mb-3 leading-none">
              LEAD WITH PURPOSE
            </h3>
            <p className="font-sans text-sm text-[#efece6]/80 leading-relaxed mb-6">
              Influence, persuade, and inspire in boardroom meetings, keynote presentations, team huddles, and career-defining executive interviews.
            </p>
            <div className="font-mono text-xs text-[#d8c29b] flex items-center gap-2">
              <span>●</span> Executive Gravitas
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenRegister}
            className="px-8 py-4 bg-[#d8c29b] text-[#101d35] font-flow text-2xl tracking-wider rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-xl cursor-pointer"
          >
            START YOUR JOURNEY TODAY ↗
          </button>
        </div>
      </div>
    </section>
  )
}
