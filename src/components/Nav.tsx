import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRobot, type ChapterId } from '../lib/robot'

const NAV_ITEMS = [
  { label: 'HOME', chapterId: 1 as ChapterId, href: '#ch1' },
  { label: 'OUR VISION', chapterId: 2 as ChapterId, href: '#ch2' },
  { label: 'EXPLORE', chapterId: 3 as ChapterId, href: '#ch3' },
  { label: 'BEYOND WORDS', chapterId: 4 as ChapterId, href: '#ch4' },
  { label: 'CONTACT', chapterId: 5 as ChapterId, href: '#ch5' },
]

export function Nav() {
  const { state, setChapter } = useRobot()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, chapterId: ChapterId) => {
    e.preventDefault()
    setChapter(chapterId)
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isDark = state.chapter === 4

  return (
    <header
      className={`fixed inset-x-0 top-7 z-[60] transition-all duration-500 ${
        scrolled ? 'top-0 py-3 shadow-[0_1px_0_rgba(20,20,20,0.08)]' : 'py-4 sm:py-5'
      } ${
        isDark
          ? 'bg-[#101D35]/85 text-[#EFECE6] border-b border-[#D8C29B]/15 backdrop-blur-md'
          : 'bg-[#EFECE6]/85 text-[#141414] border-b border-[#141414]/08 backdrop-blur-md'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        {/* Brand Icon + Wordmark */}
        <a
          href="#ch1"
          onClick={(e) => handleNavClick(e, '#ch1', 1)}
          className="flex items-center gap-3.5 group"
        >
          {/* Custom minimal speech-mark / arc mark */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded-sm border border-current/25 bg-current/5 transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
              <path d="M7 8h10M7 12h7m-7 4h10" strokeLinecap="round" />
            </svg>
            <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-[#f06b83]" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[12.5px] font-semibold tracking-[0.2em] uppercase leading-tight">
              CHANDNI'S ACADEMY
            </span>
            <span className="text-[9.5px] font-mono tracking-[0.16em] uppercase opacity-50">
              HSR LAYOUT · BENGALURU
            </span>
          </div>
        </a>

        {/* Center Links (Desktop) */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = state.chapter === item.chapterId
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.chapterId)}
                className={`relative py-1 font-mono text-[11px] font-medium tracking-[0.18em] transition-all ${
                  active ? (isDark ? 'text-[#D8C29B]' : 'text-[#141414]') : 'opacity-60 hover:opacity-100'
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="activeNavDot"
                    className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#f06b83]"
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <a
            href="#ch5"
            onClick={(e) => handleNavClick(e, '#ch5', 5)}
            className={`hidden sm:inline-flex items-center gap-2 rounded-none px-4 py-2 font-mono text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-300 ${
              isDark
                ? 'border border-[#D8C29B]/40 text-[#D8C29B] hover:bg-[#D8C29B] hover:text-[#101D35]'
                : 'border border-[#141414]/30 text-[#141414] hover:bg-[#141414] hover:text-[#EFECE6]'
            }`}
          >
            LET'S TALK
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-10 w-10 place-items-center border border-current/25 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-full flex flex-col gap-6 border-b border-[#141414]/15 bg-[#EFECE6] px-6 py-8 shadow-2xl md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.chapterId)}
                  className="flex items-center justify-between border-b border-[#141414]/08 py-3 font-mono text-sm tracking-[0.2em]"
                >
                  <span className={state.chapter === item.chapterId ? 'font-bold text-[#f06b83]' : 'opacity-80'}>
                    {item.label}
                  </span>
                  <span className="font-mono text-xs opacity-40">0{item.chapterId}</span>
                </a>
              ))}
            </nav>
            <a
              href="#ch5"
              onClick={(e) => handleNavClick(e, '#ch5', 5)}
              className="btn-nova-primary w-full text-center justify-center mt-2"
            >
              LET'S TALK <ArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
