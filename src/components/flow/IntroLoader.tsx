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
    },
    {
      word: 'CONFIDENCE',
      sub: 'Express Without Limits',
      bg: 'bg-[#0f8b54]',
      textColor: 'text-[#bfff0a]',
      accentColor: 'text-white',
    },
    {
      word: 'EXPRESSION',
      sub: 'Lead With Purpose',
      bg: 'bg-[#ea384c]',
      textColor: 'text-white',
      accentColor: 'text-[#ffdb65]',
    },
    {
      word: "CHANDNI’S ACADEMY",
      sub: 'Where Excellence Meets Expression',
      bg: 'bg-[#101d35]',
      textColor: 'text-[#d8c29b]',
      accentColor: 'text-white',
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

    let exitTimer: ReturnType<typeof setTimeout> | null = null

    function finish() {
      setIsExiting(true)
      exitTimer = setTimeout(() => {
        onComplete()
      }, 700)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(finishTimer)
      if (exitTimer) clearTimeout(exitTimer)
    }
  }, [onComplete])

  const current = slides[slide] || slides[0]

  return (
    <div

    className={`fixed inset-0 z-50 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isExiting ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
        } ${current.bg}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome intro"
    >
      {/* Background architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Top Skip Button */}
      <button
        onClick={() => {
          setIsExiting(true)
          setTimeout(onComplete, 500)
        }}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/80 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer backdrop-blur-sm"
      >
        Skip Intro ✕
      </button>

      {/* Main Slide Content - Perfectly Centered & Aligned Baseline */}
      <div className="relative text-center px-4 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* 1. Step Indicator (Fixed height to guarantee zero vertical drift) */}
        <div className="h-6 flex items-center justify-center mb-3">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-white/80 flex items-center gap-2.5">
            <span className="font-bold text-white">0{slide + 1}</span>
            <div className="w-12 h-[2px] bg-white/25 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${((slide + 1) / 4) * 100}%` }}
              />
            </div>
            <span className="text-white/60">04</span>
          </div>
        </div>

        {/* 2. Big Animated Word (Fixed container height + centered leading-none eliminates vertical jumping) */}
        <div className="h-28 sm:h-36 md:h-44 lg:h-48 flex items-center justify-center w-full my-2">
          <h1
            key={slide}
            className={`font-flow tracking-tight text-center leading-none select-none animate-[introFade_0.3s_cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${
              slide === 3
                ? 'text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem]'
                : 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl'
            } ${current.textColor}`}
          >
            {current.word}
          </h1>
        </div>

        {/* 3. Subtitle Statement (Fixed height keeps text firmly anchored) */}
        <div className="h-8 flex items-center justify-center mt-3">
          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-white/90 text-center">
            {current.sub}
          </p>
        </div>

        {/* 4. Animated Accent Prop Icon (Fixed height keeps position identical) */}
        <div className="mt-8 relative w-20 h-20 flex items-center justify-center">
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
            <div className="w-16 h-16 rounded-full overflow-hidden p-1 bg-white/10 border-2 border-[#d8c29b] shadow-2xl flex items-center justify-center">
              <img
                src="/logos/chandnis-academy-badge.png"
                alt="Chandni's Academy Logo"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-6 left-0 right-0 px-6 sm:px-12 flex justify-between items-center text-xs font-mono tracking-widest text-white/70">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          HSR LAYOUT • BENGALURU
        </span>
        <span>+91 87548 29969</span>
      </div>
    </div>
  )
}
