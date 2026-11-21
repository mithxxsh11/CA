import React from 'react'

export const BeyondWords: React.FC = () => {
  const pills = [
    {
      title: 'EXPLORE BEYOND WORDS',
      tag: 'INSTAGRAM',
      href: 'https://www.instagram.com/beyondwordscommunity/',
      external: true,
      desc: 'Follow the Beyond Words community on Instagram for daily communication insights, thought prompts, and event announcements.',
      bg: 'hover:bg-[#ff7bca] hover:text-black',
    },
    {
      title: 'OPEN MIC & STORYTELLING',
      tag: 'EXPERIENTIAL',
      href: 'https://wa.me/918754829969?text=Hi%20Chandni,%20I%20would%20like%20to%20know%20more%20about%20Beyond%20Words%20storytelling%20and%20open%20mic%20sessions.',
      external: true,
      desc: 'Intimate storytelling circles and expressive open mics to practice authentic vulnerability and public voice.',
      bg: 'hover:bg-[#bfff0a] hover:text-black',
    },
    {
      title: 'IMPROMPTU SPEAKING CIRCLES',
      tag: 'PRACTICE',
      href: 'https://wa.me/918754829969?text=Hi%20Chandni,%20I%20am%20interested%20in%20impromptu%20speaking%20practice%20circles.',
      external: true,
      desc: 'Weekly table-topics and fast-thinking drills where participants master spontaneous expression without notes.',
      bg: 'hover:bg-[#2458f5] hover:text-white',
    },
    {
      title: 'COMMUNITY CONNECTIONS',
      tag: 'NETWORKING',
      href: 'https://wa.me/918754829969?text=Hi%20Chandni,%20I%20would%20like%20to%20connect%20with%20the%20Beyond%20Words%20community.',
      external: true,
      desc: 'A safe, encouraging peer ecosystem of passionate learners, thinkers, and communicators across Bengaluru.',
      bg: 'hover:bg-[#d8c29b] hover:text-[#101d35]',
    },
  ]

  return (
    <section id="beyond-words" className="py-24 bg-[#efece6] border-t border-[#141414]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header matching Flow Party's "p a r t y  t o o l s" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#141414]/60 block mb-2">
              B E Y O N D  W O R D S
            </span>
            <h2 className="font-flow text-6xl sm:text-7xl md:text-8xl leading-none text-[#141414]">
              THE COMMUNITY INITIATIVE
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#141414]/70 mt-3 max-w-xl">
              An expressive community founded by Chandni Galagali to celebrate ideas, open dialogue, and real human connection.
            </p>
          </div>

          <a
            href="https://www.instagram.com/beyondwordscommunity/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full border-2 border-[#141414] font-mono text-xs uppercase tracking-widest text-[#141414] hover:bg-[#141414] hover:text-white transition-all self-start md:self-end flex items-center gap-2"
          >
            <span>VISIT @BEYONDWORDSCOMMUNITY</span>
            <span>↗</span>
          </a>
        </div>

        {/* 4 Interactive Pill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pills.map((pill) => (
            <a
              key={pill.title}
              href={pill.href}
              target={pill.external ? '_blank' : undefined}
              rel={pill.external ? 'noreferrer' : undefined}
              className={`p-8 sm:p-10 bg-white border border-[#141414]/10 rounded-3xl flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1.5 ${pill.bg} group`}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#141414]/5 text-[#141414]/70 group-hover:bg-black/10">
                    {pill.tag}
                  </span>
                  <span className="text-xl font-sans group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    ↗
                  </span>
                </div>

                <h3 className="font-flow text-4xl sm:text-5xl text-[#141414] leading-tight mb-4">
                  {pill.title}
                </h3>
                <p className="font-sans text-sm text-[#141414]/70 group-hover:text-current leading-relaxed">
                  {pill.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-[#141414]/10 mt-6 flex items-center justify-between font-mono text-xs tracking-wider">
                <span>CONNECT DIRECTLY</span>
                <span>LEARN MORE ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
