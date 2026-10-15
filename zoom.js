(() => {
  const curtain = document.createElement("div");
  curtain.className = "zoom-curtain";
  curtain.setAttribute("aria-hidden", "true");
  document.body.appendChild(curtain);

  let busy = false;

  function go(href) {
    window.location.href = href;
  }

  function zoomTo(el, href) {
    if (busy || !href) return;
    busy = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      go(href);
      return;
    }

    const r = el.getBoundingClientRect();
    const clone = el.cloneNode(true);
    clone.classList.add("zoom-clone");
    clone.querySelectorAll("a").forEach((a) => a.removeAttribute("href"));
    Object.assign(clone.style, {
      position: "fixed",
      left: `${r.left}px`,
      top: `${r.top}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
      margin: "0",
      zIndex: "10000",
      transformOrigin: "center center",
      pointerEvents: "none",
      borderRadius: getComputedStyle(el).borderRadius || "14px",
    });

    document.body.appendChild(clone);
    document.body.classList.add("is-zooming");
    curtain.classList.add("is-on");

    const stage = document.querySelector(".stage");
    if (stage) {
      stage.style.transition = "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease";
      stage.style.transformOrigin = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
    }

    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = window.innerWidth / 2 - cx;
    const dy = window.innerHeight / 2 - cy;
    const scale = Math.max(window.innerWidth / Math.max(r.width, 1), window.innerHeight / Math.max(r.height, 1)) * 1.18;

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      clone.style.opacity = "0.2";
      curtain.style.opacity = "1";
      if (stage) {
        stage.style.transform = "scale(1.12)";
        stage.style.opacity = "0.35";
      }
    });

    window.setTimeout(() => go(href), 580);
  }

  document.addEventListener(
    "click",
    (e) => {
      const el = e.target.closest("[data-zoom]");
      if (!el) return;
      if (document.body.classList.contains("is-dragging")) return;
      const href = el.getAttribute("href") || el.getAttribute("data-href");
      if (!href) return;
      // ignore pure hash
      if (href === "#") return;
      e.preventDefault();
      e.stopPropagation();
      zoomTo(el, href);
    },
    true,
  );
})();
