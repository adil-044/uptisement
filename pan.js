(() => {
  const stage = document.getElementById("stage");
  const canvas = document.getElementById("canvas");
  const hint = document.getElementById("hint");
  if (!stage || !canvas) return;

  const mqMobile = window.matchMedia("(max-width: 799px)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  let x = 0;
  let y = 0;
  let tx = x;
  let ty = y;
  let vx = 0;
  let vy = 0;
  let active = false;
  let px = 0;
  let py = 0;
  let didPan = false;
  let pointerId = null;
  let panning = false;
  let panIdleTimer = null;
  const friction = 0.92;
  const wheelGain = 1.15;
  const panThreshold = mqMobile.matches ? 4 : 5;
  const lerp = reduce.matches ? 1 : mqMobile.matches ? 0.28 : 0.22;

  function clearSelect() {
    const sel = window.getSelection && window.getSelection();
    if (sel && sel.removeAllRanges) sel.removeAllRanges();
  }

  function setPanning(on) {
    if (reduce.matches) return;
    panning = on;
    canvas.classList.toggle("is-panning", on);
    if (on) {
      if (panIdleTimer) clearTimeout(panIdleTimer);
    } else {
      panIdleTimer = setTimeout(() => {
        canvas.classList.remove("is-panning");
        canvas.style.setProperty("--board-tilt", "0deg");
      }, 180);
    }
  }

  function apply() {
    const sw = stage.clientWidth;
    const sh = stage.clientHeight;
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    const pad = mqMobile.matches ? 0.35 : 0.2;
    const maxX = Math.max(80, (cw - sw) / 2 + sw * pad);
    const maxY = Math.max(80, (ch - sh) / 2 + sh * pad);
    tx = Math.max(-maxX, Math.min(maxX, tx));
    ty = Math.max(-maxY, Math.min(maxY, ty));
  }

  function paint() {
    canvas.style.setProperty("--pan-x", `${x}px`);
    canvas.style.setProperty("--pan-y", `${y}px`);
    if (!reduce.matches) {
      const depth = mqMobile.matches ? 0.05 : 0.08;
      canvas.style.setProperty("--parallax-x", `${x * depth}px`);
      canvas.style.setProperty("--parallax-y", `${y * depth}px`);
      const tilt = Math.max(-3.5, Math.min(3.5, -vx * 0.28));
      canvas.style.setProperty("--board-tilt", `${tilt}deg`);
    }
  }

  function markMoved() {
    if (hint) hint.classList.add("is-gone");
  }

  function startDragVisual() {
    if (didPan) return;
    didPan = true;
    document.body.classList.add("is-dragging");
    stage.classList.add("is-dragging");
    setPanning(true);
    clearSelect();
    markMoved();
  }

  function onWheel(e) {
    if (document.documentElement.classList.contains("has-menu")) return;
    e.preventDefault();
    tx -= e.deltaX * wheelGain;
    ty -= e.deltaY * wheelGain;
    vx = -e.deltaX * 0.15;
    vy = -e.deltaY * 0.15;
    setPanning(true);
    markMoved();
    apply();
  }

  function onPointerDown(e) {
    if (document.documentElement.classList.contains("has-menu")) return;
    if (e.target.closest(".ui-float, .menu, .hamburger, .logo")) return;
    if (e.button !== undefined && e.button !== 0) return;
    active = true;
    didPan = false;
    pointerId = e.pointerId;
    px = e.clientX;
    py = e.clientY;
    vx = 0;
    vy = 0;
    clearSelect();
    try {
      stage.setPointerCapture(e.pointerId);
    } catch (_) {}
  }

  function onPointerMove(e) {
    if (!active) return;
    if (pointerId !== null && e.pointerId !== pointerId) return;
    const dx = e.clientX - px;
    const dy = e.clientY - py;
    if (!didPan && Math.hypot(dx, dy) < panThreshold) return;
    startDragVisual();
    e.preventDefault();
    px = e.clientX;
    py = e.clientY;
    tx += dx;
    ty += dy;
    vx = dx;
    vy = dy;
    apply();
  }

  function onPointerUp(e) {
    if (!active) return;
    if (pointerId !== null && e.pointerId !== pointerId) return;
    active = false;
    pointerId = null;
    document.body.classList.remove("is-dragging");
    stage.classList.remove("is-dragging");
    setPanning(false);
    clearSelect();
  }

  stage.addEventListener(
    "click",
    (e) => {
      if (!didPan) return;
      e.preventDefault();
      e.stopPropagation();
      didPan = false;
    },
    true,
  );

  stage.addEventListener("dragstart", (e) => e.preventDefault(), true);
  stage.addEventListener("selectstart", (e) => e.preventDefault(), true);

  stage.addEventListener("wheel", onWheel, { passive: false });
  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", onPointerMove, { passive: false });
  stage.addEventListener("pointerup", onPointerUp);
  stage.addEventListener("pointercancel", onPointerUp);
  // stop browser scroll/bounce stealing the gesture on phones
  stage.addEventListener(
    "touchmove",
    (e) => {
      if (document.documentElement.classList.contains("has-menu")) return;
      if (e.target.closest(".ui-float, .menu")) return;
      e.preventDefault();
    },
    { passive: false },
  );

  window.addEventListener("resize", apply);
  mqMobile.addEventListener("change", () => {
    document.documentElement.classList.toggle("is-mobile", mqMobile.matches);
    apply();
  });
  document.documentElement.classList.toggle("is-mobile", mqMobile.matches);

  function tick() {
    if (!active && !reduce.matches) {
      if (Math.abs(vx) > 0.05 || Math.abs(vy) > 0.05) {
        tx += vx;
        ty += vy;
        vx *= friction;
        vy *= friction;
        setPanning(true);
        apply();
      } else if (panning && !active) {
        setPanning(false);
      }
    }
    x += (tx - x) * lerp;
    y += (ty - y) * lerp;
    if (Math.abs(tx - x) < 0.05) x = tx;
    if (Math.abs(ty - y) < 0.05) y = ty;
    paint();
    requestAnimationFrame(tick);
  }

  apply();
  paint();
  requestAnimationFrame(tick);

  if (!reduce.matches) {
    canvas.classList.add("is-entering");
    window.setTimeout(() => canvas.classList.remove("is-entering"), mqMobile.matches ? 1400 : 1900);
  }
})();
