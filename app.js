const root = document.documentElement;
const cursor = document.querySelector(".cursor");
const sheet = document.getElementById("sheet");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarse = window.matchMedia("(pointer: coarse)").matches;

let cx = 0, cy = 0, tx = 0, ty = 0;

function moveCursor() {
  cx += (tx - cx) * 0.22;
  cy += (ty - cy) * 0.22;
  if (cursor) cursor.style.transform = `translate(${cx}px, ${cy}px)`;
  requestAnimationFrame(moveCursor);
}

if (!reduce && !coarse) {
  window.addEventListener("pointermove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
    root.style.setProperty("--mx", `${e.clientX}px`);
    root.style.setProperty("--my", `${e.clientY}px`);
  });
  moveCursor();
} else if (cursor) {
  cursor.style.display = "none";
}

document.querySelectorAll("[data-tilt]").forEach((card) => {
  const shine = document.createElement("div");
  shine.className = "shine";
  card.appendChild(shine);

  card.addEventListener("pointermove", (e) => {
    if (reduce || coarse) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 12;
    const ry = (x - 0.5) * 14;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    card.style.setProperty("--lx", `${x * 100}%`);
    card.style.setProperty("--ly", `${y * 100}%`);
    shine.style.opacity = "1";
    cursor?.classList.add("on-card");
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
    shine.style.opacity = "0";
    cursor?.classList.remove("on-card");
  });

  const open = () => {
    sheet.querySelector(".sheet-k").textContent = card.dataset.kind;
    sheet.querySelector(".sheet-t").textContent = card.dataset.title;
    sheet.querySelector(".sheet-c").textContent = card.dataset.copy;
    const a = sheet.querySelector(".btn");
    a.href = card.dataset.url;
    const u = card.dataset.url || "";
    if (u.includes("calendly.com") || u.includes("cal.com")) a.textContent = "Book a call";
    else if (u.includes("github.com")) a.textContent = "Open GitHub";
    else a.textContent = "Open live";
    sheet.showModal();
  };

  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });
});

document.querySelectorAll(".magnet").forEach((btn) => {
  btn.addEventListener("pointermove", (e) => {
    if (reduce || coarse) return;
    const r = btn.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  });
  btn.addEventListener("pointerleave", () => {
    btn.style.transform = "";
  });
});

const bar = document.querySelector(".progress i");
function onScroll() {
  if (!bar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? (window.scrollY / max) * 100 : 0;
  bar.style.width = `${p}%`;
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav-menu");
toggle?.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});
menu?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});
