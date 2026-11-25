"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export type DiagramKind =
  | "missed-call"
  | "instant-quotes"
  | "review-requests"
  | "booking-reminders";

const SEQUENCES: Record<
  DiagramKind,
  { labels: string[]; lostIndex?: number }
> = {
  "missed-call": {
    labels: ["Missed call", "Text in seconds", "Job on calendar"],
    lostIndex: 0,
  },
  "instant-quotes": {
    labels: ["Customer asks", "Rough range", "You approve", "Sent"],
  },
  "review-requests": {
    labels: ["Visit done", "Polite review ask", "Google review"],
  },
  "booking-reminders": {
    labels: ["Appointment booked", "Reminder sent", "Client confirms"],
  },
};

type Props = {
  kind: DiagramKind;
  className?: string;
};

/** Simple labelled node sequence — no fake phone / inbox UI. Plays once on view. */
export function AutomationDiagram({ kind, className }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const { labels, lostIndex } = SEQUENCES[kind];
  const [step, setStep] = useState(reduce ? labels.length - 1 : -1);
  const [done, setDone] = useState(!!reduce);

  useEffect(() => {
    if (reduce || !inView || done) return;
    let i = 0;
    setStep(0);
    const id = window.setInterval(() => {
      i += 1;
      if (i >= labels.length) {
        window.clearInterval(id);
        setDone(true);
        return;
      }
      setStep(i);
    }, 520);
    return () => window.clearInterval(id);
  }, [done, inView, labels.length, reduce]);

  function replay() {
    if (reduce) return;
    setDone(false);
    setStep(-1);
    requestAnimationFrame(() => {
      setStep(0);
      let i = 0;
      const id = window.setInterval(() => {
        i += 1;
        if (i >= labels.length) {
          window.clearInterval(id);
          setDone(true);
          return;
        }
        setStep(i);
      }, 520);
    });
  }

  return (
    <div ref={ref} className={`diagram ${className ?? ""}`}>
      <div className="diagram__row" aria-hidden={false}>
        {labels.map((label, i) => {
          const active = step >= i;
          const isLost = lostIndex === i && active && step === i;
          return (
            <m.span
              key={label}
              className="contents"
              initial={false}
              animate={
                reduce
                  ? undefined
                  : { opacity: active ? 1 : 0.35, scale: active ? 1 : 0.98 }
              }
              transition={{ duration: 0.28 }}
            >
              {i > 0 ? <span className="diagram__arrow">→</span> : null}
              <span
                className={`diagram__node ${active ? "is-active" : ""} ${
                  isLost ? "is-lost" : ""
                }`}
              >
                {label}
              </span>
            </m.span>
          );
        })}
      </div>
      {!reduce ? (
        <button
          type="button"
          className="justify-self-start text-xs font-semibold text-[color-mix(in_srgb,white_55%,transparent)] underline-offset-2 hover:text-[var(--color-mint)] hover:underline"
          onClick={replay}
        >
          Replay
        </button>
      ) : null}
      <span className="sr-only">
        {labels.join(" then ")}
      </span>
    </div>
  );
}
