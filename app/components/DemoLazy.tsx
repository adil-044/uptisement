"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

type Loader = () => Promise<{ default: ComponentType<Record<string, unknown>> }>;

/**
 * Mount a heavy demo only when near the viewport — keeps homepage First Load JS down.
 */
export function DemoLazy({
  load,
  fallbackHeight = 420,
  props = {},
}: {
  load: Loader;
  fallbackHeight?: number;
  props?: Record<string, unknown>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [Comp, setComp] = useState<ComponentType<Record<string, unknown>> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const run = () => {
      void load().then((mod) => {
        if (!cancelled) setComp(() => mod.default);
      });
    };

    if (!("IntersectionObserver" in window)) {
      run();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { rootMargin: "240px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [load]);

  return (
    <div ref={ref} style={{ minHeight: Comp ? undefined : fallbackHeight }}>
      {Comp ? <Comp {...props} /> : (
        <p className="text-sm text-[var(--color-muted)]">Loading demo…</p>
      )}
    </div>
  );
}
