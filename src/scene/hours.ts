// The hour of the day each part of the page sits at. The page markup
// (data-hour) and the camera shots in the scene both read from here, so a
// section and the shot it's paired with can never drift apart.

export const HOURS = {
  hero: 4.6, // before dawn: the oven is lit
  sunrise: 6.2, // first light over the doorstep
  services: 7.0, // the father's corner
  shoes: 12.1, // a pause on the school shoes, and the empty place
  skills: 12.5, // the blackboard over the shoes
  dusk: 17.5, // the mother's corner
  contact: 20.6, // by the lantern
  // The page ends as the night does: first light, the lantern still lit,
  // the oven already going, the road out just visible. The full morning
  // comes only after someone writes (NEXT_DAWN_HOUR).
  firstLight: 29.25, // 5:15 the next day

} as const;

// Projects hang on the veranda wall; the camera walks past them one by one
// through the afternoon.
const PROJECTS_START = 13.4;
const PROJECT_STEP = 0.55;

export const projectHour = (index: number) => PROJECTS_START + index * PROJECT_STEP;

/** "4:36 am", "1:24 pm" - hours past 24 wrap to the next day. */
export function formatHour(hour: number) {
  const h = ((hour % 24) + 24) % 24;
  let hours = Math.floor(h);
  let minutes = Math.round((h - hours) * 60);
  if (minutes === 60) {
    hours = (hours + 1) % 24;
    minutes = 0;
  }
  const suffix = hours < 12 ? "am" : "pm";
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${String(minutes).padStart(2, "0")} ${suffix}`;
}
