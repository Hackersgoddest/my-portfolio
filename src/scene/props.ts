import {
  BackSide,
  BoxGeometry,
  BufferGeometry,
  CanvasTexture,
  Euler,
  InstancedMesh,
  Matrix4,
  Quaternion,
  type Texture,
  CapsuleGeometry,
  CatmullRomCurve3,
  Color,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  LatheGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Shape,
  SphereGeometry,
  SRGBColorSpace,
  Sprite,
  SpriteMaterial,
  AdditiveBlending,
  TorusGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  type Material,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { band, blobShadowTexture, clamp01, colorTexture, fbm, mix, roughMetalTexture } from "./textures";

// Every object on the doorstep is modelled here in code. Units are metres;
// +y is up, the wall's face is at z = 0 and the step runs toward +z.

function shadowed<T extends Mesh>(mesh: T, cast = true, receive = true): T {
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  return mesh;
}

/* ------------------------------------------------------------------ */
/* Footprint outline shared by the slippers and the school shoes        */
/* ------------------------------------------------------------------ */

/** Foot-shaped outline in the XY plane, heel at -y, toe at +y. `side` is +1
    for a right foot, -1 for a left one (the big-toe side bulges). */
function footOutline(length: number, width: number, side: number, points = 56) {
  const outline: Vector2[] = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const y = Math.sin(a) * length * 0.5;
    const along = y / (length * 0.5); // -1 heel .. 1 toe
    const halfWidth = (width / 2) * (0.74 + 0.26 * band(along, -0.35, 0.45)) * (along > 0.75 ? 1 - (along - 0.75) * 0.9 : 1);
    const x = Math.cos(a) * halfWidth + side * 0.012 * Math.pow(Math.max(0, along), 2);
    outline.push(new Vector2(x, y));
  }
  return outline;
}

