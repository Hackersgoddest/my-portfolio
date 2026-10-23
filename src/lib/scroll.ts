import type Lenis from "lenis";

// The motion script registers its Lenis instance here, so navigation
// (src/lib/chapters.ts) and scroll locking can reach it from any island.
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

/** Freezes the page in place (used while the visitor's eyes are closed). */
export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
