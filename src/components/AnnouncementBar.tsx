import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONTACT } from '../data/content'

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 28, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-[70] overflow-hidden bg-[#EFECE6]/90 border-b border-[#141414]/10 backdrop-blur-md"
        >
          <div className="container-x flex h-7 items-center justify-between text-[10.5px] font-mono tracking-[0.24em] uppercase text-[#141414]/70">
            <span className="hidden sm:inline-block text-[#141414]/40">HSR LAYOUT · BENGALURU</span>
            <div className="mx-auto flex items-center gap-3 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f06b83] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f06b83]" />
              </span>
              <span>WHERE EXCELLENCE MEETS EXPRESSION</span>
            </div>
            <a
              href={CONTACT.phoneHref}
              className="hidden sm:inline-block hover:text-[#141414] transition-colors"
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
