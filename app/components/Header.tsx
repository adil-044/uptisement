"use client";

import Link from "next/link";
import { m, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { BookLink } from "./BookLink";

const NAV = [
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About" },
  { href: "/compare/", label: "Compare" },
];

/**
 * Shrinking sticky header. Claim-demo CTA stays in the DOM.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setShrunk(v > 100);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <m.header
        className={`site-header site-header--glass fixed inset-x-0 top-0 z-50 text-white ${
          shrunk ? "is-shrunk" : ""
        }`}
        animate={
          reduce
            ? undefined
            : {
                paddingTop: shrunk ? 8 : 14,
                paddingBottom: shrunk ? 8 : 14,
              }
        }
        transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div
          className={`container-x wrap flex items-center justify-between gap-3 ${
            reduce ? "py-3" : "py-0"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/uptisement-logo-mark.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 rounded-sm"
              decoding="async"
            />
            <span>Uptisement</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-nav text-sm font-semibold"
              >
                {item.label}
              </Link>
            ))}
            <a href="/#claim-demo" className="btn btn-mint !min-h-11 !px-4 !text-sm">
              Claim free demo
            </a>
            <BookLink className="btn btn-secondary !min-h-11 !px-3 !text-sm">
              Book a 15-min call
            </BookLink>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="/#claim-demo"
              className="btn btn-mint !min-h-10 !px-3 !text-sm"
            >
              Free demo
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[color-mix(in_srgb,white_22%,transparent)] bg-white/5"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span aria-hidden className="flex w-4 flex-col gap-1.5">
                <i
                  className={`block h-0.5 bg-white transition ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <i
                  className={`block h-0.5 bg-white transition ${open ? "opacity-0" : ""}`}
                />
                <i
                  className={`block h-0.5 bg-white transition ${
                    open ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </m.header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className={`fixed inset-0 z-40 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <button
          type="button"
          className="absolute inset-0 bg-[var(--color-ink)]/60"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div className="absolute right-0 top-0 flex h-full w-[min(20rem,88vw)] max-w-full flex-col gap-6 bg-[var(--color-ink-soft)] p-6 pt-24 shadow-xl">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-lg font-semibold"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/#claim-demo"
              className="rounded-lg px-3 py-3 text-lg font-semibold text-[var(--color-mint)]"
              onClick={() => setOpen(false)}
            >
              Claim free demo
            </a>
          </nav>
          <BookLink onClick={() => setOpen(false)}>Book a 15-min call</BookLink>
          <p className="text-sm text-[color-mix(in_srgb,white_65%,transparent)]">
            <a href="mailto:sales@uptisement.com">sales@uptisement.com</a>
            <br />
            Southern Ontario
          </p>
        </div>
      </div>
    </>
  );
}
