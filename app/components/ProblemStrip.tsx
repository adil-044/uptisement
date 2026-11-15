"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { prefersReducedMotion } from "@/app/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const PAINS = [
  {
    title: "Missed calls on the job",
    body: "You're on a roof or under a furnace. The next guy answers first.",
  },
  {
    title: "A site with no book path",
    body: "Homeowners decide in minutes on their phone. No clear Book or Call, no job.",
  },
  {
    title: "Quotes that sit for days",
    body: "Hot leads cool off while estimates wait in a notebook or inbox.",
  },
];

export function ProblemStrip() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      gsap.from(root.current.querySelectorAll("[data-reveal]"), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section" aria-labelledby="problem-title">
      <div className="container-x">
        <h2 id="problem-title" className="max-w-[16ch] text-3xl md:text-5xl" data-reveal>
          Missed call → they call the next guy.
        </h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {PAINS.map((pain) => (
            <li key={pain.title} data-reveal>
              <h3 className="text-xl font-bold">{pain.title}</h3>
              <p className="mt-2 text-[var(--color-muted)]">{pain.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
