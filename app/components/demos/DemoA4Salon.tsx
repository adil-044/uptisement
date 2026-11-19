"use client";

import { useState } from "react";
import { DemoFrame } from "../DemoFrame";

type Tab = "waitlist" | "reminders" | "empty";
type Slot = "open" | "cancelled" | "booked";

const STORYBOARD = [
  { title: "1 · Cancel", detail: "Calendar slot turns red." },
  { title: "2 · Buzz", detail: "Waitlist phones get the open slot." },
  { title: "3 · YES", detail: "Visitor taps YES — slot mint." },
  { title: "4 · Others", detail: "Still on the list message." },
];

export function DemoA4Salon() {
  const [tab, setTab] = useState<Tab>("waitlist");
  const [slot, setSlot] = useState<Slot>("open");
  const [buzzed, setBuzzed] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [scrub, setScrub] = useState(48);
  const [confirmed, setConfirmed] = useState(false);
  const [alert, setAlert] = useState(false);

  const reset = () => {
    setSlot("open");
    setBuzzed(false);
    setWinner(null);
    setScrub(48);
    setConfirmed(false);
    setAlert(false);
  };

  return (
    <DemoFrame
      title="Salon / spa booking"
      storyboard={STORYBOARD}
      onReplay={reset}
      id="booking"
    >
      <div className="mb-3 flex flex-wrap gap-2">
        {(
          [
            ["waitlist", "Waitlist backfill"],
            ["reminders", "48h / 24h reminders"],
            ["empty", "Empty-chair alert"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`btn !min-h-9 !text-sm ${tab === id ? "btn-primary" : "btn-secondary"}`}
            onClick={() => {
              setTab(id);
              reset();
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mb-3 text-sm text-[var(--color-muted)]">
        Fictional salon · no real texts.
      </p>

      {tab === "waitlist" && (
        <div>
          <div
            className={`mb-4 rounded-md p-4 font-display text-xl font-bold ${
              slot === "cancelled"
                ? "bg-[color-mix(in_srgb,var(--color-accent)_25%,white)] text-[var(--color-accent-deep)]"
                : slot === "booked"
                  ? "bg-[color-mix(in_srgb,var(--color-mint)_25%,white)] text-[var(--color-mint-deep)]"
                  : "bg-white border border-[var(--color-line)]"
            }`}
          >
            Thu 2:00 PM —{" "}
            {slot === "cancelled"
              ? "Cancelled"
              : slot === "booked"
                ? `Booked · ${winner}`
                : "Open"}
          </div>
          {slot === "open" && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSlot("cancelled");
                setBuzzed(true);
              }}
            >
              Simulate cancel
            </button>
          )}
          {buzzed && slot === "cancelled" && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-semibold">3 waitlist phones buzz</p>
              {["Maya", "Priya", "Lee"].map((name) => (
                <button
                  key={name}
                  type="button"
                  className="flex w-full items-center justify-between rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm"
                  onClick={() => {
                    setWinner(name);
                    setSlot("booked");
                  }}
                  disabled={!!winner}
                >
                  <span>{name}</span>
                  <span className="font-bold text-[var(--color-mint-deep)]">YES</span>
                </button>
              ))}
            </div>
          )}
          {slot === "booked" && (
            <p className="mt-3 text-sm text-[var(--color-muted)]">
              Others get: “Slot filled, you&apos;re still on the list.”
            </p>
          )}
        </div>
      )}

      {tab === "reminders" && (
        <div>
          <label className="block text-sm font-semibold">
            Reminder scrubber · {scrub}h before
            <input
              type="range"
              min={24}
              max={48}
              step={24}
              value={scrub}
              onChange={(e) => {
                setScrub(Number(e.target.value));
                setConfirmed(false);
              }}
              className="mt-2 w-full"
            />
          </label>
          <div className="mt-4 rounded-md bg-[var(--color-ink)] p-3 text-white">
            <p className="text-sm">
              Reminder: tomorrow 2pm with Nova Cuts. Reply C to confirm.
            </p>
            <button
              type="button"
              className="btn btn-mint mt-3 !min-h-9 !text-sm"
              onClick={() => setConfirmed(true)}
            >
              Reply C
            </button>
          </div>
          {confirmed && (
            <p className="mt-3 inline-flex rounded-md bg-[color-mix(in_srgb,var(--color-mint)_20%,white)] px-3 py-1.5 text-sm font-bold text-[var(--color-mint-deep)]">
              Confirmed
            </p>
          )}
        </div>
      )}

      {tab === "empty" && (
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setAlert(true)}
          >
            Trigger empty-chair alert
          </button>
          {alert && (
            <div className="mt-4 rounded-md bg-[var(--color-ink)] p-4 text-white">
              <p className="text-xs uppercase text-white/60">Manager phone</p>
              <p className="mt-1 font-semibold">
                2:00 PM still open · 3 people on waitlist. Want to ping them?
              </p>
            </div>
          )}
        </div>
      )}
    </DemoFrame>
  );
}
