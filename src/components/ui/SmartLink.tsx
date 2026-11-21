import type { AnchorHTMLAttributes } from 'react'
import { handleSmartAnchor } from '../../lib/events'

/** Anchor that understands pillar-aware links such as #programmes-lead. */
export function SmartLink({ href = '#', onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e)
        if (handleSmartAnchor(href)) e.preventDefault()
      }}
      {...rest}
    />
  )
}
