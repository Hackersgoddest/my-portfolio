import { CanvasTexture, RepeatWrapping, SRGBColorSpace, type Texture } from "three";

// Small procedural textures painted on a canvas at startup - mud, rust, worn
// wood, flour dust. They cost no download and stay tiny (128-256px).

type RGB = [number, number, number];
/** Returns [r, g, b] in 0..1 for texture coordinates u, v in 0..1. */
type Painter = (u: number, v: number) => RGB;

function hash(x: number, y: number, seed: number) {
  let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function valueNoise(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi, seed);
  const b = hash(xi + 1, yi, seed);
  const c = hash(xi, yi + 1, seed);
  const d = hash(xi + 1, yi + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Fractal noise in 0..1. */
export function fbm(x: number, y: number, seed = 1, octaves = 4) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise(x * freq, y * freq, seed + i * 17);
    freq *= 2;
    amp *= 0.5;
  }
  return sum / (1 - Math.pow(0.5, octaves));
}

export const mix = (a: RGB, b: RGB, k: number): RGB => [
  a[0] + (b[0] - a[0]) * k,
  a[1] + (b[1] - a[1]) * k,
  a[2] + (b[2] - a[2]) * k,
];

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const band = (x: number, lo: number, hi: number) => clamp01((x - lo) / (hi - lo));

function paint(size: number, painter: Painter) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const image = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const [r, g, b] = painter(x / size, 1 - y / size);
      const i = (y * size + x) * 4;
      image.data[i] = clamp01(r) * 255;
      image.data[i + 1] = clamp01(g) * 255;
      image.data[i + 2] = clamp01(b) * 255;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  return canvas;
}

/** Colour texture (sRGB). */
export function colorTexture(size: number, painter: Painter): Texture {
  const texture = new CanvasTexture(paint(size, painter));
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

/** Roughness (G) + metalness (B) texture, the layout three.js reads. */
export function roughMetalTexture(size: number, painter: (u: number, v: number) => [number, number]): Texture {
  const texture = new CanvasTexture(
    paint(size, (u, v) => {
      const [roughness, metalness] = painter(u, v);
      return [1, roughness, metalness];
    })
  );
  texture.wrapS = texture.wrapT = RepeatWrapping;
  return texture;
}

/** Soft radial falloff used for contact shadows under objects. */
export function blobShadowTexture(): Texture {
  const texture = new CanvasTexture(
    paint(64, (u, v) => {
      const d = Math.hypot(u - 0.5, v - 0.5) * 2;
      const a = Math.pow(clamp01(1 - d), 1.6);
      return [a, a, a];
    })
  );
  return texture;
}
