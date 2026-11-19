"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookLink } from "./BookLink";

const NAV = [
  { href: "/services/", label: "Services" },
  { href: "/automations/", label: "Automations" },
  { href: "/work/", label: "Work" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding,background,backdrop-filter] duration-200 ${
          compact || open
            ? "bg-[color-mix(in_srgb,var(--color-paper)_88%,transparent)] backdrop-blur-md border-b border-[color-mix(in_srgb,var(--color-ink)_8%,transparent)]"
            : "bg-transparent"
        }`}
      >
        <div
          className={`container-x flex items-center justify-between gap-3 ${
            compact ? "py-2.5" : "py-4"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
          >
            <Image
              src="/brand/uptisement-logo-locked.png"
              alt=""
              width={28}
              height={28}
              className="rounded-sm"
              priority
            />
            <span>Uptisement</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              >
                {item.label}
              </Link>
            ))}
            <BookLink className="btn btn-primary !min-h-11 !px-4 !text-sm">
              Book a 15-min call
            </BookLink>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <BookLink className="btn btn-primary !min-h-11 !px-3.5 !text-sm">
              Book a 15-min call
            </BookLink>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--color-ink)_18%,transparent)]"
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
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-40 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-[var(--color-ink)]/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[min(20rem,88vw)] flex-col gap-6 bg-[var(--color-surface)] p-6 pt-24 shadow-xl transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
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