/** Extruded slab with that outline, lying flat, toe pointing -z. */
function soleGeometry(outline: Vector2[], thickness: number) {
  const geometry = new ExtrudeGeometry(new Shape(outline), {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: 0.0025,
    bevelSize: 0.0025,
    bevelSegments: 2,
    curveSegments: 4,
  });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

/* ------------------------------------------------------------------ */
/* Charlie wote - the parents' rubber slippers                          */
/* ------------------------------------------------------------------ */

interface SlipperStyle {
  length: number;
  top: RGB;
  bottom: RGB;
  strap: RGB;
  /** 0..1 red earth caked on the sole and straps. */
  mud: number;
  /** 0..1 flour dust (the mother bakes). */
  flour: number;
  seed: number;
  /** Small brass studs along the strap (the mother's sandals). */
  studs?: boolean;
}

type RGB = [number, number, number];

const RED_EARTH: RGB = [0.42, 0.17, 0.08];
const DRY_EARTH: RGB = [0.58, 0.3, 0.17];
const FLOUR: RGB = [0.92, 0.89, 0.83];

function rubberTexture(style: SlipperStyle, base: RGB, worn: boolean) {
  const span = 0.36;
  return colorTexture(256, (u, v) => {
    // u, v map back to sole-space metres (see the repeat/offset below).
    const x = (u - 0.5) * span;
    const y = (v - 0.5) * span;
    const along = y / (style.length / 2);
    let color = base;

    if (worn) {
      // Darker, polished patches where heel and ball press down every day.
      const heel = Math.exp(-((x * x) / 0.0009 + Math.pow(along + 0.6, 2) / 0.05));
      const ball = Math.exp(-((x * x) / 0.0014 + Math.pow(along - 0.35, 2) / 0.06));
      color = mix(color, [base[0] * 0.55, base[1] * 0.55, base[2] * 0.55], clamp01((heel + ball) * 0.9));
    }

    const mudNoise = fbm(x * 40, y * 40, style.seed);
    const edge = band(Math.abs(x) / 0.05 + Math.abs(along) * 0.35, 0.55, 1.1);
    const mudAmount = style.mud * band(mudNoise + edge * 0.55, 0.5, 0.72);
    color = mix(color, mix(RED_EARTH, DRY_EARTH, fbm(x * 90, y * 90, style.seed + 5)), mudAmount);

    const flourAmount = style.flour * band(fbm(x * 70, y * 70, style.seed + 9), 0.66, 0.78);
    return mix(color, FLOUR, flourAmount * 0.85);
  });
}

const studMaterial = new MeshStandardMaterial({ color: 0x8c6a32, metalness: 1, roughness: 0.35 });

function slipper(style: SlipperStyle, side: number) {
  const group = new Group();
  const width = style.length * 0.37;
  const outline = footOutline(style.length, width, side);

  const topMap = rubberTexture(style, style.top, true);
  const bottomMap = rubberTexture(style, style.bottom, false);
  for (const map of [topMap, bottomMap]) {
    map.repeat.set(1 / 0.36, 1 / 0.36);
    map.offset.set(0.5, 0.5);
  }

  // Extrude groups: 0 = the flat faces (textured), 1 = the edges (plain).
  const edge = (color: RGB) =>
    new MeshStandardMaterial({ color: new Color().setRGB(...mix(color, RED_EARTH, style.mud * 0.45)), roughness: 0.8 });
  const bottom = shadowed(
    new Mesh(soleGeometry(outline, 0.011), [new MeshStandardMaterial({ map: bottomMap, roughness: 0.82 }), edge(style.bottom)])
  );
  const top = shadowed(
    new Mesh(soleGeometry(outline, 0.007), [new MeshStandardMaterial({ map: topMap, roughness: 0.62 }), edge(style.top)])
  );
  top.position.y = 0.0135;
  group.add(bottom, top);

  // Y-shaped strap from the toe post down to both sides of the arch.
  const surface = 0.025;
  const postX = side * 0.012;
  const postZ = -style.length * 0.28;
  const strapMaterial = new MeshStandardMaterial({
    color: new Color().setRGB(...mix(style.strap, RED_EARTH, style.mud * 0.35)),
    roughness: 0.55,
  });
  for (const s of [-1, 1]) {
    const reach = width * 0.47;
    const curve = new CatmullRomCurve3([
      new Vector3(postX, surface - 0.004, postZ),
      new Vector3(postX + s * 0.018, surface + 0.026, postZ + 0.03),
      new Vector3(s * reach * 0.85, surface + 0.02, postZ + 0.075),
      new Vector3(s * reach, surface - 0.002, postZ + 0.11),
    ]);
    group.add(shadowed(new Mesh(new TubeGeometry(curve, 20, 0.0058, 8), strapMaterial)));
    if (style.studs) {
      for (const t of [0.25, 0.45, 0.65, 0.85]) {
        const stud = new Mesh(new SphereGeometry(0.0062, 10, 6), studMaterial);
        stud.position.copy(curve.getPointAt(t));
        stud.scale.y = 0.6;
        group.add(stud);
      }
    }
  }
  const post = shadowed(new Mesh(new CylinderGeometry(0.004, 0.004, 0.012, 8), strapMaterial));
  post.position.set(postX, surface + 0.002, postZ);
  group.add(post);

  return group;
}

/** A pair of charlie wote, laid as if just stepped out of. */
export function slipperPair(style: SlipperStyle) {
  const pair = new Group();
  const left = slipper(style, -1);
  const right = slipper(style, 1);
  left.position.set(-0.058, 0, 0.006);
  left.rotation.y = 0.08;
  right.position.set(0.058, 0, -0.01);
  right.rotation.y = -0.12;
  pair.add(left, right);
  return pair;
}

/* ------------------------------------------------------------------ */
/* Children's school shoes - black, polished                            */
/* ------------------------------------------------------------------ */

/** Lofts a dome of rings over the foot outline to make a closed shoe. */
function shoeUpperGeometry(outline: Vector2[], length: number, heightScale = 1) {
  const rings = 9;
  const n = outline.length;
  const positions: number[] = [];
  const indices: number[] = [];

  // Height of the upper along the foot: low toe box, high instep, collar.
  const heightAt = (along: number) => {
    if (along > 0.55) return 0.04 + (1 - along) * 0.05;
    if (along > -0.2) return 0.062 + (0.55 - along) * 0.014;
    return 0.068 - (-0.2 - along) * 0.01;
  };

  for (let k = 0; k <= rings; k++) {
    const t = k / rings;
    const inset = 1 - 0.62 * t * t;
    for (const p of outline) {
      const along = p.y / (length / 2);
      const h = heightAt(along) * heightScale * Math.sin((t * Math.PI) / 2);
      // Toe of the outline points +y; the scene's toe points -z.
      positions.push(p.x * inset, 0.02 + h, -p.y * (1 - 0.18 * t * t));
    }
  }
  // Close the top with a fan to a centre point.
  const apex = positions.length / 3;
  positions.push(0, 0.02 + heightAt(0.1) * heightScale, 0);

  for (let k = 0; k < rings; k++) {
    for (let i = 0; i < n; i++) {
      const a = k * n + i;
      const b = k * n + ((i + 1) % n);
      const c = (k + 1) * n + i;
      const d = (k + 1) * n + ((i + 1) % n);
      indices.push(a, b, c, b, d, c);
    }
  }
  for (let i = 0; i < n; i++) indices.push(rings * n + i, rings * n + ((i + 1) % n), apex);

  // u runs around the foot (0 and 0.5 = the sides, 0.25 = toe, 0.75 = heel),
  // v from the sole up to the top.
  const uvs: number[] = [];
  for (let k = 0; k <= rings; k++) for (let i = 0; i < n; i++) uvs.push(i / n, k / rings);
  uvs.push(0.25, 1);

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

const leather = new MeshPhysicalMaterial({
  color: 0x0d0b0a,
  roughness: 0.42,
  clearcoat: 0.45,
  clearcoatRoughness: 0.3,
});
const shoeSole = new MeshStandardMaterial({ color: 0x1a1512, roughness: 0.85 });
// The inside of a shoe gets no light worth modelling: an unlit near-black.
const shoeOpening = new MeshBasicMaterial({ color: 0x070504 });

function schoolShoe(length: number, side: number) {
  const group = new Group();
  const outline = footOutline(length, length * 0.38, side);
  group.add(shadowed(new Mesh(soleGeometry(outline, 0.016), shoeSole)));
  group.add(shadowed(new Mesh(shoeUpperGeometry(outline, length), leather)));

  // The foot opening at the back, read as a dark oval set into the top.
  const opening = new Mesh(new SphereGeometry(1, 20, 10), shoeOpening);
  opening.scale.set(length * 0.12, 0.004, length * 0.16);
  opening.position.set(0, 0.083, length * 0.26);
  group.add(opening);

  // Laces across the instep.
  const lace = new MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
  for (let i = 0; i < 3; i++) {
    const bar = new Mesh(new CapsuleGeometry(0.0022, length * 0.12, 2, 6), lace);
    bar.rotation.z = Math.PI / 2;
    bar.position.set(0, 0.089 - i * 0.005, -length * (0.02 + i * 0.05));
    group.add(bar);
  }
  return group;
}

export function shoePair(length: number) {
  const pair = new Group();
  const left = schoolShoe(length, -1);
  const right = schoolShoe(length, 1);
  left.position.x = -length * 0.22;
  right.position.x = length * 0.22;
  right.rotation.y = -0.05;
  pair.add(left, right);
  return pair;
}

/* ------------------------------------------------------------------ */
/* The father's cutlass                                                 */
/* ------------------------------------------------------------------ */

/** `broad` widens the blade (the second, heavier cutlass in the photos). */
export function cutlass(broad = 1) {
  const group = new Group();

  // Blade in the XY plane: straight spine at x = 0, edge at -x, widening
  // toward an angled tip - the farm cutlass, not a sword.
  const blade = new Shape([
    new Vector2(0, 0),
    new Vector2(0.002, 0.46),
    new Vector2(-0.012, 0.49),
    new Vector2(-0.04, 0.497),
    new Vector2(-0.062, 0.478),
    new Vector2(-0.064, 0.4),
    new Vector2(-0.055, 0.2),
    new Vector2(-0.042, 0.04),
    new Vector2(-0.034, 0),
  ]);
  const bladeGeometry = new ExtrudeGeometry(blade, {
    depth: 0.002,
    bevelEnabled: true,
    bevelThickness: 0.0007,
    bevelSize: 0.0012,
    bevelSegments: 1,
  });

  // Rusted body, bright where the edge is sharpened and the blade is used.
  const edgeDistance = (u: number, v: number) => {
    const x = -0.075 + u * 0.09;
    const y = v * 0.52;
    const edgeX = y > 0.4 ? -0.063 : -0.034 - (y / 0.4) * 0.028;
    return { x, y, d: Math.abs(x - edgeX) };
  };
  const bladeMap = colorTexture(256, (u, v) => {
    const { x, y, d } = edgeDistance(u, v);
    const rust = fbm(x * 60, y * 60, 3);
    const steel: RGB = [0.5, 0.51, 0.52];
    const body = mix([0.24, 0.24, 0.24], [0.3, 0.2, 0.14], band(rust, 0.55, 0.85));
    return mix(body, steel, 1 - band(d, 0.004, 0.016));
  });
  const bladeRM = roughMetalTexture(256, (u, v) => {
    const { x, y, d } = edgeDistance(u, v);
    const bright = 1 - band(d, 0.004, 0.016);
    const rust = band(fbm(x * 60, y * 60, 3), 0.45, 0.75);
    return [0.35 + 0.5 * rust * (1 - bright), 0.35 + 0.65 * bright];
  });
  for (const map of [bladeMap, bladeRM]) {
    map.repeat.set(1 / 0.09, 1 / 0.52);
    map.offset.set(0.075 / 0.09, 0);
  }
  const bladeMesh = shadowed(
    new Mesh(bladeGeometry, new MeshStandardMaterial({ map: bladeMap, roughnessMap: bladeRM, metalnessMap: bladeRM }))
  );
  bladeMesh.scale.x = broad;
  bladeMesh.position.z = -0.001;
  group.add(bladeMesh);

  // Wooden handle, polished dark in the middle where his hand has held it.
  const handleMap = colorTexture(128, (u, v) => {
    const grain = fbm(u * 3, v * 40, 11);
    const wood = mix([0.32, 0.19, 0.11], [0.45, 0.3, 0.18], grain);
    const grip = Math.exp(-Math.pow((v - 0.5) / 0.22, 2));
    return mix(wood, [0.16, 0.09, 0.05], grip * 0.7);
  });
  const handleRM = roughMetalTexture(128, (_u, v) => {
    const grip = Math.exp(-Math.pow((v - 0.5) / 0.22, 2));
    return [0.72 - grip * 0.36, 0];
  });
  const handle = shadowed(
    new Mesh(
      new CapsuleGeometry(0.0145, 0.1, 4, 12),
      new MeshStandardMaterial({ map: handleMap, roughnessMap: handleRM })
    )
  );
  handle.scale.z = 0.72;
  handle.position.set(-0.016, -0.065, 0);
  group.add(handle);

  const rivet = new MeshStandardMaterial({ color: 0x8a6a3a, metalness: 1, roughness: 0.4 });
  for (const y of [-0.035, -0.09]) {
    const r = new Mesh(new SphereGeometry(0.0035, 8, 6), rivet);
    r.scale.z = 0.4;
    r.position.set(-0.016, y, 0.0105);
    group.add(r);
  }

  return group;
}

/* ------------------------------------------------------------------ */
/* Cocoa pod                                                            */
/* ------------------------------------------------------------------ */

export function cocoaPod(seed: number, ripeness = 1) {
  const profile: Vector2[] = [];
  const length = 0.23;
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const r = 0.058 * Math.pow(Math.sin(Math.PI * t), 0.68) * (1 - 0.22 * t);
    profile.push(new Vector2(Math.max(r, 0.0005), (t - 0.5) * length));
  }
  const geometry = new LatheGeometry(profile, 40);

  // Ten ridges (five deep, five shallow) and a bumpy skin.
  const position = geometry.attributes.position;
  const v = new Vector3();
  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i);
    const angle = Math.atan2(v.z, v.x);
    const ridge = 0.13 * Math.pow(Math.abs(Math.cos(angle * 5)), 0.5) + 0.04 * Math.cos(angle * 10);
    const bump = 0.09 * (fbm(angle * 4 + 10, v.y * 80, seed) - 0.5);
    const scale = 1 + ridge + bump;
    position.setXYZ(i, v.x * scale, v.y, v.z * scale);
  }
  geometry.computeVertexNormals();

  const skin = colorTexture(128, (u, vv) => {
    const ripe: RGB = [0.78, 0.38, 0.04];
    const yellow: RGB = [0.8, 0.56, 0.06];
    const green: RGB = [0.36, 0.42, 0.08];
    const tone = mix(yellow, ripe, band(fbm(u * 3, vv * 3, seed + 2), 0.35, 0.75));
    const base = mix(green, tone, clamp01(ripeness - 0.3 * band(vv, 0.7, 1)));
    const blemish = band(fbm(u * 10, vv * 14, seed + 4), 0.55, 0.78);
    const speck = band(fbm(u * 60, vv * 60, seed + 8), 0.72, 0.8);
    return mix(mix(base, [0.26, 0.13, 0.05], blemish * 0.85), [0.15, 0.08, 0.03], speck);
  });
  const pod = shadowed(new Mesh(geometry, new MeshStandardMaterial({ map: skin, roughness: 0.66 })));

  const stalk = shadowed(
    new Mesh(new CylinderGeometry(0.006, 0.008, 0.035, 8), new MeshStandardMaterial({ color: 0x3b2a18, roughness: 0.9 }))
  );
  stalk.position.y = length / 2 + 0.012;
  pod.add(stalk);
  return pod;
}

