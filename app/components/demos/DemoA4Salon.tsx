"use client";

import { LayoutGroup, m, useReducedMotion } from "motion/react";
import { useState } from "react";
import { DemoFrame } from "../DemoFrame";
import { MotionButton } from "../MotionButton";

type Tab = "waitlist" | "reminders" | "empty";
type Slot = "open" | "cancelled" | "booked";

const STORYBOARD = [
  { title: "1 · Cancel", detail: "Calendar slot turns red." },
  { title: "2 · Buzz", detail: "Waitlist phones get the open slot." },
  { title: "3 · YES", detail: "Visitor taps YES — slot mint." },
  { title: "4 · Others", detail: "Still on the list message." },
];

const TABS = [
  ["waitlist", "Waitlist backfill"],
  ["reminders", "48h / 24h reminders"],
  ["empty", "Empty-chair alert"],
] as const;

export function DemoA4Salon() {
  const [tab, setTab] = useState<Tab>("waitlist");
  const [slot, setSlot] = useState<Slot>("open");
  const [buzzed, setBuzzed] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [scrub, setScrub] = useState(48);
  const [confirmed, setConfirmed] = useState(false);
  const [alert, setAlert] = useState(false);
  const reduce = useReducedMotion();

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
      <LayoutGroup id="a4-tabs">
        <div className="mb-3 flex flex-wrap gap-2">
          {TABS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`relative btn !min-h-9 !text-sm ${
                tab === id ? "text-[var(--color-ink)]" : "btn-secondary"
              }`}
              onClick={() => {
                setTab(id);
                reset();
              }}
            >
              {tab === id && (
                <m.span
                  layoutId="a4-tab-pill"
                  className="absolute inset-0 rounded-[0.55rem] bg-[var(--color-mint)]"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 32 }
                  }
                />
              )}
              <span className="relative z-[1]">{label}</span>
            </button>
          ))}
        </div>
      </LayoutGroup>
      <p className="mb-3 text-sm text-[var(--color-muted)]">
        Fictional salon. No real texts sent.
      </p>

      {tab === "waitlist" && (
        <div>
          <m.div
            layout
            className={`mb-4 rounded-md p-4 font-display text-xl font-bold ${
              slot === "cancelled"
                ? "bg-[color-mix(in_srgb,var(--color-accent)_25%,white)] text-[var(--color-accent-deep)]"
                : slot === "booked"
                  ? "bg-[color-mix(in_srgb,var(--color-mint)_25%,white)] text-[var(--color-mint-deep)]"
                  : "bg-white border border-[var(--color-line)]"
            }`}
            animate={
              reduce
                ? undefined
                : {
                    backgroundColor:
                      slot === "booked"
                        ? "color-mix(in srgb, #3ddc97 25%, white)"
                        : slot === "cancelled"
                          ? "color-mix(in srgb, #d9480f 25%, white)"
                          : "#ffffff",
                  }
            }
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            Thu 2:00 PM —{" "}
            {slot === "cancelled"
              ? "Cancelled"
              : slot === "booked"
                ? `Booked · ${winner}`
                : "Open"}
          </m.div>
          {slot === "open" && (
            <MotionButton
              className="btn btn-book"
              onClick={() => {
                setSlot("cancelled");
                setBuzzed(true);
              }}
            >
              Simulate cancel
            </MotionButton>
          )}
          {buzzed && slot === "cancelled" && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-semibold">3 waitlist phones buzz</p>
              {["Maya", "Priya", "Lee"].map((name) => (
                <MotionButton
                  key={name}
                  className="flex w-full items-center justify-between rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm"
                  onClick={() => {
                    setWinner(name);
                    setSlot("booked");
                  }}
                  disabled={!!winner}
                >
                  <span>{name}</span>
                  <span className="font-bold text-[var(--color-mint-deep)]">YES</span>
                </MotionButton>
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
            Reminder timing · {scrub}h before
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
            <MotionButton
              className="btn btn-book mt-3 !min-h-9 !text-sm"
              onClick={() => setConfirmed(true)}
            >
              Reply C
            </MotionButton>
          </div>
          {confirmed && (
            <m.p
              initial={reduce ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-3 inline-flex rounded-md bg-[color-mix(in_srgb,var(--color-mint)_20%,white)] px-3 py-1.5 text-sm font-bold text-[var(--color-mint-deep)]"
            >
              Confirmed
            </m.p>
          )}
        </div>
      )}

      {tab === "empty" && (
        <div>
          <MotionButton className="btn btn-book" onClick={() => setAlert(true)}>
            Trigger empty-chair alert
          </MotionButton>
          {alert && (
            <m.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-md bg-[var(--color-ink)] p-4 text-white"
            >
              <p className="text-xs uppercase text-white/60">Manager phone</p>
              <p className="mt-1 font-semibold">
                2:00 PM still open · 3 people on waitlist. Want to ping them?
              </p>
            </m.div>
          )}
        </div>
      )}
    </DemoFrame>
  );
}
