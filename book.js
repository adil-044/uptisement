(() => {
  // Single source for the Calendly booking URL. Change this one line if the event slug changes.
  const BOOK_URL = "https://calendly.com/uptisement/30min";
  window.UPTISMENT_BOOK_URL = BOOK_URL;

  function applyBookLinks() {
    document.querySelectorAll("[data-book]").forEach((el) => {
      el.setAttribute("href", BOOK_URL);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyBookLinks);
  } else {
    applyBookLinks();
  }
})();
