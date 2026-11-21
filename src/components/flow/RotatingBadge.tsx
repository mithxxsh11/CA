import React from 'react'

interface RotatingBadgeProps {
  text?: string
  centerText?: string
  size?: 'sm' | 'md' | 'lg' | 'responsive'
  theme?: 'dark' | 'light' | 'gold'
  className?: string
  reverse?: boolean
}

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({
  text = 'WHERE EXCELLENCE MEETS EXPRESSION • CHANDNI\'S ACADEMY • ',
  centerText = 'EXPRESS',
  size = 'md',
  theme = 'dark',
  className = '',
  reverse = false,
}) => {
  const sizeMap = {
    sm: 'w-24 h-24 text-[9px]',
    md: 'w-36 h-36 md:w-44 md:h-44 text-[11px]',
    lg: 'w-48 h-48 md:w-60 md:h-60 text-[13px]',
    responsive: 'w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 text-[9px] sm:text-[11px]',
  }

  const themeMap = {
    dark: 'text-[#141414] border-[#141414]/20 bg-[#efece6]/90',
    light: 'text-[#efece6] border-[#efece6]/25 bg-[#101d35]/90',
    gold: 'text-[#d8c29b] border-[#d8c29b]/30 bg-[#101d35]/95',
  }

  return (
    <div
      className={`relative rounded-full flex items-center justify-center select-none shadow-lg backdrop-blur-md border ${sizeMap[size]} ${themeMap[theme]} ${className}`}
      aria-hidden="true"
    >
      {/* Center Word */}
      <div className="font-flow text-center font-bold tracking-wider z-10 text-xs md:text-sm">
        {centerText}
      </div>

      {/* Rotating SVG circular text path */}
      <svg
        className={`absolute inset-0 w-full h-full ${
          reverse ? 'animate-spin-badge-reverse' : 'animate-spin-badge'
        }`}
        viewBox="0 0 200 200"
      >
        <path
          id="badgeCirclePath"
          d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          fill="none"
        />
        <text className="font-mono uppercase font-semibold tracking-[0.22em] fill-current">
          <textPath href="#badgeCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
