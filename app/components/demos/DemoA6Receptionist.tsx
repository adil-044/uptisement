"use client";

import { useState } from "react";
import { DemoFrame } from "../DemoFrame";

type Msg = { from: "visitor" | "bot" | "system"; text: string };

const STORYBOARD = [
  { title: "1 · Ask", detail: "Pick a common question." },
  { title: "2 · Reply", detail: "Honest, short answers." },
  { title: "3 · Escalate", detail: "Hands off to Adil when needed." },
  { title: "4 · STOP", detail: "Opt-out is honoured." },
];

const REPLIES: Record<string, string> = {
  websites:
    "Yes — booking-first sites for owner-run shops across Ontario. From $300. Free demo first.",
  price:
    "Websites from $300. Hosting & updates $30/mo. Automations: starting price on a 15-min call.",
  stop: "Got it — you’ve been removed from this demo thread. No more messages.",
};

export function DemoA6Receptionist() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi — this is a simulated text receptionist for a fictional shop. Ask away.",
    },
  ]);
  const [stopped, setStopped] = useState(false);

  const reset = () => {
    setStopped(false);
    setMsgs([
      {
        from: "bot",
        text: "Hi — this is a simulated text receptionist for a fictional shop. Ask away.",
      },
    ]);
  };

  const send = (label: string, key: string) => {
    if (stopped) return;
    const next: Msg[] = [...msgs, { from: "visitor", text: label }];
    if (key === "stop") {
      next.push({ from: "bot", text: REPLIES.stop });
      next.push({ from: "system", text: "STOP honoured · demo ended" });
      setMsgs(next);
      setStopped(true);
      return;
    }
    next.push({ from: "bot", text: REPLIES[key] });
    if (key === "price" || key === "websites") {
      next.push({
        from: "system",
        text: "Handing to Adil — book a 15-min call for your shop.",
      });
    }
    setMsgs(next);
  };

  return (
    <DemoFrame
      title="AI text receptionist"
      storyboard={STORYBOARD}
      onReplay={reset}
      id="receptionist"
    >
      <p className="mb-3 text-sm text-[var(--color-muted)]">
        Fictional shop thread. STOP is honoured. No real texts sent.
      </p>
      <div className="min-h-[220px] space-y-2 rounded-md border border-[var(--color-line)] bg-white p-3">
        {msgs.map((m, i) => (
          <div
            key={`${m.text}-${i}`}
            className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${
              m.from === "visitor"
                ? "ml-auto bg-[var(--color-ink)] text-white"
                : m.from === "system"
                  ? "mx-auto bg-[color-mix(in_srgb,var(--color-mint)_16%,white)] text-center text-xs font-semibold"
                  : "bg-[var(--color-paper)]"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      {!stopped && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-secondary !min-h-9 !text-sm"
            onClick={() => send("Do you do websites?", "websites")}
          >
            Do you do websites?
          </button>
          <button
            type="button"
            className="btn btn-secondary !min-h-9 !text-sm"
            onClick={() => send("How much?", "price")}
          >
            How much?
          </button>
          <button
            type="button"
            className="btn btn-secondary !min-h-9 !text-sm"
            onClick={() => send("STOP", "stop")}
          >
            STOP
          </button>
        </div>
      )}
    </DemoFrame>
  );
}
