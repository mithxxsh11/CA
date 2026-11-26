import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote, MessageSquare } from 'lucide-react'
import { FloatingBubble3D } from './FloatingBubble3D'
import { PeacefulReveal } from './MotionPrimitives'

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 't1',
      name: 'Rohan Sharma',
      role: 'Senior Software Engineer, Bengaluru',
      text: 'I used to freeze and translate thoughts in my head during client meetings. After 6 weeks at Chandni’s Academy, I led my first cross-functional architectural review with complete composure and clarity.',
      course: 'Spoken English & Communication Mastery',
      rating: 5,
    },
    {
      id: 't2',
      name: 'Priyanka Patel',
      role: 'Postgraduate Student, HSR Layout',
      text: 'Chandni ma’am creates an environment where it is completely safe to make mistakes and learn. The live speaking drills helped me overcome lifelong camera and interview anxiety.',
      course: 'Personality & Confidence Development',
      rating: 5,
    },
    {
      id: 't3',
      name: 'Anand Kulkarni',
      role: 'Team Lead, Product Operations',
      text: 'The executive communication workshops are structured and practical. My team noticed an immediate shift in how I deliver updates and negotiate stakeholder priorities.',
      course: 'Corporate & Executive Communication',
      rating: 5,
    },
    {
      id: 't4',
      name: 'Sneha Rao',
      role: 'Marketing Associate & Community Speaker',
      text: 'Public speaking was my biggest barrier. Through structured speechwriting and stage practice at the academy, I gave my first keynote at a meetup without notes. Life-changing experience!',
      course: 'Public Speaking & Presentation Skills',
      rating: 5,
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="relative py-20 sm:py-28 bg-[#FFF8F1]/40 border-t border-[#F0E6EB]/60 overflow-hidden">
      {/* Background Floating 3D Amber Contrast Spheres */}
      <div className="absolute top-12 left-10 hidden md:block pointer-events-none z-0">
        <FloatingBubble3D size={84} variant="amber" driftY={14} driftX={5} duration={7.5} />
      </div>
      <div className="absolute bottom-16 right-12 hidden md:block pointer-events-none z-0">
        <FloatingBubble3D size={64} variant="amber" driftY={13} driftX={-5} duration={8.2} delay={0.6} />
      </div>
      <div className="absolute top-28 right-24 hidden lg:block pointer-events-none z-0">
        <FloatingBubble3D size={32} variant="pearl" driftY={9} driftX={4} duration={6.5} delay={0.9} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <PeacefulReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE8CF] border border-[#F2A12A]/40 text-xs font-bold text-[#c27511] mb-4 shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5 text-[#F2A12A]" />
            <span>LEARNER EXPERIENCES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight mb-4">
            Real Experiences.{' '}
            <span className="gradient-text">Real Growth.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#737373] leading-relaxed">
            Discover how our learners found their voice, conquered hesitation, and unlocked new opportunities.
          </p>
        </PeacefulReveal>

        {/* Testimonials Carousel Container */}
        <PeacefulReveal delay={0.12} className="relative max-w-4xl mx-auto">
          {/* Card Showcase */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex"
            >
              {testimonials.map((item) => (
                <div key={item.id} className="w-full shrink-0 px-2 sm:px-4">
                  <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#FDE8CF] shadow-xs relative overflow-hidden card-hover-effect">
                    {/* Top Quote Icon & Rating */}
                    <div className="flex items-center justify-between mb-6">
                      <Quote className="w-8 h-8 text-[#F2A12A]/45" />
                      <div className="flex items-center gap-1 text-[#F2A12A]">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current drop-shadow-[0_1px_3px_rgba(242,161,42,0.4)]" />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-base sm:text-xl text-[#171717] font-medium leading-relaxed mb-8">
                      “{item.text}”
                    </p>

                    {/* Learner Info & Course Tag */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#F0E6EB]">
                      <div>
                        <h4 className="text-base font-bold text-[#171717]">{item.name}</h4>
                        <p className="text-xs text-[#737373]">{item.role}</p>
                      </div>

                      <span className="inline-flex self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-full bg-[#FDE8CF] text-[#c27511] border border-[#F2A12A]/35 shadow-2xs">
                        {item.course}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Arrows & Indicator */}
          <div className="flex items-center justify-between mt-8 px-2">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'w-9 bg-[#F2A12A] shadow-xs' : 'w-2 bg-[#F0E6EB] hover:bg-[#FDE8CF]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={prevSlide}
                className="w-11 h-11 rounded-full bg-white border border-[#F0E6EB] shadow-xs flex items-center justify-center text-[#171717] hover:bg-[#FDE8CF] hover:text-[#c27511] hover:border-[#F2A12A]/50 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={nextSlide}
                className="w-11 h-11 rounded-full bg-white border border-[#F0E6EB] shadow-xs flex items-center justify-center text-[#171717] hover:bg-[#FDE8CF] hover:text-[#c27511] hover:border-[#F2A12A]/50 transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </PeacefulReveal>
      </div>
    </section>
  )
}
