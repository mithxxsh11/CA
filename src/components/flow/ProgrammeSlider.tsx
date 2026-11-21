import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'

interface Programme {
  id: string
  title: string
  tag: string
  format: string
  bg: string
  accent: string
  description: string
  outcomes: string[]
}

interface ProgrammeSliderProps {
  onOpenRegister: (programmeTitle: string) => void
}

export const ProgrammeSlider: React.FC<ProgrammeSliderProps> = ({ onOpenRegister }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showCursor, setShowCursor] = useState(false)
  const [constraints, setConstraints] = useState({ left: 0, right: 0 })
  const hasDragged = useRef(false)
  const isDraggingRef = useRef(false)

  // Fluid cursor tracking with hardware-accelerated useSpring
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const smoothX = useSpring(mouseX, { stiffness: 850, damping: 45, mass: 0.08 })
  const smoothY = useSpring(mouseY, { stiffness: 850, damping: 45, mass: 0.08 })

  // Slider X position motion value
  const x = useMotionValue(0)

  const programmes: Programme[] = [
    {
      id: 'p1',
      title: 'Spoken English & Communication Mastery',
      tag: 'EXPRESSION',
      format: 'In-Person & Online Cohorts',
      bg: 'bg-[#101d35]',
      accent: 'text-[#d8c29b]',
      description:
        'Transform spoken English into natural, fluent and articulate expression. Build sentence structure, real-world vocabulary, and unshakeable conversational ease.',
      outcomes: [
        'Spoken Fluency & Pronunciation Clarity',
        'Natural Thought-to-Speech Flow',
        'Conversational Confidence for Everyday Interactions',
      ],
    },
    {
      id: 'p2',
      title: 'Personality & Confidence Development',
      tag: 'MINDSET',
      format: 'Experiential Intensive',
      bg: 'bg-[#0f8b54]',
      accent: 'text-[#bfff0a]',
      description:
        'Overcome hesitation and internal fear. Cultivate compelling body language, commanding voice modulation, and authentic personal poise that commands respect.',
      outcomes: [
        'Eliminating Social & Stage Fear',
        'Posture, Eye Contact & Non-Verbal Presence',
        'Assertive Self-Expression & Internal Resilience',
      ],
    },
    {
      id: 'p3',
      title: 'Public Speaking & Presentation Skills',
      tag: 'LEADERSHIP',
      format: 'Masterclass Series',
      bg: 'bg-[#2458f5]',
      accent: 'text-white',
      description:
        'Conquer stage fright and captivate audiences. Master the art of persuasive speechwriting, dynamic keynote delivery, and answering spontaneous Q&A.',
      outcomes: [
        'Keynote & Stage Presentation Mastery',
        'Persuasive Storytelling Frameworks',
        'Spontaneous Impromptu Speaking with Calm Poise',
      ],
    },
    {
      id: 'p4',
      title: 'Corporate & Professional Communication',
      tag: 'EXECUTIVE',
      format: 'Executive Cohorts & Corporate Labs',
      bg: 'bg-[#172b49]',
      accent: 'text-[#ff7bca]',
      description:
        'Elevate executive communication for boardroom impact. Master high-stakes negotiations, leadership updates, cross-functional alignment, and career interviews.',
      outcomes: [
        'Executive Presence in Boardrooms & Meetings',
        'High-Stakes Interview Preparation & Salary Pitch',
        'Diplomatic Negotiation & Conflict Resolution',
      ],
    },
  ]

  // Track window pointer movement smoothly without React re-render lag
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const section = document.getElementById('programmes')
      if (!section) return
      const rect = section.getBoundingClientRect()

      const inSection =
        e.clientY >= rect.top - 20 &&
        e.clientY <= rect.bottom + 20 &&
        e.clientX >= rect.left - 20 &&
        e.clientX <= rect.right + 20

      if (inSection || isDraggingRef.current) {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
        setShowCursor(true)
      } else {
        setShowCursor(false)
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [mouseX, mouseY])

  // Recalculate horizontal constraints
  useEffect(() => {
    const updateConstraints = () => {
      if (!containerRef.current || !trackRef.current) return
      const containerWidth = containerRef.current.clientWidth
      const trackWidth = trackRef.current.scrollWidth
      const maxScroll = Math.max(0, trackWidth - containerWidth + 48)
      setConstraints({ left: -maxScroll, right: 0 })
    }

    updateConstraints()
    window.addEventListener('resize', updateConstraints)
    return () => window.removeEventListener('resize', updateConstraints)
  }, [])

  // Smooth slide step for arrows
  const slideStep = (direction: 'left' | 'right') => {
    if (!containerRef.current || !trackRef.current) return
    const containerWidth = containerRef.current.clientWidth
    const trackWidth = trackRef.current.scrollWidth
    const maxScroll = Math.max(0, trackWidth - containerWidth + 48)
    const step = Math.min(460, containerWidth * 0.85)

    const currentX = x.get()
    let targetX = direction === 'right' ? currentX - step : currentX + step
    targetX = Math.max(-maxScroll, Math.min(0, targetX))

    animate(x, targetX, {
      type: 'spring',
      stiffness: 340,
      damping: 34,
      mass: 0.8,
    })
  }

  return (
    <section
      id="programmes"
      className="relative py-20 bg-[#efece6] overflow-hidden border-t border-[#141414]/10 select-none cursor-grab active:cursor-grabbing"
    >
      {/* High-Precision Floating DRAG Cursor Follower */}
      {showCursor && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-full font-flow flex items-center justify-center tracking-wider shadow-2xl hidden md:flex border border-white/20"
          animate={{
            scale: isDragging ? 1.15 : 1,
            width: isDragging ? 76 : 64,
            height: isDragging ? 76 : 64,
            backgroundColor: isDragging ? '#2458f5' : '#101d35',
            color: isDragging ? '#ffffff' : '#d8c29b',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <span className="text-sm font-bold">{isDragging ? 'SLIDING' : 'DRAG ↔'}</span>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-sm tracking-[0.4em] uppercase text-[#141414]/60 block mb-2">
            P R O G R A M M E S
          </span>
          <h2 className="font-flow text-5xl sm:text-6xl md:text-7xl leading-none">
            CURATED LEARNING EXPERIENCES
          </h2>
          <p className="font-sans text-sm text-[#141414]/70 mt-2 max-w-xl">
            Designed for real personal and professional transformation in Bengaluru &amp; Online. Click and drag smoothly anywhere to slide through programmes.
          </p>
        </div>

        {/* Previous & Next Control Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => slideStep('left')}
            className="w-12 h-12 rounded-full border-2 border-[#141414] flex items-center justify-center hover:bg-[#141414] hover:text-white transition-all cursor-pointer font-bold text-lg active:scale-95"
            aria-label="Previous programme"
          >
            ←
          </button>
          <button
            onClick={() => slideStep('right')}
            className="w-12 h-12 rounded-full border-2 border-[#141414] flex items-center justify-center hover:bg-[#141414] hover:text-white transition-all cursor-pointer font-bold text-lg active:scale-95"
            aria-label="Next programme"
          >
            →
          </button>
        </div>
      </div>

      {/* Silky Smooth Dragging Slider Viewport */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden px-4 sm:px-8 pb-8 pt-2"
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.08}
          dragTransition={{
            power: 0.35,
            timeConstant: 260,
            bounceStiffness: 450,
            bounceDamping: 35,
          }}
          onDragStart={() => {
            hasDragged.current = true
            isDraggingRef.current = true
            setIsDragging(true)
          }}
          onDragEnd={() => {
            isDraggingRef.current = false
            setIsDragging(false)
            setTimeout(() => {
              hasDragged.current = false
            }, 80)
          }}
          className="flex gap-6 w-max cursor-grab active:cursor-grabbing"
        >
          {programmes.map((p, idx) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2 }}
              className={`w-[84vw] max-w-[340px] sm:w-[400px] lg:w-[440px] shrink-0 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-white shadow-xl relative overflow-hidden group select-none ${p.bg}`}
            >
              {/* Top Tag & Counter */}
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  {p.tag}
                </span>
                <span className="font-mono text-xs sm:text-sm tracking-widest text-white/50">
                  0{idx + 1} / 04
                </span>
              </div>

              {/* Title & Description */}
              <div className="my-auto">
                <h3 className={`font-flow text-3xl sm:text-4xl lg:text-5xl leading-[0.95] mb-3 sm:mb-4 ${p.accent}`}>
                  {p.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-4 sm:mb-6">
                  {p.description}
                </p>

                {/* Key Focus Points */}
                <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50 block">
                    KEY FOCUS AREAS:
                  </span>
                  {p.outcomes.map((o) => (
                    <div key={o} className="flex items-center gap-2 text-xs font-sans text-white/90">
                      <span className="text-[#bfff0a]">✓</span>
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Format & Register Button */}
              <div className="pt-4 sm:pt-6 border-t border-white/15 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50">
                    FORMAT
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-white/90">{p.format}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (hasDragged.current) return
                    onOpenRegister(p.title)
                  }}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white text-[#101d35] font-flow text-lg sm:text-xl tracking-wider rounded-xl hover:bg-[#d8c29b] transition-all cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  <span>REGISTER</span>
                  <span className="text-sm font-sans font-bold">↗</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
