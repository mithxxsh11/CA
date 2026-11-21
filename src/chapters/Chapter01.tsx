import { useState, useEffect } from 'react'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { QUESTIONS, TECHNICAL_LABELS } from '../data/content'
import { useRobot } from '../lib/robot'

export function Chapter01() {
  const { setShowBubble } = useRobot()

  // Typing effect state
  const [qIndex, setQIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [localBubble, setLocalBubble] = useState(false)

  // Typing rotation
  useEffect(() => {
    const currentQ = QUESTIONS[qIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText === currentQ) {
      // Hold completed text
      timeout = setTimeout(() => setIsDeleting(true), 2400)
    } else if (isDeleting && displayText === '') {
      // Move to next question
      setIsDeleting(false)
      setQIndex((prev) => (prev + 1) % QUESTIONS.length)
    } else {
      // Typing or deleting characters
      const speed = isDeleting ? 22 : 40
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentQ.substring(0, prev.length - 1)
            : currentQ.substring(0, prev.length + 1)
        )
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, qIndex])

  // Trigger speech bubble after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      setShowBubble(true)
      setLocalBubble(true)
    }, 2800)
    return () => clearTimeout(t)
  }, [setShowBubble])

  const nextQ = QUESTIONS[(qIndex + 1) % QUESTIONS.length]

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('ch2')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="ch1"
      aria-label="Chapter 01: The Hook"
      className="chapter-section min-h-[100svh] relative flex flex-col justify-between pt-28 pb-12 overflow-hidden"
    >
      <div className="container-x relative z-10 flex-1 flex flex-col justify-between">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between border-b border-[#141414]/10 pb-4">
          <span className="mono-label">INTRO / 01</span>
          <span className="mono-label hidden sm:inline-block">WHERE EXCELLENCE MEETS EXPRESSION</span>
          <span className="mono-label text-[#f06b83]">ACTIVE INTERFACE</span>
        </div>

        {/* Center Grid Content */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-12">
          {/* Left Column: Typing Interface & Outlined Headline */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Outlined Typing Box (Nova signature prompt) */}
            <div className="relative max-w-xl">
              {/* Quotation Tab */}
              <div className="absolute -top-3 left-6 px-2.5 py-0.5 bg-[#EFECE6] border border-[#141414]/20 text-[10px] font-mono tracking-widest text-[#f06b83] flex items-center gap-1.5 shadow-sm">
                <span>❝</span>
                <span>INQUIRY_CORE</span>
              </div>

              {/* Main Box */}
              <div className="p-6 sm:p-7 bg-[#EFECE6]/70 border border-[#141414]/20 backdrop-blur-md shadow-sm">
                <div className="min-h-[48px] flex items-center">
                  <p className="font-mono text-[13.5px] sm:text-[15px] font-medium tracking-[0.08em] text-[#141414] uppercase leading-relaxed">
                    {displayText}
                    <span className="cursor-block" />
                  </p>
                </div>

                {/* Next Question Preview */}
                <div className="mt-4 pt-3 border-t border-[#141414]/08 flex items-center justify-between font-mono text-[10.5px] tracking-[0.14em] text-[#141414]/40 uppercase">
                  <span className="truncate max-w-[80%]">NEXT: {nextQ}</span>
                  <span>0{qIndex + 1} / 04</span>
                </div>
              </div>
            </div>

            {/* Oversized Outlined Headline (Nova Reference bottom-left) */}
            <div className="space-y-1 sm:space-y-2">
              <span className="mono-label text-[#D8C29B]">THE POWER OF EXPRESSION</span>
              <h1 className="font-display text-[clamp(44px,7.5vw,104px)] leading-[0.92] tracking-tight font-normal">
                <span className="block outline-headline">YOUR VOICE.</span>
                <span className="block outline-headline">YOUR CONFIDENCE.</span>
                <span className="block outline-headline text-transparent bg-clip-text grad-text">
                  YOUR FUTURE.
                </span>
              </h1>
              <p className="mt-4 max-w-md text-[15px] sm:text-[16px] text-[#141414]/70 leading-relaxed font-sans">
                Discover the confidence to communicate, the clarity to express your ideas, and the skills to make a lasting personal and professional impact.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#ch2"
                onClick={handleExplore}
                className="btn-nova-primary"
              >
                LET'S EXPLORE <ArrowUpRight size={14} />
              </a>
              <a
                href="#ch5"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('ch5')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-nova-outline"
              >
                START A CONVERSATION
              </a>
            </div>
          </div>

          {/* Right Column: Technical Labels with Horizontal Connector Lines */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-end gap-6 pr-4">
            {/* Visual Speech Bubble above the Robot */}
            {localBubble && (
              <div className="speech-bubble-enter mb-8 mr-12 max-w-[240px] p-3.5 bg-white border border-[#D8C29B] shadow-lg rounded-sm text-center">
                <span className="font-mono text-[11px] font-semibold tracking-wider text-[#141414] block">
                  READY TO FIND YOUR VOICE?
                </span>
                <span className="text-[9px] font-mono text-[#f06b83] tracking-widest block mt-1">
                  CHANDNI'S ACADEMY
                </span>
              </div>
            )}

            {/* Technical connecting lines */}
            <div className="flex flex-col gap-7 w-full max-w-[280px]">
              {TECHNICAL_LABELS.map((item) => (
                <div key={item.label} className="flex items-center gap-4 group">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#141414]/25 group-hover:to-[#f06b83] transition-colors" />
                  <div className="text-right">
                    <span className="font-mono text-[9px] text-[#D8C29B] tracking-[0.2em] block">
                      {item.num}
                    </span>
                    <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#141414] block">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-[#141414]/50 tracking-wider block">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="flex items-center justify-between border-t border-[#141414]/10 pt-4 text-[11px] font-mono tracking-[0.2em] uppercase text-[#141414]/60">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f06b83]" />
            <span>THERE'S MORE TO YOUR VOICE</span>
          </div>

          <a
            href="#ch2"
            onClick={handleExplore}
            className="flex items-center gap-2 hover:text-[#141414] transition-colors cursor-pointer"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown size={14} className="cue-arrow text-[#f06b83]" />
          </a>
        </div>
      </div>
    </section>
  )
}
