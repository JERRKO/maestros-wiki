const REVEAL_SELECTOR =
  '.mn-hero, .mn-onboarding, .mn-index-list, .mn-side-grid, .mn-map-card, .vp-doc h2, .vp-doc .custom-block, .vp-doc table, .mn-banner, .mn-grid, .mn-stack, .rules-jump-grid, .mn-team-grid, .VPDocFooter .pager-link'

let progressInitialized = false
let revealObserver: IntersectionObserver | null = null

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Updates top reading-progress hairline bar via GPU scaleX transform. */
export function updateReadingProgress(): void {
  if (typeof document === 'undefined') return
  const bar = document.querySelector<HTMLElement>('.mn-progress-bar')
  if (!bar) return

  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight
  if (scrollable <= 64) {
    bar.style.opacity = '0'
    bar.style.transform = 'scaleX(0)'
    return
  }

  const ratio = Math.min(1, Math.max(0, window.scrollY / scrollable))
  bar.style.opacity = ratio > 0.01 ? '1' : '0'
  bar.style.transform = `scaleX(${ratio.toFixed(4)})`
}

export function initReadingProgress(): void {
  if (progressInitialized || typeof window === 'undefined') return
  progressInitialized = true

  let rafId = 0
  const onScroll = () => {
    if (rafId) return
    rafId = window.requestAnimationFrame(() => {
      rafId = 0
      updateReadingProgress()
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  updateReadingProgress()
}

/** Applies subtle entry for below-the-fold blocks while keeping above-fold immediate. */
export function refreshScrollReveal(): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  revealObserver?.disconnect()
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
  if (!nodes.length) return

  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    for (const el of nodes) {
      el.classList.remove('mn-reveal')
      el.classList.add('is-visible')
    }
    return
  }

  const foldThreshold = window.innerHeight + 60
  let aboveCount = 0

  revealObserver = new IntersectionObserver(
    (entries) => {
      let batchIdx = 0
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        el.style.setProperty('--reveal-delay', `${Math.min(batchIdx * 35, 140)}ms`)
        el.classList.add('is-visible')
        revealObserver?.unobserve(el)
        batchIdx++
      }
    },
    { threshold: 0.01, rootMargin: '0px 0px 40px 0px' }
  )

  for (const el of nodes) {
    const rect = el.getBoundingClientRect()
    if (rect.top < foldThreshold) {
      el.classList.remove('mn-reveal')
      el.style.setProperty('--enter-delay', `${Math.min(aboveCount * 30, 150)}ms`)
      el.classList.add('mn-enter-above')
      aboveCount++
    } else if (!el.classList.contains('is-visible')) {
      el.classList.add('mn-reveal')
      revealObserver.observe(el)
    }
  }
}

/** Runs subtle editorial page transition animation on SPA route navigation. */
export function playPageTransition(): void {
  if (typeof document === 'undefined' || prefersReducedMotion()) return
  const docEl = document.querySelector<HTMLElement>('.vp-doc')
  if (!docEl) return

  docEl.classList.remove('mn-page-enter')
  void docEl.offsetWidth
  docEl.classList.add('mn-page-enter')
}