/* ------------------------------------------------------------------ */
/* The mother's bread tins, on a low bench                              */
/* ------------------------------------------------------------------ */

const tinFlour = (u: number, v: number) => band(fbm(u * 6, v * 6, 22), 0.6, 0.85) * band(fbm(u * 40, v * 40, 23), 0.45, 0.7);
const tinMap = colorTexture(256, (u, v) => {
  const steel: RGB = [0.13, 0.13, 0.14];
  const burnt = band(fbm(u * 5, v * 5, 21), 0.45, 0.8);
  return mix(mix(steel, [0.05, 0.035, 0.03], burnt), FLOUR, tinFlour(u, v) * 0.55);
});
const tinRM = roughMetalTexture(256, (u, v) => {
  const flour = tinFlour(u, v);
  return [0.5 + flour * 0.4, 0.8 - flour * 0.6];
});
const tinMaterial = new MeshStandardMaterial({ map: tinMap, roughnessMap: tinRM, metalnessMap: tinRM, side: DoubleSide });

function loafTin() {
  const group = new Group();
  const [w, h, d, t] = [0.27, 0.085, 0.115, 0.0025];
  const parts: [number, number, number, number, number, number][] = [
    [w, t, d, 0, t / 2, 0],
    [w, h, t, 0, h / 2, d / 2],
    [w, h, t, 0, h / 2, -d / 2],
    [t, h, d, w / 2, h / 2, 0],
    [t, h, d, -w / 2, h / 2, 0],
  ];
  for (const [sx, sy, sz, x, y, z] of parts) {
    const part = shadowed(new Mesh(new BoxGeometry(sx, sy, sz), tinMaterial));
    part.position.set(x, y, z);
    group.add(part);
  }
  return group;
}

