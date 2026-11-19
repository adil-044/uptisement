"use client";

import { useState } from "react";
import { DemoFrame } from "../DemoFrame";

type Stage = "ig" | "site" | "book" | "done";

const STORYBOARD = [
  { title: "1 · IG", detail: "Tap the fictional post." },
  { title: "2 · Site", detail: "Land on screen one." },
  { title: "3 · Book", detail: "CTA click (example)." },
  { title: "4 · Funnel", detail: "Numbers marked example." },
];

function countsFor(stage: Stage) {
  switch (stage) {
    case "ig":
      return { ig: 0, site: 0, book: 0 };
    case "site":
      return { ig: 1, site: 0, book: 0 };
    case "book":
      return { ig: 1, site: 1, book: 0 };
    case "done":
      return { ig: 1, site: 1, book: 1 };
  }
}

export function DemoA9Tracking() {
  const [stage, setStage] = useState<Stage>("ig");
  const counts = countsFor(stage);

  const reset = () => setStage("ig");

  return (
    <DemoFrame
      title="Conversion tracking"
      storyboard={STORYBOARD}
      onReplay={reset}
      id="tracking"
    >
      <p className="mb-3 text-sm text-[var(--color-muted)]">
        Funnel numbers are marked <strong>example</strong> — not live analytics.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { key: "ig", label: "IG post click", n: counts.ig },
          { key: "site", label: "Site visit", n: counts.site },
          { key: "book", label: "Book click", n: counts.book },
        ].map((col) => (
          <div
            key={col.key}
            className="rounded-md border border-[var(--color-line)] bg-white p-3 text-center"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
              {col.label}
            </p>
            <p className="mt-1 font-display text-3xl font-bold">{col.n}</p>
            <p className="text-xs text-[var(--color-muted)]">example</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {stage === "ig" && (
          <button type="button" className="btn btn-primary" onClick={() => setStage("site")}>
            Click IG post
          </button>
        )}
        {stage === "site" && (
          <button type="button" className="btn btn-primary" onClick={() => setStage("book")}>
            Open site
          </button>
        )}
        {stage === "book" && (
          <button type="button" className="btn btn-mint" onClick={() => setStage("done")}>
            Click Book
          </button>
        )}
        {stage === "done" && (
          <p className="text-sm font-semibold text-[var(--color-mint-deep)]">
            Example funnel complete.
          </p>
        )}
      </div>
    </DemoFrame>
  );
}
