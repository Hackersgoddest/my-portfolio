import type Lenis from "lenis";

// Navigation lives in separate islands (menu, hero, footer, command palette)
// that can't emit events to each other, so they all scroll through this one
// module instead. The motion script registers its Lenis instance here.
let lenis: Lenis | null = null;

const NAV_OFFSET = 80;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToSection(key: string) {
  const target = document.getElementById(key);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { offset: -NAV_OFFSET });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