export function bakingBench() {
  const group = new Group();
  const woodMap = colorTexture(128, (u, v) => {
    const grain = fbm(u * 4, v * 50, 31);
    return mix([0.2, 0.16, 0.12], [0.34, 0.28, 0.21], grain);
  });
  const wood = new MeshStandardMaterial({ map: woodMap, roughness: 0.85 });

  const top = shadowed(new Mesh(new BoxGeometry(0.95, 0.035, 0.3), wood));
  top.position.y = 0.38;
  group.add(top);
  for (const x of [-0.42, 0.42]) {
    for (const z of [-0.11, 0.11]) {
      const leg = shadowed(new Mesh(new BoxGeometry(0.04, 0.38, 0.04), wood));
      leg.position.set(x, 0.19, z);
      group.add(leg);
    }
  }

  // Three tins, stacked the way they're left to cool and dry.
  const offsets: [number, number, number, number][] = [
    [-0.2, 0.4, 0.0, 0.04],
    [0.13, 0.4, 0.01, -0.06],
    [0.16, 0.488, -0.005, 0.1],
  ];
  for (const [x, y, z, rot] of offsets) {
    const tin = loafTin();
    tin.position.set(x, y, z);
    tin.rotation.y = rot;
    group.add(tin);
  }
  return group;
}

/* ------------------------------------------------------------------ */
/* Hurricane lantern                                                    */
/* ------------------------------------------------------------------ */

export interface Lantern {
  group: Group;
  flame: Mesh;
  /** Soft halo around the flame (a cheap stand-in for bloom). */
  glow: Sprite;
  /** Local position of the flame, where the light should sit. */
  flameOffset: Vector3;
  glass: MeshPhysicalMaterial;
}

export function hurricaneLantern(): Lantern {
  const group = new Group();

  const paint = colorTexture(128, (u, v) => {
    const chip = band(fbm(u * 20, v * 20, 41), 0.68, 0.74);
    return mix([0.5, 0.06, 0.04], [0.3, 0.3, 0.3], chip);
  });
  const paintRM = roughMetalTexture(128, (u, v) => {
    const chip = band(fbm(u * 20, v * 20, 41), 0.68, 0.74);
    return [0.55 - chip * 0.15, 0.2 + chip * 0.7];
  });
  const painted = new MeshStandardMaterial({ map: paint, roughnessMap: paintRM, metalnessMap: paintRM });
  const wire = new MeshStandardMaterial({ color: 0x3a3a3a, metalness: 1, roughness: 0.45 });
  const brass = new MeshStandardMaterial({ color: 0x9a7a3a, metalness: 1, roughness: 0.35 });

  const lathe = (pts: [number, number][], material: Material, segments = 32) =>
    shadowed(new Mesh(new LatheGeometry(pts.map(([r, y]) => new Vector2(r, y)), segments), material));

  group.add(
    lathe(
      [
        [0, 0],
        [0.066, 0],
        [0.076, 0.012],
        [0.078, 0.036],
        [0.062, 0.056],
        [0.03, 0.062],
        [0, 0.062],
      ],
      painted
    )
  );
  const burner = shadowed(new Mesh(new CylinderGeometry(0.022, 0.026, 0.016, 16), brass));
  burner.position.y = 0.069;
  group.add(burner);

  const glass = new MeshPhysicalMaterial({
    color: 0xfff1d8,
    roughness: 0.08,
    metalness: 0,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
    side: DoubleSide,
    emissive: new Color(1.0, 0.55, 0.2),
    emissiveIntensity: 0,
  });
  const globe = new Mesh(
    new LatheGeometry(
      [
        [0.026, 0.077],
        [0.046, 0.097],
        [0.058, 0.14],
        [0.051, 0.18],
        [0.03, 0.2],
      ].map(([r, y]) => new Vector2(r, y)),
      32
    ),
    glass
  );
  group.add(globe);

  group.add(
    lathe(
      [
        [0.03, 0.198],
        [0.044, 0.212],
        [0.04, 0.224],
        [0.018, 0.238],
        [0.012, 0.25],
        [0, 0.25],
      ],
      painted
    )
  );

  // Wire guard around the globe.
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const curve = new CatmullRomCurve3(
      [
        [0.05, 0.065],
        [0.066, 0.1],
        [0.072, 0.14],
        [0.064, 0.185],
        [0.044, 0.208],
      ].map(([r, y]) => new Vector3(Math.cos(a) * r, y, Math.sin(a) * r))
    );
    group.add(shadowed(new Mesh(new TubeGeometry(curve, 16, 0.0016, 5), wire)));
  }
  const ring = new Mesh(new TorusGeometry(0.069, 0.0018, 5, 40), wire);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.12;
  group.add(ring);

  // Bail handle, resting folded to one side.
  const bail = shadowed(new Mesh(new TorusGeometry(0.08, 0.0022, 6, 32, Math.PI), wire));
  bail.position.y = 0.06;
  bail.rotation.set(0, 0.3, 0);
  bail.rotation.x = -1.2;
  group.add(bail);

  const flame = new Mesh(new SphereGeometry(0.007, 12, 8), new MeshBasicMaterial({ color: new Color(4, 1.9, 0.6) }));
  flame.scale.set(1, 2.6, 1);
  flame.position.y = 0.095;
  group.add(flame);

  const glow = new Sprite(
    new SpriteMaterial({
      map: blobShadowTexture(),
      color: new Color(1.0, 0.55, 0.22),
      blending: AdditiveBlending,
      depthWrite: false,
      transparent: true,
    })
  );
  glow.scale.setScalar(0.3);
  glow.position.y = 0.1;
  group.add(glow);

  return { group, flame, glow, flameOffset: new Vector3(0, 0.1, 0), glass };
}

/* ------------------------------------------------------------------ */
/* Taxi keys on a nail                                                  */
/* ------------------------------------------------------------------ */

