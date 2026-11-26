import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, MessageCircle, CheckCircle2, Star, Users } from 'lucide-react'
import { FloatingBubble3D } from './FloatingBubble3D'

interface HeroSectionProps {
  onOpenEnquire: (courseTitle?: string) => void
}

const SERENE_EASE = [0.22, 1, 0.36, 1] as const

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEnquire }) => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-hero-glow"
    >
      {/* Calm Breathing Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[360px] bg-gradient-to-tr from-[#F9D9F2]/55 to-[#FDE8CF]/45 blur-3xl -z-10 rounded-full pointer-events-none animate-soft-breath" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#F9D9F2]/30 blur-2xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#FFF8F1]/80 blur-2xl -z-10 rounded-full pointer-events-none" />

      {/* 3D Floating Glass & Amber Contrast Spheres */}
      <div className="absolute top-24 right-6 sm:right-20 hidden sm:block z-0 pointer-events-none">
        <FloatingBubble3D size={106} variant="amber" driftY={18} driftX={8} duration={7.5} showPulseCore />
      </div>
      <div className="absolute top-48 right-12 sm:right-48 hidden md:block z-0 pointer-events-none">
        <FloatingBubble3D size={44} variant="amber" driftY={11} driftX={5} duration={6.2} delay={0.6} opacity={0.9} />
      </div>
      <div className="absolute top-36 left-8 sm:left-24 hidden md:block z-0 pointer-events-none">
        <FloatingBubble3D size={52} variant="amber" driftY={13} driftX={-5} duration={7.8} delay={0.4} />
      </div>
      <div className="absolute bottom-28 left-6 sm:left-16 hidden sm:block z-0 pointer-events-none">
        <FloatingBubble3D size={72} variant="amber" driftY={15} driftX={-6} duration={8.4} delay={0.3} />
      </div>
      <div className="absolute bottom-44 left-14 sm:left-40 hidden lg:block z-0 pointer-events-none">
        <FloatingBubble3D size={32} variant="pearl" driftY={9} driftX={4} duration={5.8} delay={1.1} opacity={0.85} />
      </div>
      <div className="absolute top-1/2 right-6 hidden lg:block z-0 pointer-events-none">
        <FloatingBubble3D size={54} variant="amber" driftY={13} driftX={5} duration={6.8} delay={0.8} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: SERENE_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white via-[#FFF8F1] to-[#FDE8CF]/50 border border-[#F2A12A]/45 shadow-xs mb-6 text-xs sm:text-sm font-medium text-[#737373] backdrop-blur-xs"
        >
          <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#F2A12A] to-[#E08B12] text-white font-bold text-[10px] tracking-wider uppercase shadow-xs">
            NEW COHORT
          </span>
          <span className="text-[#A52ABF] font-semibold">Welcome to CHANDNI’S Academy</span>
          <span className="text-[#F2A12A]">|</span>
          <span className="hidden sm:inline font-medium text-[#c27511]">HSR Layout, Bengaluru</span>
        </motion.div>

        {/* Main Bold Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: SERENE_EASE }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#171717] leading-[1.12] mb-6"
        >
          Learn Today.{' '}
          <span className="gradient-text">Lead Tomorrow.</span>
        </motion.h1>

        {/* Supporting Headline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: SERENE_EASE }}
          className="text-lg sm:text-2xl font-medium text-[#171717]/85 max-w-3xl mx-auto mb-4 leading-snug"
        >
          Building Knowledge. Inspiring Confidence. Creating Brighter Futures.
        </motion.p>

        {/* Short Explanatory Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: SERENE_EASE }}
          className="text-sm sm:text-base text-[#737373] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Where Excellence Meets Expression. We mentor learners and professionals through personalized communication coaching, spoken English fluency, and leadership development designed for real-world impact.
        </motion.p>

        {/* CTA Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.4, ease: SERENE_EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="#courses"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#F2A12A] to-[#E08B12] hover:from-[#e5951c] hover:to-[#cf7c0a] shadow-lg shadow-[#F2A12A]/30 hover:shadow-xl hover:shadow-[#F2A12A]/40 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Explore Our Courses</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.025, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpenEnquire()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-semibold text-[#171717] bg-white border-2 border-[#F2A12A]/40 hover:border-[#F2A12A] hover:bg-[#FFF8F1] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <MessageCircle className="w-4 h-4 text-[#F2A12A] group-hover:scale-110 transition-transform" />
            <span>Contact Us</span>
          </motion.button>
        </motion.div>

        {/* Trust Badges / Social Proof Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: SERENE_EASE }}
          className="pt-8 border-t border-[#F0E6EB]/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-3 text-center rounded-2xl transition-all duration-300 hover:bg-[#FFF8F1] border border-transparent hover:border-[#FDE8CF]">
            <div className="flex items-center justify-center gap-1 text-[#A52ABF] font-bold text-xl sm:text-2xl">
              <Users className="w-5 h-5 text-[#F2A12A]" />
              <span>500+</span>
            </div>
            <p className="text-xs text-[#737373] mt-0.5">Students Mentored</p>
          </div>

          <div className="p-3 text-center rounded-2xl transition-all duration-300 hover:bg-[#FFF8F1] border border-transparent hover:border-[#FDE8CF]">
            <div className="flex items-center justify-center gap-1 text-[#171717] font-bold text-xl sm:text-2xl">
              <CheckCircle2 className="w-5 h-5 text-[#0f8b54]" />
              <span>100%</span>
            </div>
            <p className="text-xs text-[#737373] mt-0.5">Practical Speaking Drills</p>
          </div>

          <div className="p-3 text-center rounded-2xl bg-gradient-to-br from-[#FFF8F1] to-[#FDE8CF]/70 border-2 border-[#F2A12A]/50 shadow-sm shadow-[#F2A12A]/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center gap-1 text-[#F2A12A] font-bold text-xl sm:text-2xl">
              <Star className="w-5 h-5 fill-current" />
              <span>4.9 / 5</span>
            </div>
            <p className="text-xs font-semibold text-[#c27511] mt-0.5">Learner Satisfaction</p>
          </div>

          <div className="p-3 text-center rounded-2xl transition-all duration-300 hover:bg-[#FFF8F1] border border-transparent hover:border-[#FDE8CF]">
            <div className="flex items-center justify-center gap-1 text-[#A52ABF] font-bold text-xl sm:text-2xl">
              <Sparkles className="w-5 h-5 text-[#F2A12A]" />
              <span>HSR Layout</span>
            </div>
            <p className="text-xs text-[#737373] mt-0.5">In-Person &amp; Online</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
