import { ArrowDown, MessageSquareQuote, Sparkles } from 'lucide-react'
import { CONTACT } from '../data/content'

const PILLARS_COMMUNITY = [
  {
    num: '01',
    title: 'Express Ideas',
    desc: 'Create space for unique perspectives, dialogue and authentic personal voice without judgment.',
  },
  {
    num: '02',
    title: 'Build Relationships',
    desc: 'Move past superficial small talk into genuine, reciprocal understanding with peers and professionals.',
  },
  {
    num: '03',
    title: 'Connect Through Expression',
    desc: 'Discover how shared dialogue, active listening and articulate expression build lasting bonds.',
  },
]

export function Chapter04() {
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('ch5')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="ch4"
      aria-label="Chapter 04: Beyond Words"
      className="chapter-section min-h-[100svh] relative flex flex-col justify-between py-24 bg-[#101D35] text-[#EFECE6] overflow-hidden"
    >
      {/* Decorative Oversized Quotation Mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-12 font-display text-[clamp(240px,40vw,600px)] leading-none text-[#D8C29B]/08 select-none italic"
      >
        “
      </div>

      <div className="container-x relative z-10 flex-1 flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#D8C29B]/15 pb-4">
          <span className="mono-label !text-[#D8C29B]">BEYOND / 04</span>
          <span className="mono-label !text-[#EFECE6]/60 hidden sm:inline-block">COMMUNITY &amp; INITIATIVE</span>
          <span className="mono-label !text-[#f06b83]">BEYOND THE CLASSROOM</span>
        </div>

        {/* Section Headline */}
        <div className="mt-8 mb-12 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-[#f06b83] uppercase mb-2">
            <MessageSquareQuote size={14} />
            <span>EXPRESSION WITHOUT BARRIERS</span>
          </div>

          <h2 className="font-display text-[clamp(40px,6.2vw,92px)] leading-[0.96] font-normal text-[#EFECE6]">
            SOME THINGS{' '}
            <span className="italic text-[#D8C29B] block font-medium">ARE BETTER EXPRESSED.</span>
          </h2>

          <p className="mt-5 text-[16.5px] text-[#EFECE6]/75 leading-relaxed font-sans max-w-xl">
            Beyond Words is a communication-focused initiative associated with Chandni's Academy and founder Chandni Galagali, creating space for ideas, conversations and meaningful connections.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={CONTACT.beyondWordsInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D8C29B] text-[#101D35] font-mono text-[11.5px] font-semibold tracking-wider uppercase transition-transform hover:scale-105 shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              EXPLORE BEYOND WORDS ↗
            </a>
            <span className="font-mono text-[11.5px] tracking-wider text-[#D8C29B]/80">
              @beyondwordscommunity
            </span>
          </div>
        </div>

        {/* 3 Editorial Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
          {PILLARS_COMMUNITY.map((item) => (
            <div
              key={item.num}
              className="p-7 bg-[#172B49]/70 border border-[#D8C29B]/25 backdrop-blur-sm relative group hover:border-[#D8C29B]/70 transition-colors"
            >
              <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-[#D8C29B] mb-4">
                <span>{item.num}</span>
                <Sparkles size={13} className="opacity-40 group-hover:opacity-100 transition-opacity text-[#f06b83]" />
              </div>
              <h3 className="font-display text-[26px] leading-tight text-[#EFECE6]">
                {item.title}
              </h3>
              <p className="mt-3 text-[14.5px] text-[#EFECE6]/70 leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Transition Hook */}
        <div className="mt-14 pt-6 border-t border-[#D8C29B]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="mono-label !text-[#f06b83]">THE INVITATION</span>
            <p className="font-display text-[22px] sm:text-[26px] text-[#EFECE6] leading-snug">
              EVERY GREAT CONVERSATION{' '}
              <span className="italic text-[#D8C29B]">STARTS SOMEWHERE.</span>
            </p>
          </div>

          <a
            href="#ch5"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#D8C29B]/40 text-[#D8C29B] font-mono text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-[#D8C29B] hover:text-[#101D35] transition-all"
          >
            <span>START YOURS</span>
            <ArrowDown size={14} className="cue-arrow" />
          </a>
        </div>
      </div>
    </section>
  )
}
