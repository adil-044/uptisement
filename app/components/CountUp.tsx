"use client";

import { animate, m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Props = {
  value: number;
  className?: string;
  /** Superdesign rolling counter: digit strip when true */
  rolling?: boolean;
};

/** Counter for demo tiles — optional rolling digit strip (Superdesign counter). */
export function CountUp({ value, className = "", rolling = false }: Props) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(display, value, {
      duration: rolling ? 0.7 : 0.45,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
    // intentionally only re-run when value changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduce, rolling]);

  if (rolling && !reduce) {
    const digits = String(display);
    return (
      <span className={`count-roll ${className}`} data-superdesign="counter">
        {digits.split("").map((d, i) => (
          <span key={`${i}-${digits.length}`} className="count-roll__slot">
            <m.span
              key={`${i}-${d}`}
              initial={{ y: "70%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="count-roll__digit"
            >
              {d}
            </m.span>
          </span>
        ))}
      </span>
    );
  }

  return <span className={className}>{display}</span>;
}
