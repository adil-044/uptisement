/**
 * Single hero object: glass phone with story UI on the screen.
 * Canvas texture per chapter. Camera dolly + phone turn by progress/state.
 */

import type {
  CanvasTexture,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  Scene,
  WebGLRenderer,
} from "three";
import {
  drawPhoneScreen,
  screenAccent,
  type PhoneScreenState,
} from "./drawPhoneScreen";

export type PhoneState = PhoneScreenState;

export type PhoneSceneApi = {
  setProgress: (p: number) => void;
  setState: (s: PhoneState) => void;
  setPointer: (nx: number, ny: number) => void;
  resize: (w: number, h: number) => void;
  render: () => void;
  dispose: () => void;
};

type ThreeModule = typeof import("three");

const INK = 0x0b1220;
const MINT = 0x3ddc97;
const ORANGE = 0xd9480f;

/** Per-state camera + phone pose targets (dolly / turn). */
const POSES: Record<
  PhoneState,
  { cam: [number, number, number]; look: [number, number, number]; rot: [number, number, number]; pos: [number, number, number] }
> = {
  idle: {
    cam: [0.25, 0.4, 5.5],
    look: [0.7, 0.05, 0],
    rot: [0.08, -0.28, 0],
    pos: [0.95, 0.05, 0.35],
  },
  ring: {
    cam: [0.1, 0.55, 5.0],
    look: [0.85, 0.1, 0],
    rot: [0.12, -0.18, 0.06],
    pos: [1.05, 0.15, 0.5],
  },
  missed: {
    cam: [0.05, 0.5, 4.9],
    look: [0.9, 0.05, 0],
    rot: [0.1, -0.22, -0.04],
    pos: [1.1, 0.08, 0.45],
  },
  lost: {
    cam: [-0.15, 0.45, 5.3],
    look: [0.7, -0.05, 0],
    rot: [0.06, -0.4, -0.08],
    pos: [0.85, -0.05, 0.25],
  },
  text: {
    cam: [0.35, 0.35, 4.7],
    look: [0.95, 0.0, 0],
    rot: [0.05, -0.12, 0.02],
    pos: [1.15, 0.0, 0.55],
  },
  quote: {
    cam: [0.45, 0.3, 4.5],
    look: [1.0, 0.0, 0],
    rot: [0.04, -0.08, 0],
    pos: [1.2, -0.02, 0.6],
  },
  booked: {
    cam: [0.2, 0.25, 4.4],
    look: [1.0, 0.05, 0],
    rot: [0.02, -0.15, 0.03],
    pos: [1.1, 0.05, 0.65],
  },
  review: {
    cam: [0.15, 0.2, 4.6],
    look: [0.95, 0.0, 0],
    rot: [0.03, -0.2, 0],
    pos: [1.05, 0.0, 0.5],
  },
};

function isLowEnd(): boolean {
  if (typeof navigator === "undefined") return false;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 4;
  return (mem !== undefined && mem <= 4) || cores <= 4;
}

