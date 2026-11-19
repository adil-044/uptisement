"use client";

import { useEffect, useState } from "react";
import { upsertDemoLead } from "@/app/lib/demo-state";
import { prefersReducedMotion } from "@/app/lib/motion";
import { DemoFrame } from "../DemoFrame";

type Mode = "with" | "without";
type Step =
  | "ringing"
  | "missed"
  | "text"
  | "reply"
  | "owner"
  | "booked"
  | "lost";

const STORYBOARD = [
  { title: "1 · Ring", detail: "Incoming call while you're on a job." },
  { title: "2 · Miss", detail: "You miss it. Timer starts." },
  { title: "3 · Text", detail: "Auto text from your number within a minute." },
  { title: "4 · Reply", detail: "Visitor picks today / tomorrow / call me." },
  { title: "5 · Booked", detail: "Owner lock screen: new lead → job booked." },
];

export function DemoA1TextBack({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<Mode>("with");
  const [step, setStep] = useState<Step>("ringing");
  const [reply, setReply] = useState<string | null>(null);
  const [play, setPlay] = useState(!prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStep("booked");
      setPlay(false);
    }
  }, []);

  const reset = () => {
    setStep("ringing");
    setReply(null);
    setPlay(true);
  };

  const miss = () => {
    setStep("missed");
    if (mode === "without") {
      window.setTimeout(() => setStep("lost"), 900);
      return;
    }
    window.setTimeout(() => setStep("text"), 700);
  };

  const chooseReply = (value: string) => {
    setReply(value);
    setStep("reply");
    window.setTimeout(() => setStep("owner"), 600);
    window.setTimeout(() => {
      setStep("booked");
      upsertDemoLead({
        id: "a1-jordan",
        name: "Jordan",
        source: "text-back",
        stage: "booked",
        note: value,
      });
    }, 1400);
  };

  return (
    <DemoFrame
      title="Missed-call text-back"
      storyboard={STORYBOARD}
      onReplay={reset}
      id="text-back"
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={`btn !min-h-9 !px-3 !text-sm ${mode === "with" ? "btn-mint" : "btn-secondary"}`}
          onClick={() => {
            setMode("with");
            reset();
          }}
        >
          With Uptisement
        </button>
        <button
          type="button"
          className={`btn !min-h-9 !px-3 !text-sm ${mode === "without" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => {
            setMode("without");
            reset();
          }}
        >
          Without
        </button>
        {!play && (
          <button
            type="button"
            className="btn btn-secondary !min-h-9 !text-sm"
            onClick={() => {
              setPlay(true);
              reset();
            }}
          >
            Play steps
          </button>
        )}
      </div>
      <p className="mb-3 text-sm text-[var(--color-muted)]">
        Fictional HVAC shop · visitor name Jordan · no real SMS.
      </p>

      <div className="mx-auto max-w-[300px] rounded-[1.75rem] border-[5px] border-[var(--color-ink)] bg-[var(--color-ink)] p-2.5">
        <div className="min-h-[320px] overflow-hidden rounded-[1.25rem] bg-[#f2f4f7] p-4">
          {step === "ringing" && (
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                Incoming call
              </p>
              <p className="mt-3 font-display text-2xl font-bold">Jordan</p>
              <p className="text-sm text-[var(--color-muted)]">Mobile · fictional</p>
              <button
                type="button"
                className="btn btn-primary mt-8 w-full"
                onClick={miss}
                disabled={!play && !prefersReducedMotion()}
              >
                Miss the call
              </button>
            </div>
          )}
          {step === "missed" && (
            <div className="text-center">
              <p className="font-display text-xl font-bold text-[var(--color-accent)]">
                Call missed
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {mode === "with" ? "Text-back starting…" : "No follow-up…"}
              </p>
            </div>
          )}
          {step === "lost" && (
            <div className="text-center">
              <p className="font-display text-xl font-bold text-[var(--color-accent)]">
                Lead gone
              </p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                By 7:20 they&apos;ve called the next guy on Google. No voicemail.
              </p>
            </div>
          )}
          {(step === "text" || step === "reply" || step === "owner" || step === "booked") && (
            <div className="space-y-3">
              <p className="text-center text-[0.7rem] font-semibold uppercase text-[var(--color-muted)]">
                Within a minute · simulated
              </p>
              <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-[var(--color-teal)] px-3 py-2 text-sm text-white">
                Hey, saw your call. Want a slot today or tomorrow? Reply 1 or 2.
              </div>
              {step === "text" && (
                <div className="flex flex-wrap gap-2">
                  {["1 · Today", "2 · Tomorrow", "Can you call me?"].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-xs font-semibold"
                      onClick={() => chooseReply(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
              {reply && step !== "text" && (
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-sm shadow-sm">
                  {reply}
                </div>
              )}
              {(step === "owner" || step === "booked") && (
                <div className="rounded-xl bg-[var(--color-ink)] p-3 text-white">
                  <p className="text-xs uppercase tracking-wide text-white/60">Lock screen</p>
                  <p className="mt-1 font-semibold">New lead: Jordan, today</p>
                </div>
              )}
              {step === "booked" && (
                <div className="rounded-xl border border-[var(--color-mint)] bg-[color-mix(in_srgb,var(--color-mint)_18%,white)] p-3">
                  <p className="font-display font-bold text-[var(--color-mint-deep)]">
                    Job booked
                  </p>
                  <p className="text-sm text-[var(--color-ink-soft)]">
                    Lands on your calendar and lead board.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {!compact && (
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Toggle Without to see the fade-out path. Text timing is “within a minute,” not exact
          seconds.
        </p>
      )}
    </DemoFrame>
  );
}
