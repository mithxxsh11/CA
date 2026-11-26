import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const SERENE_EASE = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

/**
 * Peaceful scroll-triggered entrance with silky easing and zero harsh snap.
 */
export const PeacefulReveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  y = 22,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.72, delay, ease: SERENE_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

/**
 * Coordinates calm, sequential entrance for grids and lists.
 */
export const StaggerGrid: React.FC<StaggerProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggerCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.985 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.65, ease: SERENE_EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * High-contrast top scroll progress bar bridging purple into radiant golden amber with amber glow.
 */
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[3.5px] z-[60] bg-gradient-to-r from-[#A52ABF] via-[#F2A12A] to-[#FFAA29] shadow-[0_1px_8px_rgba(242,161,42,0.6)] pointer-events-none"
    />
  )
}
