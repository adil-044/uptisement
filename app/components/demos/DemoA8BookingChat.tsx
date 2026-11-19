"use client";

import { useState } from "react";
import { DemoFrame } from "../DemoFrame";

type Step = "idle" | "service" | "slots" | "done";

const STORYBOARD = [
  { title: "1 · Open", detail: "Chat dock on a fictional site." },
  { title: "2 · Service", detail: "Pick cleaning." },
  { title: "3 · Slot", detail: "Choose one of three times." },
  { title: "4 · ID", detail: "Booking ID DEMO-1042." },
];

export function DemoA8BookingChat() {
  const [step, setStep] = useState<Step>("idle");
  const [slot, setSlot] = useState<string | null>(null);

  const reset = () => {
    setStep("idle");
    setSlot(null);
  };

  return (
    <DemoFrame
      title="AI booking chat"
      storyboard={STORYBOARD}
      onReplay={reset}
      id="ai-booking"
    >
      <p className="mb-3 text-sm text-[var(--color-muted)]">
        Scripted chat dock on a fictional cleaning site.
      </p>
      <div className="ml-auto max-w-[320px] overflow-hidden rounded-xl border border-[var(--color-line)] bg-white shadow-sm">
        <div className="bg-[var(--color-ink)] px-3 py-2 text-sm font-bold text-white">
          Book with us · demo
        </div>
        <div className="space-y-2 p-3 text-sm">
          <div className="rounded-lg bg-[var(--color-paper)] px-3 py-2">
            Hi — what do you need?
          </div>
          {step === "idle" && (
            <button
              type="button"
              className="btn btn-secondary !min-h-9 w-full !text-sm"
              onClick={() => setStep("service")}
            >
              Cleaning
            </button>
          )}
          {step !== "idle" && (
            <div className="ml-auto max-w-[80%] rounded-lg bg-[var(--color-ink)] px-3 py-2 text-white">
              Cleaning
            </div>
          )}
          {(step === "service" || step === "slots" || step === "done") && (
            <>
              <div className="rounded-lg bg-[var(--color-paper)] px-3 py-2">
                Pick a slot (fictional):
              </div>
              <div className="flex flex-col gap-1.5">
                {["Tomorrow 9:00 AM", "Tomorrow 1:00 PM", "Fri 10:30 AM"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`rounded-md border px-3 py-2 text-left text-sm ${
                      slot === s
                        ? "border-[var(--color-mint)] bg-[color-mix(in_srgb,var(--color-mint)_16%,white)]"
                        : "border-[var(--color-line)]"
                    }`}
                    disabled={step === "done"}
                    onClick={() => {
                      setSlot(s);
                      setStep("slots");
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === "slots" && slot && (
            <button
              type="button"
              className="btn btn-mint w-full !text-sm"
              onClick={() => setStep("done")}
            >
              Confirm {slot}
            </button>
          )}
          {step === "done" && (
            <div className="rounded-lg bg-[color-mix(in_srgb,var(--color-mint)_18%,white)] px-3 py-2 font-semibold text-[var(--color-mint-deep)]">
              Booked · Booking ID DEMO-1042
            </div>
          )}
        </div>
      </div>
    </DemoFrame>
  );
}
