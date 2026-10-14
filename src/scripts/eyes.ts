import { animate } from "motion";
import { notifySceneState, sceneState } from "../scene/state";
import { setScrollLocked } from "../lib/scroll";

// "Close your eyes": while the button is held, the page fades away and the
// scene goes back to the parents' pre-dawn. Letting go brings everything back.
//
// Pointer: press and hold. Keyboard: hold Space or Enter while it's focused.
// Assistive tech that sends a plain click (no press) toggles it instead.

const root = document.documentElement;
const button = document.querySelector<HTMLButtonElement>(".eyes-button");
const HINT_KEY = "eyes-hint-seen";
const CLOSE_SECONDS = 1.8;
const OPEN_SECONDS = 0.9;
const TAP_MS = 250;

let animation: { stop: () => void } | null = null;
let closed = false;
let pressedAt = 0;
let pointerHeld = false;

function setEyes(close: boolean) {
  if (close === closed) return;
  closed = close;
  root.classList.toggle("eyes-closed", close);
  button?.setAttribute("aria-pressed", String(close));
  setScrollLocked(close);

  animation?.stop();
  const target = close ? 1 : 0;
  const remaining = Math.abs(target - sceneState.eyes);
  animation = animate(sceneState.eyes, target, {
    duration: (close ? CLOSE_SECONDS : OPEN_SECONDS) * Math.max(remaining, 0.2),
    ease: close ? [0.3, 0, 0.2, 1] : [0.4, 0, 0.2, 1],
    onUpdate: (value) => {
      sceneState.eyes = value;
      notifySceneState();
    },
  });
}

function rememberHint() {
  try {
    localStorage.setItem(HINT_KEY, "1");
  } catch {
    // Storage unavailable; the hint just keeps showing.
  }
  button?.classList.remove("eyes-button--hint");
}

function nudgeHint() {
  if (!button) return;
  button.classList.add("eyes-button--hint", "eyes-button--nudge");
  setTimeout(() => button.classList.remove("eyes-button--nudge"), 900);
}

if (button) {
  try {
    if (!localStorage.getItem(HINT_KEY)) button.classList.add("eyes-button--hint");
  } catch {
    button.classList.add("eyes-button--hint");
  }

  button.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    button.setPointerCapture(event.pointerId);
    pointerHeld = true;
    pressedAt = performance.now();
    setEyes(true);
  });

  const release = () => {
    if (!pointerHeld) return;
    pointerHeld = false;
    const held = performance.now() - pressedAt;
    setEyes(false);
    if (held < TAP_MS) nudgeHint();
    else if (held > 900) rememberHint();
  };
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("lostpointercapture", release);
  button.addEventListener("contextmenu", (event) => event.preventDefault());

  button.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      if (!event.repeat) setEyes(true);
    } else if (event.key === "Escape") {
      setEyes(false);
    }
  });
  button.addEventListener("keyup", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setEyes(false);
      rememberHint();
    }
  });

  // A click with no pointer press behind it comes from assistive tech.
  button.addEventListener("click", (event) => {
    if (event.detail === 0 && !pointerHeld) setEyes(!closed);
  });

  button.addEventListener("blur", () => {
    if (!pointerHeld) setEyes(false);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) setEyes(false);
  });
  addEventListener("keydown", (event) => {
    if (event.key === "Escape") setEyes(false);
  });

  // From the palette: there's no button to hold, so it toggles (Escape,
  // any click, or the palette again opens them).
  addEventListener("portfolio:toggle-eyes", () => {
    setEyes(!closed);
    if (closed) setTimeout(() => addEventListener("pointerdown", () => setEyes(false), { once: true }), 0);
  });
}
