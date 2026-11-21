import type { CSSProperties } from 'react'
import { IMAGES, type ImageEntry, type ImageKey, type Tone } from '../../data/images'

const TONES: Record<Tone, { base: string; bloom: string; shaft: string; ink: string; floor: string }> = {
  night: {
    base: 'linear-gradient(160deg,#1b3157 0%,#132544 45%,#0b1528 100%)',
    bloom: 'rgba(216,194,155,0.38)',
    shaft: 'rgba(248,246,241,0.07)',
    ink: 'rgba(248,246,241,0.72)',
    floor: 'rgba(7,13,26,0.65)',
  },
  dusk: {
    base: 'linear-gradient(170deg,#2a3a55 0%,#1c2b45 50%,#121d33 100%)',
    bloom: 'rgba(232,196,150,0.42)',
    shaft: 'rgba(255,236,206,0.08)',
    ink: 'rgba(248,246,241,0.75)',
    floor: 'rgba(10,17,32,0.55)',
  },
  warm: {
    base: 'linear-gradient(165deg,#c9b38c 0%,#9c8460 40%,#3b3a3f 100%)',
    bloom: 'rgba(255,240,214,0.55)',
    shaft: 'rgba(255,248,235,0.12)',
    ink: 'rgba(255,252,246,0.85)',
    floor: 'rgba(23,32,52,0.55)',
  },
  ivory: {
    base: 'linear-gradient(170deg,#efe9de 0%,#ddd3c2 55%,#b9ad98 100%)',
    bloom: 'rgba(255,255,255,0.75)',
    shaft: 'rgba(255,255,255,0.25)',
    ink: 'rgba(23,43,73,0.7)',
    floor: 'rgba(23,43,73,0.22)',
  },
}

type Props = {
  image: ImageKey
  className?: string
  /** Shows the art-direction brief on placeholder plates */
  caption?: boolean
  /** Loads eagerly (use for the hero only) */
  priority?: boolean
  /** Extra scale on the inner layer so parallax never reveals edges */
  overscan?: boolean
  sizes?: string
  style?: CSSProperties
  /** Optional overrides so repeated plates feel distinct */
  word?: string
  light?: [number, number]
}

/**
 * Renders the real photograph when the manifest has a `src`, otherwise a
 * lit, grained, art-directed plate that holds the layout and the brief.
 */
export function PhotoPlate({ image, className = '', caption = true, priority, overscan, sizes, style, word, light }: Props) {
  const entry: ImageEntry = IMAGES[image]
  const t = TONES[entry.tone]
  const [lx, ly] = light ?? entry.light ?? [50, 20]

  return (
    <div className={`relative overflow-hidden ${className}`} style={style} data-plate>
      <div
        data-plate-inner
        className="absolute inset-0 will-change-transform"
        style={{ transform: overscan ? 'scale(1.12)' : undefined }}
      >
        {entry.src ? (
          <img
            src={entry.src}
            srcSet={entry.srcSet}
            sizes={sizes ?? '100vw'}
            alt={entry.alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={entry.alt}
            className="grain absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 60% 55% at ${lx}% ${ly}%, ${t.bloom}, transparent 70%), ${t.base}`,
            }}
          >
            {/* window light falling across the room */}
            <div
              className="absolute inset-[-20%]"
              style={{
                background: `repeating-linear-gradient(${lx > 50 ? 112 : 68}deg, transparent 0 7%, ${t.shaft} 7% 11%, transparent 11% 19%)`,
                filter: 'blur(14px)',
                transformOrigin: `${lx}% ${ly}%`,
              }}
            />
            {/* floor plane */}
            <div className="absolute inset-x-0 bottom-0 h-[42%]" style={{ background: `linear-gradient(to top, ${t.floor}, transparent)` }} />
            {/* editorial word */}
            <span
              aria-hidden
              className="font-display absolute bottom-[14%] left-[7%] select-none italic leading-none"
              style={{ color: t.ink, opacity: 0.16, fontSize: 'clamp(56px, 11vw, 190px)' }}
            >
              {word ?? entry.word}
            </span>
          </div>
        )}
      </div>

      {/* inner gold hairline */}
      <div aria-hidden className="pointer-events-none absolute inset-3 border border-champagne/25 sm:inset-4" />

      {!entry.src && caption && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center gap-3 font-ui text-[11px] tracking-[0.16em] uppercase sm:bottom-7 sm:left-7"
          style={{ color: t.ink }}
        >
          <span className="h-px w-6 bg-current opacity-60" />
          <span className="truncate">Photography · {entry.brief}</span>
        </div>
      )}
    </div>
  )
}
