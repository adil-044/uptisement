/**
 * Procedural low-poly night town for the homepage scroll story.
 * Vanilla three.js — no GLTF, no post-processing.
 * Budget: ~30 instanced blocks, <=2000 lead points, DPR capped.
 */

import type {
  BufferGeometry,
  Group,
  InstancedMesh,
  Material,
  PerspectiveCamera,
  Points,
  Scene,
  WebGLRenderer,
} from "three";

export type SceneApi = {
  setProgress: (p: number) => void;
  resize: (w: number, h: number) => void;
  render: () => void;
  dispose: () => void;
  setOpacity: (o: number) => void;
  projectBookHint: () => { x: number; y: number } | null;
};

type ThreeModule = typeof import("three");

const ORANGE = 0xd9480f;
const MINT = 0x3ddc97;
const INK = 0x0b1220;
const PAPER = 0xe8edf3;

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
  // Very low-end: prefer poster (still allow mid Android)
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mem !== undefined && mem <= 2) return true;
  return false;
}

export async function createTownScene(
  canvas: HTMLCanvasElement,
): Promise<SceneApi | null> {
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
  renderer.setClearColor(INK, 0.92);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene: Scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(INK, 0.035);

  const camera: PerspectiveCamera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
  camera.position.set(0, 8, 16);

  const hemi = new THREE.HemisphereLight(0x6b7c9a, INK, 0.85);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffc9a3, 0.55);
  key.position.set(6, 12, 4);
  scene.add(key);
  const accent = new THREE.PointLight(ORANGE, 0.8, 18);
  accent.position.set(-2, 2.2, 3);
  scene.add(accent);
  const mintLight = new THREE.PointLight(MINT, 0, 14);
  mintLight.position.set(4, 3, -2);
  scene.add(mintLight);

  // Ground plane
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({
      color: 0x0e1624,
      roughness: 0.95,
      metalness: 0.05,
    }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Instanced town blocks (~30)
  const blockCount = low ? 22 : 30;
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const boxMat = new THREE.MeshStandardMaterial({
    color: 0x1a2438,
    roughness: 0.85,
    metalness: 0.1,
  });
  const buildings: InstancedMesh = new THREE.InstancedMesh(boxGeo, boxMat, blockCount);
  const dummy = new THREE.Object3D();
  const rng = mulberry32(704);
  const positions: { x: number; z: number; h: number }[] = [];
  for (let i = 0; i < blockCount; i++) {
    const x = (rng() - 0.5) * 22;
    const z = (rng() - 0.5) * 18;
    const h = 0.8 + rng() * 3.2;
    const w = 0.7 + rng() * 1.1;
    const d = 0.7 + rng() * 1.1;
    dummy.position.set(x, h / 2, z);
    dummy.scale.set(w, h, d);
    dummy.updateMatrix();
    buildings.setMatrixAt(i, dummy.matrix);
    positions.push({ x, z, h });
  }
  buildings.instanceMatrix.needsUpdate = true;
  scene.add(buildings);

  // Window dots (emissive small boxes on a few buildings)
  const windowGroup = new THREE.Group();
  const winMat = new THREE.MeshBasicMaterial({ color: 0xffb86a });
  for (let i = 0; i < Math.min(12, positions.length); i++) {
    const p = positions[i];
    if (Math.hypot(p.x, p.z) > 10) continue;
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.05), winMat);
    win.position.set(p.x + 0.35, p.h * 0.6, p.z + 0.4);
    windowGroup.add(win);
  }
  scene.add(windowGroup);

  // Truck (simple group)
  const truck = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.55, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x2a3548, roughness: 0.6 }),
  );
  body.position.y = 0.4;
  truck.add(body);
  const cab = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.45, 0.75),
    new THREE.MeshStandardMaterial({ color: 0x3a4a62 }),
  );
  cab.position.set(0.45, 0.75, 0);
  truck.add(cab);
  const truckLight = new THREE.PointLight(ORANGE, 1.2, 6);
  truckLight.position.set(0, 1.1, 0);
  truck.add(truckLight);
  truck.position.set(-2.2, 0, 3.2);
  scene.add(truck);

  // Phone slab on truck
  const phone = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.4, 0.06),
    new THREE.MeshStandardMaterial({
      color: 0x111820,
      emissive: ORANGE,
      emissiveIntensity: 0.35,
      roughness: 0.4,
    }),
  );
  phone.position.set(-2.0, 1.35, 3.2);
  phone.rotation.x = -0.35;
  scene.add(phone);

  // Pulse ring
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.3, 0.38, 32),
    new THREE.MeshBasicMaterial({
      color: ORANGE,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    }),
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(-2.0, 0.05, 3.2);
  scene.add(ring);

  // Lead particles
  const maxPts = low ? 900 : 1600;
  const positionsAttr = new Float32Array(maxPts * 3);
  const colorsAttr = new Float32Array(maxPts * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positionsAttr, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colorsAttr, 3));
  const ptsMat = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
  });
  const leadPoints: Points = new THREE.Points(geo, ptsMat);
  scene.add(leadPoints);

  // Path waypoints: truck → competitor roof → (rewind) → house → calendar → pin
  const pathLost = [
    new THREE.Vector3(-2.0, 1.4, 3.2),
    new THREE.Vector3(1, 2.5, 1),
    new THREE.Vector3(6, 3.5, -4),
    new THREE.Vector3(8, 4.2, -6),
  ];
  const pathCaught = [
    new THREE.Vector3(-2.0, 1.4, 3.2),
    new THREE.Vector3(-0.5, 2.2, 1.5),
    new THREE.Vector3(2.5, 2.8, -1),
    new THREE.Vector3(4.5, 2.2, -2.5),
    new THREE.Vector3(5.5, 1.6, -2.8),
  ];

  // Cold competitor roof
  const coldRoof = new THREE.Mesh(
    new THREE.ConeGeometry(1.4, 0.7, 4),
    new THREE.MeshStandardMaterial({
      color: 0x4a5568,
      roughness: 0.9,
      transparent: true,
      opacity: 0,
    }),
  );
  coldRoof.position.set(8, 4.5, -6);
  coldRoof.rotation.y = Math.PI / 4;
  scene.add(coldRoof);

  // Customer house
  const house = new THREE.Group();
  const houseBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 1.1, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x243044 }),
  );
  houseBody.position.y = 0.55;
  house.add(houseBody);
  const houseRoof = new THREE.Mesh(
    new THREE.ConeGeometry(1.1, 0.55, 4),
    new THREE.MeshStandardMaterial({ color: 0x3a4a62 }),
  );
  houseRoof.position.y = 1.35;
  houseRoof.rotation.y = Math.PI / 4;
  house.add(houseRoof);
  house.position.set(4.5, 0, -2.5);
  house.visible = false;
  scene.add(house);

  // Calendar grid plane
  const calGroup = new THREE.Group();
  const calBase = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 1.8),
    new THREE.MeshBasicMaterial({
      color: PAPER,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    }),
  );
  calGroup.add(calBase);
  const cellGeo = new THREE.PlaneGeometry(0.28, 0.28);
  const cells: InstanceType<typeof THREE.Mesh>[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const cell = new THREE.Mesh(
        cellGeo,
        new THREE.MeshBasicMaterial({
          color: 0xd0d8e4,
          transparent: true,
          opacity: 0,
        }),
      );
      cell.position.set(-0.7 + c * 0.42, 0.5 - r * 0.42, 0.02);
      calGroup.add(cell);
      cells.push(cell);
    }
  }
  calGroup.position.set(5.5, 2.4, -1.5);
  calGroup.rotation.y = -0.4;
  scene.add(calGroup);

  // Map pin + stars for reviews
  const pin = new THREE.Mesh(
    new THREE.ConeGeometry(0.2, 0.5, 6),
    new THREE.MeshBasicMaterial({ color: MINT, transparent: true, opacity: 0 }),
  );
  pin.rotation.x = Math.PI;
  pin.position.set(3, 2.2, 1);
  scene.add(pin);

  const starPts = new Float32Array(24 * 3);
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    starPts[i * 3] = 3 + Math.cos(a) * 0.8;
    starPts[i * 3 + 1] = 2.2 + Math.sin(a) * 0.5;
    starPts[i * 3 + 2] = 1;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPts, 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({
      color: MINT,
      size: 0.12,
      transparent: true,
      opacity: 0,
    }),
  );
  scene.add(stars);

  // Browser frame for "site" chapter
  const browser = new THREE.Group();
  const frame = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 2.1),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    }),
  );
  browser.add(frame);
  const chrome = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 0.28),
    new THREE.MeshBasicMaterial({
      color: 0xdfe6ef,
      transparent: true,
      opacity: 0,
    }),
  );
  chrome.position.y = 1.05;
  chrome.position.z = 0.01;
  browser.add(chrome);
  browser.position.set(0, 4, 2);
  scene.add(browser);

  // Fireflies for proof
  const flyCount = 40;
  const flyPos = new Float32Array(flyCount * 3);
  for (let i = 0; i < flyCount; i++) {
    flyPos[i * 3] = (rng() - 0.5) * 16;
    flyPos[i * 3 + 1] = 1 + rng() * 5;
    flyPos[i * 3 + 2] = (rng() - 0.5) * 14;
  }
  const flyGeo = new THREE.BufferGeometry();
  flyGeo.setAttribute("position", new THREE.BufferAttribute(flyPos, 3));
  const fireflies = new THREE.Points(
    flyGeo,
    new THREE.PointsMaterial({
      color: 0xffe6a8,
      size: 0.06,
      transparent: true,
      opacity: 0,
    }),
  );
  scene.add(fireflies);

  // Scanning plane for quote
  const scan = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 0.04),
    new THREE.MeshBasicMaterial({
      color: MINT,
      transparent: true,
      opacity: 0,
    }),
  );
  scan.position.set(4.5, 1.6, -2.5);
  scene.add(scan);

  const disposables: (BufferGeometry | Material | Group | InstancedMesh)[] = [
    boxGeo,
    boxMat,
    ground.geometry,
    ground.material as Material,
    geo,
    ptsMat,
  ];

  let progress = 0;
  let opacity = 1;

  function lerpPath(
    path: InstanceType<typeof THREE.Vector3>[],
    t: number,
    out: InstanceType<typeof THREE.Vector3>,
  ) {
    const n = path.length - 1;
    const x = Math.min(1, Math.max(0, t)) * n;
    const i = Math.min(n - 1, Math.floor(x));
    const f = x - i;
    out.lerpVectors(path[i], path[i + 1], f);
    return out;
  }

  const tmp = new THREE.Vector3();
  const orangeC = new THREE.Color(ORANGE);
  const mintC = new THREE.Color(MINT);
  const grayC = new THREE.Color(0x8899aa);

  function fillLead(
    path: InstanceType<typeof THREE.Vector3>[],
    amount: number,
    color: InstanceType<typeof THREE.Color>,
    fade = 0,
  ) {
    const count = Math.floor(amount * maxPts);
    for (let i = 0; i < maxPts; i++) {
      if (i < count) {
        const t = i / Math.max(1, count - 1);
        lerpPath(path, t, tmp);
        // slight noise
        positionsAttr[i * 3] = tmp.x + (rng() - 0.5) * 0.08;
        positionsAttr[i * 3 + 1] = tmp.y + (rng() - 0.5) * 0.08;
        positionsAttr[i * 3 + 2] = tmp.z + (rng() - 0.5) * 0.08;
        const c = color.clone().lerp(grayC, fade);
        colorsAttr[i * 3] = c.r;
        colorsAttr[i * 3 + 1] = c.g;
        colorsAttr[i * 3 + 2] = c.b;
      } else {
        positionsAttr[i * 3 + 1] = -100;
      }
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
    geo.setDrawRange(0, count);
  }

  function camPath(p: number) {
    // Camera keyframes along story
    if (p < 0.08) {
      camera.position.set(0, 8 - p * 10, 16 - p * 20);
      camera.lookAt(0, 1, 0);
    } else if (p < 0.18) {
      const t = (p - 0.08) / 0.1;
      camera.position.lerpVectors(
        new THREE.Vector3(0, 7.2, 14.4),
        new THREE.Vector3(-1.2, 3.2, 7),
        t,
      );
      camera.lookAt(-2, 1, 3);
    } else if (p < 0.3) {
      const t = (p - 0.18) / 0.12;
      camera.position.lerpVectors(
        new THREE.Vector3(-1.2, 3.2, 7),
        new THREE.Vector3(5, 5, -1),
        t,
      );
      camera.lookAt(6, 3, -4);
    } else if (p < 0.46) {
      const t = (p - 0.3) / 0.16;
      camera.position.lerpVectors(
        new THREE.Vector3(5, 5, -1),
        new THREE.Vector3(1, 4, 8),
        Math.min(1, t),
      );
      camera.lookAt(1, 1.5, 0);
    } else if (p < 0.64) {
      camera.position.set(2 + (p - 0.46) * 4, 4.2, 7);
      camera.lookAt(4.5, 1.5, -2);
    } else if (p < 0.78) {
      camera.position.set(0, 6, 12);
      camera.lookAt(0, 1, 0);
    } else if (p < 0.86) {
      camera.position.set(0, 5.5, 9);
      camera.lookAt(0, 4, 2);
    } else {
      camera.position.set(0, 7, 14);
      camera.lookAt(0, 2, 0);
    }
  }

  function applyProgress(p: number) {
    progress = p;
    camPath(p);

    // Idle truck drift early
    truck.position.x = -2.2 + Math.sin(p * 40) * 0.05;

    // Phone pulse 8–18%
    const pulse = p >= 0.08 && p < 0.22 ? Math.sin((p - 0.08) * 80) * 0.5 + 0.5 : 0;
    (ring.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity =
      pulse * (p < 0.18 ? 0.9 : 0.2);
    ring.scale.setScalar(1 + pulse * 2);
    (phone.material as InstanceType<typeof THREE.MeshStandardMaterial>).emissiveIntensity =
      p < 0.3 ? 0.2 + pulse * 0.8 : p < 0.46 ? 0.5 : 0.15;

    accent.intensity = p < 0.3 ? 0.9 : 0.25;
    mintLight.intensity = p > 0.34 ? Math.min(1.4, (p - 0.34) * 3) : 0;

    // Without: lost path
    if (p >= 0.18 && p < 0.3) {
      const t = (p - 0.18) / 0.12;
      fillLead(pathLost, t, orangeC, t * 0.7);
      (coldRoof.material as InstanceType<typeof THREE.MeshStandardMaterial>).opacity = t;
      scene.fog = new THREE.FogExp2(INK, 0.035 + t * 0.02);
      boxMat.color.setRGB(0.08 + t * 0.05, 0.1, 0.14);
    } else if (p >= 0.3 && p < 0.34) {
      // Rewind
      const t = 1 - (p - 0.3) / 0.04;
      fillLead(pathLost, t, orangeC, t * 0.5);
      (coldRoof.material as InstanceType<typeof THREE.MeshStandardMaterial>).opacity = t;
      boxMat.color.set(0x1a2438);
      scene.fog = new THREE.FogExp2(INK, 0.035);
    } else if (p >= 0.34 && p < 0.64) {
      const t = Math.min(1, (p - 0.34) / 0.28);
      fillLead(pathCaught, t, mintC, 0);
      (coldRoof.material as InstanceType<typeof THREE.MeshStandardMaterial>).opacity = 0;
      house.visible = true;
    } else if (p < 0.18 && p >= 0.08) {
      const t = (p - 0.08) / 0.1;
      fillLead(pathCaught, t * 0.15, orangeC, 0);
      house.visible = false;
    } else if (p < 0.08) {
      fillLead(pathCaught, 0, orangeC, 0);
      house.visible = false;
      (coldRoof.material as InstanceType<typeof THREE.MeshStandardMaterial>).opacity = 0;
    } else {
      fillLead(pathCaught, p < 0.92 ? 1 : 1 - (p - 0.92) / 0.08, mintC, 0);
    }

    // Scan plane during quote
    if (p >= 0.46 && p < 0.56) {
      const t = (p - 0.46) / 0.1;
      (scan.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = 0.85;
      scan.position.y = 0.8 + t * 1.4;
    } else {
      (scan.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = 0;
    }

    // Calendar
    const calShow = p >= 0.56 && p < 0.72;
    (calBase.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = calShow ? 0.92 : 0;
    cells.forEach((cell, i) => {
      const mat = cell.material as InstanceType<typeof THREE.MeshBasicMaterial>;
      mat.opacity = calShow ? 0.95 : 0;
      if (calShow && i === 5 && p > 0.58) {
        mat.color.set(MINT);
      } else {
        mat.color.set(0xd0d8e4);
      }
    });

    // Stars / pin after job
    if (p >= 0.64 && p < 0.78) {
      const t = (p - 0.64) / 0.08;
      (pin.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = Math.min(1, t);
      (stars.material as InstanceType<typeof THREE.PointsMaterial>).opacity = Math.min(1, t);
    } else {
      (pin.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = 0;
      (stars.material as InstanceType<typeof THREE.PointsMaterial>).opacity = 0;
    }

    // Main street relight for salon chapter
    windowGroup.visible = p < 0.72 || p >= 0.72;
    winMat.color.set(p >= 0.72 && p < 0.78 ? MINT : 0xffb86a);

    // Browser
    const bShow = p >= 0.78 && p < 0.86;
    (frame.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = bShow ? 0.95 : 0;
    (chrome.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = bShow ? 0.95 : 0;

    // Fireflies
    (fireflies.material as InstanceType<typeof THREE.PointsMaterial>).opacity =
      p >= 0.86 && p < 0.92 ? 0.8 : 0;
    if (p >= 0.86 && p < 0.92) {
      const arr = flyGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < flyCount; i++) {
        arr[i * 3 + 1] += Math.sin(p * 60 + i) * 0.002;
      }
      flyGeo.attributes.position.needsUpdate = true;
    }

    // Fade canvas near end
    opacity = p >= 0.92 ? 0.3 + (1 - (p - 0.92) / 0.08) * 0.7 : 1;
    canvas.style.opacity = String(opacity);
  }

  function resize(w: number, h: number) {
    const width = Math.max(1, w);
    const height = Math.max(1, h);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function render() {
    renderer.render(scene, camera);
  }

  function dispose() {
    renderer.dispose();
    disposables.forEach((d) => {
      if ("dispose" in d && typeof d.dispose === "function") d.dispose();
    });
    scene.clear();
  }

  function projectBookHint() {
    tmp.set(-2, 1.4, 3.2);
    tmp.project(camera);
    const x = (tmp.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (-tmp.y * 0.5 + 0.5) * canvas.clientHeight;
    return { x, y };
  }

  // initial
  resize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight);
  applyProgress(0);
  render();

  return {
    setProgress: applyProgress,
    resize,
    render,
    dispose,
    setOpacity: (o: number) => {
      opacity = o;
      canvas.style.opacity = String(o);
    },
    projectBookHint,
  };
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
