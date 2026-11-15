(function () {
  "use strict";

  var cfg = window.UPTI_TRACK || {};
  var CONSENT_KEY = "upti_consent_v2";
  var LEGACY_KEY = "upti_consent_v1";
  var UTM_KEY = "upti_utm_v1";
  var CONSENT_MAX_MS = 365 * 24 * 60 * 60 * 1000;
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  /* Google Consent Mode v2 — deny until opt-in */
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });

  function defaultPrefs() {
    return {
      essential: true,
      analytics: false,
      marketing: false,
      ts: 0,
    };
  }

  function readPrefs() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        if (p && p.ts && Date.now() - p.ts < CONSENT_MAX_MS) {
          return {
            essential: true,
            analytics: !!p.analytics,
            marketing: !!p.marketing,
            ts: p.ts,
          };
        }
      }
      var legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy === "all") {
        return { essential: true, analytics: true, marketing: true, ts: Date.now() };
      }
      if (legacy === "essential") {
        return { essential: true, analytics: false, marketing: false, ts: Date.now() };
      }
    } catch (e) {}
    return null;
  }

  function savePrefs(prefs) {
    var next = {
      essential: true,
      analytics: !!prefs.analytics,
      marketing: !!prefs.marketing,
      ts: Date.now(),
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
      localStorage.removeItem(LEGACY_KEY);
    } catch (e) {}
    return next;
  }

  function applyConsentMode(prefs) {
    gtag("consent", "update", {
      analytics_storage: prefs.analytics ? "granted" : "denied",
      ad_storage: prefs.marketing ? "granted" : "denied",
      ad_user_data: prefs.marketing ? "granted" : "denied",
      ad_personalization: prefs.marketing ? "granted" : "denied",
    });
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

  function loadScript(src) {
    var s = document.createElement("script");
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
    return s;
  }

  function track(event, props) {
    props = props || {};
    window.dataLayer.push(
      Object.assign({ event: event }, props, { utm: utms })
    );

    var prefs = readPrefs() || defaultPrefs();
    if (prefs.analytics && typeof window.gtag === "function" && cfg.ga4) {
      window.gtag("event", event, props);
    }

    if (prefs.marketing && typeof window.fbq === "function" && cfg.metaPixel) {
      if (event === "book_click" || event === "generate_lead") {
        window.fbq("track", "Lead", props);
      } else if (event === "phone_click" || event === "Contact") {
        window.fbq("track", "Contact", props);
      } else if (event !== "page_view") {
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

  function bootFromPrefs(prefs) {
    applyConsentMode(prefs);
    window.__uptiBootSignature =
      (prefs.analytics ? "a1" : "a0") + (prefs.marketing ? "m1" : "m0");

    if (prefs.analytics || prefs.marketing) {
      if (cfg.gtm) initGtm();
    }
    if (prefs.analytics) {
      if (!cfg.gtm) initGa4();
      initClarity();
    }
    if (prefs.marketing) {
      if (!cfg.gtm) initMeta();
      initLinkedIn();
    }
    if (prefs.analytics || prefs.marketing) {
      track("page_view", {
        page_location: location.href,
        page_title: document.title,
      });
    }
  }

  function removeBanner() {
    var el = document.querySelector(".consent");
    if (el) el.remove();
  }

  function showConsent() {
    if (document.querySelector(".consent")) return;
    var bar = document.createElement("div");
    bar.className = "consent";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-modal", "true");
    bar.setAttribute("aria-label", "Cookie consent");
    bar.innerHTML =
      "<p>We use essential cookies to run this site. Analytics (Clarity/GA) and marketing tags load only if you allow them — aligned with GDPR, CCPA, and PIPEDA-style rules. " +
      '<a href="/privacy.html">Privacy</a> · <a href="/cookies.html">Cookies</a></p>' +
      '<div class="consent-actions">' +
      '<button type="button" data-c="reject" class="consent-ghost">Reject non-essential</button>' +
      '<button type="button" data-c="manage" class="consent-ghost">Manage</button>' +
      '<button type="button" data-c="accept" class="consent-ok">Accept all</button>' +
      "</div>";
    document.body.appendChild(bar);
    bar.addEventListener("click", function (e) {
      var t = e.target.closest("[data-c]");
      if (!t) return;
      var v = t.getAttribute("data-c");
      if (v === "manage") {
        location.href = "/cookies.html#preferences";
        return;
      }
      var prefs =
        v === "accept"
          ? { analytics: true, marketing: true }
          : { analytics: false, marketing: false };
      prefs = savePrefs(prefs);
      removeBanner();
      bootFromPrefs(prefs);
      syncPrefUI(prefs);
    });
  }

  function syncPrefUI(prefs) {
    var a = document.getElementById("pref-analytics");
    var m = document.getElementById("pref-marketing");
    var status = document.getElementById("pref-status");
    if (a) a.checked = !!prefs.analytics;
    if (m) m.checked = !!prefs.marketing;
    if (status) {
      status.textContent = prefs.ts
        ? "Saved. Analytics: " +
          (prefs.analytics ? "on" : "off") +
          " · Marketing: " +
          (prefs.marketing ? "on" : "off")
        : "";
    }
  }

  function wirePrefPanel() {
    var panel = document.getElementById("pref-panel");
    if (!panel) return;
    var current = readPrefs() || defaultPrefs();
    syncPrefUI(current);

    function persist(next) {
      next = savePrefs(next);
      /* full reload so denied tags unload cleanly */
      syncPrefUI(next);
      var status = document.getElementById("pref-status");
      if (status) status.textContent = "Preferences saved. Reloading…";
      setTimeout(function () {
        location.reload();
      }, 400);
    }

    var save = document.getElementById("pref-save");
    var reject = document.getElementById("pref-reject");
    var accept = document.getElementById("pref-accept");
    if (save) {
      save.addEventListener("click", function () {
        persist({
          analytics: document.getElementById("pref-analytics").checked,
          marketing: document.getElementById("pref-marketing").checked,
        });
      });
    }
    if (reject) {
      reject.addEventListener("click", function () {
        persist({ analytics: false, marketing: false });
      });
    }
    if (accept) {
      accept.addEventListener("click", function () {
        persist({ analytics: true, marketing: true });
      });
    }
  }

  function wireClicks() {
    document.addEventListener(
      "click",
      function (e) {
        var a = e.target.closest("a");
        if (!a || !a.href) return;

        var href = a.getAttribute("href") || "";
        var label =
          (a.textContent || "").trim().slice(0, 80) ||
          a.getAttribute("aria-label") ||
          "";

        if (/calendly\.com\/uptisement/i.test(a.href)) {
          var stamped = withUtms(a.href);
          if (stamped !== a.href) a.href = stamped;
          track("book_click", { link_url: stamped, link_text: label });
          track("generate_lead", { method: "calendly" });
          return;
        }

        if (a.protocol === "tel:") {
          track("phone_click", {
            phone: href.replace(/^tel:/i, ""),
            link_text: label,
          });
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
        var prefs = readPrefs();
        if (!prefs || !prefs.analytics) return;
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
    document
      .querySelectorAll('a[href*="calendly.com/uptisement"]')
      .forEach(function (a) {
        a.href = withUtms(a.href);
      });

    wireClicks();
    wireScroll();
    wirePrefPanel();

    var prefs = readPrefs();
    if (prefs) {
      bootFromPrefs(prefs);
      syncPrefUI(prefs);
    } else {
      showConsent();
    }

    window.uptiOpenConsent = function () {
      try {
        localStorage.removeItem(CONSENT_KEY);
      } catch (e) {}
      showConsent();
    };
  });
})();
