import React from 'react'
import { StudioMic3D } from './StudioMic3D'
import { RotatingBadge } from './RotatingBadge'

interface HeroSectionProps {
  onOpenRegister: (programme?: string) => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between pt-8 pb-16 px-4 sm:px-8 overflow-hidden bg-[#efece6]"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(to_right,#14141412_1px,transparent_1px),linear-gradient(to_bottom,#14141412_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      {/* Decorative Large Background Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-full text-center z-0 opacity-10">
        <span className="font-flow text-[20vw] tracking-tighter leading-none outline-text-dark block">
          EXPRESSION
        </span>
      </div>

      {/* Top Banner Tag */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-between items-center text-xs font-mono tracking-[0.2em] text-[#141414]/70 mb-4">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0f8b54] animate-pulse" />
          NOW ADMITTING NEW COHORTS
        </span>
        <span className="hidden sm:inline">HSR LAYOUT • BENGALURU • ONLINE</span>
      </div>

      {/* Hero Core Content: Oversized Headline + Central 3D Studio Microphone */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col items-center text-center">
        {/* Massive Flow-Party Style Headline */}
        <h1 className="font-flow text-4xl sm:text-7xl md:text-8xl lg:text-[7.25rem] text-[#141414] leading-[0.92] sm:leading-[0.88] tracking-tight max-w-6xl mx-auto px-2">
          CHANDNI’S ACADEMY IS A SPACE TO{' '}
          <span className="text-[#2458f5] underline decoration-4 decoration-[#bfff0a] underline-offset-8">
            COMMUNICATE
          </span>
          , BUILD{' '}
          <span className="text-[#0f8b54] underline decoration-4 decoration-[#d8c29b] underline-offset-8">
            CONFIDENCE
          </span>{' '}
          AND LEAD WITH{' '}
          <span className="text-[#ea384c]">PURPOSE</span>.
        </h1>

        {/* Central Interactive 3D Studio Microphone with Overlapping Rotating Badge */}
        <div className="relative mt-8 sm:mt-16 flex items-center justify-center">
          {/* Central Interactive 3D Studio Condenser Mic tracking user's cursor in 3D */}
          <StudioMic3D />

          {/* Overlapping Continuous Rotating Circular Badge */}
          <div className="absolute -bottom-4 -right-2 sm:-bottom-8 sm:-right-10 z-20">
            <RotatingBadge
              text="WHERE EXCELLENCE MEETS EXPRESSION • CHANDNI'S ACADEMY • "
              centerText="EXPRESS"
              size="responsive"
              theme="dark"
            />
          </div>

          {/* Left Side Pill Badge */}
          <div className="absolute -top-4 -left-6 sm:-top-6 sm:-left-12 z-20 bg-[#efece6] border-2 border-[#101d35] px-4 py-2 rounded-full shadow-lg transform -rotate-12 hidden sm:block">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#101d35]">
              FOUNDED BY CHANDNI GALAGALI
            </span>
          </div>
        </div>

        {/* Brand Core Pillars Ticker */}
        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-3 sm:gap-8 font-mono text-[11px] sm:text-sm tracking-[0.2em] uppercase text-[#141414]/80 px-2">
          <span className="flex items-center gap-1.5">
            <span className="text-[#2458f5]">●</span> COMMUNICATE: Speak with Clarity
          </span>
          <span className="hidden md:inline text-black/30">|</span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#0f8b54]">●</span> CONFIDENCE: Express Without Limits
          </span>
          <span className="hidden md:inline text-black/30">|</span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#ea384c]">●</span> LEAD: Make an Impact
          </span>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={() => onOpenRegister()}
            className="w-full sm:w-auto px-8 py-4 bg-[#101d35] text-[#d8c29b] font-flow text-2xl tracking-wider rounded-2xl hover:bg-[#172b49] hover:scale-105 transition-all shadow-xl cursor-pointer flex items-center justify-center gap-3"
          >
            <span>REGISTER YOUR INTEREST</span>
            <span>↗</span>
          </button>

          <a
            href="#programmes"
            className="w-full sm:w-auto px-8 py-4 bg-white/70 border-2 border-[#141414]/20 rounded-2xl font-flow text-2xl tracking-wider text-[#141414] hover:bg-white hover:border-[#141414] transition-all flex items-center justify-center gap-2"
          >
            <span>EXPLORE PROGRAMMES</span>
            <span className="text-base">↓</span>
          </a>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-between items-end pt-8 font-mono text-xs text-[#141414]/60">
        <div className="hidden sm:block uppercase tracking-widest">
          Scroll to discover programmes
        </div>
        <div className="mx-auto sm:mx-0 flex items-center gap-2 uppercase tracking-widest animate-bounce">
          <span>↓</span>
          <span>EXPLORE</span>
        </div>
        <div className="hidden sm:block uppercase tracking-widest text-right">
          WhatsApp: +91 87548 29969
        </div>
      </div>
    </section>
  )
}
