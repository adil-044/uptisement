"use client";

import { AnimatePresence, m } from "motion/react";
import type { StoryBeat } from "@/app/lib/story";

type Props = {
  beat: StoryBeat;
};

/**
 * Bottom-left chapter copy. Mask reveal is short; resting state is fully visible
 * (no mid-clip). Overflow padding on the mask so descenders/ascenders never crop.
 */
export function StoryCopy({ beat }: Props) {
  const show = beat.id !== "ending";

  return (
    <div className="story-copy" aria-live="polite">
      <AnimatePresence mode="wait">
        {show ? (
          <m.div
            key={beat.id}
            className="story-copy__inner"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="story-copy__mask">
              <m.h2
                className="story-copy__word"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {beat.word}
              </m.h2>
            </div>
            <m.p
              className="story-copy__sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.08 }}
            >
              {beat.subhead}
            </m.p>
            <m.ul
              className="story-copy__lines"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.12 }}
            >
              {beat.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </m.ul>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
