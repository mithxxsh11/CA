import React, { useState, useEffect } from 'react'
import { X, Send, MessageCircle, CheckCircle, AlertCircle, Sparkles } from 'lucide-react'

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  initialCourse?: string
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialCourse,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'Spoken English & Communication Mastery',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (initialCourse) {
      setFormData((prev) => ({ ...prev, course: initialCourse }))
    }
  }, [initialCourse])

  if (!isOpen) return null

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

    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
    }, 600)
  }

  const handleWhatsAppDirect = () => {
    const text = `Hi Chandni's Academy, my name is ${formData.name || 'there'}. I want to register my interest for: ${formData.course}. ${formData.message ? `Details: ${formData.message}` : ''}`
    window.open(`https://wa.me/918754829969?text=${encodeURIComponent(text)}`, '_blank')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FFFCFA] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#F0E6EB] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-[#F0E6EB] flex items-center justify-center text-[#737373] hover:text-[#171717] hover:border-[#C94BD9] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <CheckCircle className="w-14 h-14 text-[#0f8b54] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#171717] mb-2">Registration Received!</h3>
            <p className="text-sm text-[#737373] mb-6 max-w-sm mx-auto">
              Thank you, <strong className="text-[#171717]">{formData.name}</strong>. We have noted your interest in{' '}
              <strong className="text-[#171717]">{formData.course}</strong>. Chandni’s Academy admissions will contact you shortly.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3.5 rounded-full text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Continue on WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-full text-sm font-semibold text-[#171717] bg-white border border-[#F0E6EB] hover:bg-[#F9D9F2]/30 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-[#F9D9F2] text-[#A52ABF] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A52ABF]">
                CHANDNI’S ACADEMY ADMISSIONS
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[#171717] mb-2">
              Register Your Interest
            </h3>
            <p className="text-xs sm:text-sm text-[#737373] mb-6">
              Take the first step toward confident communication and personal growth in Bengaluru.
            </p>

            {status === 'error' && (
              <div className="mb-4 p-3 rounded-xl bg-[#ea384c]/10 border border-[#ea384c]/30 flex items-center gap-2 text-xs text-[#ea384c]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priya Sundaram"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#F0E6EB] bg-white text-sm text-[#171717] focus:outline-none focus:border-[#A52ABF] focus:ring-1 focus:ring-[#A52ABF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#F0E6EB] bg-white text-sm text-[#171717] focus:outline-none focus:border-[#A52ABF] focus:ring-1 focus:ring-[#A52ABF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="priya@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#F0E6EB] bg-white text-sm text-[#171717] focus:outline-none focus:border-[#A52ABF] focus:ring-1 focus:ring-[#A52ABF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Selected Course
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#F0E6EB] bg-white text-sm text-[#171717] focus:outline-none focus:border-[#A52ABF]"
                >
                  {coursesList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Notes or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you hope to achieve..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#F0E6EB] bg-white text-sm text-[#171717] focus:outline-none focus:border-[#A52ABF] resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex-1 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#F2A12A] to-[#E08B12] hover:from-[#e5951c] hover:to-[#cf7c0a] shadow-md shadow-[#F2A12A]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>{status === 'submitting' ? 'Submitting...' : 'Submit Registration'}</span>
                  <Send className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="px-5 py-3.5 rounded-full text-sm font-semibold text-[#0f8b54] bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 flex items-center justify-center gap-2 cursor-pointer"
                  title="Send directly on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
