(() => {
  const root = document.documentElement;
  const burger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const face = document.getElementById("faceLive");
  if (!burger || !menu) return;

  const moods = ["smile", "flat", "wow", "smirk", "wink"];
  let moodIdx = 0;
  let faceTimer = null;
  let idleTimer = null;

  function setMode(mode) {
    burger.dataset.mode = mode;
  }

  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    root.classList.toggle("has-menu", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    setMode(open ? "close" : "faces");
    if (open) stopFaceCycle();
    else startFaceCycle();
  }

  function startFaceCycle() {
    if (!face) return;
    stopFaceCycle();
    setMode("faces");
    faceTimer = window.setInterval(() => {
      moodIdx = (moodIdx + 1) % moods.length;
      face.dataset.mood = moods[moodIdx];
    }, 1600);
  }

  function stopFaceCycle() {
    if (faceTimer) window.clearInterval(faceTimer);
    faceTimer = null;
  }

  // After idle drag/scroll, briefly show bars then back to faces (Kabane “live”)
  function pokeBars() {
    if (root.classList.contains("has-menu")) return;
    setMode("bars");
    if (idleTimer) window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => {
      if (!root.classList.contains("has-menu")) setMode("faces");
    }, 900);
  }

  burger.addEventListener("click", () => {
    setMenu(!menu.classList.contains("is-open"));
  });

  menu.querySelectorAll("[data-close-menu]").forEach((el) => {
    el.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  document.querySelectorAll("[data-mood]").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.setAttribute("data-theme", btn.dataset.mood);
      document.querySelectorAll("[data-mood]").forEach((b) =>
        b.classList.toggle("on", b === btn),
      );
    });
  });

  // mark current nav
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const page =
    file === "" || file === "index.html"
      ? "index"
      : file.replace(/\.html$/, "");
  menu.querySelectorAll(".menu-nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href.includes(`${page}.html`) || (page === "index" && href.includes("index"))) {
      a.classList.add("is-current");
    }
  });

  // home pan / wheel pokes bars
  const stage = document.getElementById("stage");
  if (stage) {
    stage.addEventListener(
      "pointerdown",
      () => pokeBars(),
      { passive: true },
    );
    stage.addEventListener(
      "wheel",
      () => pokeBars(),
      { passive: true },
    );
  }

  startFaceCycle();
  setMode("faces");
})();
