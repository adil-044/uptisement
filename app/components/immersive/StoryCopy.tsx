"use client";

import { AnimatePresence, m } from "motion/react";
import type { StoryBeat } from "@/app/lib/story";

type Props = {
  beat: StoryBeat;
};

/** Bottom-left chapter copy: big word + subhead + 3 lines, mask reveal. */
export function StoryCopy({ beat }: Props) {
  const show = beat.id !== "ending";

  return (
    <div className="story-copy" aria-live="polite">
      <AnimatePresence mode="wait">
        {show ? (
          <m.div
            key={beat.id}
            className="story-copy__inner"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="story-copy__mask">
              <m.h2
                className="story-copy__word"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {beat.word}
              </m.h2>
            </div>
            <p className="story-copy__sub">{beat.subhead}</p>
            <ul className="story-copy__lines">
              {beat.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
