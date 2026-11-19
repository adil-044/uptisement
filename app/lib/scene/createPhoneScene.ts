/**
 * Single hero object: translucent glass phone with mint glowing core.
 * Mouse-follow core light. Particles + soft shafts. No town.
 * Budget: low poly, DPR-capped, pauseable.
 */

import type {
  Group,
  PerspectiveCamera,
  Points,
  Scene,
  WebGLRenderer,
} from "three";

export type PhoneState =
  | "idle"
  | "ring"
  | "missed"
  | "lost"
  | "text"
  | "quote"
  | "booked"
  | "review";

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
  scene.fog = new THREE.FogExp2(0x070b14, 0.045);

  const camera: PerspectiveCamera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
  camera.position.set(0.2, 0.35, 5.4);

  const hemi = new THREE.HemisphereLight(0x2a3a55, 0x05080f, 0.55);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xa8c0e0, 0.45);
  key.position.set(3, 5, 4);
  scene.add(key);

  // Mouse-follow core light
  const coreLight = new THREE.PointLight(MINT, 1.4, 12);
  coreLight.position.set(0, 0.2, 1.2);
  scene.add(coreLight);
  const accentLight = new THREE.PointLight(ORANGE, 0, 10);
  accentLight.position.set(-0.4, 0.4, 1);
  scene.add(accentLight);

  const root: Group = new THREE.Group();
  scene.add(root);

  // Glass-like phone body (no transmission — SwiftShader / mobile friendly)
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x2a3a52,
    metalness: 0.55,
    roughness: 0.22,
    transparent: true,
    opacity: 0.88,
  });
  const phone = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 2.65, 0.18, 1, 1, 1),
    bodyMat,
  );
  phone.position.set(1.05, 0.05, 0.4);
  phone.rotation.y = -0.32;
  phone.rotation.x = 0.1;
  phone.scale.setScalar(1.15);
  root.add(phone);

  // Bezel / inner frame
  const bezel = new THREE.Mesh(
    new THREE.BoxGeometry(1.18, 2.4, 0.04),
    new THREE.MeshStandardMaterial({ color: 0x0a1018, roughness: 0.5 }),
  );
  bezel.position.z = 0.1;
  phone.add(bezel);

  // Glowing screen core
  const screenMat = new THREE.MeshBasicMaterial({
    color: MINT,
    transparent: true,
    opacity: 0.55,
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 2.15), screenMat);
  screen.position.z = 0.13;
  phone.add(screen);

  // Soft core glow disc behind screen
  const coreGlow = new THREE.Mesh(
    new THREE.CircleGeometry(0.55, low ? 16 : 28),
    new THREE.MeshBasicMaterial({
      color: MINT,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    }),
  );
  coreGlow.position.z = 0.05;
  phone.add(coreGlow);

  // Light shafts (thin translucent planes)
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

  // Particles
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

  // Screen overlay planes for states (simple quads)
  const overlayMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
  });
  const overlay = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.35), overlayMat);
  overlay.position.set(0, 0.4, 0.14);
  phone.add(overlay);

  const disposables: { dispose: () => void }[] = [
    bodyMat,
    bezel.material as { dispose: () => void },
    screenMat,
    coreGlow.material as { dispose: () => void },
    shaftMat,
    ptsMat,
    pGeo,
    phone.geometry,
    bezel.geometry,
    screen.geometry,
    coreGlow.geometry,
    overlay.geometry,
    overlayMat,
  ];

  let state: PhoneState = "idle";
  let progress = 0;
  let ptrX = 0;
  let ptrY = 0;
  let time = 0;

  function applyState(s: PhoneState) {
    state = s;
    switch (s) {
      case "idle":
        screenMat.color.set(MINT);
        screenMat.opacity = 0.4;
        coreLight.color.set(MINT);
        coreLight.intensity = 1.1;
        accentLight.intensity = 0;
        overlayMat.opacity = 0;
        break;
      case "ring":
        screenMat.color.set(ORANGE);
        screenMat.opacity = 0.7;
        coreLight.color.set(ORANGE);
        coreLight.intensity = 1.8;
        accentLight.intensity = 1.2;
        overlayMat.opacity = 0.15;
        break;
      case "missed":
      case "lost":
        screenMat.color.set(ORANGE);
        screenMat.opacity = 0.35;
        coreLight.color.set(ORANGE);
        coreLight.intensity = 0.6;
        accentLight.intensity = s === "lost" ? 0.9 : 0.4;
        overlayMat.opacity = 0.08;
        break;
      case "text":
        screenMat.color.set(MINT);
        screenMat.opacity = 0.75;
        coreLight.color.set(MINT);
        coreLight.intensity = 1.6;
        accentLight.intensity = 0;
        overlayMat.opacity = 0.2;
        break;
      case "quote":
        screenMat.color.set(0xb8f0d8);
        screenMat.opacity = 0.8;
        coreLight.intensity = 1.5;
        overlayMat.opacity = 0.25;
        break;
      case "booked":
      case "review":
        screenMat.color.set(MINT);
        screenMat.opacity = 0.95;
        coreLight.color.set(MINT);
        coreLight.intensity = 2.1;
        accentLight.intensity = 0;
        overlayMat.opacity = 0.3;
        break;
    }
  }

  function setProgress(p: number) {
    progress = p;
    // Slow camera drift
    camera.position.x = 0.35 + Math.sin(p * Math.PI) * 0.25;
    camera.position.y = 0.55 + p * 0.15;
    camera.position.z = 6.2 - p * 0.8;
    camera.lookAt(0.6, 0.1, 0);
    root.rotation.y = -0.12 + p * 0.2;
    phone.rotation.z = Math.sin(p * 6) * 0.02;
  }

  function setPointer(nx: number, ny: number) {
    // nx/ny in -1..1
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
    // Core follows mouse softly
    const tx = ptrX * 1.2;
    const ty = ptrY * 0.9;
    coreLight.position.x += (tx - coreLight.position.x) * 0.08;
    coreLight.position.y += (0.2 + ty - coreLight.position.y) * 0.08;
    coreGlow.position.x = coreLight.position.x * 0.15;
    coreGlow.position.y = coreLight.position.y * 0.1;

    // Ring pulse
    if (state === "ring") {
      const pulse = 0.55 + Math.sin(time * 8) * 0.35;
      screenMat.opacity = pulse;
      coreLight.intensity = 1.2 + pulse;
      phone.rotation.z = Math.sin(time * 18) * 0.04;
    } else if (state === "booked" || state === "review") {
      coreGlow.scale.setScalar(1 + Math.sin(time * 2) * 0.06);
    }

    // Drift particles
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
