"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/app/lib/motion";

type Props = {
  progressRef?: React.MutableRefObject<number>;
  variant?: "story" | "calm";
  className?: string;
};

/**
 * Fixed WebGL canvas behind content.
 * Boots after first paint with a short idle timeout so the town is visible ~1s on desktop,
 * without blocking LCP.
 */
export function SceneCanvas({
  progressRef,
  variant = "story",
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [usePoster, setUsePoster] = useState(false);
  const [ambient, setAmbient] = useState(false);
  const [faded, setFaded] = useState(false);
  const apiRef = useRef<{
    setProgress: (p: number) => void;
    resize: (w: number, h: number) => void;
    render: () => void;
    dispose: () => void;
  } | null>(null);
  const rafRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    setAmbient(window.matchMedia("(max-width: 767px)").matches);
    const mq = window.matchMedia("(max-width: 767px)");
    const onMq = () => setAmbient(mq.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setUsePoster(true);
      return;
    }

    let cancelled = false;
    let api: typeof apiRef.current = null;
    let cleanupResize: (() => void) | undefined;

    const boot = async () => {
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;

      const { createTownScene, shouldSkipWebGL } = await import(
        "@/app/lib/scene/createTownScene"
      );
      if (cancelled || shouldSkipWebGL()) {
        setUsePoster(true);
        return;
      }

      api = await createTownScene(canvas);
      if (!api || cancelled) {
        setUsePoster(true);
        return;
      }
      apiRef.current = api;

      const loop = () => {
        if (!api) return;
        if (visibleRef.current) {
          const p = progressRef?.current ?? 0;
          if (variant === "calm") {
            api.setProgress(0.04 + Math.min(0.04, p * 0.05));
          } else {
            api.setProgress(p);
            setFaded(p >= 0.92);
          }
          api.render();
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);

      const onResize = () => {
        if (!api || !canvas) return;
        const h =
          ambient && variant === "story"
            ? Math.min(window.innerHeight * 0.42, 320)
            : window.innerHeight;
        api.resize(window.innerWidth, h);
      };
      onResize();
      window.addEventListener("resize", onResize);

      const onVis = () => {
        visibleRef.current = document.visibilityState === "visible";
      };
      document.addEventListener("visibilitychange", onVis);

      cleanupResize = () => {
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVis);
      };
    };

    // After paint: short idle so dusk town shows ~1s without blocking LCP
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(() => void boot(), { timeout: 400 });
    } else {
      timeoutHandle = setTimeout(() => void boot(), 120);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      if (idleHandle !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
      cleanupResize?.();
      api?.dispose();
      apiRef.current = null;
    };
  }, [progressRef, variant, ambient]);

  if (usePoster) {
    return <div className={`scene-poster ${className}`} aria-hidden="true" />;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`scene-canvas ${className}`}
      data-mode={ambient && variant === "story" ? "ambient" : "full"}
      data-faded={faded ? "true" : "false"}
      aria-hidden="true"
    />
  );
}
