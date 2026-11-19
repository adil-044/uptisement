"use client";

import { m } from "motion/react";
import { BOOK_URL } from "@/app/lib/config";

type Props = {
  active: boolean;
};

/** Near-empty ending: small line + giant Book CTA. */
export function StoryEnding({ active }: Props) {
  return (
    <div
      className={`story-ending${active ? " is-active" : ""}`}
      aria-hidden={!active}
    >
      <m.p
        className="story-ending__note"
        initial={false}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5 }}
      >
        You made it to 7:12 PM. That job&apos;s booked.
      </m.p>
      <m.a
        href={BOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="story-ending__cta"
        data-cursor="circle"
        data-book
        tabIndex={active ? 0 : -1}
        initial={false}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.55, delay: active ? 0.08 : 0 }}
      >
        Book your free demo →
      </m.a>
    </div>
  );
}
