<template>
  <!-- No bar: the header floats over the scene on a soft fade. Navigation is
       the day itself - the sun's path over the house, with each chapter a
       point at its hour. The sun travels it as you scroll. -->
  <header class="dayline-header relative w-full">
    <a
      href="#services"
      class="sr-only rounded-lg bg-surface-elevated px-4 py-2 font-mono text-sm text-fg focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50"
    >
      Skip to content
    </a>

    <div class="mx-auto flex w-full max-w-7xl items-start justify-between gap-3 px-4 pt-3 sm:px-6 sm:pt-4">
      <a href="#home" class="mt-1.5 shrink-0 font-mono text-base font-medium text-fg sm:text-lg" aria-label="hackersgoddest, back to dawn">
        <span class="text-primary-green">&lt;</span><span class="hidden xs:inline">hackersgoddest</span
        ><span class="xs:hidden">hg</span><span class="text-primary-green">/&gt;</span>
      </a>

      <nav aria-label="Chapters, by time of day" class="dayline" @mouseleave="glance(null)">
        <div class="dayline__dial">
          <svg class="dayline__svg" viewBox="0 0 320 64" aria-hidden="true">
            <line x1="4" y1="46" x2="316" y2="46" class="dayline__horizon" />
            <path :d="path" class="dayline__path" />
            <circle :cx="sun.x" :cy="sun.y" r="9" class="dayline__glow" :class="{ 'is-night': !sun.up }" />
            <circle :cx="sun.x" :cy="sun.y" r="3.6" class="dayline__sun" :class="{ 'is-night': !sun.up }" />
          </svg>
          <ol>
            <li
              v-for="(point, i) in points"
              :key="point.key"
              :style="{ left: `${(point.x / 320) * 100}%`, top: `${(point.y / 64) * 100}%` }"
            >
              <a
                :href="`#${point.key}`"
                :aria-current="activeKey === point.key ? 'location' : undefined"
                class="dayline__point"
                @mouseenter="glance(i)"
                @focus="glance(i)"
                @blur="glance(null)"
              >
                <span class="sr-only">{{ point.label }}, {{ formatHour(point.hour) }}</span>
              </a>
            </li>
          </ol>
        </div>
        <!-- Names a point while it's hovered or focused - nothing otherwise. -->
        <p class="dayline__label on-scene" aria-hidden="true" :class="{ 'is-shown': glanced !== null }">
          {{ glanced !== null ? points[glanced].label : "\u00a0" }}
        </p>
      </nav>

      <button
        type="button"
        @click="paletteOpen = true"
        ref="paletteButton"
        class="mt-0.5 flex shrink-0 items-center gap-2 rounded-full border border-border/10 bg-surface/40 px-3 py-1.5 font-mono text-sm text-fg-subtle transition-colors duration-200 hover:border-border/25 hover:text-fg"
        aria-label="Go anywhere"
        aria-keyshortcuts="Control+K Meta+K"
      >
        <Search :size="14" />
        <kbd class="hidden items-center gap-0.5 text-[10px] text-fg-faint sm:flex">{{ modifierKey }}K</kbd>
      </button>
    </div>

    <CommandPalette v-if="paletteRequested" v-model:open="paletteOpen" :origin="paletteButton" />
  </header>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref, watch } from "vue";
import { Search } from "@lucide/vue";
import sections from "../data/navigation";
import { useActiveSection } from "../composables/useActiveSection";
import { formatHour, HOURS } from "../scene/hours";
import { effectiveHour, notifySceneState, onSceneStateChange, sceneState } from "../scene/state";

// The palette (and the dialog library behind it) is only downloaded the first
// time it's opened, keeping it out of the initial page load.
const CommandPalette = defineAsyncComponent(() => import("./CommandPalette.vue"));

const sectionKeys = sections.map((s) => s.key);
const { activeKey } = useActiveSection(sectionKeys);

const paletteOpen = ref(false);
const paletteRequested = ref(false);
const paletteButton = ref<HTMLElement | null>(null);
watch(paletteOpen, (open) => {
  if (open) paletteRequested.value = true;
});

const modifierKey = computed(() =>
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl+"
);

/* The dial ---------------------------------------------------------------- */

// Height above the horizon for an hour: the sun's elevation, clamped so the
// night chapters sit just below the line rather than off the dial.
const elevation = (hour: number) => {
  const h = ((hour % 24) + 24) % 24;
  return Math.max(-0.35, Math.sin(((h - 6) / 12) * Math.PI));
};
const yFor = (hour: number) => 46 - 36 * elevation(hour);

