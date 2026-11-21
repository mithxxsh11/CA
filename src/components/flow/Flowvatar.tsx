import React, { useEffect, useRef, useState } from 'react'

interface FlowvatarProps {
  size?: 'sm' | 'md' | 'lg'
  theme?: 'navy' | 'blue' | 'pink' | 'green'
  className?: string
  onClick?: () => void
}

type MascotExpression = 'normal' | 'smile' | 'wink' | 'surprised'

const INSPIRATIONAL_QUOTES = [
  'Where Excellence Meets Expression! ✨',
  'Speak with Clarity & Confidence! 🎤',
  'Unleash Your True Voice! 🌟',
  'Confidence Looks Good On You! 💫',
  "Welcome to Chandni's Academy! 👋",
  'Express Yourself Boldly! 🚀',
  'Lead with Purpose! 🎯',
]

export const Flowvatar: React.FC<FlowvatarProps> = ({
  size = 'lg',
  theme = 'navy',
  className = '',
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [leftEyePos, setLeftEyePos] = useState({ x: 0, y: 0 })
  const [rightEyePos, setRightEyePos] = useState({ x: 0, y: 0 })
  const [isHoverSmiling, setIsHoverSmiling] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [expression, setExpression] = useState<MascotExpression>('normal')
  const [isSquishing, setIsSquishing] = useState(false)
  const [speechQuote, setSpeechQuote] = useState<string | null>(null)

  const quoteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const squishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reactionCounterRef = useRef(0)

  // Natural Blink interval
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 160)
    }, 4200)
    return () => clearInterval(blinkTimer)
  }, [])

  // Smooth Eye Tracking for both Mouse and Mobile Touch movements
  useEffect(() => {
    const updatePupils = (clientX: number, clientY: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()

      // Center coordinates of left and right eyes based on percentage positions
      const eyeLeftX = rect.left + rect.width * 0.32
      const eyeRightX = rect.left + rect.width * 0.68
      const eyeY = rect.top + rect.height * 0.36

      // Scale maximum pupil deflection proportionally to the face width
      const maxOffset = Math.max(3, rect.width * 0.045)

      // Left eye offset calculation
      const dxL = clientX - eyeLeftX
      const dyL = clientY - eyeY
      const distL = Math.hypot(dxL, dyL) || 1
      const clampedL = Math.min(distL, maxOffset)
      const xL = (dxL / distL) * clampedL
      const yL = (dyL / distL) * clampedL

      // Right eye offset calculation
      const dxR = clientX - eyeRightX
      const dyR = clientY - eyeY
      const distR = Math.hypot(dxR, dyR) || 1
      const clampedR = Math.min(distR, maxOffset)
      const xR = (dxR / distR) * clampedR
      const yR = (dyR / distR) * clampedR

      setLeftEyePos({ x: xL, y: yL })
      setRightEyePos({ x: xR, y: yR })
    }

    const handleMouseMove = (e: MouseEvent) => {
      updatePupils(e.clientX, e.clientY)
    }

    const handleTouch = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updatePupils(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchstart', handleTouch, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouch)
      window.removeEventListener('touchmove', handleTouch)
    }
  }, [])

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current)
      if (squishTimerRef.current) clearTimeout(squishTimerRef.current)
    }
  }, [])

  // Interactive Mascot Tap Reaction (without opening forms)
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (onClick) {
      onClick()
      return
    }

    // Stop propagation so parent containers aren't triggered
    e.stopPropagation()

    // 1. Squash & Stretch Bounce physics
    setIsSquishing(true)
    if (squishTimerRef.current) clearTimeout(squishTimerRef.current)
    squishTimerRef.current = setTimeout(() => {
      setIsSquishing(false)
    }, 280)

    // 2. Cycle expressions: smile -> wink -> surprised -> big smile
    reactionCounterRef.current = (reactionCounterRef.current + 1) % 4
    if (reactionCounterRef.current === 1) {
      setExpression('wink')
    } else if (reactionCounterRef.current === 2) {
      setExpression('surprised')
    } else {
      setExpression('smile')
    }

    // 3. Pick random inspirational quote for the floating thought bubble
    const quote =
      INSPIRATIONAL_QUOTES[
        Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)
      ]
    setSpeechQuote(quote)

    if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current)
    quoteTimerRef.current = setTimeout(() => {
      setSpeechQuote(null)
      setExpression('normal')
    }, 2500)
  }

  const sizeClasses = {
    sm: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
    md: 'w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48',
    lg: 'w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96',
  }

  const themeClasses = {
    navy: 'bg-[#101d35] shadow-[0_20px_60px_-15px_rgba(16,29,53,0.5)] border-4 border-[#d8c29b]/40',
    blue: 'bg-[#2458f5] shadow-[0_20px_60px_-15px_rgba(36,88,245,0.4)] border-4 border-white/30',
    pink: 'bg-[#ff7bca] shadow-[0_20px_60px_-15px_rgba(255,123,202,0.4)] border-4 border-white/40',
    green: 'bg-[#bfff0a] shadow-[0_20px_60px_-15px_rgba(191,255,10,0.4)] border-4 border-black/20',
  }

  const isSmiling =
    isHoverSmiling || expression === 'smile' || expression === 'wink'

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`}
    >
      {/* Floating Mascot Thought / Speech Bubble when tapped */}
      {speechQuote && (
        <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap transition-all duration-300">
          <div className="bg-[#101d35] text-[#d8c29b] border-2 border-[#d8c29b] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5 animate-bounce">
            <span>{speechQuote}</span>
          </div>
          <div className="w-2 h-2 bg-[#101d35] border-r-2 border-b-2 border-[#d8c29b] rotate-45 mx-auto -mt-1" />
        </div>
      )}

      {/* Main Avatar Circular Face */}
      <div
        ref={containerRef}
        onClick={handleInteraction}
        onMouseEnter={() => setIsHoverSmiling(true)}
        onMouseLeave={() => setIsHoverSmiling(false)}
        className={`relative w-full h-full rounded-full select-none cursor-pointer overflow-hidden transition-all duration-300 ${
          isSquishing
            ? 'scale-[0.88] scale-y-[0.82]'
            : 'hover:scale-105 active:scale-95'
        } ${themeClasses[theme]}`}
        role="button"
        tabIndex={0}
        aria-label="Interactive Chandni's Academy flowvatar avatar"
      >
        {/* Plastic gloss sheen overlay reflection */}
        <div className="absolute inset-0 pointer-events-none rounded-full bg-gradient-to-tr from-white/0 via-white/10 to-white/30 mix-blend-overlay" />
        <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] pointer-events-none rounded-full bg-radial from-white/25 to-transparent blur-md" />

        {/* Face Content using Pure Percentage Proportions */}
        <div className="relative w-full h-full">
          {/* Left Eye: top: 22%, left: 22%, width: 20%, height: 28% */}
          <div
            className={`absolute top-[22%] left-[22%] w-[20%] h-[28%] rounded-full bg-white flex items-center justify-center transition-all duration-150 ${
              isBlinking || expression === 'wink'
                ? 'scale-y-[0.08]'
                : expression === 'surprised'
                  ? 'scale-110'
                  : 'scale-y-100'
            }`}
            style={{
              boxShadow:
                'inset 0 2px 6px rgba(0,0,0,0.25), 0 3px 8px rgba(0,0,0,0.15)',
            }}
          >
            {/* Left Pupil (hidden during wink) */}
            {expression !== 'wink' && (
              <div
                className="w-[52%] h-[56%] rounded-full bg-[#101d35] relative"
                style={{
                  transform: `translate(${leftEyePos.x}px, ${leftEyePos.y}px)`,
                  transition: 'transform 0.05s ease-out',
                }}
              >
                {/* Pupil Highlight */}
                <div className="absolute top-[18%] left-[20%] w-[28%] h-[28%] rounded-full bg-white" />
              </div>
            )}
          </div>

          {/* Right Eye: top: 22%, right: 22%, width: 20%, height: 28% */}
          <div
            className={`absolute top-[22%] right-[22%] w-[20%] h-[28%] rounded-full bg-white flex items-center justify-center transition-all duration-150 ${
              isBlinking
                ? 'scale-y-[0.08]'
                : expression === 'surprised'
                  ? 'scale-110'
                  : 'scale-y-100'
            }`}
            style={{
              boxShadow:
                'inset 0 2px 6px rgba(0,0,0,0.25), 0 3px 8px rgba(0,0,0,0.15)',
            }}
          >
            {/* Right Pupil */}
            <div
              className="w-[52%] h-[56%] rounded-full bg-[#101d35] relative"
              style={{
                transform: `translate(${rightEyePos.x}px, ${rightEyePos.y}px)`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              {/* Pupil Highlight */}
              <div className="absolute top-[18%] left-[20%] w-[28%] h-[28%] rounded-full bg-white" />
            </div>
          </div>

          {/* Cheeks / Blush: top: 48%, completely beneath eyes */}
          <div
            className={`absolute top-[48%] left-[10%] w-[14%] h-[6%] rounded-full bg-[#f06b83] blur-[1px] transition-opacity duration-300 ${
              isSmiling ? 'opacity-80 scale-110' : 'opacity-40'
            }`}
          />
          <div
            className={`absolute top-[48%] right-[10%] w-[14%] h-[6%] rounded-full bg-[#f06b83] blur-[1px] transition-opacity duration-300 ${
              isSmiling ? 'opacity-80 scale-110' : 'opacity-40'
            }`}
          />

          {/* Mouth: strictly positioned below eyes with clear vertical separation */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
              expression === 'surprised'
                ? 'top-[60%] w-[14%] h-[18%] bg-[#080d17] border-2 border-white/30 rounded-full shadow-inner'
                : isSmiling
                  ? 'top-[62%] w-[28%] h-[15%] bg-white border-2 border-[#d8c29b] rounded-b-[100px] shadow-md'
                  : 'top-[58%] w-[15%] h-[22%] bg-[#080d17] border border-white/20 rounded-full shadow-inner'
            }`}
          />
        </div>
      </div>
    </div>
  )
}
