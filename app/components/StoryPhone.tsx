"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { prefersReducedMotion } from "@/app/lib/motion";
import { chapterAt } from "@/app/lib/chapters";
import { CountUp } from "./CountUp";

type Props = {
  progressRef: React.MutableRefObject<number>;
};

type Screen =
  | "idle"
  | "missed"
  | "text"
  | "quote"
  | "booked"
  | "review"
  | "done";

function screenForProgress(p: number): Screen {
  const id = chapterAt(p).id;
  if (id === "hero" || id === "704") return "idle";
  if (id === "without") return "missed";
  if (id === "rewind" || id === "textback") return "text";
  if (id === "quote") return "quote";
  if (id === "booked" || id === "after") return id === "after" ? "review" : "booked";
  if (id === "notTrade" || id === "site") return "booked";
  return "done";
}

/**
 * Superdesign "one product that travels": sticky phone mock keyframed with story progress.
 * Fintech midnight-mint-navy palette for the inner UI.
 */
export function StoryPhone({ progressRef }: Props) {
  const reduce = useReducedMotion() || prefersReducedMotion();
  const [screen, setScreen] = useState<Screen>("idle");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = progressRef.current;
      setVisible(p > 0.1 && p < 0.9);
      setScreen(screenForProgress(p));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  if (reduce) return null;

  return (
    <aside
      className={`story-phone ${visible ? "is-on" : ""}`}
      aria-hidden="true"
      data-superdesign="travelling-product"
    >
      <div className="story-phone__device">
        <div className="story-phone__notch" />
        <div className="story-phone__screen">
          <header className="story-phone__bar">
            <span className="story-phone__avatar">U</span>
            <div>
              <p className="story-phone__greet">Job thread</p>
              <p className="story-phone__name">Simulated</p>
            </div>
            <span className="story-phone__dot" />
          </header>

          <m.div
            key={screen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="story-phone__body"
          >
            {screen === "idle" && (
              <>
                <p className="story-phone__label">Tonight</p>
                <p className="story-phone__hero">7:04 PM</p>
                <p className="story-phone__muted">Phone in the jacket.</p>
              </>
            )}
            {screen === "missed" && (
              <>
                <p className="story-phone__label">Missed call</p>
                <p className="story-phone__hero">Jordan</p>
                <p className="story-phone__muted">No voicemail. Warm lead fading.</p>
              </>
            )}
            {screen === "text" && (
              <>
                <p className="story-phone__label">Auto text-back</p>
                <div className="story-phone__bubble out">
                  Sorry I missed you — still need help today?
                </div>
                <div className="story-phone__bubble in">Tomorrow morning works</div>
              </>
            )}
            {screen === "quote" && (
              <>
                <p className="story-phone__label">Rough range</p>
                <p className="story-phone__hero">
                  $<CountUp value={420} rolling />–$
                  <CountUp value={680} rolling />
                </p>
                <p className="story-phone__muted">You approve before it sends.</p>
              </>
            )}
            {screen === "booked" && (
              <>
                <p className="story-phone__label">Calendar</p>
                <p className="story-phone__hero">9:00 AM</p>
                <p className="story-phone__pill">Booked · lead board</p>
              </>
            )}
            {screen === "review" && (
              <>
                <p className="story-phone__label">After the visit</p>
                <p className="story-phone__hero">Thank-you + review link</p>
                <p className="story-phone__muted">Same link. No gating.</p>
              </>
            )}
            {screen === "done" && (
              <>
                <p className="story-phone__label">Caught</p>
                <p className="story-phone__hero">Lead stays yours</p>
              </>
            )}
          </m.div>

          <footer className="story-phone__tabs">
            <span className="is-active">Home</span>
            <span>Board</span>
            <span className="story-phone__fab">+</span>
            <span>Site</span>
            <span>More</span>
          </footer>
        </div>
      </div>
    </aside>
  );
}
