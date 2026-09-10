const root = document.documentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarse = window.matchMedia("(pointer: coarse)").matches;
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav-menu");
const cursor = document.querySelector(".cursor");

if (toggle && nav && menu) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* Spotlight + custom cursor */
window.addEventListener(
  "pointermove",
  (e) => {
    root.style.setProperty("--mx", `${(e.clientX / window.innerWidth) * 100}%`);
    root.style.setProperty("--my", `${(e.clientY / window.innerHeight) * 100}%`);
    if (cursor && !coarse && !reduce) {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  },
  { passive: true }
);

if (cursor && !coarse && !reduce) {
  document.querySelectorAll("a, button, .stack-card, .float-chip").forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("is-hover"));
  });
}

/* Magnetic CTAs */
document.querySelectorAll(".magnet").forEach((el) => {
  if (reduce || coarse) return;
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.14}px, ${y * 0.2}px)`;
  });
  el.addEventListener("pointerleave", () => {
    el.style.transform = "";
  });
});

/* 3D tilt on browser frames — React Bits / agency card feel */
document.querySelectorAll("[data-tilt]").forEach((el) => {
  if (reduce || coarse) return;
  const frame = el.querySelector(".browser") || el;
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 10;
    const ry = (px - 0.5) * 12;
    frame.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`;
  });
  el.addEventListener("pointerleave", () => {
    frame.style.transform = "";
  });
});

/* Scroll stack depth — desktop only (mobile uses simple list) */
const cards = Array.from(document.querySelectorAll(".stack-card"));
const desktopStack = window.matchMedia("(min-width: 901px)");
function updateStack() {
  if (!cards.length || !desktopStack.matches || reduce) {
    cards.forEach((card) => {
      card.style.transform = "";
      card.classList.remove("is-behind");
    });
    return;
  }
  const vh = window.innerHeight;
  cards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    const stickyTop = vh * 0.12;
    const progress = Math.min(1, Math.max(0, (stickyTop - rect.top + 40) / (vh * 0.35)));
    const scale = 1 - progress * 0.06;
    const y = progress * -18;
    card.style.transform = `translateY(${y}px) scale(${scale})`;
    card.classList.toggle("is-behind", progress > 0.15 && i < cards.length - 1);
    card.style.zIndex = String(10 + i);
  });
}
let stackRaf = 0;
function onScrollStack() {
  if (stackRaf) return;
  stackRaf = requestAnimationFrame(() => {
    stackRaf = 0;
    updateStack();
  });
}
window.addEventListener("scroll", onScrollStack, { passive: true });
window.addEventListener("resize", updateStack);
desktopStack.addEventListener("change", updateStack);
updateStack();

/* Force fixed Book CTA on phones (iOS overflow / cache failsafe) */
(function pinMobileCta() {
  const bar = document.getElementById("mobile-cta");
  if (!bar) return;
  function apply() {
    const phone =
      window.matchMedia("(max-width: 900px)").matches ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!phone) {
      bar.style.removeProperty("display");
      return;
    }
    bar.style.setProperty("display", "flex", "important");
    bar.style.setProperty("position", "fixed", "important");
    bar.style.setProperty("left", "0", "important");
    bar.style.setProperty("right", "0", "important");
    bar.style.setProperty("bottom", "0", "important");
    bar.style.setProperty("z-index", "9999", "important");
    bar.style.setProperty("width", "100%", "important");
  }
  apply();
  window.addEventListener("resize", apply);
  window.addEventListener("orientationchange", apply);
})();

/* Hero canvas: skip / lighten on small screens */
const isMobile = window.matchMedia("(max-width: 900px)");

/* Floating chips open live sites */
document.querySelectorAll(".float-chip").forEach((btn) => {
  btn.addEventListener("click", () => {
    const url = btn.getAttribute("data-url");
    if (url) window.open(url, "_blank", "noopener");
  });
});

/* Hero particle field — quiet agency motion (desktop) */
(function heroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || reduce || isMobile.matches) {
    if (canvas && isMobile.matches) canvas.style.display = "none";
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let raf = 0;
  const dots = [];

  function resize() {
    const parent = canvas.parentElement;
    w = parent.clientWidth;
    h = parent.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seed() {
    dots.length = 0;
    const n = Math.floor((w * h) / 18000);
    for (let i = 0; i < n; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: Math.random() * 0.5 + 0.15,
      });
    }
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w * 0.72, h * 0.28, 0, w * 0.72, h * 0.28, w * 0.45);
    g.addColorStop(0, "rgba(90,168,170,0.22)");
    g.addColorStop(0.45, "rgba(90,168,170,0.05)");
    g.addColorStop(1, "rgba(7,11,18,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    dots.forEach((d) => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,238,244,${d.a})`;
      ctx.fill();
    });

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const a = dots[i];
        const b = dots[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110) {
          ctx.strokeStyle = `rgba(90,168,170,${0.12 * (1 - dist / 110)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(frame);
  }

  resize();
  seed();
  frame();
  window.addEventListener("resize", () => {
    resize();
    seed();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(frame);
  });
})();
