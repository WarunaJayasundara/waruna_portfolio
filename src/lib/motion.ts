import Lenis from 'lenis';

// One place for everything scroll-driven:
//  - Lenis smooth scrolling (skipped when the visitor prefers reduced motion)
//  - a single rAF loop that writes a 0→1 progress value (--p) onto every
//    element with [data-scroll], so CSS can drive scale/parallax from it.

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;
let started = false;

export function startMotion() {
  if (started) return;
  started = true;

  if (!prefersReducedMotion()) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.95 });
  }

  // Scroll effects are recomputed only after a scroll or resize event, never by
  // polling, so idle frames do no layout work.
  let dirty = true;
  const markDirty = () => { dirty = true; };
  window.addEventListener('scroll', markDirty, { passive: true });
  window.addEventListener('resize', markDirty);
  const tick = (time: number) => {
    lenis?.raf(time);
    if (dirty) {
      dirty = false;
      updateScrollProgress();
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  // Re-measure once everything (fonts, images) has settled.
  window.addEventListener('load', markDirty, { once: true });
}

/** Smoothly scroll to an element (or the top) and respect reduced motion. */
export function scrollToTarget(target: HTMLElement | number, immediate = false) {
  const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY - pad;
  if (lenis && !immediate) {
    lenis.scrollTo(top);
    return;
  }
  // Instant jumps (e.g. opening a /#contact link) go through the native API,
  // which works on every device; Lenis then picks up the new position.
  window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
  lenis?.scrollTo(top, { immediate: true, force: true });
}

// Progress is 0 when the element's top touches the bottom of the viewport and
// 1 when its centre reaches the centre of the viewport (clamped).
function updateScrollProgress() {
  const vh = window.innerHeight;
  const nodes = document.querySelectorAll<HTMLElement>('[data-scroll]');
  for (const el of nodes) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -vh || r.top > vh * 2) continue;
    const start = vh;
    const end = vh / 2 - r.height / 2;
    const p = Math.min(1, Math.max(0, (start - r.top) / (start - end || 1)));
    const prev = el.dataset.p;
    const next = p.toFixed(3);
    if (prev !== next) {
      el.dataset.p = next;
      el.style.setProperty('--p', next);
    }
  }
}
