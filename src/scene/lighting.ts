import { Color, MathUtils, Vector3 } from "three";

// One function turns an hour of the day into every lighting value in the
// scene: sun, moonlight, sky bounce, haze, exposure, and the two warm lights
// the family lives by - the oven before dawn and the lantern at night.

export interface Lighting {
  sunDirection: Vector3;
  sunColor: Color;
  sunIntensity: number;
  moonIntensity: number;
  skyColor: Color;
  groundColor: Color;
  hemiIntensity: number;
  envIntensity: number;
  exposure: number;
  fogColor: Color;
  /** 0..1, how lit the lantern on the step is. */
  lantern: number;
  /** 0..1, how bright the oven glow from off-frame is. */
  oven: number;
}

const { smoothstep, lerp } = MathUtils;

const SUNRISE = 6.05; // Ghana sits near the equator: ~6am / ~6pm all year

const HORIZON_SUN = new Color(1.0, 0.42, 0.18);
const DAY_SUN = new Color(1.0, 0.95, 0.88);

const NIGHT_SKY = new Color(0.04, 0.06, 0.16);
const TWILIGHT_SKY = new Color(0.32, 0.34, 0.52);
const DAY_SKY = new Color(0.62, 0.72, 0.9);

const LATERITE_BOUNCE = new Color(0.42, 0.17, 0.08);

const NIGHT_FOG = new Color(0.012, 0.014, 0.03);
const TWILIGHT_FOG = new Color(0.16, 0.16, 0.26);
const SUNSET_FOG = new Color(0.55, 0.32, 0.22);
const DAY_FOG = new Color(0.78, 0.72, 0.62); // harmattan haze

export function createLighting(): Lighting {
  return {
    sunDirection: new Vector3(),
    sunColor: new Color(),
    sunIntensity: 0,
    moonIntensity: 0,
    skyColor: new Color(),
    groundColor: new Color(),
    hemiIntensity: 0,
    envIntensity: 0,
    exposure: 1,
    fogColor: new Color(),
    lantern: 0,
    oven: 0,
  };
}

/** Fills `out` with the lighting for `hour` (any real number; wraps at 24). */
export function lightingAt(hour: number, out: Lighting): Lighting {
  const h = ((hour % 24) + 24) % 24;

  // 0 at sunrise, PI at sunset; the sun climbs from camera-left (east),
  // passes nearly overhead, and sets camera-right, always in front of the wall.
  const arc = ((h - SUNRISE) / 12) * Math.PI;
  const elevation = Math.sin(arc);
  // A slight westward lean keeps even noon shadows visible beside things.
  out.sunDirection.set(-Math.cos(arc) * 0.9 + 0.22, Math.max(elevation, 0.02), 0.5).normalize();

  const twilight = smoothstep(elevation, -0.28, 0.02);
  const day = smoothstep(elevation, 0.0, 0.35);
  const lowSun = 1 - smoothstep(elevation, 0.05, 0.45);

  out.sunColor.copy(HORIZON_SUN).lerp(DAY_SUN, smoothstep(elevation, 0.02, 0.5));
  out.sunIntensity = (4.4 + 3.2 * smoothstep(elevation, 0.4, 0.9)) * smoothstep(elevation, -0.03, 0.14);
  out.moonIntensity = 0.55 * (1 - twilight);

  out.skyColor.copy(NIGHT_SKY).lerp(TWILIGHT_SKY, twilight).lerp(DAY_SKY, day);
  out.groundColor.copy(LATERITE_BOUNCE).multiplyScalar(0.15 + 0.85 * day);
  // The physical sky gets far brighter as the sun climbs; scale its light
  // down at midday so the sun, not the sky, does the lighting.
  const highSun = smoothstep(elevation, 0.3, 0.9);
  out.hemiIntensity = 0.16 + 0.24 * twilight + 0.3 * day * (1 - 0.7 * highSun);
  out.envIntensity = (0.05 + 0.18 * twilight + 0.24 * day) * (1 - 0.88 * highSun);

  // Fake auto-exposure: open up at night, stop down in the noon glare.
  out.exposure = lerp(lerp(1.9, 1.25, twilight), lerp(0.95, 0.85, highSun), day);

  out.fogColor.copy(NIGHT_FOG).lerp(TWILIGHT_FOG, twilight);
  if (day > 0) out.fogColor.lerp(DAY_FOG, day);
  // Low sun stains the haze orange at both ends of the day.
  out.fogColor.lerp(SUNSET_FOG, lowSun * twilight * 0.7);

  out.lantern = 1 - smoothstep(elevation, -0.06, 0.1);
  // The oven is fired around 3:30am and goes quiet once the day has begun.
  out.oven = smoothstep(h, 3.0, 3.6) * (1 - smoothstep(h, 6.2, 7.0));

  return out;
}

/** out = mix(a, b, k), component-wise. */
export function mixLighting(a: Lighting, b: Lighting, k: number, out: Lighting): Lighting {
  out.sunDirection.copy(a.sunDirection).lerp(b.sunDirection, k).normalize();
  out.sunColor.copy(a.sunColor).lerp(b.sunColor, k);
  out.sunIntensity = lerp(a.sunIntensity, b.sunIntensity, k);
  out.moonIntensity = lerp(a.moonIntensity, b.moonIntensity, k);
  out.skyColor.copy(a.skyColor).lerp(b.skyColor, k);
  out.groundColor.copy(a.groundColor).lerp(b.groundColor, k);
  out.hemiIntensity = lerp(a.hemiIntensity, b.hemiIntensity, k);
  out.envIntensity = lerp(a.envIntensity, b.envIntensity, k);
  out.exposure = lerp(a.exposure, b.exposure, k);
  out.fogColor.copy(a.fogColor).lerp(b.fogColor, k);
  out.lantern = lerp(a.lantern, b.lantern, k);
  out.oven = lerp(a.oven, b.oven, k);
  return out;
}
