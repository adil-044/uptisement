"use client";

import { useState } from "react";
import { upsertDemoLead } from "@/app/lib/demo-state";
import { BOOK_URL } from "@/app/lib/config";
import { DemoFrame } from "../DemoFrame";

type Step = "idle" | "price" | "reply" | "intent" | "book" | "booked";

const STORYBOARD = [
  { title: "1 · DM", detail: 'Visitor asks “price?”' },
  { title: "2 · Reply", detail: "Scripted answer + intent chips." },
  { title: "3 · Book", detail: "Booking button appears." },
  { title: "4 · Sheet", detail: "BOOKED row lands on the board." },
];

export function DemoA5IgDm() {
  const [step, setStep] = useState<Step>("idle");
  const [intent, setIntent] = useState<string | null>(null);

  const reset = () => {
    setStep("idle");
    setIntent(null);
  };

  return (
    <DemoFrame
      title="Instagram DM → booked"
      storyboard={STORYBOARD}
      onReplay={reset}
      id="ig-dm"
    >
      <p className="mb-3 text-sm text-[var(--color-muted)]">
        Re-skinned from the{" "}
        <a className="underline" href="/ig-dm/">
          /ig-dm/
        </a>{" "}
        demo · fictional shop · no real Instagram API.
      </p>
      <div className="mx-auto max-w-[320px] overflow-hidden rounded-xl border border-[var(--color-line)] bg-white">
        <div className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-3 py-2 text-center text-xs font-bold text-white">
          IG DM · simulated
        </div>
        <div className="min-h-[260px] space-y-2 p-3 text-sm">
          {step === "idle" && (
            <button
              type="button"
              className="btn btn-secondary w-full !text-sm"
              onClick={() => {
                setStep("price");
                window.setTimeout(() => setStep("reply"), 500);
              }}
            >
              Send: price?
            </button>
          )}
          {step !== "idle" && (
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#3797f0] px-3 py-2 text-white">
              price?
            </div>
          )}
          {(step === "reply" ||
            step === "intent" ||
            step === "book" ||
            step === "booked") && (
            <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-[#efefef] px-3 py-2">
              Sites from $300. Hosting $30/mo. Want a free demo of your site, or an
              automation walkthrough?
            </div>
          )}
          {(step === "reply" || step === "intent") && (
            <div className="flex flex-wrap gap-2">
              {["Free site demo", "Missed-call text-back", "Just book a call"].map(
                (chip) => (
                  <button
                    key={chip}
                    type="button"
                    className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs font-semibold"
                    onClick={() => {
                      setIntent(chip);
                      setStep("book");
                    }}
                  >
                    {chip}
                  </button>
                ),
              )}
            </div>
          )}
          {intent && step !== "reply" && (
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#3797f0] px-3 py-2 text-white">
              {intent}
            </div>
          )}
          {(step === "book" || step === "booked") && (
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !min-h-10 w-full !text-sm"
              data-book
              onClick={(e) => {
                e.preventDefault();
                setStep("booked");
                upsertDemoLead({
                  id: "a5-ig",
                  name: "IG · Taylor",
                  source: "ig-dm",
                  stage: "booked",
                  note: intent ?? undefined,
                });
              }}
            >
              Book a 15-min call
            </a>
          )}
          {step === "booked" && (
            <div className="rounded-md bg-[color-mix(in_srgb,var(--color-mint)_18%,white)] p-2 text-center font-bold text-[var(--color-mint-deep)]">
              BOOKED · sheet row added
            </div>
          )}
        </div>
      </div>
    </DemoFrame>
  );
}
