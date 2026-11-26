import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ArrowUpRight, CheckCircle, Clock, MapPin } from 'lucide-react'
import { FloatingBubble3D } from './FloatingBubble3D'
import { PeacefulReveal, StaggerGrid, StaggerCard } from './MotionPrimitives'

interface CoursesSectionProps {
  onOpenEnquire: (courseTitle?: string) => void
}

interface CourseItem {
  id: string
  title: string
  category: string
  format: string
  description: string
  highlights: string[]
  badgeColor: string
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onOpenEnquire }) => {
  const courses: CourseItem[] = [
    {
      id: 'spoken-english',
      title: 'Spoken English & Communication Mastery',
      category: 'COMMUNICATION & FLUENCY',
      format: 'In-Person & Online Cohorts',
      badgeColor: 'bg-[#FDE8CF] text-[#c27511] border-[#F2A12A]/35',
      description:
        'Transform spoken English into natural, fluent, and articulate expression. Build sentence structure, real-world conversational ease, and clear diction.',
      highlights: [
        'Spoken Fluency & Pronunciation Clarity',
        'Natural Thought-to-Speech Flow',
        'Everyday Conversational Drills',
      ],
    },
    {
      id: 'personality-dev',
      title: 'Personality & Confidence Development',
      category: '★ POPULAR • MINDSET & PRESENCE',
      format: 'Experiential Intensive',
      badgeColor: 'bg-[#F2A12A] text-white border-[#E08B12] shadow-xs',
      description:
        'Overcome hesitation and social self-doubt. Cultivate compelling body language, commanding voice modulation, and authentic personal poise.',
      highlights: [
        'Overcoming Social & Stage Fear',
        'Eye Contact, Posture & Body Language',
        'Assertive Self-Expression & Poise',
      ],
    },
    {
      id: 'public-speaking',
      title: 'Public Speaking & Presentation Skills',
      category: 'STAGE & KEYNOTE',
      format: 'Weekend Masterclass Series',
      badgeColor: 'bg-[#F9D9F2] text-[#A52ABF] border-[#F9D9F2]',
      description:
        'Conquer stage fright and captivate audiences. Master the art of persuasive speechwriting, dynamic keynote delivery, and spontaneous Q&A handling.',
      highlights: [
        'Keynote & Stage Presentation Frameworks',
        'Persuasive Storytelling & Audience Engagement',
        'Impromptu Speaking with Calm Composure',
      ],
    },
    {
      id: 'corporate-training',
      title: 'Corporate & Executive Communication',
      category: 'EXECUTIVE & LEADERSHIP',
      format: 'Executive Labs & Corporate Workshops',
      badgeColor: 'bg-[#EBF3FF] text-[#2458f5] border-[#D6E6FF]',
      description:
        'Elevate executive communication for boardroom impact. Master high-stakes negotiations, leadership updates, cross-functional alignment, and career interviews.',
      highlights: [
        'Executive Presence in Boardrooms & Meetings',
        'High-Stakes Interview Preparation',
        'Diplomatic Negotiation & Team Alignment',
      ],
    },
  ]

  return (
    <section id="courses" className="relative py-20 sm:py-28 bg-[#FFF8F1]/40 border-t border-[#F0E6EB]/60 overflow-hidden">
      {/* Floating 3D Amber Contrast Spheres */}
      <div className="absolute top-14 right-10 hidden md:block pointer-events-none z-0">
        <FloatingBubble3D size={102} variant="amber" driftY={16} driftX={6} duration={7.8} showPulseCore />
      </div>
      <div className="absolute top-40 right-36 hidden lg:block pointer-events-none z-0">
        <FloatingBubble3D size={44} variant="amber" driftY={11} driftX={-4} duration={6.4} delay={0.9} />
      </div>
      <div className="absolute top-28 left-6 hidden lg:block pointer-events-none z-0">
        <FloatingBubble3D size={54} variant="amber" driftY={13} driftX={5} duration={7.2} delay={0.3} />
      </div>
      <div className="absolute bottom-16 left-8 hidden md:block pointer-events-none z-0">
        <FloatingBubble3D size={72} variant="amber" driftY={15} driftX={-6} duration={8.5} delay={0.4} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <PeacefulReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE8CF] border border-[#F2A12A]/40 text-xs font-bold text-[#c27511] mb-4 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#F2A12A]" />
            <span>LEARNING PATHWAYS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight mb-4">
            Explore What You Can Learn
          </h2>

          <p className="text-base sm:text-lg text-[#737373] leading-relaxed">
            Discover learning opportunities designed to help you grow, express, and lead with purpose.
          </p>
        </PeacefulReveal>

        {/* Responsive Grid of Course Cards */}
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.1}>
          {courses.map((course) => (
            <StaggerCard key={course.id}>
              <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E6EB] card-hover-effect flex flex-col justify-between">
                <div>
                  {/* Category & Format Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${course.badgeColor}`}
                    >
                      {course.category}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs text-[#737373] font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#A52ABF]" />
                      <span>{course.format}</span>
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#171717] mb-3 leading-snug">
                    {course.title}
                  </h3>

                  {/* Course Description */}
                  <p className="text-sm text-[#737373] leading-relaxed mb-6">
                    {course.description}
                  </p>

                  {/* Key Outcomes */}
                  <div className="space-y-2 mb-8">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#171717]/60 block">
                      KEY FOCUS AREAS:
                    </span>
                    {course.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-[#171717]">
                        <CheckCircle className="w-4 h-4 text-[#0f8b54] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-6 border-t border-[#F0E6EB] flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1 text-xs text-[#737373]">
                    <Clock className="w-3.5 h-3.5 text-[#A52ABF]" />
                    <span>Small Interactive Cohorts</span>
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onOpenEnquire(course.title)}
                    className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white transition-all cursor-pointer group ${
                      course.id === 'personality-dev' || course.id === 'spoken-english'
                        ? 'bg-gradient-to-r from-[#F2A12A] to-[#E08B12] hover:from-[#e5951c] hover:to-[#cf7c0a] shadow-md shadow-[#F2A12A]/30'
                        : 'bg-gradient-to-r from-[#A52ABF] to-[#C94BD9] hover:from-[#9320ab] hover:to-[#b73ec7] shadow-xs hover:shadow-md'
                    }`}
                  >
                    <span>Enquire Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.button>
                </div>
              </div>
            </StaggerCard>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}
