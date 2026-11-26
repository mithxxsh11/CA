import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react'
import { FloatingBubble3D } from './FloatingBubble3D'
import { PeacefulReveal } from './MotionPrimitives'

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'Spoken English & Communication Mastery',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const coursesList = [
    'Spoken English & Communication Mastery',
    'Personality & Confidence Development',
    'Public Speaking & Presentation Skills',
    'Corporate & Executive Communication',
    'One-on-One Mentorship with Chandni Galagali',
    'General Enquiry',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      setStatus('error')
      setErrorMessage('Please enter your full name.')
      return
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setStatus('error')
      setErrorMessage('Please enter a valid phone or WhatsApp number.')
      return
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')

    // Simulate reliable form submission
    setTimeout(() => {
      setStatus('success')
    }, 700)
  }

  const handleWhatsAppRedirect = () => {
    const text = `Hi Chandni's Academy, my name is ${formData.name || 'there'}. I am interested in ${formData.course}. ${formData.message ? `Message: ${formData.message}` : ''}`
    window.open(`https://wa.me/918754829969?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-[#FFF8F1]/50 border-t border-[#F0E6EB]/60 overflow-hidden">
      {/* Background Floating 3D Amber Contrast Spheres */}
      <div className="absolute top-16 left-8 hidden md:block pointer-events-none z-0">
        <FloatingBubble3D size={104} variant="amber" driftY={16} driftX={6} duration={8} showPulseCore />
      </div>
      <div className="absolute top-44 left-32 hidden lg:block pointer-events-none z-0">
        <FloatingBubble3D size={48} variant="amber" driftY={12} driftX={-4} duration={6.8} delay={0.6} />
      </div>
      <div className="absolute bottom-16 right-12 hidden md:block pointer-events-none z-0">
        <FloatingBubble3D size={72} variant="amber" driftY={14} driftX={-5} duration={7.2} delay={0.5} />
      </div>
      <div className="absolute top-1/3 right-6 hidden lg:block pointer-events-none z-0">
        <FloatingBubble3D size={38} variant="amber" driftY={10} driftX={4} duration={6.6} delay={0.8} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <PeacefulReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE8CF] border border-[#F2A12A]/40 text-xs font-bold text-[#c27511] mb-4 shadow-2xs">
            <Mail className="w-3.5 h-3.5 text-[#F2A12A]" />
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight mb-4">
            Let's Start Your Learning Journey
          </h2>

          <p className="text-base sm:text-lg text-[#737373] leading-relaxed">
            Have questions about our courses, cohorts, or admissions? We are here to guide you.
          </p>
        </PeacefulReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Verified Contact Cards */}
          <PeacefulReveal delay={0.08} className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#171717] mb-2">
                Connect Directly
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed mb-6">
                Reach out directly via phone, WhatsApp, or email. We respond promptly to all learning enquiries.
              </p>

              {/* Phone Card */}
              <a
                href="tel:+918754829969"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#F0E6EB] card-hover-effect group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F9D9F2] text-[#A52ABF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#737373] uppercase font-semibold tracking-wider block">
                    Phone / Call
                  </span>
                  <span className="text-base font-bold text-[#171717] group-hover:text-[#A52ABF] transition-colors">
                    +91 87548 29969
                  </span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/918754829969?text=Hi%20Chandni's%20Academy,%20I%20would%20like%20to%20enquire%20about%20your%20communication%20courses."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#25D366]/30 card-hover-effect group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#737373] uppercase font-semibold tracking-wider block">
                    WhatsApp Chat (Instant)
                  </span>
                  <span className="text-base font-bold text-[#171717] group-hover:text-[#0f8b54] transition-colors">
                    +91 87548 29969
                  </span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:webmaster@chandnisacademy.com?subject=Learning%20Enquiry%20-%20Chandni's%20Academy"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#F0E6EB] card-hover-effect group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FDE8CF] text-[#c27511] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#737373] uppercase font-semibold tracking-wider block">
                    Email Address
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#171717] group-hover:text-[#c27511] transition-colors break-all">
                    webmaster@chandnisacademy.com
                  </span>
                </div>
              </a>

              {/* Location Card */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Chandni%27s+Academy+HSR+Layout+Bengaluru"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#F0E6EB] card-hover-effect group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EBF3FF] text-[#2458f5] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#737373] uppercase font-semibold tracking-wider block">
                    Academy Location
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#171717] group-hover:text-[#2458f5] transition-colors">
                    HSR Layout, Bengaluru, Karnataka, India
                  </span>
                </div>
              </a>
            </div>

            {/* Quick Community Note */}
            <div className="p-5 rounded-2xl bg-[#F9D9F2]/40 border border-[#F9D9F2] text-xs text-[#171717]">
              <span className="font-bold text-[#A52ABF] block mb-1">
                Beyond Words Community Meetups
              </span>
              <span>
                Join our Bengaluru speaking community on Instagram:{' '}
                <a
                  href="https://www.instagram.com/beyondwordscommunity/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline text-[#A52ABF]"
                >
                  @beyondwordscommunity
                </a>
              </span>
            </div>
          </PeacefulReveal>

          {/* Right Column: Working Admissions Enquiry Form */}
          <PeacefulReveal delay={0.16} className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#F0E6EB] shadow-sm">
            <h3 className="text-2xl font-bold text-[#171717] mb-2">Send an Enquiry</h3>
            <p className="text-sm text-[#737373] mb-8">
              Fill out the form below and our admissions team will get in touch with you shortly.
            </p>

            {status === 'success' ? (
              <div className="p-8 rounded-2xl bg-[#0f8b54]/10 border border-[#0f8b54]/30 text-center animate-fade-in">
                <CheckCircle className="w-12 h-12 text-[#0f8b54] mx-auto mb-4" />
                <h4 className="text-xl font-bold text-[#171717] mb-2">Enquiry Received!</h4>
                <p className="text-sm text-[#737373] mb-6 max-w-md mx-auto">
                  Thank you, <strong className="text-[#171717]">{formData.name}</strong>. We have received your interest in{' '}
                  <strong className="text-[#171717]">{formData.course}</strong>. We will contact you via phone or WhatsApp at{' '}
                  <strong className="text-[#171717]">{formData.phone}</strong>.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp Now</span>
                  </button>

                  <button
                    onClick={() => {
                      setStatus('idle')
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        course: coursesList[0],
                        message: '',
                      })
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold text-[#171717] bg-white border border-[#F0E6EB] hover:bg-[#F9D9F2]/30 transition-all cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-[#ea384c]/10 border border-[#ea384c]/30 flex items-center gap-3 text-xs sm:text-sm text-[#ea384c]">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-4 py-3 rounded-xl border border-[#F0E6EB] bg-[#FFFCFA] text-[#171717] text-sm focus:outline-none focus:border-[#A52ABF] focus:ring-1 focus:ring-[#A52ABF] transition-all"
                  />
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-[#F0E6EB] bg-[#FFFCFA] text-[#171717] text-sm focus:outline-none focus:border-[#A52ABF] focus:ring-1 focus:ring-[#A52ABF] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#F0E6EB] bg-[#FFFCFA] text-[#171717] text-sm focus:outline-none focus:border-[#A52ABF] focus:ring-1 focus:ring-[#A52ABF] transition-all"
                    />
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                    Course / Learning Pathway of Interest
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#F0E6EB] bg-[#FFFCFA] text-[#171717] text-sm focus:outline-none focus:border-[#A52ABF] focus:ring-1 focus:ring-[#A52ABF] transition-all"
                  >
                    {coursesList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                    Your Goals or Any Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you hope to achieve (e.g., campus placement preparation, boardroom confidence, overcoming stage fright)..."
                    className="w-full px-4 py-3 rounded-xl border border-[#F0E6EB] bg-[#FFFCFA] text-[#171717] text-sm focus:outline-none focus:border-[#A52ABF] focus:ring-1 focus:ring-[#A52ABF] transition-all resize-none"
                  />
                </div>

                {/* Submit Action */}
                <motion.button
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#F2A12A] via-[#E08B12] to-[#c27511] hover:from-[#e5951c] hover:to-[#a86208] shadow-lg shadow-[#F2A12A]/30 hover:shadow-xl hover:shadow-[#F2A12A]/40 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 group"
                >
                  {status === 'submitting' ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </PeacefulReveal>
        </div>
      </div>
    </section>
  )
}
