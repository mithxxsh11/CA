import { useState, type FormEvent } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowUpRight,
  Send,
  CheckCircle,
  Copy,
  ExternalLink,
} from 'lucide-react'
import { CONTACT, ENQUIRY_OPTIONS, waLink } from '../data/content'

interface FormData {
  name: string
  phone: string
  email: string
  interest: string
  message: string
}

const initialForm: FormData = {
  name: '',
  phone: '',
  email: '',
  interest: 'Communication & Spoken English',
  message: '',
}

export function Chapter05() {
  const [values, setValues] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const validate = (): boolean => {
    const errs: Partial<FormData> = {}
    if (!values.name.trim()) errs.name = 'Please provide your full name.'
    if (!values.phone.trim() || values.phone.length < 8) errs.phone = 'Please provide a valid phone number.'
    if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) errs.email = 'Please provide a valid email.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    // Show handoff/submission state
    setSubmitted(true)
  }

  const generatedWhatsAppMsg = `Hello Chandni's Academy,\n\nI would like to enquire about your programmes.\n\nName: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email}\nInterest: ${values.interest}${values.message ? `\nMessage: ${values.message}` : ''}`

  const copyDetails = async () => {
    try {
      await navigator.clipboard.writeText(generatedWhatsAppMsg)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="ch5"
      aria-label="Chapter 05: Connect and Conversion"
      className="chapter-section min-h-[100svh] relative flex flex-col justify-between pt-24 pb-12 bg-[#efece6] overflow-hidden"
    >
      <div className="container-x relative z-10 flex-1 flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#141414]/10 pb-4">
          <span className="mono-label">CONNECT / 05</span>
          <span className="mono-label hidden sm:inline-block">YOUR NEXT CHAPTER</span>
          <span className="mono-label text-[#f06b83]">DIRECT ENQUIRY</span>
        </div>

        {/* Section Headline */}
        <div className="mt-8 mb-12 max-w-2xl">
          <span className="mono-label text-[#D8C29B]">CONVERSATION FIRST</span>
          <h2 className="font-display text-[clamp(44px,6.8vw,96px)] leading-[0.96] mt-2 font-normal">
            READY TO <span className="grad-text italic font-medium block">FIND YOUR VOICE?</span>
          </h2>
          <p className="mt-4 text-[16.5px] text-[#141414]/75 leading-relaxed font-sans max-w-xl">
            Tell us what you want to improve. Let's start a conversation about the right learning opportunity for your personal or professional growth.
          </p>
        </div>

        {/* Two-Column Grid: Contacts on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start my-auto">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 bg-white/70 border border-[#141414]/15 backdrop-blur-sm space-y-6">
              <div>
                <span className="font-mono text-[11px] text-[#f06b83] tracking-widest uppercase block mb-1">
                  LOCATION
                </span>
                <div className="flex items-start gap-2.5 text-[#141414]">
                  <MapPin size={18} className="mt-1 text-[#D8C29B] flex-shrink-0" />
                  <div>
                    <strong className="block font-medium">Chandni's Academy</strong>
                    <span className="text-[14.5px] text-[#141414]/70">
                      HSR Layout, Bengaluru, Karnataka, India
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#141414]/10">
                <span className="font-mono text-[11px] text-[#f06b83] tracking-widest uppercase block mb-1">
                  PHONE &amp; WHATSAPP
                </span>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-2.5 text-[18px] font-mono font-semibold text-[#141414] hover:text-[#f06b83] transition-colors"
                >
                  <Phone size={17} className="text-[#D8C29B]" />
                  {CONTACT.phoneDisplay}
                </a>
              </div>

              <div className="pt-4 border-t border-[#141414]/10">
                <span className="font-mono text-[11px] text-[#f06b83] tracking-widest uppercase block mb-1">
                  DIRECT EMAIL
                </span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2.5 text-[14px] font-mono text-[#141414] hover:text-[#f06b83] transition-colors break-all"
                >
                  <Mail size={16} className="text-[#D8C29B]" />
                  {CONTACT.email}
                </a>
              </div>

              <div className="pt-4 border-t border-[#141414]/10 flex flex-col gap-3">
                <a
                  href={waLink("Hello Chandni's Academy, I would like to know more about your programmes.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-nova-primary w-full text-center justify-center !bg-[#25D366] !border-[#25D366] !text-white hover:!bg-[#1eb854]"
                >
                  <MessageCircle size={16} />
                  CHAT ON WHATSAPP →
                </a>

                <a
                  href={CONTACT.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-nova-outline w-full text-center justify-center text-[11px]"
                >
                  VIEW LOCATION ON MAPS <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-8 sm:p-10 bg-white/90 border border-[#D8C29B]/70 shadow-sm backdrop-blur-md">
              <div className="mb-6">
                <span className="font-mono text-[11px] tracking-widest text-[#f06b83] uppercase block">
                  SEND AN ENQUIRY
                </span>
                <h3 className="font-display text-[28px] sm:text-[34px] leading-tight text-[#141414] mt-1">
                  Start Your Journey
                </h3>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name */}
                  <div>
                    <label className="block font-mono text-[11px] tracking-widest text-[#141414]/70 uppercase mb-1.5">
                      YOUR FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={values.name}
                      onChange={(e) => setValues({ ...values, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full h-11 px-3.5 bg-[#EFECE6]/40 border border-[#141414]/20 font-sans text-[15px] text-[#141414] focus:outline-none focus:border-[#f06b83] transition-colors"
                    />
                    {errors.name && (
                      <p className="mt-1 font-mono text-[11px] text-[#f06b83]">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] tracking-widest text-[#141414]/70 uppercase mb-1.5">
                        PHONE / WHATSAPP *
                      </label>
                      <input
                        type="tel"
                        required
                        value={values.phone}
                        onChange={(e) => setValues({ ...values, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full h-11 px-3.5 bg-[#EFECE6]/40 border border-[#141414]/20 font-sans text-[15px] text-[#141414] focus:outline-none focus:border-[#f06b83] transition-colors"
                      />
                      {errors.phone && (
                        <p className="mt-1 font-mono text-[11px] text-[#f06b83]">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] tracking-widest text-[#141414]/70 uppercase mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={values.email}
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full h-11 px-3.5 bg-[#EFECE6]/40 border border-[#141414]/20 font-sans text-[15px] text-[#141414] focus:outline-none focus:border-[#f06b83] transition-colors"
                      />
                      {errors.email && (
                        <p className="mt-1 font-mono text-[11px] text-[#f06b83]">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Interest Selection */}
                  <div>
                    <label className="block font-mono text-[11px] tracking-widest text-[#141414]/70 uppercase mb-1.5">
                      INTERESTED IN
                    </label>
                    <select
                      value={values.interest}
                      onChange={(e) => setValues({ ...values, interest: e.target.value })}
                      className="w-full h-11 px-3.5 bg-[#EFECE6]/40 border border-[#141414]/20 font-sans text-[15px] text-[#141414] focus:outline-none focus:border-[#f06b83] transition-colors"
                    >
                      {ENQUIRY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-mono text-[11px] tracking-widest text-[#141414]/70 uppercase mb-1.5">
                      ADDITIONAL GOALS (OPTIONAL)
                    </label>
                    <textarea
                      rows={3}
                      value={values.message}
                      onChange={(e) => setValues({ ...values, message: e.target.value })}
                      placeholder="Share any specific goals or questions you have..."
                      className="w-full p-3 bg-[#EFECE6]/40 border border-[#141414]/20 font-sans text-[15px] text-[#141414] focus:outline-none focus:border-[#f06b83] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-nova-primary w-full text-center justify-center !min-h-[50px]"
                  >
                    <Send size={15} />
                    SEND AN ENQUIRY ↗
                  </button>

                  <p className="font-mono text-[10.5px] text-[#141414]/50 text-center tracking-wider">
                    Direct enquiry routed via WhatsApp &amp; Email to Chandni's Academy.
                  </p>
                </form>
              ) : (
                /* Honest Handoff Confirmation State */
                <div className="py-6 space-y-6 text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#D8C29B]/30 text-[#141414]">
                    <CheckCircle size={32} className="text-[#f06b83]" />
                  </div>

                  <div>
                    <h4 className="font-display text-[28px] text-[#141414]">
                      Enquiry Ready To Send
                    </h4>
                    <p className="text-[15px] text-[#141414]/70 max-w-md mx-auto mt-2 font-sans">
                      Thank you, <strong className="text-[#141414]">{values.name}</strong>. Choose WhatsApp to send your details directly, or copy the pre-filled message.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <a
                      href={waLink(generatedWhatsAppMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-nova-primary !bg-[#25D366] !border-[#25D366] !text-white"
                    >
                      <MessageCircle size={16} />
                      OPEN IN WHATSAPP
                    </a>

                    <button
                      type="button"
                      onClick={copyDetails}
                      className="btn-nova-outline"
                    >
                      <Copy size={15} />
                      {copied ? 'COPIED!' : 'COPY DETAILS'}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setValues(initialForm)
                    }}
                    className="font-mono text-[11px] text-[#f06b83] tracking-widest uppercase underline underline-offset-4 hover:opacity-80 pt-2 block mx-auto cursor-pointer"
                  >
                    ← Edit or Send Another Enquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Big Central Brand Statement */}
        <div className="mt-20 pt-12 border-t border-[#141414]/15">
          <p className="font-display text-[clamp(26px,4.8vw,68px)] leading-[1.08] text-[#141414] uppercase tracking-tight">
            <span>COMMUNICATE WITH CLARITY.</span>{' '}
            <span className="opacity-40">EXPRESS WITH CONFIDENCE.</span>{' '}
            <span className="grad-text italic font-medium">LEAD WITH PURPOSE.</span>
          </p>
        </div>

        {/* Minimal Editorial Footer */}
        <footer className="mt-12 pt-8 border-t border-[#141414]/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-mono tracking-widest text-[#141414]/60 uppercase">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="font-semibold text-[#141414]">CHANDNI'S ACADEMY</span>
            <span className="hidden sm:inline">·</span>
            <span>Where Excellence Meets Expression!</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#ch1" onClick={handleScrollTop} className="hover:text-[#141414] transition-colors">
              HOME
            </a>
            <a href="#ch2" className="hover:text-[#141414] transition-colors">
              VISION
            </a>
            <a href="#ch3" className="hover:text-[#141414] transition-colors">
              EXPLORE
            </a>
            <a
              href={CONTACT.beyondWordsInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141414] transition-colors inline-flex items-center gap-1"
            >
              INSTAGRAM <ArrowUpRight size={11} />
            </a>
            <a
              href="#ch1"
              onClick={handleScrollTop}
              className="text-[#f06b83] font-semibold hover:opacity-80 transition-opacity"
            >
              TOP ↑
            </a>
          </div>
        </footer>

        <div className="text-center sm:text-left mt-4 text-[10px] font-mono tracking-widest text-[#141414]/40">
          © 2026 Chandni's Academy. All rights reserved.
        </div>
      </div>
    </section>
  )
}
