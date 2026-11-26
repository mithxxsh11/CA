import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Check, Quote, ArrowRight } from 'lucide-react'
import { FloatingBubble3D } from './FloatingBubble3D'
import { PeacefulReveal, StaggerGrid, StaggerCard } from './MotionPrimitives'

interface AboutSectionProps {
  onOpenEnquire: (courseTitle?: string) => void
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenEnquire }) => {
  const values = [
    'Clarity of Thought & Articulation',
    'Safe, Non-Judgmental Practice Space',
    'Direct Mentorship with Founder',
    'Personalized Feedback in Every Session',
  ]

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-[#FFFCFA] border-t border-[#F0E6EB]/60 overflow-hidden">
      {/* Background Ambient 3D Spheres */}
      <div className="absolute top-16 left-6 hidden lg:block pointer-events-none">
        <FloatingBubble3D size={68} variant="amber" driftY={15} driftX={5} duration={8} />
      </div>
      <div className="absolute bottom-14 right-10 hidden lg:block pointer-events-none">
        <FloatingBubble3D size={36} variant="pearl" driftY={11} driftX={-4} duration={7} delay={0.7} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Pill & Title */}
        <PeacefulReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE8CF] border border-[#F2A12A]/40 text-xs font-bold text-[#c27511] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F2A12A]" />
            <span>ABOUT CHANDNI’S ACADEMY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight mb-4">
            More Than Learning.{' '}
            <span className="gradient-text">A Place to Grow.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#737373] leading-relaxed">
            Founded with a commitment to bridge the gap between human potential and genuine real-world expression in Bengaluru.
          </p>
        </PeacefulReveal>

        {/* Two-Column Balanced Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Academy Narrative */}
          <PeacefulReveal delay={0.08} className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#171717] mb-3">
                Our Educational Philosophy
              </h3>
              <p className="text-[#737373] leading-relaxed text-sm sm:text-base mb-4">
                At Chandni’s Academy, we believe that communication is far more than vocabulary and grammar rules. It is about learning to organize thoughts under pressure, developing genuine self-belief, and articulating ideas with warmth, poise, and purpose.
              </p>
              <p className="text-[#737373] leading-relaxed text-sm sm:text-base">
                Whether you are a student preparing for campus placements, a working professional striving for boardroom visibility, or someone overcoming lifelong stage fright, our experiential curriculum turns speaking hesitation into instinctive confidence.
              </p>
            </div>

            {/* Teaching Approach Checklist */}
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2" staggerDelay={0.07}>
              {values.map((v, idx) => (
                <StaggerCard key={v}>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#F0E6EB] hover:border-[#F2A12A]/40 shadow-xs card-hover-effect">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      idx % 2 === 1 ? 'bg-[#FDE8CF] text-[#c27511]' : 'bg-[#F9D9F2] text-[#A52ABF]'
                    }`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[#171717]">{v}</span>
                  </div>
                </StaggerCard>
              ))}
            </StaggerGrid>

            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.025, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenEnquire('Mentorship Consultation')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#F2A12A] to-[#E08B12] hover:from-[#e5951c] hover:to-[#cf7c0a] shadow-md shadow-[#F2A12A]/25 hover:shadow-lg hover:shadow-[#F2A12A]/35 transition-all cursor-pointer group"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </PeacefulReveal>

          {/* Right Column: Founder & Academy Showcase Card */}
          <PeacefulReveal delay={0.18} className="lg:col-span-5 relative">
            {/* Ambient 3D Contrast Spheres Behind Card */}
            <div className="absolute -top-8 -right-6 hidden sm:block z-0 pointer-events-none">
              <FloatingBubble3D size={92} variant="amber" driftY={14} driftX={5} duration={7.2} />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block z-0 pointer-events-none">
              <FloatingBubble3D size={56} variant="amber" driftY={12} driftX={-5} duration={8.6} delay={0.5} />
            </div>

            <div className="bg-gradient-to-br from-white via-[#FFF8F1] to-[#F9D9F2]/30 rounded-3xl p-6 sm:p-8 border border-[#F9D9F2] shadow-sm relative z-10 overflow-hidden card-hover-effect">
              {/* Decorative Subtle Accent Circle */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#F9D9F2]/40 rounded-full blur-2xl pointer-events-none" />

              {/* Founder Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden p-1 bg-white border-2 border-[#F9D9F2] shadow-sm shrink-0">
                  <img
                    src="/logos/chandnis-academy-badge.png"
                    alt="Chandni Galagali - Founder"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#171717]">CHANDNI GALAGALI</h4>
                  <p className="text-xs font-semibold text-[#A52ABF] uppercase tracking-wider">
                    Founder &amp; Lead Mentor
                  </p>
                  <p className="text-xs text-[#737373]">Chandni’s Academy • HSR Layout</p>
                </div>
              </div>

              {/* Quote Block */}
              <div className="relative p-5 rounded-2xl bg-white/90 border border-[#F0E6EB] shadow-xs mb-6">
                <Quote className="w-6 h-6 text-[#F2A12A] mb-2" />
                <p className="text-xs sm:text-sm text-[#171717] italic leading-relaxed">
                  “Communication is not merely about speaking English. It is about expressing ideas, developing self-belief, building meaningful relationships, and becoming an impactful individual.”
                </p>
              </div>

              {/* Location & Format Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#737373]">
                <span className="px-3 py-1 rounded-full bg-white border border-[#F0E6EB]">
                  📍 HSR Layout, Bengaluru
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-[#F0E6EB]">
                  👥 Small Cohorts
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FDE8CF] text-[#c27511] font-semibold border border-[#F2A12A]/40 shadow-2xs">
                  🎙️ Live Practical Drills
                </span>
              </div>
            </div>
          </PeacefulReveal>
        </div>
      </div>
    </section>
  )
}
