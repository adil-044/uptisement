"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/app/lib/motion";
import type { PhoneState } from "@/app/lib/scene/createPhoneScene";

type Props = {
  progressRef?: React.MutableRefObject<number>;
  stateRef?: React.MutableRefObject<PhoneState>;
  variant?: "story" | "calm";
  className?: string;
  onReady?: () => void;
  onFallback?: () => void;
};

/**
 * Fixed WebGL canvas behind content.
 * Lazy-loads three after first paint. Phone hero object (no town).
 */
export function SceneCanvas({
  progressRef,
  stateRef,
  variant = "story",
  className = "",
  onReady,
  onFallback,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [usePoster, setUsePoster] = useState(false);
  const [faded, setFaded] = useState(false);
  const apiRef = useRef<{
    setProgress: (p: number) => void;
    setState: (s: PhoneState) => void;
    setPointer: (nx: number, ny: number) => void;
    resize: (w: number, h: number) => void;
    render: () => void;
    dispose: () => void;
  } | null>(null);
  const rafRef = useRef(0);
  const visibleRef = useRef(true);
  const lastState = useRef<PhoneState>("idle");

  useEffect(() => {
    if (prefersReducedMotion()) {
      setUsePoster(true);
      onFallback?.();
      return;
    }

    let cancelled = false;
    let api: typeof apiRef.current = null;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;

      const { createPhoneScene, shouldSkipWebGL } = await import(
        "@/app/lib/scene/createPhoneScene"
      );
      if (cancelled || shouldSkipWebGL()) {
        setUsePoster(true);
        onFallback?.();
        return;
      }

      api = await createPhoneScene(canvas);
      if (!api || cancelled) {
        setUsePoster(true);
        onFallback?.();
        return;
      }
      apiRef.current = api;
      onReady?.();

      const loop = () => {
        if (!api) return;
        if (visibleRef.current) {
          const p = progressRef?.current ?? 0;
          if (variant === "calm") {
            api.setProgress(0.04 + Math.min(0.04, p * 0.05));
          } else {
            api.setProgress(p);
            setFaded(p >= 0.9);
          }
          const s = stateRef?.current ?? "idle";
          if (s !== lastState.current) {
            lastState.current = s;
            api.setState(s);
          }
          api.render();
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);

      const onResize = () => {
        if (!api) return;
        api.resize(window.innerWidth, window.innerHeight);
      };
      onResize();
      window.addEventListener("resize", onResize);

      const onVis = () => {
        visibleRef.current = document.visibilityState === "visible";
      };
      document.addEventListener("visibilitychange", onVis);

      const fine = window.matchMedia("(pointer: fine)").matches;
      const onPointer = (e: PointerEvent) => {
        if (!api || !fine) return;
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = -((e.clientY / window.innerHeight) * 2 - 1);
        api.setPointer(nx, ny);
      };
      if (fine) window.addEventListener("pointermove", onPointer, { passive: true });

      cleanup = () => {
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVis);
        if (fine) window.removeEventListener("pointermove", onPointer);
      };
    };

    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(() => void boot(), { timeout: 500 });
    } else {
      timeoutHandle = setTimeout(() => void boot(), 150);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      if (idleHandle !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
      cleanup?.();
      api?.dispose();
      apiRef.current = null;
    };
  }, [progressRef, stateRef, variant, onReady, onFallback]);

  if (usePoster) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`scene-canvas ${className}`}
      data-mode="full"
      data-faded={faded ? "true" : "false"}
      aria-hidden="true"
    />
  );
}
