"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { prefersReducedMotion } from "@/app/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "What does a booking-first site cost?",
    a: "Sites start from $300. Hosting & updates are $30/mo if you want me to keep it online and tuned. Missed-call text-back, the Booked-Jobs Bundle, and AI consulting are scoped on a 15-min call with a fixed quote in writing.",
  },
  {
    q: "Can I see a demo of my site first?",
    a: "Yes. Book a 15-min call and ask for a free demo — a mockup of your shop's booking-first layout before you commit.",
  },
  {
    q: "How long does it take?",
    a: "Depends on scope. On the call I'll give you a timeline in writing with the price. Many booking-first sites ship in days, not months.",
  },
  {
    q: "Do I need new phone numbers for text-back?",
    a: "Usually no. Replies can land on the phone you already use. We'll confirm the setup on the call.",
  },
  {
    q: "What is AI consulting?",
    a: "Practical advising for Ontario owners: what to automate, what not to, and a written next step. Scoped on the same 15-min call — no invented package price.",
  },
  {
    q: "Who is this for?",
    a: "Owner-run Ontario trades (HVAC, roofing, and similar) and other local businesses that want a booking-first site and faster follow-up. Not a fit for franchises, ad-only retainers, or large brand films.",
  },
  {
    q: "What about domain and hosting?",
    a: "Hosting & updates are $30/mo. Domain and content handoff details are covered in your written scope before you pay.",
  },
];

export function FAQ() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      gsap.from(root.current.querySelectorAll("[data-reveal]"), {
        y: 28,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="faq" className="section" aria-labelledby="faq-title">
      <div className="container-x">
        <h2 id="faq-title" className="text-3xl md:text-5xl" data-reveal>
          FAQ
        </h2>
        <div className="mt-10 divide-y divide-[var(--color-line)]">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-4" data-reveal>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-display text-lg font-bold marker:content-none [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--color-line)] text-lg transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl pb-2 text-[var(--color-muted)]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
