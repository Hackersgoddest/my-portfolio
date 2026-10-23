import {
  AgXToneMapping,
  BackSide,
  BoxGeometry,
  DoubleSide,
  Color,
  DirectionalLight,
  Fog,
  Group,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  RepeatWrapping,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  HalfFloatType,
  OrthographicCamera,
  Vector2,
  WebGLRenderTarget,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  WebGLRenderer,
  type Texture,
} from "three";
import { Sky } from "three/addons/objects/Sky.js";
import { createLighting, lightingAt, mixLighting } from "./lighting";
import {
  bootPair,
  breadOven,
  familyName,
  cocoaPod,
  cutlass,
  FRAME_PHOTO_HEIGHT,
  FRAME_PHOTO_WIDTH,
  pictureFrame,
  firewood,
  hurricaneLantern,
  latticeAlpha,
  palmSilhouette,
  shoePair,
  slipperPair,
  sneakerPair,
  taxi,
  taxiKeys,
  tinTowers,
} from "./props";
import { effectiveHour, NEXT_DAWN_HOUR, onSceneStateChange, PRE_DAWN_HOUR, sceneState } from "./state";
import { blobShadowTexture, colorTexture, fbm } from "./textures";
import { weather } from "./weathering";
import { HOURS, projectHour } from "./hours";
import projects from "../data/projects";
import { thumbnail } from "../utils/thumbnail";
import { addTick } from "../lib/ticker";

export type Tier = "high" | "mid" | "low";

export interface DoorstepOptions {
  tier: Tier;
  /** Called once the first frame (with textures) has been drawn. */
  onReady: () => void;
  /** Called if the device can't keep up; the page falls back to stills. */
  onGiveUp: () => void;
  /** Measure frame times at startup and back off if too slow (default true). */
  probe?: boolean;
  /** Where each project's picture is on screen (CSS px), after each redraw;
      null for frames out of view. Lets the page put real buttons on them. */
  onFrames?: (rects: Array<FrameRect | null>) => void;
}

export interface FrameRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

const TEXTURE_ROOT = "/scene/textures/";

/* ------------------------------------------------------------------ */
/* Surfaces                                                             */
/* ------------------------------------------------------------------ */

function surface(loader: TextureLoader, name: string, repeatX: number, repeatY: number, tint = 0xffffff) {
  const load = (suffix: string, color = false) => {
    const texture = loader.load(`${TEXTURE_ROOT}${name}_${suffix}.webp`);
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.anisotropy = 8;
    if (color) texture.colorSpace = SRGBColorSpace;
    return texture;
  };
  const arm = load("arm");
  return new MeshStandardMaterial({
    color: tint,
    map: load("diff", true),
    normalMap: load("nor"),
    aoMap: arm,
    roughnessMap: arm,
    metalnessMap: arm,
  });
}

