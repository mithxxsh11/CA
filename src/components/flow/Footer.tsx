import React from 'react'
import { RotatingBadge } from './RotatingBadge'

interface FooterProps {
  onOpenRegister: () => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegister }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="relative bg-[#101d35] text-white overflow-hidden pt-24 pb-12">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Massive Call to Action Header matching Flow Party */}
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d8c29b] block mb-4">
            START YOUR TRANSFORMATION
          </span>

          <h2 className="font-flow text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white leading-[0.88] tracking-tight max-w-5xl mx-auto mb-10">
            LET'S MAKE YOUR NEXT MOVE COUNT.
          </h2>

          {/* Main Register Button with Offset Rotating Badge */}
          <div className="relative inline-flex items-center justify-center my-4">
            {/* The Main Action Button - high z-index and clear padding */}
            <button
              onClick={onOpenRegister}
              className="relative z-20 px-10 py-5 sm:px-14 sm:py-6 bg-[#d8c29b] text-[#101d35] font-flow text-3xl sm:text-4xl tracking-wider rounded-full hover:bg-white hover:scale-105 transition-all shadow-2xl cursor-pointer flex items-center gap-4 whitespace-nowrap"
            >
              <span>REGISTER YOUR INTEREST</span>
              <span className="text-2xl font-sans font-bold">↗</span>
            </button>

            {/* Rotating Badge - shifted further to the right to keep button text 100% visible */}
            <div className="absolute -top-14 -right-20 sm:-right-28 md:-right-36 lg:-right-44 z-10 pointer-events-none hidden md:block">
              <RotatingBadge
                text="WHERE EXCELLENCE MEETS EXPRESSION • CHANDNI'S ACADEMY • "
                centerText="ACT NOW"
                size="md"
                theme="gold"
              />
            </div>
          </div>
        </div>

        {/* Business Context & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-t border-b border-white/15">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#d8c29b] text-[#101d35] flex items-center justify-center font-flow text-xl font-bold">
                CA
              </div>
              <span className="font-flow text-3xl tracking-wide text-white">
                CHANDNI'S ACADEMY
              </span>
            </div>
            <p className="font-sans text-xs text-white/70 leading-relaxed mb-4">
              Where Excellence Meets Expression. Dedicated communication, confidence building, and professional development in Bengaluru.
            </p>
            <span className="font-mono text-xs text-[#d8c29b] block">
              Founded by Chandni Galagali
            </span>
          </div>

          {/* Col 2: Location & Contact */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#d8c29b] block mb-4">
              ACADEMY LOCATION
            </span>
            <address className="not-italic font-sans text-sm text-white/80 space-y-1 mb-4">
              <p>HSR Layout</p>
              <p>Bengaluru, Karnataka</p>
              <p>India</p>
            </address>
            <div className="font-mono text-xs text-white/70 space-y-1">
              <p>Phone: +91 87548 29969</p>
              <p>WhatsApp: Available</p>
            </div>
          </div>

          {/* Col 3: Direct Inquiries */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#d8c29b] block mb-4">
              DIRECT REACH
            </span>
            <div className="space-y-3 font-mono text-xs">
              <a
                href="https://wa.me/918754829969"
                target="_blank"
                rel="noreferrer"
                className="block text-[#bfff0a] hover:underline"
              >
                WhatsApp: +91 87548 29969 ↗
              </a>
              <a
                href="mailto:webmaster@chandnisacademy.com"
                className="block text-white/80 hover:text-white hover:underline"
              >
                webmaster@chandnisacademy.com ↗
              </a>
              <a
                href="https://www.instagram.com/beyondwordscommunity/"
                target="_blank"
                rel="noreferrer"
                className="block text-[#ff7bca] hover:underline"
              >
                Instagram: @beyondwordscommunity ↗
              </a>
            </div>
          </div>

          {/* Col 4: Quick Navigation */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#d8c29b] block mb-4">
              QUICK NAVIGATION
            </span>
            <ul className="space-y-2 font-mono text-xs text-white/70">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  HOME
                </a>
              </li>
              <li>
                <a href="#programmes" className="hover:text-white transition-colors">
                  PROGRAMMES
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  ABOUT THE ACADEMY
                </a>
              </li>
              <li>
                <a href="#who-we-are" className="hover:text-white transition-colors">
                  WHO WE ARE
                </a>
              </li>
              <li>
                <a href="#learning" className="hover:text-white transition-colors">
                  LEARNING PATHWAYS
                </a>
              </li>
              <li>
                <a href="#what-we-do" className="hover:text-white transition-colors">
                  WHAT WE DO
                </a>
              </li>
              <li>
                <a href="#beyond-words" className="hover:text-white transition-colors">
                  BEYOND WORDS
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/50">
          <div>
            © 2026 Chandni's Academy. All Rights Reserved. HSR Layout, Bengaluru.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
