"use client";

import type { StoryBeat } from "@/app/lib/story";

type Props = {
  beat: StoryBeat;
  progress: number;
};

/** Bottom-right mono clock + zone + tick ruler — TIME metaphor (not depth). */
export function StoryClock({ beat, progress }: Props) {
  const ticks = 24;
  const active = Math.round(progress * (ticks - 1));

  return (
    <div className="story-clock" aria-hidden="true">
      <p className="story-clock__time font-mono">{beat.clock}</p>
      <p className="story-clock__zone font-mono">{beat.zone}</p>
      <div className="story-clock__ruler">
        {Array.from({ length: ticks }, (_, i) => (
          <span
            key={i}
            className={`story-clock__tick${i === active ? " is-active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
