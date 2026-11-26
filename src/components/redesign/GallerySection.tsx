import React from 'react'
import { Camera, Users, Sparkles, MessageCircle, Mic } from 'lucide-react'
import { FloatingBubble3D } from './FloatingBubble3D'
import { PeacefulReveal, StaggerGrid, StaggerCard } from './MotionPrimitives'

export const GallerySection: React.FC = () => {
  const moments = [
    {
      title: 'Interactive Spoken English Labs',
      tag: 'FLUENCY & PRACTICE',
      desc: 'Small groups engaging in spontaneous dialogue, pronunciation refinement, and thought-to-speech flow.',
      icon: MessageCircle,
      gradient: 'from-[#FDE8CF]/50 via-white to-[#FFF8F1]',
      border: 'border-[#F2A12A]/35',
      accentColor: 'text-[#c27511]',
      tagBg: 'bg-[#FDE8CF] text-[#c27511] border-[#F2A12A]/35',
    },
    {
      title: 'Stage & Keynote Presentation Drills',
      tag: 'CONFIDENCE & STAGE',
      desc: 'Learners practicing posture, microphone technique, and narrative storytelling in an encouraging environment.',
      icon: Mic,
      gradient: 'from-[#FDE8CF] via-white to-[#FFF8F1]',
      border: 'border-[#F2A12A]/45',
      accentColor: 'text-[#c27511]',
      tagBg: 'bg-[#F2A12A] text-white border-[#E08B12]',
    },
    {
      title: 'Executive Corporate Communication',
      tag: 'LEADERSHIP DRILLS',
      desc: 'Simulations of high-stakes boardroom meetings, client presentations, and stakeholder negotiations.',
      icon: Users,
      gradient: 'from-[#EBF3FF] via-white to-[#F9D9F2]/20',
      border: 'border-[#D6E6FF]',
      accentColor: 'text-[#2458f5]',
      tagBg: 'bg-white/90 border-black/[0.06] text-[#2458f5]',
    },
    {
      title: 'Beyond Words Community Initiative',
      tag: 'COMMUNITY & SOCIAL',
      desc: 'Our open community gathering for conversational ease, peer networking, and thoughtful discussions in Bengaluru.',
      icon: Sparkles,
      gradient: 'from-[#FFF8F1] via-white to-[#FDE8CF]/40',
      border: 'border-[#F2A12A]/35',
      accentColor: 'text-[#c27511]',
      tagBg: 'bg-[#FDE8CF] text-[#c27511] border-[#F2A12A]/35',
    },
  ]

  return (
    <section id="gallery" className="relative py-20 sm:py-28 bg-[#FFFCFA] border-t border-[#F0E6EB]/60 overflow-hidden">
      {/* Background Floating 3D Amber Contrast Spheres */}
      <div className="absolute top-16 right-10 hidden md:block pointer-events-none z-0">
        <FloatingBubble3D size={92} variant="amber" driftY={16} driftX={6} duration={7.8} showPulseCore />
      </div>
      <div className="absolute top-36 left-8 hidden lg:block pointer-events-none z-0">
        <FloatingBubble3D size={54} variant="amber" driftY={13} driftX={5} duration={7.4} delay={0.4} />
      </div>
      <div className="absolute bottom-14 left-12 hidden lg:block pointer-events-none z-0">
        <FloatingBubble3D size={64} variant="amber" driftY={12} driftX={-4} duration={8.1} delay={0.7} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <PeacefulReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE8CF] border border-[#F2A12A]/40 text-xs font-bold text-[#c27511] mb-4 shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-[#F2A12A]" />
            <span>CAMPUS &amp; COHORTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight mb-4">
            Life at CHANDNI’S Academy
          </h2>

          <p className="text-base sm:text-lg text-[#737373] leading-relaxed">
            A glimpse into our interactive workshops, live speaking drills, and community gatherings in HSR Layout.
          </p>
        </PeacefulReveal>

        {/* 4 Gallery Cards Grid */}
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.1}>
          {moments.map((item) => {
            const Icon = item.icon
            return (
              <StaggerCard key={item.title}>
                <div
                  className={`h-full rounded-3xl p-8 border ${item.border} bg-gradient-to-br ${item.gradient} shadow-xs card-hover-effect flex flex-col justify-between group`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className={`text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border shadow-2xs ${item.tagBg}`}>
                        {item.tag}
                      </span>
                      <div className={`w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center ${item.accentColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#171717] mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#737373] leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-semibold text-[#171717]">
                    <span>HSR Layout &amp; Bengaluru Community</span>
                    <span className="text-[#A52ABF]">Live Sessions</span>
                  </div>
                </div>
              </StaggerCard>
            )
          })}
        </StaggerGrid>
      </div>
    </section>
  )
}
