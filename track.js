(function () {
  "use strict";

  var cfg = window.UPTI_TRACK || {};
  var CONSENT_KEY = "upti_consent_v1";
  var UTM_KEY = "upti_utm_v1";
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.dataLayer = window.dataLayer || [];

  function consent() {
    try {
      return localStorage.getItem(CONSENT_KEY) || "";
    } catch (e) {
      return "";
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {}
  }

  function readUtms() {
    var params = new URLSearchParams(window.location.search);
    var keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "fbclid",
      "msclkid",
    ];
    var out = {};
    var hit = false;
    keys.forEach(function (k) {
      var v = params.get(k);
      if (v) {
        out[k] = v;
        hit = true;
      }
    });
    if (hit) {
      try {
        localStorage.setItem(UTM_KEY, JSON.stringify(out));
      } catch (e) {}
      return out;
    }
    try {
      return JSON.parse(localStorage.getItem(UTM_KEY) || "{}") || {};
    } catch (e) {
      return {};
    }
  }

  var utms = readUtms();

  function withUtms(url) {
    try {
      var u = new URL(url, window.location.origin);
      Object.keys(utms).forEach(function (k) {
        if (utms[k] && !u.searchParams.has(k)) {
          u.searchParams.set(k, utms[k]);
        }
      });
      return u.toString();
    } catch (e) {
      return url;
    }
  }

  function loadScript(src, attrs) {
    var s = document.createElement("script");
    s.async = true;
    s.src = src;
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        s.setAttribute(k, attrs[k]);
      });
    }
    document.head.appendChild(s);
    return s;
  }

  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  function track(event, props) {
    props = props || {};
    window.dataLayer.push(
      Object.assign({ event: event }, props, { utm: utms })
    );

    if (typeof window.gtag === "function" && cfg.ga4) {
      window.gtag("event", event, props);
    }

    if (typeof window.fbq === "function" && cfg.metaPixel) {
      if (event === "book_click" || event === "generate_lead") {
        window.fbq("track", "Lead", props);
      } else if (event === "phone_click" || event === "Contact") {
        window.fbq("track", "Contact", props);
      } else if (event === "page_view") {
        /* PageView already on init */
      } else {
        window.fbq("trackCustom", event, props);
      }
    }
  }
  window.uptiTrack = track;

  function initGa4() {
    if (!cfg.ga4) return;
    loadScript(
      "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.ga4)
    );
    window.gtag("js", new Date());
    window.gtag("config", cfg.ga4, {
      anonymize_ip: true,
      send_page_view: true,
    });
  }

  function initMeta() {
    if (!cfg.metaPixel) return;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    window.fbq("init", cfg.metaPixel);
    window.fbq("track", "PageView");
  }

  function initClarity() {
    if (!cfg.clarity) return;
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", cfg.clarity);
  }

  function initLinkedIn() {
    if (!cfg.linkedinPartner) return;
    window._linkedin_partner_id = cfg.linkedinPartner;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(cfg.linkedinPartner);
    loadScript("https://snap.licdn.com/li.lms-analytics/insight.min.js");
  }

  function initGtm() {
    if (!cfg.gtm) return;
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0];
      var j = d.createElement(s);
      var dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", cfg.gtm);
  }

  function bootPixels() {
    if (window.__uptiPixelsBooted) return;
    window.__uptiPixelsBooted = true;
    initGtm();
    if (!cfg.gtm) {
      initGa4();
      initMeta();
    }
    initClarity();
    initLinkedIn();
    track("page_view", {
      page_location: location.href,
      page_title: document.title,
    });
  }

  function showConsent() {
    if (consent() === "all" || consent() === "essential") return;
    var bar = document.createElement("div");
    bar.className = "consent";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Analytics consent");
    bar.innerHTML =
      '<p>We use analytics + ad pixels to measure site and ad performance. <a href="#privacy-note">Details</a></p>' +
      '<div class="consent-actions">' +
      '<button type="button" data-c="essential" class="consent-ghost">Essential only</button>' +
      '<button type="button" data-c="all" class="consent-ok">Accept</button>' +
      "</div>";
    document.body.appendChild(bar);
    bar.addEventListener("click", function (e) {
      var t = e.target.closest("[data-c]");
      if (!t) return;
      var v = t.getAttribute("data-c");
      setConsent(v);
      bar.remove();
      if (v === "all") bootPixels();
    });
  }

  function wireClicks() {
    document.addEventListener(
      "click",
      function (e) {
        var a = e.target.closest("a");
        if (!a || !a.href) return;

        var href = a.getAttribute("href") || "";
        var label =
          (a.textContent || "").trim().slice(0, 80) || a.getAttribute("aria-label") || "";

        if (/calendly\.com\/uptisement/i.test(a.href)) {
          var stamped = withUtms(a.href);
          if (stamped !== a.href) a.href = stamped;
          track("book_click", { link_url: stamped, link_text: label });
          track("generate_lead", { method: "calendly" });
          return;
        }

        if (a.protocol === "tel:") {
          track("phone_click", { phone: href.replace(/^tel:/i, ""), link_text: label });
          track("Contact", { method: "phone" });
          return;
        }

        if (a.protocol === "mailto:") {
          track("email_click", {
            email: href.replace(/^mailto:/i, ""),
            link_text: label,
          });
          track("Contact", { method: "email" });
          return;
        }

        if (/github\.com\/adil-044\/commercial-roofing-estimator/i.test(a.href)) {
          track("estimator_open", { link_url: a.href });
          return;
        }

        if (
          /github\.io\/(emergency-hvac-ottawa|saco-hair-ottawa|magnolia-spa-ottawa|glorious-nails-ottawa)/i.test(
            a.href
          )
        ) {
          track("site_open", { link_url: a.href, link_text: label });
        }
      },
      true
    );
  }

  function wireScroll() {
    if (reduce) return;
    var marks = { 25: false, 50: false, 75: false, 90: false };
    window.addEventListener(
      "scroll",
      function () {
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        var pct = Math.round((window.scrollY / max) * 100);
        Object.keys(marks).forEach(function (m) {
          var n = Number(m);
          if (!marks[n] && pct >= n) {
            marks[n] = true;
            track("scroll_depth", { percent: n });
          }
        });
      },
      { passive: true }
    );
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    document.querySelectorAll('a[href*="calendly.com/uptisement"]').forEach(function (a) {
      a.href = withUtms(a.href);
    });

    wireClicks();
    wireScroll();

    var c = consent();
    if (c === "all") {
      bootPixels();
    } else if (c === "essential") {
      /* no marketing pixels */
    } else if (cfg.ga4 || cfg.metaPixel || cfg.gtm || cfg.clarity || cfg.linkedinPartner) {
      showConsent();
    }
  });
})();
