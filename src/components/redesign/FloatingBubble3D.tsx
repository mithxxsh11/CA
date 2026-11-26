import React from 'react'
import { motion } from 'framer-motion'

export interface FloatingBubble3DProps {
  size?: number
  variant?: 'amber' | 'pearl'
  className?: string
  driftY?: number
  driftX?: number
  duration?: number
  delay?: number
  showPulseCore?: boolean
  opacity?: number
}

/**
 * Renders a volumetric 3D glass sphere with specular catchlights,
 * Fresnel bounce light, and gentle floating motion.
 */
export const FloatingBubble3D: React.FC<FloatingBubble3DProps> = ({
  size = 84,
  variant = 'amber',
  className = '',
  driftY = 14,
  driftX = 6,
  duration = 7,
  delay = 0,
  showPulseCore = false,
  opacity = 0.92,
}) => {
  const sphereClass = variant === 'pearl' ? 'sphere-3d-pearl' : 'sphere-3d-amber'

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity,
        scale: [1, 1.03, 0.98, 1],
        y: [0, -driftY, driftY * 0.4, 0],
        x: [0, driftX, -driftX * 0.5, 0],
      }}
      transition={{
        opacity: { duration: 1.1, delay },
        scale: { duration: duration * 1.15, repeat: Infinity, ease: 'easeInOut', delay },
        y: { duration, repeat: Infinity, ease: 'easeInOut', delay },
        x: { duration: duration * 1.3, repeat: Infinity, ease: 'easeInOut', delay },
      }}
      style={{ width: size, height: size }}
      className={`rounded-full pointer-events-none select-none relative flex items-center justify-center ${sphereClass} ${className}`}
    >
      {/* Crisp curved top-left glossy window reflection */}
      <span
        style={{
          width: Math.max(10, size * 0.34),
          height: Math.max(6, size * 0.18),
          top: '13%',
          left: '17%',
        }}
        className="absolute rounded-full bg-white/85 -rotate-30 blur-[1px]"
      />

      {/* Subtle secondary specular pinpoint */}
      <span
        style={{
          width: Math.max(4, size * 0.09),
          height: Math.max(4, size * 0.09),
          top: '28%',
          left: '14%',
        }}
        className="absolute rounded-full bg-white/90"
      />

      {/* Soft ground / lower ambient caustic rim */}
      <span
        style={{
          width: Math.max(12, size * 0.45),
          height: Math.max(5, size * 0.12),
          bottom: '10%',
          right: '18%',
        }}
        className="absolute rounded-full bg-[#FFE6A7]/55 -rotate-20 blur-[2px]"
      />

      {showPulseCore && (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/85 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white/95 shadow-sm" />
        </span>
      )}
    </motion.div>
  )
}
