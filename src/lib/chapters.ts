import sections from "../data/navigation";
import { formatHour } from "../scene/hours";
import { getLenis } from "./scroll";
import { motionOK } from "./preferences";

// Every way of moving around the page goes through here: nav links, the
// palette, the [ and ] keys, Back/Forward and deep links. Scroll position
// stays the one source of truth (it sets the hour, the hour sets the camera),
// so travelling is just scrolling - with care taken over how it feels:
//
//  - a short trip flies: a smooth scroll, so the camera glides between shots;
//  - a long trip (more than two shots away) blinks: a brief fade to dark, a
//    jump, and a fade back - no dizzying flight across the whole day;
//  - on arrival, focus moves to the section's heading and the new place is
//    announced to screen readers. The camera follows focus, never the reverse.

const NAV_OFFSET = 80;
const BLINK_SHOTS = 2;

let travelling = false;
let suppressSpy = false;

const status = () => document.getElementById("chapter-status");
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Scroll position that brings an element to rest in view. */
function restingY(target: HTMLElement) {
  const rect = target.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  // Short sections are centred (that's where their camera shot holds);
  // tall ones start just under the nav bar.
  if (rect.height < window.innerHeight - NAV_OFFSET) return top - (window.innerHeight - rect.height) / 2;
  return top - NAV_OFFSET;
}

/** How many camera shots lie between here and there. */
function shotsBetween(fromY: number, toY: number) {
  const [lo, hi] = fromY < toY ? [fromY, toY] : [toY, fromY];
  const mid = window.innerHeight / 2;
  return [...document.querySelectorAll<HTMLElement>("[data-hour]")].filter((el) => {
    const center = el.getBoundingClientRect().top + window.scrollY + el.offsetHeight / 2 - mid;
    return center > lo && center < hi;
  }).length;
}

function labelFor(id: string) {
  const chapter = sections.find((s) => s.key === id);
  if (chapter) return `${chapter.label}, ${formatHour(chapter.hour)}`;
  return document.getElementById(id)?.querySelector("h2, h3")?.textContent?.trim() ?? id;
}

function arrive(target: HTMLElement, id: string) {
  const heading = target.matches("h1, h2, h3") ? target : target.querySelector<HTMLElement>("h1, h2, h3");
  if (heading) {
    if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
  const region = status();
  if (region) region.textContent = `Now at ${labelFor(id)}`;
}

async function scrollTo(y: number, smooth: boolean) {
  const lenis = getLenis();
  if (lenis) {
    if (!smooth) {
      lenis.scrollTo(y, { immediate: true, force: true });
      return;
    }
    const distance = Math.abs(y - window.scrollY);
    await new Promise<void>((resolve) =>
      lenis.scrollTo(y, {
        duration: Math.min(1.6, 0.7 + distance / 3000),
        easing: ease,
        onComplete: () => resolve(),
      })
    );
    return;
  }
  window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
  if (smooth) await wait(700);
}

export interface TravelOptions {
  /** Add a history entry (explicit jumps) instead of replacing it. */
  push?: boolean;
  /** Called on arrival (used to open a project after reaching it). */
  then?: () => void;
}

/** Travel to a chapter or project by element id. */
export async function navigateTo(id: string, { push = true, then }: TravelOptions = {}) {
  const target = document.getElementById(id);
  if (!target || travelling) return;
  travelling = true;
  suppressSpy = true;

  if (push && location.hash !== `#${id}`) history.pushState({ chapter: id }, "", `#${id}`);

  const y = Math.max(0, restingY(target));
  const far = shotsBetween(window.scrollY, y) > BLINK_SHOTS;

  if (!motionOK()) {
    await scrollTo(y, false);
  } else if (far) {
    document.documentElement.classList.add("blinking");
    await wait(220);
    await scrollTo(y, false);
    await wait(60); // let the new shot draw before fading back in
    document.documentElement.classList.remove("blinking");
  } else {
    await scrollTo(y, true);
  }

  arrive(target, id);
  travelling = false;
  setTimeout(() => (suppressSpy = false), 200);
  then?.();
}

/* ------------------------------------------------------------------ */
/* Wiring                                                               */
/* ------------------------------------------------------------------ */

const chapterIds = sections.map((s) => s.key);

function currentChapter() {
  const mid = window.innerHeight / 2;
  let current = chapterIds[0];
  for (const id of chapterIds) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= mid) current = id;
  }
  return current;
}

/** Steps to the next/previous chapter (the ] and [ keys). */
export function stepChapter(direction: 1 | -1) {
  const index = chapterIds.indexOf(currentChapter());
  const next = chapterIds[Math.min(chapterIds.length - 1, Math.max(0, index + direction))];
  if (next) void navigateTo(next);
}

let closeProjectOnBack: (() => boolean) | null = null;

/** The project dialog registers here so Back closes it instead of travelling. */
export function onBackWhileOpen(handler: (() => boolean) | null) {
  closeProjectOnBack = handler;
}

/** Set by the project dialog right before it calls history.back() itself. */
let ignoreNextPop = false;
export function ignoreNextPopState() {
  ignoreNextPop = true;
}

export function initChapters() {
  // In-page links travel instead of jumping (and still work with no JS).
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link?.getAttribute("href")?.slice(1);
    if (!id || !document.getElementById(id)) return;
    event.preventDefault();
    void navigateTo(id);
  });

  addEventListener("popstate", () => {
    if (ignoreNextPop) {
      ignoreNextPop = false;
      return;
    }
    if (closeProjectOnBack?.()) return;
    const id = location.hash.slice(1) || "home";
    void navigateTo(id, { push: false });
  });

  // [ and ] step through the chapters. Native keys (arrows, Space,
  // PageUp/Down) are left alone - snapping them would be scroll-jacking.
  addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const el = event.target as HTMLElement;
    if (el.closest("input, textarea, select, [contenteditable], [role=dialog]")) return;
    if (event.key === "]") stepChapter(1);
    else if (event.key === "[") stepChapter(-1);
  });

  // Keep the address bar on the chapter being read, without adding history.
  // Only once the visitor scrolls themselves: on load the hash may be a
  // deep link (#project-...) that a section still has to read.
  let shown = location.hash.slice(1);
  let userScrolled = false;
  const markUser = () => (userScrolled = true);
  for (const type of ["wheel", "touchmove", "keydown", "pointerdown"]) {
    addEventListener(type, markUser, { passive: true, once: true });
  }
  addEventListener(
    "scroll",
    () => {
      if (!userScrolled || suppressSpy || closeProjectOnBack) return;
      const id = currentChapter();
      if (id === shown) return;
      shown = id;
      history.replaceState(history.state, "", id === "home" ? location.pathname : `#${id}`);
    },
    { passive: true }
  );
}
