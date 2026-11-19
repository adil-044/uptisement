"use client";

import { AnimatePresence, LayoutGroup, m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { upsertDemoLead } from "@/app/lib/demo-state";
import { prefersReducedMotion } from "@/app/lib/motion";
import { AnimatedNotifyList } from "../AnimatedNotifyList";
import { DemoFrame } from "../DemoFrame";
import { MotionButton } from "../MotionButton";

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
  { title: "2 · Miss", detail: "You miss it." },
  { title: "3 · Text", detail: "Auto text from your number within a minute." },
  { title: "4 · Reply", detail: "Visitor picks today / tomorrow / call me." },
  { title: "5 · Booked", detail: "New lead on your phone → job booked." },
];

export function DemoA1TextBack({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<Mode>("with");
  const [step, setStep] = useState<Step>("ringing");
  const [reply, setReply] = useState<string | null>(null);
  const [play, setPlay] = useState(!prefersReducedMotion());
  const reduce = useReducedMotion();

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
      window.setTimeout(() => setStep("lost"), reduce ? 0 : 900);
      return;
    }
    window.setTimeout(() => setStep("text"), reduce ? 0 : 700);
  };

  const chooseReply = (value: string) => {
    setReply(value);
    setStep("reply");
    window.setTimeout(() => setStep("owner"), reduce ? 0 : 600);
    window.setTimeout(() => {
      setStep("booked");
      upsertDemoLead({
        id: "a1-jordan",
        name: "Jordan",
        source: "text-back",
        stage: "booked",
        note: value,
      });
    }, reduce ? 0 : 1400);
  };

  return (
    <DemoFrame
      title="Missed-call text-back"
      storyboard={STORYBOARD}
      onReplay={reset}
      id="text-back"
    >
      <LayoutGroup id="a1-mode">
        <div className="mb-3 flex flex-wrap gap-2">
          {(["with", "without"] as const).map((id) => (
            <button
              key={id}
              type="button"
              className={`relative btn !min-h-9 !px-3 !text-sm ${
                mode === id ? "text-[var(--color-ink)]" : "btn-secondary"
              }`}
              onClick={() => {
                setMode(id);
                reset();
              }}
            >
              {mode === id && (
                <m.span
                  layoutId="a1-mode-pill"
                  className="absolute inset-0 rounded-[0.55rem] bg-[var(--color-mint)]"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 32 }
                  }
                />
              )}
              <span className="relative z-[1]">
                {id === "with" ? "With Uptisement" : "Without"}
              </span>
            </button>
          ))}
          {!play && (
            <MotionButton
              className="btn btn-secondary !min-h-9 !text-sm"
              onClick={() => {
                setPlay(true);
                reset();
              }}
            >
              Play demo
            </MotionButton>
          )}
        </div>
      </LayoutGroup>
      <p className="mb-3 text-sm text-[var(--color-muted)]">
        Fictional HVAC shop. No real texts sent.
      </p>

      <div className="mx-auto max-w-[300px] rounded-[1.75rem] border-[5px] border-[var(--color-ink)] bg-[var(--color-ink)] p-2.5">
        <div className="min-h-[320px] overflow-hidden rounded-[1.25rem] bg-[#f2f4f7] p-4">
          <AnimatePresence mode="wait">
            {step === "ringing" && (
              <m.div
                key="ringing"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                className="text-center"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                  Incoming call
                </p>
                <p className="mt-3 font-display text-2xl font-bold">Jordan</p>
                <p className="text-sm text-[var(--color-muted)]">Mobile · fictional</p>
                <MotionButton
                  className="btn btn-book mt-8 w-full"
                  onClick={miss}
                  disabled={!play && !prefersReducedMotion()}
                >
                  Miss the call
                </MotionButton>
              </m.div>
            )}
            {step === "missed" && (
              <m.div
                key="missed"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                className="text-center"
              >
                <p className="font-display text-xl font-bold text-[var(--color-accent)]">
                  Call missed
                </p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  {mode === "with" ? "Text-back starting…" : "No follow-up…"}
                </p>
              </m.div>
            )}
            {step === "lost" && (
              <m.div
                key="lost"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <p className="font-display text-xl font-bold text-[var(--color-accent)]">
                  Lead gone
                </p>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  By 7:20 they&apos;ve called the next guy on Google. No voicemail.
                </p>
              </m.div>
            )}
            {(step === "text" ||
              step === "reply" ||
              step === "owner" ||
              step === "booked") && (
              <m.div
                key="thread"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <p className="text-center text-[0.7rem] font-semibold uppercase text-[var(--color-muted)]">
                  Within a minute
                </p>
                <m.div
                  layout
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-[var(--color-teal)] px-3 py-2 text-sm text-white"
                >
                  Hey, saw your call. Want a slot today or tomorrow? Reply 1 or 2.
                </m.div>
                {step === "text" && (
                  <div className="flex flex-wrap gap-2">
                    {["1 · Today", "2 · Tomorrow", "Can you call me?"].map((chip) => (
                      <MotionButton
                        key={chip}
                        className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-xs font-semibold"
                        onClick={() => chooseReply(chip)}
                      >
                        {chip}
                      </MotionButton>
                    ))}
                  </div>
                )}
                <AnimatePresence>
                  {reply && step !== "text" && (
                    <m.div
                      key="reply"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-sm shadow-sm"
                    >
                      {reply}
                    </m.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {(step === "owner" || step === "booked") && (
                    <m.div
                      key="owner"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-[var(--color-ink)] p-3 text-white"
                    >
                      <p className="text-xs uppercase tracking-wide text-white/60">
                        On your phone
                      </p>
                      <p className="mt-1 font-semibold">New lead: Jordan, today</p>
                    </m.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {step === "booked" && (
                    <m.div
                      key="booked"
                      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-xl border border-[var(--color-mint)] bg-[color-mix(in_srgb,var(--color-mint)_18%,white)] p-3"
                    >
                      <p className="font-display font-bold text-[var(--color-mint-deep)]">
                        Job booked
                      </p>
                      <p className="text-sm text-[var(--color-ink-soft)]">
                        Lands on your calendar and lead board.
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {step === "booked" && !compact && (
        <div className="mt-4">
          <AnimatedNotifyList
            items={[
              {
                id: "n1",
                title: "Text sent",
                detail: "From your number · simulated",
              },
              {
                id: "n2",
                title: "Jordan replied",
                detail: reply ?? "Tomorrow",
              },
              {
                id: "n3",
                title: "Lead board",
                detail: "New → Booked",
              },
            ]}
          />
        </div>
      )}
    </DemoFrame>
  );
}