export function taxiKeys() {
  const group = new Group();
  const steel = new MeshStandardMaterial({ color: 0x9a9a98, metalness: 1, roughness: 0.32 });
  const nail = shadowed(new Mesh(new CylinderGeometry(0.003, 0.003, 0.05, 6), steel));
  nail.rotation.x = Math.PI / 2;
  nail.position.z = 0.025;
  group.add(nail);

  const ring = shadowed(new Mesh(new TorusGeometry(0.014, 0.0014, 6, 24), steel));
  ring.position.set(0, -0.012, 0.035);
  group.add(ring);

  const key = new Shape([
    new Vector2(-0.008, 0),
    new Vector2(0.008, 0),
    new Vector2(0.008, -0.016),
    new Vector2(0.003, -0.02),
    new Vector2(0.003, -0.05),
    new Vector2(-0.001, -0.054),
    new Vector2(-0.004, -0.048),
    new Vector2(-0.003, -0.02),
    new Vector2(-0.008, -0.016),
  ]);
  const keyGeometry = new ExtrudeGeometry(key, { depth: 0.0018, bevelEnabled: false });
  const brass = new MeshStandardMaterial({ color: 0xb08d4a, metalness: 1, roughness: 0.3 });
  for (const [x, rot, material] of [
    [-0.004, 0.18, steel],
    [0.005, -0.12, brass],
  ] as const) {
    const k = shadowed(new Mesh(keyGeometry, material));
    k.position.set(x, -0.024, 0.034);
    k.rotation.z = rot;
    group.add(k);
  }

  // The car key's fob, and a taxi-yellow tag.
  const fob = shadowed(new Mesh(new BoxGeometry(0.024, 0.042, 0.011), new MeshStandardMaterial({ color: 0x111111, roughness: 0.5 })));
  fob.position.set(0.012, -0.058, 0.036);
  fob.rotation.z = -0.25;
  group.add(fob);
  const tag = shadowed(new Mesh(new BoxGeometry(0.02, 0.03, 0.003), new MeshStandardMaterial({ color: 0xe8a516, roughness: 0.6 })));
  tag.position.set(-0.014, -0.05, 0.033);
  tag.rotation.z = 0.3;
  group.add(tag);

  return group;
}

/* ------------------------------------------------------------------ */
/* Firewood for the oven                                                */
/* ------------------------------------------------------------------ */

export function firewood() {
  const group = new Group();
  const bark = colorTexture(128, (u, v) => {
    const n = fbm(u * 10, v * 30, 51);
    return mix([0.2, 0.15, 0.11], [0.38, 0.31, 0.24], n);
  });
  const material = new MeshStandardMaterial({ map: bark, roughness: 0.95 });
  const logs: [number, number, number, number, number][] = [
    [0, 0.045, 0, 0.045, 0.1],
    [0.095, 0.045, 0.02, 0.042, -0.05],
    [0.19, 0.04, -0.01, 0.04, 0.06],
    [0.05, 0.125, 0.01, 0.04, -0.08],
    [0.14, 0.12, 0.0, 0.038, 0.12],
  ];
  for (const [x, y, z, r, rot] of logs) {
    const log = shadowed(new Mesh(new CylinderGeometry(r, r * 1.08, 0.75, 10), material));
    log.rotation.set(Math.PI / 2, 0, 0);
    log.rotation.y = rot;
    log.position.set(x, y, z);
    group.add(log);
  }
  return group;
}

/* ------------------------------------------------------------------ */
/* The father's rubber boots                                            */
/* ------------------------------------------------------------------ */

const bootRubber = (seed: number) => {
  const green: RGB = [0.1, 0.19, 0.13];
  // Mud dries in a tide line: heavy at the foot, splashed up the shaft.
  const map = colorTexture(256, (u, v) => {
    const splash = fbm(u * 18, v * 18, seed);
    const tide = band(0.42 - v + (splash - 0.5) * 0.35, 0, 0.18);
    const dust = band(fbm(u * 6, v * 6, seed + 3), 0.55, 0.8) * 0.35;
    return mix(green, mix([0.42, 0.33, 0.24], [0.55, 0.42, 0.3], splash), clamp01(tide + dust));
  });
  return new MeshStandardMaterial({ map, roughness: 0.62 });
};

function boot(side: number, seed: number) {
  const group = new Group();
  const length = 0.3;
  const outline = footOutline(length, 0.115, side);
  const rubber = bootRubber(seed);

  group.add(shadowed(new Mesh(soleGeometry(outline, 0.022), new MeshStandardMaterial({ color: 0x1b1a17, roughness: 0.9 }))));
  group.add(shadowed(new Mesh(shoeUpperGeometry(outline, length), rubber)));

  // The shaft rises over the heel; open at the top.
  const shaft = shadowed(new Mesh(new CylinderGeometry(0.062, 0.058, 0.3, 24, 1, true), rubber));
  shaft.scale.z = 0.82;
  shaft.position.set(0, 0.22, length * 0.2);
  shaft.rotation.x = -0.06;
  group.add(shaft);
  const inside = new Mesh(new CylinderGeometry(0.058, 0.054, 0.12, 20, 1, true), new MeshBasicMaterial({ color: 0x050505, side: BackSide }));
  inside.scale.z = 0.8;
  inside.position.set(0, 0.31, length * 0.21);
  group.add(inside);
  const rim = shadowed(new Mesh(new TorusGeometry(0.062, 0.006, 6, 28), rubber));
  rim.rotation.x = Math.PI / 2 - 0.06;
  rim.scale.y = 0.82;
  rim.position.set(0, 0.37, length * 0.21);
  group.add(rim);
  return group;
}

export function bootPair() {
  const pair = new Group();
  const left = boot(-1, 81);
  const right = boot(1, 87);
  left.position.set(-0.075, 0, 0.02);
  left.rotation.y = 0.12;
  right.position.set(0.075, 0, -0.02);
  right.rotation.y = -0.2;
  // One boot leans, the way they're left after a day on the farm.
  right.rotation.z = -0.05;
  pair.add(left, right);
  return pair;
}

/* ------------------------------------------------------------------ */
/* Bread tins, stacked in towers (one draw call)                        */
/* ------------------------------------------------------------------ */

function tinGeometry() {
  const [w, h, d, t] = [0.26, 0.085, 0.11, 0.0022];
  const parts: BufferGeometry[] = [];
  const add = (sx: number, sy: number, sz: number, x: number, y: number, z: number) => {
    const g = new BoxGeometry(sx, sy, sz);
    g.translate(x, y, z);
    parts.push(g);
  };
  add(w, t, d, 0, t / 2, 0);
  add(w, h, t, 0, h / 2, d / 2);
  add(w, h, t, 0, h / 2, -d / 2);
  add(t, h, d, w / 2, h / 2, 0);
  add(t, h, d, -w / 2, h / 2, 0);
  // A rolled lip around the rim.
  add(w + 0.016, 0.006, 0.01, 0, h, d / 2);
  add(w + 0.016, 0.006, 0.01, 0, h, -d / 2);
  add(0.01, 0.006, d + 0.016, w / 2, h, 0);
  add(0.01, 0.006, d + 0.016, -w / 2, h, 0);
  return mergeGeometries(parts)!;
}

