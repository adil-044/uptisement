"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { BookLink } from "./BookLink";

const NAV = [
  { href: "/services/", label: "Services" },
  { href: "/automations/", label: "Automations" },
  { href: "/work/", label: "Work" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About" },
];

/**
 * Always-on paper glass header so wordmark/nav stay AA on dark hero and light pages.
 * Shrinks after ~100px (Superdesign shrinking-sticky-header, adapted).
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
        data-superdesign="shrinking-sticky-header"
        className={`site-header site-header--glass fixed inset-x-0 top-0 z-50 text-[var(--color-ink)] ${
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
            className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-[var(--color-ink)]"
          >
            <Image
              src="/brand/uptisement-logo-locked.png"
              alt=""
              width={shrunk ? 24 : 28}
              height={shrunk ? 24 : 28}
              className="rounded-sm transition-[width,height] duration-200"
              priority
            />
            <span>Uptisement</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-nav text-sm font-semibold text-[var(--color-ink-soft)]"
              >
                {item.label}
              </Link>
            ))}
            <BookLink className="btn btn-book !min-h-11 !px-4 !text-sm">
              Book a 15-min call
            </BookLink>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--color-ink)_22%,transparent)] bg-white/40"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span aria-hidden className="flex w-4 flex-col gap-1.5">
                <i
                  className={`block h-0.5 bg-[var(--color-ink)] transition ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <i
                  className={`block h-0.5 bg-[var(--color-ink)] transition ${open ? "opacity-0" : ""}`}
                />
                <i
                  className={`block h-0.5 bg-[var(--color-ink)] transition ${
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
          className="absolute inset-0 bg-[var(--color-ink)]/40"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div className="absolute right-0 top-0 flex h-full w-[min(20rem,88vw)] max-w-full flex-col gap-6 bg-[var(--color-surface)] p-6 pt-24 shadow-xl">
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
          </nav>
          <BookLink onClick={() => setOpen(false)}>Book a 15-min call</BookLink>
          <p className="text-sm text-[var(--color-muted)]">
            <a href="mailto:sales@uptisement.com">sales@uptisement.com</a>
            <br />
            Southern Ontario
          </p>
        </div>
      </div>
    </>
  );
}
