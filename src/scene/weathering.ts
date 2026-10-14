import type { MeshStandardMaterial } from "three";

// Breaks up tiled textures with world-space grime: large soft stains, plus
// vertical rain streaks on walls. Patched into three's standard shader, so it
// costs a few ALU ops per pixel and no extra textures.

const NOISE = /* glsl */ `
  varying vec3 vWeatherPos;
  uniform vec4 uWeather; // x: stain scale, y: stain strength, z: streak strength, w: darken

  float wHash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float wNoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(wHash(i), wHash(i + vec3(1, 0, 0)), f.x), mix(wHash(i + vec3(0, 1, 0)), wHash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(wHash(i + vec3(0, 0, 1)), wHash(i + vec3(1, 0, 1)), f.x), mix(wHash(i + vec3(0, 1, 1)), wHash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }

  float wFbm(vec3 p) {
    float sum = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      sum += amp * wNoise(p);
      p *= 2.03;
      amp *= 0.5;
    }
    return sum / 0.9375;
  }
`;

let id = 0;

export function weather(
  material: MeshStandardMaterial,
  { scale = 0.9, stains = 0.5, streaks = 0, darken = 0 }: { scale?: number; stains?: number; streaks?: number; darken?: number }
) {
  const key = `weather-${id++}`;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uWeather = { value: [scale, stains, streaks, darken] };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWeatherPos;")
      .replace(
        "#include <project_vertex>",
        "#include <project_vertex>\nvWeatherPos = (modelMatrix * vec4(transformed, 1.0)).xyz;"
      );
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${NOISE}`)
      .replace(
        "#include <map_fragment>",
        /* glsl */ `#include <map_fragment>
        float stain = wFbm(vWeatherPos * uWeather.x);
        float streak = wFbm(vec3(vWeatherPos.x * 9.0, vWeatherPos.y * 0.45, vWeatherPos.z * 9.0));
        float grime = mix(1.0, 0.62 + 0.55 * stain, uWeather.y);
        grime *= mix(1.0, 0.78 + 0.3 * streak, uWeather.z);
        grime *= 1.0 - uWeather.w;
        diffuseColor.rgb *= grime;`
      );
  };
  material.customProgramCacheKey = () => key;
  return material;
}
