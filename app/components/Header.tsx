"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { HaloButton } from "./HaloButton";

const NAV = [
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About" },
  { href: "/compare/", label: "Compare" },
];

/** Floating glass pill nav — original logo once, links, one Halo CTA. */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[200] flex justify-center px-4 pt-4 md:pt-5">
        <header className="pointer-events-auto relative w-[min(100%,36rem)] md:w-[min(100%,54rem)]">
          <nav
            aria-label="Primary"
            className="glass-surface flex items-center gap-2 rounded-full px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.5)] md:gap-3 md:px-4 md:py-2.5"
          >
            <BrandLogo />

            <div className="mx-auto hidden items-center gap-1 md:flex">
              {NAV.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                      active
                        ? "bg-[color-mix(in_srgb,var(--color-purple)_14%,transparent)] text-[var(--color-text)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="ml-auto flex items-center gap-2 md:ml-0">
              <HaloButton
                href="/#claim-demo"
                className="!min-h-9 !px-3 !text-sm"
              >
                Free demo
              </HaloButton>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] md:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
              >
                <span aria-hidden className="flex w-3.5 flex-col gap-1">
                  <i
                    className={`block h-px bg-[var(--color-text)] transition ${
                      open ? "translate-y-[5px] rotate-45" : ""
                    }`}
                  />
                  <i
                    className={`block h-px bg-[var(--color-text)] transition ${
                      open ? "opacity-0" : ""
                    }`}
                  />
                  <i
                    className={`block h-px bg-[var(--color-text)] transition ${
                      open ? "-translate-y-[5px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </nav>
          <div className="edge-blur" aria-hidden />
        </header>
      </div>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className={`fixed inset-0 z-[190] md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/70"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div className="glass-surface absolute inset-x-4 top-20 rounded-2xl p-5">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-lg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            <a href="mailto:sales@uptisement.com" className="link-plain">
              sales@uptisement.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
