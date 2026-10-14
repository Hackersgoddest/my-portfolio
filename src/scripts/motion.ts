import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { animate, inView } from "motion";
import { setLenis } from "../lib/scroll";

// Smooth scrolling + scroll reveals. (The hero/nav entrance is plain CSS in
// style.css so it doesn't wait on this script.) Motion runs these on the Web
// Animations API, so the transform/opacity tweens are composited off the
// main thread.
type Bezier = [number, number, number, number];
const EASE_OUT_CUBIC: Bezier = [0.33, 1, 0.68, 1];
const EASE_OUT_QUART: Bezier = [0.25, 1, 0.5, 1];

interface RevealOptions {
  y: number;
  scale?: number;
  duration: number;
  /** Extra delay per item, in seconds - staggers a group by DOM order. */
  step?: number;
  ease?: Bezier;
}

const root = document.documentElement;
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fades/lifts each match in as it scrolls into view, and back out when the
    user scrolls back up above it - but not when it leaves off the top. */
function reveal(selector: string, { y, scale = 0.95, duration, step = 0, ease = EASE_OUT_CUBIC }: RevealOptions) {
  const hidden = `translateY(${y}px) scale(${scale})`;
  const shown = "translateY(0px) scale(1)";

  document.querySelectorAll<HTMLElement>(selector).forEach((el, i) => {
    inView(
      el,
      () => {
        animate(el, { opacity: [0, 1], transform: [hidden, shown] }, { duration, delay: i * step, ease });

        return (entry) => {
          if (entry.boundingClientRect.top > 0) {
            animate(el, { opacity: 0, transform: hidden }, { duration: duration * 0.6, ease });
          }
        };
      },
      // Fires once the element's top crosses 85% of the viewport height.
      { margin: "0px 0px -15% 0px" }
    );
  });
}

function initSmoothScrolling() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
    autoRaf: true,
  });
  setLenis(lenis);
}

function initSectionReveals() {
  reveal(".section-header", { y: 60, duration: 1, ease: EASE_OUT_QUART });
  reveal(".service-row", { y: 40, duration: 0.8, step: 0.08 });
  reveal(".project-row", { y: 60, duration: 0.9, step: 0.1 });
  reveal(".skill-item", { y: 30, duration: 0.6, step: 0.02 });
  reveal(".contact-item", { y: 40, duration: 0.8, step: 0.1 });
}

// Tells the inline head script the motion layer arrived, so it keeps the
// pre-hidden reveal state instead of falling back to showing everything.
root.dataset.motion = "ready";

if (!prefersReducedMotion) {
  initSmoothScrolling();
  initSectionReveals();
}
