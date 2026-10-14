import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { animate, inView, scroll } from "motion";
import { setLenis } from "../lib/scroll";
import { motionOK, onMotionPreferenceChange } from "../lib/preferences";
import { addTick } from "../lib/ticker";

// Smooth scrolling, one-time reveals and the glass panels' depth. (The hero
// and nav entrance is plain CSS in style.css so it doesn't wait on this
// script.) Everything here switches off together for reduced motion or the
// site's Still mode, and back on if Still mode is turned off again.

type Bezier = [number, number, number, number];
const EASE_OUT_CUBIC: Bezier = [0.33, 1, 0.68, 1];

interface RevealOptions {
  y: number;
  duration: number;
  /** Extra delay per item, in seconds - staggers a group by DOM order. */
  step?: number;
}

const root = document.documentElement;
const REVEAL_TARGETS = ".section-header, .service-row, .project-row, .skill-item, .contact-item";

let lenis: Lenis | null = null;
const stops: Array<() => void> = [];

/** Lifts each match in once as it scrolls into view, then leaves it alone. */
function reveal(selector: string, { y, duration, step = 0 }: RevealOptions) {
  document.querySelectorAll<HTMLElement>(selector).forEach((el, i) => {
    if (el.dataset.revealed) return;
    const stop = inView(
      el,
      () => {
        el.dataset.revealed = "true";
        animate(
          el,
          { opacity: [0, 1], transform: [`translateY(${y}px)`, "translateY(0px)"] },
          { duration, delay: Math.min(i * step, 0.4), ease: EASE_OUT_CUBIC }
        );
        stop();
      },
      // Fires once the element's top crosses 88% of the viewport height.
      { margin: "0px 0px -12% 0px" }
    );
    stops.push(stop);
  });
}

/** Glass panels have a little depth: they rise out of the scene on arrival,
    lie flat while being read, and tip back as they leave - never more than
    a few degrees. Driven by scroll position (a native ScrollTimeline where
    the browser has one, so it stays smooth when the main thread is busy). */
function initDepth() {
  document.querySelectorAll<HTMLElement>(".glass-panel, .slate, .letter").forEach((el) => {
    const animation = animate(
      el,
      {
        transform: [
          "perspective(1400px) rotateX(4deg) translateY(24px)",
          "perspective(1400px) rotateX(0deg) translateY(0px)",
          "perspective(1400px) rotateX(0deg) translateY(0px)",
          "perspective(1400px) rotateX(-3deg) translateY(-16px)",
        ],
      },
      { ease: "linear", times: [0, 0.3, 0.7, 1] }
    );
    stops.push(scroll(animation, { target: el, offset: ["start end", "end start"] }));
    stops.push(() => animation.cancel());
  });
}

/** Signboards swing in on their nails as they arrive, like a sign caught
    by the wind, then hang still while they're read. */
function initSignboards() {
  document.querySelectorAll<HTMLElement>(".signboard").forEach((sign) => {
    const board = sign.querySelector<HTMLElement>(".signboard__board");
    if (!board) return;
    const animation = animate(
      board,
      { transform: ["rotateY(-26deg)", "rotateY(0deg)", "rotateY(0deg)", "rotateY(6deg)"] },
      { ease: "linear", times: [0, 0.35, 0.75, 1] }
    );
    stops.push(scroll(animation, { target: sign, offset: ["start end", "end start"] }));
    stops.push(() => animation.cancel());
  });
}

/** Desktop: things that are objects (the brass nameplate) tilt toward the
    pointer, with a highlight that moves across them. */
function initTilt() {
  if (!matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll<HTMLElement>(".tilt3d").forEach((el) => {
    const move = (event: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${x * 12}deg`);
      el.style.setProperty("--rx", `${-y * 10}deg`);
      el.style.setProperty("--sx", `${(x + 0.5) * 100}%`);
      el.style.setProperty("--sy", `${(y + 0.5) * 100}%`);
    };
    const leave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    stops.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      leave();
    });
  });
}

function start() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
    autoRaf: false, // driven by the shared ticker, ahead of the scene
  });
  const instance = lenis;
  stops.push(addTick((now) => instance.raf(now), { first: true }));
  setLenis(lenis);
  // (No re-adding .js here: when motion comes back on after Still mode,
  // pre-hiding would hide items that have already been revealed.)
  reveal(".section-header", { y: 24, duration: 0.9 });
  reveal(".service-row", { y: 16, duration: 0.7, step: 0.08 });
  reveal(".project-row", { y: 20, duration: 0.8 });
  reveal(".skill-item", { y: 12, duration: 0.6, step: 0.04 });
  reveal(".contact-item", { y: 16, duration: 0.7, step: 0.08 });
  initDepth();
  initSignboards();
  initTilt();
}

/** Still mode: everything visible and in place, native scrolling. */
function stopAll() {
  stops.splice(0).forEach((stop) => stop());
  lenis?.destroy();
  lenis = null;
  setLenis(null);
  root.classList.remove("js");
  document.querySelectorAll<HTMLElement>(REVEAL_TARGETS).forEach((el) => {
    el.style.opacity = "";
    el.style.transform = "";
  });
}

// Tells the inline head script the motion layer arrived, so it keeps the
// pre-hidden reveal state instead of falling back to showing everything.
root.dataset.motion = "ready";

if (motionOK()) start();

onMotionPreferenceChange(() => {
  if (motionOK() && !lenis) start();
  else if (!motionOK() && lenis) stopAll();
});