const galvanised = () => {
  const map = colorTexture(256, (u, v) => {
    const spangle = fbm(u * 40, v * 40, 91);
    const stain = band(fbm(u * 4, v * 4, 93), 0.5, 0.85);
    const flour = band(fbm(u * 12, v * 12, 95), 0.66, 0.8);
    const metal = mix([0.36, 0.37, 0.37], [0.48, 0.49, 0.48], spangle);
    return mix(mix(metal, [0.16, 0.14, 0.12], stain * 0.7), FLOUR, flour * 0.3);
  });
  const rm = roughMetalTexture(256, (u, v) => {
    const stain = band(fbm(u * 4, v * 4, 93), 0.5, 0.85);
    return [0.32 + stain * 0.4, 0.95 - stain * 0.5];
  });
  return new MeshStandardMaterial({ map, roughnessMap: rm, metalnessMap: rm });
};

/** Towers of nested loaf tins: years of baking, stacked. */
export function tinTowers(heights: number[], seed: number) {
  const geometry = tinGeometry();
  const total = heights.reduce((a, b) => a + b, 0);
  const towers = new InstancedMesh(geometry, galvanised(), total);
  towers.castShadow = true;
  towers.receiveShadow = true;
  const matrix = new Matrix4();
  const q = new Quaternion();
  const euler = new Euler();
  const pos = new Vector3();
  const scale = new Vector3(1, 1, 1);
  let index = 0;
  heights.forEach((count, tower) => {
    const baseX = tower * 0.3 + (fbm(tower, 1, seed) - 0.5) * 0.06;
    const baseZ = (tower % 2) * 0.14 + (fbm(tower, 2, seed) - 0.5) * 0.05;
    for (let i = 0; i < count; i++) {
      const jitter = (k: number) => (fbm(tower * 31 + i, k, seed) - 0.5);
      pos.set(baseX + jitter(1) * 0.014, i * 0.042, baseZ + jitter(2) * 0.014);
      euler.set(jitter(3) * 0.02, 1.57 + jitter(4) * 0.08, jitter(5) * 0.02);
      q.setFromEuler(euler);
      towers.setMatrixAt(index++, matrix.compose(pos, q, scale));
    }
  });
  return towers;
}

/* ------------------------------------------------------------------ */
/* The mother's oven: a steel cabinet with glass doors                  */
/* ------------------------------------------------------------------ */

export interface Oven {
  group: Group;
  /** The glass panels, which glow while it's fired. */
  windows: MeshStandardMaterial;
}

export function breadOven(): Oven {
  const group = new Group();
  const steel = galvanised();
  steel.color.setRGB(0.55, 0.55, 0.52);
  const [w, h, d] = [1.15, 1.05, 0.72];
  const body = shadowed(new Mesh(new BoxGeometry(w, h, d), steel));
  body.position.y = 0.14 + h / 2;
  group.add(body);

  // Short legs and a dark plinth gap underneath.
  const legMaterial = new MeshStandardMaterial({ color: 0x2a2826, metalness: 0.8, roughness: 0.6 });
  for (const x of [-w / 2 + 0.05, w / 2 - 0.05]) {
    for (const z of [-d / 2 + 0.05, d / 2 - 0.05]) {
      const leg = shadowed(new Mesh(new BoxGeometry(0.04, 0.14, 0.04), legMaterial));
      leg.position.set(x, 0.07, z);
      group.add(leg);
    }
  }

  const windows = new MeshStandardMaterial({
    color: 0x0c0b0a,
    roughness: 0.12,
    metalness: 0.3,
    emissive: new Color(1.0, 0.3, 0.05),
    emissiveIntensity: 0,
  });
  const frame = new MeshStandardMaterial({ color: 0x3a3936, metalness: 0.85, roughness: 0.45 });
  for (const x of [-w / 4, w / 4]) {
    const door = shadowed(new Mesh(new BoxGeometry(w / 2 - 0.04, h - 0.1, 0.02), frame));
    door.position.set(x, 0.14 + h / 2, d / 2 + 0.01);
    const glass = new Mesh(new BoxGeometry(w / 2 - 0.16, h - 0.36, 0.01), windows);
    glass.position.set(x, 0.14 + h / 2 + 0.05, d / 2 + 0.021);
    const handle = shadowed(new Mesh(new BoxGeometry(0.02, 0.16, 0.025), legMaterial));
    handle.position.set(x + (x < 0 ? w / 4 - 0.05 : -w / 4 + 0.05), 0.14 + h / 2, d / 2 + 0.035);
    group.add(door, glass, handle);
  }
  return { group, windows };
}

/* ------------------------------------------------------------------ */
/* Breeze-block lattice (the white veranda wall)                        */
/* ------------------------------------------------------------------ */

/** One 30cm decorative block per texture tile: white = concrete, black = hole. */
export function latticeAlpha(): Texture {
  return colorTexture(256, (u, v) => {
    const x = u * 2 - 1;
    const y = v * 2 - 1;
    const border = Math.max(Math.abs(x), Math.abs(y)) > 0.86;
    // A ring of four curved openings, broken by solid ribs along the
    // diagonals, around a small diamond hole - the pattern in the photos.
    const r = Math.hypot(x, y);
    const ring = r > 0.38 && r < 0.8 && Math.abs(Math.abs(x) - Math.abs(y)) > 0.16;
    const diamond = Math.abs(x) + Math.abs(y) < 0.2;
    const holes = !border && (ring || diamond);
    const a = holes ? 0 : 1;
    return [a, a, a];
  });
}

/* ------------------------------------------------------------------ */
/* Palms on the horizon                                                 */
/* ------------------------------------------------------------------ */

/** A coconut palm silhouette painted on a canvas, for distant billboards. */
export function palmSilhouette(seed: number): Texture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  const lean = (fbm(seed, 1, 101) - 0.5) * 70;
  const topX = size / 2 + lean;
  const topY = size * 0.24;
  // Trunk: a gentle curve, thicker at the base.
  ctx.beginPath();
  ctx.moveTo(size / 2 - 6, size);
  ctx.quadraticCurveTo(size / 2 + lean * 0.2, size * 0.6, topX - 2, topY);
  ctx.lineTo(topX + 2, topY);
  ctx.quadraticCurveTo(size / 2 + lean * 0.2 + 6, size * 0.6, size / 2 + 6, size);
  ctx.fill();
  // Fronds: arcs that droop, with leaflets along them.
  const fronds = 9;
  for (let i = 0; i < fronds; i++) {
    const angle = (i / fronds) * Math.PI * 2 + fbm(seed, i, 103);
    const reach = 55 + fbm(seed, i, 105) * 30;
    const endX = topX + Math.cos(angle) * reach;
    const endY = topY + Math.abs(Math.sin(angle)) * 18 + 30;
    const ctrlX = topX + Math.cos(angle) * reach * 0.6;
    const ctrlY = topY - 18 + Math.sin(angle) * 8;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
    ctx.stroke();
    ctx.lineWidth = 1.2;
    for (let k = 1; k < 12; k++) {
      const t = k / 12;
      const px = (1 - t) * (1 - t) * topX + 2 * (1 - t) * t * ctrlX + t * t * endX;
      const py = (1 - t) * (1 - t) * topY + 2 * (1 - t) * t * ctrlY + t * t * endY;
      const len = 16 * (1 - t * 0.6);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + Math.cos(angle + 1.2) * len * 0.4, py + len);
      ctx.moveTo(px, py);
      ctx.lineTo(px + Math.cos(angle - 1.2) * len * 0.4, py + len);
      ctx.stroke();
    }
  }
  return new CanvasTexture(canvas);
}

