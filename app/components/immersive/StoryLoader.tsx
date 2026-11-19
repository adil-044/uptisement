"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/app/lib/motion";

const KEY = "uptisement-loader-seen";

type Props = {
  onDone: () => void;
};

/**
 * Near-black loader: "Hi." + hairline bar + mono counter.
 * Mounts client-only so SSR LCP (wordmark) is not blocked.
 * <1.2s; skip on repeat visits / reduced motion.
 */
export function StoryLoader({ onDone }: Props) {
  const [phase, setPhase] = useState<"pending" | "show" | "done">("pending");
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let skip = false;
    try {
      skip = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (skip || prefersReducedMotion()) {
      setPhase("done");
      onDone();
      return;
    }

    setPhase("show");
    const start = performance.now();
    const dur = 850;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setPct(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          /* ignore */
        }
        setPhase("done");
        onDone();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (phase !== "show") return null;

  return (
    <div className="story-loader" role="status" aria-live="polite" aria-label="Loading">
      <p className="story-loader__word">Hi.</p>
      <div className="story-loader__bar-wrap">
        <div className="story-loader__bar" style={{ width: `${pct}%` }} />
      </div>
      <p className="story-loader__count font-mono" aria-hidden="true">
        {String(pct).padStart(3, "0")}
      </p>
    </div>
  );
}