export function shouldSkipWebGL(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return true;
  } catch {
    return true;
  }
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mem !== undefined && mem <= 2) return true;
  return false;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export async function createPhoneScene(
  canvas: HTMLCanvasElement,
): Promise<PhoneSceneApi | null> {
  if (shouldSkipWebGL()) return null;

  const THREE: ThreeModule = await import("three");
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const low = isLowEnd();
  const dpr = Math.min(window.devicePixelRatio || 1, mobile || low ? 1 : 1.5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(INK, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene: Scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070b14, 0.04);

  const camera: PerspectiveCamera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
  camera.position.set(...POSES.idle.cam);

  const hemi = new THREE.HemisphereLight(0x2a3a55, 0x05080f, 0.55);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xa8c0e0, 0.5);
  key.position.set(3, 5, 4);
  scene.add(key);

  const coreLight = new THREE.PointLight(MINT, 1.4, 12);
  coreLight.position.set(0.6, 0.2, 1.4);
  scene.add(coreLight);
  const accentLight = new THREE.PointLight(ORANGE, 0, 10);
  accentLight.position.set(-0.2, 0.4, 1);
  scene.add(accentLight);

  const root: Group = new THREE.Group();
  scene.add(root);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x2a3a52,
    metalness: 0.55,
    roughness: 0.22,
    transparent: true,
    opacity: 0.9,
  });
  const phone = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 2.65, 0.18, 1, 1, 1),
    bodyMat,
  );
  phone.position.set(...POSES.idle.pos);
  phone.rotation.set(...POSES.idle.rot);
  phone.scale.setScalar(1.15);
  // Phone mesh stays for lighting/glow reference but is hidden —
  // crisp chapter UI is the DOM PhonePoster layered above (CanvasTexture
  // updates are unreliable on SwiftShader / some mobile GPUs).
  phone.visible = false;
  root.add(phone);

  const bezel = new THREE.Mesh(
    new THREE.BoxGeometry(1.18, 2.4, 0.04),
    new THREE.MeshStandardMaterial({ color: 0x0a1018, roughness: 0.5 }),
  );
  bezel.position.z = 0.1;
  phone.add(bezel);

  // Screen UI canvas → texture (recreated on state change — avoids flipY/texImage3D glitches)
  const uiCanvas = document.createElement("canvas");
  drawPhoneScreen(uiCanvas, "idle");

  function makeScreenTexture(): CanvasTexture {
    const tex = new THREE.CanvasTexture(uiCanvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.premultiplyAlpha = false;
    tex.flipY = true;
    tex.needsUpdate = true;
    return tex;
  }

  let screenTex: CanvasTexture = makeScreenTexture();
  const screenMat = new THREE.MeshBasicMaterial({
    map: screenTex,
    toneMapped: false,
  }) as MeshBasicMaterial;
  const screen: Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.05, 2.15),
    screenMat,
  );
  screen.position.z = 0.13;
  phone.add(screen);

  // Soft glow orb (visible) tracks chapter accent — stands in for phone light
  const coreGlow = new THREE.Mesh(
    new THREE.CircleGeometry(1.1, low ? 16 : 32),
    new THREE.MeshBasicMaterial({
      color: MINT,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    }),
  );
  coreGlow.position.set(1.0, 0.1, 0.2);
  root.add(coreGlow);

  const shaftGroup = new THREE.Group();
  const shaftMat = new THREE.MeshBasicMaterial({
    color: 0x8fd9b8,
    transparent: true,
    opacity: 0.06,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  for (let i = 0; i < (low ? 2 : 4); i++) {
    const shaft = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 8), shaftMat);
    shaft.position.set(-1.5 + i * 1.1, 0.5, -2 - i * 0.3);
    shaft.rotation.z = -0.15 + i * 0.05;
    shaftGroup.add(shaft);
  }
  scene.add(shaftGroup);

  const pCount = low || mobile ? 180 : 420;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 10;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const ptsMat = new THREE.PointsMaterial({
    color: 0x9ec4b8,
    size: mobile ? 0.025 : 0.035,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  const particles: Points = new THREE.Points(pGeo, ptsMat);
  scene.add(particles);

  const disposables: { dispose: () => void }[] = [
    bodyMat,
    bezel.material as { dispose: () => void },
    screenMat,
    screenTex,
    coreGlow.material as { dispose: () => void },
    shaftMat,
    ptsMat,
    pGeo,
    phone.geometry,
    bezel.geometry,
    screen.geometry,
    coreGlow.geometry,
  ];

  let state: PhoneState = "idle";
  let progress = 0;
  let ptrX = 0;
  let ptrY = 0;
  let time = 0;
  let poseT = 1; // blend toward current pose

  function applyState(s: PhoneState) {
    if (s === state && poseT > 0.5) return;
    state = s;
    poseT = 0;
    drawPhoneScreen(uiCanvas, s);
    // Recreate texture each chapter — CanvasTexture updates can fail on SwiftShader
    const prev = screenTex;
    screenTex = makeScreenTexture();
    screenMat.map = screenTex;
    screenMat.needsUpdate = true;
    prev.dispose();

    const accent = screenAccent(s);
    if (accent === "orange") {
      coreLight.color.set(ORANGE);
      coreLight.intensity = s === "ring" ? 2.0 : 1.1;
      accentLight.intensity = s === "lost" ? 1.0 : 0.7;
      (coreGlow.material as MeshBasicMaterial).color.set(ORANGE);
      (coreGlow.material as MeshBasicMaterial).opacity = 0.32;
      shaftMat.color.set(0xe8a07a);
    } else if (accent === "mint") {
      coreLight.color.set(MINT);
      coreLight.intensity = s === "booked" || s === "review" ? 2.2 : 1.6;
      accentLight.intensity = 0;
      (coreGlow.material as MeshBasicMaterial).color.set(MINT);
      (coreGlow.material as MeshBasicMaterial).opacity = 0.34;
      shaftMat.color.set(0x8fd9b8);
    } else {
      coreLight.color.set(MINT);
      coreLight.intensity = 1.1;
      accentLight.intensity = 0;
      (coreGlow.material as MeshBasicMaterial).color.set(MINT);
      (coreGlow.material as MeshBasicMaterial).opacity = 0.22;
      shaftMat.color.set(0x8fd9b8);
    }
  }

  function setProgress(p: number) {
    progress = p;
  }

  function setPointer(nx: number, ny: number) {
    ptrX = nx;
    ptrY = ny;
  }

  function resize(w: number, h: number) {
    const width = Math.max(1, w);
    const height = Math.max(1, h);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function render() {
    time += 0.016;
    poseT = Math.min(1, poseT + 0.035);

    const pose = POSES[state];
    const ease = 1 - Math.pow(1 - poseT, 3);

    // Dolly + look — blend toward chapter pose, then add slow scroll drift
    const driftX = Math.sin(progress * Math.PI) * 0.12;
    const driftZ = -progress * 0.25;
    camera.position.x = lerp(camera.position.x, pose.cam[0] + driftX, 0.06 + ease * 0.04);
    camera.position.y = lerp(camera.position.y, pose.cam[1] + progress * 0.08, 0.06);
    camera.position.z = lerp(camera.position.z, pose.cam[2] + driftZ, 0.06);
    camera.lookAt(pose.look[0], pose.look[1], pose.look[2]);

    // Glow orb + lights follow chapter pose (phone UI is DOM)
    coreGlow.position.x = lerp(coreGlow.position.x, pose.pos[0], 0.07);
    coreGlow.position.y = lerp(coreGlow.position.y, pose.pos[1] + 0.1, 0.07);
    const tx = pose.pos[0] + ptrX * 0.5;
    const ty = pose.pos[1] + 0.2 + ptrY * 0.5;
    coreLight.position.x += (tx - coreLight.position.x) * 0.08;
    coreLight.position.y += (ty - coreLight.position.y) * 0.08;
    accentLight.position.x = coreLight.position.x - 0.4;
    accentLight.position.y = coreLight.position.y + 0.2;

    if (state === "booked" || state === "review") {
      coreGlow.scale.setScalar(1 + Math.sin(time * 2) * 0.06);
    } else if (state === "ring") {
      coreGlow.scale.setScalar(1 + Math.sin(time * 10) * 0.12);
    }

    const arr = pGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < pCount; i++) {
      arr[i * 3 + 1] += 0.002;
      if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4;
    }
    pGeo.attributes.position.needsUpdate = true;
    particles.rotation.y = progress * 0.3;
    shaftGroup.rotation.z = Math.sin(time * 0.2) * 0.02;

    renderer.render(scene, camera);
  }

  function dispose() {
    renderer.dispose();
    disposables.forEach((d) => d.dispose());
    scene.clear();
  }

  applyState("idle");
  resize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight);
  setProgress(0);
  render();

  return {
    setProgress,
    setState: applyState,
    setPointer,
    resize,
    render,
    dispose,
  };
}