/* ------------------------------------------------------------------ */
/* His sneakers: black, chunky, white side panels                       */
/* ------------------------------------------------------------------ */

const sneakerUpperMap = colorTexture(256, (u, v) => {
  const black: RGB = [0.035, 0.035, 0.04];
  const white: RGB = [0.82, 0.82, 0.8];
  const side = Math.min(Math.abs(u - 0.5), Math.abs(u), Math.abs(u - 1));
  const panel = side < 0.11 && v > 0.28 && v < 0.62 && Math.abs(v - 0.45 - side * 0.8) < 0.1;
  const heelTab = Math.abs(u - 0.75) < 0.05 && v > 0.55;
  const mesh = fbm(u * 120, v * 60, 121) * 0.04;
  return panel || heelTab ? white : [black[0] + mesh, black[1] + mesh, black[2] + mesh];
});

function sneaker(length: number, side: number) {
  const group = new Group();
  const outline = footOutline(length, length * 0.4, side);
  const white = new MeshStandardMaterial({ color: 0xd8d6d0, roughness: 0.6 });
  const rubber = new MeshStandardMaterial({ color: 0x0c0c0d, roughness: 0.8 });
  const outsole = shadowed(new Mesh(soleGeometry(outline, 0.016), rubber));
  const midsole = shadowed(new Mesh(soleGeometry(outline, 0.008), white));
  midsole.position.y = 0.019;
  group.add(outsole, midsole);

  const upper = shadowed(
    new Mesh(shoeUpperGeometry(outline, length, 1.3), new MeshStandardMaterial({ map: sneakerUpperMap, roughness: 0.7 }))
  );
  upper.position.y = 0.012;
  group.add(upper);

  const opening = new Mesh(new SphereGeometry(1, 20, 10), shoeOpening);
  opening.scale.set(length * 0.13, 0.004, length * 0.17);
  opening.position.set(0, 0.112, length * 0.25);
  group.add(opening);

  // Black laces with white tips, loose.
  const lace = new MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.9 });
  const tip = new MeshStandardMaterial({ color: 0xe8e8e4, roughness: 0.6 });
  for (let i = 0; i < 4; i++) {
    const bar = new Mesh(new CapsuleGeometry(0.0026, length * 0.13, 2, 6), lace);
    bar.rotation.set(0, 0.15 * (i % 2 ? 1 : -1), Math.PI / 2);
    bar.position.set(0, 0.124 - i * 0.007, -length * (0.0 + i * 0.05));
    group.add(bar);
  }
  for (const s of [-1, 1]) {
    const end = new Mesh(new CapsuleGeometry(0.0025, 0.045, 2, 6), lace);
    end.position.set(s * 0.03, 0.06, -length * 0.08);
    end.rotation.set(0.4, 0, s * 0.9);
    const aglet = new Mesh(new CapsuleGeometry(0.0028, 0.01, 2, 6), tip);
    aglet.position.set(s * 0.052, 0.042, -length * 0.08);
    aglet.rotation.copy(end.rotation);
    group.add(end, aglet);
  }
  return group;
}

export function sneakerPair(length: number) {
  const pair = new Group();
  const left = sneaker(length, -1);
  const right = sneaker(length, 1);
  left.position.x = -length * 0.24;
  right.position.set(length * 0.24, 0, -0.02);
  right.rotation.y = -0.04;
  pair.add(left, right);
  return pair;
}

/* ------------------------------------------------------------------ */
/* Framed pictures on the veranda wall                                  */
/* ------------------------------------------------------------------ */

export const FRAME_PHOTO_WIDTH = 0.82;
export const FRAME_PHOTO_HEIGHT = 0.54;

const frameWood = colorTexture(128, (u, v) => {
  const grain = fbm(u * 3, v * 40, 131);
  return mix([0.12, 0.07, 0.04], [0.22, 0.13, 0.08], grain);
});

/** A dark wooden frame with a cream mat, the way family and graduation
    photos hang on a Ghanaian veranda. The photo material is returned so the
    caller can set its texture once the image has loaded. */
export function pictureFrame() {
  const group = new Group();
  const wood = new MeshStandardMaterial({ map: frameWood, roughness: 0.45 });
  const [w, h, border, depth] = [1.0, 0.72, 0.045, 0.035];

  const sides: [number, number, number, number][] = [
    [w, border, 0, h / 2 - border / 2],
    [w, border, 0, -h / 2 + border / 2],
    [border, h, w / 2 - border / 2, 0],
    [border, h, -w / 2 + border / 2, 0],
  ];
  for (const [sx, sy, x, y] of sides) {
    const side = shadowed(new Mesh(new BoxGeometry(sx, sy, depth), wood));
    side.position.set(x, y, depth / 2);
    group.add(side);
  }

  const mat = new Mesh(new PlaneGeometry(w - border * 2, h - border * 2), new MeshStandardMaterial({ color: 0xe9e1cf, roughness: 0.9 }));
  mat.position.z = 0.006;
  mat.receiveShadow = true;
  group.add(mat);

  // A little light of its own, so the picture still reads in the shade
  // under the roof (as if lit by the bright yard behind the camera).
  const photo = new MeshStandardMaterial({ color: 0x777777, roughness: 0.55, emissive: 0xffffff, emissiveIntensity: 0 });
  const picture = new Mesh(new PlaneGeometry(FRAME_PHOTO_WIDTH, FRAME_PHOTO_HEIGHT), photo);
  picture.position.z = 0.008;
  picture.receiveShadow = true;
  group.add(picture);

  return { group, photo };
}

/* ------------------------------------------------------------------ */
/* The father's taxi: blue, with the orange corners Ghana's taxis wear  */
/* ------------------------------------------------------------------ */

