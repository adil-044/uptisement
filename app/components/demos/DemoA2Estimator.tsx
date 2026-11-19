"use client";

import { useState } from "react";
import { CountUp } from "../CountUp";
import { DemoFrame } from "../DemoFrame";

type Tab = "roof" | "hvac";
type Phase = "pick" | "scan" | "range" | "queued";

// Demo values only — not real pricing. PRICE: confirm with Adil for live quotes.
const ROOF_BANDS = [
  { id: "a", label: "Sample A", perSq: 4.5, note: "demo per-sq-ft band" },
  { id: "b", label: "Sample B", perSq: 6.2, note: "demo per-sq-ft band" },
  { id: "c", label: "Sample C", perSq: 8.1, note: "demo per-sq-ft band" },
];

const STORYBOARD = [
  { title: "1 · Photo", detail: "Pick a sample roof image (no uploads)." },
  { title: "2 · Size", detail: "Slider for approximate roof size." },
  { title: "3 · Scan", detail: "Boxes land on ponding / seam." },
  { title: "4 · Range", detail: "Sample ballpark — you approve." },
  { title: "5 · Queue", detail: "Draft queued for your approval." },
];

export function DemoA2Estimator() {
  const [tab, setTab] = useState<Tab>("roof");
  const [sample, setSample] = useState(0);
  const [size, setSize] = useState(18);
  const [phase, setPhase] = useState<Phase>("pick");
  const [notes, setNotes] = useState("Furnace not heating · 2-storey · after hours");
  const [hvacRange, setHvacRange] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);

  const reset = () => {
    setPhase("pick");
    setApproved(false);
    setHvacRange(null);
  };

  const runScan = () => {
    setPhase("scan");
    window.setTimeout(() => setPhase("range"), 1100);
  };

  const band = ROOF_BANDS[sample];
  const low = Math.round(band.perSq * size * 100);
  const high = Math.round(low * 1.22);

  const runHvac = () => {
    const t = notes.toLowerCase();
    let n = 180;
    if (t.includes("after hours") || t.includes("emergency")) n += 90;
    if (t.includes("2-storey") || t.includes("two")) n += 40;
    if (t.includes("furnace") || t.includes("boiler")) n += 60;
    setHvacRange(`$${n}–$${n + 70}`);
    setApproved(false);
  };

  return (
    <DemoFrame
      title="Photo-to-quote estimator"
      storyboard={STORYBOARD}
      onReplay={reset}
      id="estimator"
    >
      <p className="mb-3 text-sm text-[var(--color-muted)]">
        Customers never climb. Crew or existing photos only. You approve every quote.
      </p>
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          className={`btn !min-h-9 !text-sm ${tab === "roof" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setTab("roof")}
        >
          Roof photos
        </button>
        <button
          type="button"
          className={`btn !min-h-9 !text-sm ${tab === "hvac" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setTab("hvac")}
        >
          HVAC job notes
        </button>
      </div>

      {tab === "roof" && (
        <div>
          <div className="grid grid-cols-3 gap-2">
            {ROOF_BANDS.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setSample(i);
                  setPhase("pick");
                }}
                className={`aspect-[4/3] rounded-md border-2 ${
                  sample === i
                    ? "border-[var(--color-mint)]"
                    : "border-transparent"
                }`}
                style={{
                  background: `linear-gradient(145deg, ${
                    i === 0 ? "#6b7280" : i === 1 ? "#78716c" : "#57534e"
                  } 40%, #1e293b 100%)`,
                }}
                aria-label={`Sample roof ${r.label}`}
              />
            ))}
          </div>
          <label className="mt-4 block text-sm font-semibold">
            Roof size (squares) — fictional
            <input
              type="range"
              min={10}
              max={40}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="mt-2 w-full"
            />
            <span className="text-[var(--color-muted)]">{size} squares</span>
          </label>
          {phase === "pick" && (
            <button type="button" className="btn btn-primary mt-4" onClick={runScan}>
              Read photos
            </button>
          )}
          {phase === "scan" && (
            <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-md bg-[#334155]">
              <div className="absolute left-[20%] top-[30%] border-2 border-[var(--color-mint)] px-1 text-[0.65rem] text-[var(--color-mint)]">
                ponding
              </div>
              <div className="absolute right-[25%] top-[45%] border-2 border-[var(--color-accent)] px-1 text-[0.65rem] text-[var(--color-accent)]">
                seam
              </div>
              <div
                className="absolute inset-x-0 h-0.5 bg-[var(--color-mint)]"
                style={{ top: "55%", animation: "none" }}
              />
              <p className="absolute inset-x-0 bottom-2 text-center text-sm text-white">
                Reading photos…
              </p>
            </div>
          )}
          {(phase === "range" || phase === "queued") && (
            <div className="mt-4 rounded-md border border-[var(--color-line)] bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                Sample ballpark · {band.note}
              </p>
              {/* Demo per-sq-ft band — not a real quote */}
              <p className="mt-1 font-display text-2xl font-bold">
                $<CountUp value={low} rolling />–$
                <CountUp value={high} rolling />
              </p>
              <p className="text-sm text-[var(--color-muted)]">
                Rough written range. You approve before it goes.
              </p>
              {phase === "range" && (
                <button
                  type="button"
                  className="btn btn-mint mt-3"
                  onClick={() => setPhase("queued")}
                >
                  Approve &amp; send
                </button>
              )}
              {phase === "queued" && (
                <div className="mt-3 space-y-2">
                  <p className="font-semibold text-[var(--color-mint-deep)]">
                    Draft queued — you approve before it sends
                  </p>
                  <div className="rounded-md bg-[var(--color-ink)] p-3 text-sm text-white">
                    <p className="text-xs text-white/60">Owner inbox preview</p>
                    <p className="mt-1">Quote draft ready for Jordan · roof sample</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab === "hvac" && (
        <div>
          <label className="block text-sm font-semibold" htmlFor="hvac-notes">
            Job notes
          </label>
          <textarea
            id="hvac-notes"
            className="mt-2 w-full rounded-md border border-[var(--color-line)] bg-white p-3 text-sm"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={runHvac}>
              Draft quote
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              disabled={!hvacRange || approved}
              onClick={() => setApproved(true)}
            >
              Approve &amp; send
            </button>
          </div>
          <p className="mt-3 font-display text-2xl font-bold">{hvacRange ?? "—"}</p>
          <p className="text-sm text-[var(--color-muted)]">
            {approved
              ? "Approved · quote text queued."
              : hvacRange
                ? "Draft only. Not sent."
                : "Waiting for notes…"}
          </p>
        </div>
      )}
    </DemoFrame>
  );
}
