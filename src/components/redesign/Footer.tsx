import React from 'react'
import { Phone, Mail, MapPin, ArrowUp, MessageCircle } from 'lucide-react'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-white border-t border-[#F0E6EB] pt-16 pb-12 text-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#F0E6EB]">
          {/* Brand Info Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full overflow-hidden p-0.5 bg-white border border-[#F9D9F2] shadow-xs shrink-0">
                <img
                  src="/logos/chandnis-academy-badge.png"
                  alt="Chandni's Academy Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-[#171717] leading-none">
                  CHANDNI’S <span className="text-[#A52ABF]">Academy</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#737373] mt-1 flex items-center">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F2A12A] mr-1.5" />
                  HSR Layout • Bengaluru
                </span>
              </div>
            </div>

            <p className="text-sm text-[#737373] leading-relaxed max-w-sm mb-6">
              Where Excellence Meets Expression. Dedicated communication mastery, spoken English fluency, confidence building, and executive leadership in Bengaluru.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/beyondwordscommunity/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#FFF8F1] border border-[#F0E6EB] flex items-center justify-center text-[#737373] hover:text-[#F2A12A] hover:border-[#F2A12A]/50 hover:bg-[#FDE8CF]/40 shadow-2xs transition-all"
                aria-label="Instagram @beyondwordscommunity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://wa.me/918754829969"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#FFF8F1] border border-[#F0E6EB] flex items-center justify-center text-[#737373] hover:text-[#0f8b54] hover:border-[#25D366]/40 hover:bg-[#25D366]/10 shadow-2xs transition-all"
                aria-label="WhatsApp +91 87548 29969"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="mailto:webmaster@chandnisacademy.com"
                className="w-10 h-10 rounded-full bg-[#FFF8F1] border border-[#F0E6EB] flex items-center justify-center text-[#737373] hover:text-[#F2A12A] hover:border-[#F2A12A]/50 hover:bg-[#FDE8CF]/40 shadow-2xs transition-all"
                aria-label="Email webmaster@chandnisacademy.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#737373]">
              <li>
                <a href="#home" className="hover:text-[#A52ABF] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#A52ABF] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#A52ABF] transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#A52ABF] transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#A52ABF] transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#A52ABF] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#A52ABF] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Programmes Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-4">
              Programmes
            </h4>
            <ul className="space-y-2.5 text-sm text-[#737373]">
              <li>
                <a href="#courses" className="hover:text-[#A52ABF] transition-colors">
                  Spoken English Mastery
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#A52ABF] transition-colors">
                  Personality &amp; Confidence
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#A52ABF] transition-colors">
                  Public Speaking &amp; Keynotes
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#A52ABF] transition-colors">
                  Corporate Communication
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#A52ABF] transition-colors">
                  1-on-1 Mentorship
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-[#737373]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A52ABF] shrink-0 mt-0.5" />
                <span>HSR Layout, Bengaluru, Karnataka, India</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A52ABF] shrink-0" />
                <a href="tel:+918754829969" className="hover:text-[#171717] transition-colors">
                  +91 87548 29969
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A52ABF] shrink-0" />
                <a
                  href="mailto:webmaster@chandnisacademy.com"
                  className="hover:text-[#171717] transition-colors break-all"
                >
                  webmaster@chandnisacademy.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <div>
            © {new Date().getFullYear()} Chandni’s Academy. All rights reserved. Founded by Chandni Galagali.
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">HSR Layout • Bengaluru</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#F2A12A] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
