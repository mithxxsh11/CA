import React, { useState } from 'react'

interface NavbarProps {
  onOpenRegister: (programme?: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'PROGRAMMES', href: '#programmes' },
    { label: 'ABOUT', href: '#about' },
    { label: 'WHO WE ARE', href: '#who-we-are' },
    { label: 'PATHWAYS', href: '#learning' },
    { label: 'WHAT WE DO', href: '#what-we-do' },
    { label: 'BEYOND WORDS', href: '#beyond-words' },
    { label: 'CONTACT', href: '#contact' },
  ]

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#efece6]/85 backdrop-blur-md border-b border-[#141414]/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Logo Lockup */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Chandni's Academy Home"
          >
            <div className="w-10 h-10 rounded-full bg-[#101d35] text-[#d8c29b] flex items-center justify-center font-flow text-xl tracking-wider group-hover:scale-105 transition-transform">
              CA
            </div>
            <div className="flex flex-col">
              <span className="font-flow text-2xl tracking-wide text-[#141414] leading-none">
                CHANDNI'S ACADEMY
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#141414]/60">
                HSR Layout • Bengaluru
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick(link.href)
                }}
                className="font-mono text-xs uppercase tracking-[0.16em] text-[#141414]/80 hover:text-[#101d35] font-semibold transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#101d35] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenRegister()}
              className="px-5 py-2.5 bg-[#101d35] text-[#d8c29b] font-flow text-xl tracking-wider rounded-full hover:bg-[#172b49] hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>REGISTER</span>
              <span className="text-sm font-sans">↗</span>
            </button>

            {/* Hamburger for mobile/tablet */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-black/20 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <span
                className={`w-5 h-[2px] bg-black transition-transform ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-black transition-opacity ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-black transition-transform ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end">
          <div className="w-4/5 max-w-sm bg-[#efece6] h-full p-8 flex flex-col justify-between shadow-2xl border-l border-black/10">
            <div>
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-black/10">
                <span className="font-flow text-2xl">MENU</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center font-mono text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.href)
                    }}
                    className="font-flow text-3xl text-[#141414] hover:text-[#2458f5] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-black/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenRegister()
                }}
                className="w-full py-3.5 bg-[#101d35] text-[#d8c29b] font-flow text-2xl tracking-wider rounded-xl text-center"
              >
                REGISTER YOUR INTEREST ↗
              </button>
              <div className="font-mono text-xs text-black/60 flex flex-col gap-1">
                <span>HSR Layout, Bengaluru</span>
                <span>+91 87548 29969</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
