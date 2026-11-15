"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef, useState } from "react";
import { prefersReducedMotion } from "@/app/lib/motion";
import { BookLink } from "./BookLink";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: "Missed call",
    detail: "You're on a job. The phone rings out.",
    bubble: null as string | null,
    status: "Missed · 2:14 PM",
  },
  {
    title: "Auto text-back",
    detail: "Caller gets a text within minutes — no new app for you.",
    bubble:
      "Hey — saw your call. Want a slot today or tomorrow? Reply 1 or 2.",
    status: "Sent · 2:15 PM",
  },
  {
    title: "Owner reply",
    detail: "Their reply lands on your phone. You book the job.",
    bubble: "1 — today if you can",
    status: "Reply · 2:16 PM",
    inbound: true,
  },
];

export function AutomationDemo() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (!root.current) return;

      if (prefersReducedMotion()) {
        setActive(STEPS.length - 1);
        return;
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: `+=${STEPS.length * 70}%`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              STEPS.length - 1,
              Math.floor(self.progress * STEPS.length),
            );
            setActive(idx);
          },
        });
        return () => st.kill();
      });

      mm.add("(max-width: 767px)", () => {
        const triggers = STEPS.map((_, i) =>
          ScrollTrigger.create({
            trigger: root.current,
            start: `top+=${i * 80} center`,
            end: `top+=${(i + 1) * 80} center`,
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          }),
        );
        return () => triggers.forEach((t) => t.kill());
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const step = STEPS[active];

  return (
    <section
      ref={root}
      id="automations-demo"
      className="section min-h-[100svh] md:min-h-screen"
      aria-labelledby="auto-demo-title"
    >
      <div className="container-x grid items-center gap-10 md:grid-cols-2">
        <div>
          <span className="label-pill" data-kind="Interactive demo (simulated)">
            Interactive demo (simulated)
          </span>
          <h2 id="auto-demo-title" className="mt-4 text-3xl md:text-5xl">
            Missed call → text → booked.
          </h2>
          <p className="section-lede">
            Scroll through a simulated missed-call text-back. No real SMS is sent.
          </p>
          <ol className="mt-8 space-y-4">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className={`border-l-2 pl-4 transition-colors ${
                  i === active
                    ? "border-[var(--color-accent)]"
                    : "border-[var(--color-line)] opacity-55"
                }`}
              >
                <p className="font-display text-lg font-bold">
                  {String(i + 1).padStart(2, "0")} · {s.title}
                </p>
                <p className="text-sm text-[var(--color-muted)]">{s.detail}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/demos/sms.html" className="btn btn-secondary">
              Open full SMS demo
            </Link>
            <BookLink>Book a 15-min call</BookLink>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[320px]" aria-live="polite">
          <div className="rounded-[2rem] border-[6px] border-[var(--color-ink)] bg-[var(--color-ink)] p-3 shadow-2xl">
            <div className="overflow-hidden rounded-[1.4rem] bg-[#f2f4f7]">
              <div className="bg-[var(--color-ink-soft)] px-4 py-3 text-center text-xs font-semibold text-white">
                Messages · Simulated
              </div>
              <div className="min-h-[340px] space-y-3 p-4">
                <p className="text-center text-[0.7rem] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                  {step.status}
                </p>
                {active >= 1 && STEPS[1].bubble && (
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[var(--color-teal)] px-3.5 py-2.5 text-sm text-white">
                    {STEPS[1].bubble}
                  </div>
                )}
                {active >= 2 && STEPS[2].bubble && (
                  <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-sm text-[var(--color-ink)] shadow-sm">
                    {STEPS[2].bubble}
                  </div>
                )}
                {active === 0 && (
                  <div className="mt-16 text-center">
                    <p className="font-display text-2xl font-bold">No answer</p>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      Incoming call ended
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
