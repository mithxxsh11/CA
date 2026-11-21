import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'expo.out', duration: 1.2 })

export { gsap, ScrollTrigger }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Motion only runs when the visitor has not asked for reduced motion. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

/**
 * Scoped GSAP setup that cleans up on unmount and is skipped entirely
 * under prefers-reduced-motion (content is visible by default).
 */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: (el: HTMLElement) => void, deps: unknown[] = []) {
  useLayoutEffect(() => {
    const el = scope.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => setup(el), el)
      return () => ctx.revert()
    })
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Shared scroll-reveal vocabulary. Inside a section, mark elements with:
 *   data-reveal="up"      fade + rise
 *   data-reveal="lines"   children .line-mask > span rise line by line
 *   data-reveal="chars"   [data-char] spans rise character by character
 *   data-reveal="clip-x"  horizontal image wipe
 *   data-reveal="clip-y"  vertical image wipe
 *   data-reveal="rule"    gold line draws from the left
 *   data-reveal="stagger" direct children rise in sequence
 */
export function revealIn(root: HTMLElement) {
  const st = (trigger: Element, start = 'top 85%') => ({ trigger, start, once: true })

  root.querySelectorAll<HTMLElement>('[data-reveal="up"]').forEach((el) => {
    gsap.from(el, { y: 36, opacity: 0, duration: 1.3, scrollTrigger: st(el) })
  })
  root.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
    gsap.from(el.querySelectorAll('.line-mask > span'), {
      yPercent: 110,
      duration: 1.3,
      stagger: 0.1,
      scrollTrigger: st(el),
    })
  })
  root.querySelectorAll<HTMLElement>('[data-reveal="chars"]').forEach((el) => {
    gsap.from(el.querySelectorAll('[data-char]'), {
      yPercent: 105,
      opacity: 0,
      duration: 1.1,
      stagger: 0.035,
      scrollTrigger: st(el, 'top 88%'),
    })
  })
  root.querySelectorAll<HTMLElement>('[data-reveal="clip-x"]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: st(el, 'top 80%') },
    )
  })
  root.querySelectorAll<HTMLElement>('[data-reveal="clip-y"]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: st(el, 'top 82%') },
    )
  })
  root.querySelectorAll<HTMLElement>('[data-reveal="rule"]').forEach((el) => {
    gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 1.6, ease: 'expo.inOut', scrollTrigger: st(el, 'top 90%') })
  })
  root.querySelectorAll<HTMLElement>('[data-reveal="stagger"]').forEach((el) => {
    gsap.from(el.children, { y: 28, opacity: 0, duration: 1.1, stagger: 0.08, scrollTrigger: st(el) })
  })
}

/** Gentle parallax on a plate's inner layer while its frame scrolls past. */
export function parallax(frame: Element, amount = 10) {
  const inner = frame.querySelector('[data-plate-inner]')
  if (!inner) return
  gsap.fromTo(
    inner,
    { yPercent: -amount / 2 },
    { yPercent: amount / 2, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } },
  )
}