function box(width: number, height: number, depth: number, material: MeshStandardMaterial | MeshBasicMaterial) {
  const geometry = new BoxGeometry(width, height, depth);
  geometry.setAttribute("uv1", geometry.attributes.uv); // aoMap reads uv1
  const mesh = new Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** A soft dark pool under an object, so it sits on the ground instead of floating. */
function contactShadow(texture: Texture, width: number, depth: number, opacity = 0.55) {
  const mesh = new Mesh(
    new PlaneGeometry(width, depth),
    new MeshBasicMaterial({ color: 0x000000, alphaMap: texture, transparent: true, opacity, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.renderOrder = 1;
  return mesh;
}

/* ------------------------------------------------------------------ */
/* The house and the doorstep                                           */
/* ------------------------------------------------------------------ */

/** Gradient dome behind everything: haze at the horizon, sky above. It uses
    the fog colour at the horizon so the ground melts into it seamlessly. */
function skyDome() {
  const material = new ShaderMaterial({
    side: BackSide,
    depthWrite: false,
    fog: false,
    uniforms: { horizon: { value: new Color() }, zenith: { value: new Color() } },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 horizon;
      uniform vec3 zenith;
      varying vec3 vDir;
      void main() {
        float h = smoothstep(0.0, 0.45, max(vDir.y, 0.0));
        gl_FragColor = vec4(mix(horizon, zenith, h), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new Mesh(new SphereGeometry(120, 32, 16), material);
  mesh.renderOrder = -1;
  const zenith = new Color();
  return {
    mesh,
    update(fogColor: Color, skyColor: Color, brightness: number) {
      material.uniforms.horizon.value.copy(fogColor);
      zenith.copy(skyColor).multiplyScalar(0.55 + brightness * 0.5);
      material.uniforms.zenith.value.copy(zenith).lerp(fogColor, 0.35);
    },
  };
}

/** The road away from the house: a smoother, paler track of red earth. */
function road() {
  const length = 70;
  const geometry = new PlaneGeometry(1.7, length, 1, 60);
  geometry.setAttribute("uv1", geometry.attributes.uv);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const along = position.getY(i) + length / 2; // 0 at the house
    position.setX(i, position.getX(i) * (1 + along * 0.012) - Math.sin(along * 0.09) * 1.6 * Math.min(1, along / 12));
  }
  const edges = colorTexture(64, (u) => {
    const a = Math.pow(Math.sin(Math.PI * u), 0.6);
    return [a, a, a];
  });
  // Packed, smoothed earth: paler and finer than the stony ground around it.
  const material = weather(new MeshStandardMaterial({ color: 0xb8714a, roughness: 1 }), { scale: 0.6, stains: 0.45 });
  material.alphaMap = edges;
  material.transparent = true;
  material.depthWrite = false;
  material.roughness = 1;
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(0.45, 0.004, 0.95 + length / 2);
  mesh.receiveShadow = true;
  return mesh;
}

// Layout, from the photos of the house: a raised veranda behind a low green
// wall topped with white breeze blocks, three concrete steps up to a plank
// gate, a zinc roof over a board ceiling. Front face of the wall is z = 0.
const VERANDA = 0.45;
const GATE_LEFT = -0.15;
const GATE_RIGHT = 1.05;
const WALL_HEIGHT = 0.85;
const LATTICE_HEIGHT = 0.6;
const ROOF = 2.66;

function buildHouse(loader: TextureLoader) {
  const house = new Group();

  const ground = new Mesh(new PlaneGeometry(150, 150), weather(surface(loader, "ground", 54, 54), { scale: 0.35, stains: 0.5 }));
  ground.geometry.setAttribute("uv1", ground.geometry.attributes.uv);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  house.add(ground, road());

  const sageWall = weather(surface(loader, "wall", 3, 1, 0x8fae9e), { scale: 0.9, stains: 0.5, streaks: 0.8 });
  const sagePlinth = weather(surface(loader, "wall", 3, 0.6, 0x6f8e7d), { scale: 2.0, stains: 0.75, streaks: 0.5 });
  const concrete = weather(surface(loader, "wall", 2, 1, 0xb4b3ad), { scale: 1.8, stains: 0.7 });

  // Low front wall either side of the steps, white lattice on top.
  const lattice = latticeAlpha();
  for (const [x0, x1] of [
    [-5, GATE_LEFT],
    [GATE_RIGHT, 5],
  ]) {
    const width = x1 - x0;
    const plinth = box(width, WALL_HEIGHT, 0.16, sagePlinth);
    plinth.position.set((x0 + x1) / 2, WALL_HEIGHT / 2, -0.08);
    const blocksAlpha = lattice.clone();
    blocksAlpha.repeat.set(width / 0.3, LATTICE_HEIGHT / 0.3);
    const blocks = box(
      width,
      LATTICE_HEIGHT,
      0.13,
      weather(
        new MeshStandardMaterial({ color: 0xe2ded2, roughness: 0.92, alphaMap: blocksAlpha, alphaTest: 0.5, side: DoubleSide }),
        { scale: 2.5, stains: 0.55, streaks: 0.5 }
      )
    );
    blocks.position.set((x0 + x1) / 2, WALL_HEIGHT + LATTICE_HEIGHT / 2, -0.08);
    const coping = box(width, 0.06, 0.18, sagePlinth);
    coping.position.set((x0 + x1) / 2, WALL_HEIGHT + LATTICE_HEIGHT + 0.03, -0.08);
    house.add(plinth, blocks, coping);
  }

  // Three concrete steps up to the veranda.
  for (let i = 0; i < 3; i++) {
    const depth = 0.9 - i * 0.3;
    const stepBox = box(GATE_RIGHT - GATE_LEFT + 0.1, 0.15, depth, concrete);
    stepBox.position.set((GATE_LEFT + GATE_RIGHT) / 2, 0.075 + i * 0.15, depth / 2);
    house.add(stepBox);
  }

  // The plank gate, closed - with the family's name painted across it.
  const gate = box(GATE_RIGHT - GATE_LEFT - 0.04, 1.05, 0.04, surface(loader, "door", 1, 0.6, 0xbfa58a));
  gate.position.set((GATE_LEFT + GATE_RIGHT) / 2, VERANDA + 0.525, -0.1);
  const name = familyName(0.98, 0.42);
  name.position.set((GATE_LEFT + GATE_RIGHT) / 2, VERANDA + 0.72, -0.078);
  house.add(gate, name);

  // Veranda floor, and the house wall behind it with a door and a window.
  const floor = box(10, VERANDA, 2.1, concrete);
  floor.position.set(0, VERANDA / 2, -1.2);
  const backWall = box(10, ROOF - VERANDA, 0.25, sageWall);
  backWall.position.set(0, VERANDA + (ROOF - VERANDA) / 2, -2.35);
  // The back wall carries the framed pictures, so its door is at the far end.
  const doorway = box(0.9, 1.95, 0.02, surface(loader, "door", 1, 1, 0x6d5a48));
  doorway.position.set(4.55, VERANDA + 0.975, -2.22);
  house.add(floor, backWall, doorway);

  // Timber posts carrying the roof, standing on the low wall.
  const timber = surface(loader, "door", 0.15, 1, 0x7a6450);
  for (const x of [GATE_LEFT - 0.06, GATE_RIGHT + 0.06, -3.0, 3.7]) {
    const post = box(0.1, ROOF - (WALL_HEIGHT + LATTICE_HEIGHT + 0.06), 0.1, timber);
    post.position.set(x, (ROOF + WALL_HEIGHT + LATTICE_HEIGHT + 0.06) / 2, -0.08);
    house.add(post);
  }

  // Zinc roof over a ceiling of boards.
  const ceiling = box(10, 0.02, 3.2, surface(loader, "door", 6, 2, 0x8a6a4c));
  ceiling.position.set(0, ROOF, -0.8);
  const roof = box(10, 0.02, 3.4, new MeshStandardMaterial({ color: 0x5a5650, roughness: 0.55, metalness: 0.7 }));
  roof.position.set(0, ROOF + 0.12, -0.75);
  roof.rotation.x = 0.06;
  const fascia = box(10, 0.16, 0.03, new MeshStandardMaterial({ color: 0x3a3029, roughness: 0.9 }));
  fascia.position.set(0, ROOF + 0.02, 0.82);
  house.add(ceiling, roof, fascia);

  // Palms far down the road, melting into the haze.
  for (let i = 0; i < 9; i++) {
    const height = 8 + fbm(i, 7, 111) * 6;
    const palm = new Mesh(
      new PlaneGeometry(height, height),
      new MeshBasicMaterial({ color: 0x1d2418, alphaMap: palmSilhouette(i), alphaTest: 0.4, side: DoubleSide })
    );
    const side = i % 2 ? 1 : -1;
    palm.position.set(side * (6 + fbm(i, 3, 113) * 24) + 0.5, height / 2 - 0.4, 24 + fbm(i, 5, 117) * 30);
    palm.rotation.y = Math.PI;
    house.add(palm);
  }

  return house;
}

/* ------------------------------------------------------------------ */
/* The family                                                           */
/* ------------------------------------------------------------------ */

function buildFamily(scene: Scene) {
  const shadowTexture = blobShadowTexture();
  const place = (
    object: Group | Mesh,
    x: number,
    y: number,
    z: number,
    rotation = 0,
    shadow?: [number, number, number?]
  ) => {
    object.position.set(x, y + 0.001, z);
    object.rotation.y = rotation;
    scene.add(object);
    if (shadow) {
      const s = contactShadow(shadowTexture, shadow[0], shadow[1], shadow[2]);
      s.position.set(x, y + 0.0025, z);
      s.rotation.z = rotation;
      scene.add(s);
    }
  };

  // Six pairs of school shoes along the wall, eldest to youngest. The fourth
  // place is empty: that pair stands at the foot of the steps, facing the road.
  const children = [0.265, 0.26, 0.255, 0, 0.24, 0.235];
  children.forEach((length, i) => {
    if (!length) return;
    place(shoePair(length), -3.95 + i * 0.34, 0, 0.24, (fbm(i, 2, 61) - 0.5) * 0.12, [0.28, 0.34, 0.5]);
  });
  // His own shoes now - not school shoes - at the start of the road.
  place(sneakerPair(0.285), 0.45, 0, 1.32, Math.PI + 0.04, [0.32, 0.36, 0.6]);

  // The father: his farm boots, two cutlasses against the wall, cocoa pods.
  place(bootPair(), -0.5, 0, 0.32, 0.25, [0.36, 0.42, 0.6]);
  const cutlasses: [number, number, number][] = [
    [-0.98, 1, -0.3],
    [-1.3, 1.45, -0.42],
  ];
  for (const [x, broad, tilt] of cutlasses) {
    const blade = cutlass(broad);
    blade.rotation.set(0.1, 0.12, Math.PI + tilt);
    blade.position.set(x, 0.47, 0.09);
    scene.add(blade);
  }
  const pod = cocoaPod(3, 1);
  pod.rotation.set(Math.PI / 2 - 0.05, 0, 0.9);
  pod.position.set(-0.92, 0.052, 0.72);
  scene.add(pod);
  const pod2 = cocoaPod(9, 0.75);
  pod2.rotation.set(Math.PI / 2 + 0.08, 0, -0.5);
  pod2.position.set(-0.78, 0.05, 0.9);
  scene.add(pod2);
  const podShadow = contactShadow(shadowTexture, 0.44, 0.44, 0.5);
  podShadow.position.set(-0.85, 0.0025, 0.8);
  scene.add(podShadow);

  // The mother: her sandals on the bottom step, the house slippers on the top.
  place(
    slipperPair({ length: 0.245, top: [0.86, 0.66, 0.52], bottom: [0.8, 0.6, 0.47], strap: [0.84, 0.64, 0.5], mud: 0.2, flour: 0.35, seed: 13, studs: true }),
    0.0,
    0.15,
    0.76,
    -0.18,
    [0.28, 0.32, 0.45]
  );
  place(
    slipperPair({ length: 0.28, top: [0.04, 0.06, 0.16], bottom: [0.05, 0.07, 0.17], strap: [0.6, 0.08, 0.1], mud: 0.3, flour: 0.1, seed: 7 }),
    0.2,
    VERANDA,
    0.14,
    0.1,
    [0.3, 0.34, 0.45]
  );

  // Her oven and the towers of bread tins beside it.
  const oven = breadOven();
  oven.group.position.set(3.0, 0, 0.85);
  oven.group.rotation.y = -0.35;
  scene.add(oven.group);
  const towers = tinTowers([14, 11, 17], 5);
  towers.position.set(1.55, 0, 0.32);
  scene.add(towers);
  const wood = firewood();
  wood.position.set(4.15, 0, 1.1);
  wood.rotation.y = 0.35;
  scene.add(wood);

  // His taxi, parked out in the yard beyond the end of the house.
  const car = taxi();
  car.position.set(9.0, 0, -10.0);
  car.rotation.y = -2.3; // three-quarters on: the orange front corner shows
  scene.add(car);
  const carShadow = contactShadow(shadowTexture, 2.4, 5.0, 0.55);
  carShadow.position.set(9.0, 0.002, -10.0);
  carShadow.rotation.z = -2.3 + Math.PI / 2;
  scene.add(carShadow);

  const keys = taxiKeys();
  // On a nail in the house wall by the door, under the last picture.
  keys.position.set(4.0, 1.42, -2.215);
  scene.add(keys);

  const lantern = hurricaneLantern();
  lantern.group.position.set(0.88, VERANDA + 0.001, 0.15);
  scene.add(lantern.group);
  const lanternShadow = contactShadow(shadowTexture, 0.26, 0.26, 0.6);
  lanternShadow.position.set(0.88, VERANDA + 0.0025, 0.15);
  scene.add(lanternShadow);

  return { lantern, oven };
}

/* ------------------------------------------------------------------ */
/* Camera                                                               */
/* ------------------------------------------------------------------ */

interface Shot {
  hour: number;
  position: Vector3;
  target: Vector3;
  /** What the shot is about. Wide screens frame it off-centre, leaving room
      for the page's content; portrait screens centre on it. */
  focus: Vector3;
  fov: number;
  /** Portrait screens step back from the subject to fit it; some shots
      only widen instead (looking out, the wall is right behind them). */
  stepBack: boolean;
}

type V3 = [number, number, number];

const shot = (hour: number, position: V3, target: V3, fov: number, focus: V3 = target, stepBack = true): Shot => ({
  hour,
  position: new Vector3(...position),
  target: new Vector3(...target),
  focus: new Vector3(...focus),
  fov,
  stepBack,
});

/** x position of project i's frame along the veranda's back wall. */
const GALLERY_SPACING = 1.15;
const galleryX = (index: number) => (index - (projects.length - 1) / 2) * GALLERY_SPACING;
const GALLERY_Y = 2.0;
const GALLERY_Z = -2.215;

// One shot per project: straight on, the frame on the same side of the
// screen as the project's image slot in the page, so it shows through it.
const projectShots = projects.map((_, i) => {
  const x = galleryX(i);
  const aim = x + (i % 2 === 0 ? 0.95 : -0.95);
  return shot(projectHour(i), [aim, 1.85, 1.5], [aim, 1.95, GALLERY_Z], 40, [x, GALLERY_Y, GALLERY_Z]);
});

// Like Ozu's pillow shots: each part of the page holds on one corner of the
// family's life, and the camera moves between them as you scroll.
const SHOTS: Shot[] = [
  // The hero's text is on the left, so the steps and lantern sit right.
  // Close by the steps: the dark green front wall sits behind the hero's
  // text, the white breeze blocks above it; the lantern and his shoes right.
  shot(HOURS.hero, [-0.3, 0.6, 2.7], [-0.22, 0.3, 0], 50, [0.45, 0.35, 0.5]),
  shot(HOURS.sunrise, [0.45, 1.35, 5.4], [0.45, 0.75, 0.3], 46), // first light, the whole doorstep
  shot(HOURS.services, [0.2, 0.9, 2.3], [-0.35, 0.42, 0.35], 42, [-0.85, 0.38, 0.35]), // the father's corner
  // Low, the empty place in the middle of the row. (Portrait screens don't
  // step back here: the shoes would shrink to nothing.)
  shot(HOURS.shoes, [-3.0, 0.68, 2.3], [-3.02, 0.13, 0.3], 31, undefined, false), // five pairs and a gap
  shot(HOURS.skills, [-2.3, 1.35, 2.9], [-2.25, 0.2, 0.4], 40, [-3.05, 0.15, 0.4]), // the blackboard over them
  ...projectShots, // the pictures on the wall
  shot(HOURS.dusk, [1.7, 1.15, 3.2], [2.45, 0.62, 0.55], 42), // the mother's oven and tins
  shot(HOURS.contact, [1.35, 1.1, 4.4], [1.4, 0.62, 0.4], 40, [0.6, 0.5, 0.4]), // by the lantern
  // Looking out past his shoes, down the road: in the last of the night at
  // the end of the page, and in full morning after someone writes.
  // (Portrait looks a little less steeply down: his shoes sit lower, below
  // the footer's nameplate.)
  shot(HOURS.firstLight, [0.45, 1.02, 0.4], [0.34, -1.2, 5.8], 62, [0.34, -0.92, 5.8], false),
  shot(NEXT_DAWN_HOUR, [0.45, 1.0, 0.42], [0.32, -1.25, 5.8], 60, undefined, false),
];

// Eyes closed: down by the father's boots and the mother's sandals.
const CLOSE_UP = shot(0, [0.35, 0.62, 1.9], [-0.25, 0.18, 0.5], 36);

/** Portrait screens see less width: centre on the subject, step back, widen. */
function fitShot(source: Shot, portrait: boolean, outPosition: Vector3, outTarget: Vector3) {
  outPosition.copy(source.position);
  if (!portrait) {
    outTarget.copy(source.target);
    return source.fov;
  }
  outPosition.add(source.focus).sub(source.target); // slide over to face the subject
  outTarget.copy(source.focus);
  if (source.stepBack) outPosition.sub(outTarget).multiplyScalar(1.35).add(outTarget);
  return source.fov + 12;
}

/** Crops a texture to fill a frame of the given aspect ratio (like CSS cover). */
function coverFit(texture: Texture, frameAspect: number) {
  const image = texture.image as { width: number; height: number };
  const aspect = image.width / image.height;
  if (aspect > frameAspect) {
    texture.repeat.set(frameAspect / aspect, 1);
  } else {
    texture.repeat.set(1, aspect / frameAspect);
  }
  texture.offset.set((1 - texture.repeat.x) / 2, (1 - texture.repeat.y) / 2);
}

/** Hangs every project on the veranda wall. Pictures load in the background
    and never hold up the first frame. */
function hangGallery(scene: Scene, onLoaded: () => void) {
  const loader = new TextureLoader();
  return projects.map((project, i) => {
    const frame = pictureFrame();
    frame.group.position.set(galleryX(i), GALLERY_Y, GALLERY_Z);
    frame.group.rotation.z = (fbm(i, 4, 141) - 0.5) * 0.035; // hung by hand
    scene.add(frame.group);
    loader.load(thumbnail(project.images[0], 640), (texture) => {
      texture.colorSpace = SRGBColorSpace;
      texture.anisotropy = 4;
      coverFit(texture, FRAME_PHOTO_WIDTH / FRAME_PHOTO_HEIGHT);
      frame.photo.map = texture;
      frame.photo.emissiveMap = texture;
      frame.photo.color.set(0xffffff);
      frame.photo.emissiveIntensity = 0.3;
      frame.photo.needsUpdate = true;
      onLoaded();
    });
    return frame;
  });
}

/** Where the camera goes when it leans in to a project's frame: close, with
    the frame left of centre on wide screens (the details open on the right)
    and in the upper half on portrait ones (the details rise from the bottom). */
function leanShot(index: number, portrait: boolean, outPosition: Vector3, outTarget: Vector3) {
  const x = galleryX(index);
  if (portrait) {
    outPosition.set(x, 1.85, 0.9);
    outTarget.set(x, 1.55, GALLERY_Z);
    return 52;
  }
  outPosition.set(x + 0.7, 1.95, 0.75);
  outTarget.set(x + 0.7, 1.98, GALLERY_Z);
  return 38;
}

/* ------------------------------------------------------------------ */
/* Reading mode: the frosted glass is done here, not in CSS             */
/* ------------------------------------------------------------------ */

// CSS backdrop-filter over a canvas that repaints every frame is the costly
// case (it re-blurs everything each frame). Instead, while a section is read,
// the scene itself is drawn at quarter resolution, blurred in two cheap
// passes, and laid over the sharp frame - at full strength the sharp pass is
// skipped entirely, so reading is cheaper than not reading.
function createSoftener(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera, blurAllowed: boolean) {
  const options = { type: HalfFloatType, depthBuffer: true };
  const low = new WebGLRenderTarget(1, 1, options);
  const pong = new WebGLRenderTarget(1, 1, { type: HalfFloatType, depthBuffer: false });
  const quadCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new Mesh(new PlaneGeometry(2, 2));
  const quadScene = new Scene();
  quadScene.add(quad);

  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }`;

  // 9-tap Gaussian along one axis.
  const blurMaterial = new ShaderMaterial({
    uniforms: { tMap: { value: null }, step: { value: new Vector2() } },
    vertexShader,
    fragmentShader: /* glsl */ `
      uniform sampler2D tMap;
      uniform vec2 step;
      varying vec2 vUv;
      void main() {
        vec4 sum = texture2D(tMap, vUv) * 0.2270270270;
        sum += texture2D(tMap, vUv + step * 1.3846153846) * 0.3162162162;
        sum += texture2D(tMap, vUv - step * 1.3846153846) * 0.3162162162;
        sum += texture2D(tMap, vUv + step * 3.2307692308) * 0.0702702703;
        sum += texture2D(tMap, vUv - step * 3.2307692308) * 0.0702702703;
        gl_FragColor = sum;
      }`,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });

  // Lays the blurred scene over the screen, tone-mapped like the real one.
  const compositeMaterial = new ShaderMaterial({
    uniforms: { tMap: { value: null }, opacity: { value: 1 } },
    vertexShader,
    fragmentShader: /* glsl */ `
      uniform sampler2D tMap;
      uniform float opacity;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(texture2D(tMap, vUv).rgb, opacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });

  const pass = (material: ShaderMaterial, target: WebGLRenderTarget | null) => {
    quad.material = material;
    renderer.setRenderTarget(target);
    renderer.render(quadScene, quadCamera);
  };

  return {
    /** Reading blur on (dimming happens either way, via exposure). */
    blurOn: blurAllowed,
    setSize(width: number, height: number) {
      const w = Math.max(1, Math.round(width / 4));
      const h = Math.max(1, Math.round(height / 4));
      low.setSize(w, h);
      pong.setSize(w, h);
    },
    render(amount: number) {
      if (!this.blurOn || amount < 0.01) {
        renderer.render(scene, camera);
        return;
      }
      if (amount < 0.99) renderer.render(scene, camera);

      renderer.setRenderTarget(low);
      renderer.render(scene, camera);
      const texel = new Vector2(1 / low.width, 1 / low.height);
      for (let i = 0; i < 3; i++) {
        blurMaterial.uniforms.tMap.value = low.texture;
        blurMaterial.uniforms.step.value.set(texel.x * (1 + i), 0);
        pass(blurMaterial, pong);
        blurMaterial.uniforms.tMap.value = pong.texture;
        blurMaterial.uniforms.step.value.set(0, texel.y * (1 + i));
        pass(blurMaterial, low);
      }

      compositeMaterial.uniforms.tMap.value = low.texture;
      compositeMaterial.uniforms.opacity.value = Math.min(1, amount);
      const autoClear = renderer.autoClear;
      renderer.autoClear = amount >= 0.99;
      pass(compositeMaterial, null);
      renderer.autoClear = autoClear;
    },
    dispose() {
      low.dispose();
      pong.dispose();
      blurMaterial.dispose();
      compositeMaterial.dispose();
    },
  };
}

/* ------------------------------------------------------------------ */
/* Scene                                                                */
/* ------------------------------------------------------------------ */

export function startDoorstep(canvas: HTMLCanvasElement, options: DoorstepOptions) {
  const { tier } = options;
  const renderer = new WebGLRenderer({ canvas, antialias: tier !== "low", powerPreference: "high-performance" });
  const maxDpr = tier === "high" ? 1.75 : tier === "mid" ? 1.4 : 1;
  let dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  renderer.setPixelRatio(dpr);
  renderer.toneMapping = AgXToneMapping;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;

  const scene = new Scene();
  const fog = new Fog(0x000000, 9, 70);
  scene.fog = fog;
  const backdrop = skyDome();
  scene.add(backdrop.mesh);

  let pendingTextures = 0;
  const loader = new TextureLoader();
  loader.manager.onStart = () => pendingTextures++;
  loader.manager.onLoad = () => {
    pendingTextures = 0;
    invalidate(true);
  };

  scene.add(buildHouse(loader));
  const { lantern, oven } = buildFamily(scene);
  const frames = hangGallery(scene, () => invalidate());

  // One warm lamp that moves to whichever picture is hovered or focused.
  const lamp = new PointLight(new Color(1.0, 0.78, 0.5), 0, 2.2, 2);
  scene.add(lamp);
  const glow = frames.map(() => 0);
  let lean = 0;
  let leanIndex = 0;
  let parallaxX = 0;
  let parallaxY = 0;
  let glanceAmount = 0;
  let read = 0;
  let glanceHour: number = HOURS.hero;

  /* Lights --------------------------------------------------------- */

  const sun = new DirectionalLight(0xffffff, 0);
  sun.castShadow = true;
  const shadowSize = tier === "high" ? 2048 : tier === "mid" ? 1024 : 512;
  sun.shadow.mapSize.set(shadowSize, shadowSize);
  Object.assign(sun.shadow.camera, { left: -4.2, right: 4.6, top: 3.6, bottom: -2.2, near: 0.5, far: 24 });
  sun.shadow.radius = 3;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  sun.target.position.set(0.2, 0.6, 0.5);
  scene.add(sun, sun.target);

  const moon = new DirectionalLight(new Color(0.55, 0.65, 1.0), 0);
  moon.position.set(-4, 7, 6);
  scene.add(moon);

  const hemi = new HemisphereLight(0xffffff, 0x000000, 0);
  scene.add(hemi);

  const lanternLight = new PointLight(new Color(1.0, 0.6, 0.28), 0, 7, 2);
  lanternLight.position.copy(lantern.group.position).add(lantern.flameOffset);
  lanternLight.castShadow = tier === "high";
  lanternLight.shadow.mapSize.set(512, 512);
  lanternLight.shadow.bias = -0.002;
  lanternLight.shadow.radius = 4;
  scene.add(lanternLight);

  // The oven is around the corner, off-frame right: only its glow is seen.
  // Light spilling from the oven's glass doors before dawn.
  const ovenLight = new PointLight(new Color(1.0, 0.36, 0.1), 0, 7, 2);
  ovenLight.position.set(2.75, 0.75, 1.35);
  scene.add(ovenLight);

  /* Sky, used only to light the scene (it's never seen directly) ---- */

  const skyScene = new Scene();
  const sky = new Sky();
  sky.scale.setScalar(100);
  const skyUniforms = sky.material.uniforms;
  skyUniforms.turbidity.value = 9; // dusty harmattan air
  skyUniforms.rayleigh.value = 1.8;
  skyUniforms.mieCoefficient.value = 0.006;
  skyUniforms.mieDirectionalG.value = 0.8;
  skyUniforms.showSunDisc.value = 0;
  skyUniforms.cloudCoverage.value = 0;
  skyScene.add(sky);
  const pmrem = new PMREMGenerator(renderer);
  let envTarget: WebGLRenderTarget | null = null;
  let envHour = Number.NaN;

  const refreshEnvironment = (hour: number, sunDirection: Vector3) => {
    if (Math.abs(hour - envHour) < 0.15 && envTarget) return;
    envHour = hour;
    skyUniforms.sunPosition.value.copy(sunDirection);
    const next = pmrem.fromScene(skyScene, 0, 0.1, 200, { size: 64 });
    envTarget?.dispose();
    envTarget = next;
    scene.environment = next.texture;
  };

  /* Camera ------------------------------------------------------------ */

  const camera = new PerspectiveCamera(34, 1, 0.1, 260);
  const cameraTarget = new Vector3();
  let portrait = false;

  const resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    portrait = height > width * 1.05;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    softener.setSize(width * renderer.getPixelRatio(), height * renderer.getPixelRatio());
    invalidate(true);
  };
  window.addEventListener("resize", resize);

  const fromPosition = new Vector3();
  const fromTarget = new Vector3();
  const toPosition = new Vector3();
  const toTarget = new Vector3();

  // Screen rectangle of a picture frame, from its four corners.
  const corner = new Vector3();
  const projectRect = (group: Group): FrameRect | null => {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const [x, y] of [
      [-0.5, -0.36],
      [0.5, -0.36],
      [-0.5, 0.36],
      [0.5, 0.36],
    ]) {
      corner.set(x, y, 0.04).applyMatrix4(group.matrixWorld).project(camera);
      if (corner.z > 1) return null; // behind the camera
      minX = Math.min(minX, corner.x);
      maxX = Math.max(maxX, corner.x);
      minY = Math.min(minY, corner.y);
      maxY = Math.max(maxY, corner.y);
    }
    if (maxX < -1 || minX > 1 || maxY < -1 || minY > 1) return null;
    const w = window.innerWidth;
    const h = window.innerHeight;
    return { left: ((minX + 1) / 2) * w, top: ((1 - maxY) / 2) * h, width: ((maxX - minX) / 2) * w, height: ((maxY - minY) / 2) * h };
  };

  const glancePosition = new Vector3();
  const glanceTarget = new Vector3();

  /** The camera for an hour of the day: between the two shots around it. */
  const shotAt = (hour: number, outPosition: Vector3, outTarget: Vector3) => {
    let i = 0;
    while (i < SHOTS.length - 2 && hour > SHOTS[i + 1].hour) i++;
    const a = SHOTS[i];
    const b = SHOTS[i + 1];
    const k = MathUtils.smoothstep(hour, a.hour, b.hour);
    const fovA = fitShot(a, portrait, fromPosition, fromTarget);
    const fovB = fitShot(b, portrait, toPosition, toTarget);
    outPosition.copy(fromPosition).lerp(toPosition, k);
    outTarget.copy(fromTarget).lerp(toTarget, k);
    return MathUtils.lerp(fovA, fovB, k);
  };

  const placeCamera = (hour: number, eyes: number) => {
    let fov = shotAt(hour, camera.position, cameraTarget);

    // Hovering a chapter on the day arc: a glance toward it, not a trip.
    if (glanceAmount > 0.001) {
      const fovG = shotAt(glanceHour, glancePosition, glanceTarget);
      const k = 0.2 * MathUtils.smoothstep(glanceAmount, 0, 1);
      camera.position.lerp(glancePosition, k);
      cameraTarget.lerp(glanceTarget, k);
      fov = MathUtils.lerp(fov, fovG, k);
    }

    if (lean > 0.001) {
      const fovL = leanShot(leanIndex, portrait, toPosition, toTarget);
      const k = MathUtils.smoothstep(lean, 0, 1);
      camera.position.lerp(toPosition, k);
      cameraTarget.lerp(toTarget, k);
      fov = MathUtils.lerp(fov, fovL, k);
    }

    // A breath of parallax with the pointer: a few centimetres, never more.
    camera.position.x += parallaxX * 0.05;
    camera.position.y -= parallaxY * 0.03;

    const close = MathUtils.smoothstep(eyes, 0, 1);
    if (close > 0) {
      const fovC = fitShot(CLOSE_UP, portrait, toPosition, toTarget);
      camera.position.lerp(toPosition, close);
      cameraTarget.lerp(toTarget, close);
      fov = MathUtils.lerp(fov, fovC, close);
    }
    camera.fov = fov;
    camera.lookAt(cameraTarget);
    camera.updateProjectionMatrix();
  };

  // On the low tier there's no blur: reading only dims (via exposure).
  const softener = createSoftener(renderer, scene, camera, tier !== "low");

  /* Frame loop ------------------------------------------------------- */

  const day = createLighting();
  const preDawn = createLighting();
  const shown = createLighting();
  lightingAt(PRE_DAWN_HOUR, preDawn);

  let displayedHour = effectiveHour();
  let lastHour = Number.NaN;
  let lastEyes = Number.NaN;
  let dirty = true;
  let shadowsDirty = true;
  let running = true;
  let visible = true;
  let last = performance.now();
  let lastRender = 0;
  let readySent = false;

  // Frame-time probe for the first couple of seconds of rendering.
  const probe: number[] = [];
  let probing = options.probe ?? true;
  let warmupUntil = 0;

  function invalidate(shadows = false) {
    dirty = true;
    if (shadows) shadowsDirty = true;
  }

  const unsubscribe = onSceneStateChange(() => invalidate());

  const flicker = (t: number) =>
    1 + 0.1 * (fbm(t * 3.1, 0.5, 71) - 0.5) * 2 + 0.05 * (fbm(t * 13.7, 1.5, 73) - 0.5) * 2;

  function frame(now: number) {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    if (!visible) return;

    // Ease the shown hour toward the scroll's hour (Lenis already smooths
    // the scroll itself, so this stays light).
    const target = effectiveHour();
    displayedHour += (target - displayedHour) * (1 - Math.exp(-dt * 5));
    if (Math.abs(target - displayedHour) < 0.001) displayedHour = target;

    // Damped responses to the page: frame lamplight, the lean toward an open
    // project, pointer parallax. Each keeps the frame dirty while it settles.
    const ease = (from: number, to: number, rate: number) => {
      const next = from + (to - from) * (1 - Math.exp(-dt * rate));
      if (Math.abs(to - next) > 0.0005) dirty = true;
      return Math.abs(to - next) > 0.0005 ? next : to;
    };
    glow.forEach((value, i) => (glow[i] = ease(value, sceneState.hover === i ? 1 : 0, 6)));
    if (sceneState.lean >= 0) leanIndex = sceneState.lean;
    lean = ease(lean, sceneState.lean >= 0 ? 1 : 0, 2.6);
    const parallaxOn = sceneState.overlays === 0 && sceneState.eyes === 0;
    // Reading softens the scene - but never behind a dialog, and never once
    // the eyes are closed (that close-up is the whole point).
    read = ease(read, sceneState.overlays === 0 && sceneState.eyes === 0 ? sceneState.reading : 0, 3);
    if (sceneState.glance !== null) glanceHour = sceneState.glance;
    glanceAmount = ease(glanceAmount, sceneState.glance !== null && parallaxOn ? 1 : 0, 3);
    parallaxX = ease(parallaxX, parallaxOn ? sceneState.pointerX : 0, 2);
    parallaxY = ease(parallaxY, parallaxOn ? sceneState.pointerY : 0, 2);

    const eyes = sceneState.eyes;
    if (displayedHour !== lastHour || eyes !== lastEyes) {
      if (Math.abs(displayedHour - lastHour) > 0.004 || eyes !== lastEyes) shadowsDirty = true;
      lastHour = displayedHour;
      lastEyes = eyes;
      dirty = true;
    }

    // Behind an open dialog the flames hold still, so the GPU can idle.
    const warmLightsOn = (shown.lantern > 0.01 || shown.oven > 0.01) && sceneState.overlays === 0;
    // Flames only need ~30fps; anything else renders only when it changed.
    if (!dirty && !(warmLightsOn && now - lastRender > 33) && !probing) return;
    if (pendingTextures > 0) return;

    lightingAt(displayedHour, day);
    mixLighting(day, preDawn, MathUtils.smoothstep(eyes, 0, 1), shown);

    sun.position.copy(sun.target.position).addScaledVector(shown.sunDirection, 12);
    sun.color.copy(shown.sunColor);
    sun.intensity = shown.sunIntensity;
    sun.castShadow = shown.sunIntensity > 0.05;
    moon.intensity = shown.moonIntensity;
    hemi.color.copy(shown.skyColor);
    hemi.groundColor.copy(shown.groundColor);
    hemi.intensity = shown.hemiIntensity;
    scene.environmentIntensity = shown.envIntensity;
    // Reading: the scene steps back behind the text (dimmer, see softener).
    renderer.toneMappingExposure = shown.exposure * (1 - 0.5 * read);
    fog.color.copy(shown.fogColor);
    backdrop.update(shown.fogColor, shown.skyColor, shown.hemiIntensity);

    const t = now / 1000;
    const lanternFlicker = flicker(t);
    lanternLight.intensity = 2.4 * shown.lantern * lanternFlicker;
    lanternLight.castShadow = tier === "high" && shown.lantern > 0.5 && shown.sunIntensity < 0.05;
    lantern.flame.visible = shown.lantern > 0.02;
    lantern.flame.scale.set(1, 2.6 * (0.9 + 0.1 * lanternFlicker), 1);
    lantern.glass.emissiveIntensity = 0.35 * shown.lantern * lanternFlicker;
    lantern.glow.material.opacity = 0.4 * shown.lantern * lanternFlicker;
    lantern.glow.visible = shown.lantern > 0.02;
    const ovenFlicker = flicker(t * 0.7 + 40);
    ovenLight.intensity = 9 * shown.oven * ovenFlicker;
    oven.windows.emissiveIntensity = 1.1 * shown.oven * ovenFlicker;

    let lampIndex = -1;
    let lampStrength = 0;
    frames.forEach((frame, i) => {
      frame.photo.emissiveIntensity = 0.3 + 0.55 * glow[i];
      frame.group.rotation.y = -0.035 * glow[i]; // turns a touch toward you
      if (glow[i] > lampStrength) {
        lampStrength = glow[i];
        lampIndex = i;
      }
    });
    lamp.intensity = 1.6 * lampStrength;
    if (lampIndex >= 0) lamp.position.set(galleryX(lampIndex), GALLERY_Y + 0.25, GALLERY_Z + 0.55);

    refreshEnvironment(displayedHour, shown.sunDirection);
    placeCamera(displayedHour, eyes);

    if (shadowsDirty) {
      renderer.shadowMap.needsUpdate = true;
      shadowsDirty = false;
    }
    softener.render(read);
    lastRender = now;
    if (options.onFrames) options.onFrames(frames.map((frame) => projectRect(frame.group)));
    dirty = false;

    if (!readySent) {
      readySent = true;
      options.onReady();
    }

    // Performance check. The first second or so is always slow (shaders
    // compiling, pictures uploading) so it's skipped; then the typical
    // (median) frame is measured. Too slow: step quality down, and only fall
    // back to the stills if even the lightest version can't keep up.
    if (probing && pendingTextures === 0) {
      if (warmupUntil === 0) warmupUntil = now + 1500;
      if (now >= warmupUntil) probe.push(dt);
      if (probe.length >= 60) {
        const median = [...probe].sort((a, b) => a - b)[probe.length >> 1];
        probe.length = 0;
        const fps = Math.round(1 / median);
        if (median <= 0.045) {
          probing = false;
          console.info(`[doorstep] live 3D at ~${fps} fps`);
        } else if (dpr > 1) {
          dpr = 1;
          renderer.setPixelRatio(1);
          resize();
          console.info(`[doorstep] ~${fps} fps: lowering resolution`);
        } else if (softener.blurOn) {
          softener.blurOn = false;
          console.info(`[doorstep] ~${fps} fps: turning off the reading blur`);
        } else if (median > 0.08) {
          probing = false;
          console.info(`[doorstep] ~${fps} fps even at the lightest settings: showing the stills instead`);
          options.onGiveUp();
        } else {
          probing = false;
          console.info(`[doorstep] live 3D at ~${fps} fps (light settings)`);
        }
      }
    }
  }

  resize();
  const stopTick = addTick(frame);

  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    // Our own dispose() also loses the context on purpose: ignore that one.
    if (running) options.onGiveUp();
  });

  return {
    setVisible(isVisible: boolean) {
      visible = isVisible && running;
      if (visible) {
        last = performance.now();
        invalidate();
      }
    },
    dispose() {
      running = false;
      stopTick();
      unsubscribe();
      softener.dispose();
      window.removeEventListener("resize", resize);
      envTarget?.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss(); // hand the GPU memory back now
    },
  };
}
