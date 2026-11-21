import type { PillarId } from '../data/content'

/* Tiny cross-section event bus: CTA buttons anywhere can preselect a
   programme tab or prefill the enquiry form, then scroll to it. */

export const EVT_PILLAR_TAB = 'ca:pillar-tab'
export const EVT_ENQUIRE = 'ca:enquire'

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

export function openProgrammes(pillar: PillarId) {
  window.dispatchEvent(new CustomEvent(EVT_PILLAR_TAB, { detail: pillar }))
  scrollToId('programmes')
}

export function enquireAbout(programme: string) {
  window.dispatchEvent(new CustomEvent(EVT_ENQUIRE, { detail: programme }))
  scrollToId('contact')
}

/** Resolves pillar-aware anchors like #programmes-communicate. */
export function handleSmartAnchor(href: string): boolean {
  const m = href.match(/^#programmes-(communicate|confidence|lead)$/)
  if (m) {
    openProgrammes(m[1] as PillarId)
    return true
  }
  return false
}
