"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Item = { id: string; title: string; detail: string };

type Props = {
  items: Item[];
  className?: string;
};

/**
 * Superdesign animated-list (scaled down): staggered notify tiles for demos.
 * Uses Motion, not framer-motion.
 */
export function AnimatedNotifyList({ items, className = "" }: Props) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(reduce ? items.length : 0);

  useEffect(() => {
    if (reduce) {
      setVisible(items.length);
      return;
    }
    setVisible(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= items.length) window.clearInterval(id);
    }, 420);
    return () => window.clearInterval(id);
  }, [items, reduce]);

  return (
    <ul
      className={`animated-notify ${className}`}
      data-superdesign="animated-list"
    >
      {items.slice(0, visible).map((item, index) => (
        <m.li
          key={item.id}
          initial={reduce ? false : { opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="animated-notify__item"
          style={{ zIndex: items.length - index }}
        >
          <span className="animated-notify__dot" aria-hidden />
          <span>
            <strong>{item.title}</strong>
            <span className="block text-xs text-[var(--color-muted)]">
              {item.detail}
            </span>
          </span>
        </m.li>
      ))}
    </ul>
  );
}
