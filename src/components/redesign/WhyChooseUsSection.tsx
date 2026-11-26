import React from 'react'
import { Award, UserCheck, Mic2, Heart, TrendingUp, Users } from 'lucide-react'
import { FloatingBubble3D } from './FloatingBubble3D'
import { PeacefulReveal, StaggerGrid, StaggerCard } from './MotionPrimitives'

export const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Experienced Direct Mentorship',
      description:
        'Personal guidance and constructive feedback directly from founder Chandni Galagali throughout your learning journey.',
      iconBg: 'bg-gradient-to-tr from-[#A52ABF] to-[#C94BD9] text-white shadow-xs',
    },
    {
      icon: UserCheck,
      title: 'Student-Focused Learning',
      description:
        'Personalized coaching tailored to your individual speaking pace, professional background, and transformation goals.',
      iconBg: 'bg-gradient-to-tr from-[#F2A12A] to-[#F59E0B] text-white shadow-xs',
    },
    {
      icon: Mic2,
      title: 'Practical & Real-World Drills',
      description:
        '80% speaking practice, 20% theory. Engaging spontaneous drills, mock interviews, and live boardroom simulations.',
      iconBg: 'bg-gradient-to-tr from-[#A52ABF] to-[#C94BD9] text-white shadow-xs',
    },
    {
      icon: Heart,
      title: 'Safe & Encouraging Environment',
      description:
        'A warm, non-judgmental space where hesitation is acknowledged and mistakes are embraced as natural learning milestones.',
      iconBg: 'bg-gradient-to-tr from-[#F2A12A] to-[#F59E0B] text-white shadow-xs shadow-[#F2A12A]/25',
    },
    {
      icon: TrendingUp,
      title: 'Measurable Confidence Growth',
      description:
        'Tangible improvements in thought-to-speech fluency, pronunciation clarity, assertive body language, and stage presence.',
      iconBg: 'bg-gradient-to-tr from-[#A52ABF] to-[#C94BD9] text-white shadow-xs',
    },
    {
      icon: Users,
      title: 'Small Interactive Cohorts',
      description:
        'Strictly limited batch sizes so that every learner receives dedicated spotlight, personalized drills, and constructive feedback.',
      iconBg: 'bg-gradient-to-tr from-[#F2A12A] to-[#F59E0B] text-white shadow-xs shadow-[#F2A12A]/25',
    },
  ]

  return (
    <section id="why-us" className="relative py-20 sm:py-28 bg-[#FFFCFA] border-t border-[#F0E6EB]/60 overflow-hidden">
      {/* Background Floating 3D Amber Contrast Spheres */}
      <div className="absolute top-16 right-8 hidden md:block pointer-events-none z-0">
        <FloatingBubble3D size={94} variant="amber" driftY={16} driftX={6} duration={7.6} showPulseCore />
      </div>
      <div className="absolute top-36 left-8 hidden lg:block pointer-events-none z-0">
        <FloatingBubble3D size={48} variant="amber" driftY={12} driftX={-4} duration={6.8} delay={0.6} />
      </div>
      <div className="absolute bottom-20 left-10 hidden md:block pointer-events-none z-0">
        <FloatingBubble3D size={64} variant="amber" driftY={13} driftX={-5} duration={8.4} delay={0.5} />
      </div>
      <div className="absolute top-1/2 right-4 hidden lg:block pointer-events-none z-0">
        <FloatingBubble3D size={36} variant="amber" driftY={10} driftX={4} duration={6.8} delay={1} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <PeacefulReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE8CF] border border-[#F2A12A]/40 text-xs font-bold text-[#c27511] mb-4 shadow-2xs">
            <span>OUR CORE ADVANTAGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight mb-4">
            Why Choose CHANDNI’S Academy?
          </h2>

          <p className="text-base sm:text-lg text-[#737373] leading-relaxed">
            A safe, encouraging space dedicated to your personal, spoken, and professional evolution.
          </p>
        </PeacefulReveal>

        {/* 6 Feature Cards Grid */}
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.08}>
          {features.map((item) => {
            const Icon = item.icon
            return (
              <StaggerCard key={item.title}>
                <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E6EB] card-hover-effect flex flex-col justify-start group">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${item.iconBg}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#171717] mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#737373] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerCard>
            )
          })}
        </StaggerGrid>
      </div>
    </section>
  )
}
