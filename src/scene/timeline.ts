import { PRE_DAWN_HOUR } from "./state";

// Maps scroll position to an hour of the day. Any element with a data-hour
// attribute is a marker: while the middle of the viewport sits inside the
// middle band of that element, the hour holds still (a "pillow shot"); between
// markers it eases from one hour to the next.

interface Zone {
  start: number;
  end: number;
  hour: number;
}

const HOLD_BAND = 0.3; // hold for the middle 40% of each marker

const smoothstep = (x: number) => {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
};

/** Calls back with the hour for the scroll position, and how much the page
    is in "reading" - the middle of a section marked data-reading is at the
    centre of the screen (0..1), so the scene can soften behind its text. */
export function createDayTimeline(onHour: (hour: number, reading: number) => void) {
  const markers = [...document.querySelectorAll<HTMLElement>("[data-hour]")];
  const readers = [...document.querySelectorAll<HTMLElement>("[data-reading]")];
  let zones: Zone[] = [];
  let reads: Array<{ top: number; bottom: number; strength: number }> = [];

  const measure = () => {
    // The furthest the screen's centre can go: the last marker's hour must
    // be reachable at the bottom of the page, however short it is.
    const last = document.documentElement.scrollHeight - window.innerHeight / 2;
    zones = markers.map((el) => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      return {
        start: Math.min(top + rect.height * HOLD_BAND, last),
        end: Math.min(top + rect.height * (1 - HOLD_BAND), last),
        hour: Number(el.dataset.hour),
      };
    });
    reads = readers.map((el) => {
      const rect = el.getBoundingClientRect();
      // data-reading="0.6" softens less than a bare data-reading (full).
      const strength = Number(el.dataset.reading) || 1;
      return { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY, strength };
    });
  };

  // Full as soon as the screen's centre is inside the section, with a short
  // ramp at its edges (short sections like the signboards still get it).
  const readingAt = (y: number) => {
    const lead = window.innerHeight * 0.12;
    let reading = 0;
    for (const { top, bottom, strength } of reads) {
      const amount = strength * Math.min(smoothstep((y - top) / lead), smoothstep((bottom - y) / lead));
      reading = Math.max(reading, amount);
    }
    return reading;
  };

  const hourAt = (y: number) => {
    if (!zones.length) return PRE_DAWN_HOUR;
    if (y <= zones[0].end) return zones[0].hour;

    for (let i = 0; i < zones.length - 1; i++) {
      const a = zones[i];
      const b = zones[i + 1];
      if (y <= a.end) return a.hour;
      if (y < b.start) return a.hour + (b.hour - a.hour) * smoothstep((y - a.end) / (b.start - a.end));
    }

    return zones[zones.length - 1].hour;
  };

  const update = () => {
    const y = window.scrollY + window.innerHeight / 2;
    onHour(hourAt(y), readingAt(y));
  };

  measure();
  update();

  window.addEventListener("scroll", update, { passive: true });
  // Islands hydrating, fonts and images all shift layout after load.
  new ResizeObserver(() => {
    measure();
    update();
  }).observe(document.body);
}
