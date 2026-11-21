import React, { useState } from 'react'

interface InterestModalProps {
  isOpen: boolean
  onClose: () => void
  initialProgramme?: string
}

export const InterestModal: React.FC<InterestModalProps> = ({
  isOpen,
  onClose,
  initialProgramme = '',
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    area: initialProgramme || 'Spoken English & Communication Mastery',
    mode: 'In-Person (HSR Layout, Bengaluru)',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState('')

  if (!isOpen) return null

  const programmesList = [
    'Spoken English & Communication Mastery',
    'Personality & Confidence Development',
    'Public Speaking & Presentation Skills',
    'Corporate & Professional Communication',
    'Beyond Words Community Initiative',
    'Other / Custom Requirement',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build structured, formatted WhatsApp message carrying all user input
    const msg = `*New Website Enquiry — Chandni's Academy*

• *Name*: ${formData.firstName.trim()} ${formData.lastName.trim()}
• *Phone*: ${formData.phone.trim()}
• *Email*: ${formData.email.trim()}
• *Programme*: ${formData.area}
• *Preferred Mode*: ${formData.mode}
• *Goals / Notes*: ${formData.message.trim() || 'General consultation request'}

_Sent via Chandni's Academy website_`

    const encoded = encodeURIComponent(msg)
    const targetUrl = `https://wa.me/918754829969?text=${encoded}`

    setWhatsappUrl(targetUrl)

    // Open WhatsApp directly in new window/tab
    window.open(targetUrl, '_blank')
    setSubmitted(true)
  }

  const mailtoUrl = `mailto:webmaster@chandnisacademy.com?subject=${encodeURIComponent(
    `Enquiry: ${formData.area} - ${formData.firstName} ${formData.lastName}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nProgramme: ${formData.area}\nMode: ${formData.mode}\nNotes: ${formData.message}`
  )}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-xl bg-[#efece6] text-[#141414] border-2 border-[#101d35]/20 shadow-2xl rounded-2xl overflow-hidden p-5 sm:p-10 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer text-sm font-mono"
          aria-label="Close modal"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="mono-label text-[#101d35] block mb-1">
                Chandni's Academy • HSR Layout
              </span>
              <h2 id="modal-title" className="font-flow text-3xl sm:text-5xl leading-none">
                REGISTER YOUR INTEREST
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#141414]/70 mt-2">
                Join our next cohort or request a consultation. Submitting will pre-fill and open your enquiry directly in WhatsApp with Chandni Galagali.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider mb-1 text-black/70">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Chandni"
                    className="w-full px-3.5 py-2.5 bg-white border border-black/20 rounded-lg text-base sm:text-sm focus:outline-none focus:border-[#101d35] focus:ring-1 focus:ring-[#101d35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider mb-1 text-black/70">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Sharma"
                    className="w-full px-3.5 py-2.5 bg-white border border-black/20 rounded-lg text-base sm:text-sm focus:outline-none focus:border-[#101d35] focus:ring-1 focus:ring-[#101d35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider mb-1 text-black/70">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-white border border-black/20 rounded-lg text-base sm:text-sm focus:outline-none focus:border-[#101d35] focus:ring-1 focus:ring-[#101d35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider mb-1 text-black/70">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-black/20 rounded-lg text-base sm:text-sm focus:outline-none focus:border-[#101d35] focus:ring-1 focus:ring-[#101d35]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-1 text-black/70">
                  Area of Interest
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-black/20 rounded-lg text-base sm:text-sm focus:outline-none focus:border-[#101d35] focus:ring-1 focus:ring-[#101d35]"
                >
                  {programmesList.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-1 text-black/70">
                  Preferred Learning Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'In-Person (HSR Layout)',
                    'Online Interactive',
                    'Corporate / Team',
                  ].map((mode) => (
                    <label
                      key={mode}
                      className={`flex items-center gap-2 p-2.5 text-xs rounded-lg border cursor-pointer transition-all ${
                        formData.mode.includes(mode.split(' ')[0])
                          ? 'bg-[#101d35] text-white border-[#101d35]'
                          : 'bg-white text-black/80 border-black/20 hover:border-black/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="mode"
                        checked={formData.mode.includes(mode.split(' ')[0])}
                        onChange={() => setFormData({ ...formData, mode })}
                        className="sr-only"
                      />
                      <span>{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-1 text-black/70">
                  Tell Us About Your Goals (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="E.g., I want to overcome stage fright and improve speaking clarity for work meetings..."
                  className="w-full px-3.5 py-2.5 bg-white border border-black/20 rounded-lg text-sm focus:outline-none focus:border-[#101d35] focus:ring-1 focus:ring-[#101d35]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-flow text-2xl tracking-wider rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-[#25D366]/30"
                >
                  <span>SUBMIT &amp; CHAT ON WHATSAPP ↗</span>
                </button>
                <p className="text-center font-mono text-[11px] text-black/60 mt-2">
                  Submitting will carry your name, contact, and chosen programme directly to WhatsApp (+91 87548 29969)
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#25D366] text-white font-flow text-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#25D366]/30">
              ✓
            </div>
            <h3 className="font-flow text-4xl mb-2 text-[#101d35]">DETAILS READY FOR WHATSAPP!</h3>
            <p className="font-sans text-sm text-black/70 max-w-md mx-auto mb-5">
              Your enquiry has been formatted with all your answers. If WhatsApp didn't open automatically, click the button below to send your message:
            </p>

            {/* Details Summary Preview Box */}
            <div className="text-left bg-white p-4 rounded-xl border border-black/10 text-xs font-mono space-y-1.5 mb-6 max-w-md mx-auto">
              <div className="text-[#101d35] font-bold pb-1 border-b border-black/10 flex justify-between">
                <span>ENQUIRY SUMMARY</span>
                <span className="text-[#25D366]">READY TO SEND</span>
              </div>
              <p><span className="text-black/50">Name:</span> {formData.firstName} {formData.lastName}</p>
              <p><span className="text-black/50">Phone:</span> {formData.phone}</p>
              <p><span className="text-black/50">Email:</span> {formData.email}</p>
              <p><span className="text-black/50">Programme:</span> {formData.area}</p>
              <p><span className="text-black/50">Mode:</span> {formData.mode}</p>
              {formData.message && <p><span className="text-black/50">Note:</span> {formData.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={whatsappUrl || 'https://wa.me/918754829969'}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono text-xs uppercase tracking-wider rounded-xl font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <span>OPEN IN WHATSAPP ↗</span>
              </a>

              <a
                href={mailtoUrl}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#101d35] text-[#d8c29b] font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-[#172b49] transition-all"
              >
                Send via Email ✉
              </a>

              <button
                onClick={() => {
                  setSubmitted(false)
                  onClose()
                }}
                className="w-full sm:w-auto px-5 py-3.5 border border-black/20 rounded-xl font-mono text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
