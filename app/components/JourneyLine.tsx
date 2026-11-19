"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/app/lib/motion";

type Props = {
  progressRef: React.MutableRefObject<number>;
};

/**
 * Superdesign "scroll-journey-line": SVG lead thread draws with scroll %.
 * Desktop: sits beside the three.js lead particles.
 * Mobile: replaces the canvas thread (SceneCanvas goes ambient/poster).
 */
export function JourneyLine({ progressRef }: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const path = pathRef.current;
    const glow = glowRef.current;
    const head = headRef.current;
    if (!path || !glow || !head) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    glow.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    glow.style.strokeDashoffset = `${len}`;

    let raf = 0;
    const tick = () => {
      const p = Math.min(1, Math.max(0, progressRef.current));
      const drawn = len * (1 - p);
      path.style.strokeDashoffset = `${drawn}`;
      glow.style.strokeDashoffset = `${drawn}`;
      const pt = path.getPointAtLength(len * p);
      head.setAttribute("cx", String(pt.x));
      head.setAttribute("cy", String(pt.y));
      head.style.opacity = p > 0.02 && p < 0.95 ? "1" : "0";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <div
      className="journey-line"
      aria-hidden="true"
      data-superdesign="scroll-journey-line"
    >
      <svg
        className="journey-line__svg"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="journey-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d9480f" stopOpacity="0.15" />
            <stop offset="35%" stopColor="#3ddc97" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#d9480f" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3ddc97" stopOpacity="0.2" />
          </linearGradient>
          <filter id="journey-glow" x="-50%" y="-2%" width="200%" height="104%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Quiet track */}
        <path
          d="M52 20 C 48 120, 58 200, 45 300 S 60 450, 48 560 S 40 720, 55 820 S 50 940, 52 980"
          fill="none"
          stroke="color-mix(in srgb, var(--color-mint) 35%, transparent)"
          strokeWidth="2"
        />
        <path
          ref={glowRef}
          d="M52 20 C 48 120, 58 200, 45 300 S 60 450, 48 560 S 40 720, 55 820 S 50 940, 52 980"
          fill="none"
          stroke="url(#journey-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.65"
          filter="url(#journey-glow)"
        />
        <path
          ref={pathRef}
          d="M52 20 C 48 120, 58 200, 45 300 S 60 450, 48 560 S 40 720, 55 820 S 50 940, 52 980"
          fill="none"
          stroke="url(#journey-grad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          ref={headRef}
          r="6.5"
          fill="#3ddc97"
          stroke="#0b1220"
          strokeWidth="1.5"
          opacity="0"
          filter="url(#journey-glow)"
        />
      </svg>
    </div>
  );
}
