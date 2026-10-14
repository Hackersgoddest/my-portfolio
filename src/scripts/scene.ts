import { animate } from "motion";
import { createDayTimeline } from "../scene/timeline";
import { effectiveHour, notifySceneState, onSceneStateChange, PRE_DAWN_HOUR, sceneState } from "../scene/state";
import type { FrameRect, Tier } from "../scene/doorstep";
import projects from "../data/projects";
import { projectHour } from "../scene/hours";
import { motionOK, onMotionPreferenceChange } from "../lib/preferences";

// Decides between the live 3D doorstep and the pre-rendered stills, then
// keeps both in step with the scroll-driven hour of the day.

const root = document.documentElement;
const layer = document.querySelector<HTMLElement>(".scene-layer");
let canvas = layer?.querySelector<HTMLCanvasElement>("canvas") ?? null;
const posters = [...(layer?.querySelectorAll<HTMLImageElement>("img[data-poster-hour]") ?? [])];
const posterHours = posters.map((img) => Number(img.dataset.posterHour));

const params = new URLSearchParams(location.search);
const posterMode = params.has("scene-poster");

/* Stills ------------------------------------------------------------------ */

let livePosters = false;

/** Crossfade the stills to the current hour (used whenever 3D isn't running). */
function showPosterFor(hour: number) {
  if (!livePosters) return;
  const h = Math.min(Math.max(hour, posterHours[0]), posterHours[posterHours.length - 1]);
  posters.forEach((img, i) => {
    const prev = posterHours[i - 1] ?? -Infinity;
    const next = posterHours[i + 1] ?? Infinity;
    const at = posterHours[i];
    let opacity = 0;
    if (h === at) opacity = 1;
    else if (h > prev && h < at) opacity = (h - prev) / (at - prev);
    else if (h > at && h < next) opacity = 1 - (h - at) / (next - at);
    if (opacity > 0 && !img.getAttribute("src")) {
      const portrait = matchMedia("(orientation: portrait)").matches;
      img.src = (portrait ? img.dataset.srcPortrait : img.dataset.srcLandscape) ?? "";
    }
    img.style.opacity = String(i === 0 ? Math.max(opacity, sceneState.eyes) : opacity * (1 - sceneState.eyes));
  });
}

const hourForPosters = () => {
  const hour = effectiveHour();
  return hour >= 24 ? hour - 24 : hour;
};

function usePosters() {
  livePosters = true;
  layer?.classList.remove("is-live");
  root.classList.remove("scene-live");
  showPosterFor(hourForPosters());
}

onSceneStateChange(() => showPosterFor(hourForPosters()));

/* Capability check ------------------------------------------------------- */

function chooseTier(): Tier | null {
  if (posterMode) return "high";
  // Manual override for testing: ?scene=live or ?scene=still.
  const forced = params.get("scene");
  if (forced === "live") return "mid";
  if (forced === "still") return null;
  // Reduced motion and Still mode both get the stills, which crossfade.
  if (!motionOK()) return null;

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return null;
  if (/2g|3g/.test(nav.connection?.effectiveType ?? "")) return null;
  const memory = nav.deviceMemory ?? 4;
  const cores = nav.hardwareConcurrency ?? 4;
  if (memory <= 2 || cores <= 2) return null;

  const probe = document.createElement("canvas").getContext("webgl2");
  if (!probe) return null;
  const info = probe.getExtension("WEBGL_debug_renderer_info");
  const gpu = info ? String(probe.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  probe.getExtension("WEBGL_lose_context")?.loseContext();
  if (/swiftshader|llvmpipe|software|basic render/i.test(gpu)) return null;

  const mobile = matchMedia("(pointer: coarse)").matches;
  if (mobile) return memory >= 6 && cores >= 8 ? "mid" : "low";
  return memory >= 8 ? "high" : "mid";
}

/* Start ------------------------------------------------------------------- */

function whenIdle(callback: () => void) {
  const run = () =>
    "requestIdleCallback" in window ? requestIdleCallback(callback, { timeout: 2500 }) : setTimeout(callback, 600);
  if (document.readyState === "complete") run();
  else addEventListener("load", run, { once: true });
}

type LiveScene = ReturnType<typeof import("../scene/doorstep").startDoorstep>;
let live: LiveScene | null = null;
let starting = false;

async function startLive(tier: Tier) {
  if (!canvas || !layer || live || starting) return;
  starting = true;
  const { startDoorstep } = await import("../scene/doorstep");
  starting = false;
  if (!posterMode && !motionOK()) return; // Still mode turned on meanwhile
  const scene = startDoorstep(canvas, {
    tier,
    probe: !posterMode,
    onFrames: posterMode ? undefined : placeHotspots,
    onReady: () => {
      layer.classList.add("is-live");
      root.classList.add("scene-live");
      livePosters = false;
      if (posterMode) root.dataset.sceneReady = "true";
    },
    onGiveUp: stopLive,
  });
  live = scene;

  // Only draw while some part of the scene can actually be seen.
  if (posterMode) return;
  const windows = [...document.querySelectorAll<HTMLElement>("[data-scene-window]")];
  const seen = new Set<Element>();
  const update = () => scene.setVisible(seen.size > 0 && !document.hidden);
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) seen.add(entry.target);
      else seen.delete(entry.target);
    }
    update();
  });
  windows.forEach((el) => observer.observe(el));
  document.addEventListener("visibilitychange", update);
}

