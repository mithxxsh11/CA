import React, { useEffect, useRef, useState } from 'react'

interface FlowvatarProps {
  size?: 'sm' | 'md' | 'lg'
  theme?: 'navy' | 'blue' | 'pink' | 'green'
  className?: string
  onClick?: () => void
}

export const Flowvatar: React.FC<FlowvatarProps> = ({
  size = 'lg',
  theme = 'navy',
  className = '',
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [leftEyePos, setLeftEyePos] = useState({ x: 0, y: 0 })
  const [rightEyePos, setRightEyePos] = useState({ x: 0, y: 0 })
  const [isSmiling, setIsSmiling] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)

  // Blink interval
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 160)
    }, 4000)
    return () => clearInterval(blinkTimer)
  }, [])

  // Mouse move tracker for eye pupils
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()

      // Center coordinates of left and right eyes based on percentage positions
      const eyeLeftX = rect.left + rect.width * 0.32
      const eyeRightX = rect.left + rect.width * 0.68
      const eyeY = rect.top + rect.height * 0.36

      // Scale maximum pupil deflection proportionally to the face width
      const maxOffset = Math.max(3, rect.width * 0.04)

      // Left eye offset calculation
      const dxL = e.clientX - eyeLeftX
      const dyL = e.clientY - eyeY
      const distL = Math.hypot(dxL, dyL) || 1
      const clampedL = Math.min(distL, maxOffset)
      const xL = (dxL / distL) * clampedL
      const yL = (dyL / distL) * clampedL

      // Right eye offset calculation
      const dxR = e.clientX - eyeRightX
      const dyR = e.clientY - eyeY
      const distR = Math.hypot(dxR, dyR) || 1
      const clampedR = Math.min(distR, maxOffset)
      const xR = (dxR / distR) * clampedR
      const yR = (dyR / distR) * clampedR

      setLeftEyePos({ x: xL, y: yL })
      setRightEyePos({ x: xR, y: yR })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28',
    md: 'w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52',
    lg: 'w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96',
  }

  const themeClasses = {
    navy: 'bg-[#101d35] shadow-[0_20px_60px_-15px_rgba(16,29,53,0.5)] border-4 border-[#d8c29b]/40',
    blue: 'bg-[#2458f5] shadow-[0_20px_60px_-15px_rgba(36,88,245,0.4)] border-4 border-white/30',
    pink: 'bg-[#ff7bca] shadow-[0_20px_60px_-15px_rgba(255,123,202,0.4)] border-4 border-white/40',
    green: 'bg-[#bfff0a] shadow-[0_20px_60px_-15px_rgba(191,255,10,0.4)] border-4 border-black/20',
  }

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={() => setIsSmiling(true)}
      onMouseLeave={() => setIsSmiling(false)}
      className={`relative rounded-full select-none cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105 shrink-0 ${sizeClasses[size]} ${themeClasses[theme]} ${className}`}
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
          className={`absolute top-[22%] left-[22%] w-[20%] h-[28%] rounded-full bg-white flex items-center justify-center transition-transform duration-150 ${
            isBlinking ? 'scale-y-[0.08]' : 'scale-y-100'
          }`}
          style={{
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.25), 0 3px 8px rgba(0,0,0,0.15)',
          }}
        >
          {/* Left Pupil: 52% width, 56% height */}
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
        </div>

        {/* Right Eye: top: 22%, right: 22%, width: 20%, height: 28% */}
        <div
          className={`absolute top-[22%] right-[22%] w-[20%] h-[28%] rounded-full bg-white flex items-center justify-center transition-transform duration-150 ${
            isBlinking ? 'scale-y-[0.08]' : 'scale-y-100'
          }`}
          style={{
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.25), 0 3px 8px rgba(0,0,0,0.15)',
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

        {/* Cheeks / Blush: top: 50%, completely beneath eyes */}
        <div className="absolute top-[48%] left-[10%] w-[14%] h-[6%] rounded-full bg-[#f06b83]/45 blur-[1px]" />
        <div className="absolute top-[48%] right-[10%] w-[14%] h-[6%] rounded-full bg-[#f06b83]/45 blur-[1px]" />

        {/* Mouth: top: 58% to 60%, strictly below eyes with guaranteed 10% clear vertical margin */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
            isSmiling
              ? 'top-[62%] w-[26%] h-[15%] bg-white border-2 border-[#d8c29b]'
              : 'top-[58%] w-[15%] h-[22%] bg-[#080d17] border border-white/20'
          }`}
          style={{
            borderRadius: isSmiling ? '0 0 100px 100px' : '9999px',
            boxShadow: isSmiling
              ? '0 4px 10px rgba(0,0,0,0.3)'
              : 'inset 0 2px 5px rgba(0,0,0,0.5)',
          }}
        />
      </div>
    </div>
  )
}