export function taxi() {
  const group = new Group();
  // Length runs along x (front at +x); everything sits on the ground.
  const dust = (color: number) =>
    new MeshStandardMaterial({
      color,
      roughness: 0.38,
      metalness: 0.45,
      map: colorTexture(128, (u, v) => {
        const grime = band(1 - v, 0.45, 1) * band(fbm(u * 6, v * 6, 151), 0.3, 0.75);
        return mix([1, 1, 1], [0.78, 0.62, 0.5], grime * 0.8);
      }),
    });
  const blue = dust(0x1f4fa3);
  const orange = dust(0xe8771a);
  const glass = new MeshPhysicalMaterial({ color: 0x0c1218, roughness: 0.08, metalness: 0.3, clearcoat: 1 });
  const rubber = new MeshStandardMaterial({ color: 0x141414, roughness: 0.9 });
  const steel = new MeshStandardMaterial({ color: 0xb8b8b4, metalness: 1, roughness: 0.3 });
  const trim = new MeshStandardMaterial({ color: 0x1b1b1b, roughness: 0.6 });

  const rounded = (w: number, h: number, d: number, r: number, material: Material, x: number, y: number, z = 0) => {
    const mesh = shadowed(new Mesh(new RoundedBoxGeometry(w, h, d, 3, r), material));
    mesh.position.set(x, y, z);
    group.add(mesh);
    return mesh;
  };

  // Lower body.
  rounded(4.4, 0.6, 1.72, 0.14, blue, 0, 0.58);

  // The cabin: a box whose top is pulled in, so the windshield and the rear
  // glass slope like a sedan's. Glass all round, a blue roof on top.
  const cabin = new BoxGeometry(2.5, 0.56, 1.52);
  const p = cabin.attributes.position;
  for (let i = 0; i < p.count; i++) {
    if (p.getY(i) > 0) {
      p.setX(i, p.getX(i) * 0.66 - 0.12);
      p.setZ(i, p.getZ(i) * 0.9);
    }
  }
  cabin.computeVertexNormals();
  const glassHouse = shadowed(new Mesh(cabin, glass));
  glassHouse.position.set(-0.12, 1.16, 0);
  group.add(glassHouse);
  rounded(1.62, 0.07, 1.4, 0.03, blue, -0.2, 1.46);
  // Door pillars, so the glass reads as windows.
  for (const x of [-0.18]) rounded(0.08, 0.5, 1.46, 0.02, blue, x, 1.16);

  // The orange corners, the way Ghana's taxis wear them: front and rear
  // fenders and bumpers, below the hood line (the hood stays blue).
  rounded(0.78, 0.46, 1.75, 0.12, orange, 1.83, 0.5);
  rounded(0.78, 0.46, 1.75, 0.12, orange, -1.83, 0.5);

  // Lights and grille.
  const headlight = new MeshStandardMaterial({ color: 0xf2efe6, emissive: 0xfff3d0, emissiveIntensity: 0.15, roughness: 0.2 });
  const taillight = new MeshStandardMaterial({ color: 0x8a1010, emissive: 0x500000, emissiveIntensity: 0.3, roughness: 0.3 });
  for (const z of [-0.6, 0.6]) {
    rounded(0.06, 0.13, 0.32, 0.03, headlight, 2.21, 0.7, z);
    rounded(0.06, 0.12, 0.28, 0.03, taillight, -2.21, 0.72, z);
  }
  rounded(0.05, 0.12, 0.7, 0.03, trim, 2.22, 0.66);
  rounded(0.04, 0.12, 0.34, 0.02, new MeshStandardMaterial({ color: 0xf0f0ea, roughness: 0.5 }), 2.23, 0.42);

  // Wheels with steel rims, and dark arches above them.
  for (const x of [1.38, -1.36]) {
    for (const z of [-0.78, 0.78]) {
      const tyre = shadowed(new Mesh(new CylinderGeometry(0.31, 0.31, 0.21, 24), rubber));
      tyre.rotation.x = Math.PI / 2;
      tyre.position.set(x, 0.31, z);
      const rim = new Mesh(new CylinderGeometry(0.18, 0.18, 0.22, 16), steel);
      rim.rotation.x = Math.PI / 2;
      rim.position.copy(tyre.position);
      group.add(tyre, rim);
    }
  }
  // Side mirrors.
  for (const z of [-0.86, 0.86]) rounded(0.12, 0.08, 0.1, 0.02, blue, 0.98, 0.98, z);

  return group;
}

/* ------------------------------------------------------------------ */
/* The family name, painted on the gate                                 */
/* ------------------------------------------------------------------ */

/** "OPPONG / FAMILY", hand-painted in cream on the wooden gate, the way
    families in Ghana mark whose house it is. Drawn on a canvas once the
    page's fonts are ready, laid on the gate as paint (lit like the wood). */
export function familyName(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = Math.round((1024 * height) / width);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;

  const paint = () => {
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // A brush leaves uneven paint: a few passes, slightly offset, at
    // different strengths.
    const brush = (text: string, size: number, y: number, spacing: number) => {
      ctx.font = `800 ${size}px Inter, "Arial Black", sans-serif`;
      ctx.letterSpacing = `${spacing}px`;
      for (let i = 0; i < 4; i++) {
        ctx.globalAlpha = i === 0 ? 0.92 : 0.18;
        ctx.fillStyle = "#efe4c8";
        ctx.fillText(text, w / 2 + (fbm(i, 1, 171) - 0.5) * 3, y + (fbm(i, 2, 173) - 0.5) * 3);
      }
    };
    brush("OPPONG", h * 0.42, h * 0.36, w * 0.012);
    brush("FAMILY", h * 0.2, h * 0.75, w * 0.03);
    // A painted underline between the two.
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = "#efe4c8";
    ctx.fillRect(w * 0.3, h * 0.585, w * 0.4, h * 0.022);
    // Weathering: wipe paint away in small patches so the wood shows through.
    ctx.globalCompositeOperation = "destination-out";
    for (let i = 0; i < 260; i++) {
      ctx.globalAlpha = 0.25 + fbm(i, 3, 179) * 0.5;
      const r = 1 + fbm(i, 4, 181) * 5;
      ctx.beginPath();
      ctx.arc(fbm(i, 5, 183) * w, fbm(i, 6, 187) * h, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    texture.needsUpdate = true;
  };

  paint();
  // Repaint once the web font is in, so the letters are Inter, not a fallback.
  document.fonts?.ready.then(paint);

  const mesh = new Mesh(
    new PlaneGeometry(width, height),
    new MeshStandardMaterial({
      map: texture,
      transparent: true,
      roughness: 0.85,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    })
  );
  mesh.receiveShadow = true;
  return mesh;
}