// Chapters are spaced evenly across the dial (easy to hit), each at the
// height of its hour.
const points = sections.map((s, i) => ({
  ...s,
  x: 24 + (i * (320 - 48)) / (sections.length - 1),
  y: yFor(s.hour),
}));

// A smooth curve through the points (Catmull-Rom as cubic Béziers).
const path = (() => {
  const pts = [{ x: 4, y: 58 }, ...points, { x: 316, y: 58 }];
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`;
  }
  return d;
})();

// The story's clock follows the scene, updated only when the minute changes.
const storyHour = ref<number>(HOURS.hero);
const sun = computed(() => {
  const hour = storyHour.value;
  // Along the dial: between the two chapters the hour falls between.
  let x = points[0].x;
  if (hour >= points[points.length - 1].hour) x = points[points.length - 1].x;
  else {
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (hour >= a.hour && hour < b.hour) {
        x = a.x + ((hour - a.hour) / (b.hour - a.hour)) * (b.x - a.x);
        break;
      }
    }
  }
  return { x, y: yFor(hour), up: elevation(hour) > 0 };
});

/* Hovering a point names it - and the camera glances toward it. */
const glanced = ref<number | null>(null);
let glanceTimer: ReturnType<typeof setTimeout> | undefined;
function glance(index: number | null) {
  glanced.value = index;
  clearTimeout(glanceTimer);
  // A short wait, so passing over the dial doesn't swing the camera.
  glanceTimer = setTimeout(() => {
    sceneState.glance = index === null ? null : points[index].hour;
    notifySceneState();
  }, index === null ? 0 : 220);
}


let unsubscribe: (() => void) | undefined;

function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    paletteOpen.value = !paletteOpen.value;
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  unsubscribe = onSceneStateChange(() => {
    const hour = Math.round(effectiveHour() * 60) / 60;
    if (hour !== storyHour.value) storyHour.value = hour;
  });
  storyHour.value = effectiveHour();
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  unsubscribe?.();
});
</script>

<style scoped>
.dayline-header {
  /* A fade, not a bar: the scene runs right up to the top of the screen. */
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--color-surface) 62%, transparent) 0%,
    color-mix(in srgb, var(--color-surface) 25%, transparent) 55%,
    transparent 100%
  );
  padding-bottom: 1.25rem;
}

.dayline {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
}

.dayline__dial {
  position: relative;
  width: min(320px, 52vw);
  aspect-ratio: 320 / 64;
}

.dayline__svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.dayline__horizon {
  stroke: color-mix(in srgb, var(--color-fg) 14%, transparent);
  stroke-width: 1;
  stroke-dasharray: 2 4;
}

.dayline__path {
  fill: none;
  stroke: color-mix(in srgb, var(--color-fg) 22%, transparent);
  stroke-width: 1.2;
}

.dayline__sun {
  fill: #fcd34d;
  transition: fill 0.6s ease;
}

.dayline__glow {
  fill: color-mix(in srgb, #fcd34d 22%, transparent);
  transition: fill 0.6s ease;
}

.dayline__sun.is-night {
  fill: #e5e7eb; /* the moon */
}

.dayline__glow.is-night {
  fill: color-mix(in srgb, #e5e7eb 12%, transparent);
}

.dayline ol {
  position: absolute;
  inset: 0;
}

.dayline li {
  position: absolute;
  transform: translate(-50%, -50%);
}

/* 24px target, 7px dot. */
.dayline__point {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
}

.dayline__point::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-fg) 55%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-surface) 70%, transparent);
  transition:
    transform 0.25s ease,
    background-color 0.25s ease;
}

.dayline__point:hover::before,
.dayline__point:focus-visible::before {
  background: var(--color-fg);
  transform: scale(1.35);
}

.dayline__point[aria-current="location"]::before {
  background: var(--color-primary-green);
  box-shadow:
    0 0 0 3px color-mix(in srgb, var(--color-surface) 70%, transparent),
    0 0 0 5px color-mix(in srgb, var(--color-primary-green) 35%, transparent);
}

.dayline__point:focus-visible {
  outline: 2px solid var(--color-primary-green);
  outline-offset: 1px;
}

.dayline__label {
  margin-top: 0.15rem;
  font-family: var(--font-mono);
  font-size: 11px;
  white-space: nowrap;
  color: var(--color-fg);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.dayline__label.is-shown {
  opacity: 1;
}
</style>
