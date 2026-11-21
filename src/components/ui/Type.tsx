import type { ElementType, ReactNode } from 'react'

/** Splits a heading into masked lines. Pass lines explicitly for art-directed breaks. */
export function Lines({
  lines,
  as: Tag = 'span',
  className = '',
  lineClassName = '',
}: {
  lines: ReactNode[]
  as?: ElementType
  className?: string
  lineClassName?: string
}) {
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask">
          <span className={lineClassName}>{l}</span>
        </span>
      ))}
    </Tag>
  )
}

/** Character split for selected display words. Screen readers get the whole word. */
export function Chars({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`inline-block ${className}`} aria-label={text} role="text">
      {Array.from(text).map((c, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
          <span data-char className="inline-block will-change-transform">
            {c === ' ' ? ' ' : c}
          </span>
        </span>
      ))}
    </span>
  )
}

export function Eyebrow({ children, className = '', tone = 'gold' }: { children: ReactNode; className?: string; tone?: 'gold' | 'muted' }) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${tone === 'gold' ? 'text-gold' : 'opacity-70'} ${className}`}>
      <span aria-hidden className="h-px w-10 bg-current" />
      {children}
    </p>
  )
}
