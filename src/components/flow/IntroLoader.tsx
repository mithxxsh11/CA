import React, { useState, useEffect } from 'react'

interface IntroLoaderProps {
  onComplete: () => void
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [slide, setSlide] = useState<number>(0)
  const [isExiting, setIsExiting] = useState(false)

  const slides = [
    {
      word: 'COMMUNICATE',
      sub: 'Speak With Absolute Clarity',
      bg: 'bg-[#2458f5]',
      textColor: 'text-white',
      accentColor: 'text-[#bfff0a]',
      prop: 'SPEECH',
    },
    {
      word: 'CONFIDENCE',
      sub: 'Express Without Limits',
      bg: 'bg-[#0f8b54]',
      textColor: 'text-[#bfff0a]',
      accentColor: 'text-white',
      prop: 'AURA',
    },
    {
      word: 'EXPRESSION',
      sub: 'Lead With Purpose',
      bg: 'bg-[#ea384c]',
      textColor: 'text-white',
      accentColor: 'text-[#ffdb65]',
      prop: 'PULSE',
    },
    {
      word: "CHANDNI'S ACADEMY",
      sub: 'Where Excellence Meets Expression',
      bg: 'bg-[#101d35]',
      textColor: 'text-[#d8c29b]',
      accentColor: 'text-white',
      prop: 'ACADEMY',
    },
  ]

  useEffect(() => {
    // Keydown escape to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finish()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // Step through the slides
    const timer1 = setTimeout(() => setSlide(1), 750)
    const timer2 = setTimeout(() => setSlide(2), 1500)
    const timer3 = setTimeout(() => setSlide(3), 2250)
    const finishTimer = setTimeout(() => finish(), 3100)

    function finish() {
      setIsExiting(true)
      setTimeout(() => {
        onComplete()
      }, 700)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(finishTimer)
    }
  }, [onComplete])

  const current = slides[slide]

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isExiting ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      } ${current.bg}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome intro"
    >
      {/* Background architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Skip Button */}
      <button
        onClick={() => {
          setIsExiting(true)
          setTimeout(onComplete, 500)
        }}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/80 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer backdrop-blur-sm"
      >
        Skip Intro ✕
      </button>

      {/* Main Slide Content */}
      <div className="relative text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        {/* Step indicator */}
        <div className="font-mono text-xs tracking-[0.3em] uppercase text-white/70 mb-4 flex items-center gap-2">
          <span>0{slide + 1}</span>
          <span className="w-8 h-[1px] bg-white/40 inline-block" />
          <span>04</span>
        </div>

        {/* Big Animated Word */}
        <div className="overflow-hidden py-2 max-w-full">
          <h1
            key={slide}
            className={`font-flow text-4xl sm:text-7xl md:text-9xl lg:text-[11rem] leading-none tracking-tight text-center px-2 animate-[fadeInUp_0.4s_ease-out] break-words ${current.textColor}`}
          >
            {current.word}
          </h1>
        </div>

        {/* Subtitle statement */}
        <p className="mt-4 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-white/90">
          {current.sub}
        </p>

        {/* Animated Accent Prop Icon */}
        <div className="mt-8 relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
          {slide === 0 && (
            <div className="w-14 h-14 rounded-full border-4 border-white/80 animate-ping opacity-60" />
          )}
          {slide === 1 && (
            <div className="w-14 h-14 rotate-45 border-4 border-[#bfff0a] animate-spin" />
          )}
          {slide === 2 && (
            <div className="flex gap-1.5 items-end h-10">
              <div className="w-2 bg-white animate-bounce h-10" />
              <div className="w-2 bg-white animate-bounce h-7 delay-100" />
              <div className="w-2 bg-white animate-bounce h-9 delay-200" />
            </div>
          )}
          {slide === 3 && (
            <div className="w-14 h-14 rounded-full bg-[#d8c29b] text-[#101d35] font-flow flex items-center justify-center font-bold text-xl shadow-lg">
              CA
            </div>
          )}
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-between items-center text-[11px] font-mono tracking-widest text-white/60">
        <span>HSR LAYOUT • BENGALURU</span>
        <span>+91 87548 29969</span>
      </div>
    </div>
  )
}
