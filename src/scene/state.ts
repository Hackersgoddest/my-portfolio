// Shared, non-reactive state between the page scripts (scroll timeline, the
// "close your eyes" button, the contact form) and the 3D scene, which reads
// it every frame. Plain numbers keep it free of any framework.

/** The hour the page opens on: before dawn, when the oven is already lit. */
export const PRE_DAWN_HOUR = 4.6;

/** The morning that arrives after someone sends a message. */
export const NEXT_DAWN_HOUR = 30.6; // 06:36 the next day

export const sceneState = {
  /** Hour of the day (0-24) the scroll position maps to. */
  hour: PRE_DAWN_HOUR,
  /** 0 = eyes open, 1 = eyes closed (back to the parents' pre-dawn). */
  eyes: 0,
  /** 0..1 progress from tonight to the next morning. */
  dawn: 0,
  /** Open dialogs: while any is open the scene stops redrawing. */
  overlays: 0,
  /** Project whose card is hovered or focused (its frame lights up), or -1. */
  hover: -1,
  /** Project the camera leans toward while its details are open, or -1. */
  lean: -1,
  /** Hour of a chapter being hovered on the day arc (the camera glances
      toward it), or null. */
  glance: null as number | null,
  /** 0..1 how much a section is being read: the scene softens behind it. */
  reading: 0,
  /** Pointer position, -1..1 from the centre (desktop parallax). */
  pointerX: 0,
  pointerY: 0,
};

/** Dialogs call this on open/close so the GPU can idle behind them. */
export function setOverlayOpen(open: boolean) {
  sceneState.overlays = Math.max(0, sceneState.overlays + (open ? 1 : -1));
  notifySceneState();
}

type Listener = () => void;
const listeners = new Set<Listener>();

export function onSceneStateChange(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function notifySceneState() {
  listeners.forEach((listener) => listener());
}

/** The hour actually shown, once the next-morning transition is applied. */
export function effectiveHour() {
  const { hour, dawn } = sceneState;
  return hour + dawn * (NEXT_DAWN_HOUR - hour);
}
