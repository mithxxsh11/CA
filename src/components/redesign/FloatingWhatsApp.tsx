import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.75, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 right-5 z-40 flex items-center justify-end"
      aria-label="Direct WhatsApp Contact"
    >
      {/* Smooth Animated Tooltip popping to the left */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mr-3 px-3.5 py-2 rounded-xl bg-[#171717] text-white text-xs font-medium shadow-lg whitespace-nowrap pointer-events-none hidden sm:block"
          >
            <span>Chat with Admissions on WhatsApp</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        href="https://wa.me/918754829969?text=Hi%20Chandni's%20Academy,%20I%20would%20like%20to%20enquire%20about%20your%20communication%20courses."
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-colors duration-200 group relative"
        aria-label="Chat with Chandni's Academy on WhatsApp"
        title="WhatsApp: +91 87548 29969"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-xs">
          <span className="w-2.5 h-2.5 bg-[#F2A12A] rounded-full animate-ping" />
          <span className="absolute w-2 h-2 bg-[#F2A12A] rounded-full" />
        </span>
        <MessageCircle className="w-7 h-7 fill-current" />
      </motion.a>
    </motion.aside>
  )
}
