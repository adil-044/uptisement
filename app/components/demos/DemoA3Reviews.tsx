"use client";

import { useState } from "react";
import { DemoFrame } from "../DemoFrame";

type Phase = "idle" | "clock" | "ask" | "stars" | "done";

const STORYBOARD = [
  { title: "1 · Done", detail: "Mark visit done." },
  { title: "2 · Wait", detail: "Clock fast-forwards 2 hours." },
  { title: "3 · Ask", detail: "Customer gets review ask." },
  { title: "4 · Stars", detail: "Tap 5 stars (simulated)." },
  { title: "5 · Count", detail: "Demo counter ticks to 1." },
];

export function DemoA3Reviews() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [stars, setStars] = useState(0);

  const reset = () => {
    setPhase("idle");
    setStars(0);
  };

  const markDone = () => {
    setPhase("clock");
    window.setTimeout(() => setPhase("ask"), 900);
  };

  return (
    <DemoFrame
      title="Google review ask"
      storyboard={STORYBOARD}
      onReplay={reset}
      id="reviews"
    >
      <p className="mb-3 text-sm text-[var(--color-muted)]">
        Same link to everyone. No review gating. Fictional customer.
      </p>
      {phase === "idle" && (
        <button type="button" className="btn btn-primary" onClick={markDone}>
          Mark visit done
        </button>
      )}
      {phase === "clock" && (
        <p className="font-display text-3xl font-bold">+2 hours…</p>
      )}
      {(phase === "ask" || phase === "stars" || phase === "done") && (
        <div className="mx-auto max-w-[280px] rounded-[1.5rem] border-4 border-[var(--color-ink)] bg-white p-4">
          <p className="text-sm font-semibold">
            Thanks for having us today. Mind leaving a quick Google review?
          </p>
          <div className="mt-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className="text-2xl"
                aria-label={`${n} stars`}
                onClick={() => {
                  setStars(n);
                  setPhase(n === 5 ? "stars" : "ask");
                  if (n === 5) window.setTimeout(() => setPhase("done"), 500);
                }}
              >
                <span className={n <= stars ? "text-[var(--color-accent)]" : "text-[var(--color-line)]"}>
                  ★
                </span>
              </button>
            ))}
          </div>
          {phase === "stars" || phase === "done" ? (
            <div className="mt-3 rounded-md bg-[var(--color-paper)] p-3 text-sm">
              <p className="font-bold">Mock review screen · simulated</p>
              <p className="text-[var(--color-muted)]">
                “Great furnace visit — on time and clear.” — fictional
              </p>
            </div>
          ) : null}
        </div>
      )}
      {phase === "done" && (
        <div className="mt-4 rounded-md border border-[var(--color-mint)] bg-[color-mix(in_srgb,var(--color-mint)_14%,white)] p-3">
          <p className="font-semibold">Review requests sent this week: 1 (demo)</p>
        </div>
      )}
    </DemoFrame>
  );
}
