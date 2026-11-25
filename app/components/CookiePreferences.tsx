"use client";

import { useEffect, useState } from "react";

const KEY = "upti_consent_v2";

type Consent = {
  analytics: boolean;
  marketing: boolean;
};

function readConsent(): Consent {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { analytics: false, marketing: false };
    const parsed = JSON.parse(raw) as Consent;
    return {
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
    };
  } catch {
    return { analytics: false, marketing: false };
  }
}

export function CookiePreferences() {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const c = readConsent();
    setAnalytics(c.analytics);
    setMarketing(c.marketing);
  }, []);

  function save(next: Consent, message: string) {
    localStorage.setItem(KEY, JSON.stringify(next));
    setAnalytics(next.analytics);
    setMarketing(next.marketing);
    setStatus(message);
  }

  return (
    <div className="spotlight-card mt-4 p-5" id="pref-panel">
      <label className="flex items-start gap-3 py-2 text-sm">
        <input type="checkbox" checked disabled className="mt-1" />
        <span>
          <strong className="text-[var(--color-text)]">Essential</strong> — site security,
          consent memory, load balancing. Always on.
        </span>
      </label>
      <label className="flex items-start gap-3 py-2 text-sm">
        <input
          type="checkbox"
          className="mt-1"
          checked={analytics}
          onChange={(e) => setAnalytics(e.target.checked)}
        />
        <span>
          <strong className="text-[var(--color-text)]">Analytics</strong> — Microsoft Clarity,
          Google Analytics (when configured). Helps us see how the site is used.
        </span>
      </label>
      <label className="flex items-start gap-3 py-2 text-sm">
        <input
          type="checkbox"
          className="mt-1"
          checked={marketing}
          onChange={(e) => setMarketing(e.target.checked)}
        />
        <span>
          <strong className="text-[var(--color-text)]">Marketing</strong> — Meta Pixel and
          similar ads tags (when configured). Measure campaigns / remarketing.
        </span>
      </label>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="halo-btn !min-h-10 !text-sm"
          onClick={() =>
            save(
              { analytics: false, marketing: false },
              "Non-essential cookies rejected.",
            )
          }
        >
          Reject non-essential
        </button>
        <button
          type="button"
          className="halo-btn !min-h-10 !text-sm"
          onClick={() =>
            save({ analytics, marketing }, "Preferences saved.")
          }
        >
          Save preferences
        </button>
        <button
          type="button"
          className="halo-btn !min-h-10 !text-sm"
          onClick={() =>
            save(
              { analytics: true, marketing: true },
              "All optional cookies accepted.",
            )
          }
        >
          Accept all
        </button>
      </div>
      <p className="mt-3 min-h-5 text-sm text-[var(--color-lilac)]" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
