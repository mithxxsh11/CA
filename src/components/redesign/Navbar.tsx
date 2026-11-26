import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, GraduationCap } from 'lucide-react'

interface NavbarProps {
  onOpenEnquire: (courseTitle?: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquire }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Courses', href: '#courses' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-[#F0E6EB] py-3.5'
            : 'bg-[#FFFCFA]/80 backdrop-blur-sm border-b border-black/[0.04] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Chandni's Academy Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-[#F9D9F2] shadow-sm bg-white p-0.5 group-hover:scale-105 transition-transform">
              <img
                src="/logos/chandnis-academy-badge.png"
                alt="Chandni's Academy Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg sm:text-xl tracking-tight text-[#171717] leading-tight">
                CHANDNI’S <span className="text-[#A52ABF]">Academy</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider uppercase text-[#737373] flex items-center">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F2A12A] mr-1.5 animate-pulse" />
                HSR Layout • Bengaluru
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick(link.href)
                }}
                className="text-sm font-medium text-[#737373] hover:text-[#F2A12A] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#F2A12A] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenEnquire()}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#F2A12A] to-[#E08B12] hover:from-[#e5951c] hover:to-[#cf7c0a] shadow-md shadow-[#F2A12A]/25 hover:shadow-lg hover:shadow-[#F2A12A]/40 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Enquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#171717] hover:bg-[#F9D9F2]/50 transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/40 backdrop-blur-sm animate-fade-in flex justify-end">
          <div className="w-4/5 max-w-sm bg-[#FFFCFA] h-full p-6 flex flex-col justify-between shadow-2xl border-l border-[#F0E6EB] overflow-y-auto">
            <div>
              {/* Drawer Top */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#F0E6EB]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden p-0.5 bg-white border border-[#F9D9F2]">
                    <img
                      src="/logos/chandnis-academy-badge.png"
                      alt="Chandni's Academy Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-bold text-base text-[#171717]">
                    CHANDNI’S <span className="text-[#A52ABF]">Academy</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#F0E6EB] flex items-center justify-center text-[#737373] hover:text-[#171717]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.href)
                    }}
                    className="px-3 py-2.5 rounded-xl text-base font-medium text-[#171717] hover:bg-[#F9D9F2]/40 hover:text-[#A52ABF] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-[#F0E6EB] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenEnquire()
                }}
                className="w-full py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#F2A12A] to-[#E08B12] shadow-md shadow-[#F2A12A]/30 flex items-center justify-center gap-2"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="text-center text-xs text-[#737373] mt-2">
                <p>📍 HSR Layout, Bengaluru</p>
                <p className="mt-0.5">📞 +91 87548 29969</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