/* Hotspots on the pictures ------------------------------------------------
   On wide screens the project's picture IS the framed photo on the wall, so a
   real button is laid exactly over it (projected from the 3D camera each
   redraw). Only the picture being looked at gets one. Keyboard and screen
   reader users have each project's "Details" button instead, so these are
   hidden from them. */

const wide = matchMedia("(min-width: 1024px)");
const hotspots = projects.map((project, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "frame-hotspot";
  button.tabIndex = -1;
  button.setAttribute("aria-hidden", "true");
  button.innerHTML = '<span class="frame-hotspot__pill">View project</span>';
  button.addEventListener("mouseenter", () => {
    sceneState.hover = index;
    notifySceneState();
  });
  button.addEventListener("mouseleave", () => {
    if (sceneState.hover === index) sceneState.hover = -1;
    notifySceneState();
  });
  button.addEventListener("click", () => {
    const r = button.getBoundingClientRect();
    dispatchEvent(new CustomEvent("portfolio:open-project", { detail: { index, origin: r } }));
  });
  button.dataset.title = project.title;
  document.body.append(button);
  return button;
});

function placeHotspots(rects: Array<FrameRect | null>) {
  // The project whose hour the scroll is resting on, if any.
  let current = -1;
  if (wide.matches && sceneState.overlays === 0 && sceneState.eyes === 0 && sceneState.lean < 0) {
    projects.forEach((_, i) => {
      if (Math.abs(sceneState.hour - projectHour(i)) < 0.2) current = i;
    });
  }
  hotspots.forEach((button, i) => {
    const rect = rects[i];
    const show = i === current && rect !== null;
    button.classList.toggle("is-shown", show);
    if (show && rect) {
      button.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
      button.style.width = `${rect.width}px`;
      button.style.height = `${rect.height}px`;
    }
  });
}

function stopLive() {
  hotspots.forEach((button) => button.classList.remove("is-shown"));
  if (live) {
    live.dispose();
    live = null;
    // A restart gets a fresh canvas (and so a clean WebGL context).
    if (canvas) {
      const fresh = canvas.cloneNode() as HTMLCanvasElement;
      canvas.replaceWith(fresh);
      canvas = fresh;
    }
  }
  usePosters();
}

if (layer) {
  if (posterMode) {
    root.classList.add("scene-poster-mode");
    sceneState.hour = Number(params.get("scene-poster")) || PRE_DAWN_HOUR;
    sceneState.eyes = Number(params.get("scene-eyes")) || 0;
  } else {
    createDayTimeline((hour, reading) => {
      sceneState.hour = hour;
      sceneState.reading = reading;
      notifySceneState();
      // Leaving the night behind takes the next morning away again.
      if (sceneState.dawn > 0 && hour < 19) setDawn(0, 2);
    });
  }

  const tier = chooseTier();
  if (tier) whenIdle(() => void startLive(tier));
  else usePosters();

  // Still mode switched on or off from the footer or the palette.
  onMotionPreferenceChange(() => {
    if (!motionOK()) stopLive();
    else if (!live) {
      const next = chooseTier();
      if (next) void startLive(next);
    }
  });
}

/* After a message is sent: the night ends ------------------------------- */

let dawnAnimation: { stop: () => void } | null = null;

function setDawn(to: number, duration: number) {
  dawnAnimation?.stop();
  root.classList.toggle("dawn", to > 0);
  dawnAnimation = animate(sceneState.dawn, to, {
    duration,
    ease: [0.45, 0, 0.25, 1],
    onUpdate: (value) => {
      sceneState.dawn = value;
      notifySceneState();
    },
  });
}

addEventListener("portfolio:message-sent", () => setDawn(1, 8));

/* Pointer parallax (desktop only; the scene damps and limits it) --------- */

if (matchMedia("(pointer: fine)").matches) {
  let queued = false;
  addEventListener(
    "pointermove",
    (event) => {
      sceneState.pointerX = (event.clientX / innerWidth) * 2 - 1;
      sceneState.pointerY = (event.clientY / innerHeight) * 2 - 1;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        notifySceneState();
      });
    },
    { passive: true }
  );
}
