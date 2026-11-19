"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { STORY, beatAt, type StoryBeat } from "@/app/lib/story";
import type { PhoneState } from "@/app/lib/scene/createPhoneScene";
import { prefersReducedMotion } from "@/app/lib/motion";
import { SceneCanvas } from "./SceneCanvas";
import { StoryLoader } from "./immersive/StoryLoader";
import { ImmersiveNav } from "./immersive/ImmersiveNav";
import { StoryClock } from "./immersive/StoryClock";
import { StoryCopy } from "./immersive/StoryCopy";
import { StoryEnding } from "./immersive/StoryEnding";
import { CursorCircle } from "./immersive/CursorCircle";
import { PhonePoster } from "./immersive/PhonePoster";

/**
 * Samana-feel immersive homepage: one long scroll, phone hero, time clock,
 * chapter copy, loader, nav/menu, ending. Town/lamp removed.
 */
export function ImmersiveHome() {
  const progressRef = useRef(0);
  const stateRef = useRef<PhoneState>("idle");
  const [beat, setBeat] = useState<StoryBeat>(() => beatAt(0));
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [wordmarkDim, setWordmarkDim] = useState(false);
  const [, setWebglLive] = useState(false);
  const [tryWebGL, setTryWebGL] = useState(false);
  const onLoaderDone = useCallback(() => setReady(true), []);

  // Desktop only: try WebGL after first paint; mobile/low-end stay on CSS poster
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if (mem !== undefined && mem <= 4) return;
    // Probe WebGL before mounting three
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl") || c.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }
    let cancelled = false;
    const boot = () => {
      if (!cancelled) setTryWebGL(true);
    };
    let idle: number | undefined;
    let t: ReturnType<typeof setTimeout> | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idle = window.requestIdleCallback(boot, { timeout: 800 });
    } else {
      t = setTimeout(boot, 200);
    }
    return () => {
      cancelled = true;
      if (idle !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle);
      }
      if (t !== undefined) clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      progressRef.current = 0;
      return;
    }

    let killed = false;
    let revert: (() => void) | undefined;

    void (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (killed) return;
      gsap.registerPlugin(ScrollTrigger);

      const track = document.querySelector("[data-story-track]");
      if (!track) return;

      const st = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress;
          progressRef.current = p;
          const next = beatAt(p);
          stateRef.current = next.phone;
          setProgress(p);
          setBeat((prev) => (prev.id === next.id ? prev : next));
          setWordmarkDim(p > 0.12);
        },
      });
      revert = () => st.kill();
    })();

    return () => {
      killed = true;
      revert?.();
    };
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion()) return;
    const onScroll = () => {
      const track = document.querySelector("[data-story-track]") as HTMLElement | null;
      if (!track) return;
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = Math.min(total, Math.max(0, -track.getBoundingClientRect().top));
      const p = total > 0 ? scrolled / total : 0;
      progressRef.current = p;
      const next = beatAt(p);
      stateRef.current = next.phone;
      setProgress(p);
      setBeat((prev) => (prev.id === next.id ? prev : next));
      setWordmarkDim(p > 0.12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Native scroll fallback always keeps progress in sync for clock (even with GSAP)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const onScroll = () => {
      // GSAP owns progressRef; this is a safety net before GSAP boots
      if (progressRef.current > 0) return;
      const track = document.querySelector("[data-story-track]") as HTMLElement | null;
      if (!track) return;
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = Math.min(total, Math.max(0, -track.getBoundingClientRect().top));
      const p = total > 0 ? scrolled / total : 0;
      progressRef.current = p;
      const next = beatAt(p);
      stateRef.current = next.phone;
      setProgress(p);
      setBeat((prev) => (prev.id === next.id ? prev : next));
      setWordmarkDim(p > 0.12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ending = beat.id === "ending";

  return (
    <div className={`immersive-client${ready ? " is-ready" : ""}`}>
      <StoryLoader onDone={onLoaderDone} />
      <ImmersiveNav pillLabel={beat.pill} />

      {tryWebGL ? (
        <SceneCanvas
          progressRef={progressRef}
          stateRef={stateRef}
          variant="story"
          onReady={() => setWebglLive(true)}
          onFallback={() => setWebglLive(false)}
        />
      ) : null}

      {/* Dim/hide the SSR wordmark via class on html */}
      <WordmarkController dim={wordmarkDim} hidden={ending} state={beat.phone} />

      <StoryCopy beat={beat} />
      <StoryClock beat={beat} progress={progress} />
      <StoryEnding active={ending} />
      <CursorCircle />

      <div data-story-track className="immersive-track">
        {STORY.map((s) => (
          <section
            key={s.id}
            id={`zone-${s.id}`}
            className="immersive-zone"
            aria-label={`${s.zone} — ${s.clock}`}
          >
            <h2 className="sr-only">
              {s.word} {s.subhead}
            </h2>
            <p className="sr-only">{s.lines.join(" ")}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

/** Sync SSR wordmark + phone poster classes without remounting them. */
function WordmarkController({
  dim,
  hidden,
  state,
}: {
  dim: boolean;
  hidden: boolean;
  state: string;
}) {
  useEffect(() => {
    const mark = document.getElementById("uptisement-brand");
    if (mark) {
      mark.classList.toggle("is-dim", dim);
      mark.classList.toggle("is-hidden", hidden);
    }
    const phone = document.querySelector(".phone-poster");
    if (phone) {
      phone.className = `phone-poster phone-poster--${state}`;
    }
  }, [dim, hidden, state]);
  return null;
}
