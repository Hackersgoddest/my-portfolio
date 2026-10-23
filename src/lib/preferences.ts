// One motion preference for the whole site: motion is on unless the visitor's
// system asks for reduced motion, or they've switched the site to Still mode
// (WCAG 2.2.2 / 2.3.3: animation must be stoppable without an OS setting).
// The inline <head> script reads the same storage key before first paint.

const KEY = "still-mode";
const listeners = new Set<() => void>();
let still: boolean | null = null;

function readStored() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false; // storage blocked: default to motion on
  }
}

export function isStill() {
  if (typeof window === "undefined") return false;
  if (still === null) still = readStored();
  return still;
}

export function systemReducedMotion() {
  return typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True when animation, smooth scrolling and camera moves are allowed. */
export function motionOK() {
  return !isStill() && !systemReducedMotion();
}

export function setStill(value: boolean) {
  still = value;
  try {
    localStorage.setItem(KEY, value ? "1" : "0");
  } catch {
    // Storage unavailable: the choice lasts for this visit only.
  }
  document.documentElement.classList.toggle("still", value);
  listeners.forEach((listener) => listener());
}

export function onMotionPreferenceChange(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
