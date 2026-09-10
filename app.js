const root = document.documentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav-menu");

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

window.addEventListener(
  "pointermove",
  (e) => {
    root.style.setProperty("--mx", `${(e.clientX / window.innerWidth) * 100}%`);
    root.style.setProperty("--my", `${(e.clientY / window.innerHeight) * 100}%`);
  },
  { passive: true }
);

document.querySelectorAll(".magnet").forEach((el) => {
  if (reduce) return;
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  });
  el.addEventListener("pointerleave", () => {
    el.style.transform = "";
  });
});

if (!reduce && "IntersectionObserver" in window) {
  const items = document.querySelectorAll(".reveal");
  items.forEach((el) => el.classList.add("is-pending"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
}
